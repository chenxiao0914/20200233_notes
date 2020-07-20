springmvc是一种基于java实现mvc设计模型的请求驱动类型的轻量级web框架，属于spring framework的后续产品。他通过一套注解，让一个简单的java类成为处理请求的控制器，无需实现任何接口，同时支持restful编程风格。

springmvc和strusts2的区别：

共同点：

- 都是基于mvc模型编写的

- 底层都离不开ServletAPI

- 处理请求的机制都是一个核心控制器

区别：

- springmvc的入口是Servlet，struts2入口是Filter

- springmvc是基于方法设计的，而struts2是基于类，sturts2每次执行都会创建一个动作类，所以比springmvc慢。

- springmvc支持JSR303校验，处理ajax更加方便。

archetypecatalog

internal

# 1、springmvc基本概念

springmvc执行流程：

- 请求到前端控制器DispatcherServlet
- 控制器请求处理器映射器HandlerMapping查找Handle，并返回一个执行器链
- 控制器请求处理器适配置HandlerAdapter去执行handle
- handle执行并返回ModelAndView对象
- 请求识图解析器（View Resolver）解析，返回View对象
- 试图渲染，将模型数据填充到request域

**前端控制器**：流程控制中心，由他调用其他组件处理用户请求。

**处理器映射器**：根据用户请求找到Handle即处理器，springmvc提供了不同的映射器实现不同的映射方式，如配置文件方式、实现接口方式、注解方式。

处理器适配器：

**视图解析器**：根据逻辑视图名解析成物理视图名，即网页地址，在生成view视图对象，最后对view视图对象渲染返给前端。

```xml
//用来替代处理器映射器和处理器适配器的配置
<mvc:annotation-driven/>
```

# 2、springmvc基操

archetypeCatalog

internal

# 3、请求参数的绑定

## 1、请求参数的绑定

​	1、绑定机制

​		1.表单提交的数据都是k=v格式

​		2.把表单提交的请求参数作为控制器中方法的参数进行绑定（要求：表单的name和参数名一致）

​	2、支持的数据类型

​		1.基本数据类型和字符串

​		2.实体类型

​		3.集合（List、Map）

2、基本数据类型

​	1.表单的name和参数名一致

​	2.区分大小写

3、实体类型

​	1.表单的name和实体类的属性名一致

​	2.如果包含其他引用类型，需写成对象.属性的方式

4、集合类型

## 2、自定义类型转换器

前端请求的所有字段都是以字符串为键值对的格式传输的，当Bean的属性是Date类型，前端穿的值是“xxxx-xx-xx”格式时，会报错，需自定义一个String到Date的转换器

~~~java
public class StringToDateConverter implements Converter<String, Date> {

    @Override
    public Date convert(String s) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        if(s == null){
			throw  new RuntimeException("传参date为空");
        }
        try {
            return df.parse(s);
        } catch (Exception e) {
            throw  new RuntimeException("传参date为空");
        }
    }
}
~~~

~~~xml
 <!--配置自定义类型转换器-->
<bean id="converter" class="org.springframework.context.support.ConversionServiceFactoryBean">
    <property name="converters">
        <set>
            <bean class="com.hm.mvc1.converte.StringToDateConverter"></bean>
        </set>
    </property>
</bean>

<!--开启springmvc注解的支持-->
<mvc:annotation-driven conversion-service="converter"/>
~~~



​	

# 4、常用注解

- RequestMapping：用于建立请求url和处理请求方法之间的对应关系

可以出现在类和方法上，出现在类上，以/开头，一般表示模块，方法上一般表示二级访问目录。

可跟值：

value = path：请求的路径

method：指定请求的方法

params：指定请求的参数条件，支持简单的表达式。

- RequestParam：参数绑定

定义表单传参的名称，定义传aaa则必须传一个aaa给后台。

- RequestBody：获取请求体内容，直接使用得到key=value&key=value结构的数据，get请求不适用

- PathVarisable：参数占位符，/user/id=10  ====>    /user/10
- RequestHeader：用于获取请求消息。开发中一般不用。
  - value：提供消息头名称
  - required：是否必须有此息头



# 5、响应

## 1、返回字符串

该字符串为跳转的页面名称。相应的数据封装在Model对象中。

~~~java
@RequestMapping(path = "/paramList")
public String paramList(Model model){
    model.addAttribute("响应","相应的返回数据的内容");
    return "final";
}
~~~

## 2、返回ModelAndView

是返回字符串的底层原理

~~~java
@RequestMapping(path = "/paramList")
public ModelAndView testModelAndView(){
    ModelAndView mv = new ModelAndView();
    mv.addObject("name","小妹");
    return mv;
}
~~~

## 3、返回void

传统的servlet模式。转发的时候不会经过视图解析器，转发目的地需要写全路径名。

~~~java
@RequestMapping("testVoid")
public void testVoid(HttpServletRequest request, HttpServletResponse response) throws Exception {
    System.out.println("xxxxx");
    //请求转发
    request.getRequestDispatcher("/WEB-INF/pages/success.jsp").forward(request,response);
    //重定向
    response.sendRedirect(request.getContextPath()+"/WEB-INF/pages/success.jsp");
    //直接相应
    response.getWriter().print("nihao");
    return;
}
~~~

## 4、返回json格式的数据

需要使用ResponseBody注解。

前端数组转json：JSON.stringfy(数组)

json转数组： eval(json) 

~~~html
<script src="js/jquery-3.5.1.min.js"></script>
    <script>
        $(function () {
            $("#btn1").click(function () {
                //alert(111);
                $.ajax({
                    url:"user/ajax1",
                    dataType:"json",
                    type:"post",
                    data:{
                        "username":"你好",
                        "password":"123456",
                        "age":"12"
                    },
                    success:function (data) {
                        alert(data.name);
                        alert(data.pass);
                    }
                })
            });
        })
    </script>
</head>
<body>
<h3>hello</h3>
<button id="btn1">ajax请求</button>
~~~

~~~java
@Controller
@RequestMapping("/user")
public class AjaxController {

    @RequestMapping("/ajax1")
    @ResponseBody
    public Map<String, Object> ajaxT1(@RequestBody String body){
        System.out.println(body);
        Map<String,Object> map = new HashMap<>();
        map.put("name","系哦啊花");
        map.put("pass",111);
        return map;
    }
}
~~~

~~~xml
<!--json所需jar包-->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.10.2</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.10.2</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.10.2</version>
</dependency>
~~~





# 6、文件上传

## 1、上传前提

form表单的enctype必须是 multipart/form-data,默认是指application/x-www-urlencoded;

method取值必须是post；提供一个文件选择域。

## 2、上传步骤

依赖、配置文件上传解析器

表单file的name属性的值必须和controller方法中MultipartFile的形参一致！

~~~xml
<!--文件上传-->
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.3.1</version>
</dependency>
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.6</version>
</dependency>

<!--配置文件解析器 id名必须位multipartResolver-->
<bean id="multipartResolver"  class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <property name="maxUploadSize" value="10285760"></property>
</bean>

~~~

~~~java
@Controller
@RequestMapping("/upload")
public class FileUploadController {

    @RequestMapping("/uploadFile1")
    public String uploadFile1(HttpServletRequest requset, MultipartFile upload) throws IOException {
        String path = requset.getSession().getServletContext().getRealPath("/upload/");
        File file = new File(path);
        if(!file.exists()){
            file.mkdirs();
        }
        System.out.println(file);
        String filename = upload.getOriginalFilename();
        String uuid = UUID.randomUUID().toString().replace("-","");
        filename = uuid+"_"+filename;
        upload.transferTo(new File(path,filename));
        System.out.println("上传成功");
        return "final";
    }
}
~~~

~~~html
<form method="post" action="upload/uploadFile1" enctype="multipart/form-data">
    文件上传：<input type="file" name="upload"/>
    <input type="submit" value="上传"/>
</form>
~~~

## 3、跨服务器上传

~~~xml
<!--跨服务器上传文件-->
<dependency>
    <groupId>com.sun.jersey</groupId>
    <artifactId>jersey-core</artifactId>
    <version>1.18.1</version>
</dependency>
<dependency>
    <groupId>com.sun.jersey</groupId>
    <artifactId>jersey-client</artifactId>
    <version>1.18.1</version>
</dependency>
~~~



```jsp
<form method="post" action="upload/uploadFile2" enctype="multipart/form-data">
    文件上传：<input type="file" name="upload"/>
    <input type="submit" value="上传"/>
</form>
```

~~~java
@RequestMapping("/uploadFile2")
public String uploadFile2(HttpServletRequest requset, MultipartFile upload) throws IOException {

    System.out.println("跨服务器上传");
    String path = "http://localhost:9090/uploads/";
    String filename = upload.getOriginalFilename();
    String uuid = UUID.randomUUID().toString().replace("-","");
    filename = uuid+"_"+filename;
    //创建客户端对象
    Client client = Client.create();
    //和图片服务器连接
    WebResource resource = client.resource(path + filename);
    //上传文件
    resource.put(upload.getBytes());
    System.out.println("上传成功");
    return "final";
}
~~~

springMVC跨服务器上传 报错：returned a response status of 405 Method Not Allowed。

 在Tomact服务器安装目录下的conf/web.xml配置文件中加上： 

~~~xml
<init-param>
    <param-name>readonly</param-name>
    <param-value>false</param-value>
</init-param>


<servlet>
    <servlet-name>default</servlet-name>
    <servlet-class>org.apache.catalina.servlets.DefaultServlet</servlet-class>
    <init-param>
        <param-name>debug</param-name>
        <param-value>0</param-value>
    </init-param>
    <init-param>
        <param-name>listings</param-name>
        <param-value>false</param-value>
    </init-param>
    <init-param>
        <param-name>readonly</param-name>
        <param-value>false</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
</servlet>
~~~

使得服务器允许文件写入。

# 7、springmvc异常处理

控制层交给spring的异常处理组件。

自定义异常，java异常也行，写异常处理类，重写resolveException方法，配置异常处理类。出现异常时会找异常处理器，也就是配置的异常处理类。

~~~java
@Controller
@RequestMapping("/exception")
public class ExceptionController{

    @RequestMapping("/testException1")
    public String testException() throws MyException {
        try{
            int i = 1/0;
        }catch (Exception e){
            e.printStackTrace();
            throw new MyException("查询出错");
        }
        return  "final";
    }
}
~~~

~~~java
public class MyExceptionResolver implements HandlerExceptionResolver {

    /**
     * 处理异常的业务逻辑
     * @param httpServletRequest
     * @param httpServletResponse
     * @param o
     * @param e
     * @return
     */
    @Override
    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
        MyException exception = null;
        if(e instanceof MyException){
            exception = (MyException) e;
        }else {
            exception = new MyException("系统维护中");
        }
        ModelAndView mv = new ModelAndView();
        mv.addObject("errMess",e.getMessage());
        mv.setViewName("error");
        return mv;
    }
}
~~~

~~~xml
 <!--配置异常处理器-->
<bean id="myException" class="com.hm.mvc1.exception.MyExceptionResolver"></bean>
~~~

~~~html
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
	hello
    ${errMess}
</body>
</html>
~~~

# 8、拦截器

springmvc的拦截器类似于Servlet中的过滤器Filter，用于对处理器进行预处理和后处理。

springmvc请求时有一个拦截器链。

过滤器是Servlet规范中的一部分；配置/*时会拦截所有的资源。

拦截器是springmvc框架自己的，只能在springmvc工程中使用；他只会拦截访问的控制器方法，不会对静态资源拦截。使用自定义拦截器必须实现HandlerInterceptor接口。

1、编写拦截器

preHandle、postHandle、afterCompletion

~~~java
public class MyInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("MyInterceptor执行了。。。");
        return true;
    }
}
~~~

2、配置拦截器

~~~xml
<mvc:interceptors>
    <mvc:interceptor>
        <mvc:mapping path="/interceptor/*"/>
        <bean class="com.hm.mvc1.interceptor.MyInterceptor"></bean>
    </mvc:interceptor>
</mvc:interceptors>
~~~



