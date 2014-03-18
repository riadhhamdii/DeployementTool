
(function($){

    $.fn.tokenSearch = function(params){
    
        var self = null;       
        var input = null;       

        function _init(){

            params = $.extend(true,{
                defaultContent: 'searchWord',
                searchDelai:  500,
                minChars: 3,
                inputWidth: 224,
                queryParam: 'seek',             
                url: '',
                onSelect: function(){                    
                    return false;
                }
            }, params);
        
        }

        function _create(){

            input = $('<input type="text" name="searchword" class="search-input" />');
            self.append(input);

            input.tokenInput(params.url,{
                queryParam: params.queryParam,
                minChars: params.minChars,
                searchDelay: params.searchDelai,
                hintText: "Terme de recherche",
                noResultsText: "Aucun résultat",
                searchingText: "Recherche en cours...",
                emptyText: 'Entrer un mot de recherche',
                width: 224,
                onAdd: function(item){
                    if((typeof(params.onSelect) == 'function'))
                        params.onSelect.call(this,item.id, item.type);
                    input.tokenInput("clear");
                    $('#token-input-').css('width','auto').trigger('blur');
                }
            });

            self.find('div.token-input-list').css('width',params.inputWidth);
            self.find('div.token-input-dropdown').css('width',params.inputWidth);

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
            $('#token-input-').bind('focus',function(){
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
        }

        function _unbind(){
        /* unbind events */
          
        }

        function _clear(){
            self.data('tokenSearch',null);
            self.empty();
        }

        $(this).each(function(){
            var c = $(this).data('tokenSearch');
            if(c)return c;
            self = $(this);
            c = new _build();
            $(this).data('tokenSearch',c);
            return c;
        });
    };

})(jQuery)