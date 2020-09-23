---
layout: post
date: 2020-09-21 10:23:00
title: "객체지향 프로그래밍 II 2편"
description: "자바의 정석"
subject: java의 정석
category: [ java ]
tags: [ java, interface, class]
comments: true
---

# 객체지향 프로그래밍 II

> 이 글은 남궁성님의 [자바의 정석 3/e](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788994492032)을 기반으로 공부한 내용을 정리한 글입니다.

+ [다형성](#다형성-polymorphism)
+ [추상클래스](#추상클래스-abstract-class)
+ [인터페이스](#인터페이스-interface)
+ [내부 클래스](#내부-클래스-inner-class)

## 다형성 polymorphism

### 5.1 다형성이란?

객체지향개념에서 다형성이란 '여라 가지 형태를 가질 수 있는 능력'을 의미한다. 자바에서는 한 타입의 참조변수로 여러 타입의 객체를 참조할 수 있도록 했다. 즉, <b>조상클래스 타입의 참조변수로 자손클래스의 인스턴스를 참조할 수 있도록 하였다.</b>

인스턴스를 같은 타입의 참조변수로 참조하는 것과 조상타입의 참조변수로 참조하는 것의 차이는 사용할 수 있는 멤버의 개수 차이이다.

반대로 자손타입의 참조변수로 조상타입의 인스턴스를 참조하는 것은 허용하지 않는다. <b>참조변수가 사용할 수 있는 멤버의 개수는 인스턴스의 멤버 개수보다 같거나 적어야 한다.</b>

<span style="font-size:13px;">
<b>| 참고 | 클래스는 상속을 통해 확장은 되지만 축소는 할 수 없기때문에, 조상 인스턴스의 멤버 개수는 자손 인스턴스의 멤버 개수보다 항상 적거나 같다.</b><br/>
</span>

참조변수의 타입이 참조변수가 참조하고 있는 인스턴스에서 사용할 수 있는 멤버의 개수를 결정한다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      조상타입의 참조변수로 자손타입의 인스턴스를 참조할 수 있다.<br/>
      반대로 자손타입의 참조변수로 조상타입의 인스턴스를 참조할 수는 없다.
    </td>
  </tr>   
</table>

### 5.2 참조변수의 형변환

참조변수도 형변환이 가능하다. 단, 서로 상속관계에 있는 클래스사이에서만 가능하다.

<span style="font-size:13px;">
<b>| 참고 | 바로 윗 조상이나 자손이 아닌, 조상의 조상으로도 형변환이 가능하다. 따라서 모든 참조변수는 Object클래스 타입으로 형변환이 가능하다.</b><br/>
</span>

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      자손타입 &rarr; 조상타입(Up-casting) : <b>생략 가능</b><br/>
      자손타입 &larr; 조상타입(Down-casting) : <b>생략 불가능</b>
    </td>
  </tr>   
</table>

참조변수간의 형변환 역시 캐스트연산자를 사용하며, 괄호()안에 변환하고자 하는 타입의 이름(클래스명)을 적어주면 된다.

<b>형변환은 참조변수의 타입을 변환하는 것이지 인스턴스를 변환하는 것은 아니기 때문에 참조변수의 형변환은 인스턴스에 아무런 영향을 미치지 않는다. 형변환을 통해서, 참조하고 있는 인스턴스에서 사용할 수 있는 멤버의 범위(개수)를 조절하는 것뿐이다.</b>

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      서로 상속관계에 있는 타입간의 형변환은 양방향으로 자유롭게 수행될 수 있으나, <b>참조변수가 가리키는 인스턴스의 자손타입으로 형변환은 허용되지 않는다.</b><br/> 그래서 참조변수가 가리키는 인스턴스의 타입이 무엇인지 확인하는 것이 중요하다.
    </td>
  </tr>   
</table>

### 5.3 instanceof연산자

참조변수가 참조하고 있는 인스턴스의 실제 타입을 알아보기 위해 `instanceof`연산자를 사용한다. 주로 조건문에 사용되며 왼쪽에는 참조변수, 오른쪽에는 타입(클래스명)이 피연산자로 위치한다. 그리고 연산의 결과로 `boolean`값인 `true`와 `false` 중 하나를 반환한다.

`true`를 연산결과로 얻었다면 참조변수가 검사한 타입으로 형변환이 가능하다는 것을 뜻한다.

<span style="font-size:13px;">
<b>| 참고 | 값이 null인 참조변수에 대해 instanceof연산을 수행하면 false를 결과로 얻는다.</b><br/>
</span>

조상타입의 참조변수로는 실제 인스턴스의 멤버들을 모두 사용할 수 없기 때문에, 실제 인스턴스와 같은 타입의 참조변수로 형변환을 해야만 인스턴스의 모든 멤버들을 사용할 수 있다.

### 5.4 참조변수와 인스턴스의 연결

조상클래스에 선언된 멤버변수와 같은 이름의 인스턴스변수를 자손클래스에 중복으로 정의했을 때, 조상타입의 참조변수로 자손 인스턴스를 참조하는 경우와 자손타입의 참조변수로 자손 인스턴스를 참조하는 경우 서로 다른 결과를 얻는다.

메서드의 경우 오버라이딩한 경우에도 타입에 관계없이 항상 실제 인스턴스의 메서드(오버라이딩된 메서드)가 호출되지만, <b>멤버변수의 경우 참조변수의 타입에 따라 달라진다.</b>

<span style="font-size:13px;">
<b>| 참고 | static메서드는 static변수처럼 참조변수의 타입에 영향을 받는다. 참조변수의 타입에 영향을 받지 않는 것은 인스턴스메서드 뿐이다. 따라서 static메서드는 반드시 '클래스이름.메서드()'로 호출해야 한다.</b><br/>
</span>

멤버변수가 중복으로 정의된 경우, 조상타입의 참조변수를 사용했을 때는 조상 클래스에 선언된 멤버변수가 사용되고, 자손타입의 참조변수를 사용했을 때는 자손 클래스에 선언된 멤버변수가 사용된다.

### 5.5 매개변수의 다형성

참조변수의 다형성은 메서드의 매개변수에도 적용된다.

`PrintStream`클래스에 정의되어있는 `print(Object o)`는 매개변수로 Object타입의 변수가 선언되어 있다. Object클래스는 모든 클래스의 조상이므로 이 메서드의 매개변수로 어떤 타입의 인스턴스도 가능하므로, 이 메서드 하나로 모든 타입의 인스턴스를 처리할 수 있다. 매개변수로 `toString()`을 호출하여 문자열을 얻어서 출력한다.

```java
  public void print(Object obj) {
    write(String.valueOf(obj));
  }

  public static String valueOf(Object obj) {
    return (obj == null) ? "null" : obj.toString();
  }
```

### 5.6 여러 종류의 객체를 배열로 다루기

조상타입의 참조변수 배열을 사용하면, 공통의 조상을 가진 서로 다른 종류의 객체를 배열로 묶어서 다룰 수 있다. 또는 묶어서 다루고싶은 객체들의 상속관계를 따져서 가장 가까운 공통조상 클래스 타입의 참조변수 배열을 생성해서 객체들을 저장하면 된다.

`Vector`클래스는 내부적으로 Object타입의 배열을 가지고 있어서, 이 배열에 객체를 추가하거나 제거할 수 있게 작성되어 있다. 그리고 배열의 크기를 알아서 관리해주기 때문에 저장할 인스턴스의 개수에 신경 쓰지 않아도 된다.

```java
  public class Vector extends AbstractList
                implements List, Cloneable, java.io.Serializable {
    protected Object elementData[];
      ...
  }
```

|<center>메서드 / 생성자|<center>설 명|
|---|---|
|Vector()|10개의 객체를 저장할 수 있는 Vector인스턴스를 생성한다.<br/> 10개 이상의 인스턴스가 저장되면, 자동적으로 크기가 증가된다.|
|boolean add(Object o)|Vector에 객체를 추가한다. 추가에 성공하면 결과값으로 true, 실패하면 false를 반환한다.|
|boolean remove(Object o)|Vector에 저장되어 있는 객체를 제거한다. 제거에 성공하면 true, 실패하면 false를 반환한다.|
|boolean isEmpty()|Vector가 비어있는지 검사한다. 비어있으면 true, 비어있지 않으면 false를 반환한다.|
|Object get(int index)|지정된 위치(index)의 객체를 반환한다. 반환타입이 Object타입이므로 적절한 타입으로의 형변환이 필요하다.|
|int size()|Vector에 저장된 객체의 개수를 반환한다.|

<br/>

[위로](#객체지향-프로그래밍-ii)

## 추상클래스 abstract class

### 6.1 추상클래스란?

클래스가 설계도라면, 추상클래스는 미완성 설계도라고 볼 수 있다. 클래스가 미완성이라는 것은 멤버의 개수에 관계된 것이 아니라, 미완성 메서드(추상메서드)를 포함하고 있다는 의미이다.

추상클래스로는 인스턴스를 생성할 수 없다. 상속을 통해서 자손클래스에 의해서만 완성될 수 있다.

추상클래스는 키워드 `abstract`를 붙이면 된다. 이렇게 함으로써 이 클래스를 사용할 때, 추상메서드가 있으니 상속을 통해 구현해주어야 한다는 것을 알 수 있다.

<span style="font-size:13px;">
<b>| 참고 | 추상메서드를 포함하고 있지 않은 클래스에도 키워드 `abstract`를 붙여서 추상클래스로 지정할 수도 있다. 추상메서드가 없는 완성된 클래스도 추상클래스로 지정되면 인스턴스를 생성할 수 없다.</b><br/>
</span>

### 6.2 추상메서드(abstract method)

메서드는 선언부와 구현부(몸통)로 구성되어 있다. 선언부만 작성하고 구현부는 작성하지 않은 채로 남겨 둔 것이 추상메서드이다.

메서드의 내용이 상속받는 클래스에 따라 달라질 수 있기 때문에 조상 클래스에서는 선언부만 작성한 후 주석으로 목적을 알려주고, 실제 내용은 상속받는 클래스에서 구현하도록 비워 두는 것이다.

추상메서드 역시 키워드 `abstract`을 앞에 붙여 주고, 추상메서드는 구현부가 없으므로 괄호 { } 대신 문장의 끝을 알리는 `;`을 적어준다.

```
  /* 주석을 통해 어떤 기능을 수행할 목적으로 작성하였는지 설명한다. */
  abstract 리턴타입 메서드이름();
```

추상클래스로부터 상속받은 자손클래스는 오버라이딩을 통해 조상인 추상클래스의 추상메서드를 모두 구현해주어야 한다. 만일 조상으로부터 상속받은 추상메서드 중 하나라도 구현하지 않는다면, 자손클래스 역시 추상클래스로 지정해 주어야 한다.

메서드를 사용하는 쪽에서는 메서드가 실제로 어떻게 구현되어있는지 몰라도 메서드의 이름과 매개변수, 리턴타입, 즉 선언부만 알고 있으면 내용이 없을지라도 추상메서드를 사용하는 코드를 작성하는 것이 가능하며, 자손클래스에 구현된 완성된 메서드가 호출되도록 할 수 있다.

### 6.3 추상클래스의 작성

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>추상</b> &nbsp;&nbsp;&nbsp;&nbsp; 낱낱의 구체적 표상이나 개념에서 공통된 성질을 뽑아 이를 일반적인 개념으로 파악하는 정신 작용
    </td>
  </tr>   
</table>

상속이 자손 클래스를 만드는데 조상 클래스를 사용하는 것이라면, 추상화는 기존 클래스의 공통부분을 뽑아내서 조상 클래스를 만드는 것이다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; font-size:14px; color:white">
      <b>추상화</b> 클래스간의 공통점을 찾아내서 공통의 조상을 만드는 작업<br/>
      <b>구체화</b> 상속을 통해 클래스를 구현, 확장하는 작업
    </td>
  </tr>   
</table>

[위로](#객체지향-프로그래밍-ii)

## 인터페이스 interface

### 7.1 인터페이스란?

인터페이스는 일종의 추상클래스이다. 인터페이스는 추상클래스처럼 추상메서드를 갖지만 추상클래스보다 추상화 정도가 높아서 몸통을 갖춘 일반 메서드 또는 멤버변수를 구성원으로 가질 수 없다. 오직 추상메서드와 상수만을 멤버로 가질 수 있다.

인터페이스는 밑그림만 그려져 있는 '기본 설계도'라 할 수 있다. 그 자체만으로 사용되기 보다는 다른 클래스를 작성하는데 도움 줄 목적으로 작성된다.

### 7.2 인터페이스의 작성

클래스 작성 방법과 동일하지만 키워드로 `class` 대신 `interface`를 사용한다는 것만 다르다. `interface`에도 클래스와 같이 접근제어자로 `public` 또는 `default`를 사용할 수 있다.

```java
  interface 인터페이스이름 {
    public static final 타입 상수이름 = 값;
    public abstract 메서드이름(매개변수목록);
  }
```

인터페이스의 멤버들은 다음과 같은 제약사항이 있다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; font-size:14px; color:white">
      - 모든 멤버변수는 public static final 이어야 하며, 이를 생략할 수 있다.<br/>
      - 모든 메서드는 public abstract 이어야 하며, 이를 생략할 수 있다.
    </td>
  </tr>   
</table>

인터페이스에 정의된 모든 멤버에 예외없이 적용되기 때문에 제어자를 생략할 수 있다. 생략된 제어자는 컴파일 시 컴파일러가 자동으로 추가해준다.

### 7.3 인터페이스의 상속

인터페이스는 인터페이스로부터만 상속받을 수 있으며, 클래스와는 달리 다중상속, 즉 여러 개의 인터페이스로부터 상속을 받는 것이 가능하다.

<span style="font-size:13px;">
<b>| 참고 | 인터페이스는 클래스와 달리 Object클래스와 같은 최고 조상이 없다.</b><br/>
</span>

클래스의 상속과 마찬가지로 자손 인터페이스는 조상 인터페이스에 정의된 멤버를 모두 상속받는다.

### 7.4 인터페이스의 구현

인터페이스도 추상클래스처럼 그 자체로는 인스턴스를 생성할 수 없다. 따라서 자신에 정의된 추상메서드의 몸통을 만들어주는 클래스를 작성해야 하는데, 확장한다는 의미의 `extends` 대신 구현한다는 의미의 `implements`를 사용한다.

```java
  class 클래스이름 implements 인터페이스이름 {
    // 인터페이스에 정의된 추상메서드를 구현
  }
```

구현하는 인터페이스의 메서드 중 일부만 구현한다면, `abstract`를 붙여서 추상클래스로 선언해야 한다. 그리고 상속과 구현을 동시에 할 수 있다.
