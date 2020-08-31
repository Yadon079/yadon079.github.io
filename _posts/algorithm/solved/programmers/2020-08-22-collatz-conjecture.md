---
layout: post
date: 2020-08-22 18:13:22
title: "[JAVA]콜라츠 추측"
description: "프로그래머스 연습문제 Lv.1"
subject: algo
category: [ algorithm ]
tags: [ algorithm, java ]
comments: true
---

# 콜라츠 추측

> [문제 풀러가기](programmers.co.kr/learn/courses/30/lessons/12943)

## 문제 설명

&nbsp; 1937년 Collatz란 사람에 의해 제기된 이 추측은, 주어진 수가 1이 될때까지 다음 작업을 반복하면, 모든 수를 1로 만들 수 있다는 추측입니다. 작업은 다음과 같습니다.

```
1-1. 입력된 수가 짝수라면 2로 나눕니다.
1-2. 입력된 수가 홀수라면 3을 곱하고 1을 더합니다.
2. 결과로 나온 수에 같은 작업을 1이 될 때까지 반복합니다.
```

예를 들어, 입력된 수가 6이라면 `6->3->10->5->16->8->4->2->1` 이 되어 총 8번 만에 1이 됩니다. 위 작업을 몇 번이나 반복해야하는지 반환하는 함수 solution을 완성해 주세요. 단, 작업을 500번을 반복해도 1이 되지 않는다면 -1을 반환해 주세요.

---

## 제한 조건

+ 입력된 수, `num`은 1 이상 8,000,000 미만인 정수입니다.

## 입출력 예시

| n | result |
|---|---|
| 6 | 8 |
| 16 | 4 |
| 626331 | -1 |

---

## 코드

```java
class solution {
  public int solution(long num) {
    int answer = 0;

    while(num != 1){
      if((num % 2) == 0) {
        num = num / 2;
      } else {
        num = (num * 3) + 1;
      }
      answer++;
    }   

    if(answer > 500) {
      answer = -1;
    }

    return answer;
  }
}
```

## 설명

&nbsp; 콜라츠 추측이라는 수식을 코드로 만드는 문제이다. 최종 값이 1이 될 때까지 조건을 반복하는데 입력된 수가 짝수일 때와 홀수일 때로 나눠서 각 조건이 실행될 때마다 answer의 값을 카운터로 두고 하나씩 증가하게 만들었다. 카운터가 500이 넘어가면 -1이 되도록 조건을 따로 두었다.
