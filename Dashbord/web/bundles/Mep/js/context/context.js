(function($){
    
    $.fn.contextMenu = function(params){

        var self = null;
        var plugin = null;
        var vakata = new Object();

        function _init(){
            params = $.extend(true,{
                hotkeys: true,
                trigger: 'div.rb-i',
                follow : 'i',
                launcher: 'contextmenu',
                items: null,
                themes: false
            },params);
        }
        
        vakata.context={

            cnt:$("<div id='vakata-contextmenu'>"),
            vis:false,
            tgt:false,
            par:false,
            func:false,
            data:false,
            base: 0,

            getContextmenu: function(e){
                if($.isFunction(params.items))
                    return params.items.call(this,e);

                return null;
            },
            
            show:function(l,k,i,g,f,b){
                var e=vakata.context.parse(l,0),c,j;
                if(!e){
                    return
                }
                vakata.context.vis=true;
                vakata.context.tgt=k;
                vakata.context.par=b||k||null;
                vakata.context.data=f||null;
                vakata.context.cnt.html(e).css({
                    visibility:"hidden",
                    display:"block",
                    left:0,
                    top:0
                });
                c=vakata.context.cnt.height();
                j=vakata.context.cnt.width();
                if(i+j>$(document).width()){
                    i=$(document).width()-(j+5);
                    vakata.context.cnt.find("li > ul").addClass("right")
                }
                if(g+c>$(document).height()){
                    g=g-(c+k[0].offsetHeight);
                    vakata.context.cnt.find("li > ul").addClass("bottom")
                }
                vakata.context.cnt.css({
                    left:i,
                    top:g
                }).find("li:has(ul)").bind("mouseenter",function(o){
                    var d=$(document).width(),n=$(document).height(),m=$(this).children("ul").show();
                    if(d!==$(document).width()){
                        m.toggleClass("right")
                    }
                    if(n!==$(document).height()){
                        m.toggleClass("bottom")
                    }
                }).bind("mouseleave",function(d){
                    $(this).children("ul").hide()
                }).end().css({
                    visibility:"visible"
                }).show();
                $(document).triggerHandler("context_show.vakata",[b]);
            },
            hide:function(){
                vakata.context.vis=false;
                vakata.context.cnt.attr("class","").hide();
                $(document).triggerHandler("context_hide.vakata")
            },
            parse:function(e,d){
                if(!e){
                    return false
                }
                var f="",c=false,b=true;
                if(d == 0){
                    vakata.context.func={};
                    vakata.context.extrat={};
                }
                f+="<ul>";

                $.each(e,function(g,h){
                    g = g + vakata.context.base;
                    if(!h){
                        return true
                    }
                    vakata.context.func[g]=h.action;
                    if(h.extrat)
                        vakata.context.extrat[g]=h.extrat;
                    else
                        vakata.context.extrat[g]= null;
                    if(!b&&h.separator_before){
                        f+="<li class='vakata-separator vakata-separator-before'></li>"
                    }
                    b=false;
                    f+="<li class='"+(h._class||"")+(h._disabled?" contextmenu-disabled ":"")+"'><ins ";
                    if(h.icon&&h.icon.indexOf("/")===-1){
                        f+=" class='"+h.icon+"' "
                    }
                    if(h.icon&&h.icon.indexOf("/")!==-1){
                        f+=" style='background:url("+h.icon+") center center no-repeat;' "
                    }
                    f+=">&#160;</ins><a href='#' rel='"+g+"'>";
                    if(h.submenu){
                        f+="<span style='float:right;'>&raquo;</span>"
                    }
                    f+=h.label+"</a>";
                    if(h.submenu){
                        vakata.context.base++;
                        c=vakata.context.parse(h.submenu,g);
                        if(c){
                            f+=c
                        }
                    }
                    f+="</li>";
                    if(h.separator_after){
                        f+="<li class='vakata-separator vakata-separator-after'></li>";
                        b=true
                    }
                });
                f=f.replace(/<li class\='vakata-separator vakata-separator-after'\><\/li\>$/,"");
                f+="</ul>";
                return f.length>10?f:false
            },
            exec:function(b){
                if($.isFunction(vakata.context.func[b])){
                    vakata.context.func[b].call(vakata.context.data,vakata.context.par,vakata.context.extrat[b]);
                    return true
                }else{
                    return false
                }
            }
        };
        
        function _create(){
                                   
            vakata.context.cnt.delegate("a","click",function(c){
                c.preventDefault()
            }).delegate("a","mouseup",function(c){
                if(!$(this).parent().hasClass("jstree-contextmenu-disabled")&&vakata.context.exec($(this).attr("rel"))){
                    vakata.context.hide()
                }else{
                    $(this).blur()
                }
            }).delegate("a","mouseover",function(){
                vakata.context.cnt.find(".vakata-hover").removeClass("vakata-hover")
            }).appendTo("body");

            $(document).bind("mousedown",function(c){
                if(vakata.context.vis&&!$.contains(vakata.context.cnt[0],c.target)){
                    vakata.context.hide()
                }
            });
            
            if(params.hotkeys){
                $(document).bind("keydown","up",function(c){
                    if(vakata.context.vis){
                        var d=vakata.context.cnt.find("ul:visible").last().children(".vakata-hover").removeClass("vakata-hover").prevAll("li:not(.vakata-separator)").first();
                        if(!d.length){
                            d=vakata.context.cnt.find("ul:visible").last().children("li:not(.vakata-separator)").last()
                        }
                        d.addClass("vakata-hover");
                        c.stopImmediatePropagation();
                        c.preventDefault()
                    }
                }).bind("keydown","down",function(c){
                    if(vakata.context.vis){
                        var d=vakata.context.cnt.find("ul:visible").last().children(".vakata-hover").removeClass("vakata-hover").nextAll("li:not(.vakata-separator)").first();
                        if(!d.length){
                            d=vakata.context.cnt.find("ul:visible").last().children("li:not(.vakata-separator)").first()
                        }
                        d.addClass("vakata-hover");
                        c.stopImmediatePropagation();
                        c.preventDefault()
                    }
                }).bind("keydown","right",function(c){
                    if(vakata.context.vis){
                        vakata.context.cnt.find(".vakata-hover").children("ul").show().children("li:not(.vakata-separator)").removeClass("vakata-hover").first().addClass("vakata-hover");
                        c.stopImmediatePropagation();
                        c.preventDefault()
                    }
                }).bind("keydown","left",function(c){
                    if(vakata.context.vis){
                        vakata.context.cnt.find(".vakata-hover").children("ul").hide().children(".vakata-separator").removeClass("vakata-hover");
                        c.stopImmediatePropagation();
                        c.preventDefault()
                    }
                }).bind("keydown","esc",function(c){
                    vakata.context.hide();
                    c.preventDefault()
                }).bind("keydown","space",function(c){
                    vakata.context.cnt.find(".vakata-hover").last().children("a").click();
                    c.preventDefault()
                })
            }
        }
        
        plugin = {
            enable: true,
            contextmenu: false,            
            _init:function(){
                
                self.delegate(params.trigger,params.launcher,$.proxy(function(b){
                    b.preventDefault();
                    if(!this.enable)
                        return;
                    this.showContextmenu(b.currentTarget,b.pageX,b.pageY);

                },this)).bind('destroy.vakata',$.proxy(function(){

                    if(this.contextmenu){
                        vakata.context.hide()
                    }

                },this));

                $(document).bind('context_hide.vakata',$.proxy(function(){
                    this.contextmenu=false
                },this));
                
            },
            _disable: function(){
                if(this.contextmenu){
                    vakata.context.hide();
                }
                    enable: false;
            },
            _enable: function(){
                enable: true;
            },
            _destroy: function(){
                
                self.undelegate(params.trigger,'contextmenu').unbind('destroy.vakata');
                $(document).unbind('context_hide.vakata');
                
            },           
            showContextmenu:function(e,b,g){
                var d = vakata.context.getContextmenu(e);

                if(!d) return;
                
                var c = e.children(params.follow+':visible:eq(0)');
                var f = null;

                if(!c) c = e;
                    
                if(typeof b==="undefined"||typeof g==="undefined"){
                    f = c.offset();
                    b = f.left;
                    g = f.top;
                }
                    
                if($.isFunction(d)){
                    d= d.call(this,e)
                }

                this.contextmenu = true;

                vakata.context.show(d,c,b,g,this,e);

                if(params.themes){
                    vakata.context.cnt.attr("class",params.themes)
                }
            }
            
        };

        function _build(){
            _init();
            _create();
            plugin._init();

            $.extend(this,{
                setItems: function(items){
                    params.items = items;
                },
                getItems: function(){
                    return params.items;
                },
                disable: function(){
                    plugin.disable();
                },
                enable: function(){
                    plugin.enable();
                },
                triggerShow: function(e){
                    plugin.showContextmenu(e);
                },
                bindShow: function(a){
                    $(document).bind("context_show.vakata",function(e,b){
                        a.call(this,b);
                    });
                },
                unbindShow: function(){
                    $(document).bind("context_show.vakata");
                },
                destroy: function(){
                    _destroy();
                }
            });
        }

        function _destroy(){           
            self.trigger('destroy.vakata');
            plugin._destroy();
            self.data('contextMenu',null);
        }
        
        var c = $(this).data('contextMenu');
        if(c)return c;
        self = $(this);
        c = new _build();
        $(this).data('contextMenu',c);
        return c;
    }

})(jQuery)