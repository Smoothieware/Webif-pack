var MAX_COLUMN = 50;
var headTop = -1;
var FloatHead1;
var headBottom = 50000;

if(window.applyVendorFilter == undefined) {
	var applyVendorFilter = false;
}
/** Modification start by b11364 on 13-09-07 For CCT47683**/ 
		function expandAllFacets(id){
			var i=2;
				while(true){
					var imgEle = document.getElementById(id+'-'+i);
					var tableEle = document.getElementById(id+'-'+(i+1));

						if(tableEle !=null && tableEle!='undefined'){
							tableEle.style.display="";
							if(imgEle !=null && imgEle!='undefined'){
								var imName = imgEle.src.substring(imgEle.src.lastIndexOf('/')+1);
								if(imName=="clo.gif"){
									imgEle.src=imgEle.src.substring(0,imgEle.src.lastIndexOf('/')+1)+"open.gif";
									imgEle.title =getTranslatedText("Open");
								}
							}
						}else{
							break;
						}
					i = i+2;
				}
				document.getElementById('collapseAll').style.display='';
				document.getElementById('expandAll').style.display='none';
			}
		function collapseAllFacets(id){						
			var i=2;
				while(true){
					var imgEle = document.getElementById(id+'-'+i);
					var tableEle = document.getElementById(id+'-'+(i+1));

						if(tableEle !=null && tableEle!='undefined'){
							tableEle.style.display="none";
							if(imgEle !=null && imgEle!='undefined'){
								var imName = imgEle.src.substring(imgEle.src.lastIndexOf('/')+1);
								if(imName=="open.gif"){
									imgEle.src=imgEle.src.substring(0,imgEle.src.lastIndexOf('/')+1)+"clo.gif";
									imgEle.title =getTranslatedText("Close");
								}
								
							}
						}else{
							break;
						}
					i = i+2;
				}
				document.getElementById('collapseAll').style.display='none';
				document.getElementById('expandAll').style.display='';
				document.getElementById('expandAll').style.float='right';
			}


			
		function expandAllAsset(id){
			var i=2;
				while(true){
					var imgEle = document.getElementById(id+'-'+i);
					var tableEle = document.getElementById(id+'-'+(i+1));

						if(tableEle !=null && tableEle!='undefined'){
							tableEle.style.display="";
							if(imgEle !=null && imgEle!='undefined'){
								var imName = imgEle.src.substring(imgEle.src.lastIndexOf('/')+1);
								if(imgEle.style.display=="none" && imName!= "space2.gif" && imName!= "space1.gif") {
									imgEle.style.display="";
									//if(imgEle.style.visibility=="hidden") imgEle.style.visibility=="visible";
								}else{									
									if(imName=="clo.gif"){
										imgEle.src=imgEle.src.substring(0,imgEle.src.lastIndexOf('/')+1)+"open.gif";
										imgEle.title =getTranslatedText("Open");
									}
									/** Modification start by b11364 on 28-10-07 For CCT47683**/ 
									else if(imName=="space2.gif"){
										imgEle.src=imgEle.src.substring(0,imgEle.src.lastIndexOf('/')+1)+"space1.gif";
										imgEle.title =getTranslatedText("Open");							
									}
									/** Modification End by b11364 on  28-10-07 */
								}
							}
						}else{
							break;
						}
					i = i+2;
				}
				document.getElementById('collapseAllAssets').style.display='';
				document.getElementById('expandAllAssets').style.display='none';
			}
		function collapseAllAsset(id){						
			var i=2;
				while(true){
					var imgEle = document.getElementById(id+'-'+i);
					var tableEle = document.getElementById(id+'-'+(i+1));

						if(tableEle !=null && tableEle!='undefined'){
							tableEle.style.display="none";
							if(imgEle !=null && imgEle!='undefined'){
									if(imgEle.style.display=="" ){
										imgEle.style.display="none";
										//if(imgEle.style.visibility=="visible") imgEle.style.visibility=="hidden";
									}else{
										var imName = imgEle.src.substring(imgEle.src.lastIndexOf('/')+1);								
										if(imName=="open.gif"){
											imgEle.src=imgEle.src.substring(0,imgEle.src.lastIndexOf('/')+1)+"clo.gif";
											imgEle.title =getTranslatedText("Close");
										}	
										/** Modification start by b11364 on 28-10-07 For CCT47683**/ 
										else if(imName=="space1.gif"){
											imgEle.src=imgEle.src.substring(0,imgEle.src.lastIndexOf('/')+1)+"space2.gif";
											imgEle.title =getTranslatedText("Close");						
										}
										/** Modification End by b11364 on  28-10-07 */
									}
								}
						}else{
							break;
						}
					i = i+2;
				}
				document.getElementById('collapseAllAssets').style.display='none';
				document.getElementById('expandAllAssets').style.display='';
				document.getElementById('expandAllAssets').style.float='right';
			}

/** Modification End by b11364 on  13-09-07 */

function processScroll()
{
    if (headTop < 0)
    {
    	saveHeadPos();
	}
	if (headTop > 0 && FloatHead1 != null)
	{
		if (document.documentElement && document.documentElement.scrollTop)
			theTop = document.documentElement.scrollTop;
		else if (document.body) 
			theTop = document.body.scrollTop;
		//theTop = getTop();
    	//FloatHead1.style.position = "absolute";
		if (theTop > headTop){
			if(theTop < headBottom){
				FloatHead1.style.top = (theTop-headTop+5) + 'px';	
			}
		}
		else
			FloatHead1.style.top = '0px';
	}	
	//FloatHead1.style.margin='1px';
}

function saveHeadPos()
{	
    parTable = document.getElementById("headStart");
    parTableEnd = document.getElementById("headEnd");
    if (parTable != null)
    {
	    headTop = parTable.offsetTop + 3;	  
	    FloatHead1 = document.getElementById("HeaderRow");
		if(FloatHead1 != null){
			FloatHead1.style.position = "relative";
			//FloatHead1.style.margin='8px';
			//FloatHead1.style.padding='1px';
		}
	    
	}
	if (parTableEnd != null)
    {
	    headBottom = parTableEnd.offsetTop - 150;	  
	   
	}
}




function saveHeadPosMaximum()
{	
if (headTop < 0)
    {
    	saveHeadPos();
	}
	FloatHead1.style.top = '0px'; 
	if (headTop > 0 && FloatHead1 != null)  
	{ //saveHeadPos(); 
		if (document.documentElement && document.documentElement.scrollTop)
			{
			
			theTop = document.documentElement.scrollTop;
			}
		else if (document.body) 
		{ 
			theTop = document.body.scrollTop;
			}
		//theTop = getTop();
    	//FloatHead1.style.position = "absolute";
		if (theTop > headTop){
		
			if(theTop < headBottom){
			
				FloatHead1.style.top = (theTop-headTop+5) + 'px';	
			}
		}
		else
		{ 
			FloatHead1.style.top = '2px'; 
			//FloatHead1.style.display = 'absolute';
			}
	}	
}
function OpenClose(id){
	//alert(id);
	var ele = document.getElementById(id);
	var strArr = new Array(2);
	strArr = id.split("-");
	var id = strArr[1];
	//id++;
	//String elemId = strArr[0] +"-"+ id;
	
	//alert(ele);
	var imName = ele.src.substring(ele.src.lastIndexOf('/')+1);
	if(ele!=null){
		if(imName=="mon.gif"){
			ele.src=ele.src.substring(0,ele.src.lastIndexOf('/')+1)+"pon.gif";
			id++;
			document.getElementById(strArr[0] +"-"+ id).style.display="none";
		}else if(imName=="pon.gif"){
			ele.src=ele.src.substring(0,ele.src.lastIndexOf('/')+1)+"mon.gif";
			id++;
			document.getElementById(strArr[0] +"-"+ id).style.display="";
		}else if(imName=="clo.gif"){
			ele.src=ele.src.substring(0,ele.src.lastIndexOf('/')+1)+"open.gif";
			ele.title = getTranslatedText("Close");
			id++;
			document.getElementById(strArr[0] +"-"+ id).style.display="";
		}else if(imName=="open.gif"){
			ele.src=ele.src.substring(0,ele.src.lastIndexOf('/')+1)+"clo.gif";
			ele.title = getTranslatedText("Open");
			id++;
			document.getElementById(strArr[0] +"-"+ id).style.display="none";
		}
		/** Modification start by b11364 on 28-10-07 For CCT47683**/ 
		else if(imName=="space1.gif"){
			ele.src=ele.src.substring(0,ele.src.lastIndexOf('/')+1)+"space2.gif";
			ele.title = getTranslatedText("Close");
			id++;
			document.getElementById(strArr[0] +"-"+ id).style.display="none";
		}else if(imName=="space2.gif"){
			ele.src=ele.src.substring(0,ele.src.lastIndexOf('/')+1)+"space1.gif";
			ele.title = getTranslatedText("Open");
			id++;
			document.getElementById(strArr[0] +"-"+ id).style.display="";
		}
		/** Modification End by b11364 on  28-10-07 */

	}
}
var stateArrayPopup = new Array();
var elemCheckBoxId='';
function savePopupState(elemCheckBox){
	if(elemCheckBoxId!=''){
		restorePopupState(elemCheckBoxId);
	}
	elemCheckBoxId = elemCheckBox;
	for (var j = 0;; j++){
		checkBoxElem = document.getElementById(eval("'"+(elemCheckBox+j)+"'"));
		//alert(checkBoxElem);
		if (checkBoxElem!=null){
			if(checkBoxElem.checked){
				//alert("checked = " + checkBoxElem.value);
				stateArrayPopup.push(true);
			}else{
				//alert("Not checked = " + checkBoxElem.value);
				stateArrayPopup.push(false);
			}
		}else{
			break;
		}
	}
}
function restorePopupState(elemCheckBox){
	if(elemCheckBox==elemCheckBoxId){
		for (var j = 0;; j++){
			checkBoxElem = document.getElementById(eval("'"+(elemCheckBox+j)+"'"));
			if (checkBoxElem!=null){
				checkBoxElem.checked=stateArrayPopup[j];
				
			}else{
				break;
			}
		}
	}
	elemCheckBoxId='';
	stateArrayPopup = new Array();
}
var arrlistShow = new Array();
var arrlistHide = new Array();
function saveConfTableState(){
	//alert("saving");
	listShow = document.getElementById("paramsShow");
	listHide = document.getElementById("paramsHide");
	for(i=0;i<listShow.options.length;i++) {
		arrlistShow.push(listShow.options[i]);
	}
	for(i=0;i<listHide.options.length;i++) {
		//alert("hiding " + listHide.options[i]);
		arrlistHide.push(listHide.options[i]);
	}
}
function restoreConfTableState(){
	//alert("restoring");
	listHide.options[0] = null;
	//if(arrlistShow.length>0 && arrlistHide.length>0){
		listShow = document.getElementById("paramsShow");
		listHide = document.getElementById("paramsHide");
		for(i=0;i<listShow.length;i++) {
			listShow.options[i] = null;
		}
		for(i=0;i<listHide.length;i++) {
			listHide.options[i] = null;
		}
		listHide.options[0] = null;
		for(i=0;i<arrlistShow.length;i++) {
			listShow.options[i] = arrlistShow[i];
		}
		/*var len = listShow.length;
		for(;i<len;i++){
			listShow.options[len--]=null;
		}*/
		for(i=0;i<arrlistHide.length;i++) {
			//alert("Adding " + arrlistHide[i]);
			listHide.options[i] = arrlistHide[i];
		}
		/*var len = listHide.length;
		for(;i<len;i++){
			listHide.options[len--]=null;
		}*/
	//}
	arrlistShow = new Array();
	arrlistHide = new Array();
}
function encodePlus(str){
	str = str.replace("+","plus");
	return str;
}
function changePageSize(){
	//alert(document.searchform.pageSize.selectedIndex);
	var value = document.searchform.pageSize.options[document.searchform.pageSize.selectedIndex];
	addReplaceParameter('pageSize',value);
	submit2();
}
function checkShowAlert(){
	var columnOrder = getParameter('columnOrder');
	//alert(columnOrder);
	if(columnOrder!=null){
		var columns = columnOrder.split(escape('!`'));
		//alert(columns.length);
		var listShow = document.getElementById("paramsShow");
		var listHide = document.getElementById("paramsHide");
		if(listShow!=null && listHide!=null){
			var noOfColumns = listShow.options.length + listHide.options.length;
		
			if(columns.length+1>=MAX_COLUMN && columns.length+1 < noOfColumns ){
				alert("A maximum of "+MAX_COLUMN+" columns can be displayed.\nThe displayed table contains "+MAX_COLUMN+" of "+noOfColumns+" available columns.\nTo change the columns displayed, use the Configure Table option.");
			}
		}
	}
	// Added by rgp01z for CCT 47537 start 24th May 2007
	clearURLBox();
	// Added by rgp01z for CCT 47537 end 24th May 2007
}
function getParameter(paramName){
	var stateEle = document.getElementById('stateString');
	//alert(stateEle.value);
	if(stateEle!=null){
		stateStr = decodeFromDivState(stateEle.value);
		stateStr = '&'+stateStr;
		var fieldIndex = stateStr.indexOf("&"+paramName+"=");
		var leftpart = stateStr.substring(0,fieldIndex+("&"+paramName+"=").length);
		if(fieldIndex!=-1){
			var leftpart = stateStr.substring(0,fieldIndex+("&"+paramName+"=").length);
			var rightPart = stateStr.substring(fieldIndex+("&"+paramName+"=").length);
			var rightValue='';
			if(rightPart.indexOf("&")!=-1){
				rightValue = rightPart.substring(0,rightPart.indexOf("&"));
				//alert(rightValue);
			}
		}
	}
	return rightValue;
}
function addReplaceParameter(field,selection){
	
	if(field!='pageNum') removeParameter('pageNum');
	//alert("Field: "+field);
	//alert("selection: "+selection);
	
	var stateEle = document.getElementById('stateString');	
	//alert("stateEle"+stateEle);
	var stateStr = "";	
	selection  = encodePlus(selection);	
	//alert("After encoding plus" + selection);
	selection = decode(decodeFromDivState(selection));
	//alert(selection);
	
	if(stateEle!=null){
		//alert("sanajy inner" + stateEle.value);
		stateStr = decodeFromDivState(stateEle.value);
		//alert("sanajy" + stateStr);
		stateStr = '&'+stateStr;
		var fieldIndex = stateStr.indexOf("&"+field+"=");
		//alert("Index = " + fieldIndex);		
		if(fieldIndex!=-1){
			var leftpart = stateStr.substring(0,fieldIndex+("&"+field+"=").length);
			//alert("Left"+leftpart);
			var rightPart = stateStr.substring(fieldIndex+("&"+field+"=").length);
			//alert("Right"+rightPart);
			//alert("RightIndex"+rightPart.indexOf("&"));
			var rightValue='';
			if(rightPart.indexOf("&")!=-1){
				rightValue = rightPart.substring(rightPart.indexOf("&")+'&'.length);
			}
			//alert("RightValue"+rightValue);
			stateStr = leftpart + escape(selection)+"&" + rightValue;
			
		}else{
			stateStr += field + "=" + escape(selection)+"&";	
			stateStr = stateStr;
			//alert("sanajy baad mein" + stateStr);
		}
		if(stateStr!=null && stateStr!="&"){
			stateStr = stateStr.substring(1);
		}
		//alert("final"+stateStr);
		stateEle.value = encodeToDivState(stateStr);

		
	}
	//added by b13352 on 12-jan-2008 for event appending query text in url starts
	if(field=='QueryText'){
		if(selection==null) {
			removeParameter('QueryText');
		}
	}
	//added by b13352 on 12-jan-2008 for event appending query text in url ends
}
function clearAllCriteria(){
	document.searchform.action = 'Serp.jsp';
	document.getElementById("keywordTxt").value="";
	document.searchform.submit();
}

function callAdvanceSearch(field){
	addReplaceParameter(field,'true');
	//addReplaceParameter('saveState','true');
	addReplaceParameter('SelectedAsset','Orderable Parts');
	if(field=='Product Pages'){
		removeParameter('columnOrder');
	}
	/*var stateEle = document.getElementById('stateString');
	var stateStr = "";
	if(stateEle!=null){
		stateStr = decodeFromDivState(stateEle.value);
		while(stateStr.indexOf('`!')!=-1){
			stateStr = stateStr.replace('`!','&');
		}
	}
	//alert('Final Submit'+stateStr);
	document.searchform.action = 'MyMainSERP.jsp?'+ stateStr;
	document.searchform.submit();*/
	submit2();

}

function removeParameter(paramName){
	//alert("removeparameter"+paramName);
	if(paramName!='pageNum') removeParameter('pageNum');

	var stateEle = document.getElementById('stateString');
	var stateStr = "";
	if(stateEle!=null){
		//alert("sanajy inner" + stateEle.value);
		stateStr = decodeFromDivState(stateEle.value);
		//alert("sanajy" + stateStr);
		stateStr = '&'+stateStr;
		var fieldIndex = stateStr.indexOf("&"+paramName+"=");
		//alert("Index = " + fieldIndex);
		
		if(fieldIndex!=-1){
						
			var leftpart = stateStr.substring(0,fieldIndex+1);
			//alert(leftpart);
			var rightPart = stateStr.substring(fieldIndex+("&"+paramName+"=").length);
			//alert(rightPart);
			//alert(rightPart.indexOf("&"));
			var rightValue='';
			if(rightPart.indexOf("&")!=-1){
				rightValue = rightPart.substring(rightPart.indexOf("&")+'&'.length);
			}
			//alert(rightValue);
			stateStr = leftpart + "&" + rightValue;
			if(stateStr!=null && stateStr!="&"){
				stateStr = stateStr.substring(1);
			}
		}else{
			return false;
		}
		stateEle.value = encodeToDivState(stateStr);
		return true;
		//alert(stateStr);
	}
}
function removeParameters(paramName){
	while(removeParameter(paramName)== true){}
}
function showAllColumns(columnOrder,customized){
	//alert(columnOrder);
	/*var arrColumns = columnOrder.split('!`');
	//var newColumnOrder = "";
	var showAlert=false;
	var listShow = document.getElementById("paramsShow");
	var listHide = document.getElementById("paramsHide");
	var noOfColumns = listShow.options.length + listHide.options.length;
	*/
	//alert(listShow.options.length);
	//alert(listHide.options.length);
	/*if(arrColumns!=null){
		for(i in arrColumns){
			if(arrColumns[i]!=null && arrColumns[i]!=''){
				if(i<=MAX_COLUMN){
					newColumnOrder += arrColumns[i] +  '!`';
				}else{
					showAlert=true;
				}
			}
		}
	}*/
	/*if(noOfColumns>=arrColumns.length){
		showAlert=true;
	}
	//alert("New = " + newColumnOrder);
	//alert(noOfColumns +"=" + arrColumns.length + showAlert);
	if(showAlert == true){
		alert("A maximum of "+MAX_COLUMN+" columns can be displayed.\nThe displayed table contains "+MAX_COLUMN+" of "+noOfColumns+" available columns.\nTo change the columns displayed, use the Configure Table option.");
	}*/
	addReplaceParameter('columnOrder',columnOrder);
	addReplaceParameter('customized',customized);
	removeParameter('hidden');
	
	submit2();
}
function showResetColumns(columnOrder){
	removeParameter('columnOrder');
	removeParameter('customized');
	removeParameter('hidden');
	removeParameter('sortSpec');
	var columns = columnOrder.split('!`');
	for(i in columns){
		removeParameter(columns[i]);
	}
	submit2();

}
function removeFilter(paramName){
	removeParameters(paramName);
	removeParameter(paramName);
	removeParameters(paramName);

	submit2();
	
	
}
function sortResults(headerId,isAsc){
	
	addReplaceParameter('sortSpec',headerId);
	
	addReplaceParameter('isAsc',isAsc);
	
	submit2();
	
}

function applyFilter(headerId,elemCheckBox,num){
	
	var stateEle = document.getElementById('stateString');

	var selectedAsset = getParameter('SelectedAsset');
	
	removeParameters(headerId);
	removeParameter(headerId);
	removeParameters(headerId);
	var str = "";
	//alert(headerId);
	for (var j = 0; j < num; j++){
		checkBoxElem = document.getElementById(eval("'"+(elemCheckBox+j)+"'"));
		//alert(checkBoxElem);
		if (checkBoxElem.checked){
			/*if(str==""){
				str = checkBoxElem.value ;
			}else{
				str = str + "&amp;" + headerId + "=" + checkBoxElem.value ;
			}*/
			//alert(checkBoxElem.value);
			addParameter(headerId, checkBoxElem.value);
		}		
	}
	//alert("before submitting");
	
	submit2();
	
}
function clearAllFilters(){
	var filters = clearAllFilters.arguments.length;
	for (i = 0;i < filters;i++){
      removeParameters(clearAllFilters.arguments[i]);
	}
	submit2();
}
function addParameter(field,selection){
	if(field!='pageNum') removeParameter('pageNum');

	//alert("function addreplace");
	var stateEle = document.getElementById('stateString');
	var stateStr = "";
	selection  = encodePlus(selection);
	//alert("After encoding plus" + selection);
	selection = decode(decodeFromDivState(selection));
	//alert(selection);
	
	
	if(stateEle!=null){
		//alert("sanajy inner" + stateEle.value);
		stateStr = decodeFromDivState(stateEle.value);
		//alert("sanajy" + stateStr);
		var fieldIndex = stateStr.indexOf(field+"=");
		//alert("Index = " + fieldIndex);
		stateStr += field + "=" + escape(selection)+"&";	
		stateStr = stateStr;
		//alert("sanajy baad mein" + stateStr);
		stateEle.value = encodeToDivState(stateStr);
		//alert(stateStr);
	}
}
//modifed by b17090 for cct64788 START 1-1-08
function submit2(){
	/*var t = document.searchform.action.substring(document.searchform.action.indexOf("?")+1);
	document.searchform.action="MyMainSERP.jsp?"+ escape(t);
	alert(t);*/
	var stateEle = document.getElementById('stateString');
	
	var stateStr = "";
	if(stateEle!=null){		
		stateStr = decodeFromDivState(stateEle.value);
		while(stateStr.indexOf('`!')!=-1){
			stateStr = stateStr.replace('`!','&');
		}
	}

	var selectedAsset = getParameter('SelectedAsset');
	
	if(selectedAsset!=null && selectedAsset=='EventStatus'){
		
		document.searchform.action = 'event_calendar.jsp?'+ stateStr;
	}
	else
	{	
		var temp = new Array();
		var re1 = /\&&/g;
		var re2 = /\+/g;
		stateStr = stateStr.replace(re1,'&');
		stateStr = stateStr.replace(re2,'%20');
		
		temp = stateStr.split('&');		
		for (i=0; i<temp.length ; i++)
		{
			var str = temp[i];
			var strnew = new Array();
			strnew = str.split('=');
			
				if(strnew[1]!=null && strnew[1]!='undefined' && strnew[0]!=null && strnew[0]!='undefined' && strnew[0]!='svi'){
					//alert(strnew[0] + "=" + unescape(strnew[1]));
					if(strnew[0]=='Freescale Connect Partners' && unescape(strnew[1])=='Freescale Connect Partners')
					{
						//alert(strnew[0] + "= Freescale Connect Partners. Going to continue" );
						continue;
					}
					var field = document.createElement("input");
					field.setAttribute("type","hidden");
					//field.setAttribute("value",unescape(strnew[1]));
					try{
						field.setAttribute("value",decodeURIComponent(strnew[1]));
					}catch(err){
						field.setAttribute("value",unescape(strnew[1]));
					}
					field.setAttribute("name",strnew[0]);
					//var newElement = document.createElement("<input name='"+strnew[0]+"' value='"+strnew[1]+"' type='hidden'/>");
					//alert(strnew[0] + "=" + unescape(strnew[1]));
					document.searchform.appendChild(field);
				}
				//added by b17090 for cct70835 END 21-12-09
		}
//		document.searchform.action = 'Serp.jsp?'+ stateStr;
	}
	
	document.searchform.submit();
		
}
//modifed by b17090 for cct64788 END 1-1-08
function selectNav(token,type,field,selection){	
	//alert(type);
	if(type=='Product') {
		addReplaceParameter(field,selection);
		addValue('columnOrder','default');
		removeParameter('hidden');
		removeParameter('pageNum');
		removeParameter('pageSize');
	}else if(type=='Application'){
		addReplaceParameter(field,selection);
	}
	/** Modification start by b02195 on 29/03/2007 For CCT45111 **/
	else if(type=='Topic'){
		addReplaceParameter(field,selection);
	}
	/** Modification End by b02195 on 29/03/2007 */
	/** Modification start by b02195 on 03/08/2007 For CCT48310	**/
	else if(type=='Regions'){
		addReplaceParameter(field,selection);
	}else if(type=='OfferingType'){
		addReplaceParameter(field,selection);
	}

	/** Modification End by b02195 on 03/08/2007 */
	/** Modification start by b11364 on 25-09-07 For CCT47683**/ 
	else if(type=='Sub Topics'){
			//alert(field+','+selection);
			addReplaceParameter(field,selection);
		}
	else if(type=='Software !amp! Tools'){
		addReplaceParameter(field,selection);
	}
	/** Modification End by b11364 on  25-09-07 */

	else if(type=='Asset'){
		//alert("asset");
		//document.searchform.action += "SelectedAsset" + "=" + field+"`!";
		var stateEle = document.getElementById('stateString');
		if(selection == '')
		{
			/*if(stateEle!=null){
			stateEle.value = "";
			}*/
			//alert("got selection empty calling add replace parameter");
			removeParameter(field);
			//addReplaceParameter('SelectedAsset',field);
		}
		addReplaceParameter('SelectedAsset',field);
		if(selection!=''){
			addReplaceParameter(field,selection);
		}
	}else if(type="Filter"){
		//alert("Filter");
		//document.searchform.action += field + "=" + selection+"`!";
		addValue('columnOrder',field);
		addParameter(field,selection);
	}	
	submit2();

}
function decodeFromDivState(divStateStr){
	//alert("In function"+divStateStr);
    	if(divStateStr==null){
    		divStateStr = "";
    	}
    	var index = divStateStr.indexOf("`spl`");
    	while(index!=-1){
    		divStateStr = divStateStr.replace("`spl`","#");
    		index = divStateStr.indexOf("`spl`");
    	}
    	index = divStateStr.indexOf("!amp!");
    	while(index!=-1){
    		divStateStr =divStateStr.replace("!amp!","&");
    		index = divStateStr.indexOf("!amp!");
    	}
		//alert(divStateStr);
    	return divStateStr;
	}
function decode(str) {
     var result = "";
	//alert(str);
     for (var i = 0; i < str.length; i++) {
          if (str.charAt(i) == "+") result += " ";
          else result += str.charAt(i);
		  var toRet = unescape(result);
		  //alert(toRet);
     }
	 return toRet;
}
function encodeToDivState(stateStr){
	if(stateStr==null){
		stateStr = "";
	}
	var index = stateStr.indexOf("#");
	while(index!=-1){
		stateStr =stateStr.replace("#","`spl`");
		index = stateStr.indexOf("#");
	}
	index = stateStr.indexOf("&");
	while(index!=-1){
		stateStr =stateStr.replace("&","!amp!");
		index = stateStr.indexOf("&");
	}
	return stateStr;
}
function removeColumn(id,rowCount,isHiddenList,displayName){
	//alert("Id = " + id + "Rows = " + rowCount);
	var isSubmit = false;
	if(!isInState(id)){
		var remCol = true;
	}else{
		//alert("Removing column will remove the filters applied on it.");
		var where_to= confirm("Removing column will remove the filters applied on it. \n Do you really want to continue ?");
		if (where_to== true){
		   remCol = true;
		   isSubmit = true;
		}
		else{
			remCol=false;
		}
	}
	if(remCol){
		var ele = document.getElementById(id);
		if(ele!=null){
			ele.style.display="none";
		}
		for(var i=0;i<rowCount;i++){
			var ele = document.getElementById(id+i);
			if(ele!=null){
				ele.style.display="none";
			}
		}
		removeValue('columnOrder',id);
		var listHide = document.getElementById("paramsHide");
		var listShow = document.getElementById("paramsShow");
		var opt = null;
		if(isHiddenList){
			addValue('hidden',id);
			var opt = new Option(displayName, 'default!'+id, false, false);
		}else{
			var opt = new Option(displayName, id, false, false);
		}
		listHide.options[listHide.options.length] = opt;
		for(k=0;k<listShow.options.length;k++){
			if(listShow.options[k].value == id  || listShow.options[k].value == 'default!'+id){
				listShow.options[k] = null;
			}
		}
		var moreTab = document.getElementById('moreIdTab');
		if(moreTab!=null){
			moreTab.style.display="";
		}
		if(isSubmit){
			submit2();
		}
	}
	
}
function addValue(paramName,value){
	if(isInState(paramName)){
		var stateEle = document.getElementById('stateString');
		var stateStr = "";
		if(stateEle!=null){
			stateStr = decodeFromDivState(stateEle.value);
			stateStr = '&'+stateStr;
			var fieldIndex = stateStr.indexOf("&"+paramName+"=");
			//alert(fieldIndex);
			if(fieldIndex!=-1){
				var leftpart = stateStr.substring(0,fieldIndex+("&"+paramName+"=").length);
				//alert("left = " + leftpart);
				var rightPart = stateStr.substring(fieldIndex+("&"+paramName+"=").length);
				//alert(rightPart);
				var rightValue='';
				//alert("Encode = " + escape("!`"+value));
				//alert("Decode = " + decodeFromDivState("!`"+value));
				//alert("Without sign = " + rightPart.indexOf(value));
				//alert(rightPart.indexOf("!`"+value));
				var paramValue = '';
				if(rightPart.indexOf("&")!=-1){
					rightValue = rightPart.substring(rightPart.indexOf("&"));
					paramValue = rightPart.substring(0,rightPart.indexOf("&"));
					if(paramValue.indexOf(value)==-1){
						paramValue += escape("!`"+value);
					}
				}
				if(rightPart==''){
					rightValue = value;
				}
				//alert(rightValue);
				//alert(paramValue);
				stateStr = leftpart + paramValue + rightValue;
				//rightValue = rightPart.replace(escape("!`"+value),'');
				//alert(rightValue);
				//rightValue.replace
				//stateStr = leftpart + rightValue;
				
			}
			//alert("STate = " + stateStr);
			if(stateStr!=null && stateStr!="&"){
				stateStr = stateStr.substring(1);
			}
			stateEle.value = encodeToDivState(stateStr);
			//alert(stateStr);
		}
	}else{
		//alert("in else");
		addParameter(paramName,value);
	}
}
function removeValue(paramName,value){
	var stateEle = document.getElementById('stateString');
	var stateStr = "";
	if(stateEle!=null){
		stateStr = decodeFromDivState(stateEle.value);
		stateStr = '&'+stateStr;
		var fieldIndex = stateStr.indexOf("&"+paramName+"=");
		//alert(fieldIndex);
		if(fieldIndex!=-1){
			var leftpart = stateStr.substring(0,fieldIndex+("&"+paramName+"=").length);
			//alert("left = " + leftpart);
			var rightPart = stateStr.substring(fieldIndex+("&"+paramName+"=").length);
			//alert(rightPart);
			var rightValue='';
			//alert("Encode = " + escape("!`"+value));
			//alert("Decode = " + decodeFromDivState("!`"+value));
			//alert("Without sign = " + rightPart.indexOf(value));
			//alert(rightPart.indexOf("!`"+value));
			/*if(rightPart.indexOf("!`"+value)!=-1){

				rightValue = rightPart.substring(rightPart.indexOf("&")+'&'.length);
			}*/
			//alert("rigthValue=" + rightValue);
			//alert("value=" + value);
			//alert("escpae value = " + escape("!`"+value));
			rightValue = rightPart.replace(escape("!`"+value),'');
			rightValue = rightValue.replace(escape(value+"!`"),'');
			//alert(rightValue);
			//rightValue.replace
			stateStr = leftpart + rightValue;
			
		}
		//alert("STate = " + stateStr);
		if(stateStr!=null && stateStr!="&"){
			stateStr = stateStr.substring(1);
		}
		stateEle.value = encodeToDivState(stateStr);
		//alert(stateStr);
	}
}
function isInState(field){
	

	//alert("function addreplace");
	var stateEle = document.getElementById('stateString');
	var stateStr = "";
	
	//alert("After encoding plus" + selection);
	
	//alert(selection);
	
	//alert(field);
	if(stateEle!=null){
		//alert("sanajy inner" + stateEle.value);
		stateStr = decodeFromDivState(stateEle.value);
		//alert("sanajy" + stateStr);
		stateStr = '&'+stateStr;
		var fieldIndex = stateStr.indexOf("&"+field+"=");
		//alert("Index = " + fieldIndex);
		if(fieldIndex!=-1){
			return true;
			
		}else{
			return false;
		}
		
		
		//alert(stateStr);
	}
}
function downaload(str){
	removeParameter('pageSize');
	removeParameter('pageNum');
	var stateEle = document.getElementById('stateString');
	var stateStr = "";
	if(stateEle!=null){
		stateStr = decodeFromDivState(stateEle.value);
		while(stateStr.indexOf('`!')!=-1){
			stateStr = stateStr.replace('`!','&');
		}
	}
	/**Modification start by b13004 for Download on 19 Sep 2007 CCT47683 **/
	// Added by b12874 for CCT67955 start on July 22 2009
	//document.searchform.action = 'SerpDownload.jsp?'+ stateStr+str+"&KeywordValue="+document.searchform.QueryText.value;
	stateStr=stateStr+str;
	location.href = 'SerpDownload.jsp?'+stateStr;
	// Added by b12874 for CCT67955 end on July 22 2009

	/**Modification end by b13004 for Download on 19 Sep 2007 CCT47683 **/
	// Modified by b12874 for CCT67955 start on July 22 2009
	// document.searchform.submit();
	// Modified by b12874 for CCT67955 end on July 22 2009
}
function performCompare(){
	var stateEle = document.getElementById('stateString');
	var submitFlag = true;
	if(stateEle!=null){
		//alert("sanajy inner" + stateEle.value);
		var stateStr = decodeFromDivState(stateEle.value);
		//alert("sanajy" + stateStr);
		stateStr = '&'+stateStr;
		var fieldIndex = stateStr.indexOf("&"+'id'+"=");
		//alert("Index = " + fieldIndex);
		if(fieldIndex!=-1){
			var leftpart = stateStr.substring(0,fieldIndex+1);
			//alert("left=" + leftpart);
			var rightPart = stateStr.substring(fieldIndex+("&"+'id'+"=").length);
			//alert(rightPart);
			//alert(rightPart.indexOf("&"));
			var rightValue='';
			if(rightPart.indexOf("&")!=-1){
				rightValue = rightPart.substring(0,rightPart.indexOf("&")+'&'.length);
			}
			//alert(rightValue);
			var ids = rightValue.split(escape("!`"));
			//alert(ids.length);
			if(ids.length<2){
				alert("Please select more than two rows for comparison");
				submitFlag = false;
			}
		}else{
			alert("Please select more than two rows for comparison");
			submitFlag = false;
		}
		if(stateStr!=null && stateStr!="&"){
			stateStr = stateStr.substring(1);
		}
	}
	if(submitFlag==true){
		addReplaceParameter('isComparison','true');
		addReplaceParameter('searchType','2');
		submit2();
	}
	
}
function clearCompare(){
	removeParameter('id');
	removeParameter('searchType');
	removeParameter('isComparison');
	submit2();
}
function addIdValue(paramName,value,checked){
	//alert(checked);
	if(checked == true){
		addValue(paramName,value);
	}else{
		removeValue(paramName,value);
	}
}
function addRemoveFilter(paramName,value,checked){
	/*if(checked==true){
		//alert('add filter :' + 'paramName =' + paramName + ' and value =' + value);
		//alert(paramName+value);
		addParameter(paramName,value);
	}else{
		alert('remove filter' + 'paramName =' + paramName + ' and value =' + value);*/
		//alert(paramName+value);  
		/*while((value.indexOf(' '))!=-1){
			value = value.replace(' ','+');
		}*/
	/*	value = decode(value);
		removeString(paramName+"="+escape(value));
	}*/
}
function updateAdvancePage(){
	//alert("hi");
	//removeParameter('saveState');
	var columnsEle = document.getElementById("advColumns");
	var columns = columnsEle.value.split(",");
	for(i in columns){
		removeParameters(columns[i]);
		for (var j = 0;; j++){
			var checkBoxElem = document.getElementById('advCheckbox'+columns[i]+j);
			if(checkBoxElem!=null ){
				if (checkBoxElem.checked){
					//alert(columns[i]);
					addParameter(columns[i], checkBoxElem.value);
					
				}
			}else{
				break;
			}
		
		}
	}
	submit2();

}
function resetAdvancePage(){
	/*var stateEle = document.getElementById('resetState');
	var stateStr = "";
	if(stateEle!=null){
		stateStr = decodeFromDivState(stateEle.value);
		while(stateStr.indexOf('`!')!=-1){
			stateStr = stateStr.replace('`!','&');
		}
	}
	//alert('Final Submit'+stateStr);
	
	document.searchform.action = 'MyMainSERP.jsp?'+ stateStr;
	document.searchform.submit();*/
//	removeParameter('saveState');
	var columnsEle = document.getElementById("advColumns");
	if(columnsEle!=null){
		var columns = columnsEle.value.split(",");
		for(i in columns){
			removeParameters(columns[i]);
		}
	}
	submit2();
}
function showUpdateButton(headerName){
	var buttonEle = document.getElementById('update'+headerName);
	if(buttonEle!=null){
		buttonEle.style.display = "";
	}
}
function updateViewResults(isAdvance){
	addReplaceParameter(isAdvance,'false');
	//removeParameter('saveState');
	var columnsEle = document.getElementById("advColumns");
	var columns = columnsEle.value.split(",");
	for(i in columns){
		//removeParameters(columns[i]);
		var checkedColumnFlag = false;
		removeParameters(columns[i]);
		for (var j = 0;; j++){
			var checkBoxElem = document.getElementById('advCheckbox'+columns[i]+j);
			if(checkBoxElem!=null ){
				if (checkBoxElem.checked){
					//alert(columns[i]);
					addParameter(columns[i], checkBoxElem.value);
					if(checkedColumnFlag!='true'){
						addValue('columnOrder',columns[i]);
						checkedColumnFlag='true';
					}
				}
			}else{
				break;
			}
		
		}
	}
	submit2();
}
function removeString(value){
	//alert(value);
	var stateEle = document.getElementById('stateString');
	if(stateEle!=null){
		var stateStr = decodeFromDivState(stateEle.value);
		//alert(stateStr.indexOf(value));
		stateStr = stateStr.replace(value,'');
	}
	if(stateStr!=null && stateStr!="&"){
		stateStr = stateStr.substring(1);
	}
	//alert(value);
	//alert(stateStr);
	//stateEle.value = encodeToDivState(stateStr);
}
function updateConfTable(){
	//alert("In funciton");
	var listShow = document.getElementById("paramsShow");
	var listHide = document.getElementById("paramsHide");
	var columnOrder = "";
	var hidden = "";
	//alert("before for loop");
	for(i=0;i<listShow.options.length;i++){
		var headerId = listShow.options[i].value;
		var index = headerId.indexOf('default!');
		//alert(headerId);
		//alert(index);
		if(index==-1){
			columnOrder += headerId + '!`';
		}else{
			//alert("In else");
			headerId = headerId.substring(index+('default!').length);
			columnOrder += headerId + '!`';
			//alert(headerId);
			//alert(index);
			//alert(columnOrder);
		}
	}
	for(i=0;i<listHide.options.length;i++){
		var headerId = listHide.options[i].value;
		var index = headerId.indexOf('default!');
		//alert(headerId);
		//alert(index);
		if(index!=-1){
			headerId = headerId.substring(index+('default!').length);
			//alert(headerId);
			hidden += headerId+'!`';;
		}
	}
	//alert(columnOrder);
	//alert(hidden);
	addReplaceParameter('columnOrder',columnOrder);
	addValue('hidden',hidden);
	submit2();
}
function hideSelect(){
	var listShow = document.getElementById("paramsShow");
	var listHide = document.getElementById("paramsHide");
	var tableEle = document.getElementById("CustomizeMenuTable");
	if(listShow!=null){
		//alert(listShow.style.display);
		//alert(listShow.style.visibility);
		listShow.style.visibility = tableEle.style.visibility;
	}
	if(listHide!=null){
		listHide.style.visibility = tableEle.style.visibility ;
	}
}



function stateObject(){
	var stateObj = new Array();
	var stateEle = document.getElementById('stateString');
	var stateStr = "";
	if(stateEle!=null){
		stateStr = decodeFromDivState(stateEle.value);
		var paramsNvalues = stateStr.split("&");
		//alert(paramsNvalues);
		var i ;
		var j=0;
		for (i in paramsNvalues){
			//alert(paramsNvalues[i]);
			var paramValue = paramsNvalues[i].split("=");
			//alert(paramValue[0] + paramValue[1]);
			if(paramValue[0]!=undefined && paramValue[1]!=undefined){
				stateObj[j] = new paramValuePair(paramValue[0],paramValue[1]);
				j++;
			}	
		}
		/*for(i in stateObj){
			alert("sanjay" + stateObj[i].paramName + stateObj[i].value);
		}*/
	}
	this.stateObj = stateObj;
}
function paramValuePair(paramName,value){
	this.paramName = paramName
	this.value = value
}
function clearBreadCrumRow(field)
{
	//alert('HI in clear');
	var fromPSP = getParameter('fromPSP');
	//alert(fromPSP);
	if(fromPSP == 'true')
	{
		
		//addReplaceParameter('SelectedAsset',field);
		
		//alert('in if' + field + 'selectedAsset' + getParameter('SelectedAsset'));
		removeParameter(field);
		submit2();
	}
	else
	{
		//alert('in else');
		removeParameter('SelectedAsset');
		removeParameter(field);
		submit2();
	}
}
// Added by rgp01z for CCT47537 start 24th May 2007
function getPageURL(strQueryText){
	var	urlString = removeURLParam("QueryText");
	var urlTextBoxEle = document.getElementById("urlTextBox");
	if(strQueryText != null)
	{
		if ( urlString.indexOf('?') < 0 ){
			urlString = urlString + "?";
		}
		
		if(strQueryText != "")
		{
			if ( urlString.substring( ( urlString.length - 1) ,  urlString.length ) != "&" ) {
				urlString = urlString + "&";
			}	
			urlString = urlString + "QueryText=" + strQueryText + "&";
		}
	}
	if(urlTextBoxEle != null)
	{
		urlTextBoxEle.value = urlString;
		urlTextBoxEle.disabled = false;
		urlTextBoxEle.style.background = "#ffffff";
	}
}

function clearURLBox(){
	var urlBoxEle = document.getElementById("urlTextBox");
	if(urlBoxEle != null)
	{
		urlBoxEle.disabled = true;
		urlBoxEle.value = "";
		
	}
}
// Added by b11364 for CCT62511 start 29th Oct 2008
function removePageDetails(){
		removeParameter('pageNum');
		removeParameter('pageSize');
		submit2(); 
}
// Added by b11364 for CCT62511 end 29th Oct 2008
function checkEnter(e){ //e is event object passed from function invocation
	var characterCode; //literal character code will be stored in this variable

	if(e && e.which){ //if which property of event object is supported (NN4)
		e = e;
		characterCode = e.which; //character code is contained in NN4's which property
	}else{
		e = event;
		characterCode = e.keyCode; //character code is contained in IE's keyCode property
	}
	if(characterCode == 13){//if generated character code is equal to ascii 13 (if enter key)
		//document.forms[0].submit() //submit the form
		// Added by b11364 for CCT62511 start 29th Oct 2008
		removeParameter('pageNum');
		removeParameter('pageSize');
		// Added by b11364 for CCT62511 end 29th Oct 2008
		submit2();
		
		
		return false;	
	}else{
		return true;
	}
}

function checkEnterForEvent(field,value,e){
	var characterCode; 
	if(e && e.which){ //if which property of event object is supported (NN4)
		e = e;
		characterCode = e.which;
		//alert("characterCode"+characterCode);//character code is contained in NN4's which property
	}else{
		e = event;
		characterCode = e.keyCode;
		//alert("characterCode"+characterCode);///character code is contained in IE's keyCode property
	}
	if(characterCode == 13){//if generated character code is equal to ascii 13 (if enter key)
		//document.forms[0].submit() //submit the form

		//Added by b13352 on 11-jan-2008 for event starts
		var selectedAsset = getParameter('SelectedAsset');
		// Added by b11364 for CCT62511 start 29th Oct 2008
		removeParameter('pageNum');
		removeParameter('pageSize');
		// Added by b11364 for CCT62511 end 29th Oct 2008
		//alert("field"+field);
		//alert("value"+value);
		addReplaceParameter(field,value);
		//var selectedAsset = getParameter('SelectedAsset');
		//submitEvent();
		
		
		//Added by b13352 on 11-jan-2008 for event starts
		return false;	
	}else{
		return true;
	}

}


function removeURLParam(paramName){
		var stateStr = window.location;
		stateStr = '&'+stateStr;
		var fieldIndex = stateStr.indexOf("&"+paramName+"=");
		//alert("Index = " + fieldIndex);
		if(fieldIndex!=-1){
			var leftpart = stateStr.substring(0,fieldIndex+1);
			//alert(leftpart);
			var rightPart = stateStr.substring(fieldIndex+("&"+paramName+"=").length);
			//alert(rightPart);
			//alert(rightPart.indexOf("&"));
			var rightValue='';
			if(rightPart.indexOf("&")!=-1){
				rightValue = rightPart.substring(rightPart.indexOf("&")+'&'.length);
			}
			//alert(rightValue);
			stateStr = leftpart + "&" + rightValue;
			if(stateStr!=null && stateStr!="&"){
				stateStr = stateStr.substring(1);
				return stateStr;
			}
		}else{
			if(stateStr!=null && stateStr!="&"){
			return stateStr.substring(1);
			}
		}
}

// Added by rgp01z for CCT47537 end 24th May 2007


// Modification by b13352 for Vendor-Tool Matrix Starts 14 Aug 2007
function openMatix(code){ 
	var url = './../components/vendorToolMatrix.jsp?code='+code;
	ajaxwin=dhtmlwindow.open('ajaxbox',url,"Vendor Tool Matrix", 'width='+300+'px,height='+350+'px,left=50px,top=100px,resize=0,scrolling=1');
	//ajaxwin=dhtmlwindow.open('ajaxbox',url,"Vendor Tool Matrix", 'width=100px,height=100px,left=50px,top=100px,resize=0,scrolling=1');
	return true ;
}

function filterBasedOnVendor(){
	var stateString = arguments[0];
	var stateElem = document.getElementById('stateString');
	if(stateElem!=null){
		stateElem.value=stateString;
	}
			
   for(var i=1; i<arguments.length; i++) {
	  headerId = arguments[i];
	  value=arguments[i+1];
	  i++;
	  removeParameters(headerId);
	  removeParameter(headerId);
	  removeParameters(headerId);
	  addParameter(headerId, value);
   }
	submit2();
}

function downloadCompResults(str){
	removeParameter('pageSize');
	removeParameter('pageNum');
	var stateEle = document.getElementById('stateString');
	var stateStr = "";
	if(stateEle!=null){
		stateStr = decodeFromDivState(stateEle.value);
		while(stateStr.indexOf('`!')!=-1){
			stateStr = stateStr.replace('`!','&');
		}
	}

	document.downloadCompResultForm.action = './../SerpDownload.jsp?'+ stateStr+str;
	document.downloadCompResultForm.submit();
}

//Modification START by b13352 on 14 Sep 2007 for AssetDesc 


function submitSearchByProduct(){
	removeParameter('compQueryText');
	addParameter('compQueryText',document.getElementById('compSearchBox').value);		
	document.searchform.submit();
}	

function removeProdMetaIdFilter(paramName){
	removeParameters(paramName);
	removeParameter(paramName);
	removeParameters(paramName);
	//removeParameter('showCustomCollateral');
	removeParameter('componentId');

	var selectedAsset = getParameter('SelectedAsset');

	removeParameter('showCustomCollateral');

	if(getParameter('selectedAsset') !=null ){
		addParameter('showCustomCollateral','false');
	}else{
		addParameter('showCustomCollateral','true');
	}

	submit2();
}


// Modification by b13352 for Vendor-Tool Matrix end 14 Aug 2007

// Modification by b13352 for Event on 07 jan 2008 starts
/*function openPopupforEvent(code,show_rest_info_flg,name,type){ 
	var url = '../../sps/site/event_calendar.jsp?TrngMetaId='+code+'&show_rest_info_flg='+show_rest_info_flg;
	var eventurl=window.location;
	ajaxwin=dhtmlwindow.open('ajaxbox',url,"Upcoming Schedule For "+name+" "+type, 'width='+750+'px,height='+350+'px,left=50px,top=100px,resize=0,scrolling=0');
	dcsMultiTrack('DCS.dcsuri','/onclick/Show_Scheduled_Events','WT.ti',"Show Scheduled Events",'DCS.dcsref',eventurl,'DCSext.click','1','DCSext.eventURL',url); 
	return true;

 

}*/
function nameUrlLink(url,name){
	var eventurl=window.location;
	window.location=url;
	dcsMultiTrack('DCS.dcsuri','/onclick/event_calendar/event_name.fslclick','WT.ti',"Event Calendar Name Click: "+name,'DCS.dcsref',eventurl,'DCSext.click','1','DCSext.eventURL',url); 
	
}

function registerUrlLink(url,fromTRNG){
	
	var eventurl=window.location;
	if(fromTRNG=="true"){
		
		window.open(url,'mywindow','width=700,height=400,left=200,top=200,resizable=1,scrollbars=1');
		
		//modified on 06-feb-2008 by b13352 starts
		//dcsMultiTrack('DCS.dcsuri','/onclick/event_calendar/register.fslclick','WT.ti','Event Calendar Register Click','DCS.dcsref',eventurl,'DCSext.click','1','DCSext.eventregisterURL',eventurl); 
		dcsMultiTrack('DCS.dcsuri','/onclick/event_calendar/register.fslclick','WT.ti','Event Calendar Register Click','DCS.dcsref',eventurl,'DCSext.click','1','DCSext.eventregisterURL',url); 
		//modified on 06-feb-2008 by b13352 ends
	}
	else{
		window.location=url;
		dcsMultiTrack('DCS.dcsuri','/onclick/event_calendar/register.fslclick','WT.ti','Event Calendar Register Click','DCS.dcsref',eventurl,'DCSext.click','1','DCSext.eventregisterURL',url); 
	}
	
}
// Modification by b13352 for Event on 07 jan 2008 ends
//Modification by b13352 for Event on 09 jan 2008 starts

function selectEvent(type,field,selection){
	document.getElementById('stateString').value = document.getElementById('initStateString').value;
	var isLinkClicked = false;
		if(type=='UpComingEvent') {
			//removeParameter('EventStatus');
			addReplaceParameter('sortSpec','Date');
			addReplaceParameter('isAsc','true');
			addReplaceParameter(field,selection);
			//addReplaceParameter(field,selection);
			isLinkClicked=true;
		}else if(type=='PastEvent'){
			addReplaceParameter('sortSpec','Date');
			addReplaceParameter('isAsc','false');
			//removeParameter('EventStatus');
			addReplaceParameter(field,selection);
			isLinkClicked=true;
		}
		else if(type=='All'){
			removeParameter('TrainingEvent');
			//addReplaceParameter(field,selection);
			isLinkClicked=true;
		}
		else if(type=='TrainingEvent'){
			//removeParameter('TrainingEvent');
			addReplaceParameter(field,selection);
			isLinkClicked=true;
		}else if(type=='NonTrainingEvent'){
			//removeParameter('TrainingEvent');
			addReplaceParameter(field,selection);
			isLinkClicked=true;
		}
		
		
		if ( isLinkClicked ){
			submit2();
		} 

	}

function addQuerryTextForEvent(field,value){
	addReplaceParameter(field,value);
	submit2();

}
//Modification by b13352 for Event on 09 jan 2008 ends


//Method added by b16684 for search usability project on 09/02/2009 Start

function removeParam(paramName){
	//alert("removeparameter"+paramName);
	if(paramName!='pageNum') removeParam('pageNum');

	var stateEle = document.getElementById('RETURL');
	var stateStr = "";
	if(stateEle!=null){
		//alert("sanajy inner" + stateEle.value);
		stateStr = decodeFromDivState(stateEle.value);
		//alert("sanajy" + stateStr);
		stateStr = '&'+stateStr;
		var fieldIndex = stateStr.indexOf("&"+paramName+"=");
		//alert("Index = " + fieldIndex);
		if(fieldIndex!=-1){
			var leftpart = stateStr.substring(0,fieldIndex+1);
			//alert(leftpart);
			var rightPart = stateStr.substring(fieldIndex+("&"+paramName+"=").length);
			//alert(rightPart);
			//alert(rightPart.indexOf("&"));
			var rightValue='';
			if(rightPart.indexOf("&")!=-1){
				rightValue = rightPart.substring(rightPart.indexOf("&")+'&'.length);
			}
			//alert(rightValue);
			//stateStr = leftpart + "&" + rightValue;
			stateStr = leftpart + rightValue;
			if(stateStr!=null && stateStr!="&"){
				stateStr = stateStr.substring(1);
			}
		}else{
			return false;
		}
//		stateEle.value = encodeToDivState(stateStr);
		stateEle.value = stateStr;
		return true;
		//alert(stateStr);
	}
}

function addParam(field,selection){
	if(field!='pageNum') removeParam('pageNum');

	//alert("function addreplace");
	var stateEle = document.getElementById('RETURL');
	var stateStr = "";
	selection  = encodePlus(selection);
	//alert("After encoding plus" + selection);
	selection = decode(decodeFromDivState(selection));
	//alert(selection);
	
	
	if(stateEle!=null){
		//alert("sanajy inner" + stateEle.value);
		stateStr = decodeFromDivState(stateEle.value);
		//alert("sanajy" + stateStr);
		var fieldIndex = stateStr.indexOf(field+"=");
		//alert("Index = " + fieldIndex);
		stateStr += field + "=" + escape(selection)+"&";	
		stateStr = stateStr;
		//alert("sanajy baad mein" + stateStr);
		stateEle.value = stateStr;
		//alert(stateStr);
	}
}


function addReplaceParam(field,selection){
	
	if(field!='pageNum') removeParam('pageNum');
	//alert("Field: "+field);
	//alert("selection: "+selection);
	
	var stateEle = document.getElementById('RETURL');
	//alert("stateEle"+stateEle);
		var stateStr = "";
	selection  = encodePlus(selection);
	//alert("After encoding plus" + selection);
	selection = decode(decodeFromDivState(selection));
	//alert(selection);
	
	
	if(stateEle!=null){
		
		//alert("sanajy inner" + stateEle.value);
		stateStr = decodeFromDivState(stateEle.value);
		//alert("sanajy" + stateStr);
		stateStr = '&'+stateStr;
		
		var fieldIndex = stateStr.indexOf("&"+field+"=");
	
		//alert("Index = " + fieldIndex);
		if(fieldIndex!=-1){
			
			var leftpart = stateStr.substring(0,fieldIndex+("&"+field+"=").length);
			//alert("Left"+leftpart);
			var rightPart = stateStr.substring(fieldIndex+("&"+field+"=").length);
			//alert("Right"+rightPart);
			//alert("RightIndex"+rightPart.indexOf("&"));
			var rightValue='';
			if(rightPart.indexOf("&")!=-1){
				rightValue = rightPart.substring(rightPart.indexOf("&")+'&'.length);
			}
			//alert("RightValue"+rightValue);
			stateStr = leftpart + escape(selection)+"&" + rightValue;
			
		}else{
			
			stateStr += field + "=" + escape(selection)+"&";	
			stateStr = stateStr;
			//alert("sanajy baad mein" + stateStr);
		}
		if(stateStr!=null && stateStr!="&"){
			stateStr = stateStr.substring(1);
		}
		//alert("final"+stateStr);
		stateEle.value = stateStr;

		
	}
	//added by b13352 on 12-jan-2008 for event appending query text in url starts
	if(field=='QueryText'){
		if(selection==null) {
			removeParameter('QueryText');
		}
	}
	
	//added by b13352 on 12-jan-2008 for event appending query text in url ends
	
	//Added by B35740 for CR 56344 on 30/7/2014 Start
	
	function submitEvent()
	{
		document.searchForm.stateString.value= document.getElementById('QueryText').value;
		document.searchForm.trainingEventType.value= nextPageNo;
		document.searchForm.upcomingEvent.value= respAnswers;
		document.frm.action="event_calendar.jsp";
	}
	
	function filterEvent(type,field,selection)
	{
		document.getElementById('stateString').value = document.getElementById('QueryText').value;
	var isLinkClicked = false;
		if(type=='UpComingEvent') {
			//removeParameter('EventStatus');
			addReplaceParameter('sortSpec','Date');
			addReplaceParameter('isAsc','true');
			addReplaceParameter(field,selection);
			//addReplaceParameter(field,selection);
			isLinkClicked=true;
		}else if(type=='PastEvent'){
			addReplaceParameter('sortSpec','Date');
			addReplaceParameter('isAsc','false');
			//removeParameter('EventStatus');
			addReplaceParameter(field,selection);
			isLinkClicked=true;
		}
		else if(type=='All'){
			removeParameter('TrainingEvent');
			//addReplaceParameter(field,selection);
			isLinkClicked=true;
		}
		else if(type=='TrainingEvent'){
			//removeParameter('TrainingEvent');
			addReplaceParameter(field,selection);
			isLinkClicked=true;
		}else if(type=='NonTrainingEvent'){
			//removeParameter('TrainingEvent');
			addReplaceParameter(field,selection);
			isLinkClicked=true;
		}
		
		
		if ( isLinkClicked ){
			submit2();
		}
	}
	
	//Added by B35740 for CR 56344 on 30/7/2014 End
}
//Added by B35740 for CR 56344 on 30/7/2014 Start
	
	function submitEvent(type,fieldValue)
	{
		var query = "";
		var eventStatus = "";
		var trainingEvent = "";
		if(type == 'EventStatus')
		{
			eventStatus = fieldValue;
			trainingEvent = document.getElementById('TrainingEvent').value;
		}
		else if(type == 'TrainingEvent')
		{
			eventStatus = document.getElementById('EventStatus').value;
			trainingEvent = fieldValue;
		}
		document.searchform.QueryText.value= query;
		document.searchform.TrainingEvent.value= trainingEvent;
		document.searchform.EventStatus.value= eventStatus;
		document.searchform.action="eventCalendarSearch.sp?QueryText="+query+"&TrainingEvent="+trainingEvent+"&EventStatus="+eventStatus;
		document.searchform.submit();
	}
	
	function handleEnterKeyEvent(e)
	{
		var characterCode; 
		if(e && e.which){ //if which property of event object is supported (NN4)
			e = e;
			characterCode = e.which;
			//alert("characterCode"+characterCode);//character code is contained in NN4's which property
		}else{
			e = event;
			characterCode = e.keyCode;
			//alert("characterCode"+characterCode);///character code is contained in IE's keyCode property
		}
		if (characterCode == 13) {
			submitEvent('KeywordText',document.getElementById('KeywordText').value);
			return false;
		}
	}
	
	function filterEvent(type,field,selection)
	{
		document.getElementById('stateString').value = document.getElementById('QueryText').value;
	var isLinkClicked = false;
		if(type=='UpComingEvent') {
			//removeParameter('EventStatus');
			addReplaceParameter('sortSpec','Date');
			addReplaceParameter('isAsc','true');
			addReplaceParameter(field,selection);
			//addReplaceParameter(field,selection);
			isLinkClicked=true;
		}else if(type=='PastEvent'){
			addReplaceParameter('sortSpec','Date');
			addReplaceParameter('isAsc','false');
			//removeParameter('EventStatus');
			addReplaceParameter(field,selection);
			isLinkClicked=true;
		}
		else if(type=='All'){
			removeParameter('TrainingEvent');
			//addReplaceParameter(field,selection);
			isLinkClicked=true;
		}
		else if(type=='TrainingEvent'){
			//removeParameter('TrainingEvent');
			addReplaceParameter(field,selection);
			isLinkClicked=true;
		}else if(type=='NonTrainingEvent'){
			//removeParameter('TrainingEvent');
			addReplaceParameter(field,selection);
			isLinkClicked=true;
		}
		
		
		if ( isLinkClicked ){
			submit2();
		}
	}
	
	//Added by B35740 for CR 56344 on 30/7/2014 End

//Method added by b16684 for search usability project on 09/02/2009 End