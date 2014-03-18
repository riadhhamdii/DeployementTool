<?php

/* Mep:Mep:edit.html.twig */
class __TwigTemplate_2526a2094c86601ce2cb28a73a3e42d3 extends Twig_Template
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
            var data = {};
            data.id = ";
        // line 28
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "id_mep"), "html", null, true);
        echo ";
            data.label = \$('#label').find('input').val();
\t\t\tdata.status = \$('#status').find('select').val();
            data.type = \$('#type').find('select').val();
            data.idKm = \$('#id-km').find('input').val();
            data.idKmProject = \$('#id-km-project').find('input').val();
            data.description = \$('#description').find('textarea').val();
            data.note = \$('#note').find('textarea').val();

            \$('.new-mep-container').block();
            \$.ajax({
                    type: \"POST\",
                    url: \"";
        // line 40
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("mep_update"), "html", null, true);
        echo "\",
                    data: {data : MEP.toJson(data)},
                    dataType : 'json',
                    success: function(r) {
                        \$('.new-mep-container').unblock();
                        if(r.success) {
                            \$.blockUI.defaults.message = 'Modification avec succé, redirection en cours ...';
                            \$.blockUI();
                            document.location = \"";
        // line 48
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("list_mep"), "html", null, true);
        echo "\";
                        }
                    },
                    error: (typeof error == 'function') ?error:null
            });
        });

        resetValues = function() {
            \$('#label').find('input').val('";
        // line 56
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "label_mep"), "html", null, true);
        echo "');
\t\t\t\$('#type').find('select').find('option[value=";
        // line 57
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "type_mep"), "html", null, true);
        echo "]').attr('selected','selected');
\t\t\t//\$('#status').find('input').val('";
        // line 58
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "status_mep"), "html", null, true);
        echo "');
\t\t\t\$('#status').find('select').find('option[value=";
        // line 59
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "status_mep"), "html", null, true);
        echo "]').attr('selected','selected');
            \$('#id-km').find('input').val('";
        // line 60
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "id_km_mep"), "html", null, true);
        echo "');
            \$('#id-km-project').find('input').val('";
        // line 61
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "id_km_project"), "html", null, true);
        echo "');
            \$('#description').find('textarea').val('";
        // line 62
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "description_mep"), "html", null, true);
        echo "');
            \$('#note').find('textarea').val('";
        // line 63
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "notes_mep"), "html", null, true);
        echo "');
        }
        resetValues();
    });
</script>
";
    }

    // line 69
    public function block_containerBlocl($context, array $blocks = array())
    {
        // line 70
        echo "<div class='new-mep-container'>
    <div>
        <div id='label' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Label</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input type='text' size='49'>
                </div>
            </div>
        </div>
\t\t<div id='type' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Type</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>\t\t\t\t    
                    <select>
                        <option value='majeure'>Majeure</option>
                        <option value='mineure'>Mineure</option>
\t\t\t\t\t\t<option value='urgente'>Urgente</option>
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
\t\t\t\t\t\t<option value='2'>Annulée</option>
\t\t\t\t\t\t<option value='3'>Terminée</option>
\t\t\t\t\t\t<option value='4'>Echouée</option>
                    </select>
                </div>
            </div>
        </div>
        <div id='id-km' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Id Km</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input type='text' size='49'>
                </div>
            </div>
        </div>
        <div id='id-km-project' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Id Km du projet</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input type='text' size='49'>
                </div>
            </div>
        </div>
        <div id='description' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Description</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <textarea COLS='50' ROWS='3' ></textarea>
                </div>
            </div>
        </div>
        <div id='note' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Note</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <textarea COLS='50' ROWS='3' ></textarea>
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
        return "Mep:Mep:edit.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }
}
