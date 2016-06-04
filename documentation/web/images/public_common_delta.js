"undefined"!=typeof jQuery&&$.getScript("/files/js/jquery.SL.js",function(){});
$(document).ready(function(){
		var mobile_url = $('#vmLink').attr('href'); 
        $('#navbar-mobile-link').attr('href', mobile_url);
		$(".FSLvideo").length&&$.getScript("//www.nxp.com/files/js/jquery.openvideo.min.js",function(){});
                var asset = $("#Asset_code").val();	
	if(asset == "IMXBRILLO" || asset == "IMXANDROID" || asset == "IMXLINUX" || asset == "i.MX6QP" || asset == "i.MX6Q" || asset == "i.MX6DP" || asset == "i.MX6D" || asset == "i.MX6DL" || asset == "i.MX6S" || asset == "i.MX6SX" || asset == "i.MX6SL" || asset == "i.MX6UL" || asset == "IMX6_SW" || asset == "RDIMX6SABREBRD"){
		jQuery( "#bc ul li:last-child" ).remove();
	}
	
	if(location.host != "www.freescale.com"){
		
		if(location.href.indexOf("/about/") != -1){
			if(document.getElementById("lang").value == "zh-Hans"){
				$(".leftnav").find("a[href*='media.nxp.com']").attr("href","http://media.cn.nxp.com/media-center/index.shtml");
				$(".leftnav").find("a[href*='/webapp/connect/memberDirSearch.sp']").attr("href","http://www.nxp.com/zh-Hans/webapp/connect/memberDirSearch.sp");
			}
			if(document.getElementById("lang").value == "ja"){
				$(".leftnav").find("a[href*='media.nxp.com']").attr("href","http://www.nxp.com/ja/about/:JA-MEDIA-CENTER");
				$(".leftnav").find("a[href*='/webapp/connect/memberDirSearch.sp']").attr("href","http://www.nxp.com/ja/webapp/connect/memberDirSearch.sp");
			}
			if(document.getElementById("lang").value == "ko"){
				$(".leftnav").find("a[href*='media.nxp.com']").attr("href","http://media.kr.nxp.com");
				$(".leftnav").find("a[href*='/webapp/connect/memberDirSearch.sp']").attr("href","http://www.nxp.com/ko/webapp/connect/memberDirSearch.sp");
			}
		}
		
		if(location.href.indexOf("/support/") != -1){
			if(document.getElementById("lang").value == "zh-Hans"){
				$(".leftnav").find("a[href*='http://www.nxp.com/support/communities:COMMUNITIES']").attr("href","http://www.nxp.com/zh-Hans/support/communities:COMMUNITIES");			
			}
			if(document.getElementById("lang").value == "ja"){
				$(".leftnav").find("a[href*='http://www.nxp.com/support/communities:COMMUNITIES']").attr("href","http://www.nxp.com/ja/support/communities:COMMUNITIES");			
			}
			if(document.getElementById("lang").value == "ko"){
				$(".leftnav").find("a[href*='/video/vault/?searchLabel=renderHomepage']").attr("href","http://www.nxp.com/ko/video/vault/?searchLabel=renderHomepage");
				$(".leftnav").find("a[href*='http://www.nxp.com/support/communities:COMMUNITIES']").attr("href","http://www.nxp.com/ko/support/communities:COMMUNITIES");			
			}
		}		

		if(location.host == "preview2.freescale.net"){
			$('link[rel=stylesheet]').remove();
			$('head').append('<link rel="stylesheet" type="text/css" href="http://styles.freescale.com/files/test/css_test/nxp-common.min.css">');
			$("#fsl-logo").find("img").attr("src","http://preview2.freescale.net/files/graphic/logo_external/NXP_logo.png");
		}
		
		if($("#mncst > #php-tree-des").length > 0){
			if($("#mncst > h2").length > 0)
				var h2 = $("#mncst > h2");
			else
				var h2 = $("<h2></h2>").html($("h1").text());
			if($(".lc:last p").length  > 0){
				$(".lc:last p:first").after($("#mncst > #php-tree-des"));
				$(".lc:last p:first").after(h2);
			}
			else{
				$(".lc:last").append(h2);
				$(".lc:last").append($("#mncst > #php-tree-des"));
			}
		}
		
		if($(".overview-childcat").length > 0 && $(".overview-childcat").is(":visible")){
			$(".overview-childcat").hide();
			var h2 = $("<h2></h2>").html($("h1").text());
			var ul = $("<ul></ul>").attr("id","php-tree-des");
			$(".overview-childcat").find("a").each(function(){
				var li = $("<li></li>").html($(this));
				li.appendTo(ul);
			});
			$(".lc:last > p:first").after(ul);
			$(".lc:last > p:first").after(h2);
			$("#php-tree-des").treeview({
				control: "#treecontrol",
				collapsed: true
			});
		}
	}
	
});