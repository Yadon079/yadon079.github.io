---
layout: post
date: 2021-03-20 21:38:00
title: "IoC 컨테이너 3부"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, Autowired ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---

# @Autowire

`BookService`와 `BookRepository`가 있다. 여기서 의존성을 주입하는 다양한 방법들을 사용할 것이다. 그 중 첫 번째는 생성자를 이용한 방법이다.

## 생성자를 통한 의존성 주입

```java
package me.gracenam.demospring51;

public class BookRepository {
}
```

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
      this.bookRepository = bookRepository;
    }

}
```

이 상태로 애플리케이션을 실행하면 에러가 발생한다. 왜 그럴까?

`BookService`에서 `BookRepository`를 생성자로 주입을 받겠다고 했지만 `BookRepository`가 빈으로 등록이 되어있지 않기 때문에 해당하는 타입의 빈을 찾을 수 없다고 에러가 발생하는 것이다.

따라서 `BookRepository`에 `@Repository`나 `@Component`를 붙이면 해결된다.

```java
package me.gracenam.demospring51;

import org.springframework.stereotype.Repository;

@Repository
public class BookRepository {
}
```

Repository의 경우에는 `@Repository` 애노테이션을 붙이는 것을 추천한다. 그래야 해당하는 모든 빈의 특정한 기능을 실행시키거나 AOP에서 사용하기 편하기 때문이다.

## Setter를 이용한 의존성 주입

```java
package me.gracenam.demospring51;

public class BookRepository {
}
```

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    BookRepository bookRepository;

    @Autowired
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

}
```

Setter를 이용해서 주입을 해보면 처음 생성자로 주입했을 때처럼 실패한다.

생성자 주입에서는 빈을 만들다가 빈에 필요한 다른 의존성(`BookRepository`)을 못찾아서, 해당 하는 빈이 없어서 실패했다고 직관적으로 알 수 있다.

반면에, Setter를 이용했으니 빈은 만들 수 있는게 아닌가? `BookService` 자체의 인스턴스는 만들 수 있지 않는가 라는 의문이 생긴다. 실제로도 그게 맞다. `BookService`라는 인터페이스 자체는 만들 수 있는데 `@Autowired`라는 애노테이션이 있기 때문에 의존성을 주입하려고 시도를 한다. 그 과정이 실패하는 것이다.

즉, `BookService`라는 인스턴스 자체는 `BookRepository` 없이도 만들 수 있지만 `@Autowired`라는 애노테이션이 동작하기 때문에 실패하는 것이다.

이런 의존성이 반드시 필요한게 아니다. 즉, Optional인 경우 required를 false로 주면 된다.

```java
@Autowired(required = false)
```

기본 값이 true이기 때문에 애노테이션을 처리하다가 빈을 못찾거나 의존성 주입을 하지 못하는 경우 에러가 나거나 구동이 제대로 되지 않는다.

이렇게 false로 처리할 경우 Optional로 처리했기 때문에 `BookService`의 인스턴스만 만들어서 빈으로 등록이 되었고 `BookRepository`는 의존성 주입은 되지 않고 빈으로 등록이 되었다.

## Field를 이용한 의존성 주입



---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
