define(['data', 'getdata','data2'], (data,getdata,data2)=>{
	return { name: 'datas', time: Date.now(), data, getdata, data2 }
})