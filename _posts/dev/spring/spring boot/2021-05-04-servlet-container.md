---
layout: post
date: 2021-05-04 15:00:00
title: "스프링 부트 원리 : 내장 웹 서버"
description: "스프링 부트 개념과 활용"
subject: Spring Boot
category: [ spring boot ]
tags: [ spring, boot, servlet, web server ]
use_math: true
comments: true
---

[스프링 부트 개념과 활용](https://inf.run/Xny5)을 공부하고 정리하는 포스트입니다.

---

# 스프링 부트 원리

## 내장 웹 서버 이해

&nbsp;&nbsp;&nbsp;Spring Boot를 학습하면서 가장 오해하기 쉬운 것 중 하나가 바로 스프링 부트가 서버라고 생각하는 것이다. 결론부터 말해서 <b>스프링 부트는 서버가 아니다!</b>  
스프링 부트 자체는 그냥 내장 서블릿 컨테이너나 스프링 프레임워크를 사용하기 쉽게 해주는 툴이다.  
서버는 <b>[Tomcat](http://tomcat.apache.org), [Netty](https://netty.io), [Jetty](https://www.eclipse.org/jetty/), [Undertow](https://undertow.io)</b>이고, 이들은 자바 코드로 서버를 만들 수 있는 기능을 제공한다.

Spring Boot Application을 만들면 기본적으로 의존성에 Tomcat이 들어와있다.

<img src="/assets/img/study/serv01.png" width="70%" align="center"><br/>

<span style="font-size:16pt"><b>&#9654; 톰캣 작성</b></span>

&nbsp;&nbsp;&nbsp;자바 코드로 Tomcat을 만들 수 있으니 한 번 만들어보자.

&#10071; 스프링 부트의 버전이 올라가면서 기본 제공되는 톰캣의 버전도 같이 올라갔다. 제공되는 톰캣의 버전으로 실행하면 localhost:8080에 연결이 안되는 경우 톰캣의 버전을 8.5.31로 변경하면 된다.

```
<properties>
   <tomcat.version>8.5.31</tomcat.version>
</properties>
```

&nbsp;&nbsp;&nbsp;톰캣의 포트를 8080으로 설정해주고, context를 추가해고 8080포트가 정상적으로 동작하는지 확인을 해보자.

```java
package me.gracenam;

import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;

public class Application {

    public static void main(String[] args) throws LifecycleException {
        Tomcat tomcat = new Tomcat();
        tomcat.setPort(8080);

        Context context = tomcat.addContext("/", "/");

        tomcat.start();
//        tomcat.getServer().await();
    }

}
```

<img src="/assets/img/study/serv02.png" width="70%" align="center"><br/>

실행했을 때 위와 같이 출력이 된다면 정상적으로 작동한 것이다. 이제 Servlet을 만들 것이다.

```java
package me.gracenam;

import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class Application {

    public static void main(String[] args) throws LifecycleException {
        Tomcat tomcat = new Tomcat();
        tomcat.setPort(8080);

        Context context = tomcat.addContext("/", "/");

        HttpServlet servlet = new HttpServlet() {
            @Override
            protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
                PrintWriter writer = resp.getWriter();
                writer.println("<html><head><title>");
                writer.println("Hey, Tomcat");
                writer.println("</title></head>");
                writer.println("<body><h1>Hello Tomcat</h1></body>");
                writer.println("</html>");
            }
        };

        String servletName = "helloServlet";
        tomcat.addServlet("/", servletName, servlet);
        context.addServletMappingDecoded("/hello", servletName);

        tomcat.start();
        tomcat.getServer().await();
    }

}
```

간단한 HTML 코드를 추가한 Servlet을 만든 후, 등록을 했다. Servlet 이름을 지정해주고, servlet 객체를 helloServlet이라는 이름으로 context에 추가해주었다. 그리고 난 후 context에 맵핑을 추가하는데 루트 요청이 오면 servlet을 보여주도록 만들었다.

이렇게 내장 서버를 톰캣만 써서 작성할 수 있다. 실행을 해서 확인해보자. 물론 이 과정을 실제로 사용하는 일은 없을 것이다.

<img src="/assets/img/study/serv03.png" width="70%" align="center"><br/>

정상적으로 출력되는 것을 확인할 수 있다.  

<span style="font-size:16pt"><b>&#9654; 스프링 부트의 자동 설정</b></span>

&nbsp;&nbsp;&nbsp;그렇다면 이런 설정이 어디에 있길래 스프링 부트가 Servlet Container를 띄워주는 것일까. 바로 자동설정과 관련이 있는데, 의존성 중에서 `autoconfigure`에 있는 spring.factories를 열어서 자동 설정 파일 중 <b>ServletWebServerFactoryAutoConfiguration</b>이 있다.

<img src="/assets/img/study/serv04.png" width="70%" align="center"><br/>

+ <b>ServletWebServerFactoryAutoConfiguration</b> (서블릿 웹 서버 생성)
  + TomcatServletWebServerFactory (서버 커스터마이징)

ServletWebServerFactoryAutoConfiguration을 살펴보면 ServletRequest라는 클래스가 클래스패스에 있으면 자동 설정하도록 되어있다. import된 configuration을 보면 BeanPostProcessorsRegistrar, EmbeddedTomcat, EmbeddedJetty, EmbeddedUndertow가 있다.

여기서 Tomcat을 보면 TomcatServletWebServerFactory가 있다. Servlet, Tomcat, UpgradeProtocol 클래스가 있으먼 자동 설정되어 우리가 Tomcat을 만들지 않아도 된다.

여기서 더 파고들어가지 않고 '자동설정으로 톰캣이 만들어지는구나, 내장 서블릿 컨테이너가 만들어지는구나'하고 넘어가면 된다.

&nbsp;&nbsp;&nbsp;이렇게 만들어진 서블릿은 어디서 등록을 하는가. 스프링 MVC, 특히 서블릿 기반의 MVC라면 DispatcherServlet을 만들어야 한다. 그리고 spring.factories에는 DispatcherServlet의 자동 설정인 <b>DispatcherServletAutoConfiguration</b>파일이 설정되어 있다.

<img src="/assets/img/study/serv05.png" width="70%" align="center"><br/>

+ <b>DispatcherServletAutoConfiguration</b>
  + 서블릿을 만들고 등록

DispatcherServletAutoConfiguration을 살펴보면 Http 서블릿을 상속해서 만든 스프링 MVC의 핵심 클래스인 DispatcherServlet을 만들고 서블릿 컨테이너에 등록한다.

### 왜 둘은 분리되어 있을까?

&nbsp;&nbsp;&nbsp;서블릿 컨테이너는 설정에 따라서 달라질 수 있지만 서블릿은 변하지 않는다. DispatcherServlet은 어떠한 서블릿 컨테이너를 쓰든 상관없이 서블릿을 만든 다음에 현재의 서블릿 컨테이너에 등록하는 과정이 DispatcherServletAutoConfiguration 안에서 이루어진다.

## 내장 웹 서버 응용

<span style="font-size:16pt"><b>&#9654; 다른 서블릿 컨테이너로 변경</b></span>

&nbsp;&nbsp;&nbsp;서블릿 애플리케이션(서블릿 기반 웹 MVC 애플리케이션)을 개발할 때 기본적으로 톰캣을 사용하게 된다. 그 이유는 자동 설정에 의해 의존성으로 톰캣이 들어있기 때문이다.  
`ConditionalOnClass`에 의해서 톰캣용 자동 설정 파일이 읽어지고 톰캣을 만들게 되고 톰캣을 쓰게 된다.

그렇다면 다른 웹 서버를 사용하고 싶다면 어떻게 해야하는가? [공식 문서](https://docs.spring.io/spring-boot/docs/current/reference/html/howto-embedded-web-servers.html)를 참조해가면서 해보도록 하자.

우선 다른 웹 서버를 쓰려면 현재 들어와있는 웹 서버인 <b>Spring-Boot-Starter-Tomcat</b>을 제거해야 한다.

```
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
  <exclusions>
    <exclusion>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-tomcat</artifactId>
    </exclusion>
  </exclusions>
</dependency>
```

<b>exclusions</b>은 선언된 의존성을 배제하는 것으로 우리가 사용하는 톰캣은 스프링 부트 스타터에 포함되어 있기 때문에 `spring-boot-starter-tomcat`을 배제하였다. 기본으로 제공하는 것이 톰캣이기 때문 배제당하는 것은 항상 톰캣이다.  
만일 톰캣을 제외하고 아무런 서버도 추가해주지 않는다면 웹 애플리케이션으로 뜨지않고 그냥 애플리케이션으로 동작하고 끝난다.

&nbsp;&nbsp;&nbsp;이제 새로운 의존성으로 우리가 사용하고 싶은 서블릿 컨테이너의 의존성을 가져와보자. 이것도 톰캣과 마찬가지로 스프링 부트 스타터를 통해서 주입받는다. 예를 들어서 jetty를 넣어보자.

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jetty</artifactId>
</dependency>
```

의존성을 주입한 후에 확인해보면 기존에 있던 톰캣이 사라지고 jetty가 추가된 것을 확인할 수 있다.

<img src="/assets/img/study/serv06.png" width="70%" align="center"><br/>

이 상태에서 실행을 해보면 톰캣이 아니라 jetty로 실행이 되는 것을 확인할 수 있다.

<img src="/assets/img/study/serv07.png" width="70%" align="center"><br/>

<span style="font-size:16pt"><b>&#9654; 웹 서버 사용하지 않기</b></span>

&nbsp;&nbsp;&nbsp;기본적으로 의존성에 웹 관련 기술이 들어와있으면 스프링 부트는 웹 애플리케이션으로 만들려고 시도한다.  
코드를 작성하여 의존성이 있지만 애플리케이션으로 동작하도록 하는 방법이 있었다. `WebApplicationType`을 <b>NONE</b>으로 지정하여 애플리케이션으로 동작하고 끝나도록 했었다.

```java
SpringApplication application = new SpringApplication(Application.class);
application.setWebApplicationType(WebApplicationType.NONE);
application.run(args);
```

이번에는 properties를 사용하는 방법인데, 기존의 방법과 마찬가지로 웹 애플리케이션의 타입을 변경하여 논 웹 애플리케이션으로 동작하도록 하는 것이다.  
resources 아래에 application.properties에 아래와 같이 작성하면된다.

```
spring.main.web-application-type=none
```

그리고 실행을 하면 서버가 사용하지 않고(None Web) 애플리케이션으로 실행되고 끝난다.

<img src="/assets/img/study/serv08.png" width="70%" align="center"><br/>

<span style="font-size:16pt"><b>&#9654; 포트</b></span>

&nbsp;&nbsp;&nbsp;마찬가지로 포트도 변경할 수 있다. application.properties에 아래와 같이 작성하면 포트가 변경된 채로 실행되는 것을 확인할 수 있다.

```
server.port=7070
```

<img src="/assets/img/study/serv09.png" width="70%" align="center"><br/>

&nbsp;&nbsp;&nbsp;랜덤 포트를 사용하는 방법도 있는데 <b>값으로 0을 주면</b> 포트 중에서 사용할 수 있는 포트를 찾아서 실행하게 된다. (이 때 나타나는 포트는 로그를 보지않는 이상 알 수 없다.)

```
server.port=0
```

<<img src="/assets/img/study/serv10.png" width="70%" align="center"><br/>

&nbsp;&nbsp;&nbsp;이렇게 랜덤하게 설정되거나 혹은 지정해 준 포트를 애플리케이션에서는 어떻게 쓸 것이냐 혹은 찾을 것이냐에 대해 알아보자. 공식문서에서 추천하는 방법으로 <b>ApplicationListener\<ServletWebServerInitializedEvent></b>를 소개하고 있다.

EventListener의 역할을 할 빈이 필요하므로 클래스를 하나 생성한다.

```java
package me.gracenam;

import org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext;
import org.springframework.boot.web.servlet.context.ServletWebServerInitializedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class PortListener implements ApplicationListener<ServletWebServerInitializedEvent> {

    @Override
    public void onApplicationEvent(ServletWebServerInitializedEvent servletWebServerInitializedEvent) {
        ServletWebServerApplicationContext applicationContext = servletWebServerInitializedEvent.getApplicationContext();
        System.out.println(applicationContext.getWebServer().getPort());
    }

}
```

먼저 Event에서 WebApplicationContext를 꺼낸다. 이렇게 꺼낸 applicationContext는 ServletWebServerApplicationContext이기 때문에 웹 서버를 알 수 있고 웹 서버를 통해서 포트를 알 수 있다.  
이렇게 한 후 실행해보면 서버가 실행되고 콜백이 실행되면서 서버 포트가 찍히고 그 다음 바로 로그에 찍히는 것이 같은 것을 확인할 수 있다.

<img src="/assets/img/study/serv11.png" width="70%" align="center"><br/>

<span style="font-size:16pt"><b>&#9654; HTTPS 설정하기</b></span>

&nbsp;&nbsp;&nbsp;HTTPS 설정하는 방법에 대해서 알아보자. 먼저 HTTPS를 사용하려면 키스토어를 만들어야 한다. 아래와 같은 내용을 콘솔창에서 입력하자.

```
keytool -genkey -alias spring -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore keystore.p12 -validity 4000
```

엔터를 누르면 나타나는 문항들에 순차적으로 값을 입력해주면 된다. 로컬에서 사용할 것이기때문에 임의의 값들로 채워넣으면 된다. <b>여기에 입력된 값들은 다 가짜다!</b>

<img src="/assets/img/study/serv12.png" width="70%" align="center"><br/>

생성하고 나면 `keystore.p12`가 생성된 것을 확인할 수 있고 이 keystore를 가지고 세팅을 시작하면 된다. application.properties로 가서 아래와 같이 값을 입력해주자.

```
server.ssl.key-store=keystore.p12
server.ssl.key-store-type= PKCS12
server.ssl.key-store-password=123456
server.ssl.key-alias=tomcat
```

여기서 keystore를 루트에 넣지 않고 resources 안이나 classpath에 넣고 싶다면 `server.ssl.key-stroe=classpath:keystore.p12`와 같은 형식으로 작성하면 된다. 지금같은 경우 application 폴더 루트에 있기 때문에 `keystore.p12`만 작성했다.

이제 HTTPS 설정이 되었다. 스프링 부트에서는 기본적으로 톰캣이 사용하는 커넥터가 하나만 등록된다. 이 커넥터에 SSL을 적용시켜준다. 따라서 모든 요청은 HTTPS를 붙여서 해야한다.

&#9654; HTTPS를 안붙였을 때

<img src="/assets/img/study/serv13.png" width="70%" align="center"><br/>

&#9654; HTTPS를 붙였을 때

<img src="/assets/img/study/serv14.png" width="70%" align="center"><br/>

HTTPS를 붙여야해서 붙였는데 왜 저런 화면이 뜰까

브라우저가 서버에 요청을 보냈을 때, 서버에서는 인증서를 보내고 그 인증서는 keystore 안에 들어 있다. 그리고 브라우저는 이 인증서의 POP[^1] key를 모르는 상태이기 때문에 저런 화면이 출력되는 것이다.  
공인된 인증서 <b>Let's Encrypt</b>, <b>GeoTrust</b>, <b>GoDaddy</b>와 같은 곳에서 발급하는 인증서에 대한 POP key는 대부분의 브라우저가 알고 있다. 그래서 그러한 인증서들은 녹색으로 표시되면서 이러한 화면이 안뜬다. 하지만 방금 만든 인증서는 브라우저가 전혀모르는 로컬 인증서이기 때문에 경고문이 발생한 것이다.  

<span style="font-size:16pt"><b>&#9654; 코딩으로 HTTP 커넥터 설정하기</b></span>

&nbsp;&nbsp;&nbsp;보시다시피 현재 커넥터에는 HTTPS가 들어와 있기 때문에 HTTP를 사용할 수가 없다. 물론 사용하고자 하면 사용할 수 있는 방법이 있다. 직접 코딩을 해서 설정해주면 되는데 코딩을 해보자.

```java
package me.gracenam;

import org.apache.catalina.connector.Connector;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
public class Application {

    @GetMapping("/hello")
    public String hello() {
        return "Hello Spring";
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public ServletWebServerFactory serverFactory() {
        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory();
        tomcat.addAdditionalTomcatConnectors(createStandardConnector());
        return tomcat;
    }

    private Connector createStandardConnector() {
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setPort(8080);
        return connector;
    }

}
```

8080 포트를 HTTP에게 주고 HTTPS는 8443 포트로 넘겼다. 콘솔 창에서 각각 확인해 보면 각 포트에서 정상적으로 뜨는 것을 볼 수 있다.

<img src="/assets/img/study/serv15.png" width="70%" align="center"><br/>

<span style="font-size:16pt"><b>&#9654; HTTP2 설정하기</b></span>

&nbsp;&nbsp;&nbsp; HTTP2를 설정하는 방법은 공식문서에 나와있는데 서버마다 제약사항이 다르다. 먼저 application.properties에 `server.http2.enabled=true`를 추가해주자. 그리고 난 후 서버별 설정을 살펴보면 다음과 같다.

Undertow는 HTTPS만 적용이 되어있으면 추가설정이 필요없다. 하지만 Tomcat이나 Jetty의 경우 다소 복잡한 추가설정이 필요하다.

&#128161;톰캣 9.0.x 이상부터는 추가설정이 필요없다고 한다.

여기서는 사용하기 편리한 Undertow를 통해서 확인해보자. 의존성에 Undertow를 추가해주고, 포트 설정은 8443으로 되어있고 HTTP2를 켰다.

&#9654; pom.xml

```
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcat</artifactId>
            </exclusion>
        </exclusions>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-undertow</artifactId>
    </dependency>
</dependencies>
```

&#9654; application.properties

```
server.ssl.key-store=keystore.p12
server.ssl.key-store-type= PKCS12
server.ssl.key-store-password=123456
server.ssl.key-alias=spring
server.port=8443
server.http2.enabled=true
```

<img src="/assets/img/study/serv16.png" width="70%" align="center"><br/>

8443 포트로 Undertow가 실행되는 것을 확인했으니 콘솔로 HTTP2로 동작하는지 확인해보자.

<img src="/assets/img/study/serv17.png" width="70%" align="center"><br/>

잘 동작하는 것을 확인할 수 있다!

<span style="font-size:16pt"><b>&#9654; HTTP2 설정하기 ver. 톰캣</b></span>

&nbsp;&nbsp;&nbsp;현재는 버전업이 많이 되어서 톰캣 9.0.X 버전을 기본으로 제공해주고 있다. 따라서 굳이 Undertow를 사용하지 않고도 HTTP2를 확인할 수 있다.

<img src="/assets/img/study/serv18.png" width="70%" align="center"><br/>

<img src="/assets/img/study/serv19.png" width="70%" align="center"><br/>


---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)

---
[^1]:Proof Of Propession. 개인키 소유 증명.
