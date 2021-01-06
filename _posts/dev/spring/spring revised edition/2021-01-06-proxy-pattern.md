---
layout: post
date: 2021-01-06 10:13:00
title: "프록시 패턴"
description: "예제로 배우는 스프링 입문"
subject: Spring revised edition
category: [ spring ]
tags: [ spring, proxy pattern ]
use_math: true
comments: true
---

[예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)의 내용을 정리하는 포스트

---

# 프록시 패턴

새로운 패키지(proxy)를 만들고 `Payment`라는 인터페이스를 만든다.

### Payment.java

```java
    package org.springframework.samples.petclinic.proxy;

    public interface Payment {
        void pay(int amount);
    }
```

### Store.java

```java
    package org.springframework.samples.petclinic.proxy;

    public class Store {

        Payment payment;

        public Store(Payment payment) {
            this.payment = payment;
        }

        public void buySomething(int amount) {
            payment.pay(amount);
        }
    }
```

### Cash.java

```java
    package org.springframework.samples.petclinic.proxy;

    public class Cash implements Payment {

        @Override
        public void pay(int amount) {
            System.out.println(amount + " 현금 결제");
        }
    }
```

여기서 카드 결제를 추가하려면 어떻게 해야 하는가?

### CashPerf.java

```java
    package org.springframework.samples.petclinic.proxy;

    public class CashPerf implements Payment{

        Payment cash = new Cash();

        @Override
        public void pay(int amount) {
            if(amount > 100) {
                System.out.println(amount + " 카드 결제");
            } else {
                cash.pay(amount);
            }
        }
    }
```

이렇게 만들어진 `CashPerf`가 일종의 Proxy이다. Store 입장에서는 계속 `Payment Interface`만 쓰지만 Payment에 Cash가 아닌 CashPerf를 주면 CashPerf가 알아서 판단을 한다.

Proxy 클래스에 성능 측정을 하는 코드를 추가한 후 테스트코드를 확인해보자.

### CashPerf.java

```java
    package org.springframework.samples.petclinic.proxy;

    import org.springframework.util.StopWatch;

    public class CashPerf implements Payment{

        Payment cash = new Cash();

        @Override
        public void pay(int amount) {
            StopWatch stopWatch = new StopWatch();
            stopWatch.start();

            cash.pay(amount);

            stopWatch.stop();
            System.out.println(stopWatch.prettyPrint());
        }
    }
```

### StoreTest.java

```java
    package org.springframework.samples.petclinic.proxy;

    import org.junit.Test;

    public class StoreTest {

        @Test
        public void testPay() {
            Payment cashPerf = new CashPerf();
            Store store = new Store(cashPerf);
            store.buySomething(100);
        }
    }
```

테스트 코드를 이용해 보면 알 수 있듯이 클라이언트 코드나 Cash 코드가 전혀 바뀌지 않았음에도 성능측정이 추가된 프록시 코드로 동작했다.

즉, 기존의 코드를 건드리지 않고도 프록시 패턴을 이용해서 새로운 코드를 추가하면 원하는 기능을 동작시킬 수 있다.

---
**Reference**
+ [예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)
