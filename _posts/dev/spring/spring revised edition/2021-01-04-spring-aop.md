---
layout: post
date: 2021-01-04 20:12:00
title: "스프링 AOP"
description: "예제로 배우는 스프링 입문"
subject: Spring revised edition
category: [ spring ]
tags: [ spring, aop ]
use_math: true
comments: true
---

[예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)의 내용을 정리하는 포스트

---

# 스프링 AOP

## AOP가 뭐야?

스프링에는 IoC, AOP, PSA 세 가지 개념을 제공해주는 `Spring Triangle`이라고 부르는 개념이 있다.

AOP는 `Aspect Oriented Programming`의 약자로 관점 지향 프로그래밍이라는 의미이다.

### 흩어진 경우

```java
    class A {
        method a() {
            header
            예제 문장 1
            footer
        }

        method b() {
            header
            예제 문장 2
            footer
        }
    }

    class B {
        method c() {
            header
            예제 문장 3
            footer
        }
    }
```

위와 같이 header와 footer라는 일을 행하고 중간 메세지만 다른 경우가 있다고 하자. 이렇게 같은 일을 하는 코드인데 흩어져 있는 경우, 예를 들어 header를 headLine으로 바꾼다고 하면 header가 행해지는 모든 코드를 찾아서 변경해야한다. 심지어 다른 클래스까지 확인해야 한다.

이러한 것을 예방하기 위해서 메소드에서 해야할 일(메세지)는 남겨둔 채, 공통적인 일들을 따로 묶어서 다음과 같이 만들 수 있다.

### 묶은 경우

```java
    class A {
        method a() {
            예제 문장 1
        }

        method b() {
            예제 문장 2
        }
    }

    class B {
        method c() {
            예제 문장 3
        }
    }

    class Line {
        method line(JoinPoint point) {
            header
            point.execute()
            footer
        }
    }
```

이런 것이 AOP이다.

성능을 측정하기 위해서 스프링에서 제공하는 `StopWatch`라는 유틸을 다음과 같이 문장을 추가한다고 해보자.

### OwnerCollector.java

```java
    ...

    @GetMapping("/owners/new")
    public String initCreationForm(Map<String, Object> model) {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        ...

        stopWatch.stop();
        System.out.println(stopWatch.prettyPrint());

        return ...
    }

    @PostMapping("/")
    public String processCreationForm(...) {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        ...
    }

    ...
```

이렇게 원하는 위치에 문장을 추가해서 얼마나 걸리는지 측정하는 방식은 AOP가 아니다. 이런 중복된 코드를 제거했지만 해당 코드가 존재하는 것처럼 구현하는 것이 AOP이다.

이러한 AOP를 구현하는 방법은 크게 세 가지가 있다.

## 컴파일

`A.java`라는 파일을 `A.class`로 컴파일을 하는 도중에 중간에 AOP를 추가할 수 있다. `A.java` 코드에는 `stopWatch`라는 코드가 없지만, `A.class`에는 있는 것처럼 해주는 컴파일러를 `AspectJ`가 제공해준다.

## 바이트코드 조작

`A.class`를 사용할 때 런타임에서 클래스로더가 읽어올 때 조작하는 방법이다. `A.class` 파일에 `stopWatch` 코드가 없는데 클래스 로딩하는 시점에 추가하여 메모리에 올라갈 때는 `stopWatch`가 있는 것처럼 하는데 이것 역시 `AspectJ`가 제공한다.

## 프록시 패턴

이 방법이 스프링 AOP가 사용하는 방법인데, 디자인 패턴을 사용해서 AOP와 같은 효과를 내는 방법이다.

---
**Reference**
+ [예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)
