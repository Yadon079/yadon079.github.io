---
layout: post
date: 2021-02-27 22:30:00
title: "14주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, generics, erasure ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 14주차 과제](https://github.com/whiteship/live-study/issues/14)를 공부하고 공유하기 위해서 작성되었습니다.

# 14주차 회고

&nbsp;&nbsp;&nbsp;매번 스터디 과제를 학습하고 제출하고나면 먼저 제출하셨는데도 방대한 양과 양질의 지식들이 들어있는 분들이 많다. 이정도 공부했으면 괜찮겠지하고 생각했지만 제출하고 난 뒤에 다른 분들의 글을 읽어보면 와 이런 것도 있었어? 라는 생각이 들곤한다.

&nbsp;&nbsp;&nbsp;시간이 후딱후딱 지나가서 어느덧 마지막 주차만 남았는데 스터디를 하면서 분명히 내가 성장했음을 느끼지만 동시에 부족함도 느끼고 있다. 스터디가 끝났다고 공부가 끝나는 것이 아니며, 한번 배웠다고 해서 끝나는 것이 아닌 꾸준한 반복학습이 필요하다는 것을 다시금 되새긴다.

> <https://alkhwa-113.tistory.com/entry/%EC%A0%9C%EB%84%A4%EB%A6%AD> 링크를 잘 타고 이동하면 이펙티브 자바를 정리한 글을 볼 수 있다.

---

# 질문

# Under bounded는 인터페이스도 지원이 되는가?

## 와일드 카드 종류

### Unbounded WildCard

Unbounded WildCard는 `List<?>`와 같은 형태로 물음표만 가지고 정의된다. 내부적으로 Object로 정의되어서 사용하고 있는 모든 타입의 인자를 받을 수 있다. 타입 파라미터에 의존하지 않는 메소드만 사용하거나 Object 메소드에서 제공하는 기능으로 충분한 경우 사용하게 된다.

### Upper Bounded WildCard

Upper Bounded WildCard는 `List<? extends Foo>`의 형태로 사용한다. 특정 클래스의 자식 클래스만 인자로 받는다. 임의의 Foo 클래스를 상속받는 어떤 클래스가 와도 되지만 Foo에 정의된 기능만 사용할 수 있다.

### Lower Bounded WildCard

`List<? super Foo>`의 형태로 사용되며 특정클래스의 부모 클래스만 인자로 받는다. 즉, Upper와 반대다.

&nbsp;&nbsp;&nbsp;다시 질문으로 돌아와서 클래스 뿐만 아니라 인터페이스도 지원이 가능한가?

답은 가능하다. 이다. 예제를 통해서 살펴보자.

&#9654; Game.java

```java
package generic;

public class Game { }
```

&#9654; RankGame.java

```java
package generic;

public interface RankGame { }
```

&#9654; LoL.java

```java
package generic;

public class LoL extends Game implements RankGame { }
```

&#9654; WoW.java

```java
package generic;

public class WoW extends Game { }
```

&#9654; Play.java

```java
package generic;

public class Play <T> {

    public static void main(String[] args) {
        Play<?> lolPlay = new Play<>();
        lolPlay.doSomething(new Play<LoL>());
        lolPlay.doSomething(new Play<Game>());
        lolPlay.doSomething(new Play<RankGame>());
    }

    public void doSomething(Play<? super LoL> play) {
        System.out.println(play);
    }

}
```

`doSomething` 메소드의 파라미터로 `Play<? super LoL>`을 선언하였다. `<? super LoL>`은 Lower Bounded이고 따라서 LoL클래스의 상위타입을 받겠다는 의미이다. LoL 클래스를 살펴보면 `RankGame`이라는 인터페이스를 가지고 있고 인터페이스가 넘어오는 것을 확인할 수 있다.

한 가지 의문이 생길 수 있는데, 클래스 제네릭 선언 시에 extends는 가능한데 super는 불가능하다. 왜 그럴까?

# Erasure 챕터에서 컴파일러가 브릿지 패턴을 생성한다고 하는데, 바이트코드에는 나오지 않습니다. 확인하는 방법이 혹시 있을까요?



---

# 학습

# 제네릭 주요 개념 (바운디드 타입, 와일드 카드)

&nbsp;&nbsp;&nbsp;제네릭 타입에는 여러가지가 있다.

## 바운드 타입 매개변수(Bounded type parameter)

바운드 타입은 특정 타입의 서브 타입으로 제한한다. 클래스나 인터페이스 설계할 때 가장 흔하게 사용할 정도로 많이 볼 수 있는 개념이다.

```java
public class BoundTypeSample <T extends Number> {
    public void set(T value) {}

    public static void main(String[] args) {
        BoundTypeSample<Integer> boundTypeSample = new BoundTypeSample<>();
        boundTypeSample.set("Hi");
    }
}
```

위 코드의 경우 컴파일 에러가 발생한다.  
BoundTypeSample 클래스의 Type 파라미터를 T로 선언하고 <T extends Number>로 선언한다. BoundTypeSample의 타입으로 Number의 서브 타입만 허용한다는 것이다.  
Integer는 Number의 서브타입이기 때문에 BoundTypeSample와 같은 선언이 가능하지만 set함수의 인자로 문자열을 전달하려고 했기 때문에 컴파일 에러가 발생하게 된다.

## WildCard

제네릭으로 구현된 메소드의 경우 선언된 타입으로만 매개변수를 입력해야 한다. 이를 상속받은 클래스 혹은 부모 클래스를 사용하고 싶어도 불가능하고 어떤 타입이 와도 상관없는 경우에 대응하기 좋지 않다. 이를 위한 해법으로 WildCard를 사용한다.

&#9654; <b>와일드 카드 종류</b>

<b>Unbounded WildCard</b>

+ Unbounded WildCard는 List<?>와 같은 형태로 물음표만 가지고 정의된다. 내부적으로 Object로 정의되어서 사용되고 모든 타입의 인자를 받을 수 있다. 타입 파라미터에 의존하지 않는 메소드만을 사용하거나 Object 메소드에서 제공하는 기능으로 충분한 경우에 사용한다.
+ Object 클래스에서 제공되는 기능을 사용하여 구현할 수 있는 메서드를 작성하는 경우
+ 타입 파라미터에 의존적이지 않은 일반 클래스의 메소드를 사용하는 경우

<b>Upper Bounded WildCard</b>

+ Upper Bounded WildCard는 List<? extends Foo>와 같은 형태로 사용하고 특정 클래스의 자식 클래스만을 인자로 받는다. 임의의 Foo 클래스를 상속받는 어느 클래스가 와도되지만 사용할 수 있는 기능은 Foo 클래스에 정의된 기능만 사용이 가능하다.

<b>Lower Bounded WildCard</b>

+ Lower Bounded WildCard는 List<? super Foo>와 같은 형태로 사용하고, Upper Bounded WildCard와 다르게 특정 클래스의 부모 클래스만을 인자로 받는다는 것이다.

# Erasure

&nbsp;&nbsp;&nbsp;제네릭에 대해 공부하다보면 한 가지 특이한 점을 알 수 있다. 바로 타입 파라미터에 primitive 타입을 사용하지 않았다는 것이다.

물론 primitive 타입도 타입인데, <b>타입으로 사용하지 못한다는게 이상하다</b>는 생각이 들 것이다. 결론부터 말하자면 <b>타입 소거(type Erasure)</b>때문이다.


`List<Integer>`를 예시로 살펴보자.

```java
package generic;

import java.util.ArrayList;
import java.util.List;

public class Feedback01 {

    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
    }

}
```

위 코드의 바이트 코드를 살펴보면 ArrayList가 생성될 때 타입 정보가 없다는 것을 발견할 수 있다. 여기서 재밌는 점(?)은 제네릭을 사용하지 않고 raw type으로 ArrayList를 생성해도 똑같은 바이트 코드를 볼 수 있다! 그리고 내부에서 타입 파라미터를 사용할 경우 Object 타입으로 취급하여 처리한다.

이것을 타입 소거(type Erasure)라고 한다. 타입 소거는 제네릭 타입이 특정 타입으로 제한되어 있을 경우 해당 타입에 맞춰 컴파일 시 타입 변경이 발생하고 타입 제한이 없을 경우 Object 타입으로 변경된다.

## 왜 이렇게 만들었을까?

&nbsp;&nbsp;&nbsp;바로 <b>하위 호환성</b>을 지키기 위해서이다.

제네릭을 사용하더라도 하위 버전에서도 동일하게 동작을 해야한다. primitive 타입을 사용하지 못하는 것도 바로 이 기본 타입은 Object 클래스를 상속받고 있지 않기 때문이다. 그래서 기본 타입 자료형을 사용하기 위해서는 Wrapper 클래스를 사용해야 한다.

Wrapper 클래스를 사용할 경우 Boxing과 Unboxing을 명시적으로 사용할 수도 있지만 암묵적으로도 사용할 수 있으니 구현 자체에는 크게 신경쓰지 않아도 된다.

&nbsp;&nbsp;&nbsp;다시 돌아와서 제네릭과 관련하여 한 가지 더 생각해 볼 부분이 있다.

제네릭 타입을 사용해서 배열을 생성할 때 어떻게 해야할까?

```java
  private T[] arr = new T[size];
```

제네릭 타입이니까 위처럼 작성하면 된다고 생각할수도 있지만, 실제론 저렇게 생성할 수 없다. 아래와 같이 형변환을 이용해야 한다.

```java
  private T[] arr = (T[]) new Object[size];
```

왜 이렇게 해야할까?

### 바로 new 연산자를 사용하기 때문이다.
new 연산자는 동적 메모리 할당 영역인 heap 영역에 생성한 객체를 할당한다. 하지만 제네릭은 컴파일 타임에 동작하는 문법이다. 컴파일 타임에는 T의 타입이 어떤 타입인지 알 수 없기 때문에 Object 타입으로 생성한 다음 타입 캐스팅을 해주어야 사용할 수 있다.

마찬가지로 static 변수에도 제네릭 타입을 사용할 수 없다.

static 키워드를 사용해서 멤버 필드를 선언하면 특정 객체에 종속되지 않고 클래스 이름으로 접근해서 사용할 수 있다. 제네릭 타입을 사용하면 객체를 생성해 인스턴스마다 사용하는 타입을 다르게 사용할 수 있어야한다. 하지만 static으로 선언한 변수는 그것이 불가능하다.

재밌는 사실은 static <b>메소드</b>에는 제네릭을 사용할 수 있다. 왜 변수에서는 불가능한데 메소드에서는 가능할까?

static 키워드를 사용하면 클래스 이름으로 접근하며 객체를 생성하지 않고 여러 인스턴스에서 공유해서 사용할 수 있다. 변수같은 경우 해당 값을 사용하려면 값의 타입을 알아야 하지만 메소드의 경우 해당 기능을 공유해서 사용하는 것이다. 따라서 제네릭 타입 변수 T를 매개변수로 사용한다고 하면 해당 값은 메소드 안에서 지역 변수로 사용되기 때문에 변수와 달리 제네릭을 사용할 수 있다.

# 제네릭 주의 사항

+ primitive type을 타입 인자로 사용할 수 없다.

&#9654; 잘못된 코드 예시

```java
Pair<int, char> p = new Pair<>(8, 'a');
```

+ 타입 매개변수로 인스턴스를 생성할 수 없다.

&#9654; 잘못된 코드 예시

```java
public static <E> void test(List<E> list) {
    E elem = new E(); // 컴파일 오류
    list.add(elem);
}
```

+ 타입 매개변수는 정적 필드로 사용할 수 없다.

&#9654; 잘못된 코드 예시

```java
public class Test<T> {
    public static T test; // 컴파일 오류
}
```

+ 제네릭 타입에 캐스팅 또는 instanceof를 사용할 수 없다. 단, 와일드 카드를 사용하면 가능하다.

&#9654; 잘못된 코드 예시

```java
public static<E> void test(List<E> list) {
    if(list instanceof ArrayList<Integer>) { // 컴파일 오류
        ...
    }
}
```

&#9654; 와일드 카드

```java
public static void test(List<?> list) {
    if(list instanceof ArrayList<?>) {  // OK.
        ...
    }
}
```

```java
public static void main(String[] args) {
    List<Integer> list = new ArrayList<>();

    List<Number> ln = (List<Number>) list; // 컴파일 오류
    ArrayList<Integer> list2 = (ArrayList<Integer>) list; // OK.
}
```

+ 제네릭 타입의 배열을 생성할 수 없다.

&#9654; 잘못된 코드 예시

```java
List<Integer>[] arr = new List<Integer>[2]; // 컴파일 오류
```

+ 제네릭 클래스는 `Throwable` 클래스를 직접 또는 간접적으로 상속받을 수 없다.

&#9654; 잘못된 코드 예시

```java
// 간접 상속
class MathException<T> extends Exception { ... } // 컴파일 오류

// 직접 상속
class QueueFullException<T> extends Throwable { ... } // 컴파일 오류
```

+ 제네릭 메소드의 타입 매개변수의 객체를 catch 할 수 없다. 단, throw는 가능하다.

&#9654; 잘못된 코드 예시

```java
public static <T extends Exception, J> void execute(List<J> jobs) {
    try {
        for(J job : jobs)
          ...
    } catch (T e) { // 컴파일 오류
        ...
    }
}
```

&#9654; throw 예시

```java
class Parser<T extends Exception> {
    public void parse(File file) throws T { // OK.
        ...
    }
}
```

+ 타입 Erasure 단계 후 동일한 서명을 가지게 되는 메서드 오버로딩은 불가능하다.

&#9654; 잘못된 코드 예시

```java
public class Example {
    // 타입 Erasure 후에는 print(Set)으로 동일하기 때문에 오버로딩 불가
    // 컴파일 오류
    public void print(Set<String> strSet) { }
    public void print(Set<Integer> intSet) { }
}
```

# 브릿지 메서드

&nbsp;&nbsp;&nbsp;제네릭 클래스를 상속받거나 제네릭 인터페이스를 구현하는 클래스 또는 인터페이스를 컴파일 할 때, 컴파일러는 타입 Erasure 프로세스의 일부로 <b>브릿지 메서드</b>라는 합성 메서드를 만들어야 할 수도 있다. 일반적으로 브릿지 메서드를 생각할 필요는 없지만 stack trace에 나타나는 경우 당황할 수도 있기 때문에 알아두도록 하자.

예시를 통해서 살펴보자. 다음은 코드는 각각 제네릭 클래스 WitchPot과 그를 상속받는 FrogPot이다.

&#9654; WitchPot.java

```java
public class WitchPot<T> {

    private T material;

    public WitchPot(T material) {
       this.material = material;
    }

    public void set(T material) {
      this.material = material;
    }

}
```

&#9654; ForgPot.java

```java
public class FrogPot extends WitchPot<Material> {

    public FrogPot(Material material) {
        super(material);
    }

    @Override
    public void set(Material material) {
        super.set(material)
    }

}
```

아무런 문제 없이 컴파일되어 Erasure 단계를 지났을 경우 아래와 같은 바이트코드가 예상된다.

```java
public class WitchPot {
    private Object material;

    public WitchPot(Object material) {
        this.material = material;
    }

    public void set(Object material) {
        this.material = material;
    }
}
```

```java
public class FrogPot extends WitchPot{

    public FrogPot(Material material) {
        super(material);
    }

    public void set(Material material) {
        super.set(material);
    }
}
```

여기서 문제는 Erasure 단계 후에 WitchPot에서 상속받은 FrogPot의 `set(Material material)`메서드는 WitchPot의 `set(Object material)`메서드와 다른 파라미터 타입을 가진다. 이것은 ProgPot의 set메서드는 WitchPot의 set메서드를 오버라이딩을 하지 않는다.

이러한 것을 해결하기 위해 컴파일러는 브릿지 메서드를 생성한다. 브릿지 메서드는 이름처럼 다리 역할을 하는데 위의 예제 경우 Object로 받은 객체를 Material로 캐스팅한 뒤 다시 본래의 set(Material material)메서드를 호출하는 식이다.

---
**Reference**
+ <https://sujl95.tistory.com/73>
+ <https://blog.naver.com/hsm622/222251602836>
+ <https://rockintuna.tistory.com/102>
+ <https://alkhwa-113.tistory.com/entry/%EC%A0%9C%EB%84%A4%EB%A6%AD>
