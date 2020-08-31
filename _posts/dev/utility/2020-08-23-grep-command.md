---
layout: post
date: 2020-08-23 20:26:30
title: "grep 명령어 사용법"
description: "Mac / Unix"
subject: dev
category: [ cs ]
tags: [ mac, unix, command ]
comments: true
---

# grep

&nbsp; `grep`은 텍스트 검색 기능을 가진 명령어이다. 입력으로 전달된 파일의 내용에서 특정 문자열을 찾고자할 때 사용하는데 **정규표현식**[^1]을 사용하면 같은지(equal) 검사하는 수준을 넘어 훨씬 다양하고 효율적인 기능을 제공한다.

## 기본 문법

```
$ grep [OPTION] [PATTERN] [FILENAME]
```

## 명령어 옵션

&nbsp; grep 명령에서 사용할 수 있는 옵션은 `grep --help`명령을 통해 더욱 자세히 확인할 수 있다.

| OPTION | <center> 기능 |
|:---:|:---|
| -i | 대/소문자를 구분하지 않음 |
| -r | 디렉토리 내의 모든 파일에 커맨드 실행 |
| -l | 매칭 라인과 파일 이름만 출력 |
| -v | 매칭되지 않는(패턴이 없는) 라인만 출력 |
| -c | 파일 당 매칭 라인(패턴이 있는 라인)의 개수 출력 |
| -n | 검색 결과 매칭된 라인 넘버를 맨 앞에 출력 |
| -A[n] | [n] 값은 숫자, 매칭된 라인 뒤의 n개의 라인 출력 |
| -B[n] | [n] 값은 숫자, 매칭된 라인 앞의 n개의 라인 출력 |
| -C[n] | [n] 값은 숫자, 매칭된 라인 앞, 뒤의 n개의 라인 출력 |

### 매치되는 패턴에 색 입히기

```
$ grep --color=always [PATTERN] [FILENAME]
```

&nbsp; ~/.bash_profile 등에 아래 내용으로 쉘 환경을 사전 설정해두면 grep 커맨드 실행마다 색을 출력한다.

```
GREP_OPTIONS="--color=always";export GREP_OPTIONS
```

## 자주 사용하는 명령어 예시

| grep 사용 예 | <center>명령어 옵션 |
|:---|:---|
| 대상 파일에서 문자열 검색 | grep "EXAM" [FILE] |
| 현재 디렉토리 모든 파일에서 문자열 검색 | grep "EXAM" * |
| 특정 확장자를 가진 모든 파일에서 문자열 검색 | grep "EXAM" *.ext |
| 대소문자 구분하지 않고 문자열 검색 | grep -i "EXAM" [FILE] |
| 매칭되는 패턴이 존재하지 않는 라인 선택 | grep -v "EXAM" [FILE] |
| 하위 디렉토리를 포함한 모든 파일에서 문자열 검색 | grep -r "EXAM" * |
| 검색된 문자열이 포함된 라인 번호 출력 | grep -n "STR" [FILE] |
| A로 시작하여 B로 끝나는 패턴 찾기 | grep "A.*B" * |
| 0-9 사이 숫자만 변경되는 패턴 찾기 | grep "EXAM[0-9]" * |
| 문자열 패턴 전체를 정규 표현식 메타 문자가 아닌 일반 문자로 검색하기 | grep -F "*[]?..." [FILE] |
| 정규 표현식 메타 문자를 일반 문자로 검색하기 | grep "\\*" [FILE] |
| 문자열 라인 처음 시작 패턴 검색하기 | grep "^EXAM" [FILE] |
| 문자열 라인 마지막 종료 패턴 검색하기 | grep "$EXAM" [FILE] |

---
**Reference**
+ [위키백과](https://ko.wikipedia.org/wiki/Grep)
+ [IBM Knowledge Center](https://ibm.com/support/knowledgecenter/ko/ssw_ibm_i_73/rzahz/rzahzgrep.htm)


[^1]: 정규표현식(Regular Expression)이란, 특정 규칙을 가진 문자열 집합을 표현하기 위한 형식 언어로써, 주로 문자열 패턴 매칭을 검사하거나 문자열을 치환하기 위해 사용된다.
