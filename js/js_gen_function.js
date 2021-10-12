//****************************************************************************
//
//		一般関数
//
//****************************************************************************

// ComboSet
function setCombo(combo, arr){
	for(i=0;i<arr.length;i++){
		$(combo).append($('<option>').html(arr[i]).val(arr[i]));
	}
}

function setComboIdx(combo, arr){
	$(combo).children().remove();
	for(i=0;i<arr.length;i++){
		$(combo).append($('<option>').html(arr[i]).val(i));
	}
}


//==TOGG:E===================================
//クリックで色トグル

function setToggle(className, lineColor, fillColor, fillOpac, selLineColor, selFillColor, selFillOpac){
	$('.'+className).each(function(){
		var clicked = false;
		$(this).on('click', function(){
			clicked = !clicked;
			if(clicked)	{ $(this).css({'fill':selFillColor, 'stroke':selLineColor, 'opacity':selFillOpac});}
			else		{ $(this).css({'fill':fillColor   , 'stroke':lineColor,    'opacity':fillOpac}); }
		});
	});
}


function unsetToggle(className){
	$('.'+className).each(function(){
		$(this).off('click');
	});
}


//****************************************************************************
//
//		イメージビューアー
//
//****************************************************************************

function imageViewerARR(ARR, id){

	//Black Screen
	$('body').append('<DIV ID="id_screen"></DIV>');
	$('#id_screen').css('height', $(window).height());
	$('#id_screen').css('width',  $(window).width());

	//Dialog
	$('body').append('<DIV ID="id_dialog"></DIV>');

	var sclLeft	= document.body.scrollLeft || document.documentElement.scrollLeft;	//スクロール分を取得
	var sclTop	= document.body.scrollTop  || document.documentElement.scrollTop;
	var width	= window.innerWidth;						//画面幅取得
	var height	= window.innerHeight;

	var orig_img_width	= 4000;
	var orig_img_height	= 2828;

	var dia_w	= width-200;
	var dia_h	= Math.floor(orig_img_height*(dia_w/orig_img_width));
	var left	= ((width-dia_w)/2)+parseInt(sclLeft);			//画面の中での真ん中位置+スクロール幅を足す
	var top		= ((height - dia_h) / 2)+parseInt(sclTop);

	$("#id_dialog").css({"left":left, "top":top, "height":dia_h, "width":dia_w});
	$("#id_dialog").append('<img ID="ID_dialog_image" src="img/jpg/'+id+'.jpg" width='+dia_w+' height='+dia_h+' border=0>');

	//NEXT DIV
	$("#id_dialog").append('<DIV class="class_dialog_btn" ID="id_btn_next"></DIV>');
	$("#id_btn_next").css({"left":(dia_w-100), "top":0, "width":100, "height":dia_h});

	$("#id_dialog").append('<DIV class="class_dialog_title" ID="id_btn_next_title">NEXT</DIV>');
	$("#id_btn_next_title").css({"left":(dia_w-100+10), "top":(dia_h/2)-25, "width":100, "height":50});

	//PREV DIV
	$("#id_dialog").append('<DIV class="class_dialog_btn" ID="id_btn_prev"></DIV>');
	$("#id_btn_prev").css({"left":0, "top":0, "width":100, "height":dia_h});

	$("#id_dialog").append('<DIV class="class_dialog_title" ID="id_btn_prev_title">PREV</DIV>');
	$("#id_btn_prev_title").css({"left":10, "top":(dia_h/2)-25, "width":100, "height":50});

	var idx = getIndFromArray(ARR, id);

	//NEXT Click
	$("#id_btn_next,#id_btn_next_title").on('click', function(){
		if(idx>=ARR.length-1) return 0;
		var newID = ARR[++idx][1];
		$('#ID_dialog_image').attr('src', 'img/jpg/'+newID+'.jpg');
	});

	//PREV Click
	$("#id_btn_prev,#id_btn_prev_title").on('click', function(){
		if(idx==0) return 0;
		var newID = ARR[--idx][1];
		$('#ID_dialog_image').attr('src', 'img/jpg/'+newID+'.jpg');
	});

	//Resize
	$(window).resize(function(){
		var h = $(window).height();
		var w = $(window).width();
		$('#id_screen').css('height',h);
		$('#id_screen').css('width', w);
	});

	//Remove
	$('#id_screen').on('click', function(){
		$('#id_dialog').remove();
		$('#id_screen').remove();
	});
}


function getIndFromArray(ARR, id){
	for(i=0;i<ARR.length-1;i++){
		if(ARR[i][1]==id) return i;
	}
}


function imageViewer(img_href){

	//Black Screen
	$('body').append('<DIV ID="id_screen"></DIV>');
	$('#id_screen').css('height', $(window).height());
	$('#id_screen').css('width',  $(window).width());

	//Dialog
	$('body').append('<DIV ID="id_dialog"></DIV>');

	var sclLeft	= document.body.scrollLeft || document.documentElement.scrollLeft;	//スクロール分を取得
	var sclTop	= document.body.scrollTop  || document.documentElement.scrollTop;
	var width	= window.innerWidth;						//画面幅取得
	var height	= window.innerHeight;

	var orig_img_width	= 4000;
	var orig_img_height	= 2828;

	var dia_w	= width-200;
	var dia_h	= Math.floor(orig_img_height*(dia_w/orig_img_width));
	var left	= ((width-dia_w)/2)+parseInt(sclLeft);			//画面の中での真ん中位置+スクロール幅を足す
	var top		= ((height - dia_h) / 2)+parseInt(sclTop);

	$("#id_dialog").css({"left":left, "top":top, "height":dia_h, "width":dia_w});
	$("#id_dialog").append('<img ID="ID_dialog_image" src='+img_href+' width='+dia_w+' height='+dia_h+' border=0>');

	//Remove
	$('#id_screen').on('click', function(){
		$('#id_dialog').remove();
		$('#id_screen').remove();
	});
}


//****************************************************************************
//
//		クイックダイアローグ
//
//****************************************************************************

function quickDialog(w,h,txt,align='left'){

	var SCREEN	= 'id_screen';
	var DIALOG	= 'id_dialog';
	var MENU	= 'id_dialog_menu';
	var CONTENT	= 'id_dialog_content';

	//Black Screen
	$('body').append('<DIV ID="'+SCREEN+'"></DIV>');
	$('#'+SCREEN).css('height', $(window).height());
	$('#'+SCREEN).css('width',  $(window).width());

	//Dialog
	$('body').append('<DIV ID="'+DIALOG+'"><DIV ID="'+MENU+'"></DIV><DIV ID="'+CONTENT+'"></DIV></DIV>');

	var sclLeft	= document.body.scrollLeft || document.documentElement.scrollLeft;	//スクロール分を取得
	var sclTop	= document.body.scrollTop  || document.documentElement.scrollTop;
	var width	= window.innerWidth;	//画面幅取得
	var height	= window.innerHeight;

	var orig_img_width	= w;
	var orig_img_height	= h;

	var dia_w	= width-200;
	var dia_h	= Math.floor(orig_img_height*(dia_w/orig_img_width));
	var left	= ((width-dia_w)/2)+parseInt(sclLeft);			//画面の中での真ん中位置+スクロール幅を足す
	var top		= ((height - dia_h) / 2)+parseInt(sclTop);

	$('#'+DIALOG).css({"left":left, "top":top, "height":dia_h, "width":dia_w});

	$('#'+MENU).css({"width":dia_w-5});
	$('#'+MENU).html('<SPAN ID="id_dialog_close">■閉じる</SPAN>');

	$('#'+CONTENT).css({"height":dia_h-50, "width":dia_w-5, "text-align":align});
	$('#'+CONTENT).append(txt);

	$(SCREEN).fadeIn("400");

	//Remove
	$('#'+SCREEN+', #id_dialog_close').on('click', function(){
console.log('dialog close');
		$('#'+DIALOG).remove();
		$('#'+SCREEN).remove();
	});
}

//****************************************************************************
//
//		クイックダイアローグ
//
//****************************************************************************



