<?php

/* Mep:Mep:new.html.twig */
class __TwigTemplate_22c8c50733056ad8101f9af12aa71b26 extends Twig_Template
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
    .error {
        font: normal 10px arial;
        padding: 3px;
        margin: 3px;
        background-color: #ffc;
        border: 1px solid #c00;
    }
\t#className {
\t\t-moz-box-shadow:inset 0px 1px 0px 0px #ffffff;
\t\t-webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;
\t\tbox-shadow:inset 0px 1px 0px 0px #ffffff;
\t\tbackground-color:#ededed;
\t\t-moz-border-radius:6px;
\t\t-webkit-border-radius:6px;
\t\tborder-radius:6px;
\t\tborder:1px solid #dcdcdc;
\t\tdisplay:inline-block;
\t\tcolor:#308a9c;
\t\tfont-family:arial;
\t\tfont-size:14px;
\t\tfont-weight:bold;
\t\tpadding:6px 13px;
\t\ttext-decoration:none;
\t\ttext-shadow:1px 1px 0px #ffffff;
\t}#className:hover {
\t\tbackground-color:#dfdfdf;
\t}#className:active {
\t\tposition:relative;
\t\ttop:1px;
\t}
\t
\t#className1 {
\t\t-moz-box-shadow:inset 0px 1px 0px 0px #ffffff;
\t\t-webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;
\t\tbox-shadow:inset 0px 1px 0px 0px #ffffff;
\t\tbackground-color:#ededed;
\t\t-moz-border-radius:6px;
\t\t-webkit-border-radius:6px;
\t\tborder-radius:6px;
\t\tborder:1px solid #dcdcdc;
\t\tdisplay:inline-block;
\t\tcolor:#308a9c;
\t\tfont-family:arial;
\t\tfont-size:14px;
\t\tfont-weight:bold;
\t\tpadding:6px 13px;
\t\ttext-decoration:none;
\t\ttext-shadow:1px 1px 0px #ffffff;
\t}#className1:hover {
\t\tbackground-color:#dfdfdf;
\t}#className1:active {
\t\tposition:relative;
\t\ttop:1px;
\t}

\t
</style>
";
    }

    // line 70
    public function block_javascript($context, array $blocks = array())
    {
        // line 71
        echo "    ";
        $this->displayParentBlock("javascript", $context, $blocks);
        echo "
<script type='text/javascript'>


    \$(document).ready(function(){

\t\t\$('#datemepInput').datetimepicker({
            dateFormat :'yy-mm-dd',
            timeFormat:'hh:mm',
            changeYear: true,
            changeMonth: true,
            showTimepicker: true
        });

        \$('#list-meps').unbind('click').click(function(){
        });

        \$('.cancel-new-mep').unbind('click').click(function(){

\t\t\t\$('.new-mep-container input, .new-mep-container textarea').val('');

        });

        \$('.validate-new-mep').unbind('click').click(function(){

\t\t\tvar checkInput = true;

\t\t\tif ( \$('#labelInput').val() == '' ){
\t\t\t\t\$('#labelInput').css(\"border-color\", \"red\");
\t\t\t\tcheckInput = false;
\t\t\t}
\t\t\tif ( \$('#kmInput').val() == '' ){
\t\t\t\t\$('#kmInput').css(\"border-color\", \"red\");
\t\t\t\tcheckInput = false;
\t\t\t}
\t\t\tif ( \$('#kmprojetInput').val() == '' ){
\t\t\t\t\$('#kmprojetInput').css(\"border-color\", \"red\");
\t\t\t\tcheckInput = false;
\t\t\t}
\t\t\tif ( \$('#descriptionText').val() == '' ){
\t\t\t\t\$('#descriptionText').css(\"border-color\", \"red\");
\t\t\t\tcheckInput = false;
\t\t\t}
\t\t\tif ( \$('#notesText').val() == '' ){
\t\t\t\t\$('#notesText').css(\"border-color\", \"red\");
\t\t\t\tcheckInput = false;
\t\t\t}
\t\t\tif ( \$('#datemepInput').val() == '' ){
\t\t\t\t\$('#datemepInput').css(\"border-color\", \"red\");
\t\t\t\tcheckInput = false;
\t\t\t}

\t\t\tif ( ! checkInput ){
\t\t\t\tjAlert(\"Veullez remplir tous les champs !!\", \"Erreur\");
\t\t\t}

\t\t\tif ( checkInput ){

\t\t\t\tvar data = {};

\t\t\t\tdata.label = \$('#label').find('input').val();
\t\t\t\tdata.type = \$('#type').find('select').val();
\t\t\t\tdata.idKm = \$('#id-km').find('input').val();
\t\t\t\tdata.idKmProject = \$('#id-km-project').find('input').val();
\t\t\t\tdata.description = \$('#description').find('textarea').val();
\t\t\t\tdata.note = \$('#note').find('textarea').val();
\t\t\t\tdata.datemep = \$('#datemep').find('input').val();

\t\t\t\t\$('.new-mep-container').block();
\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: \"POST\",
\t\t\t\t\t\turl: \"";
        // line 142
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("mep_create"), "html", null, true);
        echo "\",
\t\t\t\t\t\tdata: {data : MEP.toJson(data)},
\t\t\t\t\t\tdataType : 'json',
\t\t\t\t\t\tsuccess: function(r) {
\t\t\t\t\t\t\t\$('.new-mep-container').unblock();
\t\t\t\t\t\t\tif(r.success) {
\t\t\t\t\t\t\t\t\$.blockUI.defaults.message = 'Création avec succée, redirection en cours ...';
\t\t\t\t\t\t\t\t\$.blockUI();
\t\t\t\t\t\t\t\tdocument.location = \"";
        // line 150
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("list_mep"), "html", null, true);
        echo "\";
\t\t\t\t\t\t\t}
\t\t\t\t\t\t},
\t\t\t\t\t\terror: (typeof error == 'function') ?error:null
\t\t\t\t});

\t\t\t}
        });
    });
</script>
";
    }

    // line 161
    public function block_containerBlocl($context, array $blocks = array())
    {
        // line 162
        echo "<div class='new-mep-container'>
    <div>
        <div id='label' t=1 style='width:100%;float:left'>
            <label class='form-label-up' for=\"firstname\">Label</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input id=\"labelInput\" type='text' size='49'>
                </div>
            </div>
        </div>
\t <div id='type' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Type</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <select id=\"typeSelect\">
                        <option value='majeure'>Majeure</option>
                        <option value='mineure'>Mineure</option>
\t\t\t\t\t\t<option value='urgente'>Urgente</option>
                    </select>
                </div>
            </div>
        </div>
        <div id='id-km' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Numero du Km</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input id=\"kmInput\" type='text' size='15'>
                </div>
            </div>
        </div>
        <div id='id-km-project' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>N° du KM du projet</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input id=\"kmprojetInput\" type='text' size='15'>
                </div>
            </div>
        </div>
        <div id='description' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Description</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <textarea id=\"descriptionText\" COLS='50' ROWS='3' ></textarea>
                </div>
            </div>
        </div>
        <div id='note' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Notes</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <textarea id=\"notesText\" COLS='50' ROWS='3' ></textarea>
                </div>
            </div>
        </div>
        <div id='datemep' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Date MEP</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input id=\"datemepInput\" type=\"text\" name=\"datemepInput\" size=\"15\">
                </div>
            </div>
        </div>
    </div>
    <div>        
    </div>
\t
\t<div style=\"margin-left:370px; margin-top:28px\" class='cancel-new-mep' id=\"className1\">Annuler</div>\t
\t<div style=\"margin-left:55px; margin-top:28px\" class='validate-new-mep' id=\"className\">Valider</div>
\t
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
