//****************************************************************************
//
//		描画関数 (PATH)
//
//****************************************************************************

function setPath(SVG, id, _class, path,
				stroke_t			= 1,			// 線太さ
				stroke_color	= '#000',	// 線色
				fill_color		= 'none',	// 背景色
				opac				= 1,			// 透明0 - 不透明1
				line_dash		= ''			// 破線'100 150' 連続線0
	){
	if(!path) return 0;

	try{
		var obj = document.createElementNS('http://www.w3.org/2000/svg','path');
		obj.setAttribute('id',				id);
		obj.setAttribute('class',			_class);
		obj.setAttribute('d',				path);
		obj.setAttribute('stroke-width',	stroke_t);
		obj.setAttribute('stroke',			stroke_color);
		if(line_dash) obj.setAttribute('stroke-dasharray',line_dash);
		obj.setAttribute('fill', 			fill_color);
		obj.setAttribute('fill-rule',		'evenodd');
		obj.setAttribute('opacity',			opac);

		$(SVG).append(obj);
	}catch(e){
		console.log('error: SVG drawing');
	}
}

//==地図ファイルの<PATH>読み込みとHOVER===================================
function setPathFromFile(targetSvg, fName, className,
			lineT				= 100,		//線太さ100~1000
			lineColor		= '#000',	//線色
			fillColor		= 'none',	//フィル色
			opac				= 1,			//1:不透明-0:透明
			clickColor		= 0,			//clickで色を変えるか
			newLineColor	= 'RED',		//
			newFillColor	= '#FCC',	//
			line_dash		= 1			// 破線0
	){
	$.ajax({
		url:	fName,
		success:function(data){
			$(data).find('.'+className).each(function(i, elem){						//ファイル読み込み
				$d  = $(elem).attr("d");
				$id = $(elem).attr("id");
   				if($d && $id) setPath(targetSvg, $id, className, $d, lineT, lineColor, fillColor, opac, line_dash);	//SVG表示
			});

			if(clickColor){
				$(targetSvg).find('.'+className).each(function(){				//クリックで色トグル
					var clicked = false;
					$(this).on('click', function(){
						clicked = !clicked;
						if(clicked){ $(this).css({'fill':newFillColor,'stroke':newLineColor}); }
						else	   { $(this).css({'fill':fillColor,   'stroke':lineColor}); }
					});
				});
			}
		}
	});
};


//****************************************************************************
//
//		描画関数 (USE)
//
//****************************************************************************

function setPathUse(SVG, id, _class, href, _x, _y, w, h,
				stroke_t		= 1,		// 線太さ
				stroke_color	= '#000',	// 線色
				fill_color		= 'none',	// 背景色
				opac			= 1,		// 透明0 - 不透明1
				line_dash		= ''		// 破線'100 150' 連続線0
	){
	try{
		var obj = document.createElementNS('http://www.w3.org/2000/svg','use');
		obj.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', href);

		obj.setAttribute('id',				id);
		obj.setAttribute('class',			_class);
		obj.setAttribute('width',			w);
		obj.setAttribute('height',			h);
		obj.setAttribute('stroke-width',	stroke_t);
		obj.setAttribute('stroke',			stroke_color);
		if(line_dash) obj.setAttribute('stroke-dasharray',line_dash);
		obj.setAttribute('fill', 			fill_color);
		obj.setAttribute('fill-rule',		'evenodd');
		obj.setAttribute('opacity',			opac);

		$(SVG).append(obj);
	}catch(e){
		console.log('error: SVG USE drawing');
	}
}

//****************************************************************************
//
//		描画関数 (USE)+(AnimateMotion)
//
//****************************************************************************

function setPathUseAnimeMotion(SVG, id, _class, href, _x, _y, w, h,
				stroke_t			= 1,			// 線太さ
				stroke_color	= '#000',	// 線色
				fill_color		= 'none',	// 背景色
				anime_begin		= "0s",		// アニメ開始時間
				anime_dur		= "30s",		// 1回の動作時間(秒)
				anime_rotate	= "auto", 	// or "auto-reverse"
				anime_repeat	= "indefinite", // or Number
				mpath_href		= '',			// 動作パスへのリンク
				mpath_id			= '',			// アニメitem ID
				opac				= 1,			// 透明0 - 不透明1
				line_dash		= ''			// 破線'100 150' 連続線0
	){
	try{
		var svgns = 'http://www.w3.org/2000/svg';
		var obj = document.createElementNS(svgns, 'use');
		obj.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', href);
		obj.setAttribute('id',				id);
		obj.setAttribute('class',			_class);
		obj.setAttribute('width',			w);
		obj.setAttribute('height',			h);
		obj.setAttribute('stroke-width',	stroke_t);
		obj.setAttribute('stroke',			stroke_color);
		if(line_dash) obj.setAttribute('stroke-dasharray',line_dash);
		obj.setAttribute('fill', 			fill_color);
		obj.setAttribute('fill-rule',		'evenodd');
		obj.setAttribute('opacity',			opac);
		var animateM = document.createElementNS(svgns, "animateMotion");
		animateM.setAttribute("begin", 		anime_begin);		//Number
		animateM.setAttribute("dur", 		anime_dur);			//Number
		animateM.setAttribute("rotate", 	anime_rotate);		//"auto"
		animateM.setAttribute("repeatCount",anime_repeat);		//"indefinite"
		var animePath = document.createElementNS(svgns, "mpath");
		animePath.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', mpath_href); //
		animePath.setAttribute("id",		mpath_id);
		animateM.appendChild(animePath);
		obj.appendChild(animateM);
		$(SVG).append(obj);
	}catch(e){
		console.log('error: SVG USE ANIME drawing');
	}
}

//****************************************************************************
//
//		描画関数 (TEXT)
//
//****************************************************************************

function setText(SVG, id, className, x, y, textLine, size=10, fill_color='#000',
				anchor		= 'start',	//start/middle/end
				weight		= 'normal',	//normal/bold/bolder/lighter
				family		= 'sans-serif', //sans-serif/serif
				numformat	= false,	//数値のフォーマット // Number(1234.56).toLocaleString();
				appendix	= '',		//後付け文字
				opacity		= 1,		//0:透明 - 1:不透明
				rotate		= 0			//角度
	){
	if(!textLine) return 0;

	try{
		var obj = document.createElementNS('http://www.w3.org/2000/svg','text');
		obj.setAttribute('class', 			className);
		obj.setAttribute('id', 				id);
		obj.setAttribute('x',				x);
		obj.setAttribute('y',				y);
		obj.setAttribute('font-family',	family);
		obj.setAttribute('font-size',		size);
		obj.setAttribute('font-weight',	weight);
		obj.setAttribute('text-anchor',	anchor);
		obj.setAttribute('fill', 			fill_color);
		obj.setAttribute('fill-opacity',	opacity);
		if(rotate>0){ obj.setAttribute('transform','rotate('+rotate+','+x+','+y+')'); }
		if(numformat) textLine=Number(textLine).toLocaleString();

		obj.appendChild(document.createTextNode(textLine+appendix));
		$(SVG).append(obj);
	}catch(e){
		console.log('error: TEXT drawing');
	}
}

//****************************************************************************
//
//		イメージ関数
//
//****************************************************************************

function setImage(SVG, id, _class, href, w, h, x=0, y=0){
	try{
		var obj = document.createElementNS('http://www.w3.org/2000/svg','image');
		obj.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', href);

		obj.setAttribute('id',				id);
		obj.setAttribute('class',			_class);
		obj.setAttribute('width',			w);
		obj.setAttribute('height',			h);
		obj.setAttribute('x',				x);
		obj.setAttribute('y',				y);

		$(SVG).append(obj);
	}catch(e){
		console.log('error: SVG IMAGE drawing');
	}
}

//****************************************************************************
//
//		Other SVG
//
//****************************************************************************

//----------------------------------------------------------------------------------------------
// 描写[円]
//----------------------------------------------------------------------------------------------
//面積でサイズ決定
function drawCircle(_x, _y, Area, coef=1){
	var R = Math.round(Math.sqrt(Area/Math.PI))*coef;
	return 'M '+_x+','+(_y-R)+' a '+R+','+R+' 0 1,1 0,'+(R*2)+' a '+R+','+R+' 0 1,1 0,-'+(R*2)+'z';
}

//指数関数的に増大
function drawCirclePower(_x, _y, R, pow, coef=1){
	var R = Math.round(Math.pow(R,pow))*coef;
	return 'M '+_x+','+(_y-R)+' a '+R+','+R+' 0 1,1 0,'+(R*2)+' a '+R+','+R+' 0 1,1 0,-'+(R*2)+'z';
}

//一定サイズの円
function drawCircleR(_x, _y, R){
	return 'M '+_x+','+(_y-R)+' a '+R+','+R+' 0 1,1 0,'+(R*2)+' a '+R+','+R+' 0 1,1 0,-'+(R*2)+'z';
}
