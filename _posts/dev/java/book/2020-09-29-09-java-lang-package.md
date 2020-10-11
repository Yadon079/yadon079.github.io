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

<p style="color:#a0adec"><b>변경 불가능한(immutable) 클래스</b></p>

String클래스에는 문자열을 저장하기 위해서 문자형 배열 변수(char[]) value를 인스턴스 변수로 정의해놓고 있다. 인스턴스 생성 시 생성자의 매개변수로 입력받는 문자열을 인스턴스변수(value)에 문자형 배열(char[])로 저장되는 것이다.

<span style="font-size:13px;">
<b>| 참고 | String클래스는 앞에 final이 붙어 있으므로 다른 클래스의 조상이 될 수 없다.</b><br/>
</span>  

문자열간의 결합이나 추출 등 문자열을 다루는 작업이 많이 필요한 경우 `StringBuffer`클래스를 사용하는 것이 좋다. `StringBuffer`인스턴스에 저장된 문자열은 변경이 가능하므로 하나의 `StringBuffer`인스턴스만으로도 문자열을 다루는 것이 가능하다.

<p style="color:#a0adec"><b>문자열의 비교</b></p>

문자열을 생성하는 방법은 문자열 리터럴을 지정하는 방법과 String클래스의 생성자를 사용해서 만드는 방법, 두 가지가 있다.

생성자를 이용한 경우에는 new연산자에 의해 메모리할당이 이루어지기 때문에 항상 새로운 String인스턴스가 생성된다. 반면 문자열 리터럴은 이미 존재하는 것을 재사용하는 것이다.

`equals()`를 사용했을 때 문자열의 내용을 비교하기 때문에 두 경우 모두 true를 얻는다. 하지만 인스턴스의 주소를 등가비교연산자 `==`로 비교했을 때는 결과가 다르다.

<p style="color:#a0adec"><b>문자열 리터럴</b></p>

자바 소스파일에 포함된 모든 문자열 리터럴은 컴파일 시에 클래스 파일에 저장된다. 이 때 같은 내용의 문자열 리터럴은 한번만 저장된다. 문자열 리터럴도 String인스턴스이고, 한번 생성하면 내용을 변경할 수 없으니 하나의 인스턴스를 공유하면 되기 때문이다.

<p style="color:#a0adec"><b>빈 문자열(empty string)</b></p>

`String s = "";`과 같은 문장이 있을 때, 참조변수 s가 참조하고 있는 String인스턴스는 내부에 `new char[0]`과 같이 길이가 0인 char형 배열을 저장하고 있다. 그러나 char형 변수에는 반드시 하나의 문자를 지정해야 한다.

<p style="color:#a0adec"><b>String클래스의 생성자와 메서드</b></p>

자주 쓰이는 생성자와 메서드들이 있는데 기능에 대한 것은 [공식 문서](https://docs.oracle.com/javase/8/docs/api/)에서 확인하면 된다.

<p style="color:#a0adec"><b>join()과 StringJoiner</b></p>

`join()`은 여러 문자열 사이에 구분자를 넣어서 결합한다. `split()`과 반대의 작업을 한다.

`java.util.StringJoiner`클래스를 사용해서 문자열을 결합할 수도 있는데, 사용 예시는 아래와 같다.

```java
  StringJoiner sj = new StringJoiner(",", "[", "]");
  String[] strArr = { "aaa", "bbb", "ccc" };

  for(String s : strArr)
    sj.add(s.toUpperCase());

  System.out.println(sj.toString());
```

<p style="color:#a0adec"><b>String.format()</b></p>

`format()`은 형식화된 문자열을 만들어내는 간단한 방법이다. `printf()`와 사용법이 동일하다.

```java
  String str = String.format("%d 더하기 %d는 %d이다.", 3, 5, 3 + 5);
  System.out.println(str);
```

<p style="color:#a0adec"><b>기본형 값을 String으로 변환</b></p>

기본형을 문자열로 변경하는 방법은 간단하다. 숫자에 빈 문자열 " "을 더해주기만 하면 된다. 또는 `valueOf()`를 사용해도 된다. 빈 문자열을 더하는 편이 훨씬 편하기 때문에 성능향상이 필요한 경우에만 `valueOf()`를 쓰는 편이 좋다.

<p style="color:#a0adec"><b>String을 기본형 값으로 변환</b></p>

`valueOf()`를 쓰거나 혹은 `parseInt()`를 사용하면 된다.

```java
  int i = Integer.parseInt("100");
  int i = Integer.valueOf("100");
```

`valueOf()`의 반환 타입은 int가 아니라 Integer인데, 오토박싱에 의해 `Integer`가 `int`로 자동 변환된다.

### 1.3 StringBuffer클래스와 StringBuilder클래스

`String`클래스는 인스턴스를 생성할 때 지정된 문자열을 변경할 수 없지만 `StringBuffer`클래스는 변경이 가능하다. 내부적으로 문자열 편집을 위한 Buffer를 가지고 있으며, 인스턴스를 생성할 때 크기를 지정할 수 있다.

`StringBuffer`클래스는 `String`클래스와 유사한 점이 많다.

<p style="color:#a0adec"><b>StringBuffer의 생성자</b></p>

`StringBuffer`클래스의 인스턴스를 생성할 때, 적절한 길이의 char형 배열이 생성되고, 이 배열은 문자열을 저장하고 편집하기 위한 공간(buffer)으로 사용된다.

인스턴스로 문자열을 다루는 작업을 할 때, 버퍼의 크기가 작업하려는 문자열의 길이보다 작을 때는 내부적으로 버퍼의 크기를 증가시키는 작업이 수행된다. 배열의 길이는 변경될 수 없기 때문에 새로운 배열을 생성해서 이전 배열의 값을 복사해야 한다. 따라서 작업효율이 떨어지기 때문에 처음 생성할 때 충분히 여유있는 크기를 지정해줘야 한다.

<p style="color:#a0adec"><b>StringBuffer의 변경</b></p>

`append()`는 반환타입이 `StringBuffer`인데 자신의 주소를 반환한다. 따라서 아래와 같은 코드를 실행할 경우, `sb`와 `sb2`는 같은 주소를 가진다. 즉, 같은 인스턴스를 가리키고 있으며 같은 내용을 출력한다.

```java
  StringBuffer sb = new StringBuffer("abc");
  sb.append("123");
  StringBuffer sb2 = sb.append("ZZ");
  System.out.println(sb);
  System.out.println(sb2);
```

<span style="font-size:13px;">
<b>| 참고 | StringBuffer클래스에는 append()처럼 객체 자신을 반환하는 메서드들이 많다.</b><br/>
</span>  

<p style="color:#a0adec"><b>StringBuffer의 비교</b></p>

`String`클래스에서는 `equals`메서드를 오버라이딩해서 문자열의 내용을 비교하도록 구현되어 있지만, `StringBuffer`클래스는 오버라이딩하지 않아서 등가비교연산자로 비교한 것과 같은 결과를 얻는다.

반면에 `toString()`은 오버라이딩되어 있어서 `StringBuffer`인스턴스에 호출하면, 담고있는 문자열을 `String`으로 반환한다. 따라서 문자열을 비교하기 위해서는 `toString()`으로 호출해서 String인스턴스를 얻은 다음, 여기에 `equals`메서드를 사용해야 한다.

<p style="color:#a0adec"><b>StringBuilder란?</b></p>

`StringBuffer`에서 쓰레드의 동기화를 제거한 것이 `StringBuilder`이다. 완전히 똑같은 기능으로 작성되어 있어서 참조변수를 선언한 부분과 생성자만 바꾸면 된다. 성능향상이 반드시 필요한 경우를 제외하면 어느 쪽을 쓰든 상관없다.

### 1.4 Math클래스

`Math`클래스의 생성자는 접근 제어자가 `private`이기 때문에 다른 클래스에서 인스턴스를 생성할 수 없도록 되어있다. 메서드는 모두 `static`이며, 자연로그의 밑 `E`와 원주율 `PI`만 정의해 놓았다.

<p style="color:#a0adec"><b>올림, 버림, 반올림</b></p>
