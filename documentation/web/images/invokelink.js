function addItem(wl_ident, queryString)
{
	// Added for CR54489
	if(typeof setAddCartLocAnalyticsCookie == 'function') { 
		setAddCartLocAnalyticsCookie();
	}
   window.location.href='/webapp/ecommerce.add_item.framework?' + queryString ;
}