(function(a){a.fn.inputlimiter=function(b){var c=a.extend({},a.fn.inputlimiter.defaults,b);if(c.boxAttach&&!a("#"+c.boxId).length){a("<div/>").appendTo("body").attr({id:c.boxId,"class":c.boxClass}).css({position:"absolute"}).hide();if(a.fn.bgiframe){a("#"+c.boxId).bgiframe()}}a(this).each(function(d){a(this).keyup(function(i){if(a(this).val().length>c.limit){a(this).val(a(this).val().substring(0,c.limit))}if(c.boxAttach){a("#"+c.boxId).css({width:a(this).outerWidth()-(a("#"+c.boxId).outerWidth()-a("#"+c.boxId).width())+"px",left:a(this).offset().left+"px",top:(a(this).offset().top+a(this).outerHeight())-1+"px","z-index":2000})}var g=c.limit-a(this).val().length;var h=c.remTextFilter(c,g);var f=c.limitTextFilter(c);if(c.limitTextShow){a("#"+c.boxId).html(h+" "+f+"aloo");var j=a("<span/>").appendTo("body").attr({id:"19cc9195583bfae1fad88e19d443be7a","class":c.boxClass}).html(h+" "+f).innerWidth();a("#19cc9195583bfae1fad88e19d443be7a").remove();if(j>a("#"+c.boxId).innerWidth()){a("#"+c.boxId).html(h+"<br />"+f)}a("#"+c.boxId).show()}else{a("#"+c.boxId).html(h).show()}});a(this).keypress(function(f){if((!f.keyCode||(f.keyCode>46&&f.keyCode<90))&&a(this).val().length>=c.limit){return false}});a(this).blur(function(){if(c.boxAttach){a("#"+c.boxId).fadeOut("fast")}else{if(c.remTextHideOnBlur){var e=c.limitText;e=e.replace(/\%n/g,c.limit);e=e.replace(/\%s/g,(c.limit==1?"":"s"));a("#"+c.boxId).html(e)}}})})};a.fn.inputlimiter.remtextfilter=function(d,b){var c=d.remText;if(b==0&&d.remFullText!=null){c=d.remFullText}c=c.replace(/\%n/g,b);c=c.replace(/\%s/g,(d.zeroPlural?(b==1?"":"s"):(b<=1?"":"s")));return c};a.fn.inputlimiter.limittextfilter=function(c){var b=c.limitText;b=b.replace(/\%n/g,c.limit);b=b.replace(/\%s/g,(c.limit<=1?"":"s"));return b};a.fn.inputlimiter.defaults={limit:255,boxAttach:true,boxId:"limiterBox",boxClass:"limiterBox",remText:"%n character%s remaining.",remTextFilter:a.fn.inputlimiter.remtextfilter,remTextHideOnBlur:true,remFullText:null,limitTextShow:true,limitText:"Field limited to %n character%s.",limitTextFilter:a.fn.inputlimiter.limittextfilter,zeroPlural:true}})(jQuery);
