
const NA	= '';			//NA

//****************************************************************************
// ALIGN
//****************************************************************************

const CNT	= 'center';
const RHT	= 'right';
const LFT	= 'left';

//****************************************************************************
// TABLE
//****************************************************************************

const NW	= 'NOWRAP';		//行Wrap無

const TABLE_COL_NAME	= 0;
const TABLE_TITLE		= 1;
const TABLE_ALIGN		= 2;	//CNT/RHT/LFT
const TABLE_WIDTH		= 3;
const TABLE_WRAP		= 4;	//NW/WP

//****************************************************************************
// DIALOG
//****************************************************************************

//入力制限
const RQ	= 'RQ';	//必須
const RO	= 'RO';	//閲覧のみ
const UQ	= 'UQ';	//必須UNIQUチェック

//値 FIELD_VALUE
const SRL	= 'SRL';  //数値
const NUM	= 'NUM';  //数値
const STR	= 'STR';  //文字列
const DAT	= 'DAT';  //日付
const BOO	= 'BOO';  //真偽

//入力欄タイプ
const TEXT	= 'TEXT';  //text
const COMB	= 'COMB';  //combobox
const AREA	= 'AREA';  //area
const CHCK	= 'CHCK';  //checkbox

//FIELD
const DIA_COL_NAME		= 0;
const DIA_COL_TITLE		= 1;
const DIA_INPUT_ID		= 2;
const DIA_INPUT_TYPE	= 3;
const DIA_INPUT_CONST	= 4;
const DIA_DATA_TYPE		= 5;
const DIA_INPUT_MAX		= 6;


//****************************************************************************
// [DIALOG]  INPUT Decoration
//****************************************************************************

function dialog_setFieldDeco(ST){
	
	for(i=0;i<ST.length;i++){
		if(ST[i][DIA_INPUT_TYPE]==TEXT)  $("#"+ST[i][DIA_INPUT_ID]).attr('maxlength', ST[i][DIA_INPUT_MAX]);

		switch(ST[i][DIA_INPUT_CONST]){
		case RO:$("#"+ST[i][DIA_INPUT_ID]).css({"background-color":"#CCC"});
				$("#"+ST[i][DIA_INPUT_ID]).attr({"READONLY":true});
				break;
		case RQ:$("#"+ST[i][DIA_INPUT_ID]).css({"border-color":"RED"});
				break;
		//case UQ:$("#"+ST[i][DIA_INPUT_ID]).css({"border-color":"BLUE"});
		//		break;
		}
		
		//ここでArrayの指定ミスもCheck BooleanのCheckbox等
	}
}

//****************************************************************************
// [DIALOG]  INPUT 値チェック
//****************************************************************************

function dialog_checkFieldGetArray(ST){

	var IsErr = false;
	var ARR   = {};
	var value ='';

	for(i=0;i<ST.length;i++){
		switch(ST[i][DIA_INPUT_TYPE]){
		case TEXT:
		case AREA:
			$("#"+ST[i][DIA_INPUT_ID]).css({'background-color':'white'});		//Reset White
			value = $("#"+ST[i][DIA_INPUT_ID]).val().trim();

			//Req
			if(ST[i][DIA_INPUT_CONST]==RQ && !value){
				$("#"+ST[i][DIA_INPUT_ID]).css({'background-color':'pink'});	//Warning Pink
				IsErr = true;
				console.log('Error:['+ST[i][DIA_COL_TITLE]+']は必須'); //ErrorMsg -> 
			}
			
			//DataType
			switch(ST[i][DIA_DATA_TYPE]){
			case STR:
				value = Z2H(value);
				break;
			case NUM:
				if(value.match(/([^(\d).+-])/)){
					IsErr = true;
					console.log('Error:['+ST[i][DIA_COL_TITLE]+']に数字以外混入'); //ErrorMsg -> 
				}
				if(value=='') value=0;
				break;
			case DAT:
				console.log(value.search(/^\d{4}\/\d{1,2}\/\d{1,2}$/));		//これでは不十分
				if(value.search(/^\d{4}\/\d{1,2}\/\d{1,2}$/)){
					IsErr = true;
					console.log('Error:['+ST[i][DIA_COL_TITLE]+']にフォーマット[YYYY/M/D]不正'); //ErrorMsg -> 
				}
				break;
			}
			//console.log(value);
			break;
		case COMB:
			break;
		case CHCK:
			break;
		}

		//配列に保存：エラー発生で保存中断
		if(!IsErr) ARR[(ST[i][DIA_COL_NAME])] = value;
	}
	if(IsErr) return false; else return ARR;
}

//****************************************************************************
// [DIALOG]  SQL select
//****************************************************************************

function dialog_SQL_select(ST, TABLE_NAME, COL_IDX_NAME, COL_IDX){

	var IsErr = false;
	var sql   = '';

	for(i=0;i<ST.length;i++){
		sql += ST[i][DIA_COL_NAME]+',';
	}
	return "SELECT "+sql.substr(0,sql.length-1)+" FROM "+TABLE_NAME+" WHERE "+COL_IDX_NAME+"='"+COL_IDX+"'";
}

//****************************************************************************
// [TABLE]  SQL select
//****************************************************************************

function dialog_SQL_select(TB, TABLE_NAME, COL_IDX_NAME='', COL_IDX='', ORDER_IDX='', LIMIT_NUM=0){

	var IsErr = false;
	var sql   = '';

	for(i=0;i<TB.length;i++) sql += TB[i][TABLE_COL_NAME]+',';

	sql = "SELECT "+sql.substr(0,sql.length-1)+" FROM "+TABLE_NAME;
	if(COL_IDX_NAME && COL_IDX){ sql += " WHERE "+COL_IDX_NAME+"='"+COL_IDX+"'"; }
	if(ORDER_IDX)			   { sql += " ORDER BY "+ORDER_IDX; }
	if(LIMIT_NUM)			   { sql += " LIMIT "+LIMIT_NUM; }

	return sql;
}

//****************************************************************************
// [TABLE]  set Table
//****************************************************************************

function dialog_SQL_setTable(TB, data, class_header){

	console.log(TB);

	var table = '<TABLE><THEAD>';
	for(i=0;i<TB.length;i++) table += "<TH>"+TB[i][TABLE_TITLE]+"</TH>";
	table += "</THEAD><TBODY>";
	for(i=0;i<data.length;i++){
		table += "<TR>";
		for(j=0;j<TB.length;j++){
			table += "<TD class='"+class_header+"_col_"+j+"'>"+data[i][TB[j][TABLE_COL_NAME]]+"</TD>";
		}
		table += "</TR>";
	}
	table += "</TABLE>";
//console.log(table);
	return table;
}

//****************************************************************************
// [TABLE]  set Table DECO
//****************************************************************************

function dialog_SQL_setTableDeco(TB, TABLE_ID, class_header){

	for(i=0;i<TB.length;i++){
console.log("TD[class='"+class_header+"_col_"+i+"']"+"   "+TB[i][TABLE_ALIGN]);
		$(TABLE_ID+" TD[class='"+class_header+"_col_"+i+"']").css({'text-align':TB[i][TABLE_ALIGN]});
	}
}

//****************************************************************************
// 全角半角コンバーター
//****************************************************************************

function Z2H(val) {
	var regex = /[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g;

	val = val.replace(regex, function(s) {
		return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
	})
	.replace(/[～‐－―]/g, '-') // ハイフンなど
	.replace(/　/g, ' ');  // スペース
	return val;
}

//****************************************************************************
// [VALUE]  SQL getValue(Single)
//****************************************************************************

function SQL_getValue(DB, SQL){

	$.ajax({//総数
		url     : "table_1_getTotal.php",
		type    : "post",
		dataType: "html",
		success : function(data, status, xhr) { $('#id_input_search_jancode').val(data);}
	});

	
	
	return "SELECT "+sql.substr(0,sql.length-1)+" FROM "+TABLE_NAME+" WHERE "+COL_IDX_NAME+"='"+COL_IDX+"'";
}

















