---
layout: post
date: 2020-09-24 13:00:00
title: "예외처리"
description: "자바의 정석"
subject: java의 정석
category: [ java ]
tags: [ java, exception ]
comments: true
---

# 예외처리

> 이 글은 남궁성님의 [자바의 정석 3/e](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788994492032)을 기반으로 공부한 내용을 정리한 글입니다.

+ [예외처리](#예외처리-exception-handling)

## 예외처리 Exception Handling

### 1.1 프로그램 오류

프로그램 실행중 발생하는 오류의 발생 시점에 따라 '컴파일 에러(compile-time error)'와 '런타임 에러(runtime-error)'로 나눌 수 있다.

컴파일 에러는 컴파일 할 때 발생하는 에러이고 런타임 에러는 프로그램의 실행도중에 발생하는 에러이다. 이 외에 '논리적 에러(logical error)'가 있는데, 의도한 것과 다르게 동작하는 것을 말한다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>컴파일 에러</b> &nbsp;&nbsp;&nbsp;&nbsp; 컴파일 시에 발생하는 에러<br/>
      <b>런타임 에러</b> &nbsp;&nbsp;&nbsp;&nbsp; 실행 시에 발생하는 에러<br/>
      <b>논리적 에러</b> &nbsp;&nbsp;&nbsp;&nbsp; 실행은 되지만, 의도와 다르게 동작하는 것
    </td>
  </tr>   
</table>

자바에서는 실행 시(runtime) 발생할 수 있는 프로그램 오류를 '에러(error)'와 '예외(exception)', 두 가지로 구분한다.

에러는 메모리 부족(OutOfMemoryError)이나 스택오버플로우(StackOverflowError)와 같이 복구할 수 없는 심각한 오류이고, 예외는 발생하더라도 수습할 수 있는 비교적 덜 심각한 것이다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>에러(error)</b> &nbsp;&nbsp;&nbsp;&nbsp; 프로그램 코드에 의해서 수습될 수 없는 심한 오류<br/>
      <b>예외(exception)</b> &nbsp;&nbsp;&nbsp;&nbsp; 프로그램 코드에 의해서 수습될 수 있는 다소 미약한 오류
    </td>
  </tr>   
</table>

### 1.2 예외 클래스의 계층구조

실행 시 발생할 수 있는 오류를 클래스로 정의하였다. `Exception`과 `Error`클래스 역시 `Object`클래스의 자손들이다.

모든 예외의 최고 조상은 `Exception`클래스이며 예외 클래스들은 두 그룹으로 나눠질 수 있다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      &#10112; Exception클래스와 그 자손들<br/>
      &#10113; RuntimeException클래스와 그 자손들
    </td>
  </tr>   
</table>

`RuntimeException`클래스들은 주로 프로그래머의 실수에 의해서 발생될 수 있는 예외들이다.

`Exception`클래스들은 주로 외부의 영향으로 발생할 수 있는 것들로서, 사용자들의 동작에 의해서 발생하는 경우가 많다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>Exception클래스들</b> &nbsp;&nbsp;&nbsp;&nbsp; 사용자의 실수와 같은 외적인 요인에 의해 발생하는 예외<br/>
      <b>RuntimeException클래스들</b> &nbsp;&nbsp;&nbsp;&nbsp; 프로그래머의 실수로 발생하는 예외
    </td>
  </tr>   
</table>

### 1.3 예외처리하기 - try-catch문

에러는 어쩔 수 없지만, 예외는 프로그래머가 미리 처리해 두어야 한다.

예외처리(exception handling)란, 프로그램 실행 시 발생할 수 있는 예외의 발생에 대비한 코드를 작성하여 정상적인 실행상태를 유지하는 것이 목적이다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>예외처리(exception handling)</b><br/>
      <b>정의</b> &nbsp;&nbsp; - &nbsp;&nbsp; 프로그램 실행 시 발생할 수 있는 예외에 대비한 코드를 작성하는 것<br/>
      <b>목적</b> &nbsp;&nbsp; - &nbsp;&nbsp; 프로그램의 비정상 종료를 막고, 정상적인 실행상태를 유지하는 것
    </td>
  </tr>   
</table>

<span style="font-size:13px;">
<b>| 참고 | 에러와 예외는 모두 실행 시(runtime) 발생하는 오류이다.</b><br/>
</span>  

처리되지 못한 예외(uncaught exception)는 JVM의 '예외처리기(UncaughtExceptionHandler)'가 받아서 예외의 원인을 출력한다.

예외를 처리하기 위해서 `try-catch`문을 사용한다.

```java
  try {
    // 예외가 발생할 가능성이 있는 문장
  } catch (Exception e1) {
    // Exception이 발생했을 경우
  } catch (Exception e2) {
    // Exception이 발생했을 경우
  } catch (Exception eN) {
    // Exception이 발생했을 경우
  }
```

발생한 예외의 종류와 일치하는 `catch`블럭이 없으면 예외는 처리되지 않는다.

<span style="font-size:13px;">
<b>| 참고 | try블럭이나 catch블럭 내에 포함된 문장이 하나뿐이어도 괄호를 생략할 수 없다.</b><br/>
</span>  

`try-catch`문 내에 또 다른 `try-catch`문을 사용할 수 있다. `catch`블럭의 괄호 내에 선언된 변수는 `catch`블럭 내에서만 유효하기 때문에, 모든 `catch`블럭에 같은 이름의 참조변수를 사용해도 된다. 하지만 `catch`블럭 내에 `try-catch`문이 포함된 경우, 참조변수의 영역이 겹치므로 다른 이름을 사용해서 구별해야한다.

### 1.4 try-catch문에서의 흐름

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>&#9654; try블럭 내에서 예외가 발생한 경우</b><br/>
      1. 발생한 예외와 일치하는 catch블럭이 있는지 확인한다.<br/>
      2. 일치하는 catch블럭을 찾게 되면, 그 catch블럭 내의 문장들을 수행하고 전체 try-catch문을 빠져나가서 그 다음 문장을 계속해서 수행한다. 만일 일치하는 catch블럭을 찾지 못하면, 예외는 처리되지 못한다.<br/><br/>
      <b>&#9654; try블럭 내에서 예외가 발생하지 않은 경우</b><br/>
      1. catch블럭을 거치지 않고 전체 try-catch문을 빠져나가서 수행을 계속한다.
    </td>
  </tr>   
</table>

### 1.5 예외의 발생과 catch블럭

catch블럭은 괄호와 블럭 두 부분으로 나눠져 있는데, 괄호 내에는 처리하고자 하는 예외와 같은 타입의 참조변수 하나를 선언해야한다.

예외가 발생하면, 발생한 예외에 해당하는 클래스의 인스턴스가 만들어진다. 예외가 발생한 문장이 `try`블럭에 포함되어 있다면, 이 예외를 처리할 수 있는 `catch`블럭이 있는지 찾는다.

첫 번째부터 차례로 내려가면서 괄호 내에 선언된 참조변수의 종류와 생성된 예외클래스의 인스턴스에 `instanceof`연산자를 이용해서 검사결과가 `true`인 `catch`블럭을 만날 때까지 검사한다. `true`인 블럭을 찾게 되면 블럭에 있는 문장들을 수행한 후 `try-catch`문을 빠져나가고 예외는 처리되지만, 없으면 예외는 처리되지 않는다.

모든 예외 클래스는 `Exception`클래스의 자손이므로, `catch`블럭의 괄호에 `Exception`클래스 타입의 참조변수를 선언해 놓으면 어떤 종류의 예외가 발생하더라도 이 `catch`블럭에 의해서 처리된다.

<p style="color:#a0adec"><b>printStackTrace()와 getMessage()</b></p>

예외가 발생했을 때 생성되는 예외 클래스의 인스턴스에는 발생한 예외에 대한 정보가 담겨져 있으며, `printStackTrace()`와 `getMessage()`를 통해서 이 정보들을 얻을 수 있다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>printStackTrace()</b> &nbsp;&nbsp;&nbsp;&nbsp; 예외발생 당시의 호출스택(Call Stack)에 있었던 메서드의 정보와 예외 메시지를 화면에 출력한다.<br/>
      <b>getMessage()</b> &nbsp;&nbsp;&nbsp;&nbsp; 발생한 예외클래스의 인스턴스에 저장된 메시지를 얻을 수 있다.
    </td>
  </tr>   
</table>

<p style="color:#a0adec"><b>멀티 catch블럭</b></p>

JDK1.7부터 catch블럭을 `|`기호를 이용해서, 하나의 catch블럭으로 합칠 수 있게 되었으며, 이를 '멀티 catch블럭'이라 한다. `|`기호로 연결할 수 있는 예외 클래스의 개수에는 제한이 없다.

```java
  try {
    ...
  } catch (ExceptionA e) {
    e.printStackTrace();
  } catch (ExceptionB e2) {
    e2.printStackTrace();
  }
```

위 코드를 아래와 같이 바꿀 수 있다.

```java
  try {
    ...
  } catch (ExceptionA | ExceptionB e) {
    e.printStackTrace();
  }
```

연결된 예외 클래스가 조상과 자손의 관계에 있다면 컴파일 에러가 발생한다. 그냥 조상 클래스만 써주는 것과 같기 때문에 불필요한 코드를 제거하라는 에러가 발생하는 것이다.

### 1.6 메서드에 예외 선언하기

메서드에 예외를 선언하려면, 메서드의 선언부에 키워드 `throws`를 사용해 메서드 내에서 발생할 수 잇는 예외를 적어주면 된다. 여러 개일 경우에는 쉼표로 구분한다.

```java
  void method() throws Exception1, Exception2, ... ExceptionN {
    // 메서드 내용
  }
```

모든 예외의 최고조상인 `Exception`클래스를 선언하면, 이 메서드는 모든 종류의 예외가 발생할 가능성이 있다는 뜻이다. 이럴 경우 자손타입의 예외까지 발생할 수 있다는 점에 주의해야 한다.

예외를 메서드의 `throws`에 명시하는 것은 예외를 처리하는 것이 아니라, 자신(예외가 발생할 가능성이 있는 메서드)을 호출한 메서드에게 예외를 전달하여 예외처리를 떠맡기는 것이다. 결국 어느 한 곳에서는 `try-catch`문으로 예외처리를 해주어야 한다.

### 1.7 finally 블럭

finally 블럭은 `try-catch`문과 함께 예외의 발생여부에 상관없이 실행되어야할 코드를 포함시킬 목적으로 사용된다.

```java
  try {
    // 예외 발생 가능성이 있는 문장
  } catch(Exception e) {
    // 예외처리를 위한 문장
  } finally {
    // 예외 발생여부에 관계없이 항상 수행되어야하는 문장
    // try-catch문의 맨 마지막에 위치해야한다
  }
```

[위로](#예외처리-exception-handling)
