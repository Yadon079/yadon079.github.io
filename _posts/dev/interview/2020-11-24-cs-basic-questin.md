---
layout: post
date: 2020-11-24 16:11:00
title: "초초초 기초 질문 16선"
description: "면접 커트라인(?)"
subject: blog
category: [ etc ]
tags: [ etc, post, dev contents ]
comments: true
---

> 이 글은 [VoyagerX](https://www.voyagerx.com)의 대표 남세동님의 페이스북에 올라온 글에서 나온 질문들에 대한 답을 공부하고 작성한 글입니다.

때는 겨울이 다가오는 어느 화요일 오전 11시 35분 경.

함께 취준생의 길을 걸어가고 있는 K양으로부터 카톡이 날아왔다.

남세동 대표님이 페북에 올리신 글이라면서 긁어온 내용을 보내주었는데 이를 찬찬히 읽어보니 내가 모르는 질문이 꽤 많았다.

이 글에 나온 질문에 답을 할 수 있다고 해서 무조건 면접에 통과해서 취업하고 개발자가 될 수 있는 것은 아니다. 하지만 최소한 50% 이상을 답하지 못한다면 아마 면접을 보는 것도 힘들다고 한다.

### Q. 1바이트는 몇 비트인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;과거에는 4비트, 6비트를 1바이트로 삼는 컴퓨터도 있었으나, 현대의 컴퓨터 아키텍처에서는 8비트를 1바이트로 삼는다. 표준 C 언어에서는 '8비트 이상'을 1바이트로 삼도록 규정하고 있다.</p>
  <br/>
  <p><b>반드시 8비트 == 1바이트는 아니다</b></p>
  <p>&nbsp;&nbsp;&nbsp;C의 경우 한 바이트는 실행 환경에서 쓰이는 문자들을 담을 수 있을 만큼 큰 단위(C 표준 3.5항)로 정의되며, 한 바이트를 담는 `char` 자료형은 부호의 유무에 상관 없이 적어도 8비트 이상이어야 한다. 자바의 `byte` 자료형은 항상 부호가 있으며 8비트로 정의된다.</p>
  <p>7bit, 16bit이면 안되고 꼭 8bit 이어야 하는가? 라고 한다면, 컴퓨터 아키텍쳐가 영문권에서 발전했기 때문이라고 한다.</p>
  <p>0101010로 이루어진 전자신호를 사람이 인식할 수 있는 문자로 저장을 해야 하는데, 이런 문자를 표현하는 코드들의 숫자가 7bit ~ 8bit로 충분했었다고 한다. (ASCII 코드)</p>
  <p>1개당 2개의 정보를 표시 가능한 비트를 8개 묶은 1옥텟으로 256종류의 정보를 나타낼 수 있다. 숫자와 영문자(유니코드)를 모두 표현하고 남는 공간에 특수문자까지 할당할 수 있어 7비트보다 다루기 편하기 때문에 1옥텟 = 1바이트인 CPU가 나온 이래로 사실상 8비트가 표준 1바이트로 된 것이다. 물론 7비트로도 숫자와 영문자를 다 표현하고도 남는다. ASCII 코드는 실제로 7bit이고 아스키 확장 부호를 포함하여 8bit이기 때문에 이러한 점에서 7비트를 1바이트로 삼기도 한다.</p>
  <br/>
</details>

### Q1. 1픽셀은 몇 바이트인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q2. 2^10은 얼마인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q3. Stack과 Queue의 차이는?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q4. Binary Tree의 시간 복잡도는 어떻게 되는가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q5. DNS의 역할은 무엇인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q6. HTTPS와 HTTP의 차이는 무엇인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q. 칼라 값 ffffff는 무슨 색인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q7. \<a href>는 무슨 뜻인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q8. call by reference는 무엇인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q9. Event Listener는 무엇인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q10. OOP에서 상속은 무엇인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q11. non-blocking call이 무엇인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q12. 버전관리에서 commit의 뜻은?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q13. try / catch는 무엇인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q14. 디버깅 할 때 breakpoint는 무엇인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q15. 패스워드는 서버에 어떻게 보관되는가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>

### Q16. SSD가 HDD보다 빠른 이유는 무엇인가?

<details>
  <summary><b>답변 보기</b></summary>
  <br/>
  <p>&nbsp;&nbsp;&nbsp;</p>
  <br/>
</details>
