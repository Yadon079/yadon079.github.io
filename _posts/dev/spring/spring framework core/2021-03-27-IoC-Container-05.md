---
layout: post
date: 2021-03-27 03:38:00
title: "IoC 컨테이너 5부"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, scope, bean ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---

# 빈의 스코프

&nbsp;&nbsp;&nbsp;빈의 Scope에는 싱글톤과 프로토타입이 있는데, 스프링 IoC 컨테이너에 등록되는 빈들은 기본적으로 싱글톤으로 등록이 된다. 싱글톤은 해당 빈의 인스턴스를 오직 하나만 생성해 모든 Application에 사용하는 것을 말하며 프로토타입(Prototype)은 매번 다른 객체를 생성하는 것이다.

+ Singleton(싱글톤)
  + 기본(Default) 스코프. 애플리케이션 전반에 걸쳐 해당 빈의 인스턴스가 오직 한 개인 것
+ Prototype(프로토타입)
  + 애플리케이션이 요청할 때마다 새로운 인스턴스를 생성하는 것

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Single {

    @Autowired
    private Proto proto;

    public Proto getProto() {
        return proto;
    }
}
```

```java
package me.gracenam.demospring51;

import org.springframework.stereotype.Component;

@Component
public class Proto {
}
```

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    Single single;

    @Autowired
    Proto proto;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println(proto);
        System.out.println(single.getProto());
    }
}
```

Single 클래스와 Proto 클래스 모두 빈으로 등록하고 Single 클래스에서 Proto 타입의 필드를 getter로 가져온다.

이제 각각을 출력했을 때 어떻게 출력이 되는지 확인하기 위해 AppRunner 클래스에 run 메소드를 만들어서 찍어보겠다. 첫 번째 proto는 AppRunner가 주입받은 proto이고 두 번째는 Single이 참조하고 있는 proto인데 이 두 인스턴스가 같을 것이다.

<img src="/assets/img/study/scope01.png" width="70%" align="center"><br/>

같은 값이 출력되는 것을 확인할 수 있다. 이렇게 애플리케이션 전체에서 오직 해당 빈의 인스턴스 하나만 사용하는 것이 싱글톤이다.

```java
package me.gracenam.demospring51;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component @Scope("prototype")
public class Proto {
}
```

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ApplicationContext ctx;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("proto");

        System.out.println(ctx.getBean(Proto.class));
        System.out.println(ctx.getBean(Proto.class));
        System.out.println(ctx.getBean(Proto.class));

        System.out.println("single");

        System.out.println(ctx.getBean(Single.class));
        System.out.println(ctx.getBean(Single.class));
        System.out.println(ctx.getBean(Single.class));
    }
}
```

<img src="/assets/img/study/scope02.png" width="70%" align="center"><br/>

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ApplicationContext ctx;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("proto");

        System.out.println(ctx.getBean(Proto.class));
        System.out.println(ctx.getBean(Proto.class));
        System.out.println(ctx.getBean(Proto.class));

        System.out.println("single");

        System.out.println(ctx.getBean(Single.class));
        System.out.println(ctx.getBean(Single.class));
        System.out.println(ctx.getBean(Single.class));

        System.out.println("proto by single");

        System.out.println(ctx.getBean(Single.class).getProto());
        System.out.println(ctx.getBean(Single.class).getProto());
        System.out.println(ctx.getBean(Single.class).getProto());
    }
}
```

<img src="/assets/img/study/scope03.png" width="70%" align="center"><br/>

```java
package me.gracenam.demospring51;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

@Component @Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class Proto {
}
```

<img src="/assets/img/study/scope04.png" width="70%" align="center"><br/>



---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
