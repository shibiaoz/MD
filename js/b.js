/**
 * Created by zhangshibiao on 2015/4/22.
 */
MD.define('js/b',[],function  () {
    var sayb  = function () {
        console.log('this is in b js');
        //alert('sayb')
    }
    console.log('b.js is invoke');
    return {
        sayb: sayb
    }
});
