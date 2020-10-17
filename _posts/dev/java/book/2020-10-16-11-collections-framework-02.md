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

`Iterator`의 `remove()`는 단독으로 쓰일 수 없고, `next()`와 같이 써야한다. 특정위치의 요소를 삭제하는 것이 아니라 읽어 온 것을 삭제한다. `next()`의 호출없이 `remove()`를 호출하면, `IllegalStateException`이 발생한다.

### 1.6 Arrays

`Arrays`클래스에는 배열을 다루는데 유용한 메서드가 정의되어 있다. 메서드는 모두 static 메서드이다.

<p style="color:#a0adec"><b>배열의 복사 - copy(), copyOfRange()</b></p>

`copyOf()`는 배열 전체를, `copyOfRange()`는 배열의 일부를 복사해서 새로운 배열을 만들어 반환한다. 단, `copyOfRange()`에 지정된 범위의 끝은 포함되지 않는다.

```JAVA
  int[] arr = {0, 1, 2, 3, 4};
  int[] arr2 = Arrays.copyOf(arr, arr.length); // arr2 = [0, 1, 2, 3, 4]
  int[] arr3 = Arrays.copyOf(arr, 3); // arr3 = [0, 1, 2]
  int[] arr4 = Arrays.copyOf(arr, 7); // arr4 = [0, 1, 2, 3, 4, 0, 0]
  int[] arr5 = Arrays.copyOfRange(arr, 2, 4) // arr5 = [2, 3]
  int[] arr6 = Arrays.copyOfRange(arr, 0, 7) // arr6 = [0, 1, 2, 3, 4, 0, 0]
```

<p style="color:#a0adec"><b>배열 채우기 - fill(), setAll()</b></p>

`fill()`은 배열의 모든 요소를 지정된 값으로 채운다. `setAll()`은 배열을 채우는데 사용할 함수형 인터페이스를 매개변수로 받는다. 이 메서드를 호출할 때는 함수형 인터페이스를 구현한 객체를 매개변수로 지정하던가 아니면 람다식을 지정해야한다.

```JAVA
  int[] arr = new int[5];
  Arrays.fill(arr, 9); // arr = [9, 9, 9, 9, 9]
  Arrays.setAll(arr, () -> (int)(Math.random() * 5) + 1;
```

위 코드에서 `i -> (int)(Math.random() * 5) + 1`은 '람다식(lambda expression)'으로, 1 ~ 5의 범위에 속한 임의의 정수를 반환하는 일을 한다. `setAll()`메서드는 람다식이 반환한 임의의 정수로 배열을 채운다.

<p style="color:#a0adec"><b>배열의 정렬과 검색 - sort(), binarySearch()</b></p>

`sort()`는 배열을 정렬할 때, `binarySearch()`는 배열에 저장된 요소를 검색할 때 사용한다. `binarySearch()`는 배열에서 지정된 값이 저장된 위치(index)를 찾아서 반환하는데, 반드시 배열이 정렬된 상태이어야 올바른 결과를 얻을 수 있다. 만일 검색한 값과 일치한 요소가 여러 개라면, 어느 위치가 반환될지는 알 수 없다.

```JAVA
  int[] arr = {3, 2, 0, 1, 4};
  int idx = Arrays.binarySearch(arr, 2); // 잘못된 결과가 나온다.

  Arrays.sort(arr);
  System.out.println(Arrays.toString(arr)); // [0, 1, 2, 3, 4]
  int idx = Arrays.binarySearch(arr, 2); // idx = 2
```

배열을 처음부터 순서대로 하나씩 검사하는 것을 '순차 검색(linear search)'이라 하는데, 이 방법은 배열이 정렬되어 있을 필요는 없지만 하나씩 비교하기 때문에 시간이 많이 걸린다. 반면에 '이진 검색(binary search)'은 검색 범위를 절반씩 줄여가면서 검색하기 때문에 속도가 빠르다. 단, 배열이 정렬되었을 때만 사용할 수 있다는 단점이 있다.

<p style="color:#a0adec"><b>문자열의 비교와 출력 - equals(), toString()</b></p>
