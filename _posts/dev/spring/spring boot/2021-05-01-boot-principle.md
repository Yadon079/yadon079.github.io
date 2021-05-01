---
layout: post
date: 2021-05-01 18:00:00
title: "스프링 부트 시작하기"
description: "스프링 부트 개념과 활용"
subject: Spring Boot
category: [ spring ]
tags: [ spring, boot, intro ]
use_math: true
comments: true
---

[스프링 부트 개념과 활용](https://inf.run/Xny5)을 공부하고 정리하는 포스트입니다.

---

# 스프링 부트 원리

## 의존성 관리 이해

&nbsp;&nbsp;&nbsp;기초적인 스프링 부트 프로젝트의 의존성을 살펴보면 적용된 의존성이 몇 개 없는걸 확인할 수 있다.

<img src="/assets/img/study/boot05.png" width="70%" aling="center"><br/>

의존성이 정의되어 있는 것을 보면 버전이 적혀있지 않는데도 알아서 가져와서 적용된 것을 알 수 있다. 이렇게 자동으로 가져와서 해주는 것이 바로 스프링 부트가 제공해주는 의존성 관리 기능 덕분이다.

&nbsp;&nbsp;&nbsp;이러한 것을 어디서, 어떻게 관리를 해주는 것일까?

pom.xml에서 parent를 따라 올라가면 parent.pom으로 이동된다. 그리고 parent pom 내에도 parent가 선언되어 있는 것을 볼 수 있다. `spring-boot-dependencies`가 parent로 되어있는데 여기서 한 번 더 올라간다.

<img src="/assets/img/study/boot06.png" width="70%" aling="center"><br/>

이번에는 dependencies.pom으로 이동이 되는데 이 dependencies가 가장 위에 있다. 이 pom을 보게 되면 `dependencyManagement`를 볼 수 있는데, 여기에 무수히 많은 의존성들이 정의되어 있다.

<img src="/assets/img/study/boot07.png" width="70%" aling="center"><br/>

---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)
