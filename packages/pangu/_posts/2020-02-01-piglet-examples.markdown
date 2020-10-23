---
layout: post
title: "Piglet Part1 - Examples"
subtitle: "A language named Piglet to describe the flow chart"
date: 2020-02-01
author: "kyuchan"
header-img: "assets/post.jpg"
tags:
  - language
  - tokenizer
  - parser
---

# Examples

## An Simple Example

```piglet
init;
if (failure) {
  has error;
  break;
}
submit;
```

<hr />

## An Example with Chinese

```piglet
初始化;

if (出错) {
  出错啦;
  break;
}

提交;
```

<hr />

## An Example of switch-case

```piglet
switch (num) {
  case 1:
    something for 1;
    break;
  case 2:
    something for 2;
  default:
    something default;
}

something last;
```

<hr />

## An Example of if-else

```piglet
if (a) {
  something for A;
} elif (b) {
  something for B;
} else {
  something else;
}

something last;
```

<hr />

## An Example of a Circle

```piglet
init;
do {
  retry;
} while (failure)
submit;
```
