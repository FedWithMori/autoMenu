/*
 *  联想菜单插件  v0.1
 *  author mori
 *  兼容程度： ie8
 *  数据类型要求为json
 */ 

(function(){
  // 默认数据
  var defaults = {
    obj: null,          // 目标元素
    _input: null,       // 目标输入框
    data: null,         // 总数据
    name: null,         // 列表数据字段名
    status: false       // 是否已经存在菜单dom
  }
  // 生成菜单dom
  function creatSelectHtml(){
    var _div,
        _ul,
        _oData = defaults.data,
        _width =  defaults.obj.clientWidth,
        _height = defaults.obj.clientHeight,
        _style;
    _style = "width: "+_width+"px;line-height: "+_height+"px;";
    if(!defaults.status){
      _div = document.createElement("div");
      _div.setAttribute("class","select-position-wrap");
      _div.setAttribute("style",_style);
      _ul = document.createElement("ul");
      _ul.setAttribute("class","select-wrap");
      _div.appendChild(_ul);
      for(var i = 0; i < _oData.length; i++){
        var _li = document.createElement("li");
        var _text = document.createTextNode(_oData[i][defaults.name]);
        _li.appendChild(_text);
        _li.onclick = clickMenu;
        _ul.appendChild(_li);
      }
      defaults.obj.appendChild(_div);
      defaults.status = true;
    }else{
      var _target = document.querySelector(".select-wrap");
      _target.innerHTML = '';
      for(var i = 0; i < _oData.length; i++){
        var _li = document.createElement("li");
        var _text = document.createTextNode(_oData[i][defaults.name]);
        _li.appendChild(_text);
        _li.onclick = clickMenu;
        _target.appendChild(_li);
      }
      show();
    }
  }
  // 封装一个监听方法，兼容ie8
  function addEvent(obj,ev,fn){
    if(window.attachEvent){
      obj.attachEvent("on"+ev,fn);
    }else{
      obj.addEventListener(ev,fn);
    }
  }
  // 隐藏菜单
  function hide(){
    var _obj = document.querySelector(".select-position-wrap");
    _obj.style.display = 'none';
  }
  // 显示菜单
  function show(){
    var _obj = document.querySelector(".select-position-wrap");
    _obj.style.display = 'block';
  }
  //兼容浏览器获取节点文本的方法
  function getText(e)
  {
      var t=""; 
      //如果传入的是元素，则继续遍历其子元素
      //否则假定它是一个数组
      e=e.childNodes||e;
      //遍历所有子节点
      for(var i=0; i<e.length; i++){
          //如果不是元素，追加其文本值
          //否则，递归遍历所有元素的子节点
          t += e[i].nodeType !==1 ? e[i].nodeValue : text(e[i].childNodes);
      }
      //返回区配的文本
      return t;
  }
  // 监听键盘事件
  function keyboardEv(e){
    var ev = e || event,
        key = ev.keyCode || ev.which,
        _li = document.querySelectorAll(".select-wrap li"),
        flag = false;
    switch(key){
      // 回车操作
      case 13: 
        for(var i=0; i<_li.length; i++){
          if(_li[i].className === "active"){
            var _txt = getText(_li[i]);
            _input.value = _txt;
            break;
          }
        }
        hide();
      break;
      // 上键操作
      case 38:
        for(var i=0; i<_li.length; i++){
          if(_li[i].className === "active"){
            _li[i].className = "";
            var j = i !== 0 ? i-1 : _li.length-1;
            _li[j].className = "active";
            flag = true;
            break;
          }
        }
        if(!flag){
          _li[_li.length-1].className = "active";
        }
      break;
      // 下键操作
      case 40:
        for(var i=0; i<_li.length; i++){
          if(_li[i].className === "active"){
            _li[i].className = "";
            var j = i !== _li.length-1 ? i+1 : 0;
            _li[j].className = "active";
            flag = true;
            break;
          }
        }
        if(!flag){
          _li[0].className = "active";
        }
      break;
    }
  }
  // 菜单点击事件
  function clickMenu(){
    var _this = this;
    defaults._input.value = _this.innerText;
  }
  // 监听事件
  function listen(){
    defaults._input = defaults.obj.querySelector("input");
    addEvent(defaults._input,"blur",function(){
      setTimeout(hide,80);
    });
    addEvent(defaults._input,"keyup",keyboardEv);
  }
  // 对外提供的方法集
  var api = {
    // 初始化方法
    init: function (className,option){
            defaults.obj = document.querySelector(className);
            defaults.data = option.data;
            defaults.name = option.name;
            if(!defaults.status){
              listen();
            }
            creatSelectHtml();
    }
  }
  // 暴露在外的api
  this.autoMenu = api;
})()

























