(function($){
    $.fn.nudge = function () {
		$(this).animate({left:"20.5%"},40).animate({top:"5"},40)
		.animate({top:"-5"},40).animate({left:"19.5%"},40)
		.animate({top:"0"},40).animate({left:"20%"},40)
		.animate({left:"20.5%"},40).animate({top:"5"},40)
		.animate({top:"-5"},40).animate({left:"19.5%"},40)
		.animate({top:"0"},40).animate({left:"20%"},40);
		$(this).delay(10000).hide('slow');
	};
	
	$.fn.close = function () {$(this).hide();}
	
	$.fn.log = function (msg) {
        if(jQuery.debug == true && typeof console != 'undefined')
            console.log("%s: %o", msg, this);
        return this;
    };
})(jQuery);

var MEP = {
    locate: function(controller, action, params) {
        controller = controller || 'Index';
		action = "/" + action || '';
		params = params || '';
		data = '';
		for(x in params) {
		    data += params[x] + "/";
		}
		var url = window.location.protocol + '//' + window.location.host + 
		window.location.pathname + "/";
		url += controller;
		url += action;
		url += "/" + data;
		console.log(url);
		document.location = url;
    },
    
	call: function(controller, action, params) {
		controller = controller || 'Index';
		action = action || 'index';
		params = params || {};
		
		var url = window.location.protocol + '//' + window.location.host + window.location.pathname;
		url += controller + "/";
		url += action;
		console.log(url);
		return $.ajax({'url': url, 'async': false, 'data': params}).responseText;
	},
	in_array: function (value, arr) {
		var key = ''; 
		for (key in arr) {
			if (arr[key] == value) {                
				return true;
			}
		}
		return false;
	},
	getJSON: function(controller, action, params) {
		var content = MEP.call(controller, action, params);
		return $.parseJSON(content);
	},
	
	nl2br: function(x, is_xhtml) {
        var t = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (x).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ t +'$2');
    },

	s: {
        'array': function (x) {
            var a = ['['], b, f, i, l = x.length, v;
            for (i = 0; i < l; i += 1) {
                v = x[i];
                f = MEP.s[typeof v];
                if (f) {
                    v = f(v);
                    if (typeof v == 'string') {
                        if (b) {
                            a[a.length] = ',';
                        }
                        a[a.length] = v;
                        b = true;
                    }
                }
            }
            a[a.length] = ']';
            return a.join('');
        },
        'boolean': function (x) {
            return String(x);
        },
        'null': function (x) {
            return "null";
        },
        'function': function (x) {
            return String(x);
        },
        'number': function (x) {
            return isFinite(x) ? String(x) : 'null';
        },
        'object': function (x) {
            if (x) {
                if (x instanceof Array) {
                    return MEP.s.array(x);
                }
                var a = ['{'], b, f, i, v;
                for (i in x) {
                    v = x[i];
                    f = MEP.s[typeof v];
                    if (f) {
                        v = f(v);
                        if (typeof v == 'string') {
                            if (b) {
                                a[a.length] = ',';
                            }
                            a.push(MEP.s.string(i), ':', v);
                            b = true;
                        }
                    }
                }
                a[a.length] = '}';
                return a.join('');
            }
            return 'null';
        },
        'string': function (x) {
            if (/["\\\x00-\x1f]/.test(x)) {
                x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                    return  b.replace(/[\x00-\x1f\\"]/g, '\\$&').replace(/\u0000/g, '\\0');
                });
            }

            return '"' + x + '"';
        }
    },

    toJson: function(v) {
        var f = isNaN(v) ? MEP.s[typeof v] : MEP.s['number'];
		if (f) return f(v);
    },
    
    htmlspecialchars: function(string, quote_style, charset, double_encode) {
        var optTemp = 0, i = 0, noquotes= false;
        if (typeof quote_style === 'undefined' || quote_style === null) {        
            quote_style = 2;
        }
        string = string.toString();
        if (double_encode !== false) { // Put this first to avoid double-encoding
            string = string.replace(/&/g, '&amp;');    }
        string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');
     
        var OPTS = {
            'ENT_NOQUOTES': 0,        
            'ENT_HTML_QUOTE_SINGLE' : 1,
            'ENT_HTML_QUOTE_DOUBLE' : 2,
            'ENT_COMPAT': 2,
            'ENT_QUOTES': 3,
            'ENT_IGNORE' : 4
        };
        if (quote_style === 0) {
            noquotes = true;
        }
        if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags        quote_style = [].concat(quote_style);
            for (i=0; i < quote_style.length; i++) {
                // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
                if (OPTS[quote_style[i]] === 0) {
                    noquotes = true;            }
                else if (OPTS[quote_style[i]]) {
                    optTemp = optTemp | OPTS[quote_style[i]];
                }
            }        quote_style = optTemp;
        }
        if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
            string = string.replace(/'/g, '&#039;');
        }
        if (!noquotes) {
            string = string.replace(/"/g, '&quot;');
        }
     
        return string;
    },
    
    date: function (e) {
        var datep = $(e).datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'dd/mm/yy',
            defaultDate: "+1w",
            maxDate:new Date(),
            onSelect: function( selectedDate ) {
				var option = this.id == "dateStart" ? "minDate" : "maxDate",
					instance = $( this ).data( "datepicker" );
					date = $.datepicker.parseDate(
						instance.settings.dateFormat ||
						$.datepicker._defaults.dateFormat,
						selectedDate, instance.settings );
				datep.not( this ).datepicker( "option", option, date );
				this.id == "dateStart" ? MEP.deb = $.datepicker.formatDate('yy-mm-dd', $(this).datepicker('getDate')) : MEP.end = $.datepicker.formatDate('yy-mm-dd', $(this).datepicker('getDate'));
			}
		});
    },
    
   periode: function (e) {
        var datep = $(e).datepicker({
            showOn: "button",
            changeMonth: true,
            changeYear: true,
            buttonImage: MEP.baseUrl+"/public/images/tools/date.png",
			buttonImageOnly: true,
			dateFormat: 'dd/mm/yy',
			beforeShow: function(){
				if ($(this).hasClass('date-filter'))
				{
					return;
				}
				if ( (this.id == "dateStart") )
				{
					if( $.datepicker.formatDate('yy-mm-dd',$(this).datepicker('getDate')) == "" ) {
						$(this).datepicker();
					}
					else if( $.datepicker.formatDate('dd/mm/yy',$(this).datepicker('getDate')) == "" ) {
						$(this).datepicker();
					}
					else
					{
						$(this).datepicker( "option", "maxDate",  datep.not( this ).datepicker('getDate') );
					}
				}
				else
				{
					if( $.datepicker.formatDate('yy-mm-dd', datep.not( this ).datepicker('getDate')) == "" ) {
						$(this).datepicker();
					}
					else if( $.datepicker.formatDate('dd/mm/yy', datep.not( this ).datepicker('getDate')) == "" ) {
						$(this).datepicker();
					}
					else {
						$(this).datepicker( "option", "minDate",  datep.not( this ).datepicker('getDate')  );
					}
				}
			}
            
		});
    },
    
    isValidUrl: function (u) {
		var v = new RegExp();
		v.compile("^[http|https]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-~_%&\?\/.=]+$");
		if (!v.test(u))
			return false;
		else 
			return true;
	},
	
	isValidMail: function (m) {
		var valid = false;
		for(var j=1;j<(m.length);j++){
			if(m.charAt(j)=='@'){
				if(j<(m.length-4)){
					for(var k=j;k<(m.length-2);k++){
						if(m.charAt(k)=='.') valid=true;
					}
				}
			}
		}
		return valid;
	},
	
	trim: function (sString) {
	    return jQuery.trim(sString);
	},
    logout: function () {
        window.location = window.location.protocol + '//' + window.location.host + MEP.baseUrl + '/logout';
    },
    reconnect: function () {
        window.location.reload();
    }
};
