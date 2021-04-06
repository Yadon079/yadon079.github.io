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

---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
