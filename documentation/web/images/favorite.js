var url = "/webapp/history/updateFavorites.sp";
var commandID = "UPDATE_FAVORITES";
var siteSource = "WEB";
var objAnchorTag ;
function callFramework(objAnchor,assetID,assetType) {
	var queryString = "";
	queryString = "?assetID="+assetID+"&assetType="+assetType+"&commandID="+commandID+"&siteSource="+siteSource;
	objAnchorTag = objAnchor;
	if(objAnchorTag.childNodes[0].src.indexOf("filledstar")!=-1){
		queryString = queryString +"&deleteFlg=true";
		objAnchorTag.childNodes[0].src = objAnchorTag.childNodes[0].src.replace("filledstar","whitestar");
	}
	else{
		queryString = queryString +"&deleteFlg=false";
		objAnchorTag.childNodes[0].src = objAnchorTag.childNodes[0].src.replace("whitestar","filledstar");
		}
	jQuery.post(url + queryString, verify);
}
function verify(data){
		if(data != null && data!='' && data.flag=='FALSE'){
		var alertMsg=getTranslatedText('To mark as favorite , Please Login and select remember me option');
			//alert("To mark as favorite , Please Login and select remember me option ");
			alert(alertMsg);
			if(objAnchorTag.childNodes[0].src.indexOf("filledstar")!=-1){
				objAnchorTag.childNodes[0].src = objAnchorTag.childNodes[0].src.replace("filledstar","whitestar");
			}else{
				objAnchorTag.childNodes[0].src = objAnchorTag.childNodes[0].src.replace("whitestar","filledstar");
			}
		}
}