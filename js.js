var time;
var pause;
var win_flag = true;
var d_big = new Array(10);      //保存大DIV当前装的小DIV的编号

var d_direct=new Array(         //保存大DIV编号的可移动位置编号,比如第一块可以去2,4号位置
        [0],
        [2,4], 
        [1,3,5],
        [2,6],
        [1,5,7],
        [2,4,6,8],
        [3,5,9],
        [4,8],
        [5,7,9],
        [6,8]
    );

var d_posXY=new Array(      // 保存大div中9个小方格的坐标（left,top）
        [0],
        [0,0],     // 1
        [150,0],   // 2
        [300,0],   // 3
        [0,150],   // 4
        [150,150], // 5
        [300,150], // 6
        [0,300],   // 7
        [150,300], // 8
        [300,300]  // 9
    );

var d = new Array();

d[1]=1;d[2]=2;d[3]=3;d[4]=4;d[5]=5;d[6]=6;d[7]=7;d[8]=8;d[9]=0;     //默认按照顺序排好，大DIV第九块没有，所以为0，我们用0表示空白块


function move(id){      // 移动
    var direct ;
    var target = 0;             // 可去的位置
    var position ;          // 位置

    for(var i = 1;i<=9 ;i++){
            if(d[i] == id) position = i;
    }

    direct = d_direct[position];

    console.log("id :%d position: %d direct: %s d[i]:%s",id,position,direct.toString(),d.toString());

    for(var i=0;i<direct.length;i++){       // 找到可移动的位置
            if(d[direct[i]] === 0){
                target = direct[i] ;
                break;
            }
    }

    console.log("target:%d",target);

    if(target != 0){
         replace(position,target);
    }

    for(var i = 1; i<d.length; i++){
        if(d[i] != i){
            win_flag = false;
        }
    }
    if(win_flag === true){
        alert("you win !");
    }
}

function whereCanTo(cur_div){

}

function timer(){
    var data = document.getElementById("timer");
    var minute = parseInt(time/60);
    var second = time%60;
    data.innerHTML = minute+"分"+second+"秒";
    time++;
}

function start(){
    // 如果是暂停状态按钮就显示开始，开始状态就显示暂停
    if(pause){
        var data = document.getElementById("start").innerHTML = "暂停";
        pause = false;
        intervalID = setInterval(timer,1000);
    }else{
        var data = document.getElementById("start").innerHTML = "开始";
        pause = true;
        clearInterval(intervalID);
    }
}

function reset(){
    time = 0;
    pause = true;
    random_d();
    document.getElementById("start").innerHTML = "开始";
    document.getElementById("timer").innerHTML = "0分0秒";
    clearInterval(intervalID);
 //   start();
}

function random_d(){
    for(var i=9; i>1; i--){
        var data = random_data();

        replace(i,data); 
    }
}

function replace(i,data){       // 交换第i个和第data个位置上的方块
        if(d[i] != 0){
           // alert("i:"+i+"d[i]"+d[i]);
            document.getElementById("d"+d[i]).style.left = d_posXY[data][0]+"px";
            document.getElementById("d"+d[i]).style.top = d_posXY[data][1]+"px";
        }

        if(d[data] != 0){
            document.getElementById("d"+d[data]).style.left = d_posXY[i][0]+"px";
            document.getElementById("d"+d[data]).style.top = d_posXY[i][1]+"px";
        }

        var temp;
        temp = d[data];
        d[data] = d[i];
        d[i] = temp;
}

function random_data(){     // 随机生成1~9的整数
    var data;
    while(true){
        var data = Math.random()*10;
        data = parseInt(data);
        if(data>=1 && data<=9)  break;
    }
    return data;
}

//初始化函数，页面加载的时候调用重置函数，重新开始
window.onload=function(){
    reset();
}