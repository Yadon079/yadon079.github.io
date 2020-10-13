---
layout: post
date: 2020-10-12 15:52:00
title: "날짜와 시간 & 형식화"
description: "자바의 정석"
subject: java의 정석
category: [ java ]
tags: [ java, time, date, formatting ]
comments: true
---

# 날짜와 시간과 형식화

> 이 글은 남궁성님의 [자바의 정석 3/e](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9788994492032)을 기반으로 공부한 내용을 정리한 글입니다.

+ [날짜와 시간](#날짜와-시간)
+ [형식화 클래스](#형식화-클래스)
+ [java.time패키지](#java-time-패키지)

## 날짜와 시간

### 1.1 Calendar와 Date

`Date`는 날짜와 시간을 다룰 목적으로 제공되는 클래스이다. 하지만 기능이 부족했기 때문에 `Calendar`클래스가 추가되었고 몇 가지 단점을 보완하기 위해 `java.time`패키지가 기존의 단점들을 개선하여 추가되었다.

<p style="color:#a0adec"><b>Calendar와 GregorianCalendar</b></p>

`Calendar`는 추상클래스이기 때문에 직접 객체를 생성할 수 없고, 메서드를 통해서 완전히 구현된 클래스의 인스턴스를 얻어야 한다.

`Calendar`를 상속받아 완전히 구현한 클래스로 `GregorianCalendar`와 `BuddhistCalendar`가 있는데 `getInstance()`는 시스템의 국가와 지역설정을 확인해서 태국이면 `BuddhistCalendar`의 인스턴스를 반환하고, 그 외에는 `GregorianCalendar`의 인스턴스를 반환한다.

인스턴스를 직접 생성해서 사용하지 않고 이처럼 메서드를 통해서 인스턴스를 반환받게 하는 이유는 최소한의 변경으로 프로그램이 동작할 수 있도록 하기 위한 것이다.

`getInstance()`메서드가 `static`인 이유는 메서드 내의 코드에서 인스턴스 변수를 사용하거나 인스턴스 메서드를 호출하지 않기 때문이다.

<p style="color:#a0adec"><b>Date와 Calendar간의 변환</b></p>

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>1. Calendar를 Date로 변환 </b><br/>
      &nbsp;&nbsp;&nbsp;&nbsp; Calendar cal = Calendar.getInstance();<br/>
      &nbsp;&nbsp;&nbsp;&nbsp; ...<br/>
      &nbsp;&nbsp;&nbsp;&nbsp; Date d = new Date(cal.getTimeInMillis());<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;<br/>
      <b>2. Date를 Calendar로 변환 </b><br/>
      &nbsp;&nbsp;&nbsp;&nbsp; Date d = new Date();<br/>
      &nbsp;&nbsp;&nbsp;&nbsp; ...<br/>
      &nbsp;&nbsp;&nbsp;&nbsp; Calendar cal = Calender.getInstance();<br/>
      &nbsp;&nbsp;&nbsp;&nbsp; cal.setTime(d);
    </td>
  </tr>   
</table>

`getInstance()`를 통해서 얻은 인스턴스는 기본적으로 현재 시스템의 날짜와 시간에 대한 정보를 담고 있다. 원하는 날짜나 시간으로 설정하려면 `set`메서드를 사용하면 된다.

[위로](#날짜와-시간과-형식화)

## 형식화 클래스

형식화 클래스는 `java.text`패키지에 포함되어 있으며 숫자, 날짜, 텍스트 데이터를 일정한 형식에 맞게 표현할 수 있는 방법을 객체지향적으로 설계하여 표준화하였다.

형식화에 사용될 패턴을 정의하는데, 데이터를 정의된 패턴에 맞춰 형식화할 수 있을 뿐만 아니라 역으로 형식화된 데이터에서 원래의 데이터를 얻어낼 수도 있다.

### 2.1 DecimalFormat

숫자를 형식화 하는데 사용되는 것이 `DecimalFormat`이다. 숫자 데이터를 정수, 부동소수점, 금액 등의 다양한 형식으로 표현할 수 있으며, 반대로 일정한 형식의 텍스트 데이터를 숫자로 쉽게 변환하는 것도 가능하다.

보다 자세한 내용은 Java API 문서를 참고하면 된다.

### 2.2 SimpleDateFormat

`SimpleDateFormat`을 사용하는 방법은 간단하다. 먼저 원하는 출력형식의 패턴을 작성하여 `SimpleDateFormat`인스턴스를 생성한 다음, 출력하고자 하는 `Date`인스턴스를 가지고 `format(Date d)`를 호출하면 지정한 출력형식에 맞게 변환된 문자열을 얻게 된다.

### 2.3 ChoiceFormat

`ChoiceFormat`은 특정 범위에 속하는 값을 문자열로 변환해준다. 연속적 또는 불연속적인 범위의 값들을 처리하는 데 있어서 if문이나 switch문이 적절하지 못한 경우 사용하여 코드를 간단하고 직관적으로 만들 수 있다.

### 2.4 MessageFormat

`MessageFormat`은 데이터를 정해진 양식에 맞게 출력할 수 있도록 도와준다. 데이터가 들어갈 자리를 마련해 놓은 양식을 미리 작성하고 프로그램을 이용해서 다수의 데이터를 같은 양식으로 출력할 때 사용하면 좋다.

```java
  import java.text.*;

  class MessageFormatEx {
    public static void main(String[] args) {
      String msg = "Name: {0} \n Tel: {1} \n Age: {2} \n Birthday: {3}";

      Object[] arguments = {
        "홍길동", "02-123-1234", "27", "07-09"
      };

      String result = MessageFormat.format(msg, arguments);
      System.out.println(result);
    }
  }
```

위 예제에서 문자열 `msg`를 작성할 때 '{숫자}'로 표시된 부분이 데이터가 출력될 자리이다. 이 자리는 순차적일 필요는 없고 여러 번 반복해서 사용할 수도 있다. 여기에 사용되는 숫자는 배열처럼 인덱스가 0부터 시작하며, 양식에 들어갈 데이터는 객체배열인 `arguments`에 지정되어 있다.

[위로](#날짜와-시간과-형식화)

## java time 패키지

이 패키지는 다음과 같이 4개의 하위 패키지를 가지고 있다.

|<center>패키지|<center>설명|
|:---|:---|
|java.time|날짜와 시간을 다루는데 필요한 핵심 클래스들을 제공|
|java.time.chrono|표준(ISO)이 아닌 달력 시스템을 위한 클래스들을 제공|
|java.time.format|날짜와 시간을 파싱하고, 형식화하기 위한 클래스들을 제공|
|java.time.temporal|날짜와 시간의 필드(field)와 단위(unit)을 위한 클래스들을 제공|
|java.time.zone|시간대(time-zone)와 관련된 클래스들을 제공|

### 3.1 java.time패키지의 핵심 클래스

`java.time`패키지에서는 날짜와 시간을 별도의 클래스로 분리해 놓았다. 시간을 표현할 때는 `LocalTime`클래스를 사용하고, 날짜를 표현할 때는 `LocalDate`클래스를 사용한다. 그리고 날짜와 시간이 모두 필요할 때는 `LocalDateTime`클래스를 사용하면 된다. 여기에 시간대(time-zone)까지 다뤄야 한다면, `ZonedDateTime`클래스를 사용하면 된다.

`Calendar`는 `ZonedDateTime`처럼, 날짜와 시간 그리고 시간대까지 모두 가지고 있다. `Date`와 유사한 클래스로는 `Instant`가 있는데, 이 클래스는 날짜와 시간을 초 단위(나노초)로 표현한다. 이렇게 표현한 값을 타임스탬프(time-stamp)라고 부르는데, 이 값은 날짜와 시간을 하나의 정수로 표현할 수 있으므로 날짜와 시간의 차이를 계산하거나 순서를 비교하는데 유리해서 데이터베이스에 많이 사용된다.

<p style="color:#a0adec"><b>Period와 Duration</b></p>

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0; text-align:center">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      <b>날짜 - 날짜 = Period</b><br/>
      <b>시간 - 시간 = Duration</b>
    </td>
  </tr>   
</table>

<p style="color:#a0adec"><b>객체 생성하기 - now(), of()</b></p>

`java.time`패키지에 속한 클래스의 객체를 생성하는 가장 기본적인 방법은 `now()`와 `of()`를 사용하는 것이다. `now()`는 현재 날짜와 시간을 저장하는 객체를 생성한다.

`of()`는 단순히 해당 필드의 값을 순서대로 지정해 주기만 하면 된다. 각 클래스마다 다양한 종류의 `of()`가 정의되어 있다.

<p style="color:#a0adec"><b>Temporal과 TemporalAmount</b></p>

`Duration`과 `Period`는 `TemporalAmount`인터페이스를 구현하였고, 나머지 클래스들은 `Temporal`, `TemporalAccessor`, `TemporalAdjuster`인터페이스를 구현하였다. 매개변수의 타입이 `Temporal`로 시작하는 것들은 대부분 날짜와 시간을 위한 것이므로, `TemporalAmount`인지 아닌지만 확인하면 된다.

<p style="color:#a0adec"><b>TemporalUnit과 TemporalField</b></p>

날짜와 시간의 단위를 정의해 놓은 것이 `TemporalUnit`인터페이스이고, 이 인터페이스를 구현한 것이 열거형 `ChronoUnit`이다. 그리고 `TemporalField`는 년, 월, 일 등 날짜와 시간의 필드를 정의해 놓은 것으로, 열거형 `ChronoField`가 이 인터페이스를 구현하였다.

### 3.2 LocalDate와 LocalTime

두 클래스는 `java.time`패키지의 가장 기본이 되는 클래스이며, 나머지 클래스들은 이들의 확장이다.

객체를 생성하는 방법은 현재 날짜와 시간을 `LocalDate`와 `LocalTime`으로 각각 반환하는 `now()`와 지정된 날짜와 시간으로 객체를 생성하는 `of()`가 있다. 둘 다 `static`메서드이다.

<p style="color:#a0adec"><b>특정 필드의 값 가져오기 - get(), getXXX()</b></p>

`LocalDate`와 `LocalTime`의 객체에서 특정 필드의 값을 가져올 때 `getXXX()`와 같은 형태의 메서드를 사용한다. 이 외에도 `get()`과 `getLong()`이 있는데, 원하는 필드를 직접 지정할 수 있다. 대부분의 필드는 `int`타입의 범위에 속하지만, 몇몇 필드는 `int`타입의 범위를 넘을 수 있다. 그럴 때 `get()` 대신 `getLong()`을 사용해야 한다.

메서드들의 매개변수로 사용할 수 있는 필드는 `ChronoField`에 정의되어 있는데, 사용할 수 있는 필드는 클래스마다 다르다. `LocalDate`의 경우 날짜를 표현하기 위한 것이므로, 시간에 관련된 필드는 사용할 수 없다.

<p style="color:#a0adec"><b>필드의 값 변경하기 - with(), plus(), minus()</b></p>

날짜와 시간에서 특정 필드 값을 변경하려면, 다음과 같이 with로 시작하는 메서드를 사용하면 된다.

```
  LocalDate withYear(int year)
  LocalDate withMonth(int month)
  LocalDate withDayOfMonth(int dayOfMonth)
  LocalDate withDayOfYear(int dayOfYear)

  LocalTime withHour(int hour)
  LocalTime withMinute(int minute)
  LocalTime withSecond(int second)
  LocalTime withNano(int nanoOfSecond)
```

`with()`를 사용하면, 원하는 필드를 직접 지정할 수 있다.

```
  LocalDate with(TemporalField field, long newValue)
```

이 외에도 특정 필드에 값을 더하거나 빼는 `plus()`와 `minue()`가 있다. 그리고 `LocalTime`의 `truncatedTo()`는 지정된 것보다 작은 단위의 필드를 0으로 만든다.

`LocalDate`에는 `truncatedTo()`가 없는데, `LocalDate`의 필드인 년, 월, 일은 0이 될 수 없기 때문이다.

<p style="color:#a0adec"><b>날짜와 시간의 비교 - isAfter(), isBefore(), isEqual()</b></p>

`compareTo()`가 적절히 오버라이딩되어 있어서, 아래와 같이 비교할 수 있다.

```
  int result = date1.compareTo(date2); // 같으면 0, date1 이전이면 -1, 이후면 1
```

보다 더 편리하게 비교할 수 있는 메서드들이 추가로 제공된다.

```
  boolean isAfter (ChronoLocalDate other)
  boolean isBefore(ChronoLocalDate other)
  boolean isEqual (ChronoLocalDate other)
```

`equals()`가 있는데도, `isEqual()`을 제공하는 이유는 연표(chronology)가 다른 두 날짜를 비교하기 위해서이다. `equals()`는 모든 필드가 일치해야하지만, `isEqual()`은 날짜만 비교한다. 대부분의 경우 결과가 같다.

### 3.3 Instant

`Instant`는 에포크 타임(EPOCH TIME, 1970-01-01 00:00:00 UTC)부터 경과된 시간을 나노초 다윈로 표현한다. 단일 진법으로만 다루기 때문에 계산하기 쉽다.

`Instant`를 생성할 때는 `now()`와 `ofEpochSecond()`를 사용한다. 그리고 필드에 저장된 값을 가져올 때는 다음과 같이 한다.

```java
  long epochSec = now.getEpochSecond();
  int nano = new.getNano();
```

`Instant`는 항상 UTC(+00:00)를 기준으로 하기 때문에, `LocalTime`과 차이가 있을 수 있다.

<p style="color:#a0adec"><b>Instant와 Date간의 변화</b></p>

`Instant`는 기존의 `java.util.Date`를 대체하기 위한 것이며, JDK1.8부터 `Date`에 `Instant`로 변환할 수 있는 새로운 메서드가 추가되었다.

```
  static Date   from(Instant instant) // Instant -> Date
  Instant       toInstant()           // Date -> Instant
```

### 3.4 LocalDateTime과 ZonedDateTime

<table style="width:100%; background-color:#3a3c42; border:0; margin-bottom:16px;">
  <tr style="border:0; text-align:center">
    <td style="border:0; padding:14px; padding-left:32px; padding-right:32px; font-size:14px; color:white">
      LocalDate + LocalTime -> LocalDateTime<br/>
      LocalDateTime + 시간대 -> ZonedDateTime
    </td>
  </tr>   
</table>

<p style="color:#a0adec"><b>LocalDate와 LocalTime으로 LocalDateTime만들기</b></p>

```java
  LocalDate date = LocalDate.of(2020, 10, 13);
  LocalTime time = LocalTime.of(17, 15, 00);

  LocalDateTime dt1 = LocalDateTime.of(date, time);
  LocalDateTime dt2 = date.atTime(time);
  LocalDateTime dt3 = time.atDate(date);
  LocalDateTime dt4 = date.atTime(17, 15, 00);
  LocalDateTime dt5 = time.atDate(LocalDate.of(2020, 10, 13));
  LocalDateTime dt6 = date.atStartOfDay(); // dt6 = date.atTime(0, 0, 0);
```

<p style="color:#a0adec"><b>LocalDateTime의 변환</b></p>

`LocalDateTime`을 `LocalDate` 또는 `LocalTime`으로 변환할 수 있다.

```java
  LocalDateTime dt = LocalDateTime.of(2020, 10, 13, 17, 15, 00);
  LocalDate date = dt.toLocalDate();
  LocalTime time = dt.toLocalTime();
```

<p style="color:#a0adec"><b>LocalDateTime으로 ZonedDateTime만들기</b></p>

`LocalDateTime`에 시간대(time-zone)을 추가하면, `ZonedDateTime`이 된다. 기존에는 `TimeZone`클래스로 시간대를 다뤘지만 새로운 시간 패키지에서는 `ZoneId`라는 클래스를 사용한다. `ZoneId`는 일광 절약시간(DST, Daylight Saving Time)을 자동적으로 처리해주므로 더 편리하다.

`LocalDateTime`에 `atZone()`으로 시간대 정보를 추가하면 `ZonedDateTime`을 얻을 수 있다. 또는 `LocalDate`에 `atStartOfDay()`라는 메서드에 매개변수로 `ZoneId`를 지정해도 얻을 수 있다.

<p style="color:#a0adec"><b>ZoneOffset</b></p>

UTC로부터 얼마만큼 떨어져 있는지를 `ZoneOffSet`으로 표현한다.

<p style="color:#a0adec"><b>OffsetDateTime</b></p>

`ZonedDateTime`은 `ZoneId`로 구역을 표현하는데, `ZoneOffSet`을 사용하면 `OffsetDateTime`이다. `ZoneOffset`은 시간대를 시간의 차이로만 구분한다.

<p style="color:#a0adec"><b>ZonedDateTime의 변환</b></p>

`ZonedDateTime`도 `LocalDateTime`처럼 날짜와 시간에 관련된 다른 클래스로 변환하는 메서드들을 가지고 있다.

```JAVA
  LocalDate toLocalDate()
  LocalTime toLocalTime()
  LocalDateTime toLocalDateTime()
  OffsetDateTime toOffsetDateTime()
  long toEpochSecond()
  Instant toInstant()
```

### 3.5 TemporalAdjusters
