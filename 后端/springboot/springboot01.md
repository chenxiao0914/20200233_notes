# 一、SpringBoot介绍

spring的再次封装。简化spring应用开发的一个框架。J2EE开发的一站式解决方案。

微服务：

​	一个应用应该是一组小型服务，可以通过HTTP的方式进行互通。

​	每一个功能元素都是一个可独立替换，可独立升级的软件单元。

## 1、springboot优点

- 快速创建独立运行的spring项目以及与主流框架集成
- 使用嵌入式Servlet容器，应用无需打成war包
- starters自动依赖和版本控制
- 大量的自动配置简化开发，也可修改默认配置
- 无需配置xml配置，无代码生成，开箱即用
- 准生产环境的运行时应用监控
- 与云计算的天然集成

简化配置：springboot是对spring的进一步封装，基于注解开发，舍弃xml，确实需要配置的使用yml或者properties进行简要配置。

产品级独立运行：每一个工程都可以打成一个jar包，其中内置了Tomcat或者其他Servlet容器，可以独立运行。

强大的场景启动器：每一个特点场景下的需求都封装成了一个starter，止呕药导入这个starter就有了这个场景所需要的一切，其中包括针对长江的自动化配置、依赖信息。

## 2、微服务

​	一个应用应该是一组小型服务，可以通过http的方式进行互通。
​	每一个功能元素都是一个可独立替换，可独立升级的软件单元。

spring框架、maven进行项目构件和依赖管理、IDEA
jdk1.8、			java -version

maven3.x、	 mvn -v

IDEA、spring boot1.5.9release

~~~xml
<!--该插件可以将应用打包成一个可执行的jar包-->
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
~~~

maven的settings配置文件添加如下配置

~~~xml
<profile>
    <id>jdk1.8</id>
    <activation>
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
    </activation>
    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
    </properties>
</profile>
~~~

将应用打成jar包，cmd：java -jar xxx.jar，即可启动应用，在浏览器即可访问

## 3、入门

### 方式一

创建maven工程

第一步：创建maven项目，直接next，finish

第二步：配置maven

第三步：添加pom依赖

~~~xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.1.9.RELEASE</version>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>


<!--该插件可以将应用打包成一个可执行的jar包-->
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
~~~

第四步：主程序

~~~java
@SpringBootApplication//标注一个主程序类，说明这是一个springboot应用
public class HelloMainApplication {
    public static void main(String[] args) {
        //启动springboot应用
        SpringApplication.run(HelloMainApplication.class,args);
    }
}
~~~

第五步：相关的controller或service

~~~java
@Controller
public class HelloController {

    @RequestMapping("/hello/hello1")
    @ResponseBody
    public String hello1(){
        return "hello springboot";
    }
}
~~~

第六步：启动应用测试

方式一：直接运行main方法

方式二：将应用打成jar包，cmd：java -jar xxx.jar，即可启动应用，在浏览器即可访问

### 方式二

直接创建spring-starter项目

## 4、pom文件

### 1、父项目

~~~xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.1.9.RELEASE</version>
</parent>

<!-- 它的父项目 -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-dependencies</artifactId>
    <version>2.1.9.RELEASE</version>
    <relativePath>../../spring-boot-dependencies</relativePath>
</parent>
<!-- spring-boot-dependencies来真正管理spring boot应用里面所有的依赖版本。成为springboot版本的仲裁中心 -->
~~~

### 2、导入的依赖

~~~xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
~~~

spring-boot-starter：springboot的场景启动器，帮我们导入了web模块正行运行所依赖的组件。

### 3、启动类

两件事：①扫描配置类所在包下所有的组件；②添加META-INF/spring.factories中的配置的所有EnableAutoConfiguration的值到容器中

~~~java
@SpringBootApplication//标注一个主程序类，说明这是一个springboot应用
public class HelloMainApplication {
    public static void main(String[] args) {
        //启动springboot应用
        SpringApplication.run(HelloMainApplication.class,args);
    }
}
~~~

@SpringBootApplication：说明这个类是springboot的主配置类，springboot就应该运行这个类的main方法来启东sprinboot应用。

springbootApplication注解的本质

~~~java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(
    excludeFilters = {@Filter(
    type = FilterType.CUSTOM,
    classes = {TypeExcludeFilter.class}
), @Filter(
    type = FilterType.CUSTOM,
    classes = {AutoConfigurationExcludeFilter.class}
)}
~~~

@SpringBootConfiguration：标注在某个类上，表示这是一个springboot的配置类

​		@Configuration：spring注解，配置类，配置类也是容器中的一个组件，相当于配置文件。

@EnableAutoConfiguration：开启自动配置，以前我们需要配置的东西，springboot自动配置，这样自动配置才能生效。

~~~java
@AutoConfigurationPackage
@Import({AutoConfigurationImportSelector.class})
public @interface EnableAutoConfiguration {
~~~

​		@AutoConfigurationPackage：自动配置包

​				@Import({Registrar.class})：spring底层注解，给容器中导入一个组件

​				将主配置类所在包下的所有组件扫描到spring容器中。

​		@Import({AutoConfigurationImportSelector.class})：给容器中导入组件

​				AutoConfigurationImportSelector：导入哪些选择器

​				将所有需要导入的组件以全类名的方式返回，这些组件就回别添加到容器中。

​				会给容器中导入非常多的自动配置类（xxxAutoConfiguration）,加载META-INF/spring.factories中配置的配置类。（spring-boot-autoconfigure-2.1.9.RELEASE.jar）

# 二、配置文件

springboot使用一个全局配置文件，来修改springboot自动配置的默认值。

- application.properties
- application.yml

application.yml:以数据为中心，比json、xml更适合做配置文件

## 1、yaml语法

​		k:(空格)version
​		以空格的缩进来表示层级关系，只要是左对齐的都表示同一级。
​		属性和值大小写敏感

​		字符串不用加单引号或双引号

​		""：不会转义里面的特殊字符，\n会变成-->换行
​		''：会转义，\n  还是\n
​		对象的值在下一行写或者将值用大括号包起来
​		数组：-(空格)值

~~~yml
server:
	port: 8081
#对象
user:
	name: kiven
	age: 18
#行内写法
user1: {name: iverson,age: 18}
#数组
users:
 - user1
 - user2
 - user3
 #行内写法
peoples: [peo1,peo2,peo3]
~~~

@ConfigrationProperties(prefix="xxx")：告诉springboot将本类中的所有属性和配置文件的配置进行绑定
prefix = "person" 配置文件哪个下面的所有属性进行一一映射，只有这个组件是容器中的组件，容器才能提供@ConfigrationProperties的功能,所以要在前面添加@Component注解。

### 1、@Value和@ConfigrationProperties区别

@ConfigrationProperties：加载默认主配置文件

|              | @ConfigrationProperties  | @Value                            |
| ------------ | ------------------------ | --------------------------------- |
| 功能         | 批量注入配置文件中的属性 | 一个一个指定@Value("${user.age}") |
| 松散绑定     | 支持                     | 不支持                            |
| Spel  #{}    | 不支持                   | 支持                              |
| JSR303校验   | 支持                     | 不支持                            |
| 复杂类型封装 | 支持                     | 不支持                            |

### 2、@PropertySource和@ImportResource

@PropertySource(value={classpath:person.properties})：加载指定的配置文件

@ImportResource(locations={classpath:bean.xml})：将自己编写的配置文件加载进容器，写在主配置类上，但一般不推荐，而是将配置文件写成配置类的形式

~~~java
@Configuration//这是一个配置类
public class MyAppConfig{
    @Bean//方法名为bean的id，返回值为要创建的类名
    public UserService userService(){
        return new UserService();
    }
}
~~~

### 3、Profile多环境

默认使用application.yml/properties中的配置 

~~~yml
#激活指定的profile==>application-dev.properties/yml
spring.profile.active=dev
#配置项目访问路径
server.context-path=/boot2
~~~

yml多文档块模式

~~~yml
server:
	port: 8080
spring:
	profiles: 
		active: dev
---
spring:
	profiles: dev
server:
	port: 8081

---
spring:
	profiles: sit
server:
	port: 8082
~~~



## 2、加载配置文件的位置

​	springboot启动会扫描以下位置的properties或yml文件作为springboot的默认配置文件
​	-file:./config/
​	-file:./
​	classpath:/config/
​	classpath:/
​	优先级从高到底，高的覆盖低的，互补配置

## 3、自动配置原理

配置文件可以写哪些东西？

自动配置原理：

1）、springboot启动的时候加载主配置类，开启自动配置功能@EnableAutoConfiguration

2）、@EnableAutoConfiguration的作用：

​	利用AutoConfigurationImportSelector给容器导入一些组件。哪些组件？

​	将META-INF/spring.factories配置文件中配置的EnableAutoConfiguration的配置类添加到容器。

~~~factories
# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration,\
org.springframework.boot.autoconfigure.batch.BatchAutoConfiguration,\
org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration,\
org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration,\
org.springframework.boot.autoconfigure.context.ConfigurationPropertiesAutoConfiguration,\
org.springframework.boot.autoconfigure.context.LifecycleAutoConfiguration,\
org.springframework.boot.autoconfigure.context.MessageSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.context.PropertyPlaceholderAutoConfiguration,\
~~~

3）、每一个自动配置类进行自动配置功能

以HttpEncodingAutoConfiguration为例

~~~java
@Configuration( proxyBeanMethods = false)
@EnableConfigurationProperties({ServerProperties.class})
@ConditionalOnWebApplication(type = Type.SERVLET)//
@ConditionalOnClass({CharacterEncodingFilter.class})
@ConditionalOnProperty(
    prefix = "server.servlet.encoding",
    value = {"enabled"},
    matchIfMissing = true
)
public class HttpEncodingAutoConfiguration {
~~~

@Conditional：spring底层注解，根据不同条件判断真个配置类是否生效（true则生效）。

~~~java
@Bean	//给容器添加组件
@ConditionalOnMissingBean
public CharacterEncodingFilter characterEncodingFilter() {
    CharacterEncodingFilter filter = new OrderedCharacterEncodingFilter();
    filter.setEncoding(this.properties.getCharset().name());
    filter.setForceRequestEncoding(this.properties.shouldForce(org.springframework.boot.web.servlet.server.Encoding.Type.REQUEST));
    filter.setForceResponseEncoding(this.properties.shouldForce(org.springframework.boot.web.servlet.server.Encoding.Type.RESPONSE));
    return filter;
~~~

# 三、日志框架

## 1、门面和实现

日志门面：推荐SLF4J
	JCL、SLF4J、jboss-logging

日志实现：推荐logback
	Log4j、log4j2、JUL、logback
		
适配器：slf4j-xxx.jar(log412、jdk14、)

**每个日志的实现框架都有自己的配置文件，使用slf4j后，配置文件还是做成日志实现框架本身的配置文件。**

## 2、SLF4J的使用

在开发中使用日志抽象的方法，最终会调用日志实现的方法。导入日志抽象和实现的jar。

~~~java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TestLogging {

    public static void main(String[] args) {
        Logger logger = LoggerFactory.getLogger(TestLogging.class);
        logger.info("testLogging");
    }
}
~~~

### 1、适配层

当slf4j搭配log4j时，还需要导一个适配层的jar：slf4j-log4j2.jar。

### 2、遗留问题

springboot使用slf4j+logback  +  spring(comming-logging)  +  hibernate(jboss-logging)

统一日志记录，即使是别的框架，也使用slf4j+logback。

解决方法：加一个包装层，将别的框架的日志框架去掉，转换成slf4j
		1、将别的框架的日志框架排除
		2、用中间包来替换原有的日志框架（jcl-over-slf4j.jar替换Commen-logging.jar）
		3.导入slf4j的其他实现

**中间包可以理解成包装层。**

### 3、日志使用

springboot默认使用info级别的日志输出

~~~java
import org.slf4j.LoggerFactory;

@RunWith(SpringRunner.class)
@SpringBootTest
public class Springboot02QuickApplicationTests {

    @Test
    public void contextLoads() {
        Logger logger = LoggerFactory.getLogger(getClass());
        logger.trace("开启日志trace");
        logger.debug("开启日志debug");
        logger.info("开启日志info");
        logger.warn("开启日志warn");
        logger.error("开启日志error");
    }
}
~~~

也可在配置文件指定输出级别和输出位置。

~~~properties
#日志输出设置
#输出级别
logging.level.com.cx.springboot = trace
#输出位置
logging.file.path = /springboot/log
#在控制台输出格式
logging.pattern.console=%d{yyyy-MM-dd} [%thread] %-5level %logger{50} -%msg%n
#指定文件中日志输出格式
logging.pattern.file=%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} -%msg%n
#	%d：日期时间
#	%thread：线程名
#	%-5level：级别从左显示5个字符宽度
#	%logger{50}：logger名字最长50个字符，否则按句点分割
#	%msg：日志信息
#	%n：换行
~~~

# 四、springboot与web

# 五、springboot与springmvc

