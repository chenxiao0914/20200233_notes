# 一、servlet

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

