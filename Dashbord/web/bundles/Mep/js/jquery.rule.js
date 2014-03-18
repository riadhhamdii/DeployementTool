/*
*	Class: lancher
*	Use: lancher
*	Author: R&D
*	Version: 1.0
*/

(function($) {
	$.rule = {version: '1.0'};
	$.fn.rule = function(config){

		config = $.extend({}, {
                    width: '100%',
                    height: 50
		}, config);

		var currentObj = this; //set e as this

		//Wrap all function that is accessable within the plugin
		var px = {
			//Initialize and format data
			init: function() {
                            px.rules = $(currentObj).css('width', '100%').css('float', 'left')
                                                                             .css('position', 'relative');
                            /*
                             * multiselct container
                             */
                            var container = $('<div>').css('float', 'left')
                                                      .css('height', 'auto')
                                                      .css('width', config.width);
                            px.rules.append(container);

                            /*
                             * Init left side
                             */
                            var leftSide = $('<div>').attr('id', 'rules-left-side').addClass('rule-side-container')
                                                                             .css('float', 'left')
                                                                             .css('minHeight', '30px')
                                                                             .css('width', '100%')
                                                                             .css('height', 'auto');
                            container.append(leftSide);


                            this.options('refresh');
			},
                        options: function(typeAction, attrName, value){
                            switch (typeAction) {
                                case 'set':
                                    
                                    break;
                                case 'get':
                                    break;
                                case 'destroy':
                                    _unbind();
                                    _clear();
                                    _resetConfig();
                                    return true;
                                    break;
                                case 'refresh':
                                   /* _addElement();
                                    _removeElement();
                                    _switcherEvent();*/
                                    _addLabelNoRules();
                                    return true;
                                    break;
                                case 'add':
                                    switch (attrName) {
                                        case 'element':
                                            _addElement(value);
                                            _removeElement();
                                            _switcherEvent();
                                            break;
                                    }
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
                 * @access private
                 * @return elm
                 */
                function _buildElement(data, color) {
                    var elm = $('<div>').addClass('rule-element ' + color)
                                        .attr('key', data.id);

                    /*
                     * Add btn action (delete)
                     */
                    
                    var addBtn = $('<div>').addClass('btn-remove-action');

                    addBtn.append($('<a>').addClass('icon-white-small cancel'))
                                          .attr('id', 'cancel_' + this.index)
                                          .attr('index', this.index);

                    elm.addClass('rules-left-side-element');
                    if (px.rules.find('#rules-left-side').find('.rule-blue').size() >= 1) {
                        if (typeof(data.op) != 'undefined') {
                            elm.append(_buildSwitcher(data.id, data.op));
                        } else {
                            elm.append(_buildSwitcher(data.id, null));
                        }
                    }

                    elm.append(addBtn);

                    var label = $('<div>').addClass('label-elm')
                                          .html(data.label);

                    elm.append(label);

                    return elm;
                }

                /*
                 * Add event (remove) to  of element
                 *
                 * @access private
                 * @return void
                 */
                function _removeElement() {
                    px.rules.find('.btn-remove-action').unbind('click').click(function() {
                        $(this).parents('div:first').remove();

                        px.rules.find('.rules-left-side-element:eq(0)').find('.rule-container').remove();

                        _addLabelNoRules();
                    });
                }

                /*
                 * Section: build rule
                 */

                /*
                 * Build html rendering of rule
                 *
                 * @param id element
                 * @param op opeartor
                 * @access private
                 * @return elm
                 */
                function _buildSwitcher(id, op) {
                    var checkedOr = '';
                    var checkedAnd = '';

                    if (op != null) {
                        switch (parseInt(op)) {
                            case 1:
                                checkedAnd = "checked= checked"
                                break;
                            case 2:
                                checkedOr = "checked= checked";
                                    break;
                        }
                    } else {
                        checkedOr = "checked= checked";
                    }
                    
                    var count = $('.condition-op-elm').size();

                    var elm = $('<div>').attr('id', 'condition-op-elm-' + (count+1))
                                        .addClass('condition-op-elm');

                    var opInputAnd = '<input type="radio" name="condition-name-'+ id +'" value="Et" ' + checkedAnd + ' id="condition-and-'+ id +'" class="radioSlider">';
                    var opLabelAnd = $('<label>').attr('for', "condition-and-"+ id)
                                                 .text('Et');

                    elm.append(opInputAnd);

                    elm.append(opLabelAnd);

                    var opInputOr = '<input type="radio" name="condition-name-'+ id +'" value="Ou" ' + checkedOr + ' id="condition-or-'+ id +'" class="radioSlider">';
                    var opLabelOr = $('<label>').attr('for', "condition-or-"+ id)
                                                .text('Ou');

                    elm.append(opInputOr);
                    elm.append(opLabelOr);
                    
                    return elm;
                }

                /*
                 * Add event to rule element
                 *
                 * @access private
                 * @return void
                 */
                function _switcherEvent(obj) {
                    var count = $('.condition-op-elm').size();

                    $('#condition-op-elm-' + count).radioSwitch({width: 25, height:20});
                }

                /*
                 * Section: Append element in side container
                 */

                /*
                 * Append element in left side container
                 *
                 * @param  data
                 * @access private
                 * @return void
                 */
                function _addElement(data) {
                    px.rules.find('.no-rules').remove();
                    px.rules.find('#rules-left-side').append(_buildElement(data, 'rule-blue'));
                }

                /*
                 * Add label no rules
                 *
                 * @access private
                 * @return void
                 */
                function _addLabelNoRules() {
                    if (px.rules.find('.rule-element').size() == 0) {
                        px.rules.find('#rules-left-side').append($('<label>').addClass('no-rules')
                                                    .html('Pas de condition')
                                        );
                    }
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
                    px.rules.empty();
                }

                /*
                 * Unbind all evenet
                 *
                 * @access private
                 * @return void
                 */
                function _unbind() {
                    px.rules.find('.btn-remove-action').each(function() {
                        $(this).unbind('click');
                    });

                    px.rules.find('.cb-enable').each(function() {
                        $(this).unbind('click');
                    });

                    px.rules.find('.cb-disable').each(function() {
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
                        width: 700,
                        height: 50
                    };
                }

                /*
                 * Section: other action
                 */
                /*
                 * Get data
                 *
                 * @access private
                 * @return void
                 */
                function _getData() {
                    return true;
                }
                
		/*
		 * Initialize
		 */
		px.init();

		return px;
	}
})(jQuery);
