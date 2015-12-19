/**
 * Created by 51ibm on 2015-12-19.
 */
var svgNS = 'http://www.w3.org/2000/svg';
var oParent = document.getElementById('div1');
var centerX = oParent.offsetWidth/2;
var centerY = oParent.offsetHeight/2;

var circleNum = 9;
var angleNum = 390/circleNum;
var centerR	 = 150;
var otherData = [];

for(var i=0;i<circleNum;i++){
    var y = Math.sin(i*40*Math.PI/180)*centerR + centerY;
    var x = Math.cos(i*40*Math.PI/180)*centerR + centerX;
    otherData.push({x : x , y : y , text : i});
}


var data = {
    centerNode : { text : 'svg' },
    otherNode : otherData
};

function createTag(tag,objAttr){
    var oTag = document.createElementNS(svgNS , tag);
    for(var attr in objAttr){
        oTag.setAttribute(attr , objAttr[attr]);
    }
    return oTag;
}

function addTag(){

    var oSvg = createTag('svg',{'xmlns':svgNS,'width':'100%','height':'100%'});

    for(var i=0;i<data.otherNode.length;i++){
        addOtherTag( data.otherNode[i] , oSvg );
    }

    var oG = createTag('g',{'style':'cursor:pointer'});
    var oCircle = createTag('circle',{'cx':centerX,'cy':centerY,'r':'40','fill':'white','stroke':'#ff6e27','stroke-width':'1'});
    var oText = createTag('text',{'x':centerX,'y':centerY+8,'font-size':'20','text-anchor':'middle'});
    oText.innerHTML = data.centerNode.text;

    oG.appendChild(oCircle);
    oG.appendChild(oText);

    oSvg.appendChild(oG);
    oParent.appendChild(oSvg);
}

addTag();

function addOtherTag(otherAttr , oSvg){

    var oG = createTag('g',{'style':'cursor:pointer','class':'lineStyle'});
    var oLine1 = createTag('line',{'x1':otherAttr.x,'y1':otherAttr.y,'x2':centerX,'y2':centerY,'stroke':'#ccc'});
    var oLine2 = createTag('line',{'x1':otherAttr.x,'y1':otherAttr.y,'x2':centerX,'y2':centerY,'stroke':'transparent','stroke-width':'10'});
    var oRect = createTag('rect',{'x': (otherAttr.x + centerX)/2 - 10 ,'y': (otherAttr.y + centerY)/2 - 10 ,'fill':'#999','width':'20','height':'20','rx':'5'});
    var oText = createTag('text',{'x':(otherAttr.x + centerX)/2,'y':(otherAttr.y + centerY)/2 + 8,'fill':'white','font-size':'20','text-anchor':'middle'});
    //oText.innerHTML = '?';

    oG.appendChild(oLine1);
    oG.appendChild(oLine2);
    //oG.appendChild(oRect);
    oG.appendChild(oText);

    oSvg.appendChild(oG);


    var oG = createTag('g',{'style':'cursor:pointer','class':'circleStyle'});
    var oCircle = createTag('circle',{'cx':otherAttr.x,'cy':otherAttr.y,'r':'30','fill':'white','stroke':'#ff6e27','stroke-width':'1'});
    var oText = createTag('text',{'x':otherAttr.x,'y':otherAttr.y+8,'font-size':'20','text-anchor':'middle'});
    oText.innerHTML = otherAttr.text;

    oG.appendChild(oCircle);
    oG.appendChild(oText);

    oSvg.appendChild(oG);

}

bindTag();

function bindTag(){
    var aLine = document.getElementsByClassName('lineStyle');
    var aCircle = document.getElementsByClassName('circleStyle');

    for(var i=0;i<aCircle.length;i++){
        aCircle[i].onmouseenter = function(){
            startMove( this.getElementsByTagName('circle')[0] , 30 , 40 );
            var prevLine = this.previousElementSibling;
            prevLine.getElementsByTagName('line')[0].setAttribute('stroke','#ff008a');
            //prevLine.getElementsByTagName('rect')[0].setAttribute('fill','red');

        };
        aCircle[i].onmouseleave = function(){
            startMove( this.getElementsByTagName('circle')[0] , 40 , 30 );
            var prevLine = this.previousElementSibling;
            prevLine.getElementsByTagName('line')[0].setAttribute('stroke','#ccc');
            //prevLine.getElementsByTagName('rect')[0].setAttribute('fill','#999');
        };
    }
    for(var i=0;i<aLine.length;i++){
        aLine[i].onmouseenter = function(){
            this.getElementsByTagName('line')[0].setAttribute('stroke','blue');
            //this.getElementsByTagName('rect')[0].setAttribute('fill','red');
            var prevCircle = this.nextElementSibling;
            startMove( prevCircle.getElementsByTagName('circle')[0] , 30 , 40 );
        };
        aLine[i].onmouseleave = function(){
            this.getElementsByTagName('line')[0].setAttribute('stroke','#ccc');
            //this.getElementsByTagName('rect')[0].setAttribute('fill','#999');
            var prevCircle = this.nextElementSibling;
            startMove( prevCircle.getElementsByTagName('circle')[0] , 40 , 30 );
        };
    }

}

function startMove(obj,r1,r2){
    var nowR = r1;
    var overR = r2;
    obj.speed = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){

        obj.speed += (overR - nowR)/6;
        obj.speed *= 0.9;

        if( Math.abs(overR - nowR)<=1 && Math.abs(obj.speed)<=1 ){
            clearInterval(obj.timer);
            obj.setAttribute( 'r' , overR );
        }
        else{
            nowR += obj.speed;
            obj.setAttribute( 'r' , nowR );
        }

    },30);
}
