---
layout: post
date: 2021-01-02 13:03:00
title: "스프링 빈(Bean)"
description: "예제로 배우는 스프링 입문"
subject: Spring revised edition
category: [ spring ]
tags: [ spring, Bean ]
use_math: true
comments: true
---

[예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)의 내용을 정리하는 포스트

---

# 스프링 빈(Bean)

## 빈(Bean)

일반적인 객체인데 스프링 IoC 컨테이너가 관리하는 객체를 빈(Bean)이라고 한다. 가령 어떠한 객체를 만들었을 때, 직접 `new`를 사용하여 만든 그 객체는 빈이 아니다.

그렇다면 어떻게 만들 수 있을까? 어떻게 특정한 인스턴스를 빈으로 할 수 있을까? 그 방법은 크게 두 가지가 있다.

## Component Scanning

첫 번째는 `Component Scan`이다. `Annotation Processor` 중에 스프링 IoC 컨테이너가 사용하는, 컨테이너를 만들고 안에 빈을 등록할 때 사용하는, 여러가지 인터페이스들을 `LifeCycle CallBack`이라고 한다. 이러한 `LifeCycle CallBack` 중에 `annotation`을 찾아서 해당 `annotation`이 붙어 있는 모든 클래스의 인스턴스를 만들어서 빈으로 등록하는 처리기가 등록되어 있다.

`Component Scan`이라는 `annotation`은 어디부터 컴포넌트를 찾아보라고 알려주는 역할을 한다. 알려주는 위치부터 모든 하위 패키지의 클래스를 찾아보게 된다.

`Component`라는 `annotation`을 사용한 `annotation`이 몇 가지 있다.

+ @Component
  + @Repository
  + @Service
  + @Controller
  + @Configuration

외에도 직접 정의할 수도 있는데, 이런 `annotation`이 붙어 있는 모든 클래스를 찾아서 빈으로 등록해주는게 `Component Scan`이라는 기능이다.

## 직접 Xml이나 설정 파일에 등록

또 다른 방법은 직접 빈으로 등록하는 것인데, 빈 설정파일이 Xml이냐 자바 설정 파일이냐에 따라 다르다.

자바 설정 파일의 경우

```java
    package org.springframework.samples.petclinic.sample;

    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;

    @Configuration
    public class SampleConfig {

        @Bean
        public SampleController sampleController() {
            return new SampleController();
        }
    }
```

와 같이 `Configuration`이라는 `annotation`이라는 붙어있는 클래스 안에 `Bean`이라는 `annotation`을 사용해서 직접 정의 할 수 있다. 메소드에서 리턴하는 객체 자체가 IoC 컨테이너 안에 빈으로 등록된다.

---
**Reference**
+ [예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)
