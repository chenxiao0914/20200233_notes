# 一、基础操作

## 1、crud

不使用mapper接口时，namespace的值与session.selectOne("kkk.selOne", 2)中的kkk保持一致即可。使用mapper接口时，namespace必须是代理接口的全限定类型（namespace="com.cx.mapper.UserMapper"），因为此处此时会生成代理对象。

mybatis配置文件

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
	<settings>
		<!-- 缓存默认已开启 -->
		<setting name="cacheEnabled" value="true"/>
		<setting name="logImpl" value="log4j"/>
	</settings>
	<environments default="mysql">
		<environment id="mysql">
			<transactionManager type="JDBC"></transactionManager>
			<dataSource type="POOLED">
				<property name="driver" value="com.mysql.jdbc.Driver"/>
		        <property name="url" value="jdbc:mysql://localhost:3306/ssm"/>
		        <property name="username" value="root"/>
		        <property name="password" value="123456"/>
			</dataSource>
		</environment>
	</environments>
	<mappers>
		<mapper resource="UserMapper.xml"/>
	</mappers>
</configuration>
~~~

对应的mapper.xml

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="kkk">
	<cache/>
  	<select id="selAll" parameterType="int" resultType="HashMap" useCache="false">
    	select * from User
  	</select>
  	
  	<select id="selOne" parameterType="int" resultType="HashMap">
    	select * from User where id = #{id}
  	</select>
</mapper>
~~~

pom依赖

~~~xml
<!-- mybatis核心jar包 -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.1</version>
</dependency>
<!-- 数据库连接包 -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.6</version>
</dependency>
~~~

测试代码

~~~java
public class App {
	public static void main(String[] args) throws IOException {
		InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
		SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(is);
		SqlSession session = factory.openSession();
		Object one = session.selectOne("kkk.selOne", 2);
		System.out.println(one);
	}
}
~~~



## 2、日志框架

## 3、Sqlsession 执行流程

# 二、基础拓展

## 1、typeAlias

类型别名是为java类型命名一个短的名字，用来减少完全限定类型的多余部分。大小写不敏感。

~~~xml
<typeAliases>
  <typeAlias alias="Author" type="domain.blog.Author"/>
  <typeAlias alias="Blog" type="domain.blog.Blog"/>
</typeAliases>
<!-- 或者使用包名 -->
<typeAliases>
  <package name="domain.blog"/>
</typeAliases>
~~~



## 2、properties

​	配置外部化的，可替代的属性。使用${key}取值

~~~xml
<properties resource="jdbc.properties"/>

<dataSource type="POOLED">
    <property name="driver" value="${jdbc.driver}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</dataSource>
~~~

jdbc.properties

~~~properties
jdbc.driver = com.mysql.jdbc.Driver
jdbc.url = jdbc:mysql://localhost:3306/ssm
jdbc.username = root
jdbc.password = 123456
~~~



## 3、resultMap

## 4、Mapper接口

此时mapper.xml文件de namespace的值必须是接口的全限定类名，此处底层使用的是动态代理技术。

~~~java
	@Test  //使用mapper接口方式
	public void testMapper() throws Exception {
		InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
		SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(is);
		SqlSession session = factory.openSession();
		UserMapper userMapper = session.getMapper(UserMapper.class);
		List<HashMap<String, Object>> list = userMapper.selAll();
		for (HashMap<String, Object> hashMap : list) {
			System.out.println(hashMap);
		}
	}
~~~



## 5、参数处理

## 6、#和$

# 三、注解开发

# 四、动态SQL

## 1、if

## 2、choose

## 3、trim

## 4、foreach

## 5、其他

# 五、对象关系设计和映射

# 六、缓存机制

缓存：可以使应用更快的获取数据，避免和数据库做频繁的交互，尤其是在查询比较频繁的时候，当缓存的命中率越高，缓存的优势越明显。mybatis中实现缓存，只需实现Cache接口，mybatis自带由该接口。

命中率：

最大对象数量：

最大空闲时间：

原理：map

去数据库查询：

​	A:吧查询到的数据放进缓存中，共下次使用

​	B:返回数据

## 一级缓存

Sqlsession级别，也称本地缓存，默认开启，不能关闭。性能提升一般。

好比在Sqlsession对象中存在一个map，用来缓存查询出来的对象。

可以使用 sqlsession.clearcache()来清除一级缓存。

性能提升一般：每一次操作都是用新的sqlsession对象，sqlsession之间不能共享。

## 二级缓存

mapper级别，也称查询缓存，作用域是mapper文件的同一个namespace，不同的Sqlsession对象可以共享数据。需要手动开启和配置。也可以使用第三方的缓存技术，比如：Ehcache、redis。

启用二级缓存：

1、在mybatis配置文件中启用二级缓存

~~~xml
<settings>
    <!-- 缓存默认已开启 -->
    <setting name="cacheEnabled" value="true"/>
    <setting name="logImpl" value="log4j"/>
</settings>
~~~

2、在mapper文件中，使用cache元素和namespace绑定

~~~xml
<mapper namespace="com.cx.mapper.UserMapper">
    <!-- 将cache与namespace绑定，开启二级缓存 -->
	<cache/>
  	<select id="selOne" parameterType="int" resultType="HashMap">
    	select * from User where id = #{id}
  	</select>
</mapper>
~~~

3、把放入二级缓存的对象实现序列化接口（缓存中放满的话，需要存储到硬盘中，必须实现序列化）

二级缓存细节：对于多条数据查询，不建议设置缓存，只有单条记录查询建议设置。

默认情况下，增删改操作会刷新缓存。

~~~xml
<!-- 用userCache来设置是否缓存 -->
<select id="selAll"  resultType="HashMap" useCache="false">
    select * from User
</select>
~~~



# 七、mybatis执行流程



