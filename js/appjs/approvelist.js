var applist =new Vue({
	el:'#applist',
	data:{
		applist:[],
		index:0
	},
	created:function(){
		var self =this;
		mui.plusReady(function (){
			self.queryApproveList();
			self.initR();
		})
        
	},
	ready:function(){


         mui("#query").on('tap','a',function(){
         	  console.log("点击了搜索");
         });
	},
	methods:{
		initR:function(){
			mui.init({
						pullRefresh: {
							container: '#pullrefresh',
							down: {
								callback: this.pulldownRefresh
							},
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
		pulldownRefresh:function(){
			     var self = this;
			     setTimeout(function() {
							mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
                              self.queryApproveList();
						}, 1500);
		},
		queryApproveList:function(){
			var self =this;
			param  = new Object();
			param.state='F';
			param.billtype='报销单';
			
			param.index=self.index;
			
			if(mui.os.plus){
				 var curWB =plus.webview.currentWebview();
				 param.billtype=curWB.billtype;
				 param.username=curWB.username;
			}else{
				 param.username=localStorage.getItem("username");
			}
			
        		sendUrlCmd(this,"wxApprove","querynotapps",param,self.initData);
			
		},
		list:function(billid,billtype){
			 mui.openWindow({
    	        	             	url: 'ApproveInfo.html',
							id: 'approveInfo', 
							extras: {
								billtype:billtype,
								billid:billid
							}
    	        	    })
		}
	}
});

function search(){
	  var search_sender =document.getElementById("search_sender").value;
	  var search_dept  =document.getElementById("search_dept").value;
	  if((search_sender==null&&search_sender==undefined&&search_sender=='')||(search_dept==null&&search_dept==undefined&&search_dept=='')){
	  	   mui.toast("请输入查询条件");
	  }
	  console.log(applist.index);
	        param  = new Object();
			param.state='F';
			param.billtype='报销单';
			
			param.index=0;
			param.sender=search_sender;
			param.dept=search_dept;
			if(mui.os.plus){
				 var curWB =plus.webview.currentWebview();
				 param.billtype=curWB.billtype;
				 param.username=curWB.username;
			}else{
				 param.username=localStorage.getItem("username");
			}
	 		 sendUrlCmd(this,"wxApprove","querynotapps",param,function (data){
	  	       applist.applist=data;
	  	       applist.index=0;
	  	       mui('#topPopover').popover('hide');
			});
	  }

