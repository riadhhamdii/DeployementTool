(function($) {
//Définition du plugin
    $.addInput = function(t,p)
	{
		if (t.inp) return false; //return if already exist
		
		// apply default properties
                p = $.extend({
                            id	: '',
                            path : '',
                            name : 'name',
                            label : '',
                            description : '',
             defaultValue : '',
             required : 0,
             isControl : 0,
             isAutoComplete : 0,
             autoCompleteProperties : new Array(),
             rules : new Array(),
             type : 0,
             typeTag : '',
             cssInput : '',
             currencyFormat : '$',
             nbrMin : 0,
             nbrMax : 0,
             numberRows : '',
             numberColls : '',
             size : 0,
             selectEvent : null
		  }, p);
		var i = {
			populate: function () { 
				// set currencyFormat
				$(t).find('.symbol').html(p.currencyFormat);
				
				// set autoComplete
				if(parseInt(p.isAutoComplete)  == 1 ) {
					for ( $x in p.autoCompleteProperties ) {
						switch(parseInt(p.autoCompleteProperties[$x].choice)) {
						case 4 : // simple
							$.destroyAutocomplete(p.id + ' .' + p.cssInput);
							$(t).find(p.id + ' .' + p.cssInput).attr({autocomplete:"on"});
							break;
						case 5 : // local
							$.destroyAutocomplete(p.id + ' .' + p.cssInput);
							$value = (p.autoCompleteProperties[$x].value).split(',');
							$.initAutoComplete(p.id + ' .' + p.cssInput, p.path, $value, p.nbrMax);
							break;
						case 6 : // ajax
							$.destroyAutocomplete(p.id + ' .' + p.cssInput);
							$.initAutoComplete(p.id + ' .' + p.cssInput, p.path, p.autoCompleteProperties[$x].value, p.nbrMax);
							break;
						}
					}
				} else {
					$.destroyAutocomplete(p.cssInput);
				}
				// set label
				$(t).find('.form-label-up').html(p.label); 
				//alert(p.label);
				// set default value
				
				switch(parseInt(p.type)) {
					case 1 : case 6 : case 13 : case 15 : case 17 : case 19 : // simple text | password | hidden | number | price | email
						$(t).find(".question-input input:eq(0)").val(p.defaultValue);
						break;
					case 2 :// textarea
						$(t).find(".question-input textarea:eq(0)").html(p.defaultValue);
						break;
				}
				
				if((typeof(p.numberRows) !="undefined") && (p.numberRows !="")) {
					$(t).find('.form-textarea').attr('ROWS', parseInt(p.numberRows));
				}
				if((typeof(p.numberColls) !="undefined") && (p.numberColls != "")) {
					$(t).find('.form-textarea').attr('COLS', parseInt(p.numberColls));
					$(t).find('.form-textarea').css('width','auto');
				} else {
					$(t).find('.form-textarea').css('width','302px');
				}
				// set description
				$(t).find('.description').html(p.description);
				
				// set required
				if (parseInt(p.required) == 1) { 
					if(! $(t).find('.form-label-up').find('span:last').hasClass('form-required')) {
						$rSpan = $('<span>')  //create required container
								 .addClass('form-required')
								 .html('*');
						$(t).find('.form-label-up').append($rSpan);
					}
				} else {
					if($(t).find('.form-label-up').find('span:last').hasClass('form-required')) {
						$(t).find('.form-label-up').find('span:last').remove();
					} 
				}
				if(p.size != 0) {
					if(isNaN(p.size)) {
							$(t).find(".question-input").find('input:first').css('width', '302px');
							$(t).find(".question-input").find('input:first').attr('size','60');
					} else {
						if((typeof(p.size) !="undefined") && (p.size !="")) {					
							$(t).find(".question-input input:eq(0)").attr('size', parseInt(p.size));
							$(t).find(".question-input input:eq(0)").css('width', 'auto');
						} else {
							$(t).find(".question-input input:eq(0)").removeAttr('size');
							$(t).find(".question-input input:eq(0)").css('width', '302px');
						}
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
		i.fSpan   = $('<span>');  			// create global input sub label container first  input (field price)
		i.sSpan   = $('<span>');  			// create global input sub label container second input (field price)
		i.iInput  = $('<'+p.typeTag+'>'); 	// create input 
		i.dLabel  = $('<label>'); 			// create descriptionb container

		//set gDiv
		i.gDiv.css({display:'inline-block'});
		
		//set lDiv
		i.lDiv.addClass('form-label-up')
			  .css({zIndex:100})
			  .width('auto');
		
		$(t).before(i.gDiv);
		$(t).append(i.gDiv);
		
		
		if (parseInt(p.type) != 13) {
			// add label
			$(i.lDiv).html(p.label);
			//$(i.lDiv).append(i.lSpan);
		
			// add required
			if(parseInt(p.required) == 1) {
				$(i.rSpan).addClass('form-required');
				$(i.rSpan).html('*');
				$(i.lDiv).append(i.rSpan);
			}
			
			$(i.gDiv).append(i.lDiv);
		}
		
		//$(i.gDiv).append($('</br>'));
		
		// set iDiv
		$(i.iDiv).addClass('form-input');
		$(i.isDiv).addClass('question-input');
		$(i.iDiv).append(i.isDiv);
		$(i.gDiv).append(i.iDiv);

		// set type attribute input
		switch(parseInt(p.type)) {
			case 1 : case 13 : case 15 : case 17 : case 19 : // simple text | number | price | email
				$(i.iInput).attr({type:'text'});
				break;
			case 6 :// password
				$(i.iInput).attr({type:'password'});
				break;
		}
		
		// set css input hidden 
		if(parseInt(p.type) == 13) {
			$(i.iInput).css({border:'1px dashed #000'})
					   .hide();
		}
		
		if ((parseInt(p.type) == 17) || (parseInt(p.type) == 15)){
			$(i.iInput).bind('keypress', function(e) {
				return (e.which!=8 && e.which!=0 && e.which!=46 && e.which!=44  && (e.which<48 || (e.which>57))) ? false : true ;
			});
		}
		$(i.iInput).attr('name', p.name);
		// set iInput className and event
		$(i.iInput).addClass(p.cssInput)
				   .keyup(function() { // set (max|min) (character|number)
						$parent = $(this).parent();
						$value = $value = $(this).val();
						
						if($.in_array(parseInt(p.type),[1,2,6,19])) {
							if(parseInt(p.nbrMax) > 0) { // set max character
								$(this).attr({maxlength:p.nbrMax});
								if($value.length >= parseInt(p.nbrMax)) {
									$newText = $value.substr(0, parseInt(p.nbrMax));
									$(this).val($newText);
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
						} else if($.in_array(parseInt(p.type),[15,17])) {
							if(parseInt(p.nbrMax) > 0) { // set max number
								if(parseInt($value) > parseInt(p.nbrMax)) { 
									$.validationEngine.buildPrompt($(this),"Le nombre doit être inférieur ou égal à "+p.nbrMax,"error");
								} else {
									$.validationEngine.closePrompt('.formError',true);
								}
							}
							if(parseInt(p.nbrMin) > 0) { // set min number
								if(parseInt($value) < parseInt(p.nbrMin)) {
									$.validationEngine.buildPrompt($(this),"Le nombre doit être suprérieur ou égal à "+p.nbrMin,"error");
								} else {
									$.validationEngine.closePrompt('.formError',true);
								}
							}  
						}
				    })
				    .blur(function() { // controls (Begins|Ends|Contains)
						
						$parent = $(this).parent();
						if( parseInt(p.type) == 15) {
							$reg = eval('/((^[0-9]+(.|,)[0-9]+$)|(^[0-9]*$))/g');
							$isNumber = $reg.test($(this).val());
							if (!$isNumber) {
								$.validationEngine.buildPrompt($(this),"Nombre n\'est pas valide (exemple: 123 ou 123(.|,)123","error");
							} else {
								$.validationEngine.closePrompt('.formError',true);
							}
						}
						
						if($.in_array(parseInt(p.type),[1,2,6,19])) {
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
							if (parseInt(p.type) == 19 ) { // valid email
								reg = /^(([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4}))*$/;
								$isMail = reg.test($(this).val())
							   
								if (!$isMail) {
									if((jQuery.trim($value)).length != 0) {
										$.validationEngine.buildPrompt($(this),"Address email n\'est pas valide","error");
									}
								} else {
									$.validationEngine.closePrompt('.formError',true);
								}
							} 
						}
					});
					
		if(parseInt(p.type)==17) { // field price
			$(i.isDiv).append(i.fSpan);

			$(i.fSpan).addClass('form-sub-label-container') // add first input price
					   .append(i.iInput);

			$(i.iInput).attr({size:17});
			i.cSpan = $('<span>'); // add currencyFormat

			$(i.cSpan).addClass('symbol')
					  .html(p.currencyFormat);
			$(i.fSpan).append(i.cSpan);
							  
		} else {
			$(i.isDiv).append(i.iInput);
		}
       
		// add default value
		switch(parseInt(p.type)) {
			case 1 : case 6 : case 13 : case 15 : case 17 : case 19 : // simple text | password | hidden | number | price | email 
				$(i.iInput).val(p.defaultValue);
				break;
			case 2 :// textarea
				$(i.iInput).html(p.defaultValue);
				break;
		}
		
		//size input
		
		//rows && colls
		if((typeof(p.numberRows) !="undefined") && (p.numberRows !="")) {
			$(i.iInput).attr('ROWS', parseInt(p.numberRows));
		}
		if((typeof(p.numberColls) !="undefined") && (p.numberColls != "")) {
			$(i.iInput).attr('COLS', parseInt(p.numberColls));
			$(i.iInput).css('width','auto');
		} else {
			$(i.iInput).css('width','302px');
		}
		if((typeof(p.size) !="undefined") && (p.size !="")) {
			$(i.iInput).attr('size', parseInt(p.size));
			$(i.iInput).css('width', 'auto');
		}
		// add autComplete
		
		if(parseInt(p.isAutoComplete) == 1) {
			for ( $x in p.autoCompleteProperties ) {
				switch(parseInt(p.autoCompleteProperties[$x].choice)) {
				case 4 : // simple
					$.destroyAutocomplete(p.id + ' .' + p.cssInput);
					$(t).find(p.id + ' .' + p.cssInput).attr({autocomplete:"on"});
					break;
				case 5 : // local
					$.destroyAutocomplete(p.id + ' .' + p.cssInput);
					$value = (p.autoCompleteProperties[$x].value).split(',');					
					$.initAutoComplete(p.id + ' .' + p.cssInput,p.path,$value, p.nbrMax);
					break;
				case 6 : // ajax
					$.destroyAutocomplete(p.id + ' .' + p.cssInput);
					$.initAutoComplete(p.id + ' .' + p.cssInput,p.path,p.autoCompleteProperties[$x].value, p.nbrMax);
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

	$.fn.input = function(p) {
		return this.each( function() {
				$.addInput(this,p);
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
						$('#' + o).autocomplete({
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
		$('#' + o).autocomplete("destroy");
	};
	
	$.in_array = function(needle, haystack) {
		for ($key in haystack) {
			if (haystack[$key] == needle) {                
				return true;
			}
		}
		return false;
	}; //end in_array
	
})(jQuery);
