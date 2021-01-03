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

<img>

<b>BootStrap Class Loader</b>  
기본 클래스로더 중 최상위 클래스로더로, `jre/lib/rt.jar`에 담긴 JDK 클래스 파일을 로딩해준다. String 클래스나, Object 클래스를 사용할 수 있었던 이유가 바로 BootStrap Class Loader가 자동으로 메모리에 적재해주기 때문이다.

<b>Extension Class Loader</b>  
익스텐션 클래스로더는 `jre/lib/ext` 폴더나 `java.ext.dirs` 환경 변수로 지정된 폴더에 있는 클래스 파일을 로딩한다.

<b>System Class Loader</b>
System Class Loader가 우리가 만든 class를 메모리에 올리는 역할을 하는데, 이 때 classpath를 기준으로 클래스를 로드해준다.

---
**Reference**
+ <https://sangwoobae.github.io/posts/java-livestudy-7week/>
+ <https://www.notion.so/ed8e346f88f54849a06ff968b1877ca5>
+ <https://velog.io/@jaden_94/7%EC%A3%BC%EC%B0%A8-%ED%95%AD%ED%95%B4%EC%9D%BC%EC%A7%80>
