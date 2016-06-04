function buynow(part) 
{   
	// Modified by B12883 for CR50448 on 18Apr2013
	//window.open('../../shoppingcart/popup.jsp?partnumber=' + part, 'Freescale','location=no,toolbar=no,scrollbars=yes,resizable,width=750,height=500');
	window.open('../../shoppingcart/popup.jsp?partnumber=' + part, 'Freescale','location=no,toolbar=no,scrollbars=yes,resizable,width=950,height=500');
}

<!-- WR2995 - changed by r9188z dt 01/12/2004 [start] -->
<!-- New function added for obsolete part -->
function buynow_obsoletepart(part){
	var url = '/shoppingcart/popup.jsp?partnumber=' + part;
	var tmp = webURLPrefix();
	url = tmp+url;
	window.open(url, 'Freescale','location=no,toolbar=no,scrollbars=yes,resizable,width=750,height=500');
}
<!-- WR2995 - changed by r9188z dt 01/12/2004 [end] -->

<!-- Added By RZ106C For CCT37858 Start 11-July-2006 -->
function infoImage(code){
	var url = '../../collateralDescription.jsp?code=' + code;
	window.open(url, 'Description','location=no,toolbar=no,scrollbars=yes,resizable,width=500,height=300');
}
<!-- Added By RZ106C For CCT37858 End 11-July-2006 -->

function infoImageSearch(code){
	var url = '../../collateralDescription.jsp?code=' + code;
	window.open(url, 'Description','location=no,toolbar=no,scrollbars=yes,resizable,width=500,height=300');
}


function infoImageSearchMain(code){
	var url = '../collateralDescription.jsp?code=' + code;
	window.open(url, 'Description','location=no,toolbar=no,scrollbars=yes,resizable,width=500,height=300');
}


function ordernow(id)
{
	window.open('shoppingcart.recordmetrics.framework?fivecode=HIBRT&partnumber=' + id + '&distyname=Hibbert', 'Hibbert');
}

function search4Product(thePage)
{
	window.open(thePage);
	parent.close();
	
}

function showDistrib()
{
	var val = document.countryForm.countries[document.countryForm.countries.selectedIndex].value;
	if(val != "")
	{
		document.countryForm.country.value = val;
		document.countryForm.submit();
	}
}

function wheretobuy()  
{
	window.open('/webapp/shoppingcart/wtbpopup.jsp', 'WhereToBuy','location=no,toolbar=no,scrollbars=yes,resizable,width=500,height=390');
}

