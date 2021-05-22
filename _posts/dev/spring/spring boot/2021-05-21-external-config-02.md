---
layout: post
date: 2021-05-15 23:00:00
title: "스프링 부트 활용 : 외부 설정 1부"
description: "스프링 부트 개념과 활용"
subject: Spring Boot
category: [ spring boot ]
tags: [ spring, boot, external config ]
use_math: true
comments: true
---

# 스프링 부트 활용

## 타입 세이프 프로퍼티

&nbsp;&nbsp;&nbsp;프로퍼티 설정 파일이 여러 개 존재할 경우, 같은 key를 사용하는 값들을 묶어서 빈으로 등록해 사용할 수 있다.

```
grace.name = Grace
grace.age = ${random.int(0,100)}
grace.fullName = ${grace.name} Nam
```

```java
package me.gracenam.springinit;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("grace")
public class GraceProperties {

    private String name;

    private int age;

    private String fullName;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

}
```

&nbsp;&nbsp;&nbsp;Getter-Setter를 사용하면 자바 빈 스펙을 따라서 바인딩을 해주기 때문에 Properties에 있는 값들을 자동으로 클래스에 바인딩 해준다. 물론 `@ConfigurationProperties` 애노테이션을 사용해서 key 값을 주면서 무엇에 관한 것인지 마크를 해주어야 한다.

처음에 애노테이션을 사용하면 클래스패스에 애노테이션 프로세서가 없다는 경고문이 뜰 것이다. 이것은 `@ConfigurationProperties` 애노테이션이 달려있는 클래스를 분석해서 meta 정보를 생성해주는 플러그인을 추가하라고 뜨는 것이다.  

아래의 의존성 주입으로 해결해 줄 수 있다.

```
 <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

이렇게만 한다고 끝난 것이 아니고, ConfigurationProperties라는 애노테이션을 통해서 값을 바인딩 받을 수 있게만 처리한 것이고 이 자체만으로는 어디서 가져다가 쓸 수 없는 상태이다.

&nbsp;&nbsp;&nbsp;이제 빈으로 등록해야하는데, 원래는 이러한 애노테이션을 처리할 수 있게 아래와 같이 `@EnableConfigurationProperties`를 사용해서 ConfigurationProperties를 사용하고 있는 클래스 목록을 넣어줘야 한다. 그래야 빈으로 등록해주고 애노테이션을 처리해준다.

```java
package me.gracenam.springinit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(GraceProperties.class)
public class SpringinitApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(SpringinitApplication.class);
        app.setWebApplicationType(WebApplicationType.NONE);
        app.run(args);
    }

}
```

요즘에는 자동으로 EnableConfigurationProperties이 등록되어서 별도로 작성하지 않아도 된다. 단지 Properties 클래스에 `@Component`나 `@Bean`을 사용해서 빈으로 등록해주면 된다.

이제 Runner에 있던 코드를 아래와 같이 `@Autowired`를 사용해서 사용할 수 있다.

```java
package me.gracenam.springinit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class SampleRunner implements ApplicationRunner {

    @Autowired
    GraceProperties graceProperties;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("=================");
        System.out.println(graceProperties.getName());
        System.out.println(graceProperties.getAge());
        System.out.println("=================");
    }

}
```

<img src="/assets/img/study/ex07.png" width="50%" align="center"><br/>

## 융통성 있는 바인딩

&nbsp;&nbsp;&nbsp;공식 문서에는 <b>Relaxed Binding</b>이라고 하는 이것은 properties에 값을 입력할 때 Case naming convention이 여러가지가 허용되는 것이다.

보통 가장 자주쓰이는 Case는 Camel Case로 <b>contextPath</b>와 같이 쓰이는데 Camel case 외에 다른 case로 작성해도 맵핑을 해준다.

+ contextPath : Camel Case
+ context_path : Snake Case
+ context-path : Kebab Case
+ CONTEXTPATH : Upper Case

## Property Type Conversion

&nbsp;&nbsp;&nbsp;스프링 프레임워크에서는 타입 컨버젼도 지원을 하는데, properties 문서 안에서는 타입이라는게 존재하지 않는다. 전부 문자열로 되어 있는데 값이 들어갈 때는 타입이 변환되어서 들어가게 된다. 이런 기본적인 컨버팅이 되는데 스프링 부트가 제공하는 안 똑똑한(...) 컨버젼 타입이 한 가지 있다. 바로 <b>DurationUnit</b>이다. 

DurationUnit은 시간정보인데, 아래와 같이 사용할 수 있다.

```java
@DurationUnit(ChronoUnit.SECONDS)
private Duration sessionTimeout = Duration.ofSeconds(30);
```

`@DurationUnit`이라는 애노테이션을 붙이고 이 값을 초로 받겠다(ChronoUnit.SECONDS)라고 선언한 것이다. 해당 값이 들어오지 않으면 기본값은 30초이다.

properties에 값을 주고 출력이 되는지 확인해 보자.

```
grace.name = Grace
grace.age = ${random.int(0,100)}
grace.fullName = ${grace.name} Nam
grace.sessionTimeout = 25
```

```java
package me.gracenam.springinit;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.convert.DurationUnit;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

@Component
@ConfigurationProperties("grace")
public class GraceProperties {

    private String name;

    private int age;

    private String fullName;

    @DurationUnit(ChronoUnit.SECONDS)
    private Duration sessionTimeout = Duration.ofSeconds(30);

    public Duration getSessionTimeout() {
        return sessionTimeout;
    }

    public void setSessionTimeout(Duration sessionTimeout) {
        this.sessionTimeout = sessionTimeout;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

}
```

```java
package me.gracenam.springinit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class SampleRunner implements ApplicationRunner {

    @Autowired
    GraceProperties graceProperties;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("=================");
        System.out.println(graceProperties.getName());
        System.out.println(graceProperties.getAge());
        System.out.println(graceProperties.getSessionTimeout());
        System.out.println("=================");
    }

}
```

<img src="/assets/img/study/ex08.png" width="50%" align="center"><br/>

설정한 값이 출력되는 것을 확인할 수 있다.

또한 `@DurationUnit` 애노테이션을 사용하지 않고 properties 값 뒤에 단위를 붙이면 Duration이 알아서 컨버젼을 해준다. 굳이 애노테이션을 사용하지 않아도 된다.

## Property 값 검증

&nbsp;&nbsp;&nbsp;지금까지 프로퍼티를 이용해서 많은 값들을 입력받아 사용해왔는데 이렇게 사용되는 값들을 검증하는 방법이 있다.

`@Validated`라는 애노테이션을 붙이고 JSR-303 Validation API를 사용하는 것인데 이 것의 구현체는 hibernate-validator 의존성에 들어있다.

```
grace.name =
grace.age = ${random.int(0,100)}
grace.fullName = ${grace.name} Nam
grace.sessionTimeout = 25
```

```java
package me.gracenam.springinit;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.convert.DurationUnit;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

@Component
@ConfigurationProperties("grace")
@Validated
public class GraceProperties {

    @NotEmpty
    private String name;

    private int age;

    private String fullName;

    @DurationUnit(ChronoUnit.SECONDS)
    private Duration sessionTimeout = Duration.ofSeconds(30);

    public Duration getSessionTimeout() {
        return sessionTimeout;
    }

    public void setSessionTimeout(Duration sessionTimeout) {
        this.sessionTimeout = sessionTimeout;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

}
```

name의 값이 비어있지 말라고(`@NotEmpty`)해놓고 properties의 name을 비워놨다. 그리고 실행을 해보면 validate, 검증하는 과정에서 에러메시지가 출력될 것이다.

<img src="/assets/img/study/ex09.png" width="60%" align="center"><br/>

아주 친절한 에러 메시지가 나오는 것을 확인할 수 있다.

---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)
