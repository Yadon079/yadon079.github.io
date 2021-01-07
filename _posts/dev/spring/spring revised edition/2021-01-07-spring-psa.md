---
layout: post
date: 2021-01-07 19:16:00
title: "스프링 PSA"
description: "예제로 배우는 스프링 입문"
subject: Spring revised edition
category: [ spring ]
tags: [ spring, psa ]
use_math: true
comments: true
---

[예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)의 내용을 정리하는 포스트

---

# 스프링 PSA

## PSA??

PSA는 Protable Service Abstraction의 약자로 스프링이 제공하는 것으로 Spring Triangle의 한 요소이다.

지금까지 Servlet Application을 만들고 있지만 Servlet을 전혀 사용하지 않았다. Servlet 개발 경험이 있다면 다음과 같은 코드를 볼 수 있었을 것이다.

```java
    package org.springframework.samples.petclinic.owner;

    import javax.servlet.ServletException;
    import javax.servlet.HttpServlet;
    import javax.servlet.HttpServletRequest;
    import javax.servlet.HttpServletResponse;
    import java.io.IOException;

    // /owner/create
    public class OwnerCreateServlet extends HttpServlet {

        // GET
        @Override
        protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            super.doGet(req, resp);
        }

        // POST
        @Override
        protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            super.doPost(req, resp);
        }
    }
```

Servlet을 이용했다면 `/owner/create`라는 URL을 통해서 GET이라는 HTTP 메서드로 들어오면 `doGet`이, POST라는 HTTP 메서드로 들어오면 `doPost`가 호출되었을 것이다. 원래라면 이런 식으로 Servlet을 만들고 Mapping을 해야한다.

우리가 사용하는 예제를 보면 조금 다르다.

### OwnerController.java

```java
    ...

    @GetMapping("/owners/new")
    public String initCreationForm(Map<String, Object> model) {
        ...
    }

    @PostMapping("/owners/new")
    public String processCreationForm(@Valid Owner owner, BindingResult result) {
        ...
    }

    ...
```

다음과 같이 `@GetMapping`, `@PostMapping`이라는 annotation을 사용해서 요청을 받으면 메소드를 실행한다. 추상화된 객체로 코딩을 했지만, 실제로 그 아래에서는 Servlet으로 동작하고 있다.

# 스프링 웹 MVC

스프링 웹 MVC(Model View Controller)라는 추상화 계층을 살펴보자. 스프링 웹 MVC도 스프링 PSA 중 하나이다.

`@Controller`라는 annotation을 사용하면 요청을 Mapping 할 수 있는 컨트롤러 역할을 수행하는 클래스가 된다. 내부에 `@GetMapping`이나 `@PostMapping`을 사용하여 요청을 Mapping 할 수 있다. Mapping을 한다는 것은 URL에 해당하는 요청이 들어왔을 때 해당 메소드가 그 요청을 처리하게끔 하는 것이다.

# 스프링 트랜잭션

트랜잭션은 쉽게 말해서 다 같이 되거나 아니면 다 같이 안되는 것을 말한다. 스프링에서는 `@Transcational`이라는 annotation을 제공하기 때문에 `@Transcational`만 추가하면 트랙잭션 처리를 알아서 해준다.

---
**Reference**
+ [예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)
+ [Service Abstraction](https://en.wikipedia.org/wiki/Service_abstraction)
