(function($) {
    $.fn.selectComponent = function(args) {

        var params = null;
        var selectList = null;
        var self = null;
        var events = null;

        function _init() {
            params = $.extend({
                valueList : [],
                defaultValue : false,
                label : '',
                minWidth : ''
            }, args);
            events = [];
        }

        function _create() {
            self.append('<div type="43" t="43" class="form-line container-form"></div>');
            self.find('div.container-form').append('<div style="display:inline-block" class="first"></div>');
            self.find('div.container-form').find('div.first').append(
                '<label class="form-label-up">' + params.label+ '</label>')
            .append('<div class="form-input"> <div class="question-input"><select></select></div></div>');
            selectList = self.find('select');
            if (params.defaultValue)
                selectList.append('<option selected  value="'+ params.defaultValue.id + '">'+ params.defaultValue.label + '</option>');
            for (var idx in params.valueList) {
                selectList.append('<option value="' + params.valueList[idx].id + '">' + params.valueList[idx].label + '</option>');
            }
            selectList.multiselect({
                multiple : false,
                selectedList : 1,
                minWidth : params.minWidth
            });
        }

        function _clear() {
            var selector;
            if (params.defaultValue)
                selector = 'option[value!=' + params.defaultValue.id + ']';
            else
                selector = 'option';
            selectList.find(selector).remove();
            selectList.multiselect('refresh');
        }

        function _loadData(data, selected) {
            for (var idx in data) {
                selectList.append('<option value="' + data[idx].id + '">'+ data[idx].label + '</option>');
            }
            if (selected != undefined) {
                selectList.find('option[value=' + selected +']').attr('selected',true);
            }
            selectList.multiselect('refresh');
        }

        function _bind(){
            selectList.bind('change',function(){
                $(this).data('oldSelected',$(this).val());
            });
        }

        function _unbind(){
            selectList.unbind('change');
        }

        function _build() {
            _init();
            _create();
            _bind();

            $.extend(this, {
                init: function(disable){
                    this.setSelected(-1);
                    if(disable)
                        this.disactivate();
                    else
                        this.activate();
                },
                disactivate : function() {
                    selectList.multiselect('disable');
                },
                activate : function() {
                    selectList.multiselect('enable');
                },
                load : function(data, index) {
                    _clear();
                    _loadData(data, index);
                },
                clear : function() {
                    _clear();
                },
                bind : function(event, action) {
                    selectList.bind(event, action);
                    events.push(event);
                },
                unbind : function(event) {
                    var idx;
                    if(event){
                        if(idx == events.indexOf(event) != -1){
                            selectList.unbind(event);
                            events.splice(idx, 1);
                        }
                    }else{
                        for(var index in events){
                            selectList.unbind(events[index]);
                        }
                        events = [];
                        _unbind();
                    }
                },
                setSelected : function(val) {
                    selectList.val(val);
                    selectList.multiselect('refresh');
                },
                getSelected: function(old){
                    if(old){
                        var val = selectList.data('oldSelected');
                        if(val) return parseInt(val);
                        return -1;
                    }
                    return parseInt(selectList.val());
                },
                retiveElements: function(tab){
                    for(var idx in tab)
                        selectList.find('option[value='+tab[idx]+']').remove();
                    selectList.multiselect('refresh');
                },
                addElements: function(tab){
                    for(var idx in tab)
                        selectList.append('<option value="'+tab[idx].id+'">'+tab[idx].label+'</option>');
                    selectList.multiselect('refresh');
                },
                validation: function(type, rules){
                    return self.find('div.container-form').validator({
                        type: type,
                        rules : rules
                    });
                },
                isCompleted: function(){
                    return selectList.val() != params.defaultValue.id;
                },
                trigger: function(event,data){
                    selectList.trigger(event,data);
                },
                destroy: function(){
                    selectList.multiselect('destory');
                    self.remove();
                }
            });
        }

        var api = $(this).data('selectComponent');
        if (api)
            return api;
        self = $(this);
        api = new _build();
        $(this).data('selectComponent', api);
        return api;
    }

    $.fn.occurrenceComponent = function(args) {

        var params = null;
        var modeElement = null;
        var repeatByMonthWeekBlock = null;
        var repeatElement = null;
        var startElement = null;
        var endElement = null;        
        var self = null;

        function _init() {
            params = $.extend(true,{
                modeList : [{
                    id: 1,
                    label: 'Tous les heures'
                },{
                    id: 2,
                    label: 'Tous les jours'
                },

                {
                    id: 3,
                    label: 'Tous les jours de la semaine'
                },

                {
                    id: 4,
                    label: 'Tous les mois'
                }],
                texts : {
                    label : {
                        mode: 'Récurrent',
                        start : 'Date de début',
                        repeatAll : 'Répéter tous les',
                        hour: 'Heure(s)',
                        day: 'Jour(s)',
                        week: 'Semaine(s)',
                        month: 'Mois',
                        weekRepeat: 'Répéter le',
                        weekRepeatAt: 'à',
                        byMonth: 'Répéter chaque',
                        byMonthSelect: 'du moi',
                        byMonthAt: 'à',
                        end: {
                            never: 'Jamais',
                            number: 'Aprés',
                            numberAt: 'occurrences',
                            at: 'Le',
                            label: 'Fin :'
                        }
                    },
                    days: [ {
                        id:0,
                        label: 'L'
                    },

                    {
                        id:1,
                        label: 'M'
                    },

                    {
                        id:2,
                        label: 'M'
                    },

                    {
                        id:3,
                        label: 'J'
                    },

                    {
                        id:4,
                        label: 'V'
                    },

                    {
                        id:5,
                        label: 'S'
                    },

                    {
                        id:6,
                        label: 'D'
                    },
                    ],
                    validator: {
                        start: 'Vous devez spécifier une date de début',
                        endNumber: 'Vous devez spécifier un nombre positif d\'ocurrence',
                        endAt: 'Vous devez spécifier une date de fin valide'
                    }
                },
                dateFormat: "yy-mm-dd"
            }, args);           
        }

        function _create() {
            self.append('<div class="occurrenceComponent"></div>');
            self.find('div.occurrenceComponent').append('<div class="modeBlock"></div>');
            modeElement = self.find('div.modeBlock');

            self.find('div.occurrenceComponent').append('<div class="repeatByMonthWeekBlock"></div>');
            repeatByMonthWeekBlock = self.find('div.repeatByMonthWeekBlock');

            self.find('div.occurrenceComponent').append('<div class="repeatBlock"></div>');
            repeatElement = self.find('div.repeatBlock');

            self.find('div.occurrenceComponent').append('<div  t="1" style="margin:0;padding:0" class="form-line container-form startBlock"></div>');
            startElement = self.find('div.startBlock');

            self.find('div.occurrenceComponent').append('<div class="endBlock"></div>');
            endElement = self.find('div.endBlock');
            
            _initModeComponent();

            _initRepeatByMonthWeekComponent();

            _initRepeatComponent();

            _initStartComponent();
            
            _initEndComponent();

                      
        }

        function _initModeComponent(){
            modeElement.selectComponent({
                valueList: params.modeList,
                label: params.texts.label.mode,
                minWidth: 220
            });
            _bindModeElement();
        }

        function _initRepeatByMonthWeekComponent(){
            repeatByMonthWeekBlock.append('<div class="selectFrequency"></div>');
            _bindRepeatByMonthWeekComponent();
            
        }
                
        function _initRepeatComponent(){
            _bindRepeatComponent();
            var api = modeElement.selectComponent();            
            repeatElement.trigger('dialog.change.mode',[api.getSelected()]);
        }

        function _initStartComponent(){
            /**
             * Default date : now 
             **/
            var now = new Date();
            
            startElement.input({
                id : '',
                name : 'startInput',
                type : '1',
                label : params.texts.label.start,
                defaultValue : $.datepicker.formatDate('yy-mm-dd', now),
                typeTag : 'input',
                cssInput : 'form-textbox',
                size : 20
            });
            startElement.find('input').datepicker({
                dateFormat: params.dateFormat
            }).attr('size','8').css('width', 'auto');
        }

        function _initEndComponent(){
            endElement.append('<fieldset class="fieldset-container-gray" ></fieldset>');
            endElement.find('fieldset').append('<legend class="fieldset-label">'+params.texts.label.end.label+'</legend>');
            endElement.find('fieldset').append('<div class="fieldset-content"> </div>')
                
            endElement.find('div.fieldset-content').append('<table></table>');
            endElement.find('table').append('<tr style="height:32px;"><td><input type="radio" name="endgroup" id="never"/><div><label>'+params.texts.label.end.never+'</label></div></td></tr>');
            endElement.find('table').append('<tr><td><input type="radio" name="endgroup" id="number"/><div><label>'+params.texts.label.end.number+'</label></div></td></tr>');
            endElement.find('table').append('<tr><td><input type="radio" name="endgroup" id="at"/><div><label>'+params.texts.label.end.at+'</label></div></td></tr>');

            endElement.find('td:eq(1)').append('<div t="1" class="forNumberInput" style="display:inline-block;"></div>');
            endElement.find('td:eq(2)').append('<div t="1" class="forAtInput" style="display:inline-block;"></div>');

            endElement.find('div.forNumberInput').input({
                id : '',
                name : 'forNumberInput',
                type : '1',
                label : '',
                defaultValue : '5',
                typeTag : 'input',
                cssInput : 'form-textbox',
                size : 8
            });
            endElement.find('div.forNumberInput').find('label').remove();
            endElement.find('div.forNumberInput').find('input').bind('keypress', function(e) {
                return ( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57)) ? false : true ;
            }).after('<label style="margin-left:20px;display:inline-block;">'+params.texts.label.end.numberAt+'</label>');

            /**
             * Default date : now + 30 days
             **/
            var now = new Date();
            now.setDate(now.getDate() + 30);
            
            endElement.find('div.forAtInput').input({
                id : '',
                name : 'forAtInput',
                type : '1',
                label : '',
                defaultValue : $.datepicker.formatDate('yy-mm-dd', now),
                typeTag : 'input',
                cssInput : 'form-textbox',
                size : 20
            });
            endElement.find('div.forAtInput').find('input').datepicker({
                dateFormat: params.dateFormat
            }).attr('size','8').css('width', 'auto');
            endElement.find('div.forAtInput').find('label').remove();

            endElement.find('label').parent().css('cssText','width: 170px !important;display: inline-block;');
            _bindEndElement();

            endElement.find('input[id=never]').attr('checked',true).trigger('change');
        }

        function _bindModeElement(){
            var api = modeElement.selectComponent();
            api.bind('change',function(){
                repeatElement.trigger('dialog.change.mode',[$(this).val()]);
                repeatByMonthWeekBlock.trigger('dialog.change.mode',[$(this).val()]);
            });
        }

        function _bindRepeatByMonthWeekComponent(){
            repeatByMonthWeekBlock.bind('dialog.change.mode',function(event,mode){                
                $(this).find('div.selectFrequency').selectComponent().destroy();
                $(this).append('<div class="selectFrequency"></div>');
                var valueList = null;
                switch(parseInt(mode)){
                    case 3:
                        valueList= new Array();
                        for(var i=1;i<31;i++)
                            valueList.push({
                                id:i,
                                label:i
                            });
                        repeatByMonthWeekBlock.find('div.selectFrequency').selectComponent({
                            valueList: valueList,
                            label: params.texts.label.repeatAll,
                            minWidth: 60
                        });
                        repeatByMonthWeekBlock.find('div.selectFrequency').append('<label style="left: 275px;position: relative;top: -22px;">'+params.texts.label.week+'</label>');
                        break;
                    case 4:
                        valueList= new Array();
                        for(var j=1;j<12;j++)
                            valueList.push({
                                id:j,
                                label:j
                            });                        
                        repeatByMonthWeekBlock.find('div.selectFrequency').selectComponent({
                            valueList: valueList,
                            label: params.texts.label.repeatAll,
                            minWidth: 60
                        });
                        repeatByMonthWeekBlock.find('div.selectFrequency').append('<label style="left: 275px;position: relative;top: -22px;">'+params.texts.label.month+'</label>');
                        break;                    
                }
            });
        }
        
        function _bindEndElement(){
            endElement.find('input[type=radio]').bind('change',function(){
                if($(this).attr('id') == 'never' && $(this).is(':checked')){
                    endElement.find('div.forNumberInput').find('input').attr('disabled',true);
                    endElement.find('div.forAtInput').find('input').attr('disabled',true);
                }
                if($(this).attr('id') == 'number' && $(this).is(':checked')){
                    endElement.find('div.forNumberInput').find('input').removeAttr('disabled');
                    endElement.find('div.forAtInput').find('input').attr('disabled',true);
                }
                if($(this).attr('id') == 'at' && $(this).is(':checked')){
                    endElement.find('div.forNumberInput').find('input').attr('disabled',true);
                    endElement.find('div.forAtInput').find('input').removeAttr('disabled');
                }
            });
        }
        
        function _bindRepeatComponent(){                        
            repeatElement.bind('dialog.change.mode',function(event,mode){                
                _clearRepeatComponent();                
                switch(parseInt(mode)){
                    case 1: // by hour                    
                        _sethourComponent();
                        break;
                    case 2: // by day
                        _setdayComponent();
                        break;
                    case 3: // by week
                        _setweekRepeatComponent();
                        break;
                    case 4: //by month
                        _setByMonthComponent();
                        break;
                }
            });
        }

        function _clearRepeatComponent(){
            repeatElement.empty();
        }
        
        function _sethourComponent(value){
            var hours = [];
            for(var i=1;i<13;i++){
                hours.push({
                    id: i,
                    label: i
                });
            }

            repeatElement.append('<div class="selectHour"></div>');
            var api = repeatElement.find('div.selectHour').selectComponent({
                valueList : hours,
                label : params.texts.label.repeatAll,
                minWidth: 60
            });
            repeatElement.find('div.selectHour').append('<label style="left: 275px;position: relative;top: -22px;">'+params.texts.label.hour+'</label>');

            if(value != undefined)
                api.setSelected(value);           
        }

        function _setdayComponent(value){
            var days = [];
            for(var i=1;i<31;i++){
                days.push({
                    id: i,
                    label: i
                });
            }

            repeatElement.append('<div class="selectDay"></div>');
            var api = repeatElement.find('div.selectDay').selectComponent({
                valueList : days,
                label : params.texts.label.repeatAll,
                minWidth: 60
            });
            repeatElement.find('div.selectDay').append('<label style="left: 275px;position: relative;top: -22px;">'+params.texts.label.day+'</label>');

            if(value != undefined)
                api.setSelected(value);
        }

        function _setweekRepeatComponent(value){            
            repeatElement.append('<label class="form-label-up">'+params.texts.label.weekRepeat+'</label>');
            repeatElement.append('<div class="selectDay" t="3" style="display:inline-block;"></div>');            
            repeatElement.find('div.selectDay').append('<div class="question-input"></div>');
            var target = repeatElement.find('div.question-input');

            for(var idx in params.texts.days){
                target.append('<input type="checkbox" value="'+params.texts.days[idx].id+'"><label style="position: relative;top: -2px">' +params.texts.days[idx].label + '</label>');
            }
            
            repeatElement.append('<div class="selectHour" style="display:inline-block;margin-left:20px;position:relative;top: -3px"></div>');
            target = repeatElement.find('div.selectHour');
            var hours = [];
            for(var i=0;i<24;i++){
                hours.push({
                    id: i,
                    label: i+':00'
                });
            }
            var api = target.selectComponent({
                valueList : hours,
                label : params.texts.label.weekRepeatAt,
                minWidth: 80
            });
            target.find('label').css('cssText','width: 20px !important;');
            if(value != undefined){
                api.setSelected(value.hour);
                target = repeatElement.find('div.selectDay');
                for(var index in value.days){
                    target.find('input[value='+value.days[index]+']').attr('checked',true);
                }
            }
        }

        function _setByMonthComponent(value){
            /*
             * Choice frequence by day or week
             */
            repeatElement.append('<div></div>').append($('<div>')
                                               .append('<label class="form-label-up">' + params.texts.label.byMonth + '</label>')
                                               .append('<input id="monthFrequency" typeFrequency="month" type="radio" name="choiceFrequence" checked><label style="position: relative;top: -2px"> jour du mois </label>')
                                               .append('<input id="weekFrequency" typeFrequency="week" type="radio" name="choiceFrequence"><label style="position: relative;top: -2px"> jour de la semaine </label>'));
            _eventsTypeFrequency();
            /*
             * Days
             */
            repeatElement.append('<div id="selectMonthFrequency" class="selectDay" style="height:36px"></div>');
            var target = repeatElement.find('div.selectDay');
            var days = [];
            for(var i=1;i<31;i++){
                days.push({
                    id: i,
                    label: i
                });
            }
            var dayApi = target.selectComponent({
                valueList : days,
                label : '',
                minWidth: 60
            });
            repeatElement.find('div.selectDay:last').append('<label style="position: relative;left:273px;margin: 0 5px;top: -22px">'+params.texts.label.day+'</label>');

            /*
             * Day of week
             */
            repeatElement.append('<div id="selectWeekFrequency" class="selectWeek" style="display:none;height:36px;position: relative;top: 10px;width:446px"></div>');
            var target = repeatElement.find('div.selectWeek');
            for(var idx in params.texts.days){
                target.append('<input type="checkbox" value="'+params.texts.days[idx].id+'"><label style="position: relative;top: -2px">' + params.texts.days[idx].label + '</label>');
            }

            /*
             * Hour
             */
            repeatElement.append('<div class="selectHour" style="position:relative;top: -27px;left: 455px; width: 150px;"></div>');
            target = repeatElement.find('div.selectHour');
            var hours = [];
            for(var j=0;j<24;j++){
                hours.push({
                    id: j,
                    label: j + ':00'
                });
            }
            var hourApi = target.selectComponent({
                valueList : hours,
                label : params.texts.label.byMonthAt,
                minWidth: 100
            });
            target.find('label').css('cssText','width: 20px !important;');
            if(value != undefined){
                dayApi.setSelected(value.day);
                hourApi.setSelected(value.hour);
            }
        }
        

        function _addTipsy(element){
            element.find('span.addElement').tipsy({
                gravity: 's',
                title: function() {
                    return  params.texts.label.add;
                }
            });
            element.find('span.removeElement').tipsy({
                gravity: 'n',
                title: function() {
                    return  params.texts.label.remove;
                }
            });
        }

        function _eventsTypeFrequency() {
            $('#monthFrequency').change(function() {
                $('#selectWeekFrequency').hide();
                $('#selectMonthFrequency').show();
                $('#selectMonthFrequency').find('select option[value=1]').attr('selected', true);
                $('#selectMonthFrequency').find('select').multiselect('refresh');
            });
            $('#weekFrequency').change(function() {
                $('#selectWeekFrequency').show();
                $('#selectWeekFrequency').find('input').each(function() {
                    $(this).attr('checked', false);
                });
                $('#selectMonthFrequency').hide();
            });
        }
        
        function _bind(){
           
        }

        

        function _unbind(){
            
        }

        function _destroy(){
            self.remove();
        }

        function _build() {
            _init();
            _create();
            _bind();           

            $.extend(this, {
                destroy : function() {
                    _unbind();
                    _destroy();
                },
                getValue : function(withValidation) {                    
                    if(withValidation){
                        if(!this.validation())
                            return false;
                    }
                    var mode = modeElement.selectComponent().getSelected();
                    var frequency = null;
                    var repeat = null;
                    switch(parseInt(mode)){
                        case 1: //houre
                            frequency = repeatElement.find('div.selectHour').selectComponent().getSelected();
                            break;
                        case 2: //day
                            frequency = repeatElement.find('div.selectDay').selectComponent().getSelected();
                            break;
                        case 3: // week
                            frequency = repeatByMonthWeekBlock.find('div.selectFrequency').selectComponent().getSelected();
                            var days = [];
                            repeatElement.find('div.selectDay').find('input[type=checkbox]').each(function(){
                                if($(this).is(':checked'))
                                    days.push($(this).attr('value'));
                            });
                            repeat = {
                                days: days,
                                hour: repeatElement.find('div.selectHour').selectComponent().getSelected()
                            };
                            break;
                        case 4: //month
                            frequency = repeatByMonthWeekBlock.find('div.selectFrequency').selectComponent().getSelected();
                            if ($('#monthFrequency').is(':checked')) {
                                repeat = {
                                    isMonth: true,
                                    isWeek: false,
                                    day: [repeatElement.find('div.selectDay').selectComponent().getSelected()],
                                    hour: repeatElement.find('div.selectHour').selectComponent().getSelected()
                                };
                            } else {
                                var days = [];
                                repeatElement.find('div.selectWeek').find('input[type=checkbox]').each(function(){
                                    if($(this).is(':checked'))
                                        days.push($(this).attr('value'));
                                });
                                repeat = {
                                    isMonth: false,
                                    isWeek: true,
                                    days: days,
                                    hour: repeatElement.find('div.selectHour').selectComponent().getSelected()
                                };
                            }
                            break;
                    }

                    var start = startElement.find('input').val();
                    var end = null;

                    if(endElement.find('input[id=never]').is(':checked')){
                        end = {
                            mode: 'never',
                            value: null
                        };
                    }else if(endElement.find('input[id=number]').is(':checked')){
                        end = {
                            mode: 'number',
                            value: endElement.find('div.forNumberInput').find('input').val()
                        };
                    }
                    else{
                        end = {
                            mode: 'at',
                            value: endElement.find('div.forAtInput').find('input').val()
                        };
                    }
                    return {
                        mode: mode,
                        frequency: frequency,
                        repeat: repeat,
                        start: start,
                        end: end
                    };
                },
                setValue: function(data){

                    modeElement.selectComponent().setSelected(data.mode);
                    modeElement.selectComponent().trigger('change');

                    switch(parseInt(data.mode)){
                        case 1: // hour
                            repeatElement.find('div.selectHour').selectComponent().setSelected(data.frequency);
                            break;
                        case 2: // day
                            repeatElement.find('div.selectDay').selectComponent().setSelected(data.frequency);
                            break;
                        case 3: // week
                            repeatByMonthWeekBlock.find('div.selectFrequency').selectComponent().setSelected(data.frequency);
                            repeatElement.find('div.selectDay').find('input[type=checkbox]').each(function(){
                                if($.in_array($(this).attr('value'),data.repeat.days))
                                    $(this).attr('checked',true);
                            });
                            repeatElement.find('div.selectHour').selectComponent().setSelected(data.repeat.hour);
                            break;
                        case 4: //month
                            repeatByMonthWeekBlock.find('div.selectFrequency').selectComponent().setSelected(data.frequency);
                            
                            repeatElement.find('div.selectHour').selectComponent().setSelected(data.repeat.hour);
                            
                            if (data.repeat.isMonth) {
                                $('#weekFrequency').attr('checked', false);
                                $('#monthFrequency').attr('checked', true);
                                $('#monthFrequency').change();

                                repeatElement.find('div.selectDay').selectComponent().setSelected(data.repeat.day);
                            } else {
                                $('#weekFrequency').attr('checked', true);
                                $('#monthFrequency').attr('checked', false);

                                $('#weekFrequency').change();
                                repeatElement.find('div.selectWeek').find('input[type=checkbox]').each(function(){
                                    if($.in_array($(this).attr('value'),data.repeat.days))
                                        $(this).attr('checked',true);
                                });
                            }
                            break;
                    }
                    
                    startElement.find('input').val(data.start);
                    switch(data.end.mode){
                        case 'never':
                            endElement.find('input[id=never]').attr('checked',true).trigger('change');
                            break;
                        case 'number':
                            endElement.find('input[id=number]').attr('checked',true).trigger('change');
                            endElement.find('div.forNumberInput').find('input').val(data.end.value);
                            break;
                        case 'at':
                            endElement.find('input[id=at]').attr('checked',true).trigger('change');
                            endElement.find('div.forAtInput').find('input').val(data.end.value);
                            break;
                    }
                    
                    
                },
                validation: function(){
                    var validity = true;
                    if(parseInt(modeElement.selectComponent().getSelected()) == 2){                        
                        validity = validity && repeatElement.find('div.selectDay').validator({
                            type: 'error',
                            rules : [{
                                control:'required',
                                message: params.texts.validator.endNumber
                            }]
                        });
                    }
                    validity = validity && startElement.validator({
                        type: 'error',
                        rules : [{
                            control:'required',
                            message: params.texts.validator.start
                        }]
                    });
                    startElement.find('.input-validator').css('left', '85px');

                    if(endElement.find('input[id=number]').is(':checked')){
                        validity = validity && endElement.find('div.forNumberInput').validator({
                            type: 'error',
                            rules : [{
                                control:'required',
                                message: params.texts.validator.endNumber
                            }]
                        });
                        endElement.find('div.forNumberInput').find('.input-validator').css('left', '85px');
                    }
                    else if(endElement.find('input[id=at]').is(':checked')){
                        validity = validity && endElement.find('div.forAtInput').validator({
                            type: 'error',
                            rules : [{
                                control:'required',
                                message: params.texts.validator.endAt
                            }]
                        });
                        endElement.find('div.forAtInput').find('.input-validator').css('left', '85px');
                    }
                    return validity;
                },                
                enable: function(){
                    modeElement.selectComponent().activate();
                    repeatElement.find('div.selectHour').selectComponent().activate();
                    if(repeatElement.find('div.selectDay').find('input[type=checkbox]').size() == 0)
                        repeatElement.find('div.selectDay').selectComponent().activate();
                    self.find('input').attr('disabled',false);                    
                    self.css('opacity',1);
                },
                disable: function(){
                    modeElement.selectComponent().disactivate();
                    repeatElement.find('div.selectHour').selectComponent().disactivate();
                    if(repeatElement.find('div.selectDay').find('input[type=checkbox]').size() == 0)
                        repeatElement.find('div.selectDay').selectComponent().disactivate();
                    self.find('input').attr('disabled',true);                   
                    self.css('opacity',0.4);
                }
            });
        }

        var api = $(this).data('occurrenceComponent');
        if (api)
            return api;
        self = $(this);
        api = new _build();
        $(this).data('occurrenceComponent', api);
        return api;
    }


})(jQuery)