//###########################
// TABLE / DIALOG DECO
//###########################

function set_table_deco(table) {

	$(table + " TD.linkedit").html("<IMG SRC=\"_icon/edit.png\" />");
	$(table + " TD.printflag").html("<IMG SRC=\"_icon/printer.png\" />");
}

function set_table_decoObj(table) {

	table.find("TD.printflag").html("<IMG SRC=\"_icon/printer.png\" />");
	table.find("TD.linkedit").html("<IMG SRC=\"_icon/edit.png\" />");
}

function get_today(){

	var nowdate = new Date();
	var year = nowdate.getFullYear(); // 年 
	var mon  = nowdate.getMonth() + 1; // 月 
	var date = nowdate.getDate(); // 日 

	return (year + "-" + mon + "-" + date);
}

function set_deco_main(targ) {

	targ.find(" TD.printflag"			).html("<IMG SRC=\"../../_icon/printer.png\" />");
	targ.find(" TD.linkedit"			).html("<IMG SRC=\"../../_icon/edit.png\" />");

	targ.find(" TD.money[html!='']").each( function(){
		var val = $(this).html();
		var msign='';
		var out  ='';
		if(val){
			val = val.replace(',','');
			val = val.replace('円','');
			val = Number(val);
			if(val<0){ msign = '-'; val = val*(-1);}
			val = val.toString(10);
			out = val.split(/(?=(?:\d{3})+$)/).join() +'円';
			$(this).html(msign + out);
		}
	});
}

