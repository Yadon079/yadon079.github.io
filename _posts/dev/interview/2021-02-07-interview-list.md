---
layout: post
date: 2021-02-07 17:01:00
title: "면접 기초 질문 리스트"
description: "백엔드 면접 대비 질문 리스트"
subject: Interview
category: [ cs ]
tags: [ cs, interview, web ]
comments: true
---

> 원 글 : 안산학생님의 [백엔드 면접 기초 질문 리스트](https://haejun0317.tistory.com/238)

&nbsp;&nbsp;&nbsp;안산학생님께서 백엔드 직무를 준비하시면서 공부하신 것들을 정리한 글을 보고 공부도 하고 기록도 하기 위해서 작성하는 글이다.

질문에 대한 답변을 스스로 해보고 각 질문을 클릭하면 해당 답변이 나타난다.

p.s. 답변에 대한 보다 자세한 내용을 알고 싶다면 자바 스터디 포스팅들을 참고하면 된다.

---

<details>
  <summary><b>컴포넌트와 모듈의 차이</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;컴포넌트와 모듈은 비슷하지만 모듈이 컴포넌트보다 큰 단위라고 할 수 있다. 두 용어 모두 전체 시스템을 구성하는 부분 부분을 분해하는 것을 목적으로 사용된다.</p>
  <p>&nbsp;&nbsp;&nbsp;컴포넌트는 하나의 부품으로, 보통 작은 영역에서 서로 연관되어 다용도로 사용이 가능하게 만든다. 컴포넌트는 런타임 개체를 참조하는데 예를 들어 UI를 제어하는 타이머와 같이 Back단에서 스레드를 보조하는 컴포넌트가 있다.  
  &nbsp;&nbsp;&nbsp;모듈은 작은 범위의 조각으로 가장 첫 번째 그리고 가장 맨 앞에 위치하는 구현의 단위이다. 외부 인터페이스가 없는 복합적인 수요기능에서 실행될 수 있는 단위로 호환성이 좋다. 예시로 데이터베이스나 이메일 같이 통합적인 기능을 제공하면서 라이브러리처럼 사용될 수 있는 것들이 있다.</p>
  <p>&nbsp;&nbsp;&nbsp;컴포넌트는 소프트웨어 활동 단위를, 모듈은 구현 단위와 산출물을 중점으로 하고 있다.</p>
</details>

<details>
  <summary><b>자바란 무엇인가</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;자바는 객체지향 프로그래밍 언어로서 보안성이 뛰어나며 컴파일한 코드는 다른 운영체제에서 사용될 수 있도록 클래스로 제공된다. C++의 객체지향적인 장점을 살리면서 분산환경을 지원해 효율적이다. 이러한 동작의 배경에는 JVM이 있다.</p>
</details>

<details>
  <summary><b>자바의 구동원리</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;자바로 작성한 코드는 `.java`라는 확장자를 가지며 자바에 존재하는 전용컴파일러 `javac`를 통해 컴파일 한다. 자바코드를 컴퓨터가 이해할 수 있도록 프로그래밍 언어에서 기계어로 변경되면 `.class` 확장자를 가지는 파일이 생성되고, 이 파일이 JVM을 통해서 실행된다.</p>
</details>

<details>
  <summary><b>JVM의 특징</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;JVM은 Java Virtual Machine의 약자로 자바 가상머신을 뜻한다. 자바소스로부터 만들어진 바이너리 파일(.class)을 실행하기 위해 필요하다. 자바가 OS에 구애받지 않고 사용가능하게 만들어주는 이유이기도 하다. 또한 자동 메모리 관리 기법인 Garbage Collection을 수행한다.</p>
  <p>
  &#128073; JRE : 자바 실행환경. JVM으로 자바자프로그램을 동작시킬 때 필요한 파일들을 가지고 있다.<br/>
  &#128073; JDK : Java 개발을 하기위해 필요한 환경. JDK에는 JRE가 포함되어 있다.
  </p>
</details>

<details>
  <summary><b>객체지향과 절차지향의 차이점</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;절차지향 프로그래밍이란 물이 위에서 아래로 흐르듯이 순차적인 처리가 중요시되며 프로그램 전체가 유기적으로 연결되도록 만드는 프로그래밍 기법이다. 컴퓨터의 처리구조와 유사하여 실행속도가 빠르다는 장점이 있지만 유지보수가 어렵고 실행순서가 정해져 있어 코드의 순서가 바뀌면 결과 값이 달라질 수 있고 디버깅이 어렵다는 단점이 있다.</p>
  <p>&nbsp;&nbsp;&nbsp;객체지향은 실제 세계를 모델링하여 소프트웨어를 개발하는 방법이다. 컴퓨터 부품을 하나씩 구해서 조립하는 것과 같이 프로그래밍한다. 코드의 재활용성이 높고 디버깅이 쉬운 장점이 있으나 절차지향에 비해 처리속도가 느리고 설계에 시간이 많이 걸린다는 단점이 있다.</p>
</details>
<br/>

<details>
  <summary><b>객체지향 언어의 특징</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
</details>

<details>
  <summary><b>상속과 구현의 차이점과 특징 및 장단점</b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b>오버라이딩과 오버로딩의 차이점과 특징</b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b>기본형 변수와 참조형 변수는 무엇이 있나?</b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b>스택 오버플로우가 왜 일어나는가?</b></summary>
  <br/>
  <p></p>
</details>
<br/>

<details>
  <summary><b>메모리 누수가 무엇인가?</b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b>메모리 누수를 막기 위한 방법</b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b>Static에 대한 설명</b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b>싱글톤 패턴이 무엇인가? 디자인 패턴이란?</b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b>익명 클래스와 익명 객체란?</b></summary>
  <br/>
  <p></p>
</details>
<br/>

<details>
  <summary><b>Java 문자열 검색</b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b>자료구조 특징, 장단점</b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b>쓰레드는 무엇이고 언제 쓰이는가?</b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b>멀티쓰레드와 쓰레드의 차이점</b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b>제네릭은 무엇인가?</b></summary>
  <br/>
  <p></p>
</details>
<br/>

<details>
  <summary><b></b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b></b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b></b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b></b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b></b></summary>
  <br/>
  <p></p>
</details>
<br/>

<details>
  <summary><b></b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b></b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b></b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b></b></summary>
  <br/>
  <p></p>
</details>

<details>
  <summary><b></b></summary>
  <br/>
  <p></p>
</details>
<br/>

<details>
  <summary><b></b></summary>
  <br/>
  <p></p>
</details>
