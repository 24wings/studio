/*输入电话号码*/
function test_phone(val) {
    var judge = /^[1]{1}[2,3,4,5,6,7,8,9,0]{2}[0-9]{8}$/;
    if (judge.test(val)) {
        return true;
    } else {
        return false;
    }
}

/*不能输入特殊字符*/
function specialsVarchar(val) {
    var judge = /[%&',;=?$\\^]+/;
    if (val != '') {
        if (!judge.test(val)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/*输入数字*/
function onlyNumber(val) {
    var judge = /[^0-9.]+/;
    if (val != '') {
        if (!judge.test(val)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/*输入0-9a-zA-Z数字和字母*/
function onlyVarchar(val) {
    var judge = /[^0-9a-zA-Z]+/;
    if (val != '') {
        if (!judge.test(val)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/*转换时间戳(0000-00-00)*/
function timestamp(time) {
    return new Date(time).getTime() / 1000;
}

/*日期转换*/
function dateHandle(times, type) {
    var now;
    if (times) {
        now    = new Date(times * 1000);
    } else {
        now    = new Date();
    };
    var year   = now.getFullYear();
    var month  = now.getMonth() + 1;
    var date   = now.getDate();
    var hour   = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month < 10) {month = '0' + month;};
    if (date < 10) {date = '0' + date;};
    if (hour < 10) {hour = '0' + hour;};
    if (minute < 10) {minute = '0' + minute;};
    if (second < 10) {second = '0' + second;};
    switch (type) {
        case 'H:i':
            return hour+':'+minute;
            break;
            
        case 'H:i:s':
            return hour+':'+minute+':'+second;
            break;
            
        case 'm-d':
            return month+"-"+date;
            break;
            
        case 'Y-m-d':
            return year+"-"+month+"-"+date;
            break;
            
        case 'Y-m-d H:i':
            return year+"-"+month+"-"+date+' '+hour+':'+minute;
            break;
            
        default:
            return year+"-"+month+"-"+date+' '+hour+':'+minute+':'+second;
            break;
    }
}


/*计时*/
function miaotime(_this, miao) {
    $(_this).attr('onclick','');
    $(_this).text("请稍候(" + miao + ")");
    var interval = setInterval(function(){
        miao --;
        if(miao <= 0) {
            $(_this).text("重新获取");
            $(_this).attr("onclick","pullcode('"+_this+"')");
            clearInterval(interval);
        } else {
            $(_this).text("请稍候(" + miao + ")");
        };
    }, 1000);
}

function autotimem(miao, _this) {
    miao--;
    if (miao > 0) {
        $(_this).html("请稍候(" + miao + ")");
        $(_this).attr('onclick','');
        setTimeout("times('"+miao+"', '"+_this+"')",1000);
    } else {
        $(_this).html("重新获取");
        $(_this).attr('onclick',"miaotime('"+_this+"')");
    }
}


/*写cookies*/ 
function setCookie(name, value, times) { 
    if (!times) {
        times = 10;
    };
    var overtime = times*60*1000;
    var exp = new Date();
    exp.setTime(exp.getTime() + overtime);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
} 

/*读取cookies*/ 
function getCookie(name) { 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]); 
    else 
        return null; 
} 

/*删除cookies*/ 
function delCookie(name) { 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
}


/*获取链接传值ID getQueryStringorgs().id*/
function getQueryStringorgs() {
    var qs = (location.search.length > 0 ? location.search.substring(1) : '');
    var args = {};
    var items = qs.length ? qs.split('&') : [];
    var item = null;
    var name = null;
    var value = null;
    var i = 0;
    var len = items.length;
    for (i = 0; i < len; i++) {
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}


/*刷新页面*/
function reloadPage(miao){
    if (!miao) {
        miao = 3000;
    };
    setTimeout('window.location.reload()', miao);
}


/* 显示提示框(方法调用) */
function showPrompt(text, reload)
{
    var obj = '<div class="alert-prompt">' + text + '</div>';
    $('div.alert-prompt').animate({'opacity':0}, function () {
        $(this).remove();
    });
    $('body').append(obj);
    $('.alert-prompt').stop().delay(200).show().animate({"top":"7%","opacity":"1"}, 300, function () {
        $(this).animate({"top":"7%"}, 1000, function () {
            $(this).animate({"top":"5%","opacity":"0"}, 300, function () {
                if (reload) {
                    window.location.reload();
                };
                $(this).remove();
            });
        });
    });
}
