
(function ($, undefined) {

    $.extend($.ui, { timepickr: { version: "0.1.3"} });

    var PROP_NAME = 'timepickr';
    var tpuuid = new Date().getTime();

    /* Time picker manager.
    Use the singleton instance of this class, $.timepickr, to interact with the time picker.
    Settings for (groups of) time pickers are maintained in an instance object,
    allowing multiple different settings on the same page. */

    function timepickr() {
        this.debug = true; // Change this to true to start debugging
        this._curInst = null; // The current instance in use
        this._isInline = false; // true if the instance is displayed inline
        this._disabledInputs = []; // List of time picker inputs that have been disabled
        this._timepickrShowing = false; // True if the popup picker is showing , false if not
        this._inDialog = false; // True if showing within a "dialog", false if not
        this._dialogClass = 'ui-timepickr-dialog'; // The name of the dialog marker class
        this._mainDivId = 'ui-timepickr-div'; // The ID of the main timepickr division
        this._inlineClass = 'ui-timepickr-inline'; // The name of the inline marker class
        this._currentClass = 'ui-timepickr-current'; // The name of the current hour / minutes marker class
        this._dayOverClass = 'ui-timepickr-days-cell-over'; // The name of the day hover marker class

        this.regional = []; // Available regional settings, indexed by language code
        this.regional[''] = { // Default regional settings
            hourText: 'Hour', // Display text for hours section
            minuteText: 'Minute', // Display text for minutes link
            amPmText: ['AM', 'PM'] // Display text for AM PM
        };
        this._defaults = { // Global defaults for all the time picker instances
            showOn: 'focus',    // 'focus' for popup on focus,
                                // 'button' for trigger button, or 'both' for either (not yet implemented)
            button: null,                   // 'button' element that will trigger the timepickr
            showAnim: 'fadeIn',             // Name of jQuery animation for popup
            showOptions: {},                // Options for enhanced animations
            appendText: '',                 // Display text following the input box, e.g. showing the format
            onSelect: null,                 // Define a callback function when a hour / minutes is selected
            onClose: null,                  // Define a callback function when the timepickr is closed
            timeSeparator: ':',             // The caracter to use to separate hours and minutes.
            showPeriod: false,              // Define whether or not to show AM/PM with selected time
            showPeriodLabels: true,         // Show the AM/PM labels on the left of the time picker
            showLeadingZero: true,          // Define whether or not to show a leading zero for hours < 10. [true/false]
            showMinutesLeadingZero: true,   // Define whether or not to show a leading zero for minutes < 10.
            altField: '',                   // Selector for an alternate field to store selected time into
            defaultTime: '',                // Used as default time when input field is empty or for inline timepickr
			minTime: '',
			maxTime: '',
			state : 'generate',
            //NEW: 2011-02-03
            onHourShow: null,			    // callback for enabling / disabling on selectable hours  ex : function(hour) { return true; }
            hLimitMin: '',			    // callback for enabling / disabling on selectable hours  ex : function(hour) { return true; }
            mLimitMin: '',			    // callback for enabling / disabling on selectable hours  ex : function(hour) { return true; }
            hLimitMax: '',			    // callback for enabling / disabling on selectable hours  ex : function(hour) { return true; }
            mLimitMax: '',			    // callback for enabling / disabling on selectable hours  ex : function(hour) { return true; }
            onMinuteShow: null,             // callback for enabling / disabling on time selection  ex : function(hour,minute) { return true; }
            // 2011-03-22 - v 0.0.9
            zIndex: null                    // specify zIndex
        };
        $.extend(this._defaults, this.regional['']);

        this.tpDiv = $('<div id="' + this._mainDivId + '" class="ui-timepickr ui-widget-ui ui-helper-clearfix-ui ui-helper-clearfix-ui " style="display: none"></div>');
    }

    $.extend(timepickr.prototype, {
        /* Class name added to elements to indicate already configured with a time picker. */
        markerClassName: 'hastimepickr',

        /* Debug logging (if enabled). */
        log: function () {
            if (this.debug)
                console.log.apply('', arguments);
        },

        // TODO rename to "widget" when switching to widget factory
        _widgettimepickr: function () {
            return this.tpDiv;
        },

        /* Override the default settings for all instances of the time picker.
        @param  settings  object - the new settings to use as defaults (anonymous object)
        @return the manager object */
        setDefaults: function (settings) {
            extendRemove(this._defaults, settings || {});
            return this;
        },

        /* Attach the time picker to a jQuery selection.
        @param  target    element - the target input field or division or span
        @param  settings  object - the new settings to use for this time picker instance (anonymous) */
        _attachtimepickr: function (target, settings) {
            // check for settings on the control itself - in namespace 'time:'
            
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute('time:' + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue);
                    } catch (err) {
                        inlineSettings[attrName] = attrValue;
                    }
                }
            }
            if(settings.state =='build') {
				this.minTime = settings.minTime.split(':');
				this.t1 = this.minTime[0].replace(/^0/,'');
				this.m1 = this.minTime[1].replace(/^0/,'');
				this.maxTime = settings.maxTime.split(':');
				this.t2 = this.maxTime[0].replace(/^0/,'');
				this.m2 = this.maxTime[1].replace(/^0/,'');
				var obj = this;
				this._defaults.onHourShow = function(hour) {if ((hour > obj.t2) || (hour < obj.t1)) {return false;} return true;};
				this._defaults.onMinuteShow = function(hour,minute) { 
					if (((hour == obj.t1) && (minute < obj.m1)) || ((hour == obj.t2) && (minute > obj.m2)))
						{return false;}
					return true;
				}
			}
            var nodeName = target.nodeName.toLowerCase();
            var inline = (nodeName == 'div' || nodeName == 'span');

            if (!target.id) {
                this.uuid += 1;
                target.id = 'tp' + this.uuid + 'tp';
            }
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {});
            if (nodeName == 'input') {
                this._connecttimepickr(target, inst);
            } else if (inline) {
                this._inlinetimepickr(target, inst);
            }
        },

        /* Create a new instance object. */
        _newInst: function (target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1'); // escape jQuery meta chars
            return { id: id, input: target, // associated target
                selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
                drawMonth: 0, drawYear: 0, // month being drawn
                inline: inline, // is timepickr inline or not :
                tpDiv: (!inline ? this.tpDiv : // presentation div
                    $('<div class="' + this._inlineClass + ' ui-timepickr ui-widget-ui  ui-helper-clearfix-ui"></div>'))
            };
        },

        /* Attach the time picker to an input field. */
        _connecttimepickr: function (target, inst) {
            var input = $(target);
            inst.append = $([]);
            inst.trigger = $([]);
            if (input.hasClass(this.markerClassName)) { return; }
            this._attachments(input, inst);
            //~ alert(inst.settings.minTime);
            input.addClass(this.markerClassName).
                keydown(this._doKeyDown).
                keyup(this._doKeyUp).
                bind("setData.timepickr", function (event, key, value) {
                    inst.settings[key] = value;
                }).
                bind("getData.timepickr", function (event, key) {
                    return this._get(inst, key);
                });
            //this._autoSize(inst);
            $.data(target, PROP_NAME, inst);
        },

        /* Handle keystrokes. */
        _doKeyDown: function (event) {
            var inst = $.timepickr._getInst(event.target);
            var handled = true;
            inst._keyEvent = true;
            if ($.timepickr._timepickrShowing) {
                switch (event.keyCode) {
                    case 9: $.timepickr._hidetimepickr();
                        handled = false;
                        break; // hide on tab out
                    case 27: $.timepickr._hidetimepickr();
                        break; // hide on escape
                    default: handled = false;
                }
            }
            else if (event.keyCode == 36 && event.ctrlKey) { // display the time picker on ctrl+home
                $.timepickr._showtimepickr(this);
            }
            else {
                handled = false;
            }
            if (handled) {
                event.preventDefault();
                event.stopPropagation();
            }
        },

        /* Update selected time on keyUp */
        /* Added verion 0.0.5 */
        _doKeyUp: function (event) {
            var inst = $.timepickr._getInst(event.target);
            $.timepickr._setTimeFromField(inst);
            $.timepickr._updatetimepickr(inst);
        },

        /* Make attachments based on settings. */
        _attachments: function (input, inst) {
            var appendText = this._get(inst, 'appendText');
            var isRTL = this._get(inst, 'isRTL');
            if (inst.append) { inst.append.remove(); }
            if (appendText) {
                inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
                input[isRTL ? 'before' : 'after'](inst.append);
            }
            input.unbind('focus', this._showtimepickr);
            if (inst.trigger) { inst.trigger.remove(); }
            var showOn = this._get(inst, 'showOn');
            if (showOn == 'focus' || showOn == 'both') { // pop-up time picker when in the marked field
                input.focus(this._showtimepickr);
            }
            if (showOn == 'button' || showOn == 'both') { // pop-up time picker when 'button' element is clicked
                var button = this._get(inst, 'button');
                $(button).click(function () {
                    if ($.timepickr._timepickrShowing && $.timepickr._lastInput == input[0]) { $.timepickr._hidetimepickr(); }
                    else { $.timepickr._showtimepickr(input[0]); }
                    return false;
                });minT

            }
        },


        /* Attach an inline time picker to a div. */
        _inlinetimepickr: function(target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName))
                return;
            divSpan.addClass(this.markerClassName).append(inst.tpDiv).
                bind("setData.timepickr", function(event, key, value){
                    inst.settings[key] = value;
                }).bind("getData.timepickr", function(event, key){
                    return this._get(inst, key);
                });
            $.data(target, PROP_NAME, inst);

            this._setTimeFromField(inst);
            this._updatetimepickr(inst);
            inst.tpDiv.show();
        },

        /* Pop-up the time picker for a given input field.
        @param  input  element - the input field attached to the time picker or
        event - if triggered by focus */
        _showtimepickr: function (input) {


            input = input.target || input;
            if (input.nodeName.toLowerCase() != 'input') { input = $('input', input.parentNode)[0]; } // find from button/image trigger
            if ($.timepickr._isDisabledtimepickr(input) || $.timepickr._lastInput == input) { return; } // already here

            // fix v 0.0.8 - close current timepickr before showing another one
            $.timepickr._hidetimepickr();

            var inst = $.timepickr._getInst(input);
            /****************************************/
            if(typeof(inst.settings.state) =='undefined') {
				if(typeof(inst.settings.minTime) != "undefined") {
					var thisMinTime = inst.settings.minTime;
				} else {
					var thisMinTime = '00:00';
				}
				if(typeof(inst.settings.maxTime) != "undefined") {
					var thisMaxTime = inst.settings.maxTime;
				} else {
					var thisMaxTime = '24:60';
				}
				var minTime = thisMinTime.split(':');
			  
				var t1 = minTime[0].replace(/^0/,'');
				var m1 = minTime[1].replace(/^0/,'');
				var maxTime = thisMaxTime.split(':');
				var t2 = maxTime[0].replace(/^0/,'');
				var m2 = maxTime[1].replace(/^0/,'');
				inst.settings.onHourShow = function(hour) {if ((hour > t2) || (hour < t1)) {return false;} return true;};
				inst.settings.onMinuteShow = function(hour,minute) { 
					if (((hour == t1) && (minute < m1)) || ((hour == t2) && (minute > m2)))
						{return false;}
					return true;
				}
			}
            
            /******************************************/
            if ($.timepickr._curInst && $.timepickr._curInst != inst) {
                $.timepickr._curInst.tpDiv.stop(true, true);
            }
            var beforeShow = $.timepickr._get(inst, 'beforeShow');
            extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
            inst.lastVal = null;
            $.timepickr._lastInput = input;

            $.timepickr._setTimeFromField(inst);
            if ($.timepickr._inDialog) { input.value = ''; } // hide cursor
            if (!$.timepickr._pos) { // position below input
                $.timepickr._pos = $.timepickr._findPos(input);
                $.timepickr._pos[1] += input.offsetHeight; // add the height
            }
            var isFixed = false;
            $(input).parents().each(function () {
                isFixed |= $(this).css('position') == 'fixed';
                return !isFixed;
            });
            if (isFixed && $.browser.opera) { // correction for Opera when fixed and scrolled
                $.timepickr._pos[0] -= document.documentElement.scrollLeft;
                $.timepickr._pos[1] -= document.documentElement.scrollTop;
            }
            var offset = { left: $.timepickr._pos[0], top: $.timepickr._pos[1] };
            $.timepickr._pos = null;
            // determine sizing offscreen
            inst.tpDiv.css({ position: 'absolute', display: 'block', top: '-1000px' });
            $.timepickr._updatetimepickr(inst);
			
            // reset clicked state
            inst._hoursClicked = false;
            inst._minutesClicked = false;

            // fix width for dynamic number of time pickers
            // and adjust position before showing
            offset = $.timepickr._checkOffset(inst, offset, isFixed);
            inst.tpDiv.css({ position: ($.timepickr._inDialog && $.blockUI ?
			'static' : (isFixed ? 'fixed' : 'absolute')), display: 'none',
                left: offset.left + 'px', top: offset.top + 'px'
            });
            if (!inst.inline) {
                var showAnim = $.timepickr._get(inst, 'showAnim');
                var duration = $.timepickr._get(inst, 'duration');
                var zIndex = $.timepickr._get(inst, 'zIndex');
                var postProcess = function () {
                    $.timepickr._timepickrShowing = true;
                    var borders = $.timepickr._getBorders(inst.tpDiv);
                    inst.tpDiv.find('iframe.ui-timepickr-cover'). // IE6- only
					css({ left: -borders[0], top: -borders[1],
					    width: inst.tpDiv.outerWidth(), height: inst.tpDiv.outerHeight()
					});
                };

                // if not zIndex specified in options, use target zIndex + 1
                if ( ! zIndex) {
                    zIndex = $(input).zIndex() + 1;
                }
                inst.tpDiv.zIndex(zIndex);

                if ($.effects && $.effects[showAnim]) {
                    inst.tpDiv.show(showAnim, $.timepickr._get(inst, 'showOptions'), duration, postProcess);
                }
                else {
                    inst.tpDiv[showAnim || 'show']((showAnim ? duration : null), postProcess);
                }
                if (!showAnim || !duration) { postProcess(); }
                if (inst.input.is(':visible') && !inst.input.is(':disabled')) { inst.input.focus(); }
                $.timepickr._curInst = inst;
            }
        },

        /* Generate the time picker content. */
        _updatetimepickr: function (inst) {
            var self = this;
            var borders = $.timepickr._getBorders(inst.tpDiv);
 
            inst.tpDiv.empty().append(this._generateHTML(inst))
			.find('iframe.ui-timepickr-cover') // IE6- only
				.css({ left: -borders[0], top: -borders[1],
				    width: inst.tpDiv.outerWidth(), height: inst.tpDiv.outerHeight()
				})
			.end()
            // after the picker html is appended bind the click & double click events (faster in IE this way
            // then letting the browser interpret the inline events)
            // the binding for the minute cells also exists in _updateMinuteDisplay
            .find('.ui-timepickr-minute-cell')
                .bind("click", { fromDoubleClick:false }, $.proxy($.timepickr.selectMinutes, this))
                .bind("dblclick", { fromDoubleClick:true }, $.proxy($.timepickr.selectMinutes, this))
            .end()
            .find('.ui-timepickr-hour-cell')
                .bind("click", { fromDoubleClick:false }, $.proxy($.timepickr.selectHours, this))
                .bind("dblclick", { fromDoubleClick:true }, $.proxy($.timepickr.selectHours, this))
            .end()
			.find('.ui-timepickr td a')
				.bind('mouseout', function () {
				    $(this).removeClass('ui-state-hover-ui');
				    if (this.className.indexOf('ui-timepickr-prev') != -1) $(this).removeClass('ui-timepickr-prev-hover');
				    if (this.className.indexOf('ui-timepickr-next') != -1) $(this).removeClass('ui-timepickr-next-hover');
				})
				.bind('mouseover', function () {
				    if (!self._isDisabledtimepickr(inst.inline ? inst.tpDiv.parent()[0] : inst.input[0])) {
				        $(this).parents('.ui-timepickr-calendar').find('a').removeClass('ui-state-hover-ui');
				        $(this).addClass('ui-state-hover-ui');
				        if (this.className.indexOf('ui-timepickr-prev') != -1) $(this).addClass('ui-timepickr-prev-hover');
				        if (this.className.indexOf('ui-timepickr-next') != -1) $(this).addClass('ui-timepickr-next-hover');
				    }
				})
			.end()
			.find('.' + this._dayOverClass + ' a')
				.trigger('mouseover')
			.end();
        },

        /* Generate the HTML for the current state of the date picker. */
        _generateHTML: function (inst) {
            var h, m, html = '';
            var showPeriod = (this._get(inst, 'showPeriod') == true);
            var showPeriodLabels = (this._get(inst, 'showPeriodLabels') == true);
            var showLeadingZero = (this._get(inst, 'showLeadingZero') == true);
            var amPmText = this._get(inst, 'amPmText');


            html = '<table class="ui-timepickr-table ui-widget-content-ui ui-helper-clearfix-ui"><tr>' +
                   '<td class="ui-timepickr-hours">' +
                   '<div class="ui-timepickr-title ui-widget-header-ui ui-helper-clearfix-ui ui-helper-clearfix-ui">' +
                   this._get(inst, 'hourText') +
                   '</div>' +
                   '<table class="ui-timepickr">';

            // AM
            html += '<tr>'
                 + (showPeriodLabels ? '<th rowspan="2" class="periods-ui">' + amPmText[0] + '</th>' : '');

            for (h = 0; h <= 5; h++) {
                html += this._generateHTMLHourCell(inst, h, showPeriod, showLeadingZero);
            }

            html += '</tr><tr>';
            for (h = 6; h <= 11; h++) {
                html += this._generateHTMLHourCell(inst, h, showPeriod, showLeadingZero);
            }

            // PM
            html += '</tr><tr>'
                 + (showPeriodLabels ? '<th rowspan="2" class="periods-ui">' + amPmText[1] + '</th>' : '');
            for (h = 12; h <= 17; h++) {
                html += this._generateHTMLHourCell(inst, h, showPeriod, showLeadingZero);
            }

            html += '</tr><tr>';
            for (h = 18; h <= 23; h++) {
                html += this._generateHTMLHourCell(inst, h, showPeriod, showLeadingZero);
            }
            html += '</tr></table>' + // Close the hours cells table
                    '</td>' +         // Close the Hour td
                    '<td class="ui-timepickr-minutes">';

            html += this._generateHTMLMinutes(inst);

            html += '</td></tr></table>';

            return html;
        },

        /* Special function that update the minutes selection in currently visible timepickr
         * called on hour selection when onMinuteShow is defined  */
        _updateMinuteDisplay: function (inst) {
            var newHtml = this._generateHTMLMinutes(inst);
            inst.tpDiv.find('td.ui-timepickr-minutes').html(newHtml)
                // after the picker html is appended bind the click & double click events (faster in IE this way
                // then letting the browser interpret the inline events)
                // yes I know, duplicate code, sorry
                .find('.ui-timepickr-minute-cell')
                    .bind("click", { fromDoubleClick:false }, $.proxy($.timepickr.selectMinutes, this))
                    .bind("dblclick", { fromDoubleClick:true }, $.proxy($.timepickr.selectMinutes, this) );


        },

        /* Generate the minutes table */
        _generateHTMLMinutes: function (inst) {

            var m;
            var showMinutesLeadingZero = (this._get(inst, 'showMinutesLeadingZero') == true);
            var onMinuteShow = this._get(inst, 'onMinuteShow');
            // if currently selected minute is not enabled, we have a problem and need to select a new minute.
            if ( (onMinuteShow) ) {

                if (onMinuteShow.apply((inst.input ? inst.input[0] : null), [inst.hours , inst.minutes]) == false) {
                    // loop minutes and select first available
                    for (m = 0; m < 60; m += 5) {
                        if (onMinuteShow.apply((inst.input ? inst.input[0] : null), [inst.hours, m])) {
                            inst.minutes = m;
                            break;
                        }
                    }
                }
            }

            var html = '' + // open minutes td
                       /* Add the minutes */
                       '<div class="ui-timepickr-title ui-widget-header-ui ui-helper-clearfix-ui ui-helper-clearfix-ui">' +
                       this._get(inst, 'minuteText') +
                       '</div>' +
                       '<table class="ui-timepickr">' +
                       '<tr>';


            for (m = 0; m < 15; m += 5) {
                html += this._generateHTMLMinuteCell(inst, m, (m < 10) && showMinutesLeadingZero ? "0" + m.toString() : m.toString());
            }
            html += '</tr><tr>';
            for (m = 15; m < 30; m += 5) {
                html += this._generateHTMLMinuteCell(inst, m, m.toString());
            }
            html += '</tr><tr>';
            for (m = 30; m < 45; m += 5) {
                html += this._generateHTMLMinuteCell(inst, m, m.toString());
            }
            html += '</tr><tr>';
            for (m = 45; m < 60; m += 5) {
                html += this._generateHTMLMinuteCell(inst, m, m.toString());
            }

            html += '</tr></table>';

            return html;
        },

        /* Generate the content of a "Hour" cell */
        _generateHTMLHourCell: function (inst, hour, showPeriod, showLeadingZero) {

            var displayHour = hour;
            if ((hour > 12) && showPeriod) {
                displayHour = hour - 12;
            }
            if ((displayHour == 0) && showPeriod) {
                displayHour = 12;
            }
            if ((displayHour < 10) && showLeadingZero) {
                displayHour = '0' + displayHour;
            }

            var html = "";
            var enabled = true;
            var onHourShow = this._get(inst, 'onHourShow');		//custom callback
            if (onHourShow) {
            	enabled = onHourShow.apply((inst.input ? inst.input[0] : null), [hour]);
            }
            
            if (enabled) {
            	html = '<td class="ui-timepickr-hour-cell" data-timepickr-instance-id="#' + inst.id.replace("\\\\","\\") + '" data-hour="' + hour.toString() + '">' +
                   '<a href="#timepick" class="ui-state-default-ui ' +
                   (hour == inst.hours ? 'ui-state-active-ui' : '') +
                   '">' +
                   displayHour.toString() +
                   '</a></td>';
            }
            else {
            	html =
            		'<td>' +
		                '<span class="ui-state-default-ui ui-state-disabled-ui ' +
		                (hour == inst.hours ? ' ui-state-active-ui ' : ' ') +
		                '">' +
		                displayHour.toString() +
		                '</span>' +
		            '</td>';
            }
            return html;
        },

        /* Generate the content of a "Hour" cell */
        _generateHTMLMinuteCell: function (inst, minute, displayText) {
        	 var html = "";
             var enabled = true;
             var onMinuteShow = this._get(inst, 'onMinuteShow');		//custom callback
             if (onMinuteShow) {
				 
            	 //NEW: 2011-02-03  we should give the hour as a parameter as well!
             	enabled = onMinuteShow.apply((inst.input ? inst.input[0] : null), [inst.hours,minute]);		//trigger callback
             }
			 var h1 = this._get(inst, 'hLimitMin');
			 var m1 = this._get(inst, 'mLimitMin');
             if (enabled) {
	            html = '<td class="ui-timepickr-minute-cell" data-timepickr-instance-id="#' + inst.id.replace("\\\\","\\") + '" data-minute="' + minute.toString() + '" >' +
	                   '<a href="#timepick" class="ui-state-default-ui ' +
	                   (minute == inst.minutes ? 'ui-state-active-ui' : '') +
	                   '" >' +
	                   displayText +
	                   '</a></td>';
             }
             else {

            	html = '<td>' +
	                 '<span class="ui-state-default-ui ui-state-disabled-ui" >' +
	                 	displayText +
	                 '</span>' +
                 '</td>';
             }
             return html;
        },

        /* Is the first field in a jQuery collection disabled as a timepickr?
        @param  target    element - the target input field or division or span
        @return boolean - true if disabled, false if enabled */
        _isDisabledtimepickr: function (target) {
            if (!target) { return false; }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] == target) { return true; }
            }
            return false;
        },

        /* Check positioning to remain on screen. */
        _checkOffset: function (inst, offset, isFixed) {
            var tpWidth = inst.tpDiv.outerWidth();
            var tpHeight = inst.tpDiv.outerHeight();
            var inputWidth = inst.input ? inst.input.outerWidth() : 0;
            var inputHeight = inst.input ? inst.input.outerHeight() : 0;
            var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
            var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();

            offset.left -= (this._get(inst, 'isRTL') ? (tpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

            // now check if datepicker is showing outside window viewport - move to a better place if so.
            offset.left -= Math.min(offset.left, (offset.left + tpWidth > viewWidth && viewWidth > tpWidth) ?
			Math.abs(offset.left + tpWidth - viewWidth) : 0);
            offset.top -= Math.min(offset.top, (offset.top + tpHeight > viewHeight && viewHeight > tpHeight) ?
			Math.abs(tpHeight + inputHeight) : 0);

            return offset;
        },

        /* Find an object's position on the screen. */
        _findPos: function (obj) {
            var inst = this._getInst(obj);
            var isRTL = this._get(inst, 'isRTL');
            while (obj && (obj.type == 'hidden' || obj.nodeType != 1)) {
                obj = obj[isRTL ? 'previousSibling' : 'nextSibling'];
            }
            var position = $(obj).offset();
            return [position.left, position.top];
        },

        /* Retrieve the size of left and top borders for an element.
        @param  elem  (jQuery object) the element of interest
        @return  (number[2]) the left and top borders */
        _getBorders: function (elem) {
            var convert = function (value) {
                return { thin: 1, medium: 2, thick: 3}[value] || value;
            };
            return [parseFloat(convert(elem.css('border-left-width'))),
			parseFloat(convert(elem.css('border-top-width')))];
        },


        /* Close time picker if clicked elsewhere. */
        _checkExternalClick: function (event) {
            if (!$.timepickr._curInst) { return; }
            var $target = $(event.target);
            if ($target[0].id != $.timepickr._mainDivId &&
				$target.parents('#' + $.timepickr._mainDivId).length == 0 &&
				!$target.hasClass($.timepickr.markerClassName) &&
				!$target.hasClass($.timepickr._triggerClass) &&
				$.timepickr._timepickrShowing && !($.timepickr._inDialog && $.blockUI))
                $.timepickr._hidetimepickr();
        },

        /* Hide the time picker from view.
        @param  input  element - the input field attached to the time picker */
        _hidetimepickr: function (input) {
            var inst = this._curInst;
            if (!inst || (input && inst != $.data(input, PROP_NAME))) { return; }
            if (this._timepickrShowing) {
                var showAnim = this._get(inst, 'showAnim');
                var duration = this._get(inst, 'duration');
                var postProcess = function () {
                    $.timepickr._tidyDialog(inst);
                    this._curInst = null;
                };
                if ($.effects && $.effects[showAnim]) {
                    inst.tpDiv.hide(showAnim, $.timepickr._get(inst, 'showOptions'), duration, postProcess);
                }
                else {
                    inst.tpDiv[(showAnim == 'slideDown' ? 'slideUp' :
					    (showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))]((showAnim ? duration : null), postProcess);
                }
                if (!showAnim) { postProcess(); }
                var onClose = this._get(inst, 'onClose');
                if (onClose) {
                    onClose.apply(
                        (inst.input ? inst.input[0] : null),
					    [(inst.input ? inst.input.val() : ''), inst]);  // trigger custom callback
                }
                this._timepickrShowing = false;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({ position: 'absolute', left: '0', top: '-100px' });
                    if ($.blockUI) {
                        $.unblockUI();
                        $('body').append(this.tpDiv);
                    }
                }
                this._inDialog = false;
            }
        },

        /* Tidy up after a dialog display. */
        _tidyDialog: function (inst) {
            inst.tpDiv.removeClass(this._dialogClass).unbind('.ui-timepickr');
        },

        /* Retrieve the instance data for the target control.
        @param  target  element - the target input field or division or span
        @return  object - the associated instance data
        @throws  error if a jQuery problem getting data */
        _getInst: function (target) {
            try {
                return $.data(target, PROP_NAME);
            }
            catch (err) {
                throw 'Missing instance data for this timepickr';
            }
        },

        /* Get a setting value, defaulting if necessary. */
        _get: function (inst, name) {
            return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
        },

        /* Parse existing time and initialise time picker. */
        _setTimeFromField: function (inst) {
            if (inst.input.val() == inst.lastVal) { return; }
            var defaultTime = this._get(inst, 'defaultTime');


            var timeToParse = this._getCurrentTimeRounded(inst);
            if (defaultTime != '') { timeToParse = defaultTime }
            if ((inst.inline == false) && (inst.input.val() != '')) { timeToParse = inst.input.val() }

            var timeVal = inst.lastVal = timeToParse;

            var time = this.parseTime(inst, timeVal);
            inst.hours = time.hours;
            inst.minutes = time.minutes;

            $.timepickr._updatetimepickr(inst);
        },
        /* Set the dates for a jQuery selection.
	    @param  target   element - the target input field or division or span
	    @param  date     Date - the new date */
	    _setTimetimepickr: function(target, time) {
		    var inst = this._getInst(target);
		    if (inst) {
			    this._setTime(inst, time);
    			this._updatetimepickr(inst);
	    		this._updateAlternate(inst);
		    }
	    },
	    _upTimetimepickr: function(target) {
		    //~ var inst = this._getInst(target);
		    this._newInst($(target), true);
		    //~ if (inst) {
			    //~ this._generateHTML(inst);
		    //~ }
	    },
	    _upminTimetimepickr: function(target, time, m) {
			
		    var inst = this._getInst(target);
		    if (inst) {
				
				this._defaults.hLimitMin = time;
				this._defaults.mLimitMin = m;
				this._defaults.onHourShow = function(hour) { 
					if (hour < $.timepickr._defaults.hLimitMin) {return false;}
					return true;
				};
				this._defaults.onMinuteShow = function(hour,minute) { 
						if ((hour == $.timepickr._defaults.hLimitMin) && (minute < $.timepickr._defaults.mLimitMin)){return false;}
						return true;
					};
			    this._generateHTML(inst);
		    }
	    },
	    _upmaxTimetimepickr: function(target, time, m) {
			
		    var inst = this._getInst(target);
		    if (inst) {
				
				this._defaults.hLimitMax = time;
				this._defaults.mLimitMax = m;
				this._defaults.onHourShow = function(hour) { 
					if (hour > time){return false;}
					return true;
				};
				this._defaults.onMinuteShow = function(hour,minute) { 
						if ((hour == $.timepickr._defaults.hLimitMax) && (minute > $.timepickr._defaults.mLimitMax)){return false;}
						return true;
					};
			    this._generateHTML(inst);
		    }
	    },

        /* Set the tm directly. */
        _setTime: function(inst, time, noChange) {
            var clear = !time;
            var origHours = inst.hours;
            var origMinutes = inst.minutes;
            var time = this.parseTime(inst, time);
            inst.hours = time.hours;
            inst.minutes = time.minutes;

            if ((origHours != inst.hours || origMinutes != inst.minuts) && !noChange) {
                inst.input.trigger('change');
            }
            this._updatetimepickr(inst);
            this._updateSelectedValue(inst);
        },

        /* Return the current time, ready to be parsed, rounded to the closest 5 minute */
        _getCurrentTimeRounded: function (inst) {
            var currentTime = new Date();
            var timeSeparator = this._get(inst, 'timeSeparator');
            // setting selected time , least priority first
            var currentMinutes = currentTime.getMinutes()
            // round to closest 5
            currentMinutes = Math.round( currentMinutes / 5 ) * 5;

            return currentTime.getHours().toString() + timeSeparator + currentMinutes.toString();
        },

        /*
        * Pase a time string into hours and minutes
        */
        parseTime: function (inst, timeVal) {
            var retVal = new Object();
            retVal.hours = -1;
            retVal.minutes = -1;

            var timeSeparator = this._get(inst, 'timeSeparator');
            var amPmText = this._get(inst, 'amPmText');
            var p = timeVal.indexOf(timeSeparator);
            if (p == -1) { return retVal; }

            retVal.hours = parseInt(timeVal.substr(0, p), 10);
            retVal.minutes = parseInt(timeVal.substr(p + 1), 10);

            var showPeriod = (this._get(inst, 'showPeriod') == true);
            var timeValUpper = timeVal.toUpperCase();
            if ((retVal.hours < 12) && (showPeriod) && (timeValUpper.indexOf(amPmText[1].toUpperCase()) != -1)) {
                retVal.hours += 12;
            }
            // fix for 12 AM
            if ((retVal.hours == 12) && (showPeriod) && (timeValUpper.indexOf(amPmText[0].toUpperCase()) != -1)) {
                retVal.hours = 0;
            }

            return retVal;
        },



        selectHours: function (event) {
            var $td = $(event.currentTarget);
            var id = $td.attr("data-timepickr-instance-id");
            var newHours = $td.attr("data-hour");
            var fromDoubleClick = event.data.fromDoubleClick;
            var target = $(id);
            var inst = this._getInst(target[0]);
            $td.parents('.ui-timepickr-hours:first').find('a').removeClass('ui-state-active-ui');
            //inst.tpDiv.children('.ui-timepickr-hours a').removeClass('ui-state-active-ui');
            $td.children('a').addClass('ui-state-active-ui');

            inst.hours = newHours;
            this._updateSelectedValue(inst);

            inst._hoursClicked = true;
            if ((inst._minutesClicked) || (fromDoubleClick)) {
                $.timepickr._hidetimepickr();
                return false;
            }
            // added for onMinuteShow callback
            var onMinuteShow = this._get(inst, 'onMinuteShow');
            if (onMinuteShow) { this._updateMinuteDisplay(inst); }

            return false;
        },

        selectMinutes: function (event) {
            var $td = $(event.currentTarget);
            var id = $td.attr("data-timepickr-instance-id");
            var newMinutes = $td.attr("data-minute");
            var fromDoubleClick = event.data.fromDoubleClick;
            
//            console.log("selectMiutes",id, newMinutes, td, fromDoubleClick, this, id.data);
            var target = $(id);
            var inst = this._getInst(target[0]);
            $td.parents('.ui-timepickr-minutes:first').find('a').removeClass('ui-state-active-ui');
            $td.children('a').addClass('ui-state-active-ui');

            inst.minutes = newMinutes;
            this._updateSelectedValue(inst);

            inst._minutesClicked = true;
            if ((inst._hoursClicked) || (fromDoubleClick)) { $.timepickr._hidetimepickr(); }

            return false;
        },

        _updateSelectedValue: function (inst) {
            if ((inst.hours < 0) || (inst.hours > 23)) { inst.hours = 12; }
            if ((inst.minutes < 0) || (inst.minutes > 59)) { inst.minutes = 0; }

            var period = "";
            var showPeriod = (this._get(inst, 'showPeriod') == true);
            var showLeadingZero = (this._get(inst, 'showLeadingZero') == true);
            var amPmText = this._get(inst, 'amPmText');
            var selectedHours = inst.hours ? inst.hours : 0;
            var selectedMinutes = inst.minutes ? inst.minutes : 0;

            var displayHours = selectedHours;
            if ( ! displayHours) {
                displayHoyrs = 0;
            }


            if (showPeriod) {
                if (inst.hours == 0) {
                    displayHours = 12;
                }
                if (inst.hours < 12) {
                    period = amPmText[0];
                }
                else {
                    period = amPmText[1];
                    if (displayHours > 12) {
                        displayHours -= 12;
                    }
                }
            }

            var h = displayHours.toString();
            if (showLeadingZero && (displayHours < 10)) { h = '0' + h; }


            var m = selectedMinutes.toString();
            if (selectedMinutes < 10) { m = '0' + m; }

            var newTime = h + this._get(inst, 'timeSeparator') + m;
            if (period.length > 0) { newTime += " " + period; }

            if (inst.input) {
                inst.input.val(newTime);
                inst.input.trigger('change');
            }

            var onSelect = this._get(inst, 'onSelect');
            if (onSelect) { onSelect.apply((inst.input ? inst.input[0] : null), [newTime, inst]); } // trigger custom callback

            this._updateAlternate(inst, newTime);

            return newTime;
        },

        /* Update any alternate field to synchronise with the main field. */
        _updateAlternate: function(inst, newTime) {
            var altField = this._get(inst, 'altField');
            if (altField) { // update alternate field too
                $(altField).each(function() { $(this).val(newTime); });
            }
        }
    });



    /* Invoke the timepickr functionality.
    @param  options  string - a command, optionally followed by additional parameters or
    Object - settings for attaching new timepickr functionality
    @return  jQuery object */
    $.fn.timepickr = function (options) {
        /* Initialise the date picker. */
        if (!$.timepickr.initialized) {
            $(document).mousedown($.timepickr._checkExternalClick).
			find('body').append($.timepickr.tpDiv);
            $.timepickr.initialized = true;
        }

        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == 'string' && (options == 'isDisabled' || options == 'getTime' || options == 'widget'))
            return $.timepickr['_' + options + 'timepickr'].
			apply($.timepickr, [this[0]].concat(otherArgs));
        if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
            return $.timepickr['_' + options + 'timepickr'].
			apply($.timepickr, [this[0]].concat(otherArgs));
        return this.each(function () {
            typeof options == 'string' ?
			$.timepickr['_' + options + 'timepickr'].
				apply($.timepickr, [this].concat(otherArgs)) :
			$.timepickr._attachtimepickr(this, options);
						
        });
    };

    /* jQuery extend now ignores nulls! */
    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props)
            if (props[name] == null || props[name] == undefined)
                target[name] = props[name];
        return target;
    };

    $.timepickr = new timepickr(); // singleton instance
    $.timepickr.initialized = false;
    $.timepickr.uuid = new Date().getTime();
    $.timepickr.version = "0.1.3";

    // Workaround for #4055
    // Add another global to avoid noConflict issues with inline event handlers
    window['TP_jQuery_' + tpuuid] = $;

})(jQuery);
