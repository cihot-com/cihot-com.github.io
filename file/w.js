let collections = []

this.onmessage=(e)=>{
  let o = e.data

  if(o.type =='start') start(),this.postMessage(true)

  if(o.type==='get') this.postMessage(collections)

}

function start(){
  let w = new Worker('w2.js')
  w.onmessage = function(e) {
    collections.push(e.data)
  }
}