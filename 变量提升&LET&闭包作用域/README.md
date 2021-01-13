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

*带function的不仅声明，而且还定义了(defined定义) "a=13"定义就是赋值，准确来说就是让变了和每个值进行关联




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



