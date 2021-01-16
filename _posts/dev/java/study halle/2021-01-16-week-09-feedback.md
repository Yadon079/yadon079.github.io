---
layout: post
date: 2021-01-16 22:30:00
title: "9주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, exception, error ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 9주차 과제](https://github.com/whiteship/live-study/issues/9)를 공부하고 공유하기 위해서 작성되었습니다.

# 9주차 회고

# 추가 질문

# 왜 예외를 두 타입으로 나눴을까?

[오라클 공식 문서](https://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html)에서는 다음과 같이 설명하고 있다.

```
Because the Java programming language does not require methods to catch or to specify unchecked exceptions (RuntimeException, Error, and their subclasses), programmers may be tempted to write code that throws only unchecked exceptions or to make all their exception subclasses inherit from RuntimeException. Both of these shortcuts allow programmers to write code without bothering with compiler errors and without bothering to specify or to catch any exceptions. Although this may seem convenient to the programmer, it sidesteps the intent of the catch or specify requirement and can cause problems for others using your classes.

Why did the designers decide to force a method to specify all uncaught checked exceptions that can be thrown within its scope? Any Exception that can be thrown by a method is part of the method's public programming interface. Those who call a method must know about the exceptions that a method can throw so that they can decide what to do about them. These exceptions are as much a part of that method's programming interface as its parameters and return value.

The next question might be: "If it's so good to document a method's API, including the exceptions it can throw, why not specify runtime exceptions too?" Runtime exceptions represent problems that are the result of a programming problem, and as such, the API client code cannot reasonably be expected to recover from them or to handle them in any way. Such problems include arithmetic exceptions, such as dividing by zero; pointer exceptions, such as trying to access an object through a null reference; and indexing exceptions, such as attempting to access an array element through an index that is too large or too small.

Runtime exceptions can occur anywhere in a program, and in a typical one they can be very numerous. Having to add runtime exceptions in every method declaration would reduce a program's clarity. Thus, the compiler does not require that you catch or specify runtime exceptions (although you can).

One case where it is common practice to throw a RuntimeException is when the user calls a method incorrectly. For example, a method can check if one of its arguments is incorrectly null. If an argument is null, the method might throw a NullPointerException, which is an unchecked exception.

Generally speaking, do not throw a RuntimeException or create a subclass of RuntimeException simply because you don't want to be bothered with specifying the exceptions your methods can throw.
Here's the bottom line guideline: If a client can reasonably be expected to recover from an exception, make it a checked exception. If a client cannot do anything to recover from the exception, make it an unchecked exception.
```

# 예외 발생 시 롤백하지 않음? 이게 무슨 말인가!

# 추가 학습

# try-with-resource

try-with-resource를 사용한 후에 finally를 추가해도 동작한다.

왜 될까?

사실 finally가 아니라 catch(Throwable e)블럭이 추가되기 때문이다!

# 커스텀 예외를 만들 때 참고해야할 4가지



# 예외처리의 비용



---
**Reference**
+ <https://wisdom-and-record.tistory.com/46>
+ <https://catch-me-java.tistory.com/46>
+ <https://www.notion.so/3565a9689f714638af34125cbb8abbe8>
+ <https://leegicheol.github.io/whiteship-live-study/whiteship-live-study-09-exception-handling/>
