---
layout: post
title: "Piglet Part3 - Tokens"
subtitle: "A language named Piglet to describe the flow chart"
date: 2020-02-03
author: "kyuchan"
header-img: "img/post.jpg"
tags:
  - language
  - tokenizer
  - parser
---

# Tokens

## Snippet 1

```piglet
init;
if (failure) {
  has error;
  break;
}
submit;
```

↓↓↓

```piglet
Token { type: 'node', value: 'init' },
Token { type: 'punctuation', value: ';' },
Token { type: 'keyword', value: 'if' },
Token { type: 'punctuation', value: '(' },
Token { type: 'node', value: 'failure' },
Token { type: 'punctuation', value: ')' },
Token { type: 'punctuation', value: '{' },
Token { type: 'node', value: 'has error' },
Token { type: 'punctuation', value: ';' },
Token { type: 'keyword', value: 'break' },
Token { type: 'punctuation', value: ';' },
Token { type: 'punctuation', value: '}' },
Token { type: 'node', value: 'submit' },
Token { type: 'punctuation', value: ';' }
```

## Snippet 2

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

↓↓↓

```piglet
Token { type: 'keyword', value: 'switch' },
Token { type: 'punctuation', value: '(' },
Token { type: 'node', value: 'num' },
Token { type: 'punctuation', value: ')' },
Token { type: 'punctuation', value: '{' },
Token { type: 'keyword', value: 'case' },
Token { type: 'node', value: '1' },
Token { type: 'punctuation', value: ':' },
Token { type: 'node', value: 'something for 1' },
Token { type: 'punctuation', value: ';' },
Token { type: 'keyword', value: 'break' },
Token { type: 'punctuation', value: ';' },
Token { type: 'keyword', value: 'case' },
Token { type: 'node', value: '2' },
Token { type: 'punctuation', value: ':' },
Token { type: 'node', value: 'something for 2' },
Token { type: 'punctuation', value: ';' },
Token { type: 'keyword', value: 'default' },
Token { type: 'punctuation', value: ':' },
Token { type: 'node', value: 'something default' },
Token { type: 'punctuation', value: ';' },
Token { type: 'punctuation', value: '}' },
Token { type: 'node', value: 'something last' },
Token { type: 'punctuation', value: ';' }
```

## Snippet 3

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

↓↓↓

```piglet
Token { type: 'keyword', value: 'if' },
Token { type: 'punctuation', value: '(' },
Token { type: 'node', value: 'a' },
Token { type: 'punctuation', value: ')' },
Token { type: 'punctuation', value: '{' },
Token { type: 'node', value: 'something for A' },
Token { type: 'punctuation', value: ';' },
Token { type: 'punctuation', value: '}' },
Token { type: 'keyword', value: 'elif' },
Token { type: 'punctuation', value: '(' },
Token { type: 'node', value: 'b' },
Token { type: 'punctuation', value: ')' },
Token { type: 'punctuation', value: '{' },
Token { type: 'node', value: 'something for B' },
Token { type: 'punctuation', value: ';' },
Token { type: 'punctuation', value: '}' },
Token { type: 'keyword', value: 'else' },
Token { type: 'punctuation', value: '{' },
Token { type: 'node', value: 'something else' },
Token { type: 'punctuation', value: ';' },
Token { type: 'punctuation', value: '}' },
Token { type: 'node', value: 'something last' },
Token { type: 'punctuation', value: ';' }
```

## Snippet 4

```piglet
init;
do {
  retry;
} while (failure)
submit;
```

↓↓↓

```piglet
Token { type: 'node', value: 'init' },
Token { type: 'punctuation', value: ';' },
Token { type: 'keyword', value: 'do' },
Token { type: 'punctuation', value: '{' },
Token { type: 'node', value: 'retry' },
Token { type: 'punctuation', value: ';' },
Token { type: 'punctuation', value: '}' },
Token { type: 'keyword', value: 'while' },
Token { type: 'punctuation', value: '(' },
Token { type: 'node', value: 'failure' },
Token { type: 'punctuation', value: ')' },
Token { type: 'node', value: 'submit' },
Token { type: 'punctuation', value: ';'
```
