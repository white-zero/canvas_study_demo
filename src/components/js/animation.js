Math.animation = function (from, to, duration, easing, callback) {
    var isUndefined = function (obj) {
        return typeof obj == 'undefined';
    };
    var isFunction = function (obj) {
        return typeof obj == 'function';
    };
    var isNumber = function(obj) {
        return typeof obj == 'number';
    };
    var isString = function(obj) {
        return typeof obj == 'string';
    };

    var toMillisecond = function(obj) {
        if (isNumber(obj)) {
            return     obj;
        } else if (isString(obj)) {
            if (/\d+m?s$/.test(obj)) {
                if (/ms/.test(obj)) {
                    return 1 * obj.replace('ms', '');
                }
                return 1000 * obj.replace('s', '');
            } else if (/^\d+$/.test(obj)) {
                return +obj;
            }
        }
        return -1;
    };

    if (!isNumber(from) || !isNumber(to)) {
        if (window.console) {
            console.error('from鍜宼o涓や釜鍙傛暟蹇呴』涓斾负鏁板€�');
        }
        return 0;
    }

    var tween = Math.tween || window.Tween;

    if (!tween) {
        if (window.console) {
            console.error('缂撳姩绠楁硶鍑芥暟缂哄け');
        }
        return 0;
    }


    var options = {
        duration: 300,
        easing: 'Linear',
        callback: function() {}
    };

    var setOptions = function(obj) {
        if (isFunction(obj)) {
            options.callback = obj;
        } else if (toMillisecond(obj) != -1) {
            options.duration = toMillisecond(obj);
        } else if (isString(obj)) {
            options.easing = obj;
        }
    };
    setOptions(duration);
    setOptions(easing);
    setOptions(callback);

    if (!window.requestAnimationFrame) {
        requestAnimationFrame = function (fn) {
            setTimeout(fn, 17);
        };
    }

    var start = 0;
    var during = Math.ceil(options.duration / 17);


    options.easing = options.easing.slice(0, 1).toUpperCase() + options.easing.slice(1);
    var arrKeyTween = options.easing.split('.');
    var fnGetValue;

    if (arrKeyTween.length == 1) {
        fnGetValue = tween[arrKeyTween[0]];
    } else if (arrKeyTween.length == 2) {
        fnGetValue = tween[arrKeyTween[0]] && tween[arrKeyTween[0]][arrKeyTween[1]];
    }
    if (isFunction(fnGetValue) == false) {
        console.error('娌℃湁鎵惧埌鍚嶄负"'+ options.easing +'"鐨勫姩鐢荤畻娉�');
        return;
    }

    var step = function() {
        var value = fnGetValue(start, from, to - from, during);

        start++;
        if (start <= during) {
            options.callback(value);
            requestAnimationFrame(step);
        } else {
            options.callback(to, true);
        }
    };
    step();
};
