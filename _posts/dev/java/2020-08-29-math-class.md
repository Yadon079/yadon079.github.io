---
layout: post
date: 2020-08-29 22:26:30
title: "java.lang.Math"
description: "자바 Math 클래스"
subject: java
category: [ java ]
tags: [ java, method ]
comments: true
---

# Math 클래스

&nbsp; 자바 Math 클래스는 `java.lang`패키지에 포함된 클래스로 수학과 관련된 일련의 작업들을 처리할 수 있는 클래스이다. 전부 `static`으로 구현되어 있으므로 별도의 객체 생성없이 사용할 수 있다.

&nbsp; Math 클래스에 포함된 메소드는 굉장히 많다. 그 중에서 자주 사용되는 것들을 적어보았다.

## abs() 메소드

&nbsp; 인자로 넘어온 데이터의 절대 값을 반환하는 메소드이다. 전달된 값이 양수이면 그대로 반환한다.

코드

```java
import java.lang.Math;

public class Sample {
  public static void main(String[] args) {
    System.out.println(Math.abs(-1));
    System.out.println(Math.abs(0));
    System.out.println(Math.abs(1));
  }
}
```
결과

> 1
> 0
> 1

## max(), min() 메소드

&nbsp; 전달된 데이터 중 더 큰 수와 더 작은 수를 반환하는 메소드이다.

코드

```java
import java.lang.Math;

public class Sample {
  public static void main(String[] args) {
    System.out.println(Math.max(10, 100));
    System.out.println(Math.min(10, 100));
  }
}
```
결과

> 100
> 10

## pow() 메소드

&nbsp; 제곱근을 구할 때 사용되는 메소드이다. 입출력이 모두 실수형인 double형이다.

코드

```java
import java.lang.Math;

public class Sample {
  public static void main(String[] args) {
    System.out.println(Math.pow(2, 4));
  }
}
```
결과

> 16

---
**Reference**
+ [Java Api Documentaion](https://docs.oracle.com/javase/8/docs/api/)
