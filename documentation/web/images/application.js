

//DHTML Window script- Copyright Dynamic Drive (http://www.dynamicdrive.com)
//For full source code, documentation, and terms of usage,
//Visit http://www.dynamicdrive.com/dynamicindex9/dhtmlwindow.htm

var dragapproved=false
var minrestore=0
var initialwidth,initialheight
var ie5=document.all&&document.getElementById
var ns6=document.getElementById&&!document.all

function iecompattest(){
return (!window.opera && document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function drag_drop(e){
if (ie5&&dragapproved&&event.button==1){
document.getElementById("dwindow1").style.left=tempx+event.clientX-offsetx+"px"
document.getElementById("dwindow1").style.top=tempy+event.clientY-offsety+"px"
}
else if (ns6&&dragapproved){
document.getElementById("dwindow1").style.left=tempx+e.clientX-offsetx+"px"
document.getElementById("dwindow1").style.top=tempy+e.clientY-offsety+"px"
}
}

function initializedrag1(e){
offsetx=ie5? event.clientX : e.clientX
offsety=ie5? event.clientY : e.clientY
//document.getElementById("dwindowcontent1").style.display="none" //extra

tempx=parseInt(document.getElementById("dwindow1").style.left)
tempy=parseInt(document.getElementById("dwindow1").style.top)

dragapproved=true
document.getElementById("dwindow1").onmousemove=drag_drop
}

function loadwindow(url,width,height){
//alert("Initial width"+width);
if (!ie5&&!ns6)
{

document.getElementById("dwindow1").style.scrollbars="no"
document.getElementById("dwindow1").style.left="230"
window.open(url,"","width=width,height=height,scrollbars=no,resizeable=no")
}
else{

document.getElementById("blockwindow1").style.width=initialwidth=(parseInt(width)+28)+"px" ;



var w = screen.availWidth;
var h= screen.availHeight;

var actualWidth=((w-width)/2)+"px";
var actualHeight=(((h-height)/2)-100)+"px";

//document.getElementById("dwindow1").style.left=actualWidth;
//document.getElementById("dwindow1").style.top=actualHeight;
document.getElementById("divBottomRight").style.zIndex="-1"; 
var head=document.getElementById('divopacity1');
jQuery('#divopacity1').attr('class','loadingbar');
head.style.display=''
//document.getElementById("cluetip-outer").style.width="325px";

//by b37000 for cr31505: replacting '$' with 'jQuery' start
/*
$.get(encodeURI(url), function (data, textStatus, xmlHttpRequest){
	$("divopacity1").removeClass('loadingbar');
*/

	//Added by r9798z for CR-46320 on 02-Apr-2013 starts
	if(url.indexOf("/webapp/connect/partnerprofile/PartnerEcoMap.jsp") == 0){
		//Eco Map
		var posPartnerId = url.indexOf("&partnerId=");
		var tempURL = url.substring(0, posPartnerId);
		var partnerId = url.substring(posPartnerId + 11);
		encodedURL = encodeURI(tempURL) + "&partnerId=" + encodeURIComponent(partnerId);

	}else{	
		var encodedURL = encodeURI(url);
	}
	//Added by r9798z for CR-46320 on 02-Apr-2013 ends

	//Modified by r9798z for CR-46320 on 02-Apr-2013 starts
//jQuery.get(encodeURI(url), function (data, textStatus, xmlHttpRequest){
jQuery.get(encodedURL, function (data, textStatus, xmlHttpRequest){
	//Modified by r9798z for CR-46320 on 02-Apr-2013 ends
	jQuery("divopacity1").removeClass('loadingbar');
//by b37000 for cr31505: replacting '$' with 'jQuery' end	
	document.getElementById('divopacity1').style.display="none";
	//document.getElementById("dwindowcontent1").style.height = "100%";
	document.getElementById("dwindow1").style.display=''
	
	document.getElementById("dwindow1").style.width= (parseInt(width)+30)+"px";
	document.getElementById("dwindowcontent1").style.height = (parseInt(height)+30)+"px";
	document.getElementById("dwindowcontent1").style.width = (parseInt(width)+30)+"px";
	//document.getElementById("cframe1").style.left=actualWidth;
	//document.getElementById("cframe1").style.top=(parseInt(actualHeight)+32)+"px";
//by b37000 for cr31505: replacting '$' with 'jQuery' start
	/*
	$("#cframe1").html(data);
	$("#cframe1 a.local").cluetip({
	*/
	jQuery("#cframe1").html(data);
	jQuery("#cframe1 a.local").cluetip({
//by b37000 for cr31505: replacting '$' with 'jQuery' end	
			  hoverIntent: {
				sensitivity:  1,
				interval:     50,
				timeout:      100    
			  },
			  fx:{open:"fadeIn", openSpeed:"slow"},
			  onShow: function(ct, ci){				
				ct.find("div:eq(0)").css("width", "325px");
				ct.find("div:eq(1)").css("width", "325px");
				ct.find("div:eq(2)").css("width", "325px");
			  }
			});
	document.getElementById("cluetip-outer").style.width="325px";
	$("#cluetip-waitimage").css("z-index", "300");
	$("#cluetip").css("z-index", "300");
});




}
}




function closeit1(){
var transparentLayer=document.getElementById('divBlockLayer');

document.getElementById("dwindow1").style.display="none";
 hideBlock1()




}

function stopdrag1(){
//alert("stop")
dragapproved=false;
document.getElementById("dwindow1").onmousemove=null;
document.getElementById("dwindowcontent1").style.display="" //extra

}

function knowkey(e)
{

//alert(e.keyCode);
if(e.keyCode==27)
document.getElementById("dwindow1").style.display="none";

hideBlock1() 

}

function hideBlock1(){
 var transparentLayer=document.getElementById('divBlockLayer');
 opacityEffect('divBlockLayer', 100,50, 100)
 //setTimeout('clearIt()',400);
 //call_feedbackMetrics("cancel"); 
 document.getElementById('divBlockLayer').style.display="none";
 document.getElementById("divBottomRight").style.zIndex="8";
 document.getElementById("cluetip").style.display="none"

 } 








/*<![CDATA[*/

function clearAllCriteria(){
	var selectedAsset = getParameter('SelectedAsset');
	var code = getParameter('code');
	var nodeId = getParameter('nodeId');
	var assetLockedForNavigation = getParameter('assetLockedForNavigation');
	var fromASP = getParameter('fromASP');
	var tab = getParameter('tab');
	var componentId = getParameter('componentId');
	var leftNavCode = getParameter('leftNavCode');
	var assetNameForProdMetaId = "";

	var applicationId = getParameter('supportedApplication');

	
	var supportedApplication = '';

	if(applicationId !=null){
		supportedApplication = '&supportedApplication='+applicationId+'';
	}

	document.searchform.action = 'application.jsp?tab='+tab+'&nodeId='+nodeId+'&code='+code+'&SelectedAsset='+selectedAsset+supportedApplication+'&assetLockedForNavigation='+assetLockedForNavigation+'&fromASP='+fromASP+'&componentId='+componentId+'&leftNavCode='+leftNavCode;
	document.getElementById("keywordTxt").value="";
	document.searchform.submit();
}
function submit2(){
	var stateEle = document.getElementById('stateString');
	var stateStr = "";
	if(stateEle!=null){
		stateStr = decodeFromDivState(stateEle.value);
		while(stateStr.indexOf('`!')!=-1){
			stateStr = stateStr.replace('`!','&');
		}
	}
	document.searchform.action = 'application.jsp?'+ stateStr;
	document.searchform.submit();
}


function downaload(str){
	removeParameter('pageSize');
	removeParameter('pageNum');
	var stateEle = document.getElementById('stateString');
	var stateStr = "";
	if(stateEle!=null){
		stateStr = decodeFromDivState(stateEle.value);
		while(stateStr.indexOf('`!')!=-1){
			stateStr = stateStr.replace('`!','&');
		}
	}
	document.downloadResultsForm.action = '/webapp/search/SerpDownload.jsp?'+ stateStr+str;
	document.downloadResultsForm.submit();
}

function getPartDetail(partcode) {
document.PartDetail.PART_NUMBER.value=partcode;
document.PartDetail.submit();
}
function PartAction() {
window.document.location.href="#orderables";
}
var pageNodeId =null;
if(document.getElementById("pageNodeId")!=null)
 pageNodeId = document.getElementById("pageNodeId").value;
function recordHistoryTimeOut(){
	if(document.getElementById("pageType")!=null){
		var pageType= document.getElementById("pageType").value;
		recordWebpageHistory(pageNodeId,pageType,recordCommandValue);
	}
}
var recordTime=null,recordCommandValue=null,noteTxt=null;
if(document.getElementById("recordHistoryTime")!=null)
 recordTime=document.getElementById("recordHistoryTime").value;
if(document.getElementById("recordHistoryCommand")!=null)
 recordCommandValue = document.getElementById("recordHistoryCommand").value;
if(document.getElementById("noteTxt")!=null)
 noteTxt=document.getElementById("noteTxt").value;
function onloadworkAround(){
if(noteTxt=='true')
{
	
	viewAll(true,pageNodeId,'WEBPAGE','');
}
setTimeout(recordHistoryTimeOut, (recordTime)*1000);
}
window.onscroll = processScroll;
window.onscroll = processScrollStatic;
window.onload = clearURLBox;
addLoadEvent(onloadworkAround);

//Modified CR50596 by b47545 -start 
	function openImage(title,imageUrl,code,nodeId,width,height,fastpreview){ 
       var url = getPreviewUrl('../components/image_popup.jsp?image=' +imageUrl +'&code='+ code+'&nodeId='+nodeId,fastpreview);
       ajaxwin=dhtmlwindow.open('ajaxbox1',url,title,'width='+width+'px,height='+height+'px,left=50px,top=100px,resize=0,scrolling=0');
    return false ;  
 }	
//CR-50596  End
	
    //modified by b37000 for CR40877 on 12 Dec 2011: Start    
	//function openBlockDrg(title,imageUrl,code,nodeId,width,height,fastpreview,assetCode){
	function openBlockDrg(title,imageUrl,code,nodeId,width,height,fastpreview,assetCode,releaseLevel,lang_cd){
	//modified by b37000 for CR40877 on 12 Dec 2011: End
	    
		width-=30; 
		height-=30;
		//url="../components/hot.jsp?image="+imageUrl+"&code="+code;
		//Added By B31781 fro Cr-46320 on 25 Sep,2012 Start
		if(title=="EcoMaps"){ 		
		url="/webapp/connect/partnerprofile/PartnerEcoMap.jsp?blkDiagram="+imageUrl+"&imageCode="+code+"&height="+height+"&width="+width+"&title="+title+"&assetCode="+assetCode+"&nodeId="+nodeId+"&releaseLevel="+releaseLevel+"&partnerId="+lang_cd;
		}
		//Added By B31781 fro Cr-46320 on 25 Sep,2012 End	//url="../components/applications/app_blockdiagram.jsp?blkDiagram="+imageUrl+"&imageCode="+code+"&height="+height+"&width="+width+"&title="+title+"&assetCode="+assetCode;;
		else{		
		url="../components/applications/app_blockdiagram.jsp?blkDiagram="+imageUrl+"&imageCode="+code+"&height="+height+"&width="+width+"&title="+title+"&assetCode="+assetCode+"&nodeId="+nodeId+"&releaseLevel="+releaseLevel+"&lang_cd="+lang_cd;
		} 
		//modified by b37000 for CR40877 on 12 Dec 2011: End	
		var transparentLayer=document.getElementById('wrapper1');
			
		var divopacity1=document.getElementById('divopacity1'); 	
		var fbLayer=document.getElementById('divBlockLayer');
		if(fbLayer!=null){
		
			fbLayer.style.innerHTML="";
		}
		transparentLayer.style.zIndex="300";
		divopacity1.style.zIndex="300";
		opacityEffect('divBlockLayer', 0, 50, 100)
		if(title=="EcoMaps"){  
		document.getElementById('divBlockLayer').style.zIndex="290";//feedBackajaxbox
		}else{
		document.getElementById('divBlockLayer').style.zIndex="300";//feedBackajaxbox
		}
		flag=0;
		flagCentre=0;
		
		
		loadwindow(url,width,height);
	    BlockDiagMetrics(imageUrl);	//Added For Marketing Automation Project CR40895 by B28384 on 03rd Nov 2011.
		// Added for CR54489
		if(typeof trackAnalyticsBlockDiagram == 'function') { 
			trackAnalyticsBlockDiagram(imageUrl,title);
		}		
		return false ;
	}
	//Added the below function for displaying the new style of block diagram for freescale Mobile project by b28379

	function openProductBlockDrg(title,imageUrl,code,nodeId,width,height,fastpreview,assetCode){
	    

		if((assetCode!=null) && assetCode=="Device")
		url="/webapp/sps/components/imageHot.jsp?image="+imageUrl+"&code="+code;
		else
		url="/webapp/sps/components/hot.jsp?image="+imageUrl+"&code="+code;

		url = getPreviewUrl(url,fastpreview);

		var transparentLayer=document.getElementById('wrapper1');
			
		var divopacity1=document.getElementById('divopacity1');
		var fbLayer=document.getElementById('divBlockLayer');
		if(fbLayer!=null){
		
			fbLayer.style.innerHTML="";
		}
		transparentLayer.style.zIndex="60";
		divopacity1.style.zIndex="60";
		//document.getElementById('cframe1').style.font="100%";
		//$('cframe1').css('font-size', '100%');
		$('#cframe1').css('font-size', '100%') 

		opacityEffect('divBlockLayer', 0, 50, 100) 
		document.getElementById('divBlockLayer').style.zIndex="59";//feedBackajaxbox
		flag=0;
		flagCentre=0;
		
		var o=document.getElementById("dwindow1");
		var r=o.style;
		
		/*
		alert('height:'+height);
		r.top=((450-parseInt(height))/2)+'px';	
		*/
		//  r.left=((600-parseInt(width))/2)+'px';	
		//end of addition
		loadwindow(url,width,height);
		/*End of showing the popup in center */
		BlockDiagMetrics(imageUrl);	//Added For Marketing Automation Project CR40895 by B28384 on 03rd Nov 2011.
		// Added for CR54489		
		if(typeof trackAnalyticsBlockDiagram == 'function') { 
			trackAnalyticsBlockDiagram(imageUrl,title);
		}	
		return false ;
	}
	function getPreviewUrl(url, fastpreview){
		if(fastpreview!=null  &&  (trim(fastpreview) != '' ) )
		{
			return url+'&fastpreview=1' ;
		}else{
			return url ;
		}
	}

function minimizeMaximize(div_id,img_id,buttonid)
{
	if(document.getElementById(div_id).style.display=='none'){
		document.getElementById(img_id).src="/shared/images/minus.gif";
		document.getElementById(div_id).style.display="block";
		if(document.getElementById(buttonid) != 'undefined' && document.getElementById(buttonid) != null){
			document.getElementById(buttonid).style.display="block";
		}
	}else{
		document.getElementById(img_id).src="/shared/images/plus.gif";
		document.getElementById(div_id).style.display='none';
		if(document.getElementById(buttonid) != 'undefined' && document.getElementById(buttonid) != null){
			document.getElementById(buttonid).style.display='none';
		}
	}
}
/*]]>*/


function exportAppPDF(appCode){
	url='/webapp/AppOverviewPDF?appCode='+appCode;
	window.open(url,"","width=300,height=300,left=200,top=200,scrollbars=yes,resizeable=yes");
}
