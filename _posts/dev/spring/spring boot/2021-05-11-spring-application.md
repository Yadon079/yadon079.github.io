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

텍스트 파일 뿐만 아니라 gif, jpg, png 등으로 만들 수도 있다. 텍스트 파일과 마찬가지로 resource 폴더에 넣으면 되는데, 다른 경로에 넣고 싶을 수도 있다.  
그런 경우에는 application.properties에서 `spring.banner.location`이라는 속성이 있다. 이 값을 설정해주면 된다.

배너를 구현하는 다양한 방법 중에는 코딩으로 구현하는 방법도 있다.  

```java
package me.gracenam.springinit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringinitApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(SpringinitApplication.class);
        app.setBanner((environment, sourceClass, out) -> {
            out.println("=================================");
            out.println("GRACE NAM");
            out.println("=================================");
        });
        app.run(args);
    }

}
```

<img src="/assets/img/study/sa10.png" width="70%" align="center"><br/>

참고로 banner 텍스트 파일이 있을 경우, 코드보다 텍스트 파일이 우선 순위가 높아 텍스트 파일에 작성된 배너가 출력된다.

마지막으로 배너를 끄는 방법은 간단하다.

```java
package me.gracenam.springinit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringinitApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(SpringApplication.class);
        app.setBannerMode(Banner.Mode.OFF);
        app.run(args);
    }

}
```

<span style="font-size:16pt"><b>&#9654; SpringApplicationBuilder</b></span>

&nbsp;&nbsp;&nbsp;static하게 사용되는 스프링 애플리케이션 실행방법은 커스터마이징을 할 수 없다고 했다. 그래서 인스턴스를 직접 만들어서 커스터마이징하는 방법들을 봤었는데, 인스턴스를 만드는 방법말고 <b>SpringApplicationBuilder</b>를 활용하는 방법도 있다.

```java
package me.gracenam.springinit;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class SpringinitApplication {

    public static void main(String[] args) {
        new SpringApplicationBuilder()
                .sources(SpringinitApplication.class)
                .run(args);
    }

}
```

이렇게 sources에 메인 애플리케이션을 설정하고 run하면 동작하는 것을 확인할 수 있다.

<img src="/assets/img/study/sa11.png" width="70%" align="center"><br/>

<span style="font-size:16pt"><b>&#9654; ApplicationEvent 등록</b></span>

&nbsp;&nbsp;&nbsp;스프링에서 기본적으로 제공해주는 Event가 있고, 스프링 부트에서 제공해주는 Event가 있다. 이러한 Event는 다양한 구동 시점이 존재하는데, 그 중에 주의해야할 점이 있다.

<b>SampleListener</b>라는 클래스를 만들고, ApplicationListener라는 인터페이스를 상속해주자. 중요한 것은 어떠한 타입의 리스너인지 인터페이스의 타입을 지정해주어야 한다.

```java
package me.gracenam.springinit;

import org.springframework.boot.context.event.ApplicationStartingEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class SampleListener implements ApplicationListener<ApplicationStartingEvent> {

    @Override
    public void onApplicationEvent(ApplicationStartingEvent applicationStartingEvent) {
        System.out.println("=======================");
        System.out.println("Application is starting");
        System.out.println("=======================");
    }
}
```

이 이벤트(ApplicationStartingEvent)가 발생하면, 애플리케이션이 이 리스너를 실행해준다. 헌데, 리스너가 빈으로 등록이 되어있으면 등록되어있는 빈 중에 해당하는 리스너를 알아서 실행해준다.

여기서 한 가지 문제점이 있다. 이 ApplicationStartingEvent는 <b>애플리케이션 맨 처음에 발생하는 이벤트</b>이다. 즉, ApplicationContext가 만들어지기 전에 발생하는 이벤트이기 때문에 빈으로 등록을 한다하여도 리스너가 동작을 하지 않는다.

<img src="/assets/img/study/sa13.png" width="70%" align="center"><br/>

&nbsp;&nbsp;&nbsp;애플리케이션을 실행해서 결과창을 보면 아무것도 나타나지 않는 것을 볼 수 있다. 분명히 출력이 되도록 코딩을 작성했지만, 아무것도 찍히지 않는다.

이런 경우에는 직접 등록을 해주어야 한다.

```java
package me.gracenam.springinit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringinitApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(SpringinitApplication.class);
        app.addListeners(new SampleListener());
        app.run(args);
    }

}
```

이렇게 한 후 실행하면 출력이 되는 것을 확인할 수 있다. `addListeners()`로
 리스너 객체를 넘겨준 것이다.

<img src="/assets/img/study/sa12.png" width="70%" align="center"><br/>

반대로, ApplicationContext가 생성된 뒤에 발생하는 이벤트는 빈으로 등록하면 쉽게 해결이 된다.

```java
package me.gracenam.springinit;

import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class SampleListener implements ApplicationListener<ApplicationStartedEvent> {

    @Override
    public void onApplicationEvent(ApplicationStartedEvent applicationStartedEvent) {
        System.out.println("========");
        System.out.println("Started");
        System.out.println("========");
    }
}
```

```java
package me.gracenam.springinit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringinitApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(SpringinitApplication.class);
        app.run(args);
    }

}
```

ApplicationListener의 타입을 <b>ApplicationStartingEvent</b>에서 <b>ApplicationStartedEvent</b>로 바꾸고 빈으로 등록했다. 그리고 따로 등록하지는 않은 상태로 실행해보자.

<img src="/assets/img/study/sa14.png" width="70%" align="center"><br/>

&nbsp;&nbsp;&nbsp;이렇게 이벤트를 사용할 때 언제 발생하는지 주의해야 한다. ApplicationContext가 만들어지기 전에 발생하느냐 후에 발생하느냐에 따라 등록하는 방법이 달라진다.

<span style="font-size:16pt"><b>&#9654; WebApplicationType 설정</b></span>

&nbsp;&nbsp;&nbsp;


---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)
