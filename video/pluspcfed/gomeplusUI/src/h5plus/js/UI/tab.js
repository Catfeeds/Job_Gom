window.onload=function(){
    var tabs=document.getElementById("tab").getElementsByTagName("li");
    var divs=document.getElementById("tabCon").children;
    for(var i=0;i<tabs.length;i++){
        tabs[i].onclick=function(){change(this);}
    }
    function change(obj){
        for(var i=0;i<tabs.length;i++){
            if(tabs[i]==obj){
                tabs[i].className="flex-cell active";
                divs[i].className="tab-page active";
            }else{
                tabs[i].className="flex-cell";
                divs[i].className="tab-page";
            }
        }
    } 
}