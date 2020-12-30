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

## 초기화 블럭(initializer)

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

## 클래스 로딩과 메모리 적재과정



---
**Reference**
+ <https://jeeneee.dev/java-live-study/week5-class/>
+ <https://ahnyezi.github.io/java/javastudy-5/#4-%ED%81%B4%EB%9E%98%EC%8A%A4-%EB%A1%9C%EB%94%A9%EA%B3%BC-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EC%A0%81%EC%9E%AC%EA%B3%BC%EC%A0%95>
