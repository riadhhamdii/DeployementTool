(function(a){a.addParagraphe=function(d,e){if(d.inp){return false}e=a.extend({label:"",content:"",selectEvent:null},e);var c={populate:function(){a(d).find(".form-html").html(e.content)}};c.gDiv=a("<div>");c.iDiv=a("<div>");c.isDiv=a("<div>");c.iCont=a("<div>");c.iArea=a("<textarea>");c.gDiv.css({display:"inline-block"});a(d).before(c.gDiv);a(d).append(c.gDiv);a(c.iDiv).addClass("form-input");a(c.isDiv).addClass("question-input");a(c.iDiv).append(c.isDiv);a(c.gDiv).append(c.iDiv);a(c.iArea).hide().width("625px");a(c.isDiv).append(c.iArea);a(c.isDiv).append(c.iCont);a(c.iCont).addClass("form-html").html(e.content);d.p=e;d.inp=c;return d};var b=false;a(document).ready(function(){b=true});a.fn.paragraphe=function(c){return this.each(function(){a.addParagraphe(this,c)})};a.fn.reload=function(){return this.each(function(){if(this.inp){this.inp.populate()}})};a.fn.options=function(c){return this.each(function(){if(this.inp){a.extend(this.p,c)}})}})(jQuery);
