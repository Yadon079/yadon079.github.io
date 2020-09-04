---
layout: post
date: 2020-09-04 11:36:00
title: "선택 정렬(Selection Sort)"
description: "정렬 알고리즘"
subject: dev
category: [ cs ]
tags: [ cs, algorithm ]
comments: true
---

# 선택 정렬 (Selection Sort)

## 이 글의 목표

+ Selection Sort에 대해 설명할 수 있다.
+ Selection Sort 과정에 대해 설명할 수 있다.
+ Selection Sort를 구현할 수 있다.
+ Selection Sort의 공간복잡도와 시간복잡도를 계산할 수 있다.

## Selection Sort란?

Selection Sort는 Bubble Sort보다도 쉽고 간단한 알고리즘이다. `해당 순서에 원소를 넣을 위치는 이미 정해져 있고, 어떤 원소를 넣을지 선택하는 알고리즘`이다. 즉 정렬순서에 맞게 하나씩 선택해서 옮기는, 옮기면서 정렬이 되게 하는 것이다.

Insertion Sort와 헷갈릴 수 있는데, Selection Sort는 배열에서 <b>해당 자리를 선택하고 그 자리에 오는 값을 찾는 것</b>이라고 생각하면 된다.

## 과정

1. 주어진 배열에서 최소값을 찾는다.
2. 최소값을 맨 앞에 위차한 값과 교체(pass)한다.
3. 맨 앞을 제외한 나머지 배열을 같은 방법으로 교체한다.

## 예시

```java
void selectionSort(int[] arr) {
  int indexMin, temp;

  for(int i = 0; i < arr.length - 1; i++) {
    indexMin = i;
    for(int j = i + 1; j < arr.length; j++) {
      if(arr[j] < arr[indexMin]) {
        indexMin = j;
      }
    }
    temp = arr[indexMin];
    arr[indexMin] = arr[i];
    arr[i] = temp;
  }
  System.out.println(Arrays.toString(arr));  
}
```

## GIF로 이해하는 Bubble Sort

![selectionsort](/assets/img/cs/selection-sort-001.gif)

## 공간복잡도

하나의 배열 안에서 교환(swap)을 통해, 정렬이 수행되므로 O(n)이다.

## 시간복잡도

Selection sort의 시간복잡도를 계산하면

+ 비교 횟수
  + 두 개의 for 루프의 실행 횟수
  + 외부 루프 : (n-1)번
  + 내부 루프(최솟값 찾기) : n-1, n-2, ..., 2, 1번 = n(n-1)/2

따라서, 시간복잡도는 <b>O(n<sup>2</sup>)</b>이다.

## 장점
+ 알고리즘이 단순하다.
+ 비교 횟수는 많지만, Bubble Sort에 비해 실제 교환되는 횟수는 적기 때문에 많은 교환이 필요한 자료상태에서 비교적 효율적이다.
+ 제자리 정렬(in-place sorting) : 정렬하려는 배열 안에서 교환하는 방식이므로, 다른 메모리 공간이 필요하지 않다.

## 단점
+ 시간복잡도가 <b>O(n<sup>2</sup>)</b>이므로, 비효율적이다.
+ <b>불안정 정렬(Unstable Sort)</b>이다.

---
**Reference**
+ [위키피디아](https://en.wikipedia.org/wiki/Bubble_sort)
+ [Heee's Development Blog](https://gmlwjd9405.github.io/2018/05/06/algorithm-bubble-sort.html)
+ [Jinhyy's 개발일기](https://jinhyy.tistory.com/9)
