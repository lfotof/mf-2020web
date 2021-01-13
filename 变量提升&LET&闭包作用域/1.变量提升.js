//游览器为了能够让代码自上而下执行，首先会开一快内存（栈内存）=>作用域or执行上下文(context)
//1.执行代码
//2.存储变量以及基本数据类型到值 变量存储 a b  值为空
//3.带var的变量会进行变量提升
//4.进入栈中
console.log(a)//5.输出console.log(a),这个时候为undefined。
var a = 12//6.不会再声明变量var a，因为a已经进行变量提升了 ，跳到第2步直接存储值将12与变量a进行关联,
var b = a //7.不会再声明变量var b，因为b已经进行变量提升了 ，跳到第2步将b与a关联所以值是12,
b = 13 //8.b重新赋值将13与b关联 让b的存储值为13,值也就改变来
console.log(b)//9 13


//遇到引用类型值（对象和函数）
//1.开辟一个新的内存(堆内存16进制到内存地址)
//2.把内存存储到堆内存中(对象存储的上键值对,函数存储到上函数体中到代码字符串)
//3.让变量和堆内存关联在一起。
//sum函数执行步骤
//1.开辟出一个栈内存，进行变量和值存储，变量SUM 值为空
//2.变量提升 function sum(...), 存储值变成为一个指向堆内存的指针AF0。
//3.AF0中存储的是"return n+m"
console.log(sum(10,20))//4.代码执行console.log(sum(10,20))此时函数已经存在了，可以执行了
function sum(n,m) {//5.执行到这里直接跳过
    return n + m
}



/*函数表达式
由于使用var只存在变量提升不会赋值，所以此时函数在前面执行，函数是没有值的，不能执行(真实项目中使用这种方法，因为他操作更加严谨)
*/
console.log(sum1)//undefined
sum1(10,20)//Uncaught TypeError: sum1 is not a function 直接报错来，var声明到只能是变量提升，并不会像函数声明那样进行定义所以报错。
var sum1 =function(n,m) {
    return n+m
}



/*
练习题1
 全局作用域(栈内存)
 1.变量提升 var a; 值为空
 2.代码执行
*/
console.log(c)//undefined
var c = 12 //var c不执行 在变量提升到时候已经声明，直接将12与c关联 c的值12
c = 13 //重新赋值，将13与c关联 c到值为13
console.log(c)


/*
练习题2
词法解析直接报错来，语法有错误。
只有var和function存在变量提升
在JS中上一行代码报错，下面都不会再去执行
1.变量提升 没有var和function不存在变量提升
2.代码执行
*/
console.log(d)
let d = 12 
d = 13 
console.log(d)


/*
练习题3
1. 变量提升 没有var和function不存在变量提升
2.代码执行
*/
console.log(f)//词法解析直接报错来，语法有错误
f=13 //window.f=13
console.log(f)

/*
练习题4
1. 变量提升 没有var和function不存在变量提升
2.代码执行
*/
let h =12 
let h = 13 //报错 语法错误 重复声明 let不能在同一作用域下重复声明 var允许
console.log(h)


/*
练习题5
词法解析的时候直接报错了，因为下面的语法就错误了。词法解析也可以叫词法检测 语法错误
*/
console.log(1)
let j =12 
console.log(j)
let j = 13 
console.log(j)

/*
练习题6
SyntaxError
所谓重复是：不管之前通过什么方法，只要在当前栈中存在了这个变量，我们使用let/const等重复再声明这个变量就是语法错误
*/
console.log(k)
var k =12 
let k = 13//报错  语法错误
console.log(k)

/*
练习题7
*/
fn()
function fn() {console.log(1)}
fn()
function fn() {console.log(2)}
fn()
var fn = function() {console.log(3)}
fn()
function fn(){console.log(4)}
fn()
function fn(){console.log(5)}
fn()


/*
关于条件判断的
[PROPERTY] in [OBJECT] 验证当前属性是否存在于对象
hansOwnProperty 集成于
*/
let obj = {
    name:'杨点点',
    age:3,
    GF:null
}
console.log("name" in obj)//true
console.log("BF" in obj)//false
/*
练习题8
    1.变量提升
    不管条件是否成立都要进行变量提升
    var a; //创建一个全局变量a 也相当于给window添加一个属性
*/
console.log(a)//undefined
if(!('a' in window)) {//'a' in window 为true !('a' in window)为false
    var a = 13 //不走这里了。
}
console.log(a)//undefined

/*
练习题9
全局作用域
1.变量提升
函数有特殊性：在老版本游览器中，确实不论条件是否成立，都会进行变量提升和定义，但是在新版本游览器中为了兼容ES6严谨的语法规范，条件中的函数只会提升不会定义。
*/
console.log(fn);//undefined
fn()//Uncaught typeError:fn is ont a function
if('fn' in  window) {//true
    // 条件成立，进来后的第一件事是给 FN赋值
    fn()
    function fn() {
        console.log('哈哈哈')
    }
}
fn()

/*
自执行函数：前面加的()或者!、-、~、+只有一个目的，让语法符合而已
自执行函数本身不进行变量提升（没名字）
(function(n){})(10)
~function(n){}(10)
!function(n){}(10)
+function(n){}(10)
-function(n){}(10)
*/

/*
练习题10
*/
f= function () {return true}
g= function () {return false}
~function() {
    /*
    函数执行会形成一个私有作用域
    1.变量提升 function g
    2.代码执行
    */
   if(g() && []==![]) {//Uncaught typeError:g is ont a function
       f=function() {return false}
       function g() {return true}
   }
}()
console.log(f())
console.log(g())
