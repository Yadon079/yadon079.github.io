---
layout: post
date: 2020-10-27 10:17:00
title: "지네릭스, 열거형, 애너테이션"
description: "자바의 정석"
subject: java의 정석
category: [ java ]
tags: [ java, generics, enumeration, annotation ]
comments: true
---

# 지네릭스 열거형 애너테이션

> 이 글은 남궁성님의 [자바의 정석 3/e](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788994492032)을 기반으로 공부한 내용을 정리한 글입니다.

+ [지네릭스](#지네릭스-Generics)
+ [열거형](#열거형-enums)
+ [애너테이션](#애너테이션-annotation)

## 지네릭스 Generics

### 1.1 지네릭스란?

지네릭스는 다양한 타입의 객체들을 다루는 메서드나 컬렉션 클래스에 컴파일 시의 타입 체크(compile-time type check)를 해주는 기능이다. 객체의 타입을 컴파일 시에 체크하기 때문에 객체의 타입 안정성을 높이고 형변환의 번거로움이 줄어든다.

타입 안정성을 높인다는 것은 의도하지 않은 타입의 객체가 저장되는 것을 막고, 저장된 객체를 꺼내올 때 원래의 타입과 다른 타입으로 잘못 형변환되어 발생할 수 있는 오류를 줄여준다는 뜻이다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>지네릭스의 장점</b><br/>
      &nbsp;&nbsp;&nbsp;&nbsp; 1. 타입 안정성을 제공한다.<br/>
      &nbsp;&nbsp;&nbsp;&nbsp; 2. 타입체크와 형변환을 생략할 수 있어 코드가 간결해 진다.
    </td>
  </tr>   
</table>

### 1.2 지네릭 클래스의 선언

지네릭 타입은 클래스와 메서드에 선언할 수 있다.

```java
  class Box {
    Object item;

    void setItem(Object item) { this.item = item; }
    Object getItem() { return item; }
  }
```

위와 같은 클래스가 있을 때 지네릭 클래스로 변경하려면 클래스 옆에 `<T>`를 붙이면 된다. 그리고 `Object`를 모두 `T`로 바꾼다.

```java
  class Box<T> {
    T item;

    void setItem(T item) { this.item = item; }
    T getItem() { return item; }
  }
```

클래스 옆의 `T`를 '타입 변수(type variable)'라고 하며, 'Type'의 첫 글자에서 따온 것이다. 타입 변수는 T가 아닌 다른 것을 사용해도 된다. ArrayList\<E>의 경우, 'Element(요소)'의 첫 글자를 따서 사용했다. 타입 변수가 여러 개인 경우 콤마 ','를 구분자로 나열하면 된다. 글자만 다를 뿐 모두 '임의의 참조형 타입'을 의미한다.

지네릭 클래스가 된 클래스의 객체를 생성할 때는 참조변수와 생성자에 타입 T 대신 사용될 실제 타입을 지정해주어야 한다.

```java
  Box<String> b = new Box<String>(); // 타입 T 대신, 실제 타입을 지정
  b.setItem(new Object()); // Error. String이외의 타입 지정 불가
  b.setItem("ABC"); // OK. String타입이므로 가능
  String item = b.getItem(); // 형변환 필요없음
```

타입 T 대신 String타입을 지정해줬으므로, 지네릭 클래스 Box<T>는 다음과 같다.

```java
  class Box {
    String item;

    void setItem(String item) { this.item = item; }
    String getItem() { return item; }
  }
```

지네릭 클래스여도 예전 방식으로 객체를 생성할 수 있다. 하지만 지네릭 타입을 지정하지 않아 안전하지 않다는 경고가 발생한다. 타입 변수 T에 Object타입으로 지정하면, 타입을 지정하지 않은 것이 아닌 알고 적은 것이므로 경고는 발생하지 않는다.

<p style="color:#a0adec"><b>지네릭스의 용어</b></p>

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>Box&lt;T&gt;</b> &nbsp;&nbsp;&nbsp;&nbsp; 지네릭 클래스. 'T의 Box' 또는 'T Box'라고 읽는다.<br/>
      <b>T</b> &nbsp;&nbsp;&nbsp;&nbsp; 타입 변수 또는 타입 매개변수.(T는 타입 문자)<br/>
      <b>Box</b> &nbsp;&nbsp;&nbsp;&nbsp; 원시 타입(raw type)<br/>
    </td>
  </tr>   
</table>

타입 매개변수에 타입을 지정하는 것을 '지네릭 타입 호출'이라고 하고, 지정된 타입을 '매개변수화된 타입(parameterized type)' 혹은 '대입된 타입'이라고 한다.

<p style="color:#a0adec"><b>지네릭스의 제한</b></p>

지네릭 클래스의 객체를 생성할 때, 객체별로 다른 타입을 지정하는 것은 괜찮다. 그러나 모든 객체에 대해 동일하게 동작해야하는 static멤버에는 타입 변수 T를 사용할 수 없다. T는 인스턴스변수로 간주되기 때문이다. static멤버는 대입된 타입의 종류에 관계없이 동일한 것이어야 한다.

지네릭 타입의 배열을 생성하는 것도 허용되지 않는다. 지네릭 배열 타입의 참조변수를 선언하는 것은 가능하지만, `new T[10]`과 같이 배열을 생성하는 것은 안된다.

생성할 수 없는 이유는 new연산자 때문인데, 이 연산자는 컴파일 시점에 타입 T가 무엇인지 정확히 알아야 한다. instanceof연산자도 같은 이유로 T를 피연산자로 사용할 수 없다.

### 1.3 지네릭 클래스의 객체 생성과 사용

```java
  class Box<T> {
    ArrayList<T> list = new ArrayList<T>();

    void add(T item) { list.add(item); }
    T get(int i) { return list.get(i); }
    ArrayList<T> getList() { return list; }
    int size() { return list.size(); }
    public String toString() { return list.toString(); }
  }
```

위와 같은 지네릭 클래스가 정의되어 있을 때, 이 Box\<T>의 객체에는 한 가지 종류, T타입의 객체만 저장할 수 있다.

Box\<T>의 객체를 생성할 때, 참조변수와 생성자에 대입된 타입(매개변수화된 타입)이 일치해야 한다. 일치하지 않으면 에러가 발생한다. 두 타입이 상속관계에 있어도 마찬가지이다. 단, 두 지네릭 클래스 타입이 상속관계에 있고, 대입된 타입이 같은 것은 괜찮다.

### 1.4 제한된 지네릭 클래스

타입 문자로 사용할 타입을 명시하면 한 종류의 타입만 저장할 수 있도록 제한할 수 있지만, 여전히 모든 종류의 타입을 지정할 수 있다.

타입 매개변수 T에 지정할 수 있는 타입의 종류를 제한할 수 있는 방법은 지네릭 타입에 'extends'를 사용하면, 특정 타입의 자손들만 대입할 수 있게 제한할 수 있다.

다형성에서 조상타입의 참조변수로 자손타입의 객체를 가리킬 수 있는 것처럼, 매개변수화된 타입의 자손 타입도 가능한 것이다. 타입 매개변수 T에 Object를 대입하면, 모든 종류의 객체를 저장할 수 있게 된다.

클래스가 아니라 인터페이스를 구현해야 한다는 제약에도 'extends'를 사용한다. 'implements'를 사용하지 않는 다는 점을 주의해야 한다.

클래스의 자손이면서 인터페이스도 구현해야한다면 '&' 기호로 연결하면 된다.

```java
  class Example<T extends classname & interfacename> { ... }
```

### 1.5 와일드 카드

지네릭 클래스가 아닌 클래스에 static 메서드의 매개변수로 특정 타입을 지정해줬을 때, 지네릭 타입을 특정 타입으로 고정해 놓으면 다른 타입의 객체가 메서드의 매개변수가 될 수 없으므로 여러 가지 타입의 매개변수를 갖는 메서드를 만들어야 한다.

그러나 이와 같이 오버로딩하면, 컴파일 에러가 발생한다. <b>지네릭 타입이 다른 것만으로는 오버로딩이 성립하지 않기 때문이다.</b> 지네릭 타입은 컴파일러가 컴파일할 때만 사용하고 제거해버린다. 따라서 위 설명과 같은 경우에 메서드들은 오버로딩이 아니라 '메서드 중복 정의'가 된다.

이럴 때 사용하기 위해 고안된 것이 '와일드 카드'이다. 와일드 카드는 기호 `?`로 표현하며, 어떠한 타입도 될 수 있다.

`?`만으로는 Object타입과 다를 게 없으므로, 다음과 같이 상한(upper bound)과 하한(lower bound)을 제한할 수 있다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b> &lt; ? extends T &gt; </b> &nbsp;&nbsp;&nbsp;&nbsp; 와일드 카드의 상한 제한. T와 그 자손들만 가능<br/>
      <b> &lt; ? super T &gt; </b> &nbsp;&nbsp;&nbsp;&nbsp; 와일드 카드의 하한 제한. T와 그 조상들만 가능<br/>
      <b> &lt; ? &gt; </b> &nbsp;&nbsp;&nbsp;&nbsp; 제한 없음. 모든 타입이 가능. &#60; ? extends Object &#62; 와 동일(raw type)
    </td>
  </tr>   
</table>

<span style="font-size:13px;">
<b>| 참고 | 지네릭 클래스와 달리 와일드 카드에는 '&'를 사용할 수 없다.</b><br/>
</span>  

### 1.6 지네릭 메서드

메서드의 선언부에 지네릭 타입이 선언된 메서드를 지네릭 메서드라 한다. `Collections.sort()`는 지네릭 메서드이며, 지네릭 타입의 선언 위치는 반환 타입 바로 앞이다.

```java
  static <T> void sort(List<T> list, Comparator<? super T> c)
```

지네릭 클래스에 정의된 타입 매개변수와 지네릭 메서드에 정의된 타입 매개변수는 별개의 것이다. 같은 타입 문자 T를 사용해도 같은 것이 아니다.

<span style="font-size:13px;">
<b>| 참고 | 지네릭 메서드는 지네릭 클래스가 아닌 클래스에도 정의될 수 있다.</b><br/>
</span>  

```java
  class GenericClass<T> {
      ...
    static <T> void sort(List<T> list, Comparator<? super T> c) {
      ...
    }
  }
```

위 코드에서 지네릭 클래스에 선언된 타입 매개변수 T와 지네릭 메서드 sort()에 선언된 타입 매개변수 T는 타입 문자만 같고 서로 다른 것이다. sort()가 static메서드이므로 타입 매개변수를 사용할 수 없지만, 메서드에 지네릭 타입을 선언하고 사용하는 것은 가능하다.

메서드에 선언된 지네릭 타입은 지역 변수를 선언한 것과 같다고 생각하면 된다. 이 타입 매개변수는 메서드 내에서만 지역적으로 사용될 것이므로 메서드가 static이건 아니건 상관이 없다.

<span style="font-size:13px;">
<b>| 참고 | 같은 이유로 내부 클래스에 선언된 타입 문자가 외부 클래스의 타입 문자와 같아도 구별될 수 있다.</b><br/>
</span>  

지네릭 메서드를 호출할 때는 타입 변수에 타입을 대입해야 한다.

```java
  GenericClass<Exam> genericClass = new GenericClass<Exam>();
    ...
  System.out.println(Example.<Exam>genericMethod(genericClass));
```

대부분의 경우 컴파일러가 타입을 추정할 수 있기 때문에 생략할 수 있다.

```java
  System.out.println(Example.genericMethod(genericClass)); // 대입된 타입 생략
```

주의해야 할 점은 지네릭 메서드를 호출할 때, 대입된 타입을 생략할 수 없는 경우에는 참조변수나 클래스 이름을 생략할 수 없다.

```java
  System.out.println(<Exam>genericMethod(genericClass)); // Error. 클래스 이름 생략불가
  System.out.println(this.<Exam>genericMethod(genericClass)); // OK
  System.out.println(Example.<Exam>genericMethod(genericClass)); // OK
```

같은 클래스 내에 있는 멤버 간에는 참조변수나 클래스이름을 생략하고 메서드 이름만으로 호출이 가능하지만, 대입된 타입이 있을 때는 반드시 써줘야 한다.

<p style="color:#a0adec"><b>복잡하게 선언된 지네릭 메서드 예시</b></p>

Collectios클래스의 sort()인데 매개변수가 하나인 것이 있다.

```java
  public static <T extends Comparable<? super T>> void sort(List<T> list)
```

매개변수로 지정한 List\<T>를 정렬하는 것인데 메서드에 선언된 지네릭 타입이 복잡하다. 이럴 때는 와일드 카드를 걷어낸다.

```java
  public static <T extends Comparable<T>> void sort(List<T> list)
```

List\<T>의 요소가 Comparable인터페이스를 구현한 것이어야 한다는 뜻이다. 인터페이스라고 해서 'implements'를 사용하진 않는다.

정리하면, '타입 T를 요소로 하는 List'를 매개변수로 허용하고, 'T'는 Comparable을 구현한 클래스이어야 하며(\<T extends Comparable>), 'T' 또는 그 조상의 타입을 비교하는 Comparable이어야한다는 것(Comparable\<? super T>)을 의미한다. 예를 들어, T가 Student이고, Person의 자손이라면, \<? super T>는 Student, Person, Object가 모두 가능하다.

### 1.7 지네릭 타입의 형변환
