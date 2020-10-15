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
    <td><center> 인터페이스 </center></td>
    <td><center> 특 징 </center></td>
  </tr>
  <tr>
    <td rowspan=2><center> List </center></td>
    <td> 순서가 있는 데이터의 집합. 데이터의 중복을 허용한다.<br/>
    예) 대기자 명단 </td>
  </tr>
  <tr>
    <td> 구현클래스 : ArrayList, LinkedList, Stack, Vector 등 </td>
  </tr>
  <tr>
    <td rowspan=2><center> Set </center></td>
    <td> 순서를 유지하지 않는 데이터의 집합. 데이터의 중복을 허용하지 않는다.<br/>
    예) 양의 정수집합, 소수의 집합 </td>
  </tr>
  <tr>
    <td> 구현클래스 : HashSet, TreeSet 등 </td>
  </tr>
  <tr>
    <td rowspan=2><center> Map </center></td>
    <td> 키(key)와 값(value)의 쌍(pair)으로 이루어진 데이터의 집합<br/>
     순서는 유지되지 않으며, 키는 중복을 허용하지 않고, 값은 중복을 허용한다.<br/>
     예) 우편번호, 지역번호(전화번호) </td>
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

`Vector`, `Stack`, `Hashtable`, `Properties`와 같은 클래스들은 컬렉션 프레임웍이 만들어지기 이전부터 존재하던 것이기 때문에 컬렉션 프레임웍의 명명법을 따르지 않는다. 새로 추가된 `ArrayList`나 `HashMap`을 사용하는 것이 좋다.

<p style="color:#a0adec"><b>Collection 인터페이스</b></p>

`List`와 `Set`의 조상인 `Collection`인터페이스는 컬렉션 클래스에 저장된 데이터를 읽고, 추가하고 삭제하는 등 컬렉션을 다루는데 가장 기본적인 메서드들을 정의하고 있다.

반환 타입이 boolean인 메서드들은 작업을 성공하거나 사실이면 true, 그렇지 않으면 false를 반환한다.

<p style="color:#a0adec"><b>List 인터페이스</b></p>

`List`인터페이스는 중복을 허용하면서 저장순서가 유지되는 컬렉션을 구현하는데 사용된다.

<p style="color:#a0adec"><b>Set 인터페이스</b></p>

`Set`인터페이스는 중복을 허용하지 않고 저장순서가 유지되지 않는 컬렉션 클래스를 구현하는데 사용된다. `Set`인터페이스를 구현한 클래스로는 `HashSet`, `TreeSet` 등이 있다.

<p style="color:#a0adec"><b>Map 인터페이스</b></p>

`Map`인터페이스는 키(key)와 값(value)을 하나의 쌍으로 묶어서 저장하는 컬렉션 클래스를 구현하는데 사용된다. 키는 중복될 수 없지만 값은 중복을 허용한다. 기존에 저장된 데이터와 중복된 키와 값을 저장하면 기존의 값은 없어지고 마지막에 저장된 값이 남게된다. `Map`인터페이스를 구현한 클래스로는 `Hashtable`, `HashMap`, `LinkedHashMap`, `SortedMap`, `TreeMap` 등이 있다.

<span style="font-size:13px;">
<b>| 참고 | Map이란 개념은 어떤 두 값을 연결한다는 의미에서 붙여진 이름이다.</b><br/>
</span>

`Map`인터페이스의 메서드 중 `values()`에서는 반환타입이 Collection이고, `keySet()`에서는 반환타입이 Set이다. 값은 중복을 허용하기 때문에 Collection타입으로 반환하고, 키는 중복을 허용하지 않기 때문에 Set타입으로 반환한다.

<p style="color:#a0adec"><b>Map.Entry 인터페이스</b></p>

`Map.Entry`인터페이스는 `Map`인터페이스의 내부 인터페이스이다. 인터페이스도 내부 클래스와 같이 인터페이스 안에 인터페이스를 정의하는 내부 인터페이스(inner interface)를 정의할 수 있다.

<span style="font-size:13px;">
<b>| 참고 | 각 인터페이스의 메서드는 Java API 공식문서를 참고.</b><br/>
</span>

### 1.2 ArrayList

`ArrayList`는 List인터페이스를 구현하기 때문에 데이터의 저장순서가 유지되고 중복을 허용한다는 특징을 갖는다. 기존의 `Vector`를 개선한 것으로 구현원리와 기능적인 측면에서 동일하다고 할 수 있다.

`ArrayList`는 `Object`배열을 이용해서 데이터를 순차적으로 저장한다. 배열에 순서대로 저장되며, 배열에 더 이상 저장할 공간이 없으면 더 큰 배열을 생성해서 기존 배열의 내용을 복사한 다음 저장한다.

```java
  import java.util.*;

  class ArrayListEx {
    public static void main(String[] args) {
      ArrayList list1 = new ArrayList(10);
      list1.add(new Integer(5));
      list1.add(new Integer(4));
      list1.add(new Integer(2));
      list1.add(new Integer(0));
      list1.add(new Integer(1));
      list1.add(new Integer(3));

      ArrayList list2 = new ArrayList(list1.subList(1, 4));
      print(list1, list2);

      Collection.sort(list1);
      Collection.sort(list2);
      print(list1, list2);

      System.out.println("list1.containsAll(list2) : " + list1.containsAll(list2));

      list2.add("B");
      list2.add("C");
      list2.add(3, "A");
      print(list1, list2);

      list2.set(3, "AA");
      print(list1, list2);

      System.out.println("list1.retainAll(list2) : " + list1.retainAll(list2));

      print(list1, list2);

      for(int i = list2.size() - 1; i >= 0; i--) {
        if(list1.contains(list2.get(i)))
          list2.remove(i);
      }
      print(list1, list2);
    }

    static void print(ArrayList list1, ArrayList list2) {
      System.out.println("list1 : " + list1);
      System.out.println("list2 : " + list2);
      System.out.println();
    }
  }
```

&#9660; 실행결과

```
  list1 : [5, 4, 2, 0, 1, 3]
  list2 : [4, 2, 0]

  list1 : [0, 1, 2, 3, 4, 5] // Collections.sort()로 정렬됨
  list2 : [0, 2, 4]

  list1.containsAll(list2) : true // list1이 list2의 모든 요소를 포함하고 있을 때 true
  list1 : [0, 1, 2, 3, 4, 5]
  list2 : [0, 2, 4, A, B, C] // add(Object obj)로 새로운 객체가 저장됨

  list1 : [0, 1, 2, 3, 4, 5]
  list2 : [0, 2, 4, AA, B, C] // set(int idx, Object obj)를 이용해서 객체 변경

  list1.retainAll(list2) : true // retainAll에 의해 list1에 변화가 있었으므로 true
  list1 : [0, 2, 4] // list2와 공통요소만 남기고 나머지는 삭제됨
  list2 : [0, 2, 4, AA, B, C]

  list1 : [0, 2, 4]
  list2 : [AA, B, C]
```

`ArrayList`의 기본적인 메서드를 이용해 객체를 다루는 예제이다.
