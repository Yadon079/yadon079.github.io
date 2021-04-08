---
layout: post
date: 2021-04-08 17:54:00
title: "Resource 추상화"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, Resource, abstraction ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---

# Resource 추상화

&nbsp;&nbsp;&nbsp;스프링 레퍼런스의 아주 많은 부분을 차지하는 추상화 중의 일부분인 <b>Resource 추상화</b>에 대해 알아보자.

Resource 추상화는 <b>java.net.URL</b>이라는 클래스를 <b>org.springframework.core.io.Resource</b> 클래스로 감싸서 실제 low 레벨에 있는 리소스에 접근하는 기능을 만든 것이다. 즉, 리소스를 추상화한 것인데 리소스인 java.net.URL에 대해서 먼저 알아보자.

## java.net.URL

&nbsp;&nbsp;&nbsp;`URL`은 인터넷 상의 주소를 표현하는 방법을 말한다. 따라서 `java.net.URL` 클래스는 웹 상에 존재하는 자원에 접근할 때 사용하는 클래스인 것이다. 여기서 웹 상에 존재하는 자원은 프로토콜, 호스트, 포트번호 등등을 말한다.



---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
