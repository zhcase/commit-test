const METHOD_TYPE = ['post', 'put']
const OBJECT_TYPE = new Map()
OBJECT_TYPE.set('[object String]','string')
OBJECT_TYPE.set('[object Number]','number')
OBJECT_TYPE.set('[object Boolean]','boolean')
OBJECT_TYPE.set('[object Undefined]','undefined')
OBJECT_TYPE.set('[object Null]','null')
OBJECT_TYPE.set('[object Object]','object')
OBJECT_TYPE.set('[object Function]','function')
OBJECT_TYPE.set('[object Array]','array')
OBJECT_TYPE.set('[object Date]','date')
OBJECT_TYPE.set('[object RegExp]','regexp')


//用户提交的数据根据类型进行递归字符串去空格操作
export function stringtrim(method, data) {
  if (METHOD_TYPE.indexOf(method) !==-1) {
    //加入异常处理  避免影响正常的功能提交
    try {
      switch (typeCheck(data)) {
        case 'string':
          data = handleString(data)
          break
        case 'object':
          handleObject(data)
          break
        case 'array':
          handleArray(data)
          break
      }
    }catch(error){
      console.log("处理字符串去空格异常",error)
    }
    console.log("after:",data)
  }
}

//判断入参类型,过滤无需处理的类型，保留需要处理的类型并返回类型
function typeCheck(obj){
  let type = OBJECT_TYPE.get(Object.prototype.toString.call(obj))
  switch (type){
    case 'string':
    case 'object':
    case 'array':
      return type
    default:
      return null
  }
}
//处理对象类型
function handleObject(obj){
  Object.keys(obj).forEach(function(key){
    switch (typeCheck(obj[key])){
      case 'string':
        obj[key] = handleString(obj[key])
        break
      case 'object':
        handleObject(obj[key])
        break
      case 'array':
        handleArray(obj[key])
        break
    }
  })
}
//处理数组类型
function handleArray(array){
  for(let i = 0,s = array.length; i<s ; i++) {
    switch (typeCheck(array[i])){
      case 'string':
        array[i] = handleString(array[i])
        break
      case 'object':
        handleObject(array[i])
        break
      case 'array':
        handleArray(array[i])
        break
    }
  }
}
//处理字符串类型
function handleString(string){
  return string.trim()
}
