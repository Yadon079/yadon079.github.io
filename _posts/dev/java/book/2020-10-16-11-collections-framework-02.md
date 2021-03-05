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

[이전 편](/2020/java/11-collections-framework-01)

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
  Arrays.setAll(arr, () -> (int)(Math.random() * 5) + 1);
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

`toString()`은 배열의 모든 요소를 문자열로 출력할 수 있다. 일차원 배열에만 사용할 수 있고, 다차원 배열에는 `deepToStirng()`을 사용해야한다. `deepToStirng()`은 배열의 모든 요소를 재귀적으로 접근해서 문자열을 구성하므로 2차원뿐만 아니라 3차원 이상의 배열에도 동작한다.

`equals()`는 두 배열에 저장된 모든 요소를 비교해서 같으면 true, 다르면 false를 반환한다. 마찬가지로 일차원 배열에만 사용가능하므로, 다차원 배열의 비교에는 `deepEquals()`를 사용해야한다.

2차원 배열을 비교할 때 `equals()`를 사용하면 배열에 저장된 내용이 같아도 false를 결과로 얻는다. 다차원 배열은 '배열의 배열'의 형태로 구성되기 때문에 문자열이 아닌 '배열에 저장된 배열의 주소'를 비교하게 된다. 서로 다른 배열은 항상 주소가 다르기 때문에 false를 얻게 되는 것이다.

<p style="color:#a0adec"><b>배열을 List로 변환 - asList(Object... a)</b></p>

`asList()`는 배열을 List에 담아서 반환한다. 매개변수의 타입이 가변인수라 배열 생성없이 저장할 요소들만 나열하는 것도 가능하다.

한 가지 주의할 점은 `asList()`가 반환한 List의 크기는 변경할 수 없다. 즉, 추가 또는 삭제가 불가능하다. 저장된 내용을 변경하는 것은 가능하다.

```JAVA
  List list = Arrays.asList(new Integer[]{1, 2, 3, 4, 5}); // list = [1, 2, 3, 4, 5]
  List list = Arrays.asList(1, 2, 3, 4, 5); // list = [1, 2, 3, 4, 5]
  list.add(6); // UnsupportedOperationException 예외 발생
```

크기를 변경할 수 있는 List가 필요하다면 다음과 같이 하면된다.

```JAVA
  List list = new ArrayList(Arrays.asList(1, 2, 3, 4, 5));
```

<p style="color:#a0adec"><b>parallelXXX(), spliterator(), stream()</b></p>

`parallel`로 시작하는 메서드들은 보다 빠른 결과를 얻기 위해 여러 쓰레드가 작업을 나누어 처리하도록 한다. `spliterator()`는 여러 쓰레드가 처리할 수 있게 하나의 작업을 여러 작업으로 나누는 `Spliterator`를 반환하며, `stream()`은 컬렉션을 스트림으로 변환한다.

### 1.7 Comparator와 Comparable

`Arrays.sort()`를 호출만 하면 컴퓨터가 배열을 자동으로 정렬하는 것처럼 보이지만, 사실은 `Comparator`클래스와 `Comparable`의 구현에 의해 정렬된 것이다. `Comparator`와 `Comparable`은 모두 인터페이스로 컬렉션을 정렬하는데 필요한 메서드를 정의하고 있다.

`Comparable`을 구현하고 있는 클래스들은 같은 타입의 인스턴스끼리 서로 비교할 수 있는 클래스들(Integer와 같은 wrapper클래스, String, Date, File 등)이며 기본적으로 오름차순, 작은 값에서부터 큰 값의 순으로 정렬되도록 구현되어 있다. 그래서 `Comparable`을 구현한 클래스는 정렬이 가능하다는 것을 의미한다.

실제 소스는 다음과 같다.

```JAVA
  public interface Comparator {
    int compare(Object o1, Object o2);
    boolean equals(Object obj);
  }

  public interface Comparable {
    public int compareTo(Object o);
  }
```

<span style="font-size:13px;">
<b>| 참고 | Comparator는 java.util 패키지에 있고, Comparable은 java.lang패키지에 있다.</b><br/>
</span>  

`compare()`와 `compareTo()`는 선언형태와 이름이 다를 뿐 두 객체를 비교한다는 같은 기능을 목적으로 고안된 것이다. 객체를 비교해서 음수, 0, 양수 중 하나를 반환하도록 구현해야 한다.

`Comparable`을 구현한 클래스들이 기본적으로 오름차순으로 정렬되어 있지만, 내림차순 또는 다른 기준에 의해서 정렬되도록 하고 싶을 때 `Comparator`를 구현해서 정렬기준을 제공할 수 있다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>Comparable</b> &nbsp;&nbsp;&nbsp;&nbsp; 기본 정렬기준을 구현하는데 사용.<br/>
      <b>Comparator</b> &nbsp;&nbsp;&nbsp;&nbsp; 기본 정렬기준 외 다른 기준으로 정렬하고자 할 때 사용.
    </td>
  </tr>   
</table>

```java
  import java.util.*;

  class ComparatorEx {
    public static void main(String[] args) {
      String[] strArr = {"cat", "Dog", "lion", "tiger"};

      Arrays.sort(strArr); // String의 Comparable구현에 의한 정렬
      System.out.println("strArr = " + Arrays.toString(strArr));

      Arrays.sort(strArr, String.CASE_INSENSITIVE_ORDER); // 대소문자 구분 안함
      System.out.println("strArr = " + Arrays.toString(strArr));

      Arrays.sort(strArr, new Descending()); // 역순 정렬
      System.out.println("strArr = " + Arrays.toString(strArr));
    }
  }

  class Descending implements Comparator {
    public int compare(Object o1, Object o2) {
      if(o1 instanceof Comparable && o2 instanceof Comparable) {
        Comparable c1 = (Comparable)o1;
        Comparable c2 = (Comparable)o2;
        return c2.compareTo(c1);
      }

      return -1;
    }
  }
```

String의 Comparable구현은 문자열이 사전 순으로 정렬되도록 작성되어 있다. 문자열의 오름차순은 공백, 숫자, 대문자, 소문자의 순으로 정렬되는 것을 의미한다. 즉, 문자의 유니코드의 순서가 작은 값에서 큰 값으로 정렬되는 것이다.

`public static final Comparator CASE_INSENSITIVE_ORDER`라는 대소문자 구분없이 비교하는 Comparator를 상수의 형태로 제공한다.

String의 기본 정렬을 반대로, 즉 내림차순으로 하는 것은 String에 구현된 `compareTo()`의 결과에 -1을 곱하거나 예제처럼 비교하는 객체의 위치를 바꿔서 `c2.compareTo(c1)`의 형태로 해도 된다.

단 `compare()`의 매개변수가 Object타입이기 때문에 `compareTo()`를 바로 호출할 수 없다. 먼저 `Comparable`로 형변환을 해야 한다.

### 1.8 HashSet

`HashSet`은 Set 인터페이스를 구현한 가장 대표적인 컬렉션이며, Set 인터페이스의 특징대로 중복된 요소를 저장하지 않는다.

새로운 요소를 추가할 때 `add`메서드나 `addAll`메서드를 사용하는데, 만일 `HashSet`에 이미 저장되어 있는 요소와 중복된 요소를 추가하고자 한다면 이 메서드들은 false를 반환해 중복된 요소라서 추가에 실패했다는 것을 알린다. 이러한 점을 이용해 컬렉션 내의 중복 요소들을 쉽게 제거할 수 있다.

`HashSet`은 저장순서를 유지하지 않으므로 저장순서를 유지하고자 한다면 `LinkedHashSet`을 사용해야한다.

```java
  import java.util.*;

  class HashSetEx {
    public static void main(String[] args) {
      Object[] objArr = {"1", new Integer(1), "2", "2", "3", "3", "4", "4", "4"};
      Set set = new HashSet();

      for(int i = 0; i < objArr.length; i++) {
        set.add(objArr[i]); // HashSet에 objArr의 요소들을 저장한다.
      }

      // HashSet에 지정된 요소들을 출력한다.
      System.out.println(set);
    }
  }
```

결과를 확인해보면 중복된 값은 저장되지 않는다. '1'이 두 번 출력되는데, 하나는 String인스턴스이고 하나는 Integer인스턴스로 서로 다른 객체이므로 중복으로 간주하지 않는다.

`Set`을 구현한 컬렉션 클래스는 List를 구현한 컬렉션 클래스와 달리 순서를 유지하지 않기 때문에 저장한 순서와 다를 수 있다. 만일 중복을 제거하는 동시에 저장한 순서를 유지하고 싶다면 `LinkedHashSet`을 사용해야한다.

### 1.9 TreeSet

`TreeSet`은 이진 검색 트리(binary search tree)라는 자료구조의 형태로 데이터를 저장하는 컬렉션 클래스이다. 이진 검색 트리는 정렬, 검색, 범위검색(range search)에 높은 성능을 보이는 자료구조이며 `TreeSet`은 이진 검색 트리의 성능을 향상시킨 '레드-블랙 트리(Red-Black tree)'로 구현되어 있다.

Set 인터페이스를 구현했으므로 <b>중복된 데이터의 저장을 허용하지 않으며 정렬된 위치에 저장하므로 저장순서를 유지하지 않는다.</b>

이진 트리(binary tree)는 링크드 리스트처럼 여러 개의 노드(node)가 서로 연결된 구조로, 각 노드에 최대 2개의 노드를 연결할 수 있으며 '루트(root)'라고 불리는 하나의 노드에서 시작해 계속 확장할 수 있다.

위 아래로 연결된 두 노드를 '부모-자식관계'에 있다고 하며 하나의 부모 노드는 최대 두 개의 자식 노드와 연결될 수 있다.

이진 검색 트리(binary search tree)는 부모노드의 왼쪽에는 부모노드의 값보다 작은 값의 자식노드를 저장, 오른쪽에는 큰 값의 자식노드를 저장하는 이진 트리이다.

첫 번째로 저장되는 값은 루트가 되고, 두 번째 값은 트리의 루트부터 시작해서 크기를 비교하면서 트리를 따라 내려간다. 이렇게 트리를 구성하면, 왼쪽 마지막 레벨이 가장 작은 값이 되고 오른쪽 마지막 레벨이 가장 큰 값이 된다.

`TreeSet`에 저장되는 객체가 `Comparable`을 구현하던가, `Comparator`를 제공해서 객체를 비교할 방법을 알려줘야 한다. 그렇지 않으면 객체를 저장할 때 예외가 발생한다.

트리는 데이터를 순차적으로 저장하는 것이 아니라 저장위치를 찾아서 저장해야하고, 삭제하는 경우 트리의 일부를 재구성해야하므로 링크드 리스트보다 데이터의 추가/삭제시간이 더 걸린다. 대신 검색과 정렬기능이 더 뛰어나다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>이진 검색 트리(binary search tree)는</b><br/>
      &nbsp;&nbsp;&nbsp;&nbsp; - 모든 노드는 최대 두 개의 자식노드를 가질 수 있다.<br/>
      &nbsp;&nbsp;&nbsp;&nbsp; - 왼쪽 자식노드의 값은 부모노드의 값보다 작고 오른쪽 자식노드의 값은 크다.<br/>
      &nbsp;&nbsp;&nbsp;&nbsp; - 노드의 추가 삭제에 시간이 걸린다.(순차적으로 저장하지 않으므로)<br/>
      &nbsp;&nbsp;&nbsp;&nbsp; - 검색(범위검색)과 정렬에 유리하다.<br/>
      &nbsp;&nbsp;&nbsp;&nbsp; - 중복된 값을 저장하지 못한다.
    </td>
  </tr>   
</table>

### 1.10 HashMap과 Hashtable

`Hashtable`과 `HashMap`의 관계는 Vector와 ArrayList의 관계와 같다.

`HashMap`은 Map을 구현했으므로 Map의 특징, 키(key)와 값(value)을 묶어서 하나의 데이터(entry)로 저장한다는 특징을 갖는다. 그리고 해싱(hashing)을 사용하기 때문에 많은 양의 데이터를 검색하는데 뛰어난 성능을 보인다.

```JAVA
  public class HashMap extends AbstractMap implements Map, Cloneable, Serializabe {
    transient Entry[] table;
      ...
    static class Entry implements Map.Entry {
      final Object key;
      Object value;
        ...
    }
  }
```

`HashMap`은 `Entry`라는 내부 클래스를 정의하고, 다시 `Entry`타입의 배열을 선언하고 있다. 키(key)와 값(value)은 별개의 값이 아니라 서로 관련된 값이기 때문에 하나의 클래스로 정의해서 하나의 배열로 다루는 것이 데이터의 무결성(integrity)적인 측면에서 더 바람직하기 때문이다.

|<center>비객체지향적인 코드|<center>객체지향적인 코드|
|:---|:---|
|Object[] key;<br/> Object[] value;|Entry[] table;<br/> class Entry {<br/> &nbsp;&nbsp;&nbsp; Object key;<br/> &nbsp;&nbsp;&nbsp; Object value;<br/>}|

<span style="font-size:13px;">
<b>| 참고 | Map.Entry는 Map인터페이스에 정의된 'static inner interface'이다.</b><br/>
</span>  

`HashMap`은 키와 값을 각각 Object타입으로 저장한다. 즉 (Object, Object)의 형태로 저장하기 때문에 어떠한 객체도 저장할 수 있지만 키는 주로 String을 대문자 또는 소문자로 통일해서 사용하곤 한다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>키(key)</b> &nbsp;&nbsp;&nbsp;&nbsp; 컬렉션 내의 키(key) 중에서 유일해야 한다.<br/>
      <b>값(value)</b> &nbsp;&nbsp;&nbsp;&nbsp; 키(key)와 달리 데이터의 중복을 허용한다.
    </td>
  </tr>   
</table>

키는 저장된 값을 찾는데 사용되는 것이기 때문에 컬렉션 내에서 유일(unique)해야 한다. 즉, `HashMap`에 저장된 데이터를 하나의 키로 검색했을 때 결과가 단 하나만 있어야 함을 뜻한다.

<p style="color:#a0adec"><b>해싱과 해시함수</b></p>

해싱이란 해시함수(hash function)를 이용해서 데이터를 해시테이블(hash table)에 저장하고 검색하는 기법을 말한다. 해시함수는 데이터가 저장되어 있는 곳을 알려주기 때문에 다량의 데이터 중에서도 원하는 데이터를 빠르게 찾을 수 있다.

해싱을 구현한 컬렉션 클래스는 `HashSet`, `HashMap`, `Hashtable` 등이 있다.

해싱에서 사용하는 자료구조는 배열과 링크드 리스트의 조합으로 되어 있다. 저장할 데이터의 키를 해시함수에 넣으면 배열의 한 요소를 얻게 되고, 다시 그 곳에 연결되어 있는 링크드 리스트에 저장하게 된다.

링크드 리스트는 검색에 불리한 자료구조이기 때문에 크기가 커질수록 검색속도가 떨어진다. 이는 하나의 서랍에 데이터의 수가 많을수록 검색에 시간이 더 걸리는 것과 같다. 배열은 배열의 크기가 커져도, 원하는 요소가 몇 번째에 있는지만 알면 공식에 의해 빠르게 원하는 값을 찾을 수 있다. 그래서 실생활과는 다르게, 하나의 서랍에 많은 데이터가 저장되어 있는 것보다 많은 서랍에 하나의 데이터만 저장되어 있는 형태가 더 빠른 검색결과를 얻는다.

하나의 링크드 리스트(서랍)에 최소한의 데이터만 저장되려면, 저장될 데이터의 크기를 고려해서 `HashMap`의 크기를 적절하게 지정해주어야하고, 해시함수가 서로 다른 키에 대해서 중복된 해시코드(서랍위치)의 반환을 최소화해야 한다.

`HashMap`과 같이 해싱을 구현한 컬렉션 클래스에서는 Object클래스에 정의된 `hashCode()`를 해시함수로 사용한다. Object클래스에 정의된 `hashCode()`는 객체의 주소를 이용하는 알고리즘으로 해시코드를 만들어 낸다.

String클래스의 경우 Object로부터 상속받은 `hashCode()`를 오버라이딩해서 문자열의 내용으로 해시코드를 만들어 낸다. 그래서 서로 다른 String 인스턴스일지라도 같은 내용의 문자열을 가졌다면 `hashCode()`를 호출하면 같은 해시코드를 얻는다.

`HashMap`에서도 서로 다른 두 객체에 대해 `equals()`로 비교한 결과가 true인 동시에 `hashCode()`의 반환값이 같아야 같은 객체로 인식한다. 이미 존재하는 키에 대한 값을 저장하면 기존의 값을 새로운 값으로 덮어쓴다. 따라서 새로운 클래스를 정의할 때 `equals()`를 오버라이딩해야 한다면 `hashCode()`도 같이 재정의해서 `equals()`의 결과가 true인 두 객체의 해시코드의 결과 값이 항상 같도록 해주어야 한다.

<span style="font-size:13px;">
<b>| 참고 | 비교한 결과가 false이고 해시코드가 같은 경우 같은 링크드 리스트에 저장된 다른 두 데이터가 된다.</b><br/>
</span>  

### 1.11 TreeMap

`TreeMap`은 이진 검색 트리의 형태로 키와 값의 쌍으로 이루어진 데이터를 저장한다. 그래서 검색과 정렬에 적합한 컬렉션 클래스이다.

검색에 관한 대부분의 경우에서 `HashMap`을 사용하는 것이 좋다. 단, 범위 검색이나 정렬이 필요한 경우에는 `TreeMap`을 사용하는 것이 좋다.

### 1.12 Properties

`Properties`는 `HashMap`의 구버전인 `Hashtable`을 상속받아 구현한 것으로, `Hashtable`은 키와 값을 (Object, Object)의 형태로 저장하는데 `Properties`는 (String, String)의 형태로 저장하는 보다 단순화된 컬렉션 클래스이다.

주로 애플리케이션의 환경설정과 관련된 속성(property)을 저장하는데 사용되며 데이터를 파일로부터 읽고 쓰는 기능을 제공한다.

### 1.13 Collections

`Collections`는 컬렉션과 관련된 메서드를 제공한다. `fill()`, `copy()`, `sort()`, `binarySearch()` 등의 메서드는 `Arrays`에 포함된 메서드와 동일한 기능을 한다.

<span style="font-size:13px;">
<b>| 참고 | java.util.Collection은 인터페이스이고, java.util.Collections은 클래스이다.</b><br/>
</span>  

<p style="color:#a0adec"><b>컬렉션의 동기화</b></p>

멀티 쓰레드(multi-thread) 프로그래밍에서는 하나의 객체를 여러 쓰레드가 동시에 접근할 수 있기 때문에 데이터의 일관성(consistency)을 유지하기 위해서는 공유되는 객체에 동기화(synchronization)가 필요하다.

`Collections` 클래스에는 동기화 메서드를 제공하고 있으므로, 동기화가 필요할 때 해당하는 것을 사용하면 된다.

```JAVA
  static Collection synchronizedCollection(Collection c)
  static List synchronizedList(List list)
  static Set synchronizedSet(Set s)
  static Map synchronizedMap(Map m)
  static SortedSet synchronizedSortedSet(SortedSet s)
  static SortedMap synchronizedSortedMap(SortedMap m)
```

다음과 같은 방법으로 사용할 수 있다.

```JAVA
  List syncList = Collections.synchronizedList(new ArrayList(...));
```

<p style="color:#a0adec"><b>변경불가 컬렉션 만들기</b></p>

컬렉션의 저장된 데이터를 보호하기 위해 읽기전용으로 만들어야할 때가 있다. 주로 여러 쓰레드가 하나의 컬렉션을 공유하다가 데이터가 손상될 수 있는데 이 때 다음과 같은 메서드들을 이용하면 된다.

```JAVA
  static Collection unmodifiableCollection(Collection c)
  static List unmodifiableList(List list)
  static Set unmodifiableSet(Set s)
  static Map unmodifiableMap(Map m)
  static NavigableSet unmodifiableNavigableSet(NavigableSet s)
  static SortedSet unmodifiableSortedSet(SortedSet s)
  static NavigableMap unmodifiableNavigableMap(NavigableMap m)
  static SortedMap unmodifiableSortedMap(SortedMap m)
```

<p style="color:#a0adec"><b>싱글톤 컬렉션 만들기</b></p>

인스턴스를 new 연산자가 아닌 메서드를 통해서만 생성할 수 있게 함으로써 생성할 수 있는 인스턴스의 개수를 제한하는 기능을 제공하는 것이 `singleton`으로 시작하는 메서드이다.

```JAVA
  static List singletonList(Object o)
  static Set singleton(Object o)
  static Map singletonMap(Object key, Object value)
```

매개변수로 저장할 요소를 지정하면, 해당 요소를 저장하는 컬렉션을 반환한다. 반환된 컬렉션은 변경할 수 없다.

<p style="color:#a0adec"><b>한 종류의 객체만 저장하는 컬렉션 만들기</b></p>

컬렉션에 모든 종류의 객체를 저장할 수 있다는 것은 장점이자 단점이다. 대부분의 경우 한 종류의 객체를 저장하며, 컬렉션에 지정된 종류의 객체만 저장하도록 제한하고 싶을 때 사용하는 메서드들은 다음과 같다.

```JAVA
  static Collection checkedCollection(Collection c, Class type)
  static List checkedList(List list, Class type)
  static Set checkedSet(Set s, Class type)
  static Map checkedMap(Map m, Class keyType, Class valueType)
  static Queue checkedQueue(Queue queue, Class type)
  static NavigableSet checkedNavigableSet(NavigableSet s, Class type)
  static SortedSet checkedSortedSet(SortedSet s, Class type)
  static NavigableMap checkedNavigableMap(NavigableMap m, Class keyType, Class valueType)
  static SortedMap checkedSortedMap(SortedMap m, Class keyType, Class valueType)
```

다음과 같이 두 번째 매개변수에 저장할 객체의 클래스를 지정하면 된다.

```JAVA
  List list = new ArrayList();
  List checkedList = checkedList(list, String.class); // String만 저장가능
  checkedList.add("abc");
```

[위로](#컬렉션-프레임웍)
