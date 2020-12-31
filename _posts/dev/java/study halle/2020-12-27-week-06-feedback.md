---
layout: post
date: 2020-12-27 13:05:00
title: "6주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, super, overriding ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 6주차 과제](https://github.com/whiteship/live-study/issues/6)를 공부하고 공유하기 위해서 작성되었습니다.

# 6주차 회고

&nbsp;&nbsp;&nbsp;스터디하는 방법을 바꿔봤다. 지금까지는 스터디 내용을 하루에 조금씩해서 일주일동안 공부하는 방식이였는데, 그렇게 하기 보다는 짧은 시간에 빠르게 공부하고 추가적인 학습을 하는 편으로 바꾸었다. 학습방법을 바꾸니 일단 심적인 여유가 생기고 라이브 방송 때까지 다른 분들이 공부한 내용을 살펴보면서 추가적인 학습을 하기 좋았다.

&nbsp;&nbsp;&nbsp;실제 코드를 작성할 때 어떻게 해야 좋지에 대한 설명이 잠깐 나왔는데 명시적으로 이름을 짓는게 좋다고 한다. 함수명이나 클래스명을 한 눈에 알아보기 쉽게 작성해야 해당 기능을 쉽게 알 수 있기 때문이다.

# 추가 질문

# Q. 바이트 코드로 봤을 때 왜 다이나믹 디스패치와 스태틱 디스패치가 같은가?

<b>A. 바이트 코드로는 알기 어렵다.</b>  
&nbsp;&nbsp;&nbsp;바이트 코드로는 다이나믹과 스태틱 모두 invokevirtual로 표시되는데 그 이유에 대해서는 잘 모르겠다. 다른 C++을 사용하시는 분의 답변에 의하면 virtual function의 경우 포인터를 통해 Virtual table에 함수들의 주소가 있다. 따라서 주소 접근을 통해 함수가 호출되기 때문에 런타임 시 주소값이 어떻게 테이블에 담기느냐에 따라 호출되는 함수가 다르다고 한다.

# 추가 학습

# 더블 디스패치

과정 요약

-> 디자인 패턴 visitor 패턴

# visitor 패턴



# 오버라이딩 vs 오버로딩


# String[] String... << 가변인자


---
**Reference**
+ <https://leemoono.tistory.com/20>
+ <https://blog.naver.com/swoh1227/222181505425>
+ <https://github.com/ByungJun25/study/tree/main/java/whiteship-study/6week>
