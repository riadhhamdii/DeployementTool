(function($) {

    $.fn.searchBox = function(params){
        params = $.extend( {
            defaultContent: 'searchWord',
            cross:  false,
            action: false,
            key: false,
            search: function(){
                return false;
            },
            reset: function(){
                return false;
            }
        }, params);

        var self;
        var stat;

        function _init(){
            /* inial stat */
            self.attr('value','');
            self.blur();
            stat = false;
        }

        function _build(){
            _bind();
            _init();

            $.extend(this,{
                get: function(){
                    return this;
                },
                set: function(a){
                    return (this===a);
                },
                destroy: function(){
                    _unbind();
                    _clear();
                }
            });
        }

        function _bind(){
            /* bind events */
            self.bind('focus',function(){
                self.css({
                    'background' : '#ddeff6',
                    'color' : '#565656',
                    'border' : '1px solid #0099d4'
                });
                if(self.attr('value') == params.defaultContent) self.attr('value', '');
            });

            self.bind('blur',function(){
                self.css({
                    'background': '',
                    'color' : 'gray',
                    'border' : '1px solid #9c9c9c'
                });
                if(self.attr('value') == '') self.attr('value', params.defaultContent);
            });

            if(params.action){
                $(params.action).bind('click',function(event){
                    var word = self.attr('value');
                    if(word != '' && word != params.defaultContent){
                        params.search(word);
                        stat = true;
                    }
                });
                if(params.key){
                    self.bind('keydown',function(event){
                        if(event.keyCode == params.key){
                            $(params.action).click();
                        }
                    });
                }
            }

            /*Set Cross function */
            if(params.cross){
                var source = self.parent().find(params.cross);
                if(source && self){
                    self.bind('keyup', function(){
                        if(self.attr('value') == '' || self.attr('value') ==  params.defaultContent){
                            if(stat){
                                params.reset();
                                stat = false
                            }
                            source.hide();
                        }else{
                            source.show();
                        }
                    });
                    source.bind('click',function(){
                        self.attr('value','');
                        source.hide();
                        self.blur();
                        params.reset();
                        stat = false;
                    });
                }
            }
        }

        function _unbind(){
            /* unbind events */
            self.unbind('focus');
            self.unbind('blur')
            $(params.action).unbind('click');
            self.unbind('keydown');
            self.unbind('keyup');
            self.parent().find(params.cross).unbind('click');
        }

        function _clear(){
            self.data('searchBox',null);
            self.empty();
        }

        $(this).each(function(){
            var c= $(this).data('searchBox');
            if(c)return c;
            self = $(this);
            c = new _build();
            $(this).data('searchBox',c);
            return c;
        });
    };

})(jQuery);