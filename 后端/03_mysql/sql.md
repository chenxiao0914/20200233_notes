# 一、基础了解

windows连接服务器

黑窗口：mysql -h host -u username -p

host :主机名

username：用户名

退出：quit

*如果决定不想执行正在输入过程中的一个命令，输入\c取消它*

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

AND和OR可以混用，但AND比OR具有更高的优先级。如果使用两个操作符，建议使用圆括号指明如何对条件进行分组。

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







# 2020 mysql

navicat快捷键：

~~~txt
按f6会弹出一个命令窗口
ctrl shift+r 执行选中的sql
ctrl+/ 注释sql语句
ctrl+shift +/ 解除注释
ctrl+l 删除一行
ctrl+q 打开查询窗口
ctrl+n 打开一个新的查询窗口
ctrl+w 关闭一个查询窗口
ctrl+tab 多窗口切换
Ctrl+L 删除选中行内容
Ctrl+D 表的数据显示显示页面切换到表的结构设计页面，但是在查询页面写sql时是复制当前行并粘贴到下一行

~~~



# mysql基础

mysql卸载

- 卸载mysql
- 删掉mysql安装目录
- 删掉c盘ProgramData下面的mysql（缓存文件）

mysql的启动和停止：

命令行窗口：net stop MySQL				net start MySQL

~~~txt
C:\WINDOWS\system32>net stop MySQLCX
MySQLCX 服务正在停止.
MySQLCX 服务已成功停止。

C:\WINDOWS\system32>net start MySQLCX
MySQLCX 服务正在启动 .
MySQLCX 服务已经启动成功。
~~~

连接和退出mysql

~~~txt
mysql -h localhost -P 3306 -u root -p
或者：mysql -u root -p123456
exit  或者ctrl+c
-p与密码之间不能有空格
~~~

如果连接不上，吧mysql的bin目录配置在path环境变量的最前面。

查看版本

~~~txt
C:\Users\15596>mysql --version
mysql  Ver 14.14 Distrib 5.5.20, for Win64 (x86)

C:\Users\15596>mysql -V
mysql  Ver 14.14 Distrib 5.5.20, for Win64 (x86)
~~~



## 1、mysql常见命令

show databases；

use ssm；

show tables;

select database();

desc account;

select version();	

~~~txt
mysql> show databases;			=====》查看有哪些数据库
+--------------------+
| Database           |
+--------------------+
| information_schema |
| cxsql              |
| jdbc               |
| mysql              |
| performance_schema |
| servlet            |
| springboot         |
| ssm                |
| test               |
+--------------------+
mysql> use ssm;		=====》使用哪个数据库
Database changed
mysql> show tables;		======》查看有哪些表
+---------------+
| Tables_in_ssm |
+---------------+
| account       |
| customer      |
| flower        |
| login         |
| student       |
| tb_user       |
| teacher       |
| user          |
+---------------+
mysql> select database();	====》查看当前在使用哪个数据库
+------------+
| database() |
+------------+
| ssm        |
+------------+
mysql> desc account;	====》查看表结构
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int(11)      | NO   | PRI | NULL    | auto_increment |
| name  | varchar(255) | YES  |     | NULL    |                |
| money | float        | YES  |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+
mysql> select version();		===》查看mysql版本
+-----------+
| version() |
+-----------+
| 5.5.20    |
+-----------+
~~~

## 2、DQL

### 基础查询

查询单个字段、查询多个字段、起别名、去重、+的作用、concat函数

~~~sql
#可以查询字段，常量值、表达式、函数
#查询单个字段
SELECT name from account;
#查询多个字段
#着重号表示这是一个字段，区分关键字
select `name` , `money` from account;
select * from account;

#起别名,别名不能包括关键字，可以将别名加单引号或双引号
select `name` as 姓名 from account;
select `name` 姓名 from account;
#去重,在去重的列名前加distinct关键字
select DISTINCT money from account;
#+ 在mysql中只有一个作用：运算符
mysql> select name+money from account;
+------------+
| name+money |
+------------+
|       1000 |
|       1000 |
|       1000 |
|      10000 |
|      10000 |
+------------+
#可以使用concat函数拼接
mysql> select concat(name,money) from account;
+--------------------+
| concat(name,money) |
+--------------------+
| aaa1000            |
| bbb1000            |
| ccc1000            |
| ch10000            |
| ch10000            |
+--------------------+
~~~

### 条件查询

语法：select 列名 from 表名 where 筛选条件

按条件表达式筛选、按逻辑表达式筛选、模糊查询

~~~sql
#表达式：>  <  =  !=   <>(就是!=)  >=   <=	<+>(安全等于)
select * from account where money<>800;

#逻辑表达式 &&  ||  ！  and  or  not
select * from account where id>=3 and money<=1000;

#模糊查询 like、between and 、in 、is null、is not null
#_匹配任意一个字符，%匹配任意多个字符；匹配_用转义\_或者指明转义符号
select * from account where name like '_a%';
select * from account where name like '_$_a%' escape '$';
select * from account where money between 500 and 1000;
select * from account where id in (1,3,4,5,8,9);
select * from account where money is null;
#如果money为null，转换成0表示
select ifnull(money,0) as money from account;
~~~

模糊查询正则模式：regexp

```sql
#“.”匹配任何单个的字符。（单字节字符）
#一个字符类“［...］”匹配在方括号内的任何字符。例如，“［abc］”匹配“a”、“b”或“c”。为了命名字符的一个范#围，使用一个“-”。“［a-z］”匹配任何小写字母，而“［0-9］”匹配任何数字。
#“ * ”匹配零个或多个在它前面的东西。例如，“x*”匹配任何数量的“x”字符，“［0-9］*”匹配的任何数量的数字

#“^”匹配开始，“$”匹配结束
#“{n}”“重复n次”
#[^……]，匹配不包含在[]的字符
#a|b|c，匹配a或b或c
#?，重复0次或1次	
#+，重复1次或多次

select * from user where name regexp '晓$';
select * from user where name regexp '晓?';
select * from user where name regexp '晓+';
select * from user where name regexp '晓';
select * from user where name REGEXP '^.*[方晓]$'
select * from user where name REGEXP '.*方|晓.';
select * from user where name REGEXP '[晓方x]$';
select * from user where name REGEXP '方方$';
select * from user where name REGEXP 'x{2}';# x不能使用中文字符！！！

```



### 排序查询

order by      +	 asc	升序  	desc   降序

order by 支持查询单多个字段、表达式、函数、别名

~~~sql
select * from account order by money desc,id asc;
~~~

### 常见函数

单行函数、分组函数(聚合函数)

length、concat、upper、lower、substr、instr、trim、replace

~~~sql
#单行函数：length、concat、upper、lower、substr、instr(第一次出现的索引)、#trim
select length('hello');
select concat('dfaf','_','rerr');
select upper(join);
#mysql的索引从1开始
select substr('李莫愁爱上了陆展元',1,3);#李莫愁
#trim去前后的字符
select trim('a' from 'aaa杨aa不悔aa');#杨aa不悔

#数学函数
#round(绝对值四舍五入加符号)、ceil(向上取整)、floor(向下取整)
#truncat(小数点后截断)、mod(取余)
select round(-1.5);#-2.0
select ceil(-1.9);#-1.0
select floor(-0.9);#-1.0
select truncat(1.78,1);#1.7
select mod(10,-3);#1

#日期函数
#now、curdate、curtime、year、month、monthname(月份全拼)、day
#str_to_date、date_format
select * from user where birth=str_to_date('4-3 1990','%c-%d %Y');
select date_format(now(),'%Y年%c月%d日');

#其他函数
#version、databases

#流程控制函数
#if、if else、case
select if(10<5,'大'，'小');

select salary 原始工资,
case depart_id 
when 3 then salary*1.1
when 4 then salary*1.3
else salary
end as 新工资
from user;

SELECT stuId,ke,fen,
case  
when fen>=90 then 'a'
when fen>=80 then 'b'
else 'c'
end as grade from score;
~~~

### 分组函数

统计实用，又称为聚合函数

sum、avg、max、min、count（非null的个数）

sum和avg忽略null值参与运算。

### 分组查询

group by：根据一个或多个列对结果集进行分组。在分组的列上我们可以使用 COUNT, SUM, AVG,等函数 。

 分组后的条件使用 having来限定，where 是对原始数据进行条件限制。几个关键字的使用顺序为 where 、group by 、having、order by  。

~~~sql
select count(*) c, length(name) len
from user
group by len
having c>5;

select sum(fen) he from score group by ke having he>500;

select avg(salary),dep_id,job.id
from user
where dep_id is not null
group by job_id,dep_id
having avg(salary)>1000
order by avg(salary) desc;
~~~

### 连接查询

又称为多表查询

- 内连接：等值连接、非等值连接、自连接
- 外连接：左外连接、右外连接、全外连接
- 交叉连接

~~~sql
#等值连接
SELECT name,ke,fen from stu,score where stu.id = score.id;
#非等值连接
select salary,grade_level from emp e,grade g where salary between g.lowSa and g.higSa;
~~~

内连接：inner join 		外连接：left、right、full		交叉连接：cross

~~~sql
#结果一致
SELECT name,ke,fen from stu,score where stu.id = score.id;
select name,ke,fen from stu inner join score on stu.id = score.id

select name,ke,fen from stu inner join score on stu.id = score.id where name like '%华%'
#查询工资和工资等级
select salary,grade_level
from emp e
inner join job_grade g
on e.salary between g.low and g.high;
~~~

外连接：匹配主表的所有记录，从表有匹配则显示，没有则显示null。左外连接，左表是主表。

~~~sql
select b.name,bo.*
from beauty b left join boys bo
on b.boyfriend_id = bo.id
where bo.id is null;

~~~

### 子查询

出现在其他语句中的select语句，称为子查询或内查询。

~~~sql
#标量子查询，一行一列
#查询语文分大于id为3的学生的语文分的成绩信息
select * from score where ke = '语文' and fen > (select fen from score where id = 3 and ke = '语文')
#查询各同学的平均分
select s1.name,s2.avgs from stu s1,(select id, round(avg(fen),4) avgs  from score group BY id) as s2 where s1.id = s2.id;


#多行子查询
in、not in：等于列表中的任意一个
any、some：和子查询返回的某一个值比较
all：和子查询的所有值比较
select name,money from acount where money <(
select max(money) from account
) 
~~~



### 分页查询

limit offset，size

offset：要显示的起始索引，从0开始,该值为可选值。offset =（ page-1）*size

size：几条数据

~~~sql
#1-5条数据
select * from user limit 0,5;
#11-25条数据
select * from user limit 10,15;
~~~

### union联合查询

将多个查询结果合并成一个结果

union特点：多条查询语句的列数一致、每条查询的列类型和顺序最好一致、结果会去重

union all：不会去重

~~~sql
select id cname,csex from t_ca where csex = '男'
union
select t_id,tname,tgender from t_ua where tgender = 'male';
~~~

## 3、DML

数据操作语言

### **插入语句**

~~~sql
insert into user values(1,'娜扎','1999-09-09',null);
insert into user set id = 2,name = '张飞',birth = '1998-09-09',address = null;
insert into user values(2,'古丽','1990-09-09',null),(3,'古丽噶','1990-09-08',null);
~~~

### **修改语句**

~~~sql
update user set name = '胡一菲' where id = 4;

update boys bo
inner join beeauty b on bo.id = b.boyfriendid
set b.phone ='11444'
where bo.boyname = '张无忌';
~~~

### **删除语句**

truncate:删除整张表，不允许添加条件where。

~~~sql
#单表删除
delete from user where id in (3,4,5,6,7);
#多表删除
delete b
from beauty b
inner join boys bo on b.boyfriendid = bo.id
where bo.boyname = '张无忌'
#直接删除整张表
truncate table user;

1、从MySQL数据表t1中把那些id值在数据表t2里有匹配的记录全删除掉
DELETE t1 FROM t1，t2 WHERE t1.id=t2.id 或DELETE FROM t1 USING t1，t2 WHERE t1.id=t2.id

2、从MySQL数据表t1里在数据表t2里没有匹配的记录查找出来并删除掉
DELETE t1 FROM t1 LEFT JOIN T2 ON t1.id=t2.id WHERE t2.id IS NULL 或

DELETE FROM t1，USING t1 LEFT JOIN T2 ON t1.id=t2.id WHERE t2.id IS NULL

3、从两个表中找出相同记录的数据并把两个表中的数据都删除掉
DELETE t1，t2 from t1 LEFT JOIN t2 ON t1.id=t2.id WHERE t1.id=25

注意此处的delete t1，t2 from 中的t1，t2不能是别名

如：delete t1，t2 from table_name as t1 left join table2_name as t2 on t1.id=t2.id where table_name.id=25 在数据里面执行是错误的（MySQL 版本不小于5.0在5.0中是可以的）
~~~

- truncate删除效率高一丢丢
- delete删除表的自增长列，在插入数据，自增长的值从断点开始增加，truncate则会从1开始增加
- truncate删除没有返回值，delete删除有返回值
- turncate删除不能回滚，delete删除可以回滚

## 4、DDL

数据库定义语言：create、alter、drop

### 库和表的管理

~~~sql
#创建库  	if not exists可省略
create database if not exists books;
#更改库的字符集
alter database books character set gbk;
#删除库
drop database if exists books;

#表的创建
create table book(
	id int(10) not null,
    name varchar(20),
    price Double(5,2)
)
#表的修改
#修改列名
alter table book change column name bookName varchar;
#修改列的类型
alter table book modify column `name` varchar(20);
#增加新列
alter table book add COLUMN author varchar(10);
#删除列
alter table book drop COLUMN author;
#修改表名
alter table book rename to books;

#表的删除
drop table if exists book;
show tables;
#复制表的结构
create table copy like books;
#赋值表的结构和数据	select后面可以看做是一个子查询
create table copy2 select * from books;
#仅复制部分列，不复制数据	where 0 或者 where 1=2
create table copy3 select id,name from books where 0;
~~~

### 常见数据类型介绍

int、integer、bigint、float、double、decimal（M，D）

char、varchar、text、blob（二进制数据）

date、datetime、timestamp、time、year

### 常见约束

六大约束：

- not null：非空
- default：默认值
- primary key：主键，该字段的值唯一，并且非空
- unique：唯一，该字段的值唯一，可以为空，比如座位号
- check：检查约束，【mysql不支持，但不会报错】
- foreign key：外键，用于限制两个表的关系，保证该字段的值必须来自于主表的关联列的值

列级约束:都支持，但外键没有效果

~~~sql
create table major(
	id int primary key,
    majorName varchar(20)
)

create table stuinfo(
	id int primary key,#主键
    stuName varchar(20) not null,#非空
    gender char(1) check(gender = '男' or gender = '女')，#检查
    seat int unique,#唯一
    age int default 18,
    majorId int references major(id)#外键
)

show index from stuinfo;
~~~

表级约束：默认和非空不支持，其他支持

~~~sql
constraint 约束名 约束类型(字段名)
create table stuinfo(
	id int,
    stuname varchar,
    gender char,
    seat int,
    age int,
    majorid int,
    constraint pk primary key(id，stuname),#联合主键
    constraint uq unique(seat),
    constraint ck check(gender='男' or gender = '女'),
    constraint fk_stuinfo_major foreign key(majorid) references major(id)
)
~~~

主键和唯一约束的对比

- 都保证唯一性
- 主键不能为空，唯一可以为空，但只能有一个为空
- 只能一个列为主键，可以多个列是惟一约束的

外键

- 主表的关联列必须是一个可以（一般是主键或唯一）
- 要求在从表设置外键
- 插入数据时，先插入主表，在插入从表；删数据时，先删从表，再删主表

修改表时添加约束

~~~sql
#添加非空约束
alter table stuinfo modify column stuname varchar(20) not null;
#添加默认约束
alter table stuinfo modify column age int default 18;
#添加主键
alter table stuinfo modify column id int primary key;
alter table stuinfo add primary key(id);
#添加唯一约束
alter table book modify column `name` varchar(20) unique;	#(20)必須帶上
alter table stuinfo modify column seat int unique;
alter table stuinfo add uinque(seat);
alter table stuinfo add constraint uq uinque(seat);
#添加外键
alter table stuinfo add foreign key(majorid) references majod(id);
~~~

修改表时删除约束

~~~sql
#删除非空约束
alter table stuinfo modify column stuname varchar(20) null;
#删除默认约束
alter table stuinof modify column age int;
#删除主键
alter table stuinfo drop primary key;
#删除唯一约束
alter table stuinfo drop index username;	#username为列名
alter table stuinfo drop index seat;
alter table stuinfo drop index uq;
#删除外键
alter table stuinfo drop foreign key fk_stuinfo_major;

~~~



## 5、TCL

事务和事务处理

show engines;#查看数据库支持的引擎。

### 事务的ACID属性

- 原子性：一个事务十一个执行单元，要么都被执行成功，要么都不成功
- 一致性：事务的执行会使数据库从一个一致性状态到另一个一致性状态
- 隔离性：一个事务的执行不收其他事务的影响
- 持久性：事务一旦提交，则会永久的改变数据库的数据

### 事务的隔离级别

- read uncommited：会出现脏读、幻读、不可重复读
- read commited：会出现幻读、不可重复读
- repeatable read：会出现幻读（插入）
- serializable：解决以上问题，但是效率低

~~~sql
show VARIABLES like 'autocommit'
#查看数据库的隔离级别
select @@tx_isolation;
#设置隔离级别
SET session transaction ISOLATION level read uncommited;

#开启事务
set autocommit=0;

#提交数据
commit;
#回滚事务
rollback;
~~~

## 6、视图

虚拟表，mysql5.1出现的新特性，是通过表动态生成的数据。只保存sql逻辑，不保存查询结果。

应用场景：

- 多个地方用到相同的查询结果
- 该查询结果使用sql比较复杂

~~~sql
#创建视图
create view 视图名称 as 查询语句;
create view myview as SELECT name,ke,fen from stu,score where stu.id = score.id;
#使用视图
select * from myview;
#修改视图
create or replace view myview as 查询语句;
alter view myview as 查询语句;
#删除视图
drop view 视图名，视图名，...;
#查看视图
desc myview;
show create view myview;
#视图的更新（更改视图的数据）
#增删改可以在view中使用，但是会对原来的表中的数据产生影响，一般不修改视图中的数据。
~~~

包含分组如下的视图不允许更新：

- 函数、distinct、group by、having 、union、union all。
- 常量视图
- 包含子查询
- join
- from一个不能更新的视图
- where子句的子查询引用了from子句中的表

视图的表的区别：

- 创建方式一个是table，一个是view
- view保存逻辑，不保存数据，表保存数据
- view 一般不会进行增删改操作

## 7、变量

### 系统变量：系统提供，属于服务器层面

- 全局变量
- 会话变量

~~~sql
#查看所有的系统变量
show global variables;
show session variables;
show global variables like '%chara%';

#查看指定的系统变量的值
select @@global [session].系统变量名;
select @@tx_isolation;
select @@session.tx_isolation;

#为系统变量赋值
set global|session 系统变量名 = 值;
set @@global|session 系统变量名 = 值;
~~~

### 自定义变量：

- 用户变量（session有效）
- 局部变量（只能在begin、end中使用，且为第一句）

声明、赋值、使用。

~~~sql
#用户变量
#声明并初始化
set @变量名 = 值;
set @变量名: = 值;
select @变量名: = 值;
set @name = 'tom';
#赋值，初始化可以赋值；另一种方式:select 字段 into @变量名 from 表;
select name into @x_name from user;

#局部变量,只能在begin、end中使用，且为第一句。
#声明
declare 变量名 类型;
declare 变量名 类型 default 值;
set @m = 5;
set @n = 2;
set @sum = @m + @n;
select @sum;	#7
~~~

## 8、存储过程和函数

类似于java中的方法，一组预先编译好的sql语句的集合，理解成批处理语句。

第一次使用需要编译，之后则不需要编译；（因为是语句集合）减少和数据可和服务器的连接次数。

### 存储过程创建

~~~sql
create procedure 存储过程名(参数列表)
begin
	存储过程体（一组sql语句）
end;
#参数列表包含三部分;参数模式 参数名 参数类型（in stuname varcahr(20)）
参数模式：
in：改参数可以作为输入，需要调用方传入值
out：作为输出，可以作为返回值
inout：可以作为输入或者输出，改参数急需要传入值，也可以返回值。
存储过程体：以delimiter+结束标记 结尾
~~~

~~~sql
#创建存储过程
#无参数
delimiter kk
create PROCEDURE myproce4()
BEGIN
	INSERT into books (name,price) values('xin',100),('hua',90),('zi',80),('dian',70);
end kk
#delimiter kk在navicat中可以从省略，即
create PROCEDURE myproce4()
BEGIN
	INSERT into books (name,price) values('xin',100),('hua',90),('zi',80),('dian',70);
end

#有参数
create procedure myproce2(in beautyName varchar(20))
begin
	select bo.* from boys bo
	right join beauty b on bo.id = b.boyfriend_id
	where b.name = beautyName;
end
#两个参数
create procedure myproce3(in username varchar(20),in password varchar(20))
begin
	declare result int default 0;
	select count(*) into result
	from admin
	where admin.username = username 
	and admin.password = password;
	select if(result>0,'成功','失败');
end
#带out参数
create procedure myp5(in beautyName varchar(20),out boyName varchar(20))
begin
	select bo.name from boys bo
	inner join beauty b on bo.id = b.boyfrieng_id
	where b.name = beautyName;
end $
#调用
set @bName$;
call myp5('小昭',@bName)$;
select @bName;
~~~



### 存储过程调用

调用语法：call 存储过程名（实参列表）

~~~sql

~~~

### 删除存储过程

drop procedure 存储过程名；智能跟一个存储过程名。

### 查看存储过程信息

show  create procedure 存储过程名; 

**一般没有修改存储过程的内容。**

### 创建函数

函数和存储过程差不多，只是函数有且仅有一个返回。存储过程可以有0个或多个额返回，

~~~sql
#创建函数
create function 函数名（参数名 参数类型） returns 返回类型
begin
	函数体
end
#函数体肯定有return语句，如果没有会报错
#调用
select 函数名（参数列表）

#无参返回
create function myf1() returns int
begin
	declare c int default 0;
	select count(*) into c from user;
	return c;
end
select myf1();

#有参返回
create function myf2(empName varchar(20)) returns double
begin
	set @sal = 0;
	select salary into @sal from employees 
	where last_name = empName;
	return @sal;
end
select myf2('king');
~~~

### 查看函数

show create function myf2;

### 删除函数

drop function myf3;

## 9、流程控制结构

### 分支结构

if、case

~~~sql
if(表达式1,表达式2,表达式3):1成立，返回2，否则返回3

case 变量|表达式|字段
when 要判断的值 then 返回的值1或语句;
when 要判断的值 then 返回的值2或语句;
else 要返回的值
end case;
~~~

### 循环控制

while、loop、repeat

sterate：类似于continue，结束根刺循环，继续下一次

leave：类似于break，跳出，结束当前所在循环

~~~sq
while语法
【标签:】while 循环条件 do
	循环体;
end while 【标签】;

loop
【标签:】loop 
	循环体;
end loop 【标签】;

repeat
【标签:】repeat 
	循环体;
until 结束循环的条件
end repeat 【标签】;
~~~

~~~sql
create procedure pro_while1(int insertCount int)
begin
	declare i int default 1;
	a:while i<insertCount do
		insert into user(uname,age) values(concat('a',20)));
		set i = i+1;
	end while a;
end
#添加leave
create procedure pro_while2(int insertCount int)
begin
	declare i int default 1;
	a:while i<insertCount do
		insert into user(uname,age) values(concat('a',20)));
		if i>=20 then leave a;
		end if;
		set i = i+1;
	end while a;
end

#添加itarate
create procedure pro_while2(int insertCount int)
begin
	declare i int default 0;
	a:while i<insertCount do
		if mod(i,2)!=0 then iterate a;
		end if;
		insert into user(uname,age) values(concat('a',20)));
	end while a;
end
~~~

~~~sql
向表中插入指定个数的随机字符串
drop table if exists stringContent;
create table stringContent(
	int id primary key auto_increment,
    content varchar(20)
);

delimiter $
create procedure test_randstr_insert(int insertCount int)
begin
	declare i int default 1;#插入次数
	declare str varchar(26) default 'abcdefghijklmnopqrstuvwxyz';
	declare startIndex int default 1;#起始索引
	declare len int defatlt 1;#截取字符串的长度
	while i<=insertCount do
		set len=floor(rand()*(20-startIndex+1)+1);#截取长度
		set startIndex=floor(rand()*26+1);#起始索引
		insert into stringContent(content) values(substr(str,startIndex,len));
		set i=i+1;
	end while;
end $
~~~



# mysql高级

## 1、mysql架构介绍

## 2、索引优化分析

## 3、查询截取分析 

## 4、mysql锁机制

## 5、mysql锁机制主从复制