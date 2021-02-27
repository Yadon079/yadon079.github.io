---
layout: post
date: 2021-02-27 22:30:00
title: "14주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, generics, erasure ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 14주차 과제](https://github.com/whiteship/live-study/issues/14)를 공부하고 공유하기 위해서 작성되었습니다.

# 14주차 회고

&nbsp;&nbsp;&nbsp;매번 스터디 과제를 학습하고 제출하고나면 먼저 제출하셨는데도 방대한 양과 양질의 지식들이 들어있는 분들이 많다. 이정도 공부했으면 괜찮겠지하고 생각했지만 제출하고 난 뒤에 다른 분들의 글을 읽어보면 와 이런 것도 있었어? 라는 생각이 들곤한다.

&nbsp;&nbsp;&nbsp;시간이 후딱후딱 지나가서 어느덧 마지막 주차만 남았는데 스터디를 하면서 분명히 내가 성장했음을 느끼지만 동시에 부족함도 느끼고 있다. 스터디가 끝났다고 공부가 끝나는 것이 아니며, 한번 배웠다고 해서 끝나는 것이 아닌 꾸준한 반복학습이 필요하다는 것을 다시금 되새긴다.

> <https://alkhwa-113.tistory.com/entry/%EC%A0%9C%EB%84%A4%EB%A6%AD> 링크를 잘 타고 이동하면 이펙티브 자바를 정리한 글을 볼 수 있다.

---

# 질문

# Under bounded는 인터페이스도 지원이 되는가?

```java

```

# Erasure 챕터에서 컴파일러가 브릿지 패턴을 생성한다고 하는데, 바이트코드에는 나오지 않습니다. 확인하는 방법이 혹시 있을까요?

---

# 학습

# 제네릭 주요 개념 (바운디드 타입, 와일드 카드)

&nbsp;&nbsp;&nbsp;제네릭 타입에는 여러가지가 있다.

## 바운드 타입 매개변수(Bounded type parameter)

바운드 타입은 특정 타입의 서브 타입으로 제한한다. 클래스나 인터페이스 설계할 때 가장 흔하게 사용할 정도로 많이 볼 수 있는 개념이다.

```java
public class BoundTypeSample <T extends Number> {
    public void set(T value) {}

    public static void main(String[] args) {
        BoundTypeSample<Integer> boundTypeSample = new BoundTypeSample<>();
        boundTypeSample.set("Hi");
    }
}
```

위 코드의 경우 컴파일 에러가 발생한다.  
BoundTypeSample 클래스의 Type 파라미터를 T로 선언하고 <T extends Number>로 선언한다. BoundTypeSample의 타입으로 Number의 서브 타입만 허용한다는 것이다.  
Integer는 Number의 서브타입이기 때문에 BoundTypeSample와 같은 선언이 가능하지만 set함수의 인자로 문자열을 전달하려고 했기 때문에 컴파일 에러가 발생하게 된다.

## WildCard

제네릭으로 구현된 메소드의 경우 선언된 타입으로만 매개변수를 입력해야 한다. 이를 상속받은 클래스 혹은 부모 클래스를 사용하고 싶어도 불가능하고 어떤 타입이 와도 상관없는 경우에 대응하기 좋지 않다. 이를 위한 해법으로 WildCard를 사용한다.

&#9654; <b>와일드 카드 종류</b>

<b>Unbounded WildCard</b>

+ Unbounded WildCard는 List<?>와 같은 형태로 물음표만 가지고 정의된다. 내부적으로 Object로 정의되어서 사용되고 모든 타입의 인자를 받을 수 있다. 타입 파라미터에 의존하지 않는 메소드만을 사용하거나 Object 메소드에서 제공하는 기능으로 충분한 경우에 사용한다.
+ Object 클래스에서 제공되는 기능을 사용하여 구현할 수 있는 메서드를 작성하는 경우
+ 타입 파라미터에 의존적이지 않은 일반 클래스의 메소드를 사용하는 경우

<b>Upper Bounded WildCard</b>

+ Upper Bounded WildCard는 List<? extends Foo>와 같은 형태로 사용하고 특정 클래스의 자식 클래스만을 인자로 받는다. 임의의 Foo 클래스를 상속받는 어느 클래스가 와도되지만 사용할 수 있는 기능은 Foo 클래스에 정의된 기능만 사용이 가능하다.

<b>Lower Bounded WildCard</b>

+ Lower Bounded WildCard는 List<? super Foo>와 같은 형태로 사용하고, Upper Bounded WildCard와 다르게 특정 클래스의 부모 클래스만을 인자로 받는다는 것이다.

# Erasure

# 제네릭 주의 사항

# 브릿지 메서드

---



---
**Reference**
+ <https://sujl95.tistory.com/73>
+ <https://blog.naver.com/hsm622/222251602836>
+ <https://rockintuna.tistory.com/102>
+ <https://alkhwa-113.tistory.com/entry/%EC%A0%9C%EB%84%A4%EB%A6%AD>
