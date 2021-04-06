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

이렇게 스프링 부트를 사용한다면 별다른 설정 없이 properties 파일을 사용하여 쉽게 MessageSource를 사용할 수 있다.


---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
