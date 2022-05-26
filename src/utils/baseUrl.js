let BASEURL;
let REQUEST;// 请求方法
export function setbaseUrl (baseUrl) {
  BASEURL = baseUrl
}

export function getBaseUrl () {
  return BASEURL
}

let ENV;
export function setEnv (env) {
  ENV = env
}

export function getEnv () {
  return ENV
}


export function setRequest (request) {
  REQUEST = request
}


export function getRequest() {
  return REQUEST;
}

