var app1 =new Vue({
	el:"#app",
    data:{
    	   bxgl:'',
    	   yfgl:'',
    	   htgl:'',
    	   xzgl:'',
    	   urls:[]
    	   
    },
    created:function(){
    	     var self =this;
//  	    	 param  = new Object();
//       sendUrlCmd(this,"wxApprove","approveIndex",param,self.initData);
		 initDatas(self);
		 self.initR();
      	
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
							styles: {  
        						top: 5 //新页面顶部位置  
       
                            },  
							extras: {
								billtype:billtype
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
		 	 param  = new Object();
	         sendUrlCmd(this,"wxApprove","approveIndex",param,app.setData);
	};
	

