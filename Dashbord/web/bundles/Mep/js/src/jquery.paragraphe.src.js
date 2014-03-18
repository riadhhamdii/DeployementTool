(function($) {
//Définition du plugin
    $.addParagraphe = function(t,p)
	{
		if (t.inp) return false; //return if already exist
		
		// apply default properties
		p = $.extend({
			 label : '',
             content : '',
             selectEvent : null
		  }, p);
		
		//$(t).show() //show if hidden
		var i = {
			populate: function () { 
				// set content
				$(t).find('.form-html').html(p.content);
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
		
		$(t).before(i.gDiv);
		$(t).append(i.gDiv);
		
		// set iDiv
		$(i.iDiv).addClass('form-input');
		$(i.isDiv).addClass('question-input');
		$(i.iDiv).append(i.isDiv);
		$(i.gDiv).append(i.iDiv);
		
		// add content textarea
		$(i.iArea).hide()
				  .width('625px');
		$(i.isDiv).append(i.iArea);
		
		// add content div		  
		$(i.isDiv).append(i.iCont);
		$(i.iCont).addClass('form-html')
				  .html(p.content);
		
		t.p = p;
		t.inp = i;

		return t;	
	}	

    var docloaded = false;

	$(document).ready(function () {docloaded = true} );

	$.fn.paragraphe = function(p) {
		return this.each( function() {
				$.addParagraphe(this,p);
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
