(function($) {
//Définition du plugin
    $.addUrlIp = function(t,p)
	{
		if (t.inp) return false; //return if already exist
		
		// apply default properties
		p = $.extend({
			 path : '',
			 label : '',
			 name : 'ui',
			 description : '',
             defaultValue : '',
             required : 0,
             typeField: '',
             isControl : 0,
             isAutoComplete : 0,
             autoCompleteProperties : new Array(),
             rules : new Array(),
             selectEvent : null
		  }, p);
		
		var i = {
			populate: function () { 
				// set label
				$(t).find('.form-label-up').html(p.label); 
				
				// set default value
				$(t).find(".question-input input:eq(0)").val(p.defaultValue);
				
				// set description
				$(t).find('.description').html(p.description);
				
				//set format url or ip
				if (p.typeField == 'ip') {
					$(t).find('.form-textbox').attr({alt:'ip'});
					$(t).find('.form-textbox').setMask();
					if($(t).find('.form-sub-label').size() == 1) {
						$(t).find('.form-textbox').setMask();
						$(t).find('.form-sub-label-container').after('<label class="form-sub-label ip-field">&nbsp;255.255.255.255</label>');
					}
				} else {
					$(t).find('.ip-field').remove();
					$(t).find('.form-textbox').removeAttr('alt');
					$(t).find('.form-textbox').unsetMask().val('');
				}
		
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
							$.initAutoComplete('form-textbox', p.path, $value);
							break;
						case 6 : // ajax
							$.destroyAutocomplete('form-textbox');
							$.initAutoComplete('form-textbox', p.path, p.autoCompleteProperties[$x].value);
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
		i.pSpan   = $('<span>');  			// create global input sub label container
		i.pInput  = $('<input>'); 	        // create input 
		i.dLabel  = $('<label>'); 			// create descriptionb container

		//set gDiv
		i.gDiv.css({display:'inline-block'});
		
		//set lDiv
		i.lDiv.addClass('form-label-up')
			  .css({zIndex:100})
			  .width('150px');
		
		$(t).before(i.gDiv);
		$(t).append(i.gDiv);
		
		// add label
		$(i.lDiv).html(p.label);
		//$(i.lDiv).append(i.lSpan);
	
		// add required
		if(parseInt(p.required) == 1) {
			$(i.rSpan).addClass('form-required');
			$(i.rSpan).html('*');
			$(i.lSpan).append(i.rSpan);
		}
		
		$(i.gDiv).append(i.lDiv);
		//$(i.gDiv).append($('</br>'));
		
		$(i.pInput).attr({type:'text'});
		$(i.pInput).addClass('form-textbox');
		
		$(i.pSpan).addClass('form-sub-label-container');
		$(i.pSpan).append(i.pInput);
		// set iDiv
		$(i.iDiv).addClass('form-input');
		$(i.isDiv).addClass('question-input');
		$(i.isDiv).append(i.pSpan);
		$(i.iDiv).append(i.isDiv);
		$(i.gDiv).append(i.iDiv);

		// set iInput className and event
		$(i.pInput).blur(function() { // set (max|min) (character|number)
			if($(this).next().hasClass('controls-group')) {
				$(this).next().remove();
			} 
			
			if((parseInt(p.isControl) == 1) && (p.rules.length != 0)) {
				$value = $(this).val();

				for($j=0; $j<p.rules.length; $j++) {
					$test = false;
					$message = '';
					switch(parseInt(p.rules[$j].choice)) {
						case 1 ://Begins
							$begins = eval('/^'+p.rules[$j].value+'/gi');
							$test = $begins.test($value);
							$message += 'Chaine doit commencer par "'+p.rules[$j].value+'"';
							break;
						case 2 ://Ends
							$ends = eval('/'+p.rules[$j].value+'$/gi');
							$test = $ends.test($value);
							$message += 'Chaine doit terminer par "'+p.rules[$j].value+'"';
							break;
						case 3 ://Contains
							$contains = eval('/'+p.rules[$j].value+'/gi');
							$test = $contains.test($value);
							$message += 'Chaine doit contenir "'+p.rules[$j].value+'"';
							break;
					}
				
					if(!$test) {
						$.validationEngine.buildPrompt($(this),$message,"error");
					} else {
						$.validationEngine.closePrompt('.formError',true);
					}
				}
			}
			
			if(p.typeField == 'url') {
				var v = new RegExp();
				v.compile("^[http|https]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-~_%&\?\/.=]+$");
				$test = true;
				if (!v.test($(this).val())) {
					$test = false;
				}
				if(!$test) {
					$.validationEngine.buildPrompt($(this),"Url non valid","error");
				} else {
					$.validationEngine.closePrompt('.formError',true);
				}
			}
		});
	
		if (p.typeField == 'ip') {
			$(i.pInput).attr({alt:'ip'});
			$(i.pInput).setMask();
			$(t).find('.form-textbox').setMask();
			$(t).find('.form-sub-label-container').after('<label class="form-sub-label ip-field">&nbsp;255.255.255.255</label>');
		} else {
			$(t).find('.form-textbox').unsetMask().val('');
		}
		// add default value
		$(i.pInput).val(p.defaultValue);
		$(i.pInput).attr('name', p.name);
	
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
					$.initAutoComplete('form-textbox', p.path, $value);
					break;
				case 6 : // ajax
					$.destroyAutocomplete('form-textbox');
					$.initAutoComplete('form-textbox', p.path, p.autoCompleteProperties[$x].value);
					break;
				}
			}	
		}
				
		// set dLabel(description)
		$(i.dLabel).addClass('form-sub-label description')
			       .html(p.description);
		$(i.isDiv).append(i.dLabel);

		t.p = p;
		t.inp = i;

		return t;	
	}	

    var docloaded = false;

	$(document).ready(function () {docloaded = true} );

	$.fn.urlIp = function(p) {
		return this.each( function() {
				$.addUrlIp(this,p);
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
	
	$.initAutoComplete = function(o,path,options) {
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
							source: options
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
