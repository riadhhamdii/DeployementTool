(function( $ ){

    $.fn.multiselectWithTree = function(params) {

        var self = null;
        var treeComponent = null;
        var treeConfig = null;
        var treeApi = null;
        var global = null;
        var originalAddClassMethod = null;
        var treeIsLoaded = null;
        var tag = null;
        
        function init(){

            global = $.extend({
                data : [],
                isCheckbox: true,
                width: 314,
                images : {
                    folder: '',
                    content: '',
                    dynamic: '',
                    brick: ''
                }
            }, params);

            treeIsLoaded = false;

            tag = Math.random();

            var plugins = [ 'themes', 'json_data', 'ui', 'types', 'checkbox' ];

            if (!global.isCheckbox) {
                plugins.pop();
            }

            treeConfig = {
                'plugins' : plugins,
                'json_data' : {
                    'data' : global.data
                },
                'types' : {
                    'max_depth' : -2,
                    'max_children' : -2,
                    'valid_children' : [ 'content' ],
                    'types' : {
                        'folder' : {
                            'valid_children' : [ 'folder', 'dynamic', 'brick' ],
                            'icon' : {
                                'image' : global.images.folder
                            }
                        },
                        'content' : {
                            'valid_children' : [ 'dynamic', 'brick' ],
                            'icon' : {
                                'image' : global.images.content
                            }
                        },
                        'dynamic' : {
                            'valid_children' : [ 'brick' ],
                            'icon' : {
                                'image' : global.images.dynamic
                            }
                        },
                        'brick' : {
                            'valid_children' : 'none',
                            'icon' : {
                                'image' : global.images.brick
                            }
                        }
                    }
                }
            };
            
        }

        function create(){
            treeComponent = $('<div id="multiselect-tree-'+tag+'" />');
            treeComponent.bind('loaded.jstree',function(){
                treeIsLoaded = true;
            });

            treeComponent.jstree(treeConfig);
            treeComponent.css({
                'background': 'initial',
                'border' : 'initial'
            });
            
            treeComponent.find('a.jstree-open').css('width', 'auto');
            treeComponent.find('a.jstree-closed').css('width', 'auto');
            
            self.find('select').multiselect({
                multiple:false,
                selectedList:1,
                minWidth: global.width
            });
            
            self.find('ul.ui-multiselect-checkboxes').css('overflow-y','initial');
            self.find('ul.ui-multiselect-checkboxes').empty();
            self.find('ul.ui-multiselect-checkboxes').append(treeComponent);
            
            treeApi = $.jstree._reference(treeComponent);
        }

        function bind(){
            (function($){
                // Your base, I'm in it!
                originalAddClassMethod = jQuery.fn.addClass;

                $.fn.addClass = function(){
                    // Execute the original method.
                    var result = originalAddClassMethod.apply( this, arguments );
                    // call your function
                    // this gets called everytime you use the addClass method
                    if(arguments[0] == 'jstree-checked' || arguments[0] == 'jstree-unchecked'){
                        $('#multiselect-tree-'+tag).trigger('change.multiselectWithTree');
                    }                    
                    // return the original result
                    return result;
                }
            })(jQuery);

            treeComponent.bind("select_node.jstree", function (event, data) {
                self.find('button').find('span:last').html(treeApi.get_text(data.rslt.obj));
            });
        }

        function build(){
            init();
            create();
            bind();

            $.extend(this, {
                getValue: function(){
                    return treeApi.get_checked(null,true);
                },
                setValue: function(value){
                // TODO
                },
                getChildren: function(node){
                    return treeApi._get_children(node);
                },
                getParent: function(node){
                    return treeApi._get_parent(node);
                },
                open : function(){
                    self.find('select').multiselect('open');
                },
                getId: function(){
                    var node = treeComponent.jstree('get_selected');
                    if(!node) return false;
                    return treeApi.get_path(node,true);
                },
                getPath: function(){
                    var selected = treeComponent.jstree('get_selected');

                    if(selected && selected.size() > 0){
                        return selected.attr('path');
                    }
                    return null;
                },
                bindChange : function(action){
                    $('#multiselect-tree-'+tag).bind('change.multiselectWithTree',function(){
                        if(treeIsLoaded) {                            
                            action();
                        }
                    });
                },
                getSelected: function(){
                    var selected = treeComponent.jstree('get_selected');
                    
                    if(selected && selected.size() > 0){
                        return selected.attr('id');
                    }
                    return null;
                },
                setSelected: function(type,id){ // folder, campaign, content, brick , list
                    setTimeout(function(){
                        if(type == 'folder'){
                            var node = treeComponent.find('li[rel$=folder][id=' + id + ']');
                            treeApi.select_node(node);
                        }
                        _openNodeParent(node);
                        $('#multiselect-tree-'+tag).trigger('change.multiselectWithTree');
                    },500);
                },
                destroy : function() {
                    unbind();
                    destroy();
                }
            });
        }

        function unbind(){
            $('#multiselect-tree-'+tag).unbind('change.multiselectWithTree');
            (function(){
                $.fn.addClass = function(){
                    return originalAddClassMethod.apply( this, arguments );
                }
            })(jQuery);
        }

        function _openNodeParent(node){
            if(!node)
                return;
            treeApi.open_node(node);
            _openNodeParent(treeApi._get_parent(node));
        }

        function destroy(){
            treeComponent.jstree('destroy');
            treeComponent.empty();
            self.find('select').multiselect('destroy');
            self.data('multiselectWithTree',null);
        }
        
        var api = $(this).data('multiselectWithTree');
        if(api) return api;
        self = $(this);
        api = new build();
        $(this).data('multiselectWithTree',api);
        return api;


    };
})( jQuery );
