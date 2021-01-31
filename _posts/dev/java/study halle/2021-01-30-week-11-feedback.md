---
layout: post
date: 2021-01-30 22:30:00
title: "11주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, Enum, EnumSet ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 11주차 과제](https://github.com/whiteship/live-study/issues/11)를 공부하고 공유하기 위해서 작성되었습니다.

# 11주차 회고

&nbsp;&nbsp;&nbsp;이번 주 스터디도 끝났다! 이제 남은 스터디가 얼마 안되는데 이렇게 매주매주 공부하는 즐거움을 주는 스터디가 끝나간다는게 아쉬운 한 편으로 또 내가 이만큼 공부해서 성장을 했구나를 느낄 수 있어서 좋다.

> 잘 정리된 글 : <https://velog.io/@ljs0429777/11%EC%A3%BC%EC%B0%A8-%EA%B3%BC%EC%A0%9C-Enum>
> 좋은 예제 : <https://blog.naver.com/hsm622/222218251749>

---

# 질문

# enum은 왜 만들어졌는가?(효용성)

> 예제 출처 : <https://wisdom-and-record.tistory.com/52>

&nbsp;&nbsp;&nbsp;Enum을 잘 사용하면 코드의 가독성을 높이고 논리적인 오류를 줄일 수 있다. Enum을 잘 사용하기 위해 우선 Enum이 왜 탄생했는지 먼저 알아보자.

결론부터 말하자면 <b>상수를 클래스로 정의해서 관리할 때 얻을 수 있는 이점들을 모두 취하면서 상수들을 더욱 간단히 선언할 수 있도록 하기 위해</b> 만들어졌다.

예제를 살펴보면서 자세히 알아보자. 다음 예제는 과일 이름을 입력받으면 가격을 출력하는 프로그램이고, 과일의 이름은 숫자를 붙여 다음과 같이 상수로 관리한다.

```java
public class EnumEx {
    public static final int APPLE = 1;
    public static final int BANANA = 2;
    public static final int COCONUT = 3;

    public static void main(String[] args) {
        int type = APPLE;
        switch (type) {
            case APPLE:
                System.out.println("360원");
                break;
            case BANANA:
                System.out.println("6000원");
                break;
            case COCONUT:
                System.out.println("2000원");
                break;
        }
    }
}
```

위 코드를 읽다보면 각각의 상수에 1, 2, 3이라는 리터럴을 부여하여 구분을 하는데 이것은 논리적으로 아무런 의미가 없다. APPLE은 정수 1과 아무런 관련도 없고 굳이 1이어야 할 이유도 없다는 것이다.

&nbsp;&nbsp;&nbsp;두번째 문제는 이름의 충돌이 발생할 수 있다는 것이다. 만약 이 프로그램이 커져서, 기업의 이름을 추가하고 뭐가 추가되고 하다보니 IT 회사의 정보가 추가되었고 회사 이름을 상수로 관리하려 한다 해보자.

```java
public class EnumEx {
    public static final int APPLE = 1;
    public static final int BANANA = 2;
    public static final int COCONUT = 3;

      ...

    public static final int APPLE = 1;
    public static final int GOOGLE = 2;
    public static final int FACEBOOK = 3;

      ...
}
```

과일인 'APPLE'과 회사 이름인 'APPLE'은 이름은 같지만 서로 다른 의미를 가진다. 이러한 상황에 위의 예시처럼 사용하려면 이름이 중복되기 때문에 컴파일 에러가 발생한다.

이름의 중복은 아래처럼 이름을 다르게 해주거나 인터페이스로 만들어서 구분할 수 있다.

&#9654; 서로 다른 이름

```java
public class EnumEx {
    public static final int FRUIT_APPLE = 1;
    public static final int FRUIT_BANANA = 2;
    public static final int FRUIT_COCONUT = 3;

      ...

    public static final int COMPANY_APPLE = 1;
    public static final int COMPANY_GOOGLE = 2;
    public static final int COMPANY_FACEBOOK = 3;

      ...
}
```

&#9654; 인터페이스

```java
interface Fruit {
    int APPLE = 1, BANANA = 2, COCONUT = 3;
}

interface Company {
    int APPLE = 1, GOOGLE = 2, FACEBOOK = 3;
}
```

&nbsp;&nbsp;&nbsp;하지만 상수를 인터페이스로 관리하는 것은 Anti-Pattern이다. 인터페이스는 규약을 정하기 위해 만든 것이지, 이런 식으로 사용하라고 만든 개념이 아니기 때문이다.

&nbsp;&nbsp;&nbsp;여전히 문제가 남아있다. fruit와 company 모두 int 타입의 자료형이기 때문에 아래와 같은 코드가 가능하다.

```java
    if(Fruit.APPLE == Company.APPLE) {
        ...
    }
```

하지만 '과일'과 '회사'는 서로 비교조차 되어서는 안되는 다른 개념이다. 따라서 위와 같은 코드는 애초에 작성할 수 없게 컴파일 과정에서 막아줘야 한다.

둘이 애초에 비교를 하지 못하도록 하려면 서로 다른 객체로 만들어주면 된다.

```java
class Fruit {
    public static final Fruit APPLE = new Fruit();
    public static final Fruit BANANA = new Fruit();
    public static final Fruit COCONUT = new Fruit();
}

class Company {
    public static final Company APPLE = new Company();
    public static final Company GOOGLE = new Company();
    public static final Company FACEBOOK = new Company();
}

public class EnumEx {
    public static void main(String[] args) {
        if (Fruit.APPLE == Company.APPLE) {}   // 컴파일 에러 발생
    }
}
```

이렇게 하면 위에서 언급했던 문제들

1. 상수와 리터럴이 논리적인 연관이 없음
2. 서로 다른 개념끼리 이름이 충돌할 수 있음
3. 서로 다른 개념임에도 비교하는 코드가 가능함

이 모두 해결된다.

&nbsp;&nbsp;&nbsp;하지만 <b>또!</b> 다른 문제가 발생한다. 사용자 정의 타입은 switch문의 조건에 들어갈 수 없다. (switch문의 조건으로 들어갈 수 있는 데이터 타입은 byte, short, char, int, enum, String, Byte, Short, Character, Integer이다.)

```java
public class EnumEx {
    public static void main(String[] args) {
        Fruit type = Fruit.APPLE;
        switch (type) {   // 컴파일 에러
            case Fruit.APPLE:
                System.out.println("360원");
                break;
            case Fruit.BANANA:
                System.out.println("6000원");
                break;
            case Fruit.COCONUT:
                System.out.println("2000원");
                break;
        }

    }
}
```

Enum은 이렇게 상수를 클래스로 정의해서 관리할 때 얻을 수 있는 이점들을 모두 취하면서 상수들을 더욱 간단히 선언할 수 있도록 하기 위해 만들어진 것이다.

# values()는 어디서 나오는가? 바이트코드로 알아보자!

## values(), valueOf() 메소드는 컴파일러가 자동으로 추가해준다??

```java
package me.gracenam.study.week11;

public class EnumExample {

    enum Fruit {
        Apple, Banana
    }

    public static void main(String[] args) {
        System.out.println(Fruit.Apple.ordinal());
        System.out.println(Fruit.Banana.ordinal());
    }
}
```

위 코드는 values()나 valueOf()가 선언되어 있지 않다. 이 상태에서 컴파일하고 **바이트코드**를 보자!

```java
Compiled from "EnumExample.java"
final class me.gracenam.study.week11.EnumExample$Fruit extends java.lang.Enum<me.gracenam.study.week11.EnumExample$Fruit> {
  public static final me.gracenam.study.week11.EnumExample$Fruit Apple;

  public static final me.gracenam.study.week11.EnumExample$Fruit Banana;

  public static me.gracenam.study.week11.EnumExample$Fruit[] values();
    Code:
       0: getstatic     #1                  // Field $VALUES:[Lme/gracenam/study/week11/EnumExample$Fruit;
       3: invokevirtual #7                  // Method "[Lme/gracenam/study/week11/EnumExample$Fruit;".clone:()Ljava/lang/Object;
       6: checkcast     #8                  // class "[Lme/gracenam/study/week11/EnumExample$Fruit;"
       9: areturn

  public static me.gracenam.study.week11.EnumExample$Fruit valueOf(java.lang.String);
    Code:
       0: ldc           #2                  // class me/gracenam/study/week11/EnumExample$Fruit
       2: aload_0
       3: invokestatic  #12                 // Method java/lang/Enum.valueOf:(Ljava/lang/Class;Ljava/lang/String;)Ljava/lang/Enum;
       6: checkcast     #2                  // class me/gracenam/study/week11/EnumExample$Fruit
       9: areturn

  static {};
    Code:
       0: new           #2                  // class me/gracenam/study/week11/EnumExample$Fruit
       3: dup
       4: ldc           #22                 // String Apple
       6: iconst_0
       7: invokespecial #24                 // Method "<init>":(Ljava/lang/String;I)V
      10: putstatic     #25                 // Field Apple:Lme/gracenam/study/week11/EnumExample$Fruit;
      13: new           #2                  // class me/gracenam/study/week11/EnumExample$Fruit
      16: dup
      17: ldc           #28                 // String Banana
      19: iconst_1
      20: invokespecial #24                 // Method "<init>":(Ljava/lang/String;I)V
      23: putstatic     #30                 // Field Banana:Lme/gracenam/study/week11/EnumExample$Fruit;
      26: iconst_2
      27: anewarray     #2                  // class me/gracenam/study/week11/EnumExample$Fruit
      30: dup
      31: iconst_0
      32: getstatic     #25                 // Field Apple:Lme/gracenam/study/week11/EnumExample$Fruit;
      35: aastore
      36: dup
      37: iconst_1
      38: getstatic     #30                 // Field Banana:Lme/gracenam/study/week11/EnumExample$Fruit;
      41: aastore
      42: putstatic     #1                  // Field $VALUES:[Lme/gracenam/study/week11/EnumExample$Fruit;
      45: return
}
```

바이트 코드를 살펴보면 몇 가지 사실들을 확인할 수 있다.

&#9654;`java.lang.Enum`의 extends

```java
final class me.gracenam.study.week11.EnumExample$Fruit extends java.lang.Enum<me.gracenam.study.week11.EnumExample$Fruit> {
  ...
}
```

별도로 상속받거나 한 적이 없는데 컴파일하면서 자동적으로 상속받고 있다.

&#9654; values()와 valueOf()

```java
public static me.gracenam.study.week11.EnumExample$Fruit[] values();
  ...

public static me.gracenam.study.week11.EnumExample$Fruit valueOf(java.lang.String);
  ...
```

별도로 정의하거나 호출하지 않았지만 values()와 valueOf() 메소드를 확인할 수 있다.

한 가지 특이한 점은 Enum 클래스를 살펴보면 valueOf()는 정의되어 있는데 values()는 존재하지 않는다. values()는 상위 클래스에서 상속되는 것이 아닌 컴파일러가 자동으로 추가해주는 메소드라는 것을 알 수 있다.

# Enum은 내가 원하는대로 정렬을 할 수 없는가?

static final로 int 값을 상수로 줘서 정렬할 때는 순서를 고려하여 int 값을 부여했다.

Enum의 경우 ordinal을 통해서 순서대로 보여줄 수 있다. 단, 이것은 처음에 입력해 놓은 순서대로 출력이 된다.

내가 정의한 것과 화면에 출력되야 하는 순서가 다른 경우 숫자를 부여하여 순서를 정해줘야한다. <b>이 때 토비님으로부터 전수받은 기선님의 꿀팁을 활용하여!</b> 숫자를 부여하여 할 때 확장성을 고려하여 숫자를 띄엄띄엄 입력한다. 즉, 1, 2, 3이 아니라 10, 20, 30과 같이 여백을 추가하는 것이다. 이러면 중간에 다른 값을 추가하더라도 15, 25와 같이 중간 값을 주면서 추가하여 숫자가 밀리는 경우를 줄일 수 있다.

---

# 학습

# ordinal

+ <b>ordinal( )</b>
  + 열거형 상수가 정의된 순서(0부터 시작)를 정수로 반환한다.

개발자니까 코드를 통해서 자세히 알아보자.

```java
package me.gracenam.study.week11;

public class EnumExample {

    enum Fruit {
        Apple, Banana
    }

    public static void main(String[] args) {
        System.out.println(Fruit.Apple.ordinal());
        System.out.println(Fruit.Banana.ordinal());
    }
}
```

<img src="/assets/img/study/enumfb01.png" width="70%" align="center"><br/>

각 상수의 순서가 출력되었는데, ordinal()의 가장 큰 문제점은 바로 순서가 바뀔 수 있다는 가능성을 간과한 것이다.

```java
package me.gracenam.study.week11;

public class EnumExample {

    enum Fruit {
        Apple, Banana
    }

    public static void main(String[] args) {
        System.out.println(Fruit.Apple.ordinal());
        System.out.println(Fruit.Banana.ordinal());

        if(Fruit.Apple.ordinal() == 0) {
            System.out.println("hello");
        }
    }
}
```

Apple이 첫 번째일 경우에 hello를 출력하는데 만일 Apple 앞에 다른 과일이 추가된다고 생각해보자. 이렇게 될 경우 Apple은 0이 아니고 1이 되고 hello는 출력되지 못한다.

이처럼 입력이 언제 어떻게 변경될지 모르기 때문에 ordinal()을 이용해서 만드는 것은 매우 위험하다. 실제로 ordinal()을 살펴보면 이렇게 나와 있다.

> Most programmers will have no use for this method.  It is designed for use by sophisticated enum-based data structures, such as {@link java.util.EnumSet} and {@link java.util.EnumMap}.

즉, 내부에서 사용하기 위해 존재하는 것이지 우리(개발자)가 사용하기 위해서 존재하는 것은 아니라고 볼 수 있다.

# type-safety

&nbsp;&nbsp;&nbsp;type-safety는 숫자만 해당하는게 아니라 문자열도 마찬가지이다. [QueryDSL](http://www.querydsl.com)과 같은 라이브러리가 각광 받는 이유는 타입세이프티 때문이다.

문자열은 타입 세이프티가 보장되지 않는다. 따라서 문자열로 sql을 작성하는 것보다 QueryDSL과 같이 클래스에서 축출한 정보를 이용해 작성하면 훨씬 수월하고, 컴파일 타임에 오타가 날 일도 없고 특정한 타입 기반으로 컴파일을 하기 때문에 다 처리된다. 런타임에 문자열 오타로 발생하는 sql에러를 미연에 방지할 수 있다.

예제를 보자! 우리가 반드시 hello를 출력해야 한다고 할 때 다음과 같은 코드를 작성했다.

```java
public class TypeSafetyEx {
    public static void main(String[] args) {
        System.out.println("hello");
    }
}
```

위 코드는 type-safety하지 않은 코드이다. 오타가 발생해서 hellp가 출력될 수도 있고 hell0가 출력될 수도 있다. 그럼 어떻게 해야 할까?

```java
public class TypeSafetyEx {

    enum Greet {
        Hello("hello");

        Greet(String message) {
            this.message = message;
        }

        String message;

        public String getMessage() {
            return message;
        }
    }

    public static void main(String[] args) {
        System.out.println(Greet.Hello.getMessage());
    }
}
```

이렇게 Enum을 통해서 hello라고 정의해두면 type-safety가 되는 것이다. 코드는 길어졌지만 출력할 때 편하고 오타가 나더라도 컴파일러가 알려주기 때문에 오타 방지가 된다.

## 그래서 type-safety가 뭔데?

타입이 일치해야 안전하다. 즉, String 타입에는 String 타입이 와야 한다는 것이다. 같은 이름을 가진 상수라도 타입이 다르면 막아내는 것이 type-safety라고 볼 수 있다.

# EnumSet

```
A specialized Set implementation for use with enum types. All of the elements in an enum set must come from a single enum type that is specified, explicitly or implicitly, when the set is created. Enum sets are represented internally as bit vectors. This representation is extremely compact and efficient. The space and time performance of this class should be good enough to allow its use as a high-quality, typesafe alternative to traditional int-based "bit flags." Even bulk operations (such as containsAll and retainAll) should run very quickly if their argument is also an enum set.
The iterator returned by the iterator method traverses the elements in their natural order (the order in which the enum constants are declared). The returned iterator is weakly consistent: it will never throw ConcurrentModificationException and it may or may not show the effects of any modifications to the set that occur while the iteration is in progress.

Null elements are not permitted. Attempts to insert a null element will throw NullPointerException. Attempts to test for the presence of a null element or to remove one will, however, function properly.

Like most collection implementations, EnumSet is not synchronized. If multiple threads access an enum set concurrently, and at least one of the threads modifies the set, it should be synchronized externally. This is typically accomplished by synchronizing on some object that naturally encapsulates the enum set. If no such object exists, the set should be "wrapped" using the Collections.synchronizedSet(java.util.Set<T>) method. This is best done at creation time, to prevent accidental unsynchronized access:
```

```java
 Set<MyEnum> s = Collections.synchronizedSet(EnumSet.noneOf(MyEnum.class));
```

[공식문서](https://docs.oracle.com/javase/8/docs/api/java/util/EnumSet.html)에는 위와 같이 EnumSet이 설명되어 있다.

이에 대한 해석과 메서드에 대한 설명은 [이 글](https://parkadd.tistory.com/50)을 참고하면 되겠다.

## EnumSet에 new 연산자를 사용하지 않는 이유

> 참고 : <https://siyoon210.tistory.com/152>

EnumSet은 다른 컬렉션들과 달리 new 연산자를 사용할 수 없다. 단지 정적 팩토리 메서드(static factory method)만으로 EnumSet의 구현 객체를 반환받을 수 있다. 왜 그럴까?

EnumSet의 내부를 살펴보면 abstract 클래스, 추상클래스라는 것을 알 수 있다. 즉, EnumSet은 추상클래스이기 때문에 객체로써 생성 및 사용이 불가능한 것이다.

## 왜 이렇게 만들었을고?

1. <b>사용자 편의성 - (사용자는 어떤 구현 객체가 적합한지 몰라도 상관없다)</b>  
RegularEnumSet은 원소의 갯수가 적을 때 적합하고, JumboEnumSet은 원소의 갯수가 많을때 적합하지만, 이는 EnumSet의 구현체들을 모두 알고 있는 사용자가 아니라면 난해한 선택지가 될 수도 있다. 하지만 EnumSet을 가장 잘 알고 있는 EnumSet 개발자가 적절한 구현 객체를 반환해준다면 EnumSet을 사용하는 입장에서는 어떤 구현체가 적합한지 고려하지 않아도 된다.

2. <b>사용자 편의성2 - (사용자는 빈번하게 발생되는 EnumSet초기화 과정을 간단히 진행할 수 있다.)</b>  
EnumSet이 다루는 Enum의 모든 원소들을 Set에 담는 행위는 빈번하게 수행될 것으로 예상되는 일이다. 이러한 경우를 대비하여서 EnumSet의 allOf라는 메소드를 사용하면 모든 Enum 원소가 담겨있는 EnumSet을 쉽게 반환받고 사용 할 수 있다.

3. <b>EnumSet의 확장성과 유지보수의 이점</b>
EnumSet을 유지보수하는 과정에서 RegularEnumSet과 JumboEnumSet 이외에 다른 경우를 대비하는 구현 클래스가 추가 된다고 하여도 내부에 감추어져 있기 때문에, EnumSet을 사용하던 기존의 코드에는 전혀 영향이 없다. 심지어 RegularEnumSet이 삭제된다 하더라도 사용자에게 영향이 없다. 이는 EnumSet의 확장성의 큰 이점으로 작용할 수 있다.

---

# Enum 싱글톤

kwj1270님이 [싱글톤](https://github.com/kwj1270/TIL_DESIGN_PATTERN/blob/main/Singletone%20pattern.md)을 활용해 만드신 [예제](https://velog.io/@kwj1270/Enum)이다.

```java
package SingleTone;

public enum EnumSettings {

    INSTANCE; // 생성자이자 식별자를 의미 -> 밑에 정의된 생성자에 파라미터가 있다면 여기에도 인수 넣어줘야한다.   
              // 식별자라고 말을 한 것은 해당 문구를 기준으로 객체를 참조하기에 싱글톤 기준이 된다.      

    private boolean darkMode = false; // 디폴트 값
    private int fontSize = 13; // 디폴트 값

    private EnumSettings() {} // 생성자

    public EnumSettings getInstance() {
        return INSTANCE;
    }

    public boolean getDarkMode(){
        return darkMode;
    }
    public int getFontSize(){
        return fontSize;
    }
    public void setDarkMode(boolean darkMode){
        this.darkMode = darkMode;
    }
    public void setFontSize(int fontSize){
        this.fontSize = fontSize;
    }
}
```

이렇게 했을 때 다음과 같은 장점이 있다고 한다.

+ 싱글톤의 특징(단 한 번의 인스턴스 호출, Thread간 동기화) 을 가지며
비교적 간편하게 사용할 수 있는 방법이다.
+ 단 한번의 인스턴스 생성을 보장하며 사용이 간편하고 직렬화가 자동으로 처리되고
직렬화가 아무리 복잡하게 이루어져도 여러 객체가 생길 일이 없다.
+ [리플렉션을 통해 싱글톤을 깨트릴 수도 없다.](http://wiki.hash.kr/index.php/%EC%8B%B1%EA%B8%80%ED%86%A4%ED%8C%A8%ED%84%B4#reflection.EC.9C.BC.EB.A1.9C_.EC.8B.B1.EA.B8.80.ED.86.A4_.EA.B9.A8.EA.B8.B0)

싱글톤 패턴에 대해서 공부를 하고 난 다음 예제를 다시 한번 살펴보면 좋을꺼 같다.

---
**Reference**
+ <https://blog.naver.com/hsm622/222218251749>
+ <https://wisdom-and-record.tistory.com/52>
+ <https://b-programmer.tistory.com/262>
+ <https://www.notion.so/Enum-6ffa87530c424d8ab7a1b585bfb26fa2>
+ <https://parkadd.tistory.com/50>
+ <https://velog.io/@kwj1270/Enum>
