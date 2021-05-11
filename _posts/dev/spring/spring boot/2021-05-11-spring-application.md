---
layout: post
date: 2021-05-11 11:35:00
title: "스프링 부트 활용 : SpringApplication"
description: "스프링 부트 개념과 활용"
subject: Spring Boot
category: [ spring boot ]
tags: [ spring, boot ]
use_math: true
comments: true
---

# 스프링 부트 활용

## SpringApplication

&nbsp;&nbsp;&nbsp;스프링 애플리케이션을 만들면 보통 아래와 같은 형태로 만들어진다.

```java
package me.gracenam.springinit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringinitApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringinitApplication.class, args);
    }

}
```

이렇게 사용해도 큰 문제는 없지만 스프링이 제공하는 다양한 커스터마이징 기능을 사용하기가 어렵다.  
다양한 기능을 사용해보기 위해서 인스턴스를 만들어서 run을 하는 방법을 사용해보자. 코드는 다르지만 출력되는 결과는 동일하다.

```java
package me.gracenam.springinit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringinitApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(SpringApplication.class);
        app.run(args);
    }

}
```

&nbsp;&nbsp;&nbsp;아무런 옵션도 변경하지 않고 실행하면 기본적으로 로그 레벨은 <b>INFO</b> 레벨이다.

<img src="/assets/img/study/sa01.png" width="70%" align="center"><br/>

---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)
