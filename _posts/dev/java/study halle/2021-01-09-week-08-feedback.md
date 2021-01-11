---
layout: post
date: 2021-01-09 22:30:00
title: "8주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, interface ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 8주차 과제](https://github.com/whiteship/live-study/issues/8)를 공부하고 공유하기 위해서 작성되었습니다.

# 8주차 회고

&nbsp;&nbsp;&nbsp;

# 추가 질문

# 추상 클래스는 계속 필요한가?

인터페이스에서 정말 다 구현할 수 있을까? 인터페이스에서 구현을 하는 것과 추상 클래스에서 구현을 하는 것은 다르다.

추상 클래스는 하나의 mutable한 상태를 가질 수 있지만, 인터페이스는 상태를 가질 수 없다.

추상 클래스의 많은 것들을 인터페이스로 옮길 수 있지만, 여전히 추상 클래스에서만 할 수 있는 것들이 있기 때문에 추상클래스의 효용가치는 있다.

# 추가 학습

# 자바 8에서의 인터페이스 기본 메서드

자바 8 이전에 인터페이스의 기본 메서드가 제공되지 않았던 시절에는 어떻게 했을까?

인터페이스의 여러가지 메소드들 중 한가지 메서드만 사용하는 구현체가 있을 때, 중간에 추상클래스를 만들었다. 이 추상클래스를 확장하는 구현체에서는 필요한 메서드만 구현할 수 있도록 하는 일종의 편의성 제공 용도로 개발되었다.

<img src="/assets/img/study/interfacedefault01.png" width="70%" align="center"><br/>

이후 자바 8 이상에서 인터페이스의 기본 메서드가 제공됨에 따라 추상 클래스 없이도 개발할 수 있게 되었다.

<img src="/assets/img/study/interfacedefault02.png" width="70%" align="center"><br/>

이를 통해, 구현체들은 <b>상속</b>에 대해 자유로워지게 되었다.

# 기본 메서드 주의사항

만약 아래와 같이 `static` 클래스에서 두 인터페이스를 상속하는데 각 인터페이스에 `print()` 기본 메소드가 정의되어 있다면 어떻게 할까?

```java
    public interface Printer {
        default void print() {
            System.out.println(getClass().getSimpleName());
        }
    }

    public class Snake implements PrintableAnimal, Printer {

    }
```

요즘 IDE는 똑똑해서 문제가 발생하면 오류메세지로 알려준다.

문제가 있다는 것을 알았으니 어떻게 사용할 수 있을까?

```java
    public class Snake implements PrintableAnimal, Printer {
        // ...

        @Override
        public void print() {
            PrintableAnimal.super.print(); // PrintableAnimal의 print 호출
            Printer.super.print(); // Printer의 print 호출

            // 혹은 직접 정의
            // System.out.println(getClass().getSimpleName());
        }        
    }
```

# 기본 메서드 등장 배경

인터페이스는 기능에 대한 구현보다는, 기능에 대한 <b>선언</b>에 초점을 맞추어서 사용한다. 그렇다면 디폴트 메서드가 왜 등장했을까?

> ...(중략)...바로 "하위 호환성"때문이다. 예를 들어 설명하자면, 여러분들이 만약 오픈 소스코드를 만들었다고 가정하자. 그 오픈소스가 엄청 유명해져서 전 세계 사람들이 다 사용하고 있는데, 인터페이스에 새로운 메소드를 만들어야 하는 상황이 발생했다. 자칫 잘못하면 내가 만든 오픈소스를 사용한 사람들은 전부 오류가 발생하고 수정을 해야하는 일이 발생할 수 있다. 이럴 때 사용하는 것이 바로 default 메소드다. (자바의 신 2권)

기존에 존재하던 인터페이스를 이용해서 구현된 클래스를 만들고 사용하고 있는데, 인터페이스를 보완하는 과정에서 추가적으로 구현해야 할, 혹은 필수적으로 존재해야 할 메소드가 있다면 이미 이 인터페이스를 구현한 클래스와의 <b>호환성</b>이 떨어지게 된다. 이러한 경우 default 메서드를 추가하게 된다면 하위 호환성을 유지하면서 인터페이스의 보완을 진행할 수 있다.

```java
    interface MyInterface {
        default void printHello() {
            System.out.println("Hello World");
        }
    }

    // 구현체 생성
    class MyClass implements MyInterface { }

    public class DefaultMethod {
        public static void main(String[] args) {
            MyClass myClass = new MyClass();
            myClass.printHello();
        }
    }
```

# is-a, has-a

추상 클래스와 인터페이스의 공통점과 차이점은 다음과 같다.

+ 공통점
  + 자기 자신을 객체화할 수 없으며 다른 객체가 상속(extends), 구현(implements)을 하여 객체를 생성할 수 있다.
  + 상속(extends), 구현(implements)을 한 하위 클래스에서는 상위에서 정의한 추상 메서드(abstract method)를 반드시 구현해야 한다.

<table align="center">
  <tr style="text-align:center">
    <td colspan="2"> <b>차이점</b> </td>
  </tr>
  <tr style="text-align:center">
    <td> <b>추상클래스</b> </td>
    <td> <b>인터페이스</b> </td>
  </tr>
  <tr>
    <td>1. 일반 메소드 포함가능</td>
    <td>1. 모든 메서드는 추상메서드<br/> 단, 자바 8 이후부터 default, static 메서드 추가가능</td>
  </tr>
  <tr>
    <td>2. 다중상속 불가능</td>
    <td>2. 다중상속 가능</td>
  </tr>
  <tr>
    <td>3. 상수, 변수 필드 포함가능</td>
    <td>3. 상수필드만 포함가능</td>
  </tr>
<table>

<br/>
그렇다면 추상클래스만 사용하면 될텐데 왜 인터페이스가 존재할까?

+ <b>추상 클래스는 is -A. ~는 ~이다.</b> &rarr; SunWoo(선우)는 사람이다.
+ <b>인터페이스는 has -A. ~는 ~를 할 수 있다.</b> &rarr; SunWoo(선우)는 코딩을 할 수 있다.

예시로 봤을 때 Person은 코딩을 할 수도 있고 못 할 수도 있기 때문에 Person이라는 개념에 포함하기에는 다소 어색하다.

# 디폴트 메서드와 스태틱 메서드 다양한 예제

## 디폴트 메서드

### 1. 두 개의 인터페이스에 같은 프로필의 default가 있을 경우

```java
    interface Flyable {
        default void say() {
            System.out.println("Flyable");
        }
    }

    interface Printable {
        default void say() {
            System.out.println("Printable");
        }
    }

    class Print implements Flyable, Printable {

    }
```

say()라는 메소드를 정확히 찾을 수 없다는 에러가 나오며, 추상메소드처럼 처리한다.

```java
    class Print implements Flyable, Printable {
        @Override
        public void say() {}
    }
```

### 2. 부모 인터페이스에 같은 프로필로 추상메소드와 default가 있는 경우

```java
    interface Dancing {
        void fly();
    }

    interface Flying {
        default void fly() {

        }
    }

    interface Child extends Dancing, Flying {

    }
```

Override를 통해 강제로 해결해야한다.

```java
    interface Child extends Dancing, Flying {
        @Override
        default void fly() {}
    }
```

## 스태틱 메서드

+ static 이후에 instance 메소드 가능 (instance 실행)
+ instance 메소드 후에 static 불가능 (오류, static 멤버를 오버라이드 할 수 없음)

### Static이 default에 밀리는 경우 1

정확히는 밀리는게 아닌 인스턴스로 접근하는 것과 스태틱으로 접근하냐의 차이. 이하의 예제들은 모두 인스턴스로 접근하기 때문에 default가 출력된다.

```java
    interface Dancing {
        static void fly() {
            System.out.println("static");
        }
    }

    interface Flyable extends Dancing {
        default void fly() {
            System.out.println("default");
        }
    }

    class Print implements Flyable {

    }

    (new Print()).fly(); // default
    Print.fly(); // static
```

```java
    interface Dancing {
        static void fly() {
            System.out.println("static");
        }
    }

    interface Flyable {
        default void fly() {
            System.out.println("default");
        }
    }

    class Print implements Flyable, Dancing { }

    (new Print()).fly(); // default
    Print.fly(); // static
```

### default를 상속을 통해 static으로 덮으려하면 에러가 난다.

```java
    interface Dancing {
        void fly();
        // default void fly() {
        //    System.out.println("default");
        // }
    }

    interface Flyable extends Dancing {
        static void fly() {
            System.out.println("static");
        }
    }

    class Print implements Flyable { }
```

인스턴스 &rarr; 스태틱 ok.
스태틱 &rarr; 인스턴스 no.

# 함수형 인터페이스

함수형 인터페이스는 인터페이스 안에 추상 메서드가 1개만 존재하는 경우를 말한다.

# 강한 결합, 느슨한 결합

<img src="/assets/img/study/strong.png" width="70%" align="center"><br/>

<b>왼쪽의 그림(강한 결합)부터 살펴보자.</b>

+ A는 B에 의존하고 있다. (A가 B를 사용)
+ 이 때, A가 C를 사용하게 하려면?
+ A는 B를 의존하고 있는 코드를 C를 의존하게끔 변경해야 한다. (강한 결합)

<b>이번엔 오른쪽 그림(느슨한 결합)을 살펴보자.</b>

+ A는 I 인터페이스에 의존하고 있고, I 인터페이스를 구현한 B를 사용한다.
+ 이 때, A가 C를 사용하게 하려면?
+ A는 I에 의존하고 있기 때문에, I 인터페이스를 구현한 C를 사용한다면 따로 코드를 변경하지 않아도 된다. (느슨한 결합)

강한 결합 : 빠르지만 변경에 불리
느슨한 결합 : 느리지만 유연하고 변경에 유리

:point_right: <b>[강한결합] 직접적인 관계의 두 클래스 (A &rarr; B)</b>

```java
    class A {
        public void mehtodA(B b) { // B를 사용(B와 관계 있음)
            b.methodB();
        }
    }

    class B {
        public void methodB() {
            System.out.println("methodB()");
        }
    }

    class InterfaceTest {
        public static void main(String[] args) {
            A a = new A();
            a.methodA(new B());
        }
    }
```

:point_right: <b>[느슨한결합] 간접적인 관계의 두 클래스 (A &rarr; I &rarr; B)</b>

+ `methodB()`를 추상 메서드로 갖는 인터페이스 작성
+ 해당 인터페이스를 구현한 클래스 생성
+ 인터페이스 타입을 매개변수로 사용해서 다형성을 구현

```java
    class A {
        public void methodA(I i) { // I를 사용(B와 무관. I와 관계 있음)
            i.methodB();
        }
    }

    // 껍데기
    interface I {
        public abstract void methodB();
    }

    // 알맹이
    class B implements I {
        public void methodB() {
            System.out.println("methodB()");
        }
    }

    // B를 C로 변경해도 C만 변경하면 됨. methodB를 호출하는 A를 변경할 필요 없음.
    class C implements I {
        public void methodB() {
            System.out.println("methodB() in C");
        }
    }
```

A가 B의 메서드를 호출하는 형태였다가 C의 메서드를 호출하게 바뀐다면

+ <b>강한 결합</b>
  + A가 B를 직접 의존하기 떄문에, A의 내부를 변경해줘야 한다.
+ <b>느슨한 결합</b>
  + A가 I를 거쳐 B를 의존하기 때문에 A 내부를 변경해주지 않아도 된다.

---
**Reference**
+ <https://blog.baesangwoo.dev/posts/java-livestudy-8week/>
+ <https://dev-coco.tistory.com/13>
+ <https://k3068.tistory.com/34>
+ <https://www.notion.so/Java-8-0cc8c251d5374ac882a4f22fa07c4e6a>
+ <https://github.com/tocgic/study-java-basic/blob/main/week8.md>
+ <https://ahnyezi.github.io/java/javastudy-8-interface/>
