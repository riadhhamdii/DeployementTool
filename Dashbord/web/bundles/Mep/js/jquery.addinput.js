(function(a){a.fn.DynInput=function(o){var e={placeholder:"Entrez un text",path:"",size:40,maxlength:255,width:null,height:null};var f=0;var b=a.extend(e,o);var g=a(this).attr("id");var d="";var i=function(){c();return false};var h=function(q,p){if(p.attr("id")!=d){p.parents("p").fadeOut("slow","linear",function(){a(this).remove()})}return false};var k=function(){var p=g+"_dynimg_"+f;a("#"+g+" p:last").append('<a href="#" id="'+p+'"><img src="'+b.path+'/public/js/generate/pluguins/images/x.png" width="9" height="9" class="ui-jqdialog-dyninput-remove" ></a>');a("#"+p).bind("click",function(){h("del",a(this))})};var m=function(p){if(p.keyCode=="13"){p.preventDefault()}if(!a(this).hasClass("defClass")&&(!a("#"+g+" input:last").hasClass("defClass"))){k();c();return false}};var j=function(p){var q=a("#"+p);if(q.hasClass("defClass")){h("Emty",q)}return false};var c=function(p){p=typeof(p)!="undefined"?p:"";f++;d=g+"_dyninput_"+f;a("#"+g).find("input").each(function(){a(a(this)).unbind("click",i)});a("#"+g).append("<p></p>");a("#"+g+" p:last").hide();a("#"+g+" p:last").append('<input type="text" id="'+d+'" size="'+b.size+'" maxlength="'+b.maxlength+'" name="'+g+'[]" value="'+b.placeholder+'" placeholder="'+b.placeholder+'" calss="defClass" />');a("#"+g+" p:last").fadeIn("slow");a("#"+d).attr("class","defClass");l(d);a("#"+d).keyup(m);a("#"+d).change(m);var q=document.getElementById(g);q.scrollTop=q.scrollHeight};var n=function(){a("#"+g).addClass("ui-jqdialog-dyninput");a("#"+g).css("width",b.width);a("#"+g).css("height",b.height);a("#"+g).css("overflow","auto");a("#"+g).find("span").each(function(){var p=a.trim(a(this).html());if(p!=""){c(p);k()}a(this).remove()});c()};var l=function(p){a("#"+g+" p:last").find("input").focus(function(){if(a(this).val()==a(this).attr("placeholder")){a(this).removeClass("defClass");a(this).val("")}}).blur(function(){if(a(this).val()==""){a(this).addClass("defClass");a(this).val(a(this).attr("placeholder"));j(p)}})};a(this).each(n);return a(this)}})(jQuery);