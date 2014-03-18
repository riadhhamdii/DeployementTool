<?php

/* Mep:Mep:search.html.twig */
class __TwigTemplate_14360599506213536cdbdd7153f060e1 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->blocks = array(
            'stylesheets' => array($this, 'block_stylesheets'),
            'javascript' => array($this, 'block_javascript'),
            'containerBlocl' => array($this, 'block_containerBlocl'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "::base.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->getParent($context)->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_stylesheets($context, array $blocks = array())
    {
        // line 4
        echo "    ";
        $this->displayParentBlock("stylesheets", $context, $blocks);
        echo "
<style>
    .form-label-up {
        margin-right: 20px !important;
        margin-bottom: 10px !important;
        width:250px !important;
        text-align:right !important;
    }
</style>
";
    }

    // line 14
    public function block_javascript($context, array $blocks = array())
    {
        // line 15
        echo "    ";
        $this->displayParentBlock("javascript", $context, $blocks);
        echo "
<script type='text/javascript'>
    \$(document).ready(function(){

    
 
        
    



        \$('#list-meps').unbind('click').click(function(){
            
        });

        \$('.cancel-new-mep').unbind('click').click(function(){
            \$('.new-mep-container input, .new-mep-container textarea').val('');
        });

        \$('.validate-new-mep').unbind('click').click(function(){

                                                                            //\$.blockUI.defaults.message = 'Suppression en cours ...';
                                                                //\$.blockUI();





            var data = {};
            data.label = \$('#label').find('input').val();
            data.type = \$('#type').find('select').val();
\t    data.status = \$('#type').find('select').val();
            data.idKm = \$('#id-km').find('input').val();

           /*\$('.new-mep-container').block();
            \$.ajax({
                    type: \"POST\",
                    url: \"";
        // line 52
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("list_mep"), "html", null, true);
        echo "\",
                    data: {data : MEP.toJson(data)},
                    dataType : 'json',
                    success: function(r) {
                        \$('#meps-container').unblock();
                        if(r.success) {
                            \$.blockUI.defaults.message = 'Création avec succée, redirection en cours ...'+r.response;
                            //\$.blockUI();
                            //document.location = \"";
        // line 60
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("list_mep"), "html", null, true);
        echo "\";
                        }
                    },
                    error: (typeof error == 'function') ?error:null
            });*/
        });
    });
</script>
";
    }

    // line 69
    public function block_containerBlocl($context, array $blocks = array())
    {
        // line 70
        echo "<div id=\"searchForm\" title=\"Dialog Title\" class='new-mep-container'>
    <div>
        <div id='label' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Label</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input type='text' size='35'>
                </div>
            </div>
        </div>
\t\t<div id='type' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Type</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <select>
\t\t\t\t\t\t<option value='urgente'>Urgente</option>                        
                        <option value='mineure'>Mineure</option>
\t\t\t\t\t\t<option value='majeure'>Majeure</option>\t\t\t\t\t\t
                    </select>
                </div>
            </div>
        </div>
\t\t<div id='status' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Etat</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>\t\t\t\t\t
                    <select>
                        <option value='0'>En attente</option>
                        <option value='1'>En cours</option>
\t\t\t\t\t\t<option value='2'>AnnulÃ©e</option>
\t\t\t\t\t\t<option value='3'>TerminÃ©e</option>
\t\t\t\t\t\t<option value='4'>EchouÃ©e</option>
                    </select>
                </div>
            </div>
        </div>
        <div id='id-km' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Numero du Km</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input type='text' size='15'>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class='validate-new-mep'>Valider</div>
        <div class='cancel-new-mep'>Annuler</div>
    </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "Mep:Mep:search.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }
}
