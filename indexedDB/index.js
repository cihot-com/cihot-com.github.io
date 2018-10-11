let x;
if('indexedDB' in window) {
  // 支持
  console.log('support indexedDB');

  x=idb('test1');
} else {
  // 不支持
  alert('no support indexedDB');
}



function idb(dbname='test',version=undefined){
	// success：打开成功。
	// error：打开失败。
	// upgradeneeded：第一次打开该数据库，或者数据库版本发生变化。
	// blocked：上一次的数据库连接还未关闭。

	let req=indexedDB.open(dbname,version);
	var ret = {req};

	req.onupgradeneeded = function(e) {
		// 创建只能在版本升级中进行。
		console.log("Upgrading...");
		var db=ret.db=ret.req.result;

		db.onerror=function(e){
			console.warn(e.message);
		};

		console.log(db.objectStoreNames);

		// if(!db.objectStoreNames.contains("main")) {
 	// 	    db.createObjectStore("main", {keyPath:'title'});
		// }
		ret.main=db.createObjectStore("main2", {keyPath:'title'});



		// db.createObjectStore("firstOS");
		// db.createObjectStore("test", { keyPath: "email" }); 
		// db.createObjectStore("test2", { autoIncrement: true });

		// abort：事务中断。 complete：事务完成。 error：事务出错。
		// t = db.transaction(["main"],"readwrite");
		// t.oncomplete = function(event) {
		// 	var o=t.objectStore('main');

		// }
	}
	 
	req.onsuccess = function(e) {
		req.db = e.target.result;
		console.info("Success!", req.db.name);
	}
	 
	req.onerror = function(e) {
		console.error(e);
		req.error=e;
	}
	return ret;
}





let dbs=[];

function conn(name,version) {
	return new Promise(function (y,n){
		let request=indexedDB.open(name,version);
		request.addEventListener('upgradeneeded',(e)=>{
			console.log(e.type);
			e.target.removeEventListener(e.type,e.callee);
			y({e,request});
			uq=request; db=request.result; console.log(uq,db);
			dbs.push(db);

			db.createObjectStore('book');

			db.onversionchange=function(e){
				console.log('db.onversionchange', e);
			}
		});
		request.addEventListener('success',(e)=>{
			e.target.removeEventListener(e.type,e.callee);
			console.warn(e.type, request.readyState);
			dbs.push(db);
			q=e.target;db=e.target.result;console.log(q,db);

			y(request);
		});
		request.addEventListener('error',(e)=>{
			console.log(e.type,request.error);
			e.target.removeEventListener(e.type,e.callee);
			n(request.error);
		});
		// request.addEventListener('blocked',(e)=>{
		// 	console.warn(e.type, e.oldVersion, e.newVersion, e.dataLoss, e.dataLossMessage);
		// 	e.target.removeEventListener(e.type,e.callee);
		// 	n({e,request});
		// 	q=e.target; console.log(q,db);
		// });
	});
}


// conn('test');
// conn('test',2);
// conn('test',5);


/*

lang==>

macthing--->

tag
lang

<segment> {md5, language:'cn', translations:{ ...<segment> }, }



*/