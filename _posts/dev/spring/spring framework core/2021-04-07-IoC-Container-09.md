---
layout: post
date: 2021-04-07 20:58:00
title: "IoC 컨테이너 9부"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, ResourceLoader, ApplicationContext ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---

# ResourceLoader

&nbsp;&nbsp;&nbsp;ResourceLoader는 이름에서 알 수 있듯이 리소스를 읽어오는 기능을 제공하는 인터페이스로 ApplicationContext의 상위 인터페이스이다.

<img src="/assets/img/study/resrc01.png" width="70%" align="center"><br/>

&#9654; AppRunner

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ResourceLoader resourceLoader;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Resource resource = resourceLoader.getResource("classpath:test.txt");
        System.out.println(resource.exists());
    }

}
```

이 상태에서 실행하면 당연히 false가 찍힐 것이다. 왜냐면 test.txt 파일을 아직 만들지 않았기 때문이다.

resources 폴더 아래에 test.txt 파일을 만들고 확인해보자.

&#9654; test.txt

```
hello spring
```

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ResourceLoader resourceLoader;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Resource resource = resourceLoader.getResource("classpath:test.txt");
        System.out.println(resource.exists());
        System.out.println(resource.getDescription());
        System.out.println(Files.readString(Path.of(resource.getURI())));
    }

}
```

test.txt 파일을 만들고 나면 resources 디렉토리에 존재하는 것들이 build하는 과정에 target 디렉토리 밑으로 들어가면서 classpath에 추가된다. classes부터 classpath 루트이고 classpath 기준으로 리소스를 찾는다.

<img src="/assets/img/study/resrc02.png" width="70%" align="center"><br/>

이제 실행한 결과를 살펴보자.

<img src="/assets/img/study/resrc03.png" width="70%" align="center"><br/>

## 리소스를 읽어오는 방법

+ 파일 시스템에서 읽어오기
+ 클래스패스에서 읽어오기
+ URL로 읽어오기
+ 상대 / 절대 경로로 읽어오기

---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
