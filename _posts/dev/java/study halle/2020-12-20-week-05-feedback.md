---
layout: post
date: 2020-12-20 15:18:00
title: "5주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, class, method, Binary Tree, BFS, DFS ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 5주차 과제](https://github.com/whiteship/live-study/issues/5)를 공부하고 공유하기 위해서 작성되었습니다.

# 5주차 회고

&nbsp;&nbsp;&nbsp;

## 과제

&nbsp;&nbsp;&nbsp;node 클래스를 직접 작성하고 그것을 이용해서 BFS와 DFS를 만드는 과제였는데, 처음에는 알고리즘에서 많이 접해봤으니 쉽게 만들겠지라고 생각했다. 하지만 막상 작성하기 시작하니 막히는 부분이 많았다.

&nbsp;&nbsp;&nbsp;이번에도 테스트코드를 같이 했어야했는데 여전히 테스트코드 만드는 방법은 어려운것 같다.

# 추가 질문

## Q. 블럭 초기화랑 생성자 초기화가 같이 있으면 어느 것이 출력되는가?

<b>A. 생성자가 나온다.</b>

```java
    public class App {
        private int number;

        {
            this.number = 10;
            System.out.println("init block");
        }

        public Init() {
            this.number = 100;
            System.out.println("constructor");
        }

        public static void main(String[] args) {
            Init init = new Init();
            System.out.println(init.number);
        }
    }
```

## Q. 런타임 시 클래스의 정보를 알고 싶다면?

<b>A. Reflection API를 사용한다.</b>  


# 추가 학습

# 초기화 블럭(initializer)

&nbsp;&nbsp;&nbsp;초기화 블록 내에서는 조건문, 반복문 등을 사용해 명시적 초기화에선 불가능한 초기화를 수행할 수 있다.

+ <b>클래스 초기화 블럭</b> - 클래스 변수 초기화에 쓰인다.
  + 클래스 변수 초기화 : 기본값 &rarr; 명시적 초기화 &rarr; 클래스 초기화 블럭
+ <b>인스턴스 초기화 블럭</b> - 인스턴스 변수 초기화에 쓰인다.
  + 인스턴스 변수 초기화 : 기본값 &rarr; 명시적 초기화 &rarr; 인스턴스 초기화 블럭 &rarr; 생성자

```java
    class Class {
        String instanceVar;
        static String classVar;

        // 클래스 초기화 블럭
        static {
            classVar = "Class Variable";
        }

        // 인스턴스 초기화 블럭
        {
            instanceVar = "instance Variable";
        }
    }
```

# 클래스 로딩과 메모리 적재과정

&nbsp;&nbsp;&nbsp;<b>클래스 수준의 필드와 메서드, 인스턴스 수준의 필드와 메서드가 각각 어떻게 메모리를 할당받는지 알아보자.</b>
메모리 할당 과정을 이해하기 위해서는 JVM이 어떤 방식으로 클래스를 로드하고 메모리를 할당하는지 알아야 한다.

### JVM 아키텍쳐 다이어그램의 일부

&nbsp;&nbsp;&nbsp;컴파일된 <b>클래스 파일이 로드되고 메모리에 적재되는 과정</b>을 그림으로 나타낸 것이다.

<img src="/assets/img/study/classloading01.jpg" width="70%" align="center"><br/>

## 클래스 로더 서브시스템(Class Loader Subsystem) : 동적 클래스 로딩 과정

<img src="/assets/img/study/classloader.png" width="70%" align="center"><br/>

클래스를 로딩하는 작업이다. 자바의 동적 클래스 로딩은 <b>클래스 로더 서브시스템</b>에 의해 처리된다.

절차는 다음과 같다.

1. 메서드 호출 문장을 만난다.
2. 해당 메서드를 가진 바이트 코드(.class) 로딩 전이다.
3. 클래스 로더가 jre 라이브러리 디렉토리에서 해당 클래스의 유무를 조사한다.
3-1. 발견하지 못했다면, jdk 확장 디렉토리에서 해당 클래스의 유무를 조사한다.
3-2. 발견하지 못했다면, classpath 환경변수에 지정된 디렉토리(직접 선언한)에서 해당 클래스의 유무를 조사한다.
4. 클래스를 발견한다.
5. 해당 클래스 파일이 올바른 바이트 코드인지 검증한다.
6. 올바른 바이트 코드라면 method 영역으로 파일을 로딩한다.
7. 클래스 변수를 만들어야 하면 method 영역에 해당 변수를 준비한다.
8. 클래스 블럭이 있으면 순서대로 해당 블럭을 실행한다.
9. 프로그램이 종료될 때까지 현 상태를 유지한다.

각 로딩 과정은 크게 3단계, 로딩 &rarr; 연결 &rarr; 초기화로 나뉜다.

### 로딩(Loading)

<img src="/assets/img/study/loading.png" width="50%" align="center"><br/>

로딩과정은 클래스 로더에 의해 이루어진다.  
클래스 로더는 `Bootstrap`, `Extension`, `Application` 3가지가 있고, 각 클래스 로더는 상속관계를 가지고 있다. 부모가 수행하지 않은 로딩작업을 자식이 수행하는 방식인 <b>위임(delegation)</b>으로 작업을 진행한다.

### 연결(Linking)

<img src="/assets/img/study/linking.png" width="50%" align="center"><br/>

클래스 파일의 바이트 코드를 검증하고, 정적변수의 메모리를 할당하는 과정이다.  

+ <b>Verify</b> : 바이트 코드 검증
  + 생성된 자바 바이트 코드가 적절한지를 검증
  + 검증에 실패할 경우 오류를 내보냄
+ <b>Prepare</b> : 준비
  + 모든 정적변수의 메모리를 할당
  + default 값으로 할당하며 아직 명시된 값으로 초기화되어있진 않음

### 초기화(initializing)

<img src="/assets/img/study/initializing.png" width="50%" align="center"><br/>

모든 정적변수가 자바 코드에 명시된 값으로 초기화된다. 정적블록이 실행된다.

## 실행 데이터 영역(Runtime Data Area)

&nbsp;&nbsp;&nbsp;클래스 로드 과정에서 읽힌 클래스 수준의 데이터뿐만 아니라 프로그램에서 사용되는 모든 데이터들이 저장되는 영역이다. 크게 5가지로 나뉘며, 스레드간 공유하는 영역과 스레드별로 개별 할당되는 영역이 존재한다.

<img src="/assets/img/study/runtimedataarea.png" width="70%" align="center"><br/>

+ 모든 스레드가 공유하는 영역
  + Method area
  + Heap area
+ 스레드마다 개별 할당되는 영역
  + Stack area
  + PC Registers
  + Native Method Stack

### 공유영역 - 메서드 영역(method area)

프로그램에서 사용되는 클래스 정보와 클래스 변수가 저장되는 영역이다.

+ 클래스명, 부모클래스명, 클래스 메서드, 클래스 변수 등의 데이터를 저장
+ JVM당 하나밖에 없으며, 모든 스레드가 공유한다.

### 공유영역 - 힙 영역(heap area)

프로그램에서 사용되는 모든 인스턴스 변수가 저장되는 영역이다.

+ new 키워드를 사용하여 인스턴스가 생성되면, 해당 인스턴스의 정보를 힙 영역에 저장한다.
+ 저장한 인스턴스에 대한 참조값을 stack에 반환한다.
  + 만약 stack 값이 null이라면, 참조할 수 있는 값이 없으므로 nullPointerException을 발생시킨다.
+ JVM당 하나밖에 없는 공유자원이기 때문에, 멀티 스레드환경에서 안전하지 않다.

### 개별영역 - 스택 영역(stack area)

프로그램에서 메서드가 호출될 때, 메서드의 스택 프레임이 저장되는 영역이다.

+ 각 스레드마다 개별적으로 영역을 할당받는다.
+ 메서드가 호출되면 메서드 호출과 관계되는 지역변수와 매개변수를 스택영역에 저장하고, 호출이 완료되면 소멸한다.
+ 이렇게 스택 영역에 저장되는 메서드의 호출 정보를 스택 프레임(stack frame)이라 한다.
  + 하나의 스레드가 사용할 수 있는 스택 사이즈를 넘기게 되면, java.lang.StackOverFlowError를 발생시킨다.
+ 스택 프레임은 3부분으로 나누어 진다.
  + Local Variable Array(LVA)
    + 말 그대로 변수를 담을 수 있는 배열이다.
    + 메서드의 모든 파라미터와 지역변수를 담고 있다.
  + Operand Stack(OS)
    + 중간 연산의 결과가 저장되는 공간이다.
    + push와 pop과정을 거쳐서 필요한 작업을 수행한다.
  + Frame Data(FD)
    + 특정 메서드와 관련된 모든 참조와 리턴 값 등이 저장되는 공간이다.

### 개별영역 - PC 레지스터(PC registers)

+ 각 스레드가 시작할 때 생성된다.
+ 스레드가 실행중인 명령어 주소를 담고있다.

### 개별영역 - 네이티브 메서드 스택(native method stack)

  + bytecode가 아닌 binarycode를 실행하는 영역이다.
  + JNI(Java Native Interface)를 통해 호출되는 C/C++ 코드를 실행하는 영역이다.(I/O 작업을 위한 C 라이브러리 함수 등..)

---
**Reference**
+ <https://jeeneee.dev/java-live-study/week5-class/>
+ <https://ahnyezi.github.io/java/javastudy-5/>
+ <https://github.com/hypernova1/TIL/tree/master/java/live-study/05.%20%ED%81%B4%EB%9E%98%EC%8A%A4>
