jQuery(function($){
	var spriteUrl = "../../../shared/images/FS_Master_SpriteSheet.png";
	var langCd = document.getElementById("language_option").value;
	if(langCd && langCd !='en' && langCd !='EN') {
		spriteUrl = "../../../../shared/images/FS_Master_SpriteSheet.png";
	} 

  $('#box_5 + .moreLessButton')
   .css({
    'color':'#017bba',
	//Changed padding by B37085 for CR40452
    'padding-right':'4.1em',
    'height':'17px',
    'display':'inline',
    'font-size':'.9em',
	'background':'url("'+spriteUrl+'") no-repeat scroll right -2694px transparent'
   })
   .hover(
    function(){
    $(this)
     .css({
      'color':'#017bba',
      'padding-right':'4.1em',
      'height':'17px',
      'display':'inline',
      'font-size':'.9em',
      'background':'url("'+spriteUrl+'") no-repeat scroll right -2694px transparent',
      'cursor':'pointer',
      'text-decoration':'none'
     });
    },
    function(){
     $(this)
      .css({
       'cursor':'auto',
       'text-decoration':'none',
       'background':'url("'+spriteUrl+'") no-repeat scroll right -2694px transparent'
      }
     );
    }
   )
  ;
  $('.moreOfThis').live('mouseover mouseout',function(event){
   if (event.type == 'mouseover'){
    $(this)
     .css({
      'color':'#017bba',
      'padding-right':'4.1em',
      'height':'17px',
      'font-size':'.9em',
      'background':'url("'+spriteUrl+'") no-repeat scroll right -2545px transparent',
      'cursor':'pointer',
      'text-decoration':'none'
     }
    );
   } 
   else {
    $(this)
     .css({
      'color':'#017bba',
      'padding-right':'4.1em',
      'height':'17px',
      'font-size':'.9em',
      'background':'url("'+spriteUrl+'") no-repeat scroll right -2545px transparent',
      'cursor':'pointer',
      'text-decoration':'none'
     }
    );
   }
  });
  $('#box_5 li:gt(2)').css({'display':'none'});
 
  $('#box_5 + .moreLessButton').text(getTranslatedText('More')).live('click',function(){
   $('#box_5 li:gt(2)').toggle();
   $(this)
    .toggleClass('moreOfThis')
    .text(($(this).text() == getTranslatedText('More')) ? getTranslatedText('Hide') : getTranslatedText('More')); return false
  });
 });
