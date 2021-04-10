---
layout: post
date: 2021-04-08 17:54:00
title: "Resource 추상화"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, Resource, abstraction ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---

# Resource 추상화

&nbsp;&nbsp;&nbsp;스프링 레퍼런스의 아주 많은 부분을 차지하는 추상화 중의 일부분인 <b>Resource 추상화</b>에 대해 알아보자.

Resource 추상화는 <b>java.net.URL</b>이라는 클래스를 <b>org.springframework.core.io.Resource</b> 클래스로 감싸서 실제 low-level에 있는 리소스에 접근하는 기능을 만든 것이다. 즉, <b>java.net.URL</b>을 추상화 한 것인데 `java.net.URL`이 무엇인지 먼저 알아보자.

## java.net.URL

&nbsp;&nbsp;&nbsp;`URL`은 인터넷 상의 주소를 표현하는 방법을 말한다. 따라서 `java.net.URL` 클래스는 웹 상에 존재하는 자원에 접근할 때 사용하는 클래스인 것이다. 여기서 웹 상에 존재하는 자원은 프로토콜, 호스트, 포트번호 등등을 말한다.

<span style="font-size:16pt"><b>&#9654; 왜 추상화를 하였는가?</b></span>

기존의 URL 클래스가 classpath 기준으로 리소스를 읽어오는(가져오는) 기능이 없었고, URL을 통해서만 가져올 수 있었는데 사실 URL을 통해 가져오는거나 classpath를 통해서 가져오는거나 둘 다 Resource를 가져오기 위한 방법이므로, Spring에서는 이 것을 추상화하여 통일 시킨 것이다.

이 외에도 ServletContext를 기준으로 상대 경로를 읽어오는 기능이 없고, URL prefix(접두사)를 이용해 새로운 핸들러를 등록하여 URL 접미사를 만들어 사용할 수 있지만 구현이 복잡하고 편의성이 없었다.

정리하자면 기존 java.net.URL 클래스는

+ classpath 기준으로 리소스를 읽어오는 기능이 없음.
+ ServletContext를 기준으로 상대 경로로 읽어오는 기능이 없음.
+ 새로운 핸들러를 등록하여 URL 접미사를 만들어 사용할 수 있지만 구현이 복잡하고 편의성이 없음.

이 세 가지의 이유에서 Spring은 리소스를 추상화를 하여 리소스를 다루는 하나의 인터페이스를 제공하는 것이다.

---

&nbsp;&nbsp;&nbsp;이러한 Resource 추상화는 실제로 어떻게 사용이 되는것일까? ApplicationContext를 만들 때 Xml으로 만들거나 자바로 만들 수 있데, Xml 파일을 만들 때 `ClassPathXmlApplicationContext`를 사용해서 만든다.

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ResourceLoader resourceLoader;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        var ctx = new ClassPathXmlApplicationContext("hello.xml");

        Resource resource = resourceLoader.getResource("classpath:test.txt");
        System.out.println(resource.exists());
        System.out.println(resource.getDescription());
        System.out.println(Files.readString(Path.of(resource.getURI())));
    }

}
```

`ClassPathXmlApplicationContext`에 작성한 Xml(여기선 hello.xml)문자열이 내부적으로 리소스로 변환이 되고 이렇게 변환이 되면 `classpath:test.txt`라는 로케이션으로 가게 된다.

또는 `FileSystemXmlApplicationContext`라는 것도 있다. `ClassPathXmlApplicationContext`은 이름에서 알 수 있듯이 <b>classpath</b>를 기준으로 xml 파일을 찾는 것이고 `FileSystemXmlApplicationContext`은 <b>file system</b> 경로 기준으로 문자열(xxx.xml)에 해당하는 리소스를 찾아서 빈 설정파일로 사용하는 것이다.

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.support.FileSystemXmlApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ResourceLoader resourceLoader;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        var ctx = new FileSystemXmlApplicationContext("xxx.xml");

        Resource resource = resourceLoader.getResource("classpath:test.txt");
        System.out.println(resource.exists());
        System.out.println(resource.getDescription());
        System.out.println(Files.readString(Path.of(resource.getURI())));
    }

}
```

## interface Resource

> <https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/io/Resource.html>

```java
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package org.springframework.core.io;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import org.springframework.lang.Nullable;

public interface Resource extends InputStreamSource {
    boolean exists();

    default boolean isReadable() {
        return this.exists();
    }

    default boolean isOpen() {
        return false;
    }

    default boolean isFile() {
        return false;
    }

    URL getURL() throws IOException;

    URI getURI() throws IOException;

    File getFile() throws IOException;

    default ReadableByteChannel readableChannel() throws IOException {
        return Channels.newChannel(this.getInputStream());
    }

    long contentLength() throws IOException;

    long lastModified() throws IOException;

    Resource createRelative(String var1) throws IOException;

    @Nullable
    String getFilename();

    String getDescription();
}
```

`Resource` 인터페이스를 살펴보면 다양한 메서드가 존재하는 것을 볼 수 있다.

리소스가 항상 존재한다는 가정은 하지 않고 리소스가 존재하는지 확인하기 위해 `exists()` 메소드가 구현되어 있다. 또 읽을 수 있는(`isReadable()`), 열려있는지(`isOpen()`), 파일인지 아닌지(`isFile()`) 확인하는 메소드가 있고, URL, URI로 변환할 수 있고(`getURL()`, `getURI()`), File로 가져올 수도 있다(`getFile()`). 단, File의 경우 항상 모든 리소스를 파일로 가져올 수 있는 것은 아니다. 그 외에도 여러 메서드가 있다.

<span style="font-size:16pt"><b>&#9654; 리소스의 구현체</b></span>

&nbsp;&nbsp;&nbsp;리소스의 구현체는 굉장히 다양한데 그 중에서 중요한 몇 가지만 살펴보자.

<b>&#9654; UrlResource</b>

&nbsp;&nbsp;&nbsp;UrlResource는 기본인 프로토콜 http, https, ftp, file, jar와 같은 prefix를 지원한다. URL을 기준으로 리소스를 읽어오며, 더 자세한 것은 [java.net.URL](https://docs.oracle.com/javase/7/docs/api/java/net/URL.html)을 참고하자.

<b>&#9654; ClassPathResource</b>

&nbsp;&nbsp;&nbsp;classpath라는 키워드를 접두어로 사용해서 ClassPathResource를 통해 특정 빈을 찾아내거나 빈 주입을 완료해준다.

<b>&#9654; ServletContextResource</b>

&nbsp;&nbsp;&nbsp;웹 애플리케이션 루트에서 상대 경로로 리소스를 찾으며 가장 많이 사용된다. 이유는 읽어 들이는 리소스의 타입이 ApplicationContext와 관련이 있기 때문이다. 이게 무슨 말일까?

## 리소스 읽어오기

&nbsp;&nbsp;&nbsp;읽어 들이는 <b>Resource의 타입</b>은 location 문자열과 <b>ApplicationContext의 타입</b>에 따라 결정된다.

```java
var ctx = new ClassPathXmlApplicationContext("app.xml");
```

위와 같은 경우 `app.xml`(location 문자열)을 가진 ApplicationContext의 타입이 `ClassPathXmlApplicationContext`이기 때문에 app.xml을 찾을 때 classpath를 기준으로 찾게 된다. 즉, ClassPathResource를 통해 빈을 찾아내거나 빈 주입을 해주는 것이다.

```java
var ctx = new FileSystemXmlApplicationContext("app.xml");
```

`FileSystemXmlApplicationContext` 타입이면 파일 시스템의 경로를 기준으로 app.xml을 찾는다.(FileSystemResource)

만약 ApplicationContext의 타입이 <b>WebApplicationContext 이하</b> 인 경우에는 ServletContextResource를 쓰게 된다.

한 가지 더 알아야 할 점은 ApplicationContext의 타입에 따라 Resource의 타입이 결정된다. 이게 무슨 말인가 하면, 예를 들어 ApplicationContext의 타입이 <b>ClassPathXmlApplicationContext</b>이면 `getResource()` 메소드에 아무런 문자열을 주지 않아도 classpath 기준으로 읽어오게 된다.

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ResourceLoader resourceLoader;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Resource resource = resourceLoader.getResource("test.txt");
        System.out.println(resource.exists());
        System.out.println(resource.getDescription());
        System.out.println(Files.readString(Path.of(resource.getURI())));
    }

}
```

이 코드에서 ResourceLoader 자체가 이미 ApplicationContext의 상위 인터페이스이기 때문에 가능한 것이다.

물론 ApplicationContext의 타입과 상관없이 Resource의 타입을 강제할 수 도 있다. <b>java.net.URL 접두어(prefix)</b>를 사용하면 된다. 접두어를 사용해서 명시적으로 표기해주었기 때문에 이 방법을 더 추천한다.

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ApplicationContext resourceLoader;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("ServletContextResource");
        System.out.println(resourceLoader.getClass());

        System.out.println("ClassPathResource");
        Resource resource = resourceLoader.getResource("classpath:test.txt");
        System.out.println(resource.getClass());

        System.out.println(resource.exists());
        System.out.println(resource.getDescription());
        System.out.println(Files.readString(Path.of(resource.getURI())));
    }

}
```

<img src="/assets/img/study/resrcabs01.png" width="70%" align="center"><br/>

ApplicationContext 타입일 때는 <b>WebServerApplicationContext, 즉 WebApplicationContext</b>이므로 <b>ServletContextResource</b>인 것을 확인할 수 있다. 이어서 classpath 접두어를 사용해서 강제하니까 <b>ClassPathResource</b>로 변한 것을 확인할 수 있다.

그렇다면 이 상황에서 접두어 classpath를 지우면 어떻게 될까? classpath가 없어졌으니 ServletContextResource가 될 것이고 context path부터 찾게 될 것이다. 하지만 내장형 톰캣에는 context path가 지정되어 있지 않으므로 false가 출력될 것이다. 그리고 File을 읽으려고 시도했을 때 에러가 발생할 것이다.

```java
package me.gracenam.demospring51;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;

@Component
public class AppRunner implements ApplicationRunner {

    @Autowired
    ApplicationContext resourceLoader;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("WebApplication Resource");
        System.out.println(resourceLoader.getClass());

        System.out.println("ServletContext Resource");
        Resource resource = resourceLoader.getResource("test.txt");
        System.out.println(resource.getClass());

        System.out.println(resource.exists());
        System.out.println(resource.getDescription());
        System.out.println(Files.readString(Path.of(resource.getURI())));
    }

}
```

<img src="/assets/img/study/resrcabs02.png" width="70%" align="center"><br/>

---

이 보다 더 깊은 내용들은 [스프링 Reference](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#resources-classpath-wildcards)를 참조하도록 하자.

---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
