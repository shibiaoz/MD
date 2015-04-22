;(function  (w,undefined) {
    var ww = w;
    var MD = {};
    var utils = tools;
    /**
     * 这里逗比了
     * var tools = tools
     * 相当于  var tools = undefined ;tools 覆盖了外部的tool是工具
     *
     */
    //var  tools = tools;
    MD.instanceArr = [];//执行define返回对象数组
    MD.depModule = [];//储存模块的依赖关系
    MD.moduleCache = [];
    MD.parentPath = [];
    MD.depLen = [];

    /**
     * 模块的定义
     * 这个fun的执行先于脚本加载的回调
     */
    MD.define = function (path,dep,fun) {
        var that = this;
        dep = dep || [];
        var len = dep.length;
        if(len < 1){
           that._define(path,fun);
            return;
        }
        // 有依赖关系的，就存储依赖关系的关系表
        // a => [b,c]
        that.depModule[path] = [];
        that.depLen[path] = dep.length;
        that.moduleCache[path] = fun;//储存函数体，等到依赖模块都加载完之后，在实例化这个函数
        that.parentPath = [];
        dep.forEach(function (value,index) {
            // value is path
            that.parentPath[value] = path;
            if(typeof value!=='string') {
                value = String(value);
            }
            that.depModule[path].push(value);
            MD.use(value,path);
        });
    }
    /**
     * 处理单个模块并且没有依赖
     * @param path
     * @param fun
     * @returns {Object} 模块的实例
     */
    MD._define = function (path,fun,parentPath) {
        var that = this;
        that.instanceArr[path] = fun.call(this,null);
        var parentPath = undefined;
        if(that.parentPath[path]){
            parentPath = that.parentPath[path];
           //var len =  that.depModule[parentPath].indexOf(path);
           //that.depModule[parentPath] =  tool.delSomeItem(that.depModule[parentPath],path);
            that.depLen[parentPath]--;
            if (that.depLen[parentPath] < 1){
                //依赖都加载完啦
                utils.delSomeItem(that.depLen,parentPath);
                var tmp = that.depModule[parentPath];
                var tmpInstace = [];
                tmp.forEach(function(value,index){
                    tmpInstace.push(that.instanceArr[value]);
                });
                that.moduleCache[parentPath].apply(this,tmpInstace);
            }
        }
        return  that.instanceArr[path];
    }

    /**
     * 调用模块，主要是实例化模板
     * 1 loadscript 加载脚本
     * 2 标记 脚本
     * 3 加载之后、实例化之后通知模块
     *
     * @param {String} path 唯一标示模块
     */
    MD.use = function (path) {
        if(path == "" || path == undefined){
            return;
        }
        var callback = function () {
            //先去执行define中的内容,然后才会执行到这里
            //加载之后，解析执行先于此地
            console.log('load script callback ');
        }
        utils.loadScript(path,callback,null)

    }

    w.MD = MD;
})(window,undefined)
