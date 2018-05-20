/**
 * @author fuqiang
 * @date 20160708
 * @fileoverview 预生产调试切换分支debugjs - 移动版
 * <script type='text/javascript'>var feature_list = <?php echo $feature_list;?>;</script>
 */

(function(win, doc) {

  var utils = {
    $: function(id) {
      return doc.getElementById(id);
    },
    css: function(ele, styles) {
      for (var style in styles) {
        if (styles.hasOwnProperty(style)) {
          ele.style[style] = styles[style];
        }
      }
    },
    addEvent: function(ele, type, fn) {
      utils.$(ele).addEventListener(type, fn);
    },
    removeEvent: function(ele, type, fn) {
      utils.$(ele).removeEventListener(type, fn);
    },
    setCookie: function(name, value, expiresHours) {
      var cookieString = name + "=" + win.escape(value);
      if (expiresHours > 0) {
        var date = new Date();
        date.setTime(date.getTime() + expiresHours * 3600 * 24 * 1000);
        cookieString = cookieString + "; expires=" + date.toGMTString() + ";path=/";
      }
      document.cookie = cookieString + ";path=/";
    },
    removeCookie: function(name) { //删除键值对（通过设置过期时间）
      var date = new Date().getTime() - 1;
      document.cookie = name + "=" + win.escape(utils.getCookie(name)) + ";expires=" + new Date(date).toUTCString();
    },
    getCookie: function(name) { //获取键对应的值
      var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
      if (arr !== null) {
        return win.unescape(arr[2]);
      }
      return "";
    },
    innerStyle: function(className, styles, usePrivate) {
      var privateName = utils.innerStyle.setPrivateClassName;
      var hasStyleTag = utils.$('debug_private');
      var style = hasStyleTag || doc.createElement('style');
      if (!hasStyleTag) {
        style.id = 'debug_private';
        var parentNode = doc.getElementsByTagName('head')[0] || doc.body;
        parentNode.appendChild(style);
      }
      for (var i in styles) {
        if (styles.hasOwnProperty(i)) {
          var cssText;
          var useP = !usePrivate && privateName;
          if ((/^-\d+$/gi).test(i)) {
            cssText = className + ' { ' + (useP ? ('.' + privateName + ' ' + styles[i]) : styles[i]) + '}';
          } else {
            cssText = className + ' {' + i + ':' + styles[i] + '}';
            cssText = useP ? '.' + privateName + ' ' + cssText : cssText;
          }
          if(style.styleSheet){
            style.styleSheet.cssText = cssText;
          }else{
            style.appendChild(doc.createTextNode(cssText));
          }
        }
      }
    }
  };

  function debugTools(panel, consts) {
    this.panel = panel || doc.createElement('div');
    this.consts = consts || win.feature_list;
    this.markId = '__debug_mark';
    this.submitBtnId = '__btnOk';
    this.selectId = '__branchSelect';
    this.panelClassName = 'debug_panel_private';
    this.isShow = false;
    this.width = '80%';
    utils.innerStyle.setPrivateClassName = this.panelClassName;
    this.init();
  }

  debugTools.prototype = {
    constructor: debugTools,
    setClass: function() {
      var panelIsShow = this.isShow;
      utils.innerStyle('.btn', {
        "background": "#3498db;",
        "background-image": "-webkit-linear-gradient(top, #3498db, #2980b9);",
        "-webkit-border-radius": "28;",
        "-moz-border-radius": "28;",
        "border-radius": "28px;",
        "font-family": "Arial;",
        "color": "#ffffff;",
        "font-size": "14px;",
        "padding": "10px 20px 10px 20px;",
        "display": "block",
        "margin-top": "10px",
        "border": "none",
        "text-decoration": "none;"
      });
      utils.innerStyle('.btn:hover', {
        "background": "#3cb0fd;",
        "background-image": "-webkit-linear-gradient(top, #3cb0fd, #3498db);",
        "text-decoration": "none;"
      });
      utils.innerStyle('li', {
        'margin-top':'10px;'
      });
      utils.innerStyle('ul', {
        color:'#000;',
        padding:'0px;',
        margin:'100px 10px 10px 30px;',
        'list-style-type':'none;',
        'max-height':'200px;',
        'overflow-y':'scroll'
      });
      utils.innerStyle('.debug_panel_private', {
        width: this.width,
        height: '100%',
        color: '#fff',
        'box-shadow': 'rgba(80, 80, 80, 0.41) 0 0 3px 3px',
        position: 'fixed',
        'z-index': '999999999',
        bottom: '0%',
        right: panelIsShow ? this.width : '-' + this.width,
        transition: 'all .3s ease',
        'padding-left': '5px;',
        'background-color': 'rgba(255, 255, 255, 1)'
      }, true);
      utils.innerStyle('.toggle_trigger', {
        position: 'absolute',
        top: '50%',
        'margin-top': '-15px',
        'height': '0px',
        'width': '0px',
        'border-width': '15px;',
        'border-style': 'dashed dashed dashed dashed ;',
        'border-color': 'transparent transparent transparent transparent ;',
        left: '-15px',
        display: 'block',
        "-webkit-transform": "rotate(90deg);",
        'border-left': '15px solid #e66161;',
        'border-top': '15px solid #e66161;',
        'border-right': '15px solid #e66161;'
      });
    },
    createDiv: function() {
      var self = this;
      var panel = this.panel;
      panel.className = this.panelClassName;
      this.panel.innerHTML = '<ul>' +
        (function() {
          var str = '';
          for (var i = 0; i < self.consts.length; i++) {
            var item = self.consts[i];
            var isSelected = item.is_current ? 'checked="true"' : '';
            str += '<li><input name="'+self.selectId+'" type="radio" ' + isSelected + ' value="' + item.id + '">' + item.branch_title + '</li>';
          }
          return str;
        })() +
        '</ul>' +
        '<a href="javascript:;" id="' + this.markId + '" class="toggle_trigger"></a>' +
        '<input type="button" class="btn" id="' + this.submitBtnId + '" value="确定" />';
      doc.body.appendChild(this.panel);
    },
    bindEvents: function() {
      var self = this;
      utils.addEvent(this.markId, 'click', function() {
        if (self.isShow) {
          self.hidePanel();
        } else {
          self.showPanel();
        }
      });
      utils.addEvent(this.submitBtnId, "click", function() {
        var inputs = doc.getElementsByName(self.selectId);
        var id = '';
        for(var i=0;i<inputs.length;i++){
            var item = inputs[i];
            if(item.checked){
                id = item.value;
                break; 
            }
        }
        if(!id){
            alert('请选择一个分支'); 
        }
        var data = self.findData(id);
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            utils.setCookie(key, data[key]);
            console.log(id,key,data[key],data);
          }
        }
        location.reload();
      });
    },
    findData: function(id) {
      for (var i = 0; i < this.consts.length; i++) {
        if (this.consts[i].id === id) {
          return this.consts[i];
        }
      }
    },
    showPanel: function() {
      this.panel.style.right = '0%';
      utils.css(utils.$(this.markId), {
        "-webkit-transform": "rotate(270deg)",
        "left": "-5px"
      });
      utils.css(this.panel, {
        "right": "0%"
      });
      this.isShow = true;
    },
    hidePanel: function() {
      utils.css(utils.$(this.markId), {
        "-webkit-transform": "rotate(90deg)",
        "left": "-15px"
      });
      utils.css(this.panel, {
        "right": '-' + this.width,
      });
      this.isShow = false;
    },
    init: function() {
      this.setClass();
      this.createDiv();
      this.bindEvents();
    }
  };


  win.addEventListener('load',function(){
    win.debugTools = new debugTools();
  });

})(this, document);
