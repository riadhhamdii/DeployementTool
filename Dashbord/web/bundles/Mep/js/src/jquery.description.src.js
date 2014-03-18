(function($) {
//Définition du plugin
    $.addDescription = function(t,p)
	{
		if (t.inp) return false; //return if already exist
		
		// apply default properties
		p = $.extend({
			 label : '',
             content : '',
             like : false,
             unlike : false,
             selectEvent : null
		  }, p);
		
		//$(t).show() //show if hidden
		var i = {
			populate: function () { 
				// set content
				$(t).find('.form-html').html(p.content);
				if(p.unlike) $('#unlike').click(function() {p.unlike()});
				if(p.like) $('#like').click(function() {p.like()});
			}
		}
		// init blocks
		i.gDiv    = $('<div>');   			// create global container
		i.iDiv    = $('<div>');   			// create global div container
		i.isDiv   = $('<div>');   			// create global div sub container
		i.iCont   = $('<div>'); 		    // create div content
		i.iArea   = $('<textarea>'); 		// create textarea content 

		//set gDiv
		i.gDiv.css({display:'inline-block'});
			 // .width('100%');
		
		$(t).before(i.gDiv);
		$(t).append(i.gDiv);
		
		// set iDiv
		$(i.iDiv).addClass('form-input');
		$(i.isDiv).addClass('question-input');
		
		$(i.iDiv).append(i.isDiv);
		$(i.gDiv).append(i.iDiv);
		

		// add content textarea
		$(i.iArea).hide();
				 // .width('625px');
		$(i.isDiv).append(i.iArea);
		
		// add content div		  
		$(i.isDiv).append(i.iCont);
		$(i.iCont).addClass('form-html')
				  .html(p.content);
		
		$(i.isDiv).append($('<div title="unlike"  class="unlike" style="margin:2px" id="unlike"></div>').click(function() {
			if($(this).attr('id') == 'unlike') {
				$(this).removeAttr('id');
				$(this).attr('id','selected-unlike');
				$('.like').attr('id','like');
				$('.like').attr('disabled',false);
			} 
		}));
		$(i.isDiv).append($('<div title="like"  class="like" style="margin:2px" id="like"></div>').click(function() {
			if ($(this).attr('id') == 'like') {
				$(this).removeAttr('id');
				$(this).attr('id','selected-like');
				$(this).attr('disabled',true);
				$('.unlike').attr('id','unlike');
				$('.unlike').attr('disabled',false);
			} 
		}));
		
		if (typeof(p.unlike) == 'function') {
			$('#unlike').click(function() {
				if(! $(this).hasClass('unlike-on')) {
					p.unlike();
					$(this).addClass('unlike-on');
					$(this).next().removeClass('like-on');
				}
			});
		}
		if (typeof(p.like) == 'function') {
			$('#like').click(function() {
					if(! $(this).hasClass('like-on')) {
						p.like();
						$(this).addClass('like-on');
						$(this).prev().removeClass('unlike-on');
					}
			});
		}
		t.p = p;
		t.inp = i;

		return t;	
	}	

    var docloaded = false;

	$(document).ready(function () {docloaded = true} );

	$.fn.description = function(p) {
		return this.each( function() {
				$.addDescription(this,p);
			});
	}; //end paragraphe 
	
    $.fn.reload = function() { // function to reload paragraphe
		return this.each( function() {
				if (this.inp) this.inp.populate();
		});	
	}; //end paragrapheReload 
	
	$.fn.options = function(p) { //function to update general options
			return this.each( function() {
				if (this.inp) $.extend(this.p,p);
			});
	}; //end paragrapheOptions
	
})(jQuery);
