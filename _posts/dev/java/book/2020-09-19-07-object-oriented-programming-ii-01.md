---
layout: post
date: 2020-09-19 17:19:00
title: "객체지향 프로그래밍 II 1편"
description: "자바의 정석"
subject: java의 정석
category: [ java ]
tags: [ java, modifier, class]
comments: true
---

# 객체지향 프로그래밍 II

> 이 글은 남궁성님의 [자바의 정석 3/e](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788994492032)을 기반으로 공부한 내용을 정리한 글입니다.

+ [상속](#상속-inheritance)
+ [오버라이딩](#오버라이딩-overriding)
+ [package와 import](#package와-import)
+ [제어자](#제어자-modifier)

## 상속 inheritance

### 1.1 상속의 정의와 장점

상속이란, 기존의 클래스를 재사용하여 새로운 클래스를 작성하는 것이다. 상속을 통해서 클래스를 작성하면 보다 적은 양의 코드로 새로운 클래스를 작성할 수 있고 코드를 공통적으로 관리할 수 있기 때문에 코드의 추가 및 변경이 매우 용이하다.

상속을 구현하려면 새로 작성하고자 하는 클래스의 이름 뒤에 상속받고자 하는 클래스의 이름을 키워드 `extends`와 함께 써주면 된다.

```java
  class Child extends Parent {
    ...
  }
```

이 두 클래스는 서로 상속 관계에 있다고 하며, 상속해주는 클래스를 '조상 클래스'라 하고 상속 받는 클래스를 '자손 클래스'라 한다.

<b>조상 클래스</b> 부모(parent)클래스, 상위(super)클래스, 기반(base)클래스      
<b>자손 클래스</b> 자식(child)클래스, 하위(sub)클래스, 파생(derived)클래스   

![01](/assets/img/cs/inheritance.png)

서로 상속관계에 있는 두 클래스를 나타낸 그림이다. 이와 같이 클래스 간의 상속관계를 그림으로 표현한 것을 상속계층도(class hierarchy)라고 한다.

자손 클래스는 조상 클래스의 모든 멤버를 상속받기 때문에, Child클래스는 Parent클래스의 멤버들을 포함한다고 할 수 있다.

![02](/assets/img/cs/inheritance2.png)

만일 Parent클래스에 `age`라는 정수형 변수를 멤버변수로 추가하면, Child클래스는 자동적으로 age라는 멤버변수가 추가된 것과 같은 효과를 얻는다. 반면에 Child클래스에 `play()`라는 메서드를 추가해도 Parent클래스는 아무런 영향을 받지 않는다.

자손 클래스는 조상 클래스의 모든 멤버를 상속받으므로 항상 조상 클래스보다 같거나 많은 멤버를 갖는다. 즉, 상속에 상속을 거듭할수록 상속받는 클래스의 멤버 개수는 점점 늘어난다. 그래서 상속을 받는 것은 조상 클래스를 확장(extend)한다는 의미로 해석할 수도 있으며 키워드 `extends`를 쓰는 이유이다.

<b>- 생성자와 초기화 블럭은 상속되지 않는다. 멤버만 상속된다.</b>   
<b>- 자손 클래스의 멤버 개수는 조상 클래스보다 항상 같거나 많다.</b>   

<span style="font-size:13px;">
<b>| 참고 | 접근 제어자(access modifier)가 private 또는 default인 멤버들은 상속은 받지만 자손 클래스로부터의 접근이 제한된다.</b><br/>
</span>

여러 개의 자손(child) 클래스가 공통의 조상(parent) 클래스로부터 상속을 받을 수도 있다. 하지만 자손 클래스끼리는 아무런 관계가 없다. 자손의 자손(grandChild)클래스는 여전히 조상(parent) 클래스로부터 영향을 받고 자손(child) 클래스와는 직접 조상이고 조상(parent) 클래스와는 간접 조상이된다.

자손 클래스의 인스턴스를 생성하면 조상 클래스의 멤버도 함께 생성되기 때문에 따로 조상 클래스의 인스턴스를 생성하지 않고도 조상 클래스의 멤버들을 사용할 수 있다. 즉, <b>자손 클래스의 인스턴스를 생성하면 조상 클래스의 멤버와 자손 클래스의 멤버가 합쳐진 하나의 인스턴스로 생성된다.</b>

```java
  class Tv {
    boolean power;
    int channel;

    void power() { power = !power; }
    void channelUp() { ++channel; }
    void channelDown() { --channel; }
  }

  class CaptionTv extends Tv {
    boolean caption;
    void displayCaption(String text) {
      if(caption) {
        System.out.println(text);
      }
    }
  }

  class CaptionTvTest {
    public static void main(String[] args) {
      CaptionTv ctv = new CaptionTv();

      ctv.channel = 6;
      ctv.channelUp();
      System.out.println(ctv.channel);

      ctv.displayCaption("KBS 2TV");
      ctv.caption = true;
      ctv.displayCaption("KBS 2TV");
    }
  }
```

멤버변수 `caption`은 캡션기능의 상태를 저장하기 위한 `boolean`형 변수이고, `displayCaption(String text)`은 매개변수로 넘겨받은 문자열(text)을 캡션이 켜져 있는 경우에만 화면에 출력한다.

### 1.2 클래스간의 관계 - 포함관계

클래스 간의 포함(Composite)관계를 맺어 주는 것은 한 클래스의 멤버변수로 다른 클래스 타입의 참조변수를 선언하는 것이다.

```java
  class Circle {
    int x;
    int y;
    int r;
  }
```

```java
  class Point {
    int x;
    int y;
  }
```

원을 나타내는 Circle 클래스와 한 점을 나타내는 Point 클래스가 있다고 할 때, Point 클래스를 재사용해서 Circle 클래스를 작성하면 다음과 같다.

```java
  class Circle {
    Point c = new Point();
    int r;
  }
```

한 클래스를 작성하는데 다른 클래스를 멤버변수로 선언하여 포함시키는 것은 좋은 방법이다. 하나의 거대한 클래스보다 단위별로 여러 개의 클래스를 작성하여 포함관계로 재사용하는 것이 간결하고 손쉽기 때문이다.

### 1.3 클래스간의 관계 결정하기

클래스를 상속관계를 맺어 줄 것인지 포함관계를 맺어 줄 것인지 결정하는 것은 때때로 혼란스럽다. 그럴 때는 문장을 만들어보면 보다 명확해 진다.

<table style="width:100%; background-color:#3a3c42; border:0">
  <tr style="border:0">
    <td style="border:0; padding:10px">
      원(Circle)은 점(Point)<b>이다.</b> - Circle <b>is a</b> Point.<br/>
      원(Circle)은 점(Point)을 <b>가지고 있다.</b> - Circle <b>has a</b> Point.<br/>
    </td>
  </tr>   
</table>

<br/>

원은 원점과 반지름으로 구성되므로 두 번째 문장이 자연스럽다는 것을 알 수 있다. 이처럼 클래스를 가지고 문장을 만들었을 때 '~은 ~이다.'라는 문장이 성립하면 상속관계, '~은 ~을 가지고 있다.'는 문장이 성립하면 포함관계를 맺어 주면 된다. 물론 항상 딱 맞게 떨어지는 것은 아니지만 기본적인 원칙에 대한 감은 잡을 수 있다.

### 1.4 Object 클래스 - 모든 클래스의 조상

Object클래스는 모든 클래스 상속계층도의 최상위에 있는 조상클래스이다. 다른 클래스로부터 상속 받지 않는 모든 클래스들은 자동적으로 Object클래스로부터 상속받는다. 상속을 받지 않는 클래스가 정의되면 컴파일러는 자동적으로 `extends Object`를 추가하여 Object 클래스로부터 상속받도록 한다.

[위로](#객체지향-프로그래밍-ii)

## 오버라이딩 overriding

### 2.1 오버라이딩이란?

조상 클래스로부터 상속받은 메서드의 내용을 변경하는 것을 오버라이딩이라고 한다.

### 2.2 오버라이딩의 조건

자손 클래스에서 오버라이딩하는 메서드는 조상 클래스의 메서드와   
<b>- 이름이 같아야 한다.</b>   
<b>- 매개변수가 같아야 한다.</b>   
<b>- 반환타입이 같아야 한다.</b>   

즉, 선언부가 서로 같아야 한다는 것이다.

접근제어자(access modifier)와 예외(exception)는 제한된 조건 하에서 다르게 변경할 수 있다.

1. <b>접근 제어자는 조상 클래스의 메서드보다 좁은 범위로 변경 할 수 없다.</b>
만일 조상 클래스에 정의된 메서드의 접근 제어자가 protected라면, 이를 오버라이딩하는 자손 클래스의 메서드는 접근 제어자가 protected나 public이어야 한다. 대부분의 경우 같은 범위의 접근 제어자를 사용한다.<br/>
2. <b>조상클래스의 메서드보다 많은 수의 예외를 선언할 수 없다.</b>
주의할 점은 `throws Exception`의 경우 `Exception`이 모든 예외의 최고 조상이므로 하나를 선언한 것처럼 보이지만 가장 많은 개수의 예외를 던질 수 있도록 선언한 것이다.
3. <b>인스턴스메서드를 static메서드로 또는 그 반대로 변경할 수 없다.</b>

### 2.3 오버로딩 vs. 오버라이딩
