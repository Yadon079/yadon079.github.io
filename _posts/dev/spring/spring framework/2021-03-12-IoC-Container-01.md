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

# IoC 컨테이너

## IoC란?

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
