


              var getLocalData=function(param){
			  	   return localStorage.getItem(param);
			  };
			  
			  var setLocalData=function(param,value){
                  localStorage.setItem(param,value);
			  };

(function () {
	
	    var _username=getLocalData("username");
	    var _password=getLocalData("password");
	    var _isauto =getLocalData("isauto");
	    var _deviceid='test';
		console.log("启动了");
		mui.init();
		document.addEventListener("plusready",function(){
			   console.log("启动了1");
		},false);
		
		if(mui.os.plus){
			
		
				mui.plusReady(function(){
					_deviceid=plus.device.uuid;
						console.log(_deviceid);
						 var info = plus.push.getClientInfo();
    console.log( "获取客户端推送标识信息：" );
    console.log( "token: "+info.token );
    console.log( "clientid: "+info.clientid );
    console.log( "appid: "+info.appid );
    console.log( "appkey: "+info.appkey );
					    var loginButton = document.getElementById('login');
					    var accountBox = document.getElementById('account');
						var passwordBox = document.getElementById('password');
						var autoLoginButton = document.getElementById("autoLogin");
						autoLoginButton.classList[_isauto ? 'add' : 'remove']('mui-active');
						loginButton.addEventListener("tap",function(event){
							console.log("点击登录");
							    	     login(accountBox.value,passwordBox.value);
						});
						autoLoginButton.addEventListener('toggle',function(event){
							   _isauto=event.detail.isActive;
						});
				
				});
				}else{
					    var loginButton = document.getElementById('login');
					    var accountBox = document.getElementById('account');
						var passwordBox = document.getElementById('password');
						var autoLoginButton = document.getElementById("autoLogin");
						autoLoginButton.classList[_isauto ? 'add' : 'remove']('mui-active');
						loginButton.addEventListener("tap",function(event){
							    	     login(accountBox.value,passwordBox.value);
						});
						autoLoginButton.addEventListener('toggle',function(event){
							   _isauto=event.detail.isActive;
						});
						
				};
               var login =function(username,password){
				   mui.post('http://192.168.3.243:8089/mologin',{
				   	   username:username,
				   	   password:password,
				   	   deviceid:_deviceid
				   },function(data){
				   	      if(data.state==0){
				   	      	  //mainPage();
				   	      	  _username=username;
				   	      	  toMain();
				   	      	  
				   	      	  setLocalData("username",username);
				   	      	  setLocalData("password",password);
				   	      	  setLocalData("isauto",_isauto);
				   	      }else{
				   	      	  mui.toast("登录失败，请重新输入用户名和密码");
				   	      	  document.getElementById("account").value='';
				   	      	  document.getElementById("password").value='';
				   	      }
				   	      
				   },'json')
			 };

                
				var toMain = function() {
//					   var mainPage = mui.preload({
//						"id": 'index',
//						"url": 'index.html'
//				        });
//						mui.fire(mainPage, 'show', null);
						setTimeout(function() {
							mui.openWindow({
								url:'index.html',
								id: 'index',
								show: {
									aniShow: 'pop-in'
								},
								extras:{
									username:_username
								},
								waiting: {
									autoShow: false
								}
							});
						}, 0);
					};
				
//			            if(_isauto){
//							 login(_username,_password);
//						}
			

})();
