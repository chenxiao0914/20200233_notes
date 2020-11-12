

# 一、dubbo核心概念

Apache dubbo是一款高性能、轻量级的开源Java RPC框架，他提供三个核心能力：面向接口的远程方法调用，智能容错和负载均衡、服务的自动注册和发现。

RPC： remote proceduce call   远程过程调用，一种进程间通信，是一种技术思想，不是规范。RPC的两个核心模块：通讯，序列化  

组成部分：

服务提供者（provider）、服务消费者（consume）、注册中心（registry）、监控中心（monitor）

http://dubbo.apache.org/zh-cn/docs/user/quick-start.html

http://dubbo.apache.org/zh-cn/docs/user/references/registry/zookeeper.html

# 二、dubbo使用

前提：启动zkServer.cmd

## 服务提供者

1、导依赖

2、编写提供的服务

3、配置文件，将服务注册到注册中心

~~~xml
<dependencies>
    <!-- 引入公用的bean类和接口 -->
    <dependency>
        <groupId>com.cx.gmall</groupId>
        <artifactId>gmall-interface</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </dependency>
    <!-- 引入dubbo -->
    <!-- https://mvnrepository.com/artifact/com.alibaba/dubbo -->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>dubbo</artifactId>
        <version>2.6.2</version>
    </dependency>
    <!-- 注册中心使用的是zookeeper，引入操作zookeeper的客户端 -->
    <!-- https://mvnrepository.com/artifact/org.apache.curator/curator-framework -->
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-framework</artifactId>
        <version>2.12.0</version>
    </dependency>
</dependencies>
~~~



~~~java
public class UserServiceImpl implements UserService{

	@Override
	public List<UserAddress> getUserAddressList(String userId) {
		UserAddress address1 = new UserAddress(1,"安庆市太湖县北中镇001","1","陈晓","4308082","Y");
		UserAddress address2 = new UserAddress(2,"安庆市太湖县北中镇002","1","陈小晓","4308083","N");
		return Arrays.asList(address1,address2);
	}
}
~~~

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xmlns="http://www.springframework.org/schema/beans"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
       http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd" >
       
	<!-- 1、指定当前服务/应用的名称(同样的服务名字相同，不要和别的服务同名) -->
	<dubbo:application name="user-server-provider"></dubbo:application> 
	
	<!-- 2、指定注册中心的位置 -->
	<!-- <dubbo:registry address="zookeeper://127.0.0.1:2181"></dubbo:registry> -->
	<dubbo:registry protocol="zookeeper" address="127.0.0.1:2181"></dubbo:registry>
	
	<!-- 3、指定通讯规则(通信协议、通信端口) -->
	<dubbo:protocol name="dubbo" port="20880"></dubbo:protocol>
	
	<!-- 4、暴露服务 ref：指向服务真正的实现对象 -->
	<dubbo:service interface="com.cx.gmall.service.UserService" ref="userServiceImpl"></dubbo:service>
	
	<!-- 服务的实现 -->
	<bean id="userServiceImpl" class="com.cx.gmall.service.impl.UserServiceImpl"></bean>
	
	<!-- 连接监控中心 -->
	<dubbo:monitor protocol="registry"></dubbo:monitor>
</beans>
~~~



~~~java
public class MainApplication {

	public static void main(String[] args) throws IOException {
		ClassPathXmlApplicationContext ioc = new ClassPathXmlApplicationContext("provider.xml");
		ioc.start();
		//阻塞线程，防止服务停止
		System.in.read();
	}
}
~~~



## 服务消费者

~~~xml
<dependencies>
    <dependency>
        <groupId>com.cx.gmall</groupId>
        <artifactId>gmall-interface</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>dubbo</artifactId>
        <version>2.6.2</version>
    </dependency>
    <dependency>
        <groupId>org.apache.curator</groupId>
        <artifactId>curator-framework</artifactId>
        <version>2.12.0</version>
    </dependency>
</dependencies>
~~~



~~~java
@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	UserService userService;
	@Override
	public void initOrder(String userId) {
		System.out.println(userId);
		//查询用户的收货地址
		List<UserAddress> userAddressList = userService.getUserAddressList(userId);
		System.out.println(userAddressList);
		for (UserAddress userAddress : userAddressList) {
			System.out.println(userAddress.getUserAddress());
		}
	}

}
~~~

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
       http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd
       http://www.springframework.org/schema/context
	   http://www.springframework.org/schema/context/spring-context.xsd" >
	   
	<context:component-scan base-package="com.cx.gmall.service.impl"></context:component-scan>
       
	<!-- 1、指定当前服务/应用的名称(同样的服务名字相同，不要和别的服务同名) -->
	<dubbo:application name="order-service-consumer"></dubbo:application> 
	
	<!-- 2、指定注册中心的位置 -->
	<!-- <dubbo:registry address="zookeeper://127.0.0.1:2181"></dubbo:registry> -->
	<dubbo:registry protocol="zookeeper" address="127.0.0.1:2181"></dubbo:registry>
	
	<!-- 声明需要调用的远程服务的接口；生成远程服务代理 -->
	<dubbo:reference interface="com.cx.gmall.service.UserService" id="userService"></dubbo:reference>
	
	<!-- 连接监控中心 -->
	<dubbo:monitor protocol="registry"></dubbo:monitor>
	<!-- <dubbo:monitor adress="127.0.0.1:7070"></dubbo:monitor> -->
</beans>
~~~

启动消费者，模拟发送请求

~~~java
public class ConsumerMainApplication {

	public static void main(String[] args) throws IOException {
		ClassPathXmlApplicationContext ioc = new ClassPathXmlApplicationContext("consumer.xml");
		OrderService orderService = ioc.getBean(OrderService.class);
		orderService.initOrder("1");
		System.out.println("调用结束");
		System.in.read();
	}	
}
~~~



# 三、常用配置

## 启动时检查

Dubbo缺省会在启动时检查依赖的服务是否可用，不可用时会抛出异常，组织spring完成初始化，一边上线时，能及早发现问题，默认check=true。

可以通过check=false关闭检查。

如果spring容器时懒加载，或者通过API编程延迟引用服务，需要关闭check，否则服务临时不可用时，会抛异常，返回null引用。如果check=false，总是会返回引用，当服务恢复时，能自动连接上。

~~~xml
<!-- 可在消费方引用或服务方提供接口时设置-->
<dubbo:reference interface="com.cx.gmall.service.UserService" id="userService" check="false"></dubbo:reference>

<!-- 或者统一配置所有服务引用（当服务很多时） -->
<dubbo:consumer check="false"></dubbo:consumer>
~~~

## 超时设置

问题：因为网络原因，服务提供方一直没有返回，线程将阻塞，可能会引起性能下降。

解决方法：设置超时时间

~~~xml
<!-- 可在消费方引用或服务方提供接口时设置 默认值1000毫秒 -->
<dubbo:reference interface="com.cx.gmall.service.UserService" id="userService" check="false" timeout="2000"></dubbo:reference>

<!-- 或者统一配置所有服务引用（当服务很多时） -->
<dubbo:consumer timeout="2000" check="false"></dubbo:consumer>
~~~

还可以在别的地方设置，生效优先级：方法 > 接口 > 全局配置；如果级别一致：消费方 > 提供方

## 重试次数

当服务超时，可以设置重试次数重试几次。

重试次数：不包含第一次调用；幂等操作可以设置重试次数【删、改、查】，非幂等不能设置重试次数【增加】

~~~xml
<dubbo:reference interface="com.cx.gmall.service.UserService" id="userService" retries="3"></dubbo:reference>

<dubbo:consumer check="false" timeout="2000" retries="3"></dubbo:consumer>
~~~

## 多版本（灰度发布）

当一个接口实现出现不兼容升级，可以用版本号过度，版本号不同的服务相互间不能引用。

实现步骤：

​	1、在低压力时，先升级一半服务为新版本

​    2、再讲所有消费者升级为新版本

​	3、然后将剩下的一半服务升级为新版本

version="*"表示随机调用哪个版本

~~~xml
<!-- 服务方 -->
<dubbo:service interface="com.cx.gmall.service.UserService" ref="userServiceImpl" version="1.0.0"></dubbo:service>
<!-- 消费方 -->
<dubbo:reference interface="com.cx.gmall.service.UserService" id="userService" version="1.0.0"></dubbo:reference>
~~~

## 本地存根

# 四、高可用

## 1、zookeeper高可用与dubbo直连

现象：zookeeper注中心宕机后，还可以消费dubbo暴露的服务。

原因：

1）、数据库宕机后，注册中心仍能通过缓存提供服务列表查询，但不能注册新服务。

2）、注册中心对等集群，任意一台宕掉后，将自动切换到另一台。

3）、注册中心全部宕掉后，服务提供者和消费者人能通过本地缓存通讯。

4）、服务提供者全部宕掉后，服务消费应用将无法使用，并无限次重连等待服务提供者恢复。

5）、监控中心宕掉后，不影响使用，只是丢失部分采样数据。

通过高可用，减少应用不能提供服务的时间。

## 2、集群下dubbo负载均衡机制

## 3、服务降级

当服务器压力剧增的情况下，根据实际业务情况及流量，对一些服务和页面有策略的不处理或者换种简单的方式处理，从而释放服务器字眼及保证核心交易正常运作或高效运作。

可以通过服务降级功能临时屏蔽某个出错的非关键交易，并定义降级后的返回策略。**在消费方设置**。

两种策略：一种（mock:force:return+null）直接消费方调用服务方方法时直接返回null，不发起远程调用；另一种也称**容错**，屏蔽一个服务（mock:fail:return+null）在方法调用失败时返回null，不抛异常，用来容忍不重要服务不稳定时读调用方的影响。

## 4、集群容错&Hystrix

整合Hystrix

1、导入Hystrix-starter

2、在启动类上添加@EnableHystrix注解

3、在方法上添加@HystrixCommand注解

# 五、dubbo原理

## RPC原理

一次完整的RPC调用（同步调用，异步另说）如下：

1）、服务消费方client调用一本地调用方式调用服务

2）、client stub 接受到嗲用后负责则将方法、参数等组装成能够进行网络传输的消息体

3）、client stub 找到服务器地址，并将消息发送到服务端

4）、server stub 接受到消息或进行解码

5）、server stub 根据解码结果调用本地的服务

6）、本地服务执行方法并将结果返回给server stub

7）、server stub 将返回结果打包成消息并发发送至消费方

8）、client stub 接受发哦消息，并进行解码

9）、消费方得到最终结果

RPC框架是将2-8步骤封装起来。

	dubbo工作原理
	
	一、provider暴露服务
	1、首先provider可以在配置文件中配置自己可以提供那些服务，通过<dubbo:service>可以进行配置或者注解的方式，并且在配置的时候需要配置注册中心、应用名、节点地址、通信协议等一系列参数（以DemoService为例子，下同）
	2、dubbo是基于spring的，dubbo提供的服务在spring看来就是一个bean，叫做ServiceBean，而ServiceBean实现了Spring的InitializingBean、ApplicationContextAware、ApplicationListener等接口，所以当spring启动完成之后，ServiceBean实际上就已经被加载到spring容器中了，（此时DemoService已经作为一个bean存在spring容器中，但是还没有注册到注册中心，也没有暴露给外部，只是作为一个最基本的bean的存在），所以ServiceBean还监听了applicationContext启动完成的事件，执行额外的操作。
	3、当spring容器启动完成之后，ServiceBean就需要将自己暴露给外部并且注册到注册中心了，这一步是ServiceBean的export方法中执行，也可以叫做导出方法
	4、首先加载provider端dubbo端配置，如应用名称、注册中心地址、通信协议、端口号等基本信息，并且对这些配置进行读取获取是设置默认值，并且根据不同配置进行不同处理，如是否延迟加载等
	5、所有配置信息加载完毕，就将这些配置信息进行组装到一起，封装成了一个URL对象，一个URL对象就包含了一个服务所有的信息，包含了接口到方法名称、参数列表、dubbo的配置信息等
	6、现在DemoService被封装成了一个URL，那么就可以进行暴露出去了，暴露出去的意思实际就是告诉别人需要以什么样的协议来调用，所以服务的暴露针对不同的协议暴露的方式也不同。
	7、Protocol接口提供了暴露服务和引入服务两个方法，不同的协议实现就需要实现这个接口来进行暴露服务，默认是dubbo协议，所以就通过DubboProtocol实现类来进行服务的暴露
	8、暴露的过程实际就是将服务存入一个全局的Map中，key就是以URL为基础创建的唯一key，value就是这个服务
	9、下一步，既然是远程调用，那么消费者就需要连接提供者，提供者这边就需要开启一个端口等待消费者的连接
	10、dubbo默认采用的是Netty框架，所以在暴露服务的时候就会根据服务配置的端口号启动Netty服务器，并且以host+port为key，NettyServer为value存入Map中（这样做的好处是不同服务可以通过不同的Netty服务器处理）
	到这里服务的暴露过程基本上走完，实际上就是将服务封装成一个对象存入全局Map中，然后启动一个Netty服务器监听消费者的消费。
	
	实现细节：
	
	当服务被消费，那就需要被执行，如DemoService的一个方法被消费，那么这个方法最终是需要被执行的。那么如何被执行呢？两种思路：一种是服务暴露的时候定义一个执行器，可以执行DemoService的实现类的方法；一种是服务被消费的时候再来执行。很显然第一种方式跟靠谱，因为这样就可以在服务暴露的时候就提前知道了服务的方法该如何执行，具体执行的时候传入不同的参数就好了。dubbo也是这么干的，所以这里就涉及到了一个接口叫做Invoker。
	Invoker是dubbo很核心的一个概念，首先不关心它是如何实现的，首先得了解它能干嘛。可以理解为Invoker就是一个执行体，一个Invoker对应一个接口，这个接口的方法就可以通过Invoker来执行，如DemoService的所有方法都可以通过这个Invoker来执行。
	而Invoker就是在服务暴露的时候创建的，就是步骤5中的创建的URL对象来创建的，而步骤8中暴露服务的时候实际也就是将invoker对象作为参数进行暴露，暴露成功之后会再封装出一个Exporter对象。因为服务可以被暴露也可以取消暴露，Exporter对象中就包含了Invoker对象以及暴露的状态。所以第8步中最终存入全局Map的就是这个Exporter对象。
	再捋一捋：服务暴露需要根据不同的协议去暴露，所以需要执行不同协议对象procotol实现类，每个procotol中有一个Map，key为服务的唯一标识，value为Exporter对象；Exporter对象可以调用getInvoker()得到这个服务的Invoker对象，得到了这个Invoker对象就可以执行具体服务的方法了。至于Invoker具体怎么执行方法下文和消费者的消费过程一同分析


```txt
二、consumer引入服务
1、消费者的启动过程和提供者大致差不多，只不过消费者的bean叫做ReferenceBean，也是在spring启动的时候进行加载初始化
2、当需要消费服务时，首先的从容器中获取bean也就是执行getObject()得到，此时就会在getObject方法中执行init()方法去引入服务
3、执行init方法时首先也是进行dubbo配置的读取和加载等，并且将一切配置信息整合到一个map中（提供者也是先放入map然后封装成URL对象）
4、然后根据map中的配置信息，执行createProxy方法来返回一个服务的实例，如DemoService的实现类实例 demoService，那么这个demoService就可以直接执行DemoService接口中的方法了。
5、前四步好理解，就是根据配置参数获取了接口的实现类对象，然后就可以去执行方法了。那么现在的重点就是这个实现类是如何生成的，也就是createProxy方法是如何实现的
6、回顾提供者暴露服务的过程可以知道一个invoker是一个执行体，暴露服务的时候通过Procotol接口的方法将Invoker暴露出去，那么消费者可以根据Procotol接口获取Invoker对象么？答案是肯定的。
7、消费者根据配置信息的map也创建了URL对象，然后通过Procotol的refer方法可以获取到一个Invoker对象，这个Invoker对象就是可以执行服务的方法的执行体
8、invoker对象的创建过程会和服务提供者进行连接，以netty为例子就是创建了Netty的客户端和提供者那边的Netty服务端进行连接，然后得到的连接对象和服务信息共同构造出了invoker对象
9、而消费者不能直接使用Invoker，因为不能使用DemoService service = invoker, 所以需要将invoker转化成接口的实现类对象。
10、这里就采用了代理模式，通过字节码生成技术，根据invoker对象动态生成了一个服务的实现类，那么这个实现类执行具体方法的时候实际就是通过invoker来执行了。

总结：服务引入的过程实际就是作为一个客户端，创建了和服务器的一个连接，得到了一个invoker对象，并通过invoker对象动态代理的方式得到服务的实现类，实现类的方法执行实际就是通过invoker来执行的。
```
## Netty通信原理

**dubbo底层使用Netty通信**

Netty通信基于NIO（非阻塞IO）

NIO：客户端发送的请求可以封装成一个个通道channel，多个chanel连接同一个选择器（seletor），当channel的状态准备好，seletor就开辟一个线程执行，也称多路复用。

状态：Connet（连接就绪）、Accept（接受就绪）、Read（读就绪）、Write（写就绪）

