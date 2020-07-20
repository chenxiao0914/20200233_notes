

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

## Netty通信原理

**dubbo底层使用Netty通信**

Netty通信基于NIO（非阻塞IO）

NIO：客户端发送的请求可以封装成一个个通道channel，多个chanel连接同一个选择器（seletor），当channel的状态准备好，seletor就开辟一个线程执行，也称多路复用。

状态：Connet（连接就绪）、Accept（接受就绪）、Read（读就绪）、Write（写就绪）

