---
layout: post
date: 2021-05-05 23:20:00
title: "서블릿 컨테이너(Servlet Container)란?"
description: "웹 서버, 서블릿 컨테이너, JVM"
subject: java
category: [ java ]
tags: [ java, servlet servlet container, web server ]
use_math: true
comments: true
---

# 1. 웹 서버란?

### 웹 페이지를 사용자에게 전송.

서블릿 컨테이너를 알기 전에 웹 서버에 대한 이해가 먼저 필요하다.

<img src="/assets/img/study/img01.jpg" width="70%" align="center"><br/>

웹 서버는 데이터를 전송하기 위해 HTTP 프로토콜을 사용한다. 일반적인 상황에서 사용자는 브라우저에 URL(e.g. www.programcreek.com/static.html)을 입력하고 웹 페이지를 얻게 된다. 웹 서버가 하는 일은 웹 페이지를 사용자에게 전송하는 것이다. 변화하는 것은 <b>HTTP 프로토콜에서 형식이 지정되는 요청과 반응 메세지</b>이다.

# 2. 서블릿 컨테이너란?

### 서블릿 컨테이너는 서블릿들의 생성, 실행, 파괴를 담당.

아래의 그림처럼, 사용자는 서버에 오직 정적인 웹 페이지만 요청할 수 있다. 만약 사용자가 본인의 입력을 토대로한 웹 페이지를 보고 싶다면 이 방법은 충분하지 않다. 서블릿 컨테이너의 일반적인 아이디어는 서버 사이드에서 동적으로 웹 페이지를 생성하기 위해 자바를 사용하는 것이다. 그렇기 떄문에 웹 서버와 서블릿들이 상호작용 할 때 서블릿 컨테이너는 필수적인 부분이다.

<img src="/assets/img/study/img02.jpg" width="70%" align="center"><br/>

# 3. 서블릿이란?

### javax.servlet package에 정의된 인터페이스. 요청을 처리함.

서블릿이란 <b>javax.servlet package에 정의된 인터페이스</b>이다. 이것은 <b>서블릿의 라이프 사이클을 위한 세 가지 필수적인 메소드 `init()`, `service()`, `destroy()`</b>를 정의한다. 이 메소드들은 SDK[^1]에서 정의되거나 자체적으로 정의된 모든 서블릿에 의해 구현되고, 서버에 의해서 특정 시간에 호출된다.



---
**출처**
+ <https://www.programcreek.com/2013/04/what-is-servlet-container>

---
[^1]:Software Development Kit
