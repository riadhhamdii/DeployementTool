/*
*	Class: fileUploader
*	Use: Upload multiple files using jquery
*	Author: John Laniba (http://pixelcone.com)
*	Version: 1.3
*/

(function($) {
    $.fileUploader = {
        version: '1.3',
        count: 0
    };
    $.fn.fileUploader = function(config){
        
        config = $.extend({}, {
            autoUpload: false,
            limit: false,
            buttonUpload: '#px-submit',
            buttonClear: '#px-clear',
            selectFileLabel: 'Select files',
            messageLimitFile: 'Vous ne pouvez pas charger un autre fichier',
            messageExtension: 'Extension incorrect',
            allowedExtension: 'txt|csv|jpg|jpeg|gif|png',
            timeInterval: [1, 2, 4, 2, 1, 5], //Mock percentage for iframe upload
            percentageInterval: [10, 20, 30, 40, 60, 80],
            deleteUrl : '',
            data: [],
            //Callbacks
            onValidationError: null,	//trigger if file is invalid
            onFileChange: function(){},
            onFileRemove: function(){},
            beforeUpload: function(){}, //trigger after the submit button is click: before upload
            afterUpload: function(data){}			
        }, config);
		
        $.fileUploader.count++;
        
	var prefix = Math.floor(Math.random()*11);
	
        //Multiple instance of a Form Container
        var pxUploadForm = 'px-form-' + prefix + '_' + $.fileUploader.count,
        pxWidget = 'px-widget-' + $.fileUploader.count,
        pxButton = 'px-button-' + prefix + '_' + $.fileUploader.count,
        wrapper = '<div id="'+ pxWidget +'" class="px-widget ui-widget"> \
                       <div class="ui-helper-clearfix"> \
                           <div id="'+ pxUploadForm +'-input" class="px-form-input"></div> \
                           <div id="'+ pxButton +'" class="px-buttons"></div> \
                       </div> \
                       <div id="'+ pxUploadForm +'"><div class="upload-warning ui-widget-content ui-corner-all" style="display:none"><center></center></div></div> \
                   </div> \
		',
        pxUploadForm = '#' + pxUploadForm,
        pxUploadFormInput = pxUploadForm + '-input',
        pxButton = '#' + pxButton,
        pxWidget = '#' + pxWidget,
        buttonClearId = null,
	
        itr = 1, //index/itr of file
        isLimit = (config.limit)? true : false,
        limit = 0,
	
        e = this, //set e as this
        selector = $(this).selector,
        buttonM = pxButton + ' input, '+ pxButton +' button'; //Accept button as input and as button

        // Global attributes
        var isFile = false, //this is use to hide other inputs in a form
        progress = 0, //percentage of the upload,
        totalForm = 0,
        timeInterval = config.timeInterval,
        percentageInterval = config.percentageInterval,
        pcount = 0, //progress count to set interval,
        progressTime = null,
        stopUpload = false; //Stop all upload
        var dataUpload = config.data;
        
        /*
         * Wrap all function that is accessable within the plugin
         */
        var px = {	
            /*
             * Initialize and format data
             */
            init: function(){
                px.form = $(e).parents('form:first');
			
                /*
                 * Prepend wrapper markup
                 */
                px.form.before(wrapper);
				
                /*
                 * Wrap input button
                 */
                $(e).wrap('<div class="px-input-button" />');
                px.form.children('.px-input-button').prepend('<span>'+ config.selectFileLabel +'</span>');
				
                /*
                 * Move upload and clear button into id px_button
                 */
                $(pxButton).append(px.form.find(config.buttonUpload + ',' + config.buttonClear))

				
                /*
                 * Transform file input into ui button
                 */
                px.form.find('.px-input-button').button({
                    icons: {
                        primary: "ui-icon-circle-plus"
                    }
                });
                $(config.buttonUpload, pxButton).button({
                    icons: {
                        primary: "ui-icon-arrowthickstop-1-n"
                    }
                });
                $(config.buttonClear, pxButton).button({
                    icons: {
                        primary: "ui-icon-circle-close"
                    }
                });

                /*
                 * Hide all upload and delete all
                 */
                if (limit <= 1) {
                    $(pxButton).hide();
                }
                
                /*
                 * Clear all form data
                 */
                px.clearFormData(px.form);
				
                px.form.hide();
                this.printForm();

                /*
                 * Display uploading file (Edit)
                 */
                for (var x in dataUpload) {
                    uploadDisplayFile(dataUpload[x]);
                }
            },
            /*
             * Clone, format and append form
             */
            submitForm: function(){
                $(config.buttonUpload, pxButton).click();
            },
            /*
             * Reset
             */
            reset: function(){
                $('.delete-' + prefix , pxUploadForm).click();
            },
            /*
             * Reload data
             */
            reloadData: function(data){
                /*
                 * Display uploading file (Edit)
                 */
                for (var x in data) {
                    uploadDisplayFile(data[x]);
                }
            },
            /*
             * Clone, format and append form
             */
            printForm: function(){
                var formId = 'pxupload_' + prefix + '_' + itr,
                iframeId = formId + '_frame';
				
                $('<iframe name="'+ iframeId +'"></iframe>').attr({
                    id: iframeId,
                    src: 'about:blank',
                    style: 'display:none'
                }).prependTo(pxUploadFormInput);
				
                px.form.clone().attr({
                    id: formId,
                    target: iframeId
                }).prependTo(pxUploadFormInput).show();
				
                /*
                 * Show only the file input
                 */
                px.showInputFile( '#'+formId );
			
                /*
                 * This is not good but i left no choice because live function is not working on IE
                 */
                $(selector).unbind('change').change(function() {
                    uploadChange(this);
                });
            },	
            //Show only the file input
            showInputFile: function(form) {
                $(pxUploadFormInput).find(form).children().each(function(){
                    isFile = $(this).is(':file');
                    if (!isFile && $(this).find(':file').length == 0) {
                        $(this).hide();
                    }
                });
            },
            //Hide file input and show other data
            hideInputFile: function($form) {
                $form.children().each(function(){
                    isFile = $(this).is(':file');
                    if (isFile || $(this).find(':file').length > 0) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                });
            },	
            getFileName: function(file) {
                if (file.indexOf('/') > -1){
                    file = file.substring(file.lastIndexOf('/') + 1);
                } else if (file.indexOf('\\') > -1){
                    file = file.substring(file.lastIndexOf('\\') + 1);
                }
				
                return file;
            },	
            validateFileName: function(filename) {
                var extensions = new RegExp(config.allowedExtension + '$', 'i');
                if (extensions.test(filename)){
                    return filename;
                } else {
                    return -1;
                }
            },	
            getFileSize: function(size) {
                var fileSize = 0;
                if (size > 1024 * 1024) {
                    fileSize = (Math.round(size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
                } else {
                    fileSize = (Math.round(size * 100 / 1024) / 100).toString() + 'KB';
                }
                return fileSize;
            },	
            //clear form data
            clearFormData: function(form) {
                $(form).find(':input').each(function() {
                    if (this.type == 'file') {
                        $(this).val('');
                    }
                });
            }	
        }
	
        /*
         * Initialize
         */
        px.init();
		
        /*
         * On Change of upload file
         */
        function uploadChange(fileUploadObj) {
            var currentForm = $(pxUploadFormInput + ' #pxupload_' + prefix + '_' + itr);

            /*
             * Validate file
             */
            var filename = px.getFileName($(fileUploadObj).val());
            if ( px.validateFileName(filename) == -1 ){
                setWarning(config.messageExtension);
                currentForm.find(':file').val('');
                return false;
            }

            if (!$.browser.msie) {
                filename += ' (' + px.getFileSize(fileUploadObj.files[0].size) + ')';
            }

            limit = limit + 1;
            
            /*
             * Limit (a voir ye)
             */
            if (limit > config.limit) {
                limit = limit - 1;
                setWarning(config.messageLimitFile);
                return false;
            } else {
                resetWarning();
            }
            
            /*
             * Display syled markup
             */
            $(pxUploadForm).append(
                $('<div>').attr({
                    'class': 'upload-data pending ui-widget-content ui-corner-all',
                    id: 'pxupload_' + prefix + '_' + itr +'_text'
                })
                .data('formId', 'pxupload_' + prefix + '_' + itr)
                .append('<ul class="actions ui-helper-clearfix"> \
                            <li title="Upload" class="upload-' + prefix +' ui-state-default ui-corner-all"> \
                                <span class="ui-icon ui-icon-circle-triangle-e"></span> \
                            </li> \
                            <li title="Delete" class="delete-' + prefix +' ui-state-default ui-corner-all"> \
                                <span class="ui-icon ui-icon-circle-minus"></span> \
                            </li> \
                        </ul> \
                        <span class="filename">'+ filename +'</span> \
                        <div class="progress ui-helper-clearfix"> \
                            <div class="progressBar" id="progressBar_'+ itr +'"></div> \
                            <div class="percentage">0%</div> \
                        </div> \
                        <div class="status">En attente de chargement...</div> \
                        <div class="counting"></div> \
                    ')
                );
                    
            /*
             * Store input in form
             */
            currentForm.data('input', $(fileUploadObj));
			
            currentForm.appendTo(pxUploadForm + ' #pxupload_' + prefix + '_' + itr +'_text');
			
            /*
             * Hide the input file
             */
            px.hideInputFile(currentForm);

            /*
             * Show all upload and delete all
             */
            if (limit > 1) {
                $(pxButton).show();
            }

            /*
             * Increment for printing form
             */
            itr++;
            
            //Callback on file Changed
            config.onFileChange(px.getFileName($(fileUploadObj).val()));
                                   
            /*
             * Print form
             */
            px.printForm();
			
            afterUploadChange();

            return true;
        }

        /*
         * Display file (Edit)
         */
        function uploadDisplayFile(data) {
            limit = limit + 1;
            
            /*
             * Limit
             */
            if (limit > config.limit) {
                //Your message about exceeding limit
                limit = limit -1;
                return false;
            }

            var formId = '#pxupload_' + prefix + '_' + itr;

            var dataCounting = '';
            if (typeof(data.counting) != 'undefined') {
                dataCounting = data.counting;
            }
            
            /*
             * build html
             */
            $(pxUploadForm).append(
                $('<div>').attr({
                    'class': 'upload-data uploading ui-widget-content ui-corner-all',
                    id: 'pxupload_' + prefix + '_' + itr +'_text',
                    'key': data.id
                })
                .data('formId', 'pxupload_' + prefix + '_' + itr)
                    .append('<ul class="actions ui-helper-clearfix"> \
                                <li title="Delete" class="delete-' + prefix +' ui-state-default ui-corner-all"> \
                                    <span class="ui-icon ui-icon-circle-minus"></span> \
                                </li> \
                             </ul> \
                             <span class="filename">'+ data.label +'</span> \
                             <div class="status">Chargement avec succès</div> \
                             <div class="counting">'+ dataCounting +'</div> \
                    ')
                );

            /*
             * Show all upload and delete all
             */
            if (limit > 1) {
                $(pxButton).show();
            }
            
            /*
             * Increment for printing form
             */
            itr++;
            
            /*
             * Print form
             */
            px.printForm();

            /*
             * Remove form and iframe
             */
            $(formId).remove();
            $(formId + '_frame').remove();

            return true;
        }
		
        /*
         *  After upload change triggers autoupload
         */
        function afterUploadChange() {
            if (config.autoUpload) {
                stopUpload = false;                                               
                /*
                 * Queue and process upload
                 */
                uploadQueue();
            }
        }
		
        /*
         * Queue Upload and send each form to process upload
         */
        function uploadQueue() {
            /*
             * Stop all upload
             */
            if (stopUpload) {
                return;
            }
            
            var totalForm = $(pxUploadForm + ' form').parent('.upload-data').get().length;

            if (totalForm > 0) {
                var pendingUpload = $(pxUploadForm + ' form').parent('.upload-data').get(0);

                var form = $(pendingUpload).children('form');
				
                /*
                 * Before upload
                 */
                beforeEachUpload(form);
				
                iframeUpload(form);
            }
        }
	
        /*
         * Iframe Upload Process
         */
        function iframeUpload(form) {
            //show progress bar
            var uploadData = form.parent();
            uploadData.find('.progress').show();
            var percentage = uploadData.find('.percentage');
            var progressBar = uploadData.find('.progressBar');
		
            pcount = 0;
            dummyProgress(progressBar, percentage);
			
            form.submit();
			
            var id = pxWidget + ' #' + form.attr('id');

            $(id +'_frame').load(function(){
                var data = eval("("+$(this).contents().find('body').html()+")");

                afterEachUpload(form.attr('id'), data);
				
                clearTimeout (progressTime);
                progress = 100;
                percentage.text(progress.toString() + '%');
                progressBar.progressbar({
                    value: progress
                });

                /*
                 * Remove upload button
                 */
                $(id + '_text .upload').remove();

                /*
                 * Add key file 
                 */
                if (data.success) {
                    $(id + '_text').attr('key', data.id);
                    config.afterUpload(data.id);
                }
                
                config.afterUpload(data);
                
                uploadQueue();
            });
        }
		
        /*
         * Show the progress bar to the user
         */
        function dummyProgress(progressBar, percentage) {
            if (percentageInterval[pcount]) {
                progress = percentageInterval[pcount] + Math.floor( Math.random() * 5 + 1 );
                percentage.text(progress.toString() + '%');
                progressBar.progressbar({
                    value: progress
                });
            }
			
            if (timeInterval[pcount]) {
                progressTime = setTimeout(function(){
                    dummyProgress(progressBar, percentage)
                }, timeInterval[pcount] * 1000);
            }
			
            pcount++;
        }
		
        /*
         * Before Upload
         */
        function beforeAllUpload() {
            /*
             * Trigger before upload callback
             */
            $continue = config.beforeUpload(e, pxButton);
            if ($continue === false) {
                return false;
            }
			
            /*
             * Process and queue upload
             */
            uploadQueue();

            return true;
        }
		
        /*
         * Before Each file is uploaded
         */
        function beforeEachUpload($form) {
            var uploadData = $form.parent();
            uploadData.find('.status').text('En cours de chargement...');
            uploadData.removeClass('pending').addClass('uploading');
            
            /*
             * Hide delete button
             */
            uploadData.find('.delete-' + prefix).hide();
            uploadData.find('.upload-' + prefix).remove();
        }
		
        /*
         * After Each file is uploaded
         */
        function afterEachUpload(formId, data) {	
            formId = pxWidget + ' #' + formId;

            var uploadData = $(formId + '_text');
            
            if (data.success) {
                uploadData.children('.status').html( data.message );
            } else {
                uploadData.children('.status').html( data.message );
            }

            /*
             * Show delete button
             */
            uploadData.find('.delete-' + prefix).show();
			
            /*
             *Hide progress bar
             */
            uploadData.find('.progress').hide();
			
            $(formId).remove();
            $(formId + '_frame').remove();
        }

        /*
         * Ajax delete action
         */
        function ajaxDeleteAction(files) {
            if ($.trim(config.deleteUrl).length > 0) {
                /*
                 * Ajax delete file
                 */
                for (var x in files) {
                    $('div:[key="' + files[x] + '"]').block();
                    $('.blockMsg').remove();
                }

                $.ajax({
                    type: 'POST',
                    url: config.deleteUrl,
                    data: { files : files},
                    dataType: 'json',
                    success: function(response) {
                        if (response.success) {
                            for (var x in response.successDeletedFiles) {
                                $('div:[key="' + response.successDeletedFiles[x] + '"]').unblock();
                                
                                var idContainer = $('div:[key="' + response.successDeletedFiles[x] + '"]').attr('id');
                                var lastIndex = idContainer.lastIndexOf('_');

                                var id = idContainer.substring(0,lastIndex);

                                deleteFileContainer('#' + id);
                            }

                            for (var x in response.errorDeletedFiles) {
                                $('div:[key="' + response.errorDeletedFiles[x] + '"]').unblock();
                                $('div:[key="' + response.errorDeletedFiles[x] + '"]').children('.status').html( response.errorMessage );
                            }

                            config.onFileRemove(response.successDeletedFiles);
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
            } else {
                return false;
            }

            return true;
        }

        /*
         * Delete file container
         */
        function deleteFileContainer(id) {
            limit = limit - 1;
            
            $(id + '_text').fadeOut('slow',function(){
                $(id + '_frame').remove();
                $(this).remove();

                /*
                 * Hide all upload and delete all
                 */
                if ($(pxUploadForm + ' .upload-data').size() == 1) {
                    $(pxButton).hide();
                }
            });
        }

        /*
         * Reset warning block
         */
        function resetWarning() {
            $(pxUploadForm).find('center').empty();
            $(pxUploadForm + ' .upload-warning').hide();
        }

        /*
         * Reset warning block
         */
        function setWarning(msg) {
            $(pxUploadForm + ' .upload-warning').show();
            $(pxUploadForm + ' .upload-warning').find('center').html(msg);
        }

        /*
         * Onlick submit button: start all upload
         */
        $(config.buttonUpload, pxButton).click(function(){
            stopUpload = false;

            beforeAllUpload();
        });

        /*
         * Individual Upload
         */
        $('.upload-' + prefix, pxUploadForm).live('click', function(){
            resetWarning();

            var form = $(this).parents('.upload-data').children('form');
            if (form.length > 0) {
                /*
                 * Before upload
                 */
                beforeEachUpload(form);
				
                /*
                 * Upload using iframe
                 */
                iframeUpload(form);
				
                stopUpload = true;
            }
        });
		
        /*
         * Button Clear Event (all delete)
         */
        $(config.buttonClear, pxButton).live('click', function(){
            resetWarning();

            var files = [];
            $(pxUploadForm + ' .upload-data').each(function() {
                if (typeof($(this).attr('key')) != 'undefined') {
                    files.push($(this).attr('key'));
                } else {
                    var idTab = $(this).attr('id').split('_text');

                    deleteFileContainer('#' + idTab[0]);
                }
            });

            if (files.length > 0) {
                ajaxDeleteAction(files);
            }
        });

        /*
         * Delete upload
         */
        $('.delete-' + prefix , pxUploadForm).live('click', function(){
            resetWarning();
            
            var id = pxWidget + ' #' + $(this).parents('.upload-data').data('formId');

            /*
             * Delete file with ajax action
             */
            if (typeof($(id+'_text').attr('key')) != 'undefined') {
                ajaxDeleteAction([$(id+'_text').attr('key')]);

                return true;
            } 

            deleteFileContainer(id);
        });
		
        /* Icons hover */
        $(".px-widget .actions li").live("mouseover mouseout", function(event) {
            if ( event.type == "mouseover" ) {
                $(this).addClass('ui-state-hover');
            } else {
                $(this).removeClass("ui-state-hover");
            }
        });
	
        return px;
    }
})(jQuery);