function isDTMEnabled(){
	var dtmEnabled = false;
	if(typeof _satellite != 'undefined'){
		dtmEnabled = true;
	}
	return dtmEnabled;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setAdobeCookie(name, value) {
	if(typeof days == "undefined") 
		days = 1;
    var d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    name = "_sc_" + name;
    document.cookie = name + "=" + value + "; expires=" + expires + "; domain=" + getMajorDomain() + "; path=/";
}

function getAdobeCookie(cname) {
	var cookieVal = getCookie("_sc_" + cname);
	if(cookieVal == null)
		cookieVal = "";
	return cookieVal; 
}

function removeAdobeCookie(name){
	var value = "";
    var expires = "Thu, 01 Jan 1970 00:00:00 UTC";
    name = "_sc_" + name;
    document.cookie = name + "=" + value + "; expires=" + expires + "; domain=" + getMajorDomain() + "; path=/";
}


function getMajorDomain(){
	return document.domain.substring(document.domain.indexOf("."));
}

function setParentNodeIdCookie(){
	if(isDTMEnabled()){
		if(typeof digitalData != "undefined" && typeof digitalData.pageInfo != "undefined" && typeof digitalData.pageInfo.nodeID != "undefined" && 
				digitalData.pageInfo.nodeID != ""  && digitalData.pageInfo.nodeID != "undefined"){
			setAdobeCookie('sc_parentNodeId', digitalData.pageInfo.nodeID);
		}						
	}
}

function getPageCategory(){
	if(typeof digitalData == "undefined") return "";
	if(typeof digitalData.pageInfo == "undefined") return "";
	if(typeof digitalData.pageInfo.pageCategory == "undefined") return "";
	return digitalData.pageInfo.pageCategory;
}

function getPageCodeID(){
	if(typeof digitalData == "undefined") return "";
	if(typeof digitalData.pageInfo == "undefined") return "";
	if(typeof digitalData.pageInfo.pageCodeID == "undefined") return "";
	return digitalData.pageInfo.pageCodeID;
}

function setReferrerCookies(){
	setAdobeCookie("referrerPageCategory", getPageCategory());
	setAdobeCookie("referrerPageCode", getPageCodeID());
}

function getContentFindingFromCurrentPage(){
	var pageCategory = getPageCategory(); 
	
	if(pageCategory == "PSP" || pageCategory == "RDSP" || pageCategory == "TSP" || pageCategory == "SSP") 
		return "PSP";	
	if(pageCategory == "ASP") return "ASP";	
	if(pageCategory == "SOFTWARE SEARCH") return "Software Search";
	
	return "";
}

function trackExitLnkForAnalytics(thirdpartyurl, event) {
	if(isDTMEnabled()){
		var subContentFinding = "";
		if(typeof event != "undefined" && event != null){
			$element = $(event.target);
			subContentFinding = getSubContentFinding($element);
			if(typeof subContentFinding == "undefined" || subContentFinding == null)
				subContentFinding = "";
		}		
		
		digitalData.eventInfo = {};
		digitalData.eventInfo.ignoreCookie = true;
		digitalData.eventInfo.name = 'Custom Exit Link';
		digitalData.eventInfo.assetID = thirdpartyurl;
		digitalData.eventInfo.eventPathing = "exit:" + thirdpartyurl;				 
		digitalData.eventInfo.contentFinding = getContentFindingFromCurrentPage();

		digitalData.eventInfo.subContentFinding = subContentFinding;
		_satellite.track("trackExitLnkForAnalytics");
		digitalData.eventInfo.contentFinding=digitalData.eventInfo.eventPathing=digitalData.eventInfo.assetID="";
	}	
}

function getCookieForSiteCatalyst(name){
	var pos=document.cookie.indexOf(name+"=");
	if (pos!=-1){
		var start=pos+name.length+1;
		var end=document.cookie.indexOf(";",start);
		if (end==-1){
			end=document.cookie.length;
		}
		return unescape(document.cookie.substring(start,end));
	}
	return null;
}

function removeLangFromURL(url){
	if(typeof LANG_CD_LIST != 'undefined'){
		var langAnalytics = LANG_CD_LIST.split(",");
		var len = langAnalytics.length;
		for (i=0;i<len;i++){
			var lang = langAnalytics[i];
			url = url.replace("/"+lang+"/","/");
		}
	}
	return url;
}


function getCleanPageURL(){
	pageURL = document.URL;
	pageURL = pageURL.split("?")[0];
	pageURL = pageURL.split("#")[0];
	
	pageURL = removeLangFromURL(pageURL);

	return pageURL;
} 

function replaceCacheUrlDomain(url){
	if(typeof CACHE_URL_DOMAINS != 'undefined' && typeof URL_DOMAIN != 'undefined'){
		var len = CACHE_URL_DOMAINS.length;
		for (i=0;i<len;i++){
			var domain = CACHE_URL_DOMAINS[i];
			url = url.replace(domain, URL_DOMAIN);
		}
	}
	return url;
}

function trackAnalyticsFormStart(formname) {
	if(isDTMEnabled()){
		digitalData.formInfo = {};
		digitalData.formInfo.formName = formname;
		_satellite.track("trackAnalyticsFormStart");
	}	
}

function trackAnalyticsFormCompletion(formname) {
	if(isDTMEnabled()){
		digitalData.formInfo = {};
		digitalData.formInfo.formName = formname;
		_satellite.track("trackAnalyticsFormCompletion");
	}	
}

function trackAnalyticsRegistrationCompletion() {
	if(typeof digitalData != 'undefined' && typeof digitalData.formInfo != 'undefined' && typeof digitalData.formInfo.formName != 'undefined')
		trackAnalyticsFormCompletion(digitalData.formInfo.formName);
}

function trackAnalyticsBlockDiagram(blockDiagUrl,blockDiagTitle) {
	if(isDTMEnabled()){
		var pageNameArr = digitalData.pageInfo.pageName.split(":");
		var currPageName = pageNameArr.length > 1 ? pageNameArr[1]:pageNameArr[0]; 
		currPageName = (currPageName == null || currPageName == '') ? blockDiagTitle:currPageName;  
		
		digitalData.blockDiagramInfo = {};
		digitalData.blockDiagramInfo.pageName = 'Block Diagram:' + currPageName;
		digitalData.blockDiagramInfo.localTitle = 'Block Diagram:' + digitalData.pageInfo.localTitle;
		
		if(blockDiagUrl !=  null && blockDiagUrl != '')
			digitalData.blockDiagramInfo.assetID = blockDiagUrl;
		else if(digitalData.pageInfo.pageURLClean !='undefined')
			digitalData.blockDiagramInfo.assetID = digitalData.pageInfo.pageURLClean;
		else
			digitalData.blockDiagramInfo.assetID = document.URL;
		
		digitalData.blockDiagramInfo.pageType = "Block Diagram";
		digitalData.blockDiagramInfo.pageEventPathing = "D=pageName";			  
		_satellite.track("trackAnalyticsBlockDiagram");
		s.pageName = digitalData.pageInfo.pageName;
		s.prop1 = digitalData.pageInfo.pageType;
		s.prop16 = digitalData.pageInfo.pageEventPathing;
		s.eVar16 = digitalData.pageInfo.assetID;
		s.eVar19 = digitalData.pageInfo.localTitle;
	}	
}

function trackOrderSamplesSearch(srchKeyword,resultcount) {
	digitalData.searchInfo={};
	digitalData.eventInfo={};
	srchKeyword=trimForAnalytics(srchKeyword);
	digitalData.searchInfo.searchkeyword=srchKeyword;
	digitalData.searchInfo.resultCount=resultcount;
	if(digitalData.searchInfo.resultCount =='' || digitalData.searchInfo.resultCount=='0'){
		digitalData.searchInfo.resultCount='zero';
	}
	if(srchKeyword != '') {
		digitalData.eventInfo.pageEventPathing = "Order Samples Search: Results of "+srchKeyword;
	} else {
		digitalData.eventInfo.pageEventPathing = "Order Samples Search: No Keyword";
	}		
	digitalData.eventInfo.name="search";
	_satellite.track("trackOrderSamplesSearch");

	digitalData.pageInfo.contentFinding="";
}

function getDownloadTypeForAnalytics(downloadUrl)
{
	var download_type = '';
	downloadUrl =  downloadUrl.split("?")[0];
	if(downloadUrl.indexOf("webapp/Download") !=-1){
		download_type = "Registered";
	} else if(downloadUrl.indexOf("download/license.jsp") != -1){
		download_type = "Licensed";
	} else if(downloadUrl.indexOf("download/mod_download.jsp") != -1) {
		download_type = "Moderated";
	} else if(downloadUrl.indexOf("download/files/") !=-1 || downloadUrl.indexOf("download/training/") !=-1){
		download_type = "Marketing Leveraged";
	}
	return download_type;
}

function trackSecDwnldCompleteAnalytics(downloadUrl, assetCode, sitePlatform, langCode) {
	if(!isDTMEnabled()) return;

	if(sitePlatform == 'normal') {
		sitePlatform = "full";
	}

	digitalData.dwnldInfo.downloadURLFull = downloadUrl;

	downloadUrl = downloadUrl.split("#")[0];
	downloadUrl = replaceCacheUrlDomain(downloadUrl);

	var download_type_analytics = getDownloadTypeForAnalytics(downloadUrl);

	var uri =  downloadUrl.split("?")[0];
	if(downloadUrl.indexOf('?') != -1)	downloadUrl = uri + '?colCode='+ assetCode;

	digitalData.userInfo.fslVisitorID = getCookieForSiteCatalyst("freescale_visitor_id"); 
	digitalData.siteInfo.sitePlatform = sitePlatform;
	digitalData.siteInfo.lang = langCode;
	digitalData.dwnldInfo.downloadType = download_type_analytics; // Download Type	
	digitalData.dwnldInfo.downloadURLClean = remProtocolFrmUrl(downloadUrl);
	digitalData.pageInfo.pageEventPathing = 'dwnld:'+remProtocolFrmUrl(downloadUrl);  // Event Pathing
	_satellite.track("trackSecDownloadComplete");
} 

function getReffererPageCategory(){
	return getAdobeCookie("referrerPageCategory");
}

function getReffererPageCode(){
	return getAdobeCookie("referrerPageCode");
}

function getContentFinding(referringUrl, currentUrl, isDownload) {
	if(typeof isDownload == 'undefined') isDownload = false;
	var contentFinding = "";

	contentFinding = getContentFindingFromCookie();
	if(contentFinding != "") return contentFinding;
	
	contentFinding = getContentFindingFromParam(currentUrl, referringUrl);
	if(contentFinding != "") return contentFinding;	
	
	contentFinding = getContentFindingFromReferrer(referringUrl, isDownload);
	if(contentFinding != "") return contentFinding;		
	
	contentFinding = getContentFindingFromTid(currentUrl);
	
	return contentFinding;
}

function getContentFindingFromCookie(){
	return getAdobeCookie('contentfinding');
}

function getContentFindingFromParam(currentUrl, referringUrl){
	var reffererPageCategory = getReffererPageCategory();
	var pageCategory = getPageCategory();
	var reffererPageCode = getReffererPageCode();
	var pageCode = getPageCodeID();
	
	var qry_param = "";	
	var url_parts = currentUrl.split("?");
	if(url_parts.length>1) 
		qry_param = url_parts[1];
	else
		return "";
	
	if(qry_param.indexOf("site_preference=normal") != -1) return "Footer - Select Fullsite";
	
	if(qry_param.indexOf("tid=FSHBNR") != -1 && referringUrl != null && referringUrl != "") {	
		var refererrPathName = referringUrl.replace(/^[^:]+:\/\/[^/]+/, '').replace(/#.*/, '');
		var fileName = refererrPathName.substring(refererrPathName.lastIndexOf("/") + 1);
		if(fileName.length < 2 || fileName.indexOf("index") != -1 || (fileName.indexOf(".") < 0 && fileName.indexOf("login") < 0)) {
			return "Homepage banner";
		}else
			return "";
	}
	
	if(qry_param.indexOf("fr=p") != -1 && referringUrl != "") return "Personal Recommendations";

	//No Longer Used : start
	if(qry_param.indexOf("fr=gtl") != -1 && referringUrl != "") 		
		return "General Recommendations on Downloads/Software and Tools Tab";
		
	if(qry_param.indexOf("fr=gdc") != -1 && referringUrl != "")		
			return "General Recommendations on Documentation Tab";

	if(qry_param.indexOf("fr=g") != -1 && referringUrl != "")		
			return "General Recommendations on bottom of Summary Page";
	//No Longer Used : end
	
	if(qry_param.indexOf("fsrch=1") != -1 && referringUrl != "")
			return "Keyword Search";
	
	if(qry_param.indexOf("fpsp=1") != -1 && referringUrl != "" && referringUrl.indexOf("/products/") != -1){
		if(reffererPageCategory == "PSP" || reffererPageCategory == "TSP" || reffererPageCategory == "SSP" || reffererPageCategory == "RDSP"){
			var samePage = (reffererPageCategory == pageCategory && reffererPageCode == pageCode);
			if(!samePage) 
				return "PSP";
		}
	} 
	if(qry_param.indexOf("fasp=1") != -1 && referringUrl != ""){
		var samePage = (reffererPageCategory == pageCategory && reffererPageCode == pageCode);
		if(!samePage) 
			return "ASP";
	} 
	
	if(qry_param.indexOf("hdr=1") != -1) return "Header";
	if(qry_param.indexOf("hdr=sl") != -1) return "Header - Select Language";
	if(qry_param.indexOf("ftr=sm") != -1) return "Footer - Select Mobile";
	if(qry_param.indexOf("ftr=1") != -1) return "Footer";	
	
	return "";
}

function getContentFindingFromReferrer(referringUrl, isDownload){	
	var reffererPageCategory = getReffererPageCategory();
	var reffererPageCode = getReffererPageCode();
	var pageCategory = getPageCategory();
	var pageCode = getPageCodeID();
	
	if(typeof referringUrl == 'undefined')
		referringUrl = "";
	if(referringUrl.split("?")[0].indexOf("/parametricSelector.sp") != -1 && (pageCategory != 'PARAMETRIC SEARCH' || isDownload)){
		if(pageCategory != "KEYWORD SEARCH" && pageCategory != "SOFTWARE SEARCH")
			return "Parametric Search";
	} 
	
	if(referringUrl.indexOf("/packages/search?") != -1 && (pageCategory != 'PACKAGE SEARCH' || isDownload)){
		return "Package Search";
	}

	var searchUrl = "/search?";
	if(typeof URL_DOMAIN != 'undefined')
		searchUrl = URL_DOMAIN + searchUrl;	
	
	if(referringUrl.indexOf(searchUrl) != -1 && referringUrl.indexOf("/packages/search?") == -1 && (pageCategory != 'KEYWORD SEARCH' || isDownload)){
		if(pageCategory != "PARAMETRIC SEARCH" && pageCategory != "SOFTWARE SEARCH")
			return "Keyword Search";
	}

	if(referringUrl.split("?")[0].indexOf("software-center/library.jsp") != -1 && (pageCategory != 'SOFTWARE SEARCH' || isDownload)){
		if(pageCategory != "PARAMETRIC SEARCH" && pageCategory != "KEYWORD SEARCH")
			return "Software Search";
	}
	
	var chemicalContentURL = "/chemical-content/";
	var chemicalContentIMDSURL = "/chemical-content/imds";
	var chemicalContentSearchURL = "/chemical-content/search";
	if(referringUrl.indexOf(chemicalContentURL) != -1 && referringUrl.indexOf(chemicalContentIMDSURL) == -1 && referringUrl.indexOf(chemicalContentSearchURL) == -1)  
		return "Chemical Content Page";
	
	if(referringUrl.split("?")[0].indexOf(chemicalContentSearchURL) != -1 && (pageCategory != 'CHEMICAL CONTENT SEARCH' || isDownload)){
		if(pageCategory != "PARAMETRIC SEARCH" && pageCategory != "KEYWORD SEARCH")
			return "Chemical Content Search";
	}
	
	if(isDownload){
		reffererPageCategory = pageCategory;
		pageCategory = "DOWNLOAD";
	}
	
	if(reffererPageCategory == 'PARAMETRIC SEARCH' && pageCategory != 'PARAMETRIC SEARCH')
		return "Parametric Search";	
	
	if(reffererPageCategory == 'KEYWORD SEARCH' && pageCategory != 'KEYWORD SEARCH')
		return "Keyword Search";	

	if(reffererPageCategory == 'SOFTWARE SEARCH' && pageCategory != 'SOFTWARE SEARCH')
		return "Software Search";

	if(reffererPageCategory == 'PACKAGE SEARCH' && pageCategory != 'PACKAGE SEARCH')
		return "Package Search";	
	
	if(reffererPageCategory == 'PART FINDER' && pageCategory != 'PART FINDER')
		return "Cross Check: Part Finder";
	
	if(reffererPageCategory == 'COMPETITOR XREF' && pageCategory != 'COMPETITOR XREF')
		return "Cross Check: Competitor Cross Reference";
	
	if(reffererPageCategory == 'RF DRIVER' && pageCategory != 'RF DRIVER')
		return "RF Suggested Driver";
	
	if(reffererPageCategory == 'RF PREDRIVER' && pageCategory != 'RF PREDRIVER')
		return "RF Suggested Predriver";
	
	if(reffererPageCategory == 'PSP' || reffererPageCategory == 'TSP' || reffererPageCategory == 'RDSP' || reffererPageCategory == 'SSP'){
		if(reffererPageCode != pageCode) return "PSP";
	}
	
	if(reffererPageCategory == 'ASP' && reffererPageCode != pageCode) return "ASP"; 

	if(reffererPageCategory == 'VIDEO VAULT' && pageCategory != 'VIDEO VAULT')
		return "Video Vault";	

	if(reffererPageCategory == 'VIDEO CHANNEL' && pageCategory != 'VIDEO CHANNEL')
		return "Video Channel";	

	if(reffererPageCategory == 'VIDEO' && reffererPageCode != pageCode)
		return "Video Summary Page";
	
	if(reffererPageCategory == 'PIP')
		if(reffererPageCode != pageCode) return "Package Summary Page";

	if(reffererPageCategory == 'MORE INFO')
		return "More Info";	

	if(reffererPageCategory == 'CHEMICAL CONTENT')
		return "Chemical Content Page";

	if(reffererPageCategory == 'CHEMICAL CONTENT SEARCH' && pageCategory != 'CHEMICAL CONTENT SEARCH')
		return "Chemical Content Search";	
	
	return "";
}

function getContentFindingFromTid(currentUrl){
	var tid = getQryParamForAnalytics(currentUrl, 'tid');
	if(tid == "") return "";
 	if(tid == 'van') return "Vanities";
 	if(tid == 'persHis') return "Personal History/Favorites";
 	return "tid: " + tid;
}

function getQryParamForAnalytics(url,name)
{
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var tmpURL = url;
  var results = regex.exec( tmpURL );
  if( results == null )
	return "";
  else
	return decodeURIComponent(results[1]);
}

function trackDownloadAnalyticsCommon(downloadUrl,analyticsFrmOnClick) {
	if(!isDTMEnabled()) return;

	var urlProtocol = downloadUrl.substring(0,6);
	if(urlProtocol.indexOf("http") < 0) {
		downloadUrl = "http://"+ location.hostname + downloadUrl;
	}

	var is_unsecure_download = analyticsCheckDownload(downloadUrl);
	var contentFinder = getContentFinding(document.URL, downloadUrl, true);
	var analyticsDwnldURL = downloadUrl.split("#")[0];
	var download_type_index = getDownloadTypeForAnalytics(downloadUrl);

	digitalData.dwnldInfo={};
	digitalData.eventInfo={};	

	digitalData.eventInfo.assetID=downloadUrl;
	if(contentFinder != null && contentFinder !='') {
		digitalData.eventInfo.contentFinding = contentFinder;
	}		

	var hrefUrl = downloadUrl.split("#")[0]; 
	hrefUrl = replaceCacheUrlDomain(hrefUrl);

	if(is_unsecure_download){			
		hrefUrl = hrefUrl.split("?")[0];
		if(download_type_index == '') {
			download_type_index = "Non-Secured"; 
			digitalData.eventInfo.eventPathing = 'dwnld:'+hrefUrl;  // Event Pathing
		} else {			 
			digitalData.eventInfo.eventPathing = 'dwnld start:'+hrefUrl;  // Event Pathing														
		}
		digitalData.dwnldInfo.downloadType = download_type_index;
		digitalData.dwnldInfo.downloadURLClean = remProtocolFrmUrl(hrefUrl);

		if(analyticsFrmOnClick){
			_satellite.track("trackDownloadAnalytics");
		}else{
           digitalData.anchorObj = newAnchorTagForAnalytics();
           digitalData.nextAction = function(){window.location.href=analyticsDwnldURL;};
           _satellite.track("trackDownloadAnalytics");
		}			
	}else{
		if(download_type_index != ''){
			var uri =  hrefUrl.split("?")[0];
			if (hrefUrl.indexOf('?') != -1){
				hrefUrl = uri + '?colCode='+ getQryParamForAnalytics(hrefUrl,'colCode');
			}

			digitalData.dwnldInfo.downloadType = download_type_index;
			digitalData.eventInfo.eventPathing = 'dwnld start:'+hrefUrl;  // Event Pathing
			digitalData.dwnldInfo.downloadURLClean = remProtocolFrmUrl(hrefUrl);
			if(analyticsFrmOnClick) {					
		        _satellite.track("trackSecDownloadInitiate");
			}
			else {
		        digitalData.anchorObj = newAnchorTagForAnalytics();
		        digitalData.nextAction = function(){window.location.href=analyticsDwnldURL;};				
		        _satellite.track("trackSecDownloadInitiate");
			}				
		}			
	}
	digitalData.eventInfo.contentFinding=digitalData.dwnldInfo.downloadType=digitalData.eventInfo.assetID=digitalData.eventInfo.eventPathing=digitalData.dwnldInfo.downloadURLClean=digitalData.eventInfo.subContentFinding="";	
}

function analyticsCheckDownload(pth){

   pth =  pth.split("?")[0];

   if(pth.toUpperCase().indexOf("FILES")!=-1 || pth.toUpperCase().indexOf("/MCDS/")!=-1){		
	  return true;					         
	}	
	// Added for Marketing Leveraged document download
	 if(pth.toUpperCase().indexOf("DOWNLOAD")!=-1 && pth.toUpperCase().indexOf("FILES")!=-1){		
	  return true;					         
	}	
	// End of Marketing Leveraged document download
	
	if(pth.indexOf(".pdf")!=-1 || pth.indexOf(".doc")!=-1 || pth.indexOf(".zip")!=-1 || pth.indexOf(".ppt")!=-1 || pth.indexOf(".txt")!=-1){		
		return true;
	}
	
 return false;
}

function trackTrainingDwnldAnalytics(type, downloadUrl, docHomeUrl) {    
	downloadUrl = (downloadUrl.indexOf("http") != 0) ? (docHomeUrl + downloadUrl) : downloadUrl;
	var hrefUrl = downloadUrl.split("#")[0];

	digitalData.eventInfo = {};	
	digitalData.eventInfo.contentFinding = "";
	
	if(type == 'PDF') {			
		if(hrefUrl.indexOf("/webapp/trainingServlet?")!=-1)  {
			var filePath = getQryParamForAnalytics(hrefUrl,'openPdfVersion');
			hrefUrl = docHomeUrl + filePath;
		}
		hrefUrl = replaceCacheUrlDomain(hrefUrl);
		
		var download_type_index = getDownloadTypeForAnalytics(hrefUrl);
		
		digitalData.dwnldInfo = {};
		digitalData.dwnldInfo.downloadURLFull = downloadUrl;
		hrefUrl = hrefUrl.split("?")[0];

		if(download_type_index == '') {
			download_type_index = "Non-Secured"; 
			digitalData.eventInfo.name = 'trainingPDFNonsecure';
			digitalData.eventInfo.eventPathing = 'dwnld:'+hrefUrl; 
		} else {                                  
			digitalData.eventInfo.name = 'TrainingPDFSecure';
			digitalData.eventInfo.eventPathing = 'dwnld start:'+hrefUrl; 
		}
		digitalData.dwnldInfo.downloadType = download_type_index;
		digitalData.dwnldInfo.downloadURLClean = remProtocolFrmUrl(hrefUrl);
		
		_satellite.track("trackTrainingDwnldAnalytics");
		digitalData.eventInfo.contentFinding=digitalData.eventInfo.eventPathing=digitalData.dwnldInfo.downloadType=digitalData.dwnldInfo.downloadURLClean=="";
	}else {
		digitalData.eventInfo.name = 'trainingLaunch';
		digitalData.trainingInfo = {};
		
		var s_evtPath = 'launch:'+s.pageName;

		if(s_evtPath.length > 100) {
			var evtPathArr = s_evtPath.split(" | ");
			var truncPageName = ''; 
			if(evtPathArr.length > 1) {
				var availPathLen = 100-evtPathArr[1].length;
				truncPageName = evtPathArr[0].substring(0,availPathLen-6);
				truncPageName = truncPageName + "... | "+evtPathArr[1];
			}
			else {
				truncPageName = evtPathArr[0].substring(0,97);
				truncPageName = truncPageName + "...";
			}
			digitalData.eventInfo.eventPathing = truncPageName
		}
		else {
			digitalData.eventInfo.eventPathing = s_evtPath;
		}
		
		var lang_cd  = getQryParamForAnalytics(hrefUrl, 'lang_cd');
		lang_cd = (lang_cd == null || lang_cd == "") ? "en": lang_cd; 
		
		var contentUrlVal = getQryParamForAnalytics(hrefUrl, 'contentUrl');
		contentUrlVal = (contentUrlVal == "") ? hrefUrl:contentUrlVal;  
		contentUrlVal = (contentUrlVal.indexOf("lang_cd") == -1) ? (contentUrlVal + "&lang_cd=" + lang_cd) : contentUrlVal; 
		contentUrlVal = replaceCacheUrlDomain(contentUrlVal);
		
		digitalData.trainingInfo.trainingLaunchURL = contentUrlVal;
		_satellite.track("trackTrainingDwnldAnalytics");
		digitalData.eventInfo.contentFinding=digitalData.eventInfo.eventPathing=digitalData.trainingInfo.trainingLaunchURL="";
	}
}


/*
function trackTrainingDwnldAnalytics(type, downloadUrl, docHomeUrl) {
	
	var urlProtocol = downloadUrl.substring(0,6);
	if(urlProtocol.indexOf("http") < 0) {
		downloadUrl = docHomeUrl + downloadUrl;
	}
		
	var hrefUrl = downloadUrl.split("#")[0];;	

	if(hrefUrl.indexOf("/webapp/trainingServlet?") !=-1) {
			var filePath = getQryParamForAnalytics(hrefUrl,'openPdfVersion');
			hrefUrl = docHomeUrl + filePath;
	}
	hrefUrl=hrefUrl.replace("cache.freescale.com","www.freescale.com");
	hrefUrl=hrefUrl.replace("cache-uat.freescale.com","uat.freescale.com");	
	
	var download_type_index = getDownloadTypeForAnalytics(hrefUrl);	
	
	if(s) { 
		var s1=s; 
		//s1.manageVars("clearVars","eVar1",1);
		 s1.eVar1 = "";
		if(type == 'PDF') {
			s1.linkTrackVars='channel,prop1,prop2,prop3,prop6,prop8,prop9,prop10,prop11,prop13,prop14,prop16,prop18,prop21,prop23,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar15,eVar16,eVar17,eVar18,eVar19,eVar20,eVar21,eVar24,eVar34,eVar35,eVar38,eVar39,eVar40,eVar48,eVar51,eVar52,eVar53,events';
			s1.linkTrackEvents='event15,event11';
			s1.eVar16=downloadUrl; 		                
			
			hrefUrl = hrefUrl.split("?")[0];
			
			if(download_type_index == '') {
				download_type_index = "Non-Secured"; 
				s1.events='event15,event11'; // Download initiation and completion
				s1.prop16 = 'dwnld:'+hrefUrl; 
			} else {			 
				s1.events='event15'; // Download initiation for marketing leveraged
				s1.prop16 = 'dwnld start:'+hrefUrl; 
			}
			s1.eVar40 = download_type_index;
			s1.eVar24 = remProtocolFrmUrl(hrefUrl);
						
			s1.tl(this,'d','Download:'+hrefUrl);
		}		
		else {
			s1.linkTrackVars='channel,prop1,prop2,prop3,prop6,prop8,prop9,prop10,prop11,prop13,prop14,prop18,prop16,prop21,prop23,eVar1,eVar3,eVar4,eVar5,eVar6,eVar15,eVar17,eVar18,eVar19,eVar20,eVar21,eVar34,eVar35,eVar36,eVar38,eVar39,eVar48,eVar51,eVar52,eVar53,events';
			s1.linkTrackEvents='event31';
			s1.events='event31'; 			
			var s_evtPath = 'launch:'+s.pageName;
			 			
			if(s_evtPath.length > 100) {
				var evtPathArr = s_evtPath.split(" | ");
				var truncPageName = ''; 
				if(evtPathArr.length > 1) {
					var availPathLen = 100-evtPathArr[1].length;
					truncPageName = evtPathArr[0].substring(0,availPathLen-6);
					truncPageName = truncPageName + "... | "+evtPathArr[1];
				}
				else {
					truncPageName = evtPathArr[0].substring(0,97);
					truncPageName = truncPageName + "...";
				}
				s1.prop16 = truncPageName;
			}
			else {
				s1.prop16 = s_evtPath;
			}			
			var contentUrlVal = getQryParamForAnalytics(hrefUrl, 'contentUrl');
			if(contentUrlVal == '') {
				contentUrlVal = hrefUrl;
			}
			s1.eVar36 = contentUrlVal;
			s1.tl(this,'o','Launch: ['+hrefUrl+']');				
		}
		s1.eVar1=s1.eVar16=s1.events=s1.prop16=s1.eVar40=s1.eVar24=s1.eVar36="";
	}
}
*/
function trackAnalyticsFormCmpltWithRef(formname, formRefNumber) {
	if (typeof s_account != 'undefined') {
		var s=s_gi(s_account);
		s.eVar1 = "";
		s.linkTrackVars='channel,prop1,prop2,prop3,prop6,prop8,prop9,prop10,prop11,prop13,prop14,prop16,prop18,prop20,prop21,prop23,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar15,eVar16,eVar17,eVar18,eVar19,eVar20,eVar21,eVar22,eVar24,eVar34,eVar35,eVar38,eVar39,eVar40,eVar43,eVar48,eVar51,eVar52,eVar53,events'; 
		s.linkTrackEvents='event14';
		s.eVar22=s.prop20=formname;
		s.eVar43=formRefNumber;
		s.events='event14';
		s.prop16="formcomplete:"+formname;
		s.tl(this,'o','Form Complete');
		s.eVar1=s.eVar22=s.prop20=s.eVar43=s.events=s.prop16="";
	}	
}

function trackAnalyticsFormtWithResult(formname,results) {
	digitalData.formInfo = {};
	digitalData.formInfo.formName = formname;
	digitalData.formInfo.formResults = '' + results + '';
	_satellite.track("trackAnalyticsFormWithResult");
	
	/*
	if (typeof s_account != 'undefined') {
		var s=s_gi(s_account);
		//s.manageVars("clearVars","eVar1",1);
		s.eVar1 = "";
		s.linkTrackVars='channel,prop1,prop2,prop3,prop6,prop8,prop9,prop10,prop11,prop13,prop14,prop16,prop18,prop20,prop21,prop23,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar15,eVar16,eVar17,eVar18,eVar19,eVar20,eVar21,eVar22,eVar24,eVar34,eVar35,eVar38,eVar39,eVar40,eVar48,eVar51,eVar52,eVar53,events'; 
		s.linkTrackEvents='event13,event14';
		s.eVar22=s.prop20=formname;
		s.events='event13,event14';
		s.prop16="formcomplete:"+formname;
		s.tl(this,'o',''+ results +'');
		s.eVar1=s.eVar22=s.prop20=s.prop16=s.events="";
		//s.manageVars("clearVars","eVar1",1);
	} 
	 */
}

function trackExitLinkForDistributors(fiveCodeLocation,partNumber,fiveCode,distyName,countryName) {
	digitalData.partInfo = {}; 
	digitalData.partInfo.partNumber = partNumber; 

	digitalData.distyInfo = {}; 
	digitalData.distyInfo.fiveCodeLocation = fiveCodeLocation; 			
	digitalData.distyInfo.countryName = countryName;			
	digitalData.distyInfo.distributorName = distyName; 
	
	_satellite.track("trackExitLinkForDistributors"); 
	
	/*
	if (typeof s_account != 'undefined') {
		var s=s_gi(s_account);	
		//s.manageVars("clearVars","eVar1",1);
		s.eVar1 = "";
		s.linkTrackVars='channel,prop1,prop2,prop3,prop6,prop8,prop9,prop10,prop11,prop13,prop14,prop16,prop21,prop23,eVar3,eVar4,eVar5,eVar6,eVar15,eVar17,eVar18,eVar19,eVar20,eVar34,eVar35,eVar38,eVar39,eVar48,eVar49,eVar51,eVar52,eVar53,products,events';
		s.linkTrackEvents=s.events='event10';
		s.products=";"+partNumber+";;;;eVar49="+fiveCodeLocation;
		s.prop16 = "dist:"+distyName+","+countryName;		
		s.tl(this,'e','Distributor Lead');
		s.eVar1=s.products=s.prop16=s.eVar49=s.events="";
		//s.manageVars("clearVars","eVar1",1);
	}
	 */	
}

function getRefinementData(dnavs_param) {
	var linkVal = "";

	var s_qry_param = decodeURIComponent(dnavs_param);
	s_qry_param = decodeURI(s_qry_param);
	s_qry_param = decodeURIComponent(s_qry_param);
						
	s_qry_param = s_qry_param.replace(/prodTypeCategory/g,"Device Type");
	s_qry_param = s_qry_param.replace(/apppTypeCategory/g,"Application");
	s_qry_param = s_qry_param.replace(/TrainingLaunchLanguage/g,"Language");
	s_qry_param = s_qry_param.replace(/typeHirarchy/g,"Services");
	s_qry_param = s_qry_param.replace(/OperatingSystems/g,"OperatingSystems");
	s_qry_param = s_qry_param.replace(/cores/g,"Cores");
	
	if(s_qry_param.indexOf("Asset_Type=Trainings") != -1) {
	   s_qry_param = s_qry_param.replace(/type/g,"TrainingType");
	} 
	else if(s_qry_param.indexOf("Asset_Type=SoftwareTools") != -1) {
	   s_qry_param = s_qry_param.replace(/type/g,"Software &amp; Tools Type");
	} 
	else if(s_qry_param.indexOf("Asset_Type=Documents") != -1) {
	   s_qry_param = s_qry_param.replace(/type/g,"Document Type");
	} 
	else if(s_qry_param.indexOf("Asset_Type=Partners") != -1) {
		s_qry_param = s_qry_param.replace(/Vendor/g,"Partner Tier");
	} 
					
	var qryParamArr = s_qry_param.split("+inmeta:");		
	for(i=0;i<qryParamArr.length;i++) {                        
		if(i==0) {
				linkVal = qryParamArr[i].replace("inmeta:Asset_Type=","Asset Type~");
		}
		 else 
		{
			var resultArr = qryParamArr[i].split("=");               											
			if(resultArr.length >= 2) {						
				var resValArr = resultArr[1].split("_");
				linkVal = linkVal+"$"+resultArr[0]+"~"+resValArr[resValArr.length-1];
			}                              
		}
	}	
	return linkVal;		
}
	
// Added for CR-59281 Start
function getRefinementData1(display_name1,display_name_value1,dnavs_param1){
	var linkVal1 = "";
	var s_qry_param1 = decodeURIComponent(dnavs_param1);
	s_qry_param1 = decodeURI(s_qry_param1);
	s_qry_param1 = decodeURIComponent(s_qry_param1);

	s_qry_param1 = s_qry_param1.replace(/deviceTax/g,"Device Type");
	s_qry_param1 = s_qry_param1.replace(/applicationTax/g,"Application");
	s_qry_param1 = s_qry_param1.replace(/TrainingLaunchLanguage/g,"Language");
	s_qry_param1 = s_qry_param1.replace(/typeHirarchy/g,"Services");
	s_qry_param1 = s_qry_param1.replace(/OperatingSystems/g,"OperatingSystems");
	s_qry_param1 = s_qry_param1.replace(/cores/g,"Cores");

	if(s_qry_param1.indexOf("Asset_Type=Trainings") != -1) {
	   s_qry_param1 = s_qry_param1.replace(/typeTax/g,"TrainingType");
	}else if(s_qry_param1.indexOf("Asset_Type=SoftwareTools") != -1) {
	   s_qry_param1 = s_qry_param1.replace(/typeTax/g,"Software & Tools Type");
	}else if(s_qry_param1.indexOf("Asset_Type=Documents") != -1) {
	   s_qry_param1 = s_qry_param1.replace(/typeTax/g,"Document Type");
	}else if(s_qry_param1.indexOf("Asset_Type=Partners") != -1) {
		s_qry_param1 = s_qry_param1.replace(/Vendor/g,"Partner Tier");
	} 

	var qryParamArr1;
	if(s_qry_param1.indexOf("+inmeta:") > -1)		
		qryParamArr1 = s_qry_param1.split("+inmeta:");
	else
		qryParamArr1 = s_qry_param1.split(" inmeta:");
	
	var arrPartNumber = new Array();
	var arritemType = new Array();
	arrPartNumber = display_name1.split("|");
	arritemType = display_name_value1.split("|");
	
	for(i=0;i<qryParamArr1.length;i++) {                        
		if(i==0){
			linkVal1 = qryParamArr1[i].replace("inmeta:Asset_Type=","Asset Type~");
			linkVal1 = linkVal1.replace("inmeta:resource-type=","Asset Type~");
		}else{
			var resultArr1 = qryParamArr1[i].split("=");
			if(resultArr1.length >= 2) {						
				var resValArr1= resultArr1[1].split("_");
				var resValArr2 = resValArr1[resValArr1.length-1];
				if(arrPartNumber.indexOf(resValArr2) != -1){
					var z = arrPartNumber.indexOf(resValArr2);
					linkVal1 = linkVal1+"$"+resultArr1[0]+"~"+arritemType[z];
                }else{
                	linkVal1 = linkVal1+"$"+resultArr1[0]+"~"+resValArr1[resValArr1.length-1];
                }
			}                              
		}
	}	
	
	return linkVal1;	
}

function trackSearchAnalytics(langCd,siteplatform,srchKeyword,resultCount,srchTitle,pageType,displayname,displaynamevalue) {
	if(!isDTMEnabled()) return;
	
	digitalData.pageInfo={};
	digitalData.userInfo={};
	digitalData.siteInfo={};
	digitalData.searchInfo={};
	digitalData.eventInfo={};
	
	var display_name = displayname;
	var display_name_value = displaynamevalue;
	var search_filter_param1 = getQryParamForAnalytics(document.URL, 'dnavs');
	var gsa_client = getQryParamForAnalytics(document.URL, 'client');
	var isFromSupport = getQryParamForAnalytics(document.URL, 'isFromSupport');
	var refine_data1 = "";
	if(gsa_client.indexOf("search_support") > -1 && search_filter_param1 == "")
		refine_data1 = "Asset Type~Support";
	else if(isFromSupport == "true"){ 
		refine_data1 = getRefinementData1(display_name,display_name_value,search_filter_param1);
		refine_data1 = "Asset Type~Support$" + refine_data1; 
	}else if(gsa_client.indexOf("search_community") > -1 && search_filter_param1 == ""){
		refine_data1 = "Asset Type~Support$Asset Type~Community";
	}else if(gsa_client.indexOf("search_videos") > -1 || gsa_client.indexOf("search_training") > -1){
		refine_data1 = getRefinementData1(display_name,display_name_value,search_filter_param1);
		refine_data1 = "Asset Type~Support$" + refine_data1;
	}else
		refine_data1 = getRefinementData1(display_name,display_name_value,search_filter_param1);

	digitalData.pageInfo.pageCategory = "KEYWORD SEARCH";
	var contentFind = getContentFinding(document.referrer, document.URL);
	
	digitalData.pageInfo.contentFinding = "";
	digitalData.userInfo.fslVisitorID = getCookieForSiteCatalyst("freescale_visitor_id");

	srchKeyword = trimForAnalytics(srchKeyword);
	digitalData.searchInfo.searchkeyword = srchKeyword;
    if(resultCount) {
		digitalData.searchInfo.resultCount = resultCount;
    }
    else {
    	if(srchKeyword != "")
    		digitalData.searchInfo.resultCount ='zero';
	}
    digitalData.pageInfo.pageName=digitalData.eventInfo.name='Search';
    digitalData.pageInfo.siteSection1 = 'Search';
    digitalData.pageInfo.pageType = pageType;
    digitalData.siteInfo.sitePlatform = siteplatform;
    digitalData.siteInfo.lang = langCd;
    digitalData.searchInfo.searchFilterList = refine_data1;
	if(srchKeyword != '') {
		digitalData.pageInfo.pageEventPathing = "Keyword Search: Results of "+srchKeyword;
	} else {
		digitalData.pageInfo.pageEventPathing = "Keyword Search: No Keyword";
	}		
	digitalData.pageInfo.localTitle = srchTitle;
	digitalData.pageInfo.pageURLClean = document.URL.split("?")[0];
	if(contentFind != '') {
		digitalData.pageInfo.contentFinding = contentFind;
	}
	digitalData.pageInfo.pageLoadRule='Keyword Search'
}

function trackLoginComplete() {
	if(isDTMEnabled()){		
		digitalData.eventInfo = {};
		digitalData.eventInfo.eventPathing='Login: Login Attempted';
		digitalData.eventInfo.name='Login Attempted';
		_satellite.track("trackLoginComplete");
	}else if (typeof s_account != 'undefined') {
		var s=s_gi(s_account);
		var anchorTagObj = newAnchorTagForAnalytics();
		s.eVar1 = "";
		s.linkTrackVars='channel,prop1,prop2,prop3,prop6,prop8,prop9,prop10,prop11,prop13,prop14,prop16,prop18,prop21,prop23,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar15,eVar16,eVar17,eVar18,eVar19,eVar20,eVar21,eVar34,eVar35,eVar38,eVar39,eVar48,eVar51,eVar52,eVar53,events';	
		s.linkTrackEvents='event7';		
		s.events='event7';
		var actionInterval = setInterval(function () {	
			s.tl(anchorTagObj,'o','Login Attempt');
			s.eVar1=s.events="";
			clearInterval(actionInterval);
		},0);

	}
}

function trackMobileLoginComplete(frmObj) {
	var frmId = frmObj.id;
	if(isDTMEnabled()){
		digitalData.eventInfo = {};
		digitalData.eventInfo.eventPathing='Login: Login Attempted';		
		digitalData.eventInfo.name='Login Attempted';
		digitalData.eventInfo.formId = frmId;
		digitalData.anchorObj = newAnchorTagForAnalytics();
		digitalData.nextAction = function(){loginNextAction(frmId);};
		_satellite.track("trackLoginCompleteMobile");
	}else if (typeof s_account != 'undefined') {
		var s=s_gi(s_account);
		var anchorTagObj = newAnchorTagForAnalytics();		
		s.eVar1 = "";
		s.linkTrackVars='channel,prop1,prop2,prop3,prop6,prop8,prop9,prop10,prop11,prop13,prop14,prop16,prop18,prop21,prop23,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar15,eVar16,eVar17,eVar18,eVar19,eVar20,eVar21,eVar34,eVar35,eVar38,eVar39,eVar48,eVar51,eVar52,eVar53,events';	
		s.linkTrackEvents='event7';		
		s.events='event7';
		s.forcedLinkTrackingTimeout = 5000;
		s.tl(anchorTagObj,'o','Login Attempt',null,function(){loginNextAction(frmId);});
	}
	else{
		loginNextAction(frmId);
	}
}

function loginNextAction(loginFrmId) {	
	isLoginComplete = true; 
	$("#"+loginFrmId).submit();
}

function trackAddItem(addItemInfoObj){
	if(!isDTMEnabled()) return;
	
	var currentUrl = getCleanPageURL();
	var sitePlatFrm = addItemInfoObj.sitePlatform;
	var isCartEmpty=addItemInfoObj.scIsBasketEmpty;
	digitalData.item=[];

	if(sitePlatFrm == "normal") {
		sitePlatFrm = "full";
	}
	var langCd = addItemInfoObj.langCd;
	if(langCd == '') {
		langCd = 'en';
	}
	var arrPartNumber=addItemInfoObj.scPartNumLst.split(",");
	var arritemType=addItemInfoObj.scItemTypeLst.split(",");
	var arrAllPartNumber=addItemInfoObj.scAllPartNumLst.split(",");	
	var arrAllitemType=addItemInfoObj.scAllItemTypeList.split(",");
	var removeEvt = addItemInfoObj.scRemoveEvent;
	var itemCount = addItemInfoObj.scItemCount;
	var isItemExist = false;
	var isEvtExist = false;
	if(itemCount > 0) {
		isItemExist = true;
	}

	digitalData.eventInfo.contentFinding = "";
	digitalData.cartInfo.products="";
	digitalData.userInfo.fslVisitorID = getCookieForSiteCatalyst("freescale_visitor_id");
	digitalData.siteInfo.sitePlatform = sitePlatFrm;		
	digitalData.siteInfo.lang= langCd.toLowerCase();
	digitalData.pageInfo.localTitle = addItemInfoObj.scTitle;
	digitalData.pageInfo.pageName = addItemInfoObj.scPageName;
	digitalData.pageInfo.siteSection1 = addItemInfoObj.scChannel;
	digitalData.pageInfo.pageType= addItemInfoObj.scPageName;
	digitalData.pageInfo.pageEventPathing= "D=pageName";			
	digitalData.pageInfo.pageURLClean = currentUrl;

	if(isItemExist) {
		if(isCartEmpty =="true")
		{
			digitalData.eventInfo.name = 'cart open';
			digitalData.category.primaryCategory = 'Shopping Cart';
			digitalData.category.subcategory1 = 'Shopping Cart Open';
			isEvtExist	= true;
		}
		else{
			if(removeEvt != 'REMOVE_EVENT') {
				var urlArr = document.URL.split("?");					
				if(urlArr[0].indexOf('add_item') != -1) {					
					digitalData.eventInfo.name = 'cart add';
					digitalData.category.primaryCategory = 'Shopping Cart';
					digitalData.category.subcategory1 = 'Shopping Cart Add';

					isEvtExist	= true;
				}					
			}											
		}
		if(isEvtExist) {
			for(i =0; i < arrPartNumber.length-1 ;i++) {
				var item = {};
				item.sku = arrPartNumber[i];
				item.productType = arritemType[i];
				item.quantity = '';
				item.price = '';
				digitalData.item.push(item);


				digitalData.cartInfo.products = digitalData.cartInfo.products +';'+arrPartNumber[i]+';;;;eVar41='+arritemType[i];
				if(i<arrPartNumber.length-2)
				{
					digitalData.cartInfo.products = digitalData.cartInfo.products +",";
				}
			}			
			_satellite.track("cartPageLoad");
		}
		else {
			isItemExist = false;
		}
	}		

	digitalData.eventInfo.name = 'cart view';
	digitalData.category.primaryCategory = 'Shopping Cart';
	digitalData.category.subcategory1 = 'Shopping Cart View';

	digitalData.cartInfo.products="";		
	for(i =0; i < arrAllPartNumber.length-1 ;i++) { 
		var item = {};
		item.sku = arrAllPartNumber[i];
		item.productType = arrAllitemType[i];
		item.quantity = '';
		item.price = '';
		digitalData.item.push(item);
		digitalData.cartInfo.products = digitalData.cartInfo.products +';'+arrAllPartNumber[i]+';;;;eVar41='+arrAllitemType[i];
		if(i<arrAllPartNumber.length-2)
		{
			digitalData.cartInfo.products = digitalData.cartInfo.products +",";
		}
	}

	if(!isItemExist) {
		_satellite.track("cartPageLoad");
	}
	else {
		_satellite.track("cartPageEvent");
	}	
}

function trackCheckoutProcess(checkout,couponId){
	if(!isDTMEnabled()) return;

	if(checkout=='CHECKOUT'){
		digitalData.eventInfo.name = 'cart checkout';
		digitalData.category.primaryCategory = 'Shopping Cart';
		digitalData.category.subcategory1 = 'Shopping Cart Checkout';		
		digitalData.eventInfo.contentFinding = "";
		digitalData.anchorObj = newAnchorTagForAnalytics();
		digitalData.nextAction = function(){shoppingCartNextAction();};		
		_satellite.track("cartCheckout");
	}
}

function trackMobileCheckoutProcess(){
	if(!isDTMEnabled()){
		shoppingCartNextAction();
		return;
	}
	
	digitalData.item =[];
	digitalData.category.primaryCategory = 'Shopping Cart';
	digitalData.category.subcategory1 = 'Shopping Remove';
	
	digitalData.eventInfo.contentFinding = "";		
	digitalData.eventInfo.name = 'cart checkout';
	digitalData.anchorObj = newAnchorTagForAnalytics();
	digitalData.nextAction = function(){shoppingCartNextAction();};
	_satellite.track("cartCheckout");	
}

function trackMobileRemovableProduct(removepartNumber,removeitemType){
	if(!isDTMEnabled()){
		shoppingCartNextAction();
		return;
	}
	
	digitalData.item=[];
	digitalData.eventInfo.contentFinding = "";  
	digitalData.eventInfo.name = 'cart remove';
	s.forcedLinkTrackingTimeout = 5000;			
	digitalData.cartInfo.products="";
	var arrPartNumber= new Array();
	var arritemType= new Array();
	arrPartNumber = removepartNumber;
	arritemType = removeitemType;
	digitalData.category.primaryCategory = 'Shopping Cart';
	digitalData.category.subcategory1 = 'Shopping Cart Remove';
	
	for(i =0; i < arrPartNumber.length ;i++) {
		var item = {};
		item.sku = arrPartNumber[i];
		item.productType = arritemType[i];
		item.quantity = '';
		item.price = '';
		digitalData.item.push(item);
		digitalData.cartInfo.products = digitalData.cartInfo.products +';'+arrPartNumber[i]+';;;;eVar41='+arritemType[i];
		if(i<arrPartNumber.length-1)
		{
			digitalData.cartInfo.products = digitalData.cartInfo.products +",";
		}
	}
	digitalData.anchorObj = newAnchorTagForAnalytics();
	digitalData.nextAction = function(){shoppingCartNextAction();};	
	_satellite.track("cartRemoval");
}


function shoppingCartNextAction() {	
	document.shopping.submit();
}

function trackSCPaymentSummary(paymentSummaryInfoObj){
	if(!isDTMEnabled()) return;

	var sitePlatFrm = paymentSummaryInfoObj.sitePlatform;
	if(sitePlatFrm == "normal") {
		sitePlatFrm = "full";
	}
	var langCd = paymentSummaryInfoObj.langCd;
	if(langCd == '') {
		langCd = 'en';
	}
	var currentUrl = getCleanPageURL();
	digitalData.eventInfo.contentFinding = "";
	digitalData.userInfo.fslVisitorID = getCookieForSiteCatalyst("freescale_visitor_id");
	digitalData.siteInfo.sitePlatform = sitePlatFrm;		
	digitalData.siteInfo.lang = langCd.toLowerCase();
	digitalData.pageInfo.localTitle = paymentSummaryInfoObj.scTitle;
	digitalData.pageInfo.pageName = paymentSummaryInfoObj.scPageName;
	digitalData.pageInfo.siteSection1 = paymentSummaryInfoObj.scChannel;
	digitalData.pageInfo.pageType = paymentSummaryInfoObj.scPageName;
	digitalData.eventInfo.name='Cart Payment Page';
	if(paymentSummaryInfoObj.scCouponId.length!=0){
		digitalData.couponCode = 'Coupon#'+paymentSummaryInfoObj.scCouponId;
	}
	digitalData.pageInfo.pageEventPathing = "D=pageName";
	digitalData.pageInfo.pageURLClean = currentUrl;			
	_satellite.track("cartPageLoad");
	digitalData.eventInfo.contentFinding="";	
}

function trackSCOrderConfirmation(orderConfirmInfoObj){
	if(!isDTMEnabled()) return;
	
	var sitePlatFrm = orderConfirmInfoObj.sitePlatform;
	if(sitePlatFrm == "normal") {
		sitePlatFrm = "full";
	}
	var langCd = orderConfirmInfoObj.langCd;
	if(langCd == '') {
		langCd = 'en';
	}
	var currentUrl = getCleanPageURL();
	var arrPartNumber=orderConfirmInfoObj.scPartNumLst.split(",");
	var arrQty=orderConfirmInfoObj.scQty.split(",");
	var arrTotal=orderConfirmInfoObj.scTotalPrice.split(",");


	digitalData.price={};
	digitalData.profile={};
	digitalData.profile.address={};
	digitalData.item=[];

	digitalData.eventInfo.contentFinding = "";
	digitalData.userInfo.fslVisitorID = getCookieForSiteCatalyst("freescale_visitor_id");
	digitalData.siteInfo.sitePlatform = sitePlatFrm;		
	digitalData.siteInfo.lang = langCd.toLowerCase();
	digitalData.pageInfo.localTitle = orderConfirmInfoObj.scTitle;
	digitalData.pageInfo.pageName = orderConfirmInfoObj.scPageName;
	digitalData.pageInfo.siteSection1= orderConfirmInfoObj.scChannel;
	digitalData.pageInfo.pageType = orderConfirmInfoObj.scPageName;
	if(orderConfirmInfoObj.scCouponId.length!=0){
		digitalData.couponCode='Coupon#'+orderConfirmInfoObj.scCouponId;
	}				
	digitalData.cartInfo.products="";
	for(i =0; i < arrPartNumber.length-1 ;i++) {  
		var item = {};
		item.price = {};
		item.productInfo = {};
		item.price.basePrice =arrTotal[i];
		item.productInfo.sku = arrPartNumber[i];
		item.quantity = arrQty[i];

		digitalData.item.push(item);

		digitalData.cartInfo.products=digitalData.cartInfo.products+';'+arrPartNumber[i]+';'+arrQty[i]+';'+arrTotal[i];
		if(i<arrPartNumber.length-2)
		{
			digitalData.cartInfo.products =digitalData.cartInfo.products+",";
		}
	}              
	digitalData.transactionID = orderConfirmInfoObj.scOrderNumber;
	digitalData.price.shippingMethod = orderConfirmInfoObj.scPaymentMethod;
	digitalData.price.shippingMode = orderConfirmInfoObj.scShippingMode;
	digitalData.profile.address.postalCode = orderConfirmInfoObj.scZip;
	digitalData.profile.address.stateProvince = orderConfirmInfoObj.scState;
	digitalData.profile.address.country = orderConfirmInfoObj.scBillingCountryAddr;
	digitalData.eventInfo.name = 'Purchase';
	digitalData.pageInfo.pageEventPathing = "D=pageName";	
	digitalData.pageInfo.pageURLClean = currentUrl;			
	_satellite.track("cartPageLoad");
	digitalData.eventInfo.contentFinding ="";	
}

function trackRemovableProduct(removepartNumber,removeitemType){
	if(!isDTMEnabled()) return;

	digitalData.item=[];

	digitalData.category.primaryCategory = 'Shopping Cart';
	digitalData.category.subcategory1 = 'Shopping Cart Remove';

	digitalData.eventInfo.contentFinding = "";
	digitalData.eventInfo.name = 'cart remove';
	digitalData.cartInfo.products="";
	var arrPartNumber= new Array();
	var arritemType= new Array();
	arrPartNumber = removepartNumber;
	arritemType = removeitemType;
	for(i =0; i < arrPartNumber.length ;i++) {
		digitalData.cartInfo.products = digitalData.cartInfo.products +';'+arrPartNumber[i]+';;;;eVar41='+arritemType[i];
		var item = {};
		item.sku = arrPartNumber[i];
		item.productType = arritemType[i];
		item.quantity = '';
		item.price = '';
		digitalData.item.push(item);

		if(i<arrPartNumber.length-1)
		{
			digitalData.cartInfo.products = digitalData.cartInfo.products +",";
		}
	}
	digitalData.anchorObj = newAnchorTagForAnalytics();
	digitalData.nextAction = function(){shoppingCartNextAction();};	
	_satellite.track("cartRemoval");
}

function trackAnalyticsEvaluationBtn(url){	
	trackDownloadAnalyticsCommon(url,true);	
}

function setAddCartLocAnalyticsCookie(){
	if(isDTMEnabled()) {
		setAdobeCookie('addToCartLocation',digitalData.pageInfo.pageName,true);
	}
}

function trackKeywordSrchExitLink(thirdpartyurl) { 
	if (typeof s_account != 'undefined') {
		var s1=s_gi(s_account);
		s1.eVar1 = "";
		s1.linkTrackVars='channel,prop1,prop2,prop3,prop6,prop8,prop9,prop10,prop11,prop13,prop14,prop16,prop18,prop21,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar15,eVar16,eVar17,eVar18,eVar19,eVar20,eVar21,eVar34,eVar35,eVar38,eVar39,eVar48,eVar51,eVar52,eVar53';
		s1.prop16="exit:"+thirdpartyurl;
		s1.eVar1="Keyword Search";
		s1.eVar16=thirdpartyurl;		
		s1.tl(this, 'e', thirdpartyurl);
		s1.eVar1=s1.prop16=s1.eVar16="";
	}
}

function trimForAnalytics(strVal) {	
	strVal = strVal.replace(/^\s+|\s+$/g,'');	
	return strVal;
}

function trackRegistrationFormStart(regInfoObj){
	var currentUrl = getCleanPageURL();
	var sitePlatFrm = regInfoObj.sitePlatform;

	digitalData.pageInfo = {};
	digitalData.eventInfo = {};
	digitalData.userInfo = {};
	digitalData.siteInfo = {};
	digitalData.formInfo = {};

	if(sitePlatFrm == "normal") {
		sitePlatFrm = "full";
	}
	var langCd = regInfoObj.langCd;
	if(langCd == '') {
		langCd = 'en';
	}

	digitalData.pageInfo.contentFinding = "";
	digitalData.userInfo.fslVisitorID = getCookieForSiteCatalyst("freescale_visitor_id");
	digitalData.siteInfo.sitePlatform = sitePlatFrm;                  
	digitalData.siteInfo.lang = langCd.toLowerCase();
	digitalData.pageInfo.localTitle = regInfoObj.scTitle;
	digitalData.pageInfo.pageName = regInfoObj.scPageName;
	digitalData.pageInfo.siteSection1 = regInfoObj.scChannel;
	digitalData.pageInfo.pageType = regInfoObj.scPageName;
	digitalData.formInfo.formName = regInfoObj.scFormName;
	digitalData.pageInfo.pageEventPathing = "formstart:"+regInfoObj.scFormName;
	digitalData.pageInfo.PageURLClean = currentUrl;                             
	_satellite.track('trackRegistrationFormStart');
}  

function remProtocolFrmUrl(strUrl) {	
	var str1=strUrl
	var patt = /[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)/;
	var res = patt.test(str1);
	if(res == true)
	{
		var wotprotocol=/^((https?|ftp):\/\/|\/\/|\/)/;
		var res=str1.replace(wotprotocol, '');
		return res;
	}

	else
	{
		var host=window.location.host+str1;
		return host;
	}
}

function mobileHeaderLangCookie() {	
	if (typeof s_account != 'undefined') {
		var s=s_gi(s_account);	
		setAdobeCookie('contentfinding', 'Header - Select Language', true);
	}
}

function fullSiteContentFinding() {	     
	if (typeof s_account != 'undefined') {
		var s=s_gi(s_account);
		setAdobeCookie('contentfinding', 'Footer - Select Fullsite', true);		
	}			
}

function newAnchorTagForAnalytics()
{	
	var anchorTag = document.createElement('a');
	anchorTag.setAttribute('href',"/anchordummylink/");
	return anchorTag;
}

function getPageURLForAnalytics(pageURL,cleanUpURL) {
	var staticPageURL = "";
	if(pageURL != null && pageURL != '') {
		staticPageURL = pageURL;
	}
	else {
		if(cleanUpURL) {
			staticPageURL = document.URL.split("?")[0];
			staticPageURL = removeLangFromURL(staticPageURL);
		} else {
			staticPageURL = document.URL;
		}
	}
	return staticPageURL;
}

function getCleanURL(href){
	var cleanURL = href;

	var code = getQryParamForAnalytics(cleanURL,'code'); 
	var colCode = getQryParamForAnalytics(cleanURL,'colCode');
	var partNum = getQryParamForAnalytics(cleanURL,'PART_NUMBER');
	var partNum1 = getQryParamForAnalytics(cleanURL,'partnumber');
	var partnerId = getQryParamForAnalytics(cleanURL,'partnerId');
	var searchLabel = getQryParamForAnalytics(cleanURL,'searchLabel');
	var packageId = getQryParamForAnalytics(cleanURL,'packageId');
	
	var cleanURL = cleanURL.split("?")[0];
	cleanURL = cleanURL.replace("http://","");
	cleanURL = cleanURL.replace("https://","");

	if(cleanURL.indexOf(URL_MAJOR_DOMAIN) > -1){
		cleanURL = removeLangFromURL(cleanURL);
		cleanURL = replaceCacheUrlDomain(cleanURL); 
		if(code != null && code != "")
			cleanURL = cleanURL+ '?code='+ code;
		if(colCode != null && colCode != "")
			cleanURL = cleanURL+ '?colCode='+ colCode;
		if(partNum != null && partNum != "")
			cleanURL = cleanURL+ '?PART_NUMBER='+ partNum;
		if(partNum1 != null && partNum1 != "")
			cleanURL = cleanURL+ '?partnumber='+ partNum1;
		if(partnerId != null && partnerId != "")
			cleanURL = cleanURL+ '?partnerId='+ code;
		if(searchLabel != null && searchLabel != "")
			cleanURL = cleanURL+ '?searchLabel='+ code;		
		if(packageId != null && packageId != "")
			cleanURL = cleanURL+ '?packageId='+ code;
	}else{
		//Do not clean 3rd Party URL
		cleanURL = href;
	}

	return cleanURL;
}

function getUrlFromElement($element){
	var href = "";
	if(typeof $element.attr('data-url') !='undefined' && $element.attr('data-url') != '')
		href = $element.attr('data-url');
	else if(typeof $element.attr('href') !='undefined' && $element.attr('href') !='#' && $element.attr('href') !='')
		href = $element.attr('href');
	else if(typeof $element.attr('data-title') !='undefined' && $element.attr('data-title') !='#' && $element.attr('data-title') !='')
		href = $element.attr('data-title');	
	return href;
}

function getCleanUrlFromElement($element){
	var href = getUrlFromElement($element);
	href = getFullUrl(href);
	href = getCleanURL(href);
	return href;
}

function getFullUrl(href){
	hrefTemp = $.trim(href);

	if(hrefTemp.indexOf("http://") != 0 && hrefTemp.indexOf("https://") != 0){ //no protocol
		if(hrefTemp.indexOf("//") != 0){		
			if(hrefTemp.indexOf(window.location.host) != 0){ //no protocol & no host
				if(href.indexOf("/") != 0) //no protocol & no host & no absolute path
					href = window.location.href + "/" + hrefTemp;
				else //no protocol & no host & absolute path
					href = window.location.protocol + "//" + window.location.host + hrefTemp;
			}else //no protocol but host is present
				href = window.location.protocol + "//" + hrefTemp;
		}else
			href = window.location.protocol + hrefTemp;			
	}else{ //the url is already full url
		href = hrefTemp;
	}
	return href;
}

function updateStandardVariablesForURL(){
	var thisURL = document.URL;
	thisURL = thisURL.split("?")[0];
	
	if(thisURL.indexOf("contact.freescale.com") > -1){
		sa_pageNamePrefix='Eloqua HS: ';
		sa_pageType='Eloqua Hypersites';
		sa_pageChannel='Eloqua Hypersites';
	}
}
function trackSoftwareCenterAnalytics(var57,var58) {
	digitalData.eventInfo={};
	digitalData.eventInfo.name='event';
	digitalData.pageInfo.pageLoadRule='Software Search';
	digitalData.eventInfo.pageAction = var57;
	digitalData.eventInfo.pageSubaction = var58;
}
function trackResellerAnalytics(var57) {
	if (typeof s_account != 'undefined') {
		var s=s_gi(s_account);
		s.linkTrackVars='channel,prop1,prop2,prop3,prop4,prop5,prop6,prop8,prop9,prop10,prop11,prop13,prop14,prop16,prop18,prop20,prop21,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar15,eVar16,eVar17,eVar18,eVar19,eVar20,eVar21,eVar22,eVar24,eVar34,eVar35,eVar38,eVar39,eVar40,eVar48,eVar51,eVar52,eVar53,eVar57,eVar58,events'; 
		s.linkTrackEvents='event34';
		s.events='event34';
		s.eVar57 = var57;
		s.tl(this,'o','Connect Reseller');
		s.eVar57="";
	}	
}

function trackRFAnalytics(orderablePartID,clicktype) {

	var currentUrl = document.URL;
	if(typeof digitalData.eventInfo=="undefined")
		digitalData.eventInfo={};

	digitalData.eventInfo.contentFinding ="browse";
	digitalData.pageInfo.trackingID = "";
	if(digitalData.pageInfo.pageType == "Keyword Search"){
		digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "Keyword Search One Box - RF Driver";
		digitalData.eventInfo.pageSubaction = "Keyword Search One Box - View " + orderablePartID + " - RF Drivers";
	}else if(digitalData.pageInfo.pageType == "Product Summary") 
	{             
		digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "Parametric Search - RF Driver";
		digitalData.eventInfo.pageSubaction = "Parametric Search - View " + orderablePartID + " - RF Drivers";
	}else if(digitalData.pageInfo.pageType == "Parametric Search"){
		digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "Parametric Search - RF Driver";
		if(clicktype=="prod"){
			digitalData.eventInfo.pageAction = "Parametric Search - RF Driver Product Level Click";
		}else if(clicktype=="parmHdr"){
			digitalData.eventInfo.pageAction = "Parametric Search - RF Driver Parametric Column Click";
		}else if(clicktype=="opn"){
			digitalData.eventInfo.pageAction = "Parametric Search - RF Driver Orderable Part Level Click";
		}
		digitalData.eventInfo.pageSubaction = "Parametric Search - View " + orderablePartID + " - RF Drivers";
	}else if(digitalData.pageInfo.pageType == "Family"){             
		digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "Parametric Search - RF Driver";
		if(clicktype=="prod"){
			digitalData.eventInfo.pageAction = "Parametric Search - RF Driver Product Level Click";
		}else if(clicktype=="parmHdr"){
			digitalData.eventInfo.pageAction = "Parametric Search - RF Driver Parametric Column Click";
		}else if(clicktype=="opn"){
			digitalData.eventInfo.pageAction = "Parametric Search - RF Driver Orderable Part Level Click";
		}
		digitalData.eventInfo.pageSubaction = "Parametric Search - View " + orderablePartID + " - RF Drivers";
	}else if(digitalData.pageInfo.siteSection1 == "More Info"){

		digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "Orderable Part More Info Window - RF Driver";
		digitalData.eventInfo.pageSubaction = "Orderable Part More Info Window - View " + orderablePartID + " - RF Drivers";
	}
	_satellite.track("trackRFAnalytics");
	digitalData.eventInfo.contentFinding=digitalData.eventInfo.pageAction=digitalData.eventInfo.eventPathing=digitalData.eventInfo.pageSubaction="";

} 

function trackRFDriverPopUpClicks(orderablePartID,pageType,click) {

	if(typeof digitalData.eventInfo=="undefined")
		digitalData.eventInfo={};  
	digitalData.eventInfo.contentFinding ="browse";
	digitalData.pageInfo.trackingID = "";

	if(pageType=='renderDrivers'){
		digitalData.eventInfo.contentFinding = "browse"
			if(click=='partNumberClick'){
				digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "RF Suggested Drivers - Part Link Clicked";
				digitalData.eventInfo.pageSubaction = "RF Suggested Drivers - View " + orderablePartID + " - Part Details";
			}
			else if (click=='moreInfoClick'){
				digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "RF Suggested Drivers -  Part More Info Icon";
				digitalData.eventInfo.pageSubaction = "RF Suggested Drivers - View " + orderablePartID + " - Part Details";
			}
			else if(click=='dataSheetClick'){
				digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "RF Suggested Drivers - View Datasheet(s)";
				digitalData.eventInfo.pageSubaction = "RF Suggested Drivers - View " + orderablePartID + " Datasheet(s)";
			}
			else if(click=='cartClick'){
				digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "RF Suggested Drivers - View Buy Options";
				digitalData.eventInfo.pageSubaction = "RF Suggested Drivers - View " + orderablePartID + " View Buy Options";
			}
			else if(click=='viewPreDriverClick'){
				digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "RF Suggested Drivers - View Predrivers";
				digitalData.eventInfo.pageSubaction = "RF Suggested Drivers - View " + orderablePartID + " Predrivers" ;
			}
	}
	else if(pageType=='renderPreDrivers'){
		digitalData.eventInfo.contentFinding = "browse"
			if(click=='partNumberClick'){
				digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "RF Suggested Predrivers - Part Link Clicked";
				digitalData.eventInfo.pageSubaction = "RF Suggested Predrivers - View " + orderablePartID + " - Part Details";
			}
			else if (click=='moreInfoClick'){
				digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "RF Suggested Predrivers -  Part More Info Icon";
				digitalData.eventInfo.pageSubaction = "RF Suggested Predrivers - View " + orderablePartID + " - Part Details";
			}
			else if(click=='dataSheetClick'){
				digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "RF Suggested Predrivers - View Datasheet(s)";
				digitalData.eventInfo.pageSubaction = "RF Suggested Predrivers - View " + orderablePartID + " Datasheet(s)";
			}
			else if(click=='cartClick'){
				digitalData.eventInfo.eventPathing = digitalData.eventInfo.pageAction = "RF Suggested Predrivers - View Buy Options";
				digitalData.eventInfo.pageSubaction = "RF Suggested Predrivers - View " + orderablePartID + " View Buy Options";
			}
	}
	_satellite.track("trackRFDriverPopUpClicks" );
	digitalData.eventInfo.contentFinding=digitalData.eventInfo.pageAction=digitalData.eventInfo.eventPathing=digitalData.eventInfo.pageSubaction="";

}


//Modified for CR-60613 Sectional navigation starts
function trackInfoUnits(clicktyp,lnkurl) {
	digitalData.eventInfo={}
	var hrefAttr=lnkurl.attr('href');
	if(typeof lnkurl.attr('data-url') !='undefined')
		hrefAttr= lnkurl.attr('data-url');
	else if (typeof lnkurl.attr('href') !='undefined' && lnkurl.attr('href')!='#'){
		if(lnkurl.attr('href').indexOf("http") < 0) {
			hrefAttr = "http://"+ location.hostname + lnkurl.attr('href');
		}else{
			hrefAttr = lnkurl.attr('href');
		}
		hrefAttr = replaceCacheUrlDomain(hrefAttr);
	}else if (typeof lnkurl.attr('data-title') !='undefined'){
		hrefAttr = lnkurl.attr('data-title');
	}
	digitalData.eventInfo.pageAction = digitalData.pageInfo.pageEventPathing = 'General Webpage Info Unit Click';
	digitalData.eventInfo.pageSubaction = hrefAttr;
	_satellite.track("trackInfoUnits");
}

function trackRightInfoAnalytics(clicktyp,lnkurl) {
	var hrefAttr=lnkurl.href;
	if (typeof s_account != 'undefined') {
		var s=s_gi(s_account);
		digitalData.pageInfo.contentFinding="";
		if(clicktyp == 'infoUnit'){
			if(lnkurl.href.indexOf("http") < 0) {
				hrefAttr = "http://"+ location.hostname + lnkurl.href;
			}else{
				hrefAttr = lnkurl.href;
			}
			hrefAttr = replaceCacheUrlDomain(hrefAttr);
			digitalData.eventInfo.pageAction = digitalData.eventInfo.pageEventPathing = 'General Webpage Info Unit Click';
			digitalData.eventInfo.pageSubaction = 'General Webpage Info Unit Click: '+ hrefAttr;                   
			if(digitalData.documentClick){
				digitalData.documentClick = false;
			}
			else{
				setAdobeCookie('subContentFinding', 'General Webpage Info Unit Click', true);
			}
		}
		_satellite.track("trackRightInfoAnalytics");
		digitalData.eventInfo.pageSubaction=digitalData.eventInfo.pageAction=digitalData.eventInfo.pageEventPathing=digitalData.pageInfo.contentFinding="";
	} 
	return true;
}

function trackInLineSearchAnalytics(keyword, count){
	keyword = $.trim(keyword);

	var kerywordRemoved = false;
	
	if(typeof digitalData.searchInfo == "undefined")
		digitalData.searchInfo = {}; 
	digitalData.eventInfo = {};

	digitalData.searchInfo.resultCount = count;	
	if(keyword != ""){
		digitalData.searchInfo.searchkeyword = keyword;
		digitalData.eventInfo.eventPathing = "Filter search applied";		
	}else{
		digitalData.eventInfo.eventPathing = "Filter search removed";
		kerywordRemoved = true;
	}
	_satellite.track("trackInLineSearchAnalytics");
	
	if(kerywordRemoved) 
		s.prop4=s.eVar50="";
}

function trackCommunitySearch(keyword){
	digitalData.eventInfo = {};
	
	if(typeof digitalData.searchInfo == "undefined")
		digitalData.searchInfo = {}; 	
	
	digitalData.eventInfo.name = "Communities Search";
	digitalData.searchInfo.searchkeyword = keyword;
	_satellite.track("trackCommunitySearch");
	digitalData.eventInfo.searchInfo = "";
}

function getSubContentFinding($element){
	if(typeof $element == 'undefined' || $element == null)
		return "";
	
	var subContentFinding = "";
	var $parentDiv = null;

	var tabName = "";
	if(typeof digitalData != 'undefined' && typeof digitalData.pageInfo != 'undefined' && typeof digitalData.pageInfo.pageTab != 'undefined')
		tabName = getFriendlyTabName(digitalData.pageInfo.pageTab);

	if($element.hasClass("dtmAssetClick")) return tabName + " tab";	

	$parentDiv = getParentDiv($element, "div.dtmGenAbstract");	
	if($parentDiv != null) return "Sectional Navigation Abstract";

	$parentDiv = getParentDiv($element, "div.dtmSection, div.dtmCommonSection, div.dtmCommonSectionTabs, section.dtmCommonSectionTabs, ul.dtmGroupSection, td.dtmTableData, div.dtmOrderButton, div.dtmButton, div.dtmGenDiv, div.dtmGenGroup, p.dtmGenGroup");
	if($parentDiv != null)
		if($parentDiv.hasClass("dtmCommonSectionTabs")){
			var section = $parentDiv.attr("data-dtmsectionname");
			if(typeof section != "undefined" && section == "Recommended Documentation")
				return tabName + " tab: Featured Section";
			else
				return tabName + " tab";

		}else if($parentDiv.hasClass("dtmCommonSection")){
			if(tabName != null && tabName != "")
				return tabName + " tab: " + $parentDiv.attr("data-dtmName");
			else
				return digitalData.pageInfo.pageType + ": "+ $parentDiv.attr("data-dtmName");
		}else if($parentDiv.hasClass("dtmTableData")){
			if(tabName != "" && getPageCategory() != "TAXONOMY")
				return tabName + " tab";
			else{
				var $parentTable = $parentDiv.parents("table.dtmTable").first();
				var tableName = $parentTable.attr("data-dtmtablename");
				if(typeof tableName != 'undefined' && tableName != null && tableName != "")
					return tableName + " Table";
			}
		}else if($parentDiv.hasClass("dtmOrderButton")){
			var $parentTable = $parentDiv.parents("table.dtmTable").first();
			if($parentTable != null){
				var tableName = $parentTable.attr("data-dtmtablename");
				if(typeof tableName != 'undefined' && tableName != null && tableName != "")
					return tableName + " Table";				
			}
		}else if($parentDiv.hasClass("dtmButton")){
			var $buttonDiv = $element.parents("div").first();
			if($buttonDiv != null){
				var buttonName = $buttonDiv.attr("data-dtmname");
				if(typeof buttonName != 'undefined' && buttonName != null && buttonName != "")
					return buttonName;								
			}
		}else if($parentDiv.hasClass("dtmGenDiv")){
		    var $genDiv = $element.parents("div").first();
			if($genDiv != null){
			 var genDivName = $genDiv.attr("data-dtmsection");
			if(typeof genDivName != 'undefined' && genDivName != null && genDivName != "")
				return genDivName;
			}
		}else if($parentDiv.hasClass("dtmGenGroup")){
				return "Rich Media Snippet";
			
		}else
			return $parentDiv.attr("data-dtmName");
		
	return subContentFinding;
}

function getParentDiv($element, parentClass){
	var $parentDiv = $element.parents(parentClass).first();
	if($parentDiv.length == 0) return null;
	return $parentDiv;
}

function getFriendlyTabName(tabName){
	switch(tabName){
		case "Documentation_Tab":return "Documentation";
		case "Training_Support_Tab":return "Training & Support";
		case "Design_Support_Tab":return "Training & Support";
		case "Design_Tools_Tab":return "Software & Tools";
		case "Hardware_Tab":return "Hardware & Tools";
		case "Package_Quality_Tab":return "Package and Quality";
		case "In-Depth_Tab":return "In-Depth";
		default:return tabName;
	}
}
function setCookiesForDownload(isShortUrl) {
	if(isShortUrl) {
		setAdobeCookie('parent_sc_eVar16',digitalData.eventInfo.assetID);
		setAdobeCookie('parent_sc_eVar17',digitalData.siteInfo.sitePlatform);
		setAdobeCookie('parent_sc_eVar18',digitalData.siteInfo.lang);
		setAdobeCookie('parent_sc_prop18',digitalData.pageInfo.nodeID);
		setAdobeCookie('parent_sc_pageURL',digitalData.pageInfo.pageURLClean);
		setAdobeCookie('parent_sc_pageReferrer',s.referrer);
	}
	setAdobeCookie('doc_nodeid',digitalData.pageInfo.nodeID);
	setAdobeCookie('parent_sc_channel',digitalData.pageInfo.siteSection1);
	setAdobeCookie('parent_sc_prop1',digitalData.pageInfo.pageType);
	setAdobeCookie('parent_sc_prop2',digitalData.pageInfo.siteSection2);
	setAdobeCookie('parent_sc_prop3',digitalData.pageInfo.siteSection3);
	setAdobeCookie('parent_sc_prop6',s.prop6);
	setAdobeCookie('parent_sc_prop8',digitalData.pageInfo.siteSection4);
	setAdobeCookie('parent_sc_prop9',digitalData.pageInfo.siteSection5);
	setAdobeCookie('parent_sc_prop10',digitalData.pageInfo.siteSection6);
	setAdobeCookie('parent_sc_prop11',digitalData.pageInfo.siteSection7);
	setAdobeCookie('parent_sc_prop21',digitalData.pageInfo.pageName);
	setAdobeCookie('parent_sc_prop23',digitalData.pageInfo.pageTemplate);
	setAdobeCookie('parent_sc_eVar1',digitalData.eventInfo.contentFinding);
	setAdobeCookie('parent_subContentFinding', digitalData.eventInfo.subContentFinding);
	setAdobeCookie('parent_sc_eVar2',s.eVar2);
	setAdobeCookie('parent_sc_eVar3',s.eVar3);
	setAdobeCookie('parent_sc_eVar19',digitalData.pageInfo.localTitle);
	setAdobeCookie('parent_sc_eVar21',digitalData.pageInfo.pageCodeID);
	setAdobeCookie('parent_sc_eVar34',s.eVar34);
	setAdobeCookie('parent_sc_eVar35',s.eVar35);
	setAdobeCookie('parent_sc_eVar48',digitalData.pageInfo.pageName);
	setAdobeCookie('parent_sc_pageName',digitalData.pageInfo.pageName);
	setAdobeCookie('parent_sc_sourceID',s.eVar68);
	setAdobeCookie('parent_sc_sourceType',s.prop26);
}

function isCrossDomain(s_hrefUrl){	
	var s_domain = document.domain;
	s_domain = s_domain.replace(/^[^.]+\./g, "");	
	var s_hrefUrl_arr = s_hrefUrl.replace('http://','').replace('https://','').replace(/^[^.]+\./g, "").split(/[/?#]/);
		
	if(s_domain == s_hrefUrl_arr[0]) {
		return false;
	}
	return true;  
}

function removeQueryParam(url, parameter) {
	var urlValues = url.split('?');
	if (urlValues.length>=2)
	{
		var baseUrl=urlValues.shift();  
		var queryString=urlValues.join("?");  
		var prefix = encodeURIComponent(parameter)+'=';
		var parseVal = queryString.split(/[&;]/g);
		for (var i = parseVal.length; i-- > 0;)  {
			if (parseVal[i].lastIndexOf(prefix, 0)!==-1) {
				parseVal.splice(i, 1);
			}            		
		}                   		
		url = baseUrl+'?'+parseVal.join('&');
	}	
	return url;
}

function setContentFindingForHdrSearch(searchFilter) {
	var s_extraQryParam = "";
	
	if(searchFilter == "ChemicalFinder")
		return "";
	
	if(searchFilter == "")
		searchFilter = "All";
	searchFilter = "Search Filter: " + searchFilter;
	
	if(!isCrossDomain(URL_DOMAIN)) { 			
		setAdobeCookie('contentfinding', 'Header');
		setAdobeCookie('subContentFinding', searchFilter);
	} else {
		s_extraQryParam = "hdr=1&subcf=" + searchFilter;				
	}
	return s_extraQryParam;
}