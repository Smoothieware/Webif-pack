	var ns = (navigator.appName.indexOf("Netscape") != -1);
	var d = document;
	var px = document.layers ? "" : "px";
	var topOffset = 80
	var ijk = 0;
	var flag=0;
var flagCentre=0;

	var ns6=document.getElementById&&!document.all
	var notClicked = false;
	var timer=0;

	function JSFX_FloatDiv(id, sx, sy)
	{
		var el=d.getElementById?d.getElementById(id):d.all?d.all[id]:d.layers[id];
		window[id + "_obj"] = el;
		if(d.layers)el.style=el;
		el.cx = el.sx = sx;el.cy = el.sy = sy;
		el.sP=function(x,y){this.style.left=x+px;this.style.top=y+px;};
		el.flt=function()
		{
			var pX, pY;
			pX = (this.sx >= 0) ? 0 : ns ? innerWidth : 
			document.documentElement && document.documentElement.clientWidth ? 
			document.documentElement.clientWidth : document.body.clientWidth;
			pY = ns ? pageYOffset : document.documentElement && document.documentElement.scrollTop ? 
			document.documentElement.scrollTop : document.body.scrollTop;
			if(this.sy<0) 
			pY += ns ? innerHeight : document.documentElement && document.documentElement.clientHeight ? 
			document.documentElement.clientHeight : document.body.clientHeight;
			this.cx += (pX + this.sx - this.cx);this.cy += (pY + this.sy - this.cy);
			this.sP(this.cx, this.cy);
			setTimeout(this.id + "_obj.flt()", 1);
		}
		return el;
	}

	JSFX_FloatDiv("feedBackajaxbox", -120, -95).flt();


	function restrictinput(maxlength,e,placeholder){
	if (window.event&&event.srcElement.value.length>=maxlength)
	return false
	else if (e.target&&e.target==eval(placeholder)&&e.target.value.length>=maxlength){
	var pressedkey=/[a-zA-Z0-9\.\,\/]/ //detect alphanumeric keys
	if (pressedkey.test(String.fromCharCode(e.which)))
	e.stopPropagation()
	}
	}

	function countlimit(maxlength,e,placeholder){
	var theform=eval(placeholder)
	var lengthleft=maxlength-theform.value.length
	var placeholderobj=document.all? document.all[placeholder] : document.getElementById(placeholder)
	if (window.event||e.target&&e.target==eval(placeholder)){
	if (lengthleft<0)
	theform.value=theform.value.substring(0,maxlength)
	placeholderobj.innerHTML=lengthleft
	}
	}


	function displaylimit(theform,thelimit){
		
		var limit_text='<span id="'+theform.toString()+'">'+thelimit+'</span> characters remaining.'
		if (document.all||ns6)
		document.write(limit_text)
		if (document.all){
		eval(theform).onkeypress=function(){ return restrictinput(thelimit,event,theform)}
		eval(theform).onkeyup=function(){ countlimit(thelimit,event,theform)}
		}
		else if (ns6){
		document.body.addEventListener('keypress', function(event) { restrictinput(thelimit,event,theform) }, true); 
		document.body.addEventListener('keyup', function(event) { countlimit(thelimit,event,theform) }, true); 
	}
	}

	function clearbox(obj){
		if(!notClicked){obj.value='';notClicked=true}
	}



	function displayBlock(){
		var transparentLayer=document.getElementById('divBlockLayer');
		transparentLayer.style.display="none";
		var fbLayer=document.getElementById('feedBackajaxbox');
		if(fbLayer!=null){
			fbLayer.style.diplay="none";
			fbLayer.style.innerHTML="";
		}

		call_feedbackMetrics("open");
		// Added the trackAnalyticsFormStart for CR54489
		if(typeof trackAnalyticsFormStart == 'function') { 
			trackAnalyticsFormStart('FeedbackForm');
		}		

		openfeedBackBlock(' ', '', '','','673','520','');
		transparentLayer.style.zIndex="6";
		transparentLayer.style.width=document.documentElement.scrollWidth+"px";
		transparentLayer.style.height=document.documentElement.scrollHeight+"px";
		opacityEffect('divBlockLayer', 0, 50, 100)
		//setInterval ('focusOn()',1000);
		//document.getElementById('divBottomRight').style.visibility="hidden";
		flag=0;
		flagCentre=0;

	}

	function hideBlock(){
			
			var transparentLayer=document.getElementById('divBlockLayer');			
			opacityEffect('divBlockLayer', 100, 50, 100)
			setTimeout('clearIt()',400);		
			call_feedbackMetrics("cancel");
			//document.getElementById('divBottomRight').style.visibility="visible";
			
			
	}

	function clearIt(){
		var feedBackLayer=document.getElementById('feedBackajaxbox');
		document.getElementById('feedBackajaxbox').contentarea.innerHTML="";

		var transparentLayer=document.getElementById('divBlockLayer');
		var feedbackbox=document.getElementById('feedBackajaxbox');
		transparentLayer.style.zIndex="-1";
		transparentLayer.style.display="none";
		transparentLayer.style.width="0px";
		transparentLayer.style.height="0px";
		transparentLayer.style.innerHTML ="";
		feedbackbox.style.innerHTML="";
		feedbackbox.style.zIndex="-1";
		feedbackbox.style.display="none";
		feedbackbox.style.width="0px";
		feedbackbox.style.height="0px";
		// Added for fast Track cct start CCT68246 start on 23rd April 2009
		//document.getElementById('feedBackajaxbox').removeNode(true);
		// Added for fast Track cct start CCT68246 start on 23rd April 2009
	}

	//window.onload=adjustDivs;
	//window.onresize=adjustDivs;
	//window.onscroll=adjustDivs;

	setInterval ('adjustDivs()',500);
	//setInterval('SetLayerPosition();', 100)
	setInterval ('focusOn()',100);

	function focusOn(){
		if(document.getElementById('usercomments')!=null && flag==0 ){
			
			document.getElementById('usercomments').focus();
			flag=1;
		}
	}

	function run(){
		if(document.getElementById('feedBackajaxbox')!=null){
			var feedbackForm=document.getElementById('feedBackajaxbox');
			feedbackForm.style.top=window.innerHeight+"px"; 
		}
	}

	function adjustDivs(){
/*	if(document.getElementById('feedBackajaxbox')!=null){
	  var df=document.getElementById('feedBackajaxbox');
	  df.style.position='absolute'  ;
	  var icon=document.getElementById('divBottomRight');
      var h=window.screen.height;
	   var topPos=(h-392);
	  if(window.screen.height==720){
		df.style.top=(parseInt(icon.style.top)-topPos-15)+"px"
	  }
	  if(window.screen.height==768){
		  df.style.top=(parseInt(icon.style.top)-topPos-25)+"px"
	  }
	   if(window.screen.height==864){
		  df.style.top=(parseInt(icon.style.top)-topPos-6)+"px"
	  }
	  else{
       df.style.top=(parseInt(icon.style.top)-topPos-6)+"px"
	  } */
	 // df.style.left=(h2-673)/2+"px" 
	 	if(document.getElementById('feedBackajaxbox')!=null && flagCentre==0){

			var Wh=document.documentElement.clientHeight;
			 var feed=document.getElementById('feedBackajaxbox');
			feed.style.top=(Wh-392)/2+"px" ;
			flagCentre=1;
		
		}

	var transparentLayer=document.getElementById('divBlockLayer');
	 if(transparentLayer!=null){
        transparentLayer.style.width=document.documentElement.scrollWidth+"px";
		 transparentLayer.style.height=document.documentElement.scrollHeight+"px";
		 }

	   
	}


	function submitBlock(){
		var feedBackLayer=document.getElementById('feedBackajaxbox');
	document.getElementById('feedBackajaxbox').contentarea.innerHTML="";
	feedBackLayer.style.display="none";
	feedBackLayer.style.zIndex="-1";
	feedBackLayer.style.width="0px";
	feedBackLayer.style.height="0px";
	var rDiv;
	rDiv=document.getElementById('feedBackajaxbox');
    rDiv.parentNode.removeChild(rDiv);
	// Added for fast Track cct start CCT68246 start on 23rd April 2009
	//	document.getElementById('feedBackajaxbox').removeNode(true);
	// Added for fast Track cct start CCT68246 start on 23rd April 2009
	showThankYou();
	}

	function showThankYou(){
	call_feedbackMetrics("feedback_submitted");
	// Added the trackAnalyticsFormCompletion for CR54489
	if(typeof trackAnalyticsFormCompletion == 'function') { 
		trackAnalyticsFormCompletion('FeedbackForm');
	}
	openthankYouBlock('', '', '','','673','392','');
	setTimeout('closeThankYou()',3000);

	}

	function closeThankYou(){
		var feedBackLayer=document.getElementById('feedBackajaxbox');
		var transparentLayer=document.getElementById('divBlockLayer');
		feedBackLayer.style.display="none";
		feedBackLayer.style.zIndex="-1";
		feedBackLayer.style.width="0px";
		feedBackLayer.style.height="0px";
		feedBackLayer.style.innerHTML="";
		transparentLayer.style.display="none";
		transparentLayer.style.zIndex="-1";
		transparentLayer.style.width="0px";
		transparentLayer.style.height="0px";	
		//document.getElementById('divBottomRight').style.visibility="visible";
		// Added for fast Track cct start CCT68246 start on 23rd April 2009
		//document.getElementById('feedBackajaxbox').removeNode(true);
		// Added for fast Track cct start CCT68246 start on 23rd April 2009
	}


	function opacityEffect(id, opacStart, opacEnd, millisec) {
		var speed = Math.round(millisec / 100);
		var timer = 0;
		var object = document.getElementById(id).style;
		if(opacStart > opacEnd) {
			for(i = opacStart; i >= opacEnd; i--) {
				setTimeout("changeOpacEffect(" + i + ",'" + id + "')",(timer * speed));
				timer++;
			}
		} else if(opacStart < opacEnd) {
			for(i = opacStart; i <= opacEnd; i++)
				{
				setTimeout("changeOpacEffect(" + i + ",'" + id + "')",(timer * speed));
				timer++;
			}
			object.display="block";
		}
		
	}

	function changeOpacEffect(opacity, id) {
		var object = document.getElementById(id).style; 
		object.opacity = (opacity / 100);
		object.MozOpacity = (opacity / 100);
		object.KhtmlOpacity = (opacity / 100);
		object.filter = "alpha(opacity=" + opacity + ")";
		
	}

	function shiftOpacity(id, millisec) {
		if(document.getElementById(id).style.opacity == 100) {
			opacity(id, 100, 0, millisec);
		} else {
			opacity(id, 0, 100, millisec);
		}
	}


	function createSR(strURL){
		  var currURL=window.location.href;
                var ajaxurl="servicerequest.onlinefeedback.framework";
                if(currURL.indexOf("/webapp")==-1){
                        ajaxurl="/webapp/servicerequest.onlinefeedback.framework";
                 }
			XMLRequest.open("POST",ajaxurl,true);
			XMLRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			XMLRequest.onreadystatechange = updateInfoFeedBack;
			XMLRequest.send(strURL);
			//submitBlock();
	}

	function updateInfoFeedBack(){
		if (XMLRequest.readyState  == 4 && XMLRequest.status  == 200){
			var srRes=XMLRequest.responseText;
			var srNum=trim(srRes,"");
			if(srNum!="null")
				submitBlock();
			else
			showErrorMsg();
		}
	}

	var  XMLRequest=getAjaxRequest();

	function getAjaxRequest(){
			var oXMLRequest;
			if (window.ActiveXObject){
			oXMLRequest = new ActiveXObject("Microsoft.XMLHTTP");}
			else{oXMLRequest = new XMLHttpRequest();
			}return oXMLRequest;
		}


	function subParameters(){
		call_feedbackMetrics("click_submit");		
		var radioCheck=0;
		var commentCheck=0;
		var questCount=document.getElementById('questionCount').value;
		var postString='';
		for(i=0;i<questCount;i++){
			var answerOption='ans_'+i;
			var answerGroup=document.getElementsByName(answerOption);

			for(j=0;j<answerGroup.length;j++){
				if(answerGroup[j].checked){
					radioCheck=1;
					var selectedAnswer=answerGroup[j].value;
					var question_answer=selectedAnswer.split('_');
					document.getElementById('ques_'+i).value=question_answer[1];
					postString+='ques_'+i+'='+question_answer[0]+'_'+encodeURIComponent(question_answer[1])+'_'+question_answer[2]+'&';
				}
			}
	}
	var textBox=document.getElementById('usercomments');
	var pattern=checkSpaces(textBox);

	if(pattern=='' && radioCheck==0  ){
		alert("Please either enter comments or rate the page. ");
		document.getElementById("submitButton").disabled=false;
		
	}
	else{

		
	 var englishCheck=check();
	 if(englishCheck!=false){
		
		// Modified element name for asp: start
		 if(document.getElementById('Asset_code'))
		{
			 if(document.getElementById('Asset_code').value!=null)
				 postString+='assetcode='+document.getElementById('Asset_code').value+'&';
		}
		 else
		 {
			 postString+='assetcode= &';
		 }
		 if(document.getElementById('Asset_name'))
		{
			 if(document.getElementById('Asset_name').value!=null)
				 postString+='assetName='+document.getElementById('Asset_name').value+'&';
		}
		 else
		 {
		 postString+='assetName= &';
		 }
		// Modified element name for asp: end

		postString+='pageUrl='+escape(document.location.href)+'&';
		postString+='questioncount='+document.getElementById('questionCount').value+'&';
		postString+='comments='+encodeURIComponent(document.getElementById('usercomments').value)+'&';
		postString+='IPaddr='+document.getElementById('ipAddr').value;
		//document.getElementById('feedBackajaxbox').contentarea.innerHTML="";	
		createSR(postString);
		//Added Function call by B51504:START
		onClickDisable();
		//Added Function call by B51504:END
	

		
	}
	}
	}


	function scrollUp(){
		var textareaelem = document.getElementById('usercomments');
		textareaelem.scrollTop=textareaelem.scrollTop-15;
		return false;
	}

function scrollDown(){
	var textareaelem = document.getElementById('usercomments');
	textareaelem.scrollTop=textareaelem.scrollTop+15;
	return false;
}

function txt_ara(){

			if(document.getElementById("usercomments").value.length <= 78){
				if(document.getElementById("usercomments").value.length == 78){
						document.getElementById("usercomments").value += "\n";
					}
				}
			else{
				var lkm = "";
					if(ijk == 0){
						lkm = parseInt(document.getElementById("usercomments").value.length % 78);
					}
					else{
						lkm = parseInt(document.getElementById("usercomments").value.length % 78);
					}
					if(lkm == 0){
					ijk = 1;
					document.getElementById("usercomments").value += "\n";
					}
				}
			
	return true;
	} 

	function checkSpaces(inp){	  
	  var tmp = "";
	  var l = inp.value.length;
	  for (index = 0; index < l; index++){
		if (inp.value.charAt(index) != ' '){
		  tmp += inp.value.charAt(index);
		}
		else{
		  if (tmp.length > 0){
			if (inp.value.charAt(index+1) != ' ' && index != (l-1)){
			  tmp += inp.value.charAt(index);
			}
		  }
		}
	  }
		if (inp.value.charAt(0) == ' ' && inp.value.length == 1) tmp = '';
			return tmp;
	}


	function check(){
		return true;
	}

	//Trimming left and right char from the string and whatever the delimiter

	function trim(str, chars) {
		return ltrim(rtrim(str, chars), chars);
	}

	function ltrim(str, chars) {
		chars = chars || "\\s";
		return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
	}

	function rtrim(str, chars) {
		chars = chars || "\\s";
		return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
	}

	function showErrorMsg(){

		alert("Your feedback was not saved due to a system error. Please try again later.");
	
	}

	function showErrorBlock(){
	openErrorMsgBlock('', '', '','','450','300','');
	}


function prehideBlock(){

		var radioCheck=0;
		var commentCheck=0;
		var questCount;
		//Added If condition by B51504:START
		if(document.getElementById('questionCount') != null) {
		questCount=document.getElementById('questionCount').value;
		
		
		for(i=0;i<questCount;i++){
			var answerOption='ans_'+i;
			var answerGroup=document.getElementsByName(answerOption);

			for(j=0;j<answerGroup.length;j++){
				if(answerGroup[j].checked){
					radioCheck=1;
				}
			}
	}
	var textBox=document.getElementById('usercomments');
	var pattern=checkSpaces(textBox);

	if(pattern!='' || radioCheck==1  ){
		var reply=confirm("Are you sure you want to close this window?");
		if(reply){
			hideBlock();
		}
	}
	else{
		hideBlock();
	} 
	}else{
		closeThankYou();
	} 
	//Added If condition by B51504:END
}

function call_feedbackMetrics(action){
	if (window.submit_feedback_metrics && action!= 'undefined' ){
		
		submit_feedback_metrics(action);
	}
}

//Added Function by B51504 to disable Submit button:START
function onClickDisable() {
var lang_cd= document.getElementById('lang_cd').value;
//alert(lang_cd);
var path = "/servicerequest/images/submit_disabled" 
if(lang_cd =="en") {
	path = path + ".png";
}
else {
	path = path +"_" + lang_cd + ".png";
}
document.getElementById("submitButton").src = path;
document.getElementById("submitButton").removeAttribute("onclick");
document.getElementById("submitButton").removeAttribute("style");
}
//Added Function by B51504 to disable Submit button:END
