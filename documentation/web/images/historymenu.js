/**
 * 
 */

function getTranslatedText(string){
	try {
		var localize = {};
		if(  (typeof i18n_en != 'undefined' ) && i18n_en !=null)
		localize = i18n_en;
		
        string = string.toString() || '';
        var args = arguments;
        var pattern = (args.length > 0) ? new RegExp('%([1-' + args.length.toString() + '])', 'g') : null;
        var str = localize.hasOwnProperty(string) ? localize[string] : string;
       	return String(str).replace(pattern, function (match, index) { return args[index]; });
    } catch (e) {
    }	
}

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
								progressdiv.innerHTML="<p class=\"loadImage\" style=\"text-align:center; font-weight: 700;\"><!--[if lte IE 9]><img src=\"/files/graphic/icons/load.gif\" /><style>.load .spin-icon {display:none;}</style><![endif]--><span class=\"icon-para-reset spin-icon\">&nbsp</span> <br/> LOADING</p>";
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

var Request = new Object();

Request.queue = [];

Request.readyState = true;

Request.timeOut = null;




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
function getKey(varName){
	var varName_a = new Array();
	varName_a = varName.split('<;>');
	////////alert(varName_a[0]);
	////////alert(""+varName_a[1]);


	return varName_a;
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
function displayBlockForHistory(lang_cd,history){ //added lang_cd,history by b42233 for Cr-47387
	//////////alert("loading displayBlockForHistory");
	//alert(lang_cd);
	// Changed Height of pop up By B25319 For CR39352
	openHistoryBlock(history, '', '','','750','490','',lang_cd); //added lang_cd,history  by b42233 for Cr-47387
}
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
function ajaxcallforFETCH_FAVORITES(commandID,img_id,td_id,fid,buttonid,lang_cd){// added lang_cd by b42233 for Cr-47387
	minmax(commandID,img_id,td_id,fid,buttonid);
	var nObj = document.getElementById(commandID);
	if(nObj!=null&&nObj.innerHTML=='')
	{
		progressbar(commandID,nObj);
		Request.sendPOST('/webapp/history/fetchHistory.sp?&lang_cd='+lang_cd,'commandID=FETCH_FAVORITES&sectionView=true',callbackFAVORITES);
	}// added lang_cd by b42233 for Cr-47387

}
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
		progressdiv.innerHTML="<p class=\"loadImage\" style=\"text-align:center; font-weight: 700\"><span class=\"icon-para-reset spin-icon\">&nbsp</span> <br/> LOADING</p>";
		progressdiv.style.position="relative";
	}
}
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
function checkDeleteHistory(url, deleteObj,rowID){

	jQuery.post(url, deleteObj, function(response){
		//alert(response.status);
		if(response.status=="success" || response.status=="Saved"){
			deleteRow(rowID,response.commandID);
		}
		
	});
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
function ajaxcallforDownLoad(commandID,img_id,td_id,fid,buttonid,lang_cd){ // added lang_cd by b42233 for Cr-47387 on 10-Oct-2012
	minmax(commandID,img_id,td_id,fid,buttonid);
	var nObj = document.getElementById(commandID);
	if(nObj!=null&&nObj.innerHTML=='')
	{
		progressbar(commandID,nObj);
		Request.sendPOST('/webapp/history/fetchHistory.sp?&lang_cd='+lang_cd,'commandID=FETCH_'+commandID+'&sectionView=true',callbackDownLoad);  
	}// added lang_cd by b42233 for Cr-47387 on 10-Oct-2012
}
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
function ajaxcallforWATCH_VIDEO(commandID,img_id,td_id,fid,buttonid,lang_cd){ // added lang_cd by b42233 for Cr-47387 on 10-Oct-2012
	minmax(commandID,img_id,td_id,fid,buttonid);
	var nObj = document.getElementById(commandID);
	if(nObj!=null&&nObj.innerHTML=='')
	{
		progressbar(commandID,nObj);
		Request.sendPOST('/webapp/history/fetchHistory.sp?&lang_cd='+lang_cd,'commandID=FETCH_'+commandID+'&sectionView=true',callbackWATCH_VIDEO);
	}// added lang_cd by b42233 for Cr-47387 on 10-Oct-2012
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
function getUniKeyHistory(varName){
	var varName_a = new Array();
	varName_a = varName.split('_');
	//alert("varName_a   "+varName_a);
	//alert("varName_a[1]  "+varName_a[1]);
	return varName_a[1];
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
}