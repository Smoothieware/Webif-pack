var DL_bNS4=(document.layers);
var DL_bNS6 = (navigator.vendor == ("Netscape6") || navigator.product == ("Gecko"));
var DL_bDOM=(document.getElementById);
var DL_bIE=(document.all);
var DL_bIE4=(DL_bIE && !DL_bDOM);
var DL_bMac = (navigator.appVersion.indexOf("Mac") != -1);
var DL_bIEMac=(DL_bIE && DL_bMac);
var DL_bIE4Mac=(DL_bIE4 && DL_bMac);
var DL_bNS =(DL_bNS4 || DL_bNS6);

var DL_nCurrentX = 0;
var DL_nCurrentY = 0;
var isHomePage=false;

function DL_fGetRealLeft(oElement)
{
    var nXPos = oElement.offsetLeft;
    var oParentEl = (DL_bIE4Mac) ? oElement.parentElement : oElement.offsetParent;	

    while (oParentEl != null){
		if(DL_bIE4Mac){
			if(oParentEl.tagName=="SPAN"){
				oParentEl = oParentEl.parentElement;
			}
			if(oParentEl.tagName=="HTML"){
				break;
			}
		}
        nXPos += oParentEl.offsetLeft;
		oParentEl = (DL_bIE4Mac) ? oParentEl.parentElement : oParentEl.offsetParent;
    }
    return nXPos;
}


function DL_fGetRealTop(oElement)
{
    var nYPos = oElement.offsetTop;
    var oParentEl = (DL_bIE4Mac) ? oElement.parentElement : oElement.offsetParent;	
	while (oParentEl != null){
		if(DL_bIE4Mac){
			if(oParentEl.tagName=="SPAN"){
				oParentEl = oParentEl.parentElement;
			}
			if(oParentEl.tagName=="HTML"){
				break;
			}
		}	
	    nYPos += oParentEl.offsetTop;
		oParentEl = (DL_bIE4Mac) ? oParentEl.parentElement : oParentEl.offsetParent;
    }
    return nYPos;
}

//allNotes
allDivs =document.getElementsByTagName('div');
numOfDivs = allDivs.length;
var allNotes= new Array(); 
numOfNotes = 0;
// get all notes DIVS
for (var i = 0; i < numOfDivs; i++) {
	if (allDivs[i].className=="notesLayer") {
		allNotes[numOfNotes] = allDivs[i];
		numOfNotes=numOfNotes+1;
	}
}

//initialize all notes layers
for (var j = 0; j < allNotes.length; j++) {
	currentNote = allNotes[j];
	var DL_oLayer=currentNote;
	if(DL_bNS4)	{
		var DL_bOrigWidth=innerWidth;
		var DL_bOrigHeight=innerHeight;
		window.onresize=function(){
			if(innerWidth!=DL_bOrigWidth||innerHeight!=DL_bOrigHeight)location.reload();
		}
		DL_oLayer.captureEvents(Event.MOUSEDOWN);
		DL_oLayer.onmousedown=DL_fGrabEl;
		//DL_oLayer.moveTo(document.images["ph"].x,document.images["ph"].y);
		DL_oLayer.visibility="show"
	} else	{
		dragResizer=DL_oLayer.getElementsByTagName('img')[DL_oLayer.getElementsByTagName('img').length-1];
		dragResizer.onmousedown= expand;  
		DL_oLayer.getElementsByTagName('div')[0].onmousedown=DL_fGrabEl;   
//		DL_fPositionLayer();
		DL_oLayer.style.visibility="visible";
//		if(DL_bNS6)window.onload = DL_fPositionLayer;
	}
}

/*
function DL_fPositionLayer()
{
	//DL_oLayer.style.left = DL_fGetRealLeft(DL_oPH) + "px";
	//DL_oLayer.style.top = DL_fGetRealTop(DL_oPH) + "px";
	//DL_oLayer.style.left="100px";
	//DL_oLayer.style.top="100px";
}
*/

currentZIndex=5001;
function DL_fGrabEl(e) {

	DL_oLayer = this.parentNode;
	currentZIndex=currentZIndex+1;
	DL_oLayer.style.zIndex=currentZIndex;
	document.getElementById('noteSeparatorLayer').style.width='100%';
	var oDoc = document;
	DL_nCurrentX = (DL_bNS) ? e.pageX : (event.clientX + oDoc.body.scrollLeft);
    DL_nCurrentY = (DL_bNS) ? e.pageY : (event.clientY + oDoc.body.scrollTop);
	
	if(DL_bNS4){
		oDoc.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
	}
	oDoc.onmousemove = DL_fMoveEl;
	oDoc.onmouseup = DL_fDropEl;
	return false;
}

function DL_fMoveEl(e) {
	var oDoc = document;
	var nNewX = (DL_bNS) ? e.pageX : (event.clientX + oDoc.body.scrollLeft);
    var nNewY = (DL_bNS) ? e.pageY : (event.clientY + oDoc.body.scrollTop);

	var nDistanceX = (nNewX - DL_nCurrentX);
    var nDistanceY = (nNewY - DL_nCurrentY);
    DL_nCurrentX = nNewX;
    DL_nCurrentY = nNewY;

	if (DL_bNS4) {
		DL_oLayer.moveBy(nDistanceX,nDistanceY);
	}else{
		DL_oLayer.style.left = parseInt(DL_oLayer.style.left) + nDistanceX + 'px';
		DL_oLayer.style.top = parseInt(DL_oLayer.style.top) + nDistanceY + 'px';
    }
	DL_oLayer.getElementsByTagName('input')[0].value=parseInt(DL_oLayer.style.left) + nDistanceX + 'px';
  	DL_oLayer.getElementsByTagName('input')[1].value=parseInt(DL_oLayer.style.top) + nDistanceY + 'px';
	return false;
}

function DL_fDropEl() {
	if(DL_bNS) {document.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP)}
	document.onmousemove = document.onmouseup = null;
	document.getElementById('noteSeparatorLayer').style.width='0px';
	if (isHomePage==false) {
		setNoteData();
	}
	return false;
}

if (typeof Node != 'undefined') {
	
	// Modified by rgp01z CR-43326 start 1st March 2012 
	Node.prototype.removeNode = function( removeChildren ) {
		var self = this; 
		if ( Boolean( removeChildren ) ) { 
			return this.parentNode.removeChild( self ); 
		} else {
			var range = document.createRange();
			range.selectNodeContents( self );
			return this.parentNode.replaceChild( range.extractContents(), self );
		} 
	} 
	// Modified by rgp01z CR-43326 end 1st March 2012
}

function createElementWithName(typee, namee) {
	var element;
	// First try the IE way; if this fails then use the standard way
	if (document.all) {
		element = document.createElement('<'+typee+' name="'+namee+'" />');
	} else {
		element = document.createElement(typee);
		element.setAttribute('name', namee);
	}
	return element;
}

var targetId;
noteTemplateNode = document.getElementById('noteTemplate');
document.getElementById('noteTemplate').removeNode(true);
insertBeforeMarker = document.getElementById('bottomMarker');
newnot="update";

function insertParamInUrl(oldUrl,param,insertBefore){
	var newurl =oldUrl;
	var index = oldUrl.indexOf(insertBefore);
	if(index >0){
		var firstPart=oldUrl.substring(0,index);
		var secondPart=oldUrl.substring(index,oldUrl.length);
		newurl = firstPart +param+secondPart;		
	}
	return newurl;
}

function insertNote(fadeIn,testing,flag1,asset_id,asset_type,tab_name) {
	if(flag1==false){
		var url_currpage=location.href;
		if(url_currpage.indexOf('#') > 0 ){
			document.usersessionchk.url_page.value=insertParamInUrl(url_currpage,'&note_op=true','#');
		}else{
			document.usersessionchk.url_page.value=url_currpage+"&note_op=true";
		}
		document.usersessionchk.submit();
	}else{		
		var bott=document.getElementById('bottomMarker');
		newNote = noteTemplateNode.cloneNode(true);
		targetId = newNote;
		if (fadeIn=="yes") {
			opacity1(targetId, 0, 90, 500); 
			newNote.style.left="700px";
			newNote.style.top="180px";
			newNote.style.height="200px";
			newNote.style.width="200px";
		} else {
			newNote.style.height=columndata[colfield+5] ;
			newNote.style.opacity = (90 / 100); 
			newNote.style.MozOpacity = (90 / 100); 
			newNote.style.KhtmlOpacity = (90 / 100); 
			newNote.style.filter = "alpha(opacity=90)"; 
		}
		infoContainer = document.getElementById('notesContainer');
		infoContainer.insertBefore(newNote,insertBeforeMarker);
		var DL_oLayer=newNote;

		if(DL_bNS4)	{
			var DL_bOrigWidth=innerWidth;
			var DL_bOrigHeight=innerHeight;
			window.onresize=function(){
				if(innerWidth!=DL_bOrigWidth||innerHeight!=DL_bOrigHeight)location.reload();
			}
			DL_oLayer.captureEvents(Event.MOUSEDOWN);
			DL_oLayer.onmousedown=DL_fGrabEl;
			//DL_oLayer.moveTo(document.images["ph"].x,document.images["ph"].y);
			DL_oLayer.visibility="show"
		} else	{
			DL_oLayer.getElementsByTagName('div')[0].onmousedown=DL_fGrabEl;  
			iframeBuffer=DL_oLayer.getElementsByTagName('iframe')[0];
			dragResizer=DL_oLayer.getElementsByTagName('img')[DL_oLayer.getElementsByTagName('img').length-1];
			dragResizer.onmousedown= expand;  
			DL_oLayer.getElementsByTagName('div')[0].onmousedown=DL_fGrabEl;  
			DL_oLayer.style.visibility="hidden";
			if (fadeIn!=undefined) {
				DL_oLayer.style.visibility="visible";
			}
		}
		newNote.getElementsByTagName('iframe')[0].src=newNote.getElementsByTagName('iframe')[0].src;
	}
}


var currentTextArea
//var currentNote

function expand(e) {
	var oDoc = document;
	currentTextArea=this.parentNode.getElementsByTagName('textarea')[0];
	DL_oLayer=this.parentNode;
	DL_nCurrentX = (DL_bNS) ? e.pageX : (event.clientX + oDoc.body.scrollLeft);
    DL_nCurrentY = (DL_bNS) ? e.pageY : (event.clientY + oDoc.body.scrollTop);
	if(DL_bNS4)oDoc.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
	oDoc.onmousemove = growIt;
	oDoc.onmouseup = DL_fDropEl;
	return false;
}
	
function growIt(e) {
	document.getElementById('noteSeparatorLayer').style.width='100%';
	var oDoc = document;
	var nNewX = (DL_bNS) ? e.pageX : (event.clientX + oDoc.body.scrollLeft);
    var nNewY = (DL_bNS) ? e.pageY : (event.clientY + oDoc.body.scrollTop);

	var nDistanceX = (nNewX - DL_nCurrentX);
    var nDistanceY = (nNewY - DL_nCurrentY);
    DL_nCurrentX = nNewX;
    DL_nCurrentY = nNewY;
	if (DL_bNS4) {
		DL_oLayer.moveBy(nDistanceX,nDistanceY);
	}
	else{
		currentDragBar=DL_oLayer.getElementsByTagName('div')[0];
		currentBufferIframe=DL_oLayer.getElementsByTagName('iframe')[0];
		if(currentTextArea.style.height==""){
			currentTextArea.style.height="200px";
			currentBufferIframe.style.height="247px";
		}
		
		snapshotHeight=currentTextArea.style.height;
		currentTextArea.style.height = parseInt(snapshotHeight) + nDistanceY + 'px';
		currentBufferIframe.style.height = parseInt(snapshotHeight) + nDistanceY + 22 + 'px';
		DL_oLayer.style.height = parseInt(snapshotHeight) + nDistanceY + 'px';
		
		if(DL_oLayer.style.width==""){
			DL_oLayer.style.width="200px";
			currentBufferIframe.style.width = '200px';
		}
		
		snapshotWidth=DL_oLayer.style.width;
		DL_oLayer.style.width = parseInt(snapshotWidth) + nDistanceX + 'px';
		currentBufferIframe.style.width = parseInt(snapshotWidth) + nDistanceX + 'px';
		if (parseInt(DL_oLayer.style.width)<200) {
			DL_oLayer.style.width = '200px';
			currentBufferIframe.style.width = '200px';
		}
		if (parseInt(currentTextArea.style.height)<30) {
			currentTextArea.style.height = '30px';
			currentBufferIframe.style.width = '200px';		
		}
		if(currentDragBar.style.width==""){currentDragBar.style.width="200px"}
			currentDragBar.style.width = parseInt(currentDragBar.style.width) + nDistanceX + 'px';
		if (parseInt(currentDragBar.style.width)<200) {
			currentDragBar.style.width = '200px';
		}
    }
	currentNote.getElementsByTagName('input')[2].value=parseInt(currentDragBar.style.width) + nDistanceX + 'px';
	currentNote.getElementsByTagName('input')[3].value=parseInt(currentTextArea.style.height) + nDistanceY + 'px';
	
	return false;
}

var reallyUnload=true; //the var is needed because onunload fires when you add a new note

var windowWidth = (navigator.userAgent.indexOf("MSIE")!=-1) ? document.body.clientWidth : window.innerWidth;
var leftLocation = -windowWidth + 11;
var r=0
var t=0;
var rightLocation = 0;
var topLocation = 0;
var velocity = 1.01;
var accelFactor = 1.1;
var objectToDisappear;
function opacity(e,objID, opacStart, opacEnd, millisec, isMinimized,asset_id,asset_type,tab_name) { 
	//speed for each frame 
	//window.event.cancelBubble = true;
	e = (e) ? e : window.event;
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
	if ( isMinimized == true  || confirm('Are you sure you want to delete this note?')) {
		var speed = Math.round(millisec / 100); 
		var timer = 0; 
		objectToDisappear = objID;
			//determine the direction for the blending, if start and end are the same nothing happens 
		if(opacStart > opacEnd && isMinimized==true) {
			for(i = opacStart; i >= opacEnd; i--) { 
				setTimeout("changeOpac(" + i + ",'" + objectToDisappear + "')",(timer * speed)); 
				timer++; 
			} 
		} 
		
		if (opacStart < opacEnd) { 
			for(i = opacStart; i <= opacEnd; i++) { 
				setTimeout("changeOpac(" + i + ",'" + objectToDisappear + "')",(timer * speed)); 
				timer++; 
			} 
		} 

		if (isHomePage==false && isMinimized==false){
			setTimeout('objectToDisappear.removeNode(true)',50);
		}
		if (isHomePage==false && isMinimized==false){
			deleteNote(objectToDisappear.id,asset_id,asset_type,tab_name);
		}		
		if(isMinimized==true){
			setTimeout('objectToDisappear.removeNode(true)',20);
			hidedisplayflag(objectToDisappear.id);
		}
	}
} 

function opacity1(objID, opacStart, opacEnd, millisec) { 
    //speed for each frame 
	//window.event.cancelBubble = true;
		
	var speed = Math.round(millisec / 100); 
	var timer = 0; 
	objectToDisappear = objID;

	//determine the direction for the blending, if start and end are the same nothing happens 
	if(opacStart > opacEnd) { 
		for(i = opacStart; i >= opacEnd; i--) { 
			setTimeout("changeOpac(" + i + ",'" + objectToDisappear + "')",(timer * speed)); 
			timer++; 
		} 
	} else if(opacStart < opacEnd) { 
		for(i = opacStart; i <= opacEnd; i++) { 
			setTimeout("changeOpac(" + i + ",'" + objectToDisappear + "')",(timer * speed)); 
			timer++; 
		} 
	} 
} 

//change the opacity for different browsers 
function changeOpac(opacity, blahblah) { 
	var object = objectToDisappear.style; 
	object.opacity = (opacity / 100); 
    object.MozOpacity = (opacity / 100); 
    object.KhtmlOpacity = (opacity / 100); 
    object.filter = "alpha(opacity=" + opacity + ")"; 
} 


counter=0;
var ajaxuid;
var asset_vid;
var asset_vtype;
var tab_vname;

function setNoteData() {
		callMetrics('edit');
		asset_vid = assetId;
		asset_vtype = assettype;
		if(tabname!=null)
		tab_vname = tabname;
		else
		tab_vname="";

		var currId=DL_oLayer.id.substring(12);
		if(currId!="" && currId!=null){
			
		var noteBody = DL_oLayer.getElementsByTagName('textarea')[0].value;

		if(noteBody!=null && noteBody!=""){
		var left = DL_oLayer.style.left;
		tempyTop = 1; 
		var top = parseFloat(DL_oLayer.style.top) * 1 + tempyTop*1;
		var top = top + "px";
		DL_oLayer.getElementsByTagName('input')[1].value=top;
		var width = DL_oLayer.style.width;
		var url=location.href;
		var height = DL_oLayer.style.height;
		var actiontype="update"
		var webid=0;
		var noteid=DL_oLayer.id.substring(12);
		var i=0;
		webid=noteid;
		// Commented to change request to post start on 3 Nov 08
		//var ajaxurl="/webapp/Webnote_Servlet?web_id="+webid+"&asset_id="+escape(assetId)+"&asset_type="+escape(assettype)+"&tab_name="+escape(tabname)+"&note_txt="+escape(noteBody)+"&title=TITLE&screen_x="+left+"&screen_y="+top+"&height="+height+"&width="+width+"&display_flag=Y&active=Y&action="+actiontype";
		// Commented to change request to post start on 3 Nov 08
		var ajaxurl="/webapp/Webnote_Servlet";
		var params="web_id="+webid+"&asset_id="+escape(assetId)+"&asset_type="+escape(assettype)+"&tab_name="+escape(tabname)+"&note_txt="+escape(noteBody)+"&title=TITLE&screen_x="+left+"&screen_y="+top+"&height="+height+"&width="+width+"&display_flag=Y&active=Y&action="+actiontype;
	
		XMLRequest.open("POST",ajaxurl,true);
		XMLRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		XMLRequest.onreadystatechange = updateInfo;
		XMLRequest.send(params);
		}
	}
}					


function insertNoteData() {
		asset_vid = assetId;
		asset_vtype = assettype;
		if(tabname!=null)
		tab_vname = tabname;
		else
		tab_vname="";
		
		var noteBody = DL_oLayer.getElementsByTagName('textarea')[0].value;
		if(noteBody!=null && noteBody!=""){
		var left = DL_oLayer.style.left;
		tempyTop = 1; 
		var top = parseFloat(DL_oLayer.style.top) * 1 + tempyTop*1;
		var top = top + "px";
		DL_oLayer.getElementsByTagName('input')[1].value=top;
		var width = DL_oLayer.style.width;
		var url=location.href;
		var height = DL_oLayer.style.height;
		var actiontype="insert";
		var webid=0;
		var statusflag='';
		var noteid="";
		var actiontype="insert";
		noteid=DL_oLayer.id.substring(12);
		if(noteid!=null && noteid!=""){
				actiontype="update";
				webid=noteid;
			}
		
		if (actiontype=="update"){
			callMetrics('edit');
		}else{
			callMetrics('add');
		}
		var ajaxurl="/webapp/Webnote_Servlet";
		var params="web_id="+webid+"&asset_id="+escape(assetId)+"&asset_type="+escape(assettype)+"&tab_name="+escape(tabname)+"&note_txt="+escape(noteBody)+"&title=TITLE&screen_x="+left+"&screen_y="+top+"&height="+height+"&width="+width+"&display_flag=Y&active=Y&action="+actiontype;
		XMLRequest.open("POST",ajaxurl,true);
		XMLRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		if(actiontype == "insert" ){
			XMLRequest.onreadystatechange = insertInfo;
		}else if(actiontype == "update" ){
			XMLRequest.onreadystatechange = updateInfo;
		}
		XMLRequest.send(params);
		}
					
}
var struid=0;
function insertInfo(){
		
		var flag1= true;
		if (XMLRequest.readyState  == 4){
						if (XMLRequest.status  == 200){
						if(XMLRequest.responseText == "Session Expired Exception"){
							alert("An error has occurred. Please refresh your page");
							}
						//Added on 1 Nov incase of any exception while inserting notes start
						else if(!(XMLRequest.responseText == "INSERTEXCEPTION")){		
							user_count=XMLRequest.responseText.split('FSLROW');
						//Added on 1 Nov incase of any exception while inserting notes end
							struid=user_count[0];
							appendDivId();
                            // Modified for Search History Start Jan 13 ,2009
							document.getElementById('usernotecount').innerHTML="<a href=\"javascript:call_pbar_metrics('pb_show_notes');viewAll("+ flag1 +", '"+ asset_vid +"', '"+ asset_vtype +"','" +tab_vname+"' );\"><img src=\"/shared/images/annotate_view.gif\"/>"+getTranslatedText("Show Notes on this Page")+" ("+ user_count[1] +")</a>" ;
						    // Modified for Search History  End Jan 13 ,2009
                        }
						//Added on 1 Nov incase of any exception while inserting notes start
						else{
							alert("Your note was not saved due to some System Error.Inconvenience Regretted");						
						}
						//Added on 1 Nov incase of any exception while inserting notes end
										
					}
	          	}
}



function updateInfo(){
	if (XMLRequest.readyState  == 4){
				if(XMLRequest.status  == 200){
			 	//Added on 1 Nov incase of any exception while updating notes start
						if(XMLRequest.responseText == "UPDATEEXCEPTION"){
							alert("Your note was not saved due to some System Error.Inconvenience Regretted");
						}else if(XMLRequest.responseText == "Session Expired Exception"){
							alert("An error has occurred. Please refresh your page");
						}
					//Added on 1 Nov incase of any exception while updating notes end
				}
		}
}


var deleteNote_asset_id='';
var deleteNote_asset_type='';
var deleteNote_tab_name='';
function deleteNote(deletedNoteId,asset_id,asset_type,tab_name) {
	callMetrics('delete');
	deleteNote_asset_id = asset_id;
	deleteNote_asset_type = asset_type;
	deleteNote_tab_name = tab_name;
	subnoteid=deletedNoteId.substring(12);
	
	if(subnoteid!="" && subnoteid!=null){
	var url = "/webapp/Webnote_Servlet?web_id="+subnoteid+"&asset_id="+escape(asset_id)+"&asset_type="+escape(asset_type)+"&tab_name="+escape(tab_name)+"&active=N&action=delete";
	XMLRequestDeleteNote.open("GET", url , true);
	XMLRequestDeleteNote.onreadystatechange = deletedNote;	
	XMLRequestDeleteNote.send(null);  
	}
}

function deletedNote(){
		var flag1=true;
		if (XMLRequestDeleteNote.readyState  == 4){
			if (XMLRequestDeleteNote.status  == 200){
					if(XMLRequestDeleteNote.responseText == "Session Expired Exception"){
						alert("An error has occurred. Please refresh your page");
					}
					//Added on 1 Nov incase of any exception while Deleting notes start
					else if(!(XMLRequestDeleteNote.responseText == "DELETEEXCEPTION")){
					//Added on 1 Nov incase of any exception while Deleting notes end
							notecount = XMLRequestDeleteNote.responseText;
							if( notecount != 0 ){
							  // Modified for Search History Start Jan 29 ,2009
							document.getElementById('usernotecount').innerHTML="<a href=\"javascript:call_pbar_metrics('pb_show_notes');viewAll("+ flag1 +", '"+ deleteNote_asset_id +"', '"+ deleteNote_asset_type +"','" +deleteNote_tab_name+"' );\"><img src=\"/shared/images/annotate_view.gif\"/>"+getTranslatedText("Show Notes on this Page")+"("+ notecount +")</a>" ;
							  // Modified for Search History  Jan 29,2009
							}else{
							  // Modified for Search History Start Jan 29 ,2009
							document.getElementById('usernotecount').innerHTML="<img src=\"/shared/images/annotate_view.gif\"/>"+getTranslatedText("Show Notes on this Page")+"("+ notecount +")" ;
							  // Modified for Search History  End Jan 29,2009
							}
						}

					//Added on 1 Nov incase of any exception while Deleting notes start
						else{							
							alert("Your note was not deleted due to some System Error.Inconvenience Regretted");						
						}
					//Added on 1 Nov incase of any exception while Deleting notes end
			}
	    }
}

function appendDivId(){
		var noteTemplateNode = document.getElementById('noteTemplate');
		if(noteTemplateNode!=null){
		divIdb4changing=noteTemplateNode.id
		divId=divIdb4changing+struid;
		noteTemplateNode.id=divId;
		chkdiv = document.getElementById(divId);
		}
}

function hidedisplayflag(hiddenNoteId){
	callMetrics('hide');
	var sub_nt_hide=hiddenNoteId.substring(12);
	if(sub_nt_hide!=null && sub_nt_hide!=""){
	var hideurl = "/webapp/Webnote_Servlet?web_id="+sub_nt_hide+"&display_flag=N&action=hide";
	XMLRequestHideNoteflag.open("GET", hideurl , true);
	XMLRequestHideNoteflag.onreadystatechange = noteHidden;	
	XMLRequestHideNoteflag.send(null);  }
}

function noteHidden(){
		if (XMLRequestHideNoteflag.readyState  == 4){
			if(XMLRequestHideNoteflag.status  == 200){
			//Added on 1 Nov incase of any exception while hiding note start
			if(XMLRequestHideNoteflag.responseText == "HIDEEXCEPTION"){
					alert("Your note cannot be hidden due to some System Error.Inconvenience Regretted");						
			} else if(XMLRequestHideNoteflag.responseText == "Session Expired Exception"){
						alert("An error has occurred. Please refresh your page");
				}
			//Added on 1 Nov incase of any exception while hiding note end
			}
	    }
}


function viewAll(flag1,id,type,tab){
	callMetrics('show');

	if(flag1==false){
		var url_currpage=location.href;
		document.getElementById('url_page').value=url_currpage+"&viewnt=true";
		document.usersessionchk.url_page.value=url_currpage+"&viewnt=true";
		document.usersessionchk.submit();
	}
	else{
			var viewurl="/webapp/Webnote_Servlet?asset_type="+type+"&asset_id="+id+"&tab_name="+tab+"&action=viewall";
			XMLRequestViewNote.open("GET", viewurl , true);
			XMLRequestViewNote.onreadystatechange = viewNotesData;	
			XMLRequestViewNote.send(null);  
		}
}


function viewNotesData(){
	if (XMLRequestViewNote.readyState  == 4){
		if( XMLRequestViewNote.status  == 200){

		if(XMLRequestViewNote.responseText == "Session Expired Exception"){
				alert("An error has occurred. Please refresh your page");
		}
		//Added on 1 Nov incase of any exception while View All notes start

		else if(!(XMLRequestViewNote.responseText == "VIEWEXCEPTION")){
		//Added on 1 Nov incase of any exception while View All notes end
			//allNotes, create a list of all disaplyed notes, so that the one currently dispalyed will not be re-displayed
			allDivs =document.getElementsByTagName('div');
			numOfDivs = allDivs.length;
			var dsplayedNotes = "";
			// get all notes DIVS
			for (var i = 0; i < numOfDivs; i++) {
				if (allDivs[i].className=="notesLayer") {
					dsplayedNotes = dsplayedNotes +"$$"+allDivs[i].id.substring(12)+"$$";
				}
			}

						 rowdata=XMLRequestViewNote.responseText.split('FSLROW');
						 var notescount=rowdata.length;
						 colfield=0;
						 loopcounter=notescount-1;
						 for(var i=0; i<loopcounter;i++){
								columndata=rowdata[i].split("FSLCOL");	
								
								if(dsplayedNotes.indexOf("$$"+columndata[colfield+6]+"$$") == -1){
									insertNote("no");
									textContainer = newNote.getElementsByTagName('textarea')[0];
									dragBar=newNote.getElementsByTagName('div')[0];
									iframeBuffer=newNote.getElementsByTagName('iframe')[0];
									textContainer.value=unescape(columndata[colfield]);
									newNote.id=newNote.id+columndata[colfield+6];
									newNote.style.left=columndata[colfield+1];
									newNote.style.top=columndata[colfield+2];
									newNote.style.width=columndata[colfield+4];
									newNote.style.height=columndata[colfield+5] ;
									dragBar.style.width=columndata[colfield+4];
									iframeBuffer.style.width=columndata[colfield+4];
									iframeBuffer.style.height=columndata[colfield+5];

									newNote.style.height=columndata[colfield+5];
									fullNoteHeight=parseInt(columndata[colfield+5] ) + 22+ "px";
									iframeBuffer.style.height=fullNoteHeight;
									textContainer.style.height=columndata[colfield+5]; 

							}							
						}
			}
			//Added on 1 Nov incase of any exception while View All notes start
			else{
				alert("Your notes cannot be viewed due to some System Error.Inconvenience Regretted");
			
			}
			//Added on 1 Nov incase of any exception while View All notes end
	  }
	}
}

var XMLRequest=getAjaxRequest();
var XMLRequestDeleteNote=getAjaxRequest();
var XMLRequestHideNoteflag=getAjaxRequest();
var XMLRequestViewNote=getAjaxRequest();

function getAjaxRequest(){
	var oXMLRequest;
	if (window.ActiveXObject){
		oXMLRequest = new ActiveXObject("Microsoft.XMLHTTP");  
	}else{
		oXMLRequest = new XMLHttpRequest();
	}    
	return oXMLRequest;
}

function callMetrics(action){
	if (window.webpage_note_metrics && action!= 'undefined' ){
		webpage_note_metrics(action);
	}
}