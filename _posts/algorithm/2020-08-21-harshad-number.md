---
layout: post
date: 2020-08-21 21:40:35
title: "[JAVA]하샤드 수"
description: "프로그래머스 연습문제 Lv.1"
subject: algo
category: [ algorithm ]
tags: [ algorithm, java ]
comments: true
---

# 하샤드 수

> [문제 풀러가기](programmers.co.kr/learn/courses/30/lessons/12947)

## 문제 설명
&nbsp; 양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 합니다. 예를 들어 18의 자릿 수 합은 1+8=9이고, 19은 9로 나누어 떨어지므로 18은 하샤드 수입니다. 자연수 x를 입력받아 x가 하샤드 수인지 아닌지 검사하는 함수 solution을 완성해주세요.

---

## 제한 조건
+ `x`는 1 이상, 10000 이하인 정수입니다.

## 입출력 예시

| <center> x |&nbsp;&nbsp;| <center> return |
|---|---|---|   
| <center> 10 || <center> true |
| <center> 12 || <center> true |
| <center> 11 || <center> false |
| <center> 13 || <center> false |

---

## 코드

```
class Solution {
  public boolean solution(int x) {
    boolean answer = true;
    int temp = x;
    int sum = 0;

    while((temp / 10) != 0) {
      sum += temp%10;
      temp = temp/10;
    }
    sum += temp;

    if((x % sum) != 0) {
      answer = false;
    }

    return answer;
  }
}
```

## 설명

&nbsp; 입력된 값이 하샤드 수인가 아닌가를 확인하는 알고리즘을 만드는 문제이다. 각 자리 수의 합으로 나누었을 때 나머지가 0이 되면 true를 반환하도록 만들면된다. 처음 입력받은 수를 함수 temp에 넣고 10으로 계속 나눈다. 몫이 0이 아닐 때까지 나누는데 이는 각 자리 수를 구하는 것이다. 그렇게 구한 값들을 sum으로 전부 더해서 x와 나누었을 때 나머지가 0인지 아닌지를 검사하도록 만들었다.
