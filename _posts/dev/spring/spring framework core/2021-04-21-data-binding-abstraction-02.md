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

<b>ConverterRegistry</b>라는 것에 등록을 해서 사용을 해야 한다. 하지만 `ConverterRegistry`라는 인터페이스를 직접 등록해서 쓸 일은 없다.

```java
package me.gracenam.demospring51;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new EventConverter.StringToEventConverter());
    }

}
```

스프링 부트 없이 스프링 MVC를 사용한다면 WebConfig와 같은 Web용 Configuration 클래스를 만들고 `WebMvcConfigurer`를 구현한다. 그리고 `addFormatters`를 Override하면 registry에 addConverter 할 수 있는 메서드가 있다. 여기에 Converter를 등록해주면 된다.

&nbsp;&nbsp;&nbsp;이렇게 등록해주면 스프링 MVC 설정에 넣어준 Converter가 모든 Controller에서 동작을 하게 된다.

```java
package me.gracenam.demospring51;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {

    @GetMapping("/event/{event}")
    public String getEvent(@PathVariable Event event) {
        System.out.println(event);
        return event.getId().toString();
    }

}
```

테스트 코드를 실행하여 정상적으로 동작이 되는지 확인할 수 있다.

```java
package me.gracenam.demospring51;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest
public class EventControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void getTest() throws Exception {
        mockMvc.perform(get("/event/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }

}
```

<img src="/assets/img/study/cf01.png" width="70%" aling="center"><br/>

## Formatter

&nbsp;&nbsp;&nbsp;Formatter는 Converter보다 조금 더 Web쪽에 특화된 인터페이스이다. Formatter의 경우 처리할 타입을 하나 주고 두 개의 메서드를 구현한다. 하나는 문자를 객체로, 다른 하나는 객체를 문자로 변환하는 메서드이다. 제네릭으로 하나의 인자만 받는 이유는 Object와 String 간의 변환에 사용되기 때문에 다른 하나의 인자가 String으로 고정되어있기 때문이다.

한 가지 특징으로 locale 정보를 기반으로 바꿀 수 있는 것인데 이는 MassageSource를 공부할 때 나온 다국화와 관련된 기능이다.

```java
package me.gracenam.demospring51;

import org.springframework.format.Formatter;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Locale;

@Component
public class EventFormatter implements Formatter<Event> {

    @Override
    public Event parse(String text, Locale locale) throws ParseException {
        return new Event(Integer.parseInt(text));
    }

    @Override
    public String print(Event object, Locale locale) {
        return object.getId().toString();
    }

}
```

&nbsp;&nbsp;&nbsp;Formatter 역시 ThreadSafe하기 때문에 빈으로 등록하거나 다른 빈을 주입받아서 사용할 수 있다.

사용방법은 Converter와 동일하게 Configuration 클래스를 활용하여 사용하면 된다.

```java
package me.gracenam.demospring51;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addFormatter(new EventFormatter());
    }

}
```

## ConversionService

&nbsp;&nbsp;&nbsp;앞서 PropertyEditor를 사용할 때는 데이터 바인더를 통해서 이용했다면 <b>Converter</b>와 <b>Formatter</b>를 사용할 때는 <b>ConversionService</b>를 이용하게 된다.

예제에서 살펴봤던 인터페이스를 통해서 등록되는 Converter와 Formatter는 모두 ConversionService에 등록되어 변환하는 작업이 이뤄진 것이다.

&nbsp;&nbsp;&nbsp;ConversionService는 스프링 MVC, 스프링 Xml 빈 설정파일, SpEL에서 사용한다.

&nbsp;&nbsp;&nbsp;스프링이 제공하는 ConversionService 구현체 중에 <b>DefaultFormattionConversionService</b>라는 것이 있는데, ConversionService 타입으로 DefaultFormattionConversionService 클래스가 자주 사용이 된다.

이 클래스는 <b>FormatterRegistry</b>와 <b>ConversionService</b> 두 가지 인터페이스를 모두 구현했기 때문에 두 가지 기능의 역할을 한다. 그 외에도 기본적인 Converter와 Formatter 등록을 해준다.

<img src="/assets/img/study/cf02.png" width="70%" aling="center"><br/>

DefaultFormattionConversionService의 구조를 살펴보면 알 수 있듯이 FormatterRegistry가 ConverterRegistry를 상속받고 있다. Converter는 ConverterRegistry가 필요하고 Formatter는 FormatterRegistry가 필요한데 FormatterRegistry에서 Converter를 쓸 수 있었던 이유가 바로 이 때문이다.





---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
