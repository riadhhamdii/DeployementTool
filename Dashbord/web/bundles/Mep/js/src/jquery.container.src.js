(function($) {
//Définition du plugin
    $.addContainer = function(t,p)
	{
		if (t.inp) return false; //return if already exist
		
		// apply default properties
		p = $.extend({
			 path : '',
			 label : '',
			 height : 200,
             width : 300,
             isDraggable : 0,
             selectEvent : null
		  }, p);
		
		var i = {
			populate: function () { 
				// set label
				$(t).find('.n:first').html(p.label); 
				// set height
				$(t).find('.no:first').height(parseInt(p.height)+51); 
				$(t).find('.mbcontainercontent:first').height(p.height); 
				// set width
				$(t).find('.no:first').width(parseInt(p.width)+60); 
				$(t).find('.mbcontainercontent:first').width(p.width); 
				if(parseInt(p.isDraggable) == 1) {
					$(t).find('.containerPlus:first').draggable();
				} else {
					$(t).find('.containerPlus:first').draggable( "destroy" );
				}
			}
		}
		
		if(parseInt(p.isDraggable) == 1) {
			$(t).find('.containerPlus:first').draggable();
		} else {
			$(t).find('.containerPlus:first').draggable( "destroy" )
		}		
      
		t.p = p;
		t.inp = i;

		return t;	
	}	

    var docloaded = false;

	$(document).ready(function () {docloaded = true} );

	$.fn.container = function(p) {
		return this.each( function() {
				$.addContainer(this,p);
			});
	}; //end input 
	
    $.fn.reload = function() { // function to reload input
		return this.each( function() {
				if (this.inp) this.inp.populate();
		});	
	}; //end inputReload 
	
	$.fn.options = function(p) { //function to update general options
			return this.each( function() {
				if (this.inp) $.extend(this.p,p);
			});
	}; //end inputOptions

})(jQuery);
