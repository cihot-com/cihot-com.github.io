const fs=require('fs');
let userdata;
try{
	userdata=require('./userdata.js');
}catch(e){
	userdata=[];
}

function authorization(user,password){
	return userdata.some((e)=>e.user===user&&e.password===password);
}


