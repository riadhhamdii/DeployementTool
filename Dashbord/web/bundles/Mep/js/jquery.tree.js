"use strict";
(function(a){
    a.vakata={};

    a.vakata.css={
        get_css:function(f,c,d){
            f=f.toLowerCase();
            var e=d.cssRules||d.rules,b=0;
            do{
                if(e.length&&b>e.length+5){
                    return false
                }
                if(e[b].selectorText&&e[b].selectorText.toLowerCase()==f){
                    if(c===true){
                        if(d.removeRule){
                            d.removeRule(b)
                        }
                        if(d.deleteRule){
                            d.deleteRule(b)
                        }
                        return true
                    }else{
                        return e[b]
                    }
                }
            }while(e[++b]);
            return false
        },
        add_css:function(c,b){
            if(a.jstree.css.get_css(c,false,b)){
                return false
            }
            if(b.insertRule){
                b.insertRule(c+" { }",0)
            }else{
                b.addRule(c,null,0)
            }
            return a.vakata.css.get_css(c)
        },
        remove_css:function(c,b){
            return a.vakata.css.get_css(c,true,b)
        },
        add_sheet:function(c){
            var b;
            if(c.str){
                b=document.createElement("style");
                b.setAttribute("type","text/css");
                if(b.styleSheet){
                    document.getElementsByTagName("head")[0].appendChild(b);
                    b.styleSheet.cssText=c.str
                }else{
                    b.appendChild(document.createTextNode(c.str));
                    document.getElementsByTagName("head")[0].appendChild(b)
                }
                return b.sheet||b.styleSheet
            }
            if(c.url){
                if(document.createStyleSheet){
                    try{
                        b=document.createStyleSheet(c.url)
                    }catch(d){}
                }else{
                    b=document.createElement("link");
                    b.rel="stylesheet";
                    b.type="text/css";
                    b.media="all";
                    b.href=c.url;
                    document.getElementsByTagName("head")[0].appendChild(b);
                    return b.styleSheet
                }
            }
        }
    }
})(jQuery);
(function(e){
    var f=[],c=-1,b={},a={},d=false;
    e.fn.jstree=function(j){
        var g=(typeof j=="string"),h=Array.prototype.slice.call(arguments,1),i=this;
        if(!g&&e.meta){
            h.push(e.metadata.get(this).jstree)
        }
        j=!g&&h.length?e.extend.apply(null,[true,j].concat(h)):j;
        if(g&&j.substring(0,1)=="_"){
            return i
        }
        if(g){
            this.each(function(){
                var k=f[e.data(this,"jstree-instance-id")],l=(k&&e.isFunction(k[j]))?k[j].apply(k,h):k;
                if(typeof l!=="undefined"&&(j.indexOf("is_"===0)||(l!==true&&l!==false))){
                    i=l;
                    return false
                }
            })
        }else{
            this.each(function(){
                var l=e.data(this,"jstree-instance-id"),k=false;
                if(typeof l!=="undefined"&&f[l]){
                    f[l].destroy()
                }
                l=parseInt(f.push({}),10)-1;
                e.data(this,"jstree-instance-id",l);
                if(!j){
                    j={}
                }
                j.plugins=e.isArray(j.plugins)?j.plugins:e.jstree.defaults.plugins;
                if(e.inArray("core",j.plugins)===-1){
                    j.plugins.unshift("core")
                }
                k=e.extend(true,{},e.jstree.defaults,j);
                k.plugins=j.plugins;
                e.each(b,function(m,n){
                    if(e.inArray(m,k.plugins)===-1){
                        k[m]=null;
                        delete k[m]
                    }
                });
                f[l]=new e.jstree._instance(l,e(this).addClass("jstree jstree-"+l),k);
                e.each(f[l]._get_settings().plugins,function(m,n){
                    f[l].data[n]={}
                });
                e.each(f[l]._get_settings().plugins,function(m,n){
                    if(b[n]){
                        b[n].__init.apply(f[l])
                    }
                });
                f[l].init()
            })
        }
        return i
    };

    e.jstree={
        defaults:{
            plugins:[]
        },
        _focused:function(){
            return f[c]||null
        },
        _reference:function(g){
            if(f[g]){
                return f[g]
            }
            var h=e(g);
            if(!h.length&&typeof g==="string"){
                h=e("#"+g)
            }
            if(!h.length){
                return null
            }
            return f[h.closest(".jstree").data("jstree-instance-id")]||null
        },
        _instance:function(h,g,i){
            this.data={
                core:{}
            };

            this.get_settings=function(){
                return e.extend(true,{},i)
            };

            this._get_settings=function(){
                return i
            };

            this.get_index=function(){
                return h
            };

            this.get_container=function(){
                return g
            };

            this._set_settings=function(j){
                i=e.extend(true,{},i,j)
            }
        },
        _fn:{},
        plugin:function(g,h){
            h=e.extend({},{
                __init:e.noop,
                __destroy:e.noop,
                _fn:{},
                defaults:false
            },h);
            b[g]=h;
            e.jstree.defaults[g]=h.defaults;
            e.each(h._fn,function(j,k){
                k.plugin=g;
                k.old=e.jstree._fn[j];
                e.jstree._fn[j]=function(){
                    var i,m=k,l=Array.prototype.slice.call(arguments),o=new e.Event("before.jstree"),n=false;
                    do{
                        if(m&&m.plugin&&e.inArray(m.plugin,this._get_settings().plugins)!==-1){
                            break
                        }
                        m=m.old
                    }while(m);
                    if(!m){
                        return
                    }
                    i=this.get_container().triggerHandler(o,{
                        func:j,
                        inst:this,
                        args:l
                    });
                    if(i===false){
                        return
                    }
                    if(typeof i!=="undefined"){
                        l=i
                    }
                    if(j.indexOf("_")===0){
                        i=m.apply(this,l)
                    }else{
                        i=m.apply(e.extend({},this,{
                            __callback:function(p){
                                this.get_container().triggerHandler(j+".jstree",{
                                    inst:this,
                                    args:l,
                                    rslt:p,
                                    rlbk:n
                                })
                            },
                            __rollback:function(){
                                n=this.get_rollback();
                                return n
                            },
                            __call_old:function(p){
                                return m.old.apply(this,(p?Array.prototype.slice.call(arguments,1):l))
                            }
                        }),l)
                    }
                    return i
                };

                e.jstree._fn[j].old=k.old;
                e.jstree._fn[j].plugin=g
            })
        },
        rollback:function(g){
            if(g){
                if(!e.isArray(g)){
                    g=[g]
                }
                e.each(g,function(h,j){
                    f[j.i].set_rollback(j.h,j.d)
                })
            }
        }
    };

    e.jstree._fn=e.jstree._instance.prototype={};

    e(function(){
        var i=navigator.userAgent.toLowerCase(),h=(i.match(/.+?(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],g=".jstree ul, .jstree li { display:block; margin:0 0 0 0; padding:0 0 0 0; list-style-type:none; } .jstree li { display:block; min-height:18px; line-height:18px; white-space:nowrap; margin-left:18px; } .jstree-rtl li { margin-left:0; margin-right:18px; } .jstree > ul > li { margin-left:0px; } .jstree-rtl > ul > li { margin-right:0px; } .jstree ins { display:inline-block; text-decoration:none; width:18px; height:18px; margin:0 0 0 0; padding:0; } .jstree a { display:inline-block; line-height:16px; height:16px; color:black; white-space:nowrap; text-decoration:none; padding:1px 2px; margin:0; } .jstree a:focus { outline: none; } .jstree a > ins { height:16px; width:16px; } .jstree a > .jstree-icon { margin-right:3px; } .jstree-rtl a > .jstree-icon { margin-left:3px; margin-right:0; } li.jstree-open > ul { display:block; } li.jstree-closed > ul { display:none; } ";
        if(/msie/.test(i)&&parseInt(h,10)==6){
            d=true;
            g+=".jstree li { height:18px; margin-left:0; margin-right:0; } .jstree li li { margin-left:18px; } .jstree-rtl li li { margin-left:0px; margin-right:18px; } li.jstree-open ul { display:block; } li.jstree-closed ul { display:none !important; } .jstree li a { display:inline; border-width:0 !important; padding:0px 2px !important; } .jstree li a ins { height:16px; width:16px; margin-right:3px; } .jstree-rtl li a ins { margin-right:0px; margin-left:3px; } "
        }
        if(/msie/.test(i)&&parseInt(h,10)==7){
            g+=".jstree li a { border-width:0 !important; padding:0px 2px !important; } "
        }
        e.vakata.css.add_sheet({
            str:g
        })
    });
    e.jstree.plugin("core",{
        __init:function(){
            this.data.core.to_open=e.map(e.makeArray(this.get_settings().core.initially_open),function(g){
                return"#"+g.toString().replace(/^#/,"").replace("\\/","/").replace("/","\\/")
            })
        },
        defaults:{
            html_titles:false,
            animation:500,
            initially_open:[],
            rtl:false,
            strings:{
                loading:"Loading ...",
                new_node:"New node"
            }
        },
        _fn:{
            init:function(){
                this.set_focus();
                if(this._get_settings().core.rtl){
                    this.get_container().addClass("jstree-rtl").css("direction","rtl")
                }
                this.get_container().html("<ul><li class='jstree-last jstree-leaf'><ins>&#160;</ins><a class='jstree-loading' href='#'><ins class='jstree-icon'>&#160;</ins>"+this._get_settings().core.strings.loading+"</a></li></ul>");
                this.data.core.li_height=this.get_container().find("ul li.jstree-closed, ul li.jstree-leaf").eq(0).height()||18;
                this.get_container().delegate("li > ins","click.jstree",e.proxy(function(h){
                    var g=e(h.target);
                    if(g.is("ins")&&h.pageY-g.offset().top<this.data.core.li_height){
                        this.toggle_node(g)
                    }
                },this)).bind("mousedown.jstree",e.proxy(function(){
                    this.set_focus()
                },this)).bind("dblclick.jstree",function(h){
                    var i;
                    if(document.selection&&document.selection.empty){
                        document.selection.empty()
                    }else{
                        if(window.getSelection){
                            i=window.getSelection();
                            try{
                                i.removeAllRanges();
                                i.collapse()
                            }catch(g){}
                        }
                    }
                });
                this.__callback();
                this.load_node(-1,function(){
                    this.loaded();
                    this.reopen()
                })
            },
            destroy:function(){
                var g,k=this.get_index(),h=this._get_settings(),j=this;
                e.each(h.plugins,function(l,n){
                    try{
                        b[n].__destroy.apply(j)
                    }catch(m){}
                });
                this.__callback();
                if(this.is_focused()){
                    for(g in f){
                        if(f.hasOwnProperty(g)&&g!=k){
                            f[g].set_focus();
                            break
                        }
                    }
                }
                if(k===c){
                    c=-1
                }
                this.get_container().unbind(".jstree").undelegate(".jstree").removeData("jstree-instance-id").find("[class^='jstree']").andSelf().attr("class",function(){
                    return this.className.replace(/jstree[^ ]*|$/ig,"")
                });
                f[k]=null;
                delete f[k]
            },
            save_opened:function(){
                var g=this;
                this.data.core.to_open=[];
                this.get_container().find(".jstree-open").each(function(){
                    g.data.core.to_open.push("#"+this.id.toString().replace(/^#/,"").replace("\\/","/").replace("/","\\/"))
                });
                this.__callback(g.data.core.to_open)
            },
            reopen:function(h){
                var k=this,g=true,j=[],i=[];
                if(!h){
                    this.data.core.reopen=false;
                    this.data.core.refreshing=true
                }
                if(this.data.core.to_open.length){
                    e.each(this.data.core.to_open,function(l,m){
                        if(m=="#"){
                            return true
                        }
                        if(e(m).length&&e(m).is(".jstree-closed")){
                            j.push(m)
                        }else{
                            i.push(m)
                        }
                    });
                    if(j.length){
                        this.data.core.to_open=i;
                        e.each(j,function(l,m){
                            k.open_node(m,function(){
                                k.reopen(true)
                            },true)
                        });
                        g=false
                    }
                }
                if(g){
                    if(this.data.core.reopen){
                        clearTimeout(this.data.core.reopen)
                    }
                    this.data.core.reopen=setTimeout(function(){
                        k.__callback({},k)
                    },50);
                    this.data.core.refreshing=false
                }
            },
            refresh:function(g){
                var h=this;
                this.save_opened();
                if(!g){
                    g=-1
                }
                g=this._get_node(g);
                if(!g){
                    g=-1
                }
                if(g!==-1){
                    g.children("UL").remove()
                }
                this.load_node(g,function(){
                    h.__callback({
                        obj:g
                    });
                    h.reopen()
                })
            },
            loaded:function(){
                this.__callback()
            },
            set_focus:function(){
                var g=e.jstree._focused();
                if(g&&g!==this){
                    g.get_container().removeClass("jstree-focused")
                }
                if(g!==this){
                    this.get_container().addClass("jstree-focused");
                    c=this.get_index()
                }
                this.__callback()
            },
            is_focused:function(){
                return c==this.get_index()
            },
            _get_node:function(g){
                var h=e(g,this.get_container());
                if(h.is(".jstree")||g==-1){
                    return -1
                }
                h=h.closest("li",this.get_container());
                return h.length?h:false
            },
            _get_next:function(h,g){
                h=this._get_node(h);
                if(h===-1){
                    return this.get_container().find("> ul > li:first-child")
                }
                if(!h.length){
                    return false
                }
                if(g){
                    return(h.nextAll("li").size()>0)?h.nextAll("li:eq(0)"):false
                }
                if(h.hasClass("jstree-open")){
                    return h.find("li:eq(0)")
                }else{
                    if(h.nextAll("li").size()>0){
                        return h.nextAll("li:eq(0)")
                    }else{
                        return h.parentsUntil(".jstree","li").next("li").eq(0)
                    }
                }
            },
            _get_prev:function(h,g){
                h=this._get_node(h);
                if(h===-1){
                    return this.get_container().find("> ul > li:last-child")
                }
                if(!h.length){
                    return false
                }
                if(g){
                    return(h.prevAll("li").length>0)?h.prevAll("li:eq(0)"):false
                }
                if(h.prev("li").length){
                    h=h.prev("li").eq(0);
                    while(h.hasClass("jstree-open")){
                        h=h.children("ul:eq(0)").children("li:last")
                    }
                    return h
                }else{
                    var i=h.parentsUntil(".jstree","li:eq(0)");
                    return i.length?i:false
                }
            },
            _get_parent:function(g){
                g=this._get_node(g);
                if(g==-1||!g.length){
                    return false
                }
                var h=g.parentsUntil(".jstree","li:eq(0)");
                return h.length?h:-1
            },
            _get_children:function(g){
                g=this._get_node(g);
                if(g===-1){
                    return this.get_container().children("ul:eq(0)").children("li")
                }
                if(!g.length){
                    return false
                }
                return g.children("ul:eq(0)").children("li")
            },
            get_path:function(i,g){
                var h=[],j=this;
                i=this._get_node(i);
                if(i===-1||!i||!i.length){
                    return false
                }
                i.parentsUntil(".jstree","li").each(function(){
                    h.push(g?this.id:j.get_text(this))
                });
                h.reverse();
                h.push(g?i.attr("id"):this.get_text(i));
                return h
            },
            is_open:function(g){
                g=this._get_node(g);
                return g&&g!==-1&&g.hasClass("jstree-open")
            },
            is_closed:function(g){
                g=this._get_node(g);
                return g&&g!==-1&&g.hasClass("jstree-closed")
            },
            is_leaf:function(g){
                g=this._get_node(g);
                return g&&g!==-1&&g.hasClass("jstree-leaf")
            },
            open_node:function(j,k,h){
                j=this._get_node(j);
                if(!j.length){
                    return false
                }
                if(!j.hasClass("jstree-closed")){
                    if(k){
                        k.call()
                    }
                    return false
                }
                var i=h||d?0:this._get_settings().core.animation,g=this;
                if(!this._is_loaded(j)){
                    j.children("a").addClass("jstree-loading");
                    this.load_node(j,function(){
                        g.open_node(j,k,h)
                    },k)
                }else{
                    if(i){
                        j.children("ul").css("display","none")
                    }
                    j.removeClass("jstree-closed").addClass("jstree-open").children("a").removeClass("jstree-loading");
                    if(i){
                        j.children("ul").stop(true).slideDown(i,function(){
                            this.style.display=""
                        })
                    }
                    this.__callback({
                        obj:j
                    });
                    if(k){
                        k.call()
                    }
                }
            },
            close_node:function(i,g){
                i=this._get_node(i);
                var h=g||d?0:this._get_settings().core.animation;
                if(!i.length||!i.hasClass("jstree-open")){
                    return false
                }
                if(h){
                    i.children("ul").attr("style","display:block !important")
                }
                i.removeClass("jstree-open").addClass("jstree-closed");
                if(h){
                    i.children("ul").stop(true).slideUp(h,function(){
                        this.style.display=""
                    })
                }
                this.__callback({
                    obj:i
                })
            },
            toggle_node:function(g){
                g=this._get_node(g);
                if(g.hasClass("jstree-closed")){
                    return this.open_node(g)
                }
                if(g.hasClass("jstree-open")){
                    return this.close_node(g)
                }
            },
            open_all:function(h,g){
                h=h?this._get_node(h):this.get_container();
                if(!h||h===-1){
                    h=this.get_container()
                }
                if(g){
                    h=h.find("li.jstree-closed")
                }else{
                    g=h;
                    if(h.is(".jstree-closed")){
                        h=h.find("li.jstree-closed").andSelf()
                    }else{
                        h=h.find("li.jstree-closed")
                    }
                }
                var i=this;
                h.each(function(){
                    var j=this;
                    if(!i._is_loaded(this)){
                        i.open_node(this,function(){
                            i.open_all(j,g)
                        },true)
                    }else{
                        i.open_node(this,false,true)
                    }
                });
                if(g.find("li.jstree-closed").length===0){
                    this.__callback({
                        obj:g
                    })
                }
            },
            close_all:function(g){
                var h=this;
                g=g?this._get_node(g):this.get_container();
                if(!g||g===-1){
                    g=this.get_container()
                }
                g.find("li.jstree-open").andSelf().each(function(){
                    h.close_node(this)
                });
                this.__callback({
                    obj:g
                })
            },
            clean_node:function(g){
                g=g&&g!=-1?e(g):this.get_container();
                g=g.is("li")?g.find("li").andSelf():g.find("li");
                g.removeClass("jstree-last").filter("li:last-child").addClass("jstree-last").end().filter(":has(li)").not(".jstree-open").removeClass("jstree-leaf").addClass("jstree-closed");
                g.not(".jstree-open, .jstree-closed").addClass("jstree-leaf").children("ul").remove();
                this.__callback({
                    obj:g
                })
            },
            get_rollback:function(){
                this.__callback();
                return{
                    i:this.get_index(),
                    h:this.get_container().children("ul").clone(true),
                    d:this.data
                }
            },
            set_rollback:function(g,h){
                this.get_container().empty().append(g);
                this.data=h;
                this.__callback()
            },
            load_node:function(i,g,h){
                this.__callback({
                    obj:i
                })
            },
            _is_loaded:function(g){
                return true
            },
            create_node:function(l,g,k,n,h){
                l=this._get_node(l);
                g=typeof g==="undefined"?"last":g;
                var m=e("<li>"),j=this._get_settings().core,i;
                if(l!==-1&&!l.length){
                    return false
                }
                if(!h&&!this._is_loaded(l)){
                    this.load_node(l,function(){
                        this.create_node(l,g,k,n,true)
                    });
                    return false
                }
                this.__rollback();
                if(typeof k==="string"){
                    k={
                        data:k
                    }
                }
                if(!k){
                    k={}
                }
                if(k.attr){
                    m.attr(k.attr)
                }
                if(k.state){
                    m.addClass("jstree-"+k.state)
                }
                if(!k.data){
                    k.data=j.strings.new_node
                }
                if(!e.isArray(k.data)){
                    i=k.data;
                    k.data=[];
                    k.data.push(i)
                }
                e.each(k.data,function(p,o){
                    i=e("<a>");
                    if(e.isFunction(o)){
                        o=o.call(this,k)
                    }
                    if(typeof o=="string"){
                        i.attr("href","#")[j.html_titles?"html":"text"](o)
                    }else{
                        if(!o.attr){
                            o.attr={}
                        }
                        if(!o.attr.href){
                            o.attr.href="#"
                        }
                        i.attr(o.attr)[j.html_titles?"html":"text"](o.title);
                        if(o.language){
                            i.addClass(o.language)
                        }
                    }
                    i.prepend("<ins class='jstree-icon'>&#160;</ins>");
                    if(o.icon){
                        if(o.icon.indexOf("/")===-1){
                            i.children("ins").addClass(o.icon)
                        }else{
                            i.children("ins").css("background","url('"+o.icon+"') center center no-repeat")
                        }
                    }
                    m.append(i)
                });
                m.prepend("<ins class='jstree-icon'>&#160;</ins>");
                if(l===-1){
                    l=this.get_container();
                    if(g==="before"){
                        g="first"
                    }
                    if(g==="after"){
                        g="last"
                    }
                }
                switch(g){
                    case"before":
                        l.before(m);
                        i=this._get_parent(l);
                        break;
                    case"after":
                        l.after(m);
                        i=this._get_parent(l);
                        break;
                    case"inside":case"first":
                        if(!l.children("ul").length){
                            l.append("<ul>")
                        }
                        l.children("ul").prepend(m);
                        i=l;
                        break;
                    case"last":
                        if(!l.children("ul").length){
                            l.append("<ul>")
                        }
                        l.children("ul").append(m);
                        i=l;
                        break;
                    default:
                        if(!l.children("ul").length){
                            l.append("<ul>")
                        }
                        if(!g){
                            g=0
                        }
                        i=l.children("ul").children("li").eq(g);
                        if(i.length){
                            i.before(m)
                        }else{
                            l.children("ul").append(m)
                        }
                        i=l;
                        break
                }
                if(i===-1||i.get(0)===this.get_container().get(0)){
                    i=-1
                }
                this.clean_node(i);
                this.__callback({
                    obj:m,
                    parent:i
                });
                if(n){
                    n.call(this,m)
                }
                return m
            },
            get_text:function(h){
                h=this._get_node(h);
                if(!h.length){
                    return false
                }
                var g=this._get_settings().core.html_titles;
                h=h.children("a:eq(0)");
                if(g){
                    h=h.clone();
                    h.children("INS").remove();
                    return h.html()
                }else{
                    h=h.contents().filter(function(){
                        return this.nodeType==3
                    })[0];
                    return h.nodeValue
                }
            },
            set_text:function(h,i){
                h=this._get_node(h);
                if(!h.length){
                    return false
                }
                h=h.children("a:eq(0)");
                if(this._get_settings().core.html_titles){
                    var g=h.children("INS").clone();
                    h.html(i).prepend(g);
                    this.__callback({
                        obj:h,
                        name:i
                    });
                    return true
                }else{
                    h=h.contents().filter(function(){
                        return this.nodeType==3
                    })[0];
                    this.__callback({
                        obj:h,
                        name:i
                    });
                    return(h.nodeValue=i)
                }
            },
            rename_node:function(g,h){
                g=this._get_node(g);
                this.__rollback();
                if(g&&g.length&&this.set_text.apply(this,Array.prototype.slice.call(arguments))){
                    this.__callback({
                        obj:g,
                        name:h
                    })
                }
            },
            delete_node:function(i){
                i=this._get_node(i);
                if(!i.length){
                    return false
                }
                this.__rollback();
                var h=this._get_parent(i),g=this._get_prev(i);
                i=i.remove();
                if(h!==-1&&h.find("> ul > li").length===0){
                    h.removeClass("jstree-open jstree-closed").addClass("jstree-leaf")
                }
                this.clean_node(h);
                this.__callback({
                    obj:i,
                    prev:g
                });
                return i
            },
            prepare_move:function(k,i,l,g,h){
                var j={};

                j.ot=e.jstree._reference(j.o)||this;
                j.o=j.ot._get_node(k);
                j.r=i===-1?-1:this._get_node(i);
                j.p=(typeof j==="undefined")?"last":l;
                if(!h&&a.o&&a.o[0]===j.o[0]&&a.r[0]===j.r[0]&&a.p===j.p){
                    this.__callback(a);
                    if(g){
                        g.call(this,a)
                    }
                    return
                }
                j.ot=e.jstree._reference(j.o)||this;
                j.rt=i===-1?j.ot:e.jstree._reference(j.r)||this;
                if(j.r===-1){
                    j.cr=-1;
                    switch(j.p){
                        case"first":case"before":case"inside":
                            j.cp=0;
                            break;
                        case"after":case"last":
                            j.cp=j.rt.get_container().find(" > ul > li").length;
                            break;
                        default:
                            j.cp=j.p;
                            break
                    }
                }else{
                    if(!/^(before|after)$/.test(j.p)&&!this._is_loaded(j.r)){
                        return this.load_node(j.r,function(){
                            this.prepare_move(k,i,l,g,true)
                        })
                    }
                    switch(j.p){
                        case"before":
                            j.cp=j.r.index();
                            j.cr=j.rt._get_parent(j.r);
                            break;
                        case"after":
                            j.cp=j.r.index()+1;
                            j.cr=j.rt._get_parent(j.r);
                            break;
                        case"inside":case"first":
                            j.cp=0;
                            j.cr=j.r;
                            break;
                        case"last":
                            j.cp=j.r.find(" > ul > li").length;
                            j.cr=j.r;
                            break;
                        default:
                            j.cp=j.p;
                            j.cr=j.r;
                            break
                    }
                }
                j.np=j.cr==-1?j.rt.get_container():j.cr;
                j.op=j.ot._get_parent(j.o);
                j.or=j.np.find(" > ul > li:nth-child("+(j.cp+1)+")");
                a=j;
                this.__callback(a);
                if(g){
                    g.call(this,a)
                }
            },
            check_move:function(){
                var h=a,g=true;
                if(h.or[0]===h.o[0]){
                    return false
                }
                h.o.each(function(){
                    if(h.r.parentsUntil(".jstree").andSelf().filter("li").index(this)!==-1){
                        g=false;
                        return false
                    }
                });
                return g
            },
            move_node:function(m,j,g,i,h,l){
                if(!h){
                    return this.prepare_move(m,j,g,function(o){
                        this.move_node(o,false,false,i,true,l)
                    })
                }
                if(!l&&!this.check_move()){
                    return false
                }
                this.__rollback();
                var n=false;
                if(i){
                    n=m.o.clone();
                    n.find("*[id]").andSelf().each(function(){
                        if(this.id){
                            this.id="copy_"+this.id
                        }
                    })
                }else{
                    n=m.o
                }
                if(m.or.length){
                    m.or.before(n)
                }else{
                    if(!m.np.children("ul").length){
                        e("<ul>").appendTo(m.np)
                    }
                    m.np.children("ul:eq(0)").append(n)
                }
                try{
                    m.ot.clean_node(m.op);
                    m.rt.clean_node(m.np);
                    if(!m.op.find("> ul > li").length){
                        m.op.removeClass("jstree-open jstree-closed").addClass("jstree-leaf").children("ul").remove()
                    }
                }catch(k){}
                if(i){
                    a.cy=true;
                    a.oc=n
                }
                this.__callback(a);
                return a
            },
            _get_move:function(){
                return a
            }
        }
    })
})(jQuery);
(function(a){
    a.jstree.plugin("ui",{
        __init:function(){
            this.data.ui.selected=a();
            this.data.ui.last_selected=false;
            this.data.ui.hovered=null;
            this.data.ui.to_select=this.get_settings().ui.initially_select;
            this.get_container().delegate("a","click.jstree",a.proxy(function(b){
                b.preventDefault();
                this.select_node(b.currentTarget,true,b)
            },this)).delegate("a","mouseenter.jstree",a.proxy(function(b){
                this.hover_node(b.target)
            },this)).delegate("a","mouseleave.jstree",a.proxy(function(b){
                this.dehover_node(b.target)
            },this)).bind("reopen.jstree",a.proxy(function(){
                this.reselect()
            },this)).bind("get_rollback.jstree",a.proxy(function(){
                this.dehover_node();
                this.save_selected()
            },this)).bind("set_rollback.jstree",a.proxy(function(){
                this.reselect()
            },this)).bind("close_node.jstree",a.proxy(function(c,d){
                var b=this._get_settings().ui,e=this._get_node(d.rslt.obj),f=(e&&e.length)?e.children("ul").find(".jstree-clicked"):a(),g=this;
                if(b.selected_parent_close===false||!f.length){
                    return
                }
                f.each(function(){
                    g.deselect_node(this);
                    if(b.selected_parent_close==="select_parent"){
                        g.select_node(e)
                    }
                })
            },this)).bind("delete_node.jstree",a.proxy(function(c,d){
                var b=this._get_settings().ui.select_prev_on_delete,e=this._get_node(d.rslt.obj),f=(e&&e.length)?e.find(".jstree-clicked"):[],g=this;
                f.each(function(){
                    g.deselect_node(this)
                });
                if(b&&f.length){
                    this.select_node(d.rslt.prev)
                }
            },this)).bind("move_node.jstree",a.proxy(function(b,c){
                if(c.rslt.cy){
                    c.rslt.oc.find(".jstree-clicked").removeClass("jstree-clicked")
                }
            },this))
        },
        defaults:{
            select_limit:-1,
            select_multiple_modifier:"ctrl",
            selected_parent_close:"select_parent",
            select_prev_on_delete:true,
            disable_selecting_children:false,
            initially_select:[]
        },
        _fn:{
            _get_node:function(b,c){
                if(typeof b==="undefined"||b===null){
                    return c?this.data.ui.selected:this.data.ui.last_selected
                }
                var d=a(b,this.get_container());
                if(d.is(".jstree")||b==-1){
                    return -1
                }
                d=d.closest("li",this.get_container());
                return d.length?d:false
            },
            save_selected:function(){
                var b=this;
                this.data.ui.to_select=[];
                this.data.ui.selected.each(function(){
                    b.data.ui.to_select.push("#"+this.id.toString().replace(/^#/,"").replace("\\/","/").replace("/","\\/"))
                });
                this.__callback(this.data.ui.to_select)
            },
            reselect:function(){
                var c=this,b=this.data.ui.to_select;
                b=a.map(a.makeArray(b),function(d){
                    return"#"+d.toString().replace(/^#/,"").replace("\\/","/").replace("/","\\/")
                });
                this.deselect_all();
                a.each(b,function(d,e){
                    if(e&&e!=="#"){
                        c.select_node(e)
                    }
                });
                this.__callback()
            },
            refresh:function(b){
                this.save_selected();
                return this.__call_old()
            },
            hover_node:function(b){
                b=this._get_node(b);
                if(!b.length){
                    return false
                }
                if(!b.hasClass("jstree-hovered")){
                    this.dehover_node()
                }
                this.data.ui.hovered=b.children("a").addClass("jstree-hovered").parent();
                this.__callback({
                    obj:b
                })
            },
            dehover_node:function(){
                var c=this.data.ui.hovered,b;
                if(!c||!c.length){
                    return false
                }
                b=c.children("a").removeClass("jstree-hovered").parent();
                if(this.data.ui.hovered[0]===b[0]){
                    this.data.ui.hovered=null
                }
                this.__callback({
                    obj:c
                })
            },
            select_node:function(h,b,g){
                h=this._get_node(h);
                if(h==-1||!h||!h.length){
                    return false
                }
                var d=this._get_settings().ui,c=(d.select_multiple_modifier=="on"||(d.select_multiple_modifier!==false&&g&&g[d.select_multiple_modifier+"Key"])),i=this.is_selected(h),f=true;
                if(b){
                    if(d.disable_selecting_children&&c&&h.parents("li",this.get_container()).children(".jstree-clicked").length){
                        return false
                    }
                    f=false;
                    switch(!0){
                        case (i&&!c):
                            this.deselect_all();
                            i=false;
                            f=true;
                            break;
                        case (!i&&!c):
                            if(d.select_limit==-1||d.select_limit>0){
                                this.deselect_all();
                                f=true
                            }
                            break;
                        case (i&&c):
                            this.deselect_node(h);
                            break;
                        case (!i&&c):
                            if(d.select_limit==-1||this.data.ui.selected.length+1<=d.select_limit){
                                f=true
                            }
                            break
                    }
                }
                if(f&&!i){
                    h.children("a").addClass("jstree-clicked");
                    this.data.ui.selected=this.data.ui.selected.add(h);
                    this.data.ui.last_selected=h;
                    this.__callback({
                        obj:h
                    })
                }
            },
            deselect_node:function(b){
                b=this._get_node(b);
                if(!b.length){
                    return false
                }
                if(this.is_selected(b)){
                    b.children("a").removeClass("jstree-clicked");
                    this.data.ui.selected=this.data.ui.selected.not(b);
                    if(this.data.ui.last_selected.get(0)===b.get(0)){
                        this.data.ui.last_selected=this.data.ui.selected.eq(0)
                    }
                    this.__callback({
                        obj:b
                    })
                }
            },
            toggle_select:function(b){
                b=this._get_node(b);
                if(!b.length){
                    return false
                }
                if(this.is_selected(b)){
                    this.deselect_node(b)
                }else{
                    this.select_node(b)
                }
            },
            is_selected:function(b){
                return this.data.ui.selected.index(this._get_node(b))>=0
            },
            get_selected:function(b){
                return b?a(b).find(".jstree-clicked").parent():this.data.ui.selected
            },
            deselect_all:function(b){
                if(b){
                    a(b).find(".jstree-clicked").removeClass("jstree-clicked")
                }else{
                    this.get_container().find(".jstree-clicked").removeClass("jstree-clicked")
                }
                this.data.ui.selected=a([]);
                this.data.ui.last_selected=false;
                this.__callback()
            }
        }
    });
    a.jstree.defaults.plugins.push("ui")
})(jQuery);
(function(a){
    a.jstree.plugin("crrm",{
        __init:function(){
            this.get_container().bind("move_node.jstree",a.proxy(function(d,c){
                if(this._get_settings().crrm.move.open_onmove){
                    var b=this;
                    c.rslt.np.parentsUntil(".jstree").andSelf().filter(".jstree-closed").each(function(){
                        b.open_node(this,false,true)
                    })
                }
            },this))
        },
        defaults:{
            input_width_limit:200,
            move:{
                always_copy:false,
                open_onmove:true,
                default_position:"last",
                check_move:function(b){
                    return true
                }
            }
        },
        _fn:{
            _show_input:function(b,i){
                b=this._get_node(b);
                var g=this._get_settings().core.rtl,h=this._get_settings().crrm.input_width_limit,d=b.children("ins").width(),c=b.find("> a:visible > ins").width()*b.find("> a:visible > ins").length,j=this.get_text(b),f=a("<div>",{
                    css:{
                        position:"absolute",
                        top:"-200px",
                        left:(g?"0px":"-1000px"),
                        visibility:"hidden"
                    }
                }).appendTo("body"),e=b.css("position","relative").append(a("<input>",{
                    value:j,
                    css:{
                        padding:"0",
                        border:"1px solid silver",
                        position:"absolute",
                        left:(g?"auto":(d+c+4)+"px"),
                        right:(g?(d+c+4)+"px":"auto"),
                        top:"0px",
                        height:(this.data.core.li_height-2)+"px",
                        lineHeight:(this.data.core.li_height-2)+"px",
                        width:"150px"
                    },
                    blur:a.proxy(function(){
                        var l=b.children("input"),k=l.val();
                        if(k===""){
                            k=j
                        }
                        l.remove();
                        this.set_text(b,j);
                        this.rename_node(b,k);
                        i.call(this,b,k,j);
                        b.css("position","")
                    },this),
                    keyup:function(l){
                        var k=l.keyCode||l.which;
                        if(k==27){
                            this.value=j;
                            this.blur();
                            return
                        }else{
                            if(k==13){
                                this.blur();
                                return
                            }else{
                                e.width(Math.min(f.text("pW"+this.value).width(),h))
                            }
                        }
                    }
                })).children("input");
                this.set_text(b,"");
                f.css({
                    fontFamily:e.css("fontFamily")||"",
                    fontSize:e.css("fontSize")||"",
                    fontWeight:e.css("fontWeight")||"",
                    fontStyle:e.css("fontStyle")||"",
                    fontStretch:e.css("fontStretch")||"",
                    fontVariant:e.css("fontVariant")||"",
                    letterSpacing:e.css("letterSpacing")||"",
                    wordSpacing:e.css("wordSpacing")||""
                });
                e.width(Math.min(f.text("pW"+e[0].value).width(),h))[0].select()
            },
            rename:function(c){
                c=this._get_node(c);
                this.__rollback();
                var b=this.__callback;
                this._show_input(c,function(f,e,d){
                    b.call(this,{
                        obj:f,
                        new_name:e,
                        old_name:d
                    })
                })
            },
            create:function(f,c,e,h,b){
                var d,g=this;
                f=this._get_node(f);
                if(!f){
                    f=-1
                }
                this.__rollback();
                d=this.create_node(f,c,e,function(i){
                    var j=this._get_parent(i),k=a(i).index();
                    if(h){
                        h.call(this,i)
                    }
                    if(j.length&&j.hasClass("jstree-closed")){
                        this.open_node(j,false,true)
                    }
                    if(!b){
                        this._show_input(i,function(n,m,l){
                            g.__callback({
                                obj:n,
                                name:m,
                                parent:j,
                                position:k
                            })
                        })
                    }else{
                        g.__callback({
                            obj:i,
                            name:this.get_text(i),
                            parent:j,
                            position:k
                        })
                    }
                });
                return d
            },
            remove:function(b, implicit){
                /* add by mmd */
                var p=this._get_parent(b);
                /* end add */
                b=this._get_node(b,true);
                this.__rollback();
                this.delete_node(b);
                this.__callback({
                    obj:b,
                    /* add by mmd */
                    parent: p,
                    implicit: implicit
                    /* end add */
                })
            },
            check_move:function(){
                if(!this.__call_old()){
                    return false
                }
                var b=this._get_settings().crrm.move;
                if(!b.check_move.call(this,this._get_move())){
                    return false
                }
                return true
            },
            move_node:function(h,f,b,d,c,g){
                var e=this._get_settings().crrm.move;
                if(!c){
                    if(!b){
                        b=e.default_position
                    }
                    if(b==="inside"&&!e.default_position.match(/^(before|after)$/)){
                        b=e.default_position
                    }
                    return this.__call_old(true,h,f,b,d,false,g)
                }
                if(e.always_copy===true||(e.always_copy==="multitree"&&h.rt.get_index()!==h.ot.get_index())){
                    d=true
                }
                this.__call_old(true,h,f,b,d,true,g)
            },
            cut:function(b){
                b=this._get_node(b);
                this.data.crrm.cp_nodes=false;
                this.data.crrm.ct_nodes=false;
                if(!b||!b.length){
                    return false
                }
                this.data.crrm.ct_nodes=b
            },
            copy:function(b){
                b=this._get_node(b);
                this.data.crrm.cp_nodes=false;
                this.data.crrm.ct_nodes=false;
                if(!b||!b.length){
                    return false
                }
                this.data.crrm.cp_nodes=b
            },
            paste:function(b){
                b=this._get_node(b);
                if(!b||!b.length){
                    return false
                }
                if(!this.data.crrm.ct_nodes&&!this.data.crrm.cp_nodes){
                    return false
                }
                if(this.data.crrm.ct_nodes){
                    this.move_node(this.data.crrm.ct_nodes,b)
                }
                if(this.data.crrm.cp_nodes){
                    this.move_node(this.data.crrm.cp_nodes,b,false,true)
                }
                this.data.crrm.cp_nodes=false;
                this.data.crrm.ct_nodes=false
            }
        }
    });
    a.jstree.defaults.plugins.push("crrm")
})(jQuery);
(function(a){
    var b=['themes/default/style.css'];
    a.jstree._themes=false;
    a.jstree.plugin("themes",{
        __init:function(){
            this.get_container().bind("init.jstree",a.proxy(function(){
                var c=this._get_settings().themes;
                this.data.themes.dots=c.dots;
                this.data.themes.icons=c.icons;
                this.set_theme(c.theme,c.url)
            },this)).bind("loaded.jstree",a.proxy(function(){
                if(!this.data.themes.dots){
                    this.hide_dots()
                }else{
                    this.show_dots()
                }
                if(!this.data.themes.icons){
                    this.hide_icons()
                }else{
                    this.show_icons()
                }
            },this))
        },
        defaults:{
            theme:"default",
            url:false,
            dots:true,
            icons:true
        },
        _fn:{
            set_theme:function(d,c){
                if(!d){
                    return false
                }
                if(!c){
                    c=a.jstree._themes+d+"/style.css"
                }
                if(a.inArray(c,b)==-1){
                    a.vakata.css.add_sheet({
                        url:c,
                        rel:"jstree"
                    });
                    b.push(c)
                }
                if(this.data.themes.theme!=d){
                    this.get_container().removeClass("jstree-"+this.data.themes.theme);
                    this.data.themes.theme=d
                }
                this.get_container().addClass("jstree-"+d);
                if(!this.data.themes.dots){
                    this.hide_dots()
                }else{
                    this.show_dots()
                }
                if(!this.data.themes.icons){
                    this.hide_icons()
                }else{
                    this.show_icons()
                }
                this.__callback()
            },
            get_theme:function(){
                return this.data.themes.theme
            },
            show_dots:function(){
                this.data.themes.dots=true;
                this.get_container().children("ul").removeClass("jstree-no-dots")
            },
            hide_dots:function(){
                this.data.themes.dots=false;
                this.get_container().children("ul").addClass("jstree-no-dots")
            },
            toggle_dots:function(){
                if(this.data.themes.dots){
                    this.hide_dots()
                }else{
                    this.show_dots()
                }
            },
            show_icons:function(){
                this.data.themes.icons=true;
                this.get_container().children("ul").removeClass("jstree-no-icons")
            },
            hide_icons:function(){
                this.data.themes.icons=false;
                this.get_container().children("ul").addClass("jstree-no-icons")
            },
            toggle_icons:function(){
                if(this.data.themes.icons){
                    this.hide_icons()
                }else{
                    this.show_icons()
                }
            }
        }
    });
    a(function(){
        if(a.jstree._themes===false){
            a("script").each(function(){
                if(this.src.toString().match(/jquery\.jstree[^\/]*?\.js(\?.*)?$/)){
                    a.jstree._themes=this.src.toString().replace(/jquery\.jstree[^\/]*?\.js(\?.*)?$/,"")+"themes/";
                    return false
                }
            })
        }
        if(a.jstree._themes===false){
            a.jstree._themes="themes/"
        }
    });
    a.jstree.defaults.plugins.push("themes")
})(jQuery);
(function(c){
    var b=[];
    function a(e,g){
        var h=c.jstree._focused(),d;
        if(h&&h.data&&h.data.hotkeys&&h.data.hotkeys.enabled){
            d=h._get_settings().hotkeys[e];
            if(d){
                return d.call(h,g)
            }
        }
    }
    c.jstree.plugin("hotkeys",{
        __init:function(){
            if(typeof c.hotkeys==="undefined"){
                throw"jsTree hotkeys: jQuery hotkeys plugin not included."
            }
            if(!this.data.ui){
                throw"jsTree hotkeys: jsTree UI plugin not included."
            }
            c.each(this._get_settings().hotkeys,function(d,e){
                if(c.inArray(d,b)==-1){
                    c(document).bind("keydown",d,function(f){
                        return a(d,f)
                    });
                    b.push(d)
                }
            });
            this.enable_hotkeys()
        },
        defaults:{
            up:function(){
                var d=this.data.ui.hovered||this.data.ui.last_selected||-1;
                this.hover_node(this._get_prev(d));
                return false
            },
            down:function(){
                var d=this.data.ui.hovered||this.data.ui.last_selected||-1;
                this.hover_node(this._get_next(d));
                return false
            },
            left:function(){
                var d=this.data.ui.hovered||this.data.ui.last_selected;
                if(d){
                    if(d.hasClass("jstree-open")){
                        this.close_node(d)
                    }else{
                        this.hover_node(this._get_prev(d))
                    }
                }
                return false
            },
            right:function(){
                var d=this.data.ui.hovered||this.data.ui.last_selected;
                if(d&&d.length){
                    if(d.hasClass("jstree-closed")){
                        this.open_node(d)
                    }else{
                        this.hover_node(this._get_next(d))
                    }
                }
                return false
            },
            space:function(){
                if(this.data.ui.hovered){
                    this.data.ui.hovered.children("a:eq(0)").click()
                }
                return false
            },
            "ctrl+space":function(d){
                d.type="click";
                if(this.data.ui.hovered){
                    this.data.ui.hovered.children("a:eq(0)").trigger(d)
                }
                return false
            },
            f2:function(){
                this.rename(this.data.ui.hovered||this.data.ui.last_selected)
            },
            del:function(){
                this.remove(this.data.ui.hovered||this._get_node(null))
            }
        },
        _fn:{
            enable_hotkeys:function(){
                this.data.hotkeys.enabled=true
            },
            disable_hotkeys:function(){
                this.data.hotkeys.enabled=false
            }
        }
    })
})(jQuery);
(function(a){
    a.jstree.plugin("json_data",{
        defaults:{
            data:false,
            ajax:false,
            correct_state:true,
            progressive_render:false
        },
        _fn:{
            load_node:function(d,b,c){
                var e=this;
                this.load_node_json(d,function(){
                    e.__callback({
                        obj:d
                    });
                    b.call(this)
                },c)
            },
            _is_loaded:function(c){
                var b=this._get_settings().json_data,e;
                c=this._get_node(c);
                if(c&&c!==-1&&b.progressive_render&&!c.is(".jstree-open, .jstree-leaf")&&c.children("ul").children("li").length===0&&c.data("jstree-children")){
                    e=this._parse_json(c.data("jstree-children"));
                    if(e){
                        c.append(e);
                        a.removeData(c,"jstree-children")
                    }
                    this.clean_node(c);
                    return true
                }
                return c==-1||!c||!b.ajax||c.is(".jstree-open, .jstree-leaf")||c.children("ul").children("li").size()>0
            },
            load_node_json:function(g,b,e){
                var f=this.get_settings().json_data,i,c=function(){},h=function(){};

                g=this._get_node(g);
                if(g&&g!==-1){
                    if(g.data("jstree-is-loading")){
                        return
                    }else{
                        g.data("jstree-is-loading",true)
                    }
                }
                switch(!0){
                    case (!f.data&&!f.ajax):
                        throw"Neither data nor ajax settings supplied.";
                    case (!!f.data&&!f.ajax)||(!!f.data&&!!f.ajax&&(!g||g===-1)):
                        if(!g||g==-1){
                            i=this._parse_json(f.data);
                            if(i){
                                this.get_container().children("ul").empty().append(i.children());
                                this.clean_node()
                            }else{
                                if(f.correct_state){
                                    this.get_container().children("ul").empty()
                                }
                            }
                        }
                        if(b){
                            b.call(this)
                        }
                        break;
                    case (!f.data&&!!f.ajax)||(!!f.data&&!!f.ajax&&g&&g!==-1):
                        c=function(j,k,l){
                            var d=this.get_settings().json_data.ajax.error;
                            if(d){
                                d.call(this,j,k,l)
                            }
                            if(g!=-1&&g.length){
                                g.children(".jstree-loading").removeClass("jstree-loading");
                                g.data("jstree-is-loading",false);
                                if(k==="success"&&f.correct_state){
                                    g.removeClass("jstree-open jstree-closed").addClass("jstree-leaf")
                                }
                            }else{
                                if(k==="success"&&f.correct_state){
                                    this.get_container().children("ul").empty()
                                }
                            }
                            if(e){
                                e.call(this)
                            }
                        };

                        h=function(m,k,j){
                            var l=this.get_settings().json_data.ajax.success;
                            if(l){
                                m=l.call(this,m,k,j)||m
                            }
                            if(m===""||(!a.isArray(m)&&!a.isPlainObject(m))){
                                return c.call(this,j,k,"")
                            }
                            m=this._parse_json(m);
                            if(m){
                                if(g===-1||!g){
                                    this.get_container().children("ul").empty().append(m.children())
                                }else{
                                    g.append(m).children(".jstree-loading").removeClass("jstree-loading");
                                    g.data("jstree-is-loading",false)
                                }
                                this.clean_node(g);
                                if(b){
                                    b.call(this)
                                }
                            }else{
                                if(g===-1||!g){
                                    if(f.correct_state){
                                        this.get_container().children("ul").empty();
                                        if(b){
                                            b.call(this)
                                        }
                                    }
                                }else{
                                    g.children(".jstree-loading").removeClass("jstree-loading");
                                    g.data("jstree-is-loading",false);
                                    if(f.correct_state){
                                        g.removeClass("jstree-open jstree-closed").addClass("jstree-leaf");
                                        if(b){
                                            b.call(this)
                                        }
                                    }
                                }
                            }
                        };

                        f.ajax.context=this;
                        f.ajax.error=c;
                        f.ajax.success=h;
                        if(!f.ajax.dataType){
                            f.ajax.dataType="json"
                        }
                        if(a.isFunction(f.ajax.url)){
                            f.ajax.url=f.ajax.url.call(this,g)
                        }
                        if(a.isFunction(f.ajax.data)){
                            f.ajax.data=f.ajax.data.call(this,g)
                        }
                        a.ajax(f.ajax);
                        break
                }
            },
            _parse_json:function(b,m){
                var h=false,c=this._get_settings(),o=c.json_data,n=c.core.html_titles,f,g,e,l,k;
                if(!b){
                    return h
                }
                if(a.isFunction(b)){
                    b=b.call(this)
                }
                if(a.isArray(b)){
                    h=a();
                    if(!b.length){
                        return false
                    }
                    for(g=0,e=b.length;g<e;g++){
                        f=this._parse_json(b[g],true);
                        if(f.length){
                            h=h.add(f)
                        }
                    }
                }else{
                    if(typeof b=="string"){
                        b={
                            data:b
                        }
                    }
                    if(!b.data&&b.data!==""){
                        return h
                    }
                    h=a("<li>");
                    if(b.attr){
                        h.attr(b.attr)
                    }
                    if(b.metadata){
                        h.data("jstree",b.metadata)
                    }
                    if(b.state){
                        h.addClass("jstree-"+b.state)
                    }
                    if(!a.isArray(b.data)){
                        f=b.data;
                        b.data=[];
                        b.data.push(f)
                    }
                    a.each(b.data,function(j,d){
                        f=a("<a>");
                        if(a.isFunction(d)){
                            d=d.call(this,b)
                        }
                        if(typeof d=="string"){
                            f.attr("href","#")[n?"html":"text"](d)
                        }else{
                            if(!d.attr){
                                d.attr={}
                            }
                            if(!d.attr.href){
                                d.attr.href="#"
                            }
                            f.attr(d.attr)[n?"html":"text"](d.title);
                            if(d.language){
                                f.addClass(d.language)
                            }
                        }
                        f.prepend("<ins class='jstree-icon'>&#160;</ins>");
                        if(!d.icon&&b.icon){
                            d.icon=b.icon
                        }
                        if(d.icon){
                            if(d.icon.indexOf("/")===-1){
                                f.children("ins").addClass(d.icon)
                            }else{
                                f.children("ins").css("background","url('"+d.icon+"') center center no-repeat")
                            }
                        }
                        h.append(f)
                    });
                    h.prepend("<ins class='jstree-icon'>&#160;</ins>");
                    if(b.children){
                        if(o.progressive_render&&b.state!=="open"){
                            h.addClass("jstree-closed").data("jstree-children",b.children)
                        }else{
                            if(a.isFunction(b.children)){
                                b.children=b.children.call(this,b)
                            }
                            if(a.isArray(b.children)&&b.children.length){
                                f=this._parse_json(b.children,true);
                                if(f.length){
                                    k=a("<ul>");
                                    k.append(f);
                                    h.append(k)
                                }
                            }
                        }
                    }
                }
                if(!m){
                    l=a("<ul>");
                    l.append(h);
                    h=l
                }
                return h
            },
            get_json:function(g,d,b,k){
                var n=[],m=this._get_settings(),h=this,f,e,j,i,l,c;
                g=this._get_node(g);
                if(!g||g===-1){
                    g=this.get_container().find("> ul > li")
                }
                d=a.isArray(d)?d:["id","class"];
                if(!k&&this.data.types){
                    d.push(m.types.type_attr)
                }
                b=a.isArray(b)?b:[];
                g.each(function(){
                    j=a(this);
                    f={
                        data:[]
                    };

                    if(d.length){
                        f.attr={}
                    }
                    a.each(d,function(p,o){
                        e=j.attr(o);
                        if(e&&e.length&&e.replace(/jstree[^ ]*|$/ig,"").length){
                            f.attr[o]=e.replace(/jstree[^ ]*|$/ig,"")
                        }
                    });
                    if(j.hasClass("jstree-open")){
                        f.state="open"
                    }
                    if(j.hasClass("jstree-closed")){
                        f.state="closed"
                    }
                    i=j.children("a");
                    i.each(function(){
                        l=a(this);
                        if(b.length||a.inArray("languages",m.plugins)!==-1||l.children("ins").get(0).style.backgroundImage.length||(l.children("ins").get(0).className&&l.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,"").length)){
                            c=false;
                            if(a.inArray("languages",m.plugins)!==-1&&a.isArray(m.languages)&&m.languages.length){
                                a.each(m.languages,function(o,p){
                                    if(l.hasClass(p)){
                                        c=p;
                                        return false
                                    }
                                })
                            }
                            e={
                                attr:{},
                                title:h.get_text(l,c)
                            };

                            a.each(b,function(o,p){
                                f.attr[p]=(l.attr(p)||"").replace(/jstree[^ ]*|$/ig,"")
                            });
                            a.each(m.languages,function(o,p){
                                if(l.hasClass(p)){
                                    e.language=p;
                                    return true
                                }
                            });
                            if(l.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,"").replace(/^\s+$/ig,"").length){
                                e.icon=l.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,"").replace(/^\s+$/ig,"")
                            }
                            if(l.children("ins").get(0).style.backgroundImage.length){
                                e.icon=l.children("ins").get(0).style.backgroundImage.replace("url(","").replace(")","")
                            }
                        }else{
                            e=h.get_text(l)
                        }
                        if(i.length>1){
                            f.data.push(e)
                        }else{
                            f.data=e
                        }
                    });
                    j=j.find("> ul > li");
                    if(j.length){
                        f.children=h.get_json(j,d,b,true)
                    }
                    n.push(f)
                });
                return n
            }
        }
    })
})(jQuery);
(function(a){
    a.jstree.plugin("languages",{
        __init:function(){
            this._load_css()
        },
        defaults:[],
        _fn:{
            set_lang:function(d){
                var e=this._get_settings().languages,c=false,b=".jstree-"+this.get_index()+" a";
                if(!a.isArray(e)||e.length===0){
                    return false
                }
                if(a.inArray(d,e)==-1){
                    if(!!e[d]){
                        d=e[d]
                    }else{
                        return false
                    }
                }
                if(d==this.data.languages.current_language){
                    return true
                }
                c=a.vakata.css.get_css(b+"."+this.data.languages.current_language,false,this.data.languages.language_css);
                if(c!==false){
                    c.style.display="none"
                }
                c=a.vakata.css.get_css(b+"."+d,false,this.data.languages.language_css);
                if(c!==false){
                    c.style.display=""
                }
                this.data.languages.current_language=d;
                this.__callback(d);
                return true
            },
            get_lang:function(){
                return this.data.languages.current_language
            },
            get_text:function(d,e){
                d=this._get_node(d)||this.data.ui.last_selected;
                if(!d.size()){
                    return false
                }
                var c=this._get_settings().languages,b=this._get_settings().core.html_titles;
                if(a.isArray(c)&&c.length){
                    e=(e&&a.inArray(e,c)!=-1)?e:this.data.languages.current_language;
                    d=d.children("a."+e)
                }else{
                    d=d.children("a:eq(0)")
                }
                if(b){
                    d=d.clone();
                    d.children("INS").remove();
                    return d.html()
                }else{
                    d=d.contents().filter(function(){
                        return this.nodeType==3
                    })[0];
                    return d.nodeValue
                }
            },
            set_text:function(e,g,f){
                e=this._get_node(e)||this.data.ui.last_selected;
                if(!e.size()){
                    return false
                }
                var d=this._get_settings().languages,c=this._get_settings().core.html_titles,b;
                if(a.isArray(d)&&d.length){
                    f=(f&&a.inArray(f,d)!=-1)?f:this.data.languages.current_language;
                    e=e.children("a."+f)
                }else{
                    e=e.children("a:eq(0)")
                }
                if(c){
                    b=e.children("INS").clone();
                    e.html(g).prepend(b);
                    this.__callback({
                        obj:e,
                        name:g,
                        lang:f
                    });
                    return true
                }else{
                    e=e.contents().filter(function(){
                        return this.nodeType==3
                    })[0];
                    this.__callback({
                        obj:e,
                        name:g,
                        lang:f
                    });
                    return(e.nodeValue=g)
                }
            },
            _load_css:function(){
                var d=this._get_settings().languages,e="/* languages css */",b=".jstree-"+this.get_index()+" a",c;
                if(a.isArray(d)&&d.length){
                    this.data.languages.current_language=d[0];
                    for(c=0;c<d.length;c++){
                        e+=b+"."+d[c]+" {";
                        if(d[c]!=this.data.languages.current_language){
                            e+=" display:none; "
                        }
                        e+=" } "
                    }
                    this.data.languages.language_css=a.vakata.css.add_sheet({
                        str:e
                    })
                }
            },
            create_node:function(e,b,d,f){
                var c=this.__call_old(true,e,b,d,function(h){
                    var j=this._get_settings().languages,g=h.children("a"),i;
                    if(a.isArray(j)&&j.length){
                        for(i=0;i<j.length;i++){
                            if(!g.is("."+j[i])){
                                h.append(g.eq(0).clone().removeClass(j.join(" ")).addClass(j[i]))
                            }
                        }
                        g.not("."+j.join(", .")).remove()
                    }
                    if(f){
                        f.call(this,h)
                    }
                });
                return c
            }
        }
    })
})(jQuery);
(function(a){
    a.jstree.plugin("cookies",{
        __init:function(){
            if(typeof a.cookie==="undefined"){
                throw"jsTree cookie: jQuery cookie plugin not included."
            }
            var c=this._get_settings().cookies,b;
            if(!!c.save_opened){
                b=a.cookie(c.save_opened);
                if(b&&b.length){
                    this.data.core.to_open=b.split(",")
                }
            }
            if(!!c.save_selected){
                b=a.cookie(c.save_selected);
                if(b&&b.length&&this.data.ui){
                    this.data.ui.to_select=b.split(",")
                }
            }
            this.get_container().one((this.data.ui?"reselect":"reopen")+".jstree",a.proxy(function(){
                this.get_container().bind("open_node.jstree close_node.jstree select_node.jstree deselect_node.jstree",a.proxy(function(d){
                    if(this._get_settings().cookies.auto_save){
                        this.save_cookie((d.handleObj.namespace+d.handleObj.type).replace("jstree",""))
                    }
                },this))
            },this))
        },
        defaults:{
            save_opened:"jstree_open",
            save_selected:"jstree_select",
            auto_save:true,
            cookie_options:{}
        },
        _fn:{
            save_cookie:function(d){
                if(this.data.core.refreshing){
                    return
                }
                var b=this._get_settings().cookies;
                if(!d){
                    if(b.save_opened){
                        this.save_opened();
                        a.cookie(b.save_opened,this.data.core.to_open.join(","),b.cookie_options)
                    }
                    if(b.save_selected&&this.data.ui){
                        this.save_selected();
                        a.cookie(b.save_selected,this.data.ui.to_select.join(","),b.cookie_options)
                    }
                    return
                }
                switch(d){
                    case"open_node":case"close_node":
                        if(!!b.save_opened){
                            this.save_opened();
                            a.cookie(b.save_opened,this.data.core.to_open.join(","),b.cookie_options)
                        }
                        break;
                    case"select_node":case"deselect_node":
                        if(!!b.save_selected&&this.data.ui){
                            this.save_selected();
                            a.cookie(b.save_selected,this.data.ui.to_select.join(","),b.cookie_options)
                        }
                        break
                }
            }
        }
    });
    a.jstree.defaults.plugins.push("cookies")
})(jQuery);
(function(a){
    a.jstree.plugin("sort",{
        __init:function(){
            this.get_container().bind("load_node.jstree",a.proxy(function(d,b){
                var c=this._get_node(b.rslt.obj);
                c=c===-1?this.get_container().children("ul"):c.children("ul");
                this.sort(c)
            },this)).bind("rename_node.jstree",a.proxy(function(c,b){
                this.sort(b.rslt.obj.parent())
            },this)).bind("move_node.jstree",a.proxy(function(d,c){
                var b=c.rslt.np==-1?this.get_container():c.rslt.np;
                this.sort(b.children("ul"))
            },this))
        },
        defaults:function(d,c){
            return this.get_text(d)>this.get_text(c)?1:-1
        },
        _fn:{
            sort:function(d){
                var c=this._get_settings().sort,b=this;
                d.append(a.makeArray(d.children("li")).sort(a.proxy(c,b)));
                d.find("> li > ul").each(function(){
                    b.sort(a(this))
                });
                this.clean_node(d)
            }
        }
    })
})(jQuery);
(function(f){
    var h=false,c=false,a=false,b=false,e=false,g=false,d=false;
    f.vakata.dnd={
        is_down:false,
        is_drag:false,
        helper:false,
        scroll_spd:10,
        init_x:0,
        init_y:0,
        threshold:5,
        user_data:{},
        drag_start:function(l,k,i){
            if(f.vakata.dnd.is_drag){
                f.vakata.drag_stop({})
            }
            try{
                l.currentTarget.unselectable="on";
                l.currentTarget.onselectstart=function(){
                    return false
                };

                if(l.currentTarget.style){
                    l.currentTarget.style.MozUserSelect="none"
                }
            }catch(j){}
            f.vakata.dnd.init_x=l.pageX;
            f.vakata.dnd.init_y=l.pageY;
            f.vakata.dnd.user_data=k;
            f.vakata.dnd.is_down=true;
            f.vakata.dnd.helper=f("<div id='vakata-dragged'>").html(i).css("opacity","0.75");
            f(document).bind("mousemove",f.vakata.dnd.drag);
            f(document).bind("mouseup",f.vakata.dnd.drag_stop);
            return false
        },
        drag:function(k){
            if(!f.vakata.dnd.is_down){
                return
            }
            if(!f.vakata.dnd.is_drag){
                if(Math.abs(k.pageX-f.vakata.dnd.init_x)>5||Math.abs(k.pageY-f.vakata.dnd.init_y)>5){
                    f.vakata.dnd.helper.appendTo("body");
                    f.vakata.dnd.is_drag=true;
                    f(document).triggerHandler("drag_start.vakata",{
                        event:k,
                        data:f.vakata.dnd.user_data
                    })
                }else{
                    return
                }
            }
            if(k.type==="mousemove"){
                var m=f(document),j=m.scrollTop(),i=m.scrollLeft();
                if(k.pageY-j<20){
                    if(e&&g==="down"){
                        clearInterval(e);
                        e=false
                    }
                    if(!e){
                        g="up";
                        e=setInterval(function(){
                            f(document).scrollTop(f(document).scrollTop()-f.vakata.dnd.scroll_spd)
                        },150)
                    }
                }else{
                    if(e&&g==="up"){
                        clearInterval(e);
                        e=false
                    }
                }
                if(f(window).height()-(k.pageY-j)<20){
                    if(e&&g==="up"){
                        clearInterval(e);
                        e=false
                    }
                    if(!e){
                        g="down";
                        e=setInterval(function(){
                            f(document).scrollTop(f(document).scrollTop()+f.vakata.dnd.scroll_spd)
                        },150)
                    }
                }else{
                    if(e&&g==="down"){
                        clearInterval(e);
                        e=false
                    }
                }
                if(k.pageX-i<20){
                    if(b&&d==="right"){
                        clearInterval(b);
                        b=false
                    }
                    if(!b){
                        d="left";
                        b=setInterval(function(){
                            f(document).scrollLeft(f(document).scrollLeft()-f.vakata.dnd.scroll_spd)
                        },150)
                    }
                }else{
                    if(b&&d==="left"){
                        clearInterval(b);
                        b=false
                    }
                }
                if(f(window).width()-(k.pageX-i)<20){
                    if(b&&d==="left"){
                        clearInterval(b);
                        b=false
                    }
                    if(!b){
                        d="right";
                        b=setInterval(function(){
                            f(document).scrollLeft(f(document).scrollLeft()+f.vakata.dnd.scroll_spd)
                        },150)
                    }
                }else{
                    if(b&&d==="right"){
                        clearInterval(b);
                        b=false
                    }
                }
            }
            f.vakata.dnd.helper.css({
                left:(k.pageX+5)+"px",
                top:(k.pageY+10)+"px"
            });
            f(document).triggerHandler("drag.vakata",{
                event:k,
                data:f.vakata.dnd.user_data
            })
        },
        drag_stop:function(i){
            f(document).unbind("mousemove",f.vakata.dnd.drag);
            f(document).unbind("mouseup",f.vakata.dnd.drag_stop);
            f(document).triggerHandler("drag_stop.vakata",{
                event:i,
                data:f.vakata.dnd.user_data
            });
            f.vakata.dnd.helper.remove();
            f.vakata.dnd.init_x=0;
            f.vakata.dnd.init_y=0;
            f.vakata.dnd.user_data={};

            f.vakata.dnd.is_down=false;
            f.vakata.dnd.is_drag=false
        }
    };

    f(function(){
        var i="#vakata-dragged { display:block; margin:0 0 0 0; padding:4px 4px 4px 24px; position:absolute; top:-2000px; line-height:16px; z-index:10000; } ";
        f.vakata.css.add_sheet({
            str:i
        })
    });
    f.jstree.plugin("dnd",{
        __init:function(){
            this.data.dnd={
                active:false,
                after:false,
                inside:false,
                before:false,
                off:false,
                prepared:false,
                w:0,
                to1:false,
                to2:false,
                cof:false,
                cw:false,
                ch:false,
                i1:false,
                i2:false
            };

            this.get_container().bind("mouseenter.jstree",f.proxy(function(){
                if(f.vakata.dnd.is_drag&&f.vakata.dnd.user_data.jstree&&this.data.themes){
                    a.attr("class","jstree-"+this.data.themes.theme);
                    f.vakata.dnd.helper.attr("class","jstree-dnd-helper jstree-"+this.data.themes.theme)
                }
            },this)).bind("mouseleave.jstree",f.proxy(function(){
                if(f.vakata.dnd.is_drag&&f.vakata.dnd.user_data.jstree){
                    if(this.data.dnd.i1){
                        clearInterval(this.data.dnd.i1)
                    }
                    if(this.data.dnd.i2){
                        clearInterval(this.data.dnd.i2)
                    }
                }
            },this)).bind("mousemove.jstree",f.proxy(function(k){
                if(f.vakata.dnd.is_drag&&f.vakata.dnd.user_data.jstree){
                    var j=this.get_container()[0];
                    if(k.pageX+24>this.data.dnd.cof.left+this.data.dnd.cw){
                        if(this.data.dnd.i1){
                            clearInterval(this.data.dnd.i1)
                        }
                        this.data.dnd.i1=setInterval(f.proxy(function(){
                            this.scrollLeft+=f.vakata.dnd.scroll_spd
                        },j),100)
                    }else{
                        if(k.pageX-24<this.data.dnd.cof.left){
                            if(this.data.dnd.i1){
                                clearInterval(this.data.dnd.i1)
                            }
                            this.data.dnd.i1=setInterval(f.proxy(function(){
                                this.scrollLeft-=f.vakata.dnd.scroll_spd
                            },j),100)
                        }else{
                            if(this.data.dnd.i1){
                                clearInterval(this.data.dnd.i1)
                            }
                        }
                    }
                    if(k.pageY+24>this.data.dnd.cof.top+this.data.dnd.ch){
                        if(this.data.dnd.i2){
                            clearInterval(this.data.dnd.i2)
                        }
                        this.data.dnd.i2=setInterval(f.proxy(function(){
                            this.scrollTop+=f.vakata.dnd.scroll_spd
                        },j),100)
                    }else{
                        if(k.pageY-24<this.data.dnd.cof.top){
                            if(this.data.dnd.i2){
                                clearInterval(this.data.dnd.i2)
                            }
                            this.data.dnd.i2=setInterval(f.proxy(function(){
                                this.scrollTop-=f.vakata.dnd.scroll_spd
                            },j),100)
                        }else{
                            if(this.data.dnd.i2){
                                clearInterval(this.data.dnd.i2)
                            }
                        }
                    }
                }
            },this)).delegate("a","mousedown.jstree",f.proxy(function(j){
                if(j.which===1){
                    this.start_drag(j.currentTarget,j);
                    return false
                }
            },this)).delegate("a","mouseenter.jstree",f.proxy(function(j){
                if(f.vakata.dnd.is_drag&&f.vakata.dnd.user_data.jstree){
                    this.dnd_enter(j.currentTarget)
                }
            },this)).delegate("a","mousemove.jstree",f.proxy(function(j){
                if(f.vakata.dnd.is_drag&&f.vakata.dnd.user_data.jstree){
                    if(typeof this.data.dnd.off.top==="undefined"){
                        this.data.dnd.off=f(j.target).offset()
                    }
                    this.data.dnd.w=(j.pageY-(this.data.dnd.off.top||0))%this.data.core.li_height;
                    if(this.data.dnd.w<0){
                        this.data.dnd.w+=this.data.core.li_height
                    }
                    this.dnd_show()
                }
            },this)).delegate("a","mouseleave.jstree",f.proxy(function(j){
                if(f.vakata.dnd.is_drag&&f.vakata.dnd.user_data.jstree){
                    this.data.dnd.after=false;
                    this.data.dnd.before=false;
                    this.data.dnd.inside=false;
                    f.vakata.dnd.helper.children("ins").attr("class","jstree-invalid");
                    a.hide();
                    if(c&&c[0]===j.target.parentNode){
                        if(this.data.dnd.to1){
                            clearTimeout(this.data.dnd.to1);
                            this.data.dnd.to1=false
                        }
                        if(this.data.dnd.to2){
                            clearTimeout(this.data.dnd.to2);
                            this.data.dnd.to2=false
                        }
                    }
                }
            },this)).delegate("a","mouseup.jstree",f.proxy(function(j){
                if(f.vakata.dnd.is_drag&&f.vakata.dnd.user_data.jstree){
                    this.dnd_finish(j)
                }
            },this));
            f(document).bind("drag_stop.vakata",f.proxy(function(){
                this.data.dnd.after=false;
                this.data.dnd.before=false;
                this.data.dnd.inside=false;
                this.data.dnd.off=false;
                this.data.dnd.prepared=false;
                this.data.dnd.w=false;
                this.data.dnd.to1=false;
                this.data.dnd.to2=false;
                this.data.dnd.active=false;
                this.data.dnd.foreign=false;
                if(a){
                    a.css({
                        top:"-2000px"
                    })
                }
            },this)).bind("drag_start.vakata",f.proxy(function(l,j){
                if(j.data.jstree){
                    var k=f(j.event.target);
                    if(k.closest(".jstree").hasClass("jstree-"+this.get_index())){
                        this.dnd_enter(k)
                    }
                }
            },this));
            var i=this._get_settings().dnd;
            if(i.drag_target){
                f(document).delegate(i.drag_target,"mousedown.jstree",f.proxy(function(k){
                    h=k.target;
                    f.vakata.dnd.drag_start(k,{
                        jstree:true,
                        obj:k.target
                    },"<ins class='jstree-icon'></ins>"+f(k.target).text());
                    if(this.data.themes){
                        a.attr("class","jstree-"+this.data.themes.theme);
                        f.vakata.dnd.helper.attr("class","jstree-dnd-helper jstree-"+this.data.themes.theme)
                    }
                    f.vakata.dnd.helper.children("ins").attr("class","jstree-invalid");
                    var j=this.get_container();
                    this.data.dnd.cof=j.offset();
                    this.data.dnd.cw=parseInt(j.width(),10);
                    this.data.dnd.ch=parseInt(j.height(),10);
                    this.data.dnd.foreign=true;
                    return false
                },this))
            }
            if(i.drop_target){
                f(document).delegate(i.drop_target,"mouseenter.jstree",f.proxy(function(j){
                    if(this.data.dnd.active&&this._get_settings().dnd.drop_check.call(this,{
                        o:h,
                        r:f(j.target)
                    })){
                        f.vakata.dnd.helper.children("ins").attr("class","jstree-ok")
                    }
                },this)).delegate(i.drop_target,"mouseleave.jstree",f.proxy(function(j){
                    if(this.data.dnd.active){
                        f.vakata.dnd.helper.children("ins").attr("class","jstree-invalid")
                    }
                },this)).delegate(i.drop_target,"mouseup.jstree",f.proxy(function(j){
                    if(this.data.dnd.active&&f.vakata.dnd.helper.children("ins").hasClass("jstree-ok")){
                        this._get_settings().dnd.drop_finish.call(this,{
                            o:h,
                            r:f(j.target)
                        })
                    }
                },this))
            }
        },
        defaults:{
            copy_modifier:"ctrl",
            check_timeout:200,
            open_timeout:500,
            drop_target:".jstree-drop",
            drop_check:function(i){
                return true
            },
            drop_finish:f.noop,
            drag_target:".jstree-draggable",
            drag_finish:f.noop,
            drag_check:function(i){
                return{
                    after:false,
                    before:false,
                    inside:true
                }
            }
        },
        _fn:{
            dnd_prepare:function(){
                if(!c||!c.length){
                    return
                }
                this.data.dnd.off=c.offset();
                if(this._get_settings().core.rtl){
                    this.data.dnd.off.right=this.data.dnd.off.left+c.width()
                }
                if(this.data.dnd.foreign){
                    var i=this._get_settings().dnd.drag_check.call(this,{
                        o:h,
                        r:c
                    });
                    this.data.dnd.after=i.after;
                    this.data.dnd.before=i.before;
                    this.data.dnd.inside=i.inside;
                    this.data.dnd.prepared=true;
                    return this.dnd_show()
                }
                this.prepare_move(h,c,"before");
                this.data.dnd.before=this.check_move();
                this.prepare_move(h,c,"after");
                this.data.dnd.after=this.check_move();
                if(this._is_loaded(c)){
                    this.prepare_move(h,c,"inside");
                    this.data.dnd.inside=this.check_move()
                }else{
                    this.data.dnd.inside=false
                }
                this.data.dnd.prepared=true;
                return this.dnd_show()
            },
            dnd_show:function(){
                if(!this.data.dnd.prepared){
                    return
                }
                var k=["before","inside","after"],i=false,j=this._get_settings().core.rtl,l;
                if(this.data.dnd.w<this.data.core.li_height/3){
                    k=["before","inside","after"]
                }else{
                    if(this.data.dnd.w<=this.data.core.li_height*2/3){
                        k=this.data.dnd.w<this.data.core.li_height/2?["inside","before","after"]:["inside","after","before"]
                    }else{
                        k=["after","inside","before"]
                    }
                }
                f.each(k,f.proxy(function(m,n){
                    if(this.data.dnd[n]){
                        f.vakata.dnd.helper.children("ins").attr("class","jstree-ok");
                        i=n;
                        return false
                    }
                },this));
                if(i===false){
                    f.vakata.dnd.helper.children("ins").attr("class","jstree-invalid")
                }
                l=j?(this.data.dnd.off.right-18):(this.data.dnd.off.left+10);
                switch(i){
                    case"before":
                        a.css({
                            left:l+"px",
                            top:(this.data.dnd.off.top-6)+"px"
                        }).show();
                        break;
                    case"after":
                        a.css({
                            left:l+"px",
                            top:(this.data.dnd.off.top+this.data.core.li_height-7)+"px"
                        }).show();
                        break;
                    case"inside":
                        a.css({
                            left:l+(j?-4:4)+"px",
                            top:(this.data.dnd.off.top+this.data.core.li_height/2-5)+"px"
                        }).show();
                        break;
                    default:
                        a.hide();
                        break
                }
                return i
            },
            dnd_open:function(){
                this.data.dnd.to2=false;
                this.open_node(c,f.proxy(this.dnd_prepare,this),true)
            },
            dnd_finish:function(i){
                if(this.data.dnd.foreign){
                    if(this.data.dnd.after||this.data.dnd.before||this.data.dnd.inside){
                        this._get_settings().dnd.drag_finish.call(this,{
                            o:h,
                            r:c
                        })
                    }
                }else{
                    this.dnd_prepare();
                    this.move_node(h,c,this.dnd_show(),i[this._get_settings().dnd.copy_modifier+"Key"])
                }
                h=false;
                c=false;
                a.hide()
            },
            dnd_enter:function(j){
                var i=this._get_settings().dnd;
                this.data.dnd.prepared=false;
                c=this._get_node(j);
                if(i.check_timeout){
                    if(this.data.dnd.to1){
                        clearTimeout(this.data.dnd.to1)
                    }
                    this.data.dnd.to1=setTimeout(f.proxy(this.dnd_prepare,this),i.check_timeout)
                }else{
                    this.dnd_prepare()
                }
                if(i.open_timeout){
                    if(this.data.dnd.to2){
                        clearTimeout(this.data.dnd.to2)
                    }
                    if(c&&c.length&&c.hasClass("jstree-closed")){
                        this.data.dnd.to2=setTimeout(f.proxy(this.dnd_open,this),i.open_timeout)
                    }
                }else{
                    if(c&&c.length&&c.hasClass("jstree-closed")){
                        this.dnd_open()
                    }
                }
            },
            start_drag:function(k,j){
                h=this._get_node(k);
                if(this.data.ui&&this.is_selected(h)){
                    h=this._get_node(null,true)
                }
                f.vakata.dnd.drag_start(j,{
                    jstree:true,
                    obj:h
                },"<ins class='jstree-icon'></ins>"+(h.length>1?"Multiple selection":this.get_text(h)));
                if(this.data.themes){
                    a.attr("class","jstree-"+this.data.themes.theme);
                    f.vakata.dnd.helper.attr("class","jstree-dnd-helper jstree-"+this.data.themes.theme)
                }
                var i=this.get_container();
                this.data.dnd.cof=i.children("ul").offset();
                this.data.dnd.cw=parseInt(i.width(),10);
                this.data.dnd.ch=parseInt(i.height(),10);
                this.data.dnd.active=true
            }
        }
    });
    f(function(){
        var i="#vakata-dragged ins { display:block; text-decoration:none; width:16px; height:16px; margin:0 0 0 0; padding:0; position:absolute; top:4px; left:4px; } #vakata-dragged .jstree-ok { background:green; } #vakata-dragged .jstree-invalid { background:red; } #jstree-marker { padding:0; margin:0; line-height:12px; font-size:1px; overflow:hidden; height:12px; width:8px; position:absolute; top:-30px; z-index:10000; background-repeat:no-repeat; display:none; background-color:silver; } ";
        f.vakata.css.add_sheet({
            str:i
        });
        a=f("<div>").attr({
            id:"jstree-marker"
        }).hide().appendTo("body");
        f(document).bind("drag_start.vakata",function(k,j){
            if(j.data.jstree){
                a.show()
            }
        });
        f(document).bind("drag_stop.vakata",function(k,j){
            if(j.data.jstree){
                a.hide()
            }
        })
    })
})(jQuery);
(function(a){
    a.jstree.plugin("checkbox",{
        __init:function(){
            this.select_node=this.deselect_node=this.deselect_all=a.noop;
            this.get_selected=this.get_checked;
            this.get_container().bind("open_node.jstree create_node.jstree clean_node.jstree",a.proxy(function(c,b){
                this._prepare_checkboxes(b.rslt.obj)
            },this)).bind("loaded.jstree",a.proxy(function(b){
                this._prepare_checkboxes()
            },this)).delegate("a","click.jstree",a.proxy(function(b){
                if(this._get_node(b.target).hasClass("jstree-checked")){
                    this.uncheck_node(b.target)
                }else{
                    this.check_node(b.target)
                }
                if(this.data.ui){
                    this.save_selected()
                }
                if(this.data.cookies){
                    this.save_cookie("select_node")
                }
                b.preventDefault()
            },this))
        },
        __destroy:function(){
            this.get_container().find(".jstree-checkbox").remove()
        },
        _fn:{
            _prepare_checkboxes:function(d){
                d=!d||d==-1?this.get_container():this._get_node(d);
                var f,e=this,b;
                d.each(function(){
                    b=a(this);
                    f=b.is("li")&&b.hasClass("jstree-checked")?"jstree-checked":"jstree-unchecked";
                    b.find("a").not(":has(.jstree-checkbox)").prepend("<ins class='jstree-checkbox'>&#160;</ins>").parent().not(".jstree-checked, .jstree-unchecked").addClass(f)
                });
                if(d.is("li")){
                    this._repair_state(d)
                }else{
                    d.find("> ul > li").each(function(){
                        e._repair_state(this)
                    })
                }
            },
            change_state:function(c,b){
                c=this._get_node(c);
                b=(b===false||b===true)?b:c.hasClass("jstree-checked");
                if(b){
                    c.find("li").andSelf().removeClass("jstree-checked jstree-undetermined").addClass("jstree-unchecked")
                }else{
                    c.find("li").andSelf().removeClass("jstree-unchecked jstree-undetermined").addClass("jstree-checked");
                    if(this.data.ui){
                        this.data.ui.last_selected=c
                    }
                    this.data.checkbox.last_selected=c
                }
                c.parentsUntil(".jstree","li").each(function(){
                    var d=a(this);
                    if(b){
                        if(d.children("ul").children(".jstree-checked, .jstree-undetermined").length){
                            d.parentsUntil(".jstree","li").andSelf().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined");
                            return false
                        }else{
                            d.removeClass("jstree-checked jstree-undetermined").addClass("jstree-unchecked")
                        }
                    }else{
                        if(d.children("ul").children(".jstree-unchecked, .jstree-undetermined").length){
                            d.parentsUntil(".jstree","li").andSelf().removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined");
                            return false
                        }else{
                            d.removeClass("jstree-unchecked jstree-undetermined").addClass("jstree-checked")
                        }
                    }
                });
                if(this.data.ui){
                    this.data.ui.selected=this.get_checked()
                }
                this.__callback(c)
            },
            check_node:function(b){
                this.change_state(b,false)
            },
            uncheck_node:function(b){
                this.change_state(b,true)
            },
            check_all:function(){
                var b=this;
                this.get_container().children("ul").children("li").each(function(){
                    b.check_node(this,false)
                })
            },
            uncheck_all:function(){
                var b=this;
                this.get_container().children("ul").children("li").each(function(){
                    b.change_state(this,true)
                })
            },
            is_checked:function(b){
                b=this._get_node(b);
                return b.length?b.is(".jstree-checked"):false
            },
            get_checked:function(b){
                b=!b||b===-1?this.get_container():this._get_node(b);
                return b.find("> ul > .jstree-checked, .jstree-undetermined > ul > .jstree-checked")
            },
            get_unchecked:function(b){
                b=!b||b===-1?this.get_container():this._get_node(b);
                return b.find("> ul > .jstree-unchecked, .jstree-undetermined > ul > .jstree-unchecked")
            },
            show_checkboxes:function(){
                this.get_container().children("ul").removeClass("jstree-no-checkboxes")
            },
            hide_checkboxes:function(){
                this.get_container().children("ul").addClass("jstree-no-checkboxes")
            },
            _repair_state:function(f){
                f=this._get_node(f);
                if(!f.length){
                    return
                }
                var e=f.find("> ul > .jstree-checked").length,d=f.find("> ul > .jstree-undetermined").length,g=f.find("> ul > li").length;
                if(g===0){
                    if(f.hasClass("jstree-undetermined")){
                        this.check_node(f)
                    }
                }else{
                    if(e===0&&d===0){
                        this.uncheck_node(f)
                    }else{
                        if(e===g){
                            this.check_node(f)
                        }else{
                            f.parentsUntil(".jstree","li").removeClass("jstree-checked jstree-unchecked").addClass("jstree-undetermined")
                        }
                    }
                }
            },
            reselect:function(){
                if(this.data.ui){
                    var c=this,b=this.data.ui.to_select;
                    b=a.map(a.makeArray(b),function(d){
                        return"#"+d.toString().replace(/^#/,"").replace("\\/","/").replace("/","\\/")
                    });
                    this.deselect_all();
                    a.each(b,function(d,e){
                        c.check_node(e)
                    });
                    this.__callback()
                }
            }
        }
    })
})(jQuery);
(function(b){
    b.vakata.xslt=function(e,f,j){
        var c="",i,d,h,g;
        if(document.recalc){
            i=document.createElement("xml");
            d=document.createElement("xml");
            i.innerHTML=e;
            d.innerHTML=f;
            b("body").append(i).append(d);
            setTimeout((function(l,k,m){
                return function(){
                    m.call(null,l.transformNode(k.XMLDocument));
                    setTimeout((function(o,n){
                        return function(){
                            jQuery("body").remove(o).remove(n)
                        }
                    })(l,k),200)
                }
            })(i,d,j),100);
            return true
        }
        if(typeof window.DOMParser!=="undefined"&&typeof window.XMLHttpRequest!=="undefined"&&typeof window.XSLTProcessor!=="undefined"){
            h=new XSLTProcessor();
            g=b.isFunction(h.transformDocument)?(typeof window.XMLSerializer!=="undefined"):true;
            if(!g){
                return false
            }
            e=new DOMParser().parseFromString(e,"text/xml");
            f=new DOMParser().parseFromString(f,"text/xml");
            if(b.isFunction(h.transformDocument)){
                c=document.implementation.createDocument("","",null);
                h.transformDocument(e,f,c,null);
                j.call(null,XMLSerializer().serializeToString(c));
                return true
            }else{
                h.importStylesheet(f);
                c=h.transformToFragment(e,document);
                j.call(null,b("<div>").append(c).html());
                return true
            }
        }
        return false
    };

    var a={
        nest:'<?xml version="1.0" encoding="utf-8" ?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" ><xsl:output method="html" encoding="utf-8" omit-xml-declaration="yes" standalone="no" indent="no" media-type="text/html" /><xsl:template match="/">	<xsl:call-template name="nodes">		<xsl:with-param name="node" select="/root" />	</xsl:call-template></xsl:template><xsl:template name="nodes">	<xsl:param name="node" />	<ul>	<xsl:for-each select="$node/item">		<xsl:variable name="children" select="count(./item) &gt; 0" />		<li>			<xsl:attribute name="class">				<xsl:if test="position() = last()">jstree-last </xsl:if>				<xsl:choose>					<xsl:when test="@state = \'open\'">jstree-open </xsl:when>					<xsl:when test="$children or @hasChildren or @state = \'closed\'">jstree-closed </xsl:when>					<xsl:otherwise>jstree-leaf </xsl:otherwise>				</xsl:choose>				<xsl:value-of select="@class" />			</xsl:attribute>			<xsl:for-each select="@*">				<xsl:if test="name() != \'class\' and name() != \'state\' and name() != \'hasChildren\'">					<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>				</xsl:if>			</xsl:for-each>	<ins class="jstree-icon"><xsl:text>&#xa0;</xsl:text></ins>			<xsl:for-each select="content/name">				<a>				<xsl:attribute name="href">					<xsl:choose>					<xsl:when test="@href"><xsl:value-of select="@href" /></xsl:when>					<xsl:otherwise>#</xsl:otherwise>					</xsl:choose>				</xsl:attribute>				<xsl:attribute name="class"><xsl:value-of select="@lang" /> <xsl:value-of select="@class" /></xsl:attribute>				<xsl:attribute name="style"><xsl:value-of select="@style" /></xsl:attribute>				<xsl:for-each select="@*">					<xsl:if test="name() != \'style\' and name() != \'class\' and name() != \'href\'">						<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>					</xsl:if>				</xsl:for-each>					<ins>						<xsl:attribute name="class">jstree-icon 							<xsl:if test="string-length(attribute::icon) > 0 and not(contains(@icon,\'/\'))"><xsl:value-of select="@icon" /></xsl:if>						</xsl:attribute>						<xsl:if test="string-length(attribute::icon) > 0 and contains(@icon,\'/\')"><xsl:attribute name="style">background:url(<xsl:value-of select="@icon" />) center center no-repeat;</xsl:attribute></xsl:if>						<xsl:text>&#xa0;</xsl:text>					</ins>					<xsl:value-of select="current()" />				</a>			</xsl:for-each>			<xsl:if test="$children or @hasChildren"><xsl:call-template name="nodes"><xsl:with-param name="node" select="current()" /></xsl:call-template></xsl:if>		</li>	</xsl:for-each>	</ul></xsl:template></xsl:stylesheet>',
        flat:'<?xml version="1.0" encoding="utf-8" ?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" ><xsl:output method="html" encoding="utf-8" omit-xml-declaration="yes" standalone="no" indent="no" media-type="text/xml" /><xsl:template match="/">	<ul>	<xsl:for-each select="//item[not(@parent_id) or @parent_id=0 or not(@parent_id = //item/@id)]">		<xsl:call-template name="nodes">			<xsl:with-param name="node" select="." />			<xsl:with-param name="is_last" select="number(position() = last())" />		</xsl:call-template>	</xsl:for-each>	</ul></xsl:template><xsl:template name="nodes">	<xsl:param name="node" />	<xsl:param name="is_last" />	<xsl:variable name="children" select="count(//item[@parent_id=$node/attribute::id]) &gt; 0" />	<li>	<xsl:attribute name="class">		<xsl:if test="$is_last = true()">jstree-last </xsl:if>		<xsl:choose>			<xsl:when test="@state = \'open\'">jstree-open </xsl:when>			<xsl:when test="$children or @hasChildren or @state = \'closed\'">jstree-closed </xsl:when>			<xsl:otherwise>jstree-leaf </xsl:otherwise>		</xsl:choose>		<xsl:value-of select="@class" />	</xsl:attribute>	<xsl:for-each select="@*">		<xsl:if test="name() != \'parent_id\' and name() != \'hasChildren\' and name() != \'class\' and name() != \'state\'">		<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>		</xsl:if>	</xsl:for-each>	<ins class="jstree-icon"><xsl:text>&#xa0;</xsl:text></ins>	<xsl:for-each select="content/name">		<a>		<xsl:attribute name="href">			<xsl:choose>			<xsl:when test="@href"><xsl:value-of select="@href" /></xsl:when>			<xsl:otherwise>#</xsl:otherwise>			</xsl:choose>		</xsl:attribute>		<xsl:attribute name="class"><xsl:value-of select="@lang" /> <xsl:value-of select="@class" /></xsl:attribute>		<xsl:attribute name="style"><xsl:value-of select="@style" /></xsl:attribute>		<xsl:for-each select="@*">			<xsl:if test="name() != \'style\' and name() != \'class\' and name() != \'href\'">				<xsl:attribute name="{name()}"><xsl:value-of select="." /></xsl:attribute>			</xsl:if>		</xsl:for-each>			<ins>				<xsl:attribute name="class">jstree-icon 					<xsl:if test="string-length(attribute::icon) > 0 and not(contains(@icon,\'/\'))"><xsl:value-of select="@icon" /></xsl:if>				</xsl:attribute>				<xsl:if test="string-length(attribute::icon) > 0 and contains(@icon,\'/\')"><xsl:attribute name="style">background:url(<xsl:value-of select="@icon" />) center center no-repeat;</xsl:attribute></xsl:if>				<xsl:text>&#xa0;</xsl:text>			</ins>			<xsl:value-of select="current()" />		</a>	</xsl:for-each>	<xsl:if test="$children">		<ul>		<xsl:for-each select="//item[@parent_id=$node/attribute::id]">			<xsl:call-template name="nodes">				<xsl:with-param name="node" select="." />				<xsl:with-param name="is_last" select="number(position() = last())" />			</xsl:call-template>		</xsl:for-each>		</ul>	</xsl:if>	</li></xsl:template></xsl:stylesheet>'
    };

    b.jstree.plugin("xml_data",{
        defaults:{
            data:false,
            ajax:false,
            xsl:"flat",
            clean_node:false,
            correct_state:true
        },
        _fn:{
            load_node:function(e,c,d){
                var f=this;
                this.load_node_xml(e,function(){
                    f.__callback({
                        obj:e
                    });
                    c.call(this)
                },d)
            },
            _is_loaded:function(d){
                var c=this._get_settings().xml_data;
                d=this._get_node(d);
                return d==-1||!d||!c.ajax||d.is(".jstree-open, .jstree-leaf")||d.children("ul").children("li").size()>0
            },
            load_node_xml:function(g,c,e){
                var f=this.get_settings().xml_data,d=function(){},h=function(){};

                g=this._get_node(g);
                if(g&&g!==-1){
                    if(g.data("jstree-is-loading")){
                        return
                    }else{
                        g.data("jstree-is-loading",true)
                    }
                }
                switch(!0){
                    case (!f.data&&!f.ajax):
                        throw"Neither data nor ajax settings supplied.";
                    case (!!f.data&&!f.ajax)||(!!f.data&&!!f.ajax&&(!g||g===-1)):
                        if(!g||g==-1){
                            this.parse_xml(f.data,b.proxy(function(i){
                                if(i){
                                    i=i.replace(/ ?xmlns="[^"]*"/ig,"");
                                    if(i.length>10){
                                        i=b(i);
                                        this.get_container().children("ul").empty().append(i.children());
                                        if(f.clean_node){
                                            this.clean_node(g)
                                        }
                                        if(c){
                                            c.call(this)
                                        }
                                    }
                                }else{
                                    if(f.correct_state){
                                        this.get_container().children("ul").empty();
                                        if(c){
                                            c.call(this)
                                        }
                                    }
                                }
                            },this))
                        }
                        break;
                    case (!f.data&&!!f.ajax)||(!!f.data&&!!f.ajax&&g&&g!==-1):
                        d=function(j,k,l){
                            var i=this.get_settings().xml_data.ajax.error;
                            if(i){
                                i.call(this,j,k,l)
                            }
                            if(g!==-1&&g.length){
                                g.children(".jstree-loading").removeClass("jstree-loading");
                                g.data("jstree-is-loading",false);
                                if(k==="success"&&f.correct_state){
                                    g.removeClass("jstree-open jstree-closed").addClass("jstree-leaf")
                                }
                            }else{
                                if(k==="success"&&f.correct_state){
                                    this.get_container().children("ul").empty()
                                }
                            }
                            if(e){
                                e.call(this)
                            }
                        };

                        h=function(l,j,i){
                            l=i.responseText;
                            var k=this.get_settings().xml_data.ajax.success;
                            if(k){
                                l=k.call(this,l,j,i)||l
                            }
                            if(l==""){
                                return d.call(this,i,j,"")
                            }
                            this.parse_xml(l,b.proxy(function(m){
                                if(m){
                                    m=m.replace(/ ?xmlns="[^"]*"/ig,"");
                                    if(m.length>10){
                                        m=b(m);
                                        if(g===-1||!g){
                                            this.get_container().children("ul").empty().append(m.children())
                                        }else{
                                            g.children(".jstree-loading").removeClass("jstree-loading");
                                            g.append(m);
                                            g.data("jstree-is-loading",false)
                                        }
                                        if(f.clean_node){
                                            this.clean_node(g)
                                        }
                                        if(c){
                                            c.call(this)
                                        }
                                    }else{
                                        if(g&&g!==-1){
                                            g.children(".jstree-loading").removeClass("jstree-loading");
                                            g.data("jstree-is-loading",false);
                                            if(f.correct_state){
                                                g.removeClass("jstree-open jstree-closed").addClass("jstree-leaf");
                                                if(c){
                                                    c.call(this)
                                                }
                                            }
                                        }else{
                                            if(f.correct_state){
                                                this.get_container().children("ul").empty();
                                                if(c){
                                                    c.call(this)
                                                }
                                            }
                                        }
                                    }
                                }
                            },this))
                        };

                        f.ajax.context=this;
                        f.ajax.error=d;
                        f.ajax.success=h;
                        if(!f.ajax.dataType){
                            f.ajax.dataType="xml"
                        }
                        if(b.isFunction(f.ajax.url)){
                            f.ajax.url=f.ajax.url.call(this,g)
                        }
                        if(b.isFunction(f.ajax.data)){
                            f.ajax.data=f.ajax.data.call(this,g)
                        }
                        b.ajax(f.ajax);
                        break
                }
            },
            parse_xml:function(c,e){
                var d=this._get_settings().xml_data;
                b.vakata.xslt(c,a[d.xsl],e)
            },
            get_xml:function(k,h,e,c,m){
                var o="",n=this._get_settings(),i=this,g,f,l,j,d;
                if(!k){
                    k="flat"
                }
                if(!m){
                    m=0
                }
                h=this._get_node(h);
                if(!h||h===-1){
                    h=this.get_container().find("> ul > li")
                }
                e=b.isArray(e)?e:["id","class"];
                if(!m&&this.data.types&&b.inArray(n.types.type_attr,e)===-1){
                    e.push(n.types.type_attr)
                }
                c=b.isArray(c)?c:[];
                if(!m){
                    o+="<root>"
                }
                h.each(function(){
                    o+="<item";
                    l=b(this);
                    b.each(e,function(q,p){
                        o+=" "+p+'="'+(l.attr(p)||"").replace(/jstree[^ ]*|$/ig,"").replace(/^\s+$/ig,"")+'"'
                    });
                    if(l.hasClass("jstree-open")){
                        o+=' state="open"'
                    }
                    if(l.hasClass("jstree-closed")){
                        o+=' state="closed"'
                    }
                    if(k==="flat"){
                        o+=' parent_id="'+m+'"'
                    }
                    o+=">";
                    o+="<content>";
                    j=l.children("a");
                    j.each(function(){
                        g=b(this);
                        d=false;
                        o+="<name";
                        if(b.inArray("languages",n.plugins)!==-1){
                            b.each(n.languages,function(p,q){
                                if(g.hasClass(q)){
                                    o+=' lang="'+q+'"';
                                    d=q;
                                    return false
                                }
                            })
                        }
                        if(c.length){
                            b.each(c,function(p,q){
                                o+=" "+q+'="'+(g.attr(q)||"").replace(/jstree[^ ]*|$/ig,"")+'"'
                            })
                        }
                        if(g.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,"").replace(/^\s+$/ig,"").length){
                            o+=' icon="'+g.children("ins").get(0).className.replace(/jstree[^ ]*|$/ig,"").replace(/^\s+$/ig,"")+'"'
                        }
                        if(g.children("ins").get(0).style.backgroundImage.length){
                            o+=' icon="'+g.children("ins").get(0).style.backgroundImage.replace("url(","").replace(")","")+'"'
                        }
                        o+=">";
                        o+="<![CDATA["+i.get_text(g,d)+"]]>";
                        o+="</name>"
                    });
                    o+="</content>";
                    f=l[0].id;
                    l=l.find("> ul > li");
                    if(l.length){
                        f=i.get_xml(k,l,e,c,f)
                    }else{
                        f=""
                    }
                    if(k=="nest"){
                        o+=f
                    }
                    o+="</item>";
                    if(k=="flat"){
                        o+=f
                    }
                });
                if(!m){
                    o+="</root>"
                }
                return o
            }
        }
    })
})(jQuery);
(function(a){
    a.expr[":"].jstree_contains=function(c,d,b){
        return(c.textContent||c.innerText||"").toLowerCase().indexOf(b[3].toLowerCase())>=0
    };

    a.jstree.plugin("search",{
        __init:function(){
            this.data.search.str="";
            this.data.search.result=a()
        },
        defaults:{
            ajax:false,
            case_insensitive:false
        },
        _fn:{
            search:function(g,b){
                if(g===""){
                    return
                }
                var e=this.get_settings().search,d=this,c=function(){},f=function(){};

                this.data.search.str=g;
                if(!b&&e.ajax!==false&&this.get_container().find(".jstree-closed:eq(0)").length>0){
                    this.search.supress_callback=true;
                    c=function(){};

                    f=function(k,i,h){
                        var j=this.get_settings().search.ajax.success;
                        if(j){
                            k=j.call(this,k,i,h)||k
                        }
                        this.data.search.to_open=k;
                        this._search_open()
                    };

                    e.ajax.context=this;
                    e.ajax.error=c;
                    e.ajax.success=f;
                    if(a.isFunction(e.ajax.url)){
                        e.ajax.url=e.ajax.url.call(this,g)
                    }
                    if(a.isFunction(e.ajax.data)){
                        e.ajax.data=e.ajax.data.call(this,g)
                    }
                    if(!e.ajax.data){
                        e.ajax.data={
                            search_string:g
                        }
                    }
                    if(!e.ajax.dataType||/^json/.exec(e.ajax.dataType)){
                        e.ajax.dataType="json"
                    }
                    a.ajax(e.ajax);
                    return
                }
                if(this.data.search.result.length){
                    this.clear_search()
                }
                this.data.search.result=this.get_container().find("a"+(this.data.languages?"."+this.get_lang():"")+":"+(e.case_insensitive?"jstree_contains":"contains")+"("+this.data.search.str+")");
                this.data.search.result.addClass("jstree-search").parents(".jstree-closed").each(function(){
                    d.open_node(this,false,true)
                });
                this.__callback({
                    nodes:this.data.search.result,
                    str:g
                })
            },
            clear_search:function(b){
                this.data.search.result.removeClass("jstree-search");
                this.__callback(this.data.search.result);
                this.data.search.result=a()
            },
            _search_open:function(c){
                var f=this,b=true,e=[],d=[];
                if(this.data.search.to_open.length){
                    a.each(this.data.search.to_open,function(g,h){
                        if(h=="#"){
                            return true
                        }
                        if(a(h).length&&a(h).is(".jstree-closed")){
                            e.push(h)
                        }else{
                            d.push(h)
                        }
                    });
                    if(e.length){
                        this.data.search.to_open=d;
                        a.each(e,function(g,h){
                            f.open_node(h,function(){
                                f._search_open(true)
                            })
                        });
                        b=false
                    }
                }
                if(b){
                    this.search(this.data.search.str,true)
                }
            }
        }
    })
})(jQuery);
(function(a){
    a.vakata.context={
        cnt:a("<div id='vakata-contextmenu'>"),
        vis:false,
        tgt:false,
        par:false,
        func:false,
        data:false,
         /* add by mmd */
        base: 0,
        show:function(l,k,i,g,f,b){
            var e=a.vakata.context.parse(l,0),c,j;
            if(!e){
                return
            }
            a.vakata.context.vis=true;
            a.vakata.context.tgt=k;
            a.vakata.context.par=b||k||null;
            a.vakata.context.data=f||null;
            a.vakata.context.cnt.html(e).css({
                visibility:"hidden",
                display:"block",
                left:0,
                top:0
            });
            c=a.vakata.context.cnt.height();
            j=a.vakata.context.cnt.width();
            if(i+j>a(document).width()){
                i=a(document).width()-(j+5);
                a.vakata.context.cnt.find("li > ul").addClass("right")
            }
            if(g+c>a(document).height()){
                g=g-(c+k[0].offsetHeight);
                a.vakata.context.cnt.find("li > ul").addClass("bottom")
            }
            a.vakata.context.cnt.css({
                left:i,
                top:g
            }).find("li:has(ul)").bind("mouseenter",function(o){
                var d=a(document).width(),n=a(document).height(),m=a(this).children("ul").show();
                if(d!==a(document).width()){
                    m.toggleClass("right")
                }
                if(n!==a(document).height()){
                    m.toggleClass("bottom")
                }
            }).bind("mouseleave",function(d){
                a(this).children("ul").hide()
            }).end().css({
                visibility:"visible"
            }).show();
            a(document).triggerHandler("context_show.vakata")
        },
        hide:function(){
            a.vakata.context.vis=false;
            a.vakata.context.cnt.attr("class","").hide();
            a(document).triggerHandler("context_hide.vakata")
        },
        parse:function(e,d){
            if(!e){
                return false
            }
            var f="",c=false,b=true;
            if(d == 0){
                a.vakata.context.func={};
                /* add by mmd */
                a.vakata.context.extrat={};
                /* end */
            }
            f+="<ul>";

            a.each(e,function(g,h){
                /* add by mmd */
                g = g + a.vakata.context.base;
                if(!h){
                    return true
                }
                a.vakata.context.func[g]=h.action;
                /* add by mmd */
                if(h.extrat)
                    a.vakata.context.extrat[g]=h.extrat;
                else
                    a.vakata.context.extrat[g]= null;
                /* end */
                if(!b&&h.separator_before){
                    f+="<li class='vakata-separator vakata-separator-before'></li>"
                }
                b=false;
                f+="<li class='"+(h._class||"")+(h._disabled?" jstree-contextmenu-disabled ":"")+"'><ins ";
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
                    /* add by mmd */
                    a.vakata.context.base++;
                    c=a.vakata.context.parse(h.submenu,g);
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
            if(a.isFunction(a.vakata.context.func[b])){
                /* changed by mmd */
                //a.vakata.context.func[b].call(a.vakata.context.data,a.vakata.context.par);
                a.vakata.context.func[b].call(a.vakata.context.data,a.vakata.context.par,a.vakata.context.extrat[b]);
                return true
            }else{
                return false
            }
        }
    };

    a(function(){
        var b="#vakata-contextmenu { display:none; position:absolute; margin:0; padding:0; min-width:180px; background:#ebebeb; border:1px solid silver; z-index:10000; *width:180px; } #vakata-contextmenu ul { min-width:180px; *width:180px; } #vakata-contextmenu ul, #vakata-contextmenu li { margin:0; padding:0; list-style-type:none; display:block; } #vakata-contextmenu li { line-height:20px; min-height:20px; position:relative; padding:0px; } #vakata-contextmenu li a { padding:1px 6px; line-height:17px; display:block; text-decoration:none; margin:1px 1px 0 1px; } #vakata-contextmenu li ins { float:left; width:16px; height:16px; text-decoration:none; margin-right:2px; } #vakata-contextmenu li a:hover, #vakata-contextmenu li.vakata-hover > a { background:gray; color:white; } #vakata-contextmenu li ul { display:none; position:absolute; top:-2px; left:100%; background:#ebebeb; border:1px solid gray; } #vakata-contextmenu .right { right:100%; left:auto; } #vakata-contextmenu .bottom { bottom:-1px; top:auto; } #vakata-contextmenu li.vakata-separator { min-height:0; height:1px; line-height:1px; font-size:1px; overflow:hidden; margin:0 2px; background:silver; /* border-top:1px solid #fefefe; */ padding:0; } ";
        a.vakata.css.add_sheet({
            str:b
        });
        a.vakata.context.cnt.delegate("a","click",function(c){
            c.preventDefault()
        }).delegate("a","mouseup",function(c){
            if(!a(this).parent().hasClass("jstree-contextmenu-disabled")&&a.vakata.context.exec(a(this).attr("rel"))){
                a.vakata.context.hide()
            }else{
                a(this).blur()
            }
        }).delegate("a","mouseover",function(){
            a.vakata.context.cnt.find(".vakata-hover").removeClass("vakata-hover")
        }).appendTo("body");
        a(document).bind("mousedown",function(c){
            if(a.vakata.context.vis&&!a.contains(a.vakata.context.cnt[0],c.target)){
                a.vakata.context.hide()
            }
        });
        if(typeof a.hotkeys!=="undefined"){
            a(document).bind("keydown","up",function(c){
                if(a.vakata.context.vis){
                    var d=a.vakata.context.cnt.find("ul:visible").last().children(".vakata-hover").removeClass("vakata-hover").prevAll("li:not(.vakata-separator)").first();
                    if(!d.length){
                        d=a.vakata.context.cnt.find("ul:visible").last().children("li:not(.vakata-separator)").last()
                    }
                    d.addClass("vakata-hover");
                    c.stopImmediatePropagation();
                    c.preventDefault()
                }
            }).bind("keydown","down",function(c){
                if(a.vakata.context.vis){
                    var d=a.vakata.context.cnt.find("ul:visible").last().children(".vakata-hover").removeClass("vakata-hover").nextAll("li:not(.vakata-separator)").first();
                    if(!d.length){
                        d=a.vakata.context.cnt.find("ul:visible").last().children("li:not(.vakata-separator)").first()
                    }
                    d.addClass("vakata-hover");
                    c.stopImmediatePropagation();
                    c.preventDefault()
                }
            }).bind("keydown","right",function(c){
                if(a.vakata.context.vis){
                    a.vakata.context.cnt.find(".vakata-hover").children("ul").show().children("li:not(.vakata-separator)").removeClass("vakata-hover").first().addClass("vakata-hover");
                    c.stopImmediatePropagation();
                    c.preventDefault()
                }
            }).bind("keydown","left",function(c){
                if(a.vakata.context.vis){
                    a.vakata.context.cnt.find(".vakata-hover").children("ul").hide().children(".vakata-separator").removeClass("vakata-hover");
                    c.stopImmediatePropagation();
                    c.preventDefault()
                }
            }).bind("keydown","esc",function(c){
                a.vakata.context.hide();
                c.preventDefault()
            }).bind("keydown","space",function(c){
                a.vakata.context.cnt.find(".vakata-hover").last().children("a").click();
                c.preventDefault()
            })
        }
    });
    a.jstree.plugin("contextmenu",{
        __init:function(){
            this.get_container().delegate("a","contextmenu.jstree",a.proxy(function(b){
                b.preventDefault();
                this.show_contextmenu(b.currentTarget,b.pageX,b.pageY)
            },this)).bind("destroy.jstree",a.proxy(function(){
                if(this.data.contextmenu){
                    a.vakata.context.hide()
                }
            },this));
            a(document).bind("context_hide.vakata",a.proxy(function(){
                this.data.contextmenu=false
            },this))
        },
        defaults:{
            select_node:false,
            show_at_node:true,
            items:{
                create:{
                    separator_before:false,
                    separator_after:true,
                    label:"Create",
                    action:function(b){
                        this.create(b)
                    }
                },
                rename:{
                    separator_before:false,
                    separator_after:false,
                    label:"Rename",
                    action:function(b){
                        this.rename(b)
                    }
                },
                remove:{
                    separator_before:false,
                    icon:false,
                    separator_after:false,
                    label:"Delete",
                    action:function(b){
                        this.remove(b)
                    }
                },
                ccp:{
                    separator_before:true,
                    icon:false,
                    separator_after:false,
                    label:"Edit",
                    action:false,
                    submenu:{
                        cut:{
                            separator_before:false,
                            separator_after:false,
                            label:"Cut",
                            action:function(b){
                                this.cut(b)
                            }
                        },
                        copy:{
                            separator_before:false,
                            icon:false,
                            separator_after:false,
                            label:"Copy",
                            action:function(b){
                                this.copy(b)
                            }
                        },
                        paste:{
                            separator_before:false,
                            icon:false,
                            separator_after:false,
                            label:"Paste",
                            action:function(b){
                                this.paste(b)
                            }
                        }
                    }
                }
            }
        },
        _fn:{
            show_contextmenu:function(e,b,g){
                e=this._get_node(e);
                var d=this.get_settings().contextmenu,c=e.children("a:visible:eq(0)"),f=false;
                if(d.select_node&&this.data.ui&&!this.is_selected(e)){
                    this.deselect_all();
                    this.select_node(e,true)
                }
                if(d.show_at_node||typeof b==="undefined"||typeof g==="undefined"){
                    f=c.offset();
                    b=f.left;
                    g=f.top+this.data.core.li_height
                }
                if(a.isFunction(d.items)){
                    d.items=d.items.call(this,e)
                }
                this.data.contextmenu=true;
                a.vakata.context.show(d.items,c,b,g,this,e);
                if(this.data.themes){
                    a.vakata.context.cnt.attr("class","jstree-"+this.data.themes.theme+"-context")
                }
            }
        }
    })
})(jQuery);
(function(a){
    a.jstree.plugin("types",{
        __init:function(){
            var b=this._get_settings().types;
            this.data.types.attach_to=[];
            this.get_container().bind("init.jstree",a.proxy(function(){
                var e=b.types,d=b.type_attr,c="",f=this;
                a.each(e,function(g,h){
                    a.each(h,function(j,i){
                        if(!/^(max_depth|max_children|icon|valid_children)$/.test(j)){
                            f.data.types.attach_to.push(j)
                        }
                    });
                    if(!h.icon){
                        return true
                    }
                    if(h.icon.image||h.icon.position){
                        if(g=="default"){
                            c+=".jstree-"+f.get_index()+" a > .jstree-icon { "
                        }else{
                            c+=".jstree-"+f.get_index()+" li["+d+"="+g+"] > a > .jstree-icon { "
                        }
                        if(h.icon.image){
                            c+=" background-image:url("+h.icon.image+"); "
                        }
                        if(h.icon.position){
                            c+=" background-position:"+h.icon.position+"; "
                        }else{
                            c+=" background-position:0 0; "
                        }
                        c+="} "
                    }
                });
                if(c!=""){
                    a.vakata.css.add_sheet({
                        str:c
                    })
                }
            },this)).bind("before.jstree",a.proxy(function(g,f){
                if(a.inArray(f.func,this.data.types.attach_to)!==-1){
                    var d=this._get_settings().types.types,c=this._get_type(f.args[0]);
                    if(((d[c]&&typeof d[c][f.func]!=="undefined")||(d["default"]&&typeof d["default"][f.func]!=="undefined"))&&!this._check(f.func,f.args[0])){
                        g.stopImmediatePropagation();
                        return false
                    }
                }
            },this))
        },
        defaults:{
            max_children:-1,
            max_depth:-1,
            valid_children:"all",
            type_attr:"rel",
            types:{
                "default":{
                    max_children:-1,
                    max_depth:-1,
                    valid_children:"all"
                }
            }
        },
        _fn:{
            _get_type:function(b){
                b=this._get_node(b);
                return(!b||!b.length)?false:b.attr(this._get_settings().types.type_attr)||"default"
            },
            set_type:function(c,b){
                b=this._get_node(b);
                return(!b.length||!c)?false:b.attr(this._get_settings().types.type_attr,c)
            },
            _check:function(h,g,f){
                var b=false,c=this._get_type(g),i=0,j=this,e=this._get_settings().types;
                if(g===-1){
                    if(!!e[h]){
                        b=e[h]
                    }else{
                        return
                    }
                }else{
                    if(c===false){
                        return
                    }
                    if(!!e.types[c]&&!!e.types[c][h]){
                        b=e.types[c][h]
                    }else{
                        if(!!e.types["default"]&&!!e.types["default"][h]){
                            b=e.types["default"][h]
                        }
                    }
                }
                if(a.isFunction(b)){
                    b=b.call(this,g)
                }
                if(h==="max_depth"&&g!==-1&&f!==false&&e.max_depth!==-2&&b!==0){
                    this._get_node(g).children("a:eq(0)").parentsUntil(".jstree","li").each(function(d){
                        if(e.max_depth!==-1&&e.max_depth-(d+1)<=0){
                            b=0;
                            return false
                        }
                        i=(d===0)?b:j._check(h,this,false);
                        if(i!==-1&&i-(d+1)<=0){
                            b=0;
                            return false
                        }
                        if(i>=0&&(i-(d+1)<b||b<0)){
                            b=i-(d+1)
                        }
                        if(e.max_depth>=0&&(e.max_depth-(d+1)<b||b<0)){
                            b=e.max_depth-(d+1)
                        }
                    })
                }
                return b
            },
            check_move:function(){
                if(!this.__call_old()){
                    return false
                }
                var b=this._get_move(),g=b.rt._get_settings().types,i=b.rt._check("max_children",b.cr),h=b.rt._check("max_depth",b.cr),e=b.rt._check("valid_children",b.cr),f=0,j=1,c;
                if(e==="none"){
                    return false
                }
                if(a.isArray(e)&&b.ot&&b.ot._get_type){
                    b.o.each(function(){
                        if(a.inArray(b.ot._get_type(this),e)===-1){
                            j=false;
                            return false
                        }
                    });
                    if(j===false){
                        return false
                    }
                }
                if(g.max_children!==-2&&i!==-1){
                    f=b.cr===-1?this.get_container().children("> ul > li").not(b.o).length:b.cr.children("> ul > li").not(b.o).length;
                    if(f+b.o.length>i){
                        return false
                    }
                }
                if(g.max_depth!==-2&&h!==-1){
                    j=0;
                    if(h===0){
                        return false
                    }
                    if(typeof b.o.d==="undefined"){
                        c=b.o;
                        while(c.length>0){
                            c=c.find("> ul > li");
                            j++
                        }
                        b.o.d=j
                    }
                    if(h-b.o.d<0){
                        return false
                    }
                }
                return true
            },
            create_node:function(e,f,c,l,h,k){
                if(!k&&(h||this._is_loaded(e))){
                    var d=(f&&f.match(/^before|after$/i)&&e!==-1)?this._get_parent(e):this._get_node(e),m=this._get_settings().types,j=this._check("max_children",d),i=this._check("max_depth",d),g=this._check("valid_children",d),b;
                    if(!c){
                        c={}
                    }
                    if(g==="none"){
                        return false
                    }
                    if(a.isArray(g)){
                        if(!c.attr||!c.attr[m.type_attr]){
                            if(!c.attr){
                                c.attr={}
                            }
                            c.attr[m.type_attr]=g[0]
                        }else{
                            if(a.inArray(c.attr[m.type_attr],g)===-1){
                                return false
                            }
                        }
                    }
                    if(m.max_children!==-2&&j!==-1){
                        b=d===-1?this.get_container().children("> ul > li").length:d.children("> ul > li").length;
                        if(b+1>j){
                            return false
                        }
                    }
                    if(m.max_depth!==-2&&i!==-1&&(i-1)<0){
                        return false
                    }
                }
                return this.__call_old(true,e,f,c,l,h,k)
            }
        }
    })
})(jQuery);
(function(a){
    a.jstree.plugin("html_data",{
        __init:function(){
            this.data.html_data.original_container_html=this.get_container().find(" > ul > li").clone(true);
            this.data.html_data.original_container_html.find("li").andSelf().contents().filter(function(){
                return this.nodeType==3
            }).remove()
        },
        defaults:{
            data:false,
            ajax:false,
            correct_state:true
        },
        _fn:{
            load_node:function(d,b,c){
                var e=this;
                this.load_node_html(d,function(){
                    e.__callback({
                        obj:d
                    });
                    b.call(this)
                },c)
            },
            _is_loaded:function(b){
                b=this._get_node(b);
                return b==-1||!b||!this._get_settings().html_data.ajax||b.is(".jstree-open, .jstree-leaf")||b.children("ul").children("li").size()>0
            },
            load_node_html:function(g,b,e){
                var i,f=this.get_settings().html_data,c=function(){},h=function(){};

                g=this._get_node(g);
                if(g&&g!==-1){
                    if(g.data("jstree-is-loading")){
                        return
                    }else{
                        g.data("jstree-is-loading",true)
                    }
                }
                switch(!0){
                    case (!f.data&&!f.ajax):
                        if(!g||g==-1){
                            this.get_container().children("ul").empty().append(this.data.html_data.original_container_html).find("li, a").filter(function(){
                                return this.firstChild.tagName!=="INS"
                            }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon");
                            this.clean_node()
                        }
                        if(b){
                            b.call(this)
                        }
                        break;
                    case (!!f.data&&!f.ajax)||(!!f.data&&!!f.ajax&&(!g||g===-1)):
                        if(!g||g==-1){
                            i=a(f.data);
                            if(!i.is("ul")){
                                i=a("<ul>").append(i)
                            }
                            this.get_container().children("ul").empty().append(i.children()).find("li, a").filter(function(){
                                return this.firstChild.tagName!=="INS"
                            }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon");
                            this.clean_node()
                        }
                        if(b){
                            b.call(this)
                        }
                        break;
                    case (!f.data&&!!f.ajax)||(!!f.data&&!!f.ajax&&g&&g!==-1):
                        g=this._get_node(g);
                        c=function(j,k,l){
                            var d=this.get_settings().html_data.ajax.error;
                            if(d){
                                d.call(this,j,k,l)
                            }
                            if(g!=-1&&g.length){
                                g.children(".jstree-loading").removeClass("jstree-loading");
                                g.data("jstree-is-loading",false);
                                if(k==="success"&&f.correct_state){
                                    g.removeClass("jstree-open jstree-closed").addClass("jstree-leaf")
                                }
                            }else{
                                if(k==="success"&&f.correct_state){
                                    this.get_container().children("ul").empty()
                                }
                            }
                            if(e){
                                e.call(this)
                            }
                        };

                        h=function(m,k,j){
                            var l=this.get_settings().html_data.ajax.success;
                            if(l){
                                m=l.call(this,m,k,j)||m
                            }
                            if(m==""){
                                return c.call(this,j,k,"")
                            }
                            if(m){
                                m=a(m);
                                if(!m.is("ul")){
                                    m=a("<ul>").append(m)
                                }
                                if(g==-1||!g){
                                    this.get_container().children("ul").empty().append(m.children()).find("li, a").filter(function(){
                                        return this.firstChild.tagName!=="INS"
                                    }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon")
                                }else{
                                    g.children(".jstree-loading").removeClass("jstree-loading");
                                    g.append(m).find("li, a").filter(function(){
                                        return this.firstChild.tagName!=="INS"
                                    }).prepend("<ins class='jstree-icon'>&#160;</ins>").end().filter("a").children("ins:first-child").not(".jstree-icon").addClass("jstree-icon");
                                    g.data("jstree-is-loading",false)
                                }
                                this.clean_node(g);
                                if(b){
                                    b.call(this)
                                }
                            }else{
                                if(g&&g!==-1){
                                    g.children(".jstree-loading").removeClass("jstree-loading");
                                    g.data("jstree-is-loading",false);
                                    if(f.correct_state){
                                        g.removeClass("jstree-open jstree-closed").addClass("jstree-leaf");
                                        if(b){
                                            b.call(this)
                                        }
                                    }
                                }else{
                                    if(f.correct_state){
                                        this.get_container().children("ul").empty();
                                        if(b){
                                            b.call(this)
                                        }
                                    }
                                }
                            }
                        };

                        f.ajax.context=this;
                        f.ajax.error=c;
                        f.ajax.success=h;
                        if(!f.ajax.dataType){
                            f.ajax.dataType="html"
                        }
                        if(a.isFunction(f.ajax.url)){
                            f.ajax.url=f.ajax.url.call(this,g)
                        }
                        if(a.isFunction(f.ajax.data)){
                            f.ajax.data=f.ajax.data.call(this,g)
                        }
                        a.ajax(f.ajax);
                        break
                }
            }
        }
    });
    a.jstree.defaults.plugins.push("html_data")
})(jQuery);
(function(a){
    a.jstree.plugin("themeroller",{
        __init:function(){
            var b=this._get_settings().themeroller;
            this.get_container().addClass("ui-widget-content").delegate("a","mouseenter.jstree",function(){
                a(this).addClass(b.item_h)
            }).delegate("a","mouseleave.jstree",function(){
                a(this).removeClass(b.item_h)
            }).bind("open_node.jstree create_node.jstree",a.proxy(function(d,c){
                this._themeroller(c.rslt.obj)
            },this)).bind("loaded.jstree refresh.jstree",a.proxy(function(c){
                this._themeroller()
            },this)).bind("close_node.jstree",a.proxy(function(d,c){
                c.rslt.obj.children("ins").removeClass(b.opened).addClass(b.closed)
            },this)).bind("select_node.jstree",a.proxy(function(d,c){
                c.rslt.obj.children("a").addClass(b.item_a)
            },this)).bind("deselect_node.jstree deselect_all.jstree",a.proxy(function(d,c){
                this.get_container().find("."+b.item_a).removeClass(b.item_a).end().find(".jstree-clicked").addClass(b.item_a)
            },this)).bind("move_node.jstree",a.proxy(function(d,c){
                this._themeroller(c.rslt.o)
            },this))
        },
        __destroy:function(){
            var b=this._get_settings().themeroller,d=["ui-icon"];
            a.each(b,function(e,c){
                c=c.split(" ");
                if(c.length){
                    d=d.concat(c)
                }
            });
            this.get_container().removeClass("ui-widget-content").find("."+d.join(", .")).removeClass(d.join(" "))
        },
        _fn:{
            _themeroller:function(c){
                var b=this._get_settings().themeroller;
                c=!c||c==-1?this.get_container():this._get_node(c).parent();
                c.find("li.jstree-closed > ins.jstree-icon").removeClass(b.opened).addClass("ui-icon "+b.closed).end().find("li.jstree-open > ins.jstree-icon").removeClass(b.closed).addClass("ui-icon "+b.opened).end().find("a").addClass(b.item).children("ins.jstree-icon").addClass("ui-icon "+b.item_icon)
            }
        },
        defaults:{
            opened:"ui-icon-triangle-1-se",
            closed:"ui-icon-triangle-1-e",
            item:"ui-state-default",
            item_h:"ui-state-hover",
            item_a:"ui-state-active",
            item_icon:"ui-icon-folder-collapsed"
        }
    });
    a(function(){
        var b=".jstree .ui-icon { overflow:visible; } .jstree a { padding:0 2px; }";
        a.vakata.css.add_sheet({
            str:b
        })
    })
})(jQuery);
(function(a){
    a.jstree.plugin("unique",{
        __init:function(){
            this.get_container().bind("before.jstree",a.proxy(function(h,f){
                var b=[],d=true,g,c;
                if(f.func=="move_node"){
                    if(f.args[4]===true){
                        if(f.args[0].o&&f.args[0].o.length){
                            f.args[0].o.children("a").each(function(){
                                b.push(a(this).text().replace(/^\s+/g,""))
                            });
                            d=this._check_unique(b,f.args[0].np.find("> ul > li").not(f.args[0].o))
                        }
                    }
                }
                if(f.func=="create_node"){
                    if(f.args[4]||this._is_loaded(f.args[0])){
                        g=this._get_node(f.args[0]);
                        if(f.args[1]&&(f.args[1]==="before"||f.args[1]==="after")){
                            g=this._get_parent(f.args[0]);
                            if(!g||g===-1){
                                g=this.get_container()
                            }
                        }
                        if(typeof f.args[2]==="string"){
                            b.push(f.args[2])
                        }else{
                            if(!f.args[2]||!f.args[2].data){
                                b.push(this._get_settings().core.strings.new_node)
                            }else{
                                b.push(f.args[2].data)
                            }
                        }
                        d=this._check_unique(b,g.find("> ul > li"))
                    }
                }
                if(f.func=="rename_node"){
                    b.push(f.args[1]);
                    c=this._get_node(f.args[0]);
                    g=this._get_parent(c);
                    if(!g||g===-1){
                        g=this.get_container()
                    }
                    d=this._check_unique(b,g.find("> ul > li").not(c))
                }
                if(!d){
                    h.stopPropagation();
                    return false
                }
            },this))
        },
        _fn:{
            _check_unique:function(c,d){
                var b=[];
                d.children("a").each(function(){
                    b.push(a(this).text().replace(/^\s+/g,""))
                });
                if(!b.length||!c.length){
                    return true
                }
                b=b.sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g,"$1$2$4").replace(/,,+/g,",").replace(/,$/,"").split(",");
                if((b.length+c.length)!=b.concat(c).sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g,"$1$2$4").replace(/,,+/g,",").replace(/,$/,"").split(",").length){
                    return false
                }
                return true
            },
            check_move:function(){
                if(!this.__call_old()){
                    return false
                }
                var c=this._get_move(),b=[];
                if(c.o&&c.o.length){
                    c.o.children("a").each(function(){
                        b.push(a(this).text().replace(/^\s+/g,""))
                    });
                    return this._check_unique(b,c.np.find("> ul > li").not(c.o))
                }
                return true
            }
        }
    })
})(jQuery);
