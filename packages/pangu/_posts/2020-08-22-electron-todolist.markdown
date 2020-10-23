---
layout: post
title: "Electron 实现 ToDoList"
subtitle: ""
date: 2020-08-22
author: "kyuchan"
header-img: "assets/post.jpg"
tags:
  - electron
  - react
  - typescript
---

# 项目预览

[Neural - ToDoList for Mac](https://github.com/kyuch4n/Neural/releases)

# 技术选型

```shell
# 语言
typescript
# 框架
react + electron
# 组件库
Antd
# 存储
IndexedDB
```

# 项目开发

## 初始化

参考 [React 结合 Electron](https://juejin.im/post/6844903555921362952#heading-5) 初始化自己的 react 项目。

## 本地开发

利用 Antd 组件库进行前端开发，提供 todo item 的增删改查功能。

定期巡查，[Notify](https://developer.mozilla.org/zh-CN/docs/Web/API/Notification) 过期的 todo item。

## 数据存储

通过 [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 做前端存储。存储的数据结构如下：

```typescript
enum TagStatus {
  PENDING = "pending",
  DONE = "done",
}

interface Tag {
  id?: string;
  name: string;
  descriptions?: string;
  wikis?: Array<string>;
  expires?: number;
  status?: TagStatus;
}
```

## 其他功能

### Electron API

- 设置托盘（tray）
- 隐藏 docker 图标
- 全局快捷键（globalShortcut）
- 修改窗口关闭事件

将窗口关闭改为隐藏。

```typescript
mainWindow.on("close", (e) => {
  mainWindow.hide();
  e.preventDefault();
});
```

### 禁止 cmd+r reload

```typescript
window.onkeydown = function (e: any) {
  const ev = window.event || e;
  const code = ev.keyCode || ev.which;
  if ((ev.ctrlKey || ev.metaKey) && code === 82) {
    console.warn("Reload is not allowed!");
    return false;
  }
};
```

### 通过窗口抖动进行错误提示

```typescript
const shake = () => {
  const win = window.remote.getCurrentWindow();
  const [startX, startY] = win.getPosition();
  const distance = 5;
  const moveArrry = [
    { x: -1 * distance, y: -1 * distance },
    { x: distance, y: -1 * distance },
    { x: -1 * distance, y: 5 },
    { x: distance, y: distance },
    { x: 0, y: 0 },
  ];

  const routeArray = moveArrry.map((item) => ({ x: item.x + startX, y: item.y + startY }));
  routeArray.forEach((r) => win.setPosition(r.x, r.y));
};
```

## 构建

修改 package.json electron-builder 配置：

```javascript
{
  "build": {
    "appId": "com.electron.neural",
    "productName": "Neural",
    "mac": {
      "icon": "public/logo512.png",
      "category": "public.app-category.utilities"
    }
  }
}
```

将 dependencies 移至 devDependencies，减少构建后 app 的包体积。

```typescript
{
  "dependencies": {
    "electron-is-dev": "^1.2.0"
  },
  "devDependencies": {
    "@ant-design/icons": "^4.2.1",
    "antd": "^4.4.2",
    ...
  }
}
```

yarn autoclean 进一步优化 node_modules 体积。

```shell
yarn autoclean --force && yarn react-build && yarn electron-build
```

# 工作流

通过 Github Action 自动构建。

```yaml
name: release

on:
  push:
    branches: [master]

jobs:
  build_and_release:
    runs-on: macos-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup node
        uses: actions/setup-node@v1
        with:
          node-version: "10.x"

      - name: Install dependencies
        run: |
          npm install yarn -g
          yarn

      - name: Build Application
        run: yarn build

      - name: Get Package Version
        uses: yunree/package-version@v1.0.2

      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        with:
          tag_name: v${{ env.PACKAGE_VERSION }}
          release_name: v${{ env.PACKAGE_VERSION }}
          draft: true
          prerelease: false

      - name: Upload Release Asset
        id: upload_release_asset
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./dist/Neural-${{ env.PACKAGE_VERSION }}.dmg
          asset_name: Neural-${{ env.PACKAGE_VERSION }}.dmg
          asset_content_type: application/octet-stream
```
