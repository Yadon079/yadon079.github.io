---
layout: post
date: 2021-05-02 16:00:00
title: "스프링 부트 원리 : 자동 설정"
description: "스프링 부트 개념과 활용"
subject: Spring Boot
category: [ spring boot ]
tags: [ spring, boot, EnableAutoConfiguration ]
use_math: true
comments: true
---

[스프링 부트 개념과 활용](https://inf.run/Xny5)을 공부하고 정리하는 포스트입니다.

---

# 스프링 부트 원리

## 자동 설정 이해

&nbsp;&nbsp;&nbsp;아래의 코드는 스프링 부트 애플리케이션을 만들었을 때 생성되는 메인 클래스이다.

```java
package me.gracenam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```

애플리케이션을 실행하면 여러가지 설정이 동작하면서 웹 애플리케이션이 나타난다.  
이것이 가능한 이유 중 하나가 바로 `@SpringBootApplication` 애노테이션 내부에 있는 `@EnableAutoConfiguration` 애노테이션 때문이다.

&nbsp;&nbsp;&nbsp;`@SpringBootApplication` 애노테이션은 다음과 같이 바꿀 수 있다. `@SpringBootApplication`은 세 가지의 중요한 애노테이션을 합친 것과 같다.

```java
package me.gracenam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

// @SpringBootApplication

@SpringBootConfiguration
@ComponentScan
@EnableAutoConfiguration
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```

<b>SpringBootApplication</b>은 빈을 등록하는 과정이 두 단계이다. 한 번은 `@ComponentScan`으로 등록하고, 그 다음에 `@EnableAutoConfiguration`으로 읽어온 빈들을 등록한다.  
그래서 EnableAutoConfiguration 단계가 없더라도 스프링 부트는 사용할 수 있다.

만약 웹 애플리케이션이 아닌 상태로 실행하고 싶다면 아래와 같이 작성하면 가능하다.

```java
package me.gracenam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

// @SpringBootApplication

@Configuration
@ComponentScan
public class Application {

   public static void main(String[] args) {
       SpringApplication application = new SpringApplication(Application.class);
       application.setWebApplicationType(WebApplicationType.NONE);
       application.run(args);
   }

}
```

하지만 여기서는 웹 애플리케이션이기 때문에 없이 실행한다면 에러가 발생하게 된다. ServletWeb 설정이 적용되지 않기 때문이다.

## @ComponentScan

&nbsp;&nbsp;&nbsp;첫 번째 빈 등록 단계인 `@ComponentScan`은 `@Component`라는 애노테이션을 가진 클래스들을 스캔해서 빈으로 등록하는 애노테이션이다.

`@ComponentScan`은 자기 자신(애노테이션이 달린)을 가진 클래스부터 시작해서 하위 패키지까지 모두 스캔하여 `@Component`, `@Configuration`, `@Repository`, `@Service`, `@Controller`, `@RestController`가 달린 클래스를 찾아서 빈으로 등록한다.

---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)
