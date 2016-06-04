//--------------------------------------------------------------
//Modified by r9117z for EPP
	function moreInfo(partNumber, buyNow) {
	  moreInformation(partNumber, buyNow, null);
	}
function moreInformation(partNumber, buyNow, anchor) {
		var leftpos=(screen.width - 900)/2;
		var toppos =(screen.height - 500)/2-100;
		var url = 'search.partparamdetail.framework?PART_NUMBER='+partNumber+'&buyNow='+buyNow+'&fromSearch=true';
		if (anchor != null) {
		  url = url + '#' + anchor;
		}
		top.newWin = window.open(url,'Freescale',
		'left='+leftpos+',top='+toppos+',width=900,height=500,titlebar=yes,'+
		'toolbar=yes,resizable=yes,scrollbars=yes,menubar=yes,status=yes');
		top.newWin.focus();
}
//Modificatin by r9117z ends for EPP
//--------------------------------------------------------------
	function moreInfo2(partNumber, buyNow) {
	  moreInformation2(partNumber, buyNow, null);
	}
function moreInformation2(partNumber, buyNow, anchor) {
		var leftpos=(screen.width - 900)/2;
		var toppos =(screen.height - 500)/2-100;
		//Modified for IPS Enhancement..START
		var applicationContext = "/webapp";
		var langCd = document.getElementById("language_option").value;
		if(langCd && langCd !='en'  && langCd !='EN') {
			applicationContext = applicationContext.replace("/webapp","/"+langCd+"/webapp");
		}
        //Modified by b17087 for CCT74405 start 
		var url = applicationContext+'/search.partparamdetail.framework?PART_NUMBER='+partNumber+'&buyNow='+buyNow+'&fromSearch=true';
		//Modified by b17087 for CCT74405 end 
		//Modified for IPS Enhancement...END
		if (anchor != null) {
		  url = url + '#' + anchor;
		}
		top.newWin = window.open(url,'Freescale',
		'left='+leftpos+',top='+toppos+',width=900,height=500,titlebar=yes,'+
		'toolbar=yes,resizable=yes,scrollbars=yes,menubar=yes,status=yes');
		top.newWin.focus();
}
	
	//Added by b14833 for CR#: 42212 START 3 Jan, 2012
	//--------------------------------------------------------------
    function openReliabilitySearchTool(partNumber) {
		var leftpos = (screen.width - 900)/2;
		var toppos = (screen.height - 500)/2-100;
		var applicationContext = "/webapp";
        var url = applicationContext + '/search.partreliabilityreport.framework?PART_NUMBER=' + partNumber + '&fromSearch=true';
		
		top.newWin = window.open(url,'Freescale',
		'left='+leftpos+',top='+toppos+',width=900,height=500,titlebar=yes,'+
		'toolbar=yes,resizable=yes,scrollbars=yes,menubar=yes,status=yes');
		
		top.newWin.focus();
	}
	//--------------------------------------------------------------
	//Added by b14833 for CR#: 42212 END 3 Jan, 2012
	
	function goToPSP(input, searchType) {
		var a = "<%=GlobalConstants.LOCATION_PRODUCT_SUMMARY_PAGE%>";
		var b = "?code=";
		var c = input;
		document.PartDirect.CODE.value=input;
		document.PartDirect.SEARCHTYPE.value=searchType;
		document.PartDirect.submit();
	}
//--------------------------------------------------------------
	function goToBuyNow(part,searchType,fromPage){

	  window.open('parametric_search/search/shoppingcart_redirect.jsp?partnumber=' + part + '&searchType=' + searchType + '&fromPage=' + fromPage, 'Freescale','location=no,toolbar=no,scrollbars=yes,resizable,width=750,height=500');

	}
//--------------------------------------------------------------
	function goToBuyNow2(part,searchType,fromPage){

	// Modified by window size by B12883 for CR50448 on 18Apr2013
	//window.open('/webapp/parametric_search/search/shoppingcart_redirect.jsp?partnumber=' + part + '&searchType=' + searchType + '&fromPage=' + fromPage, 'Freescale','location=no,toolbar=no,scrollbars=yes,resizable,width=750,height=500');
	//Commented-Cr-52291 // window.open('/webapp/parametric_search/search/shoppingcart_redirect.jsp?partnumber=' + part + '&searchType=' + searchType + '&fromPage=' + fromPage, 'Freescale','location=no,toolbar=no,scrollbars=yes,resizable,width=950,height=500');
	//Added b42233 :Cr-52291 - Start
	var url='/webapp/parametric_search/search/shoppingcart_redirect.jsp?partnumber=' + part + '&searchType=' + searchType + '&fromPage=' + fromPage;
	var langCd=document.getElementById("language_option").value;
		if("en"!==langCd){
			url='/'+langCd+url;
		}
	url=url+'&lang_cd='+langCd;
	// Added if condition for CR56179
	if(document.URL.split("?")[0].indexOf("prod_summary.jsp") != -1) {
		url=url+'&fpsp=1';
	}
	window.open(url, 'Freescale','location=no,toolbar=no,scrollbars=yes,resizable,width=950,height=500');
	//Added b42233 :Cr-52291 -End
	}

//--------------------------------------------------------------
	function goToPartNumberSearch(input) {
		document.PartNumberSearch.CATEGORY.value=input;
		document.PartNumberSearch.submit();
	}
//--------------------------------------------------------------
	function goToPsp(input) {

		var leftpos=(screen.width - 500)/2;
		var toppos =(screen.height - 500)/2-50;
		top.newWin = window.open('http://ebizdev.sps.mot.com:8023/webapp/sps/site/prod_summary.jsp?code=MCF5407&nodeId=018rH3YTLC00M9',
				'PARAMETRIC_SEARCH_PSP',
				'left='+leftpos+',top='+toppos+',width=500,height=500,titlebar=yes,'+
				'toolbar=yes,resizable=yes,scrollbars=yes,menubar=yes,status=yes');
	}
//--------------------------------------------------------------
	function noStar(inputStr) {

		for (i = 0; i < inputStr.length; i++)
		{
			// Check that current character is number.
			var c = inputStr.charAt(i);
			if ( c =="*" ){
				return false;
			}
		}

		return true;

	}
//--------------------------------------------------------------
	function validateForm(a) {
		if (a==1) {
		var input = document.PartNumberSearch.PART_NUMBER.value;
		var alertDisplay='';
		}
		if (a==2) {
		var input = document.ObsoletePartNumberSearch.PART_NUMBER.value;
		var alertDisplay='';
		}
		//alert('input:'+input+' \n length: '+input.length);

		if(input.length < 3){
			alertDisplay+='Input must be at least 3 characters long.\n';
		}

		if(!noStar(input)){
			alertDisplay+='\n';
			alertDisplay+='An asterisk is not allowed in the input. \n';
			alertDisplay+='Use the control to the left of the input for wild card searches.\n';
		}

		if(alertDisplay!=''){
			alert(alertDisplay);
			return false;
		}

		return true;
		//return false;
	}
//--------------------------------------------------------------
	function ResutlsPerPage_TOP() {
		var SelectedIdx = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_TOP.resultSubsetSize.selectedIndex;
		var VAL = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_TOP.resultSubsetSize[SelectedIdx].value;
		document.PART_NUMBER_SEARCH_RESULTS_PAGING.resultSubsetSize.value=VAL;
		document.PART_NUMBER_SEARCH_RESULTS_PAGING.firstResult.value='1';
		document.PART_NUMBER_SEARCH_RESULTS_PAGING.submit();
	}
//--------------------------------------------------------------
	function ResutlsPerPage_BOTTOM() {
		var SelectedIdx = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_BOTTOM.resultSubsetSize.selectedIndex;
		var VAL = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_BOTTOM.resultSubsetSize[SelectedIdx].value;
		document.PART_NUMBER_SEARCH_RESULTS_PAGING.resultSubsetSize.value=VAL;
		document.PART_NUMBER_SEARCH_RESULTS_PAGING.firstResult.value='1';
		document.PART_NUMBER_SEARCH_RESULTS_PAGING.submit();
	}
//--------------------------------------------------------------
	function PageJump(page,resultSubsetSize) {
		document.PART_NUMBER_SEARCH_RESULTS_PAGING.resultSubsetSize.value=resultSubsetSize;
		document.PART_NUMBER_SEARCH_RESULTS_PAGING.firstResult.value=page;
		document.PART_NUMBER_SEARCH_RESULTS_PAGING.submit();
	}
//--------------------------------------------------------------
	function searchHelp() {
		var leftpos=(screen.width - 500)/2;
		var toppos =(screen.height - 300)/2-50;
		top.newWin = window.open('search.part_search_instruction_popup.framework',
					  'PART_SEARCH_INSTRUCTION',
					  'left='+leftpos+',top='+toppos+',width=500,height=300,titlebar=yes,'+
					  'toolbar=no,resizable=yes,scrollbars=yes,menubar=yes,status=yes');
	}
//--------------------------------------------------------------
	function packageDesc(url) {
		var leftpos=(screen.width - 500)/2;
		var toppos =(screen.height - 300)/2-50;
		top.newWin = window.open(url,
		'Freescale',
		'left='+leftpos+',top='+toppos+',width=500,height=300,titlebar=yes,'+
		'toolbar=no,resizable=yes,scrollbars=yes,menubar=yes,status=yes');
	}
//--------------------------------------------------------------
	function addToCart(part,itemType){

		var SEARCH_OPERATOR  = document.PART_NUMBER_SEARCH_RESULTS_PAGING.SEARCH_OPERATOR.value;
		var PART_NUMBER      = document.PART_NUMBER_SEARCH_RESULTS_PAGING.PART_NUMBER.value;
		var firstResult      = document.PART_NUMBER_SEARCH_RESULTS_PAGING.firstResult.value;
		var resultSubsetSize = document.PART_NUMBER_SEARCH_RESULTS_PAGING.resultSubsetSize.value;
		
		var RETURN_URL = escape('search.part_number_search_query.framework?SEARCH_OPERATOR=' + SEARCH_OPERATOR + "&PART_NUMBER=" + PART_NUMBER + "&firstResult=" + firstResult + "&resultSubsetSize=" + resultSubsetSize)
		
		//changed framework call from 'dtdirect.add_item.framework' to 'ecommerce.add_item.framework'..r1330z for ECommerce..START
		//window.location.href='dtdirect.add_item.framework?PART_NUMBER=' + part + '&QUANTITY=1' + '&ITEM_TYPE=' + itemType + '&RETURN_URL=' + RETURN_URL;
		 window.location.href='/webapp/ecommerce.add_item.framework?PART_NUMBER=' + part + '&QUANTITY=1' + '&ITEM_TYPE=' + itemType + '&RETURN_URL=' + RETURN_URL;
		//changed framework call from 'dtdirect.add_item.framework' to 'ecommerce.add_item.framework'..r1330z for ECommerce..END
	}
	//adding returnURL in argument list for IPS..start
	function addToCart2(part,itemType,returnURL){
		
		//var RETURL  = document.PartDirect.RETURL.value;
	    //var RETURN_URL = escape(RETURL);
		var RETURN_URL = returnURL;
		//changed framework call from 'dtdirect.add_item.framework' to 'ecommerce.add_item.framework'..r1330z for ECommerce..START
		//window.location.href='dtdirect.add_item.framework?PART_NUMBER=' + part + '&QUANTITY=1' + '&ITEM_TYPE=' + itemType + '&RETURN_URL=' + RETURN_URL;
		//Commented Cr-52291 // window.location.href='/webapp/ecommerce.add_item.framework?PART_NUMBER=' + part + '&QUANTITY=1' + '&ITEM_TYPE=' + itemType + '&RETURN_URL=' + RETURN_URL;
		//changed framework call from 'dtdirect.add_item.framework' to 'ecommerce.add_item.framework'..r1330z for ECommerce..END
		//Added b42233 :Cr-52291 - Start
		var url='/webapp/ecommerce.add_item.framework?PART_NUMBER=' + part + '&QUANTITY=1' + '&ITEM_TYPE=' + itemType ;
		var langCd=document.getElementById("language_option").value;
		if("en"!==langCd){
			url='/'+langCd+url;
			//RETURN_URL='/'+langCd+RETURN_URL;
		}
		url=url+ '&RETURN_URL=' + RETURN_URL;
		// Added for CR54489
		if(typeof setAddCartLocAnalyticsCookie == 'function') { 
			setAddCartLocAnalyticsCookie();
		}
		window.location.href=url;
		//Added b42233 :Cr-52291 - End
	}
	//adding returnURL in argument list for IPS..end
//--------------------------------------------------------------

// Change for EPP: -- Start
// Function takes all the selected part and transfers them to the 
// calling screen which is SRInit2.jsp
	function goToSubmitForm()
	{	
		var rownum = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_TOP.hdnRowNum.value;
		var pageRowCount = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_TOP.hdnPageRowCount.value;		
		for(var loop=rownum ; loop <= pageRowCount ; loop++)
		{			
			if(document.PART_NUMBER_SEARCH_RESULT_TABLE.elements["selected_parts_"+loop].checked == true)
			{		
				document.PartNumberSearch.hdnSelectedParts.value += document.PART_NUMBER_SEARCH_RESULT_TABLE.elements["selected_parts_"+loop].value + ",";		
			}
		}
		var b = document.PartNumberSearch.hdnSelectedParts.value;
		opener.document.SRInit2.action = "servicerequest.clr_init1_display.framework?reqSelParts="+b;
		opener.document.SRInit2.submit();
		if (opener.document.SRInit2.submit()) {
		}
			setTimeout("self.close()", 100);	
	}

//--------------------------------------------------------------
	// Function modified for EPP specifc changes. Added paging logic to hold the selected
	// Part Numbers
	function PageJumpCRCL(page,resultSubsetSize) {				
		
		var rownum = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_TOP.hdnRowNum.value;
		var pageRowCount = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_TOP.hdnPageRowCount.value;
      var j = 0;
      j = parseInt(rownum);
      var k = 0;
      k = parseInt(pageRowCount);
		for(; j <= k ; j++)
		{					
		   if(document.PART_NUMBER_SEARCH_RESULT_TABLE.elements["selected_parts_"+j].checked == true)
			{			
				document.PartNumberSearch.hdnSelectedParts.value += document.PART_NUMBER_SEARCH_RESULT_TABLE.elements["selected_parts_"+j].value + ",";			
			}

		}		
		document.PartNumberSearch.hdnFirstResult.value = page;		
		document.PartNumberSearch.hdnResultSubsetSize.value = resultSubsetSize;
		document.PartNumberSearch.submit();
	}
//--------------------------------------------------------------

//--------------------------------------------------------------
	function CRCLResutlsPerPage_TOP() {
		var SelectedIdx = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_TOP.resultSubsetSize.selectedIndex;
		var VAL = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_TOP.resultSubsetSize[SelectedIdx].value;
		document.PartNumberSearch.hdnResultSubsetSize.value = VAL;		
		document.PartNumberSearch.hdnFirstResult.value='1';		
		document.PartNumberSearch.submit();
	}
//--------------------------------------------------------------
	function CRCLResutlsPerPage_BOTTOM() {
		var SelectedIdx = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_BOTTOM.resultSubsetSize.selectedIndex;
		var VAL = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_BOTTOM.resultSubsetSize[SelectedIdx].value;
		document.PartNumberSearch.hdnResultSubsetSize.value = VAL;		
		document.PartNumberSearch.hdnFirstResult.value='1';		
		document.PartNumberSearch.submit();
	}
//--------------------------------------------------------------

	function checkMPNValues()
	{		
		var selectedParts = document.PartNumberSearch.hdnSelectedParts.value;		
		
		if(selectedParts != ""){
			myselectedParts = selectedParts.split(",");			
			var rownum = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_TOP.hdnRowNum.value;
			var pageRowCount = document.PART_NUMBER_SEARCH_RESULTS_PAGING_SIZE_TOP.hdnPageRowCount.value;
			var i = 0;
			var k = 0;
			i = parseInt(rownum);
			k = parseInt(pageRowCount);
			var count = 0;
			count = parseInt(myselectedParts.length-1);
			for(var x=0;x<count;x++){				
				var temp = myselectedParts[x];				
				for(var j=i; j <= k ; j++)
				{		
					if(document.PART_NUMBER_SEARCH_RESULT_TABLE.elements["selected_parts_"+j].value == myselectedParts[x])
					{
						document.PART_NUMBER_SEARCH_RESULT_TABLE.elements["selected_parts_"+j].checked = true; 
						break;
					}
				}
			}			
		}  		
	}
// Change for EPP: -- End

//Added by RF211Z for CCT35427 Start Feb 25 2006
function moreInfoStatus2(partNumber, buyNow, url) {
  moreInformationStatus2(partNumber, buyNow, null, url);
}
function moreInformationStatus2(partNumber, buyNow, anchor, urllink) {
		var leftpos=(screen.width - 900)/2;
		var toppos =(screen.height - 500)/2-100;
		var url = urllink + '/search.partparamdetail.framework?PART_NUMBER='+partNumber+'&buyNow='+buyNow+'&fromSearch=true';
		if (anchor != null) {
		  url = url + '#' + anchor;
		}
		top.newWin = window.open(url,'Freescale',
		'left='+leftpos+',top='+toppos+',width=900,height=500,titlebar=yes,'+
		'toolbar=yes,resizable=yes,scrollbars=yes,menubar=yes,status=yes');
		top.newWin.focus();
}
//Added by RF211Z for CCT35427 End Feb 25 2006
//Added by r9115z on 18 Aug 2006 - Start
//Function is invoked for the Status column in the Replacement Part section of the Pop-up
//The page is refreshed to fetch the data for the corresponding Replacement Part Number
function moreInformationStatusForPopUp(partNumber, buyNow, anchor, urllink) {
		
		var url = urllink + '/search.partparamdetail.framework?PART_NUMBER='+partNumber+'&buyNow='+buyNow+'&fromSearch=true';
		if (anchor != null) {
		  url = url + '#' + anchor;
		}		
		document.moreInfo.action = url;
		document.moreInfo.submit();
}
//Added by r9115z on 18 Aug 2006 - End
//Added by b28392 on 27th March 2012 for CR43583:start
function validateReliability_Data_Form(reliabilitysearch){
	var Derated_temp = document.getElementById("select_temp").value;
	var conf_limit = document.getElementById("select_confLmt").value; 
	if((Derated_temp=="") && (conf_limit==""))
	{
		alert("Please Select Derated Temperature and Confidence Limit");
		return false;
	}else if(Derated_temp==""){
		alert("Please Select Derated Temperature");
		return false;
	}else if(conf_limit==""){
		alert("Please Select Confidence Limit");
		return false;
	}else{
		return true;
	}
}
//Added by b28392 on 27th March 2012 for CR43583:end


