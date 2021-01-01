---
layout: post
date: 2021-01-01 18:15:00
title: "스프링 IoC"
description: "예제로 배우는 스프링 입문"
subject: Spring revised edition
category: [ spring ]
tags: [ spring, IoC ]
use_math: true
comments: true
---

[예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)의 내용을 정리하는 포스트

---

# 스프링 IoC

# Inversion of Control

Inversion of Control은 해석하면 제어권이 뒤바뀌었다는 말인데 이게 무슨 말일까?

## 일반적인 (의존성에 대한) 제어권: "내가 사용할 의존성은 내가 만든다."  

```java
    class OwnerController {
        private OwnerRepository repository = new OwnerRepository();
    }
```

일반적으로 의존성에 대한 제어권은 자기 자신이 가지고 필요한 의존성을 직접 만들어서 사용한다.  
즉, `OwnerController`가 직접 만들어 관리하는 것이다.

## IoC : "내가 사용할 의존성을 누군가가 알아서 주겠지."

```java
    class OwnerController {
        private OwnerRepository repo;

        public OwnerController(OwnerRepository repo) {
            this.repo = repo;
        }

        // repo를 사용
    }

    class OwnerControllerTest {

        @Test
        public void create() {
            OwnerRepository repo = new OwnerRepository();
            OwnerController controller = new OwnerController(repo);
        }
    }
```

IoC에서는 직접 관리하지 않는다. 위 코드를 보면 `OwnerController`는 `OwnerRepository`를 사용은 하지만 만들지 않는다.  
`OwnerController` 코드 밖에서 누군가가 줄 수 있도록 생성자를 통해 받아 온다.

의존성을 관리하는 일을 밖에서 누군가가 하는 것이다. 따라서 제어권이 역전되었다, Inversion of Controller인 것이다.

외부에서 의존성을 '주입'해주는 것을 `dependency injection`이라고 하는데 이것 또한 일종의 IoC로 볼 수 있다.

# 예시

본문 코드

```java
   package org.springframework.samples.petclinic.sample;

   public class SampleController {

      SampleRepository sampleRepository;

      public SampleController(SampleRepository sampleRepository) {
          thils.sampleRepository = sampleRepository;
      }

      public void doSomething() {
          sampleRepository.save();
      }
   }
```

테스트 코드

```java
    package org.springframework.samples.petclinic.sample;

    import org.junit.Test;

    public class SampleControllerTest {

        @Test
        public void testDoSomething() {
            SampleRepository sampleRepository = new SampleRepository();
            SampleController samplecontroller = new SampleController(sampleRepository);
        }
    }
```

`doSomething()`을 호출하면 `sampleRepository`에 객체가 설정되어 있지 않아 `nullPointException`이 된다. 하지만 실제론 발생할 수 없다.  

`SampleController`라는 타입의 인스턴스를 생성하려면 생성자가 하나뿐이기 때문에 반드시 `SampleRepository`를 만들어 줄 수 밖에 없다. 따라서 `SampleController`는 무조건 `SampleRepository` 있는 상태가 된다.

`sampleRepository`는 `SampleControllerTest`에서 생성자에 넣어주었다.

---
**Reference**
+ [예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)
+ <https://martinfowler.com/articles/injection.html>
