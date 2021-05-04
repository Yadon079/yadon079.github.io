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



---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)
