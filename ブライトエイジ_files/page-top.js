// JavaScript Document

$(function() {
    var showFlag = false;
    var topBtn = $("#page-top");    
    topBtn.css("bottom", "-150px");
    var showFlag = false;
    //スクロールが100に達したらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            if (showFlag == false) {
                showFlag = true;
                topBtn.stop().animate({"bottom" : "0"}, 2000,"easeOutElastic"); 
            }
        } else {
            if (showFlag) {
                showFlag = false;
                topBtn.stop().animate({"bottom" : "-150px"}, 1000,"easeInBack"); 
            }
        }
    });
    //スクロールしてトップ
    topBtn.click(function () {
        $("body,html").animate({
            scrollTop: 0
        }, 800,"easeInOutCubic");
        return false;
    });
});