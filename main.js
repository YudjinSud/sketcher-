var canvas = document.getElementById("paint");
var colorList = document.getElementById("color-list");
var tool = document.getElementById("tool");
var widthList = document.getElementById("depth-list");
var opacityList = document.getElementById("opacity-list");
var cx = canvas.getContext("2d")
var cur_tool = 1;
var width = 0;
var opacity = 0; 
var lastColor = "rgb(255, 0, 0)";
cx.strokeStyle = "rgb(255, 0, 0)";
cx.lineJoin = "round";
cx.lineCap = "round";
cx.globalAlpha = 0.1

function getX(event) {
	return event.offsetX == undefined ? event.layerX : event.offsetX;
}

function getY(event) {
	 return event.offsetY == undefined ? event.layerY : event.offsetY;
}

var ondown = 0;
// если мышка зажата - прибавляем ++, если отжата убавляем, для проверки что зажата + над канвасом

canvas.onmousedown = function (event) {
	ondown++;
	let x = getX(event);
	let y = getY(event);
	canvas.onmousemove = function(event) {
      if (ondown > 0) {
		    let x1 = getX(event);
		    let y1 = getY(event);
			  cx.beginPath();
			  if (cur_tool == 1) {
				  cx.moveTo(x,y);
				  cx.lineTo(x1, y1);
				  cx.stroke();
			  } else {
				    cx.moveTo(x,y);
				    if (x === x1 && y === y1) return;
				    cx.lineTo(x1, y1);
				    cx.stroke();
  				  x = x1;
  				  y = y1;
			  } 
		  }
	  }
 }

canvas.onmouseup = function (event) {
	ondown--;
}

colorList.onchange = function (event) {
	color = this.options[this.selectedIndex].value;
	switch (color) {
		case 'Красный' : cx.strokeStyle = "rgb(255, 0, 0)";break;
		case 'Розовый' : cx.strokeStyle = "rgb(255, 0, 255)";break;
		case 'Синий' : cx.strokeStyle = "rgb(0, 0, 255)";break;
		case 'Голубой' : cx.strokeStyle = "rgb(0, 255, 255)";break;
		case 'Зеленый' : cx.strokeStyle = "rgb(0, 255, 0)";break;
		case 'Желтый' : cx.strokeStyle = "rgb(255, 255, 0)";break;
	}

}

tool.onchange = function (event) {
    tool_item = this.options[this.selectedIndex].value;
    switch (tool_item) {
	case 'Лучи' : cur_tool = 1; 
		document.getElementById('opacities').style.display='block';
		document.getElementById('color').style.display='block';
            	cx.globalAlpha = parseFloat(opacityList.value);
            	if (cx.strokeStyle == "#ffffff") {
                	cx.strokeStyle = lastColor;
              	}
		break;
	case 'Карандаш' : cur_tool = 2; 
              cx.globalAlpha = 1;
	      document.getElementById('color').style.display='block';
	      document.getElementById('opacities').style.display='none';
              if (cx.strokeStyle == "#ffffff") {
                cx.strokeStyle = lastColor;
              }
	      break;
	case 'Ластик' : cur_tool = 3; 
            lastColor = cx.strokeStyle;
	    cx.strokeStyle = "white";
            cx.globalAlpha = 1;
	    document.getElementById('opacities').style.display='none';
	    document.getElementById('color').style.display='none';
	    break;
	}

}

widthList.onchange = function(event) {
	width = this.options[this.selectedIndex].value;
	cx.lineWidth = parseFloat(width);
}

opacityList.onchange = function(event) {
	opacity = this.options[this.selectedIndex].value;
	cx.globalAlpha = parseFloat(opacity);
}
