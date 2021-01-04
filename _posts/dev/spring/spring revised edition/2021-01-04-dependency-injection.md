---
layout: post
date: 2021-01-04 18:23:00
title: "의존성 주입(Dependency Injection)"
description: "예제로 배우는 스프링 입문"
subject: Spring revised edition
category: [ spring ]
tags: [ spring, dependency injection ]
use_math: true
comments: true
---

[예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)의 내용을 정리하는 포스트

---

# 의존성 주입(Dependency Injection)

## @Autowired

`Autowired`라는 annotation을 사용할 수 있는 지점은 필드, 센터, 생성자 등이 있다.

Spring 4.3 부터 어떠한 클래스에 생성자가 하나뿐이고 그 생성자로 주입받는 레퍼런스 변수들이 빈으로 등록되어 있다면, 그 빈을 자동으로 주입해주도록 기능이 추가되었다. 따라서 `Autowired`라는 annotation을 생략할 수 있게 되었다.

### OwnerController.java

```java
    class OwnerController {
        ...
        private final OwnerRepository owners;

        // @Autowired
        public OwnerController(OwnerRepository clinicService) {
            this.owners = clinicService;
        }

        ...
    }
```

위 코드는 원본 코드로 생성자를 통해서 의존성을 주입받는 방법이다. 이 코드를 다음과 같이 고쳐서 필드로 바로 주입받도록 할 수 있다.

```java
    class OwnerController {
        ...

        @Autowired
        private OwnerRepository owners;

        ...
    }
```

코드를 수정하고 난 후 Maven -> LifeCycle -> package를 통해서 빌드를 해주거나 혹은

```
    $ ./mvnw package
```

와 같은 방법으로 빌드를 해서 코드가 동작한다는 것을 확인할 수 있다.

```java
    class OwnerController {
        ...

        private OwnerRepository owners;

        @Autowired
        public void setOwners(OwnerRepository owners) {
            this.owners = owners;
        }

        ...
    }
```

또 Setter를 이용해서 Setter에다가 `Autowired`를 붙이는 방법도 있다. 이렇게 할 경우 스프링 IoC 컨테이너가 인스턴스를 만들고나서 Setter를 통해서 IoC 컨테이너에 들어있는 빈 중에 OwnerRepository 타입을 찾아서 주입해준다.

의존성 주입이 잘 되지않을 경우 애플리케이션 자체가 동작하지 않는다. 애플리케이션이 잘 뜬다는 것은 의존성 주입이 잘 되었다고 볼 수 있다.

### SampleRepository.java

```java
    package org.springframework.samples.petclinic.owner;

    public class SampleRepository {

    }
```

### OwnerController.java

```java
    class OwnerController {
        ...

        @Autowired
        private OwnerRepository owners;

        @Autowired
        private SampleRepository sampleRepository;
        ...
    }
```

`SampleRepository`를 빈으로 등록하지 않고 가지고와서 주입을 해달라고 요청해보자. 이 경우 애플리케이션 자체가 동작하지 않는다. 왜냐하면 `OwnerController`에 필요한 의존성을 주입할 수 없기 때문이다.

## 스프링 프레임워크 레퍼런스에서 권장하는 방법

스프링 프레임워크 레퍼런스에서는 생성자를 통해서 주입하는 것을 권장한다.

### OwnerController.java

```java
    class OwnerController {
        ...
        private final OwnerRepository owners;

        // @Autowired
        public OwnerController(OwnerRepository clinicService) {
            this.owners = clinicService;
        }

        ...
    }
```

이 방법이 좋은 이유는 필수적으로 사용해야하는 레퍼런스(`OwnerRepository`) 없이는 인스턴스(`OwnerController`)를 만들지 못하도록 강제할 수 있기 때문이다.

`OwnerRepository`가 없이는 `OwnerController` 클래스가 동작할 수 없다. 따라서 `OwnerRepository`의 사용을 강제하기 위해서 생성자를 통해 주입하는 방법을 사용하는 것이다.

필드 인젝션이나 세터 인젝션은 의존성 없이도 인스턴스를 만들 수 있다. 그러한 부분이 단점이면서 장점이 될 수도 있다. 예를 들어 순환 참조(A와 B가 서로를 참조)가 발생했을 경우, 생성자 인젝션으로는 둘 다 만들 수 없게된다. 이런 경우에는 필드나 세터 인젝션을 사용하면 일단 인스턴스를 생성한 후 서로의 인스턴스를 주입해 줄 수 있기 때문에 상호 참조(Circular injection) 문제를 해결할 수 있다.

하지만 가급적이면 상호참조가 발생하지 않도록 의존성을 조율해서 생성자 인젝션을 사용하는 편이 좋다.

---
**Reference**
+ [예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)
