//Changed by B10581 for CCT49142 on 24-Aug-2007 start
// JavaScript Document
<!--//--><![CDATA[//><!--
sfHover = function() {
	//ensure that the element is on the page, if so ... run function
	var navone = document.getElementById("tpnv");
	if (navone){
		var sfEls = document.getElementById("tpnv").getElementsByTagName("LI");
		
		for (var i=0; i<sfEls.length; i++) {
			sfEls[i].onmouseover=function() {
				this.className+=" sfhover";
				hideselects('visible');
			}
			sfEls[i].onmouseout=function() {
				this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
				hideselects('visible');
			}
		}
	}
} 

sfHover1 = function() {
	//ensure that the element is on the page, if so ... run function
	var navtwo = document.getElementById("cnv");
	if (navtwo){
		var sfEls1 = document.getElementById("cnv").getElementsByTagName("LI");
		for (var i=0; i<sfEls1.length; i++) {
			sfEls1[i].onmouseover=function() {
				this.className+=" sfhover";
				hideselects('visible');
			}
			sfEls1[i].onmouseout=function() {
				this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
				hideselects('visible');
			}
		}
	}
}

sfHover2 = function() {
	//ensure that the element is on the page, if so ... run function
	var navthree = document.getElementById("lnv");
	if (navthree){
		var sfEls2 = document.getElementById("lnv").getElementsByTagName("LI");
		for (var i=0; i<sfEls2.length; i++) {
			sfEls2[i].onmouseover=function() {
				this.className+=" sfhover";
				hideselects('visible');
			}
			sfEls2[i].onmouseout=function() {
				this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
				hideselects('visible');
			}
		}
	}
}

if (window.attachEvent) {
	window.attachEvent("onload", sfHover);
	window.attachEvent("onload", sfHover1);
	window.attachEvent("onload", sfHover2);
}

//--><!]]>





//Hide selects

function hideselects(state) {
	for(i=0;i<document.forms.length;i++){ // if there are forms on the page
		frm = document.forms[i];
		var inputs = frm.getElementsByTagName("SELECT");
		for (j=0;j<inputs.length;j++){
			inputs[j].style.visibility = state;
		}
	}
}
  
//nice search box text reset
function showpopup1(prod,url){
var fromCrossCheck= false;
if(document.URL.indexOf("crosscheck/partFinder.sp?")!= -1 )
	fromCrossCheck = true;
	var applicationContext = "/webapp";
			var langCd = document.getElementById("lang_cd").value;
			if(langCd && langCd !='en'  && langCd !='EN') {
				applicationContext = applicationContext.replace("/webapp","/"+langCd+"/webapp");
			}
	var a=applicationContext+'/sps/site/driverParts.sp?original='+url+'&product='+prod+'&method=renderDrivers&fromCrossCheck='+fromCrossCheck;
	var params = [
    'height='+screen.height,
    'width='+screen.width,
	'scrollbars=yes',
	'toolbar=yes', 
	'resizable'
	 // only works in IE, but here for completeness
	].join(',');

	if (navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6){//Firefox
		window.open(a,'_blank'); 
	}else if (navigator.userAgent.indexOf('Chrome') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome') + 7).split(' ')[0]) >= 15){//Chrome
		window.open(a,'_blank'); 
	}else{
		window.open(a,'_blank',params); 
	}
} 

function showpopup(url){
	setReferrerCookies();
	var fromCrossCheck= false;
	var trackPreviousPage = "cc";
//	code added in July 2015 for adding query param: Start
	if(document.URL.indexOf("prod_summary.jsp?")!= -1 ){
		trackPreviousPage = "fpsp";
	}else if(document.URL.indexOf("/search?")!= -1){
		trackPreviousPage = "fsrch";
	}
//	code added in July 2015 for adding query param: End
	if(document.URL.indexOf("crosscheck/partFinder.sp?")!= -1 )
		fromCrossCheck = true;
	
	var applicationContext = "/webapp";
	var langCd = document.getElementById("lang_cd").value;
	if(langCd && langCd !='en'  && langCd !='EN') {
		applicationContext = applicationContext.replace("/webapp","/"+langCd+"/webapp");
	}
	var a=applicationContext+'/sps/site/driverParts.sp?original='+url+'&method=renderDrivers&fromCrossCheck='+fromCrossCheck+'&'+trackPreviousPage+'=1';
	var params = [
	              'height='+screen.height,
	              'width='+screen.width,
	              'scrollbars=yes',
	              'toolbar=yes', 
	              'resizable'
	              // only works in IE, but here for completeness
	              ].join(',');
	if (navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6){//Firefox
		window.open(a,'_blank'); 
	}else if (navigator.userAgent.indexOf('Chrome') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome') + 7).split(' ')[0]) >= 15){//Chrome
		window.open(a,'_blank'); 
	}else{
		window.open(a,'_blank',params); 
	}
	//$('#OPNsuggestedDriver').popupWindow({ 
	// height:500, 
	//  width:800, 
	//  top:50, 
	// left:50 
	// }); 
}

function resetsearch(whichbox){
var keyWrdText="Enter Keyword";
	if ( typeof getTranslatedText== 'function' ) {
	keyWrdText=getTranslatedText(keyWrdText);
	}
	if (document.getElementById(whichbox).value == ""){
		if (whichbox == "parts"){
			document.getElementById(whichbox).value = "Enter Part Number";	
		}else{
			document.getElementById(whichbox).value =keyWrdText;	
		}
	};
}

//nice login box text reset

function resetlogin(whichbox){
	
	if (document.getElementById(whichbox).value == ""){
		if (whichbox == "password"){
			document.getElementById(whichbox).value = "12345";	
		}else{
			document.getElementById(whichbox).value = "Enter Email Address";	
		}
	};
}

//nice knowledge base box text reset

function resetkb(whichbox){
	
	if (document.getElementById(whichbox).value == ""){
		if (whichbox == "knowledgebase"){
			document.getElementById(whichbox).value = "Enter knowledgebase question";	
		}else{
			document.getElementById(whichbox).value = "Enter Part Number";	
		}
	};
}






if(window.event + "" == "undefined") event = null;
function HM_f_PopUp(){return false};
function HM_f_PopDown(){return false};
showPopUp = HM_f_PopUp;
hidePopUp = HM_f_PopDown;


HM_SIDEBAR_X		 = 2
HM_SIDEBAR_Y		 = 130
TAB_HM_SIDEBAR_Y		 = 159

HM_PG_MenuWidth          = 158;
HM_PG_FontFamily         = "Arial,sans-serif";
HM_PG_FontSize           = 8;
HM_PG_FontBold           = false;
HM_PG_FontItalic         = false;
HM_PG_FontColor          = "black";
HM_PG_FontColorOver      = "white";
//HM_PG_BGColor            = "transparent";
//HM_PG_BGColorOver        = "transparent";
HM_PG_BGColor            = "#C2D6EB";
HM_PG_BGColorOver        = "#6699CC";
HM_PG_ItemPadding        = 3;

HM_PG_BorderWidth        = 0;
HM_PG_BorderColor        = "#660000";
HM_PG_BorderStyle        = "solid";
HM_PG_SeparatorSize      = 1;
HM_PG_SeparatorColor     = "yellow";
HM_PG_ImageSrc = "/shared/images/HM_off.gif";
HM_PG_ImageSrcOver = "/shared/images/HM_on.gif";

HM_PG_ImageSize          = 8;
HM_PG_ImageHorizSpace    = 4;
HM_PG_ImageVertSpace     = 4;

HM_PG_KeepHilite         = false;
HM_PG_ClickStart         = false;
HM_PG_ClickKill          = 0;
HM_PG_ChildOverlap       = -1;
HM_PG_ChildOffset        = 0;
HM_PG_ChildPerCentOver   = null;
HM_PG_TopSecondsVisible  = .2;
HM_PG_ChildSecondsVisible = .5;
HM_PG_StatusDisplayBuild = 0;
HM_PG_StatusDisplayLink  = 1;
HM_PG_UponDisplay        = null;
HM_PG_UponHide           = null;

HM_PG_RightToLeft      = false;
HM_PG_CreateTopOnly      = 1
HM_PG_ShowLinkCursor     = true;
HM_PG_NSFontOver = true;

//4.2
HM_PG_ScrollEnabled = true;
HM_PG_ScrollBarHeight = 15;
HM_PG_ScrollBarColor = "#6699CC";
HM_PG_ScrollImgSrcTop = "/shared/images/up_arrow_nav.gif";
HM_PG_ScrollImgSrcBot = "/shared/images/down_arrow_nav.gif";
HM_PG_ScrollImgWidth = 8;
HM_PG_ScrollImgHeight = 8;






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

//Changed by B10581 for CCT49142 on 24-Aug-2007 end
