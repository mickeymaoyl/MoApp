var app = new Vue({
      		el: '#app',
      		data: {
      			initIndex: 0, //[初始化参数]
      			title: '首页',
      			activeTab: 'Approve1.html',
      			username:'',
      			tabbar: [],
      			subStyle: {
      				top: '45px',
					bottom: '51px'
      			}
      		},
      		created:function (){
      			// Vue实例化对象
      			var self = this;  

            
             param  = new Object();
             sendUrlCmd(this,"wxApprove","testTab",param,self.initData);
      		},
      		
      		methods: {
				tab: function (index) {	
				
					var targetTab = this.tabbar[index].url;
					// 标题切换
					this.title = this.tabbar[index].title;
					// 子页内容切换
					if(mui.os.plus){
						if(targetTab==this.activeTab){
							return;
						}else{
							console.log("不一样");
						}
//					// 隐藏当前webview
						plus.webview.hide(this.activeTab);
//						// 显示目标webview
						
						
						plus.webview.show(targetTab);
						
						 mui.fire(plus.webview.getWebviewById(targetTab), 'refresh'); 
						// 更改当前活跃的选项卡
						this.activeTab = targetTab;
					}else{
						// 创建iframe代替子页面
						createIframe('.mui-content',{
							url: targetTab,
							style: this.subStyle
						})
					}
				},
				initR:function() {
      			var self = this;  
      				mui.init();
      			
      			// 初始化
      			if(mui.os.plus){
      				mui.plusReady(function() {
	      				var curWs = plus.webview.currentWebview();
	      				for(var i=0;i < self.tabbar.length;i++){
	      					var subUrl = self.tabbar[i].url;
	      					var subWs = plus.webview.create(subUrl, subUrl, self.subStyle,{username:curWs.username});
							if(i != self.initIndex){
								subWs.hide();
							}
							curWs.append(subWs);
	      				}	
	      			})
      			}else{
	  
      				createIframe('.mui-content',{
						url: self.tabbar[self.initIndex].url,
						style: self.subStyle
					})
    			}
      		},
      		initData:function(data){
      			
      			var self =this;
      			self.tabbar=data;
      			self.initR();
      		},
      		changeData:function(data){
      			var self=this;
      			self.tabbar=data;
      		}
      		
      		
      	}
      })