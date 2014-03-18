/*
*	Class: lancher
*	Use: lancher
*	Author: R&D
*	Version: 1.0
*/

(function($) {
	$.launcher = {version: '1.0'};
	$.fn.launcher = function(config){

		config = $.extend({}, {
                    actions: [],
                    element: null,
                    trackings: [],
                    urlLinks : null,
                    width: 700,
                    height: 50
		}, config);

		var prefix = Math.floor(Math.random()*11);
		var currentObj = this; //set e as this
		var listElements = config.actions;
                var listHasLinks = [];

		//Wrap all function that is accessable within the plugin
		var px = {
			//Initialize and format data
			init: function() {
                            px.multilist = $(currentObj).css('width', '100%').css('float', 'left')
                                                                             .css('position', 'relative');
                            /*
                             * multiselct container
                             */
                            var container = $('<div>').css('float', 'left')
                                                      .css('height', 'auto')
                                                      .css('margin', '5px')
                                                      .css('width', config.width + 'px');
                            px.multilist.append(container);

                            /*
                             * Init left side
                             */
                            var leftSide = $('<div>').attr('id', 'left-side').addClass('side-container')
                                                                             .css('float', 'left')
                                                                             .css('minHeight', '30px')
                                                                             .css('width', '47%')
                                                                             .css('height', 'auto');
                            container.append(leftSide);

                            /*
                             * Init right side
                             */
                            var rightSide = $('<div>').attr('id', 'right-side').addClass('side-container')
                                                                               .css('float', 'left')
                                                                               .css('width', '44%')
                                                                               .css('minHeight', '30px')
                                                                               .css('height', 'auto');
                            container.append(rightSide);

                            var linkContainerAction = $('<div>').addClass('text-link off')
                                                                .attr('id', 'list-link-action')
                                                                .css('margin', '10px 0')
                                                                .css('float', 'left')
                                                                .css('width', '100%')
                                                                .hide()
                                                                .append($('<a>').css('margin', '-10px 5px 0 0')
                                                                                .html('Spécifier les liens de clique'))
                                                                .append('<hr style="margin-top: 12px;line-height:20px;">');

                            container.append(linkContainerAction);

                            var listLink = $('<div>').css('float', 'left').attr('id', 'list-link-container')
                                                                          .css('overflow', 'hidden')
                                                                          .css('height', '140px')
                                                                          .css('width', '96%')
                                                                          .css('margin', '0 10px 10px 10px')
                                                                          .hide()
                                                                          .append($('<div>').css('width', '480px').attr('id', 'list-link'));

                            container.append(listLink);

                            this.options('refresh');
			},
                        options: function(typeAction, attrName, value){
                            switch (typeAction) {
                                case 'set':
                                    switch (attrName) {
                                        case 'element':
                                            config.element = parseInt(value);
                                           
                                            _getLinks();
                                            break;
                                        case 'editActions':
                                            if (value.length > 0) {
                                                for(var x in listElements) {
                                                    for(var v in value) {
                                                        if(listElements[x].id == value[v].id) {
                                                            listElements[x].isSelected = true;

                                                            if(typeof(value[v].op) != 'undefined') {
                                                                listElements[x].op = value[v].op;
                                                            }
                                                            
                                                            var dataLinks = {
                                                                id: value[v].id,
                                                                label: listElements[x].label
                                                            }

                                                            if(value[v].links.length > 0) {
                                                                dataLinks.links = value[v].links;

                                                                listHasLinks.push(dataLinks);
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                listHasLinks = [];
                                                for(var x in listElements) {
                                                    listElements[x].isSelected = false;
                                                    listElements[x].op = 2;
                                                }
                                            }
                                            break;
                                    }
                                    break;
                                case 'get':
                                    switch (attrName) {
                                        case 'element':
                                            return config.element;
                                            break;
                                        case 'data':
                                            return _getData();
                                            break;
                                    }
                                    break;
                                case 'destroy':
                                    _unbind();
                                    _clear();
                                    _resetConfig();
                                    return true;
                                    break;
                                case 'refresh':
                                    _buildLeftSideElements();
                                    _buildRightSideElements();
                                    _restLinksContainer();
                                    _rightToLeftSide();
                                    _leftToRightSide();
                                    _switcherEvent();
                                    _addLinkAction();
                                    return true;
                                    break;
                            }
                        }
		}

                /*
                 * Section: build element
                 */
                
                /*
                 * Build html rendering of element
                 *
                 * @param data of element
                 * @param color of container
                 * @param action add or remove
                 * @access private
                 * @return elm
                 */
                function _buildElement(data, color, action) {
                    var elm = $('<div>').addClass('switcher-element ' + color)
                                        .attr('id', 'link-' + data.id)
                                        .attr('hasLink', data.hasLink)
                                        .attr('key', data.id);

                    /*
                     * Add btn action (add|delete)
                     */
                    var addBtn = $('<div>').addClass('btn-container');
                    switch(action) {
                            case 1:
                                    elm.addClass('right-side-element');
                                    addBtn.addClass('btn-add')
                                          .css('float', 'left');
                                    break;
                            case 2:
                                    elm.addClass('left-side-element');
                                    if ($('#left-side').find('.switcher-green').size() >= 1) {
                                        if (typeof(data.op) != 'undefined') {
                                            elm.append(_buildSwitcher(data.id, data.op));
                                        } else {
                                            elm.append(_buildSwitcher(data.id, null));
                                        }
                                    }

                                    addBtn.addClass('btn-remove')
                                          .css('float', 'right');
                            break;
                    }

                    elm.append(addBtn);

                    var label = $('<div>').addClass('label-elment')
                                          .html(data.label);

                    elm.append(label);

                    return elm;
                }

                /*
                 * Add event (add) to  of element
                 *
                 * @access private
                 * @return void
                 */
                function _rightToLeftSide() {
                    $('.btn-add').unbind('click').click(function() {
                        var parent = $(this).parents('div:first');

                        var data = {
                            id : parseInt(parent.attr('key')),
                            label: parent.find('div:last').html(),
                            hasLink: parseInt(parent.attr('hasLink'))
                        }

                        $(this).parents('div:first').remove();
                        $('#left-side').append(_buildElement(data, 'switcher-green', 2));

                        _leftToRightSide();

                        /*
                         * Add links of this element if exist
                         */
                        if (config.trackings.length > 0
                            && data.hasLink == 1) {
                            $('#list-link-action').show();

                            _addListLink(data.id, data.label);
                            _addEventLink(data.id);
                        }

                        /*
                         * Add events to switcher
                         */
                        _switcherEvent();
                    });
                }

                /*
                 * Add event (remove) to  of element
                 *
                 * @access private
                 * @return void
                 */
                function _leftToRightSide() {
                    $('.btn-remove').unbind('click').click(function() {
                        var parent = $(this).parents('div:first');

                        var data = {
                            id : parseInt(parent.attr('key')),
                            label: parent.find('div:last').html(),
                            hasLink: parseInt(parent.attr('hasLink'))
                        }

                        $(this).parents('div:first').remove();
                        $('#right-side').append(_buildElement(data, 'switcher-green', 1));

                        _rightToLeftSide();

                        /*
                         * Delete links of this element if exist
                         */
                        if (config.trackings.length > 0
                            && data.hasLink == 1) {
                            $('#label-groups-' + data.id).remove();
                            $('#params-groups-' + data.id).remove();

                            if ($('.customcheck').size() == 0) {
                                $('#list-link-action').removeClass('on').addClass('off');
                                $('#list-link-action').find('a').html('Spécifier les liens de clique');
                                $('#list-link-action').hide();
                                $('#list-link-container').hide();
                            }
                        }

                        $('.left-side-element:eq(0)').find('.switcher-container').remove();
                    });
                }

                /*
                 * Section: build switcher
                 */

                /*
                 * Build html rendering of switcher
                 *
                 * @param id of element
                 * @param op opeartor
                 * @access private
                 * @return elm
                 */
                function _buildSwitcher(id, op) {
                    var selectedOr = '';
                    var selectedAnd = ''

                    if (op != null) {
                        switch (parseInt(op)) {
                            case 1:
                                selectedAnd = 'selected';
                                break;
                            case 2:
                                selectedOr = 'selected';
                                    break;
                        }
                    } else {
                        selectedOr = 'selected';
                    }

                    var elm =$('<div>').addClass('switcher-container');

                    var pElm = $('<p>').addClass('field switch');

                    var orOp = $('<label>').addClass('cb-enable')
                                           .addClass(selectedOr)
                                           .append($('<span>').html('Ou'));

                    var andOp = $('<label>').addClass('cb-disable')
                                            .addClass(selectedAnd)
                                            .append($('<span>').html('ET'));

                    var inputOp = $('<input>').attr('type', 'checkbox')
                                              .attr('checked', 'checked')
                                              .addClass('checkbox');

                    elm.append(pElm);
                    pElm.append(orOp);
                    pElm.append(andOp);
                    pElm.append(inputOp);

                    return elm;
                }

                /*
                 * Add event to switcher element
                 *
                 * @param id of element
                 * @access private
                 * @return void
                 */
                function _switcherEvent(id) {
                    $(".cb-enable").unbind('click').click(function(){
                        var parent = $(this).parents('.switch');
                        $('.cb-disable', parent).removeClass('selected');
                        $(this).addClass('selected');
                        $('.checkbox', parent).attr('checked', true);
                    });
                    $(".cb-disable").unbind('click').click(function(){
                        var parent = $(this).parents('.switch');
                        $('.cb-enable', parent).removeClass('selected');
                        $(this).addClass('selected');
                        $('.checkbox', parent).attr('checked', false);
                    });
                }

                /*
                 * Section: Append element in side container
                 */

                /*
                 * Append element in left side container
                 *
                 * @access private
                 * @return void
                 */
                function _buildLeftSideElements() {
                    $('#left-side').empty();
                    for(var x in listElements) {
                        if (listElements[x].isSelected) {
                            $('#left-side').append(_buildElement(listElements[x], 'switcher-green', 2));

                            /*
                             * Add links of this element if exist
                             */
                            if (typeof(listElements[x].elements) != 'undefined') {
                                $('#list-link-action').show();

                                _addListLink(listElements[x].id, listElements[x].label);
                                _addEventLink(listElements[x].id);
                            }
                        }
                    }
                }

                /*
                 * Append element in right side container
                 *
                 * @access private
                 * @return void
                 */
                function _buildRightSideElements() {
                    $('#right-side').empty();
                    for(var x in listElements) {
                        if (!listElements[x].isSelected) {
                            $('#right-side').append(_buildElement(listElements[x], 'switcher-green', 1));
                        }
                    }
                }

                /*
                 * Section: add link to element
                 */

                /*
                 * Add link to element
                 *
                 * @param id of element
                 * @param label of element
                 * @access private
                 * @return void
                 */
                function _addListLink(id, label) {
                    var elements = config.trackings;
                    var divContainer = $('<div>').addClass('link-container')
                                               .css('float', 'left')
                                               .css('overflow', 'hidden')
                                               .css('width', '47%')
                                               .css('margin', '5px')
                                               .attr('id', 'params-groups-' + id);

                    var divLabelElement = $('<div>').addClass('title-links-container')
                                                    .css('float', 'left')
                                                    .css('width', '100%')
                                                    .html(label);

                    divContainer.append(divLabelElement);

                    var groupsContainer = $('<div>').css('float', 'left')
                                               .css('overflow', 'auto')
                                               .css('height', '100px')
                                               .css('width', '100%')
                                               .attr('id', 'params-groups-' + id);

                    divContainer.append(groupsContainer);

                    var groupsTable = $('<table>').css('float', 'left')
                                                 .css('width', '100%');

                    groupsContainer.append(groupsTable);

                    for (var e in elements) {
                        /*
                         * Element not have a links
                         */
                        if (typeof(elements[e].links) == 'undefined') {
                            var trLink = _buildLink(elements[e].label, elements[e].id, id);
                            groupsTable.append(trLink);

                            if (elements[e].isChecked) {
                                trLink.find('span:first').addClass('customcheckfull');
                            } else {
                                trLink.find('span:first').addClass('customchecknone');
                            }

                            continue;
                        }

                        /*
                         * Group container
                         */
                        var group = $('<tr>');

                        /*
                         * Add span checkbox group
                         */
                        var spanGroup = $('<span>').attr('group-value', elements[e].id)
                                                   .addClass('group customcheck');

                        group.append($('<td>').css('float', 'left')
                                              .css('width', '13%')
                                              .append(spanGroup));

                        /*
                         * Add label group
                         */
                        var labelGroup = $('<label style="font-weight: bold;">').html(elements[e].label);
                        group.append($('<td>').css('float', 'left')
                                                .css('width', '80%')
                                                .append(labelGroup));

                        /*
                         * Add group properties
                         */
                        groupsTable.append(group);

                        /*
                         * links
                         */
                        var tableLinks = $('<table>').css('width', '100%');

                        var links = $('<tr>');
                        links.append($('<td>').css('float', 'left')
                                                .css('width', '100%')
                                                .append(tableLinks));

                        groupsTable.append(links);

                        var countChecked = 0;
                        for (var x in elements[e].links) {
                            var link = _buildLink(elements[e].links[x].label, elements[e].links[x].id, id, elements[e].id);
                            tableLinks.append(link);

                            if (elements[e].links[x].isChecked) {
                                countChecked++;
                                link.find('span:first').addClass('customcheckfull');
                            } else {
                                link.find('span:first').addClass('customchecknone');
                            }
                        }

                        $('#list-link').append(divContainer);

                        if (countChecked == 0) {
                            spanGroup.addClass('customchecknone');
                        } else if (countChecked == elements[e].links.length) {
                            spanGroup.addClass('customcheckfull');
                        } else {
                            spanGroup.addClass('customcheckpartial');
                        }
                    }
                }

                /*
                 * Add events to checkbox
                 *
                 * @param id of element
                 * @access private
                 * @return void
                 */
                function _addEventLink(id) {
                    $('#params-groups-' + id +' .link').unbind('click').click(function() {
                        var key = $(this).attr('link-value');
                        var parent = $(this).attr('parent-key');
                        
                        $('#params-groups-' + id +' span[link-value=' + key + ']').each(function() {
                            var parent = $(this).attr('parent-key');
                            if($(this).hasClass('customchecknone')) {
                                $(this).removeClass('customchecknone');
                                $(this).addClass('customcheckfull');
                            } else {
                                $(this).addClass('customchecknone');
                                $(this).removeClass('customcheckfull');
                            }

                            if (typeof(parent) == 'undefined') {
                                return;
                            }

                            _displayGroup(id, parent);
                        });

                        if (typeof(parent) == 'undefined') {
                            return;
                        }
                        
                        _displayGroup(id, parent);
                    });

                    $('#params-groups-' + id +' .group').unbind('click').click(function() {
                        var key = $(this).attr('group-value');

                        if($(this).hasClass('customchecknone') || $(this).hasClass('customcheckpartial')) {
                            $(this).removeClass('customchecknone');
                            $(this).removeClass('customcheckpartial');
                            $(this).addClass('customcheckfull');
                            
                            $('#params-groups-' + id +' span[parent-key=' + key + ']').each(function() {
                                var key = $(this).attr('link-value');
                                $('#params-groups-' + id +' span[link-value=' + key + ']').each(function() {
                                    var parent = $(this).attr('parent-key');

                                    $(this).removeClass('customchecknone');
                                    $(this).addClass('customcheckfull');

                                    if (typeof(parent) == 'undefined') {
                                        return;
                                    }
                                    
                                    _displayGroup(id, parent);
                                });
                            });
                        } else {
                            $(this).addClass('customchecknone');
                            $(this).removeClass('customcheckpartial');
                            $(this).removeClass('customcheckfull');

                            $('#params-groups-' + id +' span[parent-key=' + key + ']').each(function() {
                                var key = $(this).attr('link-value');
                                $('#params-groups-' + id +' span[link-value=' + key + ']').each(function() {
                                    var parent = $(this).attr('parent-key');
                                    
                                    $(this).addClass('customchecknone');
                                    $(this).removeClass('customcheckfull');

                                    if (typeof(parent) == 'undefined') {
                                        return;
                                    }

                                    _displayGroup(id, parent);
                                });
                            });
                        }
                    });
                }

               /*
                 * Add evenet action show|hide of links container
                 *
                 * @access private
                 * @return void
                 */
               function _addLinkAction() {
                    $('#list-link-action').unbind('click').click(function() {
                        if($(this).hasClass('off')) {
                            $(this).find('a').html('Masquer');
                            $(this).removeClass('off');
                            $(this).addClass('on');
                            $('#list-link-container').show();
                        } else {
                            $(this).find('a').html('Spécifier les liens de clique');
                            $(this).removeClass('on');
                            $(this).addClass('off');
                            $('#list-link-container').hide();
                        }
                    });
                }
                
                /*
                 * Build link element
                 * 
                 * @param label of element
                 * @param id of element
                 * @param parent of element
                 * @param group of link
                 * @access private
                 * @return link
                 */
                function _buildLink(label, id, parent, group) {
                    var link = $('<tr>');

                    /*
                     * add input checkbox link
                     */
                    var spanLink = $('<span>').attr('link-value', id)
                                              .addClass('customcheck link');

                    link.append($('<td>').css('float', 'left')
                                           .css('width', '13%')
                                           .append(spanLink));

                    if (typeof(group) != 'undefined') {
                        spanLink.attr('parent-key', group);

                        link.find('td:first').css('margin', '0 0 0 10px');
                    } 

                    /*
                     * add label link
                     */
                    var labelLink = $('<label>').html(label);
                    link.append($('<td>').css('float', 'left')
                                           .css('width', '80%')
                                           .append(labelLink));
                    return link;
                }

                /*
                 * Add evenet action show|hide of links container
                 *
                 * @param id of element
                 * @param group group
                 * @access private
                 * @return void
                 */
                function _displayGroup(id, group) {
                    var countChecked = 0;

                    $('#params-groups-' + id +' span[parent-key=' + group + ']').each(function() {
                        if ($(this).hasClass('customcheckfull')) {
                            countChecked++;
                        }
                    });

                    if (countChecked == 0) {
                        $('#params-groups-' + id +' span[group-value=' + group + ']').addClass('customchecknone');
                        $('#params-groups-' + id +' span[group-value=' + group + ']').removeClass('customcheckpartial');
                        $('#params-groups-' + id +' span[group-value=' + group + ']').removeClass('customcheckfull');
                    } else if (countChecked == $('#params-groups-' + id +' span[parent-key=' + group + ']').size()) {
                        $('#params-groups-' + id +' span[group-value=' + group + ']').removeClass('customchecknone');
                        $('#params-groups-' + id +' span[group-value=' + group + ']').removeClass('customcheckpartial');
                        $('#params-groups-' + id +' span[group-value=' + group + ']').addClass('customcheckfull');
                    } else {
                        $('#params-groups-' + id +' span[group-value=' + group + ']').removeClass('customchecknone');
                        $('#params-groups-' + id +' span[group-value=' + group + ']').addClass('customcheckpartial');
                        $('#params-groups-' + id +' span[group-value=' + group + ']').removeClass('customcheckfull');
                    }
                }

                /*
                 * Check link
                 *
                 * @params id of link
                 * @params action of action
                 * @access private
                 * @return void
                 */
                function _checkLink(id, action) {
                    $('#params-groups-' + action +' span[link-value=' + id + ']').each(function() {
                        $(this).removeClass('customchecknone');
                        $(this).removeClass('customcheckpartial');
                        $(this).addClass('customcheckfull');

                        var parent = $(this).attr('parent-key');

                        if (typeof(parent) == 'undefined') {
                            return;
                        }

                        _displayGroup(action, parent);
                    });
                }
                /*
                 * Section: destroy section
                 */

                /*
                 * Clear rebdering html of plugin
                 *
                 * @access private
                 * @return void
                 */
                function _clear() {
                    px.multilist.empty();
                }

                /*
                 * Unbind all evenet
                 *
                 * @access private
                 * @return void
                 */
                function _unbind() {
                    $('#list-link-action').unbind('click');
                    
                    px.multilist.find('span').each(function() {
                        $(this).unbind('click');
                    });

                    px.multilist.find('.btn-remove').each(function() {
                        $(this).unbind('click');
                    });

                    px.multilist.find('.btn-add').each(function() {
                        $(this).unbind('click');
                    });

                    px.multilist.find('.cb-enable').each(function() {
                        $(this).unbind('click');
                    });

                    px.multilist.find('.cb-disable').each(function() {
                        $(this).unbind('click');
                    });
                }

                /*
                 * Reset config of plugin
                 *
                 * @access private
                 * @return void
                 */
                function _resetConfig() {
                    config = {
                        actions: [],
                        element: null,
                        trackings: [],
                        urlLinks : null,
                        width: 700,
                        height: 50
                    };
                }

                /*
                 * Section: other action
                 */
                /*
                 * Get links by element
                 *
                 * @access private
                 * @return void
                 */
                function _restLinksContainer() {
                    $('#list-link-action').removeClass('on').addClass('off');
                    $('#list-link-action').find('a').html('Spécifier les liens de clique');
                    $('#list-link-action').hide();
                    $('#list-link-container').css('height', 'auto');
                    $('#list-link-container').hide();
                    $('#list-link').empty();
                }

                /*
                 * Get links by element
                 *
                 * @access private
                 * @return void
                 */
                function _getLinks(){
                    if (config.element == null) {
                        return;
                    }

                    px.options('refresh');

                    $(px.multilist).block();
                    
                    $.ajax({
                        type: 'POST',
                        url: config.urlLinks,
                        data: { element: config.element },
                        dataType: 'json',
                        success: function(response){
                            $(px.multilist).unblock();
                            if (response.success) {
                                if (response.trackings.length > 0) {
                                    for (var x in response.trackings) {
                                        if (typeof(response.trackings[x].urls) != 'undefined') {
                                            var group = {
                                                id: response.trackings[x].id,
                                                label: response.trackings[x].label,
                                                links: []
                                            }

                                            for (var y in response.trackings[x].urls) {
                                                group.links.push({
                                                    id: response.trackings[x].urls[y].id,
                                                    label: response.trackings[x].urls[y].label,
                                                    isChecked: false
                                                });
                                            }

                                            config.trackings.push(group);
                                        } else {
                                            config.trackings.push({
                                                id: response.trackings[x].id,
                                                label: response.trackings[x].label,
                                                isChecked: false
                                            });
                                        }
                                    }

                                    _restLinksContainer();

                                    if(listHasLinks.length > 0) {
                                        $('#list-link-action').show();
                                    }

                                    for(var l in listHasLinks) {
                                        _addListLink(listHasLinks[l].id, listHasLinks[l].label);
                                        _addEventLink(listHasLinks[l].id);
                                        for (var c in listHasLinks[l].links) {
                                            _checkLink(listHasLinks[l].links[c],listHasLinks[l].id);
                                        }
                                    }
                                } else {
                                    config.trackings = [];
                                }
                            } else {
                                return;
                            }
                        },
                        error: function(response){
                            
                        }
                    });
                }

                /*
                 * Get data
                 *
                 * @access private
                 * @return void
                 */
                function _getData() {
                    var trigger = {
                        idElement : config.element,
                        actions: []
                    }

                    $('#left-side .left-side-element').each(function() {
                        var action = {
                            id: parseInt($(this).attr('key'))
                        }
                        
                        if ($(this).find('div:first').hasClass('switcher-container')) {
                            var opValue = $(this).find('.checkbox').is(':checked');
                            if(opValue) {// Or
                                action.op = 2;
                            } else {// And
                                action.op = 1;
                            }
                        }

                        if (parseInt($(this).attr('haslink'))) {
                            action.links = [];
                            $('#params-groups-' + action.id +' .link').each(function() {
                                if ($(this).hasClass('customcheckfull')) {
                                    var key = parseInt($(this).attr('link-value'));
                                    var isExist = false;
                                    for (var x in action.links) {
                                        if (action.links[x] == key) {
                                            isExist = true;
                                        }
                                    }

                                    if (!isExist) {
                                        action.links.push(key);
                                    }
                                }
                            });
                        }

                        trigger.actions.push(action);
                    });

                    return trigger;
                }
                
		/*
		 * Initialize
		 */
		px.init();

		return px;
	}
})(jQuery);
