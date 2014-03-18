(function($) {


		var curpage = 1;
		var id = null;
		var settings = null;
		
		jQuery.fn.transitionPage = function(from,to) {
		
			if (settings.transitionFunction) {
				settings.transitionFunction(from,to);
			} else {
				$(from).hide();
				$(to).show();
			}
			$(id + ' fieldset').removeClass('active-page');
			$(to).addClass('active-page');		
		}
		
		jQuery.fn.showState = function(page) { 
			
			if (settings.stateFunction) { 
				return settings.stateFunction(id+"_nav .multipage_state",page,settings.pages.length);
			}
			var state = '';
			for (x = 1; x <= settings.pages.length; x++) {
				if(x==page) {
					state = state + settings.activeDot;
				} else {
					state = state + settings.inactiveDot;
				}
			}
			$(id+"_nav .multipage_state").html('<textarea style="display: none; width:500px"></textarea><div class="footer" style="margin-left:10%;margin-right:10%;width:80%"></div>');	
			$(id+"_nav_header .multipage_state_header").html('<textarea style="display: none; width:500px"></textarea><div class="header" style="width:100%"></div>');	
		}

		
		jQuery.fn.gotopage = function(page) {
			$(id + '_nav .multipage_next').html('Next');				
			
			if (isNaN(page)) { 
				q = page;
				page = 1;
				$(id+' fieldset').each(function(index) {
					if ('#'+$(this).attr('id')==q) { 
						curpage = page = index+1;
					}
				});
			}

			var np = null;
			var cp = $(id+' fieldset.active-page');
			// show the appropriate page.
			$(id+' fieldset').each(function(index) {
				index++;
				if (index==page) {		
					np = this;
				}
			});
			
			$(this).transitionPage(cp,np);
			
			$(this).showState(page);

			$(id + '_nav .multipage_next').removeClass('submit');				
			
			// is there a legend tag for this fieldset?
			// if so, pull it out.
			page_title = settings.pages[page-1].title;
			
			if (settings.stayLinkable) { 
				hashtag = '#' + settings.pages[page-1].id;
				document.location.hash = hashtag;
			}
			/*********************************************/
			/*********************************************/
			
			if (settings.footer) { 
				$(id+"_nav .multipage_state").find('.footer').html(settings.footer);
			}
			if (settings.header) { 
				$(id+"_nav_header .multipage_state_header").find('.header').html(settings.header);
			}
			/*********************************************/
			/*********************************************/
			if (page==1) {
				// set up for first page
				$(id + '_nav .multipage_back').hide();
				$(id + '_nav .multipage_next').show();
				
				$(id + '_nav .multipage_next').html('Next');
				

			} else if (page==settings.pages.length) { 
				// set up for last page
				$(id + '_nav .multipage_back').show();
				$(id + '_nav .multipage_next').show();

				$(id + '_nav .multipage_back').html('Back');				
				

				/*$(id + '_nav .multipage_next').addClass('submit');				
				$(id + '_nav .multipage_next').html(settings.submitLabel);*/	
				$(id + '_nav .multipage_next').hide();			
				
			} else {				
				$(id + '_nav .multipage_back').html('Back');								
				$(id + '_nav .multipage_next').html('Next');		

				$(id + '_nav .multipage_back').show();
				$(id + '_nav .multipage_next').show();				

			}
			
			$(id + ' fieldset.active-page input:first').focus();
			
			return false;
			
		}
		
	jQuery.fn.validatePage = function(page) { 
			return true;
		}

		
	jQuery.fn.validateAll = function() { 
		for (x = 1; x <= settings.pages.length; x++) {
			if (!$(this).validatePage(x)) {
				$(this).gotopage(x);
				return false;
			}
		}
		return true;
	}	

		
	jQuery.fn.gotofirst = function() {
		curpage = 1;
		$(this).gotopage(curpage);
		return false;
	}
	jQuery.fn.gotolast = function() {
		curpage = settings.pages.length;
		$(this).gotopage(curpage);
		return false;
	}

	jQuery.fn.nextpage = function() {
			// validate the current page
			if ($(this).validatePage(curpage)) { 
				curpage++;
	
				if (curpage > settings.pages.length) {
					// submit!
					$(this).submit();
					 curpage = settings.pages;
					 return false;
				}
				$(this).gotopage(curpage);
			}
			$(this).find('input').each(function(){
					$(this).blur();
			});
			$('.ui-timepickr').each(function(){
				$(this).hide();
			});
			$('.ui-datepicker-ui').each(function(){
				$(this).hide();
			});
			return false;
		
	}
	
	jQuery.fn.getPages = function() {
		return settings.pages;
	}
		
	jQuery.fn.prevpage = function() {

		curpage--;

		if (curpage < 1) {
			 curpage = 1;
		}
		$(this).gotopage(curpage);
		$(this).find('input').each(function(){
				$(this).blur();
		});
		$('.ui-timepickr').each(function(){
			$(this).hide();
		});
		$('.ui-datepicker-ui').each(function(){
			$(this).hide();
		});
		return false;
		
	}
	
	
	jQuery.fn.multipage = function(options) { 
		settings = jQuery.extend({stayLinkable:false,submitLabel:'Submit',hideLegend:false,hideSubmit:true,generateNavigation:true,activeDot:'&nbsp;&#x25CF;',inactiveDot:'&nbsp;&middot;'},options);
		id = '#' + $(this).attr('id');
		var form = $(this);			
		
		form.addClass('multipage');
		
		form.submit(function(e) {
			if (!$(this).validateAll()) {
				e.preventDefault()
			};
		});
		
		// hide all the pages 
		$(id +' fieldset').hide();
			if (settings.hideSubmit) { 
				$(id+' input[type="submit"]').hide();
			}		
			
			if ($(id+' input[type="submit"]').val()!='') { 
				settings.submitLabel = $(id+' input[type="submit"]').val();
			}
			
			settings.pages = new Array();
			
			$(this).children('fieldset').each(function(index) { 
				label = $(this).children('legend').html();
				settings.pages[index] = {number:index+1,title:label,id:$(this).attr('id')};
			});
			
			
			if (settings.hideLegend) { 
				// hide legend tags
				$(id+' fieldset legend').hide();
			}
			
			// show the first page.
			$(id+' fieldset:first').addClass('active-page');

			$(id+' fieldset:first').show();
									
			if (settings.generateNavigation) { 
				if (settings.navigationFunction) { 
					settings.navigationFunction($(this).getPages());
				} else {
					// insert navigation
                                        var id_name = $(this).attr('id');
                                        if(! $(this).next().hasClass('multipage_nav')) {
											$('<div class="multipage_nav" id="'+id_name+'_nav"><a href="#" class="multipage_back" onclick="return  $(\''+id+'\').prevpage();">Back</a><a href="#"  class="multipage_next" onclick="return $(\''+id+'\').nextpage();">Next</a><div class="button-container-a" style="display:none"><div class="form-editclosebutton-on-a"></div></div><div class="multipage_state"></div><div class="clearer"></div></div>').insertAfter(this);
											$('<div class="multipage_nav" id="'+id_name+'_nav_header"><div class="button-container-a" style="display:none"><div class="form-editclosebutton-on-a"></div></div><div class="multipage_state_header"></div><div class="clearer_header"></div></div>').insertBefore(this);
											
											
										}
				}
			}				
			
			if (document.location.hash) { 
				$(this).gotopage('#'+document.location.hash.substring(1,document.location.hash.length));
			} else {
				$(this).gotopage(1);			
			}	
			return false;
		
		}
		

})(jQuery);
