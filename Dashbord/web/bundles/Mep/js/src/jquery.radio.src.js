

;(function($) {
$.fn.radio = function(filter, returnChecked) {
	if (filter ==""){filter = 1}
	if(typeof(filter.add) == "undefined") {add = false;}
	else {add = filter.add}
	if(! add) {
		this.find('ul').find('li').remove();
	}
	if(filter.name == "undefined") {
		filter.name = this.find('ul').find('option:first').attr('name');
	}
	if(filter.nb == 1) {
		if(filter.check[0] == false) {
			this.find('ul').append('<li><input type="radio"  class="" name ="'+filter.name+'" /><label>'+filter.value[0]+'</label></li>');
		} else {	
			this.find('ul').append('<li><input type="radio" class="" checked='+filter.check[0]+' name ="'+filter.name+'" /><label>'+filter.value[0]+'</label></li>');
		}
		
	} else {
		for (i=0; i<filter.nb; i++) {	
			if(filter.check[i] == false) {
				this.find('ul').append('<li><input type="radio" " class="" name ="'+filter.name+'"  /><label>'+filter.value[i]+'</label></li>');
			} else {
				this.find('ul').append('<li><input type="radio" class="" checked='+filter.check[i]+' name ="'+filter.name+'" /><label>'+filter.value[i]+'</label></li>');
			}
		}
	}
}

$.fn.updateradio = function(filter, returnChecked) {
	
	if (filter ==""){filter = 1}		
	this.find('ul').find('li:eq('+filter.pos+')').remove();
	
}


})(jQuery);
