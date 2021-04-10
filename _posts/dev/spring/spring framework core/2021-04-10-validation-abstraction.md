---
layout: post
date: 2021-04-10 18:54:00
title: "Validation 추상화"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, Validation, Validatior ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---

# Validation 추상화

&nbsp;&nbsp;&nbsp;스프링 프레임워크에서 제공하는 추상화 중에는 <b>Validation 추상화</b>가 있다. 이와 관련된 <b>org.springframework.Validation.Validatior</b>는 애플리케이션에서 사용하는 객체를 검증하기 위한 인터페이스이다.

<b>Validatior</b>는 주로 스프링 MVC에서 사용하긴 하지만, 웹 계층에서만 사용하라고 만든 웹 계층 전용의 개념은 아니다. 애플리케이션이 계층형 아키텍쳐를 사용하고 있다면 웹이든, 서비스든, 데이터 레이어든 상관없이 모두 사용할 수 있는 일반적인 인터페이스이다.

또한, 구현체 중 하나로 Bean Validation[^bv] 1.0과 1.1, 2.0 까지 지원하기 때문에 Bean Validation이 제공하는 여러 Validation용 애노테이션을 사용해서 객체의 데이터를 검증할 수 있다.



---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)

---
[^bv]:Bean Validation은 Java EE 표준 스펙 중 하나로 다양한 기능의 애노테이션을 제공한다. 자세한 내용은 [공식문서](https://beanvalidation.org/)를 참조하자.
