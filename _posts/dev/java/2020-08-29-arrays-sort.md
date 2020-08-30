---
layout: post
date: 2020-08-29 22:18:30
title: "Arrays.sort()"
description: "자바 배열 정렬(Sorting)"
subject: java
category: [ java ]
tags: [ java, sorting, array ]
comments: true
---

# Java 배열 정렬 (내림차순 / 오름차순)

## Arrays.sort()

&nbsp; 자바에서 배열이나 리스트를 정렬하고자 할 때 `java.util.Arrays` 클래스의 `sort()` 메서드를 사용하여 간편하게 정렬할 수 있다. `Arrays` 클래스는 배열의 복사, 항목 정렬, 검색과 같은 배열 조작 기능을 가지고 있다.

### Syntax

+ **public static void sort ( primitive type array a )**
  - 인자 값으로 primitive data type인 byte[], char[], double[], long[], int[], float[] 등을 이용한다.
+ **public static void sort ( primitive type array a, int fromIndex, int toIndex)**
  - 인자 값으로 primitive data type인 byte[], char[], double[], long[], int[], float[] 등을 이용하며, 정렬 시작 index 값 및 종료 index 값을 지정한다.
+ **public static void sort ( Object[] a )**
  - 인자 값으로 Object(객체)를 받습니다. Integer[], Double[], Character[] 등의 값을 받을 수 있다.
+ **public static void sort ( Object[] a, int fromIndex, int toIndex)**
  - 인자 값으로 Object(객체)를 받습니다. Integer[], Double[], Character[] 등의 값을 받을 수 있으며, 정렬 시작 index 값 및 종료 index 값을 지정한다.
+ <b>public static <T> void sort ( T[] a, Comparator<? super T> c )</b>
  - 인자 값으로 객체를 받으며, 지정된 Comparator가 가리키는 순서에 따라 지정된 객체의 배열을 정렬한다.
+ <b>public static <T> void sort ( T[] a, int fromIndex, int toIndex, Comparator<? super T> c )</b>
  - 인자 값으로 객체를 받으며, 지정된 Comparator가 가리키는 순서에 따라 지정된 객체의 배열을 정렬하며, 정렬 시작 index 값 및 종료 index 값을 지정한다.

## 예시

### 오름차순

&nbsp; `Arrays.sort()` 메서드의 매개 값으로 기본타입 배열이나 String 배열을 지정해주면 자동으로 오름차순 정렬이 된다.

**기본타입 배열 오름차순 정렬**

코드

```java
import java.util.Arrays;

public class Sort {
  public static void main(String[] args) {
    int arr[] = {4, 33, 24, 15, 17, 21};
    Arrays.sort(arr);

    for(int i : arr) {
      System.out.print("[" + i + "]");
    }
  }
}
```

출력

> [4][15][17][21][24][33]


**String 배열 오름차순 정렬**

코드

```java
import java.util.Arrays;

public class Sort {
  public static void main(String[] args) {
    String arr[] = {"apple", "melon", "peach", "banana", "orange"};
    Arrays.sort(arr);

    for(String i : arr) {
      System.out.print("[" + i + "]");
    }
  }
}
```

출력

> [apple][banana][melon][orange][peach]

---

### 내림차순

&nbsp; 내림차순으로 정렬할 때는 `Collections` 클래스의 `reverseOrder()` 함수를 사용하면 된다. 만약 기본타입 배열을 내림차순으로 정렬하고 싶다면 기본타입 배열을 래퍼 클래스로 만들어 `Comparator`를 두번째 인자에 넣어주어야 역순으로 정렬할 수 있다.

<span style="color:red">*! String은 기본 타입이 아님*</span>

**기본타입 배열 내림차순 정렬**

코드

```java
import java.util.Arrays;

public class Sort {
  public static void main(String[] args) {
    int arr[] = {4, 33, 24, 15, 17, 21};
    Arrays.sort(arr, Collections.reverseOrder());

    for(int i : arr) {
      System.out.print("[" + i + "]");
    }
  }
}
```

출력

> [33][24][21][17][15][4]


**String 배열 내림차순 정렬**

코드

```java
import java.util.Arrays;

public class Sort {
  public static void main(String[] args) {
    String arr[] = {"apple", "melon", "peach", "banana", "orange"};
    Arrays.sort(arr);

    for(String i : arr) {
      System.out.print("[" + i + "]");
    }
  }
}
```

출력

> [peach][orange][melon][banana][apple]

---

### 부분정렬

&nbsp; `Arrays.sort()` 메서드의 매개값으로 배열, 시작 index, 끝 index를 넣어 일부분만 정렬할 수 있다.

코드

```java
import java.util.Arrays;

public class Sort {
  public static void main(String[] args) {
    int arr[] = {1, 24, 32, 9, 16, 17, 22, 7};

    Arrays.sort(arr, 0, 4);

    for(int i : arr) {
      System.out.print("[" + i + "]");
    }
  }
}
```

출력

> [1][9][16][24][32][17][22][7]

---
**Reference**
+ [Java Api Documentaion](https://docs.oracle.com/javase/8/docs/api/)
