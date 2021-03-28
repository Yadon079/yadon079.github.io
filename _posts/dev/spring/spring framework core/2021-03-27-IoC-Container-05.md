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

<span style="font-size:16pt"><b>&#9654; 싱글톤 스코프</b></span>

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

같은 값이 출력되는 것을 확인할 수 있다. 이렇게 애플리케이션 전체에서 오직 해당 빈의 인스턴스 하나만 사용하는 것이 싱글톤이다. 대부분의 경우에는 싱글톤 스코프만 쓰게 될 것이다.

<span style="font-size:16pt"><b>&#9654; 프로토타입</b></span>

&nbsp;&nbsp;&nbsp;만일 인스턴스를 특정 스코프에 따라 새로 만들어야 하는 경우에는 스코프를 변경해 주어야 한다. <b>Request</b>, <b>Session</b>, <b>WebSocket</b> 등등이 있는데 모두 프로토타입과 유사하다.

프로토타입이라는 스코프는 매번 새로운 인스턴스를 만들어서 써야한다.

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

프로토타입 스코프를 준 상태에서 인스턴스가 어떻게 찍히는지 확인해보자. 프로토타입은 매번 다르게 찍힐 것이고 싱글톤은 같을 것이다.

<img src="/assets/img/study/scope02.png" width="70%" align="center"><br/>

이렇게 프로토타입 따로 싱글톤 따로 쓰일 경우에는 간단하지만 만약에 섞이게 되면 굉장히 복잡해진다.

<span style="font-size:16pt"><b>&#9654; 프로토타입이 싱글톤을 참조</b></span>

&nbsp;&nbsp;&nbsp;프로토타입의 빈이 싱글톤 스코프의 빈을 참조해서 쓰는 경우에는 아무 문제가 없다.

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component @Scope("prototype")
public class Proto {

    @Autowired
    Single single;

}
```

싱글톤 스코프 빈은 의도한데로 매번 같은 인스턴스가 들어올 것이고 프로토타입은 매번 바뀌지만 프로토타입이 참조하는 싱글톤 스코프의 빈은 항상 동일할 것이다.

<span style="font-size:16pt"><b>&#9654; 싱글톤이 프로토타입을 참조</b></span>

&nbsp;&nbsp;&nbsp;반면에 싱글톤 스코프에서 프로토타입을 참조할 때는 문제가 생긴다. 싱글톤 스코프의 빈은 싱글톤이기 때문에 인스턴스가 한 번만 만들어지는데 이 때 프로토타입의 프로퍼티가 <b>이미 세팅이 되어버린다.</b> 그렇기 때문에 싱글톤 스코프의 빈을 사용할 때 프로토타입의 프로퍼티가 변경되지 않는 문제가 생긴다.

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

싱글을 거쳐서 프로토를 찍으면 아래와 같이 나온다.

<img src="/assets/img/study/scope03.png" width="70%" align="center"><br/>

보시다싶이 싱글을 거친 경우에는 프로토타입임에도 불구하고 모두 같다.

## 업데이트하는 방법

&nbsp;&nbsp;&nbsp;이것을 해결하는 방법은 여러가지가 있는 그 중에 사용하기는 쉽지만 이해하기는 조금 어려운 방법은 `proxyMode`를 설정해주는 것이다.

<b>proxyMode</b>는 기본값이 `ScopedProxyMode.Default`로 되어있고 이 옵션은 프록시를 사용하지 않는다는 것이다. 지금 사용하는 예제에서는 interface가 아닌 class이기 때문에 `ScopedProxyMode.TARGET_CLASS`를 사용하고 이 경우 CG 라이브러리[^cglib]를 사용한 다이나믹 프록시[^dynamicproxy]가 적용이 된다.



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

---

[^cglib]:CGLIB는 코드 생성 라이브러리로서 런타임에 동적으로 자바 클래스의 프록시를 생성해주는 기능을 제공한다.
[^dynamicproxy]:다이나믹 프록시는 런타임 시점에(컴파일 시점이 아닌) 특정 인터페이스를 구현하는 클래스 혹은 인스턴스를 만드는 기술이다.
