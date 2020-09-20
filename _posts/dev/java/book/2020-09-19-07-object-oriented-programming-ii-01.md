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
    <td style="border:0; padding:10px; font-size:15px">
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

<table style="width:100%; background-color:#3a3c42; border:0">
  <tr style="border:0">
    <td style="border:0; padding:10px; font-size:15px; color:white">
      <b>오버로딩(overloading)</b> 기존에 없는 새로운 메서드를 정의하는 것(new).<br/>
      <b>오버라이딩(overriding)</b> 상속받은 메서드의 내용을 변경하는 것(change, modify).<br/>
    </td>
  </tr>   
</table>

### 2.4 super

`super`는 자손 클래스에서 조상 클래스로부터 상속받은 멤버를 참조하는데 사용되는 참조변수이다. 멤버변수와 지역변수의 이름이 같을 때 `this`를 사용했다면, 상속받은 멤버와 정의된 멤버의 이름이 같을 때는 `super`로 구별할 수 있다.   

`this`와 마찬가지로 `super` 역시 `static`메서드에서는 사용할 수 없고 인스턴스 메서드에서만 사용할 수 있다.

변수만이 아니라 메서드 역시 `super`를 사용해서 호출할 수 있다. 특히 오버라이딩한 경우에 `super`를 사용한다. 조상클래스의 메서드의 내용에 추가적으로 작업을 덧붙이는 경우라면 이처럼 `super`를 사용해서 조상클래스의 메서드를 포함시키는 것이 좋다. 후에 조상클래스의 메서드가 변경되더라도 변경된 내용이 자손클래스의 메서드에 자동적으로 반영될 것이기 때문이다.

### 2.5 super() - 조상 클래스의 생성자

`super()`는 생성자이다. `this()`는 같은 클래스의 다른 생성자를 호출하는데 사용되지만, `super()`는 조상 클래스의 생성자를 호출하는데 사용된다.

자손 클래스의 인스턴스를 생성할 때 자손 클래스의 생성자에서 조상 클래스의 생성자가 첫 줄에 호출되어야 하는데, 이는 자손 클래스의 멤버가 조상 클래스의 멤버를 사용할 수도 있으므로 먼저 초기화되어 있어야 하기 때문이다.

<table style="width:100%; background-color:#3a3c42; border:0">
  <tr style="border:0">
    <td style="border:0; padding:10px; font-size:15px; color:white">
      Object 클래스를 제외한 모든 클래스의 생성자 첫 줄에 생성자, this() 또는 super(),를 호출해야 한다. 그렇지 않으면 컴파일러가 자동적으로 'super();'를 생성자의 첫 줄에 삽입한다.
    </td>
  </tr>   
</table>

<table style="width:100%; background-color:#3a3c42; border:0">
  <tr style="border:0">
    <td style="border:0; padding:10px; font-size:15px; color:white">
      <b>1. 클래스</b> - 어떤 클래스의 인스턴스를 생성할 것인가?<br/>
      <b>2. 생성자</b> - 선택한 클래스의 어떤 생성자를 이용해서 인스턴스를 생성할 것인가?<br/>
    </td>
  </tr>   
</table>

조상클래스의 멤버변수는 조상의 생성자에 의해 초기화되도록 해야 한다.

[위로](#객체지향-프로그래밍-ii)

## package와 import

### 3.1 패키지(package)

패키지란, 클래스의 묶음이다. 관련된 클래스끼리 묶어 놓음으로써 효율적으로 관리할 수 있다.

클래스의 실제 이름은 패키지명을 포함한다. `String`클래스의 패키지명을 포함한 이름은 `java.lang.String`이다. 즉, 같은 이름의 클래스일 지라도 서로 다른 패키지에 속하면 패키지명으로 구별이 가능하다.

<b>클래스가 물리적으로 하나의 클래스파일(.class)인 것과 같이 패키지는 물리적으로 하나의 디렉토리이다.</b> 그래서 어떤 패키지에 속한 클래스는 해당 디렉토리에 존재하는 클래스파일(.class)이어야 한다.

- 하나의 소스파일에는 첫 번째 문장으로 단 한 번의 패키지 선언만을 허용한다.
- 모든 클래스는 반드시 하나의 패키지에 속해야 한다.
- 패키지는 점(.)을 구분자로 하여 계층구조로 구성할 수 있다.
- 패키지는 물리적으로 클래스 파일(.class)을 포함하는 하나의 디렉토리이다.

### 3.2 패키지의 선언

```
  packgae 패키지명;
```

패키지 선언문은 반드시 소스파일에서 주석과 공백을 제외한 첫 번째 문장이어야 하며, 하나의 소스파일에 단 한번만 선언될 수 있다. 해당 소스파일에 포함된 모든 클래스나 인터페이스는 선언된 패키지에 속하게 된다.

패키지명은 대소문자 모두 허용하지만, 클래스명과 구분하기 위해 소문자로 하는 것을 원칙으로 한다.

소스파일에 자신이 속할 패키지를 지정하지 않은 클래스는 자동적으로 '이름 없는 패키지'에 속하게 된다. 즉, 패키지를 지정하지 않는 모든 클래스들은 같은 패키지에 속하는 것이다.

### 3.3 import문

클래스의 코드를 작성하기 전에 `import`문으로 사용하고자 하는 클래스의 패키지를 미리 명시해주면 소스코드에 사용되는 클래스이름에서 패키지명을 생략할 수 있다.

`import`문의 역할은 컴파일러에게 소스파일에 사용된 클래스의 패키지에 대한 정보를 제공하는 것이다.

### 3.4 import문의 선언

모든 소스파일(.java)에서 `import`문은 `package`문 다음에, 그리고 클래스 선언문 이전에 위치해야 한다. `import`문은 한 소스파일에 여러 번 선언할 수 있다.

```
  import 패키지명.클래스명;
    또는
  import 패키지명.*;
```

클래스의 이름 대신 `*`을 사용하는 것이 하위 패키지의 클래스까지 포함하는 것은 아니라는 것이다.

```
  import java.util.*;
  import java.text.*;
```
위 코드를 아래 코드처럼 바꿀 수 없다.

```
  import java.*;
```

`System`과 `String` 같은 `java.lang`패키지의 클래스들을 패키지명 없이 사용할 수 있는 이유는 모든 소스파일에는 암묵적으로 `import java.lang.*;`이 선언되어 있기 때문이다.


### 3.5 static import문

`static import`문을 사용하면 `static`멤버를 호출할 때 클래스 이름을 생략할 수 있다.

```java
  import static java.lang.Integer.*;
  import static java.lang.Math.random;
  import static java.lang.System.out;
```

위와 같이 선언했을 때,

```java
  System.out.println(Math.random());
```

코드를 아래와 같이 간략히 할 수 있다.

```java
  out.println(random());
```

[위로](#객체지향-프로그래밍-ii)

## 제어자 modifier

### 4.1 제어자란?

제어자(modifier)는 클래스, 변수 또는 메서드의 선언부에 함께 사용되어 부가적인 의미를 부여한다. 크게 접근 제어자와 그 외의 제어자로 나눌 수 있다.

<table style="width:100%; background-color:#3a3c42; border:0">
  <tr style="border:0">
    <td style="border:0; padding:10px; font-size:15px; color:white">
      <b>접근 제어자</b> public, protected, default, private<br/>
      <b>그 외</b> static, final, abstract, native, transient, synchronized, volatile, strictfp<br/>
    </td>
  </tr>   
</table>

제어자는 하나의 대상에 대해서 여러 제어자를 조합하여 사용하는 것이 가능하다. 단, 접근 제어자는 한 번에 네 가지 중 하나만 선택해서 사용할 수 있다.

### 4.2 static - 클래스의, 공통적인

`static`은 '클래스의' 또는 '공통적인'의 의미를 가지고 있다. `static`이 붙은 멤버변수와 메서드, 그리고 초기화 블럭은 인스턴스가 아닌 클래스에 관계된 것이기 때문에 인스턴스를 생성하지 않고도 사용할 수 있다.

<table style="width:100%; background-color:#3a3c42; border:0">
  <tr style="border:0">
    <td style="border:0; padding:10px; font-size:15px; color:white">
      <b>static이 사용될 수 있는 곳 - 멤버변수, 메서드, 초기화 블럭</b><br/>
    </td>
  </tr>   
</table>

|대상|<center>의미|
|:---:|:---|
|멤버변수|- 모든 인스턴스에 공통적으로 사용되는 클래스변수가 된다.<br/> - 클래스변수는 인스턴스를 생성하지 않고도 사용 가능하다.<br/> - 클래스가 메모리에 로드될 때 생성된다.|
|메서드|- 인스턴스를 생성하지 않고도 호출이 가능한 static 메서드가 된다.<br/> - static메서드 내에서는 인스턴스멤버들을 직접 사용할 수 없다.|

<span style="font-size:13px;">
<b>| 참고 | static초기화 블럭은 클래스가 메모리에 로드될 때 단 한번만 수행되며, 주로 클래스변수(static변수)를 초기화하는데 주로 사용된다.</b><br/>
</span>

### 4.3 final - 마지막의, 변경될 수 없는

`final`은 '마지막의' 또는 '변경될 수 없는'의 의미를 가지고 있으며 거의 모든 대상에 사용될 수 있다. 변수에 사용되면 값을 변경할 수 없는 상수가 되며, 메서드에 사용되면 오버라이딩을 할 수 없게 되고 클래스에 사용되면 자신을 확장하는 자손클래스를 정의하지 못하게 된다.

<table style="width:100%; background-color:#3a3c42; border:0">
  <tr style="border:0">
    <td style="border:0; padding:10px; font-size:15px; color:white">
      <b>final이 사용될 수 있는 곳 - 클래스, 메서드, 멤버변수, 지역변수</b><br/>
    </td>
  </tr>   
</table>

|대상|<center>의미|
|:---:|:---|
|클래스|변경될 수 없는 클래스, 확장될 수 없는 클래스가 된다.<br/>그래서 final로 지정된 클래스는 다른 클래ㅅ의 조상이 될 수 없다.|
|메서드|변경될 수 없는 메서드. final로 지정된 메서드는 오버라이딩을 통해 재정의 될 수 없다.|
|멤버변수<br/>지역변수| 변수 앞에 final이 붙으면, 값을 변경할 수 없는 상수가 된다.|

<br/>
<p style="color:#a0adec"><b>생성자를 이용한 final멤버 변수의 초기화</b></p>

`final`이 붙은 변수는 상수이므로 일반적으로 선언과 초기화를 동시에 하지만, 인스턴스변수의 경우 생성자에서 초기화 되도록 할 수 있다. 클래스 내에 매개변수를 가지는 생성자를 선언하여, 인스턴스를 생성할 때 <b>`final`이 붙은 멤버변수를 초기화하는데 필요한 값</b>을 생성자의 매개변수로부터 제공받는 것이다.

이 기능을 활용하면 각 인스턴스마다 `final`이 붙은 멤버변수가 다른 값을 가지도록 하는 것이 가능하다.

### 4.4 abstract - 추상의, 미완성의

`abstract`는 '미완성'의 의미를 가지고 있다. 메서드의 선언부만 작성하고 실제 수행내용은 구현하지 않은 추상 메서드를 선언하는데 사용된다.
