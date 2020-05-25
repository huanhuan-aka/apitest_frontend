//添加项目的弹窗
	$('.btn-addinter2').click(function(){
		var dialog = jqueryAlert({
			'style'   : 'pc',
			'title'   : '添加项目',
			'content' :  $('#addForm2'), //$("#alert-blockquote")
			'modal'   : true,
			'contentTextAlign' : 'left',
			'width'   : '620px',
			'animateType' : 'linear',
			'buttons' :{
				'取消' : function(){
					dialog.close();
				},
				'提交':function(){
					var ifViladate = true;
					var $form = $('.pcAlert').last().find('#addForm2');
					ifViladate = $form.validate('submitValidate');
					if(!ifViladate)return;
					$.ajax({
						url:lemon.config.global.apiUrl+"/project/addProject",
						headers:{"Authorization": $.cookie("sessionId")},
						data:$form.serialize(),
						type:'post',
						dataType:'json',
						async:false, //false表示非异步请求
						success:function(ret){
							if(ret.status=="0"){
								dialog.close();
								window.location.reload();
							}
						}
					});

				}
			}
		})
	});