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

&nbsp;&nbsp;&nbsp;어느덧 스터디를 시작한지 3개월이 되었다. 알게 모르게 실력이 조금씩 쌓였다고 느껴질 때가 있는데, 현업자분들의 대화를 볼 때 이 전에는 몰랐을 법한 대화가 조금이나마 이해가 된다던가 할 때가 종종 있다.

매 주차 라이브 방송을 보면서 새로운 것을 배우게 되고, 공부법에 대해 다시 생각해보게 되는 경우가 많아서 좋다. 옳다 그르다가 아닌 이러한 방법도 있다는 것을 알게 되고 다른 분들이 작성한 글을 보면서 부족했던 부분을 채우면서 공부하는 과정이 즐겁다.

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

&nbsp;&nbsp;&nbsp;예외는 메서드의 파라미터나 반환 값만큼이나 중요한 공용 인터페이스 중 하나이다.

메서드를 호출하는 쪽은 그 메서드가 어떤 예외를 발생시킬 수 있는가에 대해 반드시 알아야 한다. 따라서 Java는 checked exception을 통해 해당 메서드가 발생시킬 수 있는 예외를 명시적으로 처리하도록 강제하고 있다.

그럼 Runtime Exception은 왜 예외를 명시적으로 처리하지 않아도 되는가? Runtime Exception은 프로그램 코드의 문제로 발생하는 예외이다. 따라서 클라이언트(메서드를 호출하는 쪽)가 이를 복구하거나 대처할 수 있을 거라고 예상하긴 어렵다. 또 Runtime Exception은 프로그램 어디서나 매우 빈번하게 발생할 수 있기 때문에 모든 Runtime Exception을 메서드에 명시하도록 강제하는 것은 프로그램의 명확성을 떨어뜨릴 수 있다.

따라서 클라이언트가 exception을 적절히 회복할 수 있을 것이라고 예상되는 경우 checked exception으로 만들고, 그렇지 않은 경우 unchecked exception으로 만드는 것이 좋다.

# 예외 발생 시 롤백하지 않음? 이게 무슨 말인가!

## Unchecked Exception 오해
`Springframework`에서는 `Transaction`설정과 관련하여 `Unchecked Exception`에 대해 `roll-back`기능을 지원합니다. 하지만 이는 `Springframework`의 `transaction`설정이 제공하는 것이지, 순수 자바 언어에서 지원하는 것이 아닙니다. 이 기능은 `springframework`가 구현한 기능일뿐, **`java`가 제공해주는 `Unchecked Exception`은 `roll-back` 기능이 없습니다.** 따라서 이를 `java`에서 제공해준다고 알고 있지 않기를 바랍니다.

> [Springframework 공식 문서](https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#transaction-declarative-attransactional-settings)

**아래 `H2`를 이용한 순수 자바 sql 문의 예시를 보면 어떤 예외든지 `java`에서 제공하는 예외는 `roll-back` 처리를 해주지 않는것을 알 수 있습니다.**

```java
public class Example {
  public static void main(String[] args) throws SQLException {
    String url = "jdbc:h2:mem:";
    Connection con = DriverManager.getConnection(url);
    con.setAutoCommit(false); // auto commit을 비활성화 합니다.

    try (Statement stm = con.createStatement()) {
      stm.execute("CREATE TABLE TEST (id INTEGER not NULL, value VARCHAR(255), PRIMARY KEY(id))");
      Example.insert(con, 1, "test1"); // test1 데이터를 추가

      Example.createRuntimException(); // 런타임 예외 발생

      Example.insert(con, 2, "test2");
      con.commit();
    } catch (SQLException ex) {
      System.out.println(ex);
    } catch (RuntimeException e) {
      System.out.println("RuntimeException 발생");
      //con.rollback();  // 만약 여기에 주석을 지우고 rollback을 호출한다면 test1이 입력되지 않습니다.
    } catch (Exception exception) {
      System.out.println("Exception 발생");
    }

    try (Statement stm = con.createStatement(); ResultSet rs = stm.executeQuery("SELECT * FROM TEST")) {
      while (rs.next()) {
        String value = rs.getString("value");
        System.out.println("Value: " + value); // test1이 출력됩니다.
      }
    } catch (SQLException ex) {
      System.out.println(ex);
    } catch (RuntimeException e) {
      System.out.println("RuntimeException 발생");
    } catch (Exception exception) {
      System.out.println("Exception 발생");
    }

    try {
      con.close();
    } catch (SQLException ex) {
      System.out.println(ex);
    }
  }

  public static void insert(Connection con, int id, String value) throws SQLException {
    final String query = "INSERT INTO TEST VALUES (" + id + ", '" + value + "')";
    con.prepareStatement(query).executeUpdate();
  }

  public static void insert(Statement stm, int id, String value) throws SQLException {
    stm.execute("INSERT INTO TEST VALUES (" + id + ", '" + value + "')");
  }

  public static void createRuntimException() {
    throw new RuntimeException();
  }

  public static void createException() throws Exception {
    throw new Exception();
  }
}
```

> 구현된 코드는 [[Github - 소스코드]](https://github.com/ByungJun25/study/tree/main/java/whiteship-study/9week/java/src/main/java/com/bj25/study/java/exceptions/h2example)에서 보실 수 있습니다.

# 예외를 계속 떠넘기다가 main에서 마저 떠넘기면 JVM이 동작한다던데?

결론은 그냥 에러를 던지고 Thread가 종료된다.

# 추가 학습

# try-with-resource

try-with-resource를 디컴파일 해보면 신기한 것을 볼 수 있다.

그 전에 try-with-resource를 사용한 후에 finally를 추가해도 동작한다. finally가 중복이 되서 안되야 하는데 왜 될까?

사실 finally가 아니라 catch(Throwable e)블럭이 추가되기 때문이다!

우리 생각에는 마치 finally 블럭에서 close를 해준다고 생각했지만, 실제로는 catch 블럭 중에서도 가장 큰 Throwable을 가진 catch블럭이 처리해주는 것이다.

# 커스텀 예외를 만들 때 참고해야할 4가지

## 1. Always Provide a Benefit

&nbsp;&nbsp;&nbsp;자바 표준 예외들에는 다양한 장점을 가지는 기능들이 포함되어 있다.

이미 JDK가 제공하고 있는 방대한 양의 예외들과 비교했을 때 만들고자 하는 커스텀 예외가 어떠한 장점도 제공하지 못한다면?  
커스텀 예외를 만드는 이유를 다시 생각해 볼 필요가 있다.

어떠한 장점을 제공할 수 없는 예외를 만드는 것 보다 오히려 UnsupportedOperationException이나, IllegalArgumentException과 같은 표준 예외 중 하나를 사용하는 것이 낫다.

## 2. Follow the Naming Convention

&nbsp;&nbsp;&nbsp;JDK가 제공하는 예외 클래스들을 보면 클래스의 이름이 모두 "Exception"으로 끝나는 것을 알 수 있다. 이러한 네이밍 규칙은 자바 생태계 전체에 사용되는 규칙이다.

즉, 만들고자 하는 커스텀 예외 클래스들도 이러한 네이밍 규칙을 따르는 것이 좋다.

## 3. Provide javadoc Comments for Your Exception Class

&nbsp;&nbsp;&nbsp;많은 커스텀 예외들이 어떠한 javadoc 코멘트도 없이 만들어진 경우가 있다.

기본적으로 API의 모든 클래스, 멤버변수, 생성자에 대해서 문서화 하는 것이 Best Practices이다. 잘 알겠지만 문서화되지 않은 API들은 사용하기 매우 어렵다.

예외 클래스들은 API에 크게 드러나지 않는 부분일 수 있으나 사실상 그렇지 않다. 클라이언트와 직접 관련된 메소드들 중 하나가 예외를 던지면 그 예외는 바로 예외의 일부가 된다. 그렇다는 것은 잘 만들어진 JavaDoc와 문서화가 필요하다는 뜻이다.

JavaDoc은 예외가 발생할 수도 있는 상황과 예외의 일반적인 의미를 기술한다. 목적은 다른 개발자들이 API를 이해하고 일반적인 에러 상황들을 피하도록 돕는 것이다.

```java
    /**
    * The MyBusinessException wraps all checked standard Java exception and enriches them with a custom error code.
    * You can use this code to retrieve localized error messages and to link to our online documentation.
    *
    * @auther TJanssen
    */
    public class MyBusinessException extends Exception { ... }
```

## 4. Provide a Constructor That Sets the Cause

&nbsp;&nbsp;&nbsp;커스텀 예외를 던지기 전에 표준 예외를 Catch하는 케이스가 꽤 많다. 이 사실을 꼭 기억하도록 하자.

보통 캐치된 예외에는 제품에 발생한 오류를 분석하는데 필요한 중요한 정보가 포함되어 있다.  
예제를 보면 NumberFormatException은 에러에 대한 상세정보를 제공한다.  
MyBusinessException의 cause처럼 cause정보를 설정하지 않으면 중요한 정보를 잃을 수 있다.

```java
public void wrapException(String input) throws MyBusinessException {
    try {
        // do something
    } catch (NumberFormatException e) {
        throw new MyBusinessException("A message that describes the error.", e, ErrorCode.INVALID_PORT_CONFIGURATION);
    }
}
```

# 예외처리의 비용

```java
public Throwable(String message) {
    fillInStackTrace();
    detailMessage = message;
}
```

위 코드는 Throwable 클래스의 생성자이다.

보통 예외처리는 처리비용이 비싸다고 한다. try-catch를 동작하면서 발생하는 검사들도 하나의 원인이겠지만, Throwable 생성자의 fillInStackTrace() 메서드가 주 원인이다. 이 메서드는 예외가 발생한 메서드의 Stack Trace를 모두 출력해주기 때문이다.

<b>StackTrace</b>란 Application이 실행된 시점부터 현재 실행 위치까지의 메서드 호출 목록이다.

커스텀 예외에서 이 메서드를 오버라이딩해 StackTrace를 최소화 해줄 수 있다.

```java
    @Override
    public synchronized Throwable fillInStackTrace() {
        return this;
    }
```

~~하지만 굳이 비용을 아끼겠다고 사용할 일이...~~

# 기본적으로 제공하는 RuntimeException들

## Built-in Exceptions in Java with examples

Java libraries에서 제공하는 기본 Exception 들을 다양한 예와 함께 살펴보겠습니다.

1. Arithmetic exception  
산술 연산에서 예외 조건이 발생했을 때 발생합니다.

```java
class ArithmeticException_Demo {
public static void main(String args[]) {
        try {
            int a = 30, b = 0;
            int c = a / b; // cannot divide by zero
            System.out.println("Result = " + c);
        } catch (ArithmeticException e) {
            System.out.println("Can't divide a number by 0"); // expected output
        }
    }
}
```
2. ArrayIndexOutOfBounds Exception  
잘못된 인덱스로 Array에 액세스했을 때 발생합니다. 인덱스가 음수이거나 배열 크기보다 크거나 같을 때 입니다.

```java
class ArrayIndexOutOfBound_Demo {
public static void main(String args[]) {
        try {
            int a[] = new int[5];
            a[6] = 9; // accessing 7th element in an array of
            // size 5
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array Index is Out Of Bounds"); // expected output
        }
    }
}
```

3. ClassNotFoundException  
정의한 클래스를 찾을 수 없을 때 발생하는 예외입니다.

```java
public static void main(String[] args) {
        Object o = class.forName(args[0]).newInstance();
        System.out.println("Class created for" + o.getClass().getName());
    }
}
```

4. FileNotFoundException  
이 예외는 파일에 액세스할 수 없거나 열리지 않을 때 발생합니다.

```java
public static void main(String args[]) {
        try {
            // Following file does not exist
            File file = new File("E:// file.txt");

            FileReader fr = new FileReader(file);
        } catch (FileNotFoundException e) {
            System.out.println("File does not exist");
        }
    }
}
```

5. IOException  
입출력 작업이 실패하거나 중단될 때 발생합니다.

```java
public static void main(String args[]) {
        FileInputStream f = null;
        f = new FileInputStream("abc.txt");
        int i;

        while ((i = f.read()) != -1) {
            System.out.print((char)i);
        }

        f.close();
    }
}
```

6. InterruptedException  
Thread가 waiting, sleeping 또는 어떤 처리를 하고 있을 때 interrupt가 되면 발생하는 예외입니다.

```java
static class TestInterruptingThread extends Thread {
    public void run() {
        try {
            Thread.sleep(1000);
            System.out.println("task");
        } catch(InterruptedException e){
            System.out.println("Exception handled "+e);
        }

        System.out.println("thread is running...");
    }
}

public static void main(String[] args) {
        TestInterruptingThread t1= new TestInterruptingThread();
        t1.start();
        t1.interrupt();
}
```

7. NoSuchMethodException  
찾을 수 없는 메서드에 액세스할 때 이 예외가 발생합니다.

```java
public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException {
     Class c = Class.forName("NoSuchMethodExceptionTest");

     c.getDeclaredMethod("test");
}
```

8. NullPointerException  
이 예외는 null 객체의 멤버를 참조할 때 발생합니다.

```java
public static void main(String args[]) {
        try {
            String a = null; // null value
            System.out.println(a.charAt(0));
        }
        catch (NullPointerException e) {
            System.out.println("NullPointerException..");
        }
    }
}
```

9. NumberFormatException  
메서드가 문자열을 숫자 형식으로 변환할 수 없는 경우 이 예외가 발생합니다.

```java
public static void main(String args[]) {
        try {
            // "test" is not a number
            int num = Integer.parseInt("test");

            System.out.println(num);
        } catch (NumberFormatException e) {
            System.out.println("Number format exception");
        }
    }
}
```

10. StringIndexOutOfBoundsException  
문자열에 엑세스 하는 인덱스가 문자열보다 큰 경우거나 음수일 때 발생하는 예외입니다.

```java
public static void main(String args[]) {
        try {
            String a = "This is like chipping "; // length is 22
            char c = a.charAt(24); // accessing 25th element
            System.out.println(c);
        } catch (StringIndexOutOfBoundsException e) {
            System.out.println("StringIndexOutOfBoundsException");
        }
    }
}
```

# 예외처리 전략

# Anti 패턴. finally에 return문이 있는 경우

+ finally 안에서 return을 하는 경우에는 신중해야 한다.
  + <b>try 안에 return</b> : finally 블록을 거쳐 정상 실행
  + <b>catch 안에 return</b> : finally 블록을 거쳐 정상 실행
  + <b>finally 안에 return</b> : try 블록 안에서 발생한 예외 무시되고 finally 거쳐 정상 종료(예외를 알 수 없음)


&#9654; try 블록 안에 return

```java
public class Print {
    public String strongStringPrint(String name) {

        String str;

        try {
            StringBuilder sb = new StringBuilder();
            sb.append("*");
            sb.append(name);
            sb.append("*");
            str = "try pass";
            System.out.println(str);
            return sb.toString();
        } catch (Exception e) {
            str = "catch pass";
            System.out.println(str);
            return str;
        } finally {
            str = "finally pass";
            System.out.println(str);
        }
    }
    public static void main(String[] args) {
        Print p = new Print();
        System.out.println("정상 결과: " + p.strongStringPrint("study"));
    }
}
```

&#9654; 예외 발생 상황에서 catch 블록 안에 return이 있는 경우

```java
public class Print {
    public String strongStringPrint(String name) {

        String str;

        try {
            StringBuilder sb = new StringBuilder();
            sb.append("*");
            sb.append(name);
            sb.append("*");
            str = "try pass";
            System.out.println(str);
            throw new Exception(); // 예외 발생
        } catch (Exception e) {
            str = "catch pass";
            System.out.println(str);
            return str;
        } finally {
            str = "finally pass";
            System.out.println(str);
        }
    }
    public static void main(String[] args) {
        Print p = new Print();
        System.out.println("정상 결과: " + p.strongStringPrint("study"));
    }
}
```

&#9654;finally에 return이 존재하는 경우

```java
public class Print {
    public String strongStringPrint(String name) {

        String str;

        try {
            StringBuilder sb = new StringBuilder();
            sb.append("*");
            sb.append(name);
            sb.append("*");
            str = "try pass";
            System.out.println(str);
            return sb.toString();
        } catch (Exception e) {
            str = "catch pass";
            System.out.println(str);
            return str;
        } finally {
            str = "finally pass";
            System.out.println(str);
            return "finally";
        }
    }
    public static void main(String[] args) {
        Print p = new Print();
        System.out.println("정상 결과: " + p.strongStringPrint("study"));
    }
}
```

&#9654;예외 발생 케이스

```java
public class Print {
    public String strongStringPrint(String name) {

        String str;

        try {
            StringBuilder sb = new StringBuilder();
            sb.append("*");
            sb.append(name);
            sb.append("*");
            str = "try pass";
            System.out.println(str);
            throw new Exception(); // 예외 발생
        } catch (Exception e) {
            str = "catch pass";
            System.out.println(str);
            return str;
        } finally {
            str = "finally pass";
            System.out.println(str);
            return "finally";
        }
    }
    public static void main(String[] args) {
        Print p = new Print();
        System.out.println("정상 결과: " + p.strongStringPrint("study"));
    }
}
```

finally 블록의 return 사용은 예상치 못하는 결과를 가져올 수 있다.

---
**Reference**
+ <https://wisdom-and-record.tistory.com/46>
+ <https://catch-me-java.tistory.com/46>
+ <https://www.notion.so/3565a9689f714638af34125cbb8abbe8>
+ <https://leegicheol.github.io/whiteship-live-study/whiteship-live-study-09-exception-handling/>
+ <https://velog.io/@youngerjesus/%EC%9E%90%EB%B0%94-%EC%98%88%EC%99%B8-%EC%B2%98%EB%A6%AC>
+ <https://blog.baesangwoo.dev/posts/java-livestudy-9week/>
+ <https://www.notion.so/9-17a778bba6ed4436ac3d7b9415b6babb>
+ <https://github.com/ByungJun25/study/tree/main/java/whiteship-study/9week>
