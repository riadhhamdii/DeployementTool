

;(function($) {
$.fn.checkbox = function(filter, returnChecked) {
	if (filter ==""){filter = 1}
	if(typeof(filter.add) == "undefined") {add = false;}
	else {add = filter.add}
	if(! add) {
		this.find('ul').find('li').remove();
	}
	if(filter.nb == 1) {
		if(filter.check[0] == false) {
			this.find('ul').append('<li><input type="checkbox"  class="" /><label>'+filter.value[0]+'</label></li>');
		} else {	
			this.find('ul').append('<li><input type="checkbox" class="" checked='+filter.check[0]+' /><label>'+filter.value[0]+'</label></li>');
		}
		
	} else {
		for (i=0; i<filter.nb; i++) {	
			if(filter.check[i] == false) {
				this.find('ul').append('<li><input type="checkbox"  class="" /><label>'+filter.value[i]+'</label></li>');
			} else {
				this.find('ul').append('<li><input type="checkbox" class="" checked='+filter.check[i]+' /><label>'+filter.value[i]+'</label></li>');
			}
		}
	}
	
	
}

$.fn.updatecheckbox = function(filter, returnChecked) {
	
	if (filter ==""){filter = 1}		
	this.find('ul').find('li:eq('+filter.pos+')').remove();
	
}

$.fn.validateMin = function(filter, returnChecked) {		
		$obj = this;
		this.find('input[type=checkbox]').each(function(){
			$(this).click(function(){
				$cmp = 0;
				$(this).parent().parent().find('input[type=checkbox]:checked').each(function(){
					$cmp = $cmp+1;
				});
				if($cmp < parseInt(filter.Min)) {					
					$.validationEngine.buildPrompt($(this),"le nombre minimale est "+filter.Min ,"error");
					$(this).parent().find('input[type=checkbox]').click(function(){$.validationEngine.closePrompt(".formError",true)});
				}
			})
		})
}

$.fn.validateMax = function(filter, returnChecked) {		
		$obj = this;
		this.find('input[type=checkbox]').each(function(){
			$(this).click(function(){
					$count = 0;
					$(this).parent().parent().find('input[type=checkbox]:checked').each(function(){
						$count = $count+1;
					});
					if($count > filter.Max) {
						$.validationEngine.buildPrompt($(this),"le nombre maximale est "+filter.Max ,"error");
						$(this).parent().find('input[type=checkbox]').click(function(){$.validationEngine.closePrompt(".formError",true)});
					}
			})
		})
}

$.fn.toggleCheckboxes = function(filter, returnChecked)
{
	filter = filter || "*";
	returnChecked = returnChecked || false;
	var returnWhat = $([]);
	this.each(
		function()
		{
			var checked = $("input[type=checkbox]", this).filter(filter).each(
				function()
				{
					this.checked = !this.checked;
					
				}
			).filter(":checked");
			returnWhat = checked;
		}
	);
	if(!returnChecked)
	{
		returnWhat = this;
	}
	return returnWhat;
};

$.fn.checkCheckboxes = function(filter, returnChecked)
{
	filter = filter || "*";
	returnChecked = returnChecked || false;
	var returnWhat = $([]);
	this.each(
		function()
		{
			var checked = $("input[type=checkbox]", this).filter(filter).each(
				function()
				{
					this.checked = true;
				}
			).filter(":checked");
			returnWhat = checked;
		}
	);
	if(!returnChecked)
	{
		returnWhat = this;
	}
	return returnWhat;
};


$.fn.unCheckCheckboxes = function(filter, returnUnChecked)
{
	filter = filter || "*";
	returnUnChecked = returnUnChecked || false;
	var returnWhat = $([]);
	this.each(
		function()
		{
			var unChecked = $("input[type=checkbox]", this).filter(filter).each(
				function()
				{
					this.checked = false;
				}
			).filter(":not(:checked)");
			returnWhat = unChecked;
		}
	);
	if(!returnUnChecked)
	{
		returnWhat = this;
	}
	return returnWhat;
};


$.radioCheckboxGroup = function(name, filter)
{
	filter = filter || "*";
	var expression = "input[type=checkbox]";
	if(name)
	{
		expression += "[name=" + name + "]"
	}
	var x = $(expression).filter(filter);
	x.click(
		function()
		{
			// uncheck every other box with the same name
			x.not(this).each(
				function()
				{
					this.checked = false;
				}
			).end();
		}
	);
};

})(jQuery);
