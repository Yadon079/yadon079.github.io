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
grace.age = ${random.int(0, 100)}
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



---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)
