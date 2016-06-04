Print();

function getRequestVar(istr) {

        var xstr = window.location.href;
        var xloc = xstr.indexOf('?'), yloc = 0;

        istr += '=';

        if(xloc == -1) return '';
        else {
                xloc = xstr.indexOf(istr, xloc) + istr.length;
                yloc = xstr.indexOf('&', xloc)!= -1?
                        xstr.indexOf('&', xloc) : xstr.indexOf('#', xloc);
                if(yloc == -1) xstr = xstr.substring(xloc);
                else xstr = xstr.substring(xloc, yloc);
        }

        return xstr;
}

function Print() {
	var query;
	var title;
	var hiddenStyle;
	title = document.URL;
	query = title.indexOf('?');

	
	if (getRequestVar('prfview') == 'yes') {
		var requestedJSP = getRequestJsp();
		
		if(requestedJSP == 'homepage.jsp'){
			
			document.write('<link rel="stylesheet" href="/shared/stylesheets/pbar_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/toplevel_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/files/abstract/misc/TOPLEVEL_DELTA_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/phase2_printerfriendly.css" type="text/css" />');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/serpstyles_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/search/stylesheets/style_printerfriendly.css" type="text/css"/>');
		}else if(requestedJSP == 'overview.jsp'){
			
			document.write('<link rel="stylesheet" href="/shared/stylesheets/pbar_printerfriendly.css" type="text/css"/>');
			
			document.write('<link rel="stylesheet" href="/shared/stylesheets/toplevel_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/files/abstract/misc/TOPLEVEL_DELTA_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/phase2_printerfriendly.css" type="text/css" />');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/serpstyles_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/search/stylesheets/style_printerfriendly.css" type="text/css"/>');			
		}else if(requestedJSP == 'prod_summary.jsp'){
			
			document.write('<link rel="stylesheet" href="/shared/stylesheets/pbar_printerfriendly.css" type="text/css"/>');
			
			document.write('<link rel="stylesheet" href="/shared/stylesheets/toplevel_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/files/abstract/misc/TOPLEVEL_DELTA_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/phase2_printerfriendly.css" type="text/css" />');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/serpstyles_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/search/stylesheets/style_printerfriendly.css" type="text/css"/>');			
		}else if(requestedJSP == 'learning_summary.jsp'){
			
			document.write('<link rel="stylesheet" href="/shared/stylesheets/pbar_printerfriendly.css" type="text/css"/>');
			
			document.write('<link rel="stylesheet" href="/shared/stylesheets/toplevel_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/files/abstract/misc/TOPLEVEL_DELTA_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/phase2_printerfriendly.css" type="text/css" />');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/serpstyles_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/search/stylesheets/style_printerfriendly.css" type="text/css"/>');			
		}else if(requestedJSP == 'training_information.jsp'){
			
			document.write('<link rel="stylesheet" href="/shared/stylesheets/pbar_printerfriendly.css" type="text/css"/>');
			
			document.write('<link rel="stylesheet" href="/shared/stylesheets/toplevel_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/files/abstract/misc/TOPLEVEL_DELTA_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/phase2_printerfriendly.css" type="text/css" />');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/serpstyles_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/search/stylesheets/style_printerfriendly.css" type="text/css"/>');			
		}else if(requestedJSP == 'event_calendar.jsp'){
			
			document.write('<link rel="stylesheet" href="/shared/stylesheets/pbar_printerfriendly.css" type="text/css"/>');
			
			document.write('<link rel="stylesheet" href="/shared/stylesheets/toplevel_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/files/abstract/misc/TOPLEVEL_DELTA_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/phase2_printerfriendly.css" type="text/css" />');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/serpstyles_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/search/stylesheets/style_printerfriendly.css" type="text/css"/>');			
		}else if(requestedJSP == 'taxonomy.jsp'){
			
			document.write('<link rel="stylesheet" href="/shared/stylesheets/pbar_printerfriendly.css" type="text/css"/>');

			document.write('<link rel="stylesheet" href="/shared/stylesheets/toplevel_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/phase2_printerfriendly.css" type="text/css" />');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/serpstyles_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/search/stylesheets/style_printerfriendly.css" type="text/css"/>');
		} else if(requestedJSP == 'application.jsp'){
			
			document.write('<link rel="stylesheet" href="/shared/stylesheets/pbar_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/toplevel_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/phase2_printerfriendly.css" type="text/css" />');
			document.write('<link rel="stylesheet" href="/files/abstract/misc/TOPLEVEL_DELTA_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/shared/stylesheets/serpstyles_printerfriendly.css" type="text/css"/>');
			document.write('<link rel="stylesheet" href="/search/stylesheets/style_printerfriendly.css" type="text/css"/>');			
		}
	}
} 

function printPage() {
	call_pbar_metrics('pb_print_page');
	
	var param = "&prfview=yes";
	
	var new_url = window.location.href + param;

	if (new_url.indexOf('?')>-1)
	{
		new_url = window.location.href +"&prfview=yes";
	}else{
		new_url = window.location.href + "?prfview=yes";
	}
	
	var obj = window.open(new_url,'SRWindow','resizable=yes,menubar=yes,scrollbars=yes,toolbar=no,status=yes,location=yes');
	obj.focus();
}

/*
function getRequestJsp () {
	var str = new String();
	str = window.location.href;
	str = str.substring(str.lastIndexOf("/") + 1,str.indexOf("?"));	
	return(str);
}
*/
function getRequestJsp(){
	var metaTags=document.getElementsByTagName("meta");

	var templateType = "";
	var templateTypeContent = "";

	for (var i = 0; i < metaTags.length; i++) {
		if (metaTags[i].getAttribute("name") == "templateType") {
			templateTypeContent = metaTags[i].getAttribute("content");
	
			if ("homepage" == templateTypeContent)
			{
				return "homepage.jsp";
			}
			if ("overview" == templateTypeContent)
			{
				return "overview.jsp";
			}
			if ("taxonomy" == templateTypeContent)
			{
				return "taxonomy.jsp";
			}
			if ("devices" == templateTypeContent || "reference_design" == templateTypeContent || "software_summary" == templateTypeContent 
					|| "tools_summary" == templateTypeContent )
			{
				return "prod_summary.jsp";
			}
			if ("devices" == templateTypeContent )
			{
				return "training_information.jsp";
			}
			if ("applications" == templateTypeContent )
			{
				return "application.jsp";
			}

			break;
		}
	}
	var str = new String();
	str = window.location.href;
	str = str.substring(str.lastIndexOf("/") + 1,str.indexOf("?"));	
	return(str);
}


function displayPrinterFriendlyMessage() {
	var query;
	var title;
	var hiddenStyle;
	title = document.URL;
	query = title.indexOf('?');


	if (getRequestVar('prfview') == 'yes') {
		var requestedJSP = getRequestJsp();
		var printerFriendlyMessage;
		var printerFriendlyMessage_Text;
		var printerFriendlyMessage_Header;
		if(requestedJSP == 'homepage.jsp'){
			printerFriendlyMessage = document.getElementById("previewMessage");
			printerFriendlyMessage_Header = document.createElement('h5');
			printerFriendlyMessage_Text = document.createTextNode('This is a preview of the page you are about to print. To print this view, use the Print command in your browser (in the File menu, choose Print).');
			printerFriendlyMessage.appendChild(printerFriendlyMessage_Header);
			printerFriendlyMessage_Header.appendChild(printerFriendlyMessage_Text);
		}else if(requestedJSP == 'overview.jsp'){
			printerFriendlyMessage = document.getElementById("previewMessage");
			printerFriendlyMessage_Header = document.createElement('h5');
			printerFriendlyMessage_Text = document.createTextNode('This is a preview of the page you are about to print. To print this view, use the Print command in your browser (in the File menu, choose Print).');
			printerFriendlyMessage.appendChild(printerFriendlyMessage_Header);
			printerFriendlyMessage_Header.appendChild(printerFriendlyMessage_Text);
		}else if(requestedJSP == 'prod_summary.jsp'){
			printerFriendlyMessage = document.getElementById("previewMessage");
			printerFriendlyMessage_Header = document.createElement('h5');
			printerFriendlyMessage_Text = document.createTextNode('This is a preview of the page you are about to print. To print the information under other tabs (Software and Tools, Buy/Parametrics), close this window, select a Tab, and click Export to Excel. To print this view, use the Print command in your browser (in the File menu, choose Print).');
			printerFriendlyMessage.appendChild(printerFriendlyMessage_Header);
			printerFriendlyMessage_Header.appendChild(printerFriendlyMessage_Text);
		}else if(requestedJSP == 'learning_summary.jsp'){
			printerFriendlyMessage = document.getElementById("previewMessage");
			printerFriendlyMessage_Header = document.createElement('h5');
			printerFriendlyMessage_Text = document.createTextNode('This is a preview of the page you are about to print (Orientation tab only). To print this view, use the Print command in your browser (in the File menu, choose Print).');
			printerFriendlyMessage.appendChild(printerFriendlyMessage_Header);
			printerFriendlyMessage_Header.appendChild(printerFriendlyMessage_Text);
		}else if(requestedJSP == 'training_information.jsp'){
			printerFriendlyMessage = document.getElementById("previewMessage");
			printerFriendlyMessage_Header = document.createElement('h5');
			printerFriendlyMessage_Text = document.createTextNode('This is a preview of the page you are about to print. To print this view, use the Print command in your browser (in the File menu, choose Print).');
			printerFriendlyMessage.appendChild(printerFriendlyMessage_Header);
			printerFriendlyMessage_Header.appendChild(printerFriendlyMessage_Text);
		}else if(requestedJSP == 'event_calendar.jsp'){
			printerFriendlyMessage = document.getElementById("previewMessage");
			printerFriendlyMessage_Header = document.createElement('h5');
			printerFriendlyMessage_Text = document.createTextNode('This is a preview of the page you are about to print. To print this view, use the Print command in your browser (in the File menu, choose Print).');
			printerFriendlyMessage.appendChild(printerFriendlyMessage_Header);
			printerFriendlyMessage_Header.appendChild(printerFriendlyMessage_Text);
		}else if(requestedJSP == 'taxonomy.jsp'){
			printerFriendlyMessage = document.getElementById("previewMessage");
			printerFriendlyMessage_Header = document.createElement('h5');
			printerFriendlyMessage_Text = document.createTextNode('This is a preview of the page you are about to print. To print the tables, close this window and click Export to Excel. To print this view, use the Print command in your browser (in the File menu, choose Print).');
			printerFriendlyMessage.appendChild(printerFriendlyMessage_Header);
			printerFriendlyMessage_Header.appendChild(printerFriendlyMessage_Text);
		} else if(requestedJSP == 'application.jsp'){
			printerFriendlyMessage = document.getElementById("previewMessage");
			printerFriendlyMessage_Header = document.createElement('h5');
			printerFriendlyMessage_Text = document.createTextNode('This is a preview of the page you are about to print. To print the information under other tabs (Software and Tools), close this window, select a Tab, and click Export to Excel. To print this view, use the Print command in your browser (in the File menu, choose Print).');
			printerFriendlyMessage.appendChild(printerFriendlyMessage_Header);
			printerFriendlyMessage_Header.appendChild(printerFriendlyMessage_Text);
		}
	}
} 

var inmenu=false;
var insubmenu=false;
var lastmenu=0;
var lastsubmenu=0;
var hoverSuffix = "_hover";
var menuToUse=0;
var itemToUse=0;

var headTop = -1;
var FloatHead1;
var FloatHead2;
var headBottom = 50000;

function processScrollStatic()
{
	if (headTop < 0)
	{
		saveHeadPosStatic();
	}
	if (headTop > 0)
	{
		saveHeadPosStatic();
		if (document.documentElement && document.documentElement.scrollTop)
			theTop = document.documentElement.scrollTop;
		else if (document.body) 
			theTop = document.body.scrollTop;
		//theTop = getTop();
		//FloatHead1.style.position = "absolute";
		if (theTop > headTop){
			if(theTop < headBottom){
				if(FloatHead1 != null){
					FloatHead1.style.top = (theTop-headTop+5) + 'px';
				}
				if(FloatHead2 != null){
					FloatHead2.style.top = (theTop-headTop-35) + 'px';
				}
			}
		}
		else{
			if(FloatHead1 != null){
				FloatHead1.style.top = '0px';
			}
			if(FloatHead2 != null){
				FloatHead2.style.top = '0px';
			}
		}

	}	
	//FloatHead1.style.margin='1px';
}

function saveHeadPosStatic()
{	
	parTable = document.getElementById("headStart");
	parTableEnd = document.getElementById("headEnd");
	if (parTable != null)
	{
		headTop = parTable.offsetTop + 3;	  
		FloatHead1 = document.getElementById("HeaderRow");
		FloatHead2 = document.getElementById("head1");
		if(FloatHead1 != null){
			FloatHead1.style.position = "relative";
			//FloatHead1.style.margin='8px';
			//FloatHead1.style.padding='1px';
		}
		if(FloatHead2 != null){
			FloatHead2.style.position = "relative";
			//FloatHead1.style.margin='8px';
			//FloatHead1.style.padding='1px';
		}

	}
	if (parTableEnd != null)
	{
		headBottom = parTableEnd.offsetTop - 150;	  

	}
}



/*var headTop = -1;
var FloatHead1;

function processScroll()
{
	var use_gebi=false, use_css=false, use_layers=false;
	if(document.getElementById){
		use_gebi=true;
	}else if(document.all){
		use_css=true;
	}else if(document.layers){
		use_layers=true;
	}

	if (headTop < 0)
    {
    	saveHeadPos();
	}
	if (headTop > 0)
	{
		if (document.documentElement && document.documentElement.scrollTop){
			theTop = document.documentElement.scrollTop;			
		}
		else if (document.body) 
			theTop = document.body.scrollTop;

		if (theTop > headTop)
		// { 
			var endFloat = document.getElementById("end_float");
			if(endFloat!=null){
				var endFloatTop = AnchorPosition_getPageOffsetTop(endFloat);
				if( (theTop+FloatHead1.offsetHeight) <endFloatTop ){
					var head1 = document.getElementById("head1");
					if (head1!=null){
						head1.style.top = (theTop-headTop) + "px";	
					}
				}
			}
		}
		else
			FloatHead1.style.top = "0px";
	}	
}

 */

function AnchorPosition_getPageOffsetTop(el){
	var ot=el.offsetTop;
	while((el=el.offsetParent) != null){
		ot += el.offsetTop;
	}
	return ot;
}

function AnchorPosition_getPageOffsetWidth(el){
	var ot=el.offsetLeft;
	while((el=el.offsetParent) != null){
		ot += el.offsetLeft;
	}
	return ot;
}


/*function saveHeadPos()
{	
    parTable = document.getElementById("headStart");
    if (parTable != null)
    {
	    headTop = parTable.offsetTop + 3;	  
	    FloatHead1 = document.getElementById("head1");
	    FloatHead1.style.position = "relative";
	}
}*/

function MenuForTools(current) {
	var _parentCoords = null;
	if (!document.getElementById) return;
	inmenu=true;
	oldmenu=lastmenu;
	lastmenu=current;
	if (oldmenu) Erase(oldmenu);
	t=document.getElementById("ConfigureTable-"+current);
	m=document.getElementById(current.split("Menu")[0]);
	box=document.getElementById(current);
	if(current=="DownloadMenu"){

		var parent=document.getElementById("downloadParent");
		_parentCoords= getCoords(parent);

		var _left = _parentCoords.left + m.offsetWidth  + box.offsetWidth/2;

		box.style.left = '400px';
		box.style.top = AnchorPosition_getPageOffsetTop(t) + m.offsetHeight+ 'px';
		if(_left < document.documentElement.scrollLeft){
			box.style.left = document.documentElement.scrollLeft;
		}
		box.style.visibility="visible";

	}
	if (m.className.indexOf(hoverSuffix)<0) {
		m.className = m.className + hoverSuffix;
	}
}

function Menu(current) {
	var _parentCoords = null;
	if (!document.getElementById) return;
	inmenu=true;
	oldmenu=lastmenu;
	lastmenu=current;
	if (oldmenu) Erase(oldmenu);
	t=document.getElementById("ConfigureTable-"+current);
	m=document.getElementById(current.split("Menu")[0]);
	box=document.getElementById(current);

	if(current=="CustomizeMenu"){
		parent1=document.getElementById("customizeParent");
		_parentCoords= getCoords(parent1);
		var _left = _parentCoords.left +_parentCoords.width + m.offsetWidth
		box.style.left = _parentCoords.left + m.offsetWidth +'px';

		//box.style.top = _parentCoords.top + m.offsetTop +  box.offsetHeight +10 +'px';
		box.style.top = AnchorPosition_getPageOffsetTop(t) + m.offsetHeight+ 'px';

		if(_left < document.documentElement.scrollLeft){
			box.style.left = document.documentElement.scrollLeft;
		}
		box.style.visibility="visible";

		//Added By b02195 for IPS Enhancements Start
		var tableEle = document.getElementById("CustomizeMenuTable");
		//alert(tableEle);
		if(tableEle != null){
			//alert("inside");
			if(tableEle.style.visibility!='visible'){
				tableEle.style.visibility = "visible";
			}
		}
		//Added By b02195 for IPS Enhancements End  
	}
	else if(current=="DownloadMenu"){

		var parent=document.getElementById("downloadParent");
		//START: Added for Freescale Look & Feel CR40452 on 31st Oct 2011.
		var tmpParentFlag = false;
		if(parent == null){
			tmpParentFlag = true;
			parent=document.getElementById("obviousBar");
			m=document.createElement("div");
			t=document.createElement("div");
			m.style.visibility="hidden";
			t.style.visibility="hidden";
			parent.appendChild(m);
			parent.appendChild(t);
		}
		//END: Added for Freescale Look & Feel CR40452 on 31st Oct 2011.

		//added by b46506  for CR43320 starts
		var t2=$('#obviousBar ul li a');
		var leftOffSet=0;
		for(var i=0;i<t2.length;i++){
			var temp =t2[i].text;
			var actual="Export to Excel";
			if(temp == actual )
				leftOffSet= t2[i].offsetLeft;
			//alert(leftOffSet);

		}
		//added by b46506  for CR43320 ends

		_parentCoords= getCoords(parent);

		var _left = _parentCoords.left + m.offsetWidth  + box.offsetWidth/2;

		//added by b46506  for CR43320 starts
		if(leftOffSet > 0){

			box.style.left = leftOffSet-14 +'px';
		}else{
			box.style.left = AnchorPosition_getPageOffsetWidth(t) +'px';
		}
		//added by b46506  for CR43320 ends


		box.style.top = AnchorPosition_getPageOffsetTop(t) + m.offsetHeight+ 'px';
		if(_left < document.documentElement.scrollLeft){
			box.style.left = document.documentElement.scrollLeft;
		}
		box.style.visibility="visible";
		//START: Added for Freescale Look & Feel CR40452 on 31st Oct 2011.
		if(tmpParentFlag){
			parent.removeChild(m);
			parent.removeChild(t);
		}
		//END: Added for Freescale Look & Feel CR40452 on 31st Oct 2011.
	}
	if (m.className.indexOf(hoverSuffix)<0) {
		m.className = m.className + hoverSuffix;
	}
}


function getCoords(elm) {
	var _height = elm.offsetHeight;
	var _width = elm.offsetWidth;
	var _top = elm.offsetTop;
	var _left = elm.offsetLeft;
	return new Coords(_top,_left,_height,_width);
}

function Coords(top,left,height,width) {
	this.top = top;
	this.left = left;
	this.height = height;
	this.width = width;
}


function Erase(current) {
	if (!document.getElementById) return;
	if (inmenu && lastmenu==current) {
		return;
	}
	if(insubmenu && lastsubmenu==current){
		return;
	}
	m=document.getElementById(current.split( "Menu" )[0]);
	if(m==null)
		m=document.getElementById(current);
	box=document.getElementById(current);
	if(box!=null){
		box.style.visibility="hidden";   
	}
	m.className = m.className.split( hoverSuffix )[0];
}

function Timeout(current) {
	inmenu=false;
	insubmenu=false;
	window.setTimeout("Erase('" + current + "')",2000) ;
}

function Highlight(menu,item,submenu) {
	if (!document.getElementById) return;
	//alert(menu+":"+menuToUse);
	menu=menuToUse;
	item=itemToUse;
	switchClass (document.getElementById('filterMenus'), '');

	if(submenu != undefined){
		subMenu(menu,item,submenu);
	}
}

function UnHighlight(menu,item,submenu) {
	if (!document.getElementById) return;
	if(menuToUse!=0) menu='null';
	if(menu!='null') Timeout(menu);
	obj=document.getElementById(item);
	if(submenu != undefined){
		EraseSubMenu(item,submenu);
	}else{
		obj.className = obj.className.split( hoverSuffix )[0];
	}
}

function setElems(menu,item) {
	menuToUse=menu;
	itemToUse=item;
}

function unsetElems() {
	menuToUse=0;
	itemToUse=0;
}

function subMenu(menu,item,submenu) {
	if (!document.getElementById) return;
	insubmenu=true;
	oldsubmenu=lastsubmenu;
	lastsubmenu=submenu;
	if (oldsubmenu) EraseSubMenu(item,oldsubmenu);   
	pm=document.getElementById(menu);
	m=document.getElementById(item);
	if(pm!=null){
		pm.style.position="relative";
	}

	_parentCoords =  getCoords(document.getElementById(menu));
	var _elm = document.getElementById(submenu);
	var item_elm =	document.getElementById(item);
	if (null!=_parentCoords) {
		// set element to 0:0 for countig its offset
		_elm.style.top=0 + 'px';
		_elm.style.left=0 + 'px';
		var _popupCoords = getCoords(_elm);
		// count layout offset
		var topPos = _parentCoords.top + item_elm.height ;
		_elm.style.top=topPos +'px';

		var leftPos = _parentCoords.left + item_elm.width -3;
		// fixing the position in case submenu is over the menu
		if ((leftPos<_parentCoords.left && leftPos+_popupCoords.width>_parentCoords.left + _parentCoords.width) &&
				((topPos<_parentCoords.top && topPos+_popupCoords.height>_parentCoords.top) ||
						(topPos>_parentCoords.top && topPos<_parentCoords.top + _parentCoords.height))) {
			leftPos = _parentCoords.left + _parentCoords.width/2;
		}	
		_elm.style.left=leftPos +'px';
		_elm.style.width=_popupCoords.width +'px';
		box=document.getElementById(submenu);
		if(document.documentElement.scrollWidth){
			if((leftPos+_elm.offsetWidth)>= document.documentElement.scrollWidth){
				leftPos = leftPos - _elm.offsetWidth;
			}
		}
		else if(document.body.scrollWidth){
			if((leftPos+_elm.offsetWidth)>=document.body.scrollWidth){
				leftPos = leftPos - _elm.offsetWidth;
				//alert("left 3 = " + leftPos);
			}
		}
		box.style.left = leftPos+'px';
		box.style.top = _elm.style.top;	 
		box.style.visibility="visible";
	}   
	if(m!=null){
		if (m.className.indexOf(hoverSuffix)<0) {
			m.className = m.className + hoverSuffix;
		}
	}
}

function EraseSubMenu(item,submenu) {
	if (!document.getElementById) return;   
	m=document.getElementById(item);
	box=document.getElementById(submenu);
	if(box!=null)  box.style.visibility="hidden";
}

function HighlightSubMenu(submenu,item) {
	if (!document.getElementById) return;
	insubmenu=true;   
	lastsubmenu=submenu;
	obj=document.getElementById(item);
	if (obj.className.indexOf(hoverSuffix)<0) {
		// alert(obj.className);
		obj.className = obj.className + hoverSuffix;
	} 
}

function UnHighlightSubMenu(item) {	
	if (!document.getElementById) return;
	obj=document.getElementById(item);
	obj.className = obj.className.split( hoverSuffix )[0];
}

function hoverImage(imageId) {
	if (!document.getElementById) return;
	obj=document.getElementById(imageId);
	if (obj.src.indexOf(hoverSuffix)<0) {
		obj.src = obj.src.split(".gif")[0] + hoverSuffix + ".gif";
	} 
}

function unhoverImage(imageId) {	
	if (!document.getElementById) return;
	obj=document.getElementById(imageId);
	if(obj.src.indexOf(hoverSuffix)>0) {
		obj.src = obj.src.split( hoverSuffix)[0] + ".gif";
	}
}

function toolbar_button_over(button, parent) {
	if (!document.getElementById) return;
	if(parent != undefined){
		Menu(parent);
	}
	m=document.getElementById(button);
	if (m.className.indexOf(hoverSuffix)<0) {
		m.className = m.className + hoverSuffix;
	}
}

function toolbar_button_out(button,parent) {
	if (!document.getElementById) return;
	if(parent != undefined){
		Timeout(parent);
	}
	m=document.getElementById(button);
	m.className = m.className.split( hoverSuffix )[0];
}

//sets element with id elmName checked value to true(default) or false
function setChecked(elementId, checked) {
	if (checked==null) {
		//default is true
		checked=true;
	}
	var obj = document.getElementById(elementId);
	if (obj!=null) {
		obj.checked=checked;
	}
}

function addParams()
{
	var listShow = document.getElementById("paramsShow");
	var listHide = document.getElementById("paramsHide");
	var toRemoveArr = new Array();
	for(i=0;i<listShow.options.length;i++) {
		if (listShow.options[i].selected)
		{
			var opt = new Option(listShow.options[i].text, listShow.options[i].value, false, false);
			listHide.options[listHide.options.length] = opt;
			toRemoveArr.push(listShow.options[i].value);
		}    
	}
	for (j=0; j<toRemoveArr.length; j++)
	{
		for(k=0;k<listShow.options.length;k++) {
			if (listShow.options[k].value == toRemoveArr[j])
			{
				listShow.options[k] = null;
			}
		}
	}
}

function removeParams()
{
	var listShow = document.getElementById("paramsShow");
	var listHide = document.getElementById("paramsHide");
	//Added By b02195 for IPS Enhancements Start
	var noOfColumns = listShow.options.length;
	var addColumnsFlag = true;
	//Added By b02195 for IPS Enhancements End
	var toRemoveArr = new Array();
	for(i=0;i<listHide.options.length;i++) {
		if (listHide.options[i].selected)
		{
			noOfColumns++;
			if(noOfColumns>MAX_COLUMN){
				addColumnsFlag = false;
			}
		}
	}
	if(addColumnsFlag==true){
		for(i=0;i<listHide.options.length;i++) {
			if (listHide.options[i].selected)
			{
				var opt = new Option(listHide.options[i].text, listHide.options[i].value, false, false);
				listShow.options[listShow.options.length] = opt;
				toRemoveArr.push(listHide.options[i].value);
			}
		}
	}else{
		alert("You can not add more than " + MAX_COLUMN + " columns");
		//addColumnsFlag = false;
	}
	/*for(i=0;i<listHide.options.length;i++) {
    if (listHide.options[i].selected)
    {
    	//Added By b02195 for IPS Enhancements Start
		noOfColumns++;
		if(noOfColumns<=MAX_COLUMN){
			//alert(noOfColumns+"="+MAX_COLUMN);
		//Added By b02195 for IPS Enhancements End
      		var opt = new Option(listHide.options[i].text, listHide.options[i].value, false, false);
      		listShow.options[listShow.options.length] = opt;
      		toRemoveArr.push(listHide.options[i].value);
      	//Added By b02195 for IPS Enhancements Start
		}else{
			alert("You can not add more than " + MAX_COLUMN + " columns");
			addColumnsFlag = false;
		}
	//Added By b02195 for IPS Enhancements End
    }
  }*/
//	Added By b02195 for IPS Enhancements Start

	if(addColumnsFlag==true){
		for (j=0; j<toRemoveArr.length; j++)
		{
			for(k=0;k<listHide.options.length;k++) {
				if (listHide.options[k].value == toRemoveArr[j])
				{
					listHide.options[k] = null;
				}
			}
		} 
		//Added By b02195 for IPS Enhancements End
	}
}
//Added By b02195 for IPS Enhancements Start
function removeAllParams(){
	var listShow = document.getElementById("paramsShow");
	var listHide = document.getElementById("paramsHide");
	//var toRemoveArr = new Array();
	for(i=0;i<listShow.options.length;i++) {
		//if (listHide.options[i].selected){
		var opt = new Option(listShow.options[i].text, listShow.options[i].value, false, false);
		listHide.options[listHide.options.length] = opt;
		//toRemoveArr.push(listHide.options[i].value);
		//}
	}
	//for (j=0; j<toRemoveArr.length; j++){
	var len = listShow.options.length;
	for(k=0;k<len;k++) {
		//if (listHide.options[k].value == toRemoveArr[j]){
		if(listShow.options[k]!=null){
			listShow.options[k] = null;
			k--;
		}
		//}
	}
	//}

}
//Added By b02195 for IPS Enhancements End
function appendClass (elm, clsName) {
	if (elm==null) {
		return;
	}
	elm.className=elm.className + ' ' + clsName;
}

function switchClass (elm, newClassName) {
	if (elm==null) {
		return;
	}
	var classes = elm.className.split(' ');
	var clsName = "";
	var separator = "";
	for (i=0; i<classes.length; i++) {
		clsName = clsName + separator + classes[i];
		separator = " ";
	}
	if(clsName==""){
		clsName = "filterMenuItem" + "_hover";
	}
	elm.className=clsName;
}

function image_button_over(imageId) {
	if (!document.getElementById) return;
	m=document.getElementById(imageId);

	if (m.src.indexOf(hoverSuffix)<0) {
		m.src = m.src.split( ".gif" )[0] + hoverSuffix+".gif";
	}
}

function image_button_out(imageId) {
	if (!document.getElementById) return;
	m=document.getElementById(imageId);
	m.src = m.src.split( hoverSuffix )[0]+".gif";
}


function Coords(top,left,height,width) {
	this.top = top;
	this.left = left;
	this.height = height;
	this.width = width;
}

function getCoords(elm) {
	if(elm!=null){
		var _height = elm.offsetHeight;
		var _width = elm.offsetWidth;
		var _top = elm.offsetTop;
		var _left = elm.offsetLeft;
		var _x = elm;	
		var _p = null;
		var _lastParent = null;
		while ( _x != null && _x.tagName.toUpperCase() != "BODY" ) {
			_p = _x.offsetParent;
			if (_p!=_lastParent) {
				_top += _p.offsetTop;
				_left += _p.offsetLeft;						   
			}
			_lastParent = _p;
			// here we finish, becase body is at the top
			_x = null;
		}
		return new Coords(_top,_left,_height,_width);
	}
}

function posDecrease()
{
	var listShow = document.getElementById("paramsShow");
	for(i=0;i<listShow.options.length;i++) {
		if (listShow.options[i].selected)
		{
			if (i > 0)
			{
				var prevOpt = listShow.options[i - 1];
				var selOpt = listShow.options[i];
				listShow.options[i] = new Option(" "," ",false, false);    
				listShow.options[i - 1] = selOpt;
				listShow.options[i] = prevOpt;
			}
		}  
	}  
}

function posIncrease()
{
	var listShow = document.getElementById("paramsShow");
	for(i=listShow.options.length-1; i>=0; i--) {
		if (listShow.options[i].selected)
		{
			if (i < listShow.options.length -1)
			{
				var nextOpt = listShow.options[i + 1];
				var selOpt = listShow.options[i];
				listShow.options[i] = new Option(" "," ",false, false);
				listShow.options[i + 1] = selOpt;
				listShow.options[i] = nextOpt;
			}
		}    
	}  
}
/* 	modified for CCT43585 by r1051z start 5 Jan 2007 */
function OpenClose(id){
	var ele = document.getElementById(id);
	var imName = ele.src.substring(ele.src.lastIndexOf('/')+1);
	if(ele!=null){


		var id = id.substring(4);
		var idtext = "pfId";

		if(imName=="mon.gif"){

			ele.alt="open";
			ele.src=ele.src.substring(0,ele.src.lastIndexOf('/')+1)+"pon.gif";
			id++;

			document.getElementById(idtext+id).style.display="none";
		}else if(imName=="pon.gif"){

			ele.alt="close";
			ele.src=ele.src.substring(0,ele.src.lastIndexOf('/')+1)+"mon.gif";
			id++;

			document.getElementById(idtext+id).style.display="";
		}else if(imName=="clo.gif"){

			ele.alt="close";
			ele.src=ele.src.substring(0,ele.src.lastIndexOf('/')+1)+"open.gif";
			id++;

			document.getElementById(idtext+id).style.display="";
		}else if(imName=="open.gif"){

			ele.alt="open";
			ele.src=ele.src.substring(0,ele.src.lastIndexOf('/')+1)+"clo.gif";
			id++;

			document.getElementById(idtext+id).style.display="none";
		}
	}
}
/* 	modified for CCT43585 by r1051z End 5 Jan 2007 */
//added by b17090 for cct70835 START 21-12-09
function getCookie(name) {
	var bikky = document.cookie;
	var index = bikky.indexOf(name + "=");
	if (index == -1) return null;
	index = bikky.indexOf("=", index) + 1; // first character
	var endstr = bikky.indexOf(";", index);
	if (endstr == -1) endstr = bikky.length; // last character
	return unescape(bikky.substring(index, endstr));
}
//added by b17090 for cct70835 END 21-12-09

function search(stateStr){
	stateStr = leftTrim(stateStr);
	var search_visitor_id = getCookie("freescale_visitor_id");
	stateStr+="`!svi="+search_visitor_id;

	var fromSearch = document.getElementById("fromSearch");
	if(fromSearch!=null){
		fromSearch.value="true";
	}
	/*var staticFile = document.getElementById("staticFile");
	if(staticFile!=null){
		staticFile.style.display="none";
		staticFile.innerHTML="";
	}*/
	var state = document.getElementById("searchState");

	state.innerHTML=stateStr;
	callSearch();
	//staticFile.style.display="none";
	//staticFile.innerHTML = "";
}

function changePageSize(pageDropBox,sep,field){
	var state = document.getElementById("searchStateString");
	state.innerHTML = field+"="+pageDropBox.options[pageDropBox.selectedIndex].value+sep+leftTrim(state.innerHTML) ;
	var newString = leftTrim(state.innerHTML);
	//document.write(newString);
	search(newString);
}
function pageNumClick(i,sep,field){
	//alert(i+","+sep+","+field);
	var state = document.getElementById("searchStateString");
	state.innerHTML = field +"="+i+sep+leftTrim(state.innerHTML) ;
	var newString = leftTrim(state.innerHTML);
	search(newString);
}
function advanceClick(str){
	var state = document.getElementById("searchStateString");
	state.innerHTML = state.innerHTML + str ;
	var newString = leftTrim(state.innerHTML);
	search(newString);
}
function headerSort(str,sep){
	//sep="`!";
	var state = document.getElementById("searchStateString");
	state.innerHTML = state.innerHTML + str;
	var newString = leftTrim(state.innerHTML);
	search(newString);
}
function updateCustomize(field,sep,multivaluedSep){
	/*var ele = document.getElementById("paramsShow");
	var str ="";
	for(var i=0;i<ele.options.length;i++){
		str += ele.options[i].value + multivaluedSep;
	}
	 */
	var state = document.getElementById("searchStateString");
	var newString = leftTrim(state.innerHTML);
	search(newString);
}

function showAllColumnsForStatic(field, allColumns, sep){
	var str="";
	str = field+"="+allColumns;
	var state = document.getElementById("searchStateString");

	var newString = leftTrim(state.innerHTML);
	newString = newString + str;
	search(newString);
}

function leftTrim(sString)
{
	while (sString.substring(0,1) == ' ' || sString.substring(0,1) == '\n'){
		sString = sString.substring(1, sString.length);
	}
	return sString;
}

function moreSubmit(field,colOrder,sep,elemCheckBox,num,multivaluedSep){
	var str="";
	var select_all_flag = false;
	for (var j = 0; j < num; j++){
		checkBoxElem = document.getElementById(eval("'"+(elemCheckBox+j)+"'"));
		if (checkBoxElem.checked || select_all_flag==true){
			if(checkBoxElem.value=='SELECT ALL'){
				select_all_flag = true;
			}else{
				str = str + checkBoxElem.value + multivaluedSep;
			}
		}		
	}
	var state = document.getElementById("searchStateString");
	state.innerHTML = state.innerHTML + field +"="+ str + colOrder;
	var newString = leftTrim(state.innerHTML);
	search(newString);
}

function filterSubmit(field,colOrder,headerId,sep,elemCheckBox,num){
	var str="";

	for (var j = 0; j < num; j++){
		checkBoxElem = document.getElementById(eval("'"+(elemCheckBox+j)+"'"));
		//	alert(checkBoxElem.checked);
		if (checkBoxElem.checked){
			str = str + headerId + "=" + checkBoxElem.value + sep;
		}		
	}
	//alert(str);
	var state = document.getElementById("searchStateString");
	state.innerHTML = state.innerHTML + str+ field +"="+ colOrder;
	//alert(state.innerHTML);
	var newString = leftTrim(state.innerHTML);
	state.innerHTML = newString + str;
	var newString = leftTrim(state.innerHTML);
	search(newString);
}
//Added by B11079 for CCT56849 Start on 28/05/2008
function inActiveStatusOPSubmit(field,colOrder){
	var str = "";
	var state = document.getElementById("searchStateString");
	state.innerHTML = state.innerHTML + str+ field +"="+ colOrder;
	//alert(state.innerHTML);
	var newString = leftTrim(state.innerHTML);
	state.innerHTML = newString + str;
	var newString = leftTrim(state.innerHTML);
	search(newString);
}
//Added by B11079 for CCT56849 End on 28/05/2008

function performComparison(searchTypeString,fieldId,sep,elemCheckBox,num,multivalueSep){
	var str="";
	var count=0;
	if(multivalueSep==null){
		multivalueSep="!`";
	}
	for (var j = 0; j < num; j++){
		checkBoxElem = document.getElementById(eval("'"+(elemCheckBox+j)+"'"));
		if (checkBoxElem.checked){
			if(str==""){
				str = checkBoxElem.value + multivalueSep;
			}else{
				str = str + checkBoxElem.value + multivalueSep;
			}
			count=count+1;
		}		
	}
	if(count<2){
		alert('Please select more than two rows for comparison');
		return;
	}
	str = fieldId + "=" + str;
	//alert(str);
	var state = document.getElementById("searchStateString");
	state.innerHTML = str + sep + searchTypeString+ sep+"isComparison=true"+sep+leftTrim(state.innerHTML);
	var newString = leftTrim(state.innerHTML);
	search(newString);
}
function columnHide(field,columnOrder,sep,headerId,multivaluedSep){
	//alert(columnOrder);
	//alert(sep);
	multivaluedSep="!`";
	//alert(headerId);
	var str="";
	var newColumnOrder="";
	var columns = columnOrder.split(multivaluedSep);
	//alert( columns.length);
	for (var i = 0; i < columns.length; i++){
		if (columns[i]!=headerId){
			//alert(columns[i]+","+headerId);
			if(newColumnOrder==""){
				newColumnOrder = columns[i];
			}else{
				newColumnOrder = newColumnOrder + multivaluedSep + columns[i];
			}
		}
	}
	str = field + "=" + newColumnOrder;
	var state = document.getElementById("searchStateString");
	state.innerHTML = state.innerHTML + sep + str;
	var newString = leftTrim(state.innerHTML);
	search(newString);
}


//
//getPageScroll()
//Returns array with x,y page scroll values.
//Core code from - quirksmode.org
//
function getPageScroll(){

	var xScroll, yScroll;

	if (self.pageYOffset) {
		xScroll = self.pageXOffset;
		yScroll = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
		xScroll = document.documentElement.scrollLeft;
		yScroll = document.documentElement.scrollTop;
	} else if (document.body) {// all other Explorers
		xScroll = document.body.scrollLeft;
		yScroll = document.body.scrollTop;
	}
	arrayPageScroll = new Array(xScroll,yScroll) 
	return arrayPageScroll;
}




//getPageSize()
//Returns array with page width, height and window width, height
//Core code from - quirksmode.org
//Edit for Firefox by pHaez

function getPageSize(){

	var xScroll, yScroll;

	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}

	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	

	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}

	//alert(pageWidth+","+pageHeight+","+windowWidth+","+windowHeight) ;
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
	return arrayPageSize;
}

function getLoadingHeight(){
	var n_win = window.pageYOffset ? window.pageYOffset : 0;
	var n_docel = document.documentElement ? document.documentElement.scrollTop : 0;
	var n_body = document.body ? document.body.scrollTop : 0;

	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function getLoadingWidth(){
	var n_win = window.pageXOffset ? window.pageXOffset : 0;
	var n_docel = document.documentElement ? document.documentElement.scrollLeft : 0;
	var n_body = document.body ? document.body.scrollLeft : 0;

	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;	
}
function selectall(elemCheckBox,num){
	var checkBoxElem;
	var select_all_flag = false;
	for (var j = 0; j < num; j++){
		checkBoxElem = document.getElementById(eval("'"+(elemCheckBox+j)+"'"));
		if(j==0){
			if(checkBoxElem.checked){
				select_all_flag = true;
			}
		}
		else{
			if(select_all_flag==true){
				checkBoxElem.checked = true;
			}else{
				checkBoxElem.checked = false;
			}
		}		
	}
}
function doNothing(){
	//alert("in");
}
/* add event handlers here */
//window.onscroll = processScroll;

//added by b05535 for PPI start 10-Mar-08
function loadGWTComponent(){
	var str="";
	var state = document.getElementById("searchStateString");
	state.innerHTML = state.innerHTML + str;
	//alert(state.innerHTML);
	var newString = leftTrim(state.innerHTML);
	state.innerHTML = newString + str;
	var newString = leftTrim(state.innerHTML);
	search(newString);
}
//added by b05535 for PPI end 10-Mar-08
<!--//--><![CDATA[//><!--
sfPBarHover = function() {
	var navPbar = document.getElementById("pbarNav");
	if (navPbar){
		var sfEls = document.getElementById("pbarNav").getElementsByTagName("LI");
		for (var i=0; i<sfEls.length; i++) {
			sfEls[i].onmouseover=function() {
				this.className+=" sfpbarhover";
			}
			sfEls[i].onmouseout=function() {
				this.className=this.className.replace(new RegExp(" sfpbarhover\\b"), "");
			}
		}
	}
}
if (window.attachEvent) window.attachEvent("onload",sfPBarHover);
//--><!]]>

var popupTimerHandle = null;
var popupHandlerForPageAction= null;
function findPosX(obj)
{
	var curleft = 0;
	if(obj.offsetParent)
		while(1) 
		{
			curleft += obj.offsetLeft;
			if(!obj.offsetParent)
				break;
			obj = obj.offsetParent;
		}
	else if(obj.x) 
		curleft += obj.x;
	return curleft;
}

function findPosY(obj)
{
	var curtop = 0;
	if(obj.offsetParent)
		while(1)
		{
			curtop += obj.offsetTop;
			if(!obj.offsetParent)
				break;
			obj = obj.offsetParent;
		}
	else if(obj.y)
		curtop += obj.y;

	return curtop;
}

function setPosPageAction(refObj, childObj) 
{

	var referenceObj = document.getElementById(refObj);

	var parentTop= referenceObj.offsetTop;
	var parentHeight = referenceObj.offsetHeight;
	var parentLeft = referenceObj.offsetLeft;
	var parentWidth = referenceObj.offsetWidth;
	var parentRight = findPosX(referenceObj) + parentWidth;
	var childObj = document.getElementById(childObj);
	var childWidth = childObj.offsetWidth;
	childObj.style.top =parentHeight +findPosY(referenceObj)+ 'px';
	childObj.style.left =parentRight-childWidth+ 'px';


}
function showMenu(div) {
	if (popupTimerHandle != null) {
		clearTimeout(popupTimerHandle);
		popupTimerHandle = null;
	}
	if (popupHandlerForPageAction != null) {
		clearTimeout(popupHandlerForPageAction);
		popupHandlerForPageAction = null;
	}

	divObj = document.getElementById(div);
	divObj.style.display = 'block';
}
function popupTimerHandleShow(div) {
	if (popupTimerHandle != null) {
		clearTimeout(popupTimerHandle);
		popupTimerHandle = null;
	}
	divObj = document.getElementById(div);
	divObj.style.display = 'block';
}
function popupHandlerPAShow(div) {
	if (popupHandlerForPageAction  != null) {
		clearTimeout(popupHandlerForPageAction );
		popupHandlerForPageAction = null;
	}
	divObj = document.getElementById(div);
	divObj.style.display = 'block';
}
function hideMenu(div) {
	popupTimerHandle = setTimeout("hideMenuAct('" + div + "');", 250);
}
function hideMenuForPA(div) {
	popupHandlerForPageAction= setTimeout("hideMenuAct('" + div + "');",50);
}
function hideMenuAct(div) {
	divObj = document.getElementById(div);
	divObj.style.display = 'none';
}   
function displayWhyReg(code){

	var url = "/webapp/shared/components/inc_collateral.jsp?code="+code;
	var langCd ="";
	if(document.getElementById("language_option")){
		langCd = document.getElementById("language_option").value;
		url = url +"&language="+langCd;
	}
	var window_title = getTranslatedText('Why Should I Register?');
	var width = "700";
	var height = "350";
	ajaxwin=dhtmlwindow.open('ajaxbox',url,window_title, 'width='+width+'px,height='+height+'px,left=100px,top=100px,resize=0,scrolling=1');
	return ajaxwin ;
}

function call_pbar_metrics(action)
{
	if (window.personalization_bar_metrics && action!= 'undefined' ){
		personalization_bar_metrics(action);
	}
}// -------------------------------------------------------------------
//DHTML Window Widget- By Dynamic Drive, available at: http://www.dynamicdrive.com
//v1.0: Script created Feb 15th, 07'
//v1.01: Updated to v1.01 Feb 21th, 07'
//-------------------------------------------------------------------
/* WOW: params for adding addthis widget :start*/
var videoURL="";
var videoTitle="";
var recalonload ="";
//var showprogress =false; //Added for the CR33774 by b36554 on 30Apr2013
var progressdiv;
var identifier='';
/* WOW: params for adding addthis widget: end*/
var dhtmlwindow={
		ajaxbustcache: true, //Bust caching when fetching a file via Ajax?

		minimizeorder: 0,
		tobjects: [], //object to contain references to dhtml window divs, for cleanup purposes

		init:function(t){
			var domwindow=document.createElement("div") //create dhtml window div
			domwindow.id=t
			if(typeof t !="undefined" && t=='feedBackajaxbox'){
				identifier=t;
			}
			domwindow.className="dhtmlwindow"
				var domwindowdata=''
					domwindowdata='<div class="drag-handle">'
						if(typeof recalonload != "undefined" && ( recalonload == 'history'|| recalonload == 'webnote'|| recalonload == 'training'|| recalonload == 'downloaded')){
							//Added by b37913 for CR-47387 
//							added id=Close to handle close button for other language
							domwindowdata+='DHTML Window:<div class="drag-controls"><img id="Close" onclick="hideselectsHistory();" src="/shared/images/x.png" title="'+getTranslatedText('Close')+'" style="margin-right:5px;margin-top:5px;width:14px;height:14px;" /></div>'
							domwindowdata+='</div>'
						}
						else
						{
							//Added by b37913 for CR-47387 
//							added id=Close to handle close button for other language
							domwindowdata+='DHTML Window:<div class="drag-controls"><img id="Close" src="/shared/images/x.png" title="'+getTranslatedText('Close')+'" style="margin-right:5px;margin-top:5px;width:14px;height:14px;"/></div>'
							domwindowdata+='</div>'

						}
			/* WOW: params for adding addthis widget : start*/
			if(typeof recalonload != "undefined" && recalonload == 'video'){
				domwindowdata+='<div id="addThis" ></div>';
			}
			/* WOW: params for adding addthis widget : end */

			if(typeof recalonload != "undefined" && ( recalonload == 'history'|| recalonload == 'webnote'|| recalonload == 'training'|| recalonload == 'downloaded')){
				domwindowdata+='<div id='+recalonload+' class="drag-contentarea"></div>'
			}
			/*added by b41913 for CR-54433 on 24th Jan 2014 start*/
			else if(typeof recalonload != "undefined" && ( recalonload == 'Inventory'))
			{
				domwindowdata+='<div id='+recalonload+' class="drag-contentarea"></div>'
			}/*added by b41913 for CR-54433 on 24th Jan 2014 end*/

			else 
			{
				domwindowdata+='<div class="drag-contentarea"></div>'
			}

			domwindowdata+='</div>'
				domwindow.innerHTML=domwindowdata


				document.getElementById("dhtmlwindowholder").appendChild(domwindow)


				this.zIndexvalue=(this.zIndexvalue)? this.zIndexvalue+1 : 100 //z-index value for DHTML window: starts at 0, increments whenever a window has focus
						var t=document.getElementById(t)
						var divs=t.getElementsByTagName("div")
						for (var i=0; i<divs.length; i++){ //go through divs inside dhtml window and extract all those with class="drag-" prefix
							if (/drag-/.test(divs[i].className))
								t[divs[i].className.replace(/drag-/, "")]=divs[i] //take out the "drag-" prefix for shorter access by name
						}
			t.style.zIndex=this.zIndexvalue //set z-index of this dhtml window
			t.handle._parent=t //store back reference to dhtml window
			t.controls._parent=t //same
			t.onclose=function(){return true} //custom event handler "onclose"
			t.onmousedown=function(){dhtmlwindow.zIndexvalue++; this.style.zIndex=dhtmlwindow.zIndexvalue} //Increase z-index of window when focus is on it
			t.handle.onmousedown=dhtmlwindow.setupdrag //set up drag behavior when mouse down on handle div
			t.controls.onclick=dhtmlwindow.enablecontrols
			t.show=function(){dhtmlwindow.show(this)} //public function for showing dhtml window
			t.hide=function(){dhtmlwindow.close(this)} //public function for hiding dhtml window
			t.setSize=function(w, h){dhtmlwindow.setSize(this, w, h)} //public function for setting window dimensions

			//
			//
			t.moveTo=function(x, y){dhtmlwindow.moveTo(this, x, y)} //public function for moving dhtml window (relative to viewpoint)
			if(typeof recalonload != "undefined" && ( recalonload == 'history'|| recalonload == 'webnote'|| recalonload == 'training'|| recalonload == 'downloaded')){
				t.contentarea.style.overflowX="hidden";
				t.contentarea.style.overflowY="auto";
			}
			else
			{
				t.isScrolling=function(bol){dhtmlwindow.isScrolling(this, bol)} 
			}//public function for specifying if window content contains scrollbars
			/* modifications for 56853 */
			t.load=function(contentsource, title,contenttype){dhtmlwindow.load(this, contentsource, title,contenttype)} //public function for loading content into window
			//t.load=function(contentsource, title){dhtmlwindow.load(this, contentsource, title)} //public function for loading content into window
			/* modifications for 56853 */

			this.tobjects[this.tobjects.length]=t

			if(typeof identifier !="undefined" && identifier=='feedBackajaxbox'){
				t.style.zIndex=200;
			}

			return t //return reference to dhtml window div
		},

		/* modifications for 56853 */
//		open:function(t, contentsource, title, attr, recalonload){
		open:function(t, contentsource, title, attr, recalonload1,contenttype){
			/* modifications for 56853 */
			/* WOW: params for adding addthis widget : start*/
			recalonload = recalonload1;
			/* WOW: params for adding addthis widget : end*/

			var d=dhtmlwindow //reference dhtml window object
			function getValue(Name){
				var config=new RegExp(Name+"=([^,]+)", "i") //get name/value config pair (ie: width=400px,)
				return (config.test(attr))? parseInt(RegExp.$1) : 0 //return value portion (int), or 0 (false) if none found
			}
			if (document.getElementById(t)==null){ //if window doesn't exist yet, create it
				t=this.init(t) //return reference to dhtml window div
			}
			else{
				t=document.getElementById(t)
				if(typeof identifier !="undefined" && identifier=='feedBackajaxbox'){
					t.style.zIndex=200;
				}
			}
			t.setSize(getValue(("width")), (getValue("height"))) //Set dimensions of window
			var xpos=getValue("center")? "middle" : getValue("left") //Get x coord of window
					var ypos=getValue("center")? "middle" : getValue("top") //Get y coord of window
							t.moveTo(xpos, ypos) //Position window
							if (typeof recalonload!="undefined" && recalonload=="recal" && this.scroll_top==0){ //reposition window when page fully loads with updated window viewpoints?
								if (window.attachEvent && !window.opera) //In IE, add another 400 milisecs on page load (viewpoint properties may return 0 b4 then)
									this.addEvent(window, function(){setTimeout(function(){t.moveTo(xpos, ypos)}, 400)}, "load")
									else
										this.addEvent(window, function(){t.moveTo(xpos, ypos)}, "load")
							}
			if(typeof recalonload != "undefined" && ( recalonload == 'eventPopup' || recalonload == 'history'|| recalonload == 'webnote'|| recalonload == 'training'|| recalonload == 'downloaded'))
			{
				t.contentarea.style.overflowX="hidden";
				t.contentarea.style.overflowY="auto";
			}
			else
			{
				t.isScrolling(getValue("scrolling")) 
			}//Set whether window should contain scrollbars
			t.style.visibility="visible"
				//Added for the CR33774 by b36554 on 30Apr2013 starts
				t.style.display="block"
					/*if(this.showprogress = true){  
		t.contentarea.innerHTML="<div style=\"position:absolute; left:145px; top:155px;\"><img src=\"/search/images/loading_bar.gif\" /><br><div nowrap><font color=\"#A7BB08\"><BLINK>Please Wait...</BLINK></font></div></div>";
	}*/
					//Added for the CR33774 by b36554 on 30Apr2013 ends
					t.contentarea.style.display="block"

						/* Modified for Online Feedback - */
						/* Modified for search history - */




						if(typeof recalonload != "undefined" && ( recalonload == 'history'|| recalonload == 'webnote'|| recalonload == 'training'|| recalonload == 'downloaded')){
//							alert(recalonload);
							var div_id="progressid"+recalonload;
							document.getElementById(recalonload).innerHTML="<div id='"+div_id+"'></div>";
							progressdiv=document.getElementById(div_id);
							if(typeof progressdiv != "undefined" && progressdiv != null)
							{//alert("progressdiv");
								progressdiv.style.visibility="visible";
								progressdiv.innerHTML=" <p class=\"loadImage\" style=\"text-align:center; font-weight: 700;\"><span class=\"icon-para-reset spin-icon\"></span> <br/> LOADING</p>";
								progressdiv.style.position="absolute";
								progressdiv.style.left="290px";
								progressdiv.style.top="250px";
								progressdiv.style.width="150px";

							}

						}	/*added by b41913 for CR-54433 on 27th Jan 2014:start */
			if(typeof recalonload != "undefined" && ( recalonload == 'Inventory')){
				var div_id="progressid"+recalonload;
				document.getElementById('Inventory').innerHTML="<div id='"+div_id+"'></div>";
				progressdiv=document.getElementById(div_id);
				if(typeof progressdiv != "undefined" && progressdiv != null)
				{
					progressdiv.style.visibility="visible";
					progressdiv.innerHTML="<img src=\"/search/images/loading_bar.gif\" style=\"display:block;position:relative;left:16px;width:100px;padding:1px\"/><br><br/><br/><br/><br/><br/><font color=\"#A7BB08\" style=\"position:relative; left:15px\">"+getTranslatedText("Checking Availability")+"...</font>";
					progressdiv.style.position="relative";
				}
			}/*added by b41913 for CR-54433 on 27th Jan 2014:end */
			/*Modified for Online Feedback end*/
			//t.load(contentsource, title)
			t.load(contentsource, title,contenttype)


			/* WOW: params for adding addthis widget : start*/
			if(typeof recalonload != "undefined" && recalonload == 'video'){
				if (window.copyInnerHTML){
					copyInnerHTML("addThis",videoURL,videoTitle);
				}
			}
			/* WOW: params for adding addthis widget : end*/
			return t
		},

		setSize:function(t, w, h){ //set window size (min is 150px wide by 100px tall)
			t.style.width=Math.max(parseInt(w), 150)+"px"
			t.contentarea.style.height=Math.max(parseInt(h), 100)+"px"
		},

		moveTo:function(t, x, y){ //move window. Position includes current viewpoint of document
			this.getviewpoint() //Get current viewpoint numbers
			t.style.left=(x=="middle")? this.scroll_left+(this.docwidth-t.offsetWidth)/2+"px" : this.scroll_left+parseInt(x)+"px"
					t.style.top=(y=="middle")? this.scroll_top+(this.docheight-t.offsetHeight)/2+"px" : this.scroll_top+parseInt(y)+"px"
		},

		isScrolling:function(t, bol){ //set whether loaded content contains scrollbars
			t.contentarea.style.overflow=(bol)? "auto" : "hidden"
		},


		load:function(t, contentsource, title,contenttype){ //loads content into window plus set its title (3 content types: "inline", "iframe", or "ajax")
			if( (typeof contenttype!="undefined") && (contenttype=="inline") ){
				t.handle.firstChild.nodeValue=title
				t.contentarea.innerHTML=contentsource
				//START: Added for Marketing Automation Project CCT81167 by B28384 on 01st June 2011
			}else if( (typeof contenttype!="undefined") && (contenttype=="iframe") ){

				var newIframe = document.createElement("iframe");
				newIframe.width = "99%";
				newIframe.height = "94%";
				newIframe.style.border="0px";
				newIframe.frameBorder = "0";

				t.handle.firstChild.nodeValue=title
				t.contentarea.innerHTML = "<div id='ytchannel'><a target='_blank' href='http://www.youtube.com/subscription_center?add_user=freescale'><img src='http://image.nxp.com/files/graphic/buttons/G5096_button_v2_o1.png' border='0' style='padding-left:5px; padding-bottom:2px;'></a></div>";
				t.contentarea.appendChild(newIframe);
				newIframe.src=contentsource
				//END: Added for Marketing Automation Project CCT81167 by B28384 on 01st June 2011
			}else{
				t.handle.firstChild.nodeValue=title
				this.ajax_connect(contentsource, t) //populate window with external contents fetched via Ajax
			}
		},
		/* modifications for 56853 */

		setupdrag:function(e){
			var d=dhtmlwindow //reference dhtml window object
			var t=this._parent //reference dhtml window div
			d.etarget=this //remember div mouse is currently held down on ("handle" or "resize" div)
			var e=window.event || e
			d.initmousex=e.clientX //store x position of mouse onmousedown
			d.initmousey=e.clientY
			d.initx=parseInt(t.offsetLeft) //store offset x of window div onmousedown
			d.inity=parseInt(t.offsetTop)
			d.width=parseInt(t.offsetWidth) //store width of window div
			d.contentheight=parseInt(t.contentarea.offsetHeight) //store height of window div's content div
			if (t.contentarea.datatype=="iframe"){ //if content of this window div is "iframe"
				t.style.backgroundColor="#F8F8F8" //colorize and hide content div (while window is being dragged)
					t.contentarea.style.visibility="hidden"
			}
			document.onmousemove=d.getdistance //get distance travelled by mouse as it moves
			document.onmouseup=function(){
				if (t.contentarea.datatype=="iframe"){ //restore color and visibility of content div onmouseup
					t.contentarea.style.backgroundColor="white"
						t.contentarea.style.visibility="visible"
				}
				d.stop()
			}
			return false
		},

		getdistance:function(e){
			var d=dhtmlwindow
			var etarget=d.etarget
			var e=window.event || e
			d.distancex=e.clientX-d.initmousex //horizontal distance travelled relative to starting point
			d.distancey=e.clientY-d.initmousey
			if (etarget.className=="drag-handle") //if target element is "handle" div
				d.move(etarget._parent, e)
				else if (etarget.className=="drag-resizearea") //if target element is "resize" div
					d.resize(etarget._parent, e)
					return false //cancel default dragging behavior
		},

		getviewpoint:function(){ //get window viewpoint numbers
			var ie=document.all && !window.opera
			var domclientWidth=document.documentElement && parseInt(document.documentElement.clientWidth) || 100000 //Preliminary doc width in non IE browsers
			this.standardbody=(document.compatMode=="CSS1Compat")? document.documentElement : document.body //create reference to common "body" across doctypes
					this.scroll_top=(ie)? this.standardbody.scrollTop : window.pageYOffset
							this.scroll_left=(ie)? this.standardbody.scrollLeft : window.pageXOffset
									this.docwidth=(ie)? this.standardbody.clientWidth : (/Safari/i.test(navigator.userAgent))? window.innerWidth : Math.min(domclientWidth, window.innerWidth-16)
											this.docheight=(ie)? this.standardbody.clientHeight: window.innerHeight
		},

		rememberattrs:function(t){ //remember certain attributes of the window when it's minimized or closed, such as dimensions, position on page
			this.getviewpoint() //Get current window viewpoint numbers
			t.lastx=parseInt((t.style.left || t.offsetLeft))-dhtmlwindow.scroll_left //store last known x coord of window just before minimizing
			t.lasty=parseInt((t.style.top || t.offsetTop))-dhtmlwindow.scroll_top
			t.lastwidth=t.style.width //store last known width of window just before minimizing
		},

		move:function(t, e){
			t.style.left=dhtmlwindow.distancex+dhtmlwindow.initx+"px"
			t.style.top=dhtmlwindow.distancey+dhtmlwindow.inity+"px"
		},

		enablecontrols:function(e){
			var d=dhtmlwindow
			var sourceobj=window.event? window.event.srcElement : e.target //Get element within "handle" div mouse is currently on (the controls)
					if (/Close/i.test(sourceobj.getAttribute("id"))) //if this is the "close" control
						d.close(this._parent)
						return false
		},

//		changes for CCT56853 start
		close:function(t){

//			changes for CCT56853	end
			/* Modified by b12874 for Online Feedback - WOW on 20-10-2008 START*/
			if(document.getElementById('feedBackajaxbox')!=null && document.getElementById('feedBackajaxbox').style.zIndex!=-1){
				prehideBlock();
				return;
			}
			/* Modified by b12874 for Online Feedback - WOW on 20-10-2008 end*/
			t.contentarea.innerHTML ="";

			try{
				var closewinbol=t.onclose()
			}
			catch(err){ //In non IE browsers, all errors are caught, so just run the below
				alert(err)
				var closewinbol=true
			}
			finally{ //In IE, not all errors are caught, so check if variable isn't defined in IE in those cases
				if (typeof closewinbol=="undefined"){
					alert("An error has occured somwhere inside your \"onclose\" event handler")
					var closewinbol=true
				}
			}
			if (closewinbol){ //if custom event handler function returns true
				if (t.state!="minimized") //if this window isn't currently minimized
					dhtmlwindow.rememberattrs(t) //remember window's dimensions/position on the page before closing
					t.style.display="none"
			}
			return closewinbol
		},

		show:function(t){
			if (t.lastx) //If there exists previously stored information such as last x position on window attributes (meaning it's been minimized or closed)
				dhtmlwindow.restore(t.controls.firstChild, t) //restore the window using that info
				else
					t.style.display="block"
						t.state="fullview" //indicate the state of the window as being "fullview"
		},

		ajax_connect:function(url, t){
			var page_request = false
			var bustcacheparameter=""
				if (window.XMLHttpRequest) // if Mozilla, IE7, Safari etc
					page_request = new XMLHttpRequest()
				else if (window.ActiveXObject){ // if IE6 or below
					try {
						page_request = new ActiveXObject("Msxml2.XMLHTTP")
					} 
					catch (e){
						try{
							page_request = new ActiveXObject("Microsoft.XMLHTTP")
						}
						catch (e){}
					}
				}
				else
					return false
					page_request.onreadystatechange=function(){dhtmlwindow.ajax_loadpage(page_request, t)}
			if (this.ajaxbustcache) //if bust caching of external page
				bustcacheparameter=(url.indexOf("?")!=-1)? "&"+new Date().getTime() : "?"+new Date().getTime()
						page_request.open('GET', url+bustcacheparameter, true)
						page_request.send(null)
		},

		ajax_loadpage:function(page_request, t){
			if (page_request.readyState == 4 && (page_request.status==200 || window.location.href.indexOf("http")==-1)){

				if(typeof recalonload != "undefined" && recalonload == 'webnote')
				{
					var unsText=unescape(page_request.responseText);
					t.contentarea.innerHTML=unsText;
					var notesCnt = document.getElementById('totalNotesCnt').value;
					//alert('notesCnt:'+notesCnt);
					for(i=0;i<notesCnt; i++){
						var noteId = 'noteBody'+i;

						if(document.getElementById(noteId).innerHTML.length>30)
						{//alert("length is <25")
							document.getElementById(noteId).innerHTML=document.getElementById(noteId).innerHTML.substring(0,29)+"...";
						}


						var anchId = 'anch'+i;

						if(document.getElementById(anchId).title>250)
						{//alert("length is >250")
							document.getElementById(anchId).title = document.getElementById(anchId).title.substring(0,249);
						}
						//alert(document.getElementById(noteId).innerHTML);
					}
				} else {
					t.contentarea.innerHTML=page_request.responseText;
				}

				if(typeof progressdiv != "undefined" && progressdiv != null)
				{
					progressdiv.style.visibility="hidden";
				}
				//  t.removeChild(progressdiv);
			}
		},


		stop:function(){
			dhtmlwindow.etarget=null //clean up
			document.onmousemove=null
			document.onmouseup=null
		},

		addEvent:function(target, functionref, tasktype){ //assign a function to execute to an event handler (ie: onunload)
			var tasktype=(window.addEventListener)? tasktype : "on"+tasktype
					if (target.addEventListener)
						target.addEventListener(tasktype, functionref, false)
						else if (target.attachEvent)
							target.attachEvent(tasktype, functionref)
		},

		cleanup:function(){
			window.onload=null
		}

} //End dhtmlwindow object

document.write('<div id="dhtmlwindowholder"><span style="display:none">.</span></div>') //container that holds all dhtml window divs on page
window.onunload=dhtmlwindow.cleanup

function explainDiagram(text){
	var explainBox = document.getElementById('blockDetails');
	explainBox.innerHTML = text;
}
function explainPhoto(text){
	var explainBox = document.getElementById('photoDetails');
	explainBox.innerHTML = text;
}
function changePhoto(img){
	var imgBox = document.getElementById('photoDiagram');
	imgBox.innerHTML = "<img src='"+img+"'>";
}
/** Add START by B17090 on 14-Oct-2009 For CCT68841  **/
function playVideo(content,title,width,height){
	openVideoFile(content,title,'','','',width,height);
}
function openVideo(content,title,duration,recrdVideoUrl,width,height){
	openVideoFile(content,title,duration,'',recrdVideoUrl,width,height); 
}
/** Add END by B17090 on 14-Oct-2009 For CCT68841  **/
//This will not be used After clients have modified functions in collaterals to call new methods
//that will also track the video history
/** Add START by B17090 on 14-Oct-2009 For CCT68841  **/
function openVideoFile(content,title,duration,flashPlayer,recrdVideoUrl,width,height){

	if (!width) { width = 425; }
	if (!height) { height = 350; }
	windowWidth = width;
	//windowHeight = parseInt(height) + 50;
	windowHeight = parseInt(height);  /** changed windowheight here and below DK 1/19/2011**/
	if (!flashPlayer) {flashPlayer = "http://cache.nxp.com/files/mediaplayer/player.swf";}  /* Update to new jw player */
	var defaultSwfExpressInstall =  "http://cache.nxp.com/files/ajax/flvplayer/expressInstall.swf";
	var requiredSwfVersion = "9.0.28";

	if(content != undefined && content!=null && content  != '' ) {			
		recordVideoHistory(content,'WATCH_VIDEO');  // uncommented for CR40465 on 9/8/2011--- ////////  ADD BACK IN - - commented out for testing - DK 3/25/2011
	}
	/** Add END by B17090 on 14-Oct-2009 For CCT68841  **/

	var time = 0;
	youtube_metrics(content,title,duration,time); // uncommented for CR40465 on 9/8/2011---  ////// ADD BACK IN - commented out for testing - DK 3/25/2011
	var flashplayer_path= flashPlayer;
	if ( content.length < 4 ){
		alert("Incorrect Video Format");
		return false;
	}

	videoURL=content;
	videoTitle=title;

	var video_extn = content.substring( (content.length - 4) );

	if ( video_extn != '' ){
		video_extn = video_extn.toLowerCase(); 
	}

	//START: Added for Marketing Automation Project CCT81167 by B28384 on 01st June 2011
	if(content.indexOf("/download/video/") > -1){
		content1 ="<div id='flshc' style='height=\"94%\"'></div>"; /** changed windowheight DK 1/19/2011**/
		ajaxwin=dhtmlwindow.open('ajaxbox',content,title, 'width='+windowWidth+'px,height='+windowHeight+'px,left=250px,top=100px,resize=0,scrolling=0','video','iframe');
		var flashvars = { autoplay: true };	
//		var params = { scale: "noscale", allowfullscreen: "true", salign: "tl", bgcolor: "#ffffff"};
		var params = { allowfullscreen: "true", salign: "tl", bgcolor: "#ffffff"};
		var attributes = { align: "left", base: "." };
		swfobject.embedSWF(content, "flshc", width, height, requiredSwfVersion, defaultSwfExpressInstall, flashvars, params, attributes);
		//END: Added for Marketing Automation Project CCT81167 by B28384 on 01st June 2011
	}else if(video_extn.indexOf(".swf")!=-1){
		content1 ="<div id='flshc' style='height=\"94%\"'></div>"; /** changed windowheight DK 1/19/2011**/
		ajaxwin=dhtmlwindow.open('ajaxbox',content1,title, 'width='+windowWidth+'px,height='+windowHeight+'px,left=250px,top=100px,resize=0,scrolling=0','video','inline');
		var flashvars = { autoplay: true };	
//		var params = { scale: "noscale", allowfullscreen: "true", salign: "tl", bgcolor: "#ffffff"};
		var params = { allowfullscreen: "true", salign: "tl", bgcolor: "#ffffff"};
		var attributes = { align: "left", base: "." };
		swfobject.embedSWF(content, "flshc", width, height, requiredSwfVersion, defaultSwfExpressInstall, flashvars, params, attributes);
	} else if ((video_extn.indexOf(".flv")!=-1) ){
		content1 ="This is a FLV file<div id='flshc'  style='height=\"94%\"'></div>"; /** changed windowheight DK 1/19/2011**/
		ajaxwin=dhtmlwindow.open('ajaxbox',content1,title, 'width='+windowWidth+'px,height='+windowHeight+'px,left=250px,top=100px,resize=0,scrolling=0','video','inline');
//		var flashvars = {video: content, autoplay: true};	
		var flashvars = {file: content, autostart: true};	
		var params = { allowfullscreen: "true", salign: "tl", bgcolor: "#ffffff"};
		var attributes = { align: "left", base: "." };
		swfobject.embedSWF(flashPlayer, "flshc", width, height, requiredSwfVersion, defaultSwfExpressInstall, flashvars, params, attributes);		
	} else if (video_extn.indexOf(".mp4")!= -1 ){  /** This is new section to take care of mp4 files DK 1/19/2011 */
		content1 ="This is a MP4 file<div id='flshc'  style='height=\"94%\"'></div>"; 
		ajaxwin=dhtmlwindow.open('ajaxbox',content1,title, 'width='+windowWidth+'px,height='+windowHeight+'px,left=250px,top=100px,resize=0,scrolling=0','video','inline');
//		var flashvars = {video: content, autoplay: true};	
		var flashvars = {file: content, autostart: true};	
		//var params = { allowfullscreen: "true", salign: "tl", bgcolor: "#ffffff", allowscriptaccess:"always"};
		var params = { allowfullscreen: "true", salign: "tl", bgcolor: "#ffffff"};
		var attributes = { align: "left", base: "." };
		swfobject.embedSWF(flashPlayer, "flshc", width, height, requiredSwfVersion, defaultSwfExpressInstall, flashvars, params, attributes);
	} else if (video_extn.indexOf(".gif")!=-1){
		content='<img src=\''+content+'\' width=\''+width+'\' height=\''+height+'\'>';
		ajaxwin=dhtmlwindow.open('ajaxbox',content,title, 'width='+windowWidth+'px,height='+windowHeight+'px,left=250px,top=100px,resize=0,scrolling=0','video','inline');

	} else if ( isVideoType( video_extn ) ){
		if ( video_extn != '.mov' ){
			content='<object id=\'mediaplayer\' width=\''+width+'\' height=\''+height+'\' standby=\'Freescale Videos\' type=\''+ getFileType(video_extn) +'\'><param name=\'freescalevideos\' value=\''+ content +'\'><embed type=\''+ getFileType(video_extn) +'\' src=\''+ content +'\' name=\'mediaplayer\' width=\''+width+'\' height=\''+height+'\' autoplay=\'true\'></embed></object>';
		} else {
			content='<object height=\''+height+'\' width=\''+width+'\' codebase=\'http://www.apple.com/qtactivex/qtplugin.cab\'> <param name=\'src\' value=\''+ content +'\' ><param name=\'autoplay\' value=\'true\'> <param name=\'control\' value=\'StatusField\'><param name=\'console\' value=\'video\'><embed height=\''+height+'\' width=\''+width+'\' type=\''+ getFileType(video_extn) +'\' pluginspage=\'http://www.apple.com/quicktime/download/\' src=\''+content+'\' controls=\'statusfield\' console=\'video\' autoplay=\'true\'/></object>';
		}
		ajaxwin=dhtmlwindow.open('ajaxbox',content,title, 'width='+windowWidth+'px,height='+windowHeight+'px,left=250px,top=100px,resize=0,scrolling=0','video','inline');
	} else {  /* HERE IS WHERE WE MAKE CHANGES FOR YOUTUBE VIDEOS */
		content = '<div id="ytchannel"><a target="_blank" href="http://www.youtube.com/subscription_center?add_user=freescale"><img src="http://image.nxp.com/files/graphic/buttons/G5096_button_v2_o1.png" border="0" style="padding-left:5px; padding-bottom:2px;"></a></div><object width=\''+width+'\' height=\''+height+'\'><param name=\'movie\' value=\''+content+'\' ></param><embed src=\''+content+'&autoplay=1\' type=\'application/x-shockwave-flash\' width=\'100%\' height=\'94%\' ></embed></object>';
		ajaxwin=dhtmlwindow.open('ajaxbox',content,title, 'width='+windowWidth+'px,height='+windowHeight+'px,left=250px,top=100px,resize=0,scrolling=0','video','inline');
	}
	ajaxwin.style.zIndex=1000;
	return false;
}




/* WOW: params for adding addthis widget : end*/

function isVideoType( file_extn ){
	var flg = false;

	if ( ( file_extn.indexOf(".mov")!=-1) || ( file_extn.indexOf(".wmv")!=-1) || ( file_extn.indexOf(".mpg")!=-1) || ( file_extn.indexOf(".avi")!=-1) ){
		flg = true;
	}
	return flg;
}
function getFileType(file_extn){

	var filetype='';

	switch (file_extn){
	case '.flv': 
		filetype='application/x-shockwave-flash';
	case '.wmv':
		filetype='audio/x-pn-realaudio-plugin';
		break; 
	case '.mov': 
		filetype='video/quicktime';
		break; 
	case '.mpg':	
		filetype='application/x-oleobject';
		break; 
	case '.gif':	
		filetype='image/gif';
		break; 
	case '.avi':	
		filetype='application/x-oleobject';
		break; 
	default :
		filetype='none';
	}
	return filetype;
}

/* modified for video cct end */

/* modifications for 56853 */

function displayBlockForHistory(lang_cd,history){ //added lang_cd,history by b42233 for Cr-47387
	//////////alert("loading displayBlockForHistory");
	//alert(lang_cd);
	// Changed Height of pop up By B25319 For CR39352
	openHistoryBlock(history, '', '','','750','490','',lang_cd); //added lang_cd,history  by b42233 for Cr-47387
}
function displayBlockForDownload(lang_cd,history){ //added lang_cd,history by b42233 for Cr-47387
	//////////alert("loading displayBlockForHistory");
	openDownloadBlock(history, '', '','','750','440','',lang_cd);
}
function displayBlockForTraining(lang_cd,history){ //added lang_cd,history by b42233 for Cr-47387
	//////////alert("loading displayBlockForHistory");
	opentrainingBlock(history, '', '','','750','440','',lang_cd); //added lang_cd,history by b42233 for Cr-47387
}
function displayBlockForNotes(lang_cd,history){
	///////alert("loading displayBlockForHistory");
	//openNotesBlock('My History', '', '','','750','440','');
	openNotesBlock(history, '', '','','750','440','',lang_cd);
}
//Added By B25319 For Cr39352 Start
function displayBlockForFavorites(lang_cd,history) { //added lang_cd,history  by b42233 for Cr-47387
//	alert("loading displayBlockForFavorites");
	openFavoritesBlock(history, '', '','','750','490','',lang_cd); //added lang_cd by b42233 for Cr-47387
}
//Added By B25319 For Cr39352 End

function openHistoryBlock(window_title,blockDiagUrl,code,psp_URL,width,height,fastpreview,lang_cd){
	var url = "/webapp/history/fetchHistory.sp?lang_cd="+lang_cd;
	//alert(url);
	//////alert("loading openHistoryBlock");
	if(document.getElementById('historyajaxbox')!=null)
	{
		document.getElementById("dhtmlwindowholder").removeChild(document.getElementById('historyajaxbox'));


	}
	ajaxwinhistory=dhtmlwindow.open('historyajaxbox',url,window_title, 'width='+width+'px,height='+height+'px,left=83px,top=64px','history');
	//////alert(document.getElementbyId('ajaxbox').style.zIndex);
	//ajaxwinhistory.style.overflowX="hidden";
	//ajaxwinhistory.style.overflowY="auto";
	ajaxwinhistory.style.zIndex=51;
	//ajaxwinhistory.style.overflowY ="auto";
	//ajaxwinhistory.style.overflowX="hidden";
	/* dcsMultiTrack('DCS.dcsuri',blockDiagUrl,'WT.ti','Block Diagram View','DCS.dcsref',psp_URL,'WT.dl','1'); */
	return ajaxwinhistory ;
}
function openDownloadBlock(window_title,blockDiagUrl,code,psp_URL,width,height,fastpreview,lang_cd){
	var url = "/webapp/history/fetchHistory.sp?commandID=FETCH_DOWNLOAD&lang_cd="+lang_cd;//added lang_cd by b42233
	//	////////alert("loading openHistoryBlock");
	if(document.getElementById('historyajaxbox')!=null)
	{
		document.getElementById("dhtmlwindowholder").removeChild(document.getElementById('historyajaxbox'));


	}
	ajaxwinhistory=dhtmlwindow.open('historyajaxbox',url,window_title, 'width='+width+'px,height='+height+'px,left=83px,top=64px','downloaded');
	/* dcsMultiTrack('DCS.dcsuri',blockDiagUrl,'WT.ti','Block Diagram View','DCS.dcsref',psp_URL,'WT.dl','1'); */
	ajaxwinhistory.style.zIndex=51;
	return ajaxwinhistory ;
}
function opentrainingBlock(window_title,blockDiagUrl,code,psp_URL,width,height,fastpreview,lang_cd){
	var url = "/webapp/history/fetchHistory.sp?commandID=FETCH_LAUNCH_TRNG&lang_cd="+lang_cd; //added lang_cd by b42233
	//	////////alert("loading openHistoryBlock");
	if(document.getElementById('historyajaxbox')!=null)
	{
		document.getElementById("dhtmlwindowholder").removeChild(document.getElementById('historyajaxbox'));

	}
	ajaxwinhistory=dhtmlwindow.open('historyajaxbox',url,window_title, 'width='+width+'px,height='+height+'px,left=83px,top=64px','training');
	/* dcsMultiTrack('DCS.dcsuri',blockDiagUrl,'WT.ti','Block Diagram View','DCS.dcsref',psp_URL,'WT.dl','1'); */
	ajaxwinhistory.style.zIndex=51;
	return ajaxwinhistory ;
}
function openNotesBlock(window_title,blockDiagUrl,code,psp_URL,width,height,fastpreview,lang_cd){
	var url = "/webapp/history/fetchHistory.sp?commandID=FETCH_WEBNOTES_HISTORY&lang_cd="+lang_cd;
	//	////////alert("loading openHistoryBlock");
	if(document.getElementById('historyajaxbox')!=null)
	{
		document.getElementById("dhtmlwindowholder").removeChild(document.getElementById('historyajaxbox'));


	}
	ajaxwinhistory=dhtmlwindow.open('historyajaxbox',url,window_title, 'width='+width+'px,height='+height+'px,left=83px,top=64px','webnote');
	/* dcsMultiTrack('DCS.dcsuri',blockDiagUrl,'WT.ti','Block Diagram View','DCS.dcsref',psp_URL,'WT.dl','1'); */
	ajaxwinhistory.style.zIndex=51;
	return ajaxwinhistory ;
}

//Added By B25319 For CR39352 Start--
function openFavoritesBlock(window_title,blockDiagUrl,code,psp_URL,width,height,fastpreview,lang_cd){
	var url = "/webapp/history/fetchHistory.sp?commandID=FETCH_FAVORITES&lang_cd="+lang_cd;
	//	////////alert("loading openHistoryBlock");
	if(document.getElementById('historyajaxbox')!=null)
	{
		document.getElementById("dhtmlwindowholder").removeChild(document.getElementById('historyajaxbox'));


	}
	ajaxwinhistory=dhtmlwindow.open('historyajaxbox',url,window_title, 'width='+width+'px,height='+height+'px,left=83px,top=64px','webnote');
	/* dcsMultiTrack('DCS.dcsuri',blockDiagUrl,'WT.ti','Block Diagram View','DCS.dcsref',psp_URL,'WT.dl','1'); */
	ajaxwinhistory.style.zIndex=51;
	return ajaxwinhistory ;
}
//Added By B25319 For CR39352 End


//////////////alert("request ajax js");

var Request = new Object();

Request.queue = [];

Request.readyState = true;

Request.timeOut = null;

Request.processQueue = function() {
	if (Request.queue.length > 0) {
		if (Request.readyState == true) {
			var params = Request.queue.shift();
			Request.readyState = false;
			Request.send (params.url, params.method, params.callback, params.data, params.urlencoded, params.name);
			Request.timeOut = setTimeout(Request.processQueue, 20);
		} else {
			Request.timeOut = setTimeout(Request.processQueue, 20);
		}
	} else {
		Request.timeOut = null;
	}
}

Request.queueUrl = function(url, method, data, callback, args, urlencoded, name) {
	var params = new Object();
	params.url = url;
	params.method = method;
	params.callback = callback;
	params.data = data;
	params.urlencoded = urlencoded; 
	params.name = name;
	Request.queue.push(params);
	if (Request.timeOut == null) {
		Request.timeOut = setTimeout(Request.processQueue, 20);
	}
	return params;
}

Request.send = function(url, method, data, callback, args, urlencoded, name) {
	//////////////alert('requesting : ' + url);
	var req;
	if (window.XMLHttpRequest) {
		req = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (typeof name == "undefined") {
		name = "";
	} else {
		name += "\n";
	}




	var readychange = function() {
		if (req.readyState == 4) {// only if req shows "loaded"
			if (req.status < 400) {// only if "OK"
				callback(req,args);
				delete callback;
			} else if (typeof req == "undefined" || typeof req.status == "undefined") {
				// don't do anything. user has navigated away
				delete callback;
			} else if (req.status == 401) { // unauthorized
				////////////alert(_("Session Expired. You would need to relogin"));
				delete callback;
				//window.location.href = "/webapp/";
			} else if (req.status == 404) {
				// should not happen, but ignore it for now
			} else {
				switch(req.status) {
				// windows error codes
				case 12002: // server timeout
				case 12029: case 12030: case 12031: // dropped connection
				case 12152: // connection closed by server
				case 13030:
					////////////alert(name + _("There was a network problem. Please reload the page."));
					break;
				case 500: case 503:
					////////////alert(name + _("There was an internal server error. Please try later."));
					break;
				default:
					////////////alert(_("There was a problem loading data:") + "\nstatus: " + req.status+ "/" + req.statusText + "\n" + url);

				}
				delete callback;
			}
			Request.readyState = true;
		}
	};
	function do_request() {
		if (method=="POST") {
			req.open("POST", url, true);
			if (urlencoded) req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			req.onreadystatechange = readychange;
			req.send(data);
		} else {
			req.open("GET", url, true);
			req.onreadystatechange = readychange;
			req.send(null);
		}
	};
	do_request();
	return req;
}

Request.sendRawPOST = function(url, data, callback, args, name) {
	Request.send(url, "POST", data, callback, args, false, name);
}
Request.sendPOST = function(url, data, callback, args, name) {
	Request.send(url, "POST", data, callback, args, true, name);
}
Request.sendGET = function(url,  callback, args, name) {
	// ////////////alert('within sendGET');
	return Request.send(url, "GET", '', callback, args, name);
}
function getKey(varName){
	var varName_a = new Array();
	varName_a = varName.split('<;>');
	////////alert(varName_a[0]);
	////////alert(""+varName_a[1]);


	return varName_a;
}
function callbackBROWSE_WEBPAGE(response)
{
	var mdiv = document.getElementById('BROWSE_WEBPAGE');
	var mdiv1=document.getElementById('button_WEBPAGE');
	var key=getKey(response.responseText);
	if(typeof key[1] != 'undefined' && key[1] != null)
	{////////alert(" key[1] != 'undefined'");
		mdiv.innerHTML=key[0];
		mdiv.style.height="22.1em";
		mdiv1.innerHTML=key[1];
	}
	else
	{
		////////alert(" key[1] =undefined'");
		mdiv.innerHTML=key[0];
		mdiv1.style.display='none';
	}
};
function callbackDownLoad(response)
{var mdiv = document.getElementById('DOWNLOAD');
var mdiv1=document.getElementById('button_undefined');
var key=getKey(response.responseText);
if(typeof key[1] != 'undefined' && key[1] != null)
{////////alert(" key[1] != 'undefined'");
	mdiv.innerHTML=key[0];
	mdiv.style.height="27.2em";
	mdiv1.innerHTML=key[1];
}
else
{
	////////alert(" key[1] =undefined'");
	mdiv.innerHTML=key[0];
	mdiv1.style.display='none';
}
}
function callbackWATCH_VIDEO(response)
{var mdiv = document.getElementById('WATCH_VIDEO');
var mdiv1=document.getElementById('button_VIDEO');
var key=getKey(response.responseText);
if(typeof key[1] != 'undefined' && key[1] != null)
{////////alert(" key[1] != 'undefined'");
	mdiv.innerHTML=key[0];
	mdiv.style.height="22.1em";
	mdiv1.innerHTML=key[1];
}
else
{
	////////alert(" key[1] =undefined'");
	mdiv.innerHTML=key[0];
	mdiv1.style.display='none';
}

}
function callbackWEBNOTES_HISTORY(response)
{
	var mdiv = document.getElementById('WEBNOTES_HISTORY');
	var mdiv1=document.getElementById('button_HISTORY');
	var key=getKey(unescape(response.responseText));
	if(typeof key[1] != 'undefined' && key[1] != null)
	{////////alert(" key[1] != 'undefined'");
		mdiv.innerHTML=key[0];
		mdiv.style.height="23.4em";
		mdiv1.innerHTML=key[1];
	}
	else
	{
		////////alert(" key[1] =undefined'");
		mdiv.innerHTML=key[0];
		mdiv1.style.display='none';
	}
	var notesCnt = document.getElementById('totalNotesCnt').value;
	//////alert('notesCnt:'+notesCnt);
	for(i=0;i<notesCnt; i++){
		var noteId = 'noteBody'+i;
		////alert(noteId);
		////alert(document.getElementById(noteId).innerHTML);

		//var unesc=document.getElementById(noteId).innerHTML;
		if(document.getElementById(noteId).innerHTML.length>30)
		{////alert("length is >25")
			document.getElementById(noteId).innerHTML=document.getElementById(noteId).innerHTML.substring(0,29)+"...";
		}


		var anchId = 'anch'+i;
		////alert(noteId);
		////alert(document.getElementById(noteId).innerHTML);
		if(document.getElementById(anchId).title>250)
		{////alert("length is >250")
			document.getElementById(anchId).title = document.getElementById(anchId).title.substring(0,249);
		}

	}


}
function callbackLAUNCH_TRNG(response)
{var mdiv = document.getElementById('LAUNCH_TRNG');
var mdiv1=document.getElementById('button_TRNG');
var key=getKey(response.responseText);
if(typeof key[1] != 'undefined' && key[1] != null)
{////////alert(" key[1] != 'undefined'");
	mdiv.innerHTML=key[0];
	mdiv.style.height="22.1em";
	mdiv1.innerHTML=key[1];
}
else
{
	mdiv.innerHTML=key[0];
	mdiv1.style.display='none';
}
}
//Added by B25319 For CR39352 Start
function callbackFAVORITES(response)
{var mdiv = document.getElementById('BROWSE_FAVORITES');
var mdiv1=document.getElementById('button_FAVORITES');
var key=getKey(response.responseText);
if(typeof key[1] != 'undefined' && key[1] != null)
{////////alert(" key[1] != 'undefined'");
	mdiv.innerHTML=key[0];
	mdiv.style.height="22.1em";
	mdiv1.innerHTML=key[1];
}
else
{
	mdiv.innerHTML=key[0];
	mdiv1.style.display='none';
}
}
//Added by B25319 For CR39352 End
function ajaxcallforBROWSE_WEBPAGE(commandID,img_id,td_id,fid,buttonid,lang_cd){//added lang_cd by b42233 for Cr47387 on 10-Oct-2012

	minmax(commandID,img_id,td_id,fid,buttonid);
	var nObj = document.getElementById(commandID);
	if(nObj!=null&&nObj.innerHTML=='')
	{
		progressbar(commandID,nObj);
		Request.sendPOST('/webapp/history/fetchHistory.sp?&lang_cd='+lang_cd,'commandID=FETCH_'+commandID+'&sectionView=true',callbackBROWSE_WEBPAGE); 
	}// added lang_cd by b42233 for Cr-47387 on 10-Oct-2012
}
function ajaxcallforDownLoad(commandID,img_id,td_id,fid,buttonid,lang_cd){ // added lang_cd by b42233 for Cr-47387 on 10-Oct-2012
	minmax(commandID,img_id,td_id,fid,buttonid);
	var nObj = document.getElementById(commandID);
	if(nObj!=null&&nObj.innerHTML=='')
	{
		progressbar(commandID,nObj);
		Request.sendPOST('/webapp/history/fetchHistory.sp?&lang_cd='+lang_cd,'commandID=FETCH_'+commandID+'&sectionView=true',callbackDownLoad);  
	}// added lang_cd by b42233 for Cr-47387 on 10-Oct-2012
}
function ajaxcallforWATCH_VIDEO(commandID,img_id,td_id,fid,buttonid,lang_cd){ // added lang_cd by b42233 for Cr-47387 on 10-Oct-2012
	minmax(commandID,img_id,td_id,fid,buttonid);
	var nObj = document.getElementById(commandID);
	if(nObj!=null&&nObj.innerHTML=='')
	{
		progressbar(commandID,nObj);
		Request.sendPOST('/webapp/history/fetchHistory.sp?&lang_cd='+lang_cd,'commandID=FETCH_'+commandID+'&sectionView=true',callbackWATCH_VIDEO);
	}// added lang_cd by b42233 for Cr-47387 on 10-Oct-2012
}

function ajaxcallforWEBNOTES_HISTORY(commandID,img_id,td_id,fid,buttonid,lang_cd){// added lang_cd by b42233 for Cr-47387 on 10-Oct-2012
	minmax(commandID,img_id,td_id,fid,buttonid);
	var nObj = document.getElementById(commandID);
	if(nObj!=null&&nObj.innerHTML=='')
	{
		progressbar(commandID,nObj);
		Request.sendPOST('/webapp/history/fetchHistory.sp?&lang_cd='+lang_cd,'commandID=FETCH_'+commandID+'&sectionView=true',callbackWEBNOTES_HISTORY);
	}// added lang_cd by b42233 for Cr-47387 on 10-Oct-2012
}
function ajaxcallforLAUNCH_TRNG(commandID,img_id,td_id,fid,buttonid,lang_cd){// added lang_cd by b42233 for Cr-47387 on 10-Oct-2012
	minmax(commandID,img_id,td_id,fid,buttonid);
	var nObj = document.getElementById(commandID);
	if(nObj!=null&&nObj.innerHTML=='')
	{
		progressbar(commandID,nObj);
		Request.sendPOST('/webapp/history/fetchHistory.sp?&lang_cd='+lang_cd,'commandID=FETCH_'+commandID+'&sectionView=true',callbackLAUNCH_TRNG);
	}// added lang_cd by b42233 for Cr-47387 on 10-Oct-2012
}
//Added by B25319 For CR39352 Start
function ajaxcallforFETCH_FAVORITES(commandID,img_id,td_id,fid,buttonid,lang_cd){// added lang_cd by b42233 for Cr-47387
	minmax(commandID,img_id,td_id,fid,buttonid);
	var nObj = document.getElementById(commandID);
	if(nObj!=null&&nObj.innerHTML=='')
	{
		progressbar(commandID,nObj);
		Request.sendPOST('/webapp/history/fetchHistory.sp?&lang_cd='+lang_cd,'commandID=FETCH_FAVORITES&sectionView=true',callbackFAVORITES);
	}// added lang_cd by b42233 for Cr-47387

}
//Added by B25319 For CR39352 End
function minmax(div_id,img_id,td_id,fid,buttonid)
{
	if(document.getElementById(div_id).style.display=='none')
	{
		document.getElementById(img_id).src="/shared/images/minus.JPG";
		document.getElementById(td_id).setAttribute("bgColor","#535E7C");
		document.getElementById(fid).setAttribute("color","#BDCDDA");
		document.getElementById(div_id).style.display="block";
		if(document.getElementById(buttonid) != 'undefined' && document.getElementById(buttonid) != null)
		{
			document.getElementById(buttonid).style.display="block";
		}

	}
	else
	{
		document.getElementById(img_id).src="/shared/images/plus.JPG";
		document.getElementById(td_id).setAttribute("bgColor","#E6EBEF");
		document.getElementById(fid).setAttribute("color","#657B90");
		document.getElementById(div_id).style.display='none';
		if(document.getElementById(buttonid) != 'undefined' && document.getElementById(buttonid) != null)
		{
			document.getElementById(buttonid).style.display='none';
		}
	}


}

function progressbar(commandID,nObj)
{
	var div_id="progressid"+commandID;
	nObj.innerHTML="<div id='"+div_id+"'></div>";
	var progressdiv=document.getElementById(div_id);
	if(typeof progressdiv != "undefined" && progressdiv != null)
	{
		//alert("progressdiv");
		progressdiv.style.visibility="visible";
		progressdiv.innerHTML="<p class=\"loadImage\" style=\"text-align:center; font-weight: 700;\"><span class=\"icon-para-reset spin-icon\"></span> <br/> LOADING</p>";
		progressdiv.style.position="relative";
	}
}


function displayHistoryHelp(code){ 
	var url = "/webapp/shared/components/inc_collateral.jsp?code="+code;

	var langCd ="";
	if(document.getElementById("language_option")){
		langCd = document.getElementById("language_option").value;
		url = url +"&language="+langCd;
	}
	//var window_title = "FAQ"
	var window_title =getTranslatedText('FAQ')
	var width = "550";
	var height = "300";
	historyHelpPopup=dhtmlwindow.open('HistoryHelp',url,window_title, 'width='+width+'px,height='+height+'px,left=100px,top=100px,resize=0,scrolling=1');
	if(typeof ajaxwinhistory != "undefined" && ajaxwinhistory != null)
		historyHelpPopup.style.zIndex=ajaxwinhistory.style.zIndex+2;
	return historyHelpPopup ;
}trueWindowOpen = window.open;
window.open = proxyWindowOpen;
function proxyWindowOpen(url, type, attributes){
	//Add logic to check if the URL	being opened i.e. param1 is download, if yes trigger download recording

	var parentId= document.getElementById("pageNodeId")?document.getElementById("pageNodeId").value : "";
	var parentPageType= document.getElementById("pageType")?document.getElementById("pageType").value : "";
	var commandID= "DOWNLOAD" ;

	var unreg_dl = dcsCheckDownload(url);

	var reg_dl = url.indexOf("webapp/Download");
	var mod_dl = url.indexOf("download/mod_download.jsp");
	var lic_dl = url.indexOf("download/license.jsp");	

	if (reg_dl != -1 || mod_dl != -1 || lic_dl != -1 ){
		url = url + '&Parent_nodeId='+ parentId +'&Parent_pageType='+parentPageType;
	}

	if(unreg_dl){
		recordDwnldHistory(parentId,parentPageType,url,commandID);		
	}

	//invoke the real window.open
	return trueWindowOpen(url, type, attributes);
}

var e=(navigator.appVersion.indexOf("MSIE")!=-1)?"click":"mousedown";
eventClickBind(e,"downloadClicked");

//added by r1051z on 2/20/2009 for History proeject Start
//captured event if user right clicked and downloaded collateral
eventClickBind("contextmenu","downloadRightClicked");
//added by r1051z on 2/20/2009 for History proeject End

function eventClickBind(event,func){
	if ((typeof(window[func])=="function")&&document.body){
		if (document.body.addEventListener){
			document.body.addEventListener(event, window[func], true);
		}
		else if(document.body.attachEvent){
			document.body.attachEvent("on"+event, window[func]);
		}
	}
}

//it matches if the link clicked
//have the list of files extensions
function fileTypeMatch(path, typelist){	
	var type=path.substring(path.lastIndexOf(".")+1,path.length);
	var types=typelist.split(","); 
	var lower_type = type.toLowerCase();
	for (var i=0;i<types.length;i++){
		if (lower_type==types[i]){	
			return true;
		}
	}
	return false;
}


function anchorEvt(evt,tag){
	var e=evt.target||evt.srcElement;
	while (e.tagName&&(e.tagName!=tag)){
		e=e.parentElement||e.parentNode;
	}
	return e;
}

function dcsCheckDownload(pth){

	if(typeof LANG_CD_LIST != "undefined"){
		var langList = LANG_CD_LIST.split(",");
		for(i=0;i<langList.length;i++)
			pth = pth.replace("/" + langList[i] + "/", "/");
	}
	
	//non-secure documents
	if(pth.indexOf('/files/') == 0 || 
			pth.indexOf('/lgfiles/') == 0 ||
			pth.indexOf('/mcds/') == 0){		
		return true;
	}

	// Added for Marketing Leveraged document download
	if(pth.indexOf("/")!=-1){	
		var link_path = new Array();
		link_path = pth.split('/'); 	 
		if(link_path[1].toUpperCase().indexOf("DOWNLOAD")!=-1 && link_path[2].toUpperCase().indexOf("FILES")!=-1){		
			return true;
		}
		
		if(link_path[1].toUpperCase() == "DOCUMENTS")
			return true;
	}	

	// Added for web Analytics Projects 
	if(pth.toLowerCase().indexOf(".pdf")!=-1 || pth.toLowerCase().indexOf(".doc")!=-1 || 
			pth.toLowerCase().indexOf(".zip")!=-1 || pth.toLowerCase().indexOf(".ppt")!=-1 || 
			pth.toLowerCase().indexOf(".txt")!=-1 || pth.toLowerCase().indexOf(".xls")!=-1 || pth.indexOf("/External.File")!=-1){		
		return true;
	}

	return false;
}

//This function checks that the hostname of the link
//matches the list of freescale hostnames 
function IsOnsite(hostname){
	var doms="www.nxp.com";
	var doms="@@ONSITEDOMAINS@@";
	var aDoms=doms.split(',');
	for (var i=0;i<aDoms.length;i++){ 
		if (aDoms[i].indexOf(hostname)!=-1){
			return 1;
		}
	}
	return 1;           //change it ro return 0
}

function recordWebpageHistory(pageId, pageType,commandID){
	//modified by b28383
	//using jQuery.post method fire ajax message	
	//Request.sendPOST('/webapp/history/recordHistory.sp','assetID='+pageId+'&assetType='+pageType+'&commandID='+commandID, checkSuccessHistory);
	var url = '/webapp/history/recordHistory.sp';
	var obj = new Object;
	obj.assetID=pageId;
	obj.assetType=pageType;
	obj.commandID=commandID;

	sendPostMessage(url,obj);
}
function checkSuccessHistory(){	
}
/** Add start by B17090 on 14-Oct-2009 For CCT68841  **/
/*function recordVideoHistory(video_url,commandID){	
  Request.sendPOST('/webapp/history/recordHistory.sp','assetID='+video_url +'&assetType=video&commandID='+commandID, checkSuccessHistory);
 }*/
function recordVideoHistory(video_url,commandID){	
	//modified by b28383
	//using jQuery.post method fire ajax message	
	//Request.sendPOST('/webapp/history/recordHistory.sp','assetID='+video_url +'&assetType=video&commandID='+commandID, checkSuccessHistory);

	var url = '/webapp/history/recordHistory.sp';
	var obj = new Object;
	obj.assetID=video_url;
	obj.assetType='video';
	obj.commandID=commandID;
	obj.referrerUrl = document.referrer;
	//Web reco project b30255 start 
	obj.actionAttribute = 'view';
	obj.actionAttributeValue = '1';
	var recoUrl="";
	var attrValues=null;  
	var attrNames=null;

	if(video_url.lastIndexOf("?fr=")||video_url.lastIndexOf("&fr=")){
		if(video_url.lastIndexOf("?fr=")){
			recoUrl=video_url.substring(video_url.lastIndexOf("?fr="));
		}
		else if(video_url.lastIndexOf("&fr=")){
			recoUrl=video_url.substring(video_url.lastIndexOf("&fr="));
		}

		if(recoUrl!=""){
			attrNames="fromRecommendation";
			//START: Added for CR 40875 by b28384 on 07th Jan 2013
			if(recoUrl.indexOf("gdc")>=0)
				attrValues="gen_doc";
			else if(recoUrl.indexOf("gtl")>=0)
				attrValues="gen_tool";
			else if(recoUrl.indexOf("gsc")>=0){
				attrValues="gen_cart";
				var parameters = recoUrl.split("&");
				for(var mm=0; mm<parameters.length; mm++){
					var parameters1 = parameters[mm].split("=");

					if(parameters1 != null && parameters1.length >=2 && parameters1[0]!=null && parameters1[0] != "" && parameters1[1]!=null && parameters1[1] != ""){
						if(parameters1[0] == "cart_opn"){
							attrNames = attrNames + ",cart_opn";
							attrValues = attrValues + "," + parameters1[1];
						}else if(parameters1[0] == "cart_weborderid"){
							attrNames = attrNames + ",cart_weborderid";
							attrValues = attrValues + "," + parameters1[1];
						}else if(parameters1[0] == "parentID"){
							obj.parentID = parameters1[1];
						}else if(parameters1[0] == "parentType"){
							obj.parentType = parameters1[1];
						}
					}
				}
			}
			//END: Added for CR 40875 by b28384 on 07th Jan 2013
			else if((recoUrl.indexOf("p"))>=0)		
				attrValues="personal";
			else if(recoUrl.indexOf("g")>=0)
				attrValues="general";
			if(attrValues!=null&&attrNames!=null){
				obj.attrNames=attrNames;
				obj.attrValues=attrValues;
			}
		}
	}
	//b30255 end

	sendPostMessage(url,obj);
}
/** Add END by B17090 on 14-Oct-2009 For CCT68841  **/
/*function recordDwnldHistory(parentId,parentPageType,download_url,commandID,historyPopup){
    Request.sendPOST('/webapp/history/recordHistory.sp','downloadLink='+download_url +'&parentID='+parentId +'&parentType='+parentPageType+'&commandID='+commandID+'&assetType=download'+'&fromHistoryPopUp='+historyPopup, checkSuccessHistory);
 }*/

/** Add END by B17090 on 14-Oct-2009 For CCT68841  **/
//Web reco project b30255 start
//function recordDwnldHistory(parentId,parentPageType,download_url,commandID,historyPopup){
function recordDwnldHistory(parentId,parentPageType,download_url,commandID,qry,historyPopup){
//	Web reco project b30255 end



	//modified by b28383
	//using jQuery.post method fire ajax message	
	//Request.sendPOST('/webapp/history/recordHistory.sp','downloadLink='+download_url +'&parentID='+parentId +'&parentType='+parentPageType+'&commandID='+commandID+'&assetType=download'+'&fromHistoryPopUp='+historyPopup, checkSuccessHistory);

	var url = '/webapp/history/recordHistory.sp';
	var obj = new Object;
	obj.downloadLink=download_url;
	obj.parentID=parentId;
	obj.parentType=parentPageType;
	obj.commandID=commandID;
	obj.assetType='download';
	obj.fromHistoryPopUp=historyPopup;
	obj.referrerUrl = document.referrer;
	obj.actionAttribute = 'download';
	obj.actionAttributeValue = '1';

	//Web reco project b30255 start 
	var recoUrl="";
	var flag;
	var attrValues=null;
	var attrNames=null;
	if(qry!=null){
		flag = qry.lastIndexOf("&fr=");	
		if(flag < 0){
			flag=qry.lastIndexOf("fr=");
		}
		if(flag > -1){
			recoUrl=qry.substring(flag);
		}
	}

	if(recoUrl!=""){
		attrNames="fromRecommendation";
		//START: Added for CR 40875 by b28384 on 07th Jan 2013
		if(recoUrl.indexOf("gdc")>=0)
			attrValues="gen_doc";
		else if(recoUrl.indexOf("gtl")>=0)
			attrValues="gen_tool";
		else if(recoUrl.indexOf("gsc")>=0){
			attrValues="gen_cart"; 
			var parameters = recoUrl.split("&");
			for(var mm=0; mm<parameters.length; mm++){
				var parameters1 = parameters[mm].split("=");

				if(parameters1 != null && parameters1.length >=2 && parameters1[0]!=null && parameters1[0] != "" && parameters1[1]!=null && parameters1[1] != ""){
					if(parameters1[0] == "cart_opn"){
						attrNames = attrNames + ",cart_opn";
						attrValues = attrValues + "," + parameters1[1];
					}else if(parameters1[0] == "cart_weborderid"){
						attrNames = attrNames + ",cart_weborderid";
						attrValues = attrValues + "," + parameters1[1];
					}
				}
			}
		}
		//END: Added for CR 40875 by b28384 on 07th Jan 2013
		else if((recoUrl.indexOf("p"))>=0)		
			attrValues="personal";
		else if(recoUrl.indexOf("g")>=0)
			attrValues="general";
		if(attrValues!=null&&attrNames!=null){
			obj.attrNames=attrNames;
			obj.attrValues=attrValues;
		}
	}
	//b30255 end

	sendPostMessage(url,obj);

}

function recordAction(id, type){	
	commandID = "RECORD_ACTION";
	/*Request.sendPOST('/webapp/history/recordHistory.sp','assetID='+id+'&assetType='+type+'&commandID='+commandID, checkSuccessHistory);*/

	var url = '/webapp/history/recordHistory.sp';
	var obj = new Object;
	obj.assetID=id;
	obj.assetType=type;
	obj.commandID=commandID;

	sendPostMessage(url,obj);
}


function dcsEvt(evt,tag){
	var e=evt.target||evt.srcElement;
	while (e.tagName&&(e.tagName!=tag)){
		e=e.parentElement||e.parentNode;
	}
	return e;
}


function getQueryParam(url,name)
{
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var tmpURL = url;
	var results = regex.exec( tmpURL );
	if( results == null )
		return "";
	else
		return results[1];
}

function trackDownload($anchor_link, hrefUrl,is_unsecure_download,downloadtype,pth, isShortUrl){
	if(typeof isDTMEnabled != "function") return;
	if(!isDTMEnabled()) return;
	
	digitalData.dwnldInfo={};
	digitalData.eventInfo={};
	// Added for CR54489
	if(pth.indexOf('/files/graphic/block_diagram') != -1){
		var blkTitle = $(this).find('img', this).attr("alt");			
		if(pth.indexOf("http") < 0) {
			pth = window.location.protocol+"//"+window.location.host + pth;
		}
		pth = replaceCacheUrlDomain(pth);			
		trackAnalyticsBlockDiagram(pth, blkTitle);
		return;
	}
	var excludeTrack = isExcludeDwnldAnalytics(pth);
	if(excludeTrack) return;
	if(pth.indexOf("/")!=-1){	
		var link_path = new Array();
		link_path = pth.split('/'); 	 
		if(link_path[1].toUpperCase().indexOf("DOWNLOAD")!=-1 && link_path[2].toUpperCase().indexOf("FILES")!=-1){		
			downloadtype = "Marketing Leveraged";
		}
	}
	var contentFinder = "";

	if(typeof getContentFinding == 'function') { 
		contentFinder = getContentFinding(document.URL, hrefUrl, true);
	}

	digitalData.documentClick=true;
	digitalData.dwnldInfo.downloadType=downloadtype; // Download Type
	digitalData.eventInfo.assetID= hrefUrl;  // Asset ID

	if(contentFinder != null && contentFinder !='') {
		digitalData.eventInfo.contentFinding = contentFinder;
	}

	hrefUrl = hrefUrl.split("#")[0];
	hrefUrl = replaceCacheUrlDomain(hrefUrl);

	/*Modified for short document url CR-58374 by b45770 on 9/3/2015 : Start*/	
	//if(downloadtype != '' && downloadtype != 'Non-Secured' && downloadtype != 'Moderated') {	
		/*if(hrefContainShortUrl||(downloadtype != '' && downloadtype != 'Non-Secured' && downloadtype != 'Moderated')) {*/
		/*Modified for short document url CR-58374 by b45770 on 9/3/2015 : End*/
	//	setCookiesForDownload(false);
	//}
	
	var infounit = false;
	var pageCategory = getPageCategory();	
	if((pageCategory == "OVERVIEW" || pageCategory == "HOMEPAGE" || pageCategory == "TAXONOMY") && typeof $anchor_link != 'undefined' && $anchor_link != null){					
		var $divRcParent = $anchor_link.parents(".rc").first();
		if($divRcParent.length != 0)
			infounit=true;
	}	
	
	if(infounit){
		digitalData.eventInfo.subContentFinding="General Webpage Info Unit Click";
		removeAdobeCookie('subContentFinding');
	}else{
		var subContentFinding = getSubContentFinding($anchor_link);
		if(typeof subContentFinding != 'undefined' && subContentFinding != null && subContentFinding != "")
			digitalData.eventInfo.subContentFinding = subContentFinding;
		else
			digitalData.eventInfo.subContentFinding = "";
	}
	
	var $orderButton = getParentDiv($anchor_link, "div.dtmOrderButton");
	if($orderButton != null){
		var summaryPageType = $orderButton.attr("data-dtmSummaryPageType");
		var prodId = $orderButton.attr("data-dtmProdId");
		
		if(typeof summaryPageType == 'undefined' || summaryPageType == null)
			summaryPageType = "";
		
		if(summaryPageType != ""){
			digitalData.eventInfo.sourceType = summaryPageType;
			digitalData.eventInfo.sourceId = prodId;
		}
	}

	if($anchor_link.hasClass("dtmDatasheet")){
		var summaryPageType = $anchor_link.attr("data-dtmSummaryPageType");
		var prodId = $anchor_link.attr("data-dtmProdId");		
		
		if(typeof summaryPageType == 'undefined' || summaryPageType == null)
			summaryPageType = "";
		
		if(summaryPageType != ""){
			digitalData.eventInfo.sourceType = summaryPageType;
			digitalData.eventInfo.sourceId = prodId;
		}		
	}

	if(isShortUrl) {
		setCookiesForDownload(true);
		return;
	}	
	
	/*Added if condition for short document url CR-58374 by b45770 on 9/3/2015*/	
	if(is_unsecure_download){
		if(downloadtype == "Marketing Leveraged") digitalData.eventInfo.eventPathing = 'dwnld start:'+hrefUrl;  // Event Pathing																						
		else digitalData.eventInfo.eventPathing = 'dwnld:'+hrefUrl;  // Event Pathing
			
		hrefUrl = hrefUrl.split("?")[0];
		digitalData.dwnldInfo.downloadURLClean=remProtocolFrmLink(hrefUrl);
		_satellite.track("trackDownloadAnalytics");
	}else{
		var uri =  hrefUrl.split("?")[0];
		if (hrefUrl.indexOf('?') != -1) hrefUrl = uri + '?colCode='+ getQueryParam(hrefUrl,'colCode');

		digitalData.dwnldInfo.downloadURLClean=remProtocolFrmLink(hrefUrl);
		digitalData.eventInfo.eventPathing = 'dwnld start:'+digitalData.dwnldInfo.downloadURLClean;  // Event Pathing
		_satellite.track("trackSecDownloadInitiate");
	}
	digitalData.eventInfo.contentFinding=digitalData.dwnldInfo.downloadType=digitalData.eventInfo.assetID=digitalData.eventInfo.eventPathing=digitalData.dwnldInfo.downloadURLClean=digitalData.eventInfo.subContentFinding="";
}

//This function will execute only in case of short document url.
//In case of short document url adobe call will be initiated from this method.
function shortUrlDwnldInitiate(hrefUrl) {
	digitalData.dwnldInfo={};
	digitalData.eventInfo={};
	var pth = hrefUrl.substring(hrefUrl.indexOf("//")+2);
	pth= pth.substring(pth.indexOf("/"));
	pth=pth?((pth.indexOf("/")!=0)?"/"+pth:pth):"/";

	var is_unsecure_download = dcsCheckDownload(pth);
	var reg_dl = pth.indexOf("webapp/Download");
	var mod_dl = pth.indexOf("download/mod_download.jsp");
	var lic_dl = pth.indexOf("download/license.jsp");	

	var downloadtype = "";
	if(reg_dl !=-1) {
		downloadtype = "Registered";
	} else if(lic_dl != -1) {
		downloadtype = "Licensed";
	} else if(mod_dl != -1) {
		downloadtype = "Moderated";
	} else if(is_unsecure_download) {
		downloadtype = "Non-Secured";
	}		

	if(pth.indexOf('/files/graphic/block_diagram') != -1){
		var blkTitle = $(this).find('img', this).attr("alt");			
		if(pth.indexOf("http") < 0) {
			pth = window.location.protocol+"//"+window.location.host + pth;
		}
		pth = replaceCacheUrlDomain(pth);		
		trackAnalyticsBlockDiagram(pth, blkTitle);
	}
	else {
		var excludeTrack = isExcludeDwnldAnalytics(pth);
		if(!excludeTrack) {
			if(pth.indexOf("/")!=-1){	
				var link_path = new Array();
				link_path = pth.split('/'); 	 
				if(link_path[1].toUpperCase().indexOf("DOWNLOAD")!=-1 && link_path[2].toUpperCase().indexOf("FILES")!=-1){		
					downloadtype = "Marketing Leveraged";
				}
			}
			digitalData.dwnldInfo.downloadType=downloadtype;
			if(((downloadtype != '' && downloadtype != 'Non-Secured') || downloadtype == "Marketing Leveraged") && getAdobeCookie('parent_sc_eVar16')!="" && getAdobeCookie('parent_sc_eVar16')!='undefined'){
				digitalData.eventInfo.assetID=getAdobeCookie('parent_sc_eVar16');
				removeAdobeCookie('parent_sc_eVar16');
			}
			if(digitalData.eventInfo.assetID==null || digitalData.eventInfo.assetID=="" || digitalData.eventInfo.assetID=='undefined'){
				digitalData.eventInfo.assetID= hrefUrl; 
			}

			digitalData.eventInfo.contentFinding = getAdobeCookie('parent_sc_eVar1');
			if(digitalData.eventInfo.contentFinding == "" || digitalData.eventInfo.contentFinding == "undefined") digitalData.eventInfo.contentFinding = "Short Document URL";

			//Fetching parent param from cookie
			if(getAdobeCookie('doc_nodeid') != "" || getAdobeCookie('parent_sc_channel') != "" || getAdobeCookie('parent_sc_prop1') != "" || getAdobeCookie('parent_sc_pageName') != "") 
			{		 
				digitalData.pageInfo.nodeID=digitalData.pageInfo.nodeID=getAdobeCookie('doc_nodeid');
				digitalData.pageInfo.siteSection1=getAdobeCookie('parent_sc_channel');
				digitalData.pageInfo.pageType=getAdobeCookie('parent_sc_prop1');
				digitalData.pageInfo.siteSection2=getAdobeCookie('parent_sc_prop2');
				digitalData.pageInfo.siteSection3=getAdobeCookie('parent_sc_prop3');
				s.prop6=getAdobeCookie('parent_sc_prop6');
				digitalData.pageInfo.siteSection4=getAdobeCookie('parent_sc_prop8');
				digitalData.pageInfo.siteSection5=getAdobeCookie('parent_sc_prop9');
				digitalData.pageInfo.siteSection6=getAdobeCookie('parent_sc_prop10');
				digitalData.pageInfo.siteSection7=getAdobeCookie('parent_sc_prop11');
				digitalData.pageInfo.pageName=getAdobeCookie('parent_sc_prop21');
				digitalData.pageInfo.pageTemplate=getAdobeCookie('parent_sc_prop23');
				s.eVar2=getAdobeCookie('parent_sc_eVar2');
				s.eVar3=getAdobeCookie('parent_sc_eVar3');
				digitalData.siteInfo.sitePlatform=getAdobeCookie('parent_sc_eVar17');
				digitalData.siteInfo.lang=getAdobeCookie('parent_sc_eVar18');
				digitalData.pageInfo.localTitle=getAdobeCookie('parent_sc_eVar19');
				digitalData.pageInfo.pageCodeID=getAdobeCookie('parent_sc_eVar21');
				s.eVar34=getAdobeCookie('parent_sc_eVar34');
				s.eVar35=getAdobeCookie('parent_sc_eVar35');
				digitalData.pageInfo.pageName=getAdobeCookie('parent_sc_eVar48');
				digitalData.pageInfo.pageName=getAdobeCookie('parent_sc_pageName');
				digitalData.pageInfo.pageURLClean=getAdobeCookie('parent_sc_pageURL');
				s.referrer=getAdobeCookie('parent_sc_pageReferrer');	
				digitalData.eventInfo.sourceID = getAdobeCookie('parent_sc_sourceID');
				digitalData.eventInfo.sourceType = getAdobeCookie('parent_sc_sourceType');
				digitalData.eventInfo.subContentFinding = getAdobeCookie('parent_subContentFinding');
			}			
			hrefUrl=hrefUrl.split("#")[0];
			hrefUrl = replaceCacheUrlDomain(hrefUrl);

			digitalData.dwnldInfo.shortURL = true;
			if(is_unsecure_download){
				if(downloadtype == "Marketing Leveraged")
				{
					digitalData.eventInfo.eventPathing = 'dwnld start:'+hrefUrl;  // Event Pathing																						
				} else {
					digitalData.eventInfo.eventPathing = 'dwnld:'+hrefUrl;  // Event Pathing
				}

				hrefUrl = hrefUrl.split("?")[0];
				digitalData.dwnldInfo.downloadURLClean = remProtocolFrmLink(hrefUrl);
				_satellite.track("trackDownloadAnalytics");
			}else{
				var uri =  hrefUrl.split("?")[0];
				if (hrefUrl.indexOf('?') != -1){
					hrefUrl = uri + '?colCode='+ getQueryParam(hrefUrl,'colCode');
				}

				digitalData.dwnldInfo.downloadURLClean = remProtocolFrmLink(hrefUrl);
				digitalData.eventInfo.eventPathing = 'dwnld start:'+hrefUrl;  // Event Pathing
				_satellite.track("trackSecDownloadInitiate");
			}
			digitalData.eventInfo.contentFinding=digitalData.dwnldInfo.downloadType=digitalData.eventInfo.assetID=digitalData.eventInfo.eventPathing=digitalData.dwnldInfo.downloadURLClean=digitalData.pageInfo.nodeID=digitalData.pageInfo.nodeID="";
		}
	}	
}	

//Added for webanalytics

function isExcludeDwnldAnalytics(downloadUrl) {	
	var exclude_lst = ["/files/abstract/", "/files/online_tools/eTPU/", "elqNow/elqBlank.htm", "/ruhp/myAccount.html", "/ruhp_weblogic/myAccount.html"];	
	for (var j = 0; j < exclude_lst.length; j++) {
		if (downloadUrl.indexOf(exclude_lst[j]) != -1 && downloadUrl.indexOf(".htm") != -1) {				
			return true;
		} 
	}	
	return false;
}

//Modified by b51504 for CR-57427:START
function remProtocolFrmLink(strUrl) {	
	var str1=strUrl
	var patt = /[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)/;
	var res = patt.test(str1);
	if(res == true)
	{
		var wotprotocol=/^((https?|ftp):\/\/|\/\/|\/)/;
		var res=str1.replace(wotprotocol, '');
		return res;
	}

	else
	{
		var host=window.location.host+str1;
		return host;
	}

	//var protocolMatch = /^(https?|ftp):\/\//; 
	//var finalUrl = strUrl.replace(protocolMatch, '');
	//return finalUrl;
}

//This function executes onClick of Anchor Tag
//it checks whether download has been clecked or not
function downloadClicked(evt){		
	var $anchor_link;
	evt=evt||(window.event||"");
	if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){		
		var e=anchorEvt(evt,"A");
		if(e.hostname && IsOnsite(e.hostname)){	
			//var types="xls,doc,ppt,tgz,rar,tar,pdf,txt,csv,zip,exe";    
			var reg_dl = e.pathname.indexOf("webapp/Download");
			var faq_click = e.pathname.indexOf("TransformXMLServlet");
			var unreg_dl = e.pathname.indexOf("webapp/files");
			var mod_dl = e.pathname.indexOf("download/mod_download.jsp");
			var lic_dl = e.pathname.indexOf("download/license.jsp");	
			var page_nodeId = document.getElementById("pageNodeId")?document.getElementById("pageNodeId").value : "";
			var page_typeName= document.getElementById("pageType")?document.getElementById("pageType").value : "";
			//var commandId = document.getElementById("recrdHistDwnlodComnd")?document.getElementById("recrdHistDwnlodComnd").value : "";
			var commandId = "DOWNLOAD" ;
			var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
			var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
			var is_unsecure_download = dcsCheckDownload(pth);
			//var typeMatched = dcsTypeMatch(e.pathname,types);

			// Added for Video web analytics
			if (e.pathname.indexOf("/videoSummary.sp")  != -1 && qry.indexOf("searchLabel") < 0) {
				if(typeof setParentNodeIdCookie == "function") setParentNodeIdCookie();	
			}

			//Added by b51504 for CR-59844
			if( (reg_dl != -1)||(lic_dl != -1) || (mod_dl != -1))
			{
				e.setAttribute('target', '_blank');	
				setCookie("continueURL",window.location.href);
			} 


			/*Modified for short document url CR-58374 by b45770 on 11/3/2015 : Start*/
			var hrefContainShortUrl=false;	
			if(typeof sc_shortURLDomain != 'undefined' && e.href.indexOf(sc_shortURLDomain)!=-1)
				hrefContainShortUrl=true;

			//if (is_unsecure_download ||(reg_dl != -1)||(lic_dl != -1) || (mod_dl != -1) ){		
			if (is_unsecure_download ||(reg_dl != -1)||(lic_dl != -1) || (mod_dl != -1) || hrefContainShortUrl){			
				/*Modified for short document url CR-58374 by b45770 on 11/3/2015 : End*/	

				var downloadType = "";
				var href_analytics_url = "";

				if(reg_dl !=-1) {
					downloadType = "Registered";
				} else if(lic_dl != -1) {
					downloadType = "Licensed";
				} else if(mod_dl != -1) {
					downloadType = "Moderated";
				} else if(is_unsecure_download) {
					downloadType = "Non-Secured";
				}

				// Added for CR56179
				if (typeof jQuery != 'undefined') {
					$anchor_link = $(e);
					href_analytics_url = $anchor_link.attr('href');
				} else {
					href_analytics_url = e.href;
				}

				trackDownload($anchor_link, href_analytics_url, is_unsecure_download, downloadType, pth, hrefContainShortUrl);				
				
				if (reg_dl != -1){								 
					e.search= e.search +'&Parent_nodeId='+ page_nodeId +'&Parent_pageType='+page_typeName;					 
				}			   
				else if (lic_dl != -1){			         
					e.search= e.search +'&Parent_nodeId='+ page_nodeId +'&Parent_pageType='+page_typeName;										
				}
				else if (mod_dl != -1){				   
					e.search= e.search +'&Parent_nodeId='+ page_nodeId +'&Parent_pageType='+page_typeName;					

				}
				/*Added for short document url CR-58374 by b45770 on 11/3/2015 : Start	  
				else if(hrefContainShortUrl){ 
					window.location=e.href;
				}
				Added for short document url CR-58374 by b45770 on 11/3/2015 : End*/	
				else if(is_unsecure_download){
					var history_popup = 0;
					refer = anchorEvt(evt ,"DIV");
					if(refer != null || refer != "undefined"){
						if (refer.nodeType == 1){
							if ((String(refer.nodeName)=="DIV") && (String(refer.id) == "DOWNLOAD")){
								while (!history_popup){
									refer = refer.parentNode;
									if (refer.nodeType==1){ //check that the node is a tag, not text (type=3)
										if ((String(refer.nodeName)=="DIV") && (String(refer.id) == "historyajaxbox")){
											history_popup = 1;
											break;
										} // end of div and historyajaxbox check
										else if (String(refer.nodeName)=="BODY") {
											break;	
										} //end of else if
									} // end of nodeType = 1 check
								} // end of while loop*/
							}
						}
					}


					if(history_popup){
						//Web recommendations project b30255 start
						//recordDwnldHistory(page_nodeId,page_typeName,pth,commandId,history_popup);
						recordDwnldHistory(page_nodeId,page_typeName,pth,commandId,qry,history_popup);
						//Web recommendations project b30255 end

					}else{

						//Web recommendations project b30255 start
						recordDwnldHistory(page_nodeId,page_typeName,pth,commandId,qry);
						//recordDwnldHistory(page_nodeId,page_typeName,pth,commandId);
						//Web recommendations project b30255 end

					}
					// Added for CR57261
					if(e.pathname.indexOf(".pdf") != -1) {
						e.setAttribute('target', '_blank');
					}	
				}				
			}			 
		}
	}
}

//added by r1051z on 2/20/2009 for History proeject Start
//captured event if user right clicked and downloaded collateral
//This function executes onRightClick of Anchor Tag
//it checks whether download has been clicked or not by right clicking of mouse
function downloadRightClicked(evt){

	evt=evt||(window.event||"");
	if (evt){
		var btn=evt.which||evt.button;
		if ((btn!=1)||(navigator.userAgent.indexOf("Safari")!=-1)){
			// this function will return anchor tag if clicked on any other element, will traverse backwards
			e = anchorEvt(evt,"A");
			if ((typeof(e.href)!="undefined")&&e.href){
				if ((typeof(e.protocol)!="undefined")&&e.protocol&&(e.protocol.indexOf("http")!=-1)){
					if(e.hostname && IsOnsite(e.hostname)){
						//var types="xls,doc,ppt,tgz,rar,tar,pdf,txt,csv,zip,exe";    
						var reg_dl = e.pathname.indexOf("webapp/Download");
						var faq_click = e.pathname.indexOf("TransformXMLServlet");
						var unreg_dl = e.pathname.indexOf("webapp/files");
						var mod_dl = e.pathname.indexOf("download/mod_download.jsp");
						var lic_dl = e.pathname.indexOf("download/license.jsp");	
						var page_nodeId = document.getElementById("pageNodeId")?document.getElementById("pageNodeId").value : "";
						var page_typeName= document.getElementById("pageType")?document.getElementById("pageType").value : "";
						//var commandId = document.getElementById("recrdHistDwnlodComnd")?document.getElementById("recrdHistDwnlodComnd").value : "";
						var commandId = "DOWNLOAD" ;
						var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
						var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
						var is_unsecure_download = dcsCheckDownload(pth);
						//var typeMatched = dcsTypeMatch(e.pathname,types);

						// Added for Video web analytics
						if (e.pathname.indexOf("/videoSummary.sp")  != -1 && qry.indexOf("searchLabel") < 0) {
							if(typeof setParentNodeIdCookie == "function") setParentNodeIdCookie();			
						}
						/*Modified for short document url CR-58374 by b45770 on 11/3/2015 : Start*/
						var hrefContainShortUrl=false;	
						if(typeof sc_shortURLDomain != 'undefined' && e.href.indexOf(sc_shortURLDomain)!=-1)
							hrefContainShortUrl=true;

						//if (is_unsecure_download ||(reg_dl != -1)||(lic_dl != -1) || (mod_dl != -1) ){		
						if (is_unsecure_download ||(reg_dl != -1)||(lic_dl != -1) || (mod_dl != -1) || hrefContainShortUrl){			
							/*Modified for short document url CR-58374 by b45770 on 11/3/2015 : End*/	

							var downloadType = "";
							var href_analytics_url = "";

							if(reg_dl !=-1) {
								downloadType = "Registered";
							} else if(lic_dl != -1) {
								downloadType = "Licensed";
							} else if(mod_dl != -1) {
								downloadType = "Moderated";
							} else if(is_unsecure_download) {
								downloadType = "Non-Secured";
							}

							// Added for CR56179
							if (typeof jQuery != 'undefined') {
								$anchor_link = $(e);
								href_analytics_url = $anchor_link.attr('href');
							} else {
								href_analytics_url = e.href;
							}

							trackDownload($anchor_link, href_analytics_url, is_unsecure_download, downloadType, pth, hrefContainShortUrl);

							if (reg_dl != -1){			
								e.search= e.search +'&Parent_nodeId='+ page_nodeId +'&Parent_pageType='+page_typeName;
							}			   
							else if (lic_dl != -1){
								e.search= e.search +'&Parent_nodeId='+ page_nodeId +'&Parent_pageType='+page_typeName;					
							}
							else if (mod_dl != -1){
								e.search= e.search +'&Parent_nodeId='+ page_nodeId +'&Parent_pageType='+page_typeName;					
							}
							/*Added for short document url CR-58374 by b45770 on 11/3/2015 : Start	  
							else if(hrefContainShortUrl){
								window.location=e.href;
							}
							Added for short document url CR-58374 by b45770 on 11/3/2015 : End*/ 

							else if(is_unsecure_download){				     
								var history_popup = 0;
								refer = anchorEvt(evt ,"DIV");
								if(refer != null || refer != "undefined"){
									if (refer.nodeType == 1){
										if ((String(refer.nodeName)=="DIV") && (String(refer.id) == "DOWNLOAD")){
											while (!history_popup){
												refer = refer.parentNode;
												if (refer.nodeType==1){ //check that the node is a tag, not text (type=3)
													if ((String(refer.nodeName)=="DIV") && (String(refer.id) == "historyajaxbox")){
														history_popup = 1;
														break;
													} // end of div and historyajaxbox check
													else if (String(refer.nodeName)=="BODY") {
														break;	
													} //end of else if
												} // end of nodeType = 1 check
											} // end of while loop*/
										}
									}
								}

								if(history_popup){
									//Web recommendations project b30255 start
									//recordDwnldHistory(page_nodeId,page_typeName,pth,commandId,history_popup);
									recordDwnldHistory(page_nodeId,page_typeName,pth,commandId,qry,history_popup);
									//Web recommendations project b30255 end

								}else{

									//Web recommendations project b30255 start
									recordDwnldHistory(page_nodeId,page_typeName,pth,commandId,qry);
									//recordDwnldHistory(page_nodeId,page_typeName,pth,commandId);
									//Web recommendations project b30255 end
								}				
							}				
						}	

					}
				}
			}
		}			 
	}
} // end of function
//added by r1051z on 2/20/2009 for History proeject end




// This function will be called from flash version of mainserp, when datasheet is clicked. 
function recordDwnldHistoryFromFlash(path){
	var index  = path.toUpperCase().indexOf("/FILES");
	if (index != -1 )
	{
		var linkurl  = path.substring(index);
		var page_nodeId = document.getElementById("pageNodeId")?document.getElementById("pageNodeId").value : "";
		var page_typeName= document.getElementById("pageType")?document.getElementById("pageType").value : "";
		var commandId =  "DOWNLOAD" ;
		recordDwnldHistory(page_nodeId,page_typeName,linkurl,commandId);
	}
}

/* function recordTrngHistory(training_id,page_Type,commandID){
 Request.sendPOST('/webapp/history/recordHistory.sp','assetID='+training_id +'&assetType='+page_Type+'&commandID='+commandID, checkSuccessHistory);
 }*/
//JavaScript Document
//added for web recommendations project
//added new parameters parentId,parentType
function recordTrngHistory(training_id,page_Type,parentId,parentType,commandID){

	//modified by b28383
	//using jQuery.post to fire ajax message
	//Request.sendPOST('/webapp/history/recordHistory.sp','assetID='+training_id +'&assetType='+page_Type+'&commandID='+commandID, checkSuccessHistory);

	var url = '/webapp/history/recordHistory.sp';
	var obj = new Object;
	obj.assetID = training_id;
	obj.assetType = page_Type;
	obj.parentID = parentId;
	obj.parentType = parentType;
	obj.referrerUrl = document.referrer;
	obj.commandID = commandID;

	sendPostMessage(url,obj);

}// JavaScript Document

//JS DETECT
function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
var BrowserDetect = {
		init: function () {
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		dataOS : [
		          {
		        	  string: navigator.platform,
		        	  subString: "Win",
		        	  identity: "Windows"
		          },
		          {
		        	  string: navigator.platform,
		        	  subString: "Mac",
		        	  identity: "Mac"
		          },
		          {
		        	  string: navigator.platform,
		        	  subString: "Linux",
		        	  identity: "Linux"
		          }
		          ]

};
BrowserDetect.init();

function addEvent( obj, type, fn ) {
	if (obj.addEventListener) {
		obj.addEventListener( type, fn, false );
		EventCache.add(obj, type, fn);
	}
	else if (obj.attachEvent) {
		obj["e"+type+fn] = fn;
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
		obj.attachEvent( "on"+type, obj[type+fn] );
		EventCache.add(obj, type, fn);
	}
	else {
		obj["on"+type] = obj["e"+type+fn];
	}
}


var EventCache = function(){
	var listEvents = [];
	return {
		listEvents : listEvents,
		add : function(node, sEventName, fHandler){
			listEvents.push(arguments);
		},
		flush : function(){
			var i, item;
			for(i = listEvents.length - 1; i >= 0; i = i - 1){
				item = listEvents[i];
				if(item[0].removeEventListener){
					item[0].removeEventListener(item[1], item[2], item[3]);
				};
				if(item[1].substring(0, 2) != "on"){
					item[1] = "on" + item[1];
				};
				if(item[0].detachEvent){
					item[0].detachEvent(item[1], item[2]);
				};
				item[0][item[1]] = null;
			};
		}
	};
}();

function getUniKeyHistory(varName){
	var varName_a = new Array();
	varName_a = varName.split('_');
	//alert("varName_a   "+varName_a);
	//alert("varName_a[1]  "+varName_a[1]);
	return varName_a[1];
}


function moreLessButtonHistory(targetId,minSize,type,more) {
	//alert("targetId "+ targetId);
	var buttonelement='button_'+getUniKeyHistory(targetId);
	//alert("buttonelement "+buttonelement);
	if(more == 1){
		var linkLabel = $('#hist-sa').val();
		var imgLink = "/shared/images/seeMore.gif";	
		var title = "More" ; //added by b05535 for cct43571 on 23 Apr 2007
	} else {
		var linkLabel = $('#hist-h').val();
		var imgLink = "/shared/images/seeLess.gif";
		var title = "Hide" ; //added by b05535 for cct43571 on 23 Apr 2007
	}
//	changed by b05535 for metrics calculation(cct43571) start : 23 Apr 2007
//	var linkContent = "<a href=\"Javascript:resizeBoxHistory('"+targetElement+"','"+minSize+"','"+type+"','"+more+"');\">"+linkLabel+" <img src='"+imgLink+"'></a>";
	var linkContent = "<a href=\"Javascript:resizeBoxHistory('"+targetId+"','"+minSize+"','"+type+"','"+more+"','"+title+"');\">"+linkLabel+" <img src='"+imgLink+"'></a>";
//	changed by b05535 for metrics calculation(cct43571) end : 23 Apr 2007
	var divBox = document.getElementById(buttonelement);
	//alert("linkContent  "+linkContent);
	//alert("divbox"+divBox);
	if(typeof divBox != 'undefined' && divBox != null){	
		//alert(" inside divbox"+divBox);
		divBox.innerHTML = linkContent;
	}
}




//addEvent(window,'load',pageLoad);
addEvent(window,'unload',EventCache.flush);

function resizeBoxHistory(targetId,minSize,type,more){
//	alert("resizeBoxHistory targetId,minSize,type,more   "+targetId+minSize+type+more);
//	set up static variables
	var baseVal = 3.6;
	var bulletBaseVal = 4;
	var linesCorrection = 0.2;


	if(BrowserDetect.OS == "Mac"){
		var lineMultiplier = 1.15;
		var bulletMultiplier = 1.3;
	} else if(BrowserDetect.OS == "Linux") {
		var lineMultiplier = 1.15;
		var bulletMultiplier = 1.3;
	} else {
		var bulletBaseVal = 3.7;
		var lineMultiplier = 1.25;
		var bulletMultiplier = 1.4;
	}

	if(more == 1){
		var newMore = 0;
		var newHeight = "auto";
	} else {
		var newMore = 1;
		if(type > 0){ //lines or bullets
			if(type == 1){
				//alert("type=1");
				var baseVal = baseVal;
				var lineMultiplier = lineMultiplier;
			} else {
				var baseVal = bulletBaseVal;
				var lineMultiplier = bulletMultiplier;
			}
			var actualSize = (minSize-linesCorrection)
			var newHeight = baseVal+(lineMultiplier*actualSize);
			newHeight = newHeight+"em";
			//alert("type="+type+"minSize="+minSize+"corrected to "+newHeight);
		} else { //em values
			var newHeight = minSize+"em";
			//alert("type="+type+"minSize="+minSize+"corrected to "+newHeight)

		}
	}
	nObj = document.getElementById(targetId);
	if(nObj!=null)
	{
		//alert("nObj  "+nObj);
		//alert("newHeight  "+newHeight);

		nObj.style.height = newHeight;

		//alert("targetElement "+targetId+"minSize "+minSize+"type"+type+"newMore"+newMore);
		moreLessButtonHistory(targetId,minSize,type,newMore);
	}

}

function hideselectsHistory() { 
	for(i=0;i<document.forms.length;i++){ // if there are forms on the page
		frm = document.forms[i];
		var inputs = frm.getElementsByTagName("SELECT");

		for (j=0;j<inputs.length;j++){
			if(inputs[j].style.display !='none')
			{
				inputs[j].style.display = 'none';
			}
			else 
			{
				inputs[j].style.display= 'inline';
			}
		}
	}
}
function buynow(part) 
{   
	// Modified by B12883 for CR50448 on 18Apr2013
	//window.open('../../shoppingcart/popup.jsp?partnumber=' + part, 'Freescale','location=no,toolbar=no,scrollbars=yes,resizable,width=750,height=500');
	window.open('../../shoppingcart/popup.jsp?partnumber=' + part, 'Freescale','location=no,toolbar=no,scrollbars=yes,resizable,width=950,height=500');
}

<!-- WR2995 - changed by r9188z dt 01/12/2004 [start] -->
<!-- New function added for obsolete part -->
function buynow_obsoletepart(part){
	var url = '/shoppingcart/popup.jsp?partnumber=' + part;
	var tmp = webURLPrefix();
	url = tmp+url;
	window.open(url, 'Freescale','location=no,toolbar=no,scrollbars=yes,resizable,width=750,height=500');
}
<!-- WR2995 - changed by r9188z dt 01/12/2004 [end] -->

<!-- Added By RZ106C For CCT37858 Start 11-July-2006 -->
function infoImage(code){
	var url = '../../collateralDescription.jsp?code=' + code;
	window.open(url, 'Description','location=no,toolbar=no,scrollbars=yes,resizable,width=500,height=300');
}
<!-- Added By RZ106C For CCT37858 End 11-July-2006 -->

function infoImageSearch(code){
	var url = '../../collateralDescription.jsp?code=' + code;
	window.open(url, 'Description','location=no,toolbar=no,scrollbars=yes,resizable,width=500,height=300');
}


function infoImageSearchMain(code){
	var url = '../collateralDescription.jsp?code=' + code;
	window.open(url, 'Description','location=no,toolbar=no,scrollbars=yes,resizable,width=500,height=300');
}


function ordernow(id)
{
	window.open('shoppingcart.recordmetrics.framework?fivecode=HIBRT&partnumber=' + id + '&distyname=Hibbert', 'Hibbert');
}

function search4Product(thePage)
{
	window.open(thePage);
	parent.close();

}

function showDistrib()
{
	var val = document.countryForm.countries[document.countryForm.countries.selectedIndex].value;
	if(val != "")
	{
		document.countryForm.country.value = val;
		document.countryForm.submit();
	}
}

function wheretobuy()  
{
	window.open('/webapp/shoppingcart/wtbpopup.jsp', 'WhereToBuy','location=no,toolbar=no,scrollbars=yes,resizable,width=500,height=390');
}

//Added for Web Recommendation Project start
//Ready Event will be used to record the web activity  


function recordActivity(url, obj)
{
	sendPostMessage(url, obj);
}


function sendPostMessage(url,obj){
	jQuery.post(url, obj, function(data){

	});

}


//Added for Web Recommendation Project end
//<!--Web reco project b28381 start-->

function deleteItem(assetID,assetCode,assetType,userID,visitorID,visitID,commandID,rowID)
{

	if(visitID== "null")
	{

		visitID="";
	}
	if(userID=="null")
	{
		userID="";
	}
	var url ="/webapp/history/deleteUserHistoryItem.sp";
	var deleteObj = new Object;
	deleteObj.assetID= assetID;
	deleteObj.code= assetCode;
	deleteObj.userID=userID;
	deleteObj.visitorID=visitorID;
	deleteObj.visitID=visitID;
	deleteObj.commandID=commandID;	
	checkDeleteHistory(url,deleteObj,rowID);



}
function deleteRow(rowID,commandID){
	if(commandID=="BROWSE_WEBPAGE"){

		document.getElementById('webpage_table').deleteRow(rowID);
		document.getElementById('webpage_table').deleteRow(rowID);
		//alert("Item deleted from History");
	}
	else if(commandID=='DOWNLOAD'){

		document.getElementById('download_table').deleteRow(rowID);
		document.getElementById('download_table').deleteRow(rowID);
		//	document.getElementById('download_table').deleteRow(rowID);
		//	alert("Item deleted from History");
	}
	else if(commandID=='LAUNCH_TRNG'){

		document.getElementById('training_table').deleteRow(rowID);
		document.getElementById('training_table').deleteRow(rowID);
		//	alert("Item deleted from History");
	}
	else if(commandID=='WATCH_VIDEO'){

		document.getElementById('video_table').deleteRow(rowID);
		document.getElementById('video_table').deleteRow(rowID);
		//	alert("Item deleted from History");
	}

}

function checkDeleteHistory(url, deleteObj,rowID){

	jQuery.post(url, deleteObj, function(response){


		//alert(response.status);
		if(response.status=="success" || response.status=="Saved"){
			deleteRow(rowID,response.commandID);
		}
		/*	else if(response.status=="noHistory"){
				//alert("Item already deleted from database");
				}
				else{
				//alert("Please try again later");
				}*/

	});
}
//Web reco project b30255 start

function viewSimilarDocument(similardocid, url)
{
	if(similardocid.lastChild.src.indexOf('/recommendation/images/down_Arrow.gif') >= 0)
	{
		similardocid.lastChild.src = '/recommendation/images/up_Arrow.gif';
		var row = getRow(similardocid);
		show_menu(row,url);
	}
	else
	{
		similardocid.lastChild.src = '/recommendation/images/down_Arrow.gif';
		var row = getRow(similardocid);
		hide_menu(row);
	}


}

function getRow(obj){
	var prnt = obj.parentNode;
	while(prnt.tagName.toUpperCase() != 'TR')
		prnt = prnt.parentNode;
	return prnt.id;
}


function hide_menu(simDocsId)
{   
	var removerow = document.getElementById(simDocsId).rowIndex + 1;
	var table = document.getElementById('SearchResultsTable');	

	while(removerow < table.rows.length)
	{
		table.deleteRow(removerow);			
		if( checkSimilarDocumentHref(table.rows[removerow]) == true)
			break;	
	}
}

function checkSimilarDocumentHref(obj){
	var child1 = obj.childNodes;
	var child2;
	var i = 0 , j = 0 ;

	for ( ; i < child1.length ; i ++ )
	{
		if(child1[i].tagName != null && child1[i].tagName.toUpperCase() == 'TD')
		{
			child2 = child1[i];
			break;
		}
	}

	if(child2 != null)
	{
		i = 0;
		child1 = child2.childNodes;
		for ( ; i < child1.length ; i ++ )
		{
			if(child1[i].childNodes[0] != null && child1[i].childNodes[0].nodeValue != null && child1[i].childNodes[0].nodeValue.indexOf('View similar Documents') >= 0)
				return true
		}
	}
	return false;
}

function show_menu(simDocsRowId,assetUrl){

	// document.getElementById(simDocsId).style.display = "block";
	var url ="/webapp/recommendations/fetchSimilarDocuments.sp";
	var index=assetUrl.indexOf("?");

	if(index!= -1)
	{
		assetUrl=assetUrl.slice(0,index);
	}

	var obj = new Object;
	obj.assetUrl= assetUrl;	
	checkSuccessDocuments(url,obj,simDocsRowId);
}

function checkSuccessDocuments(url,obj,simDocsRowId)
{
	jQuery.post(url, obj, function(response){ 

		var count=0;
		if (response.status=="success")
		{	
			len=response.list.length;

			var stable = document.getElementById('SearchResultsTable');
			var oldrow = document.getElementById(simDocsRowId).rowIndex + 1;

			while(len>count)
			{
				/*var row=stable.insertRow(oldrow + count );

			var innerHTMLstr="";
			innerHTMLstr='<td colspan="8">';
			if(count == 0){
				innerHTMLstr+='<table style="width:740px;border-width:2px 2px 0px 2px;border-style:solid; border-color:#C3CFD1;" >'; 
			}else if (count == len -1)
			{
				innerHTMLstr+='<table style="width:740px;border-width:0px 2px 2px 2px;border-style:solid; border-color:#C3CFD1;" >'; 
			}else{
				innerHTMLstr+='<table style="width:740px;border-width:0px 2px 0px 2px;border-style:solid; border-color:#C3CFD1;" >'; 
			}
		//	innerHTMLstr+='<table style="width:746px;border-width:1px 1px 1px;border-style:solid; border-color:#C3CFD1;" rules=rows >'; 
			innerHTMLstr+='<tr>';
			if((response.list[count].code!=null)&&(response.list[count].title!=null)&&(response.list[count].type!=null)&&(response.list[count].format!=null)&&(response.list[count].size!=null)){
			var title=(response.list[count].title).substring(0,35);
			var dateString = response.list[count].modifiedDate;
            var myDate = new Date(dateString);	 		
			var dd=myDate.getDate();
			var mm=myDate.getMonth();
			var yy=myDate.getFullYear();

			var datesimilar=(mm+"/"+dd+"/"+yy);
			//var datesimilar=mm+"/"+dd+"/"+yy;
			innerHTMLstr+='<td align="left" style="width:230px;"><a href="'+response.list[count].url+'">'+response.list[count].code +'</a><br>' + title+'</td>';			
			innerHTMLstr+='<td align="center" style="width:40px;">'  +response.list[count].type+'</td>';
			innerHTMLstr+='<td align="center" style="width:28px;">'+response.list[count].format+'</td>';
			innerHTMLstr+='<td align="right" style="width:35px;">'+response.list[count].size+'</td>';
			innerHTMLstr+='<td align="center" style="width:42px;">'+response.list[count].revisionNo+'</td>';
			innerHTMLstr+='<td align="left" style="width:65px;" >'+datesimilar+'</td>';
			innerHTMLstr+='<td align="center" style="width:65px;"><a href="'+response.list[count].url+'" ><img border="0" title='+title+' src="/shared/images/download.gif"></a></td>';
			innerHTMLstr+='<td align="center" style="width:50px;">-</td>'; 
			innerHTMLstr+='</tr></table></td>';
			alert("here");
			row.innerHTML=innerHTMLstr; 
			}
			alert("can reach");*/
				//	if(response.list[count].code==null){
				//	alert("Null");}
				var row=stable.insertRow(oldrow + count );				
				if((response.list[count].code!=null)&&(response.list[count].title!=null)){ 
					//	alert(response.list[count].hardcopy_url);
					var description=row.insertCell(0);
					var type=row.insertCell(1);
					var format=row.insertCell(2);
					var size=row.insertCell(3);
					var rev=row.insertCell(4);
					var datelastmod=row.insertCell(5);
					var dwnldfiles=row.insertCell(6);
					var order=row.insertCell(7);
					if(len==1)
					{
						description.style.borderTop="2px solid #C3CFD1";
						description.style.borderLeft="2px solid #C3CFD1";
						description.style.borderBottom="2px solid #C3CFD1";
						type.style.borderTop="2px solid #C3CFD1";
						format.style.borderTop="2px solid #C3CFD1";
						size.style.borderTop="2px solid #C3CFD1";
						rev.style.borderTop="2px solid #C3CFD1";
						datelastmod.style.borderTop="2px solid #C3CFD1";
						dwnldfiles.style.borderTop="2px solid #C3CFD1";
						order.style.borderTop="2px solid #C3CFD1";	
						order.style.borderRight="2px solid #C3CFD1";
						type.style.borderBottom="2px solid #C3CFD1";
						format.style.borderBottom="2px solid #C3CFD1";
						size.style.borderBottom="2px solid #C3CFD1";
						rev.style.borderBottom="2px solid #C3CFD1";
						datelastmod.style.borderBottom="2px solid #C3CFD1";
						dwnldfiles.style.borderBottom="2px solid #C3CFD1";
						order.style.borderBottom="2px solid #C3CFD1";	
					}
					else if(count==0)
					{
						//row.style.borderTop="2px solid #C3CFD1";
						description.style.borderTop="2px solid #C3CFD1";
						description.style.borderLeft="2px solid #C3CFD1";
						type.style.borderTop="2px solid #C3CFD1";
						format.style.borderTop="2px solid #C3CFD1";
						size.style.borderTop="2px solid #C3CFD1";
						rev.style.borderTop="2px solid #C3CFD1";
						datelastmod.style.borderTop="2px solid #C3CFD1";
						dwnldfiles.style.borderTop="2px solid #C3CFD1";
						order.style.borderTop="2px solid #C3CFD1";	
						order.style.borderRight="2px solid #C3CFD1";				
					}
					else if(count==len-1)
					{
						description.style.borderBottom="2px solid #C3CFD1";
						description.style.borderLeft="2px solid #C3CFD1";
						type.style.borderBottom="2px solid #C3CFD1";
						format.style.borderBottom="2px solid #C3CFD1";
						size.style.borderBottom="2px solid #C3CFD1";
						rev.style.borderBottom="2px solid #C3CFD1";
						datelastmod.style.borderBottom="2px solid #C3CFD1";
						dwnldfiles.style.borderBottom="2px solid #C3CFD1";
						order.style.borderBottom="2px solid #C3CFD1";	
						order.style.borderRight="2px solid #C3CFD1";	
					}
					else{
						description.style.borderLeft="2px solid #C3CFD1";
						order.style.borderRight="2px solid #C3CFD1";			
					}

					var title=(response.list[count].title).substring(0,35);
					var dateString = response.list[count].modifiedDate;
					var myDate = new Date(dateString);	 		
					var dd=myDate.getDate();
					var mm=myDate.getMonth();
					var yy=myDate.getFullYear();			
					var datesimilar=(mm+"/"+dd+"/"+yy);		
					type.align="center";
					format.align="center";
					size.align="center";
					rev.align="center";
					datelastmod.align="center";
					dwnldfiles.align="center";
					order.align="center";

					description.innerHTML+='<a href="'+response.list[count].url+'">'+response.list[count].code +'</a><br>' +title;

					if(response.list[count].type!=null){
						type.innerHTML=response.list[count].type;
					}
					else{
						type.innerHTML='-';
					}
					if(response.list[count].format!=null){
						format.innerHTML=response.list[count].format;
					}
					else{
						format.innerHTML='-';
					}
					if(response.list[count].size!=null){
						size.innerHTML=response.list[count].size;
					}
					else{
						size.innerHTML='-';
					}
					if(response.list[count].revisionNo!=null){
						rev.innerHTML=response.list[count].revisionNo;
					}	
					else			
					{
						rev.innerHTML='-';
					}
					if(datesimilar!=null){
						datelastmod.innerHTML=datesimilar;
					}
					else{
						datelastmod.innerHTML='-';
					}

					dwnldfiles.innerHTML='<a href="'+response.list[count].url+'" ><span border="0" title='+title+' id="btn_download"></span></a>';	
					//order.innerHTML='<a href="'+response.list[count].hardcopyUrl+'"><img border="0" alt="Buy Hard Copy" src="/shared/images/buy_Hard_Copy_button.gif"></a>';
					order.innerHTML='-';
				}
				count++;
			}

		}

		else
		{
			var table = document.getElementById('SearchResultsTable');
			var oldrow = document.getElementById(simDocsRowId).rowIndex + 1;
			var row=table.insertRow(oldrow );
			var msg=row.insertCell(0);
			msg.innerHTML=" No Documents for this";
		}
	});
}
function show_DocsTable(DocsTableId,assetUrl,arrow)
{		
	document.getElementById(arrow).src='/recommendation/images/upArrow.gif';
	var url ="/webapp/recommendations/fetchSimilarDocuments.sp";	
	var obj = new Object;
	obj.assetUrl= assetUrl;	
	displayTableforDownloads(url,obj,DocsTableId);


}
function displayTableforDownloads(url,obj,DocsTableId)
{

	jQuery.post(url, obj, function(response){		 
		var count=0;	 
		if (response.status=="success")
		{
			len=response.list.length;
			//	alert(len);
			document.getElementById(DocsTableId).style.display = "block";
			while(len>count)
			{
				var table=document.getElementById(DocsTableId).insertRow(0);			
				//	var innerHTMLstr="";
				if((response.list[count].code!=null)&&(response.list[count].title!=null)){
					var title=(response.list[count].title).substring(0,35);
					var dateString = response.list[count].modifiedDate;
					var myDate = new Date(dateString);	 		
					var dd=myDate.getDate();
					var mm=myDate.getMonth();
					var yy=myDate.getFullYear();
					var length1=(yy.toString()).length;
					if((mm.toString()).length==1)
					{
						mm="0"+mm;
					}
					if((dd.toString()).length==1)
					{
						dd="0"+dd; 
					}
					yy=(yy.toString()).charAt(length1-2)+(yy.toString()).charAt(length1-1); 

					var datesimilar=(mm+"/"+dd+"/"+yy);

					/*	innerHTMLstr+='<td style="width:275px"><a href="'+response.list[count].url+'">'+response.list[count].code +'</a><br>' + title+'</td>';
			innerHTMLstr+='<td align="center" style="width:64px;">'   +response.list[count].size+'</td>';
			innerHTMLstr+='<td align="center" style="width:70px;">'   +response.list[count].revisionNo+'</td>';
			innerHTMLstr+='<td align="center" style="width:70px;">-</td>';
			innerHTMLstr+='<td align="center"  style="width:70px;">'   +datesimilar+'</td>';
			innerHTMLstr+='<td align="center" style="width:63px;">-</td>';	
			alert("Reached end");			
			table.innerHTML+=innerHTMLstr;*/
					var description=table.insertCell(0);
					var size=table.insertCell(1);
					var rev=table.insertCell(2);
					var dtdwnld=table.insertCell(3);
					var dtmod=table.insertCell(4);
					var srcpage=table.insertCell(5);
					description.width="275px";
					size.width="64px";
					rev.width="70px";
					dtdwnld.width="70px";
					dtmod.width="70px";
					srcpage.width="63px";
					dtdwnld.align="center";
					rev.align="center";
					dtmod.align="center";
					srcpage.align="center";
					size.align="center";
					description.innerHTML='<a href="'+response.list[count].url+'">'+response.list[count].code +'</a><br>' + title;
					if(response.list[count].size!=null){
						size.innerHTML=response.list[count].size;
					}
					else{
						size.innerHTML='-';
					}
					if(response.list[count].revisionNo!=null){
						rev.innerHTML=response.list[count].revisionNo;
					}	
					else			
					{
						rev.innerHTML='-';
					}
					dtdwnld.innerHTML='-';
					if(datesimilar!=null){
						dtmod.innerHTML=datesimilar;
					}
					else
					{
						dtmod.innerHTML='-';
					}
					srcpage.innerHTML='-';
				}
				count++;

			}
		}
		else
		{
			document.getElementById(DocsTableId).style.display = "block";
			var table=document.getElementById(DocsTableId).insertRow(0);
			var msg=table.insertCell(0);
			msg.innerHTML="No Documents for this";
		}
	});
}
function hide_DocsTable(DocsTableId,arrow)
{

	//document.getElementById(DocsTableId).style.display = "none";
	document.getElementById(arrow).src='/recommendation/images/downArrow.gif';
	var Parent = document.getElementById(DocsTableId);
	while(Parent.hasChildNodes())
	{
		Parent.removeChild(Parent.firstChild);
	}
	document.getElementById(DocsTableId).style.display = "none";
}

function hideselectsRecommendations() { 
	for(i=0;i<document.forms.length;i++){ // if there are forms on the page
		frm = document.forms[i];
		var inputs = frm.getElementsByTagName("SELECT");
		for (j=0;j<inputs.length;j++){
			if(inputs[j].style.display !='none')
			{
				inputs[j].style.display = 'none';
			}
			else 
			{
				inputs[j].style.display= 'inline';
			}
		}
	}
}


function displayBundleDetails(desc,productId,code,productCode,fastPreview) 
{  
	displayBundleDetails(desc,productId,code,productCode,fastPreview,'en');
}

function displayBundleDetails(desc,productId,code,productCode,fastPreview,lang_cd) 
{  

	url="/webapp/sps/components/BundleLayerDisplay.jsp?bundleType=jump_start&bundleName="+desc+"&productId="+productId+"&code="+code+"&productCode="+productCode+"&fastPreview="+fastPreview+'&lang_cd='+lang_cd;

//	url="/webapp/sps/components/BundleLayerDisplay.jsp?bundleType=jump_start&bundleName="+sot;
	var header=document.getElementById('ajaxWindowTitle2');
//	alert(header);
//	Added by b37913 for CR-47387 
//	added id=Close to handle close button for other language
	header.innerHTML='<div style="margin-left:10px">'+desc+'<div style="cursor:pointer;position:absolute;right:2px;top:4px;height:26px;"><img style="padding:4px;width:14px;height:14px;" title="Close" id="Close" src="/shared/images/x.png"  onclick="closeit2()"></div></div>';  
	jQuery('#maindiv').empty();
	jQuery('#maindiv').attr('class','cluetip-waitimage1');


	var scrolledX, scrolledY;
	if( self.pageYoffset ) {
		scrolledX = self.pageXoffset;
		scrolledY = self.pageYoffset;
	} else if( document.documentElement && document.documentElement.scrollTop ) {
		scrolledX = document.documentElement.scrollLeft;
		scrolledY = document.documentElement.scrollTop;
	} else if( document.body ) {
		scrolledX = document.body.scrollLeft;
		scrolledY = document.body.scrollTop;
	}

//	Next, determine the coordinates of the center of browser's window

	var centerX, centerY;
	if( self.innerHeight ) {
		centerX = self.innerWidth;
		centerY = self.innerHeight;
	} else if( document.documentElement && document.documentElement.clientHeight ) {
		centerX = document.documentElement.clientWidth;
		centerY = document.documentElement.clientHeight;
	} else if( document.body ) {
		centerX = document.body.clientWidth;
		centerY = document.body.clientHeight;
	}

//	Xwidth is the width of the div, Yheight is the height of the
//	div passed as arguments to the function:
	var leftoffset = scrolledX + (centerX - 500) / 2; 
	var topoffset = scrolledY + (centerY - 450) / 2;
//	The initial width and height of the div can be set in the
//	style sheet with display:none; divid is passed as an argument to // the function
	var o=document.getElementById("maindivcontent");
	var r=o.style;
	r.position='absolute';
	r.top = topoffset + 'px';
	r.left = leftoffset + 'px'; 
//	r.display = "block";


	document.getElementById("dwindow2").style.width="602px";
	document.getElementById("dwindow2").style.height="402px";
	document.getElementById("maindivcontent").style.height="404px";
//	document.getElementById("dwindow2").style.overflowY="hidden";
	document.getElementById("dwindowcontent2").style.width="552px";//timebeing
	document.getElementById("dwindowcontent2").style.height="367px";
	document.getElementById("maindivcontent").style.display="block";


	var obj = new Object;

	jQuery.post(url, obj, function(response){
		//var header=document.getElementById('ajaxWindowTitle2');
		jQuery("#maindiv").removeClass('cluetip-waitimage1');
		//document.getElementById("dwindow2").style.overflowY="auto";
		jQuery("#maindiv").html(response);
	});
}  

/* Added by b36554 for fslmobile(CR37039) on 4.7.11 Starts */
function openMoreTrainingVideos(title,trainingCode,fastpreview) {
	openMoreTrainingVideos(title,trainingCode,fastpreview,'en')
}

function openMoreTrainingVideos(title,trainingCode,fastprevoew,lang_cd) 
{  
	url="/webapp/sps/components/training_featured_videos.jsp?trainingCode="+trainingCode+"&fastpreview="+fastprevoew+"&lang_cd="+lang_cd;
	var header=document.getElementById('ajaxWindowTitle2');
//	alert(header);

	title = 'All Featured Videos';
//	Added by b37913 for CR-47387 
//	added id=Close to handle close button for other language
	header.innerHTML='<div style="margin-left:10px">'+getTranslatedText(title)+' <div style="cursor:pointer;position:absolute;right:2px;top:4px;height:26px;"><img style="padding:4px;width:14px;height:14px" title="'+getTranslatedText('Close')+'" id="Close" src="/shared/images/x.png"  onclick="closeit2()"></div></div>';  
	jQuery('#maindiv').empty();
	jQuery('#maindiv').attr('class','cluetip-waitimage1');


	var scrolledX, scrolledY;
	if( self.pageYoffset ) {
		scrolledX = self.pageXoffset;
		scrolledY = self.pageYoffset;
	} else if( document.documentElement && document.documentElement.scrollTop ) {
		scrolledX = document.documentElement.scrollLeft;
		scrolledY = document.documentElement.scrollTop;
	} else if( document.body ) {
		scrolledX = document.body.scrollLeft;
		scrolledY = document.body.scrollTop;
	}

//	Next, determine the coordinates of the center of browser's window

	var centerX, centerY;
	if( self.innerHeight ) {
		centerX = self.innerWidth;
		centerY = self.innerHeight;
	} else if( document.documentElement && document.documentElement.clientHeight ) {
		centerX = document.documentElement.clientWidth;
		centerY = document.documentElement.clientHeight;
	} else if( document.body ) {
		centerX = document.body.clientWidth;
		centerY = document.body.clientHeight;
	}

//	Xwidth is the width of the div, Yheight is the height of the
//	div passed as arguments to the function:
	var leftoffset = scrolledX + (centerX - 700) / 2; 
	var topoffset = scrolledY + (centerY - 450) / 2;
//	The initial width and height of the div can be set in the
//	style sheet with display:none; divid is passed as an argument to // the function
	var o=document.getElementById("maindivcontent");
	var r=o.style;
	r.position='absolute';
	r.top = topoffset + 'px';
	r.left = 150 + 'px'; 
//	r.display = "block";


	document.getElementById("dwindow2").style.width="602px";
	document.getElementById("dwindow2").style.height="402px";
	document.getElementById("maindivcontent").style.height="404px";
//	document.getElementById("dwindow2").style.overflowY="hidden";
	document.getElementById("dwindowcontent2").style.width="552px";//timebeing
	document.getElementById("dwindowcontent2").style.height="367px";
	document.getElementById("maindivcontent").style.display="block";


	var obj = new Object;

	jQuery.post(url, obj, function(response){
		//var header=document.getElementById('ajaxWindowTitle2');
		jQuery("#maindiv").removeClass('cluetip-waitimage1');
		//document.getElementById("dwindow2").style.overflowY="auto";
		jQuery("#maindiv").html(response);
	});
}
/* Added by b36554 for fslmobile(CR37039 ) on 4.7.11 Ends */


/* Added by b36554 for fslmobile(CR37039) on 15.7.11 Starts */
function openMoreRelatedTrainings(title,trainingCode,fastprevoew) 
{    

	url="/webapp/sps/components/related_trainings.jsp?trainingCode="+trainingCode+"&fastpreview="+fastprevoew;
	var header=document.getElementById('ajaxWindowTitle2');
//	alert(header);

	title = 'All Related Training';
//	Added by b37913 for CR-47387 
//	added id=Close to handle close button for other language
	header.innerHTML='<div style="margin-left:10px">'+getTranslatedText(title)+' <div style="cursor:pointer;position:absolute;right:2px;top:4px;height:26px;"><img style="padding:4px;width:14px;height:14px;" title="'+getTranslatedText('Close')+'" src="/shared/images/x.png" id="Close" onclick="closeit2()"></div></div>';  
	jQuery('#maindiv').empty();
	jQuery('#maindiv').attr('class','cluetip-waitimage1');

	var scrolledX, scrolledY;
	if( self.pageYoffset ) {
		scrolledX = self.pageXoffset;
		scrolledY = self.pageYoffset;
	} else if( document.documentElement && document.documentElement.scrollTop ) {
		scrolledX = document.documentElement.scrollLeft;
		scrolledY = document.documentElement.scrollTop;
	} else if( document.body ) {
		scrolledX = document.body.scrollLeft;
		scrolledY = document.body.scrollTop;
	}

//	Next, determine the coordinates of the center of browser's window

	var centerX, centerY;
	if( self.innerHeight ) {
		centerX = self.innerWidth;
		centerY = self.innerHeight;
	} else if( document.documentElement && document.documentElement.clientHeight ) {
		centerX = document.documentElement.clientWidth;
		centerY = document.documentElement.clientHeight;
	} else if( document.body ) {
		centerX = document.body.clientWidth;
		centerY = document.body.clientHeight;
	}

//	Xwidth is the width of the div, Yheight is the height of the
//	div passed as arguments to the function:
	var leftoffset = scrolledX + (centerX - 700) / 2; 
	var topoffset = scrolledY + (centerY - 450) / 2;
//	The initial width and height of the div can be set in the
//	style sheet with display:none; divid is passed as an argument to // the function
	var o=document.getElementById("maindivcontent");
	var r=o.style;
	r.position='absolute';
	r.top = topoffset + 'px';
	r.left = 150 + 'px'; 
//	r.display = "block";


	document.getElementById("dwindow2").style.width="602px";
	document.getElementById("dwindow2").style.height="402px";
	document.getElementById("maindivcontent").style.height="404px";
//	document.getElementById("dwindow2").style.overflowY="hidden";
	document.getElementById("dwindowcontent2").style.width="552px";//timebeing
	document.getElementById("dwindowcontent2").style.height="367px";
	document.getElementById("maindivcontent").style.display="block";


	var obj = new Object;

	jQuery.post(url, obj, function(response){
		//var header=document.getElementById('ajaxWindowTitle2');
		jQuery("#maindiv").removeClass('cluetip-waitimage1');
		//document.getElementById("dwindow2").style.overflowY="auto";
		jQuery("#maindiv").html(response);
	});
}  

/* Added by b36554 for fslmobile(CR37039 ) on 15.7.11 Ends */


function callAlliance(allianceurl,name,description2,vendorUrl,productCode,fastPreview)
{

//	alert(vendorUrl);
	url=allianceurl+"&productCode="+productCode; 
	url=url.replace(/\+/gi,"%2B");

	vendorUrl=vendorUrl.replace(/\+/gi,"%2B");
	var head=document.getElementById('dwindowcontent2');

	var header=document.getElementById('ajaxWindowTitle2');
//	Added by b37913 for CR-47387 
//	added id=Close to handle close button for other language
	header.innerHTML='<div  style="margin-left:10px;">'+name+' <div style="cursor:pointer;position:absolute;right:2px;top:4px;height:26px;"><img style="padding:4px;width:14px;height:14px;" title="Close" id="Close" src="/shared/images/x.png" onclick="closeit2()"></div></div>'; 
	jQuery('#maindiv').empty();
	jQuery('#maindiv').attr('class','cluetip-waitimage1');
	/* Added for aligning the popup in center*/

	var scrolledX, scrolledY;
	if( self.pageYoffset ) {
		scrolledX = self.pageXoffset;
		scrolledY = self.pageYoffset;
	} else if( document.documentElement && document.documentElement.scrollTop ) {
		scrolledX = document.documentElement.scrollLeft;
		scrolledY = document.documentElement.scrollTop;
	} else if( document.body ) {
		scrolledX = document.body.scrollLeft;
		scrolledY = document.body.scrollTop;
	}

//	Next, determine the coordinates of the center of browser's window

	var centerX, centerY;
	if( self.innerHeight ) {
		centerX = self.innerWidth;
		centerY = self.innerHeight;
	} else if( document.documentElement && document.documentElement.clientHeight ) {
		centerX = document.documentElement.clientWidth;
		centerY = document.documentElement.clientHeight;
	} else if( document.body ) {
		centerX = document.body.clientWidth;
		centerY = document.body.clientHeight;
	}

//	Xwidth is the width of the div, Yheight is the height of the
//	div passed as arguments to the function:
	var leftoffset = scrolledX + (centerX - 500) / 2; 
	var topoffset = scrolledY + (centerY - 450) / 2;
//	The initial width and height of the div can be set in the
//	style sheet with display:none; divid is passed as an argument to // the function
//	var o=document.getElementById("dwindow2");
	var o=document.getElementById("maindivcontent");
	var r=o.style;
	r.position='absolute';
	r.top = topoffset + 'px';
	r.left = leftoffset + 'px';


	/*End of showing the popup in center */


	document.getElementById("dwindow2").style.overflowY="hidden";
//	document.getElementById("dwindow2").style.left=actualWidth;
//	document.getElementById("dwindow2").style.top=actualHeight;
	document.getElementById("dwindow2").style.width="602px";
	document.getElementById("dwindow2").style.height="402px";
	document.getElementById("maindivcontent").style.height="404px";
	document.getElementById("dwindowcontent2").style.width="552px";//timebeing
	document.getElementById("dwindowcontent2").style.height="367px";

	document.getElementById("maindivcontent").style.display="block";
	document.getElementById("dwindow2").style.display="block";
	var learnmore='<div id="description" style="padding-top:4px;" align="left">'+description2+'</div><div id="vendorId" align="right" style="padding-bottom:5px;"><a href='+vendorUrl+' target="_blank">Learn more about '+name+' <img src="/shared/images/misc/arrow_right_off_icon.gif"/></a></div>';
	var obj = new Object;

	if( fastPreview =="1"){
		var header=document.getElementById('ajaxWindowTitle2');
		jQuery("#maindiv").removeClass('cluetip-waitimage1');
		//document.getElementById("dwindow2").style.overflowY="auto";
		jQuery("#maindiv").html(learnmore+'Information not available in preview.');
	}else{
		jQuery.post(url, obj, function(response){
			var header=document.getElementById('ajaxWindowTitle2');
			jQuery("#maindiv").removeClass('cluetip-waitimage1');
			//document.getElementById("dwindow2").style.overflowY="auto";
			jQuery("#maindiv").html(learnmore+response);
		});
	}

}


//Added the below methods for SOlution sell phase 2 by b28379 
function energyEfficiencyQuickFacts(title,productCode) 
{  

	url="/webapp/sps/components/energy_efficiency.jsp?productCode="+productCode;
	var header=document.getElementById('ajaxWindowTitle2');
//	alert(header);
//	Added by b37913 for CR-47387 
//	added id=Close to handle close button for other language
	header.innerHTML='<div style="margin-left:10px">'+title+'<div style="cursor:pointer;position:absolute;right:2px;top:4px;height:26px;"><img style="padding:4px;width:14px;height:14px;" title="Close" src="/shared/images/x.png" id="Close" onclick="closeit2()"></div></div>';  
	jQuery('#maindiv').empty();
	jQuery('#maindiv').attr('class','cluetip-waitimage1');


	var scrolledX, scrolledY;
	if( self.pageYoffset ) {
		scrolledX = self.pageXoffset;
		scrolledY = self.pageYoffset;
	} else if( document.documentElement && document.documentElement.scrollTop ) {
		scrolledX = document.documentElement.scrollLeft;
		scrolledY = document.documentElement.scrollTop;
	} else if( document.body ) {
		scrolledX = document.body.scrollLeft;
		scrolledY = document.body.scrollTop;
	}

//	Next, determine the coordinates of the center of browser's window

	var centerX, centerY;
	if( self.innerHeight ) {
		centerX = self.innerWidth;
		centerY = self.innerHeight;
	} else if( document.documentElement && document.documentElement.clientHeight ) {
		centerX = document.documentElement.clientWidth;
		centerY = document.documentElement.clientHeight;
	} else if( document.body ) {
		centerX = document.body.clientWidth;
		centerY = document.body.clientHeight;
	}

//	Xwidth is the width of the div, Yheight is the height of the
//	div passed as arguments to the function:
	var leftoffset = scrolledX + (centerX - 700) / 2; 
	var topoffset = scrolledY + (centerY - 450) / 2;
//	The initial width and height of the div can be set in the
//	style sheet with display:none; divid is passed as an argument to // the function
	var o=document.getElementById("maindivcontent");
	var r=o.style;
	r.position='absolute';
	r.top = topoffset + 'px';
	r.left = 150 + 'px'; 
//	r.display = "block";


	document.getElementById("dwindow2").style.width="602px";
	document.getElementById("dwindow2").style.height="402px";
	document.getElementById("maindivcontent").style.height="404px";
//	document.getElementById("dwindow2").style.overflowY="hidden";
	document.getElementById("dwindowcontent2").style.width="552px";//timebeing
	document.getElementById("dwindowcontent2").style.height="367px";
	document.getElementById("maindivcontent").style.display="block";


	var obj = new Object;

	jQuery.post(url, obj, function(response){
		//var header=document.getElementById('ajaxWindowTitle2');
		jQuery("#maindiv").removeClass('cluetip-waitimage1');
		//document.getElementById("dwindow2").style.overflowY="auto";
		jQuery("#maindiv").html(response);
	});
}


function openMoreProductVideos(title,productCode,fastprevoew,lang_cd) 
{  

	url="/webapp/sps/components/prod_featured_videos.jsp?productCode="+productCode+"&fastpreview="+fastprevoew+"&lang_cd="+lang_cd;
	var header=document.getElementById('ajaxWindowTitle2');
//	alert(header);

	title = 'All Featured Videos';
//	Added by b37913 for CR-47387 
//	added id=Close to handle close button for other language
	header.innerHTML='<div style="margin-left:10px">'+getTranslatedText(title)+' <div style="cursor:pointer;position:absolute;right:2px;top:4px;height:26px;"><img style="padding:4px;width:14px;height:14px;" title="'+getTranslatedText('Close')+'" id="Close" src="/shared/images/x.png"  onclick="closeit2()"></div></div>';  
	jQuery('#maindiv').empty();
	jQuery('#maindiv').attr('class','cluetip-waitimage1');


	var scrolledX, scrolledY;
	if( self.pageYoffset ) {
		scrolledX = self.pageXoffset;
		scrolledY = self.pageYoffset;
	} else if( document.documentElement && document.documentElement.scrollTop ) {
		scrolledX = document.documentElement.scrollLeft;
		scrolledY = document.documentElement.scrollTop;
	} else if( document.body ) {
		scrolledX = document.body.scrollLeft;
		scrolledY = document.body.scrollTop;
	}

//	Next, determine the coordinates of the center of browser's window

	var centerX, centerY;
	if( self.innerHeight ) {
		centerX = self.innerWidth;
		centerY = self.innerHeight;
	} else if( document.documentElement && document.documentElement.clientHeight ) {
		centerX = document.documentElement.clientWidth;
		centerY = document.documentElement.clientHeight;
	} else if( document.body ) {
		centerX = document.body.clientWidth;
		centerY = document.body.clientHeight;
	}

//	Xwidth is the width of the div, Yheight is the height of the
//	div passed as arguments to the function:
	var leftoffset = scrolledX + (centerX - 700) / 2; 
	var topoffset = scrolledY + (centerY - 450) / 2;
//	The initial width and height of the div can be set in the
//	style sheet with display:none; divid is passed as an argument to // the function
	var o=document.getElementById("maindivcontent");
	var r=o.style;
	r.position='absolute';
	r.top = topoffset + 'px';
	r.left = 150 + 'px'; 
//	r.display = "block";


	document.getElementById("dwindow2").style.width="602px";
	document.getElementById("dwindow2").style.height="402px";
	document.getElementById("maindivcontent").style.height="404px";
//	document.getElementById("dwindow2").style.overflowY="hidden";
	document.getElementById("dwindowcontent2").style.width="552px";//timebeing
	document.getElementById("dwindowcontent2").style.height="367px";
	document.getElementById("maindivcontent").style.display="block";


	var obj = new Object;

	jQuery.post(url, obj, function(response){
		//var header=document.getElementById('ajaxWindowTitle2');
		jQuery("#maindiv").removeClass('cluetip-waitimage1');
		//document.getElementById("dwindow2").style.overflowY="auto";
		document.getElementById("maindiv").innerHTML=response;
		//jQuery("#maindiv").html(response);
	});
}


function openBundleDocs(bundleId,bundleCode,bundleName) 
{  

	url="/webapp/sps/components/bundleDocuments.jsp?code="+bundleCode+"&id="+bundleId;
	var header=document.getElementById('ajaxWindowTitle2');
//	alert(header);

	title = bundleName+ ' Documents';
//	Added by b37913 for CR-47387 
//	added id=Close to handle close button for other language
	header.innerHTML='<div style="margin-left:10px">'+title+' <div style="cursor:pointer;position:absolute;right:2px;top:4px;height:26px;"><img style="padding:4px;width:14px;height:14px;" title="Close" src="/shared/images/x.png" id="Close" onclick="closeit2()"></div></div>';  
	jQuery('#maindiv').empty();
	jQuery('#maindiv').attr('class','cluetip-waitimage1');


	var scrolledX, scrolledY;
	if( self.pageYoffset ) {
		scrolledX = self.pageXoffset;
		scrolledY = self.pageYoffset;
	} else if( document.documentElement && document.documentElement.scrollTop ) {
		scrolledX = document.documentElement.scrollLeft;
		scrolledY = document.documentElement.scrollTop;
	} else if( document.body ) {
		scrolledX = document.body.scrollLeft;
		scrolledY = document.body.scrollTop;
	}

//	Next, determine the coordinates of the center of browser's window

	var centerX, centerY;
	if( self.innerHeight ) {
		centerX = self.innerWidth;
		centerY = self.innerHeight;
	} else if( document.documentElement && document.documentElement.clientHeight ) {
		centerX = document.documentElement.clientWidth;
		centerY = document.documentElement.clientHeight;
	} else if( document.body ) {
		centerX = document.body.clientWidth;
		centerY = document.body.clientHeight;
	}

//	Xwidth is the width of the div, Yheight is the height of the
//	div passed as arguments to the function:
	var leftoffset = scrolledX + (centerX - 700) / 2; 
	var topoffset = scrolledY + (centerY - 450) / 2;
//	The initial width and height of the div can be set in the
//	style sheet with display:none; divid is passed as an argument to // the function
	var o=document.getElementById("maindivcontent");
	var r=o.style;
	r.position='absolute';
	r.top = topoffset + 'px';
	r.left = 150 + 'px'; 
//	r.display = "block";


	document.getElementById("dwindow2").style.width="602px";
	document.getElementById("dwindow2").style.height="402px";
	document.getElementById("maindivcontent").style.height="404px";
//	document.getElementById("dwindow2").style.overflowY="hidden";
	document.getElementById("dwindowcontent2").style.width="552px";//timebeing
	document.getElementById("dwindowcontent2").style.height="367px";
	document.getElementById("maindivcontent").style.display="block";


	var obj = new Object;

	jQuery.post(url, obj, function(response){
		//var header=document.getElementById('ajaxWindowTitle2');
		jQuery("#maindiv").removeClass('cluetip-waitimage1');
		//document.getElementById("dwindow2").style.overflowY="auto";
		jQuery("#maindiv").html(response);
	});
}


function openMoreApplicationVideos(title,productCode) 
{  
	openMoreApplicationVideos(title,productCode,null);
}

function openMoreApplicationVideos(title,productCode,language) 
{  
	url="/webapp/sps/components/prod_featured_videos.jsp?productCode="+productCode+"&type=application&fastpreview=";

	if(language){
		url = url +"&lang_cd="+language;
	}
	var header=document.getElementById('ajaxWindowTitle2');
//	alert(header);

	title = 'All Featured Videos';
//	Added by b37913 for CR-47387 
//	added id=Close to handle close button for other language
	header.innerHTML='<div style="margin-left:10px">'+getTranslatedText(title)+'<div style="cursor:pointer;position:absolute;right:2px;top:4px;height:26px;"><img style="padding:4px;width:14px;height:14px;" title="Close" id="Close" src="/shared/images/x.png"  onclick="closeit2()"></div></div>';  
	jQuery('#maindiv').empty();
	jQuery('#maindiv').attr('class','cluetip-waitimage1');


	var scrolledX, scrolledY;
	if( self.pageYoffset ) {
		scrolledX = self.pageXoffset;
		scrolledY = self.pageYoffset;
	} else if( document.documentElement && document.documentElement.scrollTop ) {
		scrolledX = document.documentElement.scrollLeft;
		scrolledY = document.documentElement.scrollTop;
	} else if( document.body ) {
		scrolledX = document.body.scrollLeft;
		scrolledY = document.body.scrollTop;
	}

//	Next, determine the coordinates of the center of browser's window

	var centerX, centerY;
	if( self.innerHeight ) {
		centerX = self.innerWidth;
		centerY = self.innerHeight;
	} else if( document.documentElement && document.documentElement.clientHeight ) {
		centerX = document.documentElement.clientWidth;
		centerY = document.documentElement.clientHeight;
	} else if( document.body ) {
		centerX = document.body.clientWidth;
		centerY = document.body.clientHeight;
	}

//	Xwidth is the width of the div, Yheight is the height of the
//	div passed as arguments to the function:
	var leftoffset = scrolledX + (centerX - 700) / 2; 
	var topoffset = scrolledY + (centerY - 450) / 2;
//	The initial width and height of the div can be set in the
//	style sheet with display:none; divid is passed as an argument to // the function
	var o=document.getElementById("maindivcontent");
	var r=o.style;
	r.position='absolute';
	r.top = topoffset + 'px';
	r.left = 150 + 'px'; 
//	r.display = "block";


	document.getElementById("dwindow2").style.width="602px";
	document.getElementById("dwindow2").style.height="402px";
	document.getElementById("maindivcontent").style.height="404px";
//	document.getElementById("dwindow2").style.overflowY="hidden";
	document.getElementById("dwindowcontent2").style.width="552px";//timebeing
	document.getElementById("dwindowcontent2").style.height="367px";
	document.getElementById("maindivcontent").style.display="block";


	var obj = new Object;

	jQuery.post(url, obj, function(response){
		//var header=document.getElementById('ajaxWindowTitle2');
		jQuery("#maindiv").removeClass('cluetip-waitimage1');
		//document.getElementById("dwindow2").style.overflowY="auto";
		jQuery("#maindiv").html(response);
	});
}

function initializedrag1(e){


	offsetx=ie5? event.clientX : e.clientX
			offsety=ie5? event.clientY : e.clientY
//					document.getElementById("dwindowcontent1").style.display="none" //extra

					tempx=parseInt(document.getElementById("dwindow2").style.left)
					tempy=parseInt(document.getElementById("dwindow2").style.top)

					dragapproved=true
					document.getElementById("dwindow2").onmousemove=drag_drop
}

function closeit2(){
//	document.getElementById("dwindowcontent2").style.display="none";
	document.getElementById("maindivcontent").style.display="none";

}

//mouse down on dragged DIV element   
function startdragging(t, e) {   
	if (e.preventDefault) e.preventDefault(); //line for IE compatibility   
	e.cancelBubble = true;   
	window.document.onmousemoveOld = window.document.onmousemove;   
	window.document.onmouseupOld = window.document.onmouseup;   
	window.document.onmousemove=dodragging;   
	window.document.onmouseup=stopdragging;   
	window.document.draged = t;   
	t.dragX = e.clientX;   
	t.dragY = e.clientY;   
	return false;   
}   
//move the DIV   
function dodragging(e) {   

	if (!e) e = event; //line for IE compatibility   
	t = window.document.draged;   
	t.style.left = (t.offsetLeft + e.clientX - t.dragX)+"px";   
	t.style.top = (t.offsetTop + e.clientY - t.dragY)+"px";   
	t.dragX = e.clientX;   
	t.dragY = e.clientY;   
	return false;   
}   
//restore event-handlers   
function stopdragging() {   
	window.document.onmousemove=window.document.onmousemoveOld;   
	window.document.onmouseup=window.document.onmouseupOld;   
}   

//Added the trackExitLnkForAnalytics for CR54489	
//Modified by B49081 for CR-55852
function openThirdPartyVendor(thirdpartyurl,var1,var2,var3,var4,var5,var6,name)
{


	if(confirm("You are about to launch a new browser window that will display a website that is not affiliated with NXP.com.")){
		//Modified by B49081 for CR-55852
		recordPartner(thirdpartyurl, name);
		if(typeof trackExitLnkForAnalytics == 'function') { 
			trackExitLnkForAnalytics(thirdpartyurl);
		}
		window.open(thirdpartyurl,'','');
	} 
}
//End of addding by b28379 for solution sell phase 2

function openNonHostedVideo(url,title){
	window.open(url,'','');
}

function openMoreProductTrainings(productCode,fastpreview) {
	openMoreProductTrainings(productCode,fastpreview,null);
}

//Added by b30255 for  freescale Mobile start on 18th July 2011
function openMoreProductTrainings(productCode,fastpreview,language) 
{  

	url="/webapp/sps/components/prod_featured_trainings.jsp?productCode="+productCode+"&fastpreview="+fastpreview;
	var header=document.getElementById('ajaxWindowTitle2');

	if(language!=null){
		url = url +'&lang_cd='+language;
	}

	title = 'All Featured Training & Events';
	//Added by b37913 for CR-47387 
//	added id=Close to handle close button for other language
	header.innerHTML='<div style="margin-left:10px">'+getTranslatedText(title)+' <div style="cursor:pointer;position:absolute;right:2px;top:4px;height:26px;"><img style="padding:4px;width:14px;height:14px;" title="'+getTranslatedText('Close')+'" src="/shared/images/x.png" id="Close" onclick="closeit2()"></div></div>';  
	jQuery('#maindiv').empty();
	jQuery('#maindiv').attr('class','cluetip-waitimage1');


	var scrolledX, scrolledY;
	if( self.pageYoffset ) {
		scrolledX = self.pageXoffset;
		scrolledY = self.pageYoffset;
	} else if( document.documentElement && document.documentElement.scrollTop ) {
		scrolledX = document.documentElement.scrollLeft;
		scrolledY = document.documentElement.scrollTop;
	} else if( document.body ) {
		scrolledX = document.body.scrollLeft;
		scrolledY = document.body.scrollTop;
	}


	var centerX, centerY;
	if( self.innerHeight ) {
		centerX = self.innerWidth;
		centerY = self.innerHeight;
	} else if( document.documentElement && document.documentElement.clientHeight ) {
		centerX = document.documentElement.clientWidth;
		centerY = document.documentElement.clientHeight;
	} else if( document.body ) {
		centerX = document.body.clientWidth;
		centerY = document.body.clientHeight;
	}


	var leftoffset = scrolledX + (centerX - 700) / 2; 
	var topoffset = scrolledY + (centerY - 450) / 2;

	var o=document.getElementById("maindivcontent");
	var r=o.style;
	r.position='absolute';
	r.top = topoffset + 'px';
	r.left = 150 + 'px'; 


	document.getElementById("dwindow2").style.width="602px";
	document.getElementById("dwindow2").style.height="402px";
	document.getElementById("maindivcontent").style.height="404px";
	document.getElementById("dwindowcontent2").style.width="552px";
	document.getElementById("dwindowcontent2").style.height="367px";
	document.getElementById("maindivcontent").style.display="block";


	var obj = new Object;

	jQuery.post(url, obj, function(response){

		jQuery("#maindiv").removeClass('cluetip-waitimage1');

		jQuery("#maindiv").html(response);
	});
}


function openMoreApplicationTrainings(productCode) 
{
	openMoreApplicationTrainings(productCode,null);
}

function openMoreApplicationTrainings(productCode,language) 
{

	url="/webapp/sps/components/prod_featured_trainings.jsp?productCode="+productCode+"&type=application&fastpreview=";
	var header=document.getElementById('ajaxWindowTitle2');

	if(language!=null){
		url = url +'&lang_cd='+language;
	}
	title = 'All Featured Training & Events';
//	Added by b37913 for CR-47387 
//	added id=Close to handle close button for other language
	header.innerHTML='<div style="margin-left:10px">'+getTranslatedText(title)+'<div style="cursor:pointer;position:absolute;right:2px;top:4px;height:26px;"><img style="padding:4px;width:14px;height:14px;" title="Close" src="/shared/images/x.png" id="Close" onclick="closeit2()"></div></div>';  
	jQuery('#maindiv').empty();
	jQuery('#maindiv').attr('class','cluetip-waitimage1');


	var scrolledX, scrolledY;
	if( self.pageYoffset ) {
		scrolledX = self.pageXoffset;
		scrolledY = self.pageYoffset;
	} else if( document.documentElement && document.documentElement.scrollTop ) {
		scrolledX = document.documentElement.scrollLeft;
		scrolledY = document.documentElement.scrollTop;
	} else if( document.body ) {
		scrolledX = document.body.scrollLeft;
		scrolledY = document.body.scrollTop;
	}


	var centerX, centerY;
	if( self.innerHeight ) {
		centerX = self.innerWidth;
		centerY = self.innerHeight;
	} else if( document.documentElement && document.documentElement.clientHeight ) {
		centerX = document.documentElement.clientWidth;
		centerY = document.documentElement.clientHeight;
	} else if( document.body ) {
		centerX = document.body.clientWidth;
		centerY = document.body.clientHeight;
	}


	var leftoffset = scrolledX + (centerX - 700) / 2; 
	var topoffset = scrolledY + (centerY - 450) / 2;

	var o=document.getElementById("maindivcontent");
	var r=o.style;
	r.position='absolute';
	r.top = topoffset + 'px';
	r.left = 150 + 'px'; 


	document.getElementById("dwindow2").style.width="602px";
	document.getElementById("dwindow2").style.height="402px";
	document.getElementById("maindivcontent").style.height="404px";
	document.getElementById("dwindowcontent2").style.width="552px";//timebeing
	document.getElementById("dwindowcontent2").style.height="367px";
	document.getElementById("maindivcontent").style.display="block";


	var obj = new Object;

	jQuery.post(url, obj, function(response){

		jQuery("#maindiv").removeClass('cluetip-waitimage1');

		jQuery("#maindiv").html(response);
	});
}


function openThirdPartyEvents(url){
	if(confirm("You are about to launch a new browser window that will display a website that is not affiliated with NXP.com.")){
		window.open(url,'','');
	} 

}

//Added by b30255 for  freescale Mobile end on 18th July 2011

	//alert("ready");
		// var maxHeight = 0;
		// // $('.lc:not(#psp-jsp-id .lc)').children('.ccl,.ccr').each(function() {
		// $('.ccl,.ccr').each(function() {
		// 	var height = $(this).outerHeight();
		// 	if ( height > maxHeight ) {
		// 		maxHeight = height;
		// 	}
		// });

		// $('.ccl,.ccr').css({'min-height':maxHeight,'border':'1px solid #ccc'});


	$(function() { 
		if($('.abstractDiv') != null){
			var abstractDiv = $('.abstractDiv');
			if(jQuery.trim($('.abstractDiv').html()) == ""){
				$('.abstractDiv').toggleClass("hideAbstractDiv");
				$('.abstractDiv').toggleClass("abstractDiv",false);
			}
		}
	});

// function setEqualSizeDiv(){
// 	var maxHeight1 = 0;
// 	$('#mncnt .ilc,#mncnt .irc').each(function() {
// 		var height = $(this).outerHeight();
// 		if ( height > maxHeight1 ) {
// 			maxHeight1 = height;

// 		}
// 	});
// 	$('#mncnt .ilc,#mncnt .irc').css({'min-height':maxHeight1,'border':'1px solid #ccc'});

// }

//Video Pop-Up functionallity
//$(document).ready(function(){$(".FSLvideo")&&$.getScript("/files/js/jquery.openvideo.min.js",function(){})});

function closeLanguageSelection(ajaxbox){
	document.getElementById(ajaxbox).hide();
}
//Added by B25319 For CR-51003 on 26June 2013 Start
function openExternalTraining(thirdpartyurl,dataStr)
{
	if(confirm("You are about to launch a new browser window that will display a website that is not affiliated with NXP.com.")){
		jQuery.post('/webapp/history/recordActivity.sp', dataStr, function(data){

		});
		window.open(thirdpartyurl,'','');
	} 

}
function ajaxCallForBuyDirect(obj,item_type,part_num,lang_cd){


	var url = "/webapp/sps/site/inventoryCheck.sp?BUY_ITEM_TYPE="+item_type+"&PART_NUM="+part_num+"&lang_cd="+lang_cd;
	var window_title = getTranslatedText("Availability");

	var arr=findPos(document.getElementById(obj));
	var top_scroll = window.pageYOffset || document.documentElement.scrollTop;
	var left_scroll = window.pageXOffset || document.documentElement.scrollLeft;   
	var left=(arr[0]+135)-left_scroll;
	var top=(arr[1]+5)-top_scroll;

	//Added by b41913 for CR-54433 on 3rd Feb 2014:start
	if(document.getElementById('Inventory1')!=null)
	{
		document.getElementById("dhtmlwindowholder").removeChild(document.getElementById('Inventory1'));
	}//Added by b41913 for CR-54433 on 3rd Feb 2014:end
	if ((item_type == 'SAMPLE_EXCEPTION') || (item_type == 'ITEM_TYPE_SAMPLE')){
		ajaxwin=dhtmlwindow.open('Inventory1',url,window_title, 'left='+left+'px,top='+top+'px,z-index=99999,position=absolute,resize=1,scrolling=1,style="color : #FFFFFF ;float: left; width: 250px; margin-left: 10px;','Inventory');
	}
	else {

		ajaxwin=dhtmlwindow.open('Inventory1',url,window_title, 'width=200px,height=150px,left='+left+'px,top='+top+'px,z-index=99999,position=absolute,resize=1,scrolling=1,style="color : #FFFFFF ;float: left; width: 250px; margin-left: 10px;','Inventory');
	}

}
//Added by B25319 For CR-51003 on 26June 2013 End

//Added for CR-54874 For Global Navigation Mar-2014 by B28384 on 17th March 2014
//modified by b22154 for CR-60627
function validateSubmitQuery(aform){
	/* Added for webanalytics*/
	var s_hdrContentFind = "";
	if(typeof setContentFindingForHdrSearch == 'function') { 
		s_hdrContentFind = setContentFindingForHdrSearch(aform.dnavs.value);
	}

	if(s_hdrContentFind != "") {
		s_hdrContentFind = "&"+s_hdrContentFind;
	}

	var res = false;
	var try1 = true;
	try{
		res = (aform.q.value == '' || aform.q.value == aform.q.getAttribute("placeholder")) ? false : true;
	}catch(ex1){
		try1 = false;
		try{
			aform = $("#search");
			var q = $("#search #fsl-search #parts");
			res = (q.val() == '' || q.val() == q.attr("placeholder")) ? false : true;	
		}catch(ex2){	}
	}
	if("CrossReference"== aform.dnavs.value){
		window.location=aform.baseUrl.value+"/crosscheck/competitorXRef.sp?searchLabel=getCompetitorXRefResults&manufacturer=&quantity=10000&lang_cd="+aform.lang_cd.value+"&competitorPartNumber="+aform.q.value;
	}
	else{
		if(!res){
			var input = document.createElement('input');
			input.type = 'hidden';
			input.name = 'proxycustom';
			input.value = '<HOME/>';
			if(try1)	aform.appendChild(input);
			else		aform.append(input);
		}
		else
		{			
			var queryVal  = aform.q.value;
			aform.q.disabled = true;		
			//var q = queryVal;

			if(aform.dnavs.value!="Partners"){
				aform.sort.value="date:D:L:d1";
			}

			if(aform.client.value == supportClient){
				var input = document.createElement('input');
				input.type = 'hidden';
				input.name = 'requiredfields';
				input.value = '-Asset_Type:SoftwareTools';
				aform.appendChild(input);
			}

			if(aform.dnavs.value!="" && (aform.dnavs.value == "Community" || aform.dnavs.value == "Support")){
				var q = queryVal;
				aform.dnavs.value="";
			}
			else if(aform.client.value == blogsClient){
				var q = queryVal+'+inmeta:resource%2Dtype=blog';
				aform.dnavs.value='inmeta:resource%2Dtype=blog';
			}
			else if(aform.dnavs.value!="" ){ 
				var q = queryVal+'+inmeta:Asset_Type='+aform.dnavs.value;
				aform.dnavs.value='inmeta:Asset_Type='+aform.dnavs.value;
			}
			else {
				var q = queryVal;
			}

			var input = document.createElement('input');
			input.type = 'hidden';
			input.name = 'q';
			input.value = q;
			aform.appendChild(input);
		}
		var formData = $('#search').serialize();
		formData = formData.replace('%2B','+');
		//Gforge 22695 by b47215 start
		window.location="http:"+ss_gsa_host+"/search?"+formData+s_hdrContentFind;
		//Gforge 22695 by b47215 end

	}
	return false;
}

//Added by B49081  for CR55852
function recordPartner(path , name){

	var assetId  = path+'~~'+name;
	var linkurl  = path;
	var page_nodeId = document.getElementById("pageNodeId")?document.getElementById("pageNodeId").value : "";
	var page_typeName= document.getElementById("pageType")?document.getElementById("pageType").value : "";
	var commandId =  "PARTNER" ;
	recordPartnerHistory(page_nodeId,page_typeName,linkurl,commandId,assetId); 

}


//Added by B49081  for CR55852
function recordPartnerHistory(parentId,parentPageType,download_url,commandID ,assetId){

	//alert("Inside recordDwnldHistory method");
	var url = '/webapp/history/recordHistory.sp';
	var obj = new Object;
	obj.downloadLink=download_url;
	obj.parentID=parentId;
	obj.parentType=parentPageType;
	obj.commandID=commandID;
	obj.assetType='partner';
	obj.assetID=assetId;
	obj.referrerUrl = document.referrer;
	obj.actionAttribute = 'partner';
	obj.actionAttributeValue = '1';

	sendPostMessage(url,obj);

}
//Added by b51504 for CR-59844
function setCookie(cname, cvalue){
	document.cookie = cname + "=" + cvalue + "; path=/";
}