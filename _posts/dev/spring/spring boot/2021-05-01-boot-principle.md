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

`spring-boot-dependencies.pom`의 `dependencyManagement`에 정의되어 있는 의존성 중 하나를 쓰게 된다면 직접 버전을 명시하지 않아도 관리를 해주는 것이다.

&nbsp;&nbsp;&nbsp;이렇게 `dependencyManagement`기능이 정의되어 있기 때문에 관리해야 할 의존성이 줄어드는 것이다. 만약 스프링 버전을 올려야하거나 서드 파티의 라이브러리 버전을 변경해야할 때, 의존성 관리가 없다면 직접 호환되는 버전을 실행해서 찾아보거나 버전이 밀리는 등의 문제가 생길 것이다.

pom에서 지원하지 않는 의존성의 경우 버전을 명시해야하지만, 지원하는 경우 생략해도 된다. 만약 원하는 버전이 따로 있을 경우 명시해도 괜찮다.

### Without the parent POM

&nbsp;&nbsp;&nbsp;작성한 프로젝트에 그 프로젝트 만의 상속 구조가 있어서 parent 선언을 못 하는 경우가 있을 수 있다. 그럴 때는 2가지 방법이 있다. 예를 들어 A라는 프로젝트를 만들고 그 프로젝트의 parent로 B를 넣어두었다고 해보자.

첫 번째 방법은 A 프로젝트의 parent에 넣어놓은 B 프로젝트의 parent로 `spring-boot-starter-parent`를 넣는 것이다. 그렇게하면 넘어와서 의존성 관리를 받을 수 있다.

두 번째 방법은 parent가 고정이 되어서 바꿀 수 없을 경우, `dependencyManagement`라는 element를 사용해서 `spring-boot-dependencies`를 직접 넣어주면 된다.

```
<dependencyManagement>
		<dependencies>
		<dependency>
			<!-- Import dependency management from Spring Boot -->
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-dependencies</artifactId>
			<version>2.0.3.RELEASE</version>
			<type>pom</type>
			<scope>import</scope>
		</dependency>
	</dependencies>
</dependencyManagement>
```

하지만 이렇게 할 경우 단점이 있는데, `spring-boot-parent`에는 dependency만 있는게 아니라 properties라던가 스프링 부트가 사용하는 yml 파일을 리소스에 포함해주는 등 최적화된 설정들이 많이 들어있다. `spring-boot-parent`를 쓰지 않는다는 것은 이러한 설정들이 하나도 반영되지 않는다는 것이다.

## 의존성 관리 응용



---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)
