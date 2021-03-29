---
layout: post
date: 2021-03-29 20:46:00
title: "IoC 컨테이너 6부"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, profile, property ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---

# Environment

&nbsp;&nbsp;&nbsp;Environment는 ApplicationContext의 기능 중 하나로 `EnvironmentCapable`이라는 인터페이스를 상속받은 것이다. `EnvironmentCapable`이 제공하는 기능이 두 가지가 있는데 바로 프로파일(Profile)과 프로퍼티(Property)이다.

# 프로파일

&nbsp;&nbsp;&nbsp;프로파일은 빈들을 묶은 빈들의 그룹 또는 어떠한 환경이라고 할 수 있다.

테스트 환경에서 어떠한 빈들을 사용하겠다, 실제 프로덕션에서는 이러한 빈들을 쓰겠다고 스테이징을 한다. 이처럼 각각의 환경에 따라 다른 빈을 써야하는 경우나 특정 환경에서만 어떠한 빈을 등록해야하는 경우와 같은 요구사항을 충족시키기 위해 프로파일 기능이 추가된 것이다.

이 기능을 `ApplicationContext`의 `Environment`를 통해서 사용할 수 있다.

예제를 통해서 좀 더 자세히 알아보자.

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ApplicationContext ctx;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Environment environment = ctx.getEnvironment();
        System.out.println(Arrays.toString(environment.getActiveProfiles()));
        System.out.println(Arrays.toString(environment.getDefaultProfiles()));
    }
}
```

여기서 사용된 `getEnvironment()`는 `EnvironmentCapable`에서 가져온 것으로 `ApplicationContext`는 `EnvironmentCapable`를 상속받는다.

예제를 실행해보면 `getActiveProfiles`은 비어있고, `getDefaultProfiles`은 <b>default</b>라는 이름의 프로파일이 적용되어 있다.

<img><br/>



---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
