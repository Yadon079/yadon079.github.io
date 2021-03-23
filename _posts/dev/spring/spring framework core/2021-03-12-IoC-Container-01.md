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

IoC 기능을 제공하는 빈을 담고 있기 때문에 컨테이너라고 불리며 빈(Bean, 컨테이너 내부에 들어있는 객체)과 컨테이너에 대한 설계를 할 때 아주 많은 개발자들의 의견을 바탕으로 만들어졌다. 초기에는 Xml이 대세였지만, 개발자들의 의견을 수렴하여 구글 주스(Google Gucie)가 처음 선보인 Annotation기반의 Dependency Injection을 지원하기 시작했다.

현재는 `@Service`, `@Repository`, `@Autowired`와 같은 Annotation을 사용해 객체를 빈으로 등록할 수도 있고, 빈에 등록이 되어있는 객체를 손쉽게 주입받아 사용할 수 있다.

## BeanFactory

> [공식 문서](https://docs.spring.io/spring-framework/docs/5.0.8.RELEASE/javadoc-api/org/springframework/beans/factory/BeanFactory.html)

&nbsp;&nbsp;&nbsp;스프링 IoC 컨테이너의 가장 최상위에 있는 인터페이스는 `BeanFactory`라는 인터페이스이다.

내부에 다양한 인터페이스가 있는데, `BeanFactory`인터페이스가 가장 핵심이다. IoC 컨테이너의 가장 핵심클래스로 공식문서를 살펴보면 다양한 `BeanFactory` 라이프사이클 인터페이스의 순서와 이름이 나와있다.

1. BeanNameAware's setBeanName
2. BeanClassLoaderAware's setBeanClassLoader
3. BeanFactoryAware's setBeanFactory
4. EnvironmentAware's setEnvironment
5. EmbeddedValueResolverAware's setEmbeddedValueResolver
6. ResourceLoaderAware's setResourceLoader (only applicable when running in an application context)
7. ApplicationEventPublisherAware's setApplicationEventPublisher (only applicable when running in an application context)
8. MessageSourceAware's setMessageSource (only applicable when running in an application context)
9. ApplicationContextAware's setApplicationContext (only applicable when running in an application context)
10. ServletContextAware's setServletContext (only applicable when running in a web application context)
11. postProcessBeforeInitialization methods of BeanPostProcessors
12. InitializingBean's afterPropertiesSet
13. a custom init-method definition
14. postProcessAfterInitialization methods of BeanPostProcessors

이러한 다양한 라이프사이클을 통해서 스프링이 여러가지 기능을 제공할 수 있는 것이다.

---

# Bean

&nbsp;&nbsp;&nbsp;스프링 IoC 컨테이너에 들어가 있는 객체, 즉 IoC 컨테이너가 관리하는 객체를 빈(Bean)이라고 한다.

위에 사용했던 코드들을 다시 살펴보자.

```java
package me.gracenam.demospringioc.book;

import java.util.Date;

public class Book {

    private Date created;

    private BookStatus bookStatus;

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public BookStatus getBookStatus() {
        return bookStatus;
    }

    public void setBookStatus(BookStatus bookStatus) {
        this.bookStatus = bookStatus;
    }

}
```

`Book`클래스는 빈일까 아닐끼? 정답은 아니다. `Book`은 스프링 IoC 컨테이너가 관리하지 않기 때문에 스프링 빈이 아니다. 굳이 따지자면 Getter Setter가 있으므로 자바 빈 스펙을 준수하기 때문에 자바 빈(자바 객체)라고 할 수 있겠다.

```java
package me.gracenam.demospringioc.book;

import org.springframework.stereotype.Repository;

@Repository
public class BookRepository {

    public Book save(Book book) {
        return null;
    }

}
```

`BookRepository`는 빈이 맞다. `@Repository`라는 애노테이션이 붙었기 때문에 AutoScan을 통해 빈으로 등록이 된다.

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

`BookService` 역시 빈이다. `@Service` 애노테이션을 사용했기 때문에 빈으로 등록이 된다.

```java
package me.gracenam.demospringioc.book;

public enum BookStatus {

    DRAFT, PUBLISHED;

}
```

마지막으로 `BookStatus`는 빈이 아니다. 스프링 IoC 컨테이너에서 관리할 필요가 없는 객체들이다.

### 왜 BookRepository와 BookService는 빈으로 등록이 되었는가?

&nbsp;&nbsp;&nbsp;첫 번째 이유는 의존성 주입때문이다. 의존성 주입을 받기 위해서는 빈으로 등록이 되어 있어야 한다.

두 번째는 빈의 Scope때문이다. 이 Application 전체에서 `BookService`라는 인스턴스는 오직 하나만 사용되면 된다. 굳이 여러 개를 만들어 사용할 필요가 없다. 이렇게 하나만 사용하는 것을 싱글톤(Singleton)이라고 하며 싱글톤으로 객체를 만들어 관리하고 싶을 때 IoC 컨테이너를 사용하면 편리하다.

빈의 Scope에는 싱글톤과 프로토타입이 있는데, 스프링 IoC 컨테이너에 등록되는 빈들은 기본적으로 싱글톤으로 등록이 된다. 싱글톤은 해당 빈의 인스턴스를 오직 하나만 생성해 모든 Application에 사용하는 것을 말하며 프로토타입(Prototype)은 매번 다른 객체를 생성하는 것이다.

싱글톤으로 사용이 된다면 Application 전반에서 같은 객체를 사용하기 때문에 효율적이고 런타임 시 성능 최적화에도 유리하다.

마지막으로 라이프사이클 인터페이스가 지원이 되기 떄문이다. 어떤 빈이 만들어졌을 때 추가적인 작업을 원하는 경우가 있다.

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

    @PostConstruct
    public void postConstruct() {
        System.out.println("=====================");
        System.out.println("Hello Spring");
    }

}
```

빈이 만들어질 때 라이프사이클 콜백에 해당하는 `@PostConstruct` 애노테이션이 붙어있는 메서드가 호출되도록 했다. 이처럼 다양한 인터페이스를 활용해서 부가적인 기능들을 만들어 낼 수 있다.

---

# ApplicationContext

&nbsp;&nbsp;&nbsp;`BeanFactory`와 함께 IoC 컨테이너에서 중요한 또 다른 인터페이스가 있다. 바로 `ApplicationContext`로 실질적으로 가장 많이 사용하게 될 `BeanFactory`이다.

`ApplicationContext`도 결국 `BeanFactory`를 상속받았고 IoC 컨테이너로서의 기능을 가지고 있으면서도 추가적인 기능을 가지고 있다.

`BeanFactory`에 비해 다양한 기능을 가지고 있는 인터페이스라고 생각하면 된다.

---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
