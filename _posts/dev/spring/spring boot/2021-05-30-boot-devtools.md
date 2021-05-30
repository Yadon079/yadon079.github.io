---
layout: post
date: 2021-05-30 12:00:00
title: "스프링 부트 활용 : Spring-Boot-Devtools"
description: "스프링 부트 개념과 활용"
subject: Spring Boot
category: [ spring boot ]
tags: [ spring, boot, devtools ]
use_math: true
comments: true
---

# 스프링 부트 활용

## Spring Boot Devtools

&nbsp;&nbsp;&nbsp;스프링 부트 데브툴즈는 스프링 부트가 제공하는 optional한 툴이다. 즉, 반드시 써야하는 것도 아니고 부트를 사용한다고 기본적으로 적용되는 것도 아니다. pom.xml에 의존성으로 추가해주어야 적용이 되는 부가적인 툴이다.

```
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
        </dependency>
```

`spring-boot-devtools`를 의존성으로 추가하는 순간 기본적으로 적용되는 properties 중에 변경되는 것들이 있다. [변경 되는 설정들](https://github.com/spring-projects/spring-boot/blob/v2.0.3.RELEASE/spring-boot-project/spring-boot-devtools/src/main/java/org/springframework/boot/devtools/env/DevToolsPropertyDefaultsPostProcessor.java)이 다양한데 주로 cache를 끄는, cache와 관련된 설정을 false로 변경한다.

## Re-start

&nbsp;&nbsp;&nbsp;가장 재미있는 기능은 Restart라는 기능이다. 코드를 변경할 때마다 애플리케이션을 바로 재실행해주는 기능이다.  

이렇게 재실행하는 속도가 톰캣을 매번 종료했다가 다시 실행하는 속도보다 빠르다. 왜 빠를까?  
스프링 부트는 클래스 로더를 2개 사용한다. 하나는 Base ClassLoader로 라이브러리들, 우리가 변경하지 않는 의존성을 읽어들이는 클래스 로더이다.  
다른 하나는 <b>Restart ClassLoader</b>로 애플리케이션을 읽어들이는 클래스 로더이다. 이 클래스 로더를 사용해서 애플리케이션이 실행 되었을 떄, 코드를 수정하고 빌드를 하면 서버가 재시작되는 것이 restart 기능이다.

## global properties

&nbsp;&nbsp;&nbsp;`spring-boot-devtools`가 있는 경우, `spring-boot-devtools.properties`가 가장 높은 우선순위를 가지게 된다.

---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)
