---
layout: post
date: 2020-08-24 14:16:23
title: "awk 명령어 사용법"
description: "Mac / Unix"
subject: dev
category: [ cs ]
tags: [ mac, unix, command ]
comments: true
---

# awk

&nbsp; `awk`는 파일로부터 레코드(recode)를 선택하고, 선택된 레코드에 포함된 값을 조작하거나 데이터화하는 것을 목적으로 사용하는 명령어이다.

&nbsp; awk 명령으로 할 수 있는 일들은 다음과 같다.
+ 텍스트 파일의 전체 내용 출력
+ 파일의 특정 필드만 출력
+ 특정 필드에 문자열을 추가해서 출력
+ 패턴이 포함된 레코드 출력
+ 특정 필드에 연산 수행 결과 출력
+ 필드 값 비교에 따라 레코드 출력

&nbsp; awk는 기본적으로 입력 데이터를 라인(line)단위의 **레코드(Record)** 로 인식한다. 각 레코드는 공백 문자(space, tab)로 구분된 **필드(Field)** 로 분류된다.

## 기본 문법

```
$ awk [OPTION] [awk program] [FILENAME]
```

| OPTION | &nbsp; | <center> 기능 |
|:---:|:---:|:---|
| -F || 필드 구분 문자 지정 |
| -f || awk program 파일 경로 지정 |
| -v || awk program에서 사용될 특정 variable값 지정 |

&nbsp; awk 명령에는 사용 가능한 옵션이 매우 적다. 따라서 옵션보다 awk program을 작성해서 사용한다.

## awk program

&nbsp; awk program의 기본 구조는 아래와 같다.

```
pattern { action }
```

그리고 awk program은 ''안에 작성해야 한다. 따라서 다음과 같은 형태가 된다.

```
$ awk [OPTION] 'pattern { action }' [FILENAME]
```

## 자주 사용하는 명령어 예시

| awk 사용 예 | &nbsp; &nbsp; | 명령어 옵션 |
|:---|:---:|:---|
| 파일의 전체 내용 출력 || awk '{ print }' [FILE] |
| 필드 값 출력 || awk '{ print \$1 }' [FILE] |
| 필드 값에 임의 문자열을 같이 출력 || awk '{ print "EXAM"\$1, "EXAM"\$2 }' [FILE] |
| 지정된 문자열을 포함하는 레코드만 출력 || awk '/EXAM/' [FILE] |
| 특정 필드 값 비교를 통해 선택된 레코드만 출력 || awk '\$1 == 10 { print \$2 }' [FILE] |
| 특정 필드들의 합 구하기 || awk '{sum += \$3} END { print sum }' [FILE] |
| 여러 필드들의 합 구하기 || awk '{ for(i = 2; i <= NF; i++) total += \$i }; END { print "TOTAL : " total }' [FILE] |
| 레코드 단위로 필드 합 및 평균 값 구하기 || awk '{ sum = 0 } { sum += (\$3 + \$4 + \$5) } { print \$0, sum, sum / 3 }' [FILE] |
| 필드에 연산을 수행한 결과 출력하기 || awk '{ print \$1, \$2, \$3 + 2, \$4, \$5 }' [FILE] |
| 레코드 또는 필드의 문자열 길이 검사 || awk 'length($0) > 20' [FILE] |
| 파일에 저장된 awk program 실행 || awk -f [AWK FILE] [FILE] |
| 필드 구분 문자 변경하기 || awk -F ':' '{ print \$1 }' [FILE] |
| awk 실행 결과 레코드 정렬하기 || awk '{ print \$0 }' [FILE] |
| 특정 레코드만 출력하기 || awk 'NR == 2 { print $0; exit }' [FILE] |
| 출력 필드 너비 지정하기 || awk '{ printf "%-3s %-8s %-4s %-4s %-4s\\n", \$1, \$2, \$3, \$4, \$5 }' [FILE] |
| 필드 중 최대 값 출력 || awk '{ max = 0; for(i = 3; i M NF; i++) max = (\$i > max) ? \$i : max; print max }' [FILE] |

---
**Reference**
+ [위키백과](https://ko.wikipedia.org/wiki/AWK)
+ [GNU Awk User's Guide](https://gnu.org/software/gawk/manual/gawk.html)
