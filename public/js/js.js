


	function showImg(id){

	    $('#pin_view_layer').show();
			$.ajax({
				type: "get",
				url: '/imgs/details/',
				data: { "id": id },
				async: true,
				success: function(data) {
					if(data.status == 0)
					 alert("数据连接失败！！");
					else if(data.status == 1) {

						var imglist=data.result.imglist;

						if(imglist.length>0){
						 var htmlImg="";
						 for(var t=0;t<imglist.length;t++){
							 htmlImg+='<a href="javascript:;" onclick="showImg('+imglist[t]['id']+')" class="cell x layer-view"><img src="/upload/'+imglist[t].imgurl+'" width="100%">'+
							 '<div class="cover"></div>'+
						 '</a>';
						 }

               $('#board_pins_waterfall').empty().append(htmlImg);
							 var options =
							 {
								 srcNode: 'a',             // grid items (class, node)
								 margin: '0px',             // margin in pixel, default: 0px
								 width: '120px',             // grid item width in pixel, default: 220px
								 max_width: '',              // dynamic gird item width if specified, (pixel)
								 resizable: true,            // re-layout if window resize
								 transition: 'all 0.5s ease' // support transition for CSS3, default: all 0.5s ease
							 }
							 $('.grid').gridify(options);
						}



          var imgData= data.result.imgData;
					$('.brown-link').text("@"+imgData.username);
					$('#pin_view_add_comment').attr('data-id',imgData.id);
             $('#image_holder').empty().append('<img src="/upload/'+imgData.imgurl+'"/>');
						var htmlInfo='<a href="javscript:;" class="img x"><img src="/avatar/'+imgData.avatar+'" class="avt"></a>'+
 						'<div class="main">'+
 							'<a href="javscript:;" >'+imgData.username+'</a>'+
 						'</div>'+
 						'<div class="sub">发布于<span class="ts-words space">'+formatDateTime(imgData.create_time)+'</span></div>';

					  $('.info').empty().append(htmlInfo);
            $('.description').empty().text(imgData.description);
						var  htmlMore='<a href="javascript:;" class="img x"><img src="/avatar/'+imgData.avatar+'"  class="avt"></a>'
						+'<a href="javascript;;" class="name x">其他作品</a>'
						+'<div class="sub">'+imgData.username+'</div>';
						$('.board-info').empty().append(htmlMore);
						 var comments=data.result.comments;
						 	var htmlComment="";
					  if(comments.length>0){
                $('.comment-btn').find('.num').text(comments.length);
               for(var i=0;i<comments.length;i++){
								 var fontClass="";
														if(comments[i].type==1){
															fontClass='masked';

														}
								 htmlComment+='<div class="comment">'+
									 '<a href="javscript:;"  class="img x">'+
										 '<img src="/avatar/'+comments[i]['avatar']+'"  class="avatar"></a>'+
										 '<div class="meta">'+
												'<a href="javascript:;" class="author" style="display:inline-block">'+comments[i]['username']+'</a>&nbsp;-&nbsp;<span  class="ts-words"> '+formatDateTime(comments[i]['create_time'])+'</span>说：'+
												 '<!-- <a href="javascript:;" class="fr"  data-id="2305340">删除</a> -->'+
											 ' <a href="javascript:;" class="fr" style="margin:0 10px" data-id="'+comments[i]['id']+'">回复</a>'+
										 '</div>'+
												'<div class="text '+fontClass+'">'+comments[i]['content']+'</div>'+
											'</div>';
							 }


						}
 $('.comments').empty().append(htmlComment);

					 }
				 }
			});


	}
	function hideImg(){
		  $('#pin_view_layer').hide();
	}
function  addcomment(username,avatar) {
		var content = $("#comment-textarea").val();
		if(!content || content == "") {
			return alert('内容不能为空');
		}
		var create_time = new Date().getTime();
		$.ajax({
			type: "post",
			url: "/comments/add",
			async: true,
			data: { "content": content, "create_time": create_time,"img_id":$('#pin_view_add_comment').attr('data-id')},
			success: function(data) {
				if(data.status == 0) {
					alert(data.error);
					return;
				} else if(data.status == 1) {
					 var fontClass="";
											if(data.type==1){
												fontClass='masked';

											}


										var 	htmlComment='<div class="comment">'+
												'<a href="javscript:;"  class="img x">'+
													'<img src="/avatar/'+avatar+'"  class="avatar"></a>'+
													'<div class="meta">'+
														 '<a href="javascript:;" class="author" style="display:inline-block">'+username+'</a>&nbsp;-&nbsp;<span  class="ts-words"> '+formatDateTime(create_time)+'</span>说：'+
															'<!-- <a href="javascript:;" class="fr"  data-id="2305340">删除</a> -->'+
														' <a href="javascript:;" class="fr" style="margin:0 10px" data-id="1">回复</a>'+
													'</div>'+
														 '<div class="text '+fontClass+'">'+content+'</div>'+
													 '</div>';

					$('.comments').append(htmlComment);
								$("#comment-textarea").val("");
				}

			}
		});
}
