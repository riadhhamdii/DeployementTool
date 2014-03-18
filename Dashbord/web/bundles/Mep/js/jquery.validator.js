(function($) {
    $.fn.validator = function(settings) {
        settings = $.extend({
            type : false,
            rule :  false,
            otherRule : false,
            rules : false,
            isValid: true,
            message : false,
            successMessage: false,
            position : 'left'
        }, settings);
        $.validator.settings = settings;

        $.validator.loadValidation(this);
        $.validator.onHover(this);
        $.validator.onMouseDown(this);

        return $.validator.settings.isValid;
    };
    $.validator = {
        defaultSetting : function(caller) {
            settings = {
                type : false,
                rule : false,
                otherRule : false,
                rules : false,
                isValid: true,
                message : false,
                successMessage: false,
                position : 'left'
            }
            $.validator.settings = settings;
        },
        loadValidation : function(caller) {
            if(!$.validator.settings){
                $.validator.defaultSetting()
            }
            var rules = $.validator.settings.rules;
            var validateCalll = $.validator.validateCall(caller, rules)
            return validateCalll; /*test*/
        },
        validateCall : function(caller, rules) {
            var promptText =""
            $.validator.isError = false;
            if (rules) {
                for (var i in rules) {
                    switch (rules[i].control) {
                        case 'required':
                            _required(caller, rules[i]);
                            break;
                        case 'email':
                            _email(caller, rules[i]);
                            break;
                        case 'exist':
                            _exist(caller,rules[i]);
                            break;
                        case 'length':
                            _length(caller,rules[i]);
                            break;
                        case 'phone':
                            _phone(caller,rules[i]);
                            break;
                        case 'url':
                            _url(caller,rules[i]);
                            break;
                    }
                }
            }

            if ($.validator.settings.otherRule) {
                var type = typeof($.validator.settings.otherRule);
                switch(type) {
                    case 'object':
                        if($.validator.settings.otherRule instanceof RegExp){

                        }
                        break;
                    case 'function':
                        var result = $.validator.settings.otherRule();
                        if (typeof(result) != 'undefined') {
                            if (!result.isValid) {
                                $.validator.isError = true;
                                for (var i in result.messages) {
                                    promptText += "* "+result.messages[i]+"<br/>";
                                }
                            } else {
                                $.validator.destroyMessage(caller);
                            }
                        }
                        break;
                    default :
                        break;
                }
            }

            if ($.validator.isError) {
                $.validator.settings.isValid = false;
                $.validator.destroyMessage(caller);
                $.validator.buildMessage(caller,promptText);
            }

            /* Required */
            function _required(caller,rules) {
                var callerType = $(caller).attr("t");
                if ($.in_array(parseInt(callerType),[1,6,10,11,15,17,18,19])) {
                    if($.trim($(caller).find('input:first').val()).length == 0){
                        $.validator.isError = true;
                        promptText += "* "+rules.message+"<br/>";
                    }
                }
                if ($.in_array(parseInt(callerType),[2])) {
                    if($.trim($(caller).find('textarea:first').val()).length == 0){
                        $.validator.isError = true;
                        promptText += "* "+rules.message+"<br/>";
                    }
                }

                if ($.in_array(parseInt(callerType),[43])) {
                    if(typeof($(caller).find('select option:selected').val()) == 'undefined'
                        || $(caller).find('select option:selected').index() == 0
                        || $(caller).find('select:last option').size() == 0){
                        $.validator.isError = true;
                        promptText += "* "+rules.message+"<br/>";
                    }
                }
                if ($.in_array(parseInt(callerType),[3,4])) {
                    var allChecked = false;
                    $(caller).find('input').each(function () {
                        if($(this).is(':checked')) {
                            allChecked = true;
                        }
                    });

                    if (!allChecked) {
                        $.validator.isError = true;
                        promptText += "* "+rules.message+"<br/>";
                    }
                }
            }
            /* Email */
            function _email(caller,rules) {
                pattern = /^(([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,20}))$/;
                if(!pattern.test($(caller).find('input:first').val())) {
                    $.validator.isError = true;
                    promptText += "* "+rules.message+"<br/>";
                }
            }
            function _exist(caller,rules) {
                $.validator.isError = true;
                promptText += "* "+rules.message+"<br/>";
            }
            /* Length */
            function _length(caller,rules) {
                if ($.trim($(caller).find('input:first').val()).length>  rules.size) {
                    $.validator.isError = true;
                    promptText += "* "+(rules.message).replace('%d', rules.size)+"<br/>";
                }
            }
            /* Phone */
            function _phone(caller,rules) {
                var regex = /^[0-9\-\+\(\)\ ]+$/;

                if (!regex.test($.trim($(caller).find('input:first').val()))&&  ($.trim($(caller).find('input:first').val()) != '')) {
                    $.validator.isError = true;
                    promptText += "* "+(rules.message)+"<br/>";
                }
            }
            /* Url */
            function _url(caller,rules) {
                var regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                if (!regex.test($.trim($(caller).find('input:first').val()))&&  ($.trim($(caller).find('input:first').val()) != '')) {
                    $.validator.isError = true;
                    promptText += "* "+(rules.message)+"<br/>";
                }
            }
        },
        buildMessage : function(caller, promptText){
            var message = '';
            if (($.validator.settings.type).toLowerCase() != 'success') {
                var callerType = $(caller).attr("t");
                if ($.in_array(parseInt(callerType),[1,6,10,11,15,17,18,19])) {
                    var element = $(caller).find('.question-input').find('input:first');
                }

                if ($.in_array(parseInt(callerType),[2])) {
                    var element = $(caller).find('.question-input').find('textarea:first');
                }

                if ($.in_array(parseInt(callerType),[43])) {
                    var element = $(caller).find('.question-input').find('.list-select:first');
                }

                 /*** by rm ***/

                var errorContainer = $("<div>");
                errorContainer.addClass("error");
                errorContainer.append(element);

                var span = $("<span>").addClass('error-img');

                var messageContainer = $('<div>').addClass('input-validator input-validator-alert gradient')
                                                 .css('display', 'none');

                span.append(messageContainer);

                messageContainer.append($('<div>').addClass('validator-fleche-alert'));
                messageContainer.append($('<div>').addClass('validator')
                                                  .html(promptText));

                errorContainer.append(span);

                $(caller).find('.question-input').append(errorContainer);
            }
            //$(caller).find('.question-input').prepend(message);
    },
    onHover: function(caller){
        $(caller).find('.error-img').mouseenter(function() {
            $(caller).find('.input-validator').show();
        });
        $(caller).find('.error-img').mouseleave(function() {
            $(caller).find('.input-validator').hide();
        });
    },
    onMouseDown: function(caller){
        $(document).mousedown(function(){
             $.validator.destroyMessage(caller);
        });
    },

    destroyMessage : function(caller){
        var callerType = $(caller).attr("t");
        var error = $(caller).find('.error');

        if ($.in_array(parseInt(callerType),[1,6,10,11,15,17,18,19])) {
            var element = $(caller).find('.error input');
        }

        if ($.in_array(parseInt(callerType),[2])) {
            var element = $(caller).find('.error .testarea:first');
        }

        if ($.in_array(parseInt(callerType),[43])) {
            var element = $(caller).find('.error .list-select:first');
        }

        error.after(element);
        error.remove();
    }
    };
    $.in_array = function(needle, haystack) {
        for (var key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
        return false;
    }; //end in_array
})(jQuery); 