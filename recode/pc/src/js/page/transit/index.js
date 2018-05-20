function init(){
    var $num = $("[data-node=timer]");
    var $transitBtn = $("[data-node=transit-btn]");
    var href = $GLOBAL_CONFIG['protocol']+':'+$GLOBAL_CONFIG['staSite'];
    $transitBtn.attr("href",href);
    var i = $num.html();
    var timer = setInterval(function(){
        i--;                
        if(i==0){
            location.href = href;
            clearInterval(timer);  
        }
        $num.html(i);
    },1000);
}
init();