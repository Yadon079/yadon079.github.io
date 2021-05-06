---
layout: post
date: 2021-05-06 22:27:00
title: "스프링 부트 원리 : 독립적으로 실행 가능한 JAR"
description: "스프링 부트 개념과 활용"
subject: Spring Boot
category: [ spring boot ]
tags: [ spring, boot, JAR ]
use_math: true
comments: true
---

# 스프링 부트 원리

## 독립적으로 실행 가능한 JAR

https://docs.spring.io/spring-boot/docs/current/reference/html/executable-jar.html

만든 Application을 어딘가에 배포하거나 도커이미지로 만든다면 Jar package로 패키징한 후 Jar 파일을 실행하는 방법이 유용하다.

이 부분도 Spring Boot의 중요한 특징중 하나이다.

다음 명령어를 실행하면 target 패키지 안의 내용을 삭제 (clean)후 패키징을 한다.

```
mvn clean package
```

다음 명령어로 jar 파일을 실행하면 Application이 실행된다.

```
java -jar {jar file}
```

jar 파일을 다음 명령어로 unzip 하면 아래와 같은 파일들을 볼 수 있다.

<img src="/assets/img/study/jar01.png" width="70%" align="center"><br/>

BOOT-INF/lib 안에 Application에 필요한 라이브러리들이 존재한다.

<img src="/assets/img/study/jar02.png" width="70%" align="center"><br/>

Java에는 Jar안에 들어있는 Jar 파일(라이브러리들)을 읽을 수 있는 표준 방법이 없다. 예전에는 Jar안에 들어있는 모든 Class를 합쳐 하나의 Jar로 만들어 사용했다. (우버 Jar)

이러한 경우에 어떤 라이브러리를 사용하는지 알 수 없고, 서로 다른 Jar에서 파일 이름이 같은데 내용이 다른 경우에도 문제가 있었다.

Spring Boot 에서는 Jar 파일을 BOOT-INF/lib에 모두 모아 놓고 org/springframework/boot/loader에 Jar를 읽을 수 있는 파일(loader)들을 만들어 두었다. Jar파일을 읽어들이는 로더는 JarFile.class이다.  
Jar 파일을 실행하는 (main method를 실행) 것은 JarLauncher.class로 Jar 파일을 실행하는 class 이다.

MENIFEST.MF에는 다음과 같은 정보가 있다. 원래 Main-Class에는 main method를 가진 것을 설정하는데 JarLauncher를 설정하고 Start-Class에 개발자가 만든 main method가 있는 것을 설정하여 실행되도록 되어있다.

```
Manifest-Version: 1.0
Created-By: Maven Jar Plugin 3.2.0
Build-Jdk-Spec: 15
Implementation-Title: springinit
Implementation-Version: 0.0.1-SNAPSHOT
Main-Class: org.springframework.boot.loader.JarLauncher
Start-Class: me.jongchan.Application
Spring-Boot-Version: 2.4.1
Spring-Boot-Classes: BOOT-INF/classes/
Spring-Boot-Lib: BOOT-INF/lib/
Spring-Boot-Classpath-Index: BOOT-INF/classpath.idx
Spring-Boot-Layers-Index: BOOT-INF/layers.idx
```

Spring Boot의 중요한 특징 중 하나가 독립적으로 Application을 실행시킬 수 있는 것이다.

pom.xml에 설정된 Maven Plugin이 Packaging을 해주고 이 안에 들어있는 MANIFEST 정보를 활용하여 이러한 모든 일들이 벌어지게 된다. 모든 Jar의 시작점은 MANIFEST 이다.

---
**Reference**
+ [스프링 부트 개념과 활용](https://inf.run/Xny5)
+ [공식 문서](https://docs.spring.io/spring-boot/docs/2.0.3.RELEASE/reference/htmlsingle/)
