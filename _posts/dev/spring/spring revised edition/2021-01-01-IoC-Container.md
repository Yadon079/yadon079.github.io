---
layout: post
date: 2021-01-01 23:27:00
title: "스프링 IoC 컨테이너"
description: "예제로 배우는 스프링 입문"
subject: Spring revised edition
category: [ spring ]
tags: [ spring, IoC Container ]
use_math: true
comments: true
---

[예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)의 내용을 정리하는 포스트

---

# 스프링 IoC 컨테이너

# IoC(Inversion of Control) 컨테이너

스프링이 제공하는 컨테이너로 핵심적인 클래스이지만 실제로 참고해서 쓸 일은 거의 없다. IoC 컨테이너로 `BeanFactory` 또는 `ApplicationContext` 중 하나를 사용하게 되는데 `BeanFactory`가 사실상 IoC 컨테이너이고 `ApplicationContext`는 `BeanFactory`를 상속받고 있기 때문에 같은 일을 한다고 볼 수 있다.

## IoC 컨테이너가 하는 일

빈(bean)을 만들어 빈 사이에 의존성을 엮어주고 그렇게 컨테이너가 가지고있는 만들어진 빈들을 제공하는 것이 IoC 컨테이너의 일이다.

실제 코드에서 빈으로 등록이 되어 있는지 아닌지를 알기 위한 방법 중 한 가지는 인텔리제이 툴에서는 해당 클래스 왼쪽에 녹색 콩모양으로 표시를 해준다. 이거는 툴에서 제공하는 기능이고, 다른 방법으로는 `annotation`이 붙어있거나, 특정한 `interface`를 상속하거나, 혹은 직접 빈으로 등록하는 방법 등이 있다.

`OwnerController` 클래스는 `OwnerRepository` 타입의 인스턴스를 사용하는데, 이 타입 객체를 넣어주는 것은 스프링 IoC 컨테이너가 해당 타입의 빈을 찾아서 넣어주는 것이다.

한 가지 주의해야하는 것은 의존성 주입은 빈끼리만 가능하다. 즉, 스프링 IoC 컨테이너에 들어있는 객체끼리만 의존성 주입을 해줄 수 있고 IoC 컨테이너가 관리하는 빈들을 가져오는 방법을 제공한다.

## 싱글톤 스코프(singleton scope) 객체

스프링이 제공하는 IoC 컨테이너는 싱글톤 스코프 객체를 사용한다. 어떠한 인스턴스 하나를 애플리케이션 전반에서 매번 새로 만드는 것이 아니라 재사용하는 것이다.

---
**Reference**
+ [예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/)
+ <https://spring.io/understanding/application-context>
+ <https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/ApplicationContext.html>
+ <https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/BeanFactory.html>
