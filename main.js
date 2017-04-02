function autoattack(){

	var tarX;
	var tarY;

	canvas = document.getElementsByClassName("place-canvas")[0]
	ctx = canvas.getContext('2d');
	img = ctx.getImageData(0,0,1000,1000);

	//convert to black/white representation
	rep = [];
	for(y = 0; y < 1000; y++){
		rep[y]=[];
		for(x = 0; x < 1000; x++){
			var i = (x + y * 1000 ) * 4;
			if(img.data[i] == 34 && img.data[i+1] == 34 && img.data[i+2] == 34)
				rep[y][x] = 1;
			else
				rep[y][x] = 0; 
		}
	}
	//x,y are inverted
	//next, we make a set of weighted setbags
	sets = [new Set(),new Set(),new Set(),new Set(),new Set(),new Set(),new Set(),new Set(),new Set(),new Set()]
	// check in this order
	// 1 2 3
	// 8 X 4
	// 7 6 5
	for(y = 0; y < 1000; y++){
		for(x = 0; x < 1000; x++){
			var cnt = 0;
			if(x != 0 && y != 0)cnt += rep[y-1][x-1];
			if(y != 0)cnt += rep[y-1][x];
			if(y !=0 && x != 999) cnt += rep[y-1][x+1];
			if(x != 999) cnt += rep[y][x+1];
			if(x != 999 && y != 999)cnt += rep[y+1][x+1];
			if(y != 999)cnt += rep[y+1][x];
			if(y != 999 && x != 0) rep[y+1][x-1];
			if(x != 0) rep[y][x-1];
			if(rep[y][x] == 1) cnt = 9
			sets[cnt].add({"x":x, "y":y});
		}
	}
	//lets do some totals
	console.log("Set status: 0:" +sets[0].size+", 1:" +sets[1].size+", 2:" +sets[2].size+", 3:" +sets[3].size+", 4:" +sets[4].size);
	console.log("Set status: 5:" +sets[5].size+", 6:" +sets[6].size+", 7:" +sets[7].size+", 8:" +sets[8].size+", 9:" +sets[9].size);
	console.log("Set total:"+(sets[0].size+sets[1].size+sets[2].size+sets[3].size+sets[4].size+sets[5].size+sets[6].size+sets[7].size+sets[8].size+sets[9].size))

	if( sets[8].size > 0 ){
		var k = sets[8].keys();
		var ret;
		for(i = Math.floor(Math.random()*sets[8].size);i >= 0;i--){
			ret = k.next();
			tarX = ret.value.x;
			tarY = ret.value.y;
		}
	}else if( sets[7].size > 0 ){
		var k = sets[7].keys();
		var ret;
		for(i = Math.floor(Math.random()*sets[7].size);i >= 0;i--){
			ret = k.next();
			tarX = ret.value.x;
			tarY = ret.value.y;
		}
	}else if( sets[6].size > 0 ){
		var k = sets[6].keys();
		var ret;
		for(i = Math.floor(Math.random()*sets[6].size);i >= 0;i--){
			ret = k.next();
			tarX = ret.value.x;
			tarY = ret.value.y;
		}
	}else if( sets[5].size > 0 ){
		var k = sets[5].keys();
		var ret;
		for(i = Math.floor(Math.random()*sets[5].size);i >= 0;i--){
			ret = k.next();
			tarX = ret.value.x;
			tarY = ret.value.y;
		}
	}else if( sets[4].size > 0 ){
		var k = sets[4].keys();
		var ret;
		for(i = Math.floor(Math.random()*sets[4].size);i >= 0;i--){
			ret = k.next();
			tarX = ret.value.x;
			tarY = ret.value.y;
		}
	}else if( sets[3].size > 0 ){
		var k = sets[3].keys();
		var ret;
		for(i = Math.floor(Math.random()*sets[3].size);i >= 0;i--){
			ret = k.next();
			tarX = ret.value.x;
			tarY = ret.value.y;
		}
	}else if( sets[2].size > 0 ){
		var k = sets[2].keys();
		var ret;
		for(i = Math.floor(Math.random()*sets[2].size);i >= 0;i--){
			ret = k.next();
			tarX = ret.value.x;
			tarY = ret.value.y;
		}
	}

	console.log("attacking "+tarX+","+tarY);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/api/place/draw.json", true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	xhr.setRequestHeader("x-modhash",document.getElementById("config").innerHTML.match(/"modhash": "(\w+)"/)[1]);
	xhr.setRequestHeader("x-requested-with","XMLHttpRequest");
	xhr.send("x="+tarX+"&y="+tarY+"&color=3");

}
autoattack();
setInterval(autoattack, 302000);
