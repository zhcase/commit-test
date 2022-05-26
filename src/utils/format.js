/**
 * 各种格式化工具
 */

// 金额格式化
export function priceFormat(num,n){  
  n = n || 2;
 let symbol = ",";
   if (num === null || isNaN(num)) return 0;
  
   if(typeof num!=='number') return 0;
   if(n<0) n = 2;
   let hasDot=parseInt(num)!=num;//这里检测num是否为小数，true表示小数
   let m = (n!=undefined&&n!=null)?n:1;
   num = m == 0?num.toFixed(m)+'.':hasDot?(n?num.toFixed(n):num):num.toFixed(m);
   symbol = symbol||',';
   num = num.toString().replace(/(\d)(?=(\d{3})+\.)/g,function(match, p1,p2) {
       return p1 + symbol;
   });
   //如果n为0或者传入的num是整数并且没有指定整数的保留位数，则去掉前面操作中的小数位
   if(n==0||(!hasDot&&!n)){
       num =  num.substring(0,num.indexOf('.'));
   }
   return num;
}

//去除千分位中的‘，’
export function delcommafy (num){
 if(!num) return 0;
 num = num.toString();
 num = num.replace(/,/gi, '');
 if (num.indexOf('.00') >0){
  num = parseInt(num)
 } else {
  num = parseFloat(num)
 }
 return num;
}

// 处理带有特殊日期 如：2021-10-14T11:09:47.000+0800
export function formateDate(time, format) {
  // time无值时返回空
  if(!time){return ''}
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