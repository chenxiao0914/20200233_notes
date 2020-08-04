20200501，前端无从下手，重新整理学习一遍。

# 一、JScript基础

## 1、编写JScript代码

语句：

注释：单行注释（//）、多行注释（/* */）。和 Java一样。

赋值和相等、表达式：

## 2、JScript的变量

**变量声明**

~~~javascript
var count;	//单个声明
var count,amount,level;	//用单个var声明多个变量
var count = 0,amount = 10;	//一条语句中的变量声明和初始化
~~~

注意：如果再var语句中没有初始化变量，变量自动取值undefined。

**变量命名**

- 第一个字符必须是ASCII字母，或者一个下划线；

- 后续的字符必须是字母、下划线或者数字；

- 不能是保留字；

**强制转换**

| 运算          | 结果                     |
| ------------- | ------------------------ |
| 数值+字符串   | 将数值强制转换成字符串   |
| 布尔值+字符串 | 将布尔值强制转换成字符串 |
| 数值+布尔值   | 将布尔值强制转换成数值   |

## 3、JScript数据类型

三种基本数据类型、两种复合数据类型、两种特殊数据类型

- 字符串、数值、布尔

- 对象、数组
- Null、Undefined

注意：null与0不相等，typeOf(null) 输出为Object。

当对象属性不存在或者变量声明了但没有赋值，返回的是undefined.

测试是否声明了变量x：

~~~javascript
// 这种方法不起作用
if (x == undefined)
    

// 这个方法同样不起作用- 必须检查
// 字符串 "undefined"
if (typeof(x) == undefined)
    // 作某些操作

// 这个方法有效
if (typeof(x) == "undefined")
    // 作某些操作

~~~

## 4、JScript运算符

== （相等）与 === （严格相等）的区别在于恒等运算符在比较前强制转换不同类型的值。例如，恒等对字符串 "1" 与数值 1 的比较结果将为  true。而严格相等不强制转换不同类型的值，因此它认为字符串 "1" 与数值 1 不相同。

基本的字符串、数值和布尔值是按值比较的。如果它们的值相同，比较结果为相等。对象（包括**Array**、**Function**、**String**、**Number**、**Boolean**、**Error、Date**以及  **RegExp** 对象）按引用比较。即使这些类型的两个变量具有相同的值，只有在它们正好为同一对象时比较结果才为 true。

~~~javascript
// 具有相同值的两个基本字符串。
var string1 = "Hello";
var string2 = "Hello";
// 具有相同值的两个 String 对象。
var StringObject1 = new String(string1);
var StringObject2 = new String(string2);
// 比较结果为 true。
if (string1 == string2)
     // 执行某些命令（将要运行的）。
    // 比较结果为 false。
if (StringObject1 == StringObject2)
    //执行某些命令（不会运行）。
// 要比较 String 对象的值， 
// 用 toString() 或者 valueOf() 方法。
if (StringObject1.valueOf() == StringObject2)     //执行某些命令（将要运行的）。
~~~

## 5、流程控制

第一种是选择结构。用来指明两种程序流方向，在程序中创建一个交叉点（像岔路）。在 JScript 中有四种选择结构可用。  

- 单一选择结构（**if**），  

- 二路选择结构（**if/else**），  

- 内联三元运算符 **?:**  

- 多路选择结构（**switch**）。 

第二种类型的程序控制结构是循环结构。使用循环结构来指明当某些条件保持为真时要重复的动作。当控制语句的条件得到满足时（通常在某些迭代的特定数字后），控制跳过循环结构传递到下条语句。在  JScript 中有四种循环结构可用。  

- 在循环的开头测试表达式（**while**），  
- 在循环的末尾测试表达式（**do/while**），  
- 对对象的每个属性都进行操作（**for/in**），  
- 由计数器控制的循环（**for**）。



## 6、JScript函数

~~~javascript
function integerCheck(a, b, c) 
{
   // 测试。
   if ( (a*a) == ((b*b) + (c*c)) )   
      return true;

   return false;
} 
// 整数检查函数的结尾。

// 测试浮点数的函数。
function floatCheck(a, b, c)   
{
   // 得到测试数值。
   var delta = ((a*a) - ((b*b) + (c*c)))

   // 测试需要绝对值
   delta = Math.abs(delta);

   // 如果差小于 epsilon，那么它相当接近。
   if (delta < epsilon)   
      return true;

   return false;
} 
// 浮点检查函数的末尾。
~~~

## 7、JScript对象

JScript 对象是属性和方法的集合。一个方法就是一个函数，是对象的成员。属性是一个值或一组值（以数组或对象的形式），是对象的成员。JScript  支持四种类型的对象：**[内部对象](jsconintrinsicobjects.htm)**、[生成的对象](jsconcreatingownobjects.htm)、宿主给出的对象（如 Internet 浏览器中的  **window** 和 **document**）以及 **ActiveX** 对象（外部组件）。

在 JScript  中，对象和数组几乎是以相同的方式处理的。对象和数组均可以被赋予任意值，实际上数组只是一种特殊的对象。数组和对象的区别在于数组有一个“奇妙的”  **length** 属性，而对象没有。这意味着可以给数组的一个元素赋予比其他元素更大的值。例如，**myArray[100] =  "hello"** — 然后 **length** 属性将自动地被更新为 101（新长度）。同样，如果修改数组的 **length**  属性，将删除不再是数组部分的元素。

JScript  中所有的对象均支持“expando”属性或那些可以在运行时动态添加和删除的属性。这些属性可以有包含数字的任意名称。如果属性的名称是简单的标识符<<参考标识符规则>>，可以在对象名称的后面加句点，例如：

~~~javascript
var myObj = new Object();
// 添加两个 expando 属性，'name' 和 'age'
myObj.name = "Fred";
myObj.age = 42;
~~~

如果属性名称不是一个简单的标识符，或者在写脚本的时候不知道，可以在方括号中使用任意表达式来索引属性。在 JScript 中所有 expando  属性的名称在被添加到对象之前被转换为字符串。

传统的作法是赋给数组元素以 0 开始的数字索引。这些数组元素与 **length** 属性相交互。然而，由于所有的数组也是对象，也支持 expando  属性。请注意，虽然如此，expando 属性并不以任何方式与 **length** 属性相交互。

# 二、对象的常用方法

## 1、String

~~~javascript
var s = 'abcdefgdefg ';
//查找字符串
s.indexOf('b');//获取某个字符串第一次出现的位置，如果没有，返回-1 
s.lastIndexOf('b');//从后面开始查找第一次出现的位置。如果没有，返回-1
//去除两边的空格
s.trim();//去除字符串两边的空格，内部空格不会去除
//转换大小写
s.toUpperCase();//全部转换成大写字母
s.toLowerCase();//全部转换成小写字母
//字符串拼接与截取
s.concat('str');//拼接字符串，等效于+，+更常用 
s.slice(3[,5]);//一直复制到 end 所指定的元素，但是不包括该元素。如果 end 出现在 start 之前，不复制任何元素。
s.subString(3,6);//返回一个包含从 start 到最后（不包含 end ）的子字符串的字符串。使用 start 和 end 两者中的较小值作为子字符串的起始点。如果 start 或 end 为 NaN 或者负数，那么将其替换为0。
s.substr(3[,length]);//返回一个从指定位置开始的指定长度的子字符串。如果 length 为 0 或负数，将返回一个空字符串。如果没有指定该参数，则子字符串将延续到 s 的最后。
//字符串切割
s.split('str');//将一个字符串分割为子字符串，然后将结果作为字符串数组返回。
//字符串替换
s.replace('a','b')//将a替换成b，指挥替换第一次出现的那个。
~~~

## 2、JSON

JSON.parse() ： 用于将一个 JSON 字符串转换为 JavaScript 对象。

JSON.stringfy()： 用于将 JavaScript 值转换为 JSON 字符串。