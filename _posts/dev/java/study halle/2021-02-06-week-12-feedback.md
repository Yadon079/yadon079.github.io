---
layout: post
date: 2021-02-06 22:30:00
title: "12주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, annotation ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 12주차 과제](https://github.com/whiteship/live-study/issues/12)를 공부하고 공유하기 위해서 작성되었습니다.

# 12주차 회고

&nbsp;&nbsp;&nbsp;이번 주는 어려웠다. 4주차, 5주차 쯤에 공부는 했는데 과제를 하지 못했던 딱 그 느낌이 들었었다. 분명히 책을 보고 찾으면서 공부를 했음에도 불구하고 이해가 잘 되지 않았었다. 제출을 하고 나서도 다시 공부를 했는데도 머리에 들어는 오는데 남지는 않는 느낌?이 강했던거 같다.

그 동안 공부해왔었던 스터디 내용들을 다시 한번 살펴봤다. 이해하고 넘어갔다고 생각했던 것인데 다시보니 새롭게 느껴지는 것들도 많았다. 당시에는 내 것이 되었다고 생각하고 넘어갔는데 아니였나보다.

---

# 질문

#

# functional interface 지시자가 무엇인가요?

# 애노테이션은 왜 생겼을까?

# 커스텀 애노테이션에서 @Target으로 위치를 결정하지 않으면 어떻게 될까?

# @inherited의 용도가 무엇인가?

---

# 학습

# 애노테이션

&nbsp;&nbsp;&nbsp;애노테이션은 주석이다. 무언가 동작을 하거나 작동하는 코드가 아니라 단지 표시를 해놓는 것이다.

단순히 이 코드가 어떠한 동작을 한다고 알려주는 주석이기 때문에 다이나믹하게 움직이는 값, 즉 런타임 중에 알아내야 하는 값은 들어갈 수 없다. 컴파일러 수준에서 해석이 되거나 완전히 정적이여야 한다.

```java
package me.gracenam.study.week12;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    private static final String hello = "hello";

    @GetMapping(hello)
    public String hello() {
        return "hello";
    }
}
```

위 코드에서 hello는 완전히 정적이다. 만약 여기서 final이 제거된다면 hello는 값이 바뀔 수 있게 되고 동적이기 때문에 hello는 더 이상 @GetMapping에 사용될 수 없다.

# Java Reflection

getAnnotations() : 상속받은 (@Inherit) 애노테이션까지 조회
getDeclareAnnotations() : 자기 자신에만 붙어있는 애노테이션 조회

# 애노테이션 프로세서


---

# 롬복의 @getter, @setter를 직접 만들어보자

---
**Reference**
+ <https://b-programmer.tistory.com/264>
+ <https://gowoonsori.site/java/annotation/>
+ <https://blog.naver.com/hsm622/222226824623>
+ <https://www.notion.so/386f4cd47d37448fa0252d3ed22b45b7>
+ <https://parkadd.tistory.com/54>
+ <https://www.notion.so/37d183f38389426d9700453f00253532>
+ <https://dblog94.tistory.com/entry/Java-Study-12%EC%9D%BC%EC%B0%A8-Annotation>
+ <https://chohongjae.github.io/livestudy/live-study-week12/>
+ <https://velog.io/@ljs0429777/12주차-과제-애노테이션>
+ <https://velog.io/@kwj1270/%EC%96%B4%EB%85%B8%ED%85%8C%EC%9D%B4%EC%85%98>
+ <https://catch-me-java.tistory.com/49>
