/*
*	Class: graphBar
*	Use: graphBar
*	Author: R&D
*	Version: 1.3
*/

(function($) {
	$.graphBar = {version: '1.3', count: 0};
	$.fn.graphBar = function(config){
		
		config = $.extend({}, {
			title: 'V graph',
			width: 700,
			height: 50,
			direction: 'V',
			isTooltip: true,
			tooltipDirection: 'n', /*nw | n | ne | w | e | sw | s | se*/
			isLegend: true,
			isAnimateLegend: true,
			showHideBlock: true,
			legendColms: 2,
			legendPosition: 's',
			data: []
		}, config);
		
		var prefix = Math.floor(Math.random()*11);
		var data  = config.data;
		var currentObj = this; //set e as this
		
		//Wrap all function that is accessable within the plugin
		var px = {		
			//Initialize and format data
			init: function(){	
				px.graph = $(currentObj).css('width', '100%')
										.css('float', 'left')
										.css('position', 'relative')
										.css('margin', '10px');
				  
				/*
				 * graph container
				 */
				var container = $('<div>').addClass('graph-container graph-sub-container-white')
										  .css('float', 'left')
										  .css('height', config.height + 'px')
										  .css('width', config.width + 'px');
				container.addClass('graph-container-horizontal');
				/*
				 * Choice direction
				 */
				switch (config.direction.toUpperCase()) {
					case 'H':
						for (var d in data) {
							var label = $('<center>').addClass('label-sub-container')
													 .html(data[d].counting + ' ' + data[d].label);
									
							
							var labelContainer = $('<div>').attr('id', 'graph-sub-container-' + parseInt(d) + '_' + prefix)
													   
													   .addClass('graph-sub-container-' + data[d].color)
													   .css('height', '100%')
													   .css('width', data[d].percent + '%')
													   .css('float', 'left')
							
							if (config.isTooltip) {
								var title = data[d].counting + ' ' + data[d].label;
								if (typeof(data[d].elements) != 'undefined' && data[d].elements.length > 0) {
									
									title = '';
									for (var x in data[d].elements) {
										title += '<div>' + data[d].elements[x].label + '</div>';
									}
								}	
								
								labelContainer.attr('title', title);
							}
							
							container.append(labelContainer);
													   
						}
						
						px.graph.append(container);
						
						/*
						 * graph title
						 */
						var graphTitle = $('<div>').addClass('graph-title-horizontal')
												   .css('textAlign', 'center')
												   .css('width', config.width + 'px')
												   .css('position', 'relative')
												   .css('float', 'left')
												   .css('margin', '10px 0 10px')
												   .html(config.title);
						
						px.graph.append(graphTitle);
						break;
					case 'V':
						/*
						 * graph title
						 */
						
						var graphTitle = $('<div>').css('height', config.height + 'px')
												   .css('position', 'absolute')
												   .css('width', config.width + 'px');
						
						var titleSpan = $('<span>').addClass('graph-title-vertical')
												   .html(config.title);				   
						
						graphTitle.append(titleSpan);
						
						px.graph.append(graphTitle);
						
						for (var d in data) {
							var label = $('<center>').addClass('label-sub-container')
													 .html(data[d].counting + ' ' + data[d].label);
									
							var title = data[d].counting + ' ' + data[d].label;
							if (typeof(data[d].elements) != 'undefined' && data[d].elements.length > 0) {
								
								title = '';
								for (var x in data[d].elements) {
									title += '<div>' + data[d].elements[x].label + '</div>';
								}
							}	
							
							var labelContainer = $('<div>').attr('id', 'graph-sub-container-' + parseInt(d) + '_' + prefix)
													   .addClass('graph-sub-container-' + data[d].color)
													   .css('height', data[d].percent + '%')
													   .css('width', '100%')
													   .css('float', 'left');
							
							if (config.isTooltip) {
								var title = data[d].counting + ' ' + data[d].label;
								if (typeof(data[d].elements) != 'undefined' && data[d].elements.length > 0) {
									
									title = '';
									for (var x in data[d].elements) {
										title += '<div>' + data[d].elements[x].label + '</div>';
									}
								}	
								
								labelContainer.attr('title', title);
							}
							
							container.append(labelContainer);
													   
						}
						px.graph.append(container);
						break;
				}
			},
			initTooltip: function() {
				switch (config.direction.toUpperCase()) {
					case 'H':
						for (var d in data) {
							$('#graph-sub-container-' + parseInt(d) + '_' + prefix).tipsy({gravity: config.tooltipDirection, html: true});
						}
						break;
					case 'V':
						for (var d in data) {
							$('#graph-sub-container-' + parseInt(d) + '_' + prefix).tipsy({gravity: config.tooltipDirection, html: true});
						}
						break;
				}
			},
			prepareDataToLegend: function() {
				var legendContainer = $('<div>').addClass('legend-container');
				var legendTable = $('<table>').addClass('legend-table');
				
				var nbrMod = parseInt(config.legendColms);
				
				for (var d in data) {
					if (d%nbrMod == 0) {
						var tr = $('<tr>');
						
						legendTable.append(tr);
					}
					
					var title = $('<td>').css('whiteSpace', 'nowrap')
										 .html(data[d].counting + ' ' + data[d].label);
										 
					var iconeTitle = $('<div>').css('height', '12px')
											   .css('width', '12px')
											   .css('cursor', 'pointer')
											   .addClass('graph-sub-container-' + data[d].color)
											   .click(function() {
												    
											   		$(this).removeClass('graph-sub-container-gray');
													
											   		var cls = $(this).attr('class');
													
													var clsBar = px.graph.find('.graph-container .' + cls);
													
													if (clsBar.hasClass('graph-sub-container-white')) {
														if (config.isAnimateLegend) {
															clsBar.animate({
															  opacity: 1
															}, "slow" );
														}
														
														clsBar.removeClass('graph-sub-container-white');
													} else {
														if (config.isAnimateLegend) {
															clsBar.animate({
															  opacity: 0
															}, "slow" );
														}
														
														$(this).addClass('graph-sub-container-gray');
														clsBar.addClass('graph-sub-container-white');
													}
											   });
					if (!config.showHideBlock) {
						iconeTitle.css('cursor', 'auto')
								  .unbind('click');
					}
					td = $('<td>').append(iconeTitle);
					
					tr.append(td);
					tr.append(title);				   
				}
				
				legendContainer.append(legendTable);
				
				return legendContainer;
			},
			initLegend: function() {
				px.graph = $(currentObj);
				/*
				 * graph container
				 */
				var legendContainer = this.prepareDataToLegend();
				
				switch(config.legendPosition) {
					case 's':
						var legend = $('<div>').css('float', 'left')
									   .css('height', 'auto')
									   .css('maxWidth', config.width)
									   .html(legendContainer);
						break;
					case 'w':
						var legend = $('<div>').css('float', 'left')
									   .css('height', 'auto')
									   .css('width', 'auto')
									   .css('position', 'relative')
									   .css('margin', '5px')
									   .html(legendContainer);
						switch (config.direction.toUpperCase()) {
							case 'H':
								legend.css('top', '-33px');
								break;
							case 'V':
								legend.css('top', '-7px');
								break;
						}
						break;
				}
				
				px.graph.append(legend);
			}
		}
		
		/*
		 * Initialize
		 */
		px.init();
		
		if (config.isTooltip) {
			px.initTooltip();
		}
		
		if (config.isLegend) {
			if (config.legendPosition == 's') {
				px.graph.css('maxWidth', config.width);
			}
			
			px.initLegend();
		}
		
		return this;
	}
})(jQuery);
