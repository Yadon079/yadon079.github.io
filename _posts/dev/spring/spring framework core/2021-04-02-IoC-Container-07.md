---
layout: post
date: 2021-04-02 01:20:00
title: "IoC 컨테이너 7부"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, MessageSource, ApplicationContext ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---

# MessageSource

&nbsp;&nbsp;&nbsp;MessageSource는 국제화(i18n) 기능을 제공하는 인터페이스로 쉽게 말해 메세지를 다국화하는 방법이다. 이것 역시 ApplicationContext가 상속받고 있는 기능이다.

<img src="/assets/img/study/msgsrc01.png" width="70%" align="center"><br/>

MessageSource의 기능을 간단하게 살펴보자.

resource 폴더 아래에 2가지 파일을 만들었다. 메세지 설정 파일을 세팅하기 위해서 <b>properties 파일</b>이 필요하다.

<img src="/assets/img/study/msgsrc02.png" width="70%" align="center"><br/>

이 때 파일의 이름은 <b>[파일이름]\_[언어]\_[국가].properties</b>와 같은 형식으로 만들어야 한다.

+ messages.properties : 기본 메세지, 시스템 언어 및 지역에 맞는 프로퍼티 파일이 존재하지 않을 경우 사용
+ messages_en_US : 영어 메세지
+ messages_ko_KR : 한글 메세지

&#9654; messages.properties

```
greeting=안녕 {0}
```

&#9654; messages_en_US.properties

```
greeting=Hello {0}
```

이제 출력을 해서 결과를 살펴보자.

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    MessageSource messageSource;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println(messageSource.getMessage("greeting", new String[]{"grace"}, Locale.US));
        System.out.println(messageSource.getMessage("greeting", new String[]{"grace"}, Locale.getDefault()));
    }
}
```

<img src="/assets/img/study/msgsrc03.png" width="70%" align="center"><br/>

기본 국가가 한국이기 때문에 default 출력은 한글로 출력되고 영어로 지정해준 것은 영어로 출력된 것을 확인할 수 있다.

이렇게 스프링 부트를 사용한다면 별다른 설정 없이 properties 파일을 사용하여 쉽게 MessageSource를 사용할 수 있다. `ResourceBundleMessageSource`가 빈으로 등록이 되어있어서 <b>messages</b>라는 번들을 읽고 동작을 하기 때문이다. 부트를 사용하지 않는다면 빈으로 직접 등록을 해주어야 한다.

## ReloadableResourceBundleMessageSource

&nbsp;&nbsp;&nbsp;리로딩 기능이 있는 메세지 소스를 활용해보자. `ReloadableResourceBundleMessageSource`의 객체를 사용해서 메세지 프로퍼티가 갱신되면 바뀐 내용을 읽어올 수 있다.

```java
package me.gracenam.demospring51;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

@SpringBootApplication
@PropertySource("classpath:/app.properties")
public class Demospring51Application {

    public static void main(String[] args) {
        SpringApplication.run(Demospring51Application.class, args);
    }

    @Bean
    public MessageSource messageSource() {
        var messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:/messages");
        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setCacheSeconds(3);
        return messageSource;
    }
}
```

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    MessageSource messageSource;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        while(true) {
            System.out.println(messageSource.getMessage("greeting", new String[]{"grace"}, Locale.US));
            System.out.println(messageSource.getMessage("greeting", new String[]{"grace"}, Locale.getDefault()));
            Thread.sleep(1000l);
        }
    }
}
```

반복문을 활용해서 메세지 내용이 계속 출력되게 한 후 중간에 properties의 내용을 바꾼 후 빌드해주었다.

&#9654; messages.properties

```
greeting=안녕 반갑습니다 {0}
```

<img src="/assets/img/study/msgsrc04.png" width="70%" align="center"><br/>

이처럼 파일을 수정하면 수정한 내용이 바로 적용되는 것을 확인할 수 있다.

---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
