let files = localforage.createInstance({name:'files',storeName:'files'})

window.addEventListener('beforeunload',(e)=>{
  localStorage.setItem('leaveTime', new Date().toLocaleString())
  files.setItem('files', fm.files)
  return true
})

