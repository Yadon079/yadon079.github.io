---
layout: post
date: 2021-04-21 20:30:00
title: "데이터 바인딩 추상화 : Converter와 Formatter"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, databinding, converter, formatter ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---

# 데이터 바인딩 추상화 : Converter와 Formatter

&nbsp;&nbsp;&nbsp;PropertyEditor는 Object-String간의 변환만 가능하다. 이러한 단점을 해결하기 위해 생긴 인터페이스가 바로 <b>Converter</b>와 <b>Formatter</b>이다.

## Converter

&nbsp;&nbsp;&nbsp;<b>Converter</b>는 A 타입을 B 타입으로 변환 할 수 있는 좀 더 일반적인 데이터 바인딩이 가능한 변환기이다. PropertyEditor와 다르게 상태 정보를 가지고 있지 않기 때문에 Stateless하다. 즉 ThreadSafe한 것이다.

이제 Converter를 어떻게 사용하는지 살펴보자.

```java
package me.gracenam.demospring51;

import org.springframework.core.convert.converter.Converter;

public class EventConverter{

    public static class StringToEventConverter implements Converter<String, Event> {

        @Override
        public Event convert(String source) {
            return new Event(Integer.parseInt(source));
        }
    }

    public static class EventToStringConverter implements Converter<Event, String> {

        @Override
        public String convert(Event source) {
            return source.getId().toString();
        }
    }

}
```

<b>EventConverter</b>라는 클래스를 만들었다. Converter는 `Converter`라는 인터페이스를 구현하면 되는데 generic type으로 두 가지를 받는다. 하나는 source고 하나는 target이다.

`Converter<Source, Target>`의 형태를 가지고 있는데, Source를 Target으로 변환하겠다는 인터페이스이다.

&nbsp;&nbsp;&nbsp;<b>StringToEventConverter</b>는 String(source)을 Event(target)로 변환하는 클래스이고, <b>EventToStringConverter</b>은 Event를 String으로 변환하는 클래스이다.

둘 모두 메소드는 `convert()` 메소드 하나 뿐이고, 입력을 받아서 변환하는 것이 끝이다.

이렇게 작성한 두 클래스가 PropertyEditor와 같은 역할을 하는 것이고, 이 클래스들은 얼마든지 빈으로 등록해서 사용할 수 있다. 왜냐하면 상태정보를 저장하고 있지 않기 때문이다.

&nbsp;&nbsp;&nbsp;이렇게 작성한 것을 어떻게 등록을 해서 사용해야 할까?

<b>ConverterRegistry</b>라는 것에 등록을 해서 사용을 해야 한다.

---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
