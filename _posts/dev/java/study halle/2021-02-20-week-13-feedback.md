---
layout: post
date: 2021-02-20 22:30:00
title: "13주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, stream, buffer, channel, input, output ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 13주차 과제](https://github.com/whiteship/live-study/issues/13)를 공부하고 공유하기 위해서 작성되었습니다.

# 13주차 회고

&nbsp;&nbsp;&nbsp;새삼스럽지만 복습을 하면서 내가 이런 내용도 공부했었나 싶은 부분이 많았다. 어디서 본 거 같은 내용들도 많았고, 13주차 학습을 하면서 놓친 부분도 많았다. 13주차까지 오면서 꽤 많은 양의 공부를 했는데, 다시 복습을 하면서 처음보는 것 같은 내용들도 있고 내용에 대해 질문을 했을 때 바로 답변이 나오지 않는 것도 있었다. 적어도 짧은 문장으로 대답을 할 수 있을 정도로 이해를 해야할 필요가 있다.

---

# 질문

# 버퍼를 사용하는 핵심적인 이유를 알고 있는가?

&nbsp;&nbsp;&nbsp;버퍼(Buffer)란 데이터를 전송하는 상호 간의 장치에서 고속의 장치와 저속의 장치 간의 속도 차이로 인해 저속의 장치가 작업을 추리하는 동안, 고속의 장치가 기다려야하는 현상을 줄여주는 기술이며 데이터를 임시 저장하는 공간을 의미한다. 그리고 임시저장장치로 불리운다. 버퍼를 사용하면, 운영체제의 API 호출 횟수를 줄여서 입출력 성능을 개선할 수 있다.

그렇다면 버퍼를 사용하면 성능이 개선되는데 어떻게 개선이 되는 것인가? I/O 입출력 호출은 OS 레벨에서 호출될 때마다 시스템 콜이 발생하게 된다. 즉 한 바이트씩 보내게 되면 보낼 때마다 시스템 콜이 발생하는 것이다. 반면에 버퍼는 데이터를 모아서 전송하기 때문에 시스템 콜이 발생하는 횟수가 줄어드는 것이다.

&nbsp;&nbsp;&nbsp;즉, 핵심은 시스템 콜 횟수가 줄어들었기 때문에 성능에 이점이 생긴 것이지 모아서 보냈기 때문에 이점이 생긴 것은 아니다.

# NIO도 스트림 기반이 될 수 있지 않을까?

&nbsp;&nbsp;&nbsp;io는 스트림기반, nio는 채널기반이라고 한다. 헌데 Channel 클래스는 자기 자신의 생성자를 통해 인스턴스화를 할 수 없고, 오직 Input/OutputStream 기반의 클래스가 생성된 후에 getChannel()로 만들 수 있다고 한다. 그렇다면 NIO도 스트림 기반이 될 수 있지 않을까?

&nbsp;&nbsp;&nbsp;

# Buffer를 활용한 코드와 얼만큼의 성능 차이가 발생할까?

&#9654; InputStream

```java
package week13;

import java.io.FileInputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {

        long start = System.currentTimeMillis();

        FileInputStream fileInputStream = new FileInputStream("/Users/sunwoo/workspace/live-study/src/main/java/week13/test.txt");

        int i = 0;
        try {
            while((i = fileInputStream.read()) != -1 ) {
                System.out.write(i);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fileInputStream.close();
            } catch (IOException ioe) {
                ioe.printStackTrace();
            }
        }

        System.out.println("걸린 시간 : " + (System.currentTimeMillis() - start));
    }
}
```

&#9654; BufferedInputStream

```java
package week13;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {

        long start = System.currentTimeMillis();

        BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream("/Users/sunwoo/workspace/live-study/src/main/java/week13/test.txt"));

        int i = 0;
        try {
            while((i = bufferedInputStream.read()) != -1 ) {
                System.out.write(i);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                bufferedInputStream.close();
            } catch (IOException ioe) {
                ioe.printStackTrace();
            }
        }

        System.out.println("걸린 시간 : " + (System.currentTimeMillis() - start));
    }
}
```

불러온 파일의 크기가 작아서 비교가 제대로 되지 않았는데 크기가 큰 파일을 이용해서 비교해보면 Buffered가 확실히 성능이 뛰어나다는 것을 알 수 있다.

---

# 학습

# 데코레이터 패턴

&nbsp;&nbsp;&nbsp;`java.io` 패키지는 데코레이터 패턴으로 만들어져있다. 데코레이터 패턴은 A 클래스에서 B 클래스를 생성자로 받아와서 B 클래스에 추가적인 기능을 덧붙여서 제공하는 패턴이다. 정의에 따르면 "객체에 추가적인 요건을 동적으로 첨가한다. 데코레이터는 서브클래스를 만드는 것을 통해서 기능을 유연하게 확장할 수 있는 방법을 제공한다." 라고 되어있다. 이렇게만 들으면 무슨 말인지 알 수가 없다. 예제를 보자.

스타버즈라는 카페가 있다. 스타버즈는 엄청난 급속도로 성장해서 다양한 음료들을 포괄하는 주문시스템을 이제서야 겨우 갖추려고 준비중이다.

+ Beverage는 음료를 나타내는 추상 클래스이며, 모든 음료는 이 클래스의 서브 클래스가 된다.  
+ description 인스턴스변수는 각 서브클래스에서 설정되고, "가장 훌륭한 다크 로스트 커피" 같은 음료 설명이 적힌다.    
+ cost() 메소드는 추상메소드이다. 따라서 모든 서브클래스에서 음료의 가격을 리턴하는 cost() 메소드를 구현해야한다.  

커피를 주문할 때 스팀 우유, 두유, 모카(초코), 휘핑과 같은 토핑을 변경할 수 있는데 이런 경우
기존 구성을 어떻게 변경해야 할까? 처음 스타버즈는 이렇게 해보기로 했다.

+ Beverage라는 기본 클래스의 각 음료에 우유, 두유, 모카, 휘핑이 들어가는지 여부를 나타내는 인스턴스 변수를 추가한다.
+ cost()를 추상클래스로 하지 않고, 구현해 놓기로 한다. 각 음료 인스턴스마다 추가 토핑에 해당하는 추가 가격까지 포함시킬 수 있도록 말이다.
  + 이렇게 하더라도 서브클래스에서 cost()를 오버라이드 해야한다. 오버라이드 할 때 super를 호출하여 추가 비용을 합친 총 가격을 리턴하는 방식으로.

뭔가 잘 될 것 같은데! 이 구조에는 몇 가지의 문제점이 있다.

1. 토핑 가격이 바뀔 때마다 기존 코드를 수정해야한다.
2. 토핑 종류가 많아지면 새로운 메소드를 추가하고, 수퍼클래스의 cost() 메소드도 고쳐야 한다.
3. 새로운 음료가 출시되었다! 루이보스 차! 루이보스 차에는 휘핑 같은 토핑이 들어가서는 안되는데 불필요한 hasWhip() 같은 메소드를 여전히 상속받게된다.
4. 더블 모카를 주문한 경우는 어떻게 될까???   

이런 문제점으로 인해 바로 위의 구조인 상속을 써서 음료 가격과 토핑 가격을 합한 총 가격을 계산한 방법은 그리 좋은 방법이 아니다.

스타버즈는 다음 대안으로 다음과 같이 생각해본다. 우선 특정 음료에서 시작해서, 토핑으로 그 음료를 장식(decorate) 할 것이다. 예를 들어 손님이 모카하고 휘핑을 추가한 에스프레소를 주문한다면 다음과 같다.

1. Espresso 객체를 가져온다.   
2. Mocha 객체로 장식한다.     
3. Whip 객체로 장식한다.   
4. cost() 메소드를 호출한다. 이 때 토핑 가격을 계산하는 일은 해당 객체들에게 위임된다.


그러면 객체를 어떻게 "장식" 할 수 있을까?

1️⃣ Espresso 객체에서 시작한다.
+ Beverage를 상속받기 때문에 cost() 메소드를 가짐

2️⃣ 모카 토핑을 주문했으니 Mocha 객체를 만들고 그 객체로 Espresso를 감싼다.
+ Mocha 객체는 데코레이터이다. 이 객체의 형식은 이 객체가 장식하고 있는 객체(Beverage)를 반영한다.   
  + 반영(mirror)한다는 것은 "같은 형식을 갖는다"는 뜻으로 이해   
  + Mocha에도 cost() 메소드가 있고, 다형성을 통해 Mocha가 감싸고 있는 Espresso도 Beverage 객체로 간주할 수 있다.   
  + Mocha도 Beverage의 서브클래스 형식이다.

3️⃣ 휘핑 크림도 같이 주문했기 때문에 Whip 데코레이터를 만들고 그 객체로 Mocha를 감싼다.
+ Whip도 데코레이터기 때문에 Espresso의 형식을 반영하고, 따라서 cost() 메소드를 가진다.   
+ Mocha와 Whip으로 싸여 있는 Espresso는 여전히 Beverage 객체이기 때문에 cost() 메소드 호출을 비롯한 그냥 Espresso일 때와 같이 모든 행동을 할 수 있다.

4️⃣ 마지막으로 가격을 구한다. 가격을 구할 때는 가장 바깥쪽에 있는 데코레이터인 Whip의 cost()를 호출로 시작한다.

그렇게하면 다음과 같이 정리할 수 있다.

+ Beverage는 구성요소를 나타내는 Component 추상클래스와 같은 개념이다.   
  + 각 구성요소는 직접 쓰일 수도 있고 데코레이터로 감싸져서 쓰일 수도 있다.   
+ 왼쪽의 커피 종류마다 구성요소를 나타내는 구상 클래스를 하나씩 만든다.   
+ ToppingDecorator는 자신이 장식할 구성요소와 같은 인터페이스 또는 추상클래스를 구현한다.   
+ Milk, Mocha 와 같은 데코레이터에는 그 객체가 장식하고 있는 객체를 위한 인스턴스 변수가 있다.   
  + `Beverage beverage`

이제 실제 코드를 작성하며 앞의 내용들을 더 명확하게 알아보자.

🥤 <b>Beverage 클래스</b> 🥤

```java
public abstract class Beverage {

    private String description = "제목없음";

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public abstract int cost();

}
```

추상클래스이며 cost()는 서브클래스에서 구현할 수 있도록 추상메소드로 작성되어있다.   
description은 음료의 설명이 들어간다.   

🥛 <b>ToppingDecorator 클래스</b> 🥛

```java
public abstract class ToppingDecorator extends Beverage {
    public abstract String getDescription();
}
```

토핑을 나타내는 추상클래스(데코레이터 클래스)이다.  
Beverage 객체가 들어갈 수 있도록 Beverage 클래스를 상속받는다.   
모든 토핑 데코레이터(Milk, Mocha..)에서 getDescription() 메소드를 새로 구현하도록 추상 메소드로 선언해준다.   

☕️ <b>Espresso 클래스 (음료 클래스 구현)</b> ☕️

```java
public class Espresso extends Beverage {

    public Espresso () {
        setDescription("에스프레소");
    }

    @Override
    public int cost() {
        return 4000;
    }
}
```

Beverage 클래스를 상속받는다.    
생성자에서 description 값을 에스프레소로 지정   
에스프레소 가격을 리턴한다. 이 때 토핑과 관련된 계산은 걱정할 필요가없다. 그저 에스프로 가격만 리턴해두자.   
나머지 HouseBlend, Decaf, DarkRoast도 동일하게 만든다.   

🍫 <b>Mocha 클래스(토핑 데코레이터 클래스)</b> 🍫

추상 구성요소 (Beverage), 구상 구성요소 (Esppreso), 추상 데코레이터(ToppingDecorator) 까지 만들었으니 마지막으로 구상 데코레이터를 구현하자.

```java
public class Mocha extends ToppingDecorator {

    Beverage beverage;

    public Mocha(Beverage beverage) {
        this.beverage = beverage;
    }

    @Override
    public int cost() {
        return 1000 + beverage.cost();
    }

    @Override
    public String getDescription() {
        return beverage.getDescription() + ", 모카";
    }
}
```
Mocha는 데코레이터 이므로 추상 데ㄹ코레이터 ToppingDecorator를 상속받는다.   
Mocha 인스턴스에는 Beverage에 대한 레퍼런스가 들어있다. 이래야 감싸고자 하는 음료를 저장할 수 있다.   
위에서 getDescription()을 추상메소드로 만든 이유는 여기있다. "에스프레소" 만 들어있으면 어떤 첨가물이 들어있는지 알 수 없으니 ", 모카"를 덧붙여준다.   
cost()는 장식하고있는 객체의 가격을 구한 뒤 그 가격에 모카를 추가한 가격을 리턴한다.   
Soy, SteamMilk, Whip 클래스도 위와 동일하게 작성한다.   
이제 준비가 다 됐으니 커피를 주문해보자.

🛎 <b>실행</b> 🛎

```java
public class StarbuzzCoffee {
    public static void main(String[] args) {

        Beverage beverage = new Espresso();
        System.out.println(beverage.getDescription() + " " + beverage.cost() +"원");

        Beverage beverage2 =new DarkRoast();
        beverage2 = new Mocha(beverage2);
        beverage2 = new Mocha(beverage2);
        beverage2 = new Whip(beverage2);
        System.out.println(beverage2.getDescription() + " " + beverage2.cost() + "원");

        Beverage beverage3 = new HouseBlend();
        beverage3 = new Soy(beverage3);
        beverage3 = new Mocha(beverage3);
        beverage3 = new Whip(beverage3);
        System.out.println(beverage3.getDescription() + " " + beverage3.cost() + "원");

    }
}
```

첫 번째 에스프레소는 아무것도 들어가지 않는 에스프레소를 주문하고,
두 번째, 세 번째 커피는 각각 토핑을 추가하여 토핑 데코레이터로 감싸서 최종 주문을 할 수 있다.

&#9654; 데코레이터가 적용된 I/O

```java
BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(tempFile));
```

위에 공부한 자바 I/O에서 많이 본 코드이다.

+ FileOutputStream이 데코레이터로 포장될 구성 요소(ex- Espresso)이다.   
  + FileOutputStream은 InputStream을 상속받았는데 InputStream이 추상 구성요소(ex-Beverage)가 된다.   
+ BufferedOutputStream은 구상 데코레이터(ex- Mocha)이다.   
  + BufferedOutputStream은 FilterOutputStream을 상속받았는데 여기서 FilterOutputStream이 추상 데코레이터(ex- ToppingStream) 역할을 한다.   

# 직렬화

객체를 컴퓨터에 저장했다가 다음에 다시 꺼내쓸 수 없을까?   
네트워크를 통해 컴퓨터 간에 서로 객체를 주고받을 수 없을까?   
있다! 직렬화(Serialization)가 가능하게 해준다.

직렬화가 뭘까? 객체를 데이터 스트림으로 만드는 것을 직렬화라고 한다. 객체에 저장된 데이터를 스트림에 쓰기위해 연속적인(serial) 데이터로 변환하는 것이다.  
반대로 스트림으로부터 데이터를 읽어서 객체를 만드는 것을 역직렬화(deserialization)라고 한다.

직렬화 시 변환되는 것은 필드들이고, 생성자 및 메소드는 직렬화에 포함되지 않는다. 필드 선언에 static, transient가 붙은 경우 직렬화 되지 않는다.    

&#9654; <b>ObjectInputStream, ObjectOutputStream</b>

직렬화(스트림에 객체를 출력) -> ObjectOutputStream
역직렬화(스트림으로부터 객체를 입력) -> ObjectInputStream

```java
ObjectInputStream(InputStream in)
ObjectOutputStream(OutputStream out)
```

둘 다 보조스트림이므로 입출력(직렬화/역직렬화) 스트림을 지정해주어야 한다.   

```java
FileOutputStream fos = new FileOutputStream("objectfile.ser");
ObjectOutputStream out = new ObjectOutputStream(fos);

out.writeObject(new UserInfo());
```

파일에 객체를 저장(직렬화)하고 싶다면 위와 같이 하면된다.   
+ objectfile.ser이라는 파일에 UserInfo 객체를 직렬화하여 저장한다.   
+ 출력할 스트림(FileOutputStream)을 생성해서 이를 기반스트림으로 하는 ObjectOutputStream을 생성한다.   
+ writeObject(Object obj)를 사용해서 객체를 출력하면, 객체가 파일에 직렬화되어 저장된다.

```java   
FileInputStream fis = new FileInputStream("objectfile.ser");
ObjectInputStream in = new ObjectInputStream(fis);

UserInfo info = (UserInfo)in.readObject();
```

+ 역직렬화도 마찬가지이다. writeObject() 대신 readObject()를 사용하여 읽으면된다.   
+ readObject()의 반환타입 -> Object 이므로 원래 타입으로 형변환이 필요하다.   

&#9654; <b>Serializable, transient</b>

직렬화가 가능한 클래스를 만드는 방법은 직렬화하고자 하는 클래스가 java.io.Serializable 인터페이스를 구현하도록 하면 된다.

```java
public class UserInfo implements Serializable {
    ...
}
```

클래스를 직렬화 가능하도록 하려면 위와같이 Serializable 인터페이스를 구현하면 된다.

```java
public interface Serializable {}
```

Serializable 인터페이스를 확인해보면 아무런 내용이 없는 빈 인터페이스인데 직렬화를 고려하여 작성한 클래스인지를 판단하는 기준이 된다.

```java
public class SuperUserInfo implements Serializable {
    String name;
    String password;
}

public class UserInfo extends SuperUserInfo {
    int age;
}
```

Serializable을 구현한 클래스를 상속받으면, Serializable을 구현하지 않아도 된다. 위의 예제에서는 UserInfo 는 SuperUserInfo를 상속받았으므로 UserInfo도 직렬화가 가능하다.

+ 조상인 name, password 도 함께 직렬화가 된다.   
+ 만약, SuperUserInfo에서 Serializable을 구현하지 않고 UserInfo에서만 구현했다면?   
  + name과 password는 직렬화 대상에서 제외된다.   

```java
public class UserInfo implements Serializable {
    String name;
    String password;
    int age;

    Object obj = new Object();      // Object는 직렬화 할 수 없다!
}
```

위의 클래스를 직렬화하면 java.io.NotSerializableException이 발생한다.  
그 이유는 직렬화 할 수 없는 Object 클래스를 인스턴스변수로 참조하고 있기 때문이다.

```java
public class UserInfo implements Serializable {
    String name;
    String password;
    int age;

    Object obj = new String("hello");   // String은 직렬화될 수 있다.
}
```

위의 클래스를 직렬화하면 이번에는 성공한다. 인스턴스변수 obj의 타입이 직렬화가 안되는 Object 이더라도 <b>실제로 저장된 객체는 직렬화가 가능한 String 인스턴스</b>이기 때문에 가능한것이다.

💡 인스턴스변수의 타입이 아닌 실제로 연결된 객체의 종류에 의해서 결정된다는 것!

```java
public class UserInfo implements Serializable {
    String name;
    transient String password;              // 직렬화 대상에서 제외
    int age;

    transient Object obj = new Object();    // 직렬화 대상에서 제외
}
```

직렬화하려는 객체의 클래스에 제어자 transient를 붙여서 직렬화 대상에서 제외시킬 수 있다. 그리고 transient가 붙은 인스턴스변수의 값은 그 타입의 기본값으로 직렬화된다.
-> UserInfo 객체를 역직렬화하면 참조변수인 obj와 password의 값은 null 이 된다.

이제 예제를 통해 직렬화를 해보자.

```java
public class UserInfo implements Serializable {
    String name;
    String password;
    int age;

    public UserInfo() {
        this("Unknown", "1111", 0);
    }

    public UserInfo(String name, String password, int age) {
        this.name = name;
        this.password = password;
        this.age = age;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", age=" + age +
                '}';
    }
}
```

직렬화 대상 테스트 클래스인 UserInfo를 만든다.

```java
public class SerialEx1 {
    public static void main(String[] args) {
        String fileName = "UserInfo.ser";

        try(FileOutputStream fos = new FileOutputStream(fileName);
            BufferedOutputStream bos = new BufferedOutputStream(fos);
            ObjectOutputStream out = new ObjectOutputStream(bos)) {

            UserInfo u1 = new UserInfo("Kim", "12345", 30);
            UserInfo u2 = new UserInfo("Lee", "3333", 20);

            ArrayList<UserInfo> list = new ArrayList<>();
            list.add(u1);
            list.add(u2);

            out.writeObject(u1);
            out.writeObject(u2);
            out.writeObject(list);

            System.out.println("직렬화 끝.");

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

위에서 만든 UserInfo 객체를 직렬화하여 파일(UserInfo.ser)에 저장하는 예제이다.
FileOutputStream을 기반으로 한 ObjectOutputStream을 생성 후, writeObject()를 이용해서 객체를 출력하면 UserInfo.ser 파일에 객체가 직렬화되어 저장된다.

```java
public class SerialEx2 {
    public static void main(String[] args) {

        String fileName = "UserInfo.ser";

        try(FileInputStream fis = new FileInputStream(fileName);
            BufferedInputStream bis = new BufferedInputStream(fis);
            ObjectInputStream in = new ObjectInputStream(bis)) {


            UserInfo u1 = (UserInfo) in.readObject();
            UserInfo u2 = (UserInfo) in.readObject();
            ArrayList<UserInfo> list = (ArrayList<UserInfo>) in.readObject();

            System.out.println(u1);
            System.out.println(u2);
            System.out.println(list);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
```

앞의 예제인 직렬화된 객체를 역직렬화하는 예제이다.

+ readObject()의 리턴타입이 Object이므로 원래의 타입으로 형변환을 해주어야 한다.   
+ 객체를 역직렬화 할 때는 직렬화 할 때의 순서와 일치해야한다.   

&#9654; <b>writeObject() , readObject() 메소드</b>

부모클래스가 Serializable 인터페이스를 구현하면 자식 클래스도 직렬화가 가능하다고 했다. 그런데 부모 클래스는 Serializable을 구현하지 않고 자식 클래스만 구현했다면?  
자식 클래스의 필드만 직렬화가된다.

만약, 이런 상황에서 부모 클래스의 필드도 직렬화하고 싶다면 어떻게 해야할까?
+ 부모 클래스가 Serializable 인터페이스를 구현
+ 자식 클래스에서 writeObject()와 readObject() 메소드를 선언해서 부모 객체의 필드를 직접 출력    

두 방법이 있는데, 첫번째가 좋겠지만 그럴 수 없는 상황이라면 두 번째 방법을 사용해야한다.

+ writeObject() -> 직렬화할 때 자동 호출   
+ readObject() -> 역직렬화할 때 자동 호출   

```java
private void writeObject(ObjectOutputStream out) throws IOEXception {
    // 부모 객체의 필드값을 출력
    out.writeXXX(부모필드);
    ...

    out.defaultWriteObject();       //  자식 객체의 필드값을 직렬화
}

private void readObject(ObjectInputStream in) throws IOEXception, ClassNotFoundException {
    // 부모 객체의 필드값을 입력
    부모필드 = in.readXXX();
    ...

    out.defaultWriteObject();       //  자식 객체의 필드값을 역직렬화
}
```

두 메소드의 선언 방법이다.
주의할 점은 접근 제한자가 private가 아니면 자동호출이 되지 않으므로 반드시 private으로 해야한다.

아래는 예제 코드이다.

```java
public class Parent {

    String field1;

}
```

```java
public class Child extends Parent implements Serializable {

    String filed2;

    private void writeObject(ObjectOutputStream out) throws IOException {
        out.writeUTF(field1);
        out.defaultWriteObject();
    }

    private void readObject(ObjectInputStream in) throws IOException, ClassNotFoundException {
        field1 = in.readUTF();
        in.defaultReadObject();
    }

}
```

&#9654; <b>직렬화 가능한 클래스의 버전관리</b>

+ 직렬화된 객체를 역직렬화할 때는 직렬화 했을 때와 같은 클래스를 사용해야한다.   
+ 클래스 이름이 같아도 클래스의 내용이 변경됐다면 역직렬화는 실패하고 에러가 발생한다.    

위에서 만든 UserInfo 클래스에 인스턴스 변수를 하나 추가해보자.

```java
public class UserInfo implements Serializable {

    double weight;

    ...
}
```

몸무게 weight 변수를 추가하였다.

위의 SerialEx2 예제인 역직렬화를 다시 실행시켜보면 직렬화 할 때와 역직렬화 할 때의 클래스의 버전이 다르다는 에러가 발생한다!  
객체가 직렬화될 때 클래스에 정의된 멤버들의 정보를 이용해서 serialVersionUID라는 클래스의 버전을 자동생성해서 직렬화 내용에 포함된다.  
그래서 역직렬화 할 때 클래스의 버전을 비교하고 직렬화할 때의 클래스의 버전과 일치하는지 비교할 수 있었고 에러가 발생한 것이다.

```java
public UserInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    ...

}
```

이렇게 클래스 내에 serialVersionUID를 정의해주면, 클래스의 내용이 바뀌어도 클래스의 버전이 자동생성된 값으로 변경되지 않는다.  
컴파일 후 다시 직렬화 -> 인스턴스변수 추가 -> 역직렬화를 진행하여도 에러없이 정상적으로 동작한다.

# 다이렉트와 논다이렉트 버퍼 비교

&nbsp;&nbsp;&nbsp;버퍼가 사용하는 메모리 위치에 따라 다이렉트와 넌다이렉트 버퍼로 분류할 수 있다

+ 다이렉트 버퍼 : 운영체제가 관리하는 메모리 공간을 이용하는 버퍼
+ 넌다이렉트 버퍼 : JVM이 관리하는 힙 메모리 공간을 이용하는 버퍼

|| 넌다이렉트 버퍼 | 다이렉트 버퍼|
|---|---|---|
| 사용하는 메모리 공간 | JVM의 힙메모리 | 운영체제의 메모리 |
| 버퍼 생성 시간 | 빠름 | 느림 |
| 버퍼 크기 | 작음 | 큼(큰 데이터 처리 시 유리) |
| 입출력 성능 | 낮음 | 높음(입출력이 빈번할 때 유리) |

&#9654; 성능 비교

```java
package week13;

import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


public class App {
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        try {
            // 파일 경로 지정
            Path path = Paths.get("C:\\output.txt");
            long size = Files.size(path);

            FileChannel fileChannel = FileChannel.open(path);

            // Non-Direct Buffer
            ByteBuffer nondirectbuffer = ByteBuffer.allocate((int) size);

            // Direct Buffer
            ByteBuffer directbuffer = ByteBuffer.allocateDirect((int) size);

            long start, end;

            start = System.nanoTime();

            for (int i = 0; i < 100; i++) {
                fileChannel.read(nondirectbuffer);
                nondirectbuffer.flip();
            }

            end = System.nanoTime();
            System.out.println("Non-Direct Buffer : " + (end - start) + " ns");

            start = System.nanoTime();

            for (int i = 0; i < 100; i++) {
                fileChannel.read(directbuffer);
                directbuffer.flip();

            }

            end = System.nanoTime();
            System.out.println("Direct Buffer : " + (end - start) + " ns");

            fileChannel.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

# 바이트버퍼

### java.nio

- 양방향 **Channel 방식**을 사용해 통로가 하나만 있으면 외부 데이터와 입출력 연동이 가능하다.
- 기본적으로 **버퍼(Buffer)**를 사용해 속도를 높였다
    - 커널 버퍼를 직접 사용하여 입출력 속도 향상도 가능하다
- **비동기 지원**
- **Non-Blocking** 지원

👉🏼 Java.nio.Path / Java.nio.Files 클래스

java.io에서는 File 클래스에서 경로와 파일을 다루는 기능이 모두 포함되어 있었는데 nio 부터 분리되었다. 또한, java.io.File 클래스와도 연동하여 사용할 수 있다.

<details>
  <summary>java.nio.file.Path 주요 메소드</summary>
  <br/>
  <p>

+ 생성자

```java
import java.nio.file.Path;
import java.nio.file.Paths;

public class Test {

		public static void main(String[] args) {
				Path dir1 = Paths.get("/home/sunwoo/temp/java/test.txt");
				Path dir2 = Paths.get("/home", "sunwoo", "temp", "java", "test.txt");
				System.out.println("dir1 = " + dir1);
				System.out.println("dir2 = " + dir2);
		}
}
```
</p>
<p>
java.nio.file.Paths 클래스의 `get()` static 메소드를 통해 생성하고, 폴더 구조는 한번에 주든 나눠서 주든 동일하다.

+ `String toString()` : 전체 경로 반환 (생략 가능)
+ `Path getRoot()` : Root 주소를 가진 Path 객체 생성
+ `Path getParent()` : 부모 주소를 가진 Path 객체 생성
+ `Path getName(int index)` : 인덱스 번호에 해당하는 주소를 가진 Path 객체 생성 (루트 다음부터 인덱스 0)
+ `int getNameCount()` : 루트 주소 다음부터 몇 개의 계층으로 이루어져 있는지 반환
+ `Path normalize()` : 정규화된 경로를 가진 Path 객체 생성
</p>

```java
public class App {
	public static void main(String[] args) {
		Path dir1 = Paths.get("/home/yesol/temp/java/test.txt");
		System.out.println("전체 경로 : " + dir1);

		Path root = dir1.getRoot();
		System.out.println("root = " + root);

		Path parent = dir1.getParent();
		System.out.println("parent = " + parent);

		System.out.println("dir1.getNameCount() = " + dir1.getNameCount());

		Path name = dir1.getName(0);
		System.out.println("name = " + name);

		Path name2 = dir1.getName(1);
		System.out.println("name2 = " + name2);

		Path normal = dir1.normalize();
		System.out.println("normal = " + normal);
	}
}
```

<p>
+ `Path resorve(String other)` : 매개변수로 받은 문자열을 가진 Path 객체 생성
+ `default File toFile()` : java.io.File 타입으로 변환 후 반환
+ `URI toUri()` : Path의 경로를 URI 객체로 변환 후 반환
</p>

```java
public class App {
	public static void main(String[] args) {
			Path dir = Paths.get("/home/sunwoo/temp/java/test.txt");
			Path dir2 = dir.resolve("/home/");

			System.out.println("dir2 = " + dir2);
	}
}
```

</details>
- java.nio.file.Files 주요 메소드

👉🏼 채널 생성 (**Channel**)

---

# 좋은 예제

# 채널을 활용한 채팅

&#9654; 서버

```java
package week13;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.nio.charset.Charset;

public class Server {
    static ServerSocketChannel serverSocketChannel = null;

    public static void main(String[] args) {
        try {
            serverSocketChannel = ServerSocketChannel.open();
            serverSocketChannel.configureBlocking(true);
            serverSocketChannel.bind(new InetSocketAddress(10000));

            while(true) {
                SocketChannel socketChannel = serverSocketChannel.accept();
                System.out.println("connected : " + socketChannel.getRemoteAddress());

                //클라이언트로 부터 입/출력받기
                Charset charset = Charset.forName("UTF-8");

                ByteBuffer byteBuffer = ByteBuffer.allocate(128);
                socketChannel.read(byteBuffer);
                byteBuffer.flip();
                System.out.println("received Data : " + charset.decode(byteBuffer).toString());

                byteBuffer = charset.encode("hello, My Client !");
                socketChannel.write(byteBuffer);
                System.out.println("Sending Success");
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
```

&#9654; 클라이언트

```java
package week13;

import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import java.nio.charset.Charset;

public class Client {
    static SocketChannel socketChannel = null;

    public static void main(String [] args) {
        try {
            //SocketChannel을 생성하고 몇 가지 설정을 한다.
            socketChannel = SocketChannel.open();
            socketChannel.configureBlocking(true);

            //서버 연결
            socketChannel.connect(new InetSocketAddress("localhost",10000));

            Charset charset = Charset.forName("UTF-8");

            //서버에 입출력
            ByteBuffer byteBuffer = charset.encode("Hello Server !");
            socketChannel.write(byteBuffer);

            byteBuffer = ByteBuffer.allocate(128);
            socketChannel.read(byteBuffer);
            byteBuffer.flip();
            System.out.println("received Data : " + charset.decode(byteBuffer).toString());


            //소켓닫기
            if(socketChannel.isOpen()) {
                socketChannel.close();
            }

        }catch(Exception e) {
            e.printStackTrace();
        }
    }
}
```

---
**Reference**
+ <https://www.notion.so/I-O-af9b3036338c43a8bf9fa6a521cda242>
+ <https://bingbingpa.github.io/java/whiteship-live-study-week13>
+ <https://github.com/kyu9/WS_study/blob/master/week13.md>
+ <https://velog.io/@jaden_94/13주차-항해일지-IO>
+ <https://alkhwa-113.tistory.com/entry/IO>
+ <https://watrv41.gitbook.io/devbook/java/java-live-study/13_week>
+ <https://github.com/mongzza/java-study/blob/main/study/13%EC%A3%BC%EC%B0%A8.md>
+ <https://www.notion.so/I-O-094fb5c7f8fa41fcb9876586ed3d92db>
