// -------------------------------------------------------------------
// DHTML Window Widget- By Dynamic Drive, available at: http://www.dynamicdrive.com
// v1.0: Script created Feb 15th, 07'
// v1.01: Updated to v1.01 Feb 21th, 07'
// -------------------------------------------------------------------
/* WOW: params for adding addthis widget :start*/
var videoURL="";
var videoTitle="";
var recalonload ="";
//var showprogress =false; //Added for the CR33774 by b36554 on 30Apr2013
var progressdiv;
/* WOW: params for adding addthis widget: end*/
var dhtmlwindow={

ajaxbustcache: true, //Bust caching when fetching a file via Ajax?

minimizeorder: 0,
tobjects: [], //object to contain references to dhtml window divs, for cleanup purposes

init:function(t){
	var domwindow=document.createElement("div") //create dhtml window div
	domwindow.id=t
	domwindow.className="dhtmlwindow"
	var domwindowdata=''
	domwindowdata='<div class="drag-handle">'
	if(typeof recalonload != "undefined" && ( recalonload == 'history'|| recalonload == 'webnote'|| recalonload == 'training'|| recalonload == 'downloaded')){
	domwindowdata+='DHTML Window:<div class="drag-controls"><img  onclick="hideselectsHistory();" src="/shared/images/x.png" id="Close" title='+getTranslatedText("Close")+' style="margin-right:5px;margin-top:5px;width:14px;height:14px;" /></div>'
	domwindowdata+='</div>'
	}
	else
	{
	domwindowdata+='DHTML Window:<div class="drag-controls"><img src="/shared/images/x.png" id="Close" title='+getTranslatedText("Close")+' style="margin-right:5px;margin-top:5px;width:14px;height:14px;" /></div>'
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
	/*added by b41913 for CR-54433 on 17th Feb 2014 start*/
	else if(typeof recalonload != "undefined" && ( recalonload == 'Inventory'))
	{
	domwindowdata+='<div id='+recalonload+' class="drag-contentarea"></div>'
	}/*added by b41913 for CR-54433 on 17th Feb 2014 end*/
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
	return t //return reference to dhtml window div
},

/* modifications for 56853 */
//open:function(t, contentsource, title, attr, recalonload){
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
	if (document.getElementById(t)==null) //if window doesn't exist yet, create it
		t=this.init(t) //return reference to dhtml window div
	else
		t=document.getElementById(t)
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
	t.style.display="block"
	//Added for the CR33774 by b36554 on 30Apr2013 starts
	/*if(this.showprogress = true){
		t.contentarea.innerHTML="<div style=\"position:absolute; left:145px; top:155px;\"><img src=\"/search/images/loading_bar.gif\" /><br><div nowrap><font color=\"#A7BB08\"><BLINK>Please Wait...</BLINK></font></div></div>";
	}*/
	//Added for the CR33774 by b36554 on 30Apr2013 ends
	t.contentarea.style.display="block"
	
	/* Modified for Online Feedback - */
   /* Modified for search history - */
   
	
	
	
if(typeof recalonload != "undefined" && ( recalonload == 'history'|| recalonload == 'webnote'|| recalonload == 'training'|| recalonload == 'downloaded')){
//alert(recalonload);
var div_id="progressid"+recalonload;
         document.getElementById(recalonload).innerHTML="<div id='"+div_id+"'></div>";
    progressdiv=document.getElementById(div_id);
	if(typeof progressdiv != "undefined" && progressdiv != null)
	{//alert("progressdiv");
	progressdiv.style.visibility="visible";
	progressdiv.innerHTML="<p class=\"loadImage\" style=\"text-align:center; font-weight: 700 \"><span class=\"icon-para-reset spin-icon\"></span> <br/> LOADING</p>"; //Modified by b28392 for CR46284 on 26 Sep 2012
    progressdiv.style.position="absolute";
	progressdiv.style.left="290px";
    progressdiv.style.top="250px";
	progressdiv.style.width="150px";
	
}

}	/*added by b41913 for CR-54433 on 17th Feb 2014:start */
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
}/*added by b41913 for CR-54433 on 17th Feb 2014:end */
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

//changes for CCT56853 start
close:function(t){
	
//changes for CCT56853	end
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
		/*recordVideoHistory(content,'WATCH_VIDEO');*/    ////////  ADD BACK IN - - commented out for testing - DK 3/25/2011
	}
	/** Add END by B17090 on 14-Oct-2009 For CCT68841  **/

	var time = 0;
	// youtube_metrics(content,title,duration,time);   ////// ADD BACK IN - commented out for testing - DK 3/25/2011
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


/** Add END by B17090 on 14-Oct-2009 For CCT68841  **/
// This will not be used After clients have modified functions in collaterals to call new methods
// that will also track the video history
/** Add START by B17090 on 14-Oct-2009 For CCT68841  **/
/*function openVideoFile(content,title,duration,flashPlayer,recrdVideoUrl,width,height){

	if (!width) { width = 425; }
	if (!height) { height = 350; }
	windowWidth = width;
	windowHeight = parseInt(height) + 50;
	if (!flashPlayer) {flashPlayer = "/files/multimedia/player.swf";}
	var defaultSwfExpressInstall =  "/files/ajax/flvplayer/expressInstall.swf"
	var requiredSwfVersion = "9.0.28";
	
	if(content != undefined && content!=null && content  != '' ) { 
		
		recordVideoHistory(content,'WATCH_VIDEO');
	}
	*//** Add END by B17090 on 14-Oct-2009 For CCT68841  **//*

	var time = 0;
	youtube_metrics(content,title,duration,time);
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
	
	if(video_extn.indexOf(".swf")!=-1){
		content1 ="<div id='flshc'></div>";
		ajaxwin=dhtmlwindow.open('ajaxbox',content1,title, 'width='+windowWidth+'px,height='+windowHeight+'px,left=250px,top=100px,resize=0,scrolling=0','video','inline');
		var flashvars = { autoplay: true };	
//		var params = { scale: "noscale", allowfullscreen: "true", salign: "tl", bgcolor: "#ffffff"};
		var params = { allowfullscreen: "true", salign: "tl", bgcolor: "#ffffff"};
		var attributes = { align: "left", base: "." };
		swfobject.embedSWF(content, "flshc", width, height, requiredSwfVersion, defaultSwfExpressInstall, flashvars, params, attributes);
	} else if (video_extn.indexOf(".flv")!=-1){
		content1 ="<div id='flshc'></div>";
		ajaxwin=dhtmlwindow.open('ajaxbox',content1,title, 'width='+windowWidth+'px,height='+windowHeight+'px,left=250px,top=100px,resize=0,scrolling=0','video','inline');
//		var flashvars = {video: content, autoplay: true};	
		var flashvars = {file: content, autostart: true};	
		var params = { allowfullscreen: "true", salign: "tl", bgcolor: "#ffffff"};
		var attributes = { align: "left", base: "." };
		swfobject.embedSWF(flashPlayer, "flshc", width, height, requiredSwfVersion, defaultSwfExpressInstall, flashvars, params, attributes);
	} else if (video_extn.indexOf(".gif")!=-1){
		content='<img src=\''+content+'\' width=\''+width+'\' height=\''+height+'\'>';
		ajaxwin=dhtmlwindow.open('ajaxbox',content,title, 'width='+windowWidth+'px,height='+windowHeight+'px,left=250px,top=100px,resize=0,scrolling=0','video','inline');
	
	} else if ( isVideoType( video_extn ) ){
		if ( video_extn != '.mov' ){
			content='&nbsp;<object id=\'mediaplayer\' width=\''+width+'\' height=\''+height+'\' standby=\'Freescale Videos\' type=\''+ getFileType(video_extn) +'\'><param name=\'freescalevideos\' value=\''+ content +'\'><embed type=\''+ getFileType(video_extn) +'\' src=\''+ content +'\' name=\'mediaplayer\' width=\''+width+'\' height=\''+heigth+'\' autoplay=\'true\'></embed></object>';
		} else {
			content='&nbsp;<object height=\''+height+'\' width=\''+width+'\' codebase=\'http://www.apple.com/qtactivex/qtplugin.cab\'> <param name=\'src\' value=\''+ content +'\' ><param name=\'autoplay\' value=\'true\'> <param name=\'control\' value=\'StatusField\'><param name=\'console\' value=\'video\'><embed height=\''+height+'\' width=\''+width+'\' type=\''+ getFileType(video_extn) +'\' pluginspage=\'http://www.apple.com/quicktime/download/\' src=\''+content+'\' controls=\'statusfield\' console=\'video\' autoplay=\'true\'/></object>';
		}
		ajaxwin=dhtmlwindow.open('ajaxbox',content,title, 'width='+windowWidth+'px,height='+windowHeight+'px,left=250px,top=100px,resize=0,scrolling=0','video','inline');
	} else {
		content = '&nbsp;<object width=\''+width+'\' height=\''+height+'\'><param name=\'movie\' value=\''+content+'\' ></param><embed src=\''+content+'&autoplay=1\' type=\'application/x-shockwave-flash\' width=\'100%\' height=\'96%\' ></embed></object>';
		ajaxwin=dhtmlwindow.open('ajaxbox',content,title, 'width='+windowWidth+'px,height='+windowHeight+'px,left=250px,top=100px,resize=0,scrolling=0','video','inline');
	}
	ajaxwin.style.zIndex=1000;
	return false;
}*/




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
