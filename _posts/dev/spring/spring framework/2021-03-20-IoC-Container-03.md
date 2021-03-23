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

&nbsp;&nbsp;&nbsp;`@Autowired` 애노테이션은 이 애노테이션이 붙은 객체. 즉, 필요한 의존 객체의 <b>타입</b>에 해당하는 빈을 찾아서 주입해준다.

Autowired를 사용할 수 있는 위치는 총 세 곳으로

+ 생성자
+ Setter
+ Field

가 있으며 이 중 생성자의 경우 Spring 4.3부터는 생략이 가능하다.

Autowired는 기본적으로 required가 true이기 때문에 붙어있다면 무조건 동작을 하고 의존성 주입 대상을 찾지 못하면 구동에 실패를 한다.

따라서 빈이 존재하는 경우의 수를 통해서 어떻게 동작하는지 살펴보자.

## 해당 타입의 빈이 없거나 한 개인 경우

<span style="font-size:16pt"><b>&#9654; 생성자를 사용한 의존성 주입</b></span>

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

&nbsp;&nbsp;&nbsp;생성자 주입은 생성자에 의존성 주입을 받고자 하는 Field를 나열하는 방법으로 지금처럼 생성자가 하나인 경우 Autowired를 생략할 수 있다.(Spring 4.3 이상)

위에 작성된 상태로 애플리케이션을 실행하면 에러가 발생한다. 왜 그럴까?

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

<span style="font-size:16pt"><b>&#9654; Setter를 사용한 의존성 주입</b></span>

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

&nbsp;&nbsp;&nbsp;Setter 의존성 주입은 Setter 메소드에 Autowired를 선언하여 주입하는 방법이다. 이러한 방법은 의존성이 선택적으로 필요한 경우에 주로 사용되고 복잡해질 수 있는 생성자 의존성 주입의 부담을 덜어 준다.

이제 예제를 살펴보자. 위에 작성된 예제처럼 Setter를 이용해서 주입을 해보면 처음 생성자로 주입했을 때처럼 실패한다.

생성자 주입에서는 빈을 만들다가 빈에 필요한 다른 의존성(`BookRepository`)을 못찾아서, 해당 하는 빈이 없어서 실패했다고 직관적으로 알 수 있다.

반면에, Setter를 이용했으니 빈은 만들 수 있는게 아닌가? `BookService` 자체의 인스턴스는 만들 수 있지 않는가 라는 의문이 생긴다. 실제로도 그게 맞다. `BookService`라는 인터페이스 자체는 만들 수 있는데 `@Autowired`라는 애노테이션이 있기 때문에 의존성을 주입하려고 시도를 한다. 그 과정이 실패하는 것이다.

즉, `BookService`라는 인스턴스 자체는 `BookRepository` 없이도 만들 수 있지만 `@Autowired`라는 애노테이션이 동작하기 때문에 실패하는 것이다.

이런 의존성이 반드시 필요한게 아니다. 즉, Optional인 경우 required를 false로 주면 된다.

```java
@Autowired(required = false)
```

기본 값이 true이기 때문에 애노테이션을 처리하다가 빈을 못찾거나 의존성 주입을 하지 못하는 경우 에러가 나거나 구동이 제대로 되지 않는다.

이렇게 false로 처리할 경우 Optional로 처리했기 때문에 `BookService`의 인스턴스만 만들어서 빈으로 등록이 되었고 `BookRepository`는 의존성 주입은 되지 않고 빈으로 등록이 되었다.

<span style="font-size:16pt"><b>&#9654; Field를 사용한 의존성 주입</b></span>

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

    @Autowired(required = false)
    BookRepository bookRepository;

}
```

&nbsp;&nbsp;&nbsp;member Field에 Autowired를 선언하여 주입하는 방법으로 의존성 주입 중 가장 간단한 방법이다. 하지만 단점이 많이 존재한다. 의존 관계가 다소 추상적이어서 복잡하게 작성될 가능성이 높다. 또한 의존성 주입 대상 필드가 final 선언이 될 수 없다는 단점도 존재한다.

제일 처음 봤던 생성자 의존성 주입에서 필드를 사용하는 것과는 조금 다르다. 생성자를 사용한 의존성 주입은 빈을 만들 때에도 개입을 한다. 즉, 해당하는 타입의 빈이 없을 경우 무조건 리소스를 만들지 못하게 하는 반면에, Setter나 Field를 사용한 의존성 주입의 경우 Optional로 설정해서 해당하는 의존성 없이도 빈으로 등록이 가능하다.

## 해당 타입의 빈이 여러 개인 경우

```java
package me.gracenam.demospring51;

public interface BookRepository {
}
```

```java
package me.gracenam.demospring51;

import org.springframework.stereotype.Repository;

@Repository
public class MyBookRepository implements BookRepository {
}
```

```java
package me.gracenam.demospring51;

import org.springframework.stereotype.Repository;

@Repository
public class GraceBookRepository implements BookRepository {
}
```

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

    @Autowired
    BookRepository bookRepository;

}
```

&nbsp;&nbsp;&nbsp;지금까지 주입 받을 Repository가 한 가지였다면 이번에는 Repository가 두 개인 경우를 살펴보자.

`BookService`에서 `BookRepository`를 사용하는데 `BookRepository`가 인터페이스이고 이 인터페이스를 사용하는 Repository 두 가지를 만들었다.

이 상태에서 코드를 실행하면 어떤 Repository가 주입이 될까? 주입을 해줄 수 없다. 이 경우에는 해당하는 타입의 Repository가 두 개라고 에러 메시지가 출력되고 둘 중에 어떤 것을 원하는지 스프링이 알 수 없기 때문이다.

이 것을 해결하는 방법으로 세 가지가 추천된다.

+ @Primary
+ 해당하는 타입의 빈 모두 주입 받기
+ @Qualifier

이제 하나씩 살펴보자.

<span style="font-size:16pt"><b>&#9654; @Primary</b></span>

&nbsp;&nbsp;&nbsp;Primary는 여러 개의 빈 중에서 하나의 빈이 우선 순위를 가지도록 지정할 수 있는 애노테이션이다. 우선 순위를 가지도록 해줌으로써 해당하는 빈이 주입되도록 하는 것이다.

```java
package me.gracenam.demospring51;
package me.gracenam.demospring51;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

@Repository @Primary
public class GraceBookRepository implements BookRepository {
}
```

예제에서 `GraceBookRepository`를 주입하고 싶으니 `GraceBookRepository`에 `@Primary` 애노테이션을 추가해주었다. 그리고 실행을 해보면 정상적으로 동작하는 것을 확인할 수 있다.

&#9654; 어떤 빈이 들어왔는지 확인하는 방법

단순히 정상적으로 동작한다고 해서 끝나는게 아니라 어떠한 빈이 주입된 것인지 확인하고 싶을 수 있다. 이럴 때 사용하는 방법으로 Runner를 생성해주면된다. 이 방법은 SpringBoot에 해당하는 방법으로 자세한 내용은 [Boot 강의]()를 참조하자.

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class BookServiceRunner implements ApplicationRunner {

    @Autowired
    BookService bookService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        bookService.printBookRepository();
    }
}
```

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;

    public void printBookRepository() {
        System.out.println(bookRepository.getClass());
    }

}
```

`BookService`를 주입받아서 어떤 빈이 주입되었는지 출력해주는 메소드를 만들었다. 그리고 그 메소드를 실행하는 Runner를 만든다. 그리고 실행을 하면 어떤 Repository가 주입되었는지 출력이 될 것이다.

<span style="font-size:16pt"><b>&#9654; @Qualifier</b></span>

&nbsp;&nbsp;&nbsp;Qualifier는 Primary와 마찬가지로 사용할 의존 객체를 선택할 수 있도록 해주는 애노테이션이다. Primary가 우선순위를 부여해서 주입할 수 있도록 만든다면, Qualifier는 대상을 직접 지정할 수 있다.

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired @Qualifier("graceBookRepository")
    BookRepository bookRepository;

    public void printBookRepository() {
        System.out.println(bookRepository.getClass());
    }

}
```

Qualifier는 뒤에 사용하고자 하는 빈의 이름을 작성하면 된다. 이 때 빈의 이름은 클래스 이름의 스몰케이스이다. 여기서는 `GraceBookRepository` 클래스의 스몰케이스인 `graceBookRepository`가 되겠다.

> `@Qualifier`를 사용하는 것보다는 `@Primary`를 사용하는 것이 더 TypeSafety하기 때문에 `@Primary`를 사용하는 것을 추천한다.

<span style="font-size:16pt"><b>&#9654; 해당하는 타입의 빈 모두 주입 받기</b></span>

&nbsp;&nbsp;&nbsp;해당하는 타입의 빈을 모두 주입받는 방법은 간단하다.

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    List<BookRepository> bookRepositories;

    public void printBookRepository() {
        this.bookRepositories.forEach(System.out::println);
    }

}
```

List를 활용하여 들어오는 빈들을 모두 저장할 경우 간단하게 해결할 수 있다.

이렇게 세 가지의 방법을 봤는데 그 중에서 `@Primary`를 사용하는 것을 추천한다. 그 이유는 가장 TypeSafety하기 때문이다.

## 동작 원리

&nbsp;&nbsp;&nbsp;Autowired라는 애노테이션만 추가했을 뿐인데 자동적으로 빈에 등록이 되고 의존성 주입이 된다. 과연 Autowired는 어떻게 동작을 하는 것일까?

바로 <b>BeanPostProcessor</b>라는 라이프 사이클 인터페이스의 구현체 <b>AutowiredAnnotationBeanPostProcessor</b>에 의해서 동작하는 것이다.

빈이 만들어지고 빈의 인스턴스가 생성되고 난 후 <b>Initialization(초기화)</b>이라는 라이프 사이클이 동작한다. <b>BeanPostProcessor</b>는 Initialization 라이프 사이클 이전, 이후에 필요한 부가적인 작업을 할 수 있는 라이프 사이클 콜백이다.

그렇다면 Initialization은 무엇이며 어떻게 사용할까? 빈의 Initialization은 <b>의존성이 주입 끝난 시점에 실행</b>되는 메서드인 초기화 메서드를 말한다.

&#9654; @PostConstruct

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class BookService {

    @Autowired
    BookRepository mybookRepository;

    public void printBookRepository() {
        System.out.println(mybookRepository.getClass());
    }

    @PostConstruct
    public void setUp() {

    }

}
```

이렇게 메소드를 생성한 후 `@PostConstruct`를 붙인 다음 해야할 일을 작성할 수도 있고

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService implements InitializingBean {

    @Autowired
    BookRepository mybookRepository;

    public void printBookRepository() {
        System.out.println(mybookRepository.getClass());
    }

    @Override
    public void afterPropertiesSet() throws Exception {

    }
}
```

아주 오래된 인터페이스인 `InitializingBean` 인터페이스를 구현하면 나오는 메소드인 `afterPropertiesSet`을 사용할 수도 있다.

이러한 Initialization 라이프 사이클 <b>이전</b>에 AutowiredAnnotationBeanPostProcessor가 동작을 해서 Autowired라는 애노테이션을 처리해 주는 것이다. 즉, 해당하는 빈을 찾아서 주입을 해준다.

## AutowiredAnnotationBeanPostProcessor의 동작 원리

&nbsp;&nbsp;&nbsp;BeanFactory가 BeanPostProcessor에 등록되어 있는 빈을 찾는다. AutowiredAnnotationBeanPostProcessor가 바로 그 중에 하나이고 AutowiredAnnotationBeanPostProcessor를 찾아서 다른 일반적인 빈들에게 BeanPostProcessor에 있는 애노테이션을 처리하는 로직을 적용하는 것이다.

---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
+ <https://devlog-wjdrbs96.tistory.com/166>
