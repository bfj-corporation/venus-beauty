//このモジュールはカスタマイズJqueryのファイルです。

$(function($) {

	//TOP戻るボタンの表示
	$("#back-top02").hide();
	$(function(){
		$(window).scroll(function(){
			if($(this).scrollTop() > $("#cart_appear").offset().top){
				$("#back-top02").fadeIn();
			}else{
				$("#back-top02").fadeOut();
			}
		});

		$("#back-top a").click(function(){
			$("body,html").animate({scrollTop : 0},800);
			return false;
		});
	});

});

