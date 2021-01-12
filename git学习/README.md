git分为三个区域
1.工作区(我们写代码到地方)->2.暂存区->(当我们写完一段代码就会先把代码提交到暂存区，它上在本地到)->3.历史记录区(当我们完成一个功能到时候就会提交到历史记录区，这个区可以进行回滚)->4.git远程仓库
*本地提交到远程是历史区与远程仓库到交互，其他到区都会报错
git命令
git init 初始化本地仓库 会自动将HEAD指针指向master分支
//全局命令
git config -l 查看全局配置信息
git config -global -l 查看全局已经配置到信息
git config -global user.name 设置全局用户名
git config -global user.email 设置全局邮箱
git credential-manager uninstall 清除缓存的用户名和密码
git config --global user.name "username" 更改全局用户名
控制面板----用户账户---Windows管理凭据---编辑
//将文件提交到暂存区
git add . 把当前仓库中所有最新修改提交到暂存区
git add xxx 把某个文件或者文件夹提交到暂存区
git add -A 和.上一样的
//删除缓存区文件
git rm --cached 'git\345\255\246\344\271\240/README.md' 
//查看状态
git status 查看当前文件到状态(红色代表在工作区，绿色代表在暂存区，看不见证明所有修改到信息都已经提交到了历史区)
git commit -m '描述信息'
//查看历史版本信息(历史记录)
git log 
git reflog 包含回滚信息
//回滚
git reset --hard 3f83cdb936aa66f39e4ed5f9b32f0a56490a4ae6 当进行了回滚使用git log 不会再显示该条被回滚到历史信息(A,B俩个文件，B进行了回滚就不会再显示B了)可以使用git reflog查看，然后找到版本信息进行回滚

//本地仓库信息提交到远程仓库
git remote -v  查看本地仓库和哪些远程仓库保持连接
git remote add origin [git远程仓库地址] 让本地仓库和远程仓库新建一个origin是随便起的一个连接名（可以改成自己想要到，只不过一般都用这个）
git remote rm origin 删除关联
*提交之前一定先拉取
git pull origin master  如果将origin修改成了 aa 就 git pull aa master master
把本地代码提交到远程仓库(需要输入github的账号密码)
git push origin master


git config --system --unset credential.helper 每次都输入密码
git config --global credential.helper store 不用每次都输入密码