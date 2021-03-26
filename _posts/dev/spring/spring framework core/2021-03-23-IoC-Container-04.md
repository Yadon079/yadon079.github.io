---
layout: post
date: 2021-03-23 23:31:00
title: "IoC 컨테이너 4부"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, Component ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---

# @Component와 @ComponentScan

&nbsp;&nbsp;&nbsp;`@Service`나 `@Repository` 같은 애노테이션을 사용해서 빈으로 등록을 할 수 있다. 여기서 한 가지 궁금증이 생긴다. 어떻게 빈으로 등록을 할 수 있는 것일까?

그것을 알기 위해서 main 메소드가 존재하는 메인 클래스에 적용된 `@SpringBootApplication` 애노테이션을 따라 들어가보자. 따라 들어가보면 굉장히 많은 애노테이션들이 붙어있는 것을 볼 수 있는데, 그중에서 바로 `@ComponentScan`이라는 애노테이션이 핵심이다.

이 애노테이션은 스프링 3.1부터 도입이 되었고 가장 중요한 설정이 `basePackage()`이다. 이 패키지 값은 문자열인데 TypeSafe하지 않다. 그래서 TypeSafe한 방법으로 설정하기 위한 `basePackageClasses`라는 속성이 존재한다. 이 값을 사용하면 값에 전달된 클래스를 기준으로 Component Scan을 시작한다.

ComponentScan을 붙이고 있는 Configuration, `@SpringBootApplication`이 붙은 클래스가 시작지점이 되고 같은 패키지 내에 있는 모든 클래스부터 패키지 이하의 다른 패키지에 있는 것들까지 모두 스캔한다. 하지만, 이 패키지 밖에 있는 것은 Component Scan이 되지 않는다.

## Filter

&nbsp;&nbsp;&nbsp;Component Scan에 있어서 중요한 특징 중 하나가 바로 Filter이다. Component Scan을 한다고해서 모든 애노테이션들을 다 빈으로 등록해주는 것은 아니다.

Filter라는 옵션으로 걸러지게 되는데, 기본적으로 `TypeExcludeFilter`와 `AutoConfigurationExcludeFilter` 두 가지가 적용되어 있다.


---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
