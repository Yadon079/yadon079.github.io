---
layout: post
date: 2021-04-06 19:25:00
title: "IoC 컨테이너 8부"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, ApplicationEventPublisher, ApplicationContext ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---

# ApplicationEventPublisher

&nbsp;&nbsp;&nbsp;ApplicationEventPublisher는 옵저버 패턴(observer pattern)의 구현체로 이벤트 기반의 프로그래밍을 할 때 유용한 인터페이스이다. 이것 역시 ApplicationContext의 상위 인터페이스이다.

<img src="/assets/img/study/event01.png" width="70%" aling="center"><br/>

간단한 코드를 통해서 더 알아보자.

일단 Event가 있다고 가정하자. 스프링 4.2 이전에는 항상 <b>ApplicationEvent</b>라는 클래스를 상속받아야 했다. 이 Event는 빈으로 등록되는 것이 아니다. 원하는 데이터를 담아서 전송할 수도 있고, 또는 이벤트를 발생시킬 소스만 전달할 수도 있다.

```java
package me.gracenam.demospring51;

import org.springframework.context.ApplicationEvent;

public class MyEvent extends ApplicationEvent {

    public MyEvent(Object source) {
        super(source);
    }
}
```

data를 추가하고 Event를 퍼블리쉬해야하는데 Event를 발생시키는 기능을 ApplicationContext가 가지고 있다. AppRunner를 추가하자.

```java
package me.gracenam.demospring51;

import org.springframework.context.ApplicationEvent;

public class MyEvent extends ApplicationEvent {

    private int data;

    public MyEvent(Object source) {
        super(source);
    }

    public MyEvent(Object source, int data) {
        super(source);
        this.data = data;
    }

    public int getData() {
        return data;
    }
}
```

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ApplicationEventPublisher applicationContext;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        applicationContext.publishEvent(new MyEvent(this, 100));
    }

}
```

Runner가 추가되었고 Event가 발생할 수 있게 되었는데, 그렇다면 Event를 받아서 처리할 수 있는 Handler는 어떻게 만들어야 할까? EventHanlder는 빈으로 등록이 되어서 처리해야 한다.

```java
package me.gracenam.demospring51;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class MyEventHandler implements ApplicationListener<MyEvent> {

    @Override
    public void onApplicationEvent(MyEvent event) {
        System.out.println("이벤트를 받았다! 데이터는 " + event.getData());
    }

}
```

Handler에서는 전달받은 `MyEvent`를 통해서 데이터를 꺼낸다던가 하는 작업을 할 수 있다.

이제 실행을 하면 다음과 같은 순서로 동작할 것이다.

1. SpringBoot 실행
2. AppRunner 실행
3. AppRunner에서 Event를 발생시킴
4. 발생된 Event를 등록된 빈 중 MyEventHandler가 받아서 출력함

&nbsp;&nbsp;&nbsp;스프링 4.2 이전에는 이처럼 `ApplicationListener`와 같은 특정한 인터페이스를 구현을 했어야 했다. 하지만 4.2 이후부터는 이러한 제약사항이 사라졌기 때문에 `MyEvent`에서 <b>ApplicationEvent</b>를 상속받을 필요가 없다.

```java
package me.gracenam.demospring51;

public class MyEvent{

    private int data;

    private Object source;

    public MyEvent(Object source, int data) {
        this.source = source;
        this.data = data;
    }

    public Object getSource() {
        return source;
    }

    public int getData() {
        return data;
    }
}
```

그리고 이러한 것이 바로 스프링 프레임워크가 추구하는 철학이다. 비침투성. 이 코드에는 스프링 패키지가 전혀 들어있지 않다. 이렇게 깔끔한 코드를 스프링 프레임워크는 추구한다. 프레임워크 코드가 개인 코드에 노출되지 않는 이러한 것이 포조(POJO)이고 포조 기반의 프로그래밍을 할 때 테스트하기 편하고 유지보수 하기 쉬워진다.

Event가 바뀌었으니 Handler로 마찬가지로 더 이상 특정한 클래스를 구현하지 않아도 된다.

```java
package me.gracenam.demospring51;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class MyEventHandler {

    @EventListener
    public void handle(MyEvent event) {
        System.out.println("이벤트를 받았다! 데이터는 " + event.getData());
    }

}
```

대신 누구한테 이 Event를 전달해야하는지 스프링이 알아야 하므로 빈으로는 등록이 되어야 한다. Event를 처리하는 메서드 위에 `@EventListener`라는 애노테이션을 추가해 준다. 메서드 이름은 자유롭게 바꿀 수 있다.

&nbsp;&nbsp;&nbsp;여러 개의 EventHanlder가 있는 경우를 살펴보자.

```java
package me.gracenam.demospring51;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class AnotherHandler {

    @EventListener
    public void handler(MyEvent myEvent) {
        System.out.println("Another : " + myEvent.getData());
    }

}
```

AnotherHandler를 추가해주었는데, 두 Handler 모두 실행된다. 이 때 순차적으로 실행이 되는데, 여기서 순차적이라는 말은 "순서"는 알 수가 없지만 하나가 실행된 후에 다른 하나가 실행된다는 말이다. 동시에 다른 쓰레드에서 실행이 되는 것이 아니다.

쓰레드를 찍어서 확인해보자.

&#9654; MyEventHandler

```java
package me.gracenam.demospring51;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class MyEventHandler {

    @EventListener
    public void handle(MyEvent event) {
        System.out.println(Thread.currentThread().toString());
        System.out.println("이벤트를 받았다! 데이터는 " + event.getData());
    }

}
```

&#9654; AnotherHandler

```java
package me.gracenam.demospring51;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class AnotherHandler {

    @EventListener
    public void handler(MyEvent myEvent) {
        System.out.println(Thread.currentThread().toString());
        System.out.println("Another : " + myEvent.getData());
    }

}
```

<img src="/assets/img/study/event02.png" widht="70%" align="center"><br/>

둘 모두 main 쓰레드인 것을 확인할 수 있고, 이 떄의 순서는 랜덤인지 아니면 어떠한 순서를 보장하는지는 알 수 없다.

## 순서가 중요한 경우

&nbsp;&nbsp;&nbsp;순서가 중요한 경우 순차적으로 실행하기 위해 `@Order` 애노테이션을 사용해서 순서를 정할 수 있다.

```java
package me.gracenam.demospring51;

import org.springframework.context.event.EventListener;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
public class AnotherHandler {

    @EventListener
    @Order(Ordered.HIGHEST_PRECEDENCE + 2)
    public void handler(MyEvent myEvent) {
        System.out.println(Thread.currentThread().toString());
        System.out.println("Another : " + myEvent.getData());
    }

}
```

```java
package me.gracenam.demospring51;

import org.springframework.context.event.EventListener;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
public class MyEventHandler {

    @EventListener
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public void handle(MyEvent event) {
        System.out.println(Thread.currentThread().toString());
        System.out.println("이벤트를 받았다! 데이터는 " + event.getData());
    }

}
```

Another를 나중에 출력하기 위해서 +2를 해주었다.

<img src="/assets/img/study/event03.png" width="70%" aling="center"><br/>

## 비동기적으로 실행

&nbsp;&nbsp;&nbsp;각각 별개의 스레드에서 동작하는 비동기적인 실행을 하고 싶을 땐 `@Async` 애노테이션을 사용하면 된다.

```java
package me.gracenam.demospring51;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class MyEventHandler {

    @EventListener
    @Async
    public void handle(MyEvent event) {
        System.out.println(Thread.currentThread().toString());
        System.out.println("이벤트를 받았다! 데이터는 " + event.getData());
    }

}
```

```java
package me.gracenam.demospring51;

import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class AnotherHandler {

    @EventListener
    @Async
    public void handler(MyEvent myEvent) {
        System.out.println(Thread.currentThread().toString());
        System.out.println("Another : " + myEvent.getData());
    }

}
```

비동기적으로 실행할 때는 각각의 스레드 풀에서 따로 동작하고 스레드 스케쥴링에 따라서 순서가 정해지기 때문에 `@Order`가 더 이상 의미가 없어진다.

물론 저 상태로 실행하면 둘 다 main에서 실행되는데 `@Async` 애노테이션을 붙인다고 Async하게 동작하는 것은 아니기 때문이다. `@EnableAsync`를 사용해야 Async하게 동작한다.

```java
package me.gracenam.demospring51;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class Demospring51Application {

    public static void main(String[] args) {
        SpringApplication.run(Demospring51Application.class, args);
    }
}
```

<img src="/assets/img/study/event04.png" width="70%" aling="center"><br/>

# 스프링이 제공하는 기본 이벤트

&nbsp;&nbsp;&nbsp;스프링에서는 기본적으로 제공하는 ApplicationContext와 관련된 이벤트들이 있다. 이 이벤트들은 ApplicationContext에 관한 것이기 때문에 내부에서 ApplicationContext를 꺼내서 사용할 수도 있다.

<span style="font-size:16pt"><b>&#9654; ContextRefreshedEvent</b></span>

ApplicationContext를 초기화했거나 리프레시 했을 때 발생한다.

<span style="font-size:16pt"><b>&#9654; ContextStartedEvent</b></span>

ApplicationContext를 start()하여 라이프사이클 번들이 시작 신호를 받은 시점에 발생한다.

<span style="font-size:16pt"><b>&#9654; ContextStoppedEvent</b></span>

ApplicationContext를 stop()하여 라이프사이클 번들이 정지 신호를 받은 시점에 발생한다.

<span style="font-size:16pt"><b>&#9654; ContextClosedEvent</b></span>

ApplicationContext를 close()하여 싱글톤 빈이 소멸되는 시점에 발생한다.

<span style="font-size:16pt"><b>&#9654; RequestHandledEvent</b></span>

HTTP 요청을 처리했을 때 발생한다.


```java
package me.gracenam.demospring51;

import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class MyEventHandler {

    @EventListener
    @Async
    public void handle(MyEvent event) {
        System.out.println(Thread.currentThread().toString());
        System.out.println("이벤트를 받았다! 데이터는 " + event.getData());
    }

    @EventListener
    @Async
    public void handle(ContextRefreshedEvent event) {
        System.out.println(Thread.currentThread().toString());
        System.out.println("ContextRefreshedEvent");
    }

    @EventListener
    @Async
    public void handle(ContextClosedEvent event) {
        System.out.println(Thread.currentThread().toString());
        System.out.println("ContextClosedEvent");
    }

}
```

<img src="/assets/img/study/event05.png" width="70%" align="center"><br/>

---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
