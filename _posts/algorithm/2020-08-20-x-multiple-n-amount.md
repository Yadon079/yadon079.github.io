---
layout: post
date: 2020-08-20 16:30:00
title: "[JAVA]x만큼 간격이 있는 n개의 숫자"
description: "프로그래머스 연습문제 Lv.1"
subject: algo
category: [ algorithm ]
tags: [ algorithm, java ]
comments: true
---

# x만큼 간격이 있는 n개의 숫자

> [문제 풀러가기](programmers.co.kr/learn/courses/30/lessons/12954)

## 문제 설명
함수 solution은 정수 x와 자연수 n을 입력 받아, x부터 시작해서 x씩 증가하는 숫자를 n개 지니는 리스트를 리턴해야 합니다. 다음 제한 조건을 보고, 조건을 만족하는 함수 solution을 완성해주세요.

---

## 제한 조건
+ x는 -10,000,000이상 10,000,000이하인 정수입니다.
+ n은 1,000 이하인 자연수입니다.

## 입출력 예시

| x | n | answer |
|:---:|:---:|:---:|
| 2 | 5 | [2, 4, 6, 8, 10] |
| 4 | 3 | [4, 8, 12] |
| -4 | 2 | [-4, -8] |

---

## 코드

```
class Solution {
  public long[] solution(long x, int n) {
    long[] answer = new long[n];

    for(int i = 0; i < n; i++) {
      answer[i] = (i + 1) * x;
    }

    return answer;
  }
}
```

## 설명

x부터 시작해서 x만큼 차이가 난다는 말은 x의 배수라는 뜻이므로 x의 배수가 n개만큼 들어간 배열이 되도록 만들었다.
반복문으로 배열의 첫번째 요소부터 마지막 요소까지 돌아가게 했고, 각 인덱스에 1을 더해서 x를 곱해 x의 배수가 되도록 만들었다.
