var receiveReq;
		
		
	
 	  function popUp()
	  {   
	    
		window.open('/webapp/shared/LiveWebChat/PreLiveWebChat.jsp','_blank','width=580,height=580,toolbar=no,status=no,scrollbars=no,location=no,menubar=no,directories=no,resizable=yes');
	  	  //window.open(); 
	  }
        
		 function showParamExtensions(_button)
      {
        var paramTableDisplay = document.getElementById("tableParam");
        if(_button.id == "bShow")
        {
          paramTableDisplay.style.display = "";
          _button.id="bHide";
          _button.innerHTML="&lt;&lt;"
          window.resizeBy(paramTableDisplay.offsetWidth, 0)
        }
        else
        {
          paramTableDisplay.style.display = "none";
          _button.id="bShow";
          _button.innerHTML="&gt;&gt;"
          window.resizeTo(575, 600)
        }
      }
      
    function cookieCheck()
    { 
      _SetCookie('AreCookiesEnabled',1);
      if (!_GetCookie('AreCookiesEnabled'))  
      {
        document.forms[0].chatButton.disabled = true;
        document.getElementById("tdErrorMsg").style.display = "";
        return false;
      }
      return true;
    }
    
     function _SetCookie(sName, sValue)
     {
       date = new Date();
       document.cookie = sName + "=" + escape(sValue) + "; expires=Fri, 31 Dec 2099 23:59:59 GMT;";
     }
  
     function _GetCookie(sName)
     {
       var aCookie = document.cookie.split("; ");
       for (var i=0; i < aCookie.length; i++)
       {
         var _cookieName = aCookie[i].split("=");
         if (sName == _cookieName[0])
         { 
           document.cookie = sName + "=; expires=Fri, 21 Dec 1976 04:31:24 GMT;";
           return true;
         }
       }
       return false;
     }
	 
	  var businessHourWindow = null;

      function isIE()
      {
	  var bool=navigator.userAgent.toLowerCase().indexOf("msie") != -1;
	  if(!bool){
	  bool=!!navigator.userAgent.match(/Trident\/7\./);
	  }
        return bool;
      }

      function isSafari()
      {
        return (navigator.userAgent.toLowerCase().indexOf("safari") != -1);
      }

      function isNetscape()
      {
        return (navigator.userAgent.toLowerCase().indexOf("netscape") != -1);
      }
	  
	  // Added by B14833 for CR 45886 29-Nov-12 Start
	  function isChrome()
      {
        return (navigator.userAgent.toLowerCase().indexOf("chrome") != -1);
      }
	  // Added by B14833 for CR 45886 29-Nov-12 End
	  
      /*window.onload = init;
      
      function init()
      {
        cookieCheck();
        if (isNetscape())
        {
          document.forms[0].action = "jar:http://service2.contactondemand.com/TAW/light/chat/secure.jar!/light/chat/chat_page.jsp";
        }
      }*/
      
      function ShowCompanyHoursPopup()
      {
        businessHourWindow = window.open("https://service2.contactondemand.com/TAW/AdministrationManager/company_hours_popup.jsp?companyId=70931&languageId=1&time=" + (new Date()).getTime(), null, "width=180,height=218,menubar=no");
      }

      function closedBusWin()
      {
        if (businessHourWindow != null && !businessHourWindow.closed)
        {
          businessHourWindow.close();
        }
      }
       

	   function encode_utf8( s )
		{
			//alert("inside encode function");
			return unescape( encodeURIComponent( s ) );
		}

function validate()     

      { 
	 
	   			
        if (document.forms.PreChatInfo.firstName.value.match(/^$|^\s+$/) || document.forms.PreChatInfo.firstName.value == "" )
        {
          alert("The field 'First Name' is required.");
          document.getElementById("firstName").focus();
          return false;
        }
			
        if (document.forms.PreChatInfo.lastName.value.match(/^$|^\s+$/) || document.forms.PreChatInfo.lastName.value == "")
        {
          alert("The field 'Last Name' is required.");
          document.getElementById("lastName").focus();  
          return false;
        }

        if (document.forms.PreChatInfo.email.value.match(/^$|^\s+$/) || document.forms.PreChatInfo.email.value == "")
        {
          alert("The field 'Email Address' is required.");
          document.getElementById("email").focus();
          return false;
        }
		
		if ( document.getElementById('topic_id').value  == "")
        {
          alert("The field 'Topic' is required.");
          document.getElementById("topic_id").focus();
          return false;
        }
		//Modified by b17090 for CR41364 on 17th Oct 2011 START
		if ( document.getElementById('countryName').value  == "")
        {
          alert("The field 'country' is required.");
          document.getElementById("countryName").focus();
          return false;
        }
 		
		var SelectedIndex=document.getElementById('countryName').selectedIndex;
		var ID = document.getElementById('countryName').options[document.getElementById('countryName').selectedIndex].id;
		 if(ID=='Y')
	 {
		alert("Due to United States Federal Trade Restrictions, we are unable to provide any technical or sales assistance to the country you have selected. Thank you.");
		window.close();
	}
		//Modified by b17090 for CR41364 on 17th Oct 2011 END
    
		   if (document.forms.PreChatInfo.email.value !="")
        {
    
			var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			var address = document.forms.PreChatInfo.email.value;
			
			if(reg.test(address) == false) 
			{
				alert('Invalid Email Address');
				return false;
			}
		}
		
        if (!checkFieldChars(document.forms.PreChatInfo.firstName.value))
        {
          return false;
        }
        
        if (!checkFieldChars(document.forms.PreChatInfo.lastName.value))
        {
          return false; 
        } 
		//alert('before entering getProjectId');
		getProjectId();	
		//alert("project id is "+document.forms.PreChatInfo.project_Id.value);
		//Added by b31782 for CCT81279 start:23rd may 2011
		///	alert("name is "+document.forms.PreChatInfo.firstName.value);

		var fname= document.forms.PreChatInfo.firstName.value;
		var lname = document.forms.PreChatInfo.lastName.value;
		var encFname = encode_utf8(fname);
		var encLname = encode_utf8(lname);   
		//alert("Fname is enc  "+encFname);
		//alert("Lname is enc  "+encLname);
		
		//alert(encodeURIComponent(document.getElementById('countryName').options[document.getElementById('countryName').selectedIndex].text));
		 
		//Added by b31782 for CCT81279 End:23rd may 2011
				
		
		createCookie('email',encodeURIComponent(document.forms.PreChatInfo.email.value),7);
		createCookie('chatTopic',encodeURIComponent(document.getElementById('topic_id').value),7);
		createCookie('sr_team',encodeURIComponent(document.forms.PreChatInfo.sr_team_id.value),7);
		
		
		// Added by B14833 for CR 45886 29-Nov-12 Start
		// Checking browser
		if (isIE()) {
			document.forms[0].isIE.value = isIE();
		}
		
		if(isChrome()) {
			document.forms[0].isChrome.value = isChrome();
		}
        
		var tempAction = document.forms.PreChatInfo.action;
		
		if(isIE() || isChrome()){
			document.forms.PreChatInfo.action = "/webapp/shared/LiveWebChat/LiveChat_UTF_IE.jsp";
			document.forms.PreChatInfo.target = "transFrame";
			document.forms.PreChatInfo.submit();
			//set cookies with expires entry
			createCookie('firstName',encodeURIComponent(encFname),7);
			createCookie('lastName',encodeURIComponent(encLname),7);
			createCookie('project_Id',document.forms.PreChatInfo.project_Id.value,7);
			createCookie('countryCode',encodeURIComponent(document.getElementById('countryName').options[document.getElementById('countryName').selectedIndex].text),7);
			
		}else{
		createCookie('firstName',encodeURIComponent(encFname),7);
		createCookie('lastName',encodeURIComponent(encLname),7);
		createCookie('project_Id',document.forms.PreChatInfo.project_Id.value,7);
		createCookie('countryCode',encodeURIComponent(document.getElementById('countryName').options[document.getElementById('countryName').selectedIndex].text),7);
		}
		document.forms.PreChatInfo.action = tempAction;
		document.forms.PreChatInfo.target = "";
		document.forms.PreChatInfo.submit();
		// Added by B14833 for CR 45886 29-Nov-12 END
		
      }
      
	  
	  function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
  
      function checkFieldChars(sFieldValue)
      {
        if (  sFieldValue.indexOf("&") != -1  ||
              sFieldValue.indexOf("+") != -1  ||  
              sFieldValue.indexOf("%") != -1  ||
              sFieldValue.indexOf("#") != -1  ||
              sFieldValue.indexOf("\\") != -1 ||
              sFieldValue.indexOf("\"") != -1
        )
        {
          alert("The fields 'First Name' and 'Last Name' cannot contain any of the following characters:\n \\ & + %  \" #")
          return false;
        }
        return true; 
      }
	  
	 


function closePreChatPopup() {
	
	
	//closeChat();
	window.close();
	
	
}
