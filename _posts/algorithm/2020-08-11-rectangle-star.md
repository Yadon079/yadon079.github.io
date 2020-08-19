---
layout: post
date: 2020-08-11 14:50:00
title: "[JAVA]직사각형 별찍기"
description: "프로그래머스 연습문제 Lv.1"
subject: dev
category: [ algorithm ]
tags: [ algorithm, java ]
comments: true
---

# 직사각형 별찍기

> [문제 풀러가기](programmers.co.kr/learn/courses/30/lessons/12969)

## 문제 설명
이 문제에는 표준 입력으로 두 개의 정수 n과 m이 주어집니다.
별(\*)문자를 이용해 가로의 길이가 n, 세로의 길이가 m인 직사각형 형태를 출력해보세요.

---
## 제한 조건
+ n과 m은 각각 1000 이하인 자연수입니다.

---
## 예시

**입력**
```
5 3
```
**출력**
```
*****
*****
*****
```
---

간단한게 반복문을 사용하여 행과 열의 길이만큼 별을 출력하게 작성하였다.

```
import java.util.*;

public class Solution {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    int m = sc.nextInt();

    for(int i = 0; i < m; i++) {
      for(int j = 0; j < n; j++) {
        System.out.print("*");
      }
      System.out.println();
    }
  }
}
```
