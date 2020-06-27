# 一、基础了解

windows连接服务器

黑窗口：mysql -h host -u username -p

host :主机名

username：用户名

退出：quit

*如果你决定不想执行正在输入过程中的一个命令，输入\c取消它*

特别查询：

select version(),current_date;

select user();

select now();

select sin(pi()/4);

select (4+1)*5;	

show databases;	查询当前服务器有哪些数据库。

use test	使用某个数据库，test为数据库名称

show tables;	查看数据库中有哪些表



# 二、基础表操作

## 1、创建表

~~~sql
CREATE TABLE pet (
    name VARCHAR(20), 
    owner VARCHAR(20),
    species VARCHAR(20), 
    sex CHAR(1), 
    birth DATE, 
    death DATE);
~~~

## 2、查看表结构

~~~sql
describe pet;
~~~

~~~txt
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| name    | varchar(20) | YES  |     | NULL    |       |
| owner   | varchar(20) | YES  |     | NULL    |       |
| species | varchar(20) | YES  |     | NULL    |       |
| sex     | char(1)     | YES  |     | NULL    |       |
| birth   | date        | YES  |     | NULL    |       |
| death   | date        | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
~~~



## 3、新增数据

~~~sql
insert into pet values ('fluffy','harold','cat','f','1993-02-04',null);
~~~



## 4、查询数据

### 1、查询全部

~~~sql
select * from pet;
~~~

### 2、查询特殊行

~~~sql
select * from pet where sex = 'f';
select * from pet where birth > '1996-01-01';
SELECT * FROM pet WHERE species = 'dog' AND sex = 'f';
SELECT * FROM pet WHERE species = 'snake' OR species = 'bird';
SELECT * FROM pet WHERE (species = 'cat' AND sex = 'm') OR (species = 'dog' AND sex = 'f');

~~~

AND和OR可以混用，但AND比OR具有更高的优先级。如果使用两个操作符，使用圆括号指明如何对条件进行分组是一个好主意。

### 3、查询特殊列

~~~sql
select name，birth from pet;

select owner from pet;
+--------+
| owner  |
+--------+
| Harold |
| Gwen   |
| Harold |
| Benny  |
| Diane  |
| Gwen   |
| Gwen   |
| Benny  |
| Diane  |
+--------+
//关键字DISTINCT检索出每个唯一的输出记录
SELECT DISTINCT owner FROM pet;
+--------+
| owner  |
+--------+
| Benny  |
| Diane  |
| Gwen   |
| Harold |
+--------+

~~~

### 4、排序

asc ：升序	desc：降序

~~~sql
select * from pet where owner = 'diane' order by name desc;
//BINARY强制执行区分大小写的分类功能(根据名字字母降序排序)
select * from pet where owner = 'diane' order by binary name desc;
SELECT name, species, birth FROM pet ORDER BY species, birth DESC;

~~~



## 5、修改数据

~~~sql
update pet set sex = 'm' where name = 'fluffy';
~~~



## 6、删除数据

~~~sql
delete from pet;
~~~

## 7、日期计算

YEAR()提取日期的年部分，MONTH( )提取日期的月部分，DAYOFMONTH( )提取日期的日部分。RIGHT()提取日期的MM-DD  (日历年)部分的最右面5个字符。比较MM-DD值的表达式部分的值一般为1或0。

~~~sql
SELECT name, birth, death,
    (YEAR(death)-YEAR(birth)) - (RIGHT(death,5)<RIGHT(birth,5))
    AS age
    FROM pet WHERE death IS NOT NULL ORDER BY age;

~~~

## 8、匹配，模糊查询

“_”匹配任何单个字符，而“%”匹配任意数目字符(包括零字符)。LIKE或NOT LIKE比较操作符。

~~~sql
//找出正好包含3个字符的名字
select * from pet where name like '___';
//找出以“b”开头的名字
select * from pet where name like 'b%';
//找出一fy结尾的名字
select * from pet where name like '%fy';
//找出包含w的名字
select * from pet where name like '%w%';

~~~

使用扩展正则表达式,

“^”和“$”匹配名字的开始和结尾

‘.’匹配任何单个的字符

“[...]”匹配在方括号内的任何字符。例如，“[abc]”匹配“a”、“b”或“c”

“ *  ”匹配零个或多个在它前面的字符。例如，“x*”匹配任何数量的“x”字符，“ [ 0-9 ] * ”匹配任何数量的数字，而“.*”匹配任何数量的任何字符

“{n}” “重复n次”操作符重写前面的查询

~~~sql
//找出以小写b开头的名字
select * from pet where name regexp binary '^b';
//找出一fy结尾的名字
select * from pet where name regexp 'fy$';
//找出包含w的名字
select * from pet where name regexp 'w';
//找出包含正好5个字符的名字
select * from pet where name regexp '^.....$';
select * from pet where name regexp '^.{5}$';
~~~

