MD.define('js/a',['js/b','js/c'],function  (b,c) {
	var saya  = function () {
		console.log('========aaaaaaaaaaaaaa============');
	}
    alert(1111);
    b.sayb();
    c.sayc();
    console.log('a.js is invoke')
	return {
		saya: saya
	}
});