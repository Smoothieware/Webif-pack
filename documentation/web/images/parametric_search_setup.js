//--------------------------------------------------------------
function txAction(nodeName,nodeId,categoryId) {

	eval("window.document.ParametricTaxForm.xCoordinate.value=getScrollX();");
	eval("window.document.ParametricTaxForm.yCoordinate.value=getScrollY();");
	eval("window.document.ParametricTaxForm.expand.value=nodeId;");
	eval("window.document.ParametricTaxForm.collapse.value='';");
	eval("window.document.ParametricTaxForm.nodeName.value=nodeName;");
	eval("window.document.ParametricTaxForm.nodeId.value=categoryId;");
	eval("window.document.ParametricTaxForm.FromNodeId.value=nodeId;");
	eval("window.document.ParametricTaxForm.submit();");

}
//--------------------------------------------------------------
// Attempts to prevent a user from double clicking a submit button
submitClicked = false;
function checkSubmitClicked() {
	if(submitClicked) {
		return confirm("The form has already been submitted, click OK to resubmit");
	} else {
		submitClicked = true;
		return true;
	}
}
//--------------------------------------------------------------
function checkAllDisplays() {
	var obj = document.TAB_PARAMETRIC_SEARCH.selectedHeaders;
	if(obj.length){
		for(i=0; i<obj.length; i++){
			obj[i].checked=true;
		}
	}else{
		obj.checked=true;
	}

}
//--------------------------------------------------------------
function unCheckAllDisplays() {
	var obj = document.TAB_PARAMETRIC_SEARCH.selectedHeaders;
	if(obj.length){
		for(i=0; i<obj.length; i++){
			obj[i].checked=false;
		}
	}else{
		obj.checked=false;
	}

}
//--------------------------------------------------------------
function defaultCheckDisplays() {
	var obj = document.TAB_PARAMETRIC_SEARCH.selectedHeaders;
	if(obj.length){
		for(i=0; i<obj.length; i++){
			if(obj[i].defaultChecked == true){
				obj[i].checked=true;
			}else{
				obj[i].checked=false;
			}
		}
	}else{
		if(obj.defaultChecked == true){
			obj.checked=true;
		}else{
			obj.checked=false;
		}
	}

}
//--------------------------------------------------------------





