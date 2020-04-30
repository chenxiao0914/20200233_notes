# 一、basic know

1. 核心优势：跨平台	|||||||	分布式、多线程
2. javaSE：java standard edition==》标准版，定位在个人计算机上的应用。c++更优秀。
3. javaEE：java enterprise edition==》企业版，定位在服务器端的应用。eg：银行操作员
4. javaME：java micro edition==》微型版，定位在消费性电子产品的应用。趋向消亡

# 二、java应用程序的运行机制

计算机高级语言的类型主要有编译型和解释性，java是两种类型的结合。

java首先利用文本编译器编写java源程序（.java），再利用编译器（javac）将源文件编译成字节码文件（.class），最后利用虚拟机（java 解释器）执行。

.class --> jre[ 类加载器--字节码校验器--解释器jvm] -->系统平台

# 三、jdk、jre、jvm



jdk：java development kit	包含jre  +  javac、jar、debugging、tools、javap

​	以及增加可编译器和调试器等用于程序开发的文件。

jre：java runtime environment	包含jvm  +  java、javaw、libraries、rt.jar

​	java虚拟机、库函数、运行java应用程序所必须的文件。

jvm：java virtual machine	java虚拟机机制屏蔽了底层运行平台的差别，实现一次编译，随处运行。java虚拟机是实现跨平台的核心机制。

# 四、变量和常量

## 1、变量的分类

局部变量：方法或语句块内风变量。

成员变量：方法外部，类内部的变量，从属于对象，也称实例变量，会自动初始化为默认值。

​	int：0	double：0.0	char：\u0000	boolean：false

静态变量：static修饰，也称类变量，从属于类。

## 2、常量(constant)和final

常量指的是一个固定的值，eg：1,2,3，"年后"...

用final来定义一个常量，常量一旦被初始化后便不能在更改其值,通常字母全大写。

注意：1、被final修饰的方法不能被子类重写，但可以在本类中重载

​			2、被fianl修饰的类不能被继承

# 五、数据类型

## 1、基本数据类型

bit(位)	byte(字节)	KB	M				二进制0b开头	八进制0开头，十六进制0X开头

primitive data type：**byte、short、int、long、float、double、char、boolean**	1248482+1位

byte：-2[^7]--- 2[^7]-1	（-128 --- 127）

short：-2[^15] --- 2[^15]-1	（-32768 --- 32767）

int：-2[^31] --- 2[^31]-1	（-2147483648--- 2147483647）,约21亿

long：-2[^63] --- 2[^63]-1	+L/l

float：-3.403E-38 --- 3.403E38	单精度，精确到7位有效数字，+f/F

double：-1.798E308 --- 1.798E308	双精度浮点数计算时不精确，需要使用**BigInteger**或**BigDecimal**来计算

char：字符，Unicode被设计用来处理各种语言的文字，它占2个字节，可允许有65536个字符\u0000 - \uFFFF

注意：

## 2、引用数据类型

class、interface、数组	==	占四个字节，代表对象的地址

# 六、运算符

## 1、关系运算符

\> 	\<	>=	<=	==	!=	instanceof

## 2、位运算符

&	|	^	~	>>	<<	>>>

说明：<<	左移1位，相当于10进制乘以2

## 3、逻辑运算符

&	|	&&	||	！	^

说明：逻辑&，两个操作数都为true，结果才是true	逻辑|，有一个操作数为true，结果就是true

​			短路&&，有一个为false，结果就是false	短路||，只要有一个为true，结果就是true

​			逻辑^：相同为false，不同为true

​			&&的优先级大于||

短路说明：从左到右计算，如果只通过左边的运算就能得到结果，右边的就不会计算，提高效率

~~~java
import java.util.Scanner;
public class T {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String str = sc.nextLine();
		System.out.println(str);
		sc.close();
	}
}	
~~~

~~~java
public static void main(String[] args) {
	kk:for (int i = 11; 10 < i && i< 20; i++) {
		for (int j = 2; j < i/2; j++) {
			if(i%j == 0) {
				continue kk;
			}
		}
		System.out.println(i+"是质数");
	}
}
11是质数
13是质数
17是质数
19是质数
~~~

C/S：client-server	客户端-->手机端

B/S：browser-server	浏览器



# 七、访问修饰符

public、protected、private、默认修饰符（不写）、static、final、abstract

public：能被所有的类（接口、成员）访问。

protected：只能被同类、同包、子类访问，不能被非同包的类访问。如果再其他包中，则必须是该成员所属类的子类。

默认修饰符：只能被同类，同包访问，子类无法访问。

private：成员变量和方法都只能在定义它的类中被访问，其他类无法访问。

static：修饰变量，称为静态变量或类变量，所有实例共享该变量，在类初始化时加载。修饰方法，称为类方法，通过类名.调用。

final：被声明为fainal的变量必须在声明式给定初始值，且该值不能修改。修改类时，该类为最终类，无法派生子类，也就是没有子类。修饰方法时，该方法被子类不能被重写，但可以在本类中重载。

abstract：不能穿件abstract类的实例。一旦被继承，子类需要实现所有抽象方法。

| 访问级别 | 访问修饰符     | 同类 | 同包 | 子类 | 不同的包 |
| -------- | -------------- | ---- | ---- | ---- | -------- |
| 公开     | public         | √    | √    | √    | √        |
| 受保护   | protected      | √    | √    | √    | ×        |
| 默认     | 没有访问修饰符 | √    | √    | ×    | ×        |
| 私有     | private        | √    | ×    | ×    | ×        |

# 八、循环、控制

if、if-else、while、switch--case、for、break、continue

1、switch在jdk8之后，可使用字符串充当比较条件。

2、break跳出当前的多重循环

~~~java
ok:
for (int i = 0; i < 10; i++) {
    System.out.println(i);
    for(int j = 0; j<3; j++) {
        System.out.println("j="+j);
        if(i == 2) {
            break ok;
        }
    }
}
System.out.println(111);
~~~

# 九、异常

exception：分为checked异常和unchecked异常（RuntimeException运行时异常：不需要try...catch...或者throws处理的异常）。一般是因为程序员没有进行必须的检查引起，如NullPointException、ArithmaticException、ArrayIndexoutofBoundsException。

error：系统错误或者底层资源的错误，一般为底层的不可恢复的类。

# 十、反射

# 十一、集合

# 十二、常用类

1、数学运算：Math、Decimal

Math.ceil()：向上取整。 Math.ceil(11.3)=12;Math.ceil(-11.3)=-11。 

Math.floor()：向下取整。 Math.floor(11.6)=12;Math.floor(-11.6)=-12 

Math.round()：四舍五入。 Math.round(-11.3)= -11;

Math.random()：随机生成大于等于0，小于1的小数。

2、日期：Date、SimpleDateFormat

