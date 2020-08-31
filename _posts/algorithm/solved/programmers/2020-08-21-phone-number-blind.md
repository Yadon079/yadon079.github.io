---
layout: post
date: 2020-08-21 21:13:35
title: "[JAVA]핸드폰 번호 가리기"
description: "프로그래머스 연습문제 Lv.1"
subject: algo
category: [ algorithm ]
tags: [ algorithm, java ]
comments: true
---

# 핸드폰 번호 가리기

> [문제 풀러가기](programmers.co.kr/learn/courses/30/lessons/12948)

## 문제 설명

&nbsp; 프로그래머스 모바일은 개인정보 보호를 위해 고지서를 보낼 때 고객들의 전화번호의 일부를 가립니다.
전화번호가 문자열 phone_number로 주어졌을 때, 전화번호의 뒷 4자리를 제외한 나머지 숫자를 전부 `*`으로 가린 문자열을 리턴하는 함수 solution을 완성해주세요.

---

## 제한 조건
+ s는 길이 4이상, 20이하인 문자열입니다.

## 입출력 예시

| phone_number | return |
|---|---|   
| "01033334444" | "*******4444" |
| "027778888" | "*****8888" |

---

## 코드

```java
class Solution {
  public String solution(String phone_number) {
    char[] chk = phone_number.toCharArray();

    for(int i = 0; i < chk.length - 4; i++) {
      chk[i] = '*';
    }

    String answer = new String(chk);

    return answer;
  }
}
```

## 설명

&nbsp; 맨 뒷자리의 수만 남겨두고 나머지는 `*`로 바꿔지도록 만들었다. 입력받은 문자열을 char형 배열로 전환해서 뒤에서 4자리만 남겨두고 나머지 요소들을 `*`로 바꾸었다.
