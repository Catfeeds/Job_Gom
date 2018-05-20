define("mods/isOpenApp",function(require,exports,module) {
    module.exports = {
        init:function(){
            var self=this;
            self.lastCheck=0;
            self.timer=null;
        },
        openApp:function(callback){
            var self=this;
            self.init();
            self.lastCheck = new Date().getTime();
            self.timer=setInterval(function(){
                var now = new Date().getTime();
                var diff = now - self.lastCheck;
                if (diff > 1500) {
                    self.lastCheck = 0;
                    self.closeTimer(self.timer);
                    callback&&callback();
                }
                self.lastCheck = now;
            }, 1000);
        },
        closeTimer:function(){
            clearInterval(this.timer);
        }
    }
});
