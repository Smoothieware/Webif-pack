function dapThirdPartyDesign(wl_ident,nodeId)
{
        window.location=wl_ident+'/dap.yellowpage.framework?NEXT_SCREEN=YELLOWPAGE&fromNodeId=' + nodeId;
}

function dapTraining(wl_ident,prodId,prodCode,prodName)
{
        url=wl_ident+'/dap.course_detail.framework?NEXT_SCREEN=COURSEDETAIL&PRODUCT_ID='+prodId+'&PRODUCT_CODE='+prodCode+'&PRODUCT_NAME='+prodName;
        window.open(url,'courses','location=yes,toolbar=yes,menubar=yes,scrollbars=yes,resizable=yes,width=750,height=500');
}

function dapProductToolVendors(wl_ident,actionType, val)
{
        window.location=wl_ident+'/dap.yellowpage.framework?NEXT_SCREEN=YELLOWPAGE&'+actionType+'='+val+'&Service=Tool+%26+Hardware%2FSoftware+Vendor';
}

function dapProductThirdPartyTraining(wl_ident,nodeId)
{
        window.location=wl_ident+'/dap.yellowpage.framework?NEXT_SCREEN=YELLOWPAGE&fromNodeId='+nodeId+'&Service=Third+Party+Trainer';
}

function dapThirdPartyCollateral(wl_ident,dapId)
{
        var encodeDapId = URLEncode(dapId);
        window.location=wl_ident+'/dap.detail.framework?NEXT_SCREEN=DETAIL&DapId='+encodeDapId+'&CUSTOMER='+encodeDapId+'&Service=Tool+%26+Hardware%2FSoftware+Vendor&fromDevToolProdNodeId=';
}

function dapPassThru(wl_ident,colId,dapId)
{
        window.location=wl_ident+'/dap.passthru.framework?NEXT_SCREEN=PASSTHRU&colId='+colId+'&DapId='+dapId;
}


function URLEncode( plaintext ) {
	var SAFE = "0123456789" +
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		"abcdefghijklmnopqrstuvwxyz" +
		"-_.!~*'()";	// RFC2396  reference
	var HEX = "0123456789ABCDEF";

	var encoded = "";
	for (var i = 0; i < plaintext.length; i++ ) {
		var ch = plaintext.charAt(i);
		if (SAFE.indexOf(ch) != -1) {
		    encoded += ch;
	        } else if (ch == " ") {
		    encoded += "+";
		} else {
		    var charCode = ch.charCodeAt(0);
			if (charCode > 255) {
				//bad char, put space holder
				encoded += "+";
			} else {
				encoded += "%";
				encoded += HEX.charAt((charCode >> 4) & 0xF);
				encoded += HEX.charAt(charCode & 0xF);
			}
		}
	}

	return encoded;
}

