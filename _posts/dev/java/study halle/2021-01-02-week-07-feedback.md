---
layout: post
date: 2021-01-02 22:30:00
title: "7주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, package, classpath ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 7주차 과제](https://github.com/whiteship/live-study/issues/7)를 공부하고 공유하기 위해서 작성되었습니다.

# 7주차 회고

&nbsp;&nbsp;&nbsp;스터디가 18주차에서 15주차로 줄어들었다. 오버된 3개의 주차는 시즌 2로 넘어가서 진행하신다고 한다. 변경된 일정에 따르면 3월 첫째주에 시즌 1이 종료되는데, 스터디는 계속 따라갈 것이다.

&nbsp;&nbsp;&nbsp;기선님의 강좌 이야기를 하다가 그런 말이 나왔다. 정말 숏컷을 원하는 사람들이 있다고. 공부를 하는데 숏컷을 원한다니...  

숏컷이 없다는 것을 알면서도 받아들이지 못하고 찾아 헤매는 사람들이 있다. 그런 사람들은 어느정도 가면 포기하거나, 결국 받아들이고 처음으로 돌아갔다.

생각해보면 나도 공부하는데 있어서 숏컷이 없다는 것을 알게 된지 얼마 되지 않았다. 여기저기 헤딩하고 좌절도 많이 하고 이런저런 글들을 읽다가 자연스럽게 받아들였는데, 그 사실을 받아 들이느냐 못받아들이느냐의 차이가 정말 큰 거 같다.

# 추가 질문

# Q. -classpath 옵션은 javac에서 쓸 수 있는가? java에서 쓸 수 있는가?

<b>A. 둘 다 쓸 수 있다.</b>  
cmd에서 자바 컴파일 또는 실행 시 명령어를 통해 임시로 지정할 수 있다.

```
    명령어 -classpath 클래스패스 경로
    명령어 -cp 클래스패스 경로

    javac -classpath D:\java\jdk1.8 Test.java
```

# 추가 학습

# FQCN

&nbsp;&nbsp;&nbsp;Fully Qualified Class Name으로 패키지 이름과 정의된 클래스 이름까지 모두 합친 것이다.

예를 들어 String 클래스의 패키지는 `java.lang`이고 FQCN으로는 `java.lang.String`인 것이다.

```java
    String a = "Class Name";
    java.lang.String b = "Full Package Class Name";
```

# 빌트-인 패키지(Built-in Package)

&nbsp;&nbsp;&nbsp;자바는 개발자들이 사용할 수 있도록 여러 많은 패키지와 클래스를 제공한다. 가장 자주 쓰이는 패키지로는 `java.lang`과 `java.util`이 있다.

`java.lang`은 자주 사용하는 패키지이지만 import해서 사용하지 않는다. 왜 그럴까?  
이유는 간단하다. 자바에서 `java.lang` 패키지는 기본적인 것이기 때문에 알아서 불러온다. 즉, 미리 들어있는(Built-in) 패키지인 것이다.

# 클래스패스

클래스패스를 통해 클래스로더에게 어떤 클래스파일들을 메모리에 적재시킬지 알려준다.

<b>BootStrap Class Loader</b>  
기본 클래스로더 중 최상위 클래스로더로, `jre/lib/rt.jar`에 담긴 JDK 클래스 파일을 로딩해준다. String 클래스나, Object 클래스를 사용할 수 있었던 이유가 바로 BootStrap Class Loader가 자동으로 메모리에 적재해주기 때문이다.

<b>Extension Class Loader</b>  
익스텐션 클래스로더는 `jre/lib/ext` 폴더나 `java.ext.dirs` 환경 변수로 지정된 폴더에 있는 클래스 파일을 로딩한다.

<b>System Class Loader</b>
System Class Loader가 우리가 만든 class를 메모리에 올리는 역할을 하는데, 이 때 classpath를 기준으로 클래스를 로드해준다.

## classes.zip 파일

&nbsp;&nbsp;&nbsp;classes.zip 파일은 1.1 기반 Java Runtime의 표준 클래스가 모두 포함된 아카이브 파일이다. 예를 들어, `java.awt`, `java.io`, `java.net`등의 패키지에 있는 클래스가 모두 여기에 포함되어 있다.  

JDK 1.1 이전에는 classes.zip 파일을 classpath에 포함시켜야 했다.  
그러나 1.1 버전부터는 classes.zip 파일을 classpath에 포함시키면 안된다. Java가 자동으로 classes.zip 파일을 찾을 수 있도록 바뀌었기 때문이다. 만일 지정하게 된다면 지정하지 않았을 때보다 더 많은 문제가 발생할 수 있다.

&nbsp;&nbsp;&nbsp;일반적으로 다음과 같은 문제가 발생할 수 있다.  
JDK 1.1.4를 설치할 때 포함된 classes.zip 파일을 classpath에 추가한다고 가정하자. 보통 classes.zip 파일을 `.cshrc`와 같은 쉘 시작 파일 중 하나에 추가하고 나면 classes.zip 파일의 경로를 지정한 것을 기억하지 못한다. 그 상태에서 새 jdk를 사용하면 경로에서는 이전의 classes.zip 파일을 먼저 찾게 되기 때문에 이전의 클래스가 사용된다. 따라서 java 프로그램은 실행되지 않고 문제와 관련이 없는 오류 메시지가 나오게 된다.

## rt.jar 파일

&nbsp;&nbsp;&nbsp;JRE와 JDK 사이에는 차이가 있다. JRE는 JDK 중에서 java 프로그램을 실행하는 프로그램만 포함된 환경이다. 따라서 JRE는 classes.zip 파일에서 클래스를 찾지 않고 대신 `rt.jar` 파일을 사용한다.

&nbsp;&nbsp;&nbsp;`rt.jar` 파일에는 classes.zip와 동일한 클래스가 모두 포함되어 있고, 아카이브 형식과 이름만 다른 것을 사용한다. Java 1.2가 발표되면서 classes.zip 파일은 없어지고 대신 JDK와 JRE가 모두 `rt.jar` 파일을 사용한다. `rt.jar` 파일은 classes.zip 파일과 동일한 규칙이 적용된다. 즉, 지정해줄 필요가 없다.

# import 키워드

&nbsp;&nbsp;&nbsp;자, 여기 이름이 같지만 패키지가 다른 두 클래스가 있다.

```java
    study.java.mainPackage.subPackage.SameClass;

    study.java.mainPackage.otherPackage.SameClass;
```

이렇게 이름이 같지만 패키지가 다른 클래스의 경우, import로 위치를 알려주지 않고 사용하려고 할 경우 에러가 발생한다.

```java
    public class App {
        private String name;

        public App(String name) {
            this.name = name;
        }

        public void printName() {
           System.out.println("App의 이름은 " + name + "입니다.");
        }

        public sameClass() {
            SameClass sameClass = new SameClass("서브패키지의 클래스");
            sameClass.printName();
        }
    }
```

App에서 어떤 SameClass를 사용하는지도 알 수 없고 경로도 파악할 수 없기 때문이다.

그렇기 때문에 우리는 import를 사용해서 어디에 있는 클래스인지를 알려주는 것이다.

```java
    import study.java.mainPackage.subPackage.SameClass;
```

## import를 사용하지 않는 방법

그럴 경우는 거의 없지만 같은 이름의 클래스를 모두 사용해야 할 경우 방법은 어떨까?

Main 클래스에 두 클래스 모두 import 시켜보자.

```java
    import study.java.mainPackage.subPackage.SameClass;
    import study.java.mainPackage.otherPackage.SameClass;
```

이럴 경우 해당 클래스 SameClass는 이미 import되었다는 컴파일 에러가 발생한다.

방법이 아예 없는 것은 아니다.

위에서 봤던 FQCN을 활용하면 가능하다. 하지만 이렇게 할 경우 코드에 패키지 경로가 포함되어서 지저분해지고 읽기 어려워진다.

```java
    public sameClass() {
        SameClass sameClass = new SameClass("서브패키지의 클래스");
        sameClass.printName();

        study.java.mainPackage.otherPackage.SameClass other
          = new study.java.mainPackage.otherPackage.SameClass("아더패키지의 클래스");

        other.otherPrintName();
    }
```

---
**Reference**
+ <https://sangwoobae.github.io/posts/java-livestudy-7week/>
+ <https://www.notion.so/ed8e346f88f54849a06ff968b1877ca5>
+ <https://velog.io/@jaden_94/7%EC%A3%BC%EC%B0%A8-%ED%95%AD%ED%95%B4%EC%9D%BC%EC%A7%80>
+ <https://parkadd.tistory.com/45>
