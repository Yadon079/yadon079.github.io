---
layout: post
date: 2020-10-16 17:28:00
title: "컬렉션 프레임웍 2편"
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

[이전 편](/2020/java/11-collections-framework-02)

### 1.5 Iterator, ListIterator, Enumeration

`Iterator`, `ListIterator`, `Enumeration`은 모두 컬렉션에 저장된 요소를 접근하는데 사용되는 인터페이스이다. `Enumeration`은 `Iterator`의 구버전이며, `ListIterator`는 `Iterator`의 기능을 향상시킨 것이다.

<p style="color:#a0adec"><b>Iterator</b></p>

컬렉션 프레임웍에서는 컬렉션에 저장된 요소들을 읽어오는 방법을 표준화하였다. 컬렉션에 저장된 각 요소에 접근하는 기능을 가진 `Iterator` 인터페이스를 정의하고, `Collection` 인터페이스에는 Iterator(`Iterator`를 구현한 클래스의 인스턴스)를 반환하는 `iterator()`를 정의하고 있다.

```JAVA
  public interface Iterator {
    boolean hasNext();
    Object next();
    void remove();
  }

  public interface Collection {
    ...
    public Iterator iterator();
    ...
  }
```

`iterator()`는 Collection 인터페이스에 정의된 메서드이므로 Collection 인터페이스의 자손인 `List`와 `Set`에도 포함되어 있다. 그래서 List나 Set 인터페이스를 구현하는 컬렉션은 `iterator()`가 각 컬렉션의 특징에 알맞게 작성되어 있다.

`ArrayList`에 저장된 요소들을 출력하기 위한 코드는 다음과 같다. `ArrayList` 대신 List 인터페이스를 구현한 다른 컬렉션 클래스에 대해서도 이와 동일한 코드를 사용할 수 있다.

```JAVA
  List list = new ArrayList(); // 다른 컬렉션으로 변경할 때는 이 부분만 고치면 된다.
  Iterator it = list.iterator();

  while(it.hasNext()) {
    System.out.println(it.next());
  }
```

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>참조변수의 타입을 List타입으로 한 이유</b><br/>
      List에 없고 ArrayList에만 있는 메서드를 사용하는 게 아니라면, List타입의 참조변수로 선언하는 것이 좋다. 만일 List 인터페이스를 구현한 다른 클래스로 바꿔야 한다면 선언문 하나만 변경하면 나머지 코드는 검토하지 않아도 된다. 참조변수의 타입이 List이므로 List에 정의되지 않은 메서드는 사용되지 않았을 것이 확실하기 때문이다. 그러나 참조변수의 타입을 ArrayList로 했다면, List에 정의되지 않은 메서드를 호출했을 수 있기때문에 선언문 이후의 문장들을 검토해야 합니다.
    </td>
  </tr>   
</table>

`Map` 인터페이스를 구현한 컬렉션 클래스는 키(key)와 값(value)을 쌍(pair)으로 저장하고 있기 때문에 `iterator()`를 직접 호출할 수 없고, `keySet()`이나 `entrySet()`과 같은 메서드를 통해서 각각 따로 Set의 형태로 얻어온 후에 호출해야 Iterator를 얻을 수 있다.

```JAVA
  Map map = new HashMap();
    ...
  Iterator it = map.keySet().iterator();
```

`Iterator list = map.entrySet().iterator();`는 아래 두 문장을 하나로 합친 것이라고 이해하면 된다.

```JAVA
  Set eSet = map.entrySet();
  Iterator list = eSet.iterator();
```

<p style="color:#a0adec"><b>ListIterator와 Enumeration</b></p>

`Enumeration`은 컬렉션 프레임웍이 만들어지기 이전에 사용하던 `Iterator`의 구버전이라고 생각하면 된다.

`ListIterator`는 `Iterator`를 상속받아서 기능을 추가한 것으로, 컬렉션의 요소에 접근할 때 `Iterator`는 단방향으로만 이동할 수 있지만 `ListIterator`는 양방향으로의 이동이 가능하다. 단 List 인터페이스를 구현한 컬렉션에서만 사용할 수 있다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>Enumeration</b> Iterator의 구버전<br/>
      <b>ListIterator</b> Iterator에 양방향 조회기능추가(List를 구현한 경우만 사용가능)
    </td>
  </tr>   
</table>

`Enumeration`과 `Iterator`는 메서드 이름만 다를 뿐 기능은 같고, `ListIterator`는 `Iterator`에 이전방향으로의 접근기능을 추가한 것일 뿐이다.

메서드 중에서 '선택적 기능(optional operation)'은 반드시 구현하지 않아도 된다. 예를 들어 `Iterator` 인터페이스를 구현하는 클래스에서 `remove()`는 선택적 기능이므로 구현하지 않아도 된다. 하지만 인터페이스로부터 상속받은 메서드는 추상메서드여서 메서드의 몸통(body)을 반드시 만들어주어야 하므로 다음과 같이 처리한다.

```JAVA
  public void remove() {
    throw new UnsupportedOperationException();
  }
```

예외를 던져서 구현되지 않은 기능이라는 것을 메서드를 호출하는 쪽에 알리는 것이 좋다.
