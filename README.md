# MD
学习如何实现模块化

## 模块定义 ##
```
MD.defind('js/a',['js/b','js/c'],function(a,b){
    b.saya();
    c.sayc();
    console.log('invoke in a js');
})
```
## 使用 ##
```
MD.use('js/a');