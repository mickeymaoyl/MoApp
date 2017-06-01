var app1 =new Vue({
	el:"#app",
    
    ready:function(){
    	        
    },
    data:{
    	   bxgl:'',
    	   yfgl:'',
    	   htgl:'',
    	   xzgl:'',
    	   urls:[],
    	   _username:''
    	   
    },
    created:function(){
    	       var self =this;
    	        mui.plusReady(function(){
    	        	       var curWB =plus.webview.currentWebview();
		 	 	   self._username=curWB.username;
		 	 	   console.log(self._username);
		 	 	    initDatas(self);
		            self.initR();
    	        });
//  	    	 param  = new Object();
//       sendUrlCmd(this,"wxApprove","approveIndex",param,self.initData);
         
		
      	
    },
    methods:{
    	
    	        initR:function(){
    	        	    mui.init({
    	        	    	   beforeback:function(){
//  	        	    	   	console.log("aadadadf");
    	        	    	      	plus.webview.getWebviewById("Approve1.html").reload();
    	        	    	   }
    	        	    });
    	        },
    	        setData :function (data){
		                    var self=this;
    	        	            self.bxgl=data.bxgl;
      					self.yfgl=data.yfgl;
      					self.htgl=data.htgl;
      					self.xzgl=data.xzgl;
	},
//  	        initData:function(data){
//  	 
//  	        	            var self=this;
//  	        	            self.bxgl=data.bxgl;
//    					self.yfgl=data.yfgl;
//    					self.htgl=data.htgl;
//    					self.xzgl=data.xzgl;
//    					self.initR();
//  	        },
    	        list:function(billtype){
    	        	    var self =this;
    	        	    
//  	        	    console.log(billtype);
    	        	    mui.openWindow({
    	        	             	url: 'approvelist.html',
							id: 'homesub',  
							extras: {
								billtype:billtype,
								username:self._username
							}
    	        	    });
    	        }
    	
    	
    }
    








});

window.addEventListener('refresh', function(e) {  
//	    console.log("刷新了");
//	    app1.created();
        //location.reload();  
//      document.getElementById('bxglid').innerHTML = '4';  
        initDatas(app1);
}) ;

	function initDatas (app){
		 	 var param  = new Object();
//		 	 queryUserName(app);
		 	 param.username=app._username;
		 	 console.log( app._username);
	         sendUrlCmd(this,"wxApprove","querynotappnums",param,app.setData);
	};
	
	
	function queryUserName(app){
		 	 if(mui.os.plus){		 	 	   
//		 	 	   var curWB =plus.webview.currentWebview();
//		 	 	   app._username=curWB.username;
		 	 	   
		 	 }else{
		 	 	app._username=localStorage.getItem("username");
		 	 }	
	}

