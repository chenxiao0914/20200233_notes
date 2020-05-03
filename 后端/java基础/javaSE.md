# 一、环境搭建

# 二、基础语法

## 1、常量和变量

**常量**指的是一个固定的值，eg： 1,2,3，"年后"...

用final来定义一个常量，常量一旦被初始化后便不能在更改其值,通常字母全大写。

注意：1、被final修饰的方法不能被子类重写，但可以在本类中重载

​			2、被fianl修饰的类不能被继承

**变量**

局部变量：方法或语句块内风变量。

成员变量：方法外部，类内部的变量，从属于对象，也称实例变量，会自动初始化为默认值。

​	int： 0	double： 0.0	char： \u0000	boolean： false

静态变量：static修饰，也称类变量，从属于类

## 2、数据类型

### 基本数据类型

bit(位)	byte(字节)	KB	M				二进制0b开头	八进制0开头，十六进制0X开头

primitive data type： **byte、short、int、long、float、double、char、boolean**	1248482+1位

byte：-2[^7]--- 2[^7]-1	（-128 --- 127）

short：-2[^15] --- 2[^15]-1	（-32768 --- 32767）

int：-2[^31] --- 2[^31]-1	（-2147483648--- 2147483647）,约21亿

long：-2[^63] --- 2[^63]-1	+L/l

float：-3.403E-38 --- 3.403E38	单精度，精确到7位有效数字，+f/F

double：-1.798E308 --- 1.798E308	双精度浮点数计算时不精确，需要使用**BigInteger** 或**BigDecimal**来计算

char：字符，Unicode被设计用来处理各种语言的文字，它占2个字节，可允许有65536个字符\u0000 - \uFFFF

注意：

### 引用数据类型

class、interface、数组	==	占四个字节，代表对象的地址

## 3、运算符

### 关系运算符

\> 	\<	>=	<=	==	!=	instanceof

### 位运算符

&	|	^	~	>>	<<	>>>

说明：<<	左移1位，相当于10进制乘以10

### 逻辑运算符

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

C/S： client-server	客户端-->手机端

B/S： browser-server	浏览器

## 4、控制语句

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



# 三、面向对象

## 1、类与对象

 类是用于描述同一类型的对象的一个抽象的概念，类中定义了这一类对象所因具有静态和动态属性。 类可以看成一类对象（object）的模版，对象可以看成该类的一个具体实例（instance）。 

## 2、 抽象类与接口

**接口和抽象类的区别：**

（1）抽象类可以有构造方法，接口中不能有构造方法。

（2）抽象类中可以有普通成员变量，接口中没有普通成员变量

（3）抽象类中可以包含静态方法，接口中不能包含静态方法

（4） 一个类可以实现多个接口，但只能继承一个抽象类。

（5）接口可以被多重实现，抽象类只能被单一继承

（6）如果抽象类实现接口，则可以把接口中方法映射到抽象类中作为抽象方法而不必实现，而在抽象类的子类中实现接口中方法

**接口和抽象类的相同点：**

(1) 都可以被继承

(2) 都不能被实例化

(3) 都可以包含方法声明

(4) 派生类必须实现未实现的方法

## 3、封装、继承、多态

 **封装**就是指，将类的属性私有化，提供公开的方法去访问的方式，就叫做封装。  好处：提高代码的复用性；隐藏了实现细节，还要对外提供可以访问的方式；提高了安全性 。

**继承**是多个类中存在相同属性和行为时，将这些内容抽取到单独一个类中，那么多个类无需再定义这些属性和行为，只要继承那个类即可。 好处： 提高了代码的复用性； 让类与类之间产生了关系，提供了多态的前提。 

**多态**是多个不同类对象可以响应同一个方法，产生不同的结果 。 好处： **提高了代码的复用性**；  派生类的功能可以被基类的方法或引用变量所调用，这叫向后兼容，**可以提高可扩充性和可维护性**。 

## 4、泛型

## 5、内部类



# 四、数组

数组是在内存中存储相同数据类型的连续的空间。数组长度一旦声明，不可改变不可追加。

~~~java
int[] a = {1,2,3,4}
int b[] = new int[]{1,2,35,4,6};
//使用for循环遍历
for(int b:a) {
    System.out.println(b);
}
~~~

**数组排序**

- 冒泡排序

  每轮算出最大值排在最后

~~~java
int [] arr = {78,89,67,98,90,56,88};
for(int i=0; i<arr.length-1; i++){//控制比较的轮数
    for(int j=0; j<arr.length-1-i; j++){//控制每轮比较的次数
        if(arr[j]>arr[j+1]){
            int temp = arr[j];
            arr[j]  = arr[j+1];
            arr[j+1] = temp;
        }
    }
}
~~~

- 二分法查找



# 五、集合

<img src="img/集合.png" alt="集合" style="zoom: 50%;" />

![￯﾿ﾩ￯ﾾﾛ￯ﾾﾆ￯﾿ﾥ￯ﾾﾐ￯ﾾﾈ2](img/￯﾿ﾩ￯ﾾﾛ￯ﾾﾆ￯﾿ﾥ￯ﾾﾐ￯ﾾﾈ2.png)

![map](img/map.png)



Collection接口下的集合：List、Set、Queue

Map接口也是一种集合

## List

List集合代表一个有序、可重复集合，集合中每个元素都有其对应的顺序索引。List集合默认按照元素的添加顺序设置元素的索引，可以通过索引（类似数组的下标）来访问指定位置的集合元素。 增删慢，查询快。

### **LinkedList**

**基于链表实现，链表内存是散列的，增删快，查找慢；**

LinkedList是List接口的另一个实现，除了可以根据索引访问集合元素外，LinkedList还实现了Deque接口，可以当作双端队列来使用，也就是说，既可以当作“栈”使用，又可以当作队列使用。

LinkedList的实现机制与ArrayList的实现机制完全不同，ArrayLiat内部以数组的形式保存集合的元素，所以随机访问集合元素有较好的性能；LinkedList内部以链表的形式保存集合中的元素，所以随机访问集合中的元素性能较差，但在插入删除元素时有较好的性能。

### **ArrayList**

**基于数组实现，非线程安全，效率高，增删慢，查找快；**

ArrayList是一个动态数组，也是我们最常用的集合，是List类的典型实现。它允许任何符合规则的元素插入甚至包括null。每一个ArrayList都有一个初始容量（10），该容量代表了数组的大小。随着容器中的元素不断增加，容器的大小也会随着增加。在每次向容器中增加元素的同时都会进行容量检查，当快溢出时，就会进行扩容操作。所以如果我们明确所插入元素的多少，最好指定一个初始容量值，避免过多的进行扩容操作而浪费时间、效率。 

### **Vector**

**基于数组实现，线程安全，效率低，增删慢，查找慢；**

与ArrayList相似，但是Vector是同步的。所以说Vector是线程安全的动态数组。它的操作与ArrayList几乎一样。

### **Stack**

Stack继承自Vector，实现一个后进先出的堆栈。Stack提供5个额外的方法使得Vector得以被当作堆栈使用。基本的push和pop 方法，还有peek方法得到栈顶的元素，empty方法测试堆栈是否为空，search方法检测一个元素在堆栈中的位置。Stack刚创建后是空栈。 

**Iterator接口和ListIterator接口** 

Iterator是一个接口，它是集合的迭代器。集合可以通过Iterator去遍历集合中的元素。Iterator提供的API接口如下：

　　♦ boolean hasNext()：判断集合里是否存在下一个元素。如果有，hasNext()方法返回 true。
　　♦ Object next()：返回集合里下一个元素。
　　♦ void remove()：删除集合里上一次next方法返回的元素。

　　ListIterator接口继承Iterator接口，提供了专门操作List的方法。ListIterator接口在Iterator接口的基础上增加了以下几个方法：

　　♦ boolean hasPrevious()：判断集合里是否存在上一个元素。如果有，该方法返回 true。
　　♦ Object previous()：返回集合里上一个元素。
　　♦ void add(Object o)：在指定位置插入一个元素。

　　以上两个接口相比较，不难发现，ListIterator增加了向前迭代的功能（Iterator只能向后迭代），ListIterator还可以通过add()方法向List集合中添加元素（Iterator只能删除元素）。

## Set

元素无序不重复，没有下标，只能用迭代来取。增删块，查询慢

### **HashSet** 

HashSet是Set集合最常用实现类，是其经典实现。HashSet是按照hash算法来存储元素的，因此具有很好的存取和查找性能。 底层是由 HashMap 实现，不允许集合中有重复的值，使用该方式时需要重写 equals()与hashCode()方法； 

HashSet具有如下特点：

　　♦ 不能保证元素的顺序。

　　♦ HashSet不是线程同步的，如果多线程操作HashSet集合，则应通过代码来保证其同步。

　　♦ 集合元素值可以是null。

HashSet存储原理如下：

　　当向HashSet集合存储一个元素时，HashSet会调用该对象的hashCode()方法得到其hashCode值，然后根据hashCode值决定该对象的存储位置。HashSet集合判断两个元素相等的标准是(1)两个对象通过equals()方法比较返回true；(2)两个对象的hashCode()方法返回值相等。因此，如果(1)和(2)有一个不满足条件，则认为这两个对象不相等，可以添加成功。如果两个对象的hashCode()方法返回值相等，但是两个对象通过equals()方法比较返回false，HashSet会以链式结构将两个对象保存在同一位置，这将导致性能下降，因此在编码时应避免出现这种情况。

HashSet查找原理如下：

　　基于HashSet以上的存储原理，在查找元素时，HashSet先计算元素的HashCode值（也就是调用对象的hashCode方法的返回值），然后直接到hashCode值对应的位置去取出元素即可，这就是HashSet速度很快的原因。

重写hashCode()方法的基本原则如下：

 　   ♦ 在程序运行过程中，同一个对象的hashCode()方法返回值应相同。

　　♦ 当两个对象通过equals()方法比较返回true时，这两个对象的hashCode()方法返回值应该相等。

　　♦ 对象中用作equals()方法比较标准的实例变量，都应该用于计算hashCode值。

### **LinkedHashSet** 

基于 LinkedHashMap 来进行实现，底层使用的是 LinkedHashMap。 LinkedHashSet是HashSet的一个子类，具有HashSet的特性，也是根据元素的hashCode值来决定元素的存储位置。但它使用链表维护元素的次序，元素的顺序与添加顺序一致。由于LinkedHashSet需要维护元素的插入顺序，因此性能略低于HashSet，但在迭代访问Set里的全部元素时由很好的性能。 

### TreeSet

TreeSet时SortedSet接口的实现类，TreeSet可以保证元素处于排序状态，它采用红黑树的数据结构来存储集合元素。TreeSet支持两种排序方法：自然排序和定制排序，默认采用自然排序。

　　**♦ 自然排序**

　　TreeSet会调用集合元素的compareTo(Object obj)方法来比较元素的大小关系，然后将元素按照升序排列，这就是自然排序。如果试图将一个对象添加到TreeSet集合中，则该对象必须实现Comparable接口，否则会抛出异常。当一个对象调用方法与另一个对象比较时，例如obj1.compareTo(obj2)，如果该方法返回0，则两个对象相等；如果返回一个正数，则obj1大于obj2；如果返回一个负数，则obj1小于obj2。

　　Java常用类中已经实现了Comparable接口的类有以下几个：

　　♦ BigDecimal、BigDecimal以及所有数值型对应的包装类：按照它们对应的数值大小进行比较。

　　♦ Charchter：按照字符的unicode值进行比较。

　　♦ Boolean：true对应的包装类实例大于false对应的包装类实例。

　　♦ String：按照字符串中的字符的unicode值进行比较。

　　♦ Date、Time：后面的时间、日期比前面的时间、日期大。

　　对于TreeSet集合而言，它判断两个对象是否相等的标准是：两个对象通过compareTo(Object obj)方法比较是否返回0，如果返回0则相等。

 　**♦ 定制排序**

　　想要实现定制排序，需要在创建TreeSet集合对象时，提供一个Comparator对象与该TreeSet集合关联，由Comparator对象负责集合元素的排序逻辑。

　　综上：自然排序实现的是Comparable接口，定制排序实现的是Comparator接口。

~~~txt
HashSet的性能比TreeSet的性能好（特别是添加，查询元素时），因为TreeSet需要额外的红黑树算法维护元素的次序，如果需要一个保持排序的Set时才用TreeSet，否则应该使用HashSet。

　　LinkedHashSet是HashSet的子类，由于需要链表维护元素的顺序，所以插入和删除操作比HashSet要慢，但遍历比HashSet快。

　　EnumSet是所有Set实现类中性能最好的，但它只能 保存同一个枚举类的枚举值作为集合元素。

　　以上几个Set实现类都是线程不安全的，如果多线程访问，必须手动保证集合的同步性。
~~~



## Queue



## Map

Map接口采用键值对Map<K,V>的存储方式，保存具有映射关系的数据，因此，Map集合里保存两组值，一组值用于保存Map里的key，另外一组值用于保存Map里的value，key和value可以是任意引用类型的数据。key值不允许重复，可以为null。如果添加key-value对时Map中已经有重复的key，则新添加的value会覆盖该key原来对应的value。常用实现类有HashMap、LinkedHashMap、TreeMap等。 

### **HashMap** 

基于 hash 表的 Map 接口实现，非线程安全，高效，支持 null 值和 null 键； 

### **Hashtable**

线程安全，低效，不支持 null 值和 null 键； 

~~~txt
HashMap与Hashtable是Map接口的两个典型实现，它们之间的关系完全类似于ArrayList与Vertor。HashTable是一个古老的Map实现类，它提供的方法比较繁琐，目前基本不用了，HashMap与Hashtable主要存在以下两个典型区别：

　　♦ HashMap是线程不安全，HashTable是线程安全的。

　　♦ HashMap可以使用null值最为key或value；Hashtable不允许使用null值作为key和value，如果把null放进HashTable中，将会发生空指针异常。

　　为了成功的在HashMap和Hashtable中存储和获取对象，用作key的对象必须实现hashCode()方法和equals()方法。

　　HashMap工作原理如下：

　　HashMap基于hashing原理，通过put()和get()方法存储和获取对象。当我们将键值对传递给put()方法时，它调用建对象的hashCode()方法来计算hashCode值，然后找到bucket位置来储存值对象。当获取对象时，通过建对象的equals()方法找到正确的键值对，然后返回对象。HashMap使用链表来解决碰撞问题，当发生碰撞了，对象将会存储在链表的下一个节点中。
~~~



### **LinkedHashMap** 

HashMap 的一个子类，保存了记录的插入顺序； 

 LinkedHashMap使用双向链表来维护key-value对的次序（其实只需要考虑key的次序即可），该链表负责维护Map的迭代顺序，与插入顺序一致，因此性能比HashMap低，但在迭代访问Map里的全部元素时有较好的性能。 

### TreeMap  

TreeMap，能够把它保存的记录根据键排序，默认是键值的升序排序.

TreeMap是SortedMap的实现类，是一个红黑树的数据结构，每个key-value对作为红黑树的一个节点。TreeMap存储key-value对时，需要根据key对节点进行排序。TreeMap也有两种排序方式：

　　♦ 自然排序：TreeMap的所有key必须实现Comparable接口，而且所有的key应该是同一个类的对象，否则会抛出ClassCastException。

　　♦ 定制排序：创建TreeMap时，传入一个Comparator对象，该对象负责对TreeMap中的所有key进行排序。

~~~txt
各Map实现类的性能分析

　　♦ HashMap通常比Hashtable（古老的线程安全的集合）要快

　　♦ TreeMap通常比HashMap、Hashtable要慢，因为TreeMap底层采用红黑树来管理key-value。

　　♦ LinkedHashMap比HashMap慢一点，因为它需要维护链表来爆出key-value的插入顺序。
~~~



# 六、常用API

# 七、IO流

# 八、反射

# 九、多线程

# 十、网络编程