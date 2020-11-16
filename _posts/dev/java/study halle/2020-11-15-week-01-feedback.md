---
layout: post
date: 2020-11-15 19:58:30
title: "1주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, jvm, jdk, jre ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 1주차 과제](https://github.com/whiteship/live-study/issues/1)를 공부하고 공유하기 위해서 작성되었습니다.

## 놓친 부분

### Q. 자바 상위 버전으로 컴파일을 할 경우 하위 버전으로 실행이 가능한가?

<b>A. 아니오. 대부분의 경우 `java.lang.UnsupportedClassVersionError`가 발생합니다.</b>

Java 파일이 실행하려는 버전(런타임 버전)과 컴파일러 버전이 다른 경우 위와 같은 에러가 발생한다.

보통 높은 컴파일러 버전에서 낮은 런타임 버전으로 실행하는 경우에 발생하는데, 반대의 경우는 가능하다.  
낮은 컴파일러 버전으로 컴파일하고 높은 런타임 버전으로 실행이 되는 것을 backward compatible(하위 호완성)이라
고 한다.

하위 호완성이 되지 않는 경우도 있는데 이를 Deprecated 되었다고 하고, 각 버전 Release Note에 리스트가 나와있다.

이러한 문제를 해결하기 위해서는 동일한 버전으로 컴파일하고 실행을 하거나, 호환성 옵션을 주기 위해 컴파일 시 다음과 같이 작성하면 된다.

```
  $ javac -source <version> -target <version> <java filename>
```

## 추가 과제

### javac 옵션

실제로 사용될 법한 옵션들만 확인했다. 더 자세한 javac의 standard options은 [공식 문서](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/javac.html)에서 볼 수 있다.

```
  $ javac <options> <source files>
```

<b> -cp *path* or -classpath *path* </b>  
컴파일러가 참조할 클래스 파일들을 찾기 위해서 컴파일 시 파일경로를 지정해주는 옵션이다.  
해당 옵션을 쓰지 않는 경우(classpath가 지정되지 않는 경우) 사용자 클래스 경로는 현재 디렉터리가 된다.

<b> -d *directory*</b>  
클래스 파일의 대상 디렉터리를 설정한다. javac가 별도의 디렉터리를 만들지 않기 때문에 디렉터리는 미리 만들어둬야 한다.

<b> -deprecation </b>  
사용되지 않는 멤버 또는 클래스의 사용 또는 오버라이드에 대한 설명을 표시한다.  
해당 옵션이 없는 javac는 사용되지 않는 멤버나 클래스를 사용하거나 재정의하는 소스 파일의 요약을 보여준다.

<b> -g </b>  
로컬 변수를 포함한 모든 디버깅 정보를 생성한다.  
`-g:none` : 디버깅 정보를 생성하지 않는다.    
`-g:{source, lines, vars}` : 소스파일 정보, 라인 정보, 지역변수의 디버깅 정보를 생성한다.

<b> -source *release* </b>  
소스 코드의 버전을 지정한다.

<b> -target *version* </b>  
가상 시스템의 지정된 릴리스를 대상으로 하는 클래스 파일을 생성한다. 클래스 파일은 지정된 대상 및 이후 릴리스에서 실행되지만 이전 릴리스의 JVM에서는 실행되지 않는다.

---
**Reference**
+ <https://docs.oracle.com/javase/8/docs/technotes/tools/windows/javac.html>
+ <https://stackoverflow.com/questions/10382929/>
