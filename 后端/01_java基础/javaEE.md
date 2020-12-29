# 一、servlet

请求转发和重定向
	请求转发：
　　req.getRequestDispatcher(servlet或者jsp的请求路径).forward(req,resp);

　　URL重定向：
　　resp.sendRedirect("/day47/views/student.jsp");

​		a.请求转发是一次请求，重定向是两次请求 （通过地址栏可以查看）

　　b.请求转发地址栏不会发生改变， 重定向地址栏会发生改变
　　c.请求转发可以共享请求参数 ，重定向之后，就获取不了共享参数了
　　d.请求转发不能跨域（不能访问其他服务器链接） req.getRequestDispatcher("http://www.baidu.com").forward(req,resp);是不行的
　　　重定向可以 resp.sendRedirect("http://www.baidu.com");
　　e.请求转发能转到WEB-INF目录下的文件req.getRequestDispatcher("/WEB-INF/views/student.jsp").forward(req,resp);
	  而重定向不能 resp.sendRedirect("/day02_01/WEB-INF/views/student.jsp");
	 （注：WEB-INF目录：不能被外部通过地址直接访问）
	

转发和重定向的路径问题	
1）使用相对路径在重定向和转发中没有区别
2）重定向和请求转发使用绝对路径时，根/路径代表了不同含义
   重定向response.sendRedirect("xxx")是服务器向客户端发送一个请求头信息，由客户端再请求一次服务器。/指的Tomcat的根目录,写绝对路径应该写成"/当前Web程序根名称/资源名" 。如"/WebModule/login.jsp","/bbs/servlet/LoginServlet"
   转发是在服务器内部进行的，写绝对路径/开头指的是当前的Web应用程序。绝对路径写法就是"/login.jsp"或"/servlet/LoginServlet"。

# 二、filter

问题：request.setCharacterEncoding("utf-8");

每个controller都需要写一遍，可以将这个功能提取出来，在执行controller之前执行。

## 实现步骤

开发过滤器

配置过滤器

在web.xml中配置，过滤器执行的顺序为在web.xml中配置的顺序。

验证过滤器

设计的设计模式

# 三、listener

## 监听器的分类

坚挺域对象本身的创建和销毁,均有两个方法

- ServletRequestListener
- HttpSessionListener
- ServletContextListener

监听域对象中属性的增删该的监听器,均有三个方法

- ServletRequestAttributeListener
- HttpSessionAttributeListener
- ServletContextAttributeListener

这两个不需要创建爱你专门的监听器类，也不用在xml中配置

HttpSessionActivationListener、HttpSessionBindingListener

## 监听器的应用

