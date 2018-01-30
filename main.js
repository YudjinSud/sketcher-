var canvas = document.getElementById("paint");
var text = document.getElementById('changetxt');
var textdown = document.getElementById('mousedown');
var colorList = document.getElementById("color-list");
var tool = document.getElementById("tool");
var depthList = document.getElementById("depth-list");
var opacityList = document.getElementById("opacity-list");
var cx = canvas.getContext("2d")
var cur_tool = 1;
var width = 0;
var opacity = 0; 
cx.strokeStyle = "rgb(255, 0, 0)";
cx.lineJoin = "round";
cx.lineCap = "round";
cx.globalAlpha = 0.1

function func() {
  //let text = document.getElementById('changetxt')
  //text.innerHTML = "Прошло 5 секунд"
};

//setTimeout(func, 5000);

function getX(event) {
	return event.offsetX == undefined ? event.layerX : event.offsetX;
}

function getY(event) {
	 return event.offsetY == undefined ? event.layerY : event.offsetY;
}

canvas.onmousemove = function(event) { 
	//let x = getX(event);
	//let y = getY(event);
	//text.innerHTML = "Курсор над канвасом. Координаты [x: " + x + ", y: " + y + "]";
}

canvas.onmouseout = function (event){
	//let text = document.getElementById('changetxt');
	//text.innerHTML = "Курсор не над канвасом";
}

var ondown = 0;
// если мышка зажата - прибавляем ++, если отжата убавляем, для проверки что зажата + над канвасом

canvas.onmousedown = function (event) {
	ondown++;
	let x = getX(event);
	let y = getY(event);
	canvas.onmousemove = function(event) {
		var x1 = getX(event);
		var y1 = getY(event);
		if (ondown > 0) {
			//textdown.innerHTML = "Курсор зажат над канвасом";
			cx.beginPath();
			//text.innerHTML = "Курсор над канвасом. Координаты [x: " + x1 + ", y: " + y1 + "]";
			if (cur_tool == 1) {
				if (cx.strokeStyle == "#ffffff") {
					cx.strokeStyle = "red";
					colorList.value = "Красный";
				}
				cx.moveTo(x,y);
				cx.lineTo(x1, y1);
				cx.stroke();
			} else if(cur_tool == 2) {
				if (cx.strokeStyle == "#ffffff") {
					cx.strokeStyle = "red";
					colorList.value = "Красный";
				}
				cx.globalAlpha = 1;
				cx.moveTo(x,y);
				if (x === x1 && y === y1) return;
				cx.lineTo(x1, y1);
				cx.stroke();
  				x = x1;
  				y = y1;
			} else {
				cx.globalAlpha = 1;
				cx.moveTo(x,y);
				if (x === x1 && y === y1) return;
				cx.lineTo(x1, y1);
				cx.stroke();
  				x = x1;
  				y = y1;
			}
		} else {		
			//text.innerHTML = "Курсор над канвасом. Координаты [x: " + x1 + ", y: " + y1 + "]";
		}
	}
}

canvas.onmouseup = function (event) {
	ondown--;
	//let text = document.getElementById('mousedown');
	//text.innerHTML = "Курсор не зажат над окном";
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
					  break;

		case 'Карандаш' : cur_tool = 2; 
						  document.getElementById('color').style.display='block';
						  document.getElementById('opacities').style.display='none';
						  break;
		case 'Ластик' : cur_tool = 3; 
						cx.strokeStyle = "white";
						document.getElementById('opacities').style.display='none';
						document.getElementById('color').style.display='none';
						break;
	}

}

depthList.onchange = function(event) {
	width = this.options[this.selectedIndex].value;
	cx.lineWidth = parseFloat(width);
}

opacityList.onchange = function(event) {
	opacity = this.options[this.selectedIndex].value;
	cx.globalAlpha = parseFloat(opacity);
}