---
layout: post
date: 2020-10-14 12:02:00
title: "컬렉션 프레임웍 1편"
description: "자바의 정석"
subject: java의 정석
category: [ java ]
tags: [ java, List, Stack, Queue ]
comments: true
---

# 컬렉션 프레임웍

> 이 글은 남궁성님의 [자바의 정석 3/e](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788994492032)을 기반으로 공부한 내용을 정리한 글입니다.

+ [컬렉션 프레임웍](#컬렉션-프레임웍-Collections-Framework)

## 컬렉션 프레임웍 Collections Framework

컬렉션 프레임웍이란, '데이터 군을 저장하는 클래스들을 표준화한 설계'를 뜻한다. 컬렉션은 데이터 그룹, 프레임웍은 표준화된 프로그래밍 방식을 의미한다.

### 1.1 컬렉션 프레임웍의 핵심 인터페이스

컬렉션 프레임웍에서는 컬렉션데이터 그룹을 크게 3가지 타입이 존재한다고 인식하고 각 컬렉션을 다루는데 필요한 기능을 가진 3개의 인터페이스를 정의하였다. 그리고 인터페이스 `List`와 `Set`의 공통된 부분을 다시 뽑아서 새로운 인터페이스 `Collection`을 추가로 정의하였다.

<table>
  <tr>
    <td><center> 인터페이스 </td>
    <td><center> 특 징 </td>
  </tr>
  <tr>
    <td rowspan=2><center> List </td>
    <td> 순서가 있는 데이터의 집합. 데이터의 중복을 허용한다.<br/> 예) 대기자 명단 </td>
  </tr>
  <tr>
    <td> 구현클래스 : ArrayList, LinkedList, Stack, Vector 등 </td>
  </tr>
  <tr>
    <td rowspan=2><center> Set </td>
    <td> 순서를 유지하지 않는 데이터의 집합. 데이터의 중복을 허용하지 않는다.<br/> 예) 양의 정수집합, 소수의 집합 </td>
  </tr>
  <tr>
    <td> 구현클래스 : HashSet, TreeSet 등 </td>
  </tr>
  <tr>
    <td rowspan=2><center> Map </td>
    <td> 키(key)와 값(value)의 쌍(pair)으로 이루어진 데이터의 집합<br/> 순서는 유지되지 않으며, 키는 중복을 허용하지 않고, 값은 중복을 허용한다.<br/>  예) 우편번호, 지역번호(전화번호) </td>
  </tr>
  <tr>
    <td> 구현클래스 : HashMap, TreeMap, Hashtable, Properties 등 </td>
  </tr>
</table>
<br/>

<span style="font-size:13px;">
<b>| 참고 | 키(key)란, 데이터 집합 중에서 어떤 값(value)을 찾는데 열쇠(key)가 된다는 의미에서 붙여진 이름이다. 그래서 중복을 허용하지 않는다.</b><br/>
</span>  

컬렉션 프레임웍의 모든 컬렉션 리스트들은 `List`, `Set`, `Map` 중의 하나를 구현하고 있으며, 구현한 인터페이스의 이름이 클래스의 이름에 포함되어 있어서 이름만으로도 클래스의 특징을 쉽게 알 수 있도록 되어있다.
