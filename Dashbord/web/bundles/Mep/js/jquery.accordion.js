(function(a){a.fn.extend({multiAccordion:function(b){var f={active:0};var b=a.extend(f,b);return this.each(function(){var i=a(this);var h=i.children("h3");var g=i.children("div");i.addClass("ui-accordion-multi-os ui-widget-multi-os ui-helper-reset-multi-os ui-accordion-icons");h.each(function(j){var k=a(this);k.children("a").attr("href","javascript:void(0)");k.addClass("ui-accordion-header-multi-os ui-helper-reset-multi-os ui-corner-bottom-multi-os ui-state-default-multi-os ui-corner-all-multi-os").prepend('<a tabindex="-1" href="#"><span class="ui-icon-multi-os ui-icon-triangle-1-e-multi-os"></span></a>');if(d(j)){c(k)}else{e(k)}});i.children("div").each(function(j){var k=a(this);k.addClass("ui-accordion-content-active-multi-os ui-helper-reset-multi-os ui-widget-content-multi-os ui-corner-bottom-multi-os")});i.find("span.ui-icon-multi-os").each(function(){a(this).click(function(){var j=a(this).parent().parent();if(j.hasClass("ui-corner-bottom-multi-os")){c(j)}else{e(j)}})});h.hover(function(){a(this).addClass("ui-state-hover-multi-os")},function(){a(this).removeClass("ui-state-hover-multi-os")})});function c(i){var h=i.children("span.ui-icon-multi-os");var g=i.next();i.removeClass("ui-corner-bottom-multi-os ui-corner-all-multi-os").addClass("ui-state-active-multi-os ui-corner-top-multi-os");h.removeClass("ui-icon-triangle-1-e-multi-os").addClass("ui-icon-triangle-1-s-multi-os");g.slideDown("fast",function(){g.css("margin","0px 2px");g.css("background","#fff");g.css("overflow","auto");g.addClass("ui-accordion-content-active-multi-os")})}function e(i){var h=i.find("span.ui-icon-multi-os");var g=i.next();i.removeClass("ui-state-active-multi-os ui-corner-top-multi-os").addClass("ui-corner-bottom-multi-os ui-corner-all-multi-os");h.removeClass("ui-icon-triangle-1-s-multi-os").addClass("ui-icon-triangle-1-e-multi-os");g.slideUp("fast",function(){g.removeClass("ui-accordion-content-active-multi-os")})}function d(g){if(typeof b.active=="boolean"&&!b.active){return false}else{if(b.active.length!=undefined){for(var h=0;h<b.active.length;h++){if(b.active[h]==g){return true}}}else{return b.active==g}}return false}}})})(jQuery);
