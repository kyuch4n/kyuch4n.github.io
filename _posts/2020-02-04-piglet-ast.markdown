---
layout:     post
title:      "Piglet Part4 - AST"
subtitle:   "A language named Piglet to describe the flow chart"
date:       2020-02-02
author:     "kyuchan"
header-img: "img/post-bg.jpg"
tags:
    - language
    - typescript
    - tokenizer
    - parser
---

# AST

## In short

- prog { type: "prog", consequent: [ ...AST ] }
- node { type: "node", value: string }
- if { type: "if", test: AST, consequent: [ ...AST ], alternate: AST }
- switch { type: "switch", discriminant: AST, cases: [ ...AST ] }
- case { type: "case", test: AST, consequent: [ ...AST ] }
- while { type: "while", test: AST, consequent: [ ...AST ] }
- do ... while { type: "do-while", test: AST, consequent: [ ...AST ] }
- break { type: "break" }
- continue { type: "continue" }
