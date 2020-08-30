---
layout: post
date: 2020-08-30 13:55:30
title: "래퍼 클래스(Wrapper Class)란 무엇인가"
description: "자바 래퍼 클래스 (박싱, 언박싱)"
subject: java
category: [ java ]
tags: [ java, wrapper, class]
comments: true
---

# 래퍼 클래스(Wrapper Class)란?

자바의 자료형은 크게 기본 타입(primitive type)과 참조 타입(Reference type)으로 나누어진다. 대표적인 기본 타입으로 char, int, float, double, boolean 등이 있고 참조 타입으로 class, interface 등이 있는데 간혹 기본 타입의 데이터를 객체로 표현해야 하는 경우가 있다. 이럴 때 <span style="color:red">기본 자료타입(primitive type)을 객체로 다루기 위해서 사용하는 클래스들을 <b>래퍼 클래스(Wrapper class)</b></span>라고 한다. 자바에서 모든 기본타입은 값을 갖는 객체를 생성할 수 있는데, 이런 객체를 포장 객체라고 한다. 이 객체는 기본 타입의 값을 내부에 두고 포장을 하기 때문에 그렇게 불리는데, 래퍼 클래스로 감싸고 있는 기본 타입 값은 외부에서 변경할 수 없다. 만약 값을 변경하고 싶다면 새로운 포장 객체를 만들어야 한다.

## 래퍼 클래스의 종류

| 기본형 | 래퍼클래스 | 생성자 | 활용 예시 |
|:---:|:---:|:---|:---|
| boolean | Boolean | <p>Boolean (boolean value)</p> <p>Boolean (String s)</p> | <p>Boolean b = new Boolean(true);</p> <p>Boolean b2 = new Boolean("true");</p> |
| char | <b>Character</b> | Character (char value) | |
| byte | Byte | <p>Byte (byte value)</p> <p>Byte (String s)</p> | Character c = new Character('a'); |
| short | Short | <p>Short (short value)</p> <p>Short (String s)</p> | <p>Byte b = new Byte(10);</p> <p>Byte b2 = new Byte("10");</p> |
| int | <b>Integer</b> | <p>Integer (int value)</p> <p>Integer (String s)</p> | <p>Integer i = new Integer(100);</p> <p>Integer i2 = new Integer("100");</p> |
| long | Long | <p>Long (long value)</p> <p>Long (String s)</p> | <p>Long l = new Long(100);</p> <p>Long l2 = new Long("100");</p> |
| float | Float | <p>Float (double value)</p> <p>Float (float value)</p> <p>Float (String s)</p> | <p>Float f = new Float(1.0);</p> <p>Float f2 = new Float(1.0f);</p> <p>Float f3 = new Float("1.0f");</p> |
| double | Double | <p>Double (double value)</p> <p>Double (String s)</p> | <p>Double d = new Double(1.0);</p> <p>Double d2 = new Double("1.0");</p> |

## 래퍼 클래스 구조도

![01](/assets/img/cs/hierarchy.png)

계층 구조에서 알 수 있듯이, 기본형 중에서 숫자와 관련된 래퍼 클래스들은 모두 Number클래스의 자손이라는 것을 알 수 있다.

---
**Reference**
+ [Wiki](https://en.wikipedia.org/wiki/Primitive_wrapper_class_in_java)
+ 남궁 성님의 자바의 정석
