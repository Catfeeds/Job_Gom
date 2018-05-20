var Toast = function(msg, time){
  this.msg = msg;
  this.dom = this.createToast();
  this.setContent(msg);
  this.hide(time);
}

Toast.prototype = {
  constructor: Toast,

  createToast: function(){
    var outerDiv = document.createElement("div");
    outerDiv.style.position = "fixed";
    outerDiv.style.zIndex = 999;
    outerDiv.style.bottom = "20%";
    outerDiv.style.width = "100%";
    outerDiv.style.display = "-webkit-box;";
    outerDiv.style.display = "-webkit-flex;";
    outerDiv.style.display = "flex";
    outerDiv.style["-webkitBoxPack"] = "center";
    outerDiv.style["-webkitJustifyContent"] = "center";
    outerDiv.style["justifyContent"] = "center";

    var innerDiv = document.createElement("div");
    innerDiv.style.maxWidth = "60px";
    innerDiv.style.padding = "10px";
    innerDiv.style.border = "1px solid #000";
    innerDiv.style.background = "#000";
    innerDiv.style.opacity = 0.5;
    innerDiv.style.textAlign = "center";
    innerDiv.style.color = "#fff";
    innerDiv.style.fontSize = "12px";

    outerDiv.appendChild(innerDiv);
    document.body.appendChild(outerDiv);
    return outerDiv;
  },

  setContent: function(msg){
    this.dom.getElementsByTagName("div")[0].innerHTML = msg;
    return this;
  },

  setSize: function(width, height){
    //
  },

  resetSize: function(width, height){
    //
  },

  show: function(cb){
    this.dom.style.display = "-webkit-box;";
    this.dom.style.display = "-webkit-flex;";
    this.dom.style.display = "flex";
    typeof cb == "function" &&  cb.apply(this, arguments);
    return this;
  },

  hide: function(time, cb){
    var _this = this;
    setTimeout(function(){
      _this.dom.style.display = "none";
    }, time * 1000);
    typeof cb == "function" && cb.apply(this, arguments);
    return this;
  }
}
