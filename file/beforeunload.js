window.addEventListener('load', () => {

  /* 
  浏览器页面离开时
  保存离开时间
  保存fm中的文件

  */
  window.addEventListener('beforeunload', save)


  /* 
  打开数据库test.info
  打开数据库test.file

  输出test.info
  输出遍历test.file
  
  */
  load()


})


function save () {
  let infoDB = localforage.createInstance({ name: 'test', storeName: 'info' })
  let fileDB = localforage.createInstance({ name: 'test', storeName: 'file' })

  infoDB.setItem('lastCloseTime', new Date())
  fm.files.forEach(file => {
    fileDB.setItem(file.name, file)
  })
  return true
}

function load(){
  let infoDB = localforage.createInstance({ name: 'test', storeName: 'info' })
  let fileDB = localforage.createInstance({ name: 'test', storeName: 'file' })

  infoDB.getItem('lastCloseTime').then(lastCloseTime => {
    console.log('上一次关闭时间')
    console.log(typeof lastCloseTime.toNormalString === 'function' ? lastCloseTime.toNormalString() : lastCloseTime)
  })

  let files = new Set()
  fileDB.iterate((file, name, no) => {
    console.log(no, name, file)
    files.add(file)
  }).then(() => {
    console.log('文件读取完毕')
    console.log(files)
  })
}