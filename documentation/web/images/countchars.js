var id = null;
var delayTime = 100;
function countChar(aform, aTextArea, aCountBox){
	var numChar = null;
	//with(document.forms["" + aform + ""]) {
		if (navigator.appName.indexOf("Netscape") != -1) {
	/* Modified by b12874 for Online Feedback - WOW on 20-10-2008 START*/

			if(document.forms["" + aform + ""]!=null && document.forms["" + aform + ""].elements["" + aTextArea + ""]!=null)
			document.forms["" + aform + ""].elements["" + aTextArea + ""].blur();
		}
		if(document.forms["" + aform + ""]!=null && document.forms["" + aform + ""].elements["" + aTextArea + ""]!=null)
		numChar = document.forms["" + aform + ""].elements["" + aTextArea + ""].value.length;
		
		if(document.forms["" + aform + ""]!=null && document.forms["" + aform + ""].elements["" + aTextArea + ""]!=null)
		document.forms["" + aform + ""].elements["" + aCountBox + ""].value = numChar;
		
		if (navigator.appName.indexOf("Netscape") != -1) {
			if(document.forms["" + aform + ""]!=null && document.forms["" + aform + ""].elements["" + aTextArea + ""]!=null)
	/* Modified by b12874 for Online Feedback - WOW on 20-10-2008 end*/

			document.forms["" + aform + ""].elements["" + aTextArea + ""].focus();
		}
		else {
			startCharCount(aform, aTextArea, aCountBox);
		}
		
	//}
}
//Added by b16682 for Unicode CCT on 26th Feb 2009 : start
function setDelay(aform,aTextArea) {
	var temp = "callDelay('" + aform + "', '" + aTextArea + "')";
	id = setTimeout(temp,delayTime);
}
function callDelay(aform,aTextArea) {
	//do nothing
		if (navigator.appName.indexOf("Netscape") != -1) {
				document.forms["" + aform + ""].elements["" + aTextArea + ""].blur();
				document.forms["" + aform + ""].elements["" + aTextArea + ""].focus();
		}
		else {
			setDelay(aform, aTextArea);
		}
}
//Added by b16682 for Unicode CCT on 26th Feb 2009 : End

function startCharCount(aform, aTextArea, aCountBox){
	var temp = "countChar('" + aform + "', '" + aTextArea + "', '" + aCountBox + "')";
	id = setTimeout(temp, delayTime);
}
function stopCharCount(){
	clearTimeout(id);
	id = null;
}