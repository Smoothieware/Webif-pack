/** Modification start by b11364 on 13-09-07 For CCT47683**/ 
/** Adding code for bookmark and Email results code **/
var urlAddress = (location.href)	; 
//var pageName = getTranslatedText("Freescale :Search Results"); 
var pageName = "Freescale :Search Results"; 
//Added by B41913 for CR-50658 start
function findPos(obj) {
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft
        curtop = obj.offsetTop
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft
            curtop += obj.offsetTop
        }
    }
    return [curleft,curtop];
}
//Added by B41913 for CR-50658 end
/* Commented by b41913
function change_currency(anchor)
{
	var selected_curr=anchor.getAttribute('id');
	var loc;
	var hash_append=(window.location.href).substring((window.location.href).lastIndexOf("#"));
	/* commented by b42233
	if((window.location.href).indexOf("chg_curr")==-1) {
		loc=(window.location.href).slice(0,(window.location.href).lastIndexOf("#"));
	}
	else{
		loc=(window.location.href).slice(0,(window.location.href).lastIndexOf("&"));
	}
	//ciommented by b42233 end
	//loc=loc+"&chg_curr="+selected_curr+hash_append;
	loc=document.getElementById('RETURL').value+"&chg_curr="+selected_curr+hash_append;
	//alert(loc);
	window.location.href=loc;
	document.getElementById(anchor.getAttribute('id')).href=loc;
}
Commented by b41913 End
*/
//Added by B41913 for CR-50658 Start
function change_currency(anchor,lang)
{
    var selected_curr=anchor.getAttribute('id');
                var loc;
                var hash_append="";
    var last_page=window.location.href.toString();
   
                var tm_stmp=(new Date()).getTime();
                if((window.location.href).indexOf("search.partparamdetail.framework")!=-1)
                hash_append="#Ordering_Information";
    
               
                if(document.getElementById('RETURL')!=null && document.getElementById('RETURL').value!=""){ 

     if((last_page.indexOf("MainSERP.jsp"))!=("-1"))
      {
         
          //Added by B41913 for CR-50658 on 13th May 2013 start
          if(lang=='en' || lang=='') {
              loc=document.getElementById('RETURL').value+'lang_cd=en';
          }
          else {
              loc='/'+lang+document.getElementById('RETURL').value+'lang_cd='+lang;
          }
          //Added by B41913 for CR-50658 on 13th May 2013 end
          if((loc).indexOf("#")!=-1)
              hash_append=(loc).substring((loc).lastIndexOf("#"));
      }
      else{
      
        if((window.location.href).indexOf("#")!=-1)
              hash_append=(window.location.href).substring((window.location.href).lastIndexOf("#"));
          if((window.location.href).indexOf("chg_curr")==-1) {
              if((window.location.href).indexOf("#")!=-1)
                  loc=(window.location.href).slice(0,(window.location.href).lastIndexOf("#"));
              else
                  loc=window.location.href;           
              }
          else {
				//Added by b41913 for CR-59678 on 24th March 2015:start
				if((window.location.href).indexOf("parametricSelector.sp?chg_curr")!=-1) {
					loc=(window.location.href).slice(0,(window.location.href).lastIndexOf("?chg_curr"));
				}
				else {
					loc=(window.location.href).slice(0,(window.location.href).lastIndexOf("&chg_curr"));
				}
				//Added by b41913 for CR-59678 on 24th March 2015:end
              }
			  
			  
        }
     }
    else{
    
       
           if((window.location.href).indexOf("#")!=-1)
              hash_append=(window.location.href).substring((window.location.href).lastIndexOf("#"));
          if((window.location.href).indexOf("chg_curr")==-1) {
              if((window.location.href).indexOf("#")!=-1)
                  loc=(window.location.href).slice(0,(window.location.href).lastIndexOf("#"));
              else
                  loc=window.location.href;           
              }
          else {
				//Added by b41913 for CR-59678 on 24th March 2015:start
				if((window.location.href).indexOf("parametricSelector.sp?chg_curr")!=-1) {
					loc=(window.location.href).slice(0,(window.location.href).lastIndexOf("?chg_curr"));
				}
				else {
					loc=(window.location.href).slice(0,(window.location.href).lastIndexOf("&chg_curr"));
				}
				//Added by b41913 for CR-59678 on 24th March 2015:end
              }
    }
	
	//Added by b41913 on 24th March 2015 for CR59678-start
	if((window.location.href).indexOf("parametricSelector.sp")!=-1) {
		loc=loc+"?chg_curr="+selected_curr+"&time_stamp="+tm_stmp+hash_append;
	}
	else {
    loc=loc+"&chg_curr="+selected_curr+"&time_stamp="+tm_stmp+hash_append;
    }
	myloc=removeURLParameter(loc,"rf");
	document.getElementById(anchor.getAttribute('id')).href=myloc;
	//Added by b41913 on 24th March 2015 for CR59678-end
	//document.getElementById(anchor.getAttribute('id')).href=loc;
}
//Added by B41913 for CR-50658 End

function removeURLParameter(myloc, parameter) {
    //prefer to use l.search if you have a location/link object
    var urlparts= myloc.split('?');   
    if (urlparts.length>=2) {

        var prefix= encodeURIComponent(parameter)+'=';
        var pars= urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i= pars.length; i-- > 0;) {    
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                pars.splice(i, 1);
            }
        }

        myloc= urlparts[0]+'?'+pars.join('&');
        return myloc;
    } else {
        return myloc;
    }
}
function mailToFreindSerp(strQueryText)   
{	
	var urlString =removeURLParam("QueryText"); 
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
	urlString = urlString.replace(/\r/g,"%20"); // START
	var encoded = "";
	for (var i = 0; i < urlString.length; i++ ) {
		var ch = urlString.charAt(i);
		 if (ch == " ") {
		    encoded += "%20";
		 }
		 else{
	    		    encoded += ch;
		    }
	
	}
	urlString=encoded;	
	/*var	urlString = removeURLParam("QueryText");
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
	}*/
	if(strQueryText != null && strQueryText != "") {
	location="mailto:?SUBJECT="+getTranslatedText(pageName)+" "+getTranslatedText("for")+"  "+strQueryText+"&BODY="+escape(urlString);
	}else{
	location="mailto:?SUBJECT="+getTranslatedText(pageName)+"&BODY="+escape(urlString);
	}


}
function addToFavoritesSerp(strQueryText) { 
	var urlString =removeURLParam("QueryText")	;
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
	var encoded = "";
	for (var i = 0; i < urlString.length; i++ ) {
		var ch = urlString.charAt(i);
		 if (ch == " ") {
		    encoded += "%20";
		 }
		 else{
	    		    encoded += ch;
		    }
	
	}
	urlString=encoded;
	/*
	var	urlString = removeURLParam("QueryText");	
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
	}*/
		if(strQueryText != null && strQueryText != "") {
		newpageName=pageName+" for "+strQueryText;
		}else{
			newpageName=pageName;
		}
		 if (window.sidebar) { // firefox
              window.sidebar.addPanel(newpageName , urlString ,"");
        } else if( document.all ) { //MSIE
                window.external.AddFavorite(urlString , newpageName );
        } else {
               alert("Sorry, your browser can not add this bookmarks");
        }
} 


//added by 30254 - CR31637 start
function RecordActivityforTool(attrNames,attrValues)
{
	
	var url = '/webapp/history/recordActivity.sp';
	var obj = new Object;
	
		obj.commandID = 'RECORD_WEB_ACTIVITY';
		obj.assetID = 'partsearch';
		obj.assetType = 'search';
		//obj.assetID = assetID;
		//obj.assetType = assetType;
		
	if(attrNames!="null" && attrNames!=null && attrValues!="null" && attrValues!=null){
		//attrNames = attrNames+"@@";
		//attrValues = attrValues+"@@";
		
		obj.attrNames = attrNames;
		obj.attrValues = attrValues;
		
		recordParametricToolsUsage(url,obj);  
	}
	
}


function recordParametricToolsUsage(url,obj){
		
		
		jQuery.post(url, obj, function(data){
	});		
}
//added by 30254 - CR31637 end 


function mailToFreind(strQueryText,urlAddress)
{
//	alert("mail2New"+strQueryText+"   "+urlAddress);
	
	if(strQueryText != null && strQueryText != "") {
	location="mailto:?SUBJECT="+pageName+" for "+strQueryText+"&BODY="+escape(urlAddress);
	}else{
	location="mailto:?SUBJECT="+pageName+"&BODY="+escape(urlAddress);
	}


}
function addToFavorites(str,urlAddress) { 
//urlAddress=	(location.href)	; 
//		alert("Newaddtofav2"+str+"   "+(urlAddress));
		if(str != null && str != "") {
		newpageName=pageName+" for "+str;
		}else{
			newpageName=pageName;
		}

		 if (window.sidebar) { // firefox
				//alert("FF");
              window.sidebar.addPanel(newpageName , (urlAddress) ,"left");
        } else if( document.all ) { //MSIE
						//alert("IE");
                window.external.AddFavorite(urlAddress, newpageName );
        } else {
               alert("Sorry, your browser can not add this bookmarks");
        }
}
/** Modification End by b11364 on  13-09-07 */
function RowOn(id){
	row = document.getElementById(id);
	var color = row.style.background.split(" ");
		if(!(color[0]=="blue")){
			/** Modification start by b11364 on 23-08-07 For CCT47683**/ 
			row.style.background="#CCCCCC"; 
			/** Modification End by b11364 on  23-08-07 */
		}
	}
function RowOff(id){
	row = document.getElementById(id);
	var color = row.style.background.split(" ");
	if(!(color[0]=="blue")){
	   if(row.getAttribute("colorId")== "even")
		{
		   /** Modification start by b11364 on 27-09-07 For CCT47683**/ 
			row.style.background="#FFFFFF";
		   /** Modification End by b11364 on  27-09-07 */
		}
		else
		{
			/** Modification start by b11364 on 27-09-07 For CCT47683**/ 
			row.style.background="#ECF0F1";/*Changed from f5f5f5 to #FFFFFF for CR40452 by b37085*/
			/** Modification End by b11364 on  27-09-07 */			
		}
	}
}

function RowOffStandard(id,rowNum){
	row = document.getElementById(id);
	var color = row.style.background.split(" ");
	if(!(color[0]=="blue")){
	   if(rowNum%2 == 0 )
		{
			 /** Modification start by b11364 on 27-09-07 For CCT47683**/ 
			row.style.background="#FFFFFF";
		   /** Modification End by b11364 on  27-09-07 */
		}
		else
		{
			/** Modification start by b11364 on 27-09-07 For CCT47683**/ 
			row.style.background="#f5f5f5";
			/** Modification End by b11364 on  27-09-07 */			
		}
	}
}

/** Modification start by b11364 on 23-08-07 For CCT47683**/ 
function RowOnText(id){
	row = document.getElementById(id);
	var color = row.style.background.split(" ");
		if(!(color[0]=="blue")){
			row.style.background="#ececec";  // edited by Expero, 08/2007
		}
	}
function RowOffStandardText(id){
	row = document.getElementById(id);
	var color = row.style.background.split(" ");
	if(!(color[0]=="blue")){
	   if(row.getAttribute("colorId")== "even")
		{
			row.style.background="#FFFFFF";
		}
		else
		{
			row.style.background="#FFFFFF";
		}
	}
}
 /** Modification End by b11364 on  23-08-07 */

function download(){
   //Changed by rkg01z on 24 Jan 2007 for CCT44315 start
   //window.alert('before closeDldPop');
   closeDldPop();
   //window.open(url);
   //Changed by rkg01z on 24 Jan 2007 for CCT44315 end
   }


/**Modification end by rgp01z for Download on 29 Aug 2007 CCT47683 **/ 
/** Modification : Method was added to Popup Window for Downloads  **/

//Added new parameters by b17240 for CCT56846 on 4th June,2008 :Start
//Added the trackExitLnkForAnalytics for CR54489
//Modified to NXP.com by b41911 for DFCT0011646 on 1 feb 2016 
function openThirdParty(url, code, linkText, wt_type, wt_vendor, wt_file_format, wt_asset ,name, event){
	ThirdPartyMetrics(url, code, linkText, wt_type, wt_vendor, wt_file_format, wt_asset);
	if(confirm("You are about to launch a new browser window that will display a website that is not affiliated with NXP.com.")){
	
		recordPartner(url,name);
		if(typeof trackExitLnkForAnalytics == 'function') { 
			trackExitLnkForAnalytics(url, event);
		}
			window.open(url,'','');
	}
}
//Added new parameters by b17240 for CCT56846 on 4th June,2008 :End

//Added a new parameter 'link' for CCT56687 start 21st July 2008
//modified to open the window near mouse popup: Feb 2011
function openDownload(window_title,code,link,e){
	var url = '/webapp/search/components/DownloadPopup.jsp?code='+code+'&link='+link;
	//var ftr=$('#ftr').offset().top;
	var scrolledX, scrolledY;
	topVal=e.pageY;
	//same concept with the vertical position
	ajaxbox1=document.getElementById("ajaxbox1");

	var curX=(ns6)?e.pageX : event.clientX+ietruebody().scrollLeft;
	var curY=(ns6)?e.pageY : event.clientY+ietruebody().scrollTop;
	//Find out how close the mouse is to the corner of the window
	var rightedge=ie&&!window.opera? ietruebody().clientWidth-event.clientX-offsetxpoint : window.innerWidth-e.clientX-offsetxpoint-225
	var bottomedge=ie&&!window.opera? ietruebody().clientHeight-event.clientY-offsetypoint : window.innerHeight-e.clientY-offsetypoint
	var leftedge=(offsetxpoint<0)? offsetxpoint*(-1) : -1000

	//same concept with the vertical position
	if(bottomedge > 225 ){			
		scrolledY = e.clientY +"px"
	}else{
		scrolledY = e.clientY - 225 +"px"
	}
	scrolledX=curX+"px";
	var argList = "'width=350px,height=225px,left="+scrolledX+"px,top="+scrolledY+"px,resize=0,scrolling=1'";
	ajaxwin=dhtmlwindow.open('ajaxbox1',url,window_title,argList );
	return false;
}
//Added a new parameter 'link' for CCT56687 end 21st July 2008

/**Modification start by b13004 for Title CR on 2 Nov 2007 CCT47683 **/
function openInfoWindow(code,title){ 
		var url = '/webapp/collateralDescription.jsp?code=' + code;
		ajaxwin=dhtmlwindow.open('ajaxbox1',url,title, 'width=350px,height=250px,left=200px,top=180px,resize=0,scrolling=1');
		return false;
}

function openHeaderInfoWindow( code, title ){ 
		var url = '/webapp/shared/components/inc_collateral.jsp?code=' + code;
		ajaxwin=dhtmlwindow.open('ajaxbox1',url,title, 'width=250px,height=150px,left=700px,top=300px,resize=0,scrolling=1');
		return false;
}

/**Modification end by b13004 for Title CR on 2 Nov 2007 CCT47683 **/
//Addition by b12877, PPI, Jan 30, 2008 starts
	function openInfoPopup(code){
	var url = '/webapp/moreinfopopup.jsp?code=' + code;
	var title = 'More Information';
	ajaxwin=dhtmlwindow.open('ajaxbox1',url,title, 'width=350px,height=225px,left=200px,top=180px,resize=0,scrolling=1');
	return false;
	}
	//Addition by b12877, PPI, Jan 30, 2008 ends

	//Addition by b21340, CCT60523, Aug 19, 2008 starts
	//Overloaded method by B35740 for CR48031 30/5/2013 Start
	function openArchivedInfoPopup()
	{
		return openArchivedInfoPopup("default");
	}
	//Overloaded method by B35740 for CR48031 30/5/2013 End
	function openArchivedInfoPopup(assetType){
	if(assetType == "default")
	{
		var url = '/webapp/sps/components/ArchivedInfo.jsp?assetType=default';
		var title = 'More Information';
		ajaxwin=dhtmlwindow.open('ajaxbox1',url,title, 'width=250px,height=100px,left=200px,top=180px,resize=0,scrolling=1');
		return false;
	}
	else if(assetType == "PSP")
	{
		var url = '/webapp/sps/components/ArchivedInfo.jsp?assetType=PSP';
		var title = 'Product Archival Information';
		ajaxwin=dhtmlwindow.open('ajaxbox1',url,title, 'width=250px,height=100px,left=200px,top=180px,resize=1,scrolling=1');
		return false;
	}
	else if(assetType == "TSP")
	{
		var url = '/webapp/sps/components/ArchivedInfo.jsp?assetType=TSP';
		var title = 'Tool Archival Information';
		ajaxwin=dhtmlwindow.open('ajaxbox1',url,title, 'width=250px,height=100px,left=200px,top=180px,resize=1,scrolling=1');
		return false;
	}
	else if(assetType == "RDSP")
	{
		var url = '/webapp/sps/components/ArchivedInfo.jsp?assetType=RDSP';
		var title = 'Reference Design Archival Information';
		ajaxwin=dhtmlwindow.open('ajaxbox1',url,title, 'width=250px,height=100px,left=200px,top=180px,resize=1,scrolling=1');
		return false;
	}
	else if(assetType == "COLL")
	{
		var url = '/webapp/sps/components/ArchivedInfo.jsp?assetType=COLL';
		var title = 'Document Archival Information';
		ajaxwin=dhtmlwindow.open('ajaxbox1',url,title, 'width=250px,height=100px,left=200px,top=180px,resize=1,scrolling=1');
		return false;
	}
	
	}
	//Addition by b21340, CCT60523, Aug 19, 2008 ends

function showSecurityInfo(moderator,disclaimer,logonrequired){ 
		
		var strToolTip = "";
		
		if ( logonrequired != null && logonrequired == "Y"  ) {
			strToolTip = "Logon Required for Download<br>";
		}

		if ( disclaimer != null && disclaimer != "" && disclaimer != "None" ){
			strToolTip += "License Agreement Required for Download<br>";
		}

		if ( moderator != null && moderator != "" && moderator != "None") {
			strToolTip += "Moderator Approval Required for Download<br>";
		}
//		alert( moderator + " " + disclaimer  + " " + logonrequired);
		showAssetDesc( strToolTip ,event);

		return false;
}
/**Modification end by rgp01z for Download on 29 Aug 2007 CCT47683 **/ 







function showHide(ids,imgid){
	//alert("inside show hide");
	if(ids !=undefined && imgid != undefined){
		//alert("ids string" + ids);
		//alert("img id" + imgid);
		var imageElement = document.getElementById(imgid);
		if(imageElement != undefined){
			var imageName = imageElement.src.substring(imageElement.src.lastIndexOf('/')+1);
			if(imageName != undefined){
				//alert("image Name is " + imageName);
				var idArr = ids.split("`!");
				if(idArr != undefined){
				  if(imageName=="xTree_plus.gif"){
					imageElement.src="/search/images/xTree_minus.gif";
					for (var i=0; i < idArr.length; i++){
						if(idArr[i] != undefined){
						  //alert(idArr[i]);
						  document.getElementById(idArr[i]).style.display="";
						}
					}
				
				  }
				  else if(imageName=="xTree_minus.gif"){
					imageElement.src="/search/images/xTree_plus.gif";
					for (var i=0; i < idArr.length; i++){
						if(idArr[i] != undefined){
						  //alert(idArr[i]);
						  document.getElementById(idArr[i]).style.display="none";
						}
					}
				
				  }
			    }
			}
			
		}
	    
		
	}

}

function doBlink() {
  // Blink, Blink, Blink...
  var blink = document.all.tags("BLINK")
  for (var i=0; i < blink.length; i++)
    blink[i].style.visibility = blink[i].style.visibility == "" ? "hidden" : "" 
}

function startBlink() {
  // Make sure it is IE4
  if (document.all)
    setInterval("doBlink()",600)
}

// Added by rgp01z for CCT40898 start 5th Jan 2006
function dapThirdPartyPart(dapId) {
        var encodeDapId = URLEncode(dapId);
        window.location='/webapp/dap.detail.framework?NEXT_SCREEN=DETAIL&DapId='+encodeDapId+'&CUSTOMER='+encodeDapId+'&Service=Tool+%26+Hardware%2FSoftware+Vendor&fromDevToolProdNodeId=';
}
function URLEncode( plaintext ) {
	var SAFE = "0123456789" +
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		"abcdefghijklmnopqrstuvwxyz" +
		"-_.!~*'()";	// RFC2396  reference
	var HEX = "0123456789ABCDEF";

	var encoded = "";
	for (var i = 0; i < plaintext.length; i++ ) {
		var ch = plaintext.charAt(i);
		if (SAFE.indexOf(ch) != -1) {
		    encoded += ch;
	        } else if (ch == " ") {
		    encoded += "+";
		} else {
		    var charCode = ch.charCodeAt(0);
			if (charCode > 255) {
				//bad char, put space holder
				encoded += "+";
			} else {
				encoded += "%";
				encoded += HEX.charAt((charCode >> 4) & 0xF);
				encoded += HEX.charAt(charCode & 0xF);
			}
		}
	}
	return encoded;
}
// Added by rgp01z for CCT40898 end 5th Jan 2006

window.onload = startBlink;

/** Modification start by rz107c on 22-08-07 For CCT47683**/  

var lastSearchString="";
var searchTimer = "";
var curInput = "";
var cur = -1;
var i=0;
var requestor=new Object();
var globalHit = false;
var baseUrl = "";
var textElement = "";
var autofilledview = "";
var formName="";
var suggestionType= "suggestKeyword";

/* added for hiding selects in i.e.*/
function enableSelectsclick(e) {
   hideselects('visible');
   return true;
 }

function hideselects(state) {

	for(i=0;i<document.forms.length;i++){ // if there are forms on the page
		frm = document.forms[i];
		var inputs = frm.getElementsByTagName("SELECT");
		for (j=0;j<inputs.length;j++){
			inputs[j].style.visibility = state;
		}
	}
}

document.onmousedown=enableSelectsclick;


function initSuggestKeyword(suggestTextElement,suggestAutofilledview){		
	textElement = suggestTextElement;
	autofilledview = suggestAutofilledview;
	
	if(arguments.length>2){
		formName = arguments[2];
	}
	if(arguments.length>3){
		suggestionType = arguments[3];
	}

	//baseUrl = url;
	requestor.busy = false;
	requestor.resultsList = document.getElementById(autofilledview);
	requestor.searchBox = document.getElementById(textElement);
	
	if (document.getElementById(textElement).addEventListener)
	{
		 document.getElementById(textElement).addEventListener("keydown",handleKeyDown,false);
	}
	else if (document.attachEvent)
	{
	   document.getElementById(textElement).attachEvent("onkeydown", handleKeyDown);
	}
	else
	{
	   document.getElementById(textElement).onkeydown= handleKeyDown;
	}

	//assign onblur event handler (hides suggestions)    
	document.getElementById(textElement).onblur = function () {
		hideSuggestions();
	};
}

function handleKeyDown(oEvent) {
	
	if (!oEvent) oEvent= event;

	switch(oEvent.keyCode) {
		case 38: //up arrow
			previousSuggestion();
			break;
		case 40: //down arrow 
			nextSuggestion();
			globalHit = false;
			break;
		case 37: //left arrow
			break;
		case 39: //right arrow
			break;
		case 13: //enter
			hideSuggestions();
			//validate();
			break;
		default:
			fireSearch(document.getElementById(textElement));
			break;
	}

};

function validate(){
	if(document.getElementById(textElement).value == ''){
		alert('Please enter search criteria');
		return false;
	}
}


/**
 * Highlights the next suggestion in the dropdown and
 * places the suggestion into the textbox.
 * @scope private
 */
function nextSuggestion() {
	globalHit = false;
	requestor.busy = "on";

	var cSuggestionNodes = requestor.resultsList.childNodes;
	if (cSuggestionNodes.length > 0 && cur<(cSuggestionNodes.length-1)) {
		var oNode = cSuggestionNodes[++cur];
		document.getElementById(textElement).value = oNode.firstChild.firstChild.nodeValue; 
		this.highlightSuggestion(oNode);	
	}else{
		document.getElementById(textElement).value = origSearchString;
		var oNode = cSuggestionNodes[++cur];
		this.highlightSuggestion(oNode);
		cur=-1;
	}
};

/**
 * Highlights the previous suggestion in the dropdown and
 * places the suggestion into the textbox.
 * @scope private
 */
function previousSuggestion() {
	var cSuggestionNodes = requestor.resultsList.childNodes;
	globalHit = false;
	requestor.busy = "on";
	if (cSuggestionNodes.length > 0 && cur > 0) {
		var oNode = cSuggestionNodes[--cur];
		document.getElementById(textElement).value = oNode.firstChild.firstChild.nodeValue; 
		this.highlightSuggestion(oNode);	
	}
};

/**
 * Hides the suggestion dropdown.
 * @scope private
 */
function hideSuggestions() {
	cur=-1;
	requestor.resultsList.innerHTML="";
	requestor.resultsList.style.display = "none";
	hideselects('visible');
};

/**
 * Highlights the given node in the suggestions dropdown.
 * @scope private
 * @param oSuggestionNode The node representing a suggestion in the dropdown.
 */
function highlightSuggestion(oSuggestionNode) {
	for (var i=0; i < requestor.resultsList.childNodes.length; i++) {
		var oNode = requestor.resultsList.childNodes[i];
		oNode.style.height = document.getElementById(textElement).offsetHeight+"px";
		//oNode.style.width = (oNode.offsetWidth-4)+"px";
		if (oNode == oSuggestionNode) {
			oNode.className = "current"
		} else {
			oNode.className = "line";
		}
	}
};


function setNewHandler(parentContainer) {
	var http_request;				
	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
	http_request = new XMLHttpRequest();
	http_request.overrideMimeType('text/plain');
	
	} else if (window.ActiveXObject) { // IE
try {
	http_request = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
	try {
		http_request = new ActiveXObject("Microsoft.XMLHTTP");
	} catch (e) {}
}
	}
	setHandler(parentContainer, http_request);
}

function setHandler(parentContainer, handler) {
	parentContainer.handler=handler;
	parentContainer.busy = "off";
//	if(globalHit)
	handler.onreadystatechange = function() {handleStateChange();}
}

// Removes leading whitespaces
function LTrim( value ) {
	
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
	
}

// Removes ending whitespaces
function RTrim( value ) {
	
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
	
}

// Removes leading and ending whitespaces
function trim( value ) {
	return LTrim(RTrim(value));
}

function handleStateChange() {
	if (requestor.handler.readyState == 4) {
		var message="";
		requestor.busy = "off";
		if (requestor.handler.status == 200) {
			message = requestor.handler.responseText;
			
			var optArray = message.split("|");
			var realCount = 0;
			
			requestor.resultsList.innerHTML="";
			requestor.resultsList.style.display="none";

			for(opts=0;opts<optArray.length;opts++) {
				var optVal=trim(optArray[opts]);
				if(optVal.length>1) {
					var fieldValues = optVal.split(":z:");
					realCount++;
					var newdiv = document.createElement('div');					
					newdiv.id="suggestion";
					newdiv.innerHTML = '<span id="suggestionValue" class="keywords">'+fieldValues[0]+'</span>';
					newdiv.className = "line";
					requestor.resultsList.appendChild(newdiv);
					requestor.resultsList.style.display="block";
				}
				hideselects('hidden');
			}

			if(realCount>0){
				requestor.resultsList.onmousedown = 
				requestor.resultsList.onmouseup = 
				requestor.resultsList.onmouseover = function (oEvent) {
					oEvent = oEvent || window.event;
					oTarget = oEvent.target || oEvent.srcElement;
					//alert('oEvent.type'+oEvent.type);

					if (oEvent.type == "mousedown") {
						nodeValue=oTarget.parentNode.firstChild.firstChild.nodeValue;
						if(nodeValue==null || nodeValue=='') nodeValue=oTarget.firstChild.firstChild.nodeValue;
						document.getElementById(textElement).value = nodeValue;	
						hideSuggestions();
						//validateSearchForm('2',document.forms[1].action);
						if( "" != formName){
							var formElem =null;
							for(i=0;i<document.forms.length;i++){										
								tempName = document.forms[i].name;
								if (formName == tempName){
									formElem = document.forms[i];
								}
							}
							/*
							if(formElem!=null)
								formElem.submit();
								*/
							//submitSearchByProduct();						
						}else{
							document.forms[1].submit();						
						}
						
					} else if (oEvent.type == "mouseover") {
						if(oTarget.id=='suggestion' || oTarget.id=='suggestionValue'){ 							
							nodeValue=oTarget.parentNode.firstChild.firstChild.nodeValue;
							if(nodeValue==null || nodeValue=='') 
								nodeValue=oTarget.firstChild.firstChild.nodeValue;
							//document.getElementById(textElement).value = nodeValue;							
							if(oTarget.id=='suggestionValue'){
								highlightSuggestion(oTarget.parentNode);
							}else
								highlightSuggestion(oTarget);
						}
						else highlightSuggestion(oTarget);
					} else {
						document.getElementById(textElement).focus();
					}
				}
			}
			else{ 
				clearResultsList();
				
				//document.getElementById(textElement).value=origSearchString;
			}
		} else {
				message = "<B>Error Occured!</B>:<BR>Received Response Code:" + requestor.handler.status;
		}

	}
}		

function selectValue(val){
	document.frmMember.searchBox.value=val;
}


function showResultsList(){
	requestor.resultsList.style.display="block";
}

function clearResultsList(){
	cur=-1;
	requestor.resultsList.innerHTML="";
	requestor.resultsList.style.display="none";
	hideselects('visible');
}

function getSearchResults(searchString) {
	origSearchString = searchString;
	var url = "/webapp/search/components/suggestKeyword.jsp?s=" + searchString+"&suggestionType="+suggestionType;
	if(requestor.busy=="on") return false;
	requestor.busy = "on";
	setNewHandler(requestor);				
	requestor.handler.open('GET', url, true);
	requestor.handler.send(null);
	return true;
}

function searchLoop() {
	var searchString = curInput.value;
	if(searchString.length > 2){
		if(searchString != lastSearchString){
			var boolVal = getSearchResults(searchString);		
			if(boolVal) {
				lastSearchString = searchString;
			} 
		}else{
			clearResultsList();
		}
	}
	else{
		lastSearchString="";
		clearResultsList();
	}
}

function fireSearch(textbox) {
	requestor.busy = "off";
	curInput=textbox;
	if(searchTimer) clearTimeout(searchTimer);
	searchTimer = window.setTimeout('searchLoop()', 50);
	return true;
}

tipobj="";
var offsetxpoint=0 //Customize x offset of tooltip
var offsetypoint=20 //Customize y offset of tooltip
var self=this
var ie=document.all
var ns6=document.getElementById && !document.all
var enabletip=false



positiontip=function(e){
    tipobj=document.getElementById("dhtmltooltip");
	if (enabletip){
		var curX=(ns6)?e.pageX : event.clientX+ietruebody().scrollLeft;
		var curY=(ns6)?e.pageY : event.clientY+ietruebody().scrollTop;
		//Find out how close the mouse is to the corner of the window
		var rightedge=ie&&!window.opera? ietruebody().clientWidth-event.clientX-offsetxpoint : window.innerWidth-e.clientX-offsetxpoint-20
		var bottomedge=ie&&!window.opera? ietruebody().clientHeight-event.clientY-offsetypoint : window.innerHeight-e.clientY-offsetypoint-20

		var leftedge=(offsetxpoint<0)? offsetxpoint*(-1) : -1000

		//if the horizontal distance isn't enough to accomodate the width of the context menu
		if (rightedge<tipobj.offsetWidth)
		//move the horizontal position of the menu to the left by it's width
		tipobj.style.left=ie? ietruebody().scrollLeft+event.clientX-tipobj.offsetWidth+"px" : window.pageXOffset+e.clientX-tipobj.offsetWidth+"px"
		else if (curX<leftedge)
		tipobj.style.left="5px"
		else
		//position the horizontal position of the menu where the mouse is positioned
		tipobj.style.left=curX+offsetxpoint+"px"

		//same concept with the vertical position
		if (bottomedge<tipobj.offsetHeight)
		tipobj.style.top=ie? ietruebody().scrollTop+event.clientY-tipobj.offsetHeight-offsetypoint+"px" : window.pageYOffset+e.clientY-tipobj.offsetHeight-offsetypoint+"px"
		else
		tipobj.style.top=curY+offsetypoint+"px"
		tipobj.style.visibility="visible"
	}
}

hideddrivetip = function(){
	if (ns6||ie){
		enabletip=false
		tipobj.style.visibility="hidden"
		tipobj.style.left="-1000px"
		tipobj.style.backgroundColor=''
		tipobj.style.width=''
	}
}

ddrivetip = function ddrivetip(thetext, thecolor, thewidth){
	if (ns6||ie){
		if (typeof thewidth!="undefined") tipobj.style.width=thewidth+"px"
		if (typeof thecolor!="undefined" && thecolor!="") tipobj.style.backgroundColor=thecolor
		tipobj.innerHTML=thetext
		enabletip=true
		return false
	}
}

ietruebody = function(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}
function showAssetDesc(dispName,evt){
	positiontip(evt);
	document.onmousemove=positiontip;
	ddrivetip(dispName);
	hideselects('hidden');
}

function hideAssetDesc(dispName,evt){
	positiontip(evt);
	document.onmousemove=positiontip;
	hideddrivetip();
	hideselects('visible');
}


/** Modification end by rz107c on 22-08-07 For CCT47683**/ 
/** Method Added By b28380 on 26th April 2011 For CCT80735**/ 
$(document).ready(function() {
	//add by b26869 for geforge issue fix start
	var rowCount ="";
	var assetType="";
   if(document.getElementById("totalResults")!=null){  
	   rowCount = document.getElementById("totalResults").value;
   }
   if(document.getElementById("assetSelected")!=null){
	   assetType = document.getElementById("assetSelected").value;
   }
 //add by b26869 for geforge issue fix end
        if(assetType=='Documentation'){
		for(var k=0;k<rowCount;k++){
			register_OPClick(k);
		}
	}
});

function register_OPClick(k){
	if(document.getElementById('idOP_moreless'+k)){
		$("#idOP_moreless"+k).live('click',function(){
			$("#appOrdPart"+k).slideToggle("slow");
			if($("#idOP_moreless"+k).text().indexOf('More...')>=0){
				$("#idOP_moreless"+k).text('Hide...');
			}else if($("#idOP_moreless"+k).text().indexOf('Hide...')>=0){
				$("#idOP_moreless"+k).text('More...');
			}
		});
	}
}

//added by b41988
function summaryInfo(event, id)
{
var url = '../../eventSummaryInfo.jsp?id=' + id;
var x = event.clientX + document.body.scrollLeft;	
var y = event.clientY + document.body.scrollTop;	
x=x+40;
if(y>50){
y=y-45;}
var argList = "'width=450px,height=30px,left="+x+",px,top="+y+"px,resize=0,scrolling=1'";
ajaxwin=dhtmlwindow.open('ajaxbox1',url,'Summary Information',argList);
return false;
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
			   
					ajaxwin=dhtmlwindow.open('Inventory1',url,window_title, 'width=170px,height=130px,left='+left+'px,top='+top+'px,z-index=99999,position=absolute,resize=1,scrolling=1,style="color : #FFFFFF ;float: left; width: 250px; margin-left: 10px;','Inventory');
				}
	    
		}

/** Method Added By b28380 on 26th April 2011 For CCT80735**/ 

/** Method Added By b49081 For CR55852**/ 

function recordPartner(path , name){
		
		var assetId  = path+'~~'+name;
		var linkurl  = path;
		var page_nodeId = document.getElementById("pageNodeId")?document.getElementById("pageNodeId").value : "";
		var page_typeName= document.getElementById("pageType")?document.getElementById("pageType").value : "";
		var commandId =  "PARTNER" ;
		recordPartnerHistory(page_nodeId,page_typeName,linkurl,commandId,assetId); 
	
 }
 /** Method Added By b49081 For CR55852**/ 
 /** Method Added By b49081 For CR55852**/ 
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
/** Method Added By b49081 For CR55852**/ 