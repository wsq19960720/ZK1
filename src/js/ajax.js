(function() {
    var xhr = {
        creatXhr: function() {
            return new XMLHttpRequest(); 
        },
        creatIEXhr: function() {
            return new ActiveXObject("Microsoft.XMLHTTP"); 
        },
        creatError: function() {
            alert("你用的浏览器太老了"); 
            return null;
        },
        creatXHR: function() {//判断浏览器
            var xhr = null;
            if (window.XMLHttpRequest) {
                this.creatXHr = this.creatXhr; 
            } else {
                this.creatXHr = this.creatIEXhr; 
            }


            try { 
                
                xhr = this.creatXHr(); 
            } catch (e) {
                this.creatXHR = this.creatError; 
                xhr = this.creatXHr();
            }
            return xhr;
        },
        ajax: function(options) { //options传递的参数
            var defaults = { 
                type: "get",
                async: "true",
                dataType: "json"
            };
            
            var opts = Object.assign({}, defaults, options); //合并参数没有用默认的有的话用参数
            var xhr = this.creatXHR(), 
                method = (opts.type || "GET").toUpperCase(), 
                ispost = method == "POST"; 
            data = this.param(opts.data);//给URL拼接和send传递
            url = this.buildUrParam(opts.url, data, ispost); //判断get方式
            xhr.open(method, opts.url, typeof(opts.async) == "undefined" ? true : opts.async); 
            if (ispost) {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            }


            xhr.send(ispost ? data : null); 
            var statusChange = this.statusChange;


            xhr.onreadystatechange = function() {
                statusChange(xhr, opts, opts.success, typeof(opts.error) == undefined ? false : opts.error);
            }
        },
        param: function(data) { 
            if (!data) { 
                return null;
            }
            var paramArray = [];//解析参数
            for (var key in data) {
                paramArray.push(key + "=" + data[key]) 
                 //"name=zhangsan&id=123"
            }
            return paramArray.join("&"); 
        },
        buildUrParam: function(url, data, ispost) { 
            if (data && !ispost) { 
                if (url.indexOf("?") != -1) { 
                    url += "?" + data;
                } else {
                    url += "&" + data;
                }
            }
            return url;
        },
        statusChange: function(xhr, opts, success, error) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var resultData = null;
                    if (opts.dataType == "json") {
                        resultData = eval("(" + xhr.responseText + ")");
                       
                    } else if (opts.dataType == "xml") {
                        resultData = xhr.responseXML;
                    } else {
                        resultData = xhr.responsseText;
                    }


                    success(resultData);
                } else {
                    if (error) {
                        error.call(xhr, statusText, status);
                    }
                }


            } else { 
                if (error) {
                    error.call(xhr, xhr.statusText, xhr.status);
                }
            }
        }


    }
    window.ajax = function(opts) {
        xhr.ajax.call(xhr, opts);
    }


})();