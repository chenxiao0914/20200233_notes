```xml
@SpringBootApplication：表明这是springboot的启动类，同时会扫描该类所在包及自包下的组件。
@SpringBootConfiguration：相当于@Configutation。
@Configutation：表明这是一个配置类，用来替换xml配置文件，被注解的类内部包含有一个或者多个被@bean注解的方法，这个方法将会被AnnotationConfigApplicationContext或AnnotationConfigWebApplicationContext类进行扫描，并用户构建bean的定义，初始化Spring容器。
@ComponentScan：spring会扫描这些包及子包下的组件。
@EnableAutoConfiguration：



```

