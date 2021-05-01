---
layout: post
date: 2021-05-01 10:00:00
title: "스프링 부트 시작하기"
description: "스프링 부트 개념과 활용"
subject: Spring Boot
category: [ spring ]
tags: [ spring, boot, intro ]
use_math: true
comments: true
---

[스프링 부트 개념과 활용](https://inf.run/Xny5)을 공부하고 정리하는 포스트입니다.

---

# 스프링 부트 소개

&nbsp;&nbsp;&nbsp;스프링 부트는 제품 수준의 스프링 기반 애플리케이션을 만들 때 쉽고 빠르게 만들 수 있게 도와준다. 스프링 부트는 일일히 직접 설정하지 않아도 된다. 기본적으로 가장 많은 유저들이 사용하는 설정을 제공해 준다.

이러한 스프링 부트의 목표는 다음과 같다.

+ 모든 스프링 개발에 있어서 더 빠르고 폭 넓은 사용성을 제공한다.
+ <b>Convention over Configuration</b>(설정보다 관습)[^1]을 제공한다. 하지만 원하는대로 쉽고 빠르게 변경할 수 있다.
+ 비즈니스 로직을 구현하는데 필요한 기능 뿐만 아니라 Non-functional features(비 기능적 요구 사항)도 제공한다.
+ Code generation과 Xml을 요구하지 않는다.


## 요구 사항

스프링 부트 2.0.3 버전은 Java 8 이상, Spring Framework 5.0.7 이상, Maven 3.2 또는 Gradle 4 이상을 요구한다.

서블릿은 3.1 이상이면 된다.


# 부트 시작하기

&nbsp;&nbsp;&nbsp;부트를 작성하는 방법은 공식 문서에서도 제공을 해준다.

1. [spring.io](https://spring.io)에서 Projects - Spring Boot 선택
2. LEARN의 Documentaion에서 Reference Doc.을 선택
3. Getting Started - 3.Installing Spring Boot - 3.1 Installation Instructions for the Java Developer 선택

이 후 Maven과 Gradle 중 선택하여 설치를 하면된다.

p.s. 요즘은 IDE가 좋아서 알아서 다 설정을 해준다...

&#9654; <b>IntelliJ</b>

<img src="/assets/img/study/boot01.png" width="70%" aling="center"><br/>

1. 새 프로젝트 생성에서 원하는 빌드 도구(Maven or Gradle)를 선택한다. (익숙한 maven을 선택했다.)

<img src="/assets/img/study/boot02.png" width="70%" aling="center"><br/>

2. groupId와 artifactId를 정한 후 생성한다. 보통 프로젝트명은 artifactId와 동일하다.

<img src="/assets/img/study/boot03.png" width="70%" aling="center"><br/>

3. 짜잔! 위와 같이 나온다면 부트 생성이 완료된 것이다.

4. pom.xml에 아래 코드들을 추가해준다.

```
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.4</version>
    </parent>

    <properties>
        <maven.compiler.source>13</maven.compiler.source>
        <maven.compiler.target>13</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.4.4</version>
            </plugin>
        </plugins>
    </build>
```

5. java 아래에 패키지를 하나 만들고(me.gracenam) 메인 클래스(Application.java)를 생성한다.
6. Application 클래스에 `@SpringBootApplication` 애노테이션을 추가하고 메인 메서드를 생성한 후 실행해서 아래와 같이 출력된다면 기본적인 애플리케이션 생성에 성공한 것이다.

<img src="/assets/img/study/boot04.png" width="70%" aling="center"><br/>

&#128161; IntelliJ 얼티밋 버전을 사용한다면 IDE에서 제공하는 Spring Initializr를 사용해서 바로 생성할 수 있다. 의존성 주입도 자동으로 해준다!

### 스프링 부트 프로젝트 생성기

&nbsp;&nbsp;&nbsp;스프링 부트 프로젝트를 생성하는 또 다른 방법이 있다. 바로 스프링 부트 프로젝트 생성기(Spring Initializr)를 사용하는 것이다. 아래의 사이트에 들어가면 원하는 빌드 도구와 버전 등을 선택해서 프로젝트를 생성할 수 있다.

&#9654; [Spring Initializr](https://start.spring.io)

생성한 프로젝트를 IDE 등으로 열어서 사용할 수 있다.

이 외에도 콘솔을 이용해서 생성할 수도 있지만 이 방법은 다소 귀찮으므로 생략하도록 하겠다.

---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)

---
[^1]:프레임워크를 사용하는 개발자가 취해야 하는 결정의 수를 줄이기 위한 소프트웨어 디자인 패러다임. 가장 많은 유저들이 사용하는 설정을 제공하는 것.
