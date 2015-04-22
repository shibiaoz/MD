var tools = (function  () {
	var toolObj = {};
	toolObj['isFunction'] = function  (fun) {
		return Object.prototype.toString.call(fun) === '[object Function]';
	}
	/**
	 * load script 
	 *
	 * @param {String} path locate  the script file 
	 * @param {Function} callback function after load script file
	 * @param {Object} context ,the functino invoke and exec scope
	 *
	 */
	var loadScript = function (path,callback,context) {
			var ie = false,
				script = null;
				that = this;
			script = document.createElement('script');
			script.src = path;
			ie = script.readyState;
			if (ie) {
				//  for ie
				script.onreadystatechange = function () {
					if (script.readyState == 'loaded' || script.readyState == 'complte') {
						that.isFunction(callback) && callback();
					}
				}
			}
			else {
				// for chrome
				script.onload = function () {
					that.isFunction(callback) && callback();
				}
			}
			document.body.appendChild(script);
		}
    var _isArray = function (arr) {
        return Object.prototype.toString.call(arr) === '[object Array]' ? true : false;
    }
    var _itemIndex = function (arr,item) {
        if (!_isArray(arr)) {
            arr = [];
        }
        return arr.indexOf(item);
    }
    /**
     * deply copy from object
     * @param obj
     * @returns {Obejct}}
     */
    deplyCopyObj = function (obj){
        var result = {};
        for(var key in obj){
            if(typeof obj == 'object') {
                // copy deply if is obj
                result[key] = arguments.callee(obj[key]);
            }
            else {
                // 基本类型
                result[key] = obj[key];
            }
        }
        return result;
    }
    /**
     * 深拷贝
     * @returns {{}}
     */
    function deplyCopyArr (arr) {
        var obj = [];
        for (var key in arr){
            if(typeof arr[key]=='object'){
                obj[key] = deplyCopyObj(arr[key]);
            }
            else {
                obj[key] = arr[key];
            }
        }
        return obj;
    }

    /**
     * 删除数组中的某一项，返回一个深拷贝的值
     * @param arr
     * @param item
     * return {Array}
     */
    var  delSomeItem = function (arr,item) {
        if ( !_isArray(arr)) {
            return  arr;
        }
        var newArr = deplyCopyArr(arr);
        var index = _itemIndex(arr,item);
        index = (index > -1) ? index : arr.length;
        newArr.splice(index,1);
        return newArr;

    }
	toolObj['loadScript'] = loadScript;
    toolObj['delSomeItem'] = delSomeItem;
	return toolObj;
})()
console.log(tools);