$(function() {

	$(window).on('scroll', function() {
		//console.log(parseInt($(this).scrollTop() / 8));
		$('.banner').css('backgroundPosition', 'center ' + (-$(this).scrollTop() / 8) + 'px');
		if($(this).scrollTop() > 200) {
			$('#header').addClass('active');
			$('.logo a').addClass('logoActive');
			$('#login').removeClass('alogin');

		} else {
			$('#header').removeClass('active');
			$('.logo a').removeClass('logoActive');
			$('#login').addClass('alogin');
		}
	})
	//下拉
	$('.playd').hover(function() {
		$(this).find('.play-dw').addClass('dw-active')
	}, function() {
		$(this).find('.play-dw').removeClass('dw-active')
	})
	//弹窗

	$('#login,.show-login').click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('#pop').show();
		$('.login-contnet').show();
		$('.register-contnet').hide();
	});
	$('#register,.show-register').click(function(event) {

		$('#pop').show();
		$('.register-contnet').show();
		$('.login-contnet').hide();

	});
	$('#close').click(function() {
		$('#pop').hide();
		$('.login-contnet').hide();
		$('.register-contnet').hide();

	});
	$('.submit-register').on('click', getData);
	$('.submit-login').on('click', getData);
	$(".pop-tit").find('a').click(function() {
		$(this).addClass('active')
			.siblings('a').removeClass('active').
		parent('.pop-tit').siblings('.from').find('.type').val(-$(this).index($(this).parent().find('a')));

	});

	function getData(event) {

		var $from = $(this).parent('.from');
		$from.find('.error').remove();
		var username = $from.find('.username').val();
		var password = $from.find('.password').val();
		var type = $from.find('.type').val();

		if((!username && username == "") || (!password && password == "")) {

			getError($from, "用户名或密码不能为空！！");
			return false;
		}
		var url = '';
		if($(this).is('.submit-login')) {
			url = '/users/login';
		} else if($(this).is('.submit-register')) {
			url = '/users/register';
		}

		$.ajax({
			type: "post",
			url: url,
			data: { "username": username, "password": password, "type": type },
			async: true,
			success: function(data) {
				if(data.status == 0)
					getError($from, data.error);
				else if(data.status == 1) {
					//							 	console.log(data.user_id);
					//window.location.href="/";
					//  alert("注册成功！！");
					if(data.username) {
						window.location.href = window.location.href;
					} else {
						alert("注册成功！！");
					}
				}

			}
		});
	}

	function getError($dom, error) {
		$dom.prepend('<p class="error red-link">' + error + '</p>');
	}
});
// $(document).on('click','.showPanel',function(){
// 	        //  alert($(this).attr('data-id'));
// 					 $('.w-panel').show();
// 					 $('#iframe').attr('src','http://192.168.0.8:8080/imgs/details/'+$(this).attr('data-id'));
// });

// $('.w-panel-close').click(function(){
// 	$('.w-panel').hide();
// });

$(document).on('mouseover','.showPanel',function(){
	$(this).find('.dz-btn,.cj-btn').show();
});
$(document).on('mouseout','.showPanel',function(){
	$(this).find('.dz-btn,.cj-btn').hide();
});
// $('.showPanel').hover(function() {
//
// 	$(this).find('.dz-btn,.cj-btn').show();
// }, function() {
// 	$(this).find('.dz-btn,.cj-btn').hide();
// });

var changTime = function(dateTimeStamp) {
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
	var diffValue = now - dateTimeStamp;
	if(diffValue < 0) { return; }
	var monthC = diffValue / month;
	var weekC = diffValue / (7 * day);
	var dayC = diffValue / day;
	var hourC = diffValue / hour;
	var minC = diffValue / minute;
	if(monthC >= 1) {
		result = "" + parseInt(monthC) + "月前";
	} else if(weekC >= 1) {
		result = "" + parseInt(weekC) + "周前";
	} else if(dayC >= 1) {
		result = "" + parseInt(dayC) + "天前";
	} else if(hourC >= 1) {
		result = "" + parseInt(hourC) + "小时前";
	} else if(minC >= 1) {
		result = "" + parseInt(minC) + "分钟前";
	} else
		result = "刚刚";
	return result;
}
function formatDateTime(inputTime) {
    var date = new Date(parseInt(inputTime));
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
};
