---
layout: post
date: 2020-08-20 21:46:30
title: "toCharArray()"
description: "자바 String 메소드"
subject: java
category: [ java ]
tags: [ java, method ]
comments: true
---

# Java String

## toCharArray()

&nbsp; 자바 toCharArray() 메소드는 문자열을 char형 배열로 바꿔준다. 반환되는 배열의 길이는 문자열의 길이와 같다.

<span style="color:red">주의</span> *문자열의 공백 또한 인덱스에 포함한다.*

### 문법

```
public char[] toCharArray()
```

### 예시

#### 입력

```
public class Test {
  public static void main(String[] args) {
    String str = "hello world";

    char[] arr = str.toCharArray();

    for(int i = 0; i < arr.length; i++) {
      System.out.print(arr[i] + " ");
    }
  }
}
```
#### 출력

```
h e l l o   w o r l d
