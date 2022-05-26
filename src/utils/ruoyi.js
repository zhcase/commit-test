/**
 * 通用js方法封装处理
 * Copyright (c) 2019
 */

const baseURL = process.env.VUE_APP_SYSTEM_URL

// 日期格式化
export function parseTime(time, pattern) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		} else if (typeof time === 'string') {
			time = time.replace(new RegExp(/-/gm), '/')
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

//处理带有特殊日期 如：2021-10-14T11:09:47.000+0800
export function formateDate(time, format) {
  var t = new Date(time);
  var tf = function (i) { return (i < 10 ? '0' : '') + i };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
        break;
      case 'MM':
        return tf(t.getMonth() + 1);
        break;
      case 'mm':
        return tf(t.getMinutes());
        break;
      case 'dd':
        return tf(t.getDate());
        break;
      case 'HH':
        return tf(t.getHours());
        break;
      case 'ss':
        return tf(t.getSeconds());
        break;
    }
  })
}

//处理带有特殊日期 如：2021-10-14T11:09:47.000+0800 转为固定的日期格式 yyyy-MM-dd
export function  formToDate(time){
  if(time==''||time==null||time=='undefind'){
    return "";
  }else {
    var date = new Date(time)
    var year = date.getFullYear()
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return year + '-' + month + '-' + day;
  }
}

// 表单重置
export function resetForm(refName) {
	if (this.$refs[refName]) {
		this.$refs[refName].resetFields()
	}
}

// 添加日期范围
export function addDateRange(params, dateRange) {
	var search = params
	search.beginTime = ""
	search.endTime = ""
	if (null != dateRange && '' != dateRange) {
		search.beginTime = dateRange[0]
		search.endTime = dateRange[1]
	}
	return search
}

// 回显数据字典(根据value取label)
export function selectDictLabel(datas, value) {
	var actions = []
	Object.keys(datas).some((key) => {
		if (datas[key].dictValue == ('' + value)) {
			actions.push(datas[key].dictLabel)
			return true
		}
	})
	return actions.join('')
}

// 回显数据字典(根据label取value)
export function selectDictValue(datas, value) {
  var actions = []
  Object.keys(datas).some((key) => {
    if (datas[key].dictLabel == ('' + value)) {
      actions.push(datas[key].dictValue)
      return true
    }
  })
  return actions.join('')
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
	var actions = []
	var currentSeparator = undefined === separator ? "," : separator
	var temp = value.split(currentSeparator)
	Object.keys(value.split(currentSeparator)).some((val) => {
		Object.keys(datas).some((key) => {
			if (datas[key].dictValue == ('' + temp[val])) {
				actions.push(datas[key].dictLabel + currentSeparator)
			}
		})
	})
	return actions.join('').substring(0, actions.join('').length - 1)
}

// 通用下载方法
export function download(fileName,exportName) {
	// window.location.href = baseURL + "/system/common/download?fileName=" + encodeURI(fileName) + "&delete=" + true
	window.location.href = process.env.VUE_APP_SYSTEM_URL + "/system/common/download?exportName="+exportName+"&fileName=" + encodeURI(fileName) + "&delete=" + true
}

// 字符串格式化(%s )
export function sprintf(str) {
	var args = arguments, flag = true, i = 1
	str = str.replace(/%s/g, function () {
		var arg = args[i++]
		if (typeof arg === 'undefined') {
			flag = false
			return ''
		}
		return arg
	})
	return flag ? str : ''
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
	if (!str || str == "undefined" || str == "null") {
		return ""
	}
	return str
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data, id, parentId, children, rootId) {
  console.log("handleTree->before",data)
	id = id || 'id'
	parentId = parentId || 'parentId'
	children = children || 'children'
	rootId = rootId || Math.min.apply(Math, data.map(item => { return item[parentId] })) || 0
	//对源数据深度克隆
	const cloneData = JSON.parse(JSON.stringify(data))
	//循环所有项
	const treeData = cloneData.filter(father => {
		let branchArr = cloneData.filter(child => {
			//返回每一项的子级数组
			return father[id] === child[parentId]
		})
		branchArr.length > 0 ? father.children = branchArr : ''
    father.isLeaf = father.userId!==null
    father.isUserLeaf = !branchArr.length > 0
    //返回第一层
		return father[parentId] === rootId
	})
  console.log("handleTree->after :data ->",data)
  console.log("handleTree->after :treeData->",treeData)
	return treeData != '' ? treeData : data
}


export function hrefDown(href,fileName) {
  const x = new XMLHttpRequest()
  x.open('GET', href, true)
  x.responseType = 'blob'
  x.onload = (e) => {
    // 会创建一个 DOMString，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 document 绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。
    const url = window.URL.createObjectURL(x.response)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
  }
  x.send()
}

//千分符转换
export function dataConversionToStr(num){
  let reg = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
  return String(num).replace(reg, '$&,');
}

//千分符转换
export function dataConversionToIntegerBit(num){
  if (!num) return 0
  // 获取整数部分
  const intPart = Math.trunc(num)
  // 整数部分处理，增加,
  const intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  // 预定义小数部分
  let floatPart = ''
  // 将数值截取为小数部分和整数部分
  const valueArray = num.toString().split('.')
  if (valueArray.length === 2) { // 有小数部分
    floatPart = valueArray[1].toString() // 取得小数部分
    return intPartFormat + '.' + floatPart
  }
  return intPartFormat + floatPart
}

// 输入框为数字类型，不允许存在2.3.3连续小数点。（此时value为空，但输入框未清空，手动清空）
export function handleBlurDots (item) {
  if (item === '') {
    setTimeout(() => {
      item = '';
    }, 60);
  }
  // 去除整数前的0和小数点后多余的0，如011.020300 =》 11.0203
  const reg1 = /0*([1-9]\d*|0\.\d+)/;
  const reg2 = /(?:\.0*|(\.\d+?)0+)$/;
  item = item.replace(reg1, '$1').replace(reg2, '$1');
  return item;
}

/**
 * 输入框数字/金额输入限制处理
 * @param {Number} amount 源值
 * @param {Number} integers 整数保留位数(最小值需传入1)
 * @param {Number} decimals 小数保留位数(0表示不要小数)
 * @param {Boolean} positiveFlag 是否支持负数(true为支持，false为不支持)
 */
export function  buildInputAmount(amount,integers,decimals,positiveFlag){
  console.log(amount,"///amount 258")
    let tempInteger = Number(integers);
    let tempDecimals = Number(decimals) + 1;
    var n = String(amount)
    var t = n.charAt(0)
    // 先把非数字的都替换掉，除了数字和.
    n = n.replace(/[^\d\.]/g, '')
    // 必须保证第一个为数字而不是.
    n = n.replace(/^\./g, '')
    // 保证只有出现一个.而没有多个.
    n = n.replace(/\.{2,}/g, '.')
    // 保证.只出现一次，而不能出现两次以上
    n = n.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    // 如果第一位是负号，则允许添加
    if (t === '-' && positiveFlag) {
      n = '-' + n
    }
    let tempA = '';
    let tempB = '';
    if(n.indexOf('.') != -1){
      tempA = n.substring(0,n.indexOf('.'));
      tempB = n.substring(n.indexOf('.'));
    }else{
      tempA = n;
    }
    console.log(tempA,"///temp a");
    console.log(tempB,"///temp b")
    //正数纯数字的保留8位整数
    if(t != '-' && tempA.length > tempInteger){
      tempA = tempA.substring(0,tempInteger);
    }else if(t == '-' && tempA.length >= tempInteger + 1){
      tempA = tempA.substring(0,tempInteger+1);
    }
    //小数点后位数限制处理
    if(tempB.length > tempDecimals){
      tempB = tempB.substring(0,tempB.length - 1);
    }
    if(decimals == 0){
      return tempA;
    }
    return tempA + tempB;
}

//base64的转换为文件
export function  dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime,
  });
}
