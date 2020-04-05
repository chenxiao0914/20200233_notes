# 一、常用标签：

div标签没有任何语义，就是一个纯粹的块元素，主要用来布局。

span也没有任何语义，专门用来选中文字，然后为文字设置样式。

块元素和内联元素

块元素：独占一行，可以设置宽高

内联元素：只占自身大小，不会占用一行。

​	a、img、iframe、span

一般都是块元素包含内联元素，但是a可以包含任何元素，除了它本身。p元素不能包含任何块元素。

## 1、文本标签

### 1、em、Strong、small

em表示一段内容的着重点，通常为斜体。（i也是斜体，但没语义）

strong表示一个内容的重要性，通常为粗体。（b也是粗体，但没语义）

small标签中的内容会不他的父元素的文字要小一些。在h5中使用small表示细则一类的内容。比如：合同中小字，网站的版权声明。

~~~html
今天天气<em>真不错</em>
<br><br>
今天天气<strong>真不错<strong>
~~~

### 2、site、q、blockquote

site：网页中所有的加书名号的内容都可以使用cite标签，表示参考的内容。

q：表示一个短的引用。浏览器会默认加引号。

blockquote：表示一个长引用（块级元素）。

### 3、sub、sup

sub：下标

sup：上标，数学中的几次方

### 4、del、ins

del：删除的内容，会自动添加删除线

ins：插入的内容，会自动添加下划线

### 5、code、pre

pre：十一个预标签，保存代码的格式。

code：专门表示代码

一般结合使用

~~~html
<pre>
	<code>
		window.alert("kkkk");
	</code>
</pre>
~~~

## 2、列表

### 1、无序列表

ul创建无序列表，li创建列表项。

~~~html
<ul type="circle">
    <li>无序1</li>
    <li>无序2</li>
    <li>无序3</li>
    <li>无序4</li>
</ul>
~~~



ul type=？？==>不同浏览器表现不一样，一般去掉这个样式。

~~~css
/* 去掉项目符号 */
ul{
	list-style:none;
}
~~~

​	disc：默认值，实心的圆点

​	square：方块

​	circle：空心的圆点

### 2、有序列表

ol创建有序列表

~~~html
<ol>
    <li>结构</li>
    <li>表现</li>
    <li>行为</li>
</ol>
~~~

ol的type： 

​	1，默认值，使用阿拉伯数字

​	a/A：

​	i/I：

### 3、定义列表

定义列表用来对一些词汇或内容进行定义。使用dl创建定义列表。dt：被定义的内容

dd：被定义内容的描述

~~~html
<dl>
    <dt>武松</dt>
    <dd>井冈山打虎</dd>
    <dd>梁山好汉</dd>
</dl>
~~~

## 3、字体样式

color：

font-size：（默认16 px）。设置的是每个字的格子的高度。

font-family：文字字体。（微软雅黑、arial）





# 二、CSS 简介

## 1、CSS：层叠样式表

内联样式表：

~~~html
<!--不推荐使用-->
<p style="color: red;font-size: 1.5rem;">锄禾日当午，汗滴禾下土</p>
~~~

内部样式表：

~~~html
<style type="text/css">/* 内部样式表 */
    .p2{
        color: aqua;
        font-size: 1.5rem;
    }
</style>
~~~

外部样式表：可以利用浏览器的缓存，加快访问速度

~~~html
<link rel="stylesheet" type="text/css" href="../css/testcss.css"/>

.p3{
	color: yellowgreen;
	font-size: 25px;
}
~~~

## 2、CSS语法

选择器（.p3）、声明快（{color: yellowgreen;font-size: 25px;}）

~~~css
.p3{
	color: yellowgreen;
	font-size: 25px;
}
~~~

### 2.1选择器

### 2.1.1元素选择器、类选择器、id元素器

~~~css
选择器分组：（并集选择器）
#p1,.p2,h1{}

复合选择器
span.p3{}
~~~

父元素、子元素、祖先元素、后代元素、兄弟元素

### 2.1.2后代元素选择器：

~~~html
div span{
    color: #9ACD32;
}
<body>
    <div>
        <span>div中的span</span>
        <p><span>p标签中的span</span></p>
    </div>
	<span>body中的span</span>
</body>
<!--只有前两行会变色-->
~~~

### 2.1.3子元素选择器：

~~~html
div > span{
    color: #9ACD32;
}
<body>
    <div>
        <span>div中的span</span>
        <p><span>p标签中的span</span></p>
    </div>
	<span>body中的span</span>
</body>
<!--中间一行不会变色-->
p:first-child{}/* 第一个子元素 */
p:last-child{}/* 最后一个子元素 */
p:nth-child(KK){}/* 指定位置的子元素 */
kk:
数字:选择第几个子元素
even:偶数
odd:奇数
~~~

### 2.1.4伪类选择器：

~~~html
<head>
    <meta charset="utf-8">
    <title></title>
    <style type="text/css">
        a:link{/* 未访问过 */
            color: green;
        }
        a:visited{/* 访问过 */
            color: #FF0000;
        }
        a:hover{/* 鼠标移入 */
            color: aqua;
        }
        a:active{/* 超链接被点击状态 */
            color: black;
        }
        input:focus{/* 获取焦点 */
            background-color: antiquewhite;
        }
        p::selection{/* 对选中的内容设置样样式 */
            background-color: red;
        }
        p::-moz-selection{/* 兼容火狐 */
            background-color: red;
        }
    </style>
</head>
<body>
   	<a href="www.baidu.com">访问过的连接</a>
    <br><br>
    <a href="www.qwe.com">未访问过得连接</a>
    <br><br>
    <input type="" name="" id="" value="" /><br><br>
    <p>爱穿中国红</p>
</body>
~~~

伪元素：

~~~html
<style type="text/css">
    p:first-letter{/* 第一个字 */
        color: red;
    }
    p:first-line{/* 第一行 */
        color: yellow;
    }
    p:before{
        content: "我在p元素之前";
        color: #00FFFF;
    }
    p:after{
        content: "我在p元素之后";
        color: purple;
    }
</style>
<p>Dubbo是阿里巴巴开源的基于 Java 的高性能 RPC（一种远程调用） 分布式服务框架（SOA），致力于提供高性能和透明化的RPC远程服务调用方案，以及SOA服务治理方案</p>
		
~~~

### 2.1.5属性选择器：

~~~html
<head>
    <meta charset="utf-8">
    <title></title>
    <style type="text/css">
        p[title]{}/* 选取含有指定属性的元素 */
        p[title="abc"]{}/* 选取含有指定属性值的元素 */
        p[title^="c"]{}/* 选取以属性指定内容开头的元素 */
        p[title$="c"]{}/* 选取以属性指定内容结尾的元素 */
    </style>
</head>
<body>
    <p title="abc">我是一个p标签</p>
    <p title="cd">我是一个p标签</p>
    <p>我是一个p标签</p>
    <p>我是一个p标签</p>
    <p>我是一个p标签</p>
    <p>我是一个p标签</p>
    <p title="abd">我是一个p标签</p>
</body>
~~~

## 3、样式的继承

祖先元素的一些基本样式会被他的后代元素继承。但是部分样式是不会被继承的，如背景相关的样式都不能被继承。

## 4、选择器的优先级

选择器的权重，会叠加，但是权重的计算不会超过他的数量级。

可以在样式后面添加 !important，使之获得最高的优先级。

内联：1000

id选择器：100

类选择器：10

元素选择器：1

通配符*：0

继承的样式：没有优先级

## 5、长度

px：像素。不同显示器一个像素的大小会不一样。

百分比：占父元素的百分比。

em：和百分比类似，他是相对于当前元素的字体大小来计算的。1em = 1font-size。设置字体相关的样式时，经常使用em。





