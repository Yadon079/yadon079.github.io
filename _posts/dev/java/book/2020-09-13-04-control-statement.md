---
layout: post
date: 2020-09-13 14:28:00
title: "조건문과 반복문 if, switch, for, while statement"
description: "자바의 정석"
subject: java의 정석
category: [ java ]
tags: [ java, control statement]
comments: true
---

# 조건문과 반복문

> 이 글은 남궁성님의 [자바의 정석 3/e](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788994492032)을 기반으로 공부한 내용을 정리한 글입니다.

+ [조건문](#조건문-if-switch)
+ [반복문](#반복문-for-while-do-while)

## 조건문 if switch

코드의 실행흐름은 무조건 위에서 아래로 한 문장씩 순차적으로 진행된다. 하지만 조건에 따라 문장을 건너뛰고, 같은 문장을 반복해서 수행해야할 때가 있다. 이렇게 프로그램의 흐름(flow)를 바꾸는 역할을 하는 문장들을 <b>제어문</b>(`control statement`)라고 한다.

제어문 중에서 조건에 따라 다른 문장이 수행되도록 하는 문장을 <b>조건문</b>이라고 한다.

### 1.1 if문

`if`문은 가장 기본적인 조건문이며, '조건식'과 '괄호 {}'로 이루어져 있다. `if`의 뜻은 '만일 ~ 이라면...'이므로 <b>'만일(if) 조건식이 참(true)이면 괄호 { }안의 문장들을 수행하라.'</b>라는 의미이다.

```java
  if(조건식) {
    // 조건식이 true일 때 수행될 문장
  }
```
<p style="color:#a0adec"><b>조건식</b></p>

`if`문에 사용되는 조건식은 일반적으로 비교연산자와 논리연산자로 구성된다. 조건식을 작성할 때 등가비교 연산자 대신 대입 연산자를 사용하는 실수를 하기 쉽다. 조건식의 결과는 항상 `true` 또는 `false`이어야 한다.

<p style="color:#a0adec"><b>블럭 { }</b></p>

괄호 `{ }`를 이용해서 여러 문장을 하나의 단위로 묶을 수 있는데, 이것을 '블럭(block)'이라고 한다. 블럭은 `{`로 시작해서 `}`로 끝나는데, `}` 다음에 문장의 끝을 의미하는 `;`를 붙이지 않는다.

블럭 안에는 보통 여러 문장을 넣지만, 한 문장만 넣거나 아무런 문장도 넣지 않을 수 있다. 블럭 내의 문장이 하나뿐 일 때는 괄호를 생략할 수 있다. 한 줄로 쓸 수도 있다.

### 1.2 if-else문

`if`문의 변형인 `if-else`문은 `if`문에 `else`블럭이 추가된 것이다. `else`는 '그 밖의 다른'이라는 뜻으로 조건식의 결과가 거짓일 때 `else`블럭의 문장을 수행하라는 뜻이다.

```java
  if(조건식) {
    // 조건식이 참일 경우 수행될 문장들
  } else {
    // 조건식이 거짓일 경우 수행될 문장들
  }
```

조건식의 결과에 따라 두 개 중 하나의 블럭의 내용이 수행되고 전체 `if`문에서 벗어나게 된다. 두 블럭 모두 수행되거나 아무것도 수행되지 않는 경우는 없다.

두 개의 `if`문을 항상 `if-else`문으로 바꿀 수 있는 것이 아니라 두 조건식이 서로 상반된 관계에 있어야만 바꿀 수 있다.

`if-else`문 역시 블럭 내의 문장이 하나뿐인 경우 괄호를 생략할 수 있다.

### 1.3 if-else if문

`if-else`문은 두 가지 경우 중 하나가 수행되는 구조이다. 처리해야할 경우가 셋 이상일 때는 한 문장에 여러 개의 조건식을 쓸 수 있는 `if-else if`문을 사용한다.

```java
  if(조건식 1) {
    // 조건식 1의 연산결과가 참일 때 수행될 문장
  } else if(조건식 2) {
    // 조건식 2의 연산결과가 참일 때 수행될 문장
  } else if(조건식 3) {
    // 조건식 3의 연산결과가 참일 때 수행될 문장
  } else {
    // 위의 어느 조건식도 만족하지 않을 때 수행될 문장
  }
```

`else if`는 여러 개 사용할 수 있고, 마지막 `else`는 생략할 수 있다.

`if-else if` 역시 여러 개의 `if`문을 합쳐 놓은 것이지만, 조건식을 바꾸지 않고 `if`문으로 쪼개놓으면 전혀 다른 코드가 된다.

### 1.4 중첩 if문

`if`문 블럭 내에 또 다른 `if`문을 포함시키는 것이 가능한데, 이를 <b>중첩 `if`문</b>이라고 부르며 중첩 횟수에는 거의 제한이 없다.

```java
  if(조건식 1) {
    // 조건식 1의 연산결과가 true일 때
    if(조건식 2) {
      // 조건식 1과 조건식 2 모두 true일 때
    } else {
      // 조건식 1은 true, 조건식 2는 false일 때
    }
  } else {
    // 조건식 1이 false일 때
  }
```

내부 `if`문은 외부 `if`문보다 안쪽으로 들여쓰기를 해서 범위가 구분되도록 해야 한다.

괄호가 생략되었을 경우 `else`는 가까운 `if`문에 속한 것으로 간주되기 때문에 중첩 `if`문에서는 괄호를 넣어서 관계를 확실히 해주는 것이 좋다.

### 1.5 switch문

`if`문은 조건식의 결과가 참과 거짓 두 가지 밖에 없기 때문에 경우의 수가 많아질수록 복잡해지고, 처리시간도 많이 걸린다.

`switch`문은 단 하나의 조건식으로 많은 경우의 수를 처리할 수 있고, 표현도 간결해 알아보기 쉽다. 단, 제약조건이 있기 때문에, 경우의 수가 많아도 어쩔 수 없이 `if`문으로 작성해야하는 경우가 있다.

`switch`문은 조건식을 먼저 계산한 다음, 결과와 일치하는 `case`문으로 이동한다. 이동한 `case`문 아래에 있는 문장들을 수행하며, `break`문을 만나면 전체 `switch`문을 빠져나가게 된다.

<span style="font-size:18px">&#10112;</span> 조건식을 계산한다.
<span style="font-size:18px">&#10113;</span> 조건식의 결과와 일치하는 `case`문으로 이동한다.
<span style="font-size:18px">&#10114;</span> 이후의 문장들을 수행한다.
<span style="font-size:18px">&#10115;</span> `break`문이나 `switch`문의 끝을 만나면 `switch`문 전체를 빠져나간다.

```java
  switch(조건식) {
    case 값1 :
      // 조건식의 결과 == 값 1
      break;
    case 값2 :
      // 조건식의 결과 == 값 2
      break;
    ...
    default :
      // 조건식의 결과와 일치하는 case문이 없을 때
  }
```

만일 조건식의 결과와 일치하는 `case`문이 하나도 없는 경우에는 `default`문으로 이동한다. 보통 마지막에 놓기 때문에 `break`문을 쓰지 않아도 된다.

`break`문은 각 `case`문의 영역을 구분하는 역할을 하는데, 생략하게되면 `case`문 사이의 구분이 없어져 다른 `break`문을 만나거나 `switch`문 블럭의 끝을 만날 때까지 나오는 모든 문장을 수행한다. 따라서 각 `case`문의 마지막에 `break`문을 빼먹지 않도록 해야한다.

경우에 따라 고의적으로 `break`문을 생략하는 경우도 있다.

```java
  switch (level) {
    case 3 :
      grantDelete(); // 삭제권한
    case 2 :
      grantWrite(); // 쓰기권한
    case 1 :
      grantRead(); // 읽기권한
  }
```

<span style="font-size:13px;">
<b>| 참고 | 위 코드는 사용자에게 각 권한을 주는 기능의 grantRead(), grantWrite(), grantDelete()가 존재한다는 가정 하에 작성되었다.</b><br/>
</span>  

로그인한 사용자의 등급(level)을 체크하여, 등급에 맞게 권한을 부여하는 방식이다. 제일 높은 등급인 3은 모든 권한을 가지고, 제일 낮은 등급인 1은 읽기 권한만 가지게 된다. 예를 들어 값이 2인 경우, `case 2`로 이동해서 문장을 수행한다. `break`문이 없기 때문에 `case 1`까지 수행하고 더 이상 문장이 없으므로 `switch`문을 빠져나온다.

<p style="color:#a0adec"><b>switch문의 제약조건</b></p>

switch문의 조건식은 결과값이 반드시 정수이어야 하며, 이 값과 일치하는 `case`문으로 이동하기 때문에 `case`문의 값은 정수이고 중복되지 않아야 한다. 또한 `case`문의 값은 반드시 상수이어야 한다. 변수나 실수, 문자열은 값으로 사용할 수 없다.

> <p style="font-size:15px"><b>switch문의 제약조건</b><br/>1. switch문의 조건식 결과는 정수 또는 문자열이어야 한다.<br/>2. case문의 값은 정수 상수만 가능하며, 중복되지 않아야 한다.</p>

<span style="font-size:13px;">
<b>| 참고 | JDK1.7이전에는 switch문의 조건식에 문자열이 허용되지 않았다.</b><br/>
</span>  

<p style="color:#a0adec"><b>switch문의 중첩</b></p>

`if`문처럼 `switch`문도 중첩이 가능하다. `break`문을 빼먹지 않도록 주의해야한다.

```java
import java.util.*;

class Flow {
  public static void main(String[] args) {
    System.out.print("당신의 주민번호를 입력해주세요. >");

    Scanner sc = new Scanner(System.in);
    String regNo = sc.nextLine();
    char gender = regNo.charAt(7);

    switch(gender) {
      case '1' : case '3' :
        switch(gender) {
          case '1' :
            System.out.println("2000년 이전 출생 남자입니다.");
            break;
          case '3' :
            System.out.println("2000년 이후 출생 남자입니다.");
        }
        break;
      case '2' : case '4' :
        switch(gender) {
          case '2' :
            System.out.println("2000년 이전 출생 여자입니다.");
            break;
          case '4' :
            System.out.println("2000년 이후 출생 여자입니다.");
        }
        break;
      default :
        System.out.println("유효하지 않은 주민번호입니다.");
    }
  }
}
```

[위로](#조건문과-반복문)

## 반복문 for while do-while

반복문은 어떤 작업이 반복적으로 수행되도록 할 때 사용되며, 반복문의 종류로는 `for`문, `while`문, 그리고 `while`문의 변형인 `do-while`문이 있다.

`for`문이나 `while`문에 속한 문장은 조건에 따라 한 번도 수행되지 않을 수 있지만, `do-while`문은 최소 한 번의 수행을 보장한다. 반복문은 주어진 조건을 만족하는 동안 반복 수행하므로 조건문을 포함하며, 조건식이 true이면 참, false이면 거짓로 간주한다.

`for`문과 `while`문은 구조와 기능이 유사하여 어느 경우에나 서로 변환이 가능하다.

### 2.1 for문

`for`문은 주로 반복 횟수를 알고 있을 때 적합하다. 구조가 조금 복잡하지만 직관적이라 오히려 이해하기 쉽다.

```java
  for(int i = 1; i <= 5; i++) {
    System.out.println("I can do it");
  }
```

변수 `i`에 1을 저장한 다음, 매 반복마다 `i`의 값을 1씩 증가시킨다. 그러다가 `i`의 값이 5를 넘으면 조건식 `i <= 5`가 거짓이 되어 반복을 마친다. `i`의 값이 1부터 5까지 1씩 증가하므로 5번 반복한다.

<p style="color:#a0adec"><b>for문의 구조와 수행순서</b></p>

`for`문은 '초기화', '조건식', '증감식', '블럭 { }' 모두 4부분으로 이루어져 있으며, 조건식이 참인 동안 블럭 내의 문장들을 반복하다 거짓이 되면 반복문을 벗어난다.

```java
  for(초기화; 조건식; 증감식) {
    // 조건식이 참일 때
  }
```

<span style="font-size:13px;">
<b>| 참고 | 반복하려는 문장이 단 하나일 때는 괄호 { }를 생략할 수 있다.</b><br/>
</span>  

<p style="color:#a0adec"><b>초기화</b></p>

반복문에 사용될 변수를 초기화하는 부분이며 처음에 한번만 수행된다. 보통 변수 하나로 `for`문을 제어하지만, 둘 이상의 변수가 필요할 때는 콤마 `,`를 구분자로 변수를 초기화하면 된다. 단, 두 변수의 타입은 같아야 한다.

<p style="color:#a0adec"><b>조건식</b></p>

조건식의 값이 `true`면 반복을 계속하고 `false`면 반복을 중단하고 for문을 벗어난다. `for`의 뜻이 '~하는 동안'이므로 조건식이 '참인 동안' 반복을 계속한다고 생각하면 된다.

조건식을 잘못 작성하면 블럭 { } 내의 문장이 한 번도 수행하지 않거나 영원히 반복되는 무한반복에 빠지기 쉬우니 주의해야 한다.

<p style="color:#a0adec"><b>증감식</b></p>

반복문을 제어하는 변수의 값을 증가 또는 감소시키는 식이다. 매 반복마다 변수의 값이 증감식에 의해서 변하다가 조건식이 거짓이 되면서 `for`문을 벗어나게 된다. 변수의 값을 1씩 증가시키는 연산자 `++`이 증감식에 주로 사용된다.

증감식도 쉼표를 이용해서 두 문장 이상을 하나로 연결해서 쓸 수 있다.

<p style="color:#a0adec"><b>중첩 for문</b></p>

`for`문 안에 또 다른 `for`문을 포함시키는 것이 가능하다. 그리고 중첩의 횟수는 거의 제한이 없다.

```java
class Flow {
  public static void main(String[] args) {
    for(int i = 1; i <= 5; i++) {
      for(int j = 1; j <= 10; j++) {
        System.out.print("*");
      }
      System.out.println();
    }
  }
}
```

중첩 `for`문의 예제로 대표적인 별을 찍는 예제이다. 위의 예제는 사각형 모양의 별이 출력되는데 삼각형 모양의 별을 출력하는 예제는 다음과 같다.

```java
class Flow {
  public static void main(String[] args) {
    for(int i = 0; i < 5; i++) {
      for(int j = 0; j <= i; j++) {
        System.out.print("*");
      }
      System.out.println();
    }
  }
}
```

사각형일 때와 다르게 조건식에 숫자 대신 변수 `i`를 넣고 `i`값이 증가하는 `for`문 안에 넣었다.

<p style="color:#a0adec"><b>향상된 for문(enhanced for statement)</b></p>

JDK 1.5부터 배열과 컬렉션에 저장된 요소에 접근할 때 기존보다 편리한 방법으로 처리할 수 있도록 for문의 새로운 문법이 추가되었다.

```java
  for(타입 변수명 : 배열 또는 컬렉션) {
    // 반복할 문장
  }
```

타입은 배열 또는 컬렉션의 요소의 타입이어야 한다. 배열 또는 컬렉션에 저장된 값이 매 반복마다 하나씩 순서대로 읽혀서 변수에 저장된다. 반복문의 괄호 { }내에서는 이 변수를 사용해서 코드를 작성한다.

향상된 `for`문은 `for`문보다 간결하나, 배열이나 컬렉션에 저장된 요소들을 읽어오는 용도로만 사용할 수 있다.

### 2.2 while문

`for`문에 비해 `while`문은 구조가 간단하다. `if`문처럼 조건식과 블럭 { }만으로 이루어져 있다. 다만 `if`문과 달리 `while`문은 조건식이 `true`인 동안, 즉 조건식이 거짓이 될 때까지 블럭 내의 문장을 반복한다.

```java
  while(조건식) {
    // 조건식의 연산결과가 true인 동안
  }
```

`while`문은 먼저 조건식을 평가해서 조건식이 거짓이면 문장 전체를 벗어나고, 참이면 블럭 { } 내의 문장을 수행하고 다시 조건식으로 돌아간다. 거짓이 될 때까지 계속 반복된다.

<p style="color:#a0adec"><b>for문과 while문의 비교</b></p>

1부터 10까지의 정수를 순서대로 출력하는 `for`문과 `while`문을 비교했다.

```java
  for(int i = 1; i < 11; i++) {
    System.out.println(i);
  }
```

```java
  int i = 1;

  while(i < 11) {
    System.out.println(i);
    i++;
  }
```

위의 두 코드는 동일하다. `for`문은 초기화, 조건식, 증감식을 한 곳에 모아 놓은 것일 뿐, `while`문과 다르지 않다. 만일 초기화나 증감식이 필요하지 않은 경우라면, `while`문이 더 적합하다.

<p style="color:#a0adec"><b>while문의 조건식은 생략불가</b></p>

`while`문은 `for`문과 달리 조건식을 생략할 수 없다. `while`문의 조건식이 항상 참이 되도록 하려면 반드시 `true`를 넣어야한다.

<span style="font-size:13px;">
<b>| 참고 | 무한 반복문은 반드시 블럭 { } 안에 조건문을 넣어서 특정 조건을 만족하면 무한 반복문을 벗어나도록 해야 한다.</b><br/>
</span>  

```java
class Flow {
  public static void main(String[] args) {
    int i = 5;

    while(i-- != 0) {
      System.out.println(i);
    }
  }
}
```

변수 `i`의 값만큼 블럭 { }을 반복하는 예제이다. i의 값이 5이므로 5번(4 ~ 0) 출력된다. 조건식이 `i-- != 0`인데 `i`의 값이 0이 아닌 동안 true이고, 0이 되는 순간 `while`문을 벗어난다.

`i--`는 후위형이므로 조건식이 평가된 후 `i`의 값이 감소된다. `i`값이 1일 때 조건식을 참으로 판단하고 `i`의 값을 1 감소시켜 0으로 만든 뒤 출력한다. 즉, 아래 코드와 같다.

```java
class Flow {
  public static void main(String[] args) {
    int i = 5;

    while(i != 0) {
      i--;
      System.out.println(i);
    }
  }
}
```

반대로 `--i`와 같은 전위형은 감소 연산자가 조건식에서 분리되면 전혀 다른 문장이 된다.

```java
  while(--i != 0) {
    System.out.println(i);
  }
```

```java
  --i;
  while(i != 0) {
    System.out.println(i);
  }
```

위와 같이 `i`가 감소된 후 출력이 되기 때문에 후위형과 다르게 0이 출력되지 않는다.

### 2.3 do-while문

`do-while`문은 `while`문의 변형으로 기본적인 구조는 `while`문과 같으나 조건식과 블럭 { }의 순서를 바꿔놓은 것이다. 그래서 `while`문과 반대로 블럭 { }이 먼저 수행한 후에 조건식을 평가한다. 따라서 최소한 한번은 수행될 것을 보장한다.

```java
  do {
    // 조건식의 연산결과가 true일 때
  } while(조건식);
```

반복적으로 사용자의 입력을 받아서 처리할 때 유용하다.

```java
import java.util.*;

class Flow {
  public static void main(String[] args) {
    int input = 0, answer = 0;

    answer = (int)(Math.random() * 100) + 1;
    Scanner sc = new Scanner(System.in);

    do {
      System.out.print("1과 100 사이의 정수를 입력하세요. >");
      input = sc.nextInt();

      if(input > answer) {
        System.out.println("더 작은 수로 다시 시도해보세요.");
      } else if(input < answer) {
        System.out.println("더 큰 수로 다시 시도해보세요.");
      }
    } while(input != answer);

    System.out.println("정답입니다.")
  }
}
```

임의의 수를 맞추는 예제이다. 사용자 입력 `input`과 변수 `answer`가 같으면 반복을 종료한다.

### 2.4 break문

`switch`문에서 `break`문을 사용한 것처럼 반복문에서도 `break`문을 사용할 수 있다. 자신이 포함된 가장 가까운 반복문을 벗어나게 하는데, 주로 `if`문과 함께 사용되어 특정 조건을 만족할 때 쓰인다.

```java
class Flow {
  public static void main(String[] args) {
    int sum = 0;
    int i = 0;

    while(true) {
      if(sum > 100) break;
      ++i;
      sum += i;
    }

    System.out.println("i = " + i);
    System.out.println("sum = " + sum);
  }
}
```

1부터 계속 더해 나가서 몇까지 더하면 합이 100을 넘는지 알아내는 예제이다. `sum`이 100을 넘으면 `break`문이 수행되어 반복문을 벗어난다.

<span style="font-size:13px;">
<b>| 참고 | <code>sum += i;</code>와 <code>++i;</code> 두 문장을 <code>sum += ++i;</code>와 같이 한 문장으로 줄여 쓸 수 있다.</b><br/>
</span>  

### 2.5 continue문

`continue`문은 반복문 내에서만 사용될 수 있으며, 반복이 진행되는 도중에 `continue`문을 만나면 반복문의 끝으로 이동하여 다음 반복으로 넘어간다. `for`문의 경우 증감식으로 이동하며, `while`문과 `do-while`문은 조건식으로 이동한다.

`continue`문은 반복문 전체를 벗어나지 않고 다음 반복을 계속한다는 점에서 `break`문과 다르다. `if`문과 함께 사용되어 특정 조건을 만족하는 경우에 `continue`문 이후의 문장들을 수행하지 않고 다음 반복으로 넘어가서 계속 진행하도록 한다. 특정 조건을 만족하는 경우를 제외하고자 할 때 유용하다.

```java
class Flow {
  public static void main(String[] args) {
    for(int i = 0; i <= 10; i++) {
      if(i % 3 == 0) continue;
      System.out.println(i);
    }
  }
}
```

1에서 10까지 출력하되 3의 배수는 제외하는 예제이다. `i`의 값이 3의 배수인 경우, `if`문의 조건식이 `true`가 되어 `continue`문에 의해 반복문의 블럭 끝으로 이동한다.

### 2.6 이름 붙은 반복문

`break`문은 근접한 단 하나의 반복문만 벗어날 수 있기 때문에, 여러 개의 반복문이 중첩된 경우에는 `break`문으로 완전히 벗어날 수 없다. 이때는 중첩 반복문 앞에 이름을 붙이고 `break`문이나 `continue`문에 이름을 지정해서 하나 이상의 반복문을 벗어나거나 반복을 건너뛸 수 있다.

```java
  outer:
  while(true) {
    ...
    for(;;) {
      ...
      if(num == 0)
        break;
      if(num == 99)
        break outer;
      ...
    } // for(;;)
  } // while(true)
```

이름을 지정해준 `break`문은 지정된 이름의 반복문을 벗어나고 지정하지 않은 `break`문은 가장 가까운 반복문을 벗어난다.

[위로](#조건문과-반복문)
