(function(a){a.fn.checkbox=function(b,c){if(b==""){b=1}if(typeof(b.add)=="undefined"){add=false}else{add=b.add}if(!add){this.find("ul").find("li").remove()}if(b.nb==1){if(b.check[0]==false){this.find("ul").append('<li><input type="checkbox"  class="" /><label>'+b.value[0]+"</label></li>")}else{this.find("ul").append('<li><input type="checkbox" class="" checked='+b.check[0]+" /><label>"+b.value[0]+"</label></li>")}}else{for(i=0;i<b.nb;i++){if(b.check[i]==false){this.find("ul").append('<li><input type="checkbox"  class="" /><label>'+b.value[i]+"</label></li>")}else{this.find("ul").append('<li><input type="checkbox" class="" checked='+b.check[i]+" /><label>"+b.value[i]+"</label></li>")}}}};a.fn.updatecheckbox=function(b,c){if(b==""){b=1}this.find("ul").find("li:eq("+b.pos+")").remove()};a.fn.validateMin=function(b,c){$obj=this;this.find("input[type=checkbox]").each(function(){a(this).click(function(){$cmp=0;a(this).parent().parent().find("input[type=checkbox]:checked").each(function(){$cmp=$cmp+1});if($cmp<parseInt(b.Min)){a.validationEngine.buildPrompt(a(this),"le nombre minimale est "+b.Min,"error");a(this).parent().find("input[type=checkbox]").click(function(){a.validationEngine.closePrompt(".formError",true)})}})})};a.fn.validateMax=function(b,c){$obj=this;this.find("input[type=checkbox]").each(function(){a(this).click(function(){$count=0;a(this).parent().parent().find("input[type=checkbox]:checked").each(function(){$count=$count+1});if($count>b.Max){a.validationEngine.buildPrompt(a(this),"le nombre maximale est "+b.Max,"error");a(this).parent().find("input[type=checkbox]").click(function(){a.validationEngine.closePrompt(".formError",true)})}})})};a.fn.toggleCheckboxes=function(b,d){b=b||"*";d=d||false;var c=a([]);this.each(function(){var e=a("input[type=checkbox]",this).filter(b).each(function(){this.checked=!this.checked}).filter(":checked");c=e});if(!d){c=this}return c};a.fn.checkCheckboxes=function(b,d){b=b||"*";d=d||false;var c=a([]);this.each(function(){var e=a("input[type=checkbox]",this).filter(b).each(function(){this.checked=true}).filter(":checked");c=e});if(!d){c=this}return c};a.fn.unCheckCheckboxes=function(c,b){c=c||"*";b=b||false;var d=a([]);this.each(function(){var e=a("input[type=checkbox]",this).filter(c).each(function(){this.checked=false}).filter(":not(:checked)");d=e});if(!b){d=this}return d};a.radioCheckboxGroup=function(c,d){d=d||"*";var e="input[type=checkbox]";if(c){e+="[name="+c+"]"}var b=a(e).filter(d);b.click(function(){b.not(this).each(function(){this.checked=false}).end()})}})(jQuery);