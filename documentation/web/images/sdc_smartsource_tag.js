<!-- START OF SDC Advanced Tracking Code -->
<!-- Copyright (c) 1996-2005 WebTrends Inc.  All rights reserved. -->
<!-- V7.5 -->
<!-- $DateTime: 2005/08/25 15:58:46 $ -->
<!-- Placed into production 10/01/2005 - 1st party cookie tracking - r59723 -->
<!-- Updated gdomain for the switchover from OnDemand 09/01/2006 - r59723 -->
<!-- Updated flash detection code (search WT.fi below) to newest code 10/27/2006 - r59723 -->
<!-- 2nd pass Code from Webtrends Sr. Tech P.J. Bocek put in test UAT page to resolve new vs. return 03/15/2007 - r59723 Production 8/16/2007 -->
<!-- File metrics put in place to capture left and right clicks PRODUCTION 8/16/2007 IN METRICS LOGS 9/1/2007 - r59723 -->
<!-- Test of Registered Download and FAQ 9/4/2007 - IN PRODUCTION ON 11/17/2007 - r59723 -->
<!-- Supporting November 2007 Tools release, added ampersand replace of WT_TYPE parameter PRODUCTION 11/17/2007 - r59723 -->
<!-- Revising Registered download dcsuri, adding code for moderated downloads and licensed downloads PRODUCTION 12/5/2007 - r59723 -->
<!-- Title manipulation for training info pages IN PRODUCTION ON 4/30/2008 - r59723 -->
<!-- Revise dcstypematch to account for file extension case sensitivity in PRODUCTION 4/30/2008 - r59723 -->
<!-- Initial Code for youtube and thirdparty metrics for June 2008 release in PRODUCTION 6/13/2008 - r59723 -->
<!-- Changed replace of & for download clicks to regex type global replace, in addition to & replace for youtube and 3rd party metrics in PRODUCTION 6/19/2008 - r59723 -->
<!-- Adding of campaign_lp removal code for click events (downloads, youtube, 3rd party metrics) in PRODUCTION 6/27/2008 - r59723 -->
<!-- Campaign_lp removal code for all traffic (see end of dcsCreateImage) - in PRODUCTION 7/7/2008 - r59723 -->
<!-- Clear DCSext.cta parameter at end of dcsmultitrack.  Also, set DCSext.referring_url (see begin of dcstag) in PRODUCTION 8/1/2008 - r59723 -->
<!-- Add .iso file tracking in PRODUCTION 1/26/2009 - r59723 -->
<!-- Add .air file tracking as well as first function updates prep for March 14 release -->
<!-- Add offsite referral clicks 5/4/2009 -->
<!-- Add youtube check (for homepage only) 6/19/2009 -->
<!-- Add campaign ahppopup tracking function 2/25/2010 -->
<!-- Added cache.freescale.com to dcsisonsite in prep for CDN project to capture CDN file clicks 3/19/2010  -->
<!-- Adding sdc_version tag (see dcstag function) 3/24/2010 -->
<!-- Adding recommendations code-->
<!-- Adding Eloqua tracking of onsite files (left and right clicks), mod, registered, licensed DLs (left only clicks) 10/13/2010 -->
<!-- Adding SendButtonAction function for September Sep 2011 Marketing Automation release 9/17/2011 -->
<!-- Adding Block Diagram click metrics function (Webtrends, Eloqua) Nov 2011 release 11/11/11 -->
<!-- Refine Eloqua tracking Block Diagram, video click metrics 3/5/12 -->
<!-- cta removal code for all traffic (see end of dcsCreateImage) - in PRODUCTION 8/28/2012 - r59723 -->
<!-- Updates for Global Reach - Japan - 11/30/12 -->
<!-- Fix serp.jsp Global reach language option 12/5/12 -->
<!-- Fix serp.jsp Global reach language option for Japan and China. Add community offsite clicks 5/20/13 -->
<!-- Add new function campaign_cta_onclick for onclick campaign tracking  7/31/13 -->
<!-- Added Function trackPSPAccordion to make a call to Adobe Site Catalyst for SSP,RDSP,PSP Accordion clicks in Features Section-->

var gService = false;
var gTimeZone = -6;

//r59723 code to extract query parameter value
function extractQP(name)
{
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var tmpURL = window.location.href;
  var results = regex.exec( tmpURL );
  if( results == null )
    return "";
  else
    return results[1];
}

function eloqua_tracking(url){
  //Function checks if Eloqua defined on page, and if the page is "on site".
	//Function assumes url being called is ok to go to Eloqua (is onsite, etc.)
	if ((typeof elqFCS == 'function') && (dcsIsOnsite(window.location.hostname))){
		url=url.replace("cache.freescale.com","www.freescale.com");
	  
		//replace ampersands that might be part of wt_type values
		var sidx = url.indexOf("WT_TYPE=");
		if (sidx != -1){
      var eidx = url.indexOf("&WT_", sidx);
      var wt_type = url.substring(sidx+8, eidx);
      var e_wt_type = wt_type.replace(/&/g, "and");
		  url = url.replace(wt_type,e_wt_type);
    }
    elqFCS(url);
		url="";
	}
}

// Code section for Enable First-Party Cookie Tracking
function dcsCookie(){
	if (typeof(dcsOther)=="function"){
		dcsOther();
	}
	else if (typeof(dcsPlugin)=="function"){
		dcsPlugin();
	}
	else if (typeof(dcsFPC)=="function"){
		dcsFPC(gTimeZone);
	}
}
function dcsGetCookie(name){
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
function dcsGetCrumb(name,crumb){
	var aCookie=dcsGetCookie(name).split(":");
	for (var i=0;i<aCookie.length;i++){
		var aCrumb=aCookie[i].split("=");
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
function dcsGetIdCrumb(name,crumb){
	var cookie=dcsGetCookie(name);
	var id=cookie.substring(0,cookie.indexOf(":lv="));
	var aCrumb=id.split("=");
	for (var i=0;i<aCrumb.length;i++){
		if (crumb==aCrumb[0]){
			return aCrumb[1];
		}
	}
	return null;
}
function dcsIsFpcSet(name,id,lv,ss){
	if (id==dcsGetIdCrumb(name,"id")){
		if (lv==dcsGetCrumb(name,"lv")){
		   	if (ss=dcsGetCrumb(name,"ss")){
				return true;
			}
		}
	}
	return false;
}
function dcsFPC(offset){
	if (typeof(offset)=="undefined"){
		return;
	}
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}
	var name=gFpc;
	var dCur=new Date();
	var adj=(dCur.getTimezoneOffset()*60000)+(offset*3600000);
	dCur.setTime(dCur.getTime()+adj);
	var dExp=new Date(dCur.getTime()+315360000000);
	var dSes=new Date(dCur.getTime());
	WT.co_f=WT.vt_sid=WT.vt_f=WT.vt_f_a=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
	if (document.cookie.indexOf(name+"=")==-1){
		if ((typeof(gWtId)!="undefined")&&(gWtId!="")){
			WT.co_f=gWtId;
		}
		else if ((typeof(gTempWtId)!="undefined")&&(gTempWtId!="")){
			WT.co_f=gTempWtId;
			WT.vt_f="1";
		}
		else{
			WT.co_f="2";
			var cur=dCur.getTime().toString();
			for (var i=2;i<=(32-cur.length);i++){
				WT.co_f+=Math.floor(Math.random()*16.0).toString(16);
			}
			WT.co_f+=cur;
			WT.vt_f="1";
		}
		if (typeof(gWtAccountRollup)=="undefined"){
			WT.vt_f_a="1";
		}
		WT.vt_f_s=WT.vt_f_d="1";
		WT.vt_f_tlh=WT.vt_f_tlv="0";
	}
	else{
		var id=dcsGetIdCrumb(name,"id");
		var lv=parseInt(dcsGetCrumb(name,"lv"));
		var ss=parseInt(dcsGetCrumb(name,"ss"));
		if ((id==null)||(id=="null")||isNaN(lv)||isNaN(ss)){
			return;
		}
		WT.co_f=id;
		var dLst=new Date(lv);
		WT.vt_f_tlh=Math.floor((dLst.getTime()-adj)/1000);
		dSes.setTime(ss);
		if ((dCur.getTime()>(dLst.getTime()+1800000))||(dCur.getTime()>(dSes.getTime()+28800000))){
			WT.vt_f_tlv=Math.floor((dSes.getTime()-adj)/1000);
			dSes.setTime(dCur.getTime());
			WT.vt_f_s="1";
		}
		if ((dCur.getDay()!=dLst.getDay())||(dCur.getMonth()!=dLst.getMonth())||(dCur.getYear()!=dLst.getYear())){
			WT.vt_f_d="1";
		}
	}
	WT.co_f=escape(WT.co_f);
	WT.vt_sid=WT.co_f+"."+(dSes.getTime()-adj);
	var expiry="; expires="+dExp.toGMTString();
	document.cookie=name+"="+"id="+WT.co_f+":lv="+dCur.getTime().toString()+":ss="+dSes.getTime().toString()+expiry+"; path=/"+(((typeof(gFpcDom)!="undefined")&&(gFpcDom!=""))?("; domain="+gFpcDom):(""));
	if (!dcsIsFpcSet(name,WT.co_f,dCur.getTime().toString(),dSes.getTime().toString())){
		WT.co_f=WT.vt_sid=WT.vt_f_s=WT.vt_f_d=WT.vt_f_tlh=WT.vt_f_tlv="";
		WT.vt_f=WT.vt_f_a="2";
	}
}

// Code section for Use an existing first-party cookie.
function dcsOther(){
	if (typeof(gFpc)!="undefined"){
		if (dcsGetCookie("freescale_visitor_id")){
			gTempWtId=dcsGetCookie("freescale_visitor_id");
			dcsFPC(gTimeZone);
		}
		else if (dcsGetCookie(gFpc)){
			document.cookie=gFpc+"=; expires=Thu, 01-Jan-1970 00:00:01 GMT";
		}
	}
	else if (dcsGetCookie("freescale_visitor_id")){
		WT.co_f=escape(dcsGetCookie("freescale_visitor_id"));
	}
}

function dcsParseSvl(sv){
	sv=sv.split(" ").join("");
	sv=sv.split("\t").join("");
	sv=sv.split("\n").join("");
	var pos=sv.toUpperCase().indexOf("WT.SVL=");
	if (pos!=-1){
		var start=pos+8;
		var end=sv.indexOf('"',start);
		if (end==-1){
			end=sv.indexOf("'",start);
			if (end==-1){
				end=sv.length;
			}
		}
		return sv.substring(start,end);
	}
	return "";
}

function dcsIsPage(uri){
	var doms=".jsp,.html,.htm,.framework";
  //var doms="@@ONSITEDOMAINS@@";
    var aDoms=doms.split(',');
    for (var i=0;i<aDoms.length;i++){
		//if (aDoms[i].indexOf(uri)!=-1){
		if (uri.indexOf(aDoms[i])!=-1){
		       return 1;
		}
    }
    return 0;
}

function dcsIsOnsite(host){
	var doms="www.freescale.com,cache.freescale.com";
  //var doms="@@ONSITEDOMAINS@@";
    var aDoms=doms.split(',');
    for (var i=0;i<aDoms.length;i++){
		//if (host.indexOf(aDoms[i])!=-1){
		if (aDoms[i].indexOf(host)!=-1){
		       return 1;
		}
    }
    return 0;
}
function dcsIsHttp(e){
	return (e.href&&e.protocol&&(e.protocol.indexOf("http")!=-1))?true:false;
}
function dcsTypeMatch(path, typelist){
	var type=path.substring(path.lastIndexOf(".")+1,path.length);
	var types=typelist.split(",");
	//r59723 added lower_type to account for case sensitivity 4/30/2008
	var lower_type = type.toLowerCase();
	for (var i=0;i<types.length;i++){
		if (lower_type==types[i]){
			return true;
		}
	}
	return false;
}

// Code section for Track clicks to download links.
function dcsDownload(evt){
	evt=evt||(window.event||"");
	if (evt&&((typeof(evt.which)!="number")||(evt.which==1))){
		var e=dcsEvt(evt,"A");
		//if (e.hostname&&dcsIsOnsite(e.hostname)){ //offsite external update
	  if (e.hostname){ //onsite/offsite update
			var onsite_click = dcsIsOnsite(e.hostname); //onsite/offsite update
			
			var types="xls,doc,ppt,tgz,rar,tar,pdf,txt,csv,zip,exe,iso,air";
			
			//START Code section for History Popup (Personalization/History Project Mar 2009)
			//UPDATE for Recommendations
			var history_recommendations_popup = null;
			//Comment out for Recommendations var history_popup = 0;
	    //ref = e.srcElement;
			ref = e;
			if ((document.getElementById("historyajaxbox")) || (document.getElementById("site-bottom-bar")) || (document.getElementById("site-top-bar"))){
			//Comment out for Recommedations if (document.getElementById("historyajaxbox")){
	      while (history_recommendations_popup == null){
	      // Comment out Recommendation while (history_popup == 0){
		      ref = ref.parentNode;
		      if (ref.nodeType==1){ //check that the node is a tag, not text (type=3) 
			      if ((String(ref.nodeName)=="DIV") && (String(ref.id) == "historyajaxbox")){
						    history_recommendations_popup = "history";
					  } // end of div and historyajaxbox check
						else if ((String(ref.nodeName)=="DIV") && (String(ref.id) == "site-bottom-bar")){
						    history_recommendations_popup = "recommendations_general";
						} // end of else if 
						else if ((String(ref.nodeName)=="DIV") && (String(ref.id) == "site-top-bar")){
						    history_recommendations_popup = "recommendations_personal";
						} // end of else if 
			      else if (String(ref.nodeName)=="BODY") {
					    history_recommendations_popup = "body";
				      break;
			      } //end of else if
				  } // end of nodeType = 1 check
	       } // end of while loop
			}//end of check for getElementById("historyajaxbox")
			 //END Code section for History Popup (Personalization/History Project Mar 2009)
			 
			var faq_click = e.pathname.indexOf("TransformXMLServlet");
			var reg_dl = e.pathname.indexOf("webapp/Download");
			var mod_dl = e.pathname.indexOf("download/mod_download.jsp");
			var lic_dl = e.pathname.indexOf("download/license.jsp");
			if ((dcsTypeMatch(e.pathname,types))||(faq_click !=-1)||(reg_dl != -1)||(mod_dl != -1)||(lic_dl != -1)||((history_recommendations_popup != null) && (history_recommendations_popup != "body")) || (!onsite_click)){ //onsite/offsite update
			//if ((dcsTypeMatch(e.pathname,types))||(faq_click !=-1)||(reg_dl != -1)||(mod_dl != -1)||(lic_dl != -1)||(history_recommendations_popup == "history")){ //onsite/offsite update
			//if ((dcsTypeMatch(e.pathname,types))||(faq_click !=-1)||(reg_dl != -1)||(mod_dl != -1)||(lic_dl != -1)){
				var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
				var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
				if (qry.toUpperCase().indexOf("WT.SVL=")==-1){
					WT.svl=dcsParseSvl(e.name?e.name.toString():(e.onclick?e.onclick.toString():""));
				}
				var checkNodeID=extractQP('nodeId');
				if (checkNodeID != ""){
					 DCSext.nodeId = checkNodeID;
				}
								
				var prevdcsref = "";
			  if (DCS.dcsref){
					 prevdcsref = DCS.dcsref;
				}
				
				//Check for campaign_lp parameter on page and clear it before click if there is one.
				var prev_camplp = "";
				if (DCSext.campaign_lp){
				  prev_camplp = DCSext.campaign_lp;
					DCSext.campaign_lp="";
				}
				
				//Set referral page to existing page.  Used for non-history layer files and virtual history page
				DCS.dcsref = window.location.protocol+'//'+window.location.hostname+window.location.pathname+window.location.search;
				
				var prev_nodeID = ""; //Used to store any previous DCSext.nodeID...not used for history.
				
				 //Personalization and History Code
			  if ((history_recommendations_popup != null )&& (history_recommendations_popup != "body")){
				  var history_recommendations_URI = null;
					var history_recommendations_title = null;
				  switch (history_recommendations_popup){
					case "history":
							 history_recommendations_URI = "/webapp/sps/site/history_popup.jsp";
							 history_recommendations_title = "History Popup Window";
							 break;
					case "recommendations_general":
					     history_recommendations_URI = "/webapp/sps/site/general_recommendations_popup.jsp";
							 history_recommendations_title = "General Recommendations Popup";
							 break;
					case "recommendations_personal":
					     history_recommendations_URI = "/webapp/sps/site/personal_recommendations_popup.jsp";
							 history_recommendations_title = "Personal Recommendations Popup";
							 break;
					} //end of switch statement
					if (DCSext.nodeId){
					  prev_nodeID = DCSext.nodeId;
				    DCSext.nodeId="";  //// CHECK RESET OF THIS TO PREV META-TAG FOR POST HISTORY (close layer)
					}
				  dcsMultiTrack("DCS.dcsuri",history_recommendations_URI,"DCS.dcsqry","","WT.ti",history_recommendations_title);
				  DCS.dcsref = window.location.protocol+'//'+window.location.hostname+history_recommendations_URI;
				}// End new code Personalization and history
				
				var ttl="";
				var text=document.all?e.innerText:e.text;
				var img=dcsEvt(evt,"IMG");
				if (img.alt){
					ttl=img.alt;
				}
				else if (text){
					ttl=text;
				}
				else if (e.innerHTML){
					ttl=e.innerHTML;
				}
				
        var sidx = qry.indexOf("WT_TYPE=");
		    if (sidx != -1){
           var eidx = qry.indexOf("&WT", sidx);
           var wt_type = qry.substring(sidx+8, eidx);
           var e_wt_type = wt_type.replace(/&/g, "and");
		       qry = qry.replace(wt_type,e_wt_type);
        }
				if ((faq_click !=-1)&&(onsite_click)){
				  dcsMultiTrack("DCS.dcsuri",pth,"DCS.dcsqry",qry,"WT.ti","FAQ:"+ttl,"DCSext.faqclick","1");
				}
				else if ((reg_dl != -1)&&(onsite_click)){
				  dcsMultiTrack("DCS.dcsuri","/webapp/registered_download.fsldl","DCS.dcsqry",qry,"WT.ti","Registered Download Click:"+ttl,"DCSext.regdlclick","1");
				  eloqua_tracking(e.href);
				}
				else if ((mod_dl != -1)&&(onsite_click)){
				  dcsMultiTrack("DCS.dcsuri","/webapp/moderated_download.fsldl","DCS.dcsqry",qry,"WT.ti","Moderated Download Click:"+ttl,"DCSext.moddlclick","1");
				  eloqua_tracking(e.href);
				}
				else if ((lic_dl != -1)&&(onsite_click)){
				  dcsMultiTrack("DCS.dcsuri","/webapp/license_download.fsldl","DCS.dcsqry",qry,"WT.ti","License Download Click:"+ttl,"DCSext.licdlclick","1");
				  eloqua_tracking(e.href);
				}
				else if (!onsite_click){
				  var hn=e.hostname?(e.hostname.split(":")[0]):"";
					var pr=e.protocol||"";
					if ((hn.length>0)&&(pr.indexOf("http")==0)){
						
						var freescale_com_urls = /freescale\.(com|net)$/i; // This is a regex catching all *.freescale.com, *.freescale.net, but not regional sites like freescale.com.cn (has to end with .com, or .net)
						var offsite_freescale_urls = /(opensource|media|investors|blogs|forums|community)(\.*)freescale\.(com|net)$/i; // sites with freescale in domain but are "offsite"
						
						var is_external_url = hn.search(freescale_com_urls) == -1;  
					  var is_offsite_fsl_url = hn.search(offsite_freescale_urls) != -1;
						
						if (is_external_url || is_offsite_fsl_url){ // Track all that are external (not *freescale*) OR the offsite *freescale* domains
					    hn = hn.replace(/^www\./i, ""); // strip the www. prefix of domain if present
							
							DCSext.offsite_type = "external";  // offsite_type will contain whether URL has "freescale" in it or not
							if ((hn.search("freescale")) != -1){
							  DCSext.offsite_type = "freescale";
							}
						  dcsMultiTrack("DCS.dcsuri","/webapp/offsite.fslclick","DCSext.offsite_dcssip",hn,"DCSext.offsite_dcsuri",pth,"DCSext.offsite_dcsqry",qry,"DCSext.offsite_fullurl",hn+pth+qry,"WT.ti","Offsite Click: "+ttl);
				    } // end if is_external_url || is_offsite_fsl_url
				  } // end if hn.length >0 && pr.index
				} // end else if (!onsite_click)
				else{
				  if (dcsTypeMatch(e.pathname,types)){ //This is to make sure not called for *pages* from history popup
				    dcsMultiTrack("DCS.dcsuri",pth,"DCS.dcsqry",qry,"WT.ti","Download:"+ttl,"WT.dl","1","DCSext.fd","1");
						//START ELOQUA CODE
						eloqua_tracking(e.href);
						//END ELOQUA CODE
				  }
				}
				DCS.dcsref=DCS.dcsuri=DCS.dcsqry=WT.ti=WT.svl=WT.dl=DCSext.fd=DCSext.regdlclick=DCSext.moddlclick=DCSext.licdlclick=DCSext.faqclick=DCSext.offsite_dcssip=DCSext.offsite_dcsuri=DCSext.offsite_dcsqry=DCSext.offsite_fullurl=DCSext.offsite_type="";
				
				// prev_nodeID has a value if this is after a history click. First set DCSext.nodeID for resetting a previous meta-tag
				if (prev_nodeID != ""){
				   DCSext.nodeId = prev_nodeID;
				}
				//reset back nodeID meta-tag to blank if it was before (if nodeID was in address window)
				if (checkNodeID != ""){
					 DCSext.nodeId = "";
				}
				//Reset back campaign_lp if there was one
				if (prev_camplp != ""){
					 DCSext.campaign_lp = prev_camplp;
				}
				//reset back previous referral if there was one
				if (prevdcsref != ""){
					 DCS.dcsref = prevdcsref;
				}
			}
		}
	}
}

// Code section for Track right clicks to download links.
function dcsRightClick(evt){
	evt=evt||(window.event||"");
	if (evt){
		var btn=evt.which||evt.button;
		if ((btn!=1)||(navigator.userAgent.indexOf("Safari")!=-1)){
			var e=evt.target||evt.srcElement;
			if ((typeof(e.href)!="undefined")&&e.href){
				if ((typeof(e.protocol)!="undefined")&&e.protocol&&(e.protocol.indexOf("http")!=-1)){
				  if (e.hostname&&dcsIsOnsite(e.hostname)){
					  var types="xls,doc,ppt,tgz,rar,tar,pdf,txt,csv,zip,exe,iso,air";
						
						//START Code section for History Popup (Personalization/History Project Mar 2009)
			      var history_recommendations_popup = null;
	          //ref = e.srcElement;
			      ref = e;
			      if ((document.getElementById("historyajaxbox")) || (document.getElementById("site-bottom-bar"))){
	            while (history_recommendations_popup == null){
		            ref = ref.parentNode;
		            if (ref.nodeType==1){ //check that the node is a tag, not text (type=3) 
			            if ((String(ref.nodeName)=="DIV") && (String(ref.id) == "historyajaxbox")){
						        history_recommendations_popup = "history";
					        } // end of div and historyajaxbox check
									else if ((String(ref.nodeName)=="DIV") && (String(ref.id) == "site-bottom-bar")){
						        history_recommendations_popup = "recommendations_general";
						      } // end of else if 
									else if ((String(ref.nodeName)=="DIV") && (String(ref.id) == "site-top-bar")){
						        history_recommendations_popup = "recommendations_personal";
						      } // end of else if 
			            else if (String(ref.nodeName)=="BODY") {
					          history_recommendations_popup = "body";
				            break;
			            } //end of else if
				        } // end of nodeType = 1 check
	             } // end of while loop
			      }//end of check for getElementById("historyajaxbox")
			     //END Code section for History Popup (Personalization/History Project Mar 2009)
						
					  if (((typeof(e.pathname)!="undefined")&&dcsTypeMatch(e.pathname,types))||((history_recommendations_popup != null) && (history_recommendations_popup != "body"))){
						  var pth=e.pathname?((e.pathname.indexOf("/")!=0)?"/"+e.pathname:e.pathname):"/";
							var qry=e.search?e.search.substring(e.search.indexOf("?")+1,e.search.length):"";
							var checkNodeID=extractQP('nodeId');
				      if (checkNodeID != ""){
					      DCSext.nodeId = checkNodeID;
				      }
				      var prevdcsref = "";
			        if (DCS.dcsref){
					      prevdcsref = DCS.dcsref;
				      }
							
							//Check for campaign_lp parameter on page and clear it before click if there is one.
				      var prev_camplp = "";
				      if (DCSext.campaign_lp){
				        prev_camplp = DCSext.campaign_lp;
					      DCSext.campaign_lp="";
				      }
							
							//Set referral page to existing page.  Used for non-history layer files and virtual history page
				      DCS.dcsref = window.location.protocol+'//'+window.location.hostname+window.location.pathname+window.location.search;
				      
							//Personalization and History Code
				      var prev_nodeID = ""; //Used to store any previous DCSext.nodeID...not used for history.
				      if ((history_recommendations_popup != null )&& (history_recommendations_popup != "body")){
				        var history_recommendations_URI = null;
								var history_recommendations_title = null;
				        switch (history_recommendations_popup){
					      case "history":
							    history_recommendations_URI = "/webapp/sps/site/history_popup.jsp";
							    history_recommendations_title = "History Popup Window";
							    break;
					      case "recommendations_general":
					        history_recommendations_URI = "/webapp/sps/site/general_recommendations_popup.jsp";
							    history_recommendations_title = "General Recommendations Popup";
							    break;
								case "recommendations_personal":
					        history_recommendations_URI = "/webapp/sps/site/personal_recommendations_popup.jsp";
							    history_recommendations_title = "Personal Recommendations Popup";
							    break;
					      } // end switch statement
					      if (DCSext.nodeId){
					        prev_nodeID = DCSext.nodeId;
				          DCSext.nodeId="";  //// CHECK RESET OF THIS TO PREV META-TAG FOR POST HISTORY (close layer)
					      }
				        dcsMultiTrack("DCS.dcsuri",history_recommendations_URI,"DCS.dcsqry","","WT.ti",history_recommendations_title);
				        DCS.dcsref = window.location.protocol+'//'+window.location.hostname+history_recommendations_URI;
				      }// End new code Personalization and history
							
							
							
							var ttl="";
				      var text=document.all?e.innerText:e.text;
				      var img=dcsEvt(evt,"IMG");
				      if (img.alt){
					      ttl=img.alt;
				      }
				      else if (text){
					      ttl=text;
				      }
				      else if (e.innerHTML){
					      ttl=e.innerHTML;
				      }
							var sidx = qry.indexOf("WT_TYPE=");
		          if (sidx != -1){
                 var eidx = qry.indexOf("&WT", sidx);
                 var wt_type = qry.substring(sidx+8, eidx);
                 var e_wt_type = wt_type.replace(/&/g, "and");
		             qry = qry.replace(wt_type,e_wt_type);
              }
							if (dcsTypeMatch(e.pathname,types)){
							  dcsMultiTrack("DCS.dcsuri",pth,"DCS.dcsqry",qry,"WT.ti","RightClick:"+ttl,"WT.dl","1","WT.rc","1","DCSext.fd","1");
							  //START ELOQUA CODE
						    eloqua_tracking(e.href);
						    //END ELOQUA CODE
							}
						  DCS.dcsref=DCS.dcsuri=DCS.dcsqry=WT.ti=WT.dl=WT.rc=DCSext.fd="";
							
							// prev_nodeID has a value if this is after a history click. First set DCSext.nodeID for resetting a previous meta-tag
				      if (prev_nodeID != ""){
				        DCSext.nodeId = prev_nodeID;
				      }
							//reset back nodeID variable to blank if it was before
					    if (checkNodeID != ""){
					      DCSext.nodeId = "";
				      }
							//Reset back campaign_lp if there was one
				      if (prev_camplp != ""){
						    DCSext.campaign_lp = prev_camplp;
					    }
				      //reset back previous referral if there was one
					    if (prevdcsref != ""){
						    DCS.dcsref = prevdcsref;
					    }
							
					  }
					}
				}
			}
		}
	}
}

function dcsEvt(evt,tag){
	var e=evt.target||evt.srcElement;
	while (e.tagName&&(e.tagName!=tag)){
		e=e.parentElement||e.parentNode;
	}
	return e;
}

function dcsBind(event,func){
	if ((typeof(window[func])=="function")&&document.body){
		if (document.body.addEventListener){
			document.body.addEventListener(event, window[func], true);
		}
		else if(document.body.attachEvent){
			document.body.attachEvent("on"+event, window[func]);
		}
	}
}

function dcsET(){
	var e=(navigator.appVersion.indexOf("MSIE")!=-1)?"click":"mousedown";
	dcsBind(e,"dcsDownload");
	dcsBind("contextmenu","dcsRightClick");
}

function dcsAdv(){
	dcsFunc("dcsET");
	dcsFunc("dcsCookie");
	dcsFunc("dcsAdSearch");
	dcsFunc("dcsTP");
}

<!-- Revised WebTrends dcsmultitrack function - r59723 March 20,2007 -->
function dcsMultiTrack(){
	if (arguments.length%2==0){
		for (var i=0;i<arguments.length;i+=2){
			if (arguments[i].indexOf('WT.')==0){
				WT[arguments[i].substring(3)]=arguments[i+1];
			}
			else if (arguments[i].indexOf('DCS.')==0){
				DCS[arguments[i].substring(4)]=arguments[i+1];
			}
			else if (arguments[i].indexOf('DCSext.')==0){
				DCSext[arguments[i].substring(7)]=arguments[i+1];
			}
		}
		var dCurrent=new Date();
		DCS.dcsdat=dCurrent.getTime();
		dcsFunc("dcsCookie");
		dcsTag();
		//clear DCSext.cta parameter
		DCSext.cta="";
	}
}
<!-- END WebTrends dcsmultitrack function - r59723 May 23,2005 -->

var gFpc="WT_FPC";
var gConvert=true;

var gDomain="fdc.freescale.com";
var gDcsId="dcsna6bpqoifwzzkbkpmprmyf_5x3f";


if ((typeof(gConvert)!="undefined")&&gConvert&&(document.cookie.indexOf(gFpc+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)){
	document.write("<SCR"+"IPT TYPE='text/javascript' SRC='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+"/"+gDcsId+"/wtid.js"+"'><\/SCR"+"IPT>");
}

var gImages=new Array;
var gIndex=0;
var DCS=new Object();
var WT=new Object();
var DCSext=new Object();
var gQP=new Array();
var gI18n=false;
if (window.RegExp){
	var RE=gI18n?{"%25":/\%/g}:{"%09":/\t/g,"%20":/ /g,"%23":/\#/g,"%26":/\&/g,"%2B":/\+/g,"%3F":/\?/g,"%5C":/\\/g,"%22":/\"/g,"%7F":/\x7F/g,"%A0":/\xA0/g};
	if (gI18n){
		var EXRE=/dcs(uri)|(ref)|(aut)|(met)|(sta)|(sip)|(pro)|(byt)|(dat)|(p3p)|(cfg)|(redirect)|(cip)/i;
	}
}

// Add customizations here

function dcsVar(){
	var dCurrent=new Date();
	WT.tz=dCurrent.getTimezoneOffset()/60*-1;
	if (WT.tz==0){
		WT.tz="0";
	}
	WT.bh=dCurrent.getHours();
	WT.ul=navigator.appName=="Netscape"?navigator.language:navigator.userLanguage;
	if (typeof(screen)=="object"){
		WT.cd=navigator.appName=="Netscape"?screen.pixelDepth:screen.colorDepth;
		WT.sr=screen.width+"x"+screen.height;
	}
	if (typeof(navigator.javaEnabled())=="boolean"){
		WT.jo=navigator.javaEnabled()?"Yes":"No";
	}
	if (document.title){
		WT.ti=document.title;
	}
	WT.js="Yes";
	WT.jv=dcsJV();
	if (document.body&&document.body.addBehavior){
		document.body.addBehavior("#default#clientCaps");
		WT.ct=document.body.connectionType||"unknown";
		document.body.addBehavior("#default#homePage");
		WT.hp=document.body.isHomePage(location.href)?"1":"0";
	}
	else{
		WT.ct="unknown";
	}
	if (parseInt(navigator.appVersion)>3){
		if ((navigator.appName=="Microsoft Internet Explorer")&&document.body){
			WT.bs=document.body.offsetWidth+"x"+document.body.offsetHeight;
		}
		else if (navigator.appName=="Netscape"){
			WT.bs=window.innerWidth+"x"+window.innerHeight;
		}
	}
	WT.fi="No";
	if (window.ActiveXObject){
		for(var i=10;i>0;i--){
			try{
				var flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
				WT.fi="Yes";
				WT.fv=i+".0";
				break;
			}
			catch(e){
			}
		}
	}
	else if (navigator.plugins&&navigator.plugins.length){
		for (var i=0;i<navigator.plugins.length;i++){
			if (navigator.plugins[i].name.indexOf('Shockwave Flash')!=-1){
				WT.fi="Yes";
				WT.fv=navigator.plugins[i].description.split(" ")[2];
				break;
			}
		}
	}
	if (gI18n){
		WT.em=(typeof(encodeURIComponent)=="function")?"uri":"esc";
		if (typeof(document.defaultCharset)=="string"){
			WT.le=document.defaultCharset;
		} 
		else if (typeof(document.characterSet)=="string"){
			WT.le=document.characterSet;
		}
	}
	WT.tv="8.0.3";
	WT.sp="@@SPLITVALUE@@";
	DCS.dcsdat=dCurrent.getTime();
	DCS.dcssip=window.location.hostname;
	DCS.dcsuri=window.location.pathname;
	
	<!-- Customizations for title -->
	var training_info = DCS.dcsuri.indexOf("webapp/sps/site/training_information.jsp");
	if (training_info !=-1){
	   var checkcode=extractQP('code');
				if (checkcode != ""){
				   WT.ti = WT.ti + " - " + checkcode;
				}
	}
	<!-- END OF Customizations for title -->
	
	if (window.location.search){
		DCS.dcsqry=window.location.search;
		if (gQP.length>0){
			for (var i=0;i<gQP.length;i++){
				var pos=DCS.dcsqry.indexOf(gQP[i]);
				if (pos!=-1){
					var front=DCS.dcsqry.substring(0,pos);
					var end=DCS.dcsqry.substring(pos+gQP[i].length,DCS.dcsqry.length);
					DCS.dcsqry=front+end;
				}
			}
		}
	}
	if ((window.document.referrer!="")&&(window.document.referrer!="-")){
		if (!(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)<4)){
			DCS.dcsref=window.document.referrer;
		}
	}
}

function dcsA(N,V){
	if (gI18n&&!EXRE.test(N)){
		if (N=="dcsqry"){
			var newV="";
			var params=V.substring(1).split("&");
			for (var i=0;i<params.length;i++){
				var pair=params[i];
				var pos=pair.indexOf("=");
				if (pos!=-1){
					var key=pair.substring(0,pos);
					var val=pair.substring(pos+1);
					if (i!=0){
						newV+="&";
					}
					newV+=key+"="+dcsEncode(val);
				}
			}
			V=V.substring(0,1)+newV;
		}
		else{
			V=dcsEncode(V);
		}
	}
	return "&"+N+"="+dcsEscape(V, RE);
}

function dcsEscape(S, REL){
	if (typeof(REL)!="undefined"){
		var retStr = new String(S);
		for (var R in REL){
			retStr = retStr.replace(REL[R],R);
		}
		return retStr;
	}
	else{
		return escape(S);
	}
}

function dcsEncode(S){
	return (typeof(encodeURIComponent)=="function")?encodeURIComponent(S):escape(S);
}

function dcsCreateImage(dcsSrc){
	if (document.images){
		gImages[gIndex]=new Image;
		gImages[gIndex].src=dcsSrc;
		gIndex++;
	}
	else{
		document.write('<IMG ALT="" BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="'+dcsSrc+'">');
	}
	if (DCSext.campaign_lp){
		DCSext.campaign_lp="";
	}
	if (DCSext.cta){
		DCSext.cta="";
	}
}

function dcsMeta(){
	var elems;
	if (document.all){
		elems=document.all.tags("meta");
	}
	else if (document.documentElement){
		elems=document.getElementsByTagName("meta");
	}
	if (typeof(elems)!="undefined"){
		var length=elems.length;
		for (var i=0;i<length;i++){
			var name=elems.item(i).name;
			var content=elems.item(i).content;
			var equiv=elems.item(i).httpEquiv;
			if (name.length>0){
				if (name.indexOf("WT.")==0){
					WT[name.substring(3)]=content;
				}
				else if (name.indexOf("DCSext.")==0){
					DCSext[name.substring(7)]=content;
				}
				else if (name.indexOf("DCS.")==0){
					DCS[name.substring(4)]=content;
				}
			}
			else if (gI18n&&(equiv=="Content-Type")){
				var pos=content.toLowerCase().indexOf("charset=");
				if (pos!=-1){
					WT.mle=content.substring(pos+8);
				}
			}
		}
	}
}

function dcsTag(){
	if (document.cookie.indexOf("WTLOPTOUT=")!=-1){
		return;
	}
	//Set new DCSext variable to match dcsref to open reporting options
	if (DCS.dcsref){
		 DCSext.referring_url=DCS.dcsref;
	}
	//Set DCSext with status of youtube accessibility
	if (document.getElementById("ytImg")){
		DCSext.ytStatus = "Fail";
		var ytImage = document.getElementById("ytImg");
		if (ytImage.height == 16) {
			DCSext.ytStatus = "Pass";
		 }
	}
	DCSext.sdc_version="2013_07_31_PROD";
	//Global Reach 2012. Always set WT.ti to english for pages. Other languages available as meta-tags
  if (dcsIsPage(DCS.dcsuri)){
	   
		 if ((DCS.dcsuri.indexOf("Serp.jsp")!= -1)||(DCS.dcsuri.indexOf("SERP.jsp")!= -1)){
		   DCSext.language_option="en";
			 DCSext.en_ti = "Freescale Search";
			 if (DCS.dcsuri.indexOf("/ja/webapp")!= -1){
			   DCSext.language_option="ja";
				 DCSext.ja_ti = document.title;
			 }else if (DCS.dcsuri.indexOf("/zh-Hans/webapp")!= -1){
			  	DCSext.language_option="zh-hans";
				DCSext["zh-hans_ti"] = document.title;		
			 }
		 }
		 if (DCSext.en_ti){
		   WT.ti=DCSext.en_ti;
		 }
	}
	var P="http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+(gDcsId==""?'':'/'+gDcsId)+"/dcs.gif?";
	for (var N in DCS){
		if (DCS[N]){
			P+=dcsA(N,DCS[N]);
		}
	}
	var keys=["co_f","vt_sid","vt_f_tlv"];
	for (var i=0;i<keys.length;i++){
		var key=keys[i];
		if (WT[key]){
			P+=dcsA("WT."+key,WT[key]);
			delete WT[key];
		}
	}
	for (N in WT){
		if (WT[N]){
			P+=dcsA("WT."+N,WT[N]);
		}
	}
	for (N in DCSext){
		if (DCSext[N]){
			P+=dcsA(N,DCSext[N]);
		}
	}
	if (P.length>2048&&navigator.userAgent.indexOf('MSIE')>=0){
		P=P.substring(0,2040)+"&WT.tu=1";
	}
	dcsCreateImage(P);
}

function dcsJV(){
	var agt=navigator.userAgent.toLowerCase();
	var major=parseInt(navigator.appVersion);
	var mac=(agt.indexOf("mac")!=-1);
	var ff=(agt.indexOf("firefox")!=-1);
	var ff0=(agt.indexOf("firefox/0.")!=-1);
	var ff10=(agt.indexOf("firefox/1.0")!=-1);
	var ff15=(agt.indexOf("firefox/1.5")!=-1);
	var ff2up=(ff&&!ff0&&!ff10&!ff15);
	var nn=(!ff&&(agt.indexOf("mozilla")!=-1)&&(agt.indexOf("compatible")==-1));
	var nn4=(nn&&(major==4));
	var nn6up=(nn&&(major>=5));
	var ie=((agt.indexOf("msie")!=-1)&&(agt.indexOf("opera")==-1));
	var ie4=(ie&&(major==4)&&(agt.indexOf("msie 4")!=-1));
	var ie5up=(ie&&!ie4);
	var op=(agt.indexOf("opera")!=-1);
	var op5=(agt.indexOf("opera 5")!=-1||agt.indexOf("opera/5")!=-1);
	var op6=(agt.indexOf("opera 6")!=-1||agt.indexOf("opera/6")!=-1);
	var op7up=(op&&!op5&&!op6);
	var jv="1.1";
	if (ff2up){
		jv="1.7";
	}
	else if (ff15){
		jv="1.6";
	}
	else if (ff0||ff10||nn6up||op7up){
		jv="1.5";
	}
	else if ((mac&&ie5up)||op6){
		jv="1.4";
	}
	else if (ie5up||nn4||op5){
		jv="1.3";
	}
	else if (ie4){
		jv="1.2";
	}
	return jv;
}

function dcsFunc(func){
	if (typeof(window[func])=="function"){
		window[func]();
	}
}

function ThirdPartyMetrics(url,tscode,link_text, wt_type, wt_vendor, wt_file_format,wt_asset){
	//notes to Kevin: clear the ad variables. Possibly search and tids..checkdcsqry
	
  var prevdcsref = "";
	
	if (DCS.dcsref){
    prevdcsref = DCS.dcsref;
  }
	DCS.dcsref = window.location.protocol+'//'+window.location.hostname+window.location.pathname+window.location.search;
		
  //Check for campaign_lp parameter on page and clear it before click if there is one.
	var prev_camplp = "";
	if (DCSext.campaign_lp){
    prev_camplp = DCSext.campaign_lp;
		DCSext.campaign_lp="";
	}
	
	wt_type=wt_type.replace(/&/g,"and");
	
	dcsMultiTrack("DCS.dcsuri","/webapp/third_party_metrics.fslclick","WT.ti","Third Party click: "+tscode,"DCSext.third_party_url",url,"DCSext.tscode",tscode,"DCSext.link_text",link_text,"DCSext.WT_TYPE",wt_type,"DCSext.WT_VENDOR",wt_vendor,"DCSext.WT_FILE_FORMAT",wt_file_format,"DCSext.WT_ASSET",wt_asset);
	DCS.dcsref=DCSext.third_party_url=DCS.dcsuri=WT.ti=DCSext.tscode=DCSext.link_text=DCSext.WT_TYPE=DCSext.WT_VENDOR=DCSext.WT_FILE_FORMAT=DCSext.WT_ASSET="";

  //reset back previous referral if there was one
	if (prevdcsref != ""){
	  DCS.dcsref = prevdcsref;
	}
	//Reset back campaign_lp if there was one
	if (prev_camplp != ""){
	  DCSext.campaign_lp = prev_camplp;
	}
	
}


function youtube_metrics(url, title, duration, time){
  var prevdcsref = "";
	
	if (DCS.dcsref){
    prevdcsref = DCS.dcsref;
  }
	DCS.dcsref = window.location.protocol+'//'+window.location.hostname+window.location.pathname+window.location.search;
	
	//Check for campaign_lp parameter on page and clear it before click if there is one.
	var prev_camplp = "";
	if (DCSext.campaign_lp){
    prev_camplp = DCSext.campaign_lp;
		DCSext.campaign_lp="";
	}
  
	title = title.replace(/&/g, "and"); 			
  dcsMultiTrack("DCS.dcsuri","/webapp/youtube_metrics.fslclick","WT.ti","Youtube: "+title,"DCSext.youtube_url",url,"DCSext.youtube_duration",duration,"DCSext.youtube_time","00:00:00");
	eloqua_tracking(url);
	DCS.dcsref=DCSext.youtube_url=DCS.dcsuri=WT.ti=DCSext.youtube_duration=DCSext.youtube_time="";

  //reset back previous referral if there was one
	if (prevdcsref != ""){
	  DCS.dcsref = prevdcsref;
	}
	//Reset back campaign_lp if there was one
  if (prev_camplp != ""){
    DCSext.campaign_lp = prev_camplp;
  }
	
}



function print_page_metrics(){
  var prevdcsref = "";

	if (DCS.dcsref){
    prevdcsref = DCS.dcsref;
  }

	DCS.dcsref = window.location.protocol+'//'+window.location.hostname+window.location.pathname+window.location.search;
	
	//Check for campaign_lp parameter on page and clear it before click if there is one.
	var prev_camplp = "";
	if (DCSext.campaign_lp){
    prev_camplp = DCSext.campaign_lp;
		DCSext.campaign_lp="";
	}
		
  dcsMultiTrack("DCS.dcsuri","/webapp/printer_friendly.fslclick","WT.ti","Printer Friendly Click");
	DCS.dcsref=DCS.dcsuri=WT.ti="";

  //reset back previous referral if there was one
	if (prevdcsref != ""){
	  DCS.dcsref = prevdcsref;
	}
	
	//Reset back campaign_lp if there was one
  if (prev_camplp != ""){
    DCSext.campaign_lp = prev_camplp;
  }
}

function BlockDiagMetrics(blockDiagUrl){
  var prevdcsref = "";

	if (DCS.dcsref){
    prevdcsref = DCS.dcsref;
  }

	DCS.dcsref = window.location.protocol+'//'+window.location.hostname+window.location.pathname+window.location.search;
	
	var cleaned_block_diag_url = blockDiagUrl.replace('http://','').replace('https://','');
	var domain_block_diag_url = cleaned_block_diag_url.split(/[/?#]/)[0];
	
	cleaned_block_diag_url = cleaned_block_diag_url.replace(domain_block_diag_url,'');
	
	//Check for campaign_lp parameter on page and clear it before click if there is one.
	var prev_camplp = "";
	if (DCSext.campaign_lp){
    prev_camplp = DCSext.campaign_lp;
		DCSext.campaign_lp="";
	}
			
        dcsMultiTrack("DCS.dcsuri",cleaned_block_diag_url,"WT.ti","Block Diagram Click");
	var eloq_bd_url=window.location.protocol+'//'+window.location.hostname+cleaned_block_diag_url;
	
	eloqua_tracking(eloq_bd_url);
	eloq_bd_url="";
	DCS.dcsref=DCS.dcsuri=WT.ti="";

  //reset back previous referral if there was one
	if (prevdcsref != ""){
	  DCS.dcsref = prevdcsref;
	}
	
	//Reset back campaign_lp if there was one
  if (prev_camplp != ""){
    DCSext.campaign_lp = prev_camplp;
  }
}

function webpage_note_metrics(action){
  var prevdcsref = "";

	if (DCS.dcsref){
    prevdcsref = DCS.dcsref;
  }

	DCS.dcsref = window.location.protocol+'//'+window.location.hostname+window.location.pathname+window.location.search;
	
	//Check for campaign_lp parameter on page and clear it before click if there is one.
	var prev_camplp = "";
	if (DCSext.campaign_lp){
    prev_camplp = DCSext.campaign_lp;
		DCSext.campaign_lp="";
	}
			
  dcsMultiTrack("DCS.dcsuri","/webapp/webpage_notes.fslclick","WT.ti","Webpage Note Click","DCSext.web_notes_action",action);
	DCS.dcsref=DCS.dcsuri=WT.ti=DCSext.web_notes_action="";

  //reset back previous referral if there was one
	if (prevdcsref != ""){
	  DCS.dcsref = prevdcsref;
	}
	
	//Reset back campaign_lp if there was one
  if (prev_camplp != ""){
    DCSext.campaign_lp = prev_camplp;
  }
}

function submit_feedback_metrics(action){
  var prevdcsref = "";


	if (DCS.dcsref){
    prevdcsref = DCS.dcsref;
  }

	DCS.dcsref = window.location.protocol+'//'+window.location.hostname+window.location.pathname+window.location.search;

	//Check for campaign_lp parameter on page and clear it before click if there is one.
	var prev_camplp = "";
	if (DCSext.campaign_lp){
    prev_camplp = DCSext.campaign_lp;
		DCSext.campaign_lp="";
	}
			
  dcsMultiTrack("DCS.dcsuri","/webapp/feedback.fslclick","WT.ti","Online Feedback Click","DCSext.feedback_action",action);
	DCS.dcsref=DCS.dcsuri=WT.ti=DCSext.feedback_action="";

  //reset back previous referral if there was one
	if (prevdcsref != ""){
	  DCS.dcsref = prevdcsref;
	}
	
		//Reset back campaign_lp if there was one
  if (prev_camplp != ""){
    DCSext.campaign_lp = prev_camplp;
  }
}

function personalization_bar_metrics(action){
  var prevdcsref = "";

	if (DCS.dcsref){
    prevdcsref = DCS.dcsref;
  }

	DCS.dcsref = window.location.protocol+'//'+window.location.hostname+window.location.pathname+window.location.search;

	//Check for campaign_lp parameter on page and clear it before click if there is one.
	var prev_camplp = "";
	if (DCSext.campaign_lp){
    prev_camplp = DCSext.campaign_lp;
		DCSext.campaign_lp="";
	}
			
  dcsMultiTrack("DCS.dcsuri","/webapp/personalization_bar.fslclick","WT.ti","Personalization Bar Click","DCSext.personalization_bar_action",action);
	DCS.dcsref=DCS.dcsuri=WT.ti=DCSext.personalization_bar_action="";

  //reset back previous referral if there was one
	if (prevdcsref != ""){
	  DCS.dcsref = prevdcsref;
	}
	
		//Reset back campaign_lp if there was one
  if (prev_camplp != ""){
    DCSext.campaign_lp = prev_camplp;
  }

}

function parametric_flash(action){

  dcsMultiTrack("DCS.dcsuri","/webapp/parametric_search_flash.fslclick","WT.ti","Parametrics Search Flash Click","DCSext.parametric_flash_action",action);
	DCS.dcsuri=WT.ti=DCSext.parametric_flash_action="";
	
}


function ahppopup_campaign_cta(action){

  dcsMultiTrack("DCS.dcsuri","/webapp/market_splash_popup.fslclick","WT.ti","Market Splah popup Click","DCSext.cta",action);
	DCS.dcsuri=WT.ti=DCSext.cta="";
	
}

function sendButtonMetric(button_action) {

  dcsMultiTrack("DCS.dcsuri","/webapp/test_button_action.fslclick","WT.ti","Sep 2011 Button action click","DCSext.button_action",button_action);
	DCS.dcsuri=WT.ti=DCSext.button_action="";
	
}

function campaign_cta_onclick(url, cta){
	var prevdcsref = "";
	
	if (DCS.dcsref){
		prevdcsref = DCS.dcsref;
	}
	DCS.dcsref = window.location.protocol+'//'+window.location.hostname+window.location.pathname+window.location.search;
	
	dcsMultiTrack("DCS.dcsuri",url,"DCSext.cta",cta);
	eloqua_tracking(url);
	DCS.dcsref=DCS.dcsuri=DCSext.cta="";

	//reset back previous referral if there was one
	if (prevdcsref != ""){
	  DCS.dcsref = prevdcsref;
	}
}

var $ = jQuery_1_9_1 = jQuery;
$(document).ready(function($){
    $('.ui-accordion h3').click(function(event){
          var opened = $(this).hasClass('ui-state-active');
          var title = $(this).find('a').text();
          if (opened) {
              // I am opened
              trackPSPAccordion ("opened", title)
          } else 
          {
            // I am closed
              trackPSPAccordion ("closed", title)
          }
    })

	$("td[id$='beta']").closest('tr').remove();

	if (typeof document.forms['PartDirect'] !== 'undefined') {
		document.PartDirect.action = "/webapp/PartSearchRedirectServlet";
	}
});

//Track Expand and Collapse of Features Accordion in PSP,RDSP,TSP
function trackPSPAccordion(ClckTyp,SectnDesc){
	if (typeof s_account != 'undefined') {
		var s=s_gi(s_account);		
		s.eVar1 = "";
		var ClickType = "";
		if(ClckTyp == 'opened') {
			ClickType = "Features Section - Accordion Expand";
		} else if(ClckTyp == 'closed') {
			ClickType = "Features Section - Accordion Collapse";
		}
		s.linkTrackVars='channel,server,prop1,prop2,prop3,prop6,prop8,prop9,prop10,prop11,prop13,prop14,prop16,prop18,prop20,prop21,prop23,prop74,prop75,eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar15,eVar16,eVar17,eVar18,eVar19,eVar20,eVar21,eVar34,eVar35,eVar38,eVar39,eVar40,eVar48,eVar51,eVar52,eVar53,eVar57,eVar58,events';
		s.linkTrackEvents='event34';
		s.events='event34';
		s.eVar57 = s.prop16 = ClickType;
		s.eVar58 = SectnDesc;
		s.tl(this,'o',ClickType);
		s.eVar1=s.eVar57=s.prop16=s.eVar58=s.events="";		
	}
}


dcsVar();
dcsMeta();
dcsFunc("dcsAdv");
dcsTag();