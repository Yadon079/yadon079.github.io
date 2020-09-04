---
layout: post
date: 2020-09-04 11:36:00
title: "거품 정렬(Bubble Sort)"
description: "정렬 알고리즘"
subject: dev
category: [ cs ]
tags: [ cs, algorithm ]
comments: true
---

# 거품 정렬 (Bubble Sort)

## 이 글의 목표

+ Bubble Sort에 대해 설명할 수 있다.
+ Bubble Sort 과정에 대해 설명할 수 있다.
+ Bubble Sort를 구현할 수 있다.
+ Bubble Sort의 공간복잡도와 시간복잡도를 계산할 수 있다.

## Bubble Sort란?

Bubble Sort는 정렬의 대명사로 알려져 있는 정렬방법이다. Selection Sort와 유사한 알고리즘으로 `서로 인접한 두 원소의 대소를 비교하여, 위치가 바뀌어야 하는 경우 서로 교환하며 정렬하는 알고리즘`이다.

정렬 과정에서 원소의 이동이 거품이 수면으로 올라오는 듯한 모습을 보이기 때문에 거품 정렬이라고 지어졌다고 한다.

## 과정

1. 첫 번째 원소와 두 번째 원소, 두 번째 원소와 세 번째 원소, 세 번째 원소와 네 번째 원소, ... 와 같은 식으로 (마지막 - 1) 번째 원소와 마지막 원소를 비교하여 서로 교환한다.
2. 한 번 돌고 나면 가장 큰 원소가 마지막으로 이동하게 되므로 한 번 돌 때마다 이전 회 차의 마지막 원소는 제외된다.

## 예시

```java
void bubbleSort(int[] arr) {
  int temp = 0;

  for(int i = 0; i < arr.length; i++) {
    for(int j = 0; j < arr.length - j; j++) {
      if(arr[j - 1] > arr[j]) {
        temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  System.out.println(Arrays.toString(arr));  
}
```

## GIF로 이해하는 Bubble Sort

![bubblesort](/assets/img/cs/bubble-sort-001.gif)

## 공간복잡도

하나의 배열 안에서 교환(swap)을 통해, 정렬이 수행되므로 O(n)이다.

## 시간복잡도

`시간 복잡도 = 알고리즘을 구성한 명령어가 실행된 횟수`라고 정의 할 수 있다.

bubble sort의 시간복잡도를 계산하면

+ 비교 횟수
  + 최상, 평균, 최악 모두 일정
  + n-1, n-2, ..., 2, 1번 = n(n-1)/2

따라서, 시간복잡도는 <b>O(n<sup>2</sup>)</b>이다.

## 장점
+ 구현이 간단하고, 소스코드가 직관적이다.
+ 안정 정렬(Stable Sort)이다.
+ 제자리 정렬(in-place sorting) : 정렬하려는 배열 안에서 교환하는 방식이므로, 다른 메모리 공간이 필요하지 않다.

## 단점
+ 시간복잡도가 최상, 평균, 최악 모두 <b>O(n<sup>2</sup>)</b>이므로, 비효율적이다.
+ 정렬하기 위해서 교환 연산이 많이 일어난다.

---
**Reference**
+ [위키피디아](https://en.wikipedia.org/wiki/Bubble_sort)
+ [Heee's Development Blog](https://gmlwjd9405.github.io/2018/05/06/algorithm-bubble-sort.html)
+ [Jinhyy's 개발일기](https://jinhyy.tistory.com/9)
