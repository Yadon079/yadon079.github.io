---
layout: page
title: "Diary"
author: "Arikim"
category: diary
permalink: /diary/
---

<div class="catalogue">
    {% assign cate = page.category | default: page.title %}
    {% for post in site.categories[ cate ] %}
    <a href="{{ post.url | prepend: site.baseurl }}" class="catalogue-item">
        <div>
            <time datetime="{{ post.date }}" class="catalogue-time">{{ post.date | date: "%B %d, %Y" }}</time>
            <h1 class="catalogue-title">{{ post.subject | upcase }}/ {{ post.title }}</h1>
            <h4 class="catalogue-desc">{{ post.description }}</h4>
            <div class="catalogue-line"></div>
            <p class="catalogue-content">{{ post.content | strip_html | truncatewords: 30 }}</p>
        </div>
    </a>
    {% endfor %}
</div>