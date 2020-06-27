# 一、vue起步

每个vue实例都需要通过实例化Vue来实现。

~~~js
var vm = new Vue({
    //选项
})
~~~

实例的生命周期

~~~javascript
var vm = new Vue({  
    data: {    
        a: 1  
    },  
    created: function () {    
        // `this` 指向 vm 实例   
        console.log('a is: ' + this.a)  
    }
})
// -> "a is: 1"
~~~

也有一些其他的钩子，在实例生命周期的不同阶段调用，如 mounted、updated、destroyed。

# 二、模板语法

## 1、插值

数据绑定最常用的形式就是使用 “Mustache” 语法（双大括号）的文本插值。Mustache标签将会被替代为对应数据对象上对应属性的值，无论何时，绑定的数据对象的相应属性的值发生了改变，插值处的内容都会被更新。

通过使用 v-once 指令，能执行一次性地插值，但当数据改变时，插值处的内容不会更新。

~~~html
<span>Message:{{ msg }}</span>
<span v-once>this will never change:{{ msg }}</span>
~~~

## 2、v-html

双大括号的数据都会被解析成纯文本内容。v-html用于输出html代码。动态渲染的任意HTML会非常危险，很容易导致 **XSS** 攻击。

~~~html
<div id="app">
    <div v-html="message"></div>
</div>
    
<script>
new Vue({
  el: '#app',
  data: {
    message: '<h1>菜鸟教程</h1>'
  }
})
</script>
~~~

## 3、v-bind

插值不能用于html的属性赋值，对html属性赋值需要使用v-bind。

~~~html
<div id="app2">
    <span v-bind:title="message">
        Vue绑定
    </span>
    <a v-bind:href="url"></a>
</div>

<script type="text/javascript">
    var app2 = new Vue({
        el: '#app2',
        data: {
            message: '页面加载与'+new Date().toLocaleString();
    		url: 'www.baidu.com'
        }
    })
</script>
<!-- 在控制台输出app2.message 将输出当前时间 -->
~~~

## 4、表达式

Vue.js 提供完全的javascript表达式的支持。

每个绑定都只能包含单个表达式，模板表达式会被放沙盒中，只能访问全变量的一个白名单，如Math和Date。不应该在表达式中视图访问自定义的全局变量。

~~~html
<div id="app">
    {{5+5}}<br>
    {{ ok ? 'YES' : 'NO' }}<br>
    {{ message.split('').reverse().join('') }}
    <div v-bind:id="'list-' + id">菜鸟教程</div>
</div>
    
<script>
new Vue({
  el: '#app',
  data: {
    ok: true,
    message: 'RUNOOB',
    id : 1
  }
})
</script>

<!-- 这是语句，不是表达式-->
{{ var a = 1 }}
<!-- 流程控制也不会生效-->
{{ if (ok) { return message } }}
~~~

## 5、v-if



~~~html
<div id="app">
    <p v-if="seen">现在你看到我了</p>
</div>
    
<script>
new Vue({
  el: '#app',
  data: {
    seen: true
  }
})
</script>
~~~

## 6、修饰符

## 7、过滤器

## 8、表单v-model

在表单元素控件上创建数据双向绑定，v-model不关心表单控件初始化生成的值，因为他会选择Vue实例数据来作为具体的值

~~~html
<body>
    <div id="app">
        <<p>{{message}}</p>
    <input v-model="message"/>
    </div>
</body>
<script type="text/javascript">
    new Vue({
        el:"#app",
        data:{
            message:"kkk"
        }
    })
</script>
~~~

## 9、v-on