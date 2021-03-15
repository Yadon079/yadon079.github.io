---
layout: post
date: 2021-03-12 14:39:00
title: "IoC 컨테이너 1부"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, bean ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---
# IoC란?

&nbsp;&nbsp;&nbsp;Inversion of Control의 약자로 의존 관계 주입(Dependency Injection)이라고도 하며, 어떠한 객체가 사용하는 의존 객체를 직접 만들어 사용하는 것이 아니라, 주입 받아 사용하는 방법을 말한다.

&#9654; BookService.java

```java
package me.gracenam.demospringioc.book;

import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Date;

@Service
public class BookService {

    private BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book save(Book book) {
        book.setCreated(new Date());
        book.setBookStatus(BookStatus.DRAFT);
        return bookRepository.save(book);
    }

}
```

위 코드를 예시로 살펴보자.

`BookService`라는 타입의 객체가 사용할 `BookRepository`라는 타입의 의존 객체는 보통 직접 만들어서 사용한다.

```java
@Service
public class BookService {

    private BookRepository bookRepository = new BookRepository();

    ...

}
```

하지만 IoC, 의존 관계 주입은 직접 생성하는 것이 아닌 어떤 장치(위 코드에서는 생성자)를 사용해서 주입을 받아서 사용한다.

```java
@Service
public class BookService {

    private BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    ...

}
```

물론 IoC는 스프링이 없어도 저러한 장치가 마련된다면 직접 할 수도 있다. 가령 `BookService`를 만들어 테스트를 할 때, 객체(여기선 `BookRepository`)를 원하는데로 만들어서 사용할 수 있다.

```java
public class BookServiceTest {

    @Test
    public void save() {
        BookRepository bookRepository = new BookRepository();
        BookService bookService = new BookService(bookRepository);
    }

}
```

## 그렇다면 왜 IoC 컨테이너를 사용하는 것일까?

&nbsp;&nbsp;&nbsp;그 이유는 여러 개발자들이 커뮤니티에서 논의하여 만들어낸 다양한 Dependency Injection 방법과 Best Practice, Know-How가 쌓여있는 프레임워크이기 때문이다.

초기에는 빈(Bean, 컨테이너 내부에 들어있는 객체)과 컨테이너에 대한 설계를 할 때 Xml이 대세였지만, 구글 주스(Google Gucie)가 처음 선보인 Annotation기반의 Dependency Injection을 지원하기 시작했다.

현재는 `@Service`, `@Repository`, `@Autowired`와 같은 Annotation을 사용해 객체를 빈으로 등록할 수도 있고, 빈에 등록이 되어있는 객체를 손쉽게 주입받아 사용할 수 있다.

---

# IoC 컨테이너

## BeanFactory

> [공식 문서](https://docs.spring.io/spring-framework/docs/5.0.8.RELEASE/javadoc-api/org/springframework/beans/factory/BeanFactory.html)
