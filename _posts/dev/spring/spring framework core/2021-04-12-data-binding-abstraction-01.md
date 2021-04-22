---
layout: post
date: 2021-04-12 10:00:00
title: "데이터 바인딩 추상화 : PropertyEditor"
description: "스프링 프레임워크 핵심 기술"
subject: Spring framework
category: [ spring ]
tags: [ spring, IoC, databinding, propertyeditor ]
use_math: true
comments: true
---

[스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)을 공부하고 정리하는 포스트입니다.

---

# 데이터 바인딩 추상화 : PropertyEditor

## 데이터 바인딩

&nbsp;&nbsp;&nbsp;데이터 바인딩을 두 가지 관점에서 설명하면 다음과 같다.

+ 기술적 관점
  - 프로퍼티 값을 타겟 객체에 설정하는 기능
+ 사용자 관점
  - 사용자가 입력한 값을 애플리케이션 도메인 객체에 동적으로 변환해 넣어주는 기능

### 그렇다면 할당할 때 왜 바인딩이 필요할까?  
&nbsp;&nbsp;&nbsp;사용자가 입력하는 값은 주로 문자열인데, 그 문자열을 도메인 객체는 다양한 프로퍼티 타입(int, long, Boolean, Data 등등)으로 인식하게 될 것이다. 심지어 도메인 객체 타입 자체로 변환해야하는 경우도 있는데, 이처럼 객체가 가지고 있는 다양한 프로퍼티 타입으로 변환해 주는 것을 데이터 바인딩이라고 한다.

이러한 데이터 바인딩에 대해서 스프링에서 자체적으로 제공해주는 [DataBinder](https://docs.spring.io/spring-framework/docs/5.0.8.RELEASE/javadoc-api/org/springframework/validation/DataBinder.html)라는 인터페이스가 있다. 이 기능은 주로 웹 MVC에서 주로 사용하지만 <b>PropertyEditor</b>를 사용하는 데이터 바인더는 스프링 웹 MVC뿐만 아니라 Xml 설정 파일에 입력한 문자열을 bean이 가지고 있는 적절한 타입으로 변환해서 넣어줄 때도 사용된다. 또한 SpEL(Spring Expression Language)라는 곳에서도 사용이 된다.

<span style="font-size:16pt"><b>&#9654; 고전적인 방식의 데이터 바인딩</b></span>

```java
package me.gracenam.demospring51;

public class Event {

    private Integer id;

    private String title;

    public Event(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }

}
```

```java
package me.gracenam.demospring51;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {

    @GetMapping("/event/{event}")
    public String getEvent(@PathVariable Event event) {
        System.out.println(event);
        return event.getId().toString();
    }

}
```

간단한 Controller를 사용하는데 Controller가 들어오면 `/event/{event}`에서 `/event/1`과 같이 이벤트의 아이디를 입력할 것이다. 입력한 숫자를 event 타입으로 변환해서 스프링이 받아야 하고, 받은 이벤트 타입, 즉 도메인 타입을 가지고 코딩을 하는 것이다. 이제 테스트를 통해서 확인해보자.

```java
package me.gracenam.demospring51;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest
public class EventControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    public void getTest() throws Exception {
        mockMvc.perform(get("/event/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("1"));
    }

}
```

mockMvc로 "/event/1"이라고 `.perform(get())` 요청을 보낸다. 이 때 status가 "isOk"이고 content가 "1"이 출력되기를 바란다.

Controller의 return 값을 살펴보면 id 값을 리턴했기 때문에, 요청을 보냈을 때 아무 문제 없이 결과가 1이 나와야한다. 하지만, 테스트를 돌려보면 알겠지만 실패하게 된다.

<img src="/assets/img/study/pe01.png" width="70%" aling="center"><br/>

왜냐하면 숫자 1을 이벤트 타입으로 변환할 수 없기 때문이다. 실패한 에러코드에도 타입을 변환할 수 없었기 때문이라고 나와있다.

&nbsp;&nbsp;&nbsp;이것을 해결하기 위해서 PropertyEditor를 사용할 수 있다.

## PropertyEditor

&nbsp;&nbsp;&nbsp;예제를 살펴보기 전에 PropertyEditor에 대해서 간략하게 알아보자.

<b>PropertyEditor</b>는 스프링 3.0 이전까지 DataBinder가 변환 작업에 사용한 인터페이스이다. 이 PropertyEditor 몇 가지 단점이 있다.

&nbsp;&nbsp;&nbsp;값(상태 정보)를 저장하고 있어서 Thread-Safe 하지 못하다. 만일 빈으로 등록해서 사용할 경우 1번 사용자가 2번 사용자의 정보를 수정하거나 5번 사용자가 3번 사용자의 정보를 수정하는 등의 위험한 일이 발생할 수 있다.

또한 Object와 String 간의 변환만 가능해서 사용 범위가 제한적이다. 하지만 대부분의 경우 Object-String 간의 변환이기 떄문에 조심해서 잘 사용해왔다.

이제 예제를 마저 살펴보자.

```java
package me.gracenam.demospring51;

import java.beans.PropertyEditorSupport;

public class EventEditor extends PropertyEditorSupport {

    @Override
    public String getAsText() {
        Event event = (Event) getValue();

        return event.getId().toString();
    }

    @Override
    public void setAsText(String text) throws IllegalArgumentException {
        setValue(new Event(Integer.parseInt(text)));
    }

}
```

`PropertyEditor`를 직접 구현을 해도되지만 자바 클래스이기 떄문에 구현해야할 클래스가 굉장히 많다. 따라서 `PropertyEditorSupport`를 상속받아서 필요한 메서드만 구현하면 된다. 보통 `getAsText()`와 `setAsText()`를 구현하면 되는데 텍스트를 이벤트로 변환하는 것이기 때문에 <b>setAsText</b>만 구현해도 된다.

<b>setAsText</b>는 사용자가 입력한 데이터를 Event 객체로 변환해 주는 역할을 하는 메소드이다.
<b>getAsText</b>는 프로퍼티가 받은 객체를 getValue를 통해서 가져온 뒤 Event 객체를 문자열 정보로 변환해서 반환하는 메소드이다.

&nbsp;&nbsp;&nbsp;PropertyEditor의 특징 중에 값을 가지고 있다고 했었는데 여기서 <b>getValue</b>와 <b>setValue</b>에서 공유하고 있는 Value가 바로 그 값이다. 이 값이 서로 다른 쓰레드에게 공유가 된다. 즉, stateful[^1]하기 때문에 Thread-Safe 하지 않은 것이다. 따라서 빈으로 등록해서 쓰면 안된다는 것이다.

&nbsp;&nbsp;&nbsp;빈으로 등록해서 쓸 수 없다면 어떻게 사용해야 하는 걸까? 바로 `@InitBinder`라는 애노테이션을 통해서 Controller에 등록하여 사용할 수 있다.

```java
package me.gracenam.demospring51;

import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {

    @InitBinder
    public void init(WebDataBinder webDataBinder) {
        webDataBinder.registerCustomEditor(Event.class, new EventEditor());
    }

    @GetMapping("/event/{event}")
    public String getEvent(@PathVariable Event event) {
        System.out.println(event);
        return event.getId().toString();
    }

}
```

`WebDataBinder`라는 곳에 `Event.class` 타입을 처리 할 PropertyEditor를 등록할 수 있다. 이렇게 하면 Controller에서 요청을 처리하기 전에 DataBinder에 들어있는 PropertyEditor를 사용하게 되고 따라서 문자열로 들어온 값이 event 객체로 바뀌게 된다.  
이렇게 해서 테스트 코드를 실행해보면 출력이 되는 것을 확인할 수 있다.

<img src="/assets/img/study/pe02.png" width="70%" align="center"><br/>

&nbsp;&nbsp;&nbsp;이러한 방법은 사실 빈으로 등록하기도 위험하고 구현 방법 자체도 복잡하다. 이를 해결하기 위해서 스프링 3.0 부터는 데이터 바인딩과 관련된 인터페이스와 기능이 추가되었다.

---
**Reference**
+ [스프링 프레임워크 핵심기술](https://www.inflearn.com/course/spring-framework_core/dashboard)

---
[^1]:상태정보를 저장하는 형태
