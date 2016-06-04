var id = null;
var delayTime = 100;
function checkTextareaLimit(aform, aTextArea, limit)
{
	/*added by b12874 for WOW-Online Feedback on 1/11/20008 START*/
if(document.forms["" + aform +""]!=null && document.forms["" + aform +""].elements["" + aTextArea + ""]!=null){
	/*added by b12874 for WOW-Online Feedback on 1/11/20008 END*/

	var s = document.forms["" + aform +""].elements["" + aTextArea + ""].value;
	numChars = document.forms["" + aform +""].elements["" + aTextArea + ""].value.length;
	var temp =null;
	if (numChars >= limit) {
		//alert ("Please limit your typing to fewer than "+limit+" characters.");
		var message=getTranslatedText("Please limit your typing to fewer than ")+limit+getTranslatedText(" characters.");
		alert(message);
		s = s.substring(0,limit-1);
		document.forms["" + aform +""].elements["" + aTextArea + ""].value = s;		
		return false;
	}
	else {	
		if(navigator.appName.indexOf("Microsoft Internet Explorer") != -1){ 
			temp = "checkTextareaLimit('" + aform + "', '" + aTextArea + "'," + limit + ")";
			id = setTimeout(temp, delayTime);
		}
		return true;
	}
}
	

}

function stopTextCheck(){
	clearTimeout(id);
	id = null;
}


//Added by b16682 for Unicode CCT on 26th Feb 2009 : start
function checkTextareaByteLimit(aform, aTextArea, limit ,byteLimit)
{

	var s = document.forms["" + aform +""].elements["" + aTextArea + ""].value;
	numChars = document.forms["" + aform +""].elements["" + aTextArea + ""].value.length;
	encodeTextArea = encodeURIComponent(s);
	numBytes = encodeTextArea.replace(/%../g, 'x').length;
	countNewLine = s.split(/\n/g).length - 1;
	numBytes = numBytes + countNewLine;
	var temp =null;
	if (numChars >= limit) {
		//alert ("Please limit your typing to fewer than "+limit+" characters.");
		var message=getTranslatedText("Please limit your typing to fewer than ")+limit+getTranslatedText(" characters.");
		alert(message);
		s = s.substring(0,limit-1);
		document.forms["" + aform +""].elements["" + aTextArea + ""].value = s;		
		return false;
	}
	else if (numBytes >= byteLimit)	{
		//alert ("Please limit your typing to fewer than "+byteLimit+" bytes.");
		var message=getTranslatedText("Please limit your typing to fewer than ")+byteLimit+getTranslatedText(" bytes.");
		alert(message);
		//This can take some time.
		while(numBytes >= byteLimit) {
			s = s.substring(0,s.length -1);
			encodeTextArea = encodeURIComponent(s);
			numBytes = encodeTextArea.replace(/%../g,'x').length;
			numBytes = numBytes + countNewLine;
		}
		document.forms["" + aform +""].elements["" + aTextArea + ""].value = decodeURIComponent(encodeTextArea);
		return false;
	}
	else {	
		if(navigator.appName.indexOf("Microsoft Internet Explorer") != -1){ 
			temp = "checkTextareaLimit('" + aform + "', '" + aTextArea + "'," + limit + ")";
			id = setTimeout(temp, delayTime);
		}
		return true;
	}
	

}
//Added by b16682 for Unicode CCT on 26th Feb 2009 : End