(function(){
  function setRem(){
    var oSize;
    if(document.documentElement.clientWidth > 750){
      var oSize = 100;
    }else{
      oSize = document.documentElement.clientWidth/7.5;
    }
    var oHtml = document.getElementsByTagName('html')[0];
    oHtml.style.fontSize = oSize + 'px';
  }
  window.addEventListener("resize", setRem);
  setRem();
})();
