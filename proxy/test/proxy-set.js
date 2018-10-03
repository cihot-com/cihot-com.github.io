// Proxy 代理并非侦听对象
{
    let o=[1,2,3,4] // 对象
    o.name='o';

    let p=new Proxy(o,{
        set(o,k,v,p){
            console.log('<set>', k,'=', v);
            o[k]=v;
        }
    });// 代理对象


    p[0]=111;

    console.log(o);
}
