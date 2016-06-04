
function attachEvents(){
	if($('.facebook18x') != null){
		$('.facebook18x').add('#facebook_txt').click(function() {
			postToFacebook();			
		});
	}
	
	if($('.twitter18x') != null){
		$('.twitter18x').add('#twitter_txt').click(function() {
			postToTwitter();			
		});
	}
	
	if($('.linkedIn18x') != null){
		$('.linkedIn18x').add('#linkedIn_txt').click(function() {
			postToLinkedIn();
		});
	}

	if($('.google18x') != null){
		$('.google18x').add('#google_txt').click(function() {
			postToGoogle();			
		});
	}

	if($('.email18x') != null){
		$('.email18x').add('.email18x_grey').add('#email_txt').click(function() {
			sendMail();			
		});
	}

	if($('.print18x') != null){
		$('.print18x').add('.print18x_grey').add('#print_txt').click(function() {
			printPage();			
		});
	}

	if($('a.share-button') != null){
		$('a.share-button').click(function() {
			$('.share-popup').toggle();
			return false;
		});
	}
	
	if($('a.share18x') != null){
		$('a.share18x').click(function() {
			$('.share-popup').toggle();
			return false;
		});
	}
	
	if($('a.close18x') != null){
		$('a.close18x').click(function() {
			$('.share-popup').toggle();
			return false;
		});
	}

	if($('.share-popup li.closeImg img') != null){
		$('.share-popup li.closeImg img').click(function() {
			$('.share-popup').toggle();
			return false;
		}); 
	}
		
		if($('.kaixin18x') != null){
		$('.kaixin18x').add('#kaixin_txt').click(function() {
			postToKaixin();			
		});
	}
	if($('.weibo18x') != null){
		$('.weibo18x').add('#weibo_txt').click(function() {
			postToWeibo();			
		});
	}
	if($('.youku18x') != null){
		$('.youku18x').add('#youku_txt').click(function() {
			postToYouku();			
		});
	}
		
}

function postToFacebook() {

	window.open("http://www.facebook.com/sharer.php?u="+window.location,'gplusshare',
	'toolbar=0,status=0,height=550,width=575,scrollbars=yes,resizable=yes');
} 

function postToTwitter() {

	window.open("http://twitter.com/?status="+window.location,'gplusshare',
	'toolbar=0,status=0,height=550,width=575,scrollbars=yes,resizable=yes');
} 

function postToLinkedIn() {

	window.open('http://www.linkedin.com/shareArticle?mini=true'
	+ '&url='+window.location
	+ '&title='+document.title
    + '&summary=description'
	+ '&source=' + 'NXP Semiconductors',
	'Linkedin',
	'toolbar=0,status=0,height=550,width=575,scrollbars=yes,resizable=no'
	);
} 

function postToGoogle() {
	
	window.open("https://plus.google.com/share?url="+window.location,'gplusshare','toolbar=0,status=0,height=550,width=575,scrollbars=yes,resizable=no');
} 

function sendMail() {

	window.location="mailto:?subject="+document.title+"&body="+window.location,'gplusshare',
	'toolbar=0,status=0,height=550,width=575,scrollbars=yes,resizable=yes';
} 
function postToKaixin() {

	window.open("http://www.kaixin001.com/NXP",'gplusshare',
	'toolbar=0,status=0,height=550,width=575,scrollbars=yes,resizable=yes');
} 
function postToWeibo() {

	window.open(" http://e.weibo.com/nxpsemiconductors?ref=http%3A%2F%2Fwww.nxp.com%2Fzh-Hans%2F",'gplusshare',
	'toolbar=0,status=0,height=550,width=575,scrollbars=yes,resizable=yes');
} 
function postToYouku() {

	window.open("http://u.youku.com/user_show/id_UMjEwODc2Nzcy.html",'gplusshare',
	'toolbar=0,status=0,height=550,width=575,scrollbars=yes,resizable=yes');
}