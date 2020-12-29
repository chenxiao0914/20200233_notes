安装mysql 8.0.16

# 一、卸载旧版本msyql

1、 停止MySQL服务 

​	 开始-》所有应用-》Windows管理工具-》服务，将MySQL服务停止 

2、卸载mysql server
	控制面板\所有控制面板项\程序和功能，将mysql server卸载掉 

3、 将MySQL安装目录下的MySQL文件夹删除 

4、 运行“regedit”文件，打开注册表 

​	删除HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Services\Eventlog\Application\MySQL文件夹
​	删除HKEY_LOCAL_MACHINE\SYSTEM\ControlSet002\Services\Eventlog\Application\MySQL文件夹。
​	删除HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Eventlog\Application\MySQL的文件夹。 

5、 删除C盘下的“C:\ProgramData\MySQL ”文件夹 ， 该programData文件默认是隐藏的，设置显示后即可见 。

6、 开始-》所有应用-》Windows管理工具-》服务
	如果已经将MySQL卸载，但通过“开始-》所有应用-》Windows管理工具-》服务”查看到MySQL服务仍然残留在
系统服务里。又不想改服务名，改如何：只要在CMD里输入一条命令就可以将服务删除：sc delete mysql 	这里的mysql是你要删除的服务名 。

# 二、安装mysql8.0.16

1、解压mysql jar包：D:\tools\mysql-8.0.16-winx64

2、设置path环境变量 D:\tools\mysql-8.0.16-winx64\bin

3、cmd进入mysql下的bin目录，运行 mysqld --initialize --console （次步会生成初始密码： A temporary password is generated for root@localhost:  xxxx）

4、安装MySQL服务：mysqld --install	(如果报错，通知服务已存在，可删除服务：sc delete mysql	再进行安装)

5、启动服务：net start mysql

6、连接mysql：mysql -u root -p  (密码是上面的xxxx)

7、修改密码： ALTER USER root@localhost IDENTIFIED BY ‘123456’; 

# 三、navicat连接msyql 8.0

输入账号密码，报错 **1251** ； 原因是MySQL8.0版本的加密方式和MySQL5.0的不一样 。

更改加密方式

1、先通过命令行进入mysql的root账户

​	mysql -uroot -p

2、更改加密方式 

ALTER USER 'root'@'localhost' IDENTIFIED BY '你的登录密码' PASSWORD EXPIRE NEVER;

3、更改密码

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';

4、刷新

flush privileges;

如果报错   ERROR 1396 (HY000): Operation ALTER USER failed for 'root'@'%' ;则是远程访问权限不正确，先选择数据库，查看一下再更改

use mysql;

select user,host from user;