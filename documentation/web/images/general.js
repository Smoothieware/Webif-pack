function selectThis(aField) {
	aField.focus()
	//aField.select()
}

function isEmpty(aString) {
	str = aString.replace(/\s/g, "");
	if(str.length == 0) return true;
	else return false;
}

//remove leading or trailing spaces
function trimAll(astring) {
	astring = astring.replace(/(^\s*)|(\s*$)/gi,"");
	astring = astring.replace(/\n /,"\n");
	return astring;
}
function showpopup(url){
	var applicationContext = "/webapp";
			var langCd = document.getElementById("lang_cd").value;
			if(langCd && langCd !='en'  && langCd !='EN') {
				applicationContext = applicationContext.replace("/webapp","/"+langCd+"/webapp");
			}
	var a=applicationContext+'/sps/site/driverParts.sp?original='+url+'&method=renderDrivers';
	
	 window.open(a,"_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=300, width=800, height=500,top=150"); 
}

function trim(aString) {
	spaceChar = "\n\t\r ";
	startCounter = 0;
	for(i = 0; i < aString.length; i++) {
		if(spaceChar.indexOf(aString.charAt(i)) >= 0) startCounter++;
		else break;
	}
	startIndex = startCounter;
	endCounter = 0;
	for(i = aString.length - 1; i >= 0; i--) {
		if(spaceChar.indexOf(aString.charAt(i)) >= 0) endCounter++;
		else break;
	}
	endIndex = aString.length - endCounter;
	if(endIndex < startIndex) return "";
	else return aString.substring(startIndex, endIndex);
}

function validatePhoneFax(phoneFaxNum)
{	
	var trimedPhoneFaxNum = trim(phoneFaxNum);
	
	var spaceFlag=0;
	if (trimedPhoneFaxNum.length >= 1 && trimedPhoneFaxNum.charAt(0) == '+')
	{
		if (trimedPhoneFaxNum.length >= 2 && trimedPhoneFaxNum.charAt(1) == '1')
		{
			trimedPhoneFaxNum = trimedPhoneFaxNum.substr(2);
		}else {
			return true;
		}
	}
	var phoneFaxNumLen = trimedPhoneFaxNum.length;
	
	if ( trimedPhoneFaxNum.charAt(5) == ' ')
	{
		spaceFlag = 1;
	}
	
	if (phoneFaxNumLen <13)
	{
		return false;
	}
	
	if (trimedPhoneFaxNum.charAt(0) != '(')
	{
		return false;
	}
	if (trimedPhoneFaxNum.charAt(4) != ')')
	{
		return true;
	}
	if (trimedPhoneFaxNum.charAt(1) < '0' || trimedPhoneFaxNum.charAt(1) > '9')
	{
		return false;
	}
	if (trimedPhoneFaxNum.charAt(2) < '0' || trimedPhoneFaxNum.charAt(2) > '9')
	{
		return false;
	}
	if (trimedPhoneFaxNum.charAt(3) < '0' || trimedPhoneFaxNum.charAt(3) > '9')
	{
		return false;
	}
	 
	if (trimedPhoneFaxNum.charAt(5+spaceFlag) < '0' || trimedPhoneFaxNum.charAt(5+spaceFlag) > '9')
	{
		return false;
	}
	if (trimedPhoneFaxNum.charAt(6+spaceFlag) < '0' || trimedPhoneFaxNum.charAt(6+spaceFlag) > '9')
	{
		return false;
	}
	if (trimedPhoneFaxNum.charAt(7+spaceFlag) < '0' || trimedPhoneFaxNum.charAt(7+spaceFlag) > '9')
	{
		return false;
	}
	if (trimedPhoneFaxNum.charAt(8+spaceFlag) != '-')
	{
		return false;
	}
	if (trimedPhoneFaxNum.charAt(9+spaceFlag) < '0' || trimedPhoneFaxNum.charAt(9+spaceFlag) > '9')
	{
		return false;
	}
	if (trimedPhoneFaxNum.charAt(10+spaceFlag) < '0' || trimedPhoneFaxNum.charAt(10+spaceFlag) > '9')
	{
		return false;
	}
	if (trimedPhoneFaxNum.charAt(11+spaceFlag) < '0' || trimedPhoneFaxNum.charAt(11+spaceFlag) > '9')
	{
		return false;
	}
	if (trimedPhoneFaxNum.charAt(12+spaceFlag) < '0' || trimedPhoneFaxNum.charAt(12+spaceFlag) > '9')
	{
		return false;
	}
	
	if (trimedPhoneFaxNum.charAt(13+spaceFlag) == ' ')
	{
		spaceFlag += 1;
	}
	if (phoneFaxNumLen > 13 +spaceFlag)
	{
		if ( trimedPhoneFaxNum.charAt(13+spaceFlag) != 'x')
		{
			return false;
		}
		for ( i = 13+spaceFlag +1; i < phoneFaxNumLen; i++)
		{
			if (trimedPhoneFaxNum.charAt(i) < '0' || trimedPhoneFaxNum.charAt(i) > '9')
			{
				return false;
			}
		} 
	}
	return true;
}

function formatPhoneFaxNum(phoneFaxNum)
{
	var trimedPhoneFaxNum = trim(phoneFaxNum);
	var newPhoneFaxNum = trimedPhoneFaxNum;
	var firstSpaceFlag = false;
	var secondSpaceFlag = false;	
	
	if (trimedPhoneFaxNum.charAt(0) == '+')
	{
		if (trimedPhoneFaxNum.charAt(1) == '1')
		{
			if (trimedPhoneFaxNum.charAt(7) == ' ')
			{
				firstSpaceFlag = true;
			}
			if (firstSpaceFlag == false && trimedPhoneFaxNum.charAt(15) != ' ')
			{
				newPhoneFaxNum = trimedPhoneFaxNum.substr (0,15) +' ' + trimedPhoneFaxNum.substr (15);
			} else if (firstSpaceFlag == true && trimedPhoneFaxNum.charAt(17) != ' ')
			{
				newPhoneFaxNum = trimedPhoneFaxNum.substr (0,16) +' ' + trimedPhoneFaxNum.substr (16);
			}
						
			if (trimedPhoneFaxNum.charAt(7) != ' ')
			{
				newPhoneFaxNum = newPhoneFaxNum.substr (0,7) +' ' + newPhoneFaxNum.substr (7);
			}
			return newPhoneFaxNum;
		}else {
			return trimedPhoneFaxNum;
		}
	}
		
	if (trimedPhoneFaxNum.charAt(5) == ' ')
	{
		firstSpaceFlag = true;
	}
	if (firstSpaceFlag == false && trimedPhoneFaxNum.charAt(13) != ' ')
	{
		newPhoneFaxNum = trimedPhoneFaxNum.substr (0,13) +' ' + trimedPhoneFaxNum.substr (13);
	} else if (firstSpaceFlag == true && trimedPhoneFaxNum.charAt(14) != ' ')
	{
		newPhoneFaxNum = trimedPhoneFaxNum.substr (0,14) +' ' + trimedPhoneFaxNum.substr (14);
	}

	if (trimedPhoneFaxNum.charAt(5) != ' ')
	{
		newPhoneFaxNum = newPhoneFaxNum.substr (0,5) +' ' + newPhoneFaxNum.substr (5);
	}
	return newPhoneFaxNum;
}
	
// Attempts to prevent a user from double clicking a submit button
submitClicked = false;
function checkSubmitClicked() {
	if(submitClicked) {
		return confirm(getTranslatedText("The form has already been submitted, click OK to resubmit"));
	} else {
		submitClicked = true;
		return true;
	}
}
		
// checkDate Function (Year, Month Day)
// Purpose:  To validate a date is y2k compliant and a valid date
//
// Parameters :  Year  - a 4 digit numeric value
// 		 Month - a 2 digit numeric value start with 0 (January) - 11 (December)
//		 Day   - a 2 digit numeric value from 01 - 31.

function checkDate(Year, Month, Day) {

	maxDay = 31;
	if(Month == "4" || Month == "6" || Month == "9" || Month == "11")  // April, June, September, November
		maxDay = 30;
	else
		if ( Month == "2")  //February Checks
		{
			if (Year % 4 > 0)
				maxDay = 28;
			else if (Year % 100 == 0 && Year % 400 > 0)
				maxDay = 28;
			else
				maxDay = 29;
		}

	if(Month.length == 0 || Day.length == 0 || Year.length == 0)
		return false;
	else if (Day <= maxDay)
		return true;
	else
		return false;
}

// method that removes any non-numeric characters from the given string
function stripNonNumerics(str) {
	return str.replace(/\D/g, "");
}

function validatePhone(phoneNumber) {
	var phone = trim(phoneNumber);
	if(phone.length >= 1 && phone.charAt(0) == '+') {
		if(phone.length >= 2 && phone.charAt(1) == '1') return false;
	} else {
		phone = phone.replace(/\D/g, "");
		if(phone.length < 10) return false;
	}
	return true;
}

function isValidEmailAddress(emailAddress) {
	var mailStr = trim(emailAddress);
	var atIndex = mailStr.indexOf('@');
	var dotIndex = mailStr.lastIndexOf('.');
	var spIndex = mailStr.indexOf(' ');
	var lastIndex = mailStr.length-1;
	if ((atIndex < 1) || (dotIndex-atIndex < 2) || (lastIndex-dotIndex < 2) || (spIndex > 0))
		return false;
	else
		return true;
}

function isMotorolian(email)
{
	var startOfDomain;
	var domain = "";
	var periodIndex = email.lastIndexOf(".");
	var emailWithOutSuffix  = email.substring (0, periodIndex);
	
	var atIndex = email.lastIndexOf ("@");
	periodIndex = emailWithOutSuffix.lastIndexOf(".");
	
	if (atIndex == -1)
	{
		return false;
	}

	if (periodIndex > atIndex) {
		domain = emailWithOutSuffix.substring (periodIndex + 1);
	}else {
		domain = emailWithOutSuffix.substring(atIndex +1);
	}


	if (domain != null)
	{
		domain = domain.toLowerCase();
	}
	//changed for Registration Enhancement Phase-I by R9123Z - START
	//checking for domain as "freescale", earlier it was "motorola" and "mot"
	if (domain.toLowerCase() == "freescale" )
	{
	//changed for Registration Enhancement Phase-I by R9123Z - END
		return true;
	}else
	{
		return false;
	}
}


function submit(a,url) {
if (a==1) {
	if(document.header.qt.value == 'Search') {

		document.header.qt.value ='';
	}
	document.header.action =url;
}
if (a==2) {

		var input = document.header.qt2.value;
		var alertDisplay='';

		if(input.length < 3){
			alertDisplay+= getTranslatedText('Input must be at least 3 characters long.')+"\n";
		}

		

		if(alertDisplay!=''){
			alert(alertDisplay);
			document.header.qt2.focus();
			document.header.qt2.select();
			return;
		}
/*
	if(document.header.qt2.value == 'Contains') {
       		document.header.PART_NUMBER.value = '';
	}else {
	   document.header.PART_NUMBER.value = document.header.qt2.value;
    }*/

	document.header.action = url ;
}
document.header.method = "POST";
document.header.submit();
}


//added by r9187z
function setNextUrl(nextUrl){
	window.location.href=nextUrl;
}

// Added by RF209Z for CCT24483 Start on  5 Jan 2006
// Function tests if supplied String contains valid
// Western characters i.e. ASCII 33 to 127
function validateWestChar(str){
	if (!isEmpty(trim(str))) {
		for (var i =0 ; i< str.length ; i++) {
			var code = str.charCodeAt(i);
			if ((code < 32) || (code > 126)) {
				return false;
			}
		}
	}
	return true;
}
// Added by RF209Z for CCT24483 End on  5 Jan 2006

//Added by B05530 for CCT34246 on 23rd August 2006
function validateWestCharWithEnter(str){
	if (!isEmpty(trim(str))) {
		for (var i =0 ; i< str.length ; i++) {
			var code = str.charCodeAt(i);
			if ( (code != 13) && (code != 10) ){
				if ((code < 32) || (code > 126)) {
					return false;
				}
			}
		}
	}
	return true;
}
//Added by B05530 for CCT34246 on 23rd August 2006

//Added by b05538 for CCT39799 start on 29-Mar-2007
function createSelectBox(country,state,formName,defaultDisplayText,selectedState) {

   	var stateCodeList = new Array();  //for storing the State Codes
	var stateList = new Array();      //for storing the Name of States
	var selectIndex = 0;

	state.options.length = 0;     /* delete all existing array options */

	/* create array of sub types */
	
	var selectedCountry = country.options[country.selectedIndex].value;

	var foundState = "NO"; 
    //creating a 3-D array having the country code, its state code and the name of state.
	for(i=0 ; i < countryState.length ; i++){

		switch(selectedCountry) {
			case countryState[i][0] :            
			stateList[0]=defaultDisplayText;
			for(j=1;j < countryState[i].length;j++){
				stateCodeList [j] = countryState[i][j][0]; 
				stateList[j] = countryState[i][j][1];
			}
			foundState ="YES";
            break;
            default:
			stateList[0] = defaultDisplayText;
            break;
		}
		if( foundState =="YES") break;
	}
	stateList[0] = defaultDisplayText;
	
	if ( stateList.length <= 1 ) 
		state.disabled = true;
	else 
		state.disabled = false;
	/* copy array into list box */
    for (var i=0; i < stateList.length; i++){
       		if (stateList[i] == defaultDisplayText) {
                  var new_option = new Option(stateList[i], "");			
            } 
			else {
                  var new_option = new Option(stateList[i], stateCodeList[i]);
            }
		  state.options[i] = new_option;
		  // To display the state if any selected as default
		  if (selectedState != null && selectedState != "" && selectedState == state.options[i].value )
			  selectIndex = i;
     }
	   /* set default to first item */
       state.selectedIndex = selectIndex;
	   return; 
}


//Added by b30255 for Freescale Mobile project on 2nd Nov 2011

function createSelectBoxForMobile(country,state,formName,defaultDisplayText,selectedState,stateListId) {
//alert("createSelectBoxForMobile called "+stateListId);
   	var stateCodeList = new Array();
	var stateList = new Array();
	var selectIndex = 0;
	state.options.length = 0;
	var selectedCountry = country.options[country.selectedIndex].value;
	var foundState = "NO"; 
   
	for(i=0 ; i < countryState.length ; i++){

		switch(selectedCountry) {
			case countryState[i][0] :            
			stateList[0]=defaultDisplayText;
			for(j=1;j < countryState[i].length;j++){
				stateCodeList [j] = countryState[i][j][0]; 
				stateList[j] = countryState[i][j][1];
			}
			foundState ="YES";
            break;
            default:
			stateList[0] = defaultDisplayText;
            break;
		}
		if( foundState =="YES") break;
	}
	stateList[0] = defaultDisplayText;
	
	
	
	if(stateListId=="ADDR_BILL_STATE"){
	//alert("stateList.length  "+stateList.length);
		 document.getElementById("billstatecountvalue").value=stateList.length;
	}
	if(stateListId=="ADDR_SHIP_STATE"){
	//alert("stateList.length  "+stateList.length);
		 document.getElementById("shipstatecountvalue").value=stateList.length;
	}	
    for (var i=0; i < stateList.length; i++){
       		if (stateList[i] == defaultDisplayText) {
                  var new_option = new Option(stateList[i], "");			
            } 
			else {
                  var new_option = new Option(stateList[i], stateCodeList[i]);
            }
		  state.options[i] = new_option;
		  // To display the state if any selected as default
		  if (selectedState != null && selectedState != "" && selectedState == state.options[i].value )
			  selectIndex = i;
     }
	  
       state.selectedIndex = selectIndex;
	   return; 
}
//Added by b30255 for Freescale Mobile project on 2nd Nov 2011 end


//Added by b05538 for CCT39799 end on 29-Mar-2007
function ResetForm(ele){
	var which = getForm(ele);
	var first=-1;
	if(which!=null){
		if (document.images){
			for (i=0;i<which.length;i++){
				var tempobj=which.elements[i];
				if (tempobj.type=="text"){
					eval(tempobj.value="");
					if (first==-1) {first=i;}
				}
				else if (tempobj.type=="checkbox") {
					eval(tempobj.checked=0);
				if (first==-1) {first=i;}
				}
				else if (tempobj.col!="") {
				eval(tempobj.value="");
					if (first==-1) {first=i;}
				}
			}
		}
		//which.elements[first].focus();
	}
	
	return false;
}
function getForm(ele){
	var elem = ele;
	var formsall = document.getElementsByTagName("form");
	for(i in formsall){
		ele = elem;
		while(formsall[i].name!=null && formsall[i].name!='undefined' && ele.parentNode!=null && ele.parentNode!='undefined'){
			if(ele.parentNode==formsall[i]){
				return formsall[i];
			}
			ele = ele.parentNode;
		}
	}
 }
 //Added by B25319 for CR-58164 on 11-Nov-2014 Start
 /*
 * creates a new XMLHttpRequest object which is the backbone of AJAX,
 * or returns false if the browser doesn't support it
 */
function getXMLHttpRequest() {
  var xmlHttpReq = false;
  // to create XMLHttpRequest object in non-Microsoft browsers
  if (window.XMLHttpRequest) {
    xmlHttpReq = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      // to create XMLHttpRequest object in later versions
      // of Internet Explorer
      xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (exp1) {
      try {
        // to create XMLHttpRequest object in older versions
        // of Internet Explorer
        xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (exp2) {
        xmlHttpReq = false;
      }
    }
  }
  return xmlHttpReq;
}
/*
 * AJAX call starts with this function
 */
function makeRequest(optyUrl) {
  //alert("In Make Request:::::");
  var xmlHttpRequest = getXMLHttpRequest();
  xmlHttpRequest.onreadystatechange = getUpdatedOptyStatus(xmlHttpRequest);
  xmlHttpRequest.open("POST", optyUrl, true);
  xmlHttpRequest.setRequestHeader("Content-Type",
      "application/x-www-form-urlencoded");
  
  xmlHttpRequest.send(optyUrl);
   //xmlHttpRequest.send(null);
}
 
/*
 * Returns a function that waits for the state change in XMLHttpRequest
 */
function getUpdatedOptyStatus(xmlHttpRequest) {
 
  // an anonymous function returned
  // it listens to the XMLHttpRequest instance
  return function() {
    if (xmlHttpRequest.readyState == 4) {
      if (xmlHttpRequest.status == 200) {
    	 
    	  if(trimAll(xmlHttpRequest.responseText) == "SUCCESS"){
    		  document.getElementById("optyStatus").value = 1;
    		  document.getElementById("optyNo").value = document.getElementById("optyNo").value;
    	  }
    	  if(trimAll(xmlHttpRequest.responseText) == "FAIL"){
    		  document.getElementById("optyStatus").value = 0;
    		  document.getElementById("optyNo").style.color = "#FF0000";
    		  document.getElementById("optyNo").value = document.getElementById("optyNo").value;
    	  }
    	  
        
      } else {
        document.getElementById("optyStatus").value = 0;
      }
    }
  };
}
 //Added by B25319 for CR-58164 on 11-Nov-2014 End