var applist =new Vue({
	el:'#applist',
	data:{
		applist:[],
		index:0
	},
	created:function(){
		var self =this;
//		param  = new Object();
//		param.state='F';
//		param.billtype='报销单';
//		param.index=index;
//       sendUrlCmd(this,"wxApprove","approveList",param,self.initData);
//       wv =plus.webview.currentWebview();
//       console.log(self.billtype);
        self.queryApproveList();
		self.initR();
	},
	ready:function(){
//		mui.plusReady(function(){
//			
//			
//		       var old_back = mui.back;   
//              mui.back = function() {   
//                  var wobj = plus.webview.getWebviewById("Approve1.html");   
//                  console.log(wobj);
//                  wobj.reload(true);   
//                  old_back()   ;
//              }      
//		});
	},
	methods:{
		initR:function(){
			mui.init({
						pullRefresh: {
							container: '#pullrefresh',
//							down: {
//								callback: this.pulldownRefresh
//							},
							up: {
								contentrefresh: '正在加载...',
								callback: this.pullupRefresh
							}
						},
						beforeback:function(){
							if(mui.os.plus){
								var list = plus.webview.currentWebview().opener();  
						    //触发列表界面的自定义事件（refresh）,从而进行数据刷新  
						   		 mui.fire(list, 'refresh');  
						   }
						    //返回true，继续页面关闭逻辑  
						    return true;  
						}
					});
		},
		initData:function(data){
			var self =this;
			if(data){
				for (i=0;i<data.length;i++) {
					self.applist.push(data[i]);
				}
			self.index=self.index+1;
		}
//          self.queryApproveList();
//			self.initR();
		},
		pullupRefresh: function() {
						var self = this;
						setTimeout(function() {
							mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //refresh completed
                              self.queryApproveList();
						}, 1500);
		},
		queryApproveList:function(){
			var self =this;
			param  = new Object();
			param.state='F';
			param.billtype='报销单';
			
			param.index=self.index;
        		sendUrlCmd(this,"wxApprove","approveList",param,self.initData);
			
		},
		list:function(billid,billtype){
			 console.log(billid+"@@@"+billtype);
		}
	}
})
