# 计划

第一天：spring框架的概述，spring汇总基于XML的IOC配置。

第二天：spring汇总基于注解的IOC的ioc案例。

第三天：spring中aop和基于XML以及注解的AOP配置。

第四天：spring中JdbcTemplate以及spring的事务控制。

# 1、spring概述

## 1.1、spring是什么？

spring是分层的全栈式轻量级开发框架，以IOC（控制反转）和AOP（面向切面编程）为核心，提供了展现层springMVC和持久层spring JDBC以及业务层事务管理等众多技术的企业级应用技术。

特点：方便解耦，便于开发；aop编程支持；方便程序测试；方便和其他框架高度整合；提供事务管理；

## 1.2、spring的体系结构？

​	[springframework体系结构图](image/springframework.PNG) 

## 1.3、core contaimer:核心容器（Beans、core、context、Spel）

解耦：降低程序间的依赖关系，做到编译期间不依赖，运行时才依赖。

​	第一步：使用反射创建对象，避免使用new关键字

​	第二部：通过读取配置文件，来获取要创建对象的全限定类名

## 1.4、ApplicationContext

​	ApplicationContext的三个实现类     

​		 ClassPathXmlApplicationContext      

​		FileSystemXmlApplicationContext   

​		 AnnotationConfigApplicationConext

​	核心容器的两个接口引发的问题

​	ApplicationContext  单例对象使用      

​		他在构建核心容器时，创建对象采取的策略是立即加载的方式，也就是读取完配置文件，马上就创建配置中的对象  

​	BeanFactory     多例对象使用     

​		 他在构建核心容器时，创建对象采取的策略是延迟加载的方式，什么时候需要根据id获取对象时，才创建对象

# 2、IOC

把创建对象的过程交给spring管理，达到解耦的目的。

IOC底层原理：XML解析、工厂模式、反射。

IOC思想基于IOC容器完成，IOC容器底层就是对象工厂。IOC容器的两种实现方式（两个接口）。

- BenaFactory：spring内部使用的接口，一般不提供给开发人员使用，加载配置文件的时候不会创建对象，在获取对象的时候才会创建对象。
- ApplicationContext：BeanFactory的子接口，提供更强大的功能，一般有开发人员使用。加载配置文件的时候就把配置对象创建完成。

ApplicationContext的两个实现类：FileSystemXmlApplicationContext、ClassPathXmlApplicationContext

## 	2.1、创建对象的三种方式

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 将对象的创建交给spring管理
        创建对象的三种方式
    -->
    <!--第一种：使用默认构造函数创建
        如果类中没有默认构造函数，则对象无法创建
    <bean id="userService" class="com.cx.ssm.service.impl.UserServiceImpl"></bean>
    -->

    <!--第二种：使用普通工厂的方式创建（使用某个类中的方法，并存入spring容器）
    <bean id="beanFactory" class="com.cx.ssm.factory.BeanFactory"></bean>
    <bean id="userService" factory-bean="beanFactory" factory-method="getUserService"></bean>
    -->
    
    <!--第三种：使用普通工厂中的静态方式创建（使用某个类中的静态方法，并存入spring容器）-->
    <bean id="userService" class="com.cx.ssm.factory.BeanFactory" factory-method="getUserService1"></bean>
    

    <bean id="userDao" class="com.cx.ssm.dao.impl.UserDaoImpl"></bean>

</beans>
~~~

## 	2.2、bean的作用范围

​		singleton：单例（默认值），加载配置文件的时候就会加载实例对象。

​		prototype：多例，加载配置文件时不会创建实例对象，调用的时候才加载。

​		request：作用于web应用下的request请求范围

​		session：作用于web应用下的会话范围

​		global-session：集群范围的全局会话，当不是集群环境时，就是session	

## 	2.3、bean对象的声明周期

- 通过构造器创建对象实例
- 对属性赋值（setter方法）
- 将对象传递给后置处理器的postProcessBeforeInitialization（必须实现BeanPostProcessor接口）
- 调用初始化方法
- j将对象传递给后置处理器的postProcessAfterInitialization
- 得到bean实例
- 调用销毁方法

​		单例对象：

​				容器创建时出生，容器销毁，对象消亡，单例的声明周期与容器相同。

​		多例对象：

​				当我们使用对象时，spring帮我们创建，当对象长期不用，由java的垃圾回收机制回收，从而死亡。

## 	2.4、依赖注入

​			能注入的三种类型：基本类型和String、其他bean、复杂类型/集合类型

​			注入的三种方式：构造函数、set方法、使用注解提供

~~~xml
	<!--1、构造函数注入 一般不用 -->
    <bean id="dITest" class="com.cx.ssm.di.DITest">
        <constructor-arg name="name" value="赫本"/>
        <constructor-arg name="age" value="18"/>
        <constructor-arg name="birth" ref="now"/>
    </bean>
    <bean id="now" class="java.util.Date"></bean>

    <!--set方法注入 必须有默认构造函数，不能提供有参构造-->
    <bean id="diTest2" class="com.cx.ssm.di.DITest2">
        <property name="name" value="2"></property>
        <property name="age" value="20"></property>
        <property name="birth" ref="now"></property>
    </bean>
~~~

## 2.5、引入外部文件

~~~properties
prop.driverName=com.mysql.jdbc.Driver
prop.url=jdbc:mysql://localhost:3306/ssm
prop.username=root
prop.password=123456
~~~

~~~xml
xmlns:context="http://www.springframework.org/schema/context"
http://www.springframework.org/schema/context
http://www.springframework.org/schema/context/spring-context.xsd

<context:property-placeholder location="classpath:jdbc.properties"/>

<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="${prop.driverName}"></property>
    <property name="url" value="${prop.url}"></property>
    <property name="username" value="${prop.username}"></property>
    <property name="password" value="${prop.password}"></property>
</bean>
~~~



## 2.6、基于注解的IOC

简化xml配置。

### 1、创建对象的注解

​	Component：区分不出哪层时使用

​	Service：业务实现层

​	Repository：dao实现层

​	Controller：控制层

### 2、**注入属性**的注解

​	Value("${xxxx}")：注入普通类型数据

​	Autowired：根据属性类型注入

​	Qualifier：根据属性名称注入，和Autowired配合使用。

​	Resource：可以根据类型，也可以根据名称。Resource(name="xxx")	,没有name=“xxx”时根据类型注入，有name时根据名称注入。（Resource是javax扩展包中的类，不是spring的）

创建对象：引入aop依赖；开启组件扫描（扫描创建对象的注解）；

~~~xml
<!--开启组件扫描-->
<context:component-scan base-package="com.sgg"></context:component-scan>
~~~

~~~java
//value可以省略不写，不写则默认是类型首字母小写
@Component(value = "user")
public class User {
    
    @Value(value="abc")
    private  String uName;
    
    @Value(value="${prop.password}")
    private  String password;
    
    @Autowired
    @Qualifier(value="pet1")
    private Pet pet;
}
~~~



用于改变作用范围的注解：

和声明周期有关的注解：

### 3、spring的新注解

纯注解开发

​	Configuration：指定当前类是一个配置类

​	ComponentScan：指定spring在创建容器时要扫描的包

~~~xml
<context:component-scan base-package="com.cx.ssm"></context:component-scan>
上面的配置可用下面的注解代替
@ComponentScan(basePackages = {"com.cx.ssm"})//大括号内是数组，只有一个时括号可省略
~~~

​	Bean：把当前方法的返回值作为bean对象放入spring容器中

​			属性：name：指定bean的id，默认当前方法的名称

​			细节：使用这种注解配置方法时，如果方法有参数，spring框架会去容器中查找有没有可用的bean对象，查找的方法和Autowired一样，先按类型，再按名称。

​	Import：用于导入其他的配置类 ==》Import(XXX.class,Xx.class)，导入的配置类不需要添加Configuration注解

​	PropertySource：指定properties配置文件的位置

~~~java
@Configuration
@ComponentScan(basePackages = {"com.cx.ssm"})
public class SpringConfiguration {

    @Bean(name = "runner")
    public QueryRunner createQueryRunner(DataSource dataSource){
        return new QueryRunner(dataSource);
    }

    @Bean(name = "dataSource")
    public ComboPooledDataSource createDataSource(){
        ComboPooledDataSource ds = new ComboPooledDataSource();
        try {
            ds.setDriverClass("com.mysql.jdbc.Driver");
            ds.setJdbcUrl("jdbc:mysql://localhost:3306/ssm");
            ds.setUser("root");
            ds.setPassword("123456");
            return ds;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
~~~

# 4、spring整合junit

​	1、应用程序的入口：main方法

​	2、junit单元测试中，没有main方法也能执行

​				junit集成了一个main方法，该方法会判断当前测试类中哪些方法被@Test标注，然后执行被注解的方法

​	3、junit不会管我们是否采用了spring框架，所以也不会读取配置文件，不会创建IOC容器，即使使用	          				@Autowired注解，也不会解析。

~~~java
**
 * @author ChenXiao
 * @date 2020/1/1 - 14:58
 * spring和junit整合
 *  1、导入依赖
 *  2、使用junit提供的注解将原来的main方法替换掉，替换成spring提供的：  		      	@RunWith(SpringJUnit4ClassRunner.class)
 *  3、告知spring运行器，spring和IOC容器是基于注解还是xml，并告知位置
 *          location:xml的位置              @ContextConfiguration(locations = 		   											"classpath:bean.xml")
 *          classes:指定注解类所在的位置      @ContextConfiguration(classes = 		    												SpringConfiguration.class)
 *  当使用spring5.x版本，junit必须使用4.12以上的版本
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = SpringConfiguration.class)
public class UserTest {

    @Autowired
    private UserService userService;
}
~~~



# 5、spring   AOP

面向切面编程，在不修改源代码的基础上，对功能进项增强。同时对业务逻辑的各个部分进行隔离，从而降低他们之间的耦合，提高代码的可重用性。

## 5.1、底层原理

有接口时，使用JDK动态代理；创建接口实现类代理对象，增强类的方法

没接口时，使用CGLIB动态代理；创建当前类子类的代理对象。

### 1、JDK动态代理

~~~text
使用Proxy类的该方法
static Object newProxyInstance(ClassLoader loader, 类<?>[] interfaces, InvocationHandler h) 
返回指定接口的代理类的实例，该接口将方法调用分派给指定的调用处理程序。 
第一个参数：类加载器
第二个参数：增强方法所在的类，这个类实现的接口，支持多个接口
第三个参数：实现这个接口InvacationHandler，创建代理对象，写增强的部分。
~~~



2、CGLIB动态代理

## 5.2、AOP术语

- 连接点：可以被增强的方法
- 切入点：实际被增强的方法
- 通知(增强)：实际增加的逻辑。比兔日志记录、权限校验
  - 前置通知    Before
  - 后置通知    AfterReturning
  - 环绕通知    Around
  - 异常通知    AfterThrowing
  - 最终通知    After
- 切面：把通知应用到切入点的过程（是一个动作）



spring框架一般使用AspectJ实现AOP操作，AspectJ不是spring的组成部分，是一个独立的AOP框架。

基于AspectJ实现AOP

基于注解方式：

- cglib、aopalliance、aspecj-weaver、aspects四个jar包

切入点表达式：execution([权限修饰符] [返回值] [全限定类名] [方法名称] [参数])

1、开启注解扫描

2、创建被增强类和增强类的实例

3、在增强类上添加Aspect注解

4、在spring配置文件中开启生成代理对象

5、配置不同类型的通知

~~~java
@Component
public class ReadBook {
    public void add(){
        int i = 1/0;
        System.out.println("add.....");
    }
}
~~~

~~~java
@Component
@Aspect
public class ReadProxy {

    @Before(value = "execution(* com.sgg.aop.ReadBook.add(..))")
    public void before(){
        System.out.println("before...前置通知");
    }

    @After(value = "execution(* com.sgg.aop.ReadBook.add(..))")
    public void after(){
        System.out.println("after...最终通知");
    }

    @AfterReturning(value = "execution(* com.sgg.aop.ReadBook.add(..))")
    public void afterReturning(){
        System.out.println("afterReturning...后置通知");
    }

    @AfterThrowing(value = "execution(* com.sgg.aop.ReadBook.add(..))")
    public void afterThrowing(){
        System.out.println("afterThrowing...异常通知");
    }

    @Around(value = "execution(* com.sgg.aop.ReadBook.add(..))")
    public void around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("around...环绕通知");
        proceedingJoinPoint.proceed();
        System.out.println("around...环绕通知");
    }
}
~~~

~~~xml
<!--开启注解扫描-->
<context:component-scan base-package="com.sgg.aop"></context:component-scan>

<!--开启生成代理对象-->
<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
~~~

提取公共切入点表达式：

~~~java
@Pointcut(value = "execution(* com.sgg.aop.ReadBook.add(..))")
public void pointCut(){}

@Before(value = "pointCut()")
public void before(){
    System.out.println("before...前置通知");
}
~~~

可以设置增强的优先级，在增强类上加 @Order(数字)注解，数字越小，优先级越高。

纯注解方式：

~~~java
//代替xml中的配置
@Configuration
@ComponentScan(basePackages = {"com.sgg.aop"})
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class Config
{
}
~~~



# 6、JdbcTemplate

mysql-connection、jdbc、orm、tx四个jar包

~~~xml
<!--开启组件扫描-->
<context:component-scan base-package="com.sgg"></context:component-scan>

<context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>

<!--数据库连接池-->
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="${prop.driverName}"></property>
    <property name="url" value="${prop.url}"></property>
    <property name="username" value="${prop.username}"></property>
    <property name="password" value="${prop.password}"></property>
</bean>

<!--jdbcTemplate对象,注入dataSource-->
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="dataSource" ref="dataSource"></property>
</bean>
~~~

~~~java
@Repository
public class UserDaoImpl implements UserDao{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void add(HashMap<String, Object> map) {
        String sql = "insert into user values(?,?,?,?,?,?)";
        Object[] args = {map.get("id"),map.get("name"),map.get("password"),map.get("gender"),map.get("birth"),map.get("address")};
        int update = jdbcTemplate.update(sql,args);
        System.out.println(update);
    }

    @Override
    public Map<String, Object> selOne(int id) {

        String sql = "select * from user where id = ?";

        Map<String, Object> map = jdbcTemplate.queryForObject(sql,new BeanPropertyRowMapper<>(HashMap.class),id);
        System.out.println(map);
        return map;
    }
}
~~~

# 7、事务管理

## 7.1、事务管理机制

spring事务管理主要包括三个接口，spring的事务主要由他们完成。

- platformTransactionManager：事务管理器 -- 主要用于平台相关事务的管理
- TransactionDefinition：事务定义信息（隔离、传播、超时、只读）--  通过配置如何进行事务管理
- TransactionStatus：事务具体运行状态 -- 事务管理过程中，每个时间点事务的状态信息

### 1、platformTransactionManager

platformTransactionManager：提供三个方法（commit、rollbak、getTransaction）。

spring为不同的持久化框架提供了不同PlatformTransactionManager接口实现，比如使用spring JDBC和mybatis时使用DataSourceTransactionManager；使用JPA时使用JpaTransactionManager。

DataSourceTransactionManager针对JdbcTemplate、mybatis事务控制，使用Connection进行事务控制，

开启事务：connection.setAutoCommit(false)

提交事务：connection.commit()

回滚事务：connecion.rollback()

### 2、TransactionDefinition

四种隔离级别

| 隔离级别        | 含义                                                         |
| --------------- | ------------------------------------------------------------ |
| Default         | 使用后端数据库默认的隔离级别                                 |
| read_uncommited | 允许读取还未提交的改变了的数据，可能导致脏、幻读，不可重复读 |
| read_commited   | 允许在并发事务已经提交后读取，可防止脏读，但幻读和不可重复读仍可能发生 |
| repeatable      | 对相同字段的的多次读取是一致的，除非数据被事务本身改变，幻读可能发生 |
| serializable    | 完全服从ACID的隔离级别，确保不发生脏、幻读和不可重复读，在所有隔离级别中最慢的，通过完全锁定在事务中涉及的数据来完成的 |

脏读：一个事务读取了另一个事务改写但还未提交的数据，如果这些数据被回滚，则读到的数据是无效的。

不可重复读：在同一事务中，多次读取同一数据返回的结果有所不同，后续读取可以读到另一事务已提交的数据。

幻读：一个事务读取了几行数据之后，另一个事务插入了几条数据，幻读就发生了，在后续的查询中，第一个事务就会发现有些原来没有的数据。

不同厂商默认的隔离级别会不一致,mysql默认repeatable，oracle默认read_commited

### 3、TransactionStatus



### 4、spring事务管理两种方式

- 编程式事务：

   通过TransactionTemplate手动管理事务，在实际中很少使用，原因是要修改原来的代码，加入事务管理代码（侵入性）

- 声明式事务（使用xml或注解配置）

  spring的声明式事务通过AOP实现（环绕通知），开发中推荐使用。

xml方式：

~~~xml
<!--开启组件扫描-->
<context:component-scan base-package="com.sgg.transaction"></context:component-scan>

<context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>

<!--数据库连接池-->
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${prop.driverName}"></property>
    <property name="jdbcUrl" value="${prop.url}"></property>
    <property name="user" value="${prop.username}"></property>
    <property name="password" value="${prop.password}"></property>
</bean>

<bean id="accountDao" class="com.sgg.transaction.dao.AccountImpl">
    <property name="dataSource" ref="dataSource"></property>
</bean>

<!--配置事务管理器-->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"></property>
</bean>

<!--配置事务通知-->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <!--配置事务的管理策略-->
    <tx:attributes>
        <!--需要被增强的方法-->
        <tx:method name="transfer"/>
    </tx:attributes>
</tx:advice>

<!--配置切入点和切面-->
<aop:config>
    <aop:pointcut id="mycut" expression="bean (*Service)"/><!--切入点-->
    <aop:advisor advice-ref="txAdvice" pointcut-ref="mycut"></aop:advisor><!--切面-->
</aop:config>
~~~

~~~java
@Service
public class AccountService {

    @Autowired
    private AccountDao accountDao;

    //转账
    public void transfer(String outName,String inName,Double money){

        accountDao.out(outName,money);
        int i =1/0;
        accountDao.in(inName,money);
    }
}
~~~

~~~java
public class AccountImpl extends JdbcDaoSupport implements AccountDao {
    @Override
    public void out(String outName, Double money) {
        String sql = "update account set money = money - ? where name = ?";
        super.getJdbcTemplate().update(sql,money,outName);
    }

    @Override
    public void in(String inName, Double money) {
        String sql = "update account set money = money + ? where name = ?";
        super.getJdbcTemplate().update(sql,money,inName);
    }
}
~~~

注解方式：

~~~xml
<!--开启组件扫描-->
<context:component-scan base-package="com.sgg.transaction"></context:component-scan>

<context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>

<!--数据库连接池-->
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${prop.driverName}"></property>
    <property name="jdbcUrl" value="${prop.url}"></property>
    <property name="user" value="${prop.username}"></property>
    <property name="password" value="${prop.password}"></property>
</bean>

<!--配置事务管理器-->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"></property>
</bean>

<!--开启事务管理注解驱动-->
<tx:annotation-driven transaction-manager="transactionManager"></tx:annotation-driven>
~~~

~~~java
@Repository("accountDao")
public class AccountImpl extends JdbcDaoSupport implements AccountDao {

    @Autowired
    public void setSuperDataSource(DataSource dataSource){
        super.setDataSource(dataSource);
    }

    @Override
    public void out(String outName, Double money) {
        String sql = "update account set money = money - ? where name = ?";
        super.getJdbcTemplate().update(sql,money,outName);
    }

    @Override
    public void in(String inName, Double money) {
        String sql = "update account set money = money + ? where name = ?";
        super.getJdbcTemplate().update(sql,money,inName);
    }
}
~~~

~~~java
@Service
public class AccountService {

    @Autowired
    private AccountDao accountDao;

    //转账
    @Transactional
    public void transfer(String outName,String inName,Double money){

        accountDao.out(outName,money);
        int i =1/0;
        accountDao.in(inName,money);
    }
}
~~~

# 八、面试题

1）、service层事务与try/catch的关系，service层能不能用try-catch

~~~txt
1、RuntimeException()  例如：数组越界异常、空指针异常、(我们在编写之后不会提示让 try catch的异常、代码编写错误导致，可避免)
2、非RuntimeException() 例如： IO异常、(会提示try catch的异常，不是代码编写错误导致的，只能抛出)
3、unchecked异常：RuntimeException + Error
4、checked异常：非RuntimeException()

详细文章：http://blog.csdn.net/qq_14982047/article/details/50989761
spring通过异常进行事务回滚的机制：
1、spring 的默认事务机制，当出现unchecked异常时候回滚，checked异常的时候不会回滚；
2、我们有时为了打印日志，会在service层抓住Exception并打印日志，这时我们的所有异常都会被认为成checked异常。
3、为了事务的正常生效：当有try catch后捕获了异常，事务不会回滚，如果不得不在service层写try catch 需要catch后 throw new RuntimeException 让事务回滚
~~~







