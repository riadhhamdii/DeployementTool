(function(a){a.addContainer=function(d,e){if(d.inp){return false}e=a.extend({path:"",label:"",height:200,width:300,isDraggable:0,selectEvent:null},e);var c={populate:function(){a(d).find(".n:first").html(e.label);a(d).find(".no:first").height(parseInt(e.height)+51);a(d).find(".mbcontainercontent:first").height(e.height);a(d).find(".no:first").width(parseInt(e.width)+60);a(d).find(".mbcontainercontent:first").width(e.width);if(parseInt(e.isDraggable)==1){a(d).find(".containerPlus:first").draggable()}else{a(d).find(".containerPlus:first").draggable("destroy")}}};if(parseInt(e.isDraggable)==1){a(d).find(".containerPlus:first").draggable()}else{a(d).find(".containerPlus:first").draggable("destroy")}d.p=e;d.inp=c;return d};var b=false;a(document).ready(function(){b=true});a.fn.container=function(c){return this.each(function(){a.addContainer(this,c)})};a.fn.reload=function(){return this.each(function(){if(this.inp){this.inp.populate()}})};a.fn.options=function(c){return this.each(function(){if(this.inp){a.extend(this.p,c)}})}})(jQuery);