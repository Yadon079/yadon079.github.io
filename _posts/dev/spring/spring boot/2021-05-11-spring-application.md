---
layout: post
date: 2021-05-11 11:35:00
title: "스프링 부트 활용 : SpringApplication"
description: "스프링 부트 개념과 활용"
subject: Spring Boot
category: [ spring boot ]
tags: [ spring, boot ]
use_math: true
comments: true
---

# 스프링 부트 활용

## SpringApplication

&nbsp;&nbsp;&nbsp;스프링 애플리케이션을 만들면 보통 아래와 같은 형태로 만들어진다.

```java
package me.gracenam.springinit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringinitApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringinitApplication.class, args);
    }

}
```

이렇게 사용해도 큰 문제는 없지만 스프링이 제공하는 다양한 커스터마이징 기능을 사용하기가 어렵다.  
다양한 기능을 사용해보기 위해서 인스턴스를 만들어서 run을 하는 방법을 사용해보자. 코드는 다르지만 출력되는 결과는 동일하다.

```java
package me.gracenam.springinit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringinitApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(SpringApplication.class);
        app.run(args);
    }

}
```

<span style="font-size:16pt"><b>&#9654; 로그 레벨 INFO</b></span>

&nbsp;&nbsp;&nbsp;아무런 옵션도 변경하지 않고 실행하면 기본적으로 로그 레벨은 <b>INFO</b> 레벨이다.

<img src="/assets/img/study/sa01.png" width="70%" align="center"><br/>

로그 레벨을 설정하는 방법 중 간단한 것 하나만 살펴보자.  
우측 상단에 있는 실행 옵션(Edit Configuration)에서 <b>VM options</b>과 <b>Program arguments</b>를 조정할 수 있다.  

<img src="/assets/img/study/sa02.png" width="70%" align="center"><br/>

<img src="/assets/img/study/sa03.png" width="70%" align="center"><br/>

VM options에 `-Ddebug`라고 적어주거나 Program arguments에 `--debug`라고 적어준 다음 실행을 하면 디버그 모드로 애플리케이션이 동작을 하게된다.

<img src="/assets/img/study/sa04.png" width="70%" align="center"><br/>

그리고 애플리케이션 로그도 디버그 레벨까지 출력을 한다. 이렇게 디버그 레벨로 찍을 때 한 가지 특이한 점은 어떠한 자동 설정이 적용 되었는지, 자동 설정이 적용되지 않았다면 왜 안 되었는지를 로그로 출력된다.  
어떤 설정의 적용 여부와 이유를 알고싶을 때 디버그 모드를 사용하면 된다.

<span style="font-size:16pt"><b>&#9654; FailurAnalyzer</b></span>

&nbsp;&nbsp;&nbsp;<b>FailurAnalyzer</b>는 [공식 문서](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-startup-failure)에 잘 설명이 되어있으니 간단하게 보고 넘어가자.

`FailurAnalyzer`는 어떠한 애플리케이션이 에러가 났을 때 에러 메세지를 조금 더 이쁘게 출력해주는 기능이다. 기본적으로 스프링 부트에는 여러 가지의 FailurAnalyzer가 등록이 되어 있다.  
직접 만들어서 등록을 할 수도 있지만, 사실 직접 만들어서 사용해 볼 일은 없다.

<span style="font-size:16pt"><b>&#9654; 배너</b></span>

&nbsp;&nbsp;&nbsp;배너는 우리가 스프링 애플리케이션을 실행할 때마다 콘솔에 보이던 것이다.

<img src="/assets/img/study/sa05.png" width="70%" align="center"><br/>

이 배너를 바꾸는 방법이 몇 가지 있다.

&#9654; txt, gif, jpg, png

&nbsp;&nbsp;&nbsp;첫 번째 방법은 resources 폴더 안에 배너 파일을 넣어주면 된다.  
예를 들어 아래와 같은 텍스트 문서를 작성하고 resources 폴더에 banner.txt로 저장한 후 실행해보자.

```
=================================
   Spring Boot feat. GraceNam
=================================
```

<img src="/assets/img/study/sa06.png" width="70%" align="center"><br/>

기존의 배너가 아닌 직접 만든 배너가 출력되는 것을 확인할 수 있다. 여기에 ASCII Generator 같은 툴로 로고를 만들어서 넣어도 된다.  

배너를 만들 때 쓸 수 있는 변수들이 있는데, 예를 들어 `${spring-boot.version}` 같은 경우에는 스프링 부트의 버전을 함께 출력해 준다.

```
=================================
   Spring Boot feat. GraceNam
                        ver.${spring-boot.version}
=================================
```

<img src="/assets/img/study/sa07.png" width="70%" align="center"><br/>

이 중에 일부는 `MANIFEST.MF` 파일이 생성이 되어야 출력이 된다. 예를 들어 `${application.version}`의 경우 MANIFEST 파일이 없기 때문에 출력되지 않는다.

```
=================================
   Spring Boot feat. GraceNam
                        ver.${application.version}
=================================
```

<img src="/assets/img/study/sa08.png" width="70%" align="center"><br/>

&nbsp;&nbsp;&nbsp;스프링 부트의 패키징은 굉장히 독특한데 패키징을 할 경우 모든 의존성을 포함하여 단 하나의 JAR 파일이 생성된다. 그리고 이 JAR 파일만 실행하면 다 실행 할 수 있다.

JAR 파일을 실행해보면 버전이 정상적으로 출력되는 것을 볼 수 있는데, 패키징을 하는 과정에서 pom.xml에서 버전 정보를 가져가서 MANIFEST 파일이 생성되었기 때문이다.

<img src="/assets/img/study/sa09.png" width="70%" align="center"><br/>



---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)
