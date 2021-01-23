面向对象
标记语言：HTML5/CSS3
编程语言：编程思想
*面向过程 C语言
*面向对象 JAVA


单列设计模式：
beautiGirl不仅仅被叫做变量（对象名）,也被称为"命名空间"
把描述一个事务的信息放到一个命名空间进行归组，防止全局变量的污染
let beautiGirl={
    name:'杨点点',
    age:18
}
高级单例模式：
let namespace = (function(){
    let fn = function(){console.log(console.log(...))}
    ...
    return {
        name:'xxx',
        fn:fn
    }
})();
namespace.name
namespace.fn()
==============================
工厂模式：生产批量化把实现某个功能的代码进行封装
*低耦合：减少页面中重复代码
*高内聚：提高代码的重复使用率
function createPerson(name,age) {
    let person = {}
    person.name = name 
    rerson.age = age 
    return person 
}
let beautyGirl = createPerson('杨点点',4)
let oldMan = createPerson('杨皮皮',2)
===============================
构造函数
function CreatePerson(name,age) {
    this.name = name 
    this.age = age
    //return 1000 //无效
    //return {xxx:'xxx'}//返回的不在是CreatePerson而是{xxx:'xxxx'}其实就是堆地址改变了
}
CreatePerson('张三',25)=>this:window 普通函数执行
let person = new CreatePerson('杨点点',18)//this:person
*new CreatePerson()执行和普通函数执行的关联
    1.new这种执行方式叫做构造函数执行模式，此时的CreatePerson不仅仅是一个函数名，
    被称为“类”,而返回的结果（赋值给person的），是一个对象，我们称之为“实例”，而函数体重出现的this都是这个实例
    2.new的时候不论是否加小括号都相当把Fn执行了，也创建了对应的实例对象，只不过不加小括号不能传值
    3.和实例有关系的操作一定是this.xxx=xxxx，因为this是当前类创建出来的实例对象，私有变量和实例没有必然的关系，他们不属于实例，他们只是类的私有变量，实例是无法用的!
    4.构造函数也会向普通函数一样去执行也会形成一个私有栈，但是在代码执行之前会做几件事情：
        4.1.游览器默认会创建一个对象数据类型的堆
        4.2.让函数体重的this指向这个对象
        4.3.默认加了return返回值，返回的是着了对象数据类型的堆！如果手动在类里return一个基本数据类型值是无效的，还是返回一个对象数据类型。如果手动在类里return会一个引用数据类型的，会把默认的实例替换掉（所以一般不会在类里写return）
        4.4.new可以创建构造函数和实例，类（函数数据类型）实例（对象数据类型）
===============================
instanceof:用来检测某个实例是否属于这个类,属于返回true不属于返回false
*局限性
1.要求检测的实例必须是对象数据类型的，基本数据类型的实例是无法检测出来的。

console.log(preson instanceof CreatePerson)//true
let ary=[12,23]
console.log(ary instanceof Array)//true
console.log(ary instanceof Object)//true
console.log(ary instanceof RegExp)//false
console.log(1 instanceof Number)//false
    //基本数据类型在JS中的特殊性
    1.一定是自己所属类的实例
    2.但是不一定是对象数据类型的
    //字面量创建方法（也是Number类的实例，也可以使用Number类的内置共有方法）
    let n = 10
    console.log(n.toFixed(2))//10.00
    console.log(typeof n)//=>"number"
    //构造函数创建模式（创建出来的实例是对象类型的）
    let m = new Number("10")
    console.log(m.toFixed(2))//10.00
    console.log(typeof m)//=>"object"
===============================
原型及原型链模式
1.每一个函数数据类型的值都有一个天生自带的属性prototype,这个属性的属性值是一个对象（用来存储实例公用的属性和方法）
    1.1普通函数
    1.2类（自定义类和内置类）
2.在prototype这个对象中，有一个天生自带的属性constructor,这个属性存储的是当前函数本身
*Fn.prototype.constructor === Fn //true
3.每一个对象数据类型的值，也有一个天生自带的属性__proto__,这个属性指向“所属类的原型prototype”
    3.1普通对象、数组、正则、Math、日期、类数组等
    3.2prototype也是一个对象
    3.3
    3.3函数也是一个对象
原型链查找机制
1.先找自己私有的属性，有则调取使用，没有继续找
2.基于__proto__找所属类原型上的方法(Fn.prototype),如果还没有就继续基于__proto__往上找...一直找到Object.prototype为止
*f1.__proto__.say===Fn.prototype.say //true 强制查找公有方法
===============================
hasOwnProperty
检测某一个属性名是否为当前对象的私有属性
"in":检测这个属性是否属于某个对象（不管是私有属性还是公有属性，只要是它的属性，结果就为true）
let ary=[10,20,30]
console.log('0' in ary) //true
console.log('push' in ary) // true
console.log(ary.hasOwnProperty('0))//true
console.log(ary.hasOwnProperty('push'))//false
“push”是它公有的属性不是私有的
console.log(Array.prototype.hasOwnProperty("push"))//true
//是公有还是私有属性，需要看性相对于谁来说。
console.log(Array.prototype.hasOwnProperty('hasOwnProperty'))
//自己堆中有的就是私有属性，需要基于__proto__来查找的就是公有的
(__proto__在IE(edge)游览器中给保护起来了，不让我们在代码中操作它)
===============================
检测某个属性是否为对象的公有属性：hasPubProperty
方法：是它的属性，但不是私有的
//基于内置类原型扩展方法
object.prototype.hasPubProperty=function(property){
    //=>验证传递的属性名合法性（一般只能是数字或字符串等）
    let x= ['string','number','boolean'],
        y=typeof property;
        if(!x.includes(y))return false;
        //=>开始校验是否为公有的属性(方法中的this就是要效验的对象)
        let n = property in this
            m = this.hasOwnProperty(property)
        return n && !m;
}
Array.prototype.hasPubProperty('push')
===============================
面向对象中有关私有/公有中的this问题
1.方法执行，看前面是否有点，点前面是谁this就是谁
2.把方法中的this进行替换
3.再基于原型链查找的方法确定结果即可
===============================
重构类的原型：让某个类的原型指向新的堆内存地址（重定向指向）
*问题：1.重定向后的空间中不一定有constructor属性（只有游览器默认开辟的堆中才存在constructor）,这样导致类和原型机制不完整，所以需要我们手动再给新的原型对象设置constructor
       2.在重新定向之前，我们需要确保原有原型对象上的没有设置属性和方法，因为重定向后原有的属性和方法就没啥用了（如果需要克隆到新的原型对象堆内存中，我们还需要额外的处理）
function FN(){...}
        3.内置类原型不允许重定向，因为这样会让内置类的方法都消失，所以禁止重定义内置类的原型对象，但是可以添加方法Array.prototype.xxx=function(){}

Fn.prototype.getA=function(){...}
Fn.prototype.getB=function(){...}
//设置别名 批量给原型设置属性方法的时候
let proto = Fn.prototype
proto.getA=function(){...}
proto.getB=function(){...}
//重构类的原型
Fn.prototype={
    constructor:Fn,
    getA:function(){...}
}
===============================
函数数据类型：
1.普通函数
2.类（内置类or自定义类）
对象数据类型：
1.{}普通对象 []数组对象 /^$/正则对象 日期对象 Math数学函数对象 arguments等类数组对象 HTMLCollection/NodeList元素或者节点集合类数组对象。
2.实例也是对象数据类型的。
3.类的prototype也是对象数据类型的(Function.prototype除外，它是一个匿名函数)
4.函数也是对象
*函数的三种角色
1.普通的函数
1.1形参、实参、arguments、return、箭头函数
私有作用域（栈内存、执行上下文）
形参赋值&变量提升
作用域链
栈内存的释放和不释放（闭包）
....
1.2.构造函数（类）
类和实例
prototype、__proto__,原型和原型链
instanceof
constructor
hanOwnProperty
...
1.3普通对象
它是由键值对组成的。
...
函数中的this也是重点需要学习的内容。

===========================
*call/apply/bind
每一个函数（普通函数/构造函数/内置类）都是Function内置类的实例，所以：函数.__proto__==Function.prototype,函数可以直接调取Function原型上的方法
Function.prototype=>function anonymous(){}
-call
-apply
-bind
function fn(){}
fn.call()=>fn函数基于原型链找到Function.prototype上的call方法，并且让其执行(执行的call方法：方法中的this是fn)
fn.call.call()//=>fn.call就是Function prototype上的call方法，也是一个函数，只要是函数就能用原型上的方法，所以可以继续调用call来执行

Function.prototype.call = function $1(){...}
fn.call=>$1
fn.call()=>$1 this:fn
fn.call.call()=>$1.call()=>继续让call执行,this:$1
实例.方法():都是找到院上上的内置方法，让内置方法先执行（只不过执行的时候做了一些事情会对实例产生改变,而这也是这些内置方法的作用）而内置方法中的this一般都是当前操作的实例。

apply是按照数组传参
let obj = {name:'OBJ'}
let fn = function(n,m){
    console.log(this.name)
}
//=>让fn方法执行，让方法中的this改变为obj,并且传递10/20
fn.call(obj,10,20)
fn.apply(obj,[10,20])

bind方法
和call/apply一样，也是用来改变函数中的this关键字的，只不过基于bind改变this,当前方法并没有被执行，类似于预先改变this
let obj ={name:'OBJ'}
function fn(){
    console.log(this.name)
}
document.body.onclick=fn//=>当前时间触发，fn中的this
//=>点击body,让FN中的this指向obj
document.body.onclick=fn.call(obj)//=>基于call/apply这样处理，不是把fn绑定给事件，而是把执行后的结构绑定给事件
document.body.onclick=fn.bind(obj)//=>通过bind方法只是预先把fn中的this修改为obj,此时fn并没有执行，当点击事件触发才会执行fn(call/apply都是改变this的同事立即把方法执行)
//=>在IE6~8中不支持bind方法 预先啥事情的思想被称为"柯理化函数"
=============================
基于内置类的原型扩展方法
在内置类原型上的方法,类所定义的实例可以直接调取使用，例如：实例.方法（） ary.push()
如果我们也把自己写的方法放到原型上，那么当前类的实例也可以直接这样调取使用，很方便
需要注意的地方：
1.自己扩展的方法不能影响原型内置的方法（我们自己设置方法最好加前缀:my）
2.扩展方法中的this一般都是当前类的实例（也就是要操作的值）:实例.方法（）
Array.prototype.push=function(){
    console.log('哈哈')
}
let arr = [1,2,3]
ary.push(100)//哈哈哈
console.log(ary)=>数组没变
*/
//数组去重
let ary = [1,32,2,24,3,32,4,24]
function unique(ary) {
    let obj = {}
    for(let i=0;i<ary.length;i++) {
        let item = ary[i]//let 形成一个作用域，let item只会在这里块级作用域被调用
        console.log(obj[item],'---obj[item]---')
        console.log(typeof obj[item] !== 'undefined')
        if(typeof obj[item] !== 'undefined'){
            ary[i]=ary[ary.length-1]//如果obj的属性不等于undefined让当前ary=最后一个
            ary.length--;
            i--
            console.log(i)
            continue;
        }
        obj[item] =item
        console.log(obj,'---obj----')
        console.log(obj[item])
        console.log('===============================')
    }
    obj=null
    return ary
}
//数组去重原理：首先将数组的取出变成对象的属性和属性值，然后再进行对比，当对象有这个属性的时候就让数组的当前项的值等于最后数组的最后一个值，数组再--是为了剔除重复值,i--让为了让i回到找到重复值的索引!continue跳过这个从下一个开始！
unique(ary)
//封装挂在到数组原型上
~function(){
    function myUnique(){
        let obj = {},_this =this;
        for(let i = 0; i<_this.length;i++) {
            let item = _this[i]
            if(typeof obj[item] !== 'undefined') {
                _this[i]=_this[this.length-1]
                _this.length--;
                i--;
                continue
            }
            obj[item]=item 
        }
        obj=null
        return this//保证当前方法执行完毕返回的结果依然是Array类的一个实例，这样就继续使用数组原型上的其他方法。
    }
    Array.prototype.myUnique =myUnique
}()
let ary =[1,1,2,34,54,54]
ary.myUnique()//返回去重的新数组(也是Array类的实例)
//ary.sort((a,b)=>a-b)//返回排序后的数组
ary=ary.myUnique().sort((a,b)=>a-b).reverse().slice(2).push('珠峰').concat(2)//链式调佣
//链式写法（保证返回值依然是当前类的实例 一般都会return this）
//concat is not a function 执行完push返回的是一个数字（新增后数组的长度）,不是数组了。不能继续调用了
console.log(ary)