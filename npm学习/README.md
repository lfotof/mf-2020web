NPM
node package manger :NODE模块管理工具 根据NPM我们可快速按装、卸载所需要到资源文件

下载
https://nodejs.org/zh-cn/ 下载长期支持版

基于npm进行模块管理
https://www.npmjs.com/

命令
npm init -y 初始化一个package.json（清单，当前项目文件夹不能出现中文大写字母特殊符号）
npm install xxx 把模块安装在当前项目中(node_modules)可以在项目中导入使用
npm i xxx@1.0.0安装制定版本
npm i xxx --save 把模块报错在清单生产依赖中
npm i xxx --save-dev 把模块保存在清单依赖环境中
npm i 跑环境，按照清单跑
npm root -g 查看全局安装模块到目录 
*安装在全局可以使用命令对任何到项目进行操作，因为在安装目录下生成来 xxx.cmd文件，所以我们可以进行命令操作
*安装在本地项目中到模块 可以在项目中导入 但是默认不能基于命令来操作因为没有.cmd文件 基于package.json中到scripts配置一些npm可以执行命令，配置后通过$ npm run xxx执行操作
npm uninstall xxx 卸载项目模块
npm uninstall xxx -g 卸载安装过到模块


dos命令
E：直接跳到E盘
dir:查看改盘文件 
mkdir:创建一个文件夹 mkdir 11
copy con 创建一个文件 copy con 1.js
cls 清屏

package.json
dependencies 生产环境所需要到依赖模块（开发和部署）
devDependencies:开发依赖模块(开发)
scripts:配置本地可执行命令的

.gitgnore忽略文件
node_modules

yarn 
npm i yarn -g 
yarn init -y 清单，当前项目文件夹不能出现中文大写字母特殊符号）
yarn i 按照清单生成依赖
yarn add xxx@x.xx.xx --dev安装
yarn remove xxx 移除
yarn 不能安装全局模块

