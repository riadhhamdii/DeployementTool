(function($) {
//Définition du plugin
    $.addFullName = function(t,p)
	{
		if (t.inp) return false; //return if already exist
		
		// apply default properties
		p = $.extend({
			 path : '',
			 label : '',
			 name1 : 'lastname',
			 name2 : 'firstname',
			 description : '',
             firstName : '',
             lastName : '',
             required : 0,
             nbrMin : 0,
             nbrMax : 0,
             isAutoComplete : 0,
             autoCompleteProperties : new Array(),
             selectEvent : null
		  }, p);
		
		//$(t).show() //show if hidden
		var i = {
			populate: function () { 
				// set label
				$(t).find('.form-label-up').html(p.label); 
				
				// set description
				$(t).find('.description').html(p.description);
				
				// set first name
				$(t).find('.first-name').val(p.firstName);
				
				// set last name
				$(t).find('.last-name').val(p.lastName);

				// set autComplete
				if(parseInt(p.isAutoComplete) == 1) {
					for ( $x in p.autoCompleteProperties ) {
						switch(parseInt(p.autoCompleteProperties[$x].choice)) {
						case 4 : // simple
							$.destroyAutocomplete('form-textbox');
							$(t).find('.form-textbox').attr({autocomplete:"on"});
							break;
						case 5 : // local
							$.destroyAutocomplete('form-textbox');
							$value = (p.autoCompleteProperties[$x].value).split(',');					
							$.initAutoComplete('form-textbox', p.path, $value, p.nbrMax);
							break;
						case 6 : // ajax
							$.destroyAutocomplete('form-textbox');
							$.initAutoComplete('form-textbox', p.path, p.autoCompleteProperties[$x].value, p.nbrMax);
							break;
						}
					}	
				} else {
					$.destroyAutocomplete('form-textbox');
				}
		
				// set required
				if (parseInt(p.required) == 1) { 
					if($(t).find('.form-label-up span:last').hasClass('form-required')) {
						return;
					} else {
						$rSpan = $('<span>')  //create required container
								 .addClass('form-required')
								 .html('*');
						$(t).find('.form-label-up').append($rSpan);
					}
				} else {
					if($(t).find('.form-label-up span:last').hasClass('form-required')) {
						$(t).find('.form-label-up span:last').remove();
					} else {
						return;
					}
				}
			}
		}
		
		// init blocks
		i.gDiv    = $('<div>');   			// create global container
		i.lDiv    = $('<label>');   			// create global label container
		i.lSpan   = $('<span>');  			// create label container
		i.rSpan   = $('<span>');  			// create required container
		i.iDiv    = $('<div>');   			// create global input container
		i.isDiv   = $('<div>');   			// create global input sub container
		i.fSpan   = $('<span>');  			// create global input sub label container first  input (first name)
		i.sSpan   = $('<span>');  			// create global input sub label container second input (last name)
		i.fInput  = $('<input>'); 			// create input (first name)
		i.lInput  = $('<input>'); 			// create input (last name)
		i.fLabel  = $('<label>'); 			// (first name)
		i.lLabel  = $('<label>'); 			// (last name)
		i.dLabel  = $('<label>'); 			// create description container

		//set gDiv
		i.gDiv.css({display:'inline-block'});
		
		//set lDiv
		i.lDiv.addClass('form-label-up')
			  .css({zIndex:100});
		
		$(t).before(i.gDiv);
		$(t).append(i.gDiv);
		
		
		// add label
		$(i.lDiv).html(p.label);
		//$(i.lDiv).append(i.lSpan);
		$(i.fInput).attr('name', p.name1);
		$(i.lInput).attr('name', p.name2);
		// add required
		if(parseInt(p.required) == 1) {
			$(i.rSpan).addClass('form-required');
			$(i.rSpan).html('*');
			$(i.lSpan).append(i.rSpan);
		}
		
		$(i.gDiv).append(i.lDiv);
		//$(i.gDiv).append($('</br>'));

		// set iDiv
		$(i.iDiv).addClass('form-input');
		$(i.isDiv).addClass('question-input');
		$(i.iDiv).append(i.isDiv);
		$(i.gDiv).append(i.iDiv);

		// set type attribute input (first name)
		$(i.fSpan).addClass('form-sub-label-container');
		$(i.fInput).attr({type:'text'});
		$(i.fInput).addClass("form-textbox first-name");
		$(i.fInput).attr("size",10);
		$(i.fLabel).addClass('form-sub-label');
		$(i.fLabel).html('Nom');
		$(i.fSpan).append(i.fInput);
		$(i.fSpan).append(i.fLabel);
		
		// set type attribute input (last name)
		$(i.sSpan).addClass('form-sub-label-container');
		$(i.lInput).attr({type:'text'});
		$(i.lInput).addClass("form-textbox last-name")
		$(i.lInput).attr("size",15);
		$(i.lLabel).addClass('form-sub-label');
		$(i.lLabel).html('Prénom');
		$(i.sSpan).append(i.lInput);
		$(i.sSpan).append(i.lLabel);
		
		// set iInput className and event
		$(i.fInput,i.lInput).keypress(function() { // set (max|min) (character)
			$value = $value = $(this).val();
			
			if(parseInt(p.nbrMax) > 0) { // set max character
				if($value.length >= parseInt(p.nbrMax)) {
					$(this).attr({maxlength:p.nbrMax});
					$.validationEngine.buildPrompt($(this),"Le nombre maximal de caractère(s) est "+p.nbrMax,"error");
				} else {
					$.validationEngine.closePrompt('.formError',true);
				}
			} else {
				$(this).removeAttr('maxlength');
			}
			
			if(parseInt(p.nbrMin) > 0) { // set min character
				if($value.length < parseInt(p.nbrMin)) { 
					$.validationEngine.buildPrompt($(this),"Le nombre minimal de caractère(s) est "+p.nbrMin,"error");
				} else {
					$.validationEngine.closePrompt('.formError',true);
				}
			} 
		});
		
		$(i.lInput).keypress(function() { // set (max|min) (character)
			$value = $value = $(this).val();
			
			if(parseInt(p.nbrMax) > 0) { // set max character
				if($value.length >= parseInt(p.nbrMax)) {
					$(this).attr({maxlength:p.nbrMax});
					$.validationEngine.buildPrompt($(this),"Le nombre maximal de caractère(s) est "+p.nbrMax,"error");
				} else {
					$.validationEngine.closePrompt('.formError',true);
				}
			} else {
				$(this).removeAttr('maxlength');
			}
			
			if(parseInt(p.nbrMin) > 0) { // set min character
				if($value.length < parseInt(p.nbrMin)) { 
					$.validationEngine.buildPrompt($(this),"Le nombre minimal de caractère(s) est "+p.nbrMin,"error");
				} else {
					$.validationEngine.closePrompt('.formError',true);
				}
			} 
		});
					
		$(i.isDiv).append(i.fSpan);
		$(i.isDiv).append(i.sSpan);
       
		// add defaults values
		$(i.fInput).val(p.firstName);
		$(i.lInput).val(p.lastName);
		
		// add autComplete
		if(parseInt(p.isAutoComplete) == 1) {
			
		}
				
		// set dLabel(description)
		$(i.dLabel).addClass('form-sub-label description')
			       .html(p.description);
		$(i.isDiv).append(i.dLabel);
		
		// add autComplete
		if(parseInt(p.isAutoComplete) == 1) {
			for ( $x in p.autoCompleteProperties ) {
				switch(parseInt(p.autoCompleteProperties[$x].choice)) {
				case 4 : // simple
					$.destroyAutocomplete('form-textbox');
					$(t).find('.form-textbox').attr({autocomplete:"on"});
					break;
				case 5 : // local
					$.destroyAutocomplete('form-textbox');
					$value = (p.autoCompleteProperties[$x].value).split(',');					
					$.initAutoComplete('form-textbox', p.path, $value, p.nbrMax);
					break;
				case 6 : // ajax
					$.destroyAutocomplete('form-textbox');
					$.initAutoComplete('form-textbox', p.path, p.autoCompleteProperties[$x].value, p.nbrMax);
					break;
				}
			}	
		}
		t.p = p;
		t.inp = i;

		return t;	
	}	

    var docloaded = false;

	$(document).ready(function () {docloaded = true} );

	$.fn.fullName = function(p) {
		return this.each( function() {
				$.addFullName(this,p);
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
	
	$.initAutoComplete = function(o,path,options, limit) {
		$pluguinJs  = path+"/public/js/generate/pluguins/js/jquery.autoComplete.js";	 
		$pluguinCss = path+"/public/js/generate/pluguins/css/jquery.autoComplete.css";

		$.Loader({
			url: [
                $pluguinCss,
			],
			dataType: 'css',
			success: function() {
                $.Loader({
					url: [
						$pluguinJs,
					],
					dataType: 'js',
					success: function() {
						$('.'+o).autocomplete({
							source: options,
							select: function(event, ui) { 
								if (limit>0) {
									ui.item.value = ui.item.value.substring(0, limit);
									return ui.item;
								}
						    }
						});
					}
				})
			}
		});
	}; //end autoComplete
	
	$.destroyAutocomplete = function(o) {
		$('.'+o).autocomplete("destroy");
	}; //end destroyAutocomplete
})(jQuery);
