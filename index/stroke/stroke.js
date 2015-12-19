/**
 * Created by 51ibm on 2015-12-19.
 */



    var strokeStart=document.getElementById('strokeStart');
var closeStroke=document.getElementById('closeStroke');
var oImage=document.getElementById('img');
var iTimer=null;
console.log(strokeStart)
strokeStart.onclick=function(){
    clearTimeout(iTimer);
    iTimer=setTimeout(function(){oImage.style.opacity="1";},12000)
}
closeStroke.onclick=function(){
    oImage.style.opacity="0";


}

