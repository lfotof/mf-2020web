git分为三个区域
1.工作区(我们写代码到地方)->2.暂存区->(当我们写完一段代码就会先把代码提交到暂存区，它上在本地到)->3.历史记录区(当我们完成一个功能到时候就会提交到历史记录区，这个区可以进行回滚)->4.git远程仓库
git命令
git init 初始化本地仓库 会自动将HEAD指针指向master分支
//全局命令
git config -l 查看全局配置信息
git config -global -l 查看全局已经配置到信息
git config -global user.name 设置全局用户名
git config -global user.email 设置全局邮箱
//将文件提交到暂存区
git add . 把当前仓库中所有最新修改提交到暂存区
git add xxx 把某个文件或者文件夹提交到暂存区
git add -A 和.上一样的
//删除缓存区文件
git rm --cached '"git\345\255\246\344\271\240/README.md' 
//查看状态
git status 查看当前文件到状态(红色代表在工作区，绿色代表在暂存区，看不见证明所有修改到信息都已经提交到了历史区)
git commit -m '描述信息'
//查看历史版本信息(历史记录)
git log 
git reflog 包含回滚信息，当进行来回滚不会再显示该条被回滚到历史信息(A,B俩个文件，B进行了回滚就不会再显示B来)
