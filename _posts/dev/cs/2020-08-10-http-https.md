---
layout: post
date: 2020-08-10 14:50:00
title: "HTTP & HTTPS"
description: "http와 https"
subject: dev
category: [ cs ]
tags: [ network, internet ]
comments: true
---

### HTTP
> HyperText Transfer Protocol

HTTP는 인터넷 상에서 클라이언트와 서버가 자원을 주고 받을 때 쓰는 통신 규약

**HTTP의 문제점**

+ HTTP는 텍스트 통신이기 때문에 도청이 가능하다.
+ 통신 상대를 확인하지 않기 때문에 위장이 가능하다.
+ 완전성을 증명할 수 없기 때문에 변조가 가능하다.

*위 세가지는 다른 암호화하지 않은 프로토콜에도 공통되는 문제점*

**TCP/IP는 도청 가능한 네트워크이다.**
&nbsp;TCP/IP 구조의 통신은 전부 통신 경로 상에서 엿볼 수 있고, 패킷을 수집하는 것만으로 도청할 수 있다. 텍스트로 통신할 경우 메시지의 의미를 파악할 수 있기 때문에 암호화하여 통신해야 한다.

보안 방법
+ 통신 자체를 암호화 `SSL(Secure Socket Layer)` 또는 `TLS(Transport Layer Security)`라는 다른 프로토콜을 조합함으로써 HTTP의 통신내용을 암호화할 수 있다. SSL을 조합한 HTTP를 `HTTPS(HTTP Secure)` 또는 `HTTP over SSL`이라고 부른다.
+ 콘텐츠를 암호화, 말 그대로 HTTP를 사용해서 운반하는 내용인 HTTP 메시지에 포함되는 콘텐츠만 암호화하는 것이다. 암호화해서 전송하면 받은 측에서는 그 암호를 해독하여 출력하는 처리가 필요하다.

**통신 상대를 확인하지 않기 때문에 위장이 가능하다.**
&nbsp;HTTP에 의한 통신은 상대가 누구인지 확인하는 처리가 없기 때문에 누구든지 Request를 보낼 수 있다. IP 주소나 포트 등에서 해당 웹 서버에 액세스 제한이 없는 경우 Request가 오면 상대가 누구든지 무언가의 Response를 반환한다. 이러한 특징은 여러 문제점을 유발한다.
1. Request를 보낸 곳의 웹 서버가 의도한 Response를 보내야하는 웹 서버인지 확인할 수 없다.
2. Response를 반환한 곳의 클라이언트가 원래 의도한 Request를 보낸 클라이언트인지 확인할 수 없다.
3. 통신하고 있는 상대가 접근이 허가된 상대인지 확인할 수 없다.
4. 어디에서 누가 Request 했는지 확인할 수 없다.
5. 의미없는 Request도 수신한다. -> DoS 공격을 방지할 수 없다.

보완 방법
+ 암호화 방법으로 언급된 `SSL`로 상대를 확인할 수 있다. `SSL`은 상대를 확인하는 수단으로 증명서를 제공하고 있다. 증명서는 신뢰할 수 있는 **제 3 자 기관에 의해** 발행되는 것이기 때문에 서버나 클라이언트가 실재하는 사실을 증명한다. 이 증명서를 이용함으로써 통신 상대가 내가 통신하고자 하는 서버임을 나타내고 이용자는 개인 정보 누설 등의 위험성이 줄어들게 된다. 클라이언트는 이 증명서로 본인 확인을 하고 웹 사이트 인증에도 이용할 수 있다.

**완전성을 증명할 수 없기 때문에 변조가 가능하다.**
&nbsp;완전성이란 **정보의 정확성** 을 의미한다. 서버 또는 클라이언트에서 수신한 내용이 송신측에서 보낸 내용과 일치한다는 것을 보장할 수 없다. Request나 Response가 발신되고 상대가 수신하는 사이에 누군가에 의해 변조되어도 알 수 없다. 이와 같이 공격자가 중간에서 변조하는 공격을 `중간자 공격(Man-in-Middle)`이라고 한다.

보완 방법
+ `MD5`, `SHA-1`등의 해시 값을 확인하는 방법과 파일의 디지털 서명을 확인하는 방법이 존재한다. 하지만 두 방법 모두 확신할 수 있는 것은 아니다. 확실하게 방지하기 위해서는 `HTTPS`를 사용해야 한다. `SSL`에는 인증이나 암호화, 그리고 다이제스트 기능을 제공하고 있다.

---

### HTTPS
> HyperText Transfer Protocol Secure

인터넷 상에서 정보를 암호화하는 SSL 프로토콜을 사용해 클라이언트와 서버가 자원을 주고 받을 때 쓰는 통신 규약

&nbsp;`HTTPS`는 HTTP에 암호화와 인증, 그리고 완전성 보호를 더한 SSL의 껍질을 덮어쓴 HTTP라고 할 수 있다. 즉, HTTPS는 새로운 어플리케이션 계층의 프로토콜이 아니라 HTTP 통신하는 소켓 부분을 `SSL(Secure Socket Layer)` 또는 `TLS(Transport Layer Security)`라는 프로토콜로 대체하는 것이다. HTTP는 원래 TCP와 직접 통신했지만, HTTPS에서 HTTP는 **SSL과 통신하고 SSL이 TCP와 통신하게 된다.** SSL을 사용한 HTTPS는 암호화와 증명서, 안전성 보호를 이용할 수 있게 된다.

&nbsp;HTTPS의 SSL에서는 공통키 암호화 방식과 공개키 암호화 방식을 혼합한 하이브리드 암호 시스템을 사용한다. 공통키를 공개키 암호화 방식으로 교환하고 다음 통신부터 공통키 암호를 사용하는 방식이다.
[공개키 설명](https://yadon079.github.io/2020/cs/symmetric-public-key)

**HTTPS 통신 흐름**
1. 애플리케이션 서버(A)를 만드는 기업은 HTTPS를 적용하기 위해 공개키와 개인키를 만든다.
2. 신뢰할 수 있는 CA[^CA] 기업을 선택하고, 그 기업에게 내 공개키 관리를 부탁하며 계약한다.
3. 계약이 완료된 CA 기업은 해당 기업의 이름, A서버 공개키, 공개키 암호화 방법을 담은 인증서를 만들고, 해당 인증서를 CA 기업의 개인키로 암호화해서 A서버에게 제공한다.
4. A서버는 암호화된 인증서를 갖게 되었다. 이제 A서버는 공개키로 암호화된 HTTPS 요청이 아닌 다른 요청이 오면, 이 암호화된 인증서를 클라이언트에게 건네준다.
5. 클라이언트가 `main.html` 파일을 받아 A서버에게 요청했다고 가정할 때, HTTPS 요청이 아니기 때문에 CA기업이 A서버의 정보를 CA 기업의 개인키로 암호화한 인증서를 받게 된다.

> CA기업의 공개키는 브라우저가 이미 알고있다. 세계적으로 신뢰할 수 있는 기업으로 등록되어 있기 때문에, 브라우저가 인증서를 탐색하여 해독이 가능.

6. 브라우저는 해독한 뒤 A서버의 공개키를 얻게 되었다. 이제 A서버와 통신할 때 얻은 A서버의 공개키로 암호화해서 요청을 날리게 된다.

*신뢰받는 CA 기업이 아닌 자체 인증서를 발급한 경우 브라우저에서 `주의 요함`. `안전하지 않은 사이트`와 같은 알림으로 주의를 받게 된다.*

**모든 웹 페이지에서 HTTPS를 사용하지 않는 이유**
&nbsp;텍스트 통신에 비해서 암호화 통신은 CPU나 메모리 등 리소스가 많이 필요하다. 통신할 때마다 암호화를 하면 많은 리소스를 소비하기 때문에 서버 한 대당 처리할 수 있는 Request의 수가 줄어들게 된다. 따라서 민감한 정보를 다룰 때만 HTTPS에 의한 암호화 통신을 사용한다.

---
**Reference**
+ [Interview_Question_for_Beginner](https://github.com/JaeYeopHan/Interview_Question_for_Beginner)
+ [tech-interview-for-developer](https://github.com/gyoogle/tech-interview-for-developer)
+ [Http와 Https 이해와 차이점 그리고 오해(?)](https://jeong-pro.tistory.com/89)


[^CA]:CA란? Certificate Authority로 공개키를 저장해주는 신뢰성이 검증된 민간기업
