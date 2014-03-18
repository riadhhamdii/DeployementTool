jQuery.fn._height=jQuery.fn.height;jQuery.fn._width=jQuery.fn.width;jQuery.fn.height=function(){if(this[0]==window){return self.innerHeight||jQuery.boxModel&&document.documentElement.clientHeight||document.body.clientHeight}if(this[0]==document){return Math.max(document.body.scrollHeight,document.body.offsetHeight)}return this._height(arguments[0])};jQuery.fn.width=function(){if(this[0]==window){return self.innerWidth||jQuery.boxModel&&document.documentElement.clientWidth||document.body.clientWidth}if(this[0]==document){return Math.max(document.body.scrollWidth,document.body.offsetWidth)}return this._width(arguments[0])};jQuery.fn.innerHeight=function(){return this[0]==window||this[0]==document?this.height():this.css("display")!="none"?this[0].offsetHeight-(parseInt(this.css("borderTopWidth"))||0)-(parseInt(this.css("borderBottomWidth"))||0):this.height()+(parseInt(this.css("paddingTop"))||0)+(parseInt(this.css("paddingBottom"))||0)};jQuery.fn.innerWidth=function(){return this[0]==window||this[0]==document?this.width():this.css("display")!="none"?this[0].offsetWidth-(parseInt(this.css("borderLeftWidth"))||0)-(parseInt(this.css("borderRightWidth"))||0):this.height()+(parseInt(this.css("paddingLeft"))||0)+(parseInt(this.css("paddingRight"))||0)};jQuery.fn.outerHeight=function(){return this[0]==window||this[0]==document?this.height():this.css("display")!="none"?this[0].offsetHeight:this.height()+(parseInt(this.css("borderTopWidth"))||0)+(parseInt(this.css("borderBottomWidth"))||0)+(parseInt(this.css("paddingTop"))||0)+(parseInt(this.css("paddingBottom"))||0)};jQuery.fn.outerWidth=function(){return this[0]==window||this[0]==document?this.width():this.css("display")!="none"?this[0].offsetWidth:this.height()+(parseInt(this.css("borderLeftWidth"))||0)+(parseInt(this.css("borderRightWidth"))||0)+(parseInt(this.css("paddingLeft"))||0)+(parseInt(this.css("paddingRight"))||0)};jQuery.fn.scrollLeftM=function(){if(this[0]==window||this[0]==document){return self.pageXOffset||jQuery.boxModel&&document.documentElement.scrollLeft||document.body.scrollLeft}return this[0].scrollLeft};jQuery.fn.scrollTopM=function(){if(this[0]==window||this[0]==document){return self.pageYOffset||jQuery.boxModel&&document.documentElement.scrollTop||document.body.scrollTop}return this[0].scrollTop};jQuery.fn.offsetM=function(l,f){var h=0,g=0,c=this[0],i=this[0],e,d=0,k=0,l=jQuery.extend({margin:true,border:true,padding:false,scroll:true},l||{});do{h+=i.offsetLeft||0;g+=i.offsetTop||0;if(jQuery.browser.mozilla||jQuery.browser.msie){var j=parseInt(jQuery.css(i,"borderTopWidth"))||0;var b=parseInt(jQuery.css(i,"borderLeftWidth"))||0;h+=b;g+=j;if(jQuery.browser.mozilla&&i!=c&&jQuery.css(i,"overflow")!="visible"){h+=b;g+=j}}if(l.scroll){e=i.offsetParent;do{d+=i.scrollLeft||0;k+=i.scrollTop||0;i=i.parentNode;if(jQuery.browser.mozilla&&i!=c&&i!=e&&jQuery.css(i,"overflow")!="visible"){g+=parseInt(jQuery.css(i,"borderTopWidth"))||0;h+=parseInt(jQuery.css(i,"borderLeftWidth"))||0}}while(i!=e)}else{i=i.offsetParent}if(i&&(i.tagName.toLowerCase()=="body"||i.tagName.toLowerCase()=="html")){if((jQuery.browser.safari||(jQuery.browser.msie&&jQuery.boxModel))&&jQuery.css(i,"position")!="absolute"){h+=parseInt(jQuery.css(e,"marginLeft"))||0;g+=parseInt(jQuery.css(e,"marginTop"))||0}break}}while(i);if(!l.margin){h-=parseInt(jQuery.css(c,"marginLeft"))||0;g-=parseInt(jQuery.css(c,"marginTop"))||0}if(l.border&&(jQuery.browser.safari||jQuery.browser.opera)){h+=parseInt(jQuery.css(c,"borderLeftWidth"))||0;g+=parseInt(jQuery.css(c,"borderTopWidth"))||0}else{if(!l.border&&!(jQuery.browser.safari||jQuery.browser.opera)){h-=parseInt(jQuery.css(c,"borderLeftWidth"))||0;g-=parseInt(jQuery.css(c,"borderTopWidth"))||0}}if(l.padding){h+=parseInt(jQuery.css(c,"paddingLeft"))||0;g+=parseInt(jQuery.css(c,"paddingTop"))||0}if(l.scroll&&jQuery.browser.opera&&jQuery.css(c,"display")=="inline"){d-=c.scrollLeft||0;k-=c.scrollTop||0}var a=l.scroll?{top:g-k,left:h-d,scrollTop:k,scrollLeft:d}:{top:g,left:h};if(f){jQuery.extend(f,a);return this}else{return a}};(function(d){var b=[];d.fn.jdMenu=function(m){var l=d.extend({},arguments.callee.defaults,m);return this.each(function(){b.push(this);d(this).addClass("jd_menu_flag_root");this.$settings=d.extend({},l,{isVerticalMenu:d(this).is(".jd_menu_vertical")});a(this)})};d.fn.jdMenuShow=function(){return this.each(function(){i.apply(this)})};d.fn.jdMenuHide=function(){return this.each(function(){g.apply(this)})};d(window).bind("click",function(){d(b).find("ul:visible").jdMenuHide()}).bind("unload",function(){d(b).each(function(){this.$settings=null})});d.fn.jdMenu.defaults={activateDelay:750,showDelay:150,hideDelay:550,onShow:null,onHideCheck:null,onHide:null,onAnimate:null,onClick:null,offsetX:4,offsetY:2,iframe:d.browser.msie};d.fn.menuParentsUntil=function(m){var l=[];d(this[0]).parents().each(function(){l.push(this);return !d(this).is(m)});return this.pushStack(l,arguments)};function h(l){return d(l).parents("ul.jd_menu_flag_root")[0].$settings}function a(l){k(l);d("> li",l).hover(j,f).bind("click",c).find("> a.accessible").bind("click",e)}function k(l){d("> li",l).unbind("mouseover").unbind("mouseout").unbind("click").find("> a.accessible").unbind("click")}function j(){var l="jd_menu_hover"+(d(this).parent().is(".jd_menu_flag_root")?"_menubar":"");d(this).addClass(l).find("> a").addClass(l);if(this.$timer){clearTimeout(this.$timer)}if(d("> ul",this).size()>0){var o=h(this);var m=(d(this).parents("ul.jd_menu_flag_root").find("ul:visible").size()==0)?o.activateDelay:o.showDelay;var n=this;this.$timer=setTimeout(function(){i.apply(n)},m)}}function f(){d(this).removeClass("jd_menu_hover").removeClass("jd_menu_hover_menubar").find("> a").removeClass("jd_menu_hover").removeClass("jd_menu_hover_menubar");if(this.$timer){clearTimeout(this.$timer)}if(d(this).is(":visible")&&d("> ul",this).size()>0){var m=h(this);var l=d("> ul",this)[0];this.$timer=setTimeout(function(){g.apply(l)},m.hideDelay)}}function i(){var s=d("> ul",this).get(0);if(d(s).is(":visible")){return false}if(this.$timer){clearTimeout(this.$timer)}var D=h(this);if(D.onShow!=null&&D.onShow.apply(this)==false){return false}var z=d(this).parent().is(".jd_menu_flag_root");var E="jd_menu_active"+(z?"_menubar":"");d(this).addClass(E).find("> a").addClass(E);if(!z){var E="jd_menu_active"+(d(this).parent().parent().parent().is(".jd_menu_flag_root")?"_menubar":"");d(this).parent().parent().addClass(E).find("> a").addClass(E)}d(this).parent().find("> li > ul:visible").not(s).each(function(){g.apply(this)});a(s);var B=function(K,J,M,L){this.x1=K;this.x2=J;this.y1=M;this.y2=L};B.prototype.contains=function(J){return(this.x1<=J.x1&&J.x2<=this.x2)&&(this.y1<=J.y1&&J.y2<=this.y2)};B.prototype.transform=function(J,K){return new B(this.x1+J,this.x2+J,this.y1+K,this.y2+K)};B.prototype.nudgeX=function(J){if(this.x1<J.x1){return new B(J.x1,J.x1+(this.x2-this.x1),this.y1,this.y2)}else{if(this.x2>J.x2){return new B(J.x2-(this.x2-this.x1),J.x2,this.y1,this.y2)}}return this};B.prototype.nudgeY=function(J){if(this.y1<J.y1){return new B(this.x1,this.x2,J.y1,J.y1+(this.y2-this.y1))}else{if(this.y2>J.y2){return new B(this.x1,this.x2,J.y2-(this.y2-this.y1),J.y2)}}return this};var v=d(window).scrollLeftM();var u=d(window).scrollTopM();var H=d(window).innerWidth();var q=d(window).innerHeight();var C=new B(v,v+H,u,u+q);d(s).css({visibility:"hidden",left:0,top:0}).show();var l=d(s).outerWidth();var w=d(s).outerHeight();var m=d(this).parent();var I=m.outerWidth();var F=parseInt(m.css("borderLeftWidth"))+parseInt(m.css("borderRightWidth"));var t=d(this).outerHeight();var o=d(this).offsetM({border:false});d(s).hide().css({visibility:""});var G=[];G[0]=new B(o.left,o.left+l,o.top+t,o.top+t+w);G[1]=new B((o.left+I)-l,o.left+I,G[0].y1,G[0].y2);G[2]=G[0].nudgeX(C);G[3]=new B(o.left+I-F,o.left+I-F+l,o.top,o.top+w);G[4]=new B(G[3].x1,G[3].x2,G[0].y1-w,G[0].y1);G[5]=G[3].nudgeY(C);G[6]=new B(o.left,o.left+l,o.top-w,o.top);G[7]=new B((o.left+I)-l,o.left+I,G[6].y1,G[6].y2);G[8]=G[6].nudgeX(C);G[9]=new B(o.left-l,o.left,G[3].y1,G[3].y2);G[10]=new B(G[9].x1,G[9].x2,G[4].y1+t-w,G[4].y1+t);G[11]=G[10].nudgeY(C);var y=[];if(d(this).parent().is(".jd_menu_flag_root")&&!D.isVerticalMenu){y=[0,1,2,6,7,8,5,11]}else{y=[3,4,5,9,10,11,0,1,2,6,7,8]}var p=y[0];for(var A=0,x=y.length;A<x;A++){if(C.contains(G[y[A]])){p=y[A];break}}var r=G[p];d(this).add(d(this).parents()).each(function(){if(d(this).css("position")=="absolute"){var J=d(this).offset();r=r.transform(-J.left,-J.top);return false}});switch(p){case 3:r.y1+=D.offsetY;case 4:r.x1-=D.offsetX;break;case 9:r.y1+=D.offsetY;case 10:r.x1+=D.offsetX;break}if(D.iframe){d(s).bgiframe()}if(D.onAnimate){alert("vvv");d(s).css({left:r.x1,top:r.y1});D.onAnimate.apply(s,[true])}else{var n=40+d(s).parent().width();d(s).css({left:n,top:r.y1}).show()}return true}function g(n){if(!d(this).is(":visible")){return false}var m=h(this);if(m.onHideCheck!=null&&m.onHideCheck.apply(this)==false){return false}d("> li ul:visible",this).each(function(){g.apply(this,[false])});if(d(this).is(".jd_menu_flag_root")){alert("We are root");return false}var l=d("> li",this).add(d(this).parent());l.removeClass("jd_menu_hover").removeClass("jd_menu_hover_menubar").removeClass("jd_menu_active").removeClass("jd_menu_active_menubar").find("> a").removeClass("jd_menu_hover").removeClass("jd_menu_hover_menubar").removeClass("jd_menu_active").removeClass("jd_menu_active_menubar");k(this);d(this).each(function(){if(m.onAnimate!=null){m.onAnimate.apply(this,[false])}else{d(this).hide()}}).find("> .bgiframe").remove();if(m.onHide!=null){m.onHide.apply(this)}if(n==true){d(this).menuParentsUntil("ul.jd_menu_flag_root").removeClass("jd_menu_hover").removeClass("jd_menu_hover_menubar").not(".jd_menu_flag_root").filter("ul").each(function(){g.apply(this,[false])})}return true}function e(l){if(d(this).is(".accessible")){l.preventDefault()}}function c(o){o.stopPropagation();var m=h(this);if(m.onClick!=null&&m.onClick.apply(this)==false){return false}if(d("> ul",this).size()>0){i.apply(this)}else{if(o.target==this){var n=d("> a",o.target).not(".accessible");if(n.size()>0){var l=n.get(0);if(!l.onclick){window.open(l.href,l.target||"_self")}else{d(l).click()}}}}}})(jQuery);
