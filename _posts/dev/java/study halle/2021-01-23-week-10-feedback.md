---
layout: post
date: 2021-01-23 22:30:00
title: "10주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, thread, runnable, deadlock ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 10주차 과제](https://github.com/whiteship/live-study/issues/10)를 공부하고 공유하기 위해서 작성되었습니다.

# 10주차 회고

&nbsp;&nbsp;&nbsp;이제 스터디도 5주 남았다! 정말 시간이 순식간에 지나갔다. 처음 스터디를 시작할 때는 그래도 자바를 많이 공부했으니 대부분 아는 것들이라고 생각했지만, 공부를 하다보니 모르는 것도 많았고 공부했다고 생각했는데 놓쳤던 것들도 많았다.

라이브 방송에서 새롭게 얻어가는 것과 다른 분들이 공부했던 것을 보면서 보충하는 과정을 반복하면서 더욱 단단해져 가는 느낌을 많이 받았다.

> <https://sujl95.tistory.com/63> 요약 정리가 잘 되어있다. 빠르게 복습할 때 보도록 하자.

P.S) 자바 챔피언이라는 엄청난 것을 알게 되었다. 얼마나 공부를 하고 성장해야 도달할 수 있는 곳일까...?

---

# 추가 질문

# Thread와 Runnable은 언제 상속받고 언제 구현해야할까?

## Runnable 인터페이스를 익명 내부 클래스로 사용하는 방법

&#9654; Thread 상속 예제

```java
public class ThreadCreation extends Thread {

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName());
    }

    public static void main(String[] args) {
        System.out.println(Thread.currentThread().getName());
        ThreadCreation threadcreation = new ThreadCreation();
        threadcreation.start();
    }
}
```

&#9654; Runnable 구현 예제

```java
public class ThreadCreation {
    public static void main(String[] args) {
        System.out.println(Thread.currentThread().getName());
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        }).start();
    }
}
```

## 그래서 언제 쓰는지 어떻게 구분하는데?

`extends Thread`, 즉 Thread를 상속받아 사용할 때 `run()` 외에도 다른 것들을 Override를 해야할 필요가 있다면 Thread를 상속해서 만든다.  
`run()`만 사용해도 되는 경우에는 Runnable을 사용하면 된다. 또는 Thread를 상속받을 클래스가 다른 클래스도 상속받아야 된다면 Runnable을 사용한다.

# 쓰레드는 언제 쓰면 좋을까?

서버의 리소스를 극한으로 활용할 때 사용하면 좋다. 근데 왜 안할까? 우리 대신 컨테이너가 대신 해주기 때문이다.

예를 들어 우리는 스프링 MVC로 코딩을 한다.

```java
package spring;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@ReastController
public class HelloController {

    @GetMapping("/hello")
    publicc String hello() {
        return "Hello Spring";
    }
}
```

위 코드에는 별개의 멀티 쓰레드 코딩을 하지 않았지만, 매 요청이 들어올 때마다 알아서 멀티 쓰레드가 활용되어서 코드가 실행된다.

---

# 추가 학습

# sleep 메소드

sleep에는 보통 Long타입 리터럴을 사용하므로 뒤에 대문자 L을 붙여주는 것이 좋다.

```java
public class ThreadCreation {
    public static void main(String[] args) {
        System.out.println(Thread.currentThread().getName());
        new Thread(new Runnable() {
            @Override
            public void run() {
                Thread.sleep(1000L);
                System.out.println(Thread.currentThread().getName());
            }
        }).start();
    }
}
```

## @SneakyThrows

try-catch로 exception처리를 하면 코드가 지저분해 질 때 사용한다.

```java
public class ThreadCreation {
    public static void main(String[] args) {
        System.out.println(Thread.currentThread().getName());
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(1000L);
                } catch(InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println(Thread.currentThread().getName());
            }
        }).start();
    }
}
```

막상 예외를 발생시켜도 딱히 할 게 없다. 굳이 해야한다면 `throw new RuntimeException(e);`과 같이 다시 감싸서 던지는 정도이다.

이러한 것을 대신 해주는 어노테이션이 바로 `@SneakyThrows`이다.

```java
import lombok.SneakyThrows;

public class ThreadCreation {
    public static void main(String[] args) {
        System.out.println(Thread.currentThread().getName());
        new Thread(new Runnable() {
            @SneakyThrows
            @Override
            public void run() {
                Thread.sleep(1000L);
                System.out.println(Thread.currentThread().getName());
            }
        }).start();
    }
}
```

# 데몬 쓰레드

&nbsp;&nbsp;&nbsp;Main 쓰레드의 작업을 돕는 보조적인 역할을 하는 쓰레드이다. Main 쓰레드가 종료되면 데몬쓰레드는 강제적으로 자동 종료된다.

```java
import lombok.SneakyThrows;

public class ThreadCreation {
    public static void main(String[] args) {
        System.out.println(Thread.currentThread().getName());
        new Thread(new Runnable() {
            @SneakyThrows
            @Override
            public void run() {
                Thread.sleep(10000L);
                System.out.println(Thread.currentThread().getName());
            }
        });
        thread.setDaemon(true);
        thread.start();
    }
}
```

자신이 파생된 Main 쓰레드가 끝나면 같이 끝난다.

# CountDownLatch

CountDownLatch는 어떤 쓰레드가 다른 쓰레드에서 작업이 완료될 때까지 기다릴 수 있도록 해주는 클래스이다.

```java
    CountDownLatch latch = new CountDownLatch(5); // Latch 생성
    latch.countDown();          // latch의 값이 1씩 감소
    latch.await();              // 0이 될 때까지 기다림
```

다른 쓰레드에서 `countDown();`이 5번 호출되면 latch는 0이 되고, `await()`는 기다리지 않고 다음 코드를 실행시킨다.

# 동시성과 병렬성

멀티쓰레드가 실행 될 때 동시성(concurrency)과 병렬성(parallelism), 두 가지 중 하나로 실행된다. 이것은 cpu의 코어의 수와 관련이 있는데, 하나의 코어에서 여러 쓰레드가 실행되는 것을 동시성, 멀티 코어를 사용할 때 각 코어별로 개별 쓰레드가 실행 되는 것을 병렬성이라고 한다.

코어의 수가 쓰레드의 수보다 많다면, 병렬성으로 쓰레드를 실행하면 되는데, 코어의 수보다 쓰레드의 수가 많을 경우 동시성을 고려해야 한다.

동시성을 고려한다는 것은, 하나의 코어에서 여러 쓰레드를 실행할 때 병렬로 실행하는 것처럼 보이지만 사실은 병렬로 처리하는 것이 아니라 번갈아가면서 처리하는 속도가 엄청 빨라서 각자 병렬로 실행되는 것처럼 보이는 것이다.

## Concurrency 프로그래밍 모델

멀티쓰레드는 concurrency programming model 중 하나인데 멀티쓰레드만 있는게 아니라, STM model이라고 Software transactional memoory라고 멀티쓰레드랑 비슷한 개념의 모델도 있다. 이 쪽과는 다른 방식의 Actor model이라는 것도 있다.

+ [Actor model](https://en.wikipedia.org/wiki/Actor_model)
  + Akka
+ [STM](https://en.wikipedia.org/wiki/Software_transactional_memory)
  + Clojure

# 컨텍스트 스위칭

컨텍스트 스위칭은 쉽게 말하면 실행과 대기를 번걸아가면서 하는 것이다. 사실 컴퓨터 자체가 또는 프로그램 자체가 여러 명이 작업하는 것처럼 할 수 없기 때문에 멀티쓰레드 환경은 자칫 하면 오버헤드를 발생시킬 수도 있다. 즉, 컴퓨터도 중간 중간 기억을 해야 된다는 것이다.

예를 들어서

- 스프링 공부를 하고 있다가, 스프링 강의를 보려고 유튜브를 켰다. 추천 영상에 다른게 떠서 잠깐만 볼까하고 켰다.

- 추천 영상을 보다보니 신묘한 알고리즘에 이리저리 보다가 정신을 차려보니 시간이 꽤 지나갔다. 내가 뭘 하려고 유튜브를 켰더라? 아 맞다. 스프링 강의 보려고 했었지! 강의를 마저본다.

- 이제 강의보면서 배운걸 정리해야지...근데 초반에 봤던게 잘 기억이 안나네?

이런 과정들이 전에 하던일을 기억해야 하기 때문에 오버헤드가 발생할 수 있다는 것이고, 올바른 멀티쓰레딩 구조를 가지도록 만드는게 개발자가 해야할 일이다. 그럼에도 멀티 쓰레딩을 지원해야 하는 이유는 보다 부드러운 UX(User Experience) 때문이다.

정리하자면 CPU가 어떤 프로세스를 실행하고 있는 상태에서 interrupt에 의해 다음 우선 순위를 가진 프로세스가 실행되어야 할 때가 있다. 이 때 기존의 프로세스 정보들은 PCB에 저장하고 다음 프로세스의 정보를 가져와 작업하는 것을 컨텍스트 스위칭이라고 한다.

# VisualVM

VisualVM 같은 쓰레드 덤프 분석 툴을 이용해서 데드락 여부를 확인할 수 있다. 해당 쓰레드에서 잡고있는 lock에 대한 정보도 볼 수 있다.

+ heap dump
  + 메모리의 스냅샷이 뜨는 것
+ thread dump
  + 모든 쓰레드의 스냅샷이 뜨는 것

# Executors - CompletableFuture

## 고수준 (High-Level) Concurrency 프로그래밍

- 쓰레드를 만들고 관리하는 작업을 애플리케이션에서 분리
- **그런 기능을 Executors 에게 위임**

## Executors가 하는 일

- **쓰레드 만들기** : 애플리케이션이 사용할 쓰레드를 만들어 관리한다.
- **쓰레드 관리** : 쓰레드 생명 주기를 관리한다.
- **작업 처리 및 실행** : 쓰레드로 실행할 작업을 제공할 수 있는 API 를 제공한다.

## 주요 인터페이스

- **Executor** : execute(Runnable)
- **ExecutorService** : Executor 상속 받은 인터페이스로
    - Callable도 실행할 수 있으며
    - executor를 종료 시키거나
    - 여러 Callable을 동시에 실행하는 등의 기능을 제공한다.
- **ScheduledExecutorService** : ExecutorService를 상속받은 인터페이스로
    - 특정 시간 이후에 또는 주기적으로 작업을 실행할 수 있다.

**우리는 Runnable 만 제공하고**

그 이후 쓰레드와 관련한 기능은 Executor가 처리한다.는 개념이라고 볼 수 있다.

### 예제코드로 알아보자

**ExecutorService 사용**

- .execute() 혹은 submit() 으로 Runnable을 실행할 수 있다.
- 하단 코드에서 submit() (=execute()) 로 Runnable을 실행하면 쓰레드는

```java
package me.ssonsh.java8to11.completableFuture;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class App {
    public static void main(String[] args) {
        // Thread를 하나만 쓰는 Thread : newSingleThreadExecutor();
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        // executorService.execute(() -> System.out.println("Thread " + Thread.currentThread().getName()));
        executorService.submit(() -> System.out.println("Thread " + Thread.currentThread().getName()));
    }
}
```

실행이 되고 종료되는 것이 아님을 볼 수 있다. (원하는 print를 찍고 나서도 실행중임)

- executorService는 **다음 작업이 들어올 때 까지 계속 대기하고 있다.**

<img src="/assets/img/study/Untitled.png" width="70%" align="center"><br/>

→ 다음 작업을 기다리는 것이 아니라 종료 시키길 원한다면 .shutdown()을 통해 종료한다.

**.shutdown() : 그래이스풀 셧다운으로 돌고있는 Thread가 모두 처리되고 아름답게 종료..**

.shutdownNow() : 아무런 조건 상관없이 그 즉시 삭제

```java
executorService.shutdown();
```

**두개의 ThreadPool을 이용하여 작업을 요청해보자**

- 두개의 ThreadPool : newFixedThreadPool(2);

```java
package me.ssonsh.java8to11.completableFuture;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class App {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        executorService.submit(getRunnable("Hello"));
        executorService.submit(getRunnable("Sson"));
        executorService.submit(getRunnable("The"));
        executorService.submit(getRunnable("Java"));
        executorService.submit(getRunnable("Thread"));
        executorService.shutdown();
    }

    private static Runnable getRunnable(String message) {
        return () -> System.out.println(message + "|" + Thread.currentThread().getName());
    }
}
```

위 예제에서는 2개의 Thread Pool을 사용하고 , 5개의 작업을 submit() 하였다.

**결과**

→ 2개의 Thread를 이용하여 5개 일을 수행하였다.

```java
/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/bin/java -javaagent:/Applications/IntelliJ IDEA.app/Contents/lib/idea_rt.jar=60459:/Applications/IntelliJ IDEA.app/Contents/bin -Dfile.encoding=UTF-8 -classpath /Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/charsets.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/ext/cldrdata.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/ext/dnsns.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/ext/jaccess.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/ext/jfxrt.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/ext/localedata.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/ext/nashorn.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/ext/sunec.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/ext/sunjce_provider.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/ext/sunpkcs11.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/ext/zipfs.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/jce.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/jfr.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/jfxswt.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/jsse.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/management-agent.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/resources.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/jre/lib/rt.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/lib/ant-javafx.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/lib/dt.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/lib/javafx-mx.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/lib/jconsole.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/lib/packager.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/lib/sa-jdi.jar:/Users/sson/Library/Java/JavaVirtualMachines/corretto-1.8.0_275/Contents/Home/lib/tools.jar:/Users/sson/Dev/workspace/java8to11/target/classes:/Users/sson/.m2/repository/org/springframework/boot/spring-boot-starter/2.4.1/spring-boot-starter-2.4.1.jar:/Users/sson/.m2/repository/org/springframework/boot/spring-boot/2.4.1/spring-boot-2.4.1.jar:/Users/sson/.m2/repository/org/springframework/spring-context/5.3.2/spring-context-5.3.2.jar:/Users/sson/.m2/repository/org/springframework/spring-aop/5.3.2/spring-aop-5.3.2.jar:/Users/sson/.m2/repository/org/springframework/spring-beans/5.3.2/spring-beans-5.3.2.jar:/Users/sson/.m2/repository/org/springframework/spring-expression/5.3.2/spring-expression-5.3.2.jar:/Users/sson/.m2/repository/org/springframework/boot/spring-boot-autoconfigure/2.4.1/spring-boot-autoconfigure-2.4.1.jar:/Users/sson/.m2/repository/org/springframework/boot/spring-boot-starter-logging/2.4.1/spring-boot-starter-logging-2.4.1.jar:/Users/sson/.m2/repository/ch/qos/logback/logback-classic/1.2.3/logback-classic-1.2.3.jar:/Users/sson/.m2/repository/ch/qos/logback/logback-core/1.2.3/logback-core-1.2.3.jar:/Users/sson/.m2/repository/org/apache/logging/log4j/log4j-to-slf4j/2.13.3/log4j-to-slf4j-2.13.3.jar:/Users/sson/.m2/repository/org/apache/logging/log4j/log4j-api/2.13.3/log4j-api-2.13.3.jar:/Users/sson/.m2/repository/org/slf4j/jul-to-slf4j/1.7.30/jul-to-slf4j-1.7.30.jar:/Users/sson/.m2/repository/jakarta/annotation/jakarta.annotation-api/1.3.5/jakarta.annotation-api-1.3.5.jar:/Users/sson/.m2/repository/org/springframework/spring-core/5.3.2/spring-core-5.3.2.jar:/Users/sson/.m2/repository/org/springframework/spring-jcl/5.3.2/spring-jcl-5.3.2.jar:/Users/sson/.m2/repository/org/yaml/snakeyaml/1.27/snakeyaml-1.27.jar:/Users/sson/.m2/repository/org/slf4j/slf4j-api/1.7.30/slf4j-api-1.7.30.jar me.ssonsh.java8to11.completableFuture.App
Hello|pool-1-thread-1
Sson|pool-1-thread-2
The|pool-1-thread-2
Java|pool-1-thread-2
Thread|pool-1-thread-2

Process finished with exit code 0
```

**ScheduledExecutorService 사용**

- SchedulredExecutorService 는 ExecutorService를 확장한 것이다.
- Delay
- Period

```java
package me.ssonsh.java8to11.completableFuture;

import ch.qos.logback.core.util.TimeUtil;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class App {
    public static void main(String[] args) {
        ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();

        // 1초 Delay를 가지고 2초 간격으로 getRunnable을 수행하라
        executorService.scheduleAtFixedRate(getRunnable("Hello"), 1, 2, TimeUnit.SECONDS);

    }

    private static Runnable getRunnable(String message) {
        return () -> System.out.println(message + "|" + Thread.currentThread().getName());
    }
}
```

→ 만약 executorService.shutdown(); 이 존재하였다면, 아무 동작도 하지 않을 것이다.

→ Scheduled를 통해 수행되어야 하지만 shutdown()을 통해 interrupt 되면서 작업이 중단된다.

---

# 무어의 법칙

무어의 법칙(영어: Moore's law)은 반도체 집적회로의 성능이 24개월마다 2배로 증가한다는 법칙이다. 경험적인 관찰에 바탕을 두고 있다. 인텔의 공동 설립자인 고든 무어가 1965년에 내 놓은 것이다.

>
“ The complexity for minimum component costs has increased at a rate of roughly a factor of two per year ... Certainly over the short term this rate can be expected to continue, if not to increase. Over the longer term, the rate of increase is a bit more uncertain, although there is no reason to believe it will not remain nearly constant for at least 10 years. That means by 1975, the number of components per integrated circuit for minimum cost will be 65,000. I believe that such a large circuit can be built on a single wafer.  
부품 제조 비용이 최소가 되는 복잡함은 해마다 대략 2배의 비율로 증가해 왔다. 단기적으로는 이 증가율이 올라가지 않아도, 현상을 유지하는 것은 확실하다. 적어도 앞으로 10년 동안 거의 일정한 비율을 유지할 수 없다고 믿을 이유는 없으나 보다 장기적으로는 증가율은 조금 불확실하다. 이 말은 1975년까지는 최소 비용으로 얻을 수 있는 집적회로의 부품 수는 65,000개에 이를 것이다. 나는 그 만큼의 대규모 회로를 1 개의 회로판 위에 구축할 수 있을 거라고 믿는다.  
”  
— 1965년 4월 19일, 일렉트로닉스 (잡지)에 실린 논문 "Cramming more components onto integrated circuits"

고든 무어의 의견은 무어 자신이 "법칙"이라고 이름을 붙인 것이 아니라 캘리포니아 공과대학의 교수와, 대규모LSI의 파이오니아 실업가의 카버 미드에 따른 것이다.

무어는 오늘의 기계식 마우스의 공동 발명자인 더글라스로부터, 1960년의 강의에 대해 집적회로의 크기 축소의 전망에 대해 논의한 것을 들었을지도 모른다. 1975년에는 무어는 앞으로 2년마다 2배의 속도밖에 되지 않을 것이라고 말할 계획을 세웠다. 그는 자신이 "18개월 마다"라고 한 적은 한 번도 없는데, 그렇게 인용되었던 것이라고 굳게 주장하고 있다. 2005년 무어의 발표 후 현재는 사실상 무어의 법칙이 의미가 없다.

## 무어의 법칙의 3가지 조건

무어의 법칙의 세 가지 조건은 다음과 같다.

1. 반도체 메모리칩의 성능 즉, 메모리의 용량이나 CPU의 속도가 18개월에서 24개월마다 2배씩 향상된다는 '기술 개발 속도에 관한 법칙'이다.
2. 컴퓨팅 성능은 18개월마다 2배씩 향상된다.
3. 컴퓨터 가격은 18개월마다 반으로 떨어진다.

> [The Free lunch is Over](http://www.gotw.ca/publications/concurrency-ddj.htm)도 읽어보자.

# critical path

> https://en.wikipedia.org/wiki/Critical_path_method

알아두면 좋은 단어! 쉽게 생각해서 가장 오래 걸리는 경로(path)를 말한다고 생각하면 된다.

critical path를 줄이면 전체 시간이 줄어든다.

---
**Reference**
+ <https://sujl95.tistory.com/63>
+ <https://blog.naver.com/hsm622/222212364489>
+ <https://catch-me-java.tistory.com/47>
+ <https://parkadd.tistory.com/48>
+ <https://leemoono.tistory.com/26>
+ <https://www.notion.so/ac23f351403741959ec248b00ea6870e>
+ <https://www.notion.so/10-4589fc8a98ce4762ae78be5c2fe6cd1e>
+ <https://ko.wikipedia.org/wiki/%EB%AC%B4%EC%96%B4%EC%9D%98_%EB%B2%95%EC%B9%99>
