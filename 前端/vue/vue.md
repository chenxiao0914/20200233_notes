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

表单输入与应用状态的双向绑定

```
v-model="message"	
{{message}}
```



# 二、模板语法

## 1、插值

### 文本

数据绑定最常用的形式就是使用 “Mustache” 语法（双大括号）的文本插值。Mustache标签将会被替代为对应数据对象上对应属性的值，无论何时，绑定的数据对象的相应属性的值发生了改变，插值处的内容都会被更新。

通过使用 v-once 指令，能执行一次性地插值，但当数据改变时，插值处的内容不会更新。

~~~html
<span>Message:{{ msg }}</span>
<span v-once>this will never change:{{ msg }}</span>
~~~

### 原始html

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

### attribute

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

### 表达式

Vue.js 提供完全的javascript表达式的支持。

每个绑定都只能包含单个表达式，模板表达式会被放沙盒中，只能访问全变量的一个白名单，如Math和Date。不应该在表达式中试图访问自定义的全局变量。

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

## 2、指令

指令（Directives）是带有v-前缀的特殊attribute，指令attriute值预期是单个javascript表达式，v-for除外，当表达式的值改变，将其产生的连带影响，响应的作用域DOM。

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
/* v-if 将根据seen的值的真假来移除或插入p元素 */
~~~

### 参数

 一些指令能够接收一个“参数”，在指令名称之后以冒号表示。  例如：`v-bind` 指令可以用于响应式地更新 HTML attribute：   <a v-bind:href="url"></a>  

```html
<a v-bind:href="url">...</a>  
<a v-on:click="doSomething">...</a>
```

### 动态参数

### 修饰符

修饰符 (modifier) 是以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，`.prevent` 修饰符告诉 `v-on` 指令对于触发的事件调用 `event.preventDefault()`： 

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

## 3、缩写

v-bind  ==》：	v-on   ===》@

```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>
<!-- 缩写 -->
<a :href="url">...</a>
<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>

<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>
<!-- 缩写 -->
<a @click="doSomething">...</a>
<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```

# 三、计算属性和侦听器

## 1、计算属性

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。 

```html
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>
```

在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 `message` 的翻转字符串。当你想要在模板中多包含此处的翻转字符串时，就会更加难以处理。所以，对于任何复杂逻辑，你都应当使用**计算属性**。

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

 这里声明了一个计算属性 `reversedMessage`。我们提供的函数将用作 property `vm.reversedMessage` 的 getter 函数 。 Vue 知道 `vm.reversedMessage` 依赖于 `vm.message`，因此当 `vm.message` 发生改变时，所有依赖 `vm.reversedMessage` 的绑定也会更新。而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 getter 函数是没有副作用 (side effect) 的，这使它更易于测试和理解。 

## 2、计算属性  vs  方法

计算属性是基于他门的响应式依赖进行缓存的， 只在相关响应式依赖发生改变时它们才会重新求值。  这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage`计算属性会立即返回之前的计算结果，而不必再次执行函数。 

 这也同样意味着下面的计算属性将不再更新，因为 `Date.now()` 不是响应式依赖： 

```js
computed:{
    now:function(){
        return:Date.now();	
    }
}
```

 比之下，每当触发重新渲染时，调用方法将**总会**再次执行函数。 

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 **A**，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 **A**。如果没有缓存，我们将不可避免的多次执行 **A** 的 getter！如果你不希望有缓存，请用方法来替代。 

## 3、侦听器

# 四、条件渲染

## 1、v-if

## 2、v-show

 带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 CSS property `display`。 

 `v-show` 不支持 ` 元素，也不支持 `v-else` 。

**tips**： 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。 





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



截止集数：

# 一、邂逅Vue

## 1、认识vue

vue是一个渐进式框架；

特点：

- 解耦视图和数据
- 可复用组件
- 前端路由技术
- 状态管理
- 虚拟DOM

## 2、vue的安装

1、直接CDN引入

~~~html
<!-- 开发环境，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<!-- 生产环境，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.11"></script>
~~~

2、下载和引入

~~~html
<!-- 开发环境-->
<script src="https://vue.js.org/js/vue.js"></script>
<!-- 生产环境，压缩版-->
<script src="https://vue.js.org/js/vue.min.js"></script>	
~~~

3、NPM安装

通过webpack和cli的使用，再会用该方法

## 3、初体验

~~~html
<body>
    <div id="app">{{message}}</div>
</body>
<script src="../js/vue.js"></script>
<script>
    //编程方式：声明式编程；以前jquery是命令式编程
    new Vue({
        el:'#app',	//挂载要管理的元素
        data:{
            message:'hello vue'
        }
    })
</script>
~~~



## 4、vue的mvvm

# 二、Vue基础语法

# 三、组件化开发

# 四、Vue cli

# 五、Vue router

# 六、Vuex

# 七、网络封装

# 八、项目时间

# 九、项目部署