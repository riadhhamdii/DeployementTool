
(function($){

    $.fn.searchBox = function(params){

        var box = null;
        var self = null;
        var stat = null;
        var cross = null;
        var input = null;
        var action = null;

        function _init(){

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

            stat = false;
        }

        function _create(){
            box = $('<div class="search-zone" />');
            cross = $('<div class="cross-icone" />');

            var inputDiv = $('<input type="text" name="searchword" class="search-input" />');
            inputDiv.input({
                    id :'searchword',
                    name :'searchword',
                    type :'1',
                    label :'',
                    defaultValue :'',
                    typeTag :'input',
                    cssInput :'form-textbox'
            });
            input = inputDiv.find('input');
            input.attr('name','searchword');
            input.addClass('search-input');

            box.append(input);
            if(params.cross)
                box.append(cross);
            action = $('<div class="search-icone" />');
            box.append(action);
            self.append(box);
        }

        function _build(){
            _init();
            _create();
            _bind();

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
            input.bind('focus',function(){
                $(this).css({
                    'background' : '#ddeff6',
                    'color' : '#565656',
                    'border' : '1px solid #0099d4'
                });
                if($(this).val() == params.defaultContent) $(this).val('');
            }).bind('blur',function(){
                $(this).css({
                    'background': '',
                    'color' : 'gray',
                    'border' : '1px solid #9c9c9c'
                });
                if($(this).val() == '') $(this).val(params.defaultContent);
            }).trigger('blur');

            if(params.action){
                action.bind('click',function(){
                    var word = input.val();
                    if(word != '' && word != params.defaultContent){
                        params.search(word);
                        stat = true;
                    }
                });
                if(params.key){
                    input.bind('keydown',function(event){
                        if(event.keyCode == params.key){
                            action.trigger('click');
                        }
                    });
                }
            }

            /*Set Cross function */
            if(params.cross){
                input.bind('keyup', function(){
                    if($(this).val() == '' || $(this).val() ==  params.defaultContent){
                        if(stat){
                            params.reset();
                            stat = false
                        }
                        cross.hide();
                    }else{
                        cross.show();
                    }

                });
                cross.bind('click',function(){
                    input.val('');
                    $(this).hide();
                    input.trigger('blur');
                    params.reset();
                    stat = false;
                });
            }
        }

        function _unbind(){
            /* unbind events */
            input.unbind('focus');
            input.unbind('blur')
            action.unbind('click');
            input.unbind('keydown');
            input.unbind('keyup');
            cross.unbind('click');
        }

        function _clear(){
            self.data('searchBox',null);
            self.empty();
        }

        $(this).each(function(){
            var c = $(this).data('searchBox');
            if(c)return c;
            self = $(this);
            c = new _build();
            $(this).data('searchBox',c);
            return c;
        });
    };

})(jQuery)