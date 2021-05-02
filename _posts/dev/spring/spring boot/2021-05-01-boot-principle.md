---
layout: post
date: 2021-05-01 18:00:00
title: "스프링 부트 원리 : 의존성"
description: "스프링 부트 개념과 활용"
subject: Spring Boot
category: [ spring boot ]
tags: [ spring, boot, dependency ]
use_math: true
comments: true
---

[스프링 부트 개념과 활용](https://inf.run/Xny5)을 공부하고 정리하는 포스트입니다.

---

# 스프링 부트 원리

## 의존성 관리 이해

&nbsp;&nbsp;&nbsp;기초적인 스프링 부트 프로젝트의 의존성을 살펴보면 적용된 의존성이 몇 개 없는걸 확인할 수 있다.

<img src="/assets/img/study/boot05.png" width="70%" align="center"><br/>

의존성이 정의되어 있는 것을 보면 버전이 적혀있지 않는데도 알아서 가져와서 적용된 것을 알 수 있다. 이렇게 자동으로 가져와서 해주는 것이 바로 스프링 부트가 제공해주는 의존성 관리 기능 덕분이다.

&nbsp;&nbsp;&nbsp;이러한 것을 어디서, 어떻게 관리를 해주는 것일까?

pom.xml에서 parent를 따라 올라가면 parent.pom으로 이동된다. 그리고 parent pom 내에도 parent가 선언되어 있는 것을 볼 수 있다. `spring-boot-dependencies`가 parent로 되어있는데 여기서 한 번 더 올라간다.

<img src="/assets/img/study/boot06.png" width="70%" align="center"><br/>

이번에는 dependencies.pom으로 이동이 되는데 이 dependencies가 가장 위에 있다. 이 pom을 보게 되면 `dependencyManagement`를 볼 수 있는데, 여기에 무수히 많은 의존성들이 정의되어 있다.

<img src="/assets/img/study/boot07.png" width="70%" align="center"><br/>

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

<span style="font-size:16pt"><b>&#9654; 의존성을 추가하는 방법(관리 해주는 의존성)</b></span>

&nbsp;&nbsp;&nbsp;Spring Data JPA를 추가해보자. 현재 dependencies에는 아래와 같이 두 개의 의존성만 들어 있다.

<img src="/assets/img/study/depen01.png" width="70%" align="center"><br/>

여기에 다음과 같이 의존성을 추가해준다.

```
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
```

`dependencyManagement`가 적용되고 있다면 버전은 따로 작성하지 않아도 된다. IntelliJ의 경우 아래 사진의 박스와 같은 표시가 뜬다면 `dependencyManagement`가 적용되고 있는 것이다.

<img src="/assets/img/study/depen02.png" width="70%" align="center"><br/>

이제 `cmd + shift + i` 혹은 우측 상단에 나타난 아래 사진과 같은 버튼을 눌러서 변경된 내용을 적용하자.

<img src="/assets/img/study/depen04.png" width="70%" align="center"><br/>

적용을 하고 난 뒤에 주입된 의존성을 확인해보면 다음과 같다.

<img src="/assets/img/study/depen03.png" width="70%" align="center"><br/>

`spring-boot-starter-data-jpa`가 추가된 것을 볼 수 있고, 그 아래에 `hibernate-core`, `spring-data-jpa`, `orm`등이 최신 버전으로 주입되어 있는 것을 확인할 수 있다.

이처럼 의존성 관리 기능을 사용하면 최신 버전의 의존성들을 보다 간편하게 사용할 수 있다.

<span style="font-size:16pt"><b>&#9654; 의존성을 추가하는 방법(관리 안해주는 의존성)</b></span>

&nbsp;&nbsp;&nbsp;의존성 관리 기능이 적용되지 않는 의존성을 추가할 때 차이점은 버전을 명시해주고 안해주고의 차이이다.

`ModelMapper`라는 의존성을 추가해보자. 이 의존성은 DTO를 사용할 때 도메인 모델의 내용을 한 줄로 간편하게 복사해주는 기능이다.

구글에 <b>ModelMapper</b>를 검색하여 사이트에 들어가면 추가해야할 코드가 적혀있다.

<img src="/assets/img/study/depen05.png" width="70%" align="center"><br/>

이제 해당 코드를 복사해서 의존성을 주입해보면 관리를 해주는 의존성과 다르게 옆에 표시가 나타나지 않는 것을 확인할 수 있다.

<img src="/assets/img/study/depen06.png" width="70%" align="center"><br/>

이처럼 관리 대상이 아닌 의존성의 경우 일일히 버전을 명시해주고 새로운 버전이 필요하다면 직접 작성하여 버전업을 해줘야 한다.

<span style="font-size:16pt"><b>&#9654; 기존 의존성 버전 변경하기</b></span>

&nbsp;&nbsp;&nbsp;마지막으로 기존에 적용되어 있는 의존성의 버전을 변경해보자. 현재 spring 버전은 5.3.5버전이 적용되어 있다.

<img src="/assets/img/study/depen07.png" width="70%" align="center"><br/>

적용된 버전을 일괄적으로 바꾸는 방법은 간단하다. properties를 추가하여서 해결하면 되는데, 스프링의 버전을 변경할 것이기 때문에 아래와 같이 작성하면 된다.

```
<properties>
    <spring.version>5.3.4</spring.version>
</properties>
```

작성한 후에 적용을 하고 확인해보면 정상적으로 변경된 것을 확인할 수 있다.

<img src="/assets/img/study/depen08.png" width="70%" align="center"><br/>

자바 버전을 변경하는 것도 마찬가지로 properties에서 `java.version`으로 변경하면 된다.

마찬가지로 parent에 작성되어 있는 propertiesd와 plugin 설정들은 필요에 따라서 복사한 다음 직접 원하는 버전을 명시해서 변경해 사용할 수 있다.

---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)
