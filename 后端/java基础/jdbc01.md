加载注册驱动 --> 获取连接 --> 预编译处理SQL --> 返回resultSet结果



jdbc是sun公司提供的一套诡诞，接口，可实现对不同数据库的操作

# 一、获取连接

~~~java
	/**
	 * 方式一：有第三方api new com.mysql.jdbc.Driver();
	 * 之后一直迭代
	 * @throws SQLException
	 */
	@Test
	public void connection01() throws SQLException {
		Driver driver = new com.mysql.jdbc.Driver();
		//url:http://localhost:3306/jdbc	jdbc:mysql	-->	就是协议
		String url = "jdbc:mysql://localhost:3306/jdbc";
		//用户名、密码封装在properties中
		Properties info = new Properties();
		info.setProperty("user", "root");
		info.setProperty("password", "123456");
		Connection connect = driver.connect(url , info);
		System.out.println(connect);
	}
~~~

~~~java
	/**
	 *	 方式二：利用反射，在代码中去除第三方api，但是依然要导包
	 * @throws Exception
	 */
	@Test
	public void connection02() throws Exception{
		Class<?> clazz = Class.forName("com.mysql.jdbc.Driver");
		Driver driver = (Driver) clazz.newInstance();
		String url = "jdbc:mysql://localhost:3306/jdbc";
		Properties info = new Properties();
		info.setProperty("user", "root");
		info.setProperty("password", "123456");
		Connection connect = driver.connect(url , info);
		System.out.println(connect);
	}
~~~



~~~java
	/**
	 * 方式三：使用DriverManager替换Driver
	 * @throws Exception 
	 */
	@Test
	public void connection03() throws Exception {
		//1、提供另外三个的基本信息
		String url = "jdbc:mysql://localhost:3306/jdbc";
		String user = "root";
		String password = "123456";
		//2、加载Driver
		Class clazz = Class.forName("com.mysql.jdbc.Driver");
		Driver driver = (Driver) clazz.newInstance();
		DriverManager.registerDriver(driver);
		//3、获取连接
		Connection connection = DriverManager.getConnection(url, user, password);
		System.out.println(connection);
	}
~~~



~~~java
	/**
	 * 方式四：省略注册，Driver静态代码块中自动注册了
	 * static {
			try {
				java.sql.DriverManager.registerDriver(new Driver());
			} catch (SQLException E) {
				throw new RuntimeException("Can't register driver!");
			}
		}
	 * @throws Exception 
	 */
	@Test
	public void connection04() throws Exception {
		//1、提供另外三个的基本信息
		String url = "jdbc:mysql://localhost:3306/jdbc";
		String user = "root";
		String password = "123456";
		//2、加载Driver
		Class.forName("com.mysql.jdbc.Driver");
//		Driver driver = (Driver) clazz.newInstance();
//		DriverManager.registerDriver(driver);
		//3、获取连接
		Connection connection = DriverManager.getConnection(url, user, password);
		System.out.println(connection);
	}
~~~



~~~java
	/**
	 * 方式五：最终版，将获取连接的四个基本信息提取到配置文件
	 *	T是该方法所在的类
	 * @throws Exception
	 */
	@Test
	public void connection05() throws Exception {
		//读取配置文件	T.class.getClassLoader()（自定义的类）是系统类加载器
		InputStream is =  		      T.class.getClassLoader().getResourceAsStream("jdbc.properties");
		Properties properties = new Properties();
		properties.load(is);
		//1、提供另外四个的基本信息
		String url = properties.getProperty("jdbc.url");
		String user = properties.getProperty("jdbc.user");
		String password = properties.getProperty("jdbc.password");
		String driver = properties.getProperty("jdbc.driver");
		//2、加载驱动
		Class.forName(driver);
		//3、获取连接
		Connection connection = DriverManager.getConnection(url, user, password);
		System.out.println(connection);
	}
~~~

# 二、使用**PreparedStatement**实现CRUD操作

## 2.1操作和访问数据库

- 数据库连接被用于向数据库服务器发送命令和SQL语句，并接受数据库服务器的结果，，其实一个数据库连接就是一个socket连接
- 在java.sql包中定义了三个接口分别定义了对数据库的调用的不同方式
  - Statement：用于执行静态SQL语句并返回它所生成的结果
  - PreparedStatement： SQL语句被预编译并存储在此对象中，可以使用此对象多次高效的执行该语句
  - CallableStatement：用于执行SQL

Statement存在的弊端：SQL需要动态拼接，并且存在SQL注入问题

解决方案：使用PreparedStatement替换Statement

~~~java
public Connection getCon() throws Exception {
		InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("jdbc.properties");
		Properties pro = new Properties();
		pro.load(is);
		String driver = pro.getProperty("jdbc.driver");
		String url = pro.getProperty("jdbc.url");
		String user = pro.getProperty("jdbc.user");
		String password = pro.getProperty("jdbc.password");
		Class.forName(driver);
		Connection connection = DriverManager.getConnection(url, user, password);
		return connection;
	}
~~~



~~~java
	/**
	 * 	增加数据
	 * @throws Exception
	 */
	@Test
	public void pst01() throws Exception {
		Connection con = getCon();
		PreparedStatement pst = null;
		try{
			//预编译SQL语句
			String sql = "insert into user (name,password) values (?,?)";
			pst = con.prepareStatement(sql);
			//填充占位符
			pst.setString(1, "德鲁伊4");
			pst.setString(2, "森林4");
			pst.execute();
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			pst.close();
			con.close();
		}
	}
~~~



~~~java
	/**
	 * 	通用增删改操作
	 * @param sql
	 * @param args
	 */
	public void update(String sql,Object ...args){
		Connection con = null;
		PreparedStatement pst = null;
		try {
			con = getCon();
			pst = con.prepareStatement(sql);
			for (int i = 0; i < args.length; i++) {
				pst.setObject(i+1, args[i]);
			}
			pst.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			try {
				pst.close();
				con.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
~~~



# 三、批量数据操作

使用MySQL的Batch批量处理,驱动jar包版本需要5.1.13或以上。 

Mysql需要添加rewriteBatchedStatements=true的参数，才可以使用批量处理，否则还是使用逐条处理的方式。 这个选项对 INSERT/UPDATE/DELETE 都有效，只不过对INSERT它会预先重排一下SQL语句。 

## 3.1 普通批量

~~~java
	/**
	 * 使用 PreparedStatement 批量插入===>一条一条插入
	 * @throws Exception 
	 */
	@Test
	public void insAll1(){
		Connection con = null;
		PreparedStatement pst= null;
		try {
			long t1 = System.currentTimeMillis();
			con = JdbcUtil.getCon();
			String sql = "insert into tb_customer (name) values (?)";
			pst= con.prepareStatement(sql);
			for (int i = 0; i < 5000; i++) {
				pst.setObject(1, "name"+i);
				pst.execute();
			}
			
			long t2 = System.currentTimeMillis();
			System.out.println("消耗时间："+(t2-t1));//消耗时间：5249
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			JdbcUtil.closeRes(con, pst, null);
		}
	}
~~~

## 3.2 mysql批量

**jdbc.url = jdbc:mysql://localhost:3306/jdbc?rewriteBatchedStatements=true**

~~~java
	/**
	 * 用mysql的批量操作==》 addBatch、executeBatch、closebatch
	 */
	@Test
	public void insAll2(){
		Connection con = null;
		PreparedStatement pst= null;
		try {
			long t1 = System.currentTimeMillis();
			con = JdbcUtil.getCon();
			String sql = "insert into tb_customer (name) values (?)";
			pst= con.prepareStatement(sql);
			for (int i = 0; i < 5001; i++) {
				pst.setObject(1, "name"+i);
				pst.addBatch();
				if(i%5000 == 0) {
					pst.executeBatch();
					pst.clearBatch();
				}
			}
			long t2 = System.currentTimeMillis();
			System.out.println("消耗时间："+(t2-t1));//消耗时间：5249	==>   消耗时间：395
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			JdbcUtil.closeRes(con, pst, null);
		}
	}
~~~

## 3.3 mysql批量+事务控制

```JAVA
	/**
	 * 用mysql的批量操作==》 addBatch、executeBatch、closebatch
	 * 设置事务不自动提交
	 */
	@Test
	public void insAll3(){
		Connection con = null;
		PreparedStatement pst= null;
		try {
			long t1 = System.currentTimeMillis();
			con = JdbcUtil.getCon();
			//设置不允许自动提交事务
			con.setAutoCommit(false);
			String sql = "insert into tb_customer (name) values (?)";
			pst= con.prepareStatement(sql);
			for (int i = 0; i < 5001; i++) {
				pst.setObject(1, "name"+i);
				pst.addBatch();
				if(i%5000 == 0) {
					pst.executeBatch();
					pst.clearBatch();
				}
			}
			con.commit();
			long t2 = System.currentTimeMillis();
			System.out.println("消耗时间："+(t2-t1));//消耗时间：5249	==>   消耗时间：395
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			JdbcUtil.closeRes(con, pst, null);
		}
	}
```



# 四、数据库事务

## 4.1 数据库事务介绍

- 事务：一组逻辑（一个或多个DDL操作）操作单元，使数据从一种状态转换到另一种状态。
- 事务处理：保证所有事物都作为一个单元来执行，即使出现了故障，都不能改变这种执行方式。当在一个十五中执行多个操作时，要么所有的操作都成功，要么所有的操作都失败，对已经执行的草案做进行事务回滚，rollback到最初状态。需保证数据的一

## 4.2  JDBC事务提交

数据一旦提交，事务就不可以回滚。事务回滚，会回滚到上一次commit之后的状态。

会自动提交的操作：

​	DDL：操作一旦执行，都会自动提交。设置 autocommit 为false对DDL无效

​	DML：默认情况下，一旦执行也会自动提交。但是可以设置 autocommit 为false，即可取消自动提交

​	默认在关闭连接时，也会自动提交事务

~~~java
/**
* 添加事务控制的通用增删改操作
* @param sql
* @param args
*/
public void update2(Connection con,String sql,Object ...args){
    PreparedStatement pst = null;
    try {
        pst = con.prepareStatement(sql);
        for (int i = 0; i < args.length; i++) {
            pst.setObject(i+1, args[i]);
        }
        pst.execute();
    } catch (Exception e) {
        e.printStackTrace();
    }finally {
        JdbcUtil.closeRes(null, pst, null);
    }
}

/**
 * 未添加事务控制
 */
@Test
public void updateT1() {
    String sql1 = "update tb_customer set salary = salary-10  where name = ?";
    update(sql1, "aa");
    String sql2 = "update tb_customer set salary = salary+10  where name = ?";
    update(sql2, "bb");
}

/**
 * 添加事务控制
 */
@Test
public void updateT2() {
    Connection con = null;
    try {
        con = JdbcUtil.getCon();
        //取消事务的自动提交
        con.setAutoCommit(false);
        String sql1 = "update tb_customer set salary = salary-10  where name = ?";
        update2(con,sql1, "aa");

        //模拟网络异常
        //System.out.println(10/0);

        String sql2 = "update tb_customer set salary = salary+10  where name = ?";
        update2(con,sql2, "bb");
        //提交事务
        con.commit();
    } catch (Exception e) {
        e.printStackTrace();
        try {
            //回滚数据
            con.rollback();
        } catch (SQLException e1) {
            e1.printStackTrace();
        }
    }finally {
        //修改其为自动提交，主要针志勇数据库连接池的使用
        try {
            con.setAutoCommit(true);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        JdbcUtil.closeRes(con, null, null);
    }

}
~~~

## 4.3 事务的ACID属性

1. 原子性（atomicity）

   原子性是指事务是一个不可分割的工作单位，事务中的操作要么都成功，要么都失败。

2. 一致性（consistency）

   事务必须使数据库从一个一致性状态到另一个一致性状态。

3. 隔离性（isolation）

   事物的隔离性是指一个事务的执行不能被其他事务干扰，即一个事务内部的操作及使用的数据对并发的其他事务是隔离的，并发执行的事物之间不能相互干扰。

4. 持久性（durability）

   持久性是指一个事务一旦被提交，他对数据库中数据的改变是永久的，接下来的其他操作和数据库故障不应该对其有任何影

### 4.3.1 数据库的并发问题

- 对于同时运行的多个事务，当这些事务访问数据库的相同数据时，如果没有采取隔离机制，就会出现各种并发问题
  - **脏读**：对于两个事务T1、T2，T1读取了已经被T2更新但没有被提交的数据，之后，若T2回滚，T1读到的内容就是临时且无效的。
  - **不可重复读**：对于两个事务T1、T2，T1读取了一个字段，然后T2更新了该字段，之后，T1再次读取该字段，值就不同了。
  - **幻读**：对于两个事务T1、T2，T1从一个表中读取了一个字段，然后T2在该表中插入了一些新的行，之后，如果T1再次读取同一个表，就回多出几行。
- 数据库事务的隔离性：数据库系统必须是具有隔离并发运行个个失误的能力，使他们不会相互影响，避免各种并发问题。
- 一个事物与其他事务隔离的成都称为隔离级别，数据库规定了多种事务隔离级别，不同隔离级别对应不听的干扰程度，**隔离级别越高，数据的一致性越好，但并发性越弱**

### 4.3.2 四种隔离级别

- 数据库中的4中隔离级别：read uncommitted、read commited、repeatable read、serializable
-  Oracle支持的2种事务隔离级别：read commited（默认）、serializable。
- Mysql支持4种隔离级别：默认 repeatable read



### 4.3.4 在Mysql中设置隔离级别

- 每启动一个mysql程序，就回获得一个单独的数据库连接，每个数据库连接都有一个全局变量，@@tx_isolation,表示当前的隔离级别

- 数据库隔离级别设置

  ~~~mysql
  #查看当前的隔离级别
  select @@tx_isolation
  #设置当前ysql连接的隔离级别
  set transaction isolation level read committed
  #设置数据库系统的全局隔离级别
  set global transaction isolation level read committed
  ~~~

- 补充操作

  ~~~mysql
  #创建mysql数据库用户
  create user tom identified by '123456'
  #给tom授予jdbc这个库下的所有表的增删改查的权限
  grant select,insert,delete,update on jdbc.* to tom@localhost identified by '123456'
  
  show database
  use jdbc
  set autocommit = false
  
  ~~~


# 五、数据库连接池

## 5.1 jdbc数据库连接池的必要性

- 在使用开发基于数据库的web程序时，传统的模式步骤：
  - 再主程序这种建立数据库连接
  - 进行sql操作
  - 端来与数据库的连接
- 这种模式的问题：
  - 普通JDBC数据库连接使用DriverManager来获取，每次向南数据库建立连接的时候都要将Connection加载带内存中，在验证用户名和密码（得花费0.05 ~ 1s的时间）。这样的方式会消耗大量的资源和时间。数据库的连接资源并没有得到很好地重复利用，若同时有大量用户频繁的进行数据库连接的操作将占用很多的系统资源，严重时会造成服务器崩溃。
  - 对于每一次连接，使用完都要断开，否则，如果程序出现异常而未能关闭，将会导致数据库系统的内存泄漏，最终将导致数据库重启。
  - 这种技术不能控制被创建的连接对象的数量，系统资源会被毫无顾虑的分配出去，如果连接过多，也会导致内存泄漏，服务器崩溃。

## 5.2 数据库连接池技术

- jdbc的数据库连接池使用javax.sql.DataSource来表示，DataSource只是一个接口，该接口通常由服务器（weblogic、websphere、tomcat）提供实现，也有一些开源组织实现：
  - **DBCP**：Apache提供的数据库连接池，tomcat自带dbcp数据库连接池，但自身存在bug，Hibernate3已经不再提供支持
  - **C3P0**：一个开源组织提供，Hibernate官方推荐，速度慢，稳定性可以
  - **Druid**：阿里提供的数据库连接池，据说是集DBCP、C3P0、Proxool优点于一身
- DataSource 通常被称为数据源，它包含连接池和连接池管理两个部分，习惯上也称它成为连接池
- DataSource用来取代DriverManager来获取Connection，获取速度快，同时可以大幅度提高数据库访问速度





# 六、注意

 存储过程 ：

**1. JDBC是如何实现Java程序和JDBC驱动的松耦合的？**

**ans：** JDBC API使用Java的反射机制来实现Java程序和JDBC驱动的松耦合。随便看一个简单的JDBC示例，你会发现所有操作都是通过JDBC接口完成的，而驱动只有在通过Class.forName反射机制来加载的时候才会出现。 

**2. 在Java程序中，如何获取数据库服务器的相关信息？**

**ans：**使用DatabaseMetaData可以获取到服务器的信息。当和数据库的连接成功建立了之后，可以通过调用getMetaData()方法来获取数据库的元信息。DatabaseMetaData里面有很多方法，通过它们可以获取到数据库的产品名称，版本号，配置信息等。

**3. JDBC的Statement是什么？**

**ans：**Statement是JDBC中用来执行数据库SQL查询语句的接口。通过调用连接对象的getStatement()方法我们可以生成一个Statement对象。我们可以通过调用它的execute()，executeQuery()，executeUpdate()方法来执行静态SQL查询。 默认情况下，一个Statement同时只能打开一个ResultSet。如果想操作多个ResultSet对象的话，需要创建多个Statement。Statement接口的所有execute方法开始执行时都默认会关闭当前打开的ResultSet。

**4. 相对于Statement，PreparedStatement的优点是什么？**

它和Statement相比优点在于：

- PreparedStatement有助于防止SQL注入，因为它会自动对特殊字符转义。
- PreparedStatement可以用来进行动态查询。
- PreparedStatement执行更快。尤其当你重用它或者使用它的拼量查询接口执行多条语句时。
- 使用PreparedStatement的setter方法更容易写出面向对象的代码，而Statement的话，我们得拼接字符串来生成查询语句。如果参数太多了，字符串拼接看起来会非常丑陋并且容易出错。

**5. JDBC的DataSource是什么，有什么好处？**

DataSource即数据源，它是定义在javax.sql中的一个接口，跟DriverManager相比，它的功能要更强大。我们可以用它来创建数据库连接，当然驱动的实现类会实际去完成这个工作。除了能创建连接外，它还提供了如下的特性：

- 缓存PreparedStatement以便更快的执行
- 可以设置连接超时时间
- 提供日志记录的功能
- ResultSet大小的最大阈值设置
- 通过JNDI的支持，可以为servlet容器提供连接池的功能

**6. DDL和DML语句分别代表什么？**

DDL（数据定义语言，Data Definition Language）语句用来定义数据库模式。Create，Alter, Drop, Truncate, Rename都属于DDL语句，一般来说，它们是不返回结果的。

DML（数据操作语言，Data Manipulation Language）语句用来操作数据库中的数据。select, insert, update, delete, call等，都属于DML语句。























