var FSLWebSurvey = {

        target : document.getElementsByTagName("body")[0],

        pageCounter : 0,
		
        init : function(){

                //Check for existing page count cookie and increment
                var __counter = FSLWebSurvey.readCookie("JSSCounter");				
                if(__counter!=""){
                        FSLWebSurvey.pageCounter = parseInt(__counter);
                        FSLWebSurvey.pageCounter = FSLWebSurvey.pageCounter+1;
                        FSLWebSurvey.writeCookie("JSSCounter",FSLWebSurvey.pageCounter,"/");
                }
                else{
                        FSLWebSurvey.writeCookie("JSSCounter",0,"/");
                }

                var __url;				
				var _tempUrl;
                if(FSLWebSurvey.pageCounter>=FSLWebServeySettings.survey.surveys.counter){

                        //Go through all URLS to find a match to current page
                        for(i=0;i<WebServeyurls.length;i++){

                                var __this = WebServeyurls[i];								
                                //alert("WebsurveyURL "+__this[0]);
                                var __currentURL = document.location.href;
                                var __URLmatch = __currentURL.indexOf(__this[0]);								
                                if(__URLmatch==0){
										// Added for CR-57712 by b49844 Start
										//Modified by B35740 for CR 59104 Start
										//prependURL = __this[0];
										_tempUrl = __this[0];
										var res;
										if(_tempUrl.indexOf("ja/") > -1)
										{
											res = _tempUrl.replace("ja/","");
										}
										else if(_tempUrl.indexOf("zh-Hans/") > -1)
										{
											res = _tempUrl.replace("zh-Hans/","");
										}
										else
										{
											res = _tempUrl;
										}
										prependURL = res;
										//alert("Prepend URL "+prependURL);
										//Modified by B35740 for CR 59104 End
										// Added for CR-57712 by b49844 End
                                        __url = __this;								
										
                                }

                        }
                        if(__url){
								//alert("Modal window to be shown");
                                FSLWebSurvey.modal(__url);
                        }

                }

        },
        randomNum : function(num){

                var __num = Math.floor(Math.random()*num);
                return __num;

        },


        // * Create modal window
        modal : function(s){

                var __s = s;

                //Use the URL and remove the domain - this should leave the path for the "yes", "no" cookies.
                var __u = __s[0];
                __u = __u.split("://");
                __u = __u[1];
                __u = __u.split("/");

                var __path = "/";
                var __uL = __u.length;

                for(i=1;i<__uL;i++){

                        __path+=__u[i];
                        __path+="/";

                }

                __path = __path.replace("//","/");
				//alert("Path is "+__path);

                var __design = __s[1].design;
				
                var __modal = eval("FSLWebServeySettings.survey."+__design);
				
                var __doNotDisturb = 0;
                // Generate cookiename (based on survey name)
                var __cookieName = __s[1].name;				
                // Check to see if the user has said "no" 5 times
                var __no = FSLWebSurvey.readCookie(__cookieName+"No");				
                if(__no!=""){
                        __no = parseInt(__no);
                        if(__no>=__s[1].frequency){
                                __doNotDisturb = 1;
                        }
                }
                // Check to see if the user has already answered "yes"
                var __yes = FSLWebSurvey.readCookie(__cookieName+"Yes");
                if(__yes=="1"){
                        __doNotDisturb = 1;
                }
                // If __doNotDisturb is set to 0 still (IE the cookies are allowing the modal to execute)
                if(__doNotDisturb==0){

                        // Generate random number based on ratio - if it matches 0 then run the modal window (response rate)
                        //alert("Do Not Disturb is "+__doNotDisturb);
						var _rand = FSLWebSurvey.randomNum(__s[1].ratio)
						//alert("Random num is "+_rand);

                        if(_rand == 0){

                                // * Create opaque filter
                                var __d = document.createElement("div");
                                __d.id = "JSOverlay";
                                __d.style.position = "fixed";
                                __d.style.top = "0";
                                __d.style.left = "0";
                                __d.style.height = "100%";
                                __d.style.width = "100%";
                                __d.style.zIndex = "999";
                                __d.style.background = __modal.background.color;
                                __d.style.opacity = parseInt(__modal.background.opacity)/100;
                                __d.style.filter = "alpha(opacity="+__modal.background.opacity+")";

                                // * Create modal window HTML
                                var __dM = document.createElement("div");
                                __dM.id = "JSQuestion";
                                __dM.style.width = __modal.mWindow.width;
                                __dM.style.height = __modal.mWindow.height;
                                __dM.style.position = "absolute";
                                __dM.style.top = "50%";
                                __dM.style.left = "50%";
                                if(__modal.mWindow.backgroundImage==""){
                                        __dM.style.background = __modal.mWindow.background;
                                }
                                else{
                                        __dM.style.background = __modal.mWindow.backgroundImage;
                                }
                                __dM.style.border = __modal.mWindow.border;
                                __dM.style.zIndex = "1000";

                                var __width = parseInt(__modal.mWindow.width);
                                var __height = parseInt(__modal.mWindow.height);

                                __dM.style.marginTop = "-"+__height/2+"px";
                                __dM.style.marginLeft = "-"+__width/2+"px";

                                // * Modal window header and H2
                                var __dH = document.createElement("div");
                                __dH.background = __modal.header.background;
                                var __dHH = document.createElement("h2");
                                __dHH.appendChild(document.createTextNode(__modal.header.text));

                                // * Style the modal window header and H2
                                __dH.style.background = __modal.header.background;
                                __dHH.style.padding = __modal.header.padding;
                                __dHH.style.margin = __modal.header.margin;
                                __dHH.style.fontFamily = __modal.header.font;
                                __dHH.style.fontSize = __modal.header.fontSize;
                                __dHH.style.color = __modal.header.color;
                                __dHH.style.border = __modal.header.border;

                                // * Modal window question
                                var __dQ = document.createElement("p");
                                __dQ.style.background = __modal.question.background;
                                __dQ.innerHTML = __modal.question.text;
                                __dQ.style.padding = __modal.question.padding;
                                __dQ.style.margin = __modal.question.margin;
                                __dQ.style.fontFamily = __modal.question.font;
                                __dQ.style.fontSize = __modal.question.fontSize;
                                __dQ.style.color = __modal.question.color;
                                __dQ.style.border = __modal.question.border;

                                // * Modal window buttons
                                var __dB = document.createElement("div");
                                __dB.style.clear = "both";
                                __dB.style.padding = __modal.answers.padding;
                                __dB.style.borderTop = __modal.answers.borderTop;
                                __dB.style.borderBottom = __modal.answers.borderBottom;

                                // * "decline"
                                var __dB1 = document.createElement("a");
                                __dB1.href="#";
                                __dB1.style.background = __modal.answer1.background;
                                __dB1.innerHTML = __modal.answer1.text;
                                __dB1.style.padding = __modal.answer1.padding;
                                __dB1.style.margin = __modal.answer1.margin;
                                __dB1.style.fontFamily = __modal.answer1.font;
                                __dB1.style.fontSize = __modal.answer1.fontSize;
                                __dB1.style.color = __modal.answer1.color;
                                __dB1.style.border = __modal.answer1.border;
                                __dB1.innerHTML = __modal.answer1.text;

                                __dB1.style.display = "block";
                                __dB1.style.cssFloat = "right";
                                __dB1.style.styleFloat = "right";
                                __dB1.style.width = "auto";
                                __dB1.style.textDecoration = "none";
                                __dB1.style.fontWeight = "bold";

                                __dB1.onclick = function(){

                                        // If a user answers "no" then set a cookie to store the amount of times they say no

                                        var __cookieNameFull = __cookieName + "No";
                                        var __count = FSLWebSurvey.readCookie(__cookieNameFull);

                                        if(__count==""){
                                                __count = parseInt(__count);
                                                FSLWebSurvey.writeCookie(__cookieNameFull,1,"/",__s[1].expiry);
                                        }
                                        else{
                                                __count = parseInt(__count);

                                                // If "no" is less than 5, then update the cookie
                                                if(__count<__s[1].frequency){
                                                        var __setter = __count+1;
                                                        FSLWebSurvey.writeCookie(__cookieNameFull,__setter,"/",__s[1].expiry);
                                                }
                                        };

                                        FSLWebSurvey.removeModal();
                                        return false;

                                }

                                // * "accept"
                                var __dB2 = document.createElement("a");
                                __dB2.href="#";
                                __dB2.style.background = __modal.answer2.background;
                                __dB2.innerHTML = __modal.answer2.text;
                                __dB2.style.padding = __modal.answer2.padding;
                                __dB2.style.margin = __modal.answer2.margin;
                                __dB2.style.fontFamily = __modal.answer2.font;
                                __dB2.style.fontSize = __modal.answer2.fontSize;
                                __dB2.style.color = __modal.answer2.color;
                                __dB2.style.border = __modal.answer2.border;
                                __dB2.innerHTML = __modal.answer2.text;

                                __dB2.style.display = "block";
                                __dB2.style.cssFloat = "left";
                                __dB2.style.styleFloat = "left";
                                __dB2.style.width = "auto";
                                __dB2.style.textDecoration = "none";
                                __dB2.style.fontWeight = "bold";

                                __dB2.onclick = function(){

                                        var __cookieNameFull = __cookieName + "Yes";

                                        // If "yes" then set a cookie to not disturb the user again
                                        FSLWebSurvey.writeCookie(__cookieNameFull,1,"/",__s[1].expiry);

                                        // * Loop through all the questions and build the querystring
                                        var __qLength = __s[2].length;
										// Modified for CR-57712 by b49844 Start
										//Added by B35740 for CR59104 Start
										var __currentURL = document.location.href;										
										var field = __currentURL.split("/");
										//Added by B35740 for CR59104 End
										//Modified by B35740 for CR 59104 Start
										var __url = prependURL+""+__s[1].surveyURL+"&currentUrl="+__currentURL;			
										//Modified by B35740 for CR 59104 End
										// Modified for CR-57712 by b49844 End										
                                        // * If a new window is set then open the new window
                                        if(__s[1].presentation=="new"){

                                                FSLWebSurvey.openURL({
                                                        url: __url,
                                                        winName :"win",
                                                        chrome:"width="+__s[1].windowWidth+",height="+__s[1].windowHeight+",resizable="+__s[1].windowResize+",scrollbars="+__s[1].windowScrolling+",menubar="+__s[1].windowMenu+",status="+__s[1].windowStatus+",location="+__s[1].windowLocation+""
                                                });

                                                FSLWebSurvey.removeModal();

                                        }
                                        else if(__s[1].presentation=="_blank"){
                                                this.href = __url;
                                                this.target = "_blank";
                                                FSLWebSurvey.removeModal();
                                                return true;
                                        }
                                        else{
                                                document.location.href = __url;
                                                FSLWebSurvey.removeModal();
                                        }

                                        return false;

                                }

                                __dB.appendChild(__dB1);
                                __dB.appendChild(__dB2);

                                // * Append the header and links to the modal window
                                __dH.appendChild(__dHH);
                                __dM.appendChild(__dH);
                                __dM.appendChild(__dQ);
                                __dM.appendChild(__dB);

                                // * Append the modal window to the target of the page (usually the body tag) after a set amount of milliseconds
                                function action(){
                                        // * Add filter to page
                                        FSLWebSurvey.target.appendChild(__d);
                                        // * Add modal window to page
                                        FSLWebSurvey.target.appendChild(__dM);
                                };

                                var __timer = setTimeout(action,__s[1].timer);

                        }

                }

        },

        // * Remove modal window
        removeModal : function(){

                FSLWebSurvey.target.removeChild(document.getElementById("JSOverlay"));
                FSLWebSurvey.target.removeChild(document.getElementById("JSQuestion"));

        },

        // * Open survey in new window
        openURL : function(o){

                window.open(o.url,o.winName,o.chrome);

        },

        // * Write cookie
        writeCookie : function (name, value, path, expires, domain, secure) {
                var today = new Date();
                today.setTime(today.getTime());

                /*
                if the expires variable is set, make the correct expires time, the current script below will set
                it for x number of days, to make it for hours, delete * 24, for minutes, delete * 60 * 24
                */
                if (expires) {
                        expires = expires * 1000 * 60 * 60 * 24;
                }
                var expires_date = new Date( today.getTime() + (expires) );

                document.cookie = name + "=" +escape(value) +
                ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
                ((path) ? ";path=" + path : "") +
                ((domain) ? ";domain=" + domain : "") +
                ((secure) ? ";secure" : "");
        },

        // * Read cookie
        readCookie : function (name) {
                if (document.cookie.length > 0) {
                        c_start = document.cookie.indexOf(name + "=");
                        if (c_start != -1) {
                                c_start = c_start + name.length + 1;
                                c_end = document.cookie.indexOf(";", c_start);
                                if (c_end == -1) {
                                        c_end = document.cookie.length;
                                }
                                return unescape(document.cookie.substring(c_start, c_end));
                        }
                }
                return "";
        }

}

// Added for CR-57712 by b49844 Start
var prependURL = "";
// Added for CR-57712 by b49844 End
var progressbarWidth="200";
var progressbarHeight="8";
var ProgressBar={
	init:function(){
		var frm=document.forms["frm"];
		if(typeof frm != 'undefined')
		{
			if(typeof frm.pageCount != 'undefined' && typeof frm.currentPage != 'undefined'){
				var t=frm.pageCount.value;
				var c=frm.currentPage.value;
				var p=Math.floor(c*(100/t));
				var html='<table width="'+progressbarWidth+'"><tr><td><table cellpadding="0" cellspacing="0" class="progresstable" width="100%"><tr><td class="progressbar_complete" width="'+((progressbarWidth/t)*c)+'" height="'+progressbarHeight+'"></td><td class="progressbar_incomplete" width="'+((progressbarWidth/t)*(t-c))+'"></td></tr></table></td></tr><tr><td class="progresstext">'+p+'%</td></tr></table>';
				var progressbar=document.createElement("div");
				progressbar.id="progress";
				progressbar.align="center";
				progressbar.innerHTML=html;
				frm.parentNode.insertBefore(progressbar,frm);
			}
		}
	}
};
addLoadEvent(function(){ProgressBar.init();});

var NavButton={
	init:function(){

		var frm=document.forms['frm'];
		if(typeof frm != 'undefined')
		{
			if(typeof frm.pageCount!= 'undefined' && typeof frm.currentPage != 'undefined'){
				var t=frm.pageCount.value;
				var c=frm.currentPage.value;
				if(c == 1)
				{
						document.getElementById("backBtn").style.display="none";
						document.getElementById("nextBtn").style.display="block";
						document.getElementById("submitBtn").style.display="none";
				}
				else if(c == t)
				{
						document.getElementById("backBtn").style.display="block";
						document.getElementById("nextBtn").style.display="none";
						document.getElementById("submitBtn").style.display="block";
				}
				else
				{
						document.getElementById("backBtn").style.display="block";
						document.getElementById("nextBtn").style.display="block";
						document.getElementById("submitBtn").style.display="none";
				}
			}
		}
	}
};
addLoadEvent(function(){NavButton.init();});



var appRoot='/app';var ie4=(document.all&&!document.getElementById)?true:false;var ie5=(document.all&&document.getElementById)?true:false;var ns4=(document.layers)?true:false;var ns6=(document.getElementById&&!document.all)?true:false;var opera=window.opera?true:false;var session_minutes=10;var session_url=appRoot+'/survey/session.jsp';
function len(str){if(ie4||ie5||ns6){return str.length;}else{return str.length();}}
function limitcheckselection(cb,limit,name,num,mobile){count=0;for(i=1;i<=num;i++){nameStr=name+i;var check=document.getElementById(nameStr);if(check.checked==true&&check!=cb){count++;if(count==limit){check.checked=false;if(mobile){$(check).attr("checked",false).checkboxradio("refresh");}}}}}
function isnumeric(str,t){if(t==0)return str.match(/^-?\d*\.?\d{0,2}$/);if(t==1)return str.match(/^\d*\.?\d{0,2}$/);if(t==2)return str.match(/^-?\d*$/);return str.match(/^\d*$/);}
function checknumeric(field,t){var ov=field.value;var v=ov;while(len(v)>0&&!isnumeric(v,t)){v=v.substring(0,len(v)-1);}if(v!=ov)field.value=v;}
function isnumerickey(evt,t){evt=(evt)?evt:((window.event)?event:null);if(evt){var elem=(evt.target)?evt.target:((evt.srcElement)?evt.srcElement:null);if(elem){var charCode=(evt.charCode)?evt.charCode:((evt.which)?evt.which:evt.keyCode);if(charCode==9||charCode==8||charCode==46||charCode==37||charCode==39){return true;}else if(t==0&&((charCode>47&&charCode<58)||charCode==45||charCode==46)){return true;}else if(t==1&&((charCode>47&&charCode<58)||charCode==46)){return true;}else if(t==2&&((charCode>47&&charCode<58)||charCode==45)){return true;}else if(t==3&&(charCode>47&&charCode<58)){return true;}else{return false;}}}return false;}
function indexOf(str,s,startpos){searchstr=str.substring(startpos);pos=searchstr.indexOf(s);return pos!=-1?pos+startpos:-1;}
function selectaction(sel,url){ibegin=url.indexOf(sel.name);if(ibegin!=-1){iend=url.lastIndexOf('&');if(iend==-1||iend<ibegin){url=url.substring(0,ibegin-1);}else{iend=indexOf(url,'&',ibegin);url=url.substring(0,ibegin)+url.substring(iend,len(url));}}if(url.indexOf('?')!=-1){location=url+'&'+sel.name+'='+sel.value;}else{location=url+'?'+sel.name+'='+sel.value;}}
function rankup(item_name){var sel=document.getElementById('rank_'+item_name);var index=sel.selectedIndex;if(index<1)return;var this_item=document.getElementById(item_name+'_alpha_answer'+(index+1));var other_item=document.getElementById(item_name+'_alpha_answer'+(index));var this_value=this_item.value;this_item.value=other_item.value;other_item.value=this_value;var this_option_value=sel.options[index].value;sel.options[index].value=sel.options[index-1].value;sel.options[index].text=(index+1)+" -"+sel.options[index-1].value;sel.options[index-1].value=this_option_value;sel.options[index-1].text=(index)+" -"+this_option_value;sel.selectedIndex=index-1;}
function rankdown(item_name){var sel=document.getElementById('rank_'+item_name);var index=sel.selectedIndex;var size=sel.options.length;if(index==-1||index>=size-1)return;var this_item=document.getElementById(item_name+'_alpha_answer'+(index+1));var other_item=document.getElementById(item_name+'_alpha_answer'+(index+2));var this_value=this_item.value;this_item.value=other_item.value;other_item.value=this_value;var this_option_value=sel.options[index].value;sel.options[index].value=sel.options[index+1].value;sel.options[index].text=(index+1)+" -"+sel.options[index+1].value;sel.options[index+1].value=this_option_value;sel.options[index+1].text=(index+2)+" -"+this_option_value;sel.selectedIndex=index+1;}
function maxhundred(d,n){id=d.id;ix=id.indexOf('_');stub=id.substring(0,ix+1);var total=parseInt(d.options[d.selectedIndex].value);for(i=0;i<n;i++){newid=stub+i;if(newid!=id){sel=document.getElementById(newid);v=parseInt(sel.options[sel.selectedIndex].value);if((total+v)>100){v=100-total;sel.selectedIndex=v;}total+=v;}}}
function clearcol(r,n){id=r.id;b=id.replace(/_\d*_\d*$/,'');n1=id.replace(/^\w*_\d*_/,'');for(i=1;i<=n;i++){tid=b+'_'+i+'_'+n1;if(tid!=id){var e=document.getElementById(tid);if(e){e.checked=false;if(e.getAttribute('ct_trigger')){eval(e.getAttribute('ct_trigger'));}}}}}
function closewindow(){window.open('','_parent','');window.close();}
function getselvalue(id){var sel=document.getElementById(id);return sel.options[sel.selectedIndex].value;}
function updatedatefield(f,d){document.getElementById(f).value=getselvalue(d+'year')+"-"+getselvalue(d+'month')+"-"+getselvalue(d+'day');}var submitted=false;
function firstsubmit(){if(submitted){return false;}else{submitted=true;return true;}}var delay=25;var fixedelement,elwidth,elheight,tid;
function initfixing(id){if(document.layers){fixedelement=document[id];elwidth=fixedelement.document.width;elheight=fixedelement.document.height;}else if(document.getElementById&&!opera){fixedelement=document.getElementById(id);elwidth=fixedelement.offsetWidth;elheight=fixedelement.offsetHeight;}else if(document.all&&!opera){fixedelement=document.all[id];elwidth=fixedelement.offsetWidth;elheight=fixedelement.offsetHeight;}else if(opera){fixedelement=document.getElementById(id);elwidth=fixedelement.style.pixelWidth;elheight=fixedelement.style.pixelHeight;}fixposition();if(document.layers){fixedelement.visibility='show';}else{fixedelement.style.visibility='visible';}if(document.all&&!opera){window.onscroll=fixposition;window.onresize=fixposition;}else{tid=setInterval('fixposition()',delay);}}
function fixposition(){if(document.layers){fixedelement.left=window.pageXOffset+window.innerWidth-elwidth-5;fixedelement.top=window.pageYOffset;}else if(document.all&&!opera){if(elwidth==0){elwidth=fixedelement.offsetWidth;}fixedelement.style.pixelLeft=document.body.scrollLeft+document.body.clientWidth-elwidth-5;fixedelement.style.pixelTop=document.body.scrollTop;}else if(document.getElementById&&!opera){if(elwidth==0){elwidth=fixedelement.offsetWidth;}fixedelement.style.left=(window.pageXOffset+window.innerWidth-elwidth-20)+'px';fixedelement.style.top=(window.pageYOffset)+'px';}else if(opera){fixedelement.style.pixelLeft=window.pageXOffset+document.body.clientWidth-elwidth-110;fixedelement.style.pixelTop=window.pageYOffset;}}
function addLoadEvent(func){var oldonload=window.onload;if(typeof window.onload!='function'){window.onload=func;}else{window.onload=function(){oldonload();func();}}}
function addEvent(obj,evType,fn){if(obj.addEventListener){obj.addEventListener(evType,fn,false);return true;}else if(obj.attachEvent){var r=obj.attachEvent("on"+evType,fn);return r;}else{return false;}}
function byteStr(size){var byteSize=Math.round(size/1024*100)*.01;var suffix='KB';if(byteSize>1000){byteSize=Math.round(byteSize*.001*100)*.01;suffix='MB';}var sizeParts=byteSize.toString().split('.');if(sizeParts.length>1){byteSize=sizeParts[0]+'.'+sizeParts[1].substr(0,2);}else{byteSize=sizeParts[0];}return byteSize+suffix;}
function getQ_radio(qid){if($('#ctq_'+qid).css('display')=='none'){return undefined;}return $("input[name='"+qid+"_numeric_answer1']:checked").val();}
function getQ_mradio(qid,idx){if($('#ctq_'+qid).css('display')=='none'){return undefined;}var name=qid+((idx<=10)?"_numeric_answer"+idx:"_alpha_answer"+(idx-10));var hasAnswer=false;var id='#ctq_'+qid+' input[type=radio]:checked';$(id).each(function(){if($(this).val()){hasAnswer=true;}});if(!hasAnswer){return undefined;}var val=$("input[name='"+name+"']:checked").val();val=(val)?val:undefined;return val;}
function getQ_drop(qid){if($('#ctq_'+qid).css('display')=='none'){return undefined;}var id="#"+qid+"_numeric_answer1";var val=$(id).val();return(val!=0)?val:undefined;}
function getQ_mdrop(qid,idx){if($('#ctq_'+qid).css('display')=='none'){return undefined;}var id="#"+qid+((idx<=10)?"_numeric_answer"+idx:"_alpha_answer"+(idx-10));var hasAnswer=false;for(i=1;i<=20;i++){var cid="#"+qid+((i<=10)?"_numeric_answer"+i:"_alpha_answer"+(i-10));if($(cid).val()){if($(cid).val()!=0){hasAnswer=true;break;}}}if(!hasAnswer){return undefined;}var val=$(id).val();return(val!=0)?val:undefined;}
function getQ_list(qid){if($('#ctq_'+qid).css('display')=='none'){return undefined;}var id="#"+qid+"_alpha_answer1";var val=$(id).val();return(val!='')?val:undefined;}
function getQ_checkbox(qid,idx){if($('#ctq_'+qid).css('display')=='none'){return undefined;}var id="input[name='"+qid+((idx<=10)?"_alpha_answer"+idx:"_numeric_answer"+(idx-10))+"']:checked";var val=($(id).val()!=null)?'1':'0';return val;}
function getQ_mpicklist(qid,value){if($('#ctq_'+qid).css('display')=='none'){return undefined;}var result=0;var id='#ctq_'+qid+' input[type=checkbox]:checked';$(id).each(function(){if($(this).val()==value){result=1;}});return result;}
function getQ_mcheckbox(qid,idx1,idx2){if($('#ctq_'+qid).css('display')=='none'){return undefined;}var id="input[name='"+qid+((idx1<=10)?"_numeric_answer"+idx1:"_alpha_answer"+(idx1-10))+"_"+idx2+"']:checked";var val=($(id).val())?'1':'0';return val;}
function getQ_mpercentage(qid,idx){if($('#ctq_'+qid).css('display')=='none'){return undefined;}var id="#"+qid+'_'+(idx-1);var hasAnswer=false;for(i=0;i<=19;i++){var cid="#"+qid+'_'+i;if($(cid).val()){if($(cid).val()!=0){hasAnswer=true;break;}}}if(!hasAnswer){return undefined;}var val=$(id).val();return val;}





var FSLWebServeySettings = {
        "survey":{

                // List of implementations
                "surveys":{
                        "counter":5, // The amount of pages that must have been visited before the survey launches - these can be any pages on the site. so if a user lands on a page with a survey they need to have been to at least 5 pages before hand before the survey will appear.


                        "sname_en":{ // This is a another survey implementation
                                "name":"name2",
								// Modified for CR-57712 by b49844 Start
                                "surveyURL": "/survey/ChooseSurvey?lang_cd=en",
								// Modified for CR-57712 by b49844 End
                                "design":"modalenglish",
                                "presentation":"new",
                                "windowWidth":"900",
                                "windowHeight":"600",
                                "windowScrolling":"yes",
                                "windowResize":"yes",
                                "windowMenu":"yes",
                                "windowLocation":"no",
                                "windowStatus":"yes",
                                "timer":2000,
                                "ratio":3,
                                "frequency":1,
                                "expiry":90
                        },
                        "sname_ja":{ // This is a another survey implementation
                                "name":"name2",
								// Modified for CR-57712 by b49844 Start
                                "surveyURL": "/survey/ChooseSurvey?lang_cd=ja",
								// Modified for CR-57712 by b49844 End
                                "design":"modaljapanese",
                                "presentation":"new",
                                "windowWidth":"900",
                                "windowHeight":"600",
                                "windowScrolling":"yes",
                                "windowResize":"yes",
                                "windowMenu":"yes",
                                "windowLocation":"no",
                                "windowStatus":"yes",
                                "timer":2000,
                                "ratio":3,
                                "frequency":1,
                                "expiry":90
                        },
                        "sname_zh":{ // This is a another survey implementation
                                "name":"name2",
								// Modified for CR-57712 by b49844 Start
                                "surveyURL": "/survey/ChooseSurvey?lang_cd=zh-Hans",
								// Modified for CR-57712 by b49844 End
                                "design":"modalchinese",
                                "presentation":"new",
                                "windowWidth":"900",
                                "windowHeight":"600",
                                "windowScrolling":"yes",
                                "windowResize":"yes",
                                "windowMenu":"yes",
                                "windowLocation":"no",
                                "windowStatus":"yes",
                                "timer":2000,
                                "ratio":3,
                                "frequency":1,
                                "expiry":90
                        }

                },

                // The design of the modal window
                "modal":{
                        "background":{
                                "color":"#E5E5E5", // The background colour of the filter layer
                                "opacity":"60" // The opacity of the filter layer
                        },
                        "mWindow":{
                                "background":"", // The background colour of the modal window
                                "backgroundImage":"url('/bowen-craggs/survey/bc-survey/background.png') left top no-repeat", // The background image of the modal window
                                "width":"200px", // The width of the modal window
                                "height":"120px", // The height of the modal window
                                "border":"" // The border style of the window
                        },
                        "header":{
                                "text":"The heading", // The text for the heading
                                "background":"", // The background colour of the heading
                                "backgroundImage":"", // The background image of the heading
                                "border":"0", // The border style of the heading
                                "margin":"0", // The margin of the heading
                                "padding":"8px 10px", // The padding of the headings
                                "font":"Arial, helvetica, sans-serif", // The font of the heading
                                "fontSize":"14px", // The text size of the heading
                                "color":"#333" // The text colour of the heading
                        },
                        "question":{
                                "text":"This is the question.<br />With a carriage return and a <a href='#'>Link</a>", // The text of the question
                                "background":"", // The background of the question
                                "backgroundImage":"", // The background image of the question
                                "border":"0", // The border style of the question
                                "margin":"0", // The margin of the question
                                "padding":"5px 10px", // The padding of the question
                                "font":"Arial, helvetica, sans-serif", // The font of the question
                                "fontSize":"12px", // The text size of the question
                                "color":"#333" // The text colour of the question
                        },
                        "answers":{
                                "padding":"10px", // The padding around the two answers
                                "borderTop":"0", // The top border stlye around the two answers
                                "borderBottom":"0" // The bottom border style around the two answers
                        },
                        "answer1":{
                                "type":"decline", // The "decline" answer (you have to have one decline and one aaccept)
                                "text":"no", // The text for the decline answer
                                "background":"#006CB5", // The background for the decline answer
                                "backgroundImage":"", // The background image for the decline answer
                                "border":"1px solid #006CB5", // The border style for the decline answer
                                "margin":"0", // The margin for the decline answer
                                "padding":"2px 15px", // The padding for the decline answer
                                "font":"Arial, helvetica, sans-serif", // The font for the decline answer
                                "fontSize":"12px", // The text size for the decline answer
                                "color":"#fff" // The text colour for the decline answer
                        },
                        "answer2":{
                                "type":"accept", // The "accept" answer (you have to have one decline and one aaccept)
                                "text":"yes", // The text for the accept answer
                                "background":"#006CB5", // The background for the accept answer
                                "backgroundImage":"", // The background image for the accept answer
                                "border":"1px solid #006CB5", // The border style for the accept answer
                                "margin":"0", // The margin for the accept answer
                                "padding":"2px 15px", // The padding for the accept answer
                                "font":"Arial, helvetica, sans-serif", // The font for the accept answer
                                "fontSize":"12px", // The text size for the accept answer
                                "color":"#fff" // The text colour for the accept answer
                        }

                },
                // The design of the modal window
                "modalenglish":{
                        "background":{
                                "color":"#E5E5E5", // The background colour of the filter layer
                                "opacity":"60" // The opacity of the filter layer
                        },
                        "mWindow":{
                                "background":"", // The background colour of the modal window
                                "backgroundImage":"url('/files/worldwide/homepage/images/FSL_survey.jpg') left top no-repeat", // The background image of the modal window
                                "width":"365px", // The width of the modal window
                                "height":"255px", // The height of the modal window
                                "border":"#787878" // The border style of the window
                        },
                        "header":{
                                "text":"", // The text for the heading
                                "background":"", // The background colour of the heading
                                "backgroundImage":"", // The background image of the heading
                                "border":"0", // The border style of the heading
                                "margin":"0", // The margin of the heading
                                "padding":"42px 10px 0 10px", // The padding of the headings
                                "font":"Arial Bold, Arial", // The font of the heading
                                "fontSize":"14px", // The text size of the heading
                                "color":"#5C5C5C" // The text colour of the heading
                        },
                        "question":{
                                "text":"We are working to improve our website and are <br /> interested in learning more about why you're visiting. <br /> <br />Will you please help us by completing a short survey?", // The text of the main content
                                "background":"", // The background of the question
                                "image":"", // The background image of the question
                                "border":"0", // The border style of the question
                                "margin":"0", // The margin of the question
                                "padding":"20px 37px 20px", // The padding of the question
                                "font":"Arial", // The font of the question
                                "fontSize":"12px", // The text size of the question
                                "color":"#000000" // The text colour of the question
                        },
                        "answers":{
                                "padding":"5px 80px", // The padding around the two answers
                                "borderTop":"0", // The top border stlye around the two answers
                                "borderBottom":"0" // The bottom border style around the two answers
                        },
                        "answer1":{
                                "type":"decline", // The "decline" answer (you have to have one decline and one accept)
                                "text":"No", // The text for the decline answer
                                "background":"#1E1E1E", // The background for the decline answer
                                "backgroundImage":"", // The background image for the decline answer
                                "border":"1px solid #1E1E1E", // The border style for the decline answer
                                "margin":"0", // The margin for the decline answer
                                "padding":"2px 15px", // The padding for the decline answer
                                "font":"Arial Bold, Arial", // The font for the decline answer
                                "fontSize":"12px", // The text size for the decline answer
                                "color":"#ffffff" // The text colour for the decline answer
                        },
                        "answer2":{
                                "type":"accept", // The "accept" answer (you have to have one decline and one aaccept)
                                "text":"Yes", // The text for the accept answer
                                "background":"#1E1E1E", // The background for the accept answer
                                "backgroundImage":"", // The background image for the accept answer
                                "border":"1px solid #1E1E1E", // The border style for the accept answer
                                "margin":"0", // The margin for the accept answer
                                "padding":"2px 15px", // The padding for the accept answer
                                "font":"Arial Bold, Arial", // The font for the accept answer
                                "fontSize":"12px", // The text size for the accept answer
                                "color":"#ffffff" // The text colour for the accept answer
                        }


                },
                "modaljapanese":{
                        "background":{
                                "color":"#E5E5E5", // The background colour of the filter layer
                                "opacity":"60" // The opacity of the filter layer
                        },
                        "mWindow":{
                                "background":"", // The background colour of the modal window
                                "backgroundImage":"url('/files/worldwide/homepage/images/FSL_survey_ja.jpg') left top no-repeat", // The background image of the modal window
                                "width":"565px", // The width of the modal window
                                "height":"255px", // The height of the modal window
                                "border":"#787878" // The border style of the window
                        },
                        "header":{
                                "text":"", // The text for the heading
                                "background":"", // The background colour of the heading
                                "backgroundImage":"", // The background image of the heading
                                "border":"0", // The border style of the heading
                                "margin":"0", // The margin of the heading
                                "padding":"42px 10px 0 10px", // The padding of the headings
                                "font":"Arial Bold, Arial", // The font of the heading
                                "fontSize":"14px", // The text size of the heading
                                "color":"#5C5C5C" // The text colour of the heading
                        },
                        "question":{
                                "text":"フリースケールは日々ウェブサイトの改善に努めています。今回は、お客様がフリースケールのウェブサイトを訪問された目的をお伺いして、サービスの向上に役立たせていただこうと考えています。 <br /> <br />ぜひとも以下のアンケートにご協力ください。", // The text of the main content
                                "background":"", // The background of the question
                                "image":"", // The background image of the question
                                "border":"0", // The border style of the question
                                "margin":"0", // The margin of the question
                                "padding":"20px 37px 20px", // The padding of the question
                                "font":"Arial", // The font of the question
                                "fontSize":"12px", // The text size of the question
                                "color":"#000000" // The text colour of the question
                        },
                        "answers":{
                                "padding":"5px 80px", // The padding around the two answers
                                "borderTop":"0", // The top border stlye around the two answers
                                "borderBottom":"0" // The bottom border style around the two answers
                        },
                        "answer1":{
                                "type":"decline", // The "decline" answer (you have to have one decline and one accept)
                                "text":"アンケートに回答しない", // The text for the decline answer
                                "background":"#1E1E1E", // The background for the decline answer
                                "backgroundImage":"", // The background image for the decline answer
                                "border":"1px solid #1E1E1E", // The border style for the decline answer
                                "margin":"0", // The margin for the decline answer
                                "padding":"2px 15px", // The padding for the decline answer
                                "font":"Arial Bold, Arial", // The font for the decline answer
                                "fontSize":"12px", // The text size for the decline answer
                                "color":"#ffffff" // The text colour for the decline answer
                        },
                        "answer2":{
                                "type":"accept", // The "accept" answer (you have to have one decline and one aaccept)
                                "text":"アンケートに回答する", // The text for the accept answer
                                "background":"#1E1E1E", // The background for the accept answer
                                "backgroundImage":"", // The background image for the accept answer
                                "border":"1px solid #1E1E1E", // The border style for the accept answer
                                "margin":"0", // The margin for the accept answer
                                "padding":"2px 15px", // The padding for the accept answer
                                "font":"Arial Bold, Arial", // The font for the accept answer
                                "fontSize":"12px", // The text size for the accept answer
                                "color":"#ffffff" // The text colour for the accept answer
                        }


                },
                "modalchinese":{
                        "background":{
                                "color":"#E5E5E5", // The background colour of the filter layer
                                "opacity":"60" // The opacity of the filter layer
                        },
                        "mWindow":{
                            "background":"", // The background colour of the modal window
                                "backgroundImage":"url('/files/worldwide/homepage/images/FSL_survey.jpg') left top no-repeat", // The background image of the modal window
                                "width":"365px", // The width of the modal window
                                "height":"255px", // The height of the modal window
                                "border":"#787878" // The border style of the window
                        },
                        "header":{
                                "text":"", // The text for the heading
                                "background":"", // The background colour of the heading
                                "backgroundImage":"", // The background image of the heading
                                "border":"0", // The border style of the heading
                                "margin":"0", // The margin of the heading
                                "padding":"42px 10px 0 10px", // The padding of the headings
                                "font":"Arial Bold, Arial", // The font of the heading
                                "fontSize":"14px", // The text size of the heading
                                "color":"#5C5C5C" // The text colour of the heading
                        },
                        "question":{
                                "text":"我们正在努力改进我们的网站，并希望了解您访问这里的具体原因。<br /> <br />您是否愿意帮助我们完成一个简短的调查？", // The text of the main content
                                "background":"", // The background of the question
                                "image":"", // The background image of the question
                                "border":"0", // The border style of the question
                                "margin":"0", // The margin of the question
                                "padding":"20px 37px 20px", // The padding of the question
                                "font":"Arial", // The font of the question
                                "fontSize":"12px", // The text size of the question
                                "color":"#000000" // The text colour of the question
                        },
                        "answers":{
                                "padding":"5px 80px", // The padding around the two answers
                                "borderTop":"0", // The top border stlye around the two answers
                                "borderBottom":"0" // The bottom border style around the two answers
                        },
                        "answer1":{
                                "type":"decline", // The "decline" answer (you have to have one decline and one accept)
                                "text":"否", // The text for the decline answer
                                "background":"#1E1E1E", // The background for the decline answer
                                "backgroundImage":"", // The background image for the decline answer
                                "border":"1px solid #1E1E1E", // The border style for the decline answer
                                "margin":"0", // The margin for the decline answer
                                "padding":"2px 15px", // The padding for the decline answer
                                "font":"Arial Bold, Arial", // The font for the decline answer
                                "fontSize":"12px", // The text size for the decline answer
                                "color":"#ffffff" // The text colour for the decline answer
                        },
                        "answer2":{
                                "type":"accept", // The "accept" answer (you have to have one decline and one aaccept)
                                "text":"是", // The text for the accept answer
                                "background":"#1E1E1E", // The background for the accept answer
                                "backgroundImage":"", // The background image for the accept answer
                                "border":"1px solid #1E1E1E", // The border style for the accept answer
                                "margin":"0", // The margin for the accept answer
                                "padding":"2px 15px", // The padding for the accept answer
                                "font":"Arial Bold, Arial", // The font for the accept answer
                                "fontSize":"12px", // The text size for the accept answer
                                "color":"#ffffff" // The text colour for the accept answer
                        }


                }


        }

}
// WebServeyurls: In this variable URLS of all the pages are mentioned where you want the survey popup appear
var WebServeyurls = [

        /*//["http://az84ap47.am.freescale.net:8274/webapp",FSLWebServeySettings.survey.surveys.sname_en,[["q1",2],["q4","url"]]],
        //["http://uat.freescale.com/webapp",FSLWebServeySettings.survey.surveys.sname_en,[["q1",2],["q4","url"]]],
        //["http://www.freescale.com/webapp",FSLWebServeySettings.survey.surveys.sname_en,[["q1",2],["q4","url"]]],

        ["http://az84ap80.am.freescale.net:8144/ja/webapp",FSLWebServeySettings.survey.surveys.sname_ja,[["q1",2],["q4","url"]]],
        ["http://uat.freescale.com/ja/webapp",FSLWebServeySettings.survey.surveys.sname_ja,[["q1",2],["q4","url"]]],
        ["http://www.freescale.com/ja/webapp",FSLWebServeySettings.survey.surveys.sname_ja,[["q1",2],["q4","url"]]],

        ["http://az84ap80.am.freescale.net:8144/zh-Hans/webapp",FSLWebServeySettings.survey.surveys.sname_zh,[["q1",2],["q4","url"]]],
        ["http://uat.freescale.com/zh-Hans/webapp",FSLWebServeySettings.survey.surveys.sname_zh,[["q1",2],["q4","url"]]],
        ["http://www.freescale.com/zh-Hans/webapp",FSLWebServeySettings.survey.surveys.sname_zh,[["q1",2],["q4","url"]]],

        ["http://az84ap80.am.freescale.net:8144/webapp/parametricSelector.sp",FSLWebServeySettings.survey.surveys.sname_en,[["q1",2],["q4","url"]]],
        ["http://search-uat.freescale.com/search",FSLWebServeySettings.survey.surveys.sname_en,[["q1",2],["q4","url"]]],
        ["http://search.freescale.com/search",FSLWebServeySettings.survey.surveys.sname_en,[["q1",2],["q4","url"]]]
*/
]

// * Start Survey - DO NOT EDIT *
document.onload = FSLWebSurvey.init();