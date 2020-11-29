---
layout: post
date: 2020-11-29 13:06:00
title: "3주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, operator ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 3주차 과제](https://github.com/whiteship/live-study/issues/3)를 공부하고 공유하기 위해서 작성되었습니다.

# 추가 질문

## Q. 논리 연산자 두 개(&&)와 한 개(&)의 연산속도 차이는?

```java
public class App {
    public static void main(String[] args) {
        int i = 0;
        int j = 0;

        if (i++ == 0 || j++ == 0) {
            System.out.println("Hello");
        }

        System.out.println(i);
        System.out.println(j);
    }
}
```

```java
public class App {
    public static void main(String[] args) {
        int i = 0;
        int j = 0;

        if (i++ == 0 | j++ == 0) {
            System.out.println("Hello");
        }

        System.out.println(i);
        System.out.println(j);
    }
}
```

<img src="/assets/img/study/oneortwo.png" width="70%" align="center"><br/>

결과를 보면 알 수 있듯이 두 개(||)일 때는 우측 피연산자를 검사하지 않고 한 개(|)일 때는 우측까지 검사한다.

## Q. 가운데 값(mid value)을 구할 때 오버플로우를 막으려면?

```java
public class App {
    public static void main(String[] args) {
        int start = 2_000_000_000;
        int end = 2_100_000_000;

        int mid = (start + end) / 2;

        System.out.println(mid);
    }
}
```

위 코드를 실행하면 오버플로우가 발생하여 원하는 값이 나오지 않는다. 오버플로우 없이 안전하게 값을 구하는 방법 2가지가 있다.

\<첫번째>

```java
public class App {
    public static void main(String[] args) {
        int start = 2_000_000_000;
        int end = 2_100_000_000;

        int mid = start + (end - start) / 2;

        System.out.println(mid);
    }
}
```

낮은 값을 베이스로 하고 두 수의 차의 반을 베이스에 더하는 것이기 때문에 어렵지 않다.

\<두번째>

```java
public class App {
    public static void main(String[] args) {
        int start = 2_000_000_000;
        int end = 2_100_000_000;

        int mid = (start + end) >>> 1;

        System.out.println(mid);
    }
}
```

비트연산자에서 `>>>`는 빈자리를 0으로 채운다. `>>`와 차이는 부호의 변경 유무이다. `>>`는 최상위 부호비트 값으로 채워지지만, `>>>`는 무조건 0으로 채워진다. 1만큼 이동, 즉 2로 나누는 것과 같기 때문에 중간 값을 구하는 연산이 되는 것이다.

## Q. 다음 문제를 풀어라.

### numbers라는 int형 배열이 있다. 해당 배열에 들어있는 숫자들은 오직 한 숫자를 제외하고 모두 두 번씩 들어있다. 오직 한 번만 등장하는 숫자를 찾는 코드를 작성하라.

```java
public class App {
    public static void main(String[] args) {
        App app = new App();
        int result = app.solution(new int[] { 5, 2, 4, 1, 2, 4, 5 });
        System.out.println(result);
    }

    private int solution(int[] numbers) {
        int result = 0;

        for (int number : numbers) {
            result ^= number;
        }

        return result;
    }
}
```

XOR `^`는 자기자신과 다를 경우 1을 반환한다. 중복되지 않는 숫자를 찾기에 좋은 비트 연산자이다.

---
**Reference**
+ <https://github.com/yeGenieee/java-live-study/blob/main/%5B3%5DJava%20Live%20Study.md>
