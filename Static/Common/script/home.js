$(document).ready(function(){

    var winHeight = $(window).height();
    var winWidth = $(window).width();   
    /*设置栅格图片尺寸*/
    var holderWidth = $("div.holder").width();
    $("div.holder").height(holderWidth);
    $(window).resize(function(){
        var holderWidth = $("div.holder").width();
        $("div.holder").height(holderWidth);
    });


    /*显示隐藏菜单*/
    $("span.menubtn").hover(function () {
        $(this).find('i').eq(0).animate({'bottom':'2px'}, 100);
        $(this).find('i').eq(2).animate({'top':'2px'}, 100);
    }, function () {
        $(this).find('i').eq(0).animate({'bottom':'0px'}, 100);
        $(this).find('i').eq(2).animate({'top':'0px'}, 100);
    });
    $("span.menubtn").click(function(){
        var num = 0;
        var winHeight = $(window).height();
        var winWidth = $(window).width();
        var listHeight = winHeight*0.14;
        if(winWidth > 992){
            var listWidth = winWidth*0.35;
        } else {
            var listWidth = winWidth;
        }
        $("div.menu_hide")
        .animate({width: listWidth+"px"}, 300)
        .animate({height: "100%"}, 300, function () {
            showList();
        });
        $('div.menu_hide .menu-mask').fadeIn();
        $("body").css({"width":$('body').width(),"overflow":"hidden"});
        function showList(_this){
            $("img.closemenu,div.menu_hide .name").fadeIn();
            setTimeout(function () {
                $("ul.nav li a").eq(0).animate({opacity: 1, left: "0px"});
                $("ul.nav li a").eq(1).delay(100).animate({opacity: 1, left: "0px"});
                $("ul.nav li a").eq(2).delay(200).animate({opacity: 1, left: "0px"});
                $("ul.nav li a").eq(3).delay(300).animate({opacity: 1, left: "0px"});
                $("ul.nav li a").eq(4).delay(400).animate({opacity: 1, left: "0px"});   
                setTimeout(function () {
                    $("ul.nav li a").addClass('transition');
                }, 1000);
            }, 200);
        }
    });
    
    $("img.closemenu,div.menu_hide .menu-mask").click(function(){
        $("ul.nav li a").removeClass('transition').css({opacity: 0, left: "7%"});
        $("img.closemenu,div.menu_hide .name,div.menu_hide .add-info,div.menu_hide .menu-mask").fadeOut();
        $("div.menu_hide")
        .animate({height: "5px"})
        .animate({width: 0},function () {
            $("body").css({"width":"auto","overflow":"auto"});
        });
    });

});


/* ----------------------------------------------------------------------------------------------- */
/* --------------------------------------------购物车--------------------------------------------- */
/* ----------------------------------------------------------------------------------------------- */

$(document).ready(function () {

    $('.gwc-celan li').eq(1).hover(function () {
        $(this).find('span').stop().animate({'width':'130'});
    }, function () {
        $(this).find('span').stop().animate({'width':'0'});
    });



    $('.cart-box .alt-back,.cartwrap,.upper .colse,.cartgb').click(function () {
        shopThreeStep();
    });

    $(".showgwcbtn").click(function(){
        var num = $("i.cartNum").eq(0).text()/1;
        if (!num) {
            return false;
        };
        var gwcobj = $('.cart-box');
        var bodyobj = $("body");
        bodyobj.css({"width":bodyobj.width(),"overflow":"hidden"});
        gwcobj.fadeIn();
        shopOneStep();
    });


    /* 购物车输入框样式动画 */
    $('div.cartlist .datas').focus(function () {
        if ($('body').width() < 768) {
             $(this).siblings('p').hide();
        } else {
            $(this).siblings('p').addClass('dongh');
            $(this).parent('li').css('padding-top','35px');
        };
    });
    $('div.cartlist .datas').blur(function () {
        var vals = $(this).val();
        if ($('body').width() < 768) {
            if (vals === '') {
                 $(this).siblings('p').show();
            };
        } else {
            if (vals === '') {
                $(this).siblings('p').removeClass('dongh');
                $(this).parent('li').css('padding-top','25px');
            };
        };
    });


    /* 购物车next */
    $('div.cartlist .next').click(function () {
        var status = $(this).attr('data-status') * 1;
        if (status === 1) {
            var carobj = $('div.cartlist');
            var spboxh = carobj.find('.client-info').find('ul').height();
            var gwch = spboxh + 140;
            if ($('body').width() < 768) {
                gwch = '100%';
            };
            carobj.find('.list-box').animate({'height': spboxh});
            carobj.animate({'height': gwch},function () {
                carobj.find('.x-red').animate({'width':'66%'}, function () {
                    $(this).siblings('.d2').addClass('focus');
                });
                if ($('body').width() > 767) {
                    carobj.find('input[name=phone]').focus();
                    phonecheck(carobj.find('input[name=phone]'));
                    carobj.find('input[name=name]').focus();
                };
                carobj.find('.prev').addClass('focus');
            });
            carobj.find('.goods').animate({'left':'-100%'});
            carobj.find('.client-info').animate({'left':'0'});
            carobj.find('.foot-btn').attr('data-status', 2);
        } else if (status === 2) {

            /* 提交客户信息 */
            shopTwoStep();
        };
    });

    /* 购物车prev */
    $('div.cartlist .prev').click(function () {
        var status = $(this).attr('data-status') * 1;
        if (status === 2) {
            var carobj = $('div.cartlist');
            var spboxh = carobj.find('.goods').find('ul').height();
            if (spboxh > 320) {
                spboxh = 320;
            };
            var gwch = spboxh + 140;
            carobj.find('.list-box').animate({'height': spboxh});
            carobj.animate({'height': gwch},function () {
                carobj.find('.x-red').siblings('.d2').removeClass('focus');
                carobj.find('.x-red').animate({'width':'33%'});
                carobj.find('.prev').removeClass('focus');
            });
            carobj.find('.goods').animate({'left':'0'});
            carobj.find('.client-info').animate({'left':'100%'});
            carobj.find('.foot-btn').attr('data-status', 1);
        }
    });

    /* 显示删除 */
    $('div.cartlist .goods i.gwcitem').click(function () {
        $(this).siblings('.dele-btns').animate({'right':'0px'});
    });
    /* 取消 */
    $('div.cartlist .goods .dele-btns .quxiao').click(function () {
        $(this).parent('.dele-btns').animate({'right':'-32%'});
    });
    /* 确定 */
    $('div.cartlist .goods .dele-btns .queren').click(function () {
        var id = $(this).attr('data-id');
        gwcdeleHandle($(this), id);
    });

});


/* ---------------------------------------------------------------------------------------- */
/* -----------------------------------------预设方法--------------------------------------- */
/* ---------------------------------------------------------------------------------------- */

/* 删除临时储存 */
function gwcdeleHandle(_this, id) {
    var gwcUrl = _this.parents('ul').siblings('.suburl').attr('href');
    $.post(gwcUrl, {service_id: id}, 'json');

    var carobj = $('div.cartlist');
    var spboxh = carobj.find('.goods').find('ul').height() - carobj.find('.goods').find('li').height() - 20;
    if (spboxh > 320) {
        if ($('body').width() < 768) {
            spboxh = $('body').height() - 100;
        } else {
            spboxh = 320;
        };
    };
    var gwch = spboxh + 140;
    if ($('body').width() < 768) {
        gwch = '100%';
    };
    carobj.animate({'height': gwch});
    carobj.find('.list-box').animate({'height': spboxh});
    _this.parents('li').animate({'height':'0','padding':'0'}, function () {
        $(this).remove();
        var gwcobj = $('div.cartlist .goods');
        var numobj = $("i.cartNum");
        var num = numobj.eq(0).text()/1;
        numobj.text(num -= 1);
        var gwnum = gwcobj.find('li').length;
        if (gwnum === 0) {
            numobj.eq(1).hide();
            shopThreeStep();
        };
        $('span.addbtn[data-id="'+id+'"]').show().siblings('span').hide();
    });
}

/* 加入购物车 */
function joingwcHandle(id, name, price, fmimg, imgurl) {
    if (price/1 === 0) {
        price = '按需付费';
    } else {
        price = '¥'+price+'/次';
    };
    var obj = ''+
    '<li>'+
        '<input type="hidden" name="sele_id" value="'+id+'">'+
        '<img src="'+imgurl+'/'+fmimg+'">'+
        '<p class="name">'+name+'</p>'+
        '<p class="name price">'+price+'</p>'+
        '<i class="fa fa-trash-o gwcsp'+id+'"></i>'+
        '<div class="dele-btns">'+
            '<p class="quxiao"><span>取消</span></p>'+
            '<p class="queren focus" data-id="'+id+'"><span>确定</span></p>'+
        '</div>'+
    '</li>';
    var gwcobj = $('div.cartlist .goods');
    gwcobj.find('ul').append(obj);

    var numobj = $("i.cartNum");
    var num = numobj.eq(0).text()/1;
    numobj.text(num += 1);
    numobj.show();

    gwcobj.find('i.gwcsp'+id).click(function () {
        /* 显示删除 */
        $(this).siblings('.dele-btns').animate({'right':'0px'});

        /* 取消 */
        $(this).siblings('.dele-btns').find('.quxiao').click(function () {
            $(this).parent('.dele-btns').animate({'right':'-32%'});
        });

        /* 确定 */
        $(this).siblings('.dele-btns').find('.queren').click(function () {
            var id = $(this).attr('data-id');
            gwcdeleHandle($(this), id);
        });
    });
}


/* PC 购物车第一步 显示详情*/
function shopOneStep() {
    $("div.cartlist").stop().animate({width: '100%'}, function(){
        var spboxh = $(this).find('.goods').find('ul').height();
        if (spboxh > 320) {
            spboxh = 320;
        };
        $(this).find('.list-box').height(spboxh);
        var gwch = spboxh + 140;
        $(this).animate({height: gwch}, function () {
            $(this).find('.x-red').animate({'width':'33%'}, function () {
                $(this).siblings('.d1').addClass('focus');
            });
        });
    });
}


/* PC 购物车第二步 采集客户信息*/
function shopTwoStep() {
    var vals = $('div.cartlist .datas');
    var arr = {};
    for (var i = 0; i < vals.length; i++) {
        if (vals.eq(i).val() == '') {
            vals.eq(i).focus();
            return false;
        } else {
            var name = vals.eq(i).attr('name');
            if (name === 'phone') {
                if (!test_phone(vals.eq(i).val())) {
                    vals.eq(i).focus();
                    return false;
                };
            };
            arr[name] = vals.eq(i).val();
        };
    };

    var code = $('div.cartlist .datas[name=code]');
    if (getCookie('code') != code.val()) {
        code.focus();
        return false;
    };

    arr['sele_id'] = '';
    var sele_id = $('input[name=sele_id]');
    for (var i = 0; i < sele_id.length; i++) {
        if (i) {
            arr['sele_id'] += ',';
        };
        arr['sele_id'] += sele_id.eq(i).val();
    };
    var suburl = $('div.cartlist .client-info .suburl').attr('href');
    $.post(suburl, arr, function (data) {
        if (data.status) {
            /* 进度条更新 */
            $('div.cartlist').find('.x-red').animate({'width':'100%'}, function () {
                $(this).siblings('.d3').addClass('focus');
            });
            /* 客户数据清空 */
            $('div.cartlist .client-info input').val('');
            /* 显示成功提示 */
            $('div.cartlist').find('.client-info').animate({'left':'-100%'});
            $('div.cartlist').find('.prompt').animate({'left':'0'});
            $('div.cartlist .foot-btn').attr('data-status', 3);
            $("i.cartNum").text(0);
            $("i.cartNum").eq(1).hide();
            $('div.solutionwrap span.add').hide();
            $('div.solutionwrap span.addbtn').show();
            $('div.cartlist .goods li').remove();
            $('.cartlist .client-info .code').css('color','#999');
            var interval = setInterval(function(){
                var wait = $('#gwcwait');
                wait.text(wait.text() - 1);
                var time = wait.text();
                if(time <= 0) {
                    shopThreeStep();
                    clearInterval(interval);
                };
            }, 1000);
            
        } else {
            
        };
    });
}


/* PC 购物车第三步 关闭购物车详情 */
function shopThreeStep() {
    $("div.cartlist").stop().animate({height: "3px"},function(){
        $(this).animate({width: "0px"}, function(){
            $('.cart-box').fadeOut();
            setTimeout(function () {
                $("body").css({"width":'auto',"overflow":"auto"});
            }, 400);
        });
        $(this).find('.goods').css({'left':'0'});
        $(this).find('.prompt').css({'left':'100%'});
        $(this).find('.client-info').css({'left':'100%'});
    });
    $('div.cartlist .x-red').animate({'width':'0'}, function () {
        $(this).siblings('span').removeClass('focus');
        $('div.cartlist .prev').removeClass('focus');
    });
    $('div.cartlist .foot-btn').attr('data-status', 1);
}


/* 飞往购物袋效果 */
function flyToElement(flyer, flyingTo, Cover) {
    var $func = $(this);
    var divider = 7;
    var flyerClone = $(flyer).clone();

    var winh = $(window).height();
    var mTop = $(Cover).offset().top;
    var sTop = $(window).scrollTop();
    var objh = $(Cover).height();
    var retb = winh - (mTop - sTop) - objh;

    var winw = $(window).width();
    var mleft = $(Cover).offset().left;
    var objw = $(Cover).width();
    var retr = winw - mleft - objw;

    $(flyerClone).css({
        'position': 'fixed',
        'right': retr, 
        'bottom': retb,
        'width': $(Cover).width() + "px", 
        'height': "auto",
        'opacity': 1,
        'z-index': 1000
    });
    $('body').append($(flyerClone));

    var re = /[a-zA-Z]/g;
    var gotoX = $(flyingTo).css('right');
    var gotoX = gotoX.replace(re, '')/1;
    var gotoY = $(flyingTo).css('bottom');
    var gotoY = gotoY.replace(re, '')/1;

    $(flyerClone).animate({
        opacity: 0.4,
        right: gotoX + 2,
        bottom: gotoY + 118,
        width: $(flyer).width()/divider,
        height: $(flyer).height()/divider
    }, 500, function () {
        $(flyingTo).fadeOut('fast', function () {
            $(flyingTo).fadeIn('fast', function () {
                $(flyerClone).remove();
            });
        });
    });
}


function pullcode(_this) {
    var codeurl = $('.cart-box .client-info .codeurl').attr('href');
    var phone = $(_this).siblings('input[name=phone]').val();
    if (!test_phone(phone)) {
        $(_this).siblings('input[name=phone]').focus();
        return false;
    };
    var code = '';
    for (var i = 0; i < 6; i++) {
        code += Math.floor(Math.random()*10);
    };
    setCookie('code', code);
    miaotime(_this, 60);
    $.post(codeurl, {code: code, phone: phone});
}


function phonecheck(_this) {
    var val = $(_this).val();
    if (test_phone(val)) {
        $(_this).siblings('button').css('color','#FD5C00');
    } else {
        $(_this).siblings('button').css('color','#999');
    };
}
