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
