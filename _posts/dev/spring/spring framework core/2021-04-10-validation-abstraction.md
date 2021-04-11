---
layout: post
date: 2021-04-10 18:54:00
title: "Validation 추상화"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, Validation, Validator ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---

# Validation 추상화

&nbsp;&nbsp;&nbsp;스프링 프레임워크에서 제공하는 추상화 중에는 <b>Validation 추상화</b>가 있다. 이와 관련된 <b>org.springframework.Validation.Validator</b>는 애플리케이션에서 사용하는 객체를 검증하기 위한 인터페이스이다.

<b>Validator</b>는 주로 스프링 MVC에서 사용하긴 하지만, 웹 계층에서만 사용하라고 만든 웹 계층 전용의 개념은 아니다. 애플리케이션이 계층형 아키텍쳐를 사용하고 있다면 웹이든, 서비스든, 데이터 레이어든 상관없이 모두 사용할 수 있는 일반적인 인터페이스이다.

또한, 구현체 중 하나로 Bean Validation[^bv] 1.0과 1.1, 2.0 까지 지원하기 때문에 Bean Validation이 제공하는 여러 Validation용 애노테이션을 사용해서 객체의 데이터를 검증할 수 있다.

## Validator

&nbsp;&nbsp;&nbsp;[Validator](https://docs.spring.io/spring-framework/docs/5.0.8.RELEASE/javadoc-api/org/springframework/validation/Validator.html)에는 중요한 메서드가 두 가지 있는데 하나는 `supports()`이고, 하나는 `validate(obj, e)`이다.

```java
public class UserLoginValidator implements Validator {

   private static final int MINIMUM_PASSWORD_LENGTH = 6;

   public boolean supports(Class clazz) {
      return UserLogin.class.isAssignableFrom(clazz);
   }

   public void validate(Object target, Errors errors) {
      ValidationUtils.rejectIfEmptyOrWhitespace(errors, "userName", "field.required");
      ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "field.required");
      UserLogin login = (UserLogin) target;
      if (login.getPassword() != null
            && login.getPassword().trim().length() < MINIMUM_PASSWORD_LENGTH) {
         errors.rejectValue("password", "field.min.length",
               new Object[]{Integer.valueOf(MINIMUM_PASSWORD_LENGTH)},
               "The password must be at least [" + MINIMUM_PASSWORD_LENGTH + "] characters in length.");
      }
   }
}
```

<span style="font-size:16pt"><b>&#9654; boolean supports(Class clazz)</b></span>

&nbsp;&nbsp;&nbsp;인자(clazz)로 넘어온 클래스, 즉 검증해야되는 인스턴스의 클래스가 이 Validator(`UserLoginValidator`)가 지원하는 검증 할 수 있는 클래스인지 확인하는 메소드이다.

<span style="font-size:16pt"><b>&#9654; void validator(Object obj, Errors e)</b></span>

&nbsp;&nbsp;&nbsp;실질적으로 검증작업이 일어나는 메소드이다. 위 코드처럼 `ValidationUtils`를 사용하면 편리하다.

## 예제

&#9654; Event.java

```java
package me.gracenam.demospring51;

public class Event {

    Integer id;

    String title;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
```

&#9654; EventValidator.java

```java
package me.gracenam.demospring51;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

public class EventValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return Event.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors,"title", "notempty", "Empty title is now allowed.");
    }
}
```

&#9654; AppRunner.java

```java
package me.gracenam.demospring51;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;

import java.util.Arrays;

@Component
public class AppRunner implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Event event = new Event();
        EventValidator eventValidator = new EventValidator();
        Errors errors = new BeanPropertyBindingResult(event, "event");

        eventValidator.validate(event, errors);

        System.out.println(errors.hasErrors());

        errors.getAllErrors().forEach(e -> {
            System.out.println("===== error code =====");
            Arrays.stream(e.getCodes()).forEach(System.out::println);
            System.out.println(e.getDefaultMessage());
        });
    }

}
```

&nbsp;&nbsp;&nbsp;Event라는 클래스를 만들고 id와 title이라는 값이 있다고 하자. 이 때 title이 null이면 안된다고 가정하겠다. 이런 경우에 대한 EventValidator를 만들었다.

EventValidator에서 상속받는 Validator는 다른 패키지에 있는 것이 아닌 Spring 패키지에 존재하는 것이어야 한다. 이어서 ValidationUtils[^2]라는 유틸리티애서 `rejectIfEmptyOrWhitespace` 메소드를 사용한다. `rejectIfEmptyOrWhitespace`는 값이 null이거나 길이가 0이거나 공백문자로 구성되어 있는 경우 에러코드를 추가해주는 메소드이다. 여기서는 title 필드가 공백이거나 존재하지 않을 경우 errors에 에러 정보를 담는다.

`ApplicationContext`가 key 값에 해당하는 인터페이스를 가져오는 역할을 한다는 것을 알고 있을 것이다. 그러한 기능을 사용해서 실제 errorCode에 해당하는 메세지를 가져오는 key 값이 "notempty"이다. "notempty.title"이라고 작성할 수도 있는데 그러지 않은 이유는 결과값을 보면 알 수 있다.

마지막 "Empty title is now allowed."는 defaultMessage로 에러코드로 메세지를 찾지 못했을 때 사용할 메세지를 적은 것이다.

&nbsp;&nbsp;&nbsp;이렇게 작성한 validate를 AppRunner를 이용해서 사용해보자. 구현체로 `BeanPropertyBindingResult`를 사용하는데 Spring MVC를 사용할 때는 MVC에서 자동으로 생성해서 파라미터에 전달 해줄 것이기 때문에 직접 `BeanPropertyBindingResult` 클래스를 사용하는 일은 없을 것이다. 물론 Errors 인터페이스는 자주 보게 될 것이다.

validate를 사용해서 event 객체를 검사하고 errors에 검증에러를 담아준다.

<img src="/assets/img/study/valid01.png" width="70%" align="center"><br/>

실행한 결과 event 클래스에는 title이 없기 때문에 에러가 생길 것이다(true). 발생한 에러에 대한 내용들이 그 아래에 출력되는데 만들어 놓은 에러코드(notempty) 외에 추가된 3가지 에러코드가 있다.

validate에서 자동으로 추가해 준 것인데, 에러코드로 `notempty.title`이라고 하지 않은 이유가 바로 이것이다.

이제 나타난 에러코드 중 원하는 메세지를 읽어와서 화면에 전달해주거나 Api 응답을 만들면 된다.

validate를 만들 때(validation을 할 때) 반드시 `ValidationUtils`만 사용해야 하는 것은 아니다. errors에 직접 넣을 수도 있다.

<img src="/assets/img/study/valid02.png" width="70%" align="center"><br/>

target은 무조건 event 타입이므로 타입 변환을 해준다. 그리고 title이 null인 경우에 errors에 reject시키면서 직접 에러코드와 메세지를 담으면 된다. 특정 필드에 관련된 에러라면 rejectValue를 사용하면되고 여러 필드를 종합하여 발생한 에러라면 reject를 사용하면 된다.

## 스프링 부트 2.0.5 이상

&nbsp;&nbsp;&nbsp;최근에는 validate를 직접 사용할 일이 없다. 왜냐하면 스프링 부트 2.0.5 이상의 버전에서는 Validator 인터페이스 중 스프링이 제공해주는 `LocalValidatorFactoryBean` 빈을 자동으로 빈으로 등록해 주기 때문이다.

`LocalValidatorFactoryBean`은 Bean Validation 애노테이션들을 지원하는 Validator이다.

```java
package me.gracenam.demospring51;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class Event {

    Integer id;

    @NotEmpty
    String title;

    @NotNull @Min(0)
    Integer limit;

    @Email
    String email;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
```

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Arrays;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    Validator validator;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println(validator.getClass());

        Event event = new Event();
        event.setLimit(-1);
        event.setEmail("aaa2");
        Errors errors = new BeanPropertyBindingResult(event, "event");

        validator.validate(event, errors);

        System.out.println(errors.hasErrors());

        errors.getAllErrors().forEach(e -> {
            System.out.println("===== error code =====");
            Arrays.stream(e.getCodes()).forEach(System.out::println);
            System.out.println(e.getDefaultMessage());
        });
    }

}
```

애노테이션을 통한 검증을 확인하기 위해 limit와 email을 추가하였다. 에러를 발생시키기 위해서 limit에는 마이너스 값을 주고 email에는 email이 아닌 문자열을 주었다.


<img src="/assets/img/study/valid03.png" width="70%" align="center"><br/>

출력된 값을 보면 Bean이 주입된 것을 확인할 수 있고 각 에러에 따른 에러메세지가 자동적으로 만들어주는 등 validator 없이도 간단한 것들은 애노테이션으로 검증할 수 있다는 것을 확인 할 수 있다.

---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)

---
[^bv]:Bean Validation은 Java EE 표준 스펙 중 하나로 다양한 기능의 애노테이션을 제공한다. 자세한 내용은 [공식문서](https://beanvalidation.org/)를 참조하자.
[^2]:validate() 클래스를 좀 더 편리하게 사용할 수 있도록 만들어진 클래스. [공식문서](https://docs.spring.io/spring-framework/docs/5.0.8.RELEASE/javadoc-api/org/springframework/validation/ValidationUtils.html)
