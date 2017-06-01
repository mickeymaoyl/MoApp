var appinfo =new Vue({
	 el :'#appinfo',
	 
	 ready:function(){
	 	 mui.init();
	 	 var self=this;
	 	 var param = new Object();
	 	 mui.plusReady(function(){
	 	 	
	 	 	
	 	 	if(mui.os.plus){
		 	 	 var curWB =plus.webview.currentWebview();
		 	 	 param.billid =curWB.billid;
		 	 	 param.billtype=curWB.billtype;
		 	 	 console.log(param.billid);
	 		 }else{
		 	 	 param.billid ='0000';//curWB.billid'';
		 	 	 param.billtype='F-01';//curWB.billtype;
	 		 }
	 	 sendUrlCmd(self,'wxApprove','queryappinfo',param,self.setData)
	 	 	
	 	 });
	 	 
	 },
	 data :{
	 	appData:''
	 },
	 methods:{
	 	
	 	 setData :function (data){
	 	 	var self=this;
	 	 	 this.appData=data;
	 	 },
	 	 test :function(){
	 	 	var templet =plus.io.PRIVATE_DOC;
	 	 	console.log(templet)
	 	 	var dtask = plus.downloader.createDownload( "http://192.168.3.243:8089/img/apple-icon.png", {}, function ( d, status ) {
		// 下载完成
		if ( status == 200 ) { 
			var sd_path = plus.io.convertLocalFileSystemURL(d.filename);
			console.log(sd_path);
			plus.runtime.openFile(d.filename);
			
		} else {
			 console.log( "Download failed: " + status ); 
		}  
	});
	//dtask.addEventListener( "statechanged", onStateChanged, false );
				dtask.start(); 
	 	 	// mui.openWindow("http://192.168.3.243:8089/doc/1.xls");
	 	 }
	 	
	 }
	
})