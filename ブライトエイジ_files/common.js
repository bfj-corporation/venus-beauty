// 文末の文字削除
jQuery(function($) {
    $('.text_cat').each(function() {
        var $target = $(this);
        var html = $target.html();
        var $clone = $target.clone();
        $clone
            .css({
                display: 'none',
                position : 'absolute',
                overflow : 'visible'
            })
            .width($target.width())
            .height('auto');
        $target.after($clone);
        while((html.length > 0) && ($clone.height() > $target.height())) {
            html = html.substr(0, html.length - 1);
            $clone.html(html + ' ...');
        }
        $target.html($clone.html());
        $clone.remove();
    });
});

// hover border
/*
$(document).ready(function(){
  $('a.hover_b').borderEffect({borderColor : '#e62896', speed : 350, borderWidth: 6});
});
*/

// メールフォーム
$(function(){
	var overlay = $('<div id="overlay"></div>').appendTo("body");
	var checkArray = ["guestName", "mail", "reMail", "qaTxt"];
	var spinner;
	var spin_target = document.getElementById('qaCheckBox');
	var opts = {lines: 13, length: 33, width: 11, radius: 16, corners: 1, rotate: 74, direction: 1, color: '#000', speed: 1.5, trail: 71, shadow: true, hwaccel: true, className: 'spinner', zIndex: 2e9, top: '50%', left: '50%', opacity: .25, fps: 20};

	$("#sendSubmitCheck").on("click", function(e){
		e.preventDefault();
		var sendFlg = 1;
		$.each(checkArray, function(i, val){
			if($('#' + val).val() == ""){
				$('#' + val).parent().css("background", "#FBF4DA");
				sendFlg = 0;
			}else{
				$('#' + val).parent().css("background", "#FFFFFF");
			}
		});
		
		if(sendFlg == 1){
			if($('#mail').val() != $('#reMail').val()){
				$('#qaAlert').html('メールアドレスが一致しません');
			}else{
				if($('#mail').val().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
					$('#qaAlert').html('');
					
					$('#c_genre').html(escapeHtml($('#genre').val()));
					$.each(checkArray, function(i, val){
						$('#c_' + val).html(escapeHtml($('#' + val).val()));
					});
					$('#qaSendAlert').html('');
					$('#sendAfter').hide();
					overlay.fadeIn();
					$('#qaCheckBox').fadeIn();
					$('#sendBefore').fadeIn();
				}else{
					$('#qaAlert').html('不正なメールアドレスの形式です');
				}
			}
		}else if(sendFlg == 0){
			$('#qaAlert').html('入力されていない項目があります');
		}
	});
	
	$("#sendSubmit").on("click", function(e){
		e.preventDefault();
		e.stopPropagation();
		$('#sendSubmit').attr('disabled', true);
		spinner = new Spinner(opts);
		spinner.spin(spin_target);
		/*
		var fd = new FormData();
		fd.append("genre", $('#genre').val());
		$.each(checkArray, function(i, val){
			fd.append(val, $('#' + val).val());
		});
		*/
		var fd = {"genre": $('#genre').val(), "guestName": $('#guestName').val(), "mail": $('#mail').val(), "qaTxt": $('#qaTxt').val()};

		$.ajax({
			url: 'qaSend.php', method: 'post', dataType: 'json', data: fd
		}).done(function(res){
			spinner.spin();
			$('#qaSendAlertTitle').html(res["title"]);
			$('#qaSendAlert').html(res["msg"]);
			$('#sendSubmit').attr('disabled', false);
			$('#sendBefore').hide();
			$('#sendAfter').fadeIn();
		}).fail(function(jqXHR, textStatus, errorThrown){
			spinner.spin();
			$('#qaSendAlertTitle').html(res["title"]);
			$('#qaSendAlert').html(res["msg"]);
			$('#sendSubmit').attr('disabled', false);
			$('#sendBefore').hide();
			$('#sendAfter').fadeIn();
		});
	});

	overlay.on("click", function(e){
		e.preventDefault();
		overlay.fadeOut();
		$('#qaCheckBox').fadeOut();
	});
	$('#sendReset').on("click", function(e){
		e.preventDefault();
		overlay.fadeOut();
		$('#qaCheckBox').fadeOut();
	});
	$('#sendEnd').on("click", function(e){
		e.preventDefault();
		overlay.fadeOut();
		$('#qaCheckBox').fadeOut();
	});
	
	var escapeHtml = (function (String) {
	  var escapeMap = {
	    '&': '&amp;',
	    "'": '&#x27;',
	    '`': '&#x60;',
	    '"': '&quot;',
	    '<': '&lt;',
	    '>': '&gt;'
	  };
	  var escapeReg = '[';
	  var reg;
	  for (var p in escapeMap) {
	    if (escapeMap.hasOwnProperty(p)) {
	      escapeReg += p;
	    }
	  }
	  escapeReg += ']';
	  reg = new RegExp(escapeReg, 'g');
	  return function escapeHtml (str) {
	    str = (str === null || str === undefined) ? '' : '' + str;
	    return str.replace(reg, function (match) {
	      return escapeMap[match];
	    });
	  };
	}(String));
});

