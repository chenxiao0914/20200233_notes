# 一、认识XML

## 1.1 简介

xml： extensible markup language，可扩展标记语言。它是一种非常灵活的语言，没有固定的标签，所有的标签都是自定义的。通常，xml被用于信息的记录和传递，比如常用的配置文件。

~~~xml
#声明信息，用于描述xml的版本和编码,永远都是1.0
<?xml version="1.0" encoding="UTF-8"?>
~~~

良好的格式：

- 必须由xml声明语句
- xml有且仅有一个根元素
- 标签大小写敏感
- 属性值用双引号
- 标签成对
- 元素正确嵌套

**有效的xml文档**：首先必须是格式良好的（上面的要求），其次使用**DTD**或**XSD**定义约束。



## 1.2 DTD

- DTD： document type defination 文档类型定义，用于约束xml的文档格式。保证它我有效的xml。
- DTD分两种：内部、外部

假如DTD被包含在源文件中，则它应当通过下面的语法包装再一个DOCTYPE声明中：

~~~xml-dtd
<!-- <!DOCTYPE 根元素 [元素声明]> -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE scores [
	<!ELEMENT scores 	(student+)>
	<!ELEMENT student 	(name,course,score)>
	<!ATTLIST student id CDATA #REQUIRED>
	<!ELEMENT name 		(#PCDATA)>
	<!ELEMENT course 	(#PCDATA)>
	<!ELEMENT score 	(#PCDATA)>
]>
<scores>
	<student id="1">
		<name>王彤</name>
		<course>Chinese</course>
		<score>120</score>
	</student>
	<student id="2">
		<name>猪刚鬣</name>
		<course>英语</course>
		<score>130</score>
	</student>
</scores>
~~~

元素声明语法：

~~~xml
<!ELEMENT 元素名 (子元素，子元素)>

数量词：？==》0次或一次		+ ==> 至少一次		*：任意次数
~~~

属性声明语法：

~~~xml
<!ATTLIST 元素名称 属性名称 属性类型 默认值>
属性类型：CDATA-->字符数据	
默认值：#REQUIRED-->必须有 	#IMPLIED-->不是必须的	#FIXED value -->值是固定的value

<!ELEMENT name 		(#PCDATA)>
PCDATA：被解析的字符数据
~~~

## 1.3 外部DTD

引入外部DTD：

~~~xml-dtd
<!DOCTYPE scores SYSTEM "conf/score.dtd">

<!-- score.dtd -->
<?xml version="1.0" encoding="UTF-8"?>
<!ELEMENT scores (student+)>
<!ELEMENT student (name,course,score)>
<!ATTLIST student id CDATA #REQUIRED>
<!ELEMENT name (#PCDATA)>
<!ELEMENT course (#PCDATA)>
<!ELEMENT score (#PCDATA)>
~~~





# 二、验证XML

# 三、处理XML

## 3.1 解析方式

- DOM：基于XML树结构，比较耗资源，适用于多次访问XML

- SAX：基于事件，消耗资源小，适用于数据量较大的XML

- JDOM：开放源代码，比DOM更快，JDOM仅使用具体类而不使用接口

- DOM4J:开放源代码，非常优秀的JAVA XML API，性能优异，功能强大使用接口而不使用实现类

获取xml的内容：

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- 声明内部DTD -->
<!DOCTYPE scores [
	<!ELEMENT scores (student+)>
	<!ELEMENT student (name,course,score)>
	<!ATTLIST student id CDATA #REQUIRED>
	<!ELEMENT name (#PCDATA)>
	<!ELEMENT course (#PCDATA)>
	<!ELEMENT score (#PCDATA)>
]>
<scores>
	<student id="1">
		<name>王彤</name>
		<course>Chinese</course>
		<score>120</score>
	</student>
	<student id="2">
		<name>猪刚鬣</name>
		<course>英语</course>
		<score>130</score>
	</student>
	<student id="3">
		<name>吴京</name>
		<course>数学</course>
		<score>140</score>
	</student>
</scores>

~~~



~~~java
package com.xf;

import java.io.File;
import java.util.Iterator;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class Xml01 {
	public static void main(String[] args) throws DocumentException {
//		1、获取SAXReader对象，用来读取xml文件
		SAXReader reader = new SAXReader();
		Document document = reader.read(new File("score.xml"));
//		获取根节点
		Element rootElement = document.getRootElement();
//		迭代根节点的子元素
		Iterator<Element> elementIterator = rootElement.elementIterator();
		while (elementIterator.hasNext()) {
			Element next = elementIterator.next();
//			获取元素的属性attribute	索引从0开始，或者
			Attribute attribute = next.attribute(0);
			System.out.println(attribute.getName() + "=" + attribute.getValue());

			Iterator<Element> elementIterator2 = next.elementIterator();
			while (elementIterator2.hasNext()) {
				Element next2 = elementIterator2.next();
//				获取元素的名称和值
				System.out.println(next2.getName() + "=" + next2.getText());
			}
			System.out.println("===============================");
		}

	}
}

id=1
name=王彤
course=Chinese
score=120
===============================
id=2
name=猪刚鬣
course=英语
score=130
===============================
id=3
name=吴京
course=数学
score=140
===============================

~~~

## 3.2 生成xml文件

将list集合里面的数据封装到xml：

~~~java
package com.xf;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

public class Xml02 {

	public static void main(String[] args){
		List<Map<String,Object>> list = new ArrayList<>();
		Map<String,Object> map = new HashMap<>();
		map.put("a1", "abc1");
		map.put("a2", "abc2");
		map.put("a3", "abc3");
		map.put("a4", "abc4");
		map.put("a5", "abc5");
		map.put("a6", "abc6");
		list.add(map);
		Map<String,Object> map1 = new HashMap<>();
		map1.put("a1", "abc11");
		map1.put("a2", "abc12");
		map1.put("a3", "abc13");
		map1.put("a4", "abc14");
		map1.put("a5", "abc15");
		map1.put("a6", "abc16");
		list.add(map1);
		
		Document document = DocumentHelper.createDocument();
		Element rootElement = document.addElement("list");
		for (Map<String, Object> map2 : list) {
			Element element = rootElement.addElement("map");
			for (String string : map2.keySet()) {
				element.addElement(string).addText((String) map2.get(string));
			}
		}
		//输出到文件
		OutputFormat format = OutputFormat.createPrettyPrint();
		XMLWriter xmlWriter = null;
		try {
			xmlWriter = new XMLWriter(new FileWriter("src/a.xml"),format);
			xmlWriter.write(document);
		} catch (IOException e) {
			e.printStackTrace();
		}finally {
			if(xmlWriter != null) {
				try {
					xmlWriter.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}

~~~

~~~xml
<?xml version="1.0" encoding="UTF-8"?>

<list>
  <map>
    <a1>abc1</a1>
    <a2>abc2</a2>
    <a3>abc3</a3>
    <a4>abc4</a4>
    <a5>abc5</a5>
    <a6>abc6</a6>
  </map>
  <map>
    <a1>abc11</a1>
    <a2>abc12</a2>
    <a3>abc13</a3>
    <a
~~~





