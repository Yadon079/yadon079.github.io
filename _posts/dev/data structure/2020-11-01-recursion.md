---
layout: post
date: 2020-11-01 18:45:00
title: "재귀"
description: "자료구조"
subject: 자료구조
category: [ data structure ]
tags: [ data structure, recursion ]
use_math: true
comments: true
---

# 재 귀(Recursion)

### 재귀함수의 기본적 이해

재귀함수란 함수 내에서 자기 자신을 다시 호출하는 함수를 의미한다.

```
  void Recursive(void) {
    System.out.println("Recursive call!");
    Recursive();  // 자신을 다시 호출한다.
  }
```

![재귀함수의 호출 이해](/assets/img/ds/recursion.png)

함수를 구성하는 명령문은 CPU로 이동(복사)되어서 실행이 된다. 이 명령문을 이동(복사)하는데 제한이 없다. 따라서 Recursive 함수의 중간 쯤을 실행하는 중간에 다시 Recursive 함수의 앞 부분에 위치한 명령문을 CPU로 이동시키는 것은 문제가 되지 않는다. 그래서 재귀적인 형태의 함수호출이 가능한 것이다.

재귀함수에는 '탈출조건'이 들어가야 한다. 그렇지 않으면 재귀함수가 한번 호출되면 계속해서 호출되기 때문이다.

### 팩토리얼(factorial)

재귀함수의 대표적인 예시로 팩토리얼(factorial)이 있다. 정수 $n$의 팩토리얼은 $n!$로 표시하며 이는 다음과 같다.

$n! = n \times (n-1) \times (n-2) \times (n-3) \times ... \times 2 \times 1$

위 수식을 잘 보면 다음과 같이 표현 할 수 있다는 것을 알 수 있다.

$n! = n \times (n-1)!$

정수 $n$팩토리얼은 정수 $n$과 $n-1$팩토리얼의 곱으로 표현할 수 있으므로, n팩토리얼 f(n)을 수식적으로 표현하면 다음과 같다.

$f(n) = \begin{cases} n \times f(n-1) & .... \; n \geq 1 \\\\ 1 & .... \; n=0 \end{cases}$

팩토리얼의 식과 탈출 조건을 if~else문으로 표현하면 factorial 함수가 완성된다.

```
  public int Factorial(int n) {
    if(n == 0) {
      return 1;
    } else {
      return n * Factorial(n - 1);
    }
  }
```

## 재귀의 활용

### 피보나치 수열 : Fibonacci Sequence

피보나치 수열은 재귀적인 형태를 띠는 대표적인 수열이다. 피보나치 수열의 $n$번째 위치의 값을 반환하는 함수를 수학적으로 표현하면

$fib(n) = \begin{cases} 0 & .... \, n=1 \\\\ 1 & .... \, n=2 \\\\ fib(n-1) + fib(n-2) & .... \, otherwise \end{cases}$

이 된다. 위의 수식을 코드로 옮겨적으면 다음과 같이 정의된다.

```
  public int Fibo(int n) {
    if(n == 1) {
      return 0;
    } else if(n == 2) {
      return 1;
    } else {
      return Fibo(n - 1) + Fibo(n - 2);
    }
  }
```

### 이진 탐색 알고리즘의 재귀적 구현
