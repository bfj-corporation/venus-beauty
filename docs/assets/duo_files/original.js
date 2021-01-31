//youtube　自動再生
//画面内に入ったら再生（読み込み時の事前処理）
$(document).ready(function(){

	"use strict";
	var srctext;
	$('.movie-target').each(function(i, elem) {
		srctext = $(elem).attr('src');
		
		if(srctext.match(/youtube/)){
		
			if(srctext.match(/autoplay/)){
				srctext = srctext.replace("&autoplay=0","");
				srctext = srctext.replace("autoplay=0","");
				srctext = srctext.replace("&autoplay=1","");
				srctext = srctext.replace("autoplay=1","");
				$(this).attr('src', srctext);
			}
		
			if(srctext.match(/enablejsapi/)){
			
				srctext = srctext.replace("enablejsapi=0","enablejsapi=1");
				$(this).attr('src', srctext);

			}else{
				srctext = srctext + "&enablejsapi=1";
				$(this).attr('src', srctext);
			}
			
			
		}

	});
});

//youtube　自動再生
//画面内に入ったら再生
$(function() {
	"use strict";
	
	if($('.movie-target').length){

		$('.movie-target').on('inview', function(event, isInView) {

			//要素がウィンドウの表示領域に現れたときに実行する処理
			var srctext;
			var $playerWindow;
			
			if (isInView) {
			
				srctext = $(this).attr('src');

				if(srctext.match(/youtube/) && !srctext.match(/autoplay=1/)){

					$playerWindow = $(this)[0].contentWindow;
		    		$playerWindow.postMessage('{"event":"command","func":"'+"playVideo"+'","args":""}', '*');
					$playerWindow.postMessage('{"event":"command","func":"'+"mute"+'","args":""}', '*');

				}

			
			}else{
			
				$playerWindow = $(this)[0].contentWindow;
		    	$playerWindow.postMessage('{"event":"command","func":"'+"pauseVideo"+'","args":""}', '*');

			}
			
		});
		
	}
});

//画面内に入ったらマーカーを引く、画面外でマーカーを外す
$(document).ready(function(){
	"use strict";
	
	if($('.act-marker').length){

		$(".act-marker").each( function() {
			$(this).addClass('act_line_off');
		});

		$('.act-marker').on('inview', function(event, isInView) {

			//要素がウィンドウの表示領域に現れた時に実行する処理
			if (isInView) {

				$(this).removeClass('act_line_off');			
				$(this).addClass('act_line');

			}else{
				$(this).removeClass('act_line');			
				$(this).addClass('act_line_off');

			}

		});

	}

});

