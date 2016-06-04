var NXP = NXP || {}; // Do not redefine NXP if already defined.
jQuery(document).ready(function($) {
	NXP.returnDate = function(dateString) {
				try {
					// if (typeof dateString == 'undefined') {return null;}
					// console.log('dateString ',dateString);
	        var temp = new Date(dateString);
					// if (temp == 'Invalid Date') {return null;}
	        // console.log ('temp==> ',temp);
	        var dateStr = temp.getDate().toString() + " " + NXP.month[temp.getMonth()].toString() + " " + temp.getFullYear().toString();
	        return dateStr;
	      }
	      catch(err) {
	      	console.log (err);
	       	return "";
	       }
	    }

	    //Build news ticker 2015年11月20日
	NXP.month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	NXP.NEWS = NXP.NEWS || {};
	NXP.NEWS.load = function(newsItems) {
	    var htmlStr = "";
	    for (var i = 0; i < newsItems.length; i++) {
	        // console.log (newsItems[i])
	        var title = newsItems[i].title;
	        var link = newsItems[i].url;
	        var pubdate = NXP.returnDate(newsItems[i].newsdate);
	        htmlStr += '<div class="newsItem"><h5>NEWS&nbsp;&nbsp;<span class="newsdate">' + pubdate + '</span></h5><p>' + title + '</p><a href="' + link + '" class="readmore" target="_blank" data-content-finding="Footer" data-content-subfinding="NEWS">Read More</a></div>';
	    }
	    if (!jQuery.fn.carouFredSel) {
	        jQuery.getScript("//cache.freescale.com/files/js/jquery.carouFredSel-6.2.1-packed.js", function() {
	            jQuery('#news').html(htmlStr).carouFredSel({
	                auto: {
	                    timeoutDuration: 8000
	                },
	                prev: {
	                    button: "#newsLeft"
	                },
	                next: {
	                    button: "#newsRight"
	                },
	                scroll: {
	                    fx: "crossfade",
	                    easing: "quadratic",
	                    duration: 500
	                }
	            });
	        });
	    } else {
	        jQuery('#news').html(htmlStr).carouFredSel({
	            auto: {
	                timeoutDuration: 8000
	            },
	            prev: {
	                button: "#newsLeft"
	            },
	            next: {
	                button: "#newsRight"
	            },
	            scroll: {
	                fx: "crossfade",
	                easing: "quadratic",
	                duration: 500
	            }
	        });
	    }
	};
	if (typeof NXP.NEWS != 'undefined') {
	    NXP.NEWS.load(NXP.NEWS.items);
	}
});