---
layout: post
date: 2020-09-29 13:46:00
title: "java.lang패키지와 유용한 클래스"
description: "자바의 정석"
subject: java의 정석
category: [ java ]
tags: [ java, java.lang, package ]
comments: true
---

# java.lang패키지와 유용한 클래스

> 이 글은 남궁성님의 [자바의 정석 3/e](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788994492032)을 기반으로 공부한 내용을 정리한 글입니다.

+ [java lang 패키지](#java-lang-패키지)
+ [유용한 클래스](#유용한-클래스)

## java lang 패키지

`java.lang`패키지는 기본이 되는 클래스들을 포함하고 있다. 따라서 import문 없이도 사용할 수 있게 되어 있다.

### 1.1 Object 클래스

`Object`클래스는 모든 클래스의 최고 조상이기 때문에 멤버들을 모든 클래스에서 바로 사용 가능하다.

멤버변수는 없고 11개의 메서드만 가지고 있다. 이 메서드들은 모든 인스턴스가 기본적으로 가져야 할 것들이다.

<p style="color:#a0adec"><b>equals(Object obj)</b></p>

매개변수로 객체의 참조변수를 받아서 비교하여 결과를 `boolean`값으로 알려주는 역할을 한다.

```java
  public boolean equals(Object obj) {
    return (this == obj);
  }
```

두 객체의 같고 다름을 참조변수의 값으로 판단한다.

상속받은 `equals`메서드는 두 개의 참조변수가 같은 객체를 참조하고 있는지, 즉 저장된 값(주소값)이 같은지를 판단한다. `value`값을 비교하기 위해선 오버라이딩하여 주소가 아닌 객체에 저장된 내용을 비교하도록 변경해야 한다.

<p style="color:#a0adec"><b>hashCode()</b></p>
