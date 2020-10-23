---
layout: post
title: "Piglet Part2 - Tutorial"
subtitle: "A language named Piglet to describe the flow chart"
date: 2020-02-02
author: "kyuchan"
header-img: "assets/post.jpg"
tags:
  - language
  - tokenizer
  - parser
---

# Tutorial

Piglet is an extremely simple language to describe flow.

## 1. Don't Support

- No DataType and Variable
- No Operator
- And of cource No Function

## 2. What Piglet Support

### 2.1 Grammar

#### 2.1.1 Piglet Keywords

| Keyword              | Description                                                                      |
| :------------------- | :------------------------------------------------------------------------------- |
| break                | Terminates a switch or a loop                                                    |
| continue             | Jumps out of a loop and starts at the top                                        |
| if ... elif ... else | Marks a block of statements to be executed, depending on a condition             |
| switch ... case      | Marks a block of statements to be executed, depending on different cases         |
| do ... while         | Executes a block of statements, and repeats the block, while a condition is true |
| while ...            | While a condition is true, executes a block of statements, and repeats the block |

#### 2.1.2 Semicolons

Semicolons separate Piglet statements.

Add a semicolon at the end of each executable statement:

```piglet
初始化;
```

#### 2.1.3 White Space

Piglet ignores multiple spaces.

```piglet
初始化   ;
```

#### 2.1.4 Case Sensitive

do and DO are different.

### 2.2 Comments

Comments can be used to explain code, and to make it more readable.

Example:

```piglet
init; # this is a comment
```

### 2.3 Conditions

Conditional statements are used to perform different actions based on different conditions.

Piglet has the following conditional statements:

- Use if to specify a block of code to be executed, if a specified condition is true
- Use else to specify a block of code to be executed, if the same condition is false
- Use elif to specify a new condition to test, if the first condition is false
- Use switch to specify many alternative blocks of code to be executed

### 2.4 Switch

The switch statement is used to perform different actions based on different conditions.

Use the switch statement to select one of many code blocks to be executed.

I believe you are familiar with the usage. Here is an example:

```piglet
switch(size) {
  case M:
    code block;
    break;
  case L:
    code block;
    break;
  default:
    code block;
}
```

### 2.5 Loop While

Loops can execute a block of code as long as a specified condition is true.

I believe you are familiar with the usage.

#### 2.5.1 The While Loop

```piglet
while (a > 0) {
  code block to be executed;
}
```

#### 2.5.2 The Do/While Loop

```piglet
do {
  code block to be executed;
}
while (a > 0);
```

#### 2.5.3 No Loop For

Not support for loop yet.

### 2.6 Break And Contnue

The break statement "jumps out" of a loop.

The continue statement "jumps over" one iteration in the loop.
