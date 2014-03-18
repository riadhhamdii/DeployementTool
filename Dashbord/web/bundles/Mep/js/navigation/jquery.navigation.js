
(function($){

    $.fn.navigation = function(param){

        var self = null;
        var params = null;
        var treeNode = null;
        var showHiddenInput = null;
        var searchBox = null;
        var listMode = null;
        var showHidden = null;
        var nodeType = null;
        var treeData = null;
        var actionListner = null;
        var customMenu = null;
        var treeInstance = null;        
        var events = null;
        var actionList = null;
        var targetList = null;
        var isLoaded = null;
        var afterLoadingEvents = null;
        var plugins = null;
        var pipe = null;
        var level = null;
        var groupType = null;
        var validity = null;
        var ajaxData = null;
        var searchData = null;
        var triggerSelection = null;
        
        function _init(){
            params = $.extend(true, {
                defaultShowHiddenfolder: false,
                withCRRM : true,
                withBlock: true,
                addExtratData: true,
                tooltipData: false,
                withTitle: false,
                level: false,
                types: false,
                validity: false,               
                ajaxData: false,
                localSearch: false,
                theming: [],
                afterSuccessAction:{
                    create: null,
                    remove: null,
                    rename: null,
                    move: null,
                    edit: null,
                    toggel: null,
                    duplicate: null,
                    validate: null
                },
                afterErrorAction:{
                    create: null,
                    remove: null,
                    rename: null,
                    move: null,
                    edit: null,
                    toggel: null,
                    duplicate: null,
                    validate: null
                },
                container: {
                    tree: null,
                    search : null,
                    hideShow : null,
                    switcher: {
                        byFolder: null,
                        byType: null,
                        byDate: null
                    }
                },
                icon: {
                    openedIcon : '',
                    closedIcon : '',
                    emptyIcon : '',
                    eAquiIcon : '',
                    eFidIcon : '',
                    eAutoIcon : '',
                    eTranIcon : '',
                    eRelIcon : '',
                    sAquiIcon : '',
                    sFidIcon : '',
                    sRelIcon : '',
                    contentIcon : '',
                    brickIcon : '',
                    listIcon : ''
                },
                dataSource : {
                    source: '',
                    search: '',
                    action: '',
                    ajax: '',
                    ajaxSearch: ''
                },
                texts: {
                    search : 'Rechercher rapide',
                    showHiddenFolder: 'Afficher les dossiers masqués',                   
                    create: {
                        success: 'Création avec succée.',
                        error: 'Erreur lors de la création'
                    },
                    rename :{
                        success: 'Renomage avec succée.',
                        error: 'Erreur lors du renomage'
                    },
                    move: {
                        success: 'Déplacement avec succée.',
                        error: 'Erreur lors du déplacement'
                    },
                    remove: {
                        success: 'Supression avec succée.',
                        error: 'Erreur lors du suppression'
                    },
                    validate: {
                        success: 'Validation avec succée.',
                        error: 'Erreur lors de la validation'
                    },
                    duplicate: {
                        success: 'Duplication avec succée.',
                        error: 'Erreur lors du duplication'
                    },
                    toggel: {
                        success: 'Modification avec succée.',
                        error: 'Erreur lors de la modification'
                    },
                    theme: {
                        success: 'Modification des thèmes avec succée.',
                        error: 'Erreur lors de la modification des thèmes'
                    },
                    context: {
                        edit: 'Editer',
                        create: 'Crée un classeur',
                        createInside: 'Crée un sous-classeur',
                        createContent: 'Ajouter un nouveau contenu',
                        createList: 'Ajouter une nouvelle liste',
                        rename: 'Renommer',
                        remove: 'Supprimer',
                        move: 'Déplacer',
                        duplicate: 'Dupliquer',
                        validate: 'Valider',
                        toggel: 'Afficher / Masquer',
                        theming: 'Thèmes',
                        racine: '(*) Racine'
                    },
                    fresh: {
                        folder: 'Nouveau classeur',
                        campaign: 'Nouvelle compagne',
                        list: 'Nouvelle liste',
                        content: 'Nouveau contenu',
                        brick: 'Nouvelle bricke'
                    },
                    confirmation:{
                        label: 'Confirmation',
                        folder: 'Voulez-vous supprimer ce classeur ?',
                        campaign: 'Voulez-vous supprimer cette compagne ?',
                        list: 'Voulez-vous supprimer cette liste ?',
                        content: 'Voulez-vous supprimer ce contenu ?',
                        brick: 'Voulez-vous supprimer cette bricke ?'
                    },
                    loading: 'Chargement...'
                }
            }, param);

            triggerSelection = true;
            level = (params.level !== false) ? params.level : 'none';
            validity =  (params.validity !== false) ? params.validity :'none';
            groupType =  (typeof(params.types) == 'object') ? params.types : 'none';
            listMode = 'folder';
            showHidden = false;
            isLoaded = false;
            events = new Array();
            plugins = new Array();
            afterLoadingEvents = new Array();
            actionList = ['create','delete','edit','toggel','validate','move','duplicate','rename'];
            targetList = ['folder','campaign','content','brick','list'];
        }

        function _create(){
            if(params.container.tree)
                treeNode = $(params.container.tree);
            else
                treeNode = self;
            
            // show or hide hidden folder
            if(params.container.hideShow){
                $(params.container.hideShow).append('<label><input type="checkbox" name="show" id="showNode"/>'+params.texts.showHiddenFolder+'</label>');
                showHiddenInput = $('#showNode');
                if(params.defaultShowHiddenfolder){
                    $('#showNode').attr('checked',true);
                    showHidden = true;
                }
            }
            
            // search box
            if(params.container.search){
                $(params.container.search).tokenSearch({
                    url : params.dataSource.ajaxSearch+'/'+listMode+'/'+showHidden+'/'+JSON.stringify(groupType)+'/'+validity,
                    defaultContent: params.texts.search,
                    onSelect: function(id, type){
                        var data = {rslt : {obj: $({target: id,rel: type})}};
                        treeNode.trigger("select_node.jstree",[data]);
                    }
                });
                if(params.ajaxData && !params.localSearch)
                    searchData = {
                        "case_insensitive" : true,
                        ajax: {
                            url: params.dataSource.ajaxSearch+'/'+listMode+'/'+showHidden+'/'+JSON.stringify(groupType)+'/'+validity,
                            data: function(str){
                                return{
                                    operation : 'search',
                                    seek : str
                                }
                            }
                        }
                    };
            }
            _prepareActionListener();
            _prepareTree();
            if(searchData != null){
                treeData.search = searchData;
            }
            _bindLoadingEvents();

            treeNode.css({
                'height':'99%',
                'min-height': '0',
                'background': 'initial',
                'border': 'none'
            });
            /* create instance */
            treeNode.jstree(treeData);
            treeInstance = $.jstree._reference(treeNode);
        }

        function _prepareTree(){
            nodeType = {
                'openedfolder'  :   {
                    'valid_children' : ['openedfolder','closedfolder','emptyfolder','campaign'],
                    'icon' : {
                        'image' : params.icon.openedIcon
                    }
                },
                'closedfolder'  :   {
                    'valid_children' : ['openedfolder','closedfolder','emptyfolder','campaign'],
                    'icon' : {
                        'image' : params.icon.closedIcon
                    }
                },
                'emptyfolder'   :   {
                    'valid_children' : ['openedfolder','closedfolder','emptyfolder','campaign'],
                    'icon' : {
                        'image' : params.icon.emptyIcon
                    }
                },
                'e-aqui'        :   {
                    'valid_children' : ['content','list','brick'],
                    'icon' : {
                        'image' : params.icon.eAquiIcon
                    }
                },
                'e-fid'         :   {
                    'valid_children' : ['content','list','brick'],
                    'icon' : {
                        'image' : params.icon.eFidIcon
                    }
                },
                'e-auto'        :   {
                    'valid_children' : ['content','list','brick'],
                    'icon' : {
                        'image' : params.icon.eAutoIcon
                    }
                },
                'e-tran'        :   {
                    'valid_children' : ['content','list','brick'],
                    'icon' : {
                        'image' : params.icon.eTranIcon
                    }
                },
                'e-aqui-rel'         :   {
                    'valid_children' : ['content','list','brick'],
                    'icon' : {
                        'image' : params.icon.eRelIcon
                    }
                },
                's-aqui'        :   {
                    'valid_children' : ['content','list','brick'],
                    'icon' : {
                        'image' : params.icon.sAquiIcon
                    }
                },
                's-fid'         :   {
                    'valid_children' : ['content','list','brick'],
                    'icon' : {
                        'image' : params.icon.sFidIcon
                    }
                },
                'e-fid-rel'         :   {
                    'valid_children' : ['content','list','brick'],
                    'icon' : {
                        'image' : params.icon.sRelIcon
                    }
                },
                'content'       :   {
                    'valid_children' : 'none',
                    'icon' : {
                        'image' : params.icon.contentIcon
                    }
                },
                'brick'         :   {
                    'valid_children' : 'none',
                    'icon' : {
                        'image' : params.icon.brickIcon
                    }
                },
                'list'          :   {
                    'valid_children' : ['content','brick'],
                    'icon' : {
                        'image' : params.icon.listIcon
                    }
                }
            };

            plugins = ['themes', 'json_data', 'ui', 'crrm', 'search', 'types'];
            
            if(!params.ajaxData)
                ajaxData =  {
                    ajax :{
                        url : params.dataSource.source+'/'+listMode+'/'+showHidden+'/'+level+'/'+JSON.stringify(groupType)+'/'+validity
                    }
                }
            else
                ajaxData = {
                    ajax :{
                        url : params.dataSource.ajax+'/'+listMode+'/'+showHidden+'/'+JSON.stringify(groupType)+'/'+validity,
                        data : function(node){
                            if(node == -1) return '';
                            var type = _normalizeTypeName(node.attr('rel'));
                            if(listMode == 'type' && node.attr('all-count') != undefined)
                                type = node.attr('rel');
                            if(listMode == 'date' && node.attr('all-count') != undefined)
                                type = 'interval';
                            /* for global node children loading */
                            var path = null;
                            if(node.data('globalPathRequested') !=undefined){
                                path = node.data('globalPathRequested');
                                node.removeData('globalPathRequested');
                            }
                            var obj = null;
                            if(!path)
                                obj = {
                                    target: node.attr('target'),
                                    type: type
                                } ;
                            else
                                obj = {
                                    target: node.attr('target'),
                                    type: type,
                                    path: path
                                } ;
                            return obj;
                        }
                    }
                };
            
            treeData = {
                plugins : plugins,
                json_data : ajaxData,
                types : {
                    max_depth : -2,
                    max_children : -2,
                    valid_children : ['emptyfolder','closedfolder','openedfolder'],
                    types : nodeType
                },
                core:{
                    strings: {
                        loading : params.texts.loading
                    }
                }
            }


            if(params.withCRRM){
                plugins.push('contextmenu');
                treeData.contextmenu = {
                    items: customMenu
                };
            }
        }
        
        function _moveTo(from,to){
            var t = -1, f = null;
            if(to != null)
                t = treeNode.find('li[rel='+to.type+'][target='+to.id+']');
            f = treeNode.find('li[rel='+from.type+'][target='+from.id+']');
            treeInstance.move_node(f,t,'inside',false,false,true);
        }

        function _addContextMenuTrigger(){
            treeNode.find('li').each(function(){
                _addContextMenuTriggerToNode($(this));
            });
        }

        function _addContextMenuTriggerToNode(node){
            /* clean node */
            node.find('a:first').next('span.jtree-context-trigger').remove();
            /* add to dom */
            node.find('a:first').after('<span class="jtree-context-trigger" />');
            /* bind toggel */
            node.find('a:first').bind('mouseover',function(){
                $(this).next('span.jtree-context-trigger').show();
            }).bind('mouseleave',function(){
                $(this).next('span.jtree-context-trigger').hide();
            });
            node.find('span.jtree-context-trigger').filter(':first').bind('mouseover',function(){
                $(this).show();
            }).bind('mouseleave',function(){
                $(this).hide();
            });
            /* bind click */
            node.find('a:first').next('span.jtree-context-trigger').bind('click',function(){
                treeNode.jstree('show_contextmenu',node);
            });
            /* unbind right click */
            treeNode.undelegate("a","contextmenu.jstree");
        }
        
        function _addTooltipToNode(){
            /* remove title */
            if(!params.withTitle){
                treeNode.find('li[title]').removeAttr('title');
            }
            if(params.tooltipData === false)
                return;
            
            treeNode.find('li').each(function(){
                var n = treeInstance._get_node($(this));
                _makeTooltip(n);
            });
        }

        function _makeTooltip(node){
            var nodetype = null, d = null;
            
            if(!node) return;

            /* remove title */
            if(!params.withTitle){
                node.removeAttr('title');
            }
            /* clean node */
            if($(node).find('a:first').tipsy(true)){
                $(node).find('a:first').tipsy(true).destroy();
            }
            if(node.attr('rel').search('folder') != -1 || node.hasClass('all-count')){
                nodetype = 'folder';
            }else if(node.attr('rel').search('e-') != -1 || node.attr('rel').search('s-') != -1){
                nodetype = 'campaign';
            }else{
                nodetype = node.attr('rel');
            }

            if(typeof(params.tooltipData) == 'function'){
                d = params.tooltipData(nodetype,parseInt(node.attr('target')),treeInstance.get_text(node),node.attr('complete-name'));
            }else if(typeof(params.tooltipData) == 'object'){
                for(var i in params.tooltipData){
                    if(params.tooltipData[i].id == parseInt(node.attr('target'))
                        && params.tooltipData[i].type == nodetype)
                        d = params.tooltipData[i];
                }
            }

            if(!d) return;

            $(node).find('a:first').tipsy({
                gravity: d.dir,
                html: true,
                title: function(){
                    return d.html
                }
            });
        }

        
        function _getFolderList(data, seek, parent, first, skeeped){
            var list = new Array();

            if(data == undefined) return false;

            var p = treeInstance._get_parent(seek);

            if(!parent && first && p){
                list.push({
                    extrat: {
                        to: null,
                        from: {
                            id: seek.id,
                            type: seek.type
                        }
                    },
                    label: params.texts.context.racine,
                    action: function(a, b) {
                        _moveTo(b.from,null);
                    }
                });
            }
            

            for(var idx in data){

                if(skeeped != (data[idx].attr.target) && (!parent && data[idx].attr.rel.search('folder') != -1 && data[idx].attr.target != seek.id) ||
                    (parent && data[idx].attr.rel.search('folder') != -1 && data[idx].attr.target != parent.id)){

                    var children = _getFolderList(data[idx].children,seek,parent, false,skeeped);
                                      
                    var to = {
                        id: data[idx].attr.target,
                        type: data[idx].attr.rel
                    };

                    var from = {
                        id: seek.id,
                        type: seek.type
                    };
                                        
                    list.push({
                        extrat: {
                            to: to,
                            from: from
                        },
                        label: data[idx].data,
                        action: function(a, b) {
                            _moveTo(b.from,b.to);
                        },
                        submenu: (children.length > 0) ? children : false
                    });
                                                               
                }
            }

            if(list.length == 0)
                return false;
        
            return list;
        }
        
        function _getSubMenuForMovingNode(node,parent){
            var data = treeInstance.get_json(-1,['target','rel']);
            return _getFolderList(data,node,parent,true,treeInstance._get_parent(node));
        }

        function _addExtratDataToTree(){
            var data = treeInstance.get_json(-1,['target','rel','invalid-count','all-count','isGroup']);
            for(var idx in data){
                _addExtratDataToNode(data[idx]);
            }
        }

        function _addExtratDataToNode(data){
            if(data.attr.rel.search('folder') == -1 && !data.attr['all-count'])
                return;
            var node = treeNode.find('li[rel='+data.attr.rel+'][target='+data.attr.target+']');
            /* clean node */
            node.find('span.jstree-extrat-info').remove();
            node.find('a:first').append('<span class="jstree-extrat-info jstree-all-count"><i>('+data.attr['all-count']+')</i></span>');
            if(data.attr['invalid-count']){
                node.find('a:first').append('<span class="jstree-extrat-info jstree-invalid-count"><i>- '+data.attr['invalid-count']+'</i></span>');
            }
            if(data.children){
                for(var i in data.children)
                    _addExtratDataToNode(data.children[i]);
            }
        }
        
        function _getListOfCampaignTheme(node){
            var list = new Object();

            if(params.theming.length == 0) return false;
            
            for(var idx in params.theming){
                var stat = null;
                if(params.theming[idx].checked[node.id]) stat = 'checked="checked"'; else stat = '';
                var check = '<input type="checkbox" node-id="'+node.id+'" value="'+params.theming[idx].id+'" '+stat+'>'+params.theming[idx].label+'</input>';
                list['settingTheme['+idx+']'] = {
                    id: 'settingTheme['+idx+']',
                    label: check
                };
            }
            
            return list;
        }

        function _normalizeTypeName(nodeType){
            if(nodeType.search('folder') != -1)
                return 'folder';
            if(nodeType.search('e-') != -1 || nodeType.search('s-') != -1)
                return 'campaign';
            return nodeType;
        }

        function _refreshNodeExtratData(node,action,all,invalid){
            var t = '', a = 0, i = '', newAll = 0, newInvalid = 0, typeName = '';
            if(!node)
                return;

            if($(node).attr('rel'))
                typeName = _normalizeTypeName($(node).attr('rel'));
            
            if(typeName != 'campaign' && typeName != 'folder')
                return;
            
            t = $.trim($(node).find('span.jstree-all-count:first > i:first').text());
            a = parseInt(t.substr(1,t.length-2));
            i = parseInt($(node).find('span.jstree-invalid-count:first > i:first').text().substr(2));

            if(action == 'inc'){
                newAll = a+parseInt(all);
                newInvalid = i+parseInt(invalid);
            }else{
                newAll = a-parseInt(all);
                newInvalid = i-parseInt(invalid);
            }

            $(node).find('span.jstree-all-count:first > i:first').text('('+newAll+')');
            $(node).find('span.jstree-invalid-count:first > i:first').text('- '+newInvalid);
            if(newInvalid > 0){
                $(node).addClass('jstree-have-invalid');
                $(node).attr('invalid-count',i+parseInt(invalid));
            }else{
                $(node).removeClass('jstree-have-invalid');
            }
            $(node).attr('all-count',newAll);
            if(newAll == 0 && typeName == 'folder'){
                treeNode.jstree('set_type', 'emptyfolder', node);
            }else if(newAll > 0 && typeName == 'folder'){
                treeInstance.open_node(node);
                treeNode.jstree('set_type', 'openedfolder', node);
            }
            _refreshNodeExtratData(treeInstance._get_parent(node),action,all,invalid);
        }
        
        function _prepareActionListener(){
            customMenu = function(node){
                var items = new Object();
                
                var nodeType = node.attr('rel');
                var type = _normalizeTypeName(nodeType);
                var nodeId = node.attr('target');
                // if type or date  mode and folder selected
                if((listMode == 'type' || listMode == 'date') && node.attr('all-count') != undefined)
                    return items;

                var parentNode = null;
                var parent = {
                    id: null,
                    type: null
                };
                if(treeInstance._get_parent(node)  != -1){
                    parentNode = treeInstance._get_parent(node);
                    parent.id = parentNode.attr('target');
                    parent.type = parentNode.attr('rel');
                }

                // commun actions
                items.edit = {
                    id: 'edit-'+type,
                    label: params.texts.context.edit,
                    action: function(){
                        _triggerEvent('edit',type,nodeId);
                    }
                };

                items.rename= {
                    id: 'rename-'+type,
                    label: params.texts.context.rename,
                    action: function(){
                        if(!_triggerEvent('rename',type,nodeId))
                            treeNode.jstree('rename',node);
                    }
                };
                    
                items.deleting= {
                    id: 'delete-'+type,
                    label: params.texts.context.remove,
                    action: function(){
                        if(!_triggerEvent('delete',type,nodeId)){
                            jConfirm(params.texts.confirmation[type],params.texts.confirmation.label,function(r){
                                if(r){
                                    treeNode.jstree('remove',node);                                    
                                }
                            });
                        }
                    },
                    separator_after: true
                };

                // folder actions

                if(type == 'folder'){
                    items.createInside = {
                        id: 'createFolderInside',
                        label: params.texts.context.createInside,
                        action: function(){
                            if(!_triggerEvent('create','folder',nodeId)){
                                treeNode.jstree('create',node,'inside',{
                                    data: {
                                        title : params.texts.fresh.folder
                                    },
                                    attr : {
                                        'rel' : 'emptyfolder',
                                        'visibility': 'true',
                                        'complete-name': params.texts.fresh.folder,
                                        'validate':'true',
                                        'target': '0'
                                    }
                                });
                            }
                        }
                    };

                    items.createNext = {
                        id: 'createFolderNext',
                        label: params.texts.context.create,
                        action: function(){
                            if(!_triggerEvent('create','folder',nodeId)){
                                treeNode.jstree('create',parentNode,'inside',{
                                    data: {
                                        title : params.texts.fresh.folder
                                    },
                                    attr : {
                                        'rel' : 'emptyfolder',
                                        'visibility': 'true',
                                        'complete-name': params.texts.fresh.folder,
                                        'validate':'true',
                                        'target': '0'
                                    }
                                });                               
                            }
                        }
                    };

                    items.move = {
                        id: 'moveFolder',
                        label: params.texts.context.move,
                        submenu: _getSubMenuForMovingNode({
                            id: nodeId,
                            type: nodeType
                        }),
                        separator_after: true
                    };

                    items.showhide = {
                        id: 'showhideFolder',
                        label: params.texts.context.toggel,
                        action: function(){
                            if(!_triggerEvent('toggel','folder',nodeId)){
                                treeNode.trigger('toggel.jstree',[node]);
                            }
                        },
                        separator_after: true
                    }
                }else if(type == 'campaign'){ // campaign actions
                    items.move = {
                        id: 'moveCampaign',
                        label: params.texts.context.move,
                        submenu: _getSubMenuForMovingNode({
                            id: nodeId,
                            type: nodeType
                        },parent)
                    };

                    items.theme = {
                        id: 'themeCampaign',
                        label: params.texts.context.theming,
                        submenu: _getListOfCampaignTheme({
                            id: nodeId,
                            type: nodeType
                        }),
                        _disabled: (_getListOfCampaignTheme({
                            id: nodeId,
                            type: nodeType
                        }) === false) ? true : false,
                        separator_after: true
                    };

                    if(nodeType.search('aqui') != -1){
                        items.addList = {
                            id: 'createList',
                            label: params.texts.context.createList,
                            action: function(){
                                _triggerEvent('create','list',nodeId);
                            },
                            separator_after: true
                        };
                    }else{
                        items.addContent = {
                            id: 'createContent',
                            label: params.texts.context.createContent,
                            action: function(){
                                _triggerEvent('create','content',nodeId);
                            }
                        };
                    }
                    
                    items.validate = {
                        id: 'validateCampaign',
                        label: params.texts.context.validate,
                        _disabled: (node.attr('validate') == 'true') ? true : false,
                        action: function(){
                            if(!_triggerEvent('validate','campaign',nodeId))
                                treeNode.trigger('validate.jstree',[node]);
                        }
                    };
                }else{ //brick , content and list actions
                    items.duplicate = {
                        id: 'dupliact-'+type,
                        label: params.texts.context.duplicate,
                        action: function(){
                            if(!_triggerEvent('duplicate',type,nodeId))
                                treeInstance.move_node(node,treeInstance._get_parent(node),'inside',true,false,true);
                        }
                    };
                }
                
                return items;
            }

            actionListner = {
                create: function(event, data){
                    var rlbk = data.rlbk;
                    var node = $(data.rslt.obj);
                    
                    var d = {
                        action: 'create',
                        targetType : _normalizeTypeName(node.attr('rel')),
                        targetId: node.attr('target'),
                        data: {
                            name: data.rslt.name,
                            parent: ((data.rslt.parent) != -1) ? $(data.rslt.parent).attr('target') : -1,
                            type: ((data.rslt.parent) != -1) ? _normalizeTypeName($(data.rslt.parent).attr('rel')) : ''
                        }
                    };
                    _ajaxAction(d,rlbk,params.texts.create,'create',params.afterSuccessAction.create,params.afterErrorAction.create);
                },
                rename: function(event, data){
                    var rlbk = data.rlbk;
                    var node = $(data.rslt.obj);
                    var d = {
                        action: 'rename',
                        targetType : _normalizeTypeName(node.attr('rel')),
                        targetId: node.attr('target'),
                        data: data.rslt['new_name']
                    };
                    _ajaxAction(d,rlbk,params.texts.rename,null,params.afterSuccessAction.rename,params.afterErrorAction.rename);
                },
                move: function(event, data){
                    var d = null;
                    if(data.rslt.cy == true){ // duplicate
                        d = {
                            action: 'duplicate',
                            targetType : _normalizeTypeName($(data.rslt.o).attr('rel')),
                            targetId: $(data.rslt.o).attr('target')
                        };
                        _ajaxAction(d,data.rlbk,params.texts.duplicate,$(data.rslt.np).find('li:'+data.rslt.p),params.afterSuccessAction.duplicate,params.afterErrorAction.duplicate);
                    }else{ // move
                        d = {
                            action: 'move',
                            targetType : _normalizeTypeName($(data.rslt.o).attr('rel')),
                            targetId: $(data.rslt.o).attr('target'),
                            targetParent: $(data.rslt.r).attr('target')
                        };
                        _ajaxAction(d,data.rlbk,params.texts.move,null,function(r){
                            var ret = $.parseJSON(r);
                            _refreshNodeExtratData(data.rslt.op,'dec',ret.all,ret.invalid);
                            _refreshNodeExtratData(data.rslt.r,'inc',ret.all,ret.invalid);
                            if(typeof(params.afterSuccessAction.move) == 'function')
                                params.afterSuccessAction.move.call(this,_normalizeTypeName($(data.rslt.o).attr('rel')),$(data.rslt.o).attr('target'));
                        },params.afterErrorAction.move);
                    }
                },
                remove: function(event, data){
                    if(data.rslt.implicit)
                        return;
                    var rlbk = data.rlbk;
                    var node = $(data.rslt.obj);
                    var d = {
                        action: 'delete',
                        targetType : _normalizeTypeName(node.attr('rel')),
                        targetId: node.attr('target')
                    };
                    _ajaxAction(d,rlbk,params.texts.remove,null,function(){
                        var all = 0, invalid = 0;
                        if($(data.rslt.obj).attr('invalid-count')){
                            invalid = parseInt($(data.rslt.obj).attr('invalid-count'));
                        }
                        if($(data.rslt.obj).attr('all-count')){
                            all = parseInt($(data.rslt.obj).attr('all-count'));
                        }
                        if(all == 0){ // if campaign
                            all = 1;
                            if($(data.rslt.obj).hasClass('jstree-have-invalid'))
                                invalid = 1;
                        }

                        _refreshNodeExtratData(data.rslt.parent,'dec',all,invalid)
                        if(typeof(params.afterSuccessAction.remove) == 'function')
                            params.afterSuccessAction.remove.call(this,_normalizeTypeName(node.attr('rel')),node.attr('target'));
                    },params.afterErrorAction.remove);
                },
                validate: function(event, data){
                    var d = {
                        action: 'validate',
                        targetType : _normalizeTypeName(data.attr('rel')),
                        targetId: data.attr('target')
                    };
                    _ajaxAction(d,null,params.texts.validate,false,function(){
                        _validateNode(data);
                        if(typeof(params.afterSuccessAction.validate) == 'function')
                            params.afterSuccessAction.validate.call(this,_normalizeTypeName(data.attr('rel')),data.attr('target'));
                    },params.afterErrorAction.validate);
                },
                toggel: function(event, data){
                    var d = {
                        action: 'toggel',
                        targetType : _normalizeTypeName(data.attr('rel')),
                        targetId: data.attr('target')
                    };
                    _ajaxAction(d,null,params.texts.toggel,null,function(){
                        if($(data).attr('visibility') == 'true'){
                            $(data).attr('visibility','false');
                            if(showHidden == false)
                                treeNode.jstree('remove',data,true);
                        }else{
                            $(data).attr('visibility','true');
                        }
                        if(typeof(params.afterSuccessAction.toggel) == 'function')
                            params.afterSuccessAction.toggel.call(this,_normalizeTypeName(data.attr('rel')),data.attr('target'));
                    },params.afterErrorAction.toggel);
                }
            }
        }

        function _triggerEvent(action, target, data){
            for(var idx in events){
                if(events[idx].action == action &&
                    events[idx].target == target){
                    events[idx].fn(data);
                    return true;
                }
            }
            return false;
        }
        
        function _validateNode(node){
            $(node).attr('validate',true);
            $(node).removeClass('jstree-have-invalid');
            _refreshNodeExtratData(treeInstance._get_parent(node),'dec',0,1)
        }
        
        function _ajaxAction(d,r,m,o,as,ae){
            $.ajax({
                type: 'POST',
                url: params.dataSource.action,
                data: d,
                beforeSend: function(){
                    treeNode.jstree('lock');
                },
                success: function(data){
                    var visibleName = null;
                    if(o && typeof(o) != 'string') { // duplicate
                        var ret = $.parseJSON(data);
                        visibleName =  ret.label;
                        if(visibleName.length > 23){
                            visibleName = visibleName.substr(0,23)+'...';
                        }
                        $(o).attr('complete-name',ret.label);
                        $(o).attr('target',ret.id);
                        $(o).attr('title','N°['+ret.id+']'+ret.label);
                        $(o).find('a').html(visibleName);

                        _addContextMenuTriggerToNode($(o));

                        if(params.tooltipData !== false)
                            _makeTooltip(o);
                    }else if(o && o == 'create' ){ //create
                        var node = treeNode.find('li[target='+d.targetId+']');

                        visibleName =  d.data.name;
                        if(visibleName.length > 23){
                            visibleName = visibleName.substr(0,23)+'...';
                        }
                        node.attr('target',data);
                        node.attr('title','N°['+data+']'+d.data.name);
                        node.attr('complete-name',d.data.name);
                        node.find('a').html(visibleName);
                        
                        if(d.targetType == 'folder'){
                            node.attr('invalid-count',0);
                            node.attr('all-count',0);
                            node.find('a:first').append('<span class="jstree-extrat-info jstree-all-count"><i>(0)</i></span>');
                        }

                        _addContextMenuTriggerToNode(node);

                        if(params.tooltipData !== false)
                            _makeTooltip(node);
                    }
                    if(typeof(as) == 'function'){
                        as.call(this,data);
                    }
                    dialog.success(m.success);
                },
                error: function(response){
                    if(r) $.jstree.rollback(r);
                    if(typeof(ae) == 'function'){                        
                        ae.call(this,(d.targetType != undefined) ? d.targetType: null,(d.targetId != undefined) ? d.targetId: null);
                    }
                    dialog.error(m.error+'['+response.responseText+'].');
                },
                complete: function(){
                    treeNode.jstree('unlock');
                }
            });
        }

        function _reloadTreeData(word,selected){            
            var set = treeNode.jstree('get_selected');            
            if(selected && set.size() > 0 && set){
                afterLoadingEvents.push({
                    id: set.attr('target'),
                    type: _normalizeTypeName(set.attr('rel')),
                    event: 'select'
                });
            }
            
            treeNode.jstree('destroy');
            treeNode.empty();
            _bindLoadingEvents();
            _bindCRRMEvents();
            if(!params.ajaxData)
                treeData.json_data.ajax.url = params.dataSource.source+'/'+listMode+'/'+showHidden+'/'+level+'/'+JSON.stringify(groupType)+'/'+validity;
            else
                treeData.json_data.ajax.url =  params.dataSource.ajax+'/'+listMode+'/'+showHidden+'/'+JSON.stringify(groupType)+'/'+validity

            if(word)
                treeData.json_data.ajax.url = treeData.json_data.ajax.url+'/'+word;
           
            treeNode.jstree(treeData);
        }
        
        function _bind(){
            // toggel hidden folder
            if(showHiddenInput){
                showHiddenInput.bind('change',function(){
                    showHidden = showHiddenInput.is(':checked');
                    listMode = 'folder';
                    _reloadTreeData(null,true);
                });
            }
            
            // close and open folder
            treeNode.bind("open_node.jstree", function (event, data) {
                if(data.inst._get_type(data.args[0]) == 'closedfolder'){
                    data.inst.set_type('openedfolder',data.args[0]);
                }
            }).bind("close_node.jstree", function (event, data) {
                if(data.inst._get_type(data.args[0]) == 'openedfolder'){
                    data.inst.set_type('closedfolder',data.args[0]);
                }
            });

            // change view mode
            if(params.container.switcher.byFolder){
                $(params.container.switcher.byFolder).bind('click',function(){
                    listMode = 'folder';
                    showHidden = showHiddenInput.is(':checked');
                    _reloadTreeData(null,true);
                    showHiddenInput.attr('checked',false).parent().show();
                });
            }
            if(params.container.switcher.byType){
                $(params.container.switcher.byType).bind('click',function(){
                    listMode = 'type';
                    showHidden = 'true';
                    _reloadTreeData(null,true);
                    showHiddenInput.parent().hide();
                });
            }
            if(params.container.switcher.byDate){
                $(params.container.switcher.byDate).bind('click',function(){
                    listMode = 'date';
                    showHidden = 'true';
                    _reloadTreeData(null,true);
                    showHiddenInput.parent().hide();
                });
            }

            /* for CRRM action */
            _bindCRRMEvents();

            /* for choise theme */
            $(document).bind('context_show.vakata',function(){
                $('div#vakata-contextmenu').find('a[rel^=settingTheme]').each(function(){
                    $(this).hide();
                    $(this).parent().append('<span class="jstree-theming">'+$(this).html()+'</span>');
                });
            }).bind('context_hide.vakata',function(){
                var data = new Object();
                data.targetId = $('div#vakata-contextmenu').find('input[node-id]').attr('node-id');
                data.themes = new Array();
                $('div#vakata-contextmenu').find('span.jstree-theming').each(function(){
                    if($(this).find('input[type=checkbox]').is(':checked')){
                        data.themes.push(parseInt($(this).find('input[type=checkbox]').val()));
                    }
                });
                // check if changed
                var same = true, tmp = new Array();
                // get checked
                for(var j in params.theming){
                    if(params.theming[j].checked[data.targetId])
                        tmp.push(params.theming[j].id);
                }
                // compare
                for(var k in data.themes){
                    if(tmp.indexOf(data.themes[k]) == -1)
                        same = false;
                }

                if(tmp.length != data.themes.length)
                    same = false;
                if(same)
                    return;

                data.action = 'theming';
                data.targetType = 'campaign';
                // save change
                _ajaxAction(data,null,params.texts.theme,false,function(){
                    for(var idx in params.theming){
                        params.theming[idx].checked[data.targetId] = false;
                        for(var i in data.themes){
                            if(data.themes[i] == params.theming[idx].id)
                                params.theming[idx].checked[data.targetId] = true;
                        }
                    }
                });
            });


            /* bind global events */
            $(document).bind('reload.tree.navigation.dialog',function(event, type, id){
                _reloadTreeData();
                if(type != undefined && id != undefined){
                    self.data('navigation').setSelected(type,id);
                }
            });
        }

        function _triggerAfterLoadingEvents(){
            var node = null;
            for(var idx in afterLoadingEvents){                
                // get node selector
                if(afterLoadingEvents[idx].type == 'folder'){
                    node = treeNode.find('li[rel$=folder][target='+afterLoadingEvents[idx].id+']');
                }else if(afterLoadingEvents[idx].type == 'campaign'){
                    node = treeNode.find('li[rel^=e-][target='+afterLoadingEvents[idx].id+']');
                    if(node.size() == 0)
                        node = treeNode.find('li[rel^=s-][target='+afterLoadingEvents[idx].id+']');
                }else{
                    node = treeNode.find('li[rel='+afterLoadingEvents[idx].type+'][target='+afterLoadingEvents[idx].id+']');
                }
                // get events and trigger him
                if(afterLoadingEvents[idx].event == 'open' && params.ajaxData){
                    _loadAndOpenNode(afterLoadingEvents[idx].target);                                       
                }else if(afterLoadingEvents[idx].event == 'select'){
                    setTimeout(function(){
                        _openNodeParent(node);
                        if(afterLoadingEvents[idx].dontTriggerEvent) triggerSelection = false;
                        treeInstance.select_node(node);
                        triggerSelection = true;
                    },500);                    
                }else if(afterLoadingEvents[idx].event == 'open'){
                    setTimeout(function(){
                        _openNodeParent(node);
                        treeInstance.open_node(node);                        
                    },500);
                }
            }
            afterLoadingEvents = new Array();
        }

        function _openNodeParent(node){
            if(!node)
                return;
            treeInstance.open_node(node,function(){
                _openNodeParent(treeInstance._get_parent(node));
            });
        }

        function _getNode(target){
            var node = null;
            if(target.type == 'folder'){
                node = treeNode.find('li[rel$=folder][target='+target.id+']');
            }else if(target.type == 'campaign'){
                node = treeNode.find('li[rel^=e-][target='+target.id+']');
                if(node.size() == 0)
                    node = treeNode.find('li[rel^=s-][target='+target.id+']');
            }else{
                node = treeNode.find('li[rel='+target.type+'][target='+target.id+']');
            }
            return node.filter(':first');
        }

        function _loadAndOpenNode(path){
            var node = null,requestedPath = new Array();
            for(var i in path){
                node = _getNode(path[i]);
                if(!treeInstance._is_loaded(node)){
                    requestedPath = path.slice(i);
                    break;
                }
                else
                    treeInstance.open_node(node);
            }
            /* all load */
            if(requestedPath.legth == 0){
                _openNodeParent(node);
            }
            var str = '';
            for(var j in requestedPath){
                if(j != 0)
                    str += '['+requestedPath[j].id+'|'+requestedPath[j].type+']';
            }
            node = _getNode(requestedPath[0]);
            node.data('globalPathRequested',str);
            _openNodeParent(node);
            pipe = requestedPath[requestedPath.length-1];
        }

        function _bindCRRMEvents(){
            treeNode.unbind('rename.jstree').bind('rename.jstree',actionListner.rename);
            treeNode.unbind('create.jstree').bind('create.jstree',actionListner.create);
            treeNode.unbind('move_node.jstree').bind('move_node.jstree',actionListner.move);
            treeNode.unbind('remove.jstree').bind('remove.jstree',actionListner.remove);
            treeNode.unbind('validate.jstree').bind('validate.jstree',actionListner.validate);
            treeNode.unbind('toggel.jstree').bind('toggel.jstree',actionListner.toggel);
        }

        function _bindLoadingEvents(){
            treeNode.bind("before.jstree", function (event, data) {
                if(data.func == 'load_node_json'){
                    if(params.withBlock)
                        self.block();
                    isLoaded = false;
                }
                if(data.func == 'clean_node' && params.ajaxData){
                    if(params.addExtratData)
                        _addExtratDataToTree();
                    _addTooltipToNode();
                    _addContextMenuTrigger();
                    
                    /* for ajax loading*/
                    if(pipe != null){
                        setTimeout(function(){
                            var node = _getNode(pipe);                           
                            treeInstance.select_node(node);
                            _openNodeParent(node);
                            pipe = null;
                        },500);
                    }
                }
            
            });
            treeNode.bind("loaded.jstree", function (event, data) {
                isLoaded = true;
                if(params.withBlock)
                    self.unblock();
                if(params.addExtratData)
                    _addExtratDataToTree();
                _addTooltipToNode();
                _triggerAfterLoadingEvents();
                _addContextMenuTrigger();
            });
        }
        
        function _unbind(){
            treeNode.unbind('rename.jstree').unbind('create.jstree').unbind('move_node.jstree');
            treeNode.unbind('remove.jstree').unbind('validate.jstree').unbind('toggel.jstree');
        }

        function _clear(){
            treeNode.jstree('destroy');
            treeNode.empty();
            if(searchBox)
                searchBox.remove();
            if(showHiddenInput)
                showHiddenInput.parent().remove();
        }

        function _build(){
            _init();
            _create();
            _bind();
            
            $.extend(this,{
                getSelected: function(){
                    var selected = treeNode.jstree('get_selected');
                    if(selected && selected.size() > 0){
                        return {
                            id : selected.attr('target'),
                            type: _normalizeTypeName(selected.attr('rel'))
                        }
                    }
                    return null;
                },
                setSelected: function(type,id, dontTriggerEvent){ // folder, campaign, content, brick , list
                    if(!isLoaded){
                        afterLoadingEvents.push({
                            id: id,
                            type: type,
                            event: 'select',
                            dontTriggerEvent: dontTriggerEvent
                        });
                        return;
                    }
                    var node = _getNode({
                        type: type,
                        id: id
                    });

                    if(dontTriggerEvent)
                        triggerSelection = false;
                    else
                        triggerSelection = tru
                    treeInstance.select_node(node);                    
                    _openNodeParent(node);

                },
                makeSelected: function(target, dontTriggerEvent){
                    /* for ajax mode */
                    if(typeof(target) != 'object' || !params.ajaxData)
                        return;
                    if(!isLoaded){
                        afterLoadingEvents.push({
                            target: target,
                            event: 'open',
                            dontTriggerEvent: dontTriggerEvent
                        });
                        return;
                    }
                    if(dontTriggerEvent) 
                        triggerSelection = false;
                    else
                        triggerSelection = true;
                    _loadAndOpenNode(target);                    
                },
                bindSelection: function(type, action, not){
                    treeNode.bind("select_node.jstree", function (event, data) {                        
                        var typeName = _normalizeTypeName(data.rslt.obj.attr('rel'));
                        if(type == typeName && !not && triggerSelection)                             
                            action(data.rslt.obj.attr('target'),data.rslt.obj.attr('rel'));                        
                        if(type != typeName && not && triggerSelection)
                            action(data.rslt.obj.attr('target'),data.rslt.obj.attr('rel'));
                        triggerSelection = true;
                    });
                },
                unbindSelection: function(){
                    treeNode.bind("select_node.jstree");
                },
                bindActionEvent: function(action, target, fn){
                    if(actionList.indexOf(action) == -1 ||
                        targetList.indexOf(target) == -1)
                        return;
                    events.push({
                        action: action,
                        target: target,
                        fn: fn
                    });
                },
                unbindActionEvent: function(action, target){
                    if(actionList.indexOf(action) == -1 ||
                        targetList.indexOf(target) == -1)
                        return;
                    for(var idx in events){
                        if(events[idx].action == action && events[idx].target == target)
                            events.splice(idx,1);
                    }
                },
                destroy: function(){
                    _unbind();
                    _clear();
                }
            });
        }

        var c = $(this).data('navigation');
        if(c)return c;
        self = $(this);
        c = new _build();
        $(this).data('navigation',c);
        return c;
      
    };
})(jQuery)