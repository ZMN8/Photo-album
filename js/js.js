/**
 * Created by Administrator on 2016/8/27.
 */
var leftNode=document.querySelector(".leftIcon");
var rightNode=document.querySelector(".rightIcon");
var imgPlay=document.querySelector(".imgPlay");
var playLiNodes=imgPlay.querySelectorAll("li");
var boxnode=document.querySelector(".box");
var imgDIVRight=document.querySelector(".imgDIV_right");
var imgDIVLeft=document.querySelector(".imgDIV_left");
var imgDIVUl=document.querySelector(".imgDIV").querySelector("ul");
var liNodes=imgDIVUl.querySelectorAll("li");
/*鼠标移动事件*/
boxnode.onmousemove= function (e) {
    var event=window.event||e;
    var x=event.pageX;
    var y=event.pageY;
    var height=boxnode.clientHeight;
    var width=boxnode.clientWidth;
    if(y<=height && x<width/2){
        leftNode.style.display="";
        rightNode.style.display="none";
    }else if(y<=height && x>=width/2){
        leftNode.style.display="none";
        rightNode.style.display="";
    }else{
        leftNode.style.display="none";
        rightNode.style.display="none";
    }
    if(liNodes[0].className.indexOf("current")!=-1){//当移到最左边时，左边箭头消失
        leftNode.style.display="none";
    }
    if(liNodes[liNodes.length-1].className.indexOf("current")!=-1){//当移到最右边时，右边箭头消失
        rightNode.style.display="none";
    }
};
/*点击向左箭头*/
leftNode.onclick=function(){
    var oldPos,newPos;
        for(j=0;j<liNodes.length;j++){
            if(liNodes[j].className.indexOf("current")!=-1){
                oldPos=j;
                break;
            }
        }
    newPos=oldPos-1;
    if(newPos<0){
        leftNode.style.display="none";
        return false;
    }
    liNodes[oldPos].className="";//下面的li的旧位置取消类
    liNodes[newPos].className="current";
    playLiNodes[newPos].style.display="";
    opacityFun1(playLiNodes[oldPos],100);
    opacityFun0(playLiNodes[newPos],0);

    if(newPos>=4 && newPos<=7){//在第5张图和第8张图之间的动画处理
            MoveliLeft(0,newPos);
    }

}
/*点击向右箭头*/
rightNode.onclick=function(){
    var oldPos,newPos;
    for(j=0;j<liNodes.length;j++){
        if(liNodes[j].className.indexOf("current")!=-1){
            oldPos=j;
            break;
        }
    }
    newPos=oldPos+1;
    if(newPos>liNodes.length-1){
        rightNode.style.display="none";
        return false;
    }
    liNodes[oldPos].className="";
    liNodes[newPos].className="current";
    playLiNodes[newPos].style.display="";
    opacityFun1(playLiNodes[oldPos],100);
    opacityFun0(playLiNodes[newPos],0);
    if(newPos>=4 && newPos<=7){//在第5张图和第8张图之间的动画处理
            MoveliRight(0,newPos);
    }
};
/*透明度从1-0*/
function opacityFun1(obj,num) {
    num-=4;
    if(num>=0){
        obj.style.opacity=num/100;
        obj.style.filter="alpha(opacity="+num+")";
         opa=setTimeout(function(){
            opacityFun1(obj,num);
        },10)
    }else{
        obj.style.display="none";
    }

}
/*透明度从0-1*/
function opacityFun0(obj,num) {
    num+=4;
    if(num<=100){
        obj.style.opacity=num/100;
        obj.style.filter="alpha(opacity="+num+")";
        opa=setTimeout(function(){
            opacityFun0(obj,num);
        },10)
    }else{
        obj.style.display="";
    }

}

/*点击下面向右箭头*/
imgDIVRight.onclick=MoveFunRight;
function MoveFunRight() {
    var marginLeft=parseFloat(imgDIVUl.style.marginLeft);
    var clientWidth=parseFloat(document.body.clientWidth);
    var liwidth=parseFloat(liNodes[1].clientWidth)
    console.log(liwidth);
    if(marginLeft>-605){
        marginLeft-=11;
        imgDIVUl.style.marginLeft=marginLeft+"px";
        setTimeout(MoveFunRight,5);
    }
}
/*点击下面向左箭头*/
imgDIVLeft.onclick=MoveFunLeft;
function MoveFunLeft(){
    var marginLeft=parseFloat(imgDIVUl.style.marginLeft);
    if(marginLeft<0){
        marginLeft+=11;
        imgDIVUl.style.marginLeft=marginLeft+"px";
        setTimeout(MoveFunLeft,5);
    }
}
/*点击下面li的事件*/
for(i=0;i<liNodes.length;i++){
    liNodes[i].index=i;
    liNodes[i].onclick=function(){
        var oldPos;
        if(this.className=="current"){//点击当前有样式就退出函数
            return false;
        }
        for(j=0;j<liNodes.length;j++){//找到旧的位置
            if(liNodes[j].className.indexOf("current")!=-1){
                oldPos=j;
                break;
            }
        }
        liNodes[oldPos].className="";//旧的位置失去样式
        liNodes[this.index].className="current";//当前的位置加上样式
        playLiNodes[this.index].style.display="";//展示当前的大图
        opacityFun1(playLiNodes[oldPos],100);//旧的大图隐藏
        opacityFun0(playLiNodes[this.index],0);//新的大图显示

        if(this.index>=4 && this.index<=7){//在第5张图和第8张图之间的动画处理
            if(oldPos<this.index){//右移
                MoveliRight(0,this.index);
            }
            if(oldPos>this.index){//左移
                MoveliLeft(0,this.index);
            }
        }
    }
}
/*第5张图和第8张图之间的动画处理--右移*/
function  MoveliRight(num,index){
    var marginLeft=parseFloat(imgDIVUl.style.marginLeft);//得到当前下面ul向左移动的距离
    if(marginLeft>-148*(index-3)){//148为一个li移过去的距离 表示要移过去 index-3 个li的距离
        marginLeft-=4;
        imgDIVUl.style.marginLeft=marginLeft+"px";
        setTimeout(function () {
            MoveliRight(num,index)
        },10);
    }
}
/*第5张图和第8张图之间的动画处理--左移*/
function  MoveliLeft(num,index){//得到当前下面ul向左移动的距离
    var marginLeft=parseFloat(imgDIVUl.style.marginLeft);
    if(marginLeft<-605+148*(8-index)){//148为一个li移过去的距离 表示要移过去 8-index 个li的距离
        marginLeft+=4;
        imgDIVUl.style.marginLeft=marginLeft+"px";
        setTimeout(function() {
            MoveliLeft(num,index)
        },10);
    }
}