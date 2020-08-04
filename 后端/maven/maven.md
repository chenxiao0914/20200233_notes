# 一、maven配置

1、下载地址：官网下载地址：http://maven.apache.org/download.cgi 

2、环境配置

~~~txt
变量名：MAVEN_HOME
变量值：D:\JavaTools\apache-maven-3.3.9　　　PS：这个值是 maven 压缩包解压的位置
path： %MAVEN_HOME%\bin 

打开命令提示符，快捷键 windows+R.输入 mvn -v 
如果出现maven 的版本信息，那么就配置成功
~~~

3、eclipse中集成maven插件

①Window->Preferences->Maven->Installation 

②指定 conf/settings.xml 的位置，进而指定 Maven 本地仓库的位置

③ 修改 settings.xml 如下标签的位置信息，指定本地仓库（localRepository）的位置。

~~~xml
<!-- localRepository
   | The path to the local repository maven will use to store artifacts.
   |
   | Default: ${user.home}/.m2/repository
  <localRepository>/path/to/local/repo</localRepository>
  -->
<localRepository>D:\tools\apache-maven-repo</localRepository>
~~~

#  二、maven项目说明

## 1、 **GroupId和Artifact Id**

group Id和artifact Id被统称为“坐标”是为了保证项目唯一性而提出的，如果你要把你项目弄到maven本地仓库去，你想要找到你的项目就必须根据这两个id去查找。

　　group Id一般分为多个段，这里只说两段，第一段为域，第二段为公司名称。域又分为org、com、cn等等许多，其中org为非营利组织，com为商业组织。举个apache公司的tomcat项目例子：这个项目的group Id是org.apache，它的域是org（因为tomcat是非营利项目），公司名称是apache，artifact Id是tomcat。

　　artifact Id就是项目的唯一的标识符，实际对应项目的名称，就是项目根目录的名称

## 2、maven工程结构

①：Maven 要负责项目的自动化构建，以编译为例，Maven 要想自动进行编译，那么它必须知道 Java 的源文件保存在哪里，这样约定之后，不用我们手动指定位置，Maven 能知道位置，从而帮我们完成自动编译。

②：遵循 约定>>>配置>>>编码。即能进行配置的不要去编码指定，能事先约定规则的不要去进行配置。这样既减轻了劳动力，也能防止出错。

## 3、 **pom.xml 文件** 

Project Object Model 项目对象模型，Maven 的核心配置文件，pom.xml，与构建过程相关的一切设置都在这个文件中进行配置。 

# 三、maven构建

概念：以Java源文件、框架配置文件、jsp、html等资源文件为材料，去生产一个可以运行的项目的过程。分为以下三个过程：

- 编译：java源文件(.java) --> 编译 --> Class字节码文件(.class) --> 交给jvm去执行
- 部署：一个BS项目最终运行并不是动态的web工程本身，而是这个web工程编译的结果
- 搭建：

tips:运行时环境
	jre System library 和 Apache Tomcat v 9.0 是运行时环境，其实质是一组jar包的引用，并没有把jar包复制到工程中，所以不是目录。

构建的各个环节：
	清理：将以前编译得到的旧的class字节码文件删除，为下一次编译做准备。
	编译：将java源程序编译成class文件。
	测试：自动测试，自动调用junit程序。
	报告：测试程序执行的结果。
	打包：动态web工程打成war包，java工程达成jar包。
	安装：Maven特定的概念-->将打包得到的文件复制到仓库中的特定位置(install)。
	部署：将动态web工程生成的war包复制到Servlet容器的指定目录下，使其可以运行。

# 四、核心概念

## 1、约定的目录结构

~~~txt
Hello
    Src
    ----Main
    --------Jave
    --------Resources
    ----Test
    --------Java
    --------Resources
    pom.xml
~~~

## 2、POM

1、Project Object Model	项目对象模型
2、pom.xml是maven项目的核心文件。

## 3、坐标(gav)

通过下面三个向量可在仓库中唯一定位一个maven项目

~~~pom
<groupId>com.alibaba</groupId>				<!-- 公司或组织域名+项目名 -->
<artifactId>dubbo-parent</artifactId>		<!--模块名-->
<version>2.6.2</version>					<!--版本	-->
<scope>test</scope>
~~~

## 4、依赖

1、maven解析依赖信息时回到本地仓库中查找被以来的jar包.对于我们自己开发的maven工程，使用mvn install命令安装后就可以进入仓库。
2、依赖的范围----scope
	Compile
			对主程序是否有效：有效
			对测试程序是否有效：有效
			是否参与打包：参与打包
	Test
			对主程序是否有效：无效
			对测试程序是否有效：有效
			是否参与打包：不参与打包
	Provided
			对主程序是否有效：有效
			对测试程序是否有效：有效
			是否参与打包：不参与
			是否参与部署：不参与
			典型例子：servlet-api.jar
3、依赖的传递
		只有compile范围的依赖可以传递
4、依赖的排出：在传递的依赖中添加如下代码	A依赖于B,在A中添加

~~~pom
<exclusions>
    <exclusion>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jcl</artifactId>
    </exclusion>
</exclusions>
~~~

5、依赖的原则：解决jar包冲突
		路径最短者优先
		路径相同，先声明者优先(dependency在pom文件中的顺序)
6、统一管理依赖的版本
		在pom中添加
		<properties>
				<com.cx.version>5.1.10.RELEASE</com.cx.version>
		</properties>
		在dependency的version中引用：${com.cx.version}
7、继承：junit等不能传递的依赖可能在不同项目有不同的版本，造成版本不一致。解决办法：将依赖的统一版本提取到父工程中，在子工程中声明依赖不指定版本。
				创建maven父工程，pom打包方式
				在子工程中声明对父工程的引用
				将子工程的坐标中和父工程坐标中重复的内容删除
				再父工程中统一junit的依赖
				在子工程中删除junit的版本号部分

## 5、仓库

1、仓库的分类
		本地仓库：当前电脑上maven的仓库
		远程仓库：
				私服：搭建在局域网环境中，为局域网范围内的所有Maven工程服务
				中央仓库：架设在Intenet上，为全世界所有Maven工程服务
				中央仓库镜像：为了分担中央仓库的流量，提升用户访问速度
2、仓库中的内容
			Maven自身需要的插件
			第三方框架或工具的jar包
			我们自己开发的Maven工程

## 6、生命周期、插件、目标

​		(清理—编译—测试—报告—打包—安装—部署)
​	    1、Clean ：在进行真正的构件之前的一些清理工作
​		2、Default ：核心部分--> 编译、测试、打包、安装、部署等等
​		3、Site ：生成项目报告，站点，发布站点

## 7、常用maven命令

执行maven命令必须在pom.xml所在目录
	mvn clean----清理
	mvn compile----编译主程序
	mvn test-complile----编译测试程序
	mvn test----执行测试
	mvn package----打包
	mvn install----安装(项目打包放在maven仓库中给其他项目依赖)
	mvn site----生成站点

# 五、注意问题

1、maven web		war
	eclipse新建的缺少webapp下的目录
	解决：项目-->properties-->project facets-->Dynamic web module-->src/main/webapp

2、maven update出现的jdk版本问题

在pom中添加时

~~~pom
<build>
  	<plugins>
  		<!-- 设置编译版本为1.8 否则每次maven-update之后会变成原始jdk依赖-->
  		<plugin>
  			<groupId>org.apache.maven.plugins</groupId>
  			<artifactId>maven-compiler-plugin</artifactId>
  			<configuration>
  				<source>1.8</source>
  				<target>1.8</target>
  				<encoding>UTF-8</encoding>
  			</configuration>
  		</plugin>
  	</plugins>
  </build>
~~~



