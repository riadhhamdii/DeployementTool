(function($){
   $.fn.extend({ 
    //pass the options variable to the function
     multiAccordion: function(options) {
      // TODO: no defaults yet
      var defaults = {
        active: 0
      }
      var options =  $.extend(defaults, options);
        return this.each(function() {
        var $this = $(this);
        var $h3 = $this.children('h3');
        var $div = $this.children('div');
        
        $this.addClass('ui-accordion-multi-os ui-widget-multi-os ui-helper-reset-multi-os ui-accordion-icons');
        $h3.each(function(index){
          var $this = $(this);
          $this.children('a').attr('href', 'javascript:void(0)');
          $this.addClass('ui-accordion-header-multi-os ui-helper-reset-multi-os ui-corner-bottom-multi-os ui-state-default-multi-os ui-corner-all-multi-os').prepend('<a tabindex="-1" href="#"><span class="ui-icon-multi-os ui-icon-triangle-1-e-multi-os"></span></a>');
          if(isActive(index)) {
            showTab($this)
          } else {
            hideTab($this)
          }
        });
        $this.children('div').each(function(index){
          var $this = $(this);
          $this.addClass('ui-accordion-content-active-multi-os ui-helper-reset-multi-os ui-widget-content-multi-os ui-corner-bottom-multi-os');
        });
        $this.find('span.ui-icon-multi-os').each(function(){
			$(this).click(function(){
			  var $this = $(this).parent().parent(); 
			  if ($this.hasClass('ui-corner-bottom-multi-os')) {
				showTab($this);
			  } else {
				hideTab($this);
			  }
			});
		});
        
        $h3.hover(
          function() {
            $(this).addClass('ui-state-hover-multi-os');
          }, function() {
            $(this).removeClass('ui-state-hover-multi-os');
          }
        );
        });
      
      function showTab($this) {
        var $span = $this.children('span.ui-icon-multi-os');
        var $div = $this.next();
        $this.removeClass('ui-corner-bottom-multi-os ui-corner-all-multi-os').addClass('ui-state-active-multi-os ui-corner-top-multi-os');
        $span.removeClass('ui-icon-triangle-1-e-multi-os').addClass('ui-icon-triangle-1-s-multi-os');
        $div.slideDown('fast', function(){
		  $div.css('margin', '0px 2px');
		  $div.css('background','#fff');
		  $div.css('overflow','auto');		  
          $div.addClass('ui-accordion-content-active-multi-os');
        });
      }
      
      function hideTab($this) {
        var $span = $this.find('span.ui-icon-multi-os');
        var $div = $this.next();
        $this.removeClass('ui-state-active-multi-os ui-corner-top-multi-os').addClass('ui-corner-bottom-multi-os ui-corner-all-multi-os');
        $span.removeClass('ui-icon-triangle-1-s-multi-os').addClass('ui-icon-triangle-1-e-multi-os');
        $div.slideUp('fast', function(){
          $div.removeClass('ui-accordion-content-active-multi-os');
        });
      }
      
      function isActive(num) {
        // if array
        if(typeof options.active == "boolean" && !options.active) {
          return false;
        } else {
          if(options.active.length != undefined) {
            for (var i = 0; i < options.active.length ; i++) {
              if(options.active[i] == num)
                return true;
            }
          } else {
            return options.active == num;
          }
        }
        return false;
      }
      }
  });
})(jQuery);
