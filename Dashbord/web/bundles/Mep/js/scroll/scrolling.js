(function($){
    $.fn.scrolling = function(arg){

        var scrollBox;
        var scrollBoxContainer;
        var scrollBoxContent;
        var draggerContainer;
        var dragger;
        var scrollUpBtn;
        var scrollDownBtn;
        var scrollBoxHorWrapper;

        var totalContent;
        var minDraggerWidth;
        var minDraggerHeight;
        var draggerContainerWidth;
        var btnsScrollTimerX;
        var btnsScrollTo;
        var scrollSpeed;
        var draggerContainerHeight;
        var btnsScrollTimer;
        var visibleHeight;
        var scrollAmount;
        var contentHeight;
        var contentWidth;

        var self = $(this);
        var args;
        var timer;

        function _init(){
            args = $.extend({
                scrollType: 'vertical',
                animSpeed: 100,
                easeType: 'easeOutCirc',
                bottomSpace: '1.05',
                draggerDimType: 'auto',
                mouseWheelSupport: 'yes',
                scrollBtnsSupport: 'yes',
                scrollBtnsSpeed: 10,
                hideDragger: true
            },arg);

            scrollBox = self.find('.customScrollBox:first');
            scrollBoxContainer = self.find('.container:first');
            scrollBoxContent = self.find('.content:first');
            draggerContainer = self.find('.dragger-container:last');

            dragger = self.find('.dragger:last');
            scrollUpBtn = self.find('.scrollUpBtn:last');
            scrollDownBtn = self.find('.scrollDownBtn:last');
            scrollBoxHorWrapper = self.find('.horWrapper:last');

            minDraggerHeight = dragger.height();
            minDraggerWidth = dragger.width();
            contentHeight = scrollBoxContainer.height();
            contentWidth = scrollBoxContainer.width();

            }

        function _create(reloadType){
            if(args.scrollType=="horizontal"){
                var visibleWidth=scrollBox.width();
                scrollBoxHorWrapper.css("width",999999);
                scrollBoxHorWrapper.css("width",scrollBoxContainer.width());

                if(scrollBoxContainer.width()>visibleWidth){ //enable scrollbar if content is long
                    dragger.css("display","block");
                    if(reloadType!="resize" && scrollBoxContainer.width()!=contentWidth){
                        dragger.css("left",0);
                        scrollBoxContainer.css("left",0);
                        contentWidth = scrollBoxContainer.width();
                    }
                    draggerContainer.css("display","block");
                    scrollDownBtn.css("display","inline-block");
                    scrollUpBtn.css("display","inline-block");
                    totalContent=scrollBoxContent.width();
                    draggerContainerWidth=draggerContainer.width();


                    _adjustDraggerWidth();

                    var draggerWidth=dragger.width();
                    dragger.draggable({
                        axis: "x",
                        containment: "parent",
                        drag: function(event, ui) {
                            _scrollX();
                        },
                        stop: function(event, ui) {
                            _draggerRelease();
                        }
                    });

                    //scroll
                    scrollAmount=(totalContent-visibleWidth)/(draggerContainerWidth-draggerWidth);

                } else { //disable scrollbar if content is short
                    dragger.css("left",0).css("display","none"); //reset content scroll
                    scrollBoxContainer.css("left",0);
                    draggerContainer.css("display","none");
                    scrollDownBtn.css("display","none");
                    scrollUpBtn.css("display","none");
                }
            //vertical scrolling ------------------------------
            } else {

                visibleHeight = scrollBox.height();
                draggerContainer.css('height', visibleHeight);
                if(scrollBoxContainer.height()>visibleHeight){ //enable scrollbar if content is long
                    dragger.css("display","block");
                    if(reloadType!="resize" && scrollBoxContainer.height()!=contentHeight){
                        dragger.css("top",0);
                        scrollBoxContainer.css("top",0);
                        contentHeight = scrollBoxContainer.height();
                    }
                    draggerContainer.css("display","block");
                    scrollDownBtn.css("display","inline-block");
                    scrollUpBtn.css("display","inline-block");
                    totalContent = scrollBoxContent.height();
                    draggerContainerHeight = draggerContainer.height();

                    _adjustDraggerHeight();

                    var draggerHeight=dragger.height();

                    dragger.draggable({
                        axis: "y",
                        containment: 'parent',
                        drag: function(event, ui) {
                            _scroll();
                        },
                        stop: function(event, ui) {
                            _draggerRelease();
                        }
                    });

                    //scroll
                    if(args.bottomSpace<1){
                        args.bottomSpace=1; //minimum args.bottomSpace value is 1
                    }
                    scrollAmount=(totalContent-(visibleHeight/args.bottomSpace))/(draggerContainerHeight-draggerHeight);

                } else { //disable scrollbar if content is short
                    dragger.css("top",0).css("display","none"); //reset content scroll
                    scrollBoxContainer.css("top",0);
                    draggerContainer.css("display","none");
                    scrollDownBtn.css("display","none");
                    scrollUpBtn.css("display","none");
                }
            }
        }

        function _scroll(){
            var draggerY=dragger.position().top;
            var targY=-draggerY*scrollAmount;
            var thePos=scrollBoxContainer.position().top-targY;
            scrollBoxContainer.stop().animate({
                top: "-="+thePos
            }, args.animSpeed, args.easeType);
        }

        function _scrollX(){
            var draggerX=dragger.position().left;
            var targX=-draggerX*scrollAmount;
            var thePos=scrollBoxContainer.position().left-targX;
            scrollBoxContainer.stop().animate({
                left: "-="+thePos
            }, args.animSpeed, args.easeType);
        }

        function _draggerPress(){
            dragger.addClass("dragger_pressed");
        }

        function _draggerRelease(){
            dragger.removeClass("dragger_pressed");
        }

        function _btnsScroll(dir){
            if(dir=="down"){
                btnsScrollTo=draggerContainer.height()-dragger.height();
                scrollSpeed=Math.abs(dragger.position().top-btnsScrollTo)*(100/args.scrollBtnsSpeed);
                dragger.stop().animate({
                    top: btnsScrollTo
                }, scrollSpeed,"linear");
            } else {
                btnsScrollTo=0;
                scrollSpeed=Math.abs(dragger.position().top-btnsScrollTo)*(100/args.scrollBtnsSpeed);
                dragger.stop().animate({
                    top: -btnsScrollTo
                }, scrollSpeed,"linear");
            }
            clearInterval(btnsScrollTimer);
            btnsScrollTimer = setInterval( Scroll, 20);
        }

        function _btnsScrollStop(){
            clearInterval(btnsScrollTimer);
            dragger.stop();
        }



        function _btnsScrollXStop(){
            clearInterval(btnsScrollTimerX);
            dragger.stop();
        }

        function _adjustDraggerHeight(){
            /*if(draggerContainer.height()>=visibleHeight){
                draggerContainer.css('height',Math.round((7/10)*visibleHeight));
                draggerContainerHeight = draggerContainer.height();
            }*/
            if(args.draggerDimType=="auto"){
                var adjDraggerHeight=Math.round(totalContent-((totalContent-visibleHeight)*1.3)); //adjust dragger height analogous to content
                if(adjDraggerHeight<=minDraggerHeight){ //minimum dragger height
                    dragger.css("height",minDraggerHeight+"px").css("line-height",minDraggerHeight+"px");
                } else if(adjDraggerHeight>=draggerContainerHeight){
                    dragger.css("height",draggerContainerHeight-10+"px").css("line-height",draggerContainerHeight-10+"px");
                } else {
                    dragger.css("height",adjDraggerHeight+"px").css("line-height",adjDraggerHeight+"px");
                }
            }
        }

        function _adjustDraggerWidth(){
            if(args.draggerDimType=="auto"){
                var adjDraggerWidth=Math.round(totalContent-((totalContent-visibleWidth)*1.3)); //adjust dragger width analogous to content
                if(adjDraggerWidth<=minDraggerWidth){ //minimum dragger width
                    dragger.css("width",minDraggerWidth+"px");
                } else if(adjDraggerWidth>=draggerContainerWidth){
                    dragger.css("width",draggerContainerWidth-10+"px");
                } else {
                    dragger.css("width",adjDraggerWidth+"px");
                }
            }
        }

        function _bind(){
            /* for button */
            if(args.scrollBtnsSupport=="yes"){
                scrollDownBtn.bind('mouseup',function(){
                    if(args.scrollType == 'horizontal'){
                        _btnsScrollXStop();
                    }else{
                        _btnsScrollStop();
                    }
                }).bind('mousedown',function(){
                    if(args.scrollType == 'horizontal'){
                        _btnsScrollX("down");
                    }else{
                        _btnsScroll("down");
                    }
                }).bind('mouseout',function(){
                    if(args.scrollType == 'horizontal'){
                        _btnsScrollXStop();
                    }else{
                        _btnsScrollStop();
                    }
                });
                scrollUpBtn.bind('mouseup',function(){
                    if(args.scrollType == 'horizontal'){
                        _btnsScrollXStop();
                    }else{
                        _btnsScrollStop();
                    }
                }).bind('mousedown',function(){
                    if(args.scrollType == 'horizontal'){
                        _btnsScrollX("up");
                    }else{
                        _btnsScroll("up");
                    }
                }).bind('mouseout',function(){
                    if(args.scrollType == 'horizontal'){
                        _btnsScrollXStop();
                    }else{
                        _btnsScrollStop();
                    }
                });
                scrollDownBtn.bind('click',function(e) {
                    e.preventDefault();
                });
                scrollUpBtn.bind('click',function(e) {
                    e.preventDefault();
                });
                btnsScrollTimerX=0;
                btnsScrollTimer=0;
            }

            /* for mouse */
            if(args.mouseWheelSupport=="yes"){
                scrollBox.unbind("mousewheel");
                scrollBox.bind("mousewheel", function(event, delta) {
                    var vel = Math.abs(delta*10);
                    if(args.scrollType == 'horizontal'){
                        dragger.css("left", dragger.position().left-(delta*vel));
                        _scrollX();
                        if(dragger.position().left<0){
                            dragger.css("left", 0);
                            scrollBoxContainer.stop();
                            _scrollX();
                        }
                        if(dragger.position().left>draggerContainer.width()-dragger.width()){
                            dragger.css("left", draggerContainer.width()-dragger.width());
                            scrollBoxContainer.stop();
                            _scrollX();
                        }
                    }else{
                        dragger.css("top", dragger.position().top-(delta*vel));
                        _scroll();
                        if(dragger.position().top<0){
                            dragger.css("top", 0);
                            scrollBoxContainer.stop();
                            _scroll();
                        }
                        if(dragger.position().top>draggerContainer.height()-dragger.height()){
                            dragger.css("top", draggerContainer.height()-dragger.height());
                            scrollBoxContainer.stop();
                            _scroll();
                        }
                    }
                    return false;
                });
            }

            dragger.bind('mouseup',function(){
                _draggerRelease();
            }).bind('mousedown',function(){
                _draggerPress();
            });

            if(args.hideDragger){
                dragger.hide();
                scrollBox.bind('mousemove',function(){
                   dragger.stop().css('opacity',0.7);
                   dragger.show();
                   scrollBox.mouseleave();
                });
                scrollBox.bind('mouseleave',function(){
                    clearTimeout(timer);
                    timer = setTimeout(function(){ dragger.animate({'opacity':0},1000,function(){ dragger.hide(); });},'1000');
                });
            }
            /* for window */
            $(window).bind('resize',function() {
                if(!dragger.position()) return;
                if(args.scrollType=="horizontal"){
                    if(dragger.position().left>draggerContainer.width()-dragger.width()){
                        dragger.css("left", draggerContainer.width()-dragger.width());
                    }
                } else {
                    if(dragger.position().top>draggerContainer.height()-dragger.height()){
                        dragger.css("top", draggerContainer.height()-dragger.height());
                    }
                }
                _create("resize");
            });
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
                resize: function(){
                    _create('resize');
                },
                destroy: function(){
                    _unbind();
                    _clear();
                }
            });
        }

        function _unbind(){
            scrollDownBtn.unbind('mouseup').unbind('mousedown').unbind('mouseout');
            scrollUpBtn.unbind('mouseup').unbind('mousedown').unbind('mouseout');
            scrollDownBtn.unbind('click');
            scrollUpBtn.unbind('click');
            scrollBox.unbind("mousewheel");
            draggerContainer.unbind('click');
            dragger.unbind('mouseup').unbind('mousedown');
            scrollBox.unbind('mouseover');
            scrollBox.unbind('mouseout');
            $(window).unbind('resize');
        }

        function _clear(){

        }
        $(this).each(function(){
            var c= $(this).data('scrolling');
            if(c)return c;
            c = new _build();
            $(this).data('scrolling',c);
            return c;
        });

    }
})(jQuery)
