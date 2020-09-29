---
layout: post
date: 2020-09-29 13:46:00
title: "java.lang패키지와 유용한 클래스"
description: "자바의 정석"
subject: java의 정석
category: [ java ]
tags: [ java, java.lang, package ]
comments: true
---

# java.lang패키지와 유용한 클래스

> 이 글은 남궁성님의 [자바의 정석 3/e](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788994492032)을 기반으로 공부한 내용을 정리한 글입니다.

+ [java lang 패키지](#java-lang-패키지)
+ [유용한 클래스](#유용한-클래스)

## java lang 패키지

`java.lang`패키지는 기본이 되는 클래스들을 포함하고 있다. 따라서 import문 없이도 사용할 수 있게 되어 있다.

### 1.1 Object 클래스

`Object`클래스는 모든 클래스의 최고 조상이기 때문에 멤버들을 모든 클래스에서 바로 사용 가능하다.

멤버변수는 없고 11개의 메서드만 가지고 있다. 이 메서드들은 모든 인스턴스가 기본적으로 가져야 할 것들이다.

<p style="color:#a0adec"><b>equals(Object obj)</b></p>

매개변수로 객체의 참조변수를 받아서 비교하여 결과를 `boolean`값으로 알려주는 역할을 한다.

```java
  public boolean equals(Object obj) {
    return (this == obj);
  }
```

두 객체의 같고 다름을 참조변수의 값으로 판단한다.

상속받은 `equals`메서드는 두 개의 참조변수가 같은 객체를 참조하고 있는지, 즉 저장된 값(주소값)이 같은지를 판단한다. `value`값을 비교하기 위해선 오버라이딩하여 주소가 아닌 객체에 저장된 내용을 비교하도록 변경해야 한다.

<p style="color:#a0adec"><b>hashCode()</b></p>

해싱(hashing)기법에 사용되는 '해시함수(hash function)'을 구현한 메서드이다. 해싱은 데이터관리기법 중의 하나로 다량의 데이터를 저장하고 검색하는 데 유용하다.

해시함수는 찾고자하는 값을 입력하면, 그 값이 저장된 위치를 알려주는 해시코드(hash code)를 반환한다.

일반적으로는 해시코드가 같은 두 객체가 존재할 수 있지만, `Object`클래스에 정의된 `hashCode`메서드는 객체의 주소값을 이용하기 때문에 결코 같은 해시코드를 가질 수 없다.

`String`클래스는 문자열의 내용이 같으면, 동일한 해시코드를 반환하도록 오버라이딩되어 있다.

<p style="color:#a0adec"><b>toString()</b></p>

인스턴스에 대한 정보를 문자열(String)로 제공할 목적으로 정의된 메서드이다. 인스턴스에 대한 정보를 제공한다는 것은 인스턴스 변수에 저장된 값들을 문자열로 표현한다는 뜻이다.

```java
  public String toString() {
    return getClass().getName()+"@"+Integer.toHexString(hashcode());
  }
```

클래스를 작성할 때 오버라이딩하지 않는다면, 클래스이름에 16진수의 해시코드를 얻게 된다.

<p style="color:#a0adec"><b>clone()</b></p>

자신을 복제하여 새로운 인스턴스를 생성하는 메서드이다. 원래의 인스턴스는 보존하고 `clone`메서드를 이용해서 새로운 인스턴스를 생성하여 작업하면 작업 이전의 값이 보존되므로 실패하여도 원래의 상태로 되돌리거나 변경하기 전의 값을 참고하는데 도움이 된다.

`Object`클래스에 정의된 `clone()`은 단순히 인스턴스변수의 값만을 복사하기 때문에 참조타입의 인스턴스변수가 있는 클래스는 완전한 인스턴스 복제가 이루어지지 않는다.

`clone()`을 사용하려면 복제할 클래스가 `Cloneable`인터페이스를 구현해야하고, `clone()`을 오버라이딩하면서 접근 제어자를 `protected`에서 `public`으로 변경해야 한다.

```java
  public class Object {
      ...
    protected native Object clone() throws CloneNotSupportedException;
      ...
  }
```

<span style="font-size:13px;">
<b>| 참고 | Object클래스의 clone()은 Cloneable을 구현하지 않은 클래스 내에서 호출되면 예외를 발생시킨다.</b><br/>
</span>  

마지막으로 조상클래스의 `clone()`을 호출하는 코드가 포함된 `try-catch`문을 작성한다.

인스턴스의 데이터를 보호하기 위해서 `Cloneable`인터페이스를 구현한 클래스의 인스턴스만 복제가 가능하다.

<p style="color:#a0adec"><b>얕은 복사와 깊은 복사</b></p>

객체배열을 `clone()`으로 복제하는 경우에는 원본과 복제본이 같은 객체를 공유한다. 이러한 복제(복사)를 '얕은 복사(shallow copy)'라고 한다. 얕은 복사에서는 원본을 변경하면 복사본도 영향을 받는다.

원본이 참조하고 있는 객체까지 복제하는 것을 '깊은 복사(deep copy)'라고 하며, 원본과 복사본이 서로 다른 객체를 참조하기 때문에 원본의 변경이 복사본에 영향을 미치지 않는다.

<p style="color:#a0adec"><b>getClass()</b></p>

자신이 속한 클래스의 Class객체를 반환하는 메서드이다. `Class`객체는 이름이 `Class`인 클래스의 객체이다.

```java
  public final class Class implements ... {
      ...
  }
```

`Class`객체는 클래스의 모든 정보를 담고 있으며, 클래스 당 1개만 존재한다. 클래스 파일이 '클래스 로더(ClassLoader)'에 의해서 메모리에 올라갈 때, 자동으로 생성된다.

클래스 로더는 실행 시에 필요한 클래스를 동적으로 메모리에 로드하는 역할을 한다. 기존에 생성된 클래스 객체가 메모리에 존재하는지 확인하고, 있으면 객체의 참조를 반환하고 없으면 클래스 패스(classpath)에 지정된 경로를 따라서 클래스 파일을 찾는다.

못 찾으면 ClassNotFoundException이 발생하고, 찾으면 해당 클래스 파일을 읽어서 Class객체로 변환한다.

<p style="color:#a0adec"><b>Class객체를 얻는 방법</b></p>

클래스의 정보가 필요할 때, 먼저 Class객체에 대한 참조를 얻어 와야 하는데, 해당 Class객체에 대한 참조를 얻는 방법은 여러 가지가 있다.

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>생성된 객체로부터 얻는 방법</b> &nbsp;&nbsp;&nbsp;&nbsp; Class cObj = new Card().getClass();<br/>
      <b>클래스 리터럴로부터 얻는 방법</b> &nbsp;&nbsp;&nbsp;&nbsp; Class cObj = Card.class;<br/>
      <b>클래스 이름으로부터 얻는 방법</b> &nbsp;&nbsp;&nbsp;&nbsp; Class cObj = Class.forName("Card");
    </td>
  </tr>   
</table>

특히 `forName()`은 특정 클래스 파일을 메모리에 올릴 때 주로 사용한다.

Class객체를 이용하면 클래스에 대한 모든 정보를 얻을 수 있기 때문에 보다 동적인 코드를 작성할 수 있다.

### 1.2 String클래스
