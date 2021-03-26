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

사실 Filter가 무엇인지가 중요하기 보다는 기능이 중요한 것이다. 컴포넌트 스캔의 중요한 속성 두 가지인 어디부터 어디까지 스캔할 것인가(범위)와 스캔 중 어느 것을 걸러낼 것이냐(필터)와 관련된 설정이 있다는 것을 기억하자.

## @Component

&nbsp;&nbsp;&nbsp;기본적으로 `@Component` 애노테이션이 있는 것들이 빈으로 등록이 된다. `@Service`, `@Repository`, `@Controller`, `@Configuration`는 모두 `@Component`를 가지고 있는 애노테이션들이다.

빈의 스코프(Scope)를 봤을 때 싱글톤 스코프인 빈들은 초기에 다 생성을 한다. 따라서 등록한 빈이 많다면 초기 구동시간이 오래 걸릴 수 있다. 하지만 이건 애플리케이션 구동 타임에서 성능을 조금 잡아먹을 뿐 한 번 구동이 되고 나면 새로운 빈을 만드느라 성능을 잡아먹는 일은 없다.

## @ComponentScan의 동작원리

&nbsp;&nbsp;&nbsp;지금까지의 설명을 보면 `@ComponentScan`
이 마치 모든 것을 다 스캔해서 처리하는 것처럼 보이지만 실제로는 스캔할 패키지와 애노테이션에 대한 정보일 뿐이다.

실제로 스캐닝을 하는 것은 `BeanFactoryPostProcessor`를 구현한 `ConfigurationClassPostProcessor`와 연결이 되어있다.

간략하게 살펴보면 `BeanPostProcessor`와 비슷한 인터페이스이지만 실행되는 시점이 다르다. `BeanFactoryPostProcessor`는 다른 모든 빈들을 만들기 전에 구현체들을 적용한다. 즉, 다른 빈들을 모두 등록하기 전에 컴포넌트 스캔을 해서 등록해준다는 말이다.

---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
