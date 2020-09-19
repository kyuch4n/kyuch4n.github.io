---
layout: post
title: "关于 beforeunload/unload 的二三事"
subtitle: ""
date: 2020-09-19
author: "kyuchan"
header-img: "img/post-bg.jpg"
tags:
  - beforeunload
  - unload
  - eventlistener
---

在开发中我们也许会遇到这样的需求：即在用户离开当前页面的时候发送请求或者打点。自然我们需要对页面的 beforeunload/unload 事件去做一些事件监听。

```javascript
function log() {
  $.ajax();
}
window.addEventListener("unload", log, false);
```

事实上，由于页面已经被用户关闭了，你的请求可能并没有成功发送（Canceled）。

如果对于浏览器的兼容性没有什么要求的话，不妨可以尝试一下 `navigator.sendBeacon` 这个 [API](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)。

> 备注：在 unload 或者 beforeunload 事件处理器中发起一个同步 XMLHttpRequest 来发送数据已经不被 Chrome 支持（同步的 xhr 请求会阻塞页面关闭，带来不好的用户体验）。

```javascript
function log() {
  navigator.sendBeacon("/log", analyticsData);
}
window.addEventListener("unload", log, false);
```

# Confirm dialog

<img width="300" src="{{ site.url }}/img/assets/beforeunload-dialog.png" />

如果用户此时正在编辑一些重要的信息，希望在用户离开或者刷新页面前进行二次确认，这又该如何呢？我们还可以监听 beforeunload 事件弹出确认对话框。

```javascript
window.addEventListener("beforeunload", (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = "";
});
```

同时在 unload 事件回调里通过 `navigator.sendBeacon` 发送请求。

# Further more

如果我们对于浏览器的兼容性还要有一定要求的（不能直接使用 sendBeacon API），或者在发送离开页面的请求之后我们还需要做一些请求的回调处理怎么办 😰？

无奈之下我们只能**将请求置于 beforeunload 的事件回调之中**。这样，在弹窗进行二次确认的时请求会正常发送，而**在 unload 执行前的事件循环里面执行请求的回调**。

```javascript
window.addEventListener("beforeunload", (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();

  // Ajax
  $.ajax({
    // options
  }).then(() => {
    // 回调处理
    // do sth....
  });

  // Chrome requires returnValue to be set.
  event.returnValue = "";
});
```

# Another question

不幸的是，这也引入了新的问题：**用户取消/确定，没有回调 API，无法得知**。于是即便用户取消了关闭操作、停留在当前页面，仍旧会发送请求、触发回调。

如果你的请求是可以被 **revert** 的（A → B → A），那我们还可以通过一些小 **trick** 判断出用户仍然停留在当前页面，从而重置状态。

```javascript
window.addEventListener("beforeunload", (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();

  // Ajax
  $.ajax({
    // options
  }).then(() => {
    // 回调处理
    // do sth...
  }).then(() => {
    setTimeout(() => {
      // revert
      // do sth...
    }, 1000);
  });

  // Chrome requires returnValue to be set.
  event.returnValue = "";
});
```

如果用户停留在了当前页面，在用户取消了弹窗的 1s 后，我们的 setTimeout 逻辑将会触发，这时我们可以进行请求的 revert；如果用户选择了离开，则不会触发 setTimeout 逻辑。

# At last

不幸的是，如果请求无法被 revert，而离开时的需求逻辑又比较复杂，我也暂时没想到什么特别好的方法。（不如考虑改一下产品逻辑......