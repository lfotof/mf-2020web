1.变量提升
当游览器开辟出供代码执行的栈内存后，代码并没有自上而下执行，而是继续做了一些事情：
把当前作用域中所有带var和function的关键字进行提前声明和定义=>变量提升
*带var的知识提前声明[declare](var a;)，如果只声明值为undefined
**1.1带var和不带var的区别 
在全局作用域下带var是变量，不带var的是给window加了一个属性
var b = 14 //变量 在全局下声明的变量也相当于在window添加了一个对应的属性
console.log(b)//14
console.log(window.b)//14//window.a =14 window的一个属性
var d=13,f=14;等价于var d=13;var f=14;
var d=f=10 等价于var d=10; f=10;(f不带var)
*带function的不仅声明，而且还定义了(defined定义,"a=13"定义就是赋值) 准确来说就是让变了和每个值进行关联,函数在声明+定义的时候就会开辟一个堆内存。
*变量提升，函数的优先级高于变量其实就是重复赋值
//var a;
//a = AF0//1.函数提升 定义，function a()不会在执行
console.log(a)//输出函数
var a =12 //a被重新赋值了 var a进行了变量提升不会在声明
function a() {//这个代码不会执行了
    console.log('aa')
}
console.log(a)


2.let/const 和var到区别

2.1 1et/const 不存在变了提升。创建变了的6种方式种只有var和function有变量提升，而let/const/import/class都不存在这个机制。

2.2在相同的作用域中or执行上下文中,var/function允许重复声明，声明第一次之后，之后再遇到就不会在重复声明了，而let/const是不允许的。
//在游览器自上而下执行之前，在执行之前还有其他操作，比如词法解析它会检测即将执行的代码是否存在语法错误，存在就报错SyntaxError，所以下面的案例直接报错了，代码不会执行。
console.log(1)//不执行
let j =12 
console.log(j)
let j = 13 
console.log(j)

2.3 let能解决typeof检测时存在的暂时性死区
console.log(a) //报错a未定义
console.log(typeof a) //undefined 这是游览器的BUG，本应该是报错的，因为没有a(暂时性死区)
console.log(typeof a)//a未初始化
let a 

2.4基于let/const/class等创建变量，会把所在的大括号（除对象的大括号之外）当做一个全新的私有块级作用域。
函数执行会产生私有作用域
let等也会产生私有的作用域(var不会)
if(1===1) {
    var a =10
}
console.log(a)//10 a是全局作用域
if(1===1) {
    //=>let会有块作用域(现在大括号是就是一个私有作用域)
    //=>a是私有变量
    let a =10
}
console.log(a)//报错，请先定义a
*在当前作用域下（全局、私有、块作用域）如果创建变量使用的是let/const等，一定不能在创建代码的前面是有这些变量，否则会报错：ReferenceError: Cannot access 'a' before initialization

3.闭包作用域
3.1创建函数开辟一个堆内存把函数体重大代码当做字符串存储进去
3.2把堆内存的地址赋值给函数名/变量名
3.3函数在哪里定义的，那么它执行的时候所需要查找的上级作用域就是谁
3.4函数执行形成一个全新的私有作用域（执行一次形成一个，多个之间也不会产生影响）
3.5形参也算是函数的私有变量
函数执行
形参赋值&变量提升
代码执行（把所属堆内存中的代码字符串拿出来一行一行执行）
遇到一个变量，首先看它是否为私有变量（形参和私有作用域种声明的变量都是私有变量），
是私有的就操作自己的变量，不是私有的则向上级作用域中查找...一直找到全局作用域为止=>作用域查找
私有变量和外界的变量没有必然的关系，可以理解为被私有栈内存保护起来了，这种机制其实就是闭包保护机制。
3.6关于堆栈内存释放问题
函数执行就会形成栈内存（从内存中分配的一块空间），如果内存都不销毁释放，很容易就会导致溢出（内存爆满，电脑卡死），
堆栈内存的释放问题是学习JS的核心知识之一 
    堆内存释放问题
    创建一个引用类型值，就会产生一个堆内存。
    如果当前创建的堆内存不被其他东西所占用了，（游览器会在空闲的时候查找每一个内存的引用状况，
    不被占用的都会自己给回收掉释放掉）
    所谓的占用和我们的业务逻辑无关，只看它是否还有关联的值。
    let obj = {name: "MF"}//不会被释放
    let oop = obj //此时obj和oop都占用着对象的堆内存，想要释放堆内存，需要手动解除变量和值的关联(null:空对象指针)
    obj = null 
    oop = null 
    栈内存释放
    打开游览器形成的全局作用域是栈内存
    手动执行函数形成的私有作用域是栈内存
    es6中的let/const形成的块作用域也是栈内存
    全局栈内存：关掉页面的时候才会销毁
    私有栈内存：
    *只有函数执行的时候才会开辟一个私有栈内存，在私有栈内存中也会和全局一样进行变量提升
    1.函数执行完毕，形成的私有栈内存就会被销毁掉（排除出现无限级递归、死循环的模式）
    2.一旦栈内存中的某个东西（一般都是推地址）被私有作用域以外的事物占用了，则当前栈内存不能被立即释放销毁，
    不能被立即释放销毁的特点：私有作用域种的私有变量等信息也保留下来了。
    * 普遍认为函数执行形成不能被释放的私有栈内存，这样的才是闭包
    function fn() {...}
    fn()//函数执行形成栈内存，执行完栈内存销毁
    
    function x() {
        return function () {
            ....
        }
    }
    let f = x()//f占用x执行形成的栈内存中的一个东西（返回小函数对应的推）则X执行形成的栈内存不能被释放了。
    3.7闭包的俩大作用
    3.7.1保护（私有变量和外界没有必然的练习）
    jquery前端非常经典类库：提供了大量的方法供开发人员使用
    为了防止全局变量污染（导入JQ后，它里面有大量的方法,如果这些方法不保护起来，用户填写的方法很容易和JQ方法名字相同产生冲突，产生冲突可以理解为全局变量污染）JQ的方法和变量需要用闭包保护起来。
    在真是项目中，我们一般都要把自己写的内容放到一个闭包中，这样可以有效防止自己的代码和别人代码产生冲突（全局变量污染：真是项目中是要尽可能减少对全局变量的使用的）；如果需要把自己的东西给别人用，基于return和window.xxx等方式暴露给别人即可。
    //JS
    var xxx = (function(){
        //...A写的代码
        return xxx;
    })()
    (function(){
        //...b写的代码
        window.xxx= xxx;
    })()
    //JQ
    $(function(){
        //这样写在某些角度上也是为了减少全局变量
    })
    *在真是项目中应该减少堆闭包的使用（因为闭包会产生不释放的栈内存，过多的使用容易导致内存溢出或性能降低，如果需要使用闭包建议只使用一个闭包）
    3.7.2保存(性不销毁的栈内存，里面的私有变量信息保存下来了)
   
this
函数执行的主体（不是上下文）：谁把函数执行的，那么执行主体就是谁
1.给元素的某个事件绑定方法,当事件触发方法执行的时候，方法中的this是当前元素操作的元素本身。
2.如果确定执行主体(this)是的？当方法执行的时候，我们看方法是否有点（.），没有是window或
undefined,有点前面this是谁就是谁。
var name ='珠峰培训'
function fn(){
    console.log(this.name)
}
var obj = {
    name:'你好世界',
    fn:fn
}
obj.fn()//=>this:obj
fn()//=>this:window(非严格模式。严格模式下是undefined)window.省略了
(function(){
//自执行函数中的this是window或undefine
})()
思考？
//hasOwnProperty方法中的this:ary.__proto__.__proto__.
ary.__proto__.__proto__.hasOwnProperty()
let obj = {
    fn:(function(n){
        //把自执行函数执行的返回结果赋值给fn
        //this:window
        return function() {
            //=>fn等于这个返回的小函数 this:obj
        }
    })(10)
}
obj.fn()

function fn(){
    console.log(this)//this:window
}
document.body.onclick=function() {
    fn()//this:body
}
*this跟上下文没有任何关系，这就是this让人迷惑的地方。

函数小知识点：
*传参，多个形参默认是按照实参的顺序传递的function a(x,y,c){...};a(1,2)只有x和y进行了参数赋值，但是如果只想个c赋值呢？我们可以使用一个对象function a(options){console.log(options.c)};a({c:3})
有形参foo了var foo不会再声明了，foo重新赋值！当形参和私有作用域里的变量名重复时以形参名为主！
当实参是引用类型如数组，那么他们的内存地址是指向同一个内存地址只要有一个改变了都改变，如果想切断内存地址关联只需要将形参重新赋值即可，基本类型就不会在有任何关联了。
var ary = [1,2,3]
function a(ary) {
    ary[0] = [0]
    ary = [0]//重新赋值切断了与var ary的关联，将参数ary指向了一个新的内存地址。
console.log(ary)//[0,2,3]
}
a(ary)
console.log(ary)//[0,2,3]

var a = 1
function b(c) {
    c = 2 
    console.log(c)//2
}
b(a)
console.log(a)//1
*所有return function()都是return 一个引用地址而不是值，如果大函数返回了小函数且没有执行小函数则只返回小函数本身，如果执行了则会运行小函数，这里弄混了一下。

function fn() {
    var a=0;
    return function(b) {
        return b+a++
    }
}
var f = fn()//大函数里没有执行小函数,不会运行return(function(b){return b+a++})

function fn() {
    var a=0
     function x(b) {
        console.log(b+a++)
    }
    x()
    return x
}
var f = fn()//大函数里执行了小函数，在var f=fn()的的时候会运行x()一次

*arguments 就是函数的实参集合(箭头函数没有)，一个数组。不管是否定义了形参，也不管传递了多少实参，arguments中包含所有传递的实参信息。{0:1,1:2,2:3,length:3}，在JS非严格模式下arguments和形参存在映射关系（一个改都会跟着变），在严格模式下映射机制就切断了。函数有形参无实参，形参默认是undefined
"use strict"
function b (x,y,a) {
    arguments[2]=10
    console.log(2)
}
b(1,2,3)

* 逻辑或 || 和逻辑与&& 在赋值操作的意义
A||b :先验证A的真假，如果A为真返回A的值，A为假返回的是B的值
A&&b :A为真返回B值,A为假返回B的值
&&的优先级高于 ||
let a = 0 || false //false
a = 1 || false //1
a=1 && 100 //100
a=0&& 100 //0
a=0 || 1 && 2 || 3;//=>先算1&&2=>0||2||3=>再算0||2=>2=>最后2||3=>2
function fn(x,cb) {
    //typeof x ==='undefined' ? 0 :null
    x=x||0
    //typeof cb==='function' ? cb():null
    cb&&cb()
}
fn();//有形参无实参,形参默认为undefined
fn(10)
fn(10,function(){})