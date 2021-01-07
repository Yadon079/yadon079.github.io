---
layout: post
date: 2021-01-07 18:52:00
title: "스프링 @AOP 실습"
description: "예제로 배우는 스프링 입문"
subject: Spring revised edition
category: [ spring ]
tags: [ spring, aop ]
use_math: true
comments: true
---

[예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)의 내용을 정리하는 포스트

---

# 스프링 @AOP 실습

## 스프링 AOP를 사용하여 성능 측정해보기

Annotation을 활용하여 성능 측정을 해보자. 성능을 측정하고 싶은 메소드에 annotation을 붙여서 콘솔에 성능이 출력되도록 할 것이다.

### LogExecutionTime.java

```java
    package org.springframework.samples.petclinic.owner;

    import java.lang.annotation.ElementType;
    import java.lang.annotation.Retention;
    import java.lang.annotation.RetentionPolicy;
    import java.lang.annotation.Target;

    @Target(ElementType.METHOD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface LogExecutionTime {
    }
```

메소드에 `LogExecutionTime`이라는 annotation을 추가하자. `@Target`은 어디에 쓸 수있는지 메소드에게 알려주는 annotation이고, `@Retention`은 annotation의 정보를 언제까지 유지할 것인지를 알려주는 annotation이다.

이렇게 만들어 놓고 추가한다고 실행하면 동작하느냐? 아니다. 그냥 만들기만 하면 주석과 다름없다. 이러한 annotation을 읽어서 처리하는 Aspect를 만들도록 하자.

### LogAspect.java

```java
    package org.springframework.samples.petclinic.owner;

    import org.aspectj.lang.ProceedingJoinPoint;
    import org.aspectj.lang.annotation.Around;
    import org.aspectj.lang.annotation.Aspect;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;    
    import org.springframework.stereotype.Component;
    import org.springframework.util.StopWatch;

    @Component
    @Aspect
    public class LogAspect {

        Logger logger = LoggerFactory.getLogger(LogAspect.class);

        @Around("@annotation(LogExecutionTime)")
        public Object logExecutionTime(ProceedingJoinPoint JoinPoint) throws Throwable {
            StopWatch stopWatch = new StopWatch();
            stopWatch.start();

            Object proceed = joinPoint.proceed();

            stopWatch.stop();
            logger.info(stopWatch.prettyPrint());

            return proceed;
        }
    }
```

빈으로 등록하기 위해서 `@Component`라는 annotation을 붙여주고, `@Aspect`임을 알려준다. `slf4j`로 Logger를 만들고, `@Around` 이하의 코드는 어드바이스라고 하는데, `@Around`라는 annotation으로 `joinPoint`라는 파라미터를 받을 수 있다. 이 파라미터는 타겟, 여기서는 `@LogExecutionTime`이 붙어있는 메소드를 말한다.

이 Aspect는 프록시 패턴 기반으로 동작하는 AOP이다.

---
**Reference**
+ [예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)
