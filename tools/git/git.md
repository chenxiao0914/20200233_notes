常用命令：

git init		初始化仓库

git clone https://github.com/chenxiao0914/test.git	拷贝代码到本地仓库

git config --global user.name 'chenxiao0914'				设置用户名

git config --global user.email '15532423@qq.com'	   设置邮箱

git statsu		查看状态

git add a.txt	提交文件到暂存区

git commit -m '这里是备注信息'	提交暂存区文件到仓库

git push		提交代码到远程仓库

git pull			拉取远程代码到本地

git merge		同步代码到本地仓库



touch a.txt	创建文件

mkdir test	创建文件夹

vi a.txt 		修改文件

rm -rf a.txt	删除仓库文件到暂存区

git rm a.txt	删除暂存区文件



git branch -a	查看本地和远程所有分支（无-a查看本地，-r查看远程）

git branch branchName	新建一个分支，但依然停留在原分支

git branch  -b  branchName	新建一个分支，并切换到该分支

 git merge branchName	 合并指定分支到当前分支 



git config --list		显示当前git的配置



