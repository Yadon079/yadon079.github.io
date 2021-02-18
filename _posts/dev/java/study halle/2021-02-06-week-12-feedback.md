---
layout: post
date: 2021-02-06 22:30:00
title: "12주차 피드백"
description: "study halle"
subject: live study
category: [ java study halle ]
tags: [ java, annotation ]
use_math: true
comments: true
---

> 해당 글을 [백기선 님의 자바 스터디 12주차 과제](https://github.com/whiteship/live-study/issues/12)를 공부하고 공유하기 위해서 작성되었습니다.

# 12주차 회고

&nbsp;&nbsp;&nbsp;이번 주는 어려웠다. 4주차, 5주차 쯤에 공부는 했는데 과제를 하지 못했던 딱 그 느낌이 들었었다. 분명히 책을 보고 찾으면서 공부를 했음에도 불구하고 이해가 잘 되지 않았었다. 제출을 하고 나서도 다시 공부를 했는데도 머리에 들어는 오는데 남지는 않는 느낌?이 강했던거 같다.

그 동안 공부해왔었던 스터디 내용들을 다시 한번 살펴봤다. 이해하고 넘어갔다고 생각했던 것인데 다시보니 새롭게 느껴지는 것들도 많았다. 당시에는 내 것이 되었다고 생각하고 넘어갔는데 아니였나보다.

---

# 질문

# functional interface 지시자가 무엇인가요?

&nbsp;&nbsp;&nbsp;인터페이스 중에 메서드가 하나인 것들이 있다. 정의되어 있는 함수가 하나인 인터페이스에 functional interface라는 애노테이션을 붙여서 "함수형 인터페이스로 사용될 수 있는 인터페이스"라는 것을 알릴 수 있다.

# 커스텀 애노테이션에서 @Target으로 위치를 결정하지 않으면 어떻게 될까?

아무 곳에나 쓸 수 있다!

# 애노테이션은 왜 생겼을까?

탄생 이유는 프로그래머에게 그들의 코드에 대한 메타데이터를 자신의 코드에 직접적으로 기술할수있는것을 제공하기위함이다. 어노테이션이 만들어지기전에 프로그래머가 자신의 코드를 기술하는 방법은 transient 키워드를 사용한다던가, 주석(comments) 를 통하여, 인터페이스를 이용등등 중구난방이었다.그리고 여러타입의 어플리케이션에서 코드를 기술하는 메커니즘은 주로 XML 이 사용되어졌는데 이것은 그리 좋은 방법은 아닌게 코드와 XML (XML 은 코드가 아니다) 사이에 디커플링이 발생되고 이것은 어플리케이션을 유지보수하기 힘들게 한다.

출처 : https://hamait.tistory.com/315

# @inherited의 용도가 무엇인가?

&nbsp;&nbsp;&nbsp;애노테이션을 만드는 사람의 의도가 담긴 것이다. 하위 클래스까지 전파시키겠다는 의도가 담긴 것

---

# 학습

# 애노테이션

&nbsp;&nbsp;&nbsp;애노테이션은 주석이다. 무언가 동작을 하거나 작동하는 코드가 아니라 단지 표시를 해놓는 것이다.

단순히 이 코드가 어떠한 동작을 한다고 알려주는 주석이기 때문에 다이나믹하게 움직이는 값, 즉 런타임 중에 알아내야 하는 값은 들어갈 수 없다. 컴파일러 수준에서 해석이 되거나 완전히 정적이여야 한다.

```java
package me.gracenam.study.week12;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    private static final String hello = "hello";

    @GetMapping(hello)
    public String hello() {
        return "hello";
    }
}
```

위 코드에서 hello는 완전히 정적이다. 만약 여기서 final이 제거된다면 hello는 값이 바뀔 수 있게 되고 동적이기 때문에 hello는 더 이상 @GetMapping에 사용될 수 없다.

# Java Reflection

&nbsp;&nbsp;&nbsp;reflection은 자바의 특징 중 하나로 <b>객체를 통해 클래스의 정보를 분석하는 프로그램 기법</b>을 말한다. 이렇게 말하면 뭔 소리인가 싶을텐데 쉽게 말해서 구체적인 클래스 타입을 알지 못해도 해당 클래스의 객체 생성, 메소드, 타입, 변수들에 접근할 수 있도록 도와주는 API이다.

자바에서는 구체적인 클래스 타입을 알지 못하는 상태에서는 메소드를 실행시킬 수 없다.

```java
  public class Fruit {
      public void Apple() {
          System.out.println("사과는 빨갛다.");
      }
  }

  public class Main {
      public static void main(String[] args) {
          Object fruit = new Fruit();
          fruit.Apple(); // 컴파일 에러
      }
  }
```

<img src="/assets/img/study/12feedback.png" width="70%" align="center"><br/>

왜 이런 에러가 발생할까? 모든 클래스의 조상인 Object타입은 Fruit 클래스의 인스턴를 담을 수는 있지만 사용하지는 못하기 때문이다. 이 부분은 상속을 공부하면 잘 알 수 있다.

&nbsp;&nbsp;&nbsp;이런 식으로 구체적인 타입의 클래스를 모를 때 사용하는게 리플렉션이다.

그렇다면 이러한 리플렉션이 어떻게 가능한 것일까? 자바는 스크립트 언어가 아닌 컴파일 언어이기 때문이다. 자바 클래스 파일은 바이트 코드로 컴파일 되어 Static 영역에 위치하는데, 이 Static 영역에서 클래스 이름만 가지고도 언제든지 정보를 가져올 수 있는 것이다. 가져올 수 잇는 정보는 아래와 같다.

+ ClassName
+ Class Modifiers(public, private, synchronized 등등)
+ Package Info
+ Superclass
+ Implemented Interface
+ Constructors
+ MethodsFields
+ Annotations

# DeclaredAnnotatios



# javadoc

&nbsp;&nbsp;&nbsp;JavaDoc은 Java코드에서 API문서를 HTML 형식으로 생성해주는 도구이다. HTML 형식이기 때문에 다른 API를 하이퍼 링크를 통해 접근이 가능하다.

대표적인 예시로 [Mockito](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html)가 있다.

## JavaDoc Tags

JavaDoc은 여러 Tag를 작성하여 문서를 완성한다. Java 코드에서 애노테이션으로 추가하며 IDE에서 /** 입력 후 엔터를 치면 자동으로 형식이 생성된다.

&#9654; Javadoc Tags의 종류들

- @author
- @deprecated
- @exception
- @param
- @return
- @see
- @serial
- @serialData
- @serialField
- @since
- @throws
- @since
- @throws
- @version

# 애노테이션 프로세서

## 그대, 자바의 ServiceLoader를 들어봤는가?

# 싱글 값 애노테이션

```java
@Inherited
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface CustomUserAnnotation {
    String value();
}
```

```java
class Sample{
    @CustomUserAnnotation("gracenam")
    public void go(){
        System.out.println("annotationTest");
    }
}
```

어노테이션 멤버의 이름을 value( )로 주었을 경우, 외부에서 호출시 ( )에 `멤버 =` 형식을 생략할 수 있다.

---

# 롬복의 @getter, @setter를 직접 만들어보자

## mvn porm.xml

```java
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>me.maru</groupId>
  <artifactId>fakeLombok</artifactId>
  <version>1.0</version>
  <name>fakeLombok</name>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <auto-service.version>1.0-rc4</auto-service.version>
  </properties>

  <dependencies>

    <dependency>
      <groupId>com.google.auto.service</groupId>
      <artifactId>auto-service</artifactId>
      <version>${auto-service.version}</version>
      <optional>true</optional>
    </dependency>

    <dependency>
      <groupId>com.github.olivergondza</groupId>
      <artifactId>maven-jdk-tools-wrapper</artifactId>
      <version>0.1</version>
    </dependency>

  </dependencies>

</project>
```

## @Get 어노테이션 정의하기
​
&nbsp;&nbsp;&nbsp;@Getter 어노테이션을 정의만 하는건 간단하다. 하지만, 지금 Getter 와 같은 어노테이션을 만들 때, 사용자에게 이 어노테이션의 기능 스펙, 또는 사용법을 최소한으로 작성하긴 해야한다.

```java
package me.maru.anno;

import java.lang.annotation.*;

/**
 * Fake lombok :
 * 1. 클래스 선언부 위로 선언할 시, 클래스 안에있는
 * 필드를 모두 인식하여, 바이트코드에서 getter 메서드를 자동생성
 * 2. @Get 메서드는 추 후 문제가 될 수 있으며, openApi 를 사용하여 개발한 것이
 * 아니라는점을 알고 사용하시길 바랍니다.
 *
 * @author  maru
 */
@Documented
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.SOURCE)
public @interface Get {
}
```

+ @Documented : 이 어노테이션의 스펙을 자바 문서화 시키는 걸 얘기를 한다. 위에 같이 주석을 문서화 시킬 수 있다. 즉, javadoc으로 api 문서를 만들 때, 어노테이션에 대한 설명을 포함할 수 있게 지정해 주는 것이다.
+ @Target : 어노테이션을 적용할 수 있는 위치를 의미한다.
  + Type: Class, Interface(annotation), enum
  + Field, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE, ANNOTATION_TYPE, PACKAGE, etc..
+ @Retention : 어노테이션을 어디까지 가지고 사용할 것이냐 이다. 지금 만들어야할 @Get 은 컴파일하고 난 뒤에 필요가 없기 때문에 SOURCE 상에서만 유지하기로 하자.

## 어노테이션 프로세스
​
&nbsp;&nbsp;&nbsp;어노테이션 프로세서라고 함은, 내가 만든 어노테이션에 구체적인 동작 행위를 하기위해서 자바에서 제공하는 api 이다. @Get 어노테이션을 사용하기 위해서 @GetProcessor를 만들어보도록 하자. 우리는 AbstractProcessor 를 extends 받아서 개발하자.

&#9654; GetProcessor 클래스 생성

```java
/**
 * SupportedAnnotationTypes 어떤 어노테이션을 위한 프로세서 인가?
 * SupportedSourceVersion jdk 지원 정보
 * AutoService(Processor.class) MAINFEST 자동생성
 */
@SupportedAnnotationTypes("me.maru.anno.Get")
@SupportedSourceVersion(SourceVersion.RELEASE_8)
@AutoService(Processor.class)
public class GetProcessor extends AbstractProcessor {

}
```

+ SupportedAnnotationTypes 어떤 어노테이션을 위한 프로세서 인가?
  + SupportedSourceVersion jdk 지원 정보
  + AutoService(Processor.class) MAINFEST 자동생성

## init 메소드

&nbsp;&nbsp;&nbsp;init 메서드를 오버라이딩 하여, 컴파일시 정보를 얻어야 한다. 예를들어 대표적으로 syntax tree 에 대한 정보를 얻어오는걸 근간으로 한다.

```java
/**
 *  1. names 추후 메소드를 생성에서, parm or method 이름 생성을 위함.
 *  2. Treemaker Abstract Syntax Tree 를 make 하는 메소드 제공
 *  예) method 정의, parameter 값 정의 etc..
 */
@Override
public synchronized void init(ProcessingEnvironment processingEnv) {
    JavacProcessingEnvironment javacProcessingEnvironment = (JavacProcessingEnvironment) processingEnv;
    super.init(processingEnv);
    this.processingEnvironment = processingEnv;
    this.trees = Trees.instance(processingEnv);
    this.context = javacProcessingEnvironment.getContext();
    this.treeMaker = TreeMaker.instance(context);
    this.names = Names.instance(context);
}
```

+ Names 추후 메소드를 생성하여 parm or method 이름 생성을 위함
+ Treemaker : Abstact Syntax Tree 를 생성하는데 사용하게 된다. JCTree는 AST를 만들어내는 최상위 클래스이다. 하지만 JCTree를 이용하여 new 를 사용하여 직접 생성할 수 없기에 Context를 이용해 AST 를 인식하고 Treemaker 라는 객체를 사용해야 한다는 것이다. 예) method 정의, method 의 parm 값 정의
+ Trees : 어노테이션 프로스세의 process의 RoundEnvironment 가 코드의 element를 순회 하면서 받는 element의 정보들을 trees 에 넣기위에 선언

## Process 메소드

&nbsp;&nbsp;&nbsp;이제 직접 AST를 수정해야 한다. annotation processor의 비지니스 로직은 process 메서드를 통해서 이루어 진다. return 값은 boolean 으로 java compiler가 return 값이 true 이면 "이 어노테이션을 처리했고, 다른 annotation processor가 처리하지 않아도 된다"라고 해준다.

```java
/**
 *  process 의 리턴값으로 어놈테이션을 처리하고 난 뒤, 다른 어노테이션이 지원되지 않도록 조정
 * @return true (이 필드, 클래스는 끝남) or false (이, 필드 클래스는 끝나지 않음)
 */   
@Override
public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
    System.out.println("process 메서드 실행");

    // TreePathScanner 모든 하위 트리노드를 방문하고, 상위 노드에 대한 경로를 유지하는 tree visitor
    TreePathScanner<Object, CompilationUnitTree> scanner = new TreePathScanner<Object, CompilationUnitTree>() {

        /**
         * CompillationUnitTree 는 소스파일에서 패키지 선언에서 부터 abstract syntax tree 를 정의함
         * ClassTree -> 클래스 , 인터페이스, enum 어노테이션을 트리노드로 선언
         * class 정의 위에 어노테이션 작성시 내부적으로 메소드 실행
         * CompilationUnitTree AST(Abstract Syntax Tree 의 최상단)
         */
        @Override
        public Trees visitClass(ClassTree classTree, CompilationUnitTree unitTree){
            JCTree.JCCompilationUnit compilationUnit = (JCTree.JCCompilationUnit) unitTree;
            // .java 파일인지 확인후 accept 를 통해 treeTransLator, 작성 메소드 생성
            if (compilationUnit.sourcefile.getKind() == JavaFileObject.Kind.SOURCE) {
                compilationUnit.accept(new TreeTranslator() {

                    @Override
                    public void visitClassDef(JCTree.JCClassDecl jcClassDecl) {
                        super.visitClassDef(jcClassDecl);
                        // Class 내부에 정의된 모든 member 를 싹다 가져옴.
                        List<JCTree> members = jcClassDecl.getMembers();

                        // Syntax tree 에서 모든 member 변수 얻음.
                        for(JCTree member : members) {
                            if (member instanceof JCTree.JCVariableDecl) {
                                // member 변수에 대한 getter 메서드 생성.
                                List<JCTree.JCMethodDecl> getters = createGetter((JCTree.JCVariableDecl) member);

                                for(JCTree.JCMethodDecl getter : getters) {
                                    jcClassDecl.defs = jcClassDecl.defs.prepend(getter);
                                }
                            }
                        }
                    }
                });
            }
            return trees;
        }
    };

    /**
     * RoundEnvironment
     * getElementsAnnotatedWith() -> @Get 의 어노테이션이 붙여져 있는 모든 element 를 불러 일으킨다.
     */
    for (final Element element : roundEnv.getElementsAnnotatedWith(Get.class)) {

        // 현재 어노테이션은 Type 이고 여기서 Class 뿐만 아니라, interface 와 enum 에도 작성이 가능하므로 class만 지정할 수 있도록
        if(element.getKind() != ElementKind.CLASS) {
            processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "@Get annotation cant be used on" + element.getSimpleName());
        } else {
            processingEnv.getMessager().printMessage(Diagnostic.Kind.NOTE, "@Get annotation Processing " + element.getSimpleName());
            final TreePath path = trees.getPath(element);
            scanner.scan(path, path.getCompilationUnit());
        }
    }
    return true;
}

public List<JCTree.JCMethodDecl> createGetter(JCTree.JCVariableDecl var) {

    // 필드 이름 변수에 앞문자 대문자로 변경 해주기
    String str = var.name.toString();
    String upperVar = str.substring(0,1).toUpperCase()+str.substring(1,var.name.length());

    return List.of(
        /**
         * treeMaker.Modifiers -> syntax tree node 에 접근하여 수정및 삽입하는 역할
         * @Parm : treeMaker.Modifiers flag 1-> public , 2-> private, 0-> default
         * @Parm : methodName & Type, return 정의
         */
        treeMaker.MethodDef (
            treeMaker.Modifiers(1), // public
            names.fromString("get".concat(upperVar)), // 메서드 명
            (JCTree.JCExpression) var.getType(), // return type
            List.nil(),
            List.nil(),
            List.nil(),
            // 식생성 this.a = a;
            treeMaker.Block(1, List.of(treeMaker.Return((treeMaker.Ident(var.getName()))))),
            null));
}
```

+ @Get 어노테이션이 붙여져 있는 클래스를 찾은 후에 Syntax tree를 가져오도록 한다. tree 내부에서 element의 member 변수를 가지는 노드를 찾고 직접 메소드를 생성하고, 직접 method를 만들어 sytax tree 의 node를 만들어 준다.

&nbsp;&nbsp;&nbsp;Annotation 작성한 프로젝트에서 mvn clean install 을 해주도록 하자. autoService 의 도움으로 jar 패키징도 문제 없을거고 내가만든 프로젝트를 메이븐프로젝트에 의존성 주입해보도록 해보자.

```java
  <dependencies>

    <dependency>
      <groupId>me.maru</groupId>
      <artifactId>fakeLombok</artifactId>
      <version>1.0</version>
    </dependency>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>RELEASE</version>
      <scope>test</scope>
    </dependency>

  </dependencies>
```

## 어노테이션 직접 사용하기

```java
package org.example;

import me.maru.anno.Get;
import me.maru.anno.Set;

@Get @Set
public class Car {
    private String name = "로드스터 2";
    private String company = "테슬라";

}

//decomile .class file

//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package org.example;

public class Car {
    private String name = "로드스터 2";
    private String company = "테슬라";

    public void setCompany(String _company) {
        this.company = _company;
    }

    public void setName(String _name) {
        this.name = _name;
    }

    public String getCompany() {
        return this.company;
    }

    public String getName() {
        return this.name;
    }

    public Car() {
    }
}
```

## 테스트 코드

```java
package org.example;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class FakeLombokTest {
    // given
    Car car1 = new Car();

    @Test
    @DisplayName("getter 메소드 테스트")
    void testGetter(){

        //when
        String name = car1.getName();
        String company = car1.getCompany();

        //then
        assertThat(name).isEqualTo("로드스터 2");
        assertThat(company).isEqualTo("테슬라");
    }

    @Test
    @DisplayName("setter 메소드 테스트")
    void testSetter(){

        //when
        car1.setName("소나타");
        car1.setCompany("현대");
        String name = car1.getName();
        String company = car1.getCompany();

        //then
        assertThat(name).isEqualTo("소나타");
        assertThat(company).isEqualTo("현대");
    }
}
```

## 만들어진 코드

&#9654; Get.java

```java
package me.maru.anno;

import java.lang.annotation.*;

/**
 * Fake lombok :
 * 1. 클래스 선언부 위로 선언할 시, 클래스 안에있는
 * 필드를 모두 인식하여, 바이트코드에서 getter 메서드를 자동생성
 * 2. @Get 메서드는 추 후 문제가 될 수 있으며, openApi 를 사용하여 개발한 것이
 * 아니라는점을 알고 사용하시길 바랍니다.
 *
 * @author  maru
 * @since 1.0
 */
@Documented
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.SOURCE)
public @interface Get {
}
```

&#9654; Set.java

```java
package me.maru.anno;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.SOURCE)
public @interface Set {
}
```

&#9654; GetProcessor.java

```java
package me.maru.processor;

import com.google.auto.service.AutoService;
import com.sun.source.tree.ClassTree;
import com.sun.source.tree.CompilationUnitTree;
import com.sun.source.util.TreePath;
import com.sun.source.util.TreePathScanner;
import com.sun.source.util.Trees;
import com.sun.tools.javac.processing.JavacProcessingEnvironment;
import com.sun.tools.javac.tree.JCTree;
import com.sun.tools.javac.tree.TreeMaker;
import com.sun.tools.javac.tree.TreeTranslator;
import com.sun.tools.javac.util.Context;
import com.sun.tools.javac.util.List;
import com.sun.tools.javac.util.Names;
import me.maru.anno.Get;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.ElementKind;
import javax.lang.model.element.TypeElement;
import javax.tools.Diagnostic;
import javax.tools.JavaFileObject;
import java.util.Set;

/**
 * SupportedAnnotationTypes 어떤 어노테이션을 위한 프로세서 인가?
 * SupportedSourceVersion jdk 지원 정보
 * AutoService(Processor.class) MAINFEST 자동생성
 */
@SupportedAnnotationTypes("me.maru.anno.Get")
@SupportedSourceVersion(SourceVersion.RELEASE_8)
@AutoService(Processor.class)
public class GetProcessor extends AbstractProcessor {
    private ProcessingEnvironment processingEnvironment;
    private Trees trees;
    private TreeMaker treeMaker;
    private Names names;
    private Context context;

    /**
     *             1. names 추후 메소드를 생성에서, parm or method 이름 생성을 위함.
     *             2. Treemaker Abstract Syntax Tree 를 make 하는 메소드 제공
     *             예) method 정의, parameter 값 정의 etc..
     */

    @Override
    public synchronized void init(ProcessingEnvironment processingEnv) {
        JavacProcessingEnvironment javacProcessingEnvironment = (JavacProcessingEnvironment) processingEnv;
        super.init(processingEnv);
        this.processingEnvironment = processingEnv;
        this.trees = Trees.instance(processingEnv);
        this.context = javacProcessingEnvironment.getContext();
        this.treeMaker = TreeMaker.instance(context);
        this.names = Names.instance(context);
    }

    /**
     *  process 의 리턴값으로 어놈테이션을 처리하고 난 뒤, 다른 어노테이션이 지원되지 않도록 조정
     * @return true (이 필드, 클래스는 끝남) or false (이, 필드 클래스는 끝나지 않음)
     */
    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        System.out.println("process 메서드 실행");
        // TreePathScanner 모든 하위 트리노드를 방문하고, 상위 노드에 대한 경로를 유지하는 tree visitor
        TreePathScanner<Object, CompilationUnitTree> scanner = new TreePathScanner<Object, CompilationUnitTree>(){
            /**
             * CompillationUnitTree 는 소스파일에서 패키지 선언에서 부터 abstract syntax tree 를 정의함
             * ClassTree -> 클래스 , 인터페이스, enum 어노테이션을 트리노드로 선언
             * class 정의 위에 어노테이션 작성시 내부적으로 메소드 실행
             * CompilationUnitTree AST(Abstract Syntax Tree 의 최상단)
             */
            @Override
            public Trees visitClass(ClassTree classTree, CompilationUnitTree unitTree){
                    JCTree.JCCompilationUnit compilationUnit = (JCTree.JCCompilationUnit) unitTree;
                    // .java 파일인지 확인후 accept 를 통해 treeTransLator, 작성 메소드 생성
                    if (compilationUnit.sourcefile.getKind() == JavaFileObject.Kind.SOURCE){
                        compilationUnit.accept(new TreeTranslator() {
                            @Override
                            public void visitClassDef(JCTree.JCClassDecl jcClassDecl) {
                                super.visitClassDef(jcClassDecl);
                                // Class 내부에 정의된 모든 member 를 싹다 가져옴.
                                List<JCTree> members = jcClassDecl.getMembers();
                                // Syntax tree 에서 모든 member 변수 get
                                for(JCTree member : members){
                                    if (member instanceof JCTree.JCVariableDecl){
                                        // member 변수에 대한 getter 메서드 생성
                                        List<JCTree.JCMethodDecl> getters = createGetter((JCTree.JCVariableDecl) member);
                                        for(JCTree.JCMethodDecl getter : getters){
                                            jcClassDecl.defs = jcClassDecl.defs.prepend(getter);
                                        }
                                    }
                                }
                            }
                        });
                    }
                    return trees;
            }
        };
        /**
         * RoundEnvironment
         * getElementsAnnotatedWith() -> @Get 의 어노테이션이 붙여져 있는 모든 element 를 불러 일으킨다.
         */
        for (final Element element : roundEnv.getElementsAnnotatedWith(Get.class)) {
            // 현재 어노테이션은 Type 이고 여기서 Class 뿐만 아니라, interface 와 enum 에도 작성이 가능하므로 class만 지정할 수 있도록
            if(element.getKind() != ElementKind.CLASS){
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR, "@Get annotation cant be used on" + element.getSimpleName());
            }else{
                processingEnv.getMessager().printMessage(Diagnostic.Kind.NOTE, "@Get annotation Processing " + element.getSimpleName());
                final TreePath path = trees.getPath(element);
                scanner.scan(path, path.getCompilationUnit());
            }
        }

        return true;
    }

    public List<JCTree.JCMethodDecl> createGetter(JCTree.JCVariableDecl var){
        // 필드 이름 변수에 앞문자 대문자로 변경 해주기
        String str = var.name.toString();
        String upperVar = str.substring(0,1).toUpperCase()+str.substring(1,var.name.length());

        return List.of(
                /**
                 * treeMaker.Modifiers -> syntax tree node 에 접근하여 수정및 삽입하는 역할
                 * @Parm : treeMaker.Modifiers flag 1-> public , 2-> private, 0-> default
                 * @Parm : methodName & Type, return 정의
                 */
                treeMaker.MethodDef(
                        treeMaker.Modifiers(1), // public
                        names.fromString("get".concat(upperVar)), // 메서드 명
                        (JCTree.JCExpression) var.getType(), // return type
                        List.nil(),
                        List.nil(),
                        List.nil(),
                        // 식생성 this.a = a;
                        treeMaker.Block(1, List.of(treeMaker.Return((treeMaker.Ident(var.getName()))))),
                        null));
    }
}
```

&#9654; SetProcessor.java

```java
package me.maru.processor;

import com.google.auto.service.AutoService;
import com.sun.source.tree.ClassTree;
import com.sun.source.tree.CompilationUnitTree;
import com.sun.source.util.TreePath;
import com.sun.source.util.TreePathScanner;
import com.sun.source.util.Trees;
import com.sun.tools.javac.code.TypeTag;
import com.sun.tools.javac.processing.JavacProcessingEnvironment;
import com.sun.tools.javac.tree.JCTree;
import com.sun.tools.javac.tree.TreeMaker;
import com.sun.tools.javac.tree.TreeTranslator;
import com.sun.tools.javac.util.Context;
import com.sun.tools.javac.util.List;
import com.sun.tools.javac.util.Names;

import javax.annotation.processing.*;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.TypeElement;
import javax.tools.JavaFileObject;
import java.util.Set;

@SupportedAnnotationTypes("me.maru.anno.Set")
@SupportedSourceVersion(SourceVersion.RELEASE_8)
@AutoService(Processor.class)
public class SetProcessor extends AbstractProcessor {
    private ProcessingEnvironment processingEnvironment;
    private Trees trees;
    private TreeMaker treeMaker;
    private Names names;
    private Context context;

    @Override
    public synchronized void init(ProcessingEnvironment processingEnv) {
        JavacProcessingEnvironment javacProcessingEnvironment = (JavacProcessingEnvironment) processingEnv;
        super.init(processingEnv);
        this.processingEnvironment = processingEnv;
        this.trees = Trees.instance(processingEnv);
        this.context = javacProcessingEnvironment.getContext();
        this.treeMaker = TreeMaker.instance(context);
        this.names = Names.instance(context);
    }

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        TreePathScanner<Object, CompilationUnitTree> scanner = new TreePathScanner<Object, CompilationUnitTree>(){
            @Override
            public Trees visitClass(ClassTree classTree, CompilationUnitTree unitTree){
                JCTree.JCCompilationUnit compilationUnit = (JCTree.JCCompilationUnit) unitTree;
                if (compilationUnit.sourcefile.getKind() == JavaFileObject.Kind.SOURCE){
                    compilationUnit.accept(new TreeTranslator() {
                        @Override
                        public void visitClassDef(JCTree.JCClassDecl jcClassDecl) {
                            super.visitClassDef(jcClassDecl);

                            List<JCTree> members = jcClassDecl.getMembers();

                            for(JCTree member : members){
                                if (member instanceof JCTree.JCVariableDecl){
                                    List<JCTree.JCMethodDecl> setters = createSetter((JCTree.JCVariableDecl) member);
                                    for(JCTree.JCMethodDecl setter : setters){
                                        System.out.println("setter " + setter);
                                        jcClassDecl.defs = jcClassDecl.defs.prepend(setter);
                                    }
                                }
                            }
                        }
                    });
                }
                return trees;
            }
        };

        for (final Element element : roundEnv.getElementsAnnotatedWith(me.maru.anno.Set.class)) {
            final TreePath path = trees.getPath(element);
            scanner.scan(path, path.getCompilationUnit());
        }



        return true;
    }

    public List<JCTree.JCMethodDecl> createSetter(JCTree.JCVariableDecl var){
        JCTree.JCVariableDecl param = treeMaker.Param(names.fromString("_"+var.getName().toString()), var.vartype.type, null);
        String str = var.name.toString();
        String upperVar = str.substring(0,1).toUpperCase()+str.substring(1,var.name.length());
        return List.of(
                treeMaker.MethodDef(
                        treeMaker.Modifiers(1),
                        names.fromString("set".concat(upperVar)),
                        treeMaker.TypeIdent(TypeTag.VOID),
                        List.nil(),
                        List.of(param),
                        List.nil(),
                        treeMaker.Block(0, List.of(treeMaker.Exec(treeMaker.Assign(
                                treeMaker.Ident(var),
                                treeMaker.Ident(param.name))))),
                        null));
    }
}
```

---
**Reference**
+ <https://b-programmer.tistory.com/264>
+ <https://gowoonsori.site/java/annotation/>
+ <https://blog.naver.com/hsm622/222226824623>
+ <https://www.notion.so/386f4cd47d37448fa0252d3ed22b45b7>
+ <https://parkadd.tistory.com/54>
+ <https://www.notion.so/37d183f38389426d9700453f00253532>
+ <https://dblog94.tistory.com/entry/Java-Study-12%EC%9D%BC%EC%B0%A8-Annotation>
+ <https://chohongjae.github.io/livestudy/live-study-week12/>
+ <https://velog.io/@ljs0429777/12주차-과제-애노테이션>
+ <https://velog.io/@kwj1270/%EC%96%B4%EB%85%B8%ED%85%8C%EC%9D%B4%EC%85%98>
+ <https://catch-me-java.tistory.com/49>
