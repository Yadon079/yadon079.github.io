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

이 외에도 ServletContext를 기준으로 상대 경로를 읽어오는 기능이 없고, URL prefix를 이용해 새로운 핸들러를 등록하여 URL 접미사를 만들어 사용할 수 있지만 구현이 복잡하고 편의성이 없었다.

정리하자면 기존 java.net.URL 클래스는

+ classpath 기준으로 리소스를 읽어오는 기능이 없음.
+ ServletContext를 기준으로 상대 경로로 읽어오는 기능이 없음.
+ 새로운 핸들러를 등록하여 URL 접미사를 만들어 사용할 수 있지만 구현이 복잡하고 편의성이 없음.

이 세 가지의 이유에서 Spring은 리소스를 추상화를 하여 리소스를 다루는 하나의 인터페이스를 제공하는 것이다.



## interface Resource

> https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/io/Resource.html

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

---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)
