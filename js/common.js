lemon = {
		config :{
				global:{
					rootUrl: document.location.protocol + "//" + document.location.host+"/lemon",
					htmlUrl: document.location.protocol + "//" + document.location.host+"/lemon",
					apiUrl: "http://admin.huanhuan.org/auto"
				}
		},
		core:{
			getParameter:function(property, url) {
				var parseUrl = url;
				if(parseUrl == null){
					parseUrl = String(window.document.location.href);
				}
				var rs = new RegExp("(^|)" + property + "=([^\&#]*)(\&|#|$)", "gi").exec(parseUrl), tmp;
				if (tmp = rs) {
					return tmp[2];
				}
				return "";
			}
		}
};



function attachValidate(selector){
	var form = $(selector).validationEngine('attach', {
		  promptPosition: 'bottomRight',
		  maxErrorsPerField:1,
		  autoHidePrompt:false,
		  autoHideDelay:3000,   
		  scroll: false,
		  focusFirstField:false
		}); 
	return form;
}


function selectMenuAndTurn2Page(menuFindurl,data,turn2Page,refer){
	$.post(menuFindurl,data,function(ret){
		if(ret.status=="1"){
			//一级菜单名
			var firstLevelMenu = ret.data.firstLevelMenu;
			//二级菜单名
			var secondLevelMenu = ret.data.secondLevelMenu;
			var apiId = data.apiId;
			if(refer=="测试集合"){
				window.parent.location.href = turn2Page+"&first="+firstLevelMenu+"&second="+secondLevelMenu+"&apiId="+apiId+"&refer="+refer;
			}else{
				//选中对应菜单
				//先判断当前一级菜单是否已经是选中状态
				if(!parent.$(window.parent.document).find("a:contains("+secondLevelMenu+")").parent("li").parent().hasClass("active")){
					parent.$(window.parent.document).find("a:contains("+firstLevelMenu+")").click();
				}
				//先判断当前二级菜单是否已经是选中状态
				if(!parent.$(window.parent.document).find("a:contains("+secondLevelMenu+")").parent("li").hasClass("active")){
					parent.$(window.parent.document).find("a:contains("+secondLevelMenu+")").click();
				}
				//然后跳转到对应的页面
				window.location.href = turn2Page;
			}
		}
	});
}

function logout(){
	$.ajax({
		//异步请求退出接口
		//将sessionid取出来放到headers中,其中Authorization是后端CustomSessionManager定义的,前端要和后端保持一致
		headers:{"Authorization": $.cookie("sessionId")},
		url: lemon.config.global.apiUrl + "/user/logout",
		type: "get",
		success: function(ret){ //退出成功后,回到登录页面
			if(ret.status=="1" && ret.message=="账号未登录!"){
				location.href = lemon.config.global.rootUrl
								+ "/html/login.html";
			}
		}
	});
}