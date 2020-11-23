---
layout: post
date: 2020-11-21 22:00:00
title: "2주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, jvm, jdk, jre ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 2주차 과제](https://github.com/whiteship/live-study/issues/2)를 공부하고 공유하기 위해서 작성되었습니다.

## 피드백

기선님이 매주 라이브에서 과제를 제출한 사람들 중에서 인상 깊은 글에 이모지를 남겨주신다. 확인했다는 이모지 말고 다른 이모지가 남겨지는데 남겨진 분들의 글을 보면 굉장히 잘 쓰신 것을 알 수 있다.

남에게 보여지는 글이 아니라 자신이 공부하기 위해서 꼼꼼하게 작성한 글이라는 것이 보이는 글에 주로 남기시는 것 같다.

라이브 방송 이 후에 내가 작성한 글을 다시 읽어보니 여기저기 빈 곳도 많고 공부를 했다기 보다 보여주기 식으로 느껴졌다. 뒤로 갈수록 시간에 쫓겨 급하게 작성한 느낌도 받았다.  
부족한 부분들을 알게되었으니 남은 과제들은 보완하도록 해야겠다.

## 놓친 부분

### Q. 자료형이 표현할 수 있는 범위인 표현범위의 범위는 왜 그 범위인가?

<b>각 자료형의 크기를 2진수로 나타내보면 알 수 있다.</b>

1 byte는 8 bit이고 1 bit는 2진수 한 자리를 뜻한다.

10진수는 한 자리에 10가지(0 ~ 9)를 표현할 수 있다면 2진수는 0과 1을 표현할 수 있다.  
그렇다면 1 bit가 2진수 한 자리를 뜻하므로 2 bit는 2진수 두 자리를 뜻하고 00, 01, 10, 11를 표현할 수 있다.

3 bit를 살펴보면 표현할 수 있는 경우의 수가 8가지인데 비트의 증가에 따른 표현 가지 수를 잘 살펴보면 규칙을 알 수 있다.

그렇다. 2의 거듭제곱의 형태로 숫자가 커지며 'bit의 수'이 지수가 되는 것이다. 즉, 표현할 수 있는 수의 개수는 2<sup>bit의 수</sup> 형태로 나타낼 수 있다.

정수형 프리미티브 타입 중에서 byte 형을 살펴보면 1 byte이므로 8 bit, 나타낼 수 있는 수의 개수는 2<sup>8</sup>, 256개인데 막상 범위를 살펴보면 '0 ~ 255'가 아니라 '-128 ~ 127'로 되어 있다.

이는 컴퓨터에서 음수를 표현하기 위해서 MSB(Most Significant Bit, 최상위 비트)를 사용하기 때문이다. 일반적으로 가장 왼쪽에 있는 비트를 MSB라고 하는데 <b>부호 비트</b>라고도 한다. 이 부호 비트가 1이면 음수, 0이면 양수라고 판단한다.

### Q. 자바에서 정수형 Unsigned는 존재하는가?

<b>자바에서는 Unsigned가 있다고 하기도 없다고 하기도 애매하다.</b>

Unsigned는 부호가 없는 것으로 1 bit를 더 사용할 수 있기 때문에 표현할 수 있는 범위가 더 넓어진다.

Java 8 이전까지는 Unsigned가 없었다. Java 8부터는 Unsigned와 관련된 메소드가 추가되었는데, 예시로 살펴보자.

```java
  int unsigned = 210_000_000;
  System.out.println(unsigned + 100_000_000);
```

위와 같은 코드를 실행하면 22억이 아니라 오버플로우가 발생하여 값이 출력된다.  
이를 해결하기 위해 추가된 것이 `parseUnsignedInt`이다.

```java
  int unsigned = Integer.parseUnsignedInt("220000000");
  System.out.println(Integer.toUnsignedString(unsigned));
```

`parseUnsignedInt`만으로는 출력이 되지 않고 들어 있는 값을 `unsigned` 값으로 하겠다는 `toUnsignedString`을 사용해서 출력해야한다.

따라서 22억처럼 큰 값을 사용할 때는 `Unsigned`를 사용하기 보다는 `BigInteger` 또는 `long`을 쓰는 편이 좋다.

### Q. 고정소수점과 부동소수점의 특징은 무엇인가?

<b>부동소수점이 고정소수점보다 표현하는 범위가 조금 더 크다.</b>

이는 실수형의 정밀도(precision)과 연관되는데, 정밀도가 높을수록 발생할 수 있는 오차의 범위가 줄어든다.

부동소수점이 표현 범위가 넓은 점은 좋지만, 정밀도가 떨어진다.

```java
  float number = 0.1f;
  for(int i = 0; i < 10; i++) {
    number += 0.1f;
  }
  System.out.println(number);
```

위의 코드를 실행해보면 제한된 결과를 얻게 된다.

따라서 돈 계산하는 어플리케이션을 제작할 경우 `float`이나 `double`이 아닌 `BigDecimal`을 사용해야 한다.

```java
  BigDecimal number = BigDecimal.ZERO;
  for(int i = 0; i < 10; i++) {
    number = number.add(BigDecimal.valueOf(0.1)); // 객체가 바뀌는 것이 아니라 새로운 객체를 리턴
  }
  System.out.println(number);
```

## 추가 내용

### 레퍼런스 타입

레퍼런스 타입을 객체에 만들면 `Heap` 영역에 들어가고 변수는 `Stack` 영역에 남는다. 즉 메모리 영역이 나뉘어져 저장된다.

### 리터럴

Java 8부터는 정수형 리터럴 중간에 구분자 '_'를 넣을 수 있게 되어서 큰 숫자를 편하게 읽을 수 있게 되었다.

정수형 리터럴에서 10진수 외에도 2, 8, 16진수로 표현된 리터럴을 변수에 저장할 수 있으며, 16진수라는 것을 표시하기 위해 접두사 `0x` 또는 `0X`를, 8진수의 경우 `0`을 붙인다.

### 변수의 스코프와 라이프 타임

클래스 변수는 클래스가 로딩될 때 생성된다.

참조를 할 수 없는 이유는 static과 static이 아닌 경우에 언제 올라오는 지가 중요하다.

인스턴스에서 클래스를 참조할 수 있는 이유는 인스턴스가 생성되기 전에 클래스가 이미 생성되어 있기 때문에 가능하다. 반대의 경우 인스턴스가 아직 생성이 되기 전에 클래스에서 참조하려는 경우가 발생해서 불가능하다.

생성 시기의 차이에서 오는 컴파일 에러에 대해서 이해해 두어야 한다.

### 변수 선언과 초기화

`int a = 5`라는 한줄의 코드를 operation code로 확인(javac -c)해보면 한 줄이 아니라 두 줄로 표시된다.

### 타입 추론, var

10버전 이상부터 type interface 기능이 추가되었다. 메소드 호출 및 선언과 variable 혹은 object 선언을 통해 실제 타입을 추론하는 형식이다.

`var`라는 변수 자체가 타입 추론을 하는데 이 때 type keywords를 사용한다.

참고하기 좋은 글 <https://catch-me-java.tistory.com/19>

## 1주차 추가 과제

컴파일 하는 방법에서 javac -c 옵션

```
$ javap -c Hello.java
```

해당 옵션을 사용할 경우 해석된 바이트 코드를 확인할 수 있다.

---
**Reference**
+ <https://blog.naver.com/hsm622/222144931396>
+ <https://velog.io/@jaden_94/2%EC%A3%BC%EC%B0%A8-%ED%95%AD%ED%95%B4%EC%9D%BC%EC%A7%80>
+ <https://gintrie.tistory.com/61>
+ <https://www.notion.so/2-00ffb2aeb41d450aa446675b8a9e91d5>
+ <https://catsbi.oopy.io/6541026f-1e19-4117-8fef-aea145e4fc1b#e02c20ef-d78c-443d-a972-680c2a874c1f>
+ <https://catch-me-java.tistory.com/14>
