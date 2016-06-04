var jQuery_19_1_GSA = jQuery_1_9_1;
function ss_Debugger() {
  this.debugMode = false;
}

	if (!Array.prototype.indexOf) {
	  Array.prototype.indexOf = function (searchElement , fromIndex) {
		var i,
			pivot = (fromIndex) ? fromIndex : 0,
			length;

		if (!this) {
		  throw new TypeError();
		}

		length = this.length;

		if (length === 0 || pivot >= length) {
		  return -1;
		}

		if (pivot < 0) {
		  pivot = length - Math.abs(pivot);
		}

		for (i = pivot; i < length; i++) {
		  if (this[i] === searchElement) {
			return i;
		  }
		}
		return -1;
	  };
	}

	var ss_form_element = 'search'; // search form
	var ss_popup_element = 'result_suggest'; // search suggestion drop-down
	var ss_seq = [ 'g' ];
	var ss_g_one_name_to_display = "Suggestion";
	var ss_g_more_names_to_display = "Suggestions";
	var ss_g_max_to_display = 10;
	var ss_max_to_display = 12;
	var ss_wait_millisec = 300;
	var ss_delay_millisec = 30;

	var SS_OUTPUT_FORMAT_LEGACY = 'legacy';
	var SS_OUTPUT_FORMAT_OPEN_SEARCH = 'os';
	var SS_OUTPUT_FORMAT_RICH = 'rich';
	var ss_protocol = SS_OUTPUT_FORMAT_RICH;
	var ss_allow_non_query = true;
	var ss_non_query_empty_title = "No Title";
	var ss_allow_debug = false;
	var SS_ROW_CLASS = 'ss-gac-a';
	var SS_ROW_SELECTED_CLASS = 'ss-gac-b';
	var ss_qbackup=null;
	var ss_cached = [];
	var ss_debug = new ss_Debugger();
	var ss_dismissed = false;
	var ss_qshown = null;

	function redirect(event){
	 var suggestForm = document.getElementById('search');
	var parts = document.getElementById('parts');
	var input = document.createElement('input');
	input.type = 'hidden';
	 input.name = 'QueryText';
	 input.value = parts.value;
	suggestForm.appendChild(input);
	var remInp = document.getElementById('output');
	suggestForm.removeChild(remInp);
	remInp = document.getElementById('client');
	suggestForm.removeChild(remInp);
	 remInp = document.getElementById('proxystylesheet');
	suggestForm.removeChild(remInp);
	 remInp = document.getElementById('sort');
	suggestForm.removeChild(remInp); 
	 remInp = document.getElementById('oe');
	suggestForm.removeChild(remInp);   
	 remInp = document.getElementById('ie');
	suggestForm.removeChild(remInp);  	
  	remInp = document.getElementById('ud');
	suggestForm.removeChild(remInp);   
	remInp = document.getElementById('exclude_apps');
	suggestForm.removeChild(remInp);   
	remInp = document.getElementById('site');
	suggestForm.removeChild(remInp);   
	remInp = document.getElementById('callback');
	suggestForm.removeChild(remInp); 
    remInp = document.getElementById('parts');
	//suggestForm.removeChild('parts');
	  return  submitEvent();
};


/**
 * Low-level raw information including AJAX requests and responses shown via
 * rudimental alert().
 * @type {boolean}
 */
var ss_panic = false;
/**
 * Lock to prevent contention when drawing the suggestion box, especially for
 * the concurrent AJAX calls.
 * @type {boolean}
 */
var ss_painting = false;

/**
 * Pending painting request holder.
 */
var ss_painting_queue = null;
/**
 * Id of debug console in the DOM Tree.
 * @type {string}
 */
ss_Debugger.DEBUG_CONSOLE_ID = 'ss_debug_console';

/**
 * Id of content node of debug console in the DOM Tree.
 * @type {string}
 */
ss_Debugger.DEBUG_CONTENT_ID = 'ss_debug_content';

/**
 * Id of the button that minimizes/maximizes the debug console.
 * @type {string}
 */
ss_Debugger.DEBUG_TOGGLE_ID = 'ss_debug_toggle';

/**
 * Getter method for debugMode member variable.
 * @return {boolean} The value of debugMode variable.
 */
ss_Debugger.prototype.getDebugMode = function() {
  return this.debugMode;
};

/**
 * Activates debugger console.
 */
ss_Debugger.prototype.activateConsole = function() {
  var console = document.getElementById(ss_Debugger.DEBUG_CONSOLE_ID);
  if (console) {
    console.style.display = 'block';
  } else {
    var dc = document.createElement('div');
    dc.id = ss_Debugger.DEBUG_CONSOLE_ID;
    dc.zIndex = 100;
    dc.className = 'expanded';
    var title = document.createElement('h1');
    title.appendChild(document.createTextNode('GSA Suggest Debug Console'));
    title.style.display = 'inline';
    dc.appendChild(title);
    var actn = document.createElement('div');
    actn.style.float = 'right';
    var btn = document.createElement('button');
    btn.onclick = function(event) {
      var debugContent = document.getElementById(ss_Debugger.DEBUG_CONTENT_ID);
      if (debugContent) {
        for (var ri = debugContent.rows.length - 1; ri > 0; ri--) {
          debugContent.deleteRow(ri);
        }
      }
    };
    btn.appendChild(document.createTextNode('Clear console'));
    actn.appendChild(btn);
    btn = document.createElement('button');
    btn.onclick = function(event) {
      ss_cached = [];
    };
    btn.appendChild(document.createTextNode('Clear cache'));
    actn.appendChild(btn);
    btn = document.createElement('button');
    btn.id = ss_Debugger.DEBUG_TOGGLE_ID;
    btn.onclick = function(event) {
      var debugConsole = document.getElementById(ss_Debugger.DEBUG_CONSOLE_ID);
      if (debugConsole) {
        var b = document.getElementById(ss_Debugger.DEBUG_TOGGLE_ID);
        if (debugConsole.className.indexOf('expanded') != -1) {
          debugConsole.className = debugConsole.className.replace(
              /expanded/, 'contracted');
          b.innerHTML = 'Maximize';
        } else {
          debugConsole.className = debugConsole.className.replace(
              /contracted/, 'expanded');
          b.innerHTML = 'Minimize';
        }
      }
    };
    btn.appendChild(document.createTextNode('Minimize'));
    actn.appendChild(btn);
    actn.style.display = 'inline';
    dc.appendChild(actn);
    dc.appendChild(document.createElement('br'));
    var pane = document.createElement('table');
    pane.id = ss_Debugger.DEBUG_CONTENT_ID;
    var dhr = pane.insertRow(-1);
    var dhc = document.createElement('th');
    dhc.innerHTML = 'Query';
    dhr.appendChild(dhc);
    dhc = document.createElement('th');
    dhc.innerHTML = 'Type';
    dhr.appendChild(dhc);
    dhc = document.createElement('th');
    dhc.innerHTML = 'Time';
    dhr.appendChild(dhc);
    dhc = document.createElement('th');
    dhc.innerHTML = 'g';
    dhr.appendChild(dhc);
    dhc = document.createElement('th');
    dhc.innerHTML = 'Total';
    dhr.appendChild(dhc);
    dc.appendChild(pane);
    document.body.appendChild(dc);
  }
  this.debugMode = true;
};

/**
 * De-activates debugger console.
 */
ss_Debugger.prototype.deactivateConsole = function() {
  var console = document.getElementById(ss_Debugger.DEBUG_CONSOLE_ID);
  if (console) {
    console.style.display = 'none';
  }
  this.debugMode = false;
};

ss_Debugger.prototype.addRequestDebugLine = function(query, type, time, obj) {
  var debugContent = document.getElementById(ss_Debugger.DEBUG_CONTENT_ID);
  if (debugContent) {
    var currentRow = debugContent.insertRow(1);
    var currentCell = document.createElement('td');
    currentCell.innerHTML = '&lt;' + ss_escapeDbg(query) + '&gt;';
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentCell.innerHTML = type;
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentCell.className = 'no';
    currentCell.innerHTML = time + ' ms';
    currentRow.appendChild(currentCell);
    switch (type) {
      case 'suggest':
        currentCell = document.createElement('td');
        currentCell.className = 'no';
        currentCell.innerHTML = (obj.g ? obj.g.length : 0);
        currentRow.appendChild(currentCell);
        currentCell = document.createElement('td');
        currentRow.appendChild(currentCell);
        break;
      default:
        currentCell = document.createElement('td');
        currentRow.appendChild(currentCell);
        currentCell = document.createElement('td');
        currentRow.appendChild(currentCell);
        break;
    }
  }
};

ss_Debugger.prototype.addShowDebugLine = function(query, time, o, total) {
  var debugContent = document.getElementById(ss_Debugger.DEBUG_CONTENT_ID);
  if (debugContent) {
    var currentRow = debugContent.insertRow(1);
    var currentCell = document.createElement('td');
    currentCell.innerHTML = '&lt;' + ss_escapeDbg(query) + '&gt;';
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentCell.innerHTML = '<i>show</i>';
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentCell.className = 'no';
    currentCell.innerHTML = time + ' ms';
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentCell.className = 'no';
    currentCell.innerHTML = (o ? (o.g ? o.g.length : 0) : 0);
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentCell.className = 'no';
    currentCell.innerHTML = total;
    currentRow.appendChild(currentCell);
  }
};

ss_Debugger.prototype.addHideDebugLine = function(query, type) {
  var debugContent = document.getElementById(ss_Debugger.DEBUG_CONTENT_ID);
  if (debugContent) {
    var currentRow = debugContent.insertRow(1);
    var currentCell = document.createElement('td');
    currentCell.innerHTML = '&lt;' + ss_escapeDbg(query) + '&gt;';
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentCell.innerHTML = '<i>' + type + '</i>';
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentCell.className = 'no';
    currentCell.innerHTML = '0 ms';
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentRow.appendChild(currentCell);
  }
};

ss_Debugger.prototype.addWaitDebugLine = function(query, type, time) {
  var debugContent = document.getElementById(ss_Debugger.DEBUG_CONTENT_ID);
  if (debugContent) {
    var currentRow = debugContent.insertRow(1);
    var currentCell = document.createElement('td');
    currentCell.innerHTML = '&lt;' + ss_escapeDbg(query) + '&gt;';
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentCell.innerHTML = '<i>' + type + '</i>';
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentCell.className = 'no';
    currentCell.innerHTML = time + ' ms';
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentRow.appendChild(currentCell);
    currentCell = document.createElement('td');
    currentRow.appendChild(currentCell);
  }
};


function searchTop(event) {

	 var kid = (window.event) ? window.event.keyCode : event.keyCode;
	 var suggestForm = document.getElementById('search');
				
	 var fo = document.getElementById(ss_form_element);
	 var qnow = (!ss_qbackup) ? fo.q.value : ss_qbackup;
         var tbl = document.getElementById(ss_popup_element);
         
          //document.getElementById(ss_form_element).q.value = opt_inputEle.value;

	switch (kid) {
	
	case 40:
	 
	 if (ss_qbackup) {
            ss_loc++;
			
          } else {
            ss_qbackup = qnow;
            ss_loc = 0;
			
          }
          var rows = tbl.getElementsByTagName('tr');
          if(ss_loc==rows.length-1)
          {
           ss_loc=0;
           }
          for (var ri = 0; ri < rows.length - 1; ri++) {
            if (ri == ss_loc) {
              rows[ri].className = SS_ROW_SELECTED_CLASS;
	     } else {
              rows[ri].className = SS_ROW_CLASS;
            }
          }
          var suggestion = ss_locateSuggestion(qnow, ss_loc);

          if (suggestion.q) {
            fo.q.value = suggestion.q;
            // Updated the search box in embedded mode.
            
          } else {
            fo.q.value = ss_qbackup;
            // Updated the search box in embedded mode.
          }

	break;

       case 38:
	 
	 if (ss_qbackup) {
            ss_loc--;
			
          } else {
            ss_qbackup = qnow;
            ss_loc = 0;
			
          }
          var rows = tbl.getElementsByTagName('tr');
          if(ss_loc==-1)
          {
           ss_loc=rows.length-2;
           }
          for (var ri = 0; ri < rows.length - 1; ri++) {
            if (ri == ss_loc) {
              rows[ri].className = SS_ROW_SELECTED_CLASS;
	     } else {
              rows[ri].className = SS_ROW_CLASS;
            }
          }
	
          var suggestion = ss_locateSuggestion(qnow, ss_loc);

          if (suggestion.q) {
            fo.q.value = suggestion.q;
            // Updated the search box in embedded mode.
           
          } else {
            fo.q.value = ss_qbackup;
            // Updated the search box in embedded mode.
            
          }
	break;
        case 27:  // "escape".
      if (ss_qbackup) {
        fo.q.value = ss_qbackup;
        ss_qbackup = null;
      }
      ss_dismissed = true;
      ss_clear();
      break;
    case 37:  // "key left".
    case 39:  // "key right".
    case 9:  // "tab".
    case 16:  // "shift-tab".
      break;
	  default:

           var uri = ss_composeSuggestUri(document.getElementById('search').q.value, suggestForm);

			if(uri)
				{
				jQuery_19_1_GSA.ajax({
					//url: 'http://search-uat.freescale.com/suggest?q=i.mx&max=10&site=Development_Collection&client=search_all_results&access=p&format=rich&count=10',
					type: "POST",
                    url: ss_gsa_host + uri,
                    dataType: 'jsonp',
                    success: function(dataWeGotViaJsonp){
					
						var text = '';

						ss_qbackup = null;
						ss_loc = -1;
						var qVal = (!ss_qbackup) ? fo.q.value : ss_qbackup;
						var len = dataWeGotViaJsonp.results.length;
						var suggestions = dataWeGotViaJsonp.results;
						if (!ss_cached[qVal]) {
							ss_cached[qVal] = {};
						}

						if (suggestions && len > 0) {
							ss_cached[qVal].g = [];
							var found = false;
							var max = (ss_g_max_to_display <= 0) ? len : Math
									.min(ss_g_max_to_display, len);
							for ( var si = 0; si < max; si++) {
								if (suggestions[si].name
										&& suggestions[si].name != dataWeGotViaJsonp.query) {
									ss_cached[qVal].g[si] = {
										'q' : suggestions[si].name
									};
									found = true;
								} else if (ss_allow_non_query) {
									var title = suggestions[si].content;
									var url = suggestions[si].moreDetailsUrl;
									if (url) {
										title = !title ? ss_non_query_empty_title
												: title;
										ss_cached[qVal].g[si] = {
											't' : title,
											'u' : url
										};
										found = true;
									}
								}
							}
							if (!found) {
				                  ss_cached[qVal].g = null;
				                }
						}
						else
							{
							 ss_cached[qVal].g = null;
							}

						if (ss_allow_debug && ss_debug
								&& ss_debug.getDebugMode()) {
							var stopTimeMs = new Date().getTime();
							ss_debug.addRequestDebugLine(qVal, 'suggest',
									stopTimeMs - startTimeMs, ss_cached[qVal]);
						}

						ss_show(qVal);

					}
				});

				}else
					{document.getElementById("result_suggest").style.visibility="hidden";}

			break;
			}
			
			
	};
	
	function ss_composeSuggestUri(qVal, suggestForm) {
  var siteVal = suggestForm.site ? suggestForm.site.value : null;
  var clientVal = suggestForm.client ? suggestForm.client.value : null;
  if (!qVal || !siteVal || !clientVal) {
    return null;
  }
  var accessVal = (suggestForm.access && suggestForm.access.value) ?
      suggestForm.access.value : 'p';
  var uri = '/suggest';
  if (SS_OUTPUT_FORMAT_LEGACY == ss_protocol) {
    uri = uri + '?token=' + encodeURIComponent(qVal) +
        '&max_matches=' + ss_g_max_to_display;
  } else {
    // Same param names for other two formats.
    uri = uri + '?q=' + encodeURIComponent(qVal) +
        '&max=' + ss_g_max_to_display;
  }
  uri = uri +
      '&site=' + encodeURIComponent(siteVal) +
      '&client=' + encodeURIComponent(clientVal) +
      '&access=' + encodeURIComponent(accessVal) +
      '&format=' + encodeURIComponent(ss_protocol);
  // Let's add the embedded mode forward root path the request URI to get the
  // suggest request proxied correctly to the GSA from the embedded mode
  // container.
  
  return uri;
}
/**
 * Looks up the suggestion for the typed query.
 *
 * @param {string} query The typed query.
 * @param {number} loc The location index of the current suggestion selection.
 *
 * @return {string} The suggestion term for given query at the given loc.
 */
function ss_locateSuggestion(query, loc) {
  var cnt1 = 0;
  var cnt2 = 0;
  var type = null;
  for (var z = 0; z < ss_seq.length; z++) {
    switch (ss_seq[z]) {
      case 'g':
        cnt2 += ss_cached[query].g ? ss_cached[query].g.length : 0;
        break;
    }
    if (loc >= cnt1 && loc < cnt2) {
      switch (ss_seq[z]) {
        case 'g':
          var qV = ss_cached[query].g[loc - cnt1].q;
          if (qV) {
            return { 'q': qV };
          } else {
            return { 'u': ss_cached[query].g[loc - cnt1].u };
          }
      }
      break;
    }
    cnt1 = cnt2;
  }
  return null;
}

/**
 * Shows search suggestions.
 *
 * @param {string} qry The query to which suggestions to be presented.
 */
function ss_show(qry) {
  var currentQry = document.getElementById(ss_form_element).q.value;
  if (currentQry != qry) {
    // The query whose suggestions to be shown does not match the current query
    // this happens when the previous query takes much longer to process.
    if (ss_allow_debug && ss_debug && ss_debug.getDebugMode()) {
      ss_debug.addHideDebugLine(qry, 'skip');
    }
    return;
  }

  var startTimeMs = new Date().getTime();
  if (ss_dismissed) {
    // The suggestion box has been dismissed by mouse close or key
    // escape/enter/tab.
    ss_qshown = null;
    ss_hide(qry);
    return;
  }

  if (!ss_processed(qry)) {
    // Not all ajax calls have been processed, skip instead.
    return;
  }

  if (qry == '') {
    // Empty query should not have much to suggest, close if not already.
    ss_hide(qry);
    return;
  }

  var g = ss_cached[qry] ? ss_cached[qry].g : null;
  var disp = false;
  if (ss_use.g && g) {
    disp = true;
  }

  if (!disp) {
    // Nothing to show for.
    ss_qshown = null;
    ss_hide(qry);
    return;
  }

  // Check the lock.
  if (ss_painting) {
    if (ss_painting_queue) {
      // Ignore potential painting request delayed earlier.
      clearTimeout(ss_painting_queue);
    }
    // Postpone the call for later time.
    if (ss_allow_debug && ss_debug && ss_debug.getDebugMode()) {
      ss_debug.addWaitDebugLine(qry, 'delay', ss_delay_millisec);
    }
    ss_painting_queue = setTimeout('ss_show("' + ss_escape(qry) + '")',
                                   ss_delay_millisec);
    return;
  } else {
    // Set the lock, which may not be fool-proof when more than another thread
    // checks the lock just before.
    ss_painting = true;
  }
  
  var tbl = document.getElementById(ss_popup_element);
  for (var ri = tbl.rows.length - 1; ri > -1; ri--) {
    tbl.deleteRow(ri);
  }
  var cnt = 0;
  for (var z = 0; z < ss_seq.length; z++) {
    switch (ss_seq[z]) {
      case 'g':
        cnt += ss_showSuggestion(g, cnt, tbl, qry);
        break;
    }
    if (ss_max_to_display > 0 && cnt >= ss_max_to_display) {
      break;
    }
  }
  if (cnt > 0) {
    var row = tbl.insertRow(-1);
    row.className = 'ss-gac-e';
    var cls = document.createElement('td');
    cls.colSpan = 2;
    var clsTxt = document.createElement('span');
    clsTxt.onclick = function() {
      ss_qbackup = null;
      ss_clear();  // This will always turn off ss_dismiss after bring search
                   // box into focus.
      var query = document.getElementById(ss_form_element).q.value;
      if (!ss_processed(query)) {
        // Fire new searches for the selected suggestion
        // useful for potential lucky guess.
        ss_dismissed = true;
        if (ss_panic) {
          alert('run ajax when mouse close');
        }
        ss_suggest(query);
      }
    };
    clsTxt.appendChild(document.createTextNode('close'));
    cls.appendChild(clsTxt);
    row.appendChild(cls);
    tbl.style.visibility = 'visible';
    ss_qshown = qry;
    if (ss_panic) {
      alert('open suggestion box for ' + qry);
    }
    if (ss_allow_debug && ss_debug && ss_debug.getDebugMode()) {
      var stopTimeMs = new Date().getTime();
      ss_debug.addShowDebugLine(qry, stopTimeMs - startTimeMs,
                                ss_cached[qry], cnt);
    }
  } else {
    ss_hide(qry);
  }
  // Release the lock.
  ss_painting = false;
}

/**
 * Determines if the query has been processed.
 *
 * @param {string} qVal The query that user enters.
 * @return {boolean} True if this query is already in cache.
 */
function ss_processed(qVal) {
  if (!ss_cached[qVal] && ss_use.g) {
    return false;
  }
  return true;
}

/**
 * Hides search suggestions.
 *
 * @param {string} qry The query to which suggestions to be closed.
 */
function ss_hide(qry) {
  var tbl = document.getElementById(ss_popup_element);
  if (tbl.style.visibility == 'visible') {
    if (ss_panic) {
      alert('close suggestion box');
    }
    if (ss_allow_debug && ss_debug && ss_debug.getDebugMode()) {
      ss_debug.addHideDebugLine(qry, 'hide');
    }
    tbl.style.visibility = 'hidden';
  }
}
/**
 * Draws suggestion.
 *
 * @param {object} g The suggest server entry.
 * @param {number} cnt The current row index to start drawing.
 * @param {object} tbl The suggestion box element.
 * @param {string} qry The user's query.
 * @return {number} Returns the number of suggestions actually drawn.
 */
function ss_showSuggestion(g, cnt, tbl, qry) {
  if (ss_max_to_display > 0 && cnt >= ss_max_to_display) {
    return 0;
  }
  if (g && g.length > 0) {
    lqry = qry.toLowerCase().replace(/\"/g, "");
    for (var i = 0; i < g.length; i++) {
      var row = tbl.insertRow(-1);
      row.onclick = ss_handleMouseC;
      row.onmousemove = ss_handleMouseM;
      row.className = SS_ROW_CLASS;
      var alt = document.createElement('td');
      // the suggestion will always start with the query.
      if (g[i].q) {
        var txtNode = '<b>' + g[i].q.substr(0, lqry.length) + '</b>';
        if (g[i].q.length > lqry.length) {
          txtNode += g[i].q.substring(lqry.length);
        }
        alt.innerHTML = txtNode;
      } else {
        alt.innerHTML = '<i>' + g[i].t + '</i>';
      }
      alt.className = 'ss-gac-c';
      row.appendChild(alt);
      var clue = '';
      if (i == 0 && g.length == 1) {
        clue = ss_g_one_name_to_display;
      } else if (i == 0) {
        clue = ss_g_more_names_to_display;
      }
      var typ = document.createElement('td');
      typ.appendChild(document.createTextNode(clue));
      typ.className = 'ss-gac-d';
      row.appendChild(typ);
      if (ss_max_to_display > 0 && cnt + i + 1 >= ss_max_to_display) {
        return i + 1;
      }
    }
    return g.length;
  }
  return 0;
}


/**
 * Handles mouse movement. To be attached to the row on mouse-over.
 * @return {boolean} Always returns true after handling the event.
 * @this {Element}
 */
function ss_handleMouseM() {
  var fo = document.getElementById(ss_form_element);
  var tbl = document.getElementById(ss_popup_element);
  var rows = tbl.getElementsByTagName('tr');
  for (var ri = 0; ri < rows.length - 1; ri++) {
    if (rows[ri] == this && rows[ri].className != SS_ROW_SELECTED_CLASS) {
      // Select the row.
      rows[ri].className = SS_ROW_SELECTED_CLASS;
      // Back up the original query if not already, and adjust the reference
      // index.
      if (!ss_qbackup) {
        ss_qbackup = fo.q.value;
      }
      ss_loc = ri;
      // Find out what type of suggestion it is.
      var suggestion = ss_locateSuggestion(ss_qbackup, ss_loc);
      // Adjust the query in the search box.
      if (suggestion.q) {
        fo.q.value = suggestion.q;
      } else {
        fo.q.value = ss_qbackup;
      }
    } else if (rows[ri] != this) {
      rows[ri].className = SS_ROW_CLASS;
    }
  }
  // Bring the search box back into focus to allow the next key down and key up.
  //ss_sf();
  return true;
}

/**
 * Handles mouse pressing, while keeping the history in the browser in case back
 * button is used. To be attached to the row on mouse clicking.
 * @this {Element}
 */
function ss_handleMouseC() {

	var fo = document.getElementById(ss_form_element);
	var tbl = document.getElementById(ss_popup_element);
	var rows = tbl.getElementsByTagName('tr');
	for (var ri = 0; ri < rows.length - 1; ri++) {
		if (rows[ri] == this) {
			// Back up the original query if not already, and adjust the reference
			// index.
			if (!ss_qbackup) {
				ss_qbackup = fo.q.value;
			}
			ss_loc = ri;
			// Find out what type of suggestion it is.
			var suggestion = ss_locateSuggestion(ss_qbackup, ss_loc);
			// Adjust the query in the search box.
			if (suggestion.q) {
				fo.q.value = suggestion.q;
				if(validateSubmitQuery(fo)){
					fo.submit();
				}
			} else {    	  
				fo.q.value = ss_qbackup;
				if (suggestion.u) {
					/* Added for webanalytics*/
					var s_hdrContentFind = "";
					if(typeof setContentFindingForHdrSearch == 'function') { 
						s_hdrContentFind = setContentFindingForHdrSearch(fo.dnavs.value);
					}

					if(s_hdrContentFind != "") {
						s_hdrContentFind = "&"+s_hdrContentFind;
					}        	
					window.location.href = suggestion.u + s_hdrContentFind;
				}
			}
			break;
		}
	}
}

/**
 * Clears search suggestions.
 *
 * @param {boolean} nofocus The flag to indicate whether the search box must not
 *     be in focus, such as when user uses the tab key to move away to the
 *     search button(s).
 */
function ss_clear(nofocus) {
  ss_qshown = null;
  var fo = document.getElementById(ss_form_element);
  var qnow = (!ss_qbackup) ? fo.q.value : ss_qbackup;
  ss_hide(qnow);
  if (!nofocus) {
    //ss_sf();
  }
}
/**
 * Object that stores which all type of suggestions to display.
 * @type {object}
 */
var ss_use = {};
ss_use.g = ss_seq.indexOf('g') >= 0 ? true : false;

jQuery_1_9_1('#paramSearch-li').click(function(){
	jQuery_1_9_1('#paramSearch-li a').attr('href',updateQueryStringParameter(jQuery_1_9_1('#paramSearch-li a').attr('href'),"lang_cd",jQuery_1_9_1('#lang_cd').val()));
});

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
  separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

function validateSubmitQuery(aform){
    /* Added for webanalytics*/
    var s_hdrContentFind = "";
	if(typeof setContentFindingForHdrSearch == 'function') { 
		s_hdrContentFind = setContentFindingForHdrSearch(aform.dnavs.value);
	}

	if(s_hdrContentFind != "") {
		s_hdrContentFind = "&"+s_hdrContentFind;
	}
	
	var res = false;
	var try1 = true;
	try{
		res = (aform.q.value == '' || aform.q.value == aform.q.getAttribute("placeholder")) ? false : true;
	}catch(ex1){
		try1 = false;
		try{
			aform = $("#search");
			var q = $("#search #fsl-search #parts");
			res = (q.val() == '' || q.val() == q.attr("placeholder")) ? false : true;	
		}catch(ex2){	}
	}
	if("CrossReference"== aform.dnavs.value){
		window.location=aform.baseUrl.value+"/crosscheck/competitorXRef.sp?searchLabel=getCompetitorXRefResults&manufacturer=&quantity=10000&lang_cd="+aform.lang_cd.value+"&competitorPartNumber="+aform.q.value;
	}
	else if("PackageSearch"== aform.dnavs.value){
		window.location=aform.baseUrl.value+"/packages/search?q="+aform.q.value+"&type=0";
	}
	else if("ChemicalFinder"== aform.dnavs.value){
		window.location= aform.baseUrl.value +"/chemical-content/search?action=search&typenumbers="+aform.q.value;
	}
	else{
	if(!res){
		var input = document.createElement('input');
	    input.type = 'hidden';
	    input.name = 'proxycustom';
	    input.value = '<HOME/>';
		if(try1)	aform.appendChild(input);
		else		aform.append(input);
	}
	else
	{			
		var queryVal  = aform.q.value;
		aform.q.disabled = true;		
		//var q = queryVal;
		
		 if(aform.dnavs.value!="Partners"){
			 aform.sort.value="date:D:L:d1";
		 }
		
		 if(aform.client.value == supportClient){
			 var input = document.createElement('input');
			    input.type = 'hidden';
			    input.name = 'requiredfields';
			    input.value = '-Asset_Type:SoftwareTools';
			    aform.appendChild(input);
		 }
		
		 if(aform.dnavs.value!="" && (aform.dnavs.value == "Community" || aform.dnavs.value == "Support")){
			 var q = queryVal;
			 aform.dnavs.value="";
		 }
		 else if(aform.client.value == blogsClient){
			 var q = queryVal+'+inmeta:resource%2Dtype=blog';
			 aform.dnavs.value='inmeta:resource%2Dtype=blog';
		 }
		 else if(aform.dnavs.value!="" ){ 
			 var q = queryVal+'+inmeta:Asset_Type='+aform.dnavs.value;
			 aform.dnavs.value='inmeta:Asset_Type='+aform.dnavs.value;
		}
		else {
			var q = queryVal;
		}
		 
		var input = document.createElement('input');
	    input.type = 'hidden';
	    input.name = 'q';
	    input.value = q;
	    aform.appendChild(input);
		}
		var formData = $('#search').serialize();
		formData = formData.replace('%2B','+');
		//Gforge 22695 by b47215 start
		window.location="http:"+ss_gsa_host+"/search?"+formData+s_hdrContentFind;
		//Gforge 22695 by b47215 end

	}
	return false;
}

