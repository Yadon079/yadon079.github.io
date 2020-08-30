---
layout: post
date: 2020-08-29 22:20:30
title: "진수 변환, 형 변환"
description: "자바 Integer 클래스의 메소드"
subject: java
category: [ java ]
tags: [ java, method ]
comments: true
---


# Integer 클래스

&nbsp; 자바 Integer 클래스는 `java.lang` 패키지에 포함된 클래스로 `원시적 형(primitive type) int`의 값을 객체에 wrap한다. Integer 유형의 오브젝트에는 유형이 int인 단일 필드가 들어있다.

&nbsp; Integer 클래스에 포함된 메소드 중에서 자주 사용되는 것들을 적어보았다.

## Integer.parseInt(string s)

`String to Int`. 문자열을 int형으로 변환한다.

```java
String str = "123";
int i = Integer.parseInt(str);
```

## .toString(int i)

`Int to String`. int를 String으로 변환한다.

```java
int num = 123;
String str = Integer.toString(num);
```

## .toBinaryString(int i)

10진수를 2진수로 변환해서 String으로 리턴한다.
int를 String으로 변환해 `toCharArray()`나 `charAt()`으로 하나씩 나누는 방법도 있지만, 이 쪽이 더 간편한다.

```java
String str = Integer.toBinaryString(num);
System.out.println(str);
```

## .toOctalString(int i)

10진수를 8진수로 변환해서 String으로 리턴한다. toBinaryString과 유사하다.

```java
String str = Integer.toOctalString(num);
System.out.println(str);
```

## .toHexString(int i)

10진수를 16진수로 변환해서 String으로 리턴한다. toBinaryString과 유사하다.

```java
String str = Integer.toHexString(num);
System.out.println(str);
```

## .parseInt(String s, int radix)

`parseInt()`를 이용하여, 2진수, 8진수, 16진수를 10진수로 변환한다.

```java
int temp = Integer.parseInt(str, 2);
System.out.println("2 -> 10 : " + temp);
```

```java
int temp = Integer.parseInt(str, 8);
System.out.println("8 -> 10 : " + temp);
```

## .bitCount(int i)

입력된 수 `i`를 2진수로 변환하여, 1의 개수를 알려준다.

```java
System.out.println("2진수 1의 개수 : " + Integer.bitCount(i));
```

---
**Reference**
+ [Java Api Documentaion](https://docs.oracle.com/javase/8/docs/api/)
