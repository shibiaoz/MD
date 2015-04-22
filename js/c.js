/**
 * Created by zhangshibiao on 2015/4/22.
 */
MD.define('js/c',[],function  () {
    var sayc  = function () {
        console.log('this is in c js');
       // alert('sayc')
    }
    console.log('c.js is invoke')
    return {
        sayc: sayc
    }
});
