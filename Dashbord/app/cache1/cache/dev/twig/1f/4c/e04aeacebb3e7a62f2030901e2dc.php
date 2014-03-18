<?php

/* Mep:Mep:new.html.twig */
class __TwigTemplate_1f4ce04aeacebb3e7a62f2030901e2dc extends Twig_Template
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

       \$('#date-deb').datetimepicker({
            showTime: false
        });

        \$('#list-meps').unbind('click').click(function(){
            
        });

        \$('.cancel-new-mep').unbind('click').click(function(){
            \$('.new-mep-container input, .new-mep-container textarea').val('');
        });

        \$('.validate-new-mep').unbind('click').click(function(){
            var data = {};
            data.label = \$('#label').find('input').val();
            data.type = \$('#type').find('select').val();
            data.idKm = \$('#id-km').find('input').val();
            data.idKmProject = \$('#id-km-project').find('input').val();
            data.description = \$('#description').find('textarea').val();
            data.note = \$('#note').find('textarea').val();

            \$('.new-mep-container').block();
            \$.ajax({
                    type: \"POST\",
                    url: \"";
        // line 43
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("mep_create"), "html", null, true);
        echo "\",
                    data: {data : MEP.toJson(data)},
                    dataType : 'json',
                    success: function(r) {
                        \$('.new-mep-container').unblock();
                        if(r.success) {
                            \$.blockUI.defaults.message = 'Création avec succée, redirection en cours ...';
                            \$.blockUI();
                            document.location = \"";
        // line 51
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("list_mep"), "html", null, true);
        echo "\";
                        }
                    },
                    error: (typeof error == 'function') ?error:null
            });
        });
    });
</script>
";
    }

    // line 60
    public function block_containerBlocl($context, array $blocks = array())
    {
        // line 61
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
\t <div id='type' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Type</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <select>
                        <option value='majeure'>Majeure</option>
                        <option value='mineure'>Mineure</option>
\t\t\t<option value='urgente'>Urgente</option>
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
        <div id='id-km-project' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>N° du KM du projet</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input type='text' size='15'>
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
            <label class='form-label-up'>Notes</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <textarea COLS='50' ROWS='3' ></textarea>
                </div>
            </div>
        </div>
        <div id='date-dep-mep' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Date MEP</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    
                    <input type=\"text\" name=\"date-deb\" id=\"date-deb\" >
                </div>
            </div>
        </div>
        <div id='heuremep' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Heure MEP</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <select>
                        ";
        // line 129
        $context['_parent'] = (array) $context;
        $context['_seq'] = twig_ensure_traversable(range(0, 5));
        foreach ($context['_seq'] as $context["_key"] => $context["i"]) {
            // line 130
            echo "                            <option value=\"";
            echo twig_escape_filter($this->env, $this->getContext($context, "i"), "html", null, true);
            echo "\">";
            echo twig_escape_filter($this->env, $this->getContext($context, "i"), "html", null, true);
            echo "</option>
                        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['i'], $context['_parent'], $context['loop']);
        $context = array_merge($_parent, array_intersect_key($context, $_parent));
        // line 132
        echo "                    </select>
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
        return "Mep:Mep:new.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }
}
