---
layout: post
date: 2021-02-20 22:30:00
title: "13주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, stream, buffer, channel, input, output ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 13주차 과제](https://github.com/whiteship/live-study/issues/13)를 공부하고 공유하기 위해서 작성되었습니다.

# 13주차 회고

&nbsp;&nbsp;&nbsp;새삼스럽지만 복습을 하면서 내가 이런 내용도 공부했었나 싶은 부분이 많았다. 어디서 본 거 같은 내용들도 많았고, 13주차 학습을 하면서 놓친 부분도 많았다. 13주차까지 오면서 꽤 많은 양의 공부를 했는데, 다시 복습을 하면서 처음보는 것 같은 내용들도 있고 내용에 대해 질문을 했을 때 바로 답변이 나오지 않는 것도 있었다. 적어도 짧은 문장으로 대답을 할 수 있을 정도로 이해를 해야할 필요가 있다.

---

# 질문

# 버퍼를 사용하는 핵심적인 이유를 알고 있는가?

&nbsp;&nbsp;&nbsp;버퍼(Buffer)란 데이터를 전송하는 상호 간의 장치에서 고속의 장치와 저속의 장치 간의 속도 차이로 인해 저속의 장치가 작업을 추리하는 동안, 고속의 장치가 기다려야하는 현상을 줄여주는 기술이며 데이터를 임시 저장하는 공간을 의미한다. 그리고 임시저장장치로 불리운다. 버퍼를 사용하면, 운영체제의 API 호출 횟수를 줄여서 입출력 성능을 개선할 수 있다.

그렇다면 버퍼를 사용하면 성능이 개선되는데 어떻게 개선이 되는 것인가? I/O 입출력 호출은 OS 레벨에서 호출될 때마다 시스템 콜이 발생하게 된다. 즉 한 바이트씩 보내게 되면 보낼 때마다 시스템 콜이 발생하는 것이다. 반면에 버퍼는 데이터를 모아서 전송하기 때문에 시스템 콜이 발생하는 횟수가 줄어드는 것이다.

&nbsp;&nbsp;&nbsp;즉, 핵심은 시스템 콜 횟수가 줄어들었기 때문에 성능에 이점이 생긴 것이지 모아서 보냈기 때문에 이점이 생긴 것은 아니다.

# NIO도 스트림 기반이 될 수 있지 않을까?

&nbsp;&nbsp;&nbsp;io는 스트림기반, nio는 채널기반이라고 한다. 헌데 Channel 클래스는 자기 자신의 생성자를 통해 인스턴스화를 할 수 없고, 오직 Input/OutputStream 기반의 클래스가 생성된 후에 getChannel()로 만들 수 있다고 한다. 그렇다면 NIO도 스트림 기반이 될 수 있지 않을까?

&nbsp;&nbsp;&nbsp;

# Buffer를 활용한 코드와 얼만큼의 성능 차이가 발생할까?

&#9654; InputStream

```java
package week13;

import java.io.FileInputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {

        long start = System.currentTimeMillis();

        FileInputStream fileInputStream = new FileInputStream("/Users/sunwoo/workspace/live-study/src/main/java/week13/test.txt");

        int i = 0;
        try {
            while((i = fileInputStream.read()) != -1 ) {
                System.out.write(i);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                fileInputStream.close();
            } catch (IOException ioe) {
                ioe.printStackTrace();
            }
        }

        System.out.println("걸린 시간 : " + (System.currentTimeMillis() - start));
    }
}
```

&#9654; BufferedInputStream

```java
package week13;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {

        long start = System.currentTimeMillis();

        BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream("/Users/sunwoo/workspace/live-study/src/main/java/week13/test.txt"));

        int i = 0;
        try {
            while((i = bufferedInputStream.read()) != -1 ) {
                System.out.write(i);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                bufferedInputStream.close();
            } catch (IOException ioe) {
                ioe.printStackTrace();
            }
        }

        System.out.println("걸린 시간 : " + (System.currentTimeMillis() - start));
    }
}
```

불러온 파일의 크기가 작아서 비교가 제대로 되지 않았는데 크기가 큰 파일을 이용해서 비교해보면 Buffered가 확실히 성능이 뛰어나다는 것을 알 수 있다.

---

# 학습

# 데코레이터 패턴



# 직렬화와 데코레이터 패턴



# 다이렉트와 논다이렉트 버퍼 비교



# 바이트버퍼



---
**Reference**
+ <https://www.notion.so/I-O-af9b3036338c43a8bf9fa6a521cda242>
+ <https://bingbingpa.github.io/java/whiteship-live-study-week13>
+ <https://github.com/kyu9/WS_study/blob/master/week13.md>
+ <https://velog.io/@jaden_94/13주차-항해일지-IO>
+ <https://alkhwa-113.tistory.com/entry/IO>
+ <https://watrv41.gitbook.io/devbook/java/java-live-study/13_week>
+ <https://github.com/mongzza/java-study/blob/main/study/13%EC%A3%BC%EC%B0%A8.md>
+ <https://www.notion.so/I-O-094fb5c7f8fa41fcb9876586ed3d92db>
