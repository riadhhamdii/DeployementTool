<?php

/* ConnexionUserBundle:User:new.html.twig */
class __TwigTemplate_84d2478e3888bc113f93e06965987e4a extends Twig_Template
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
</style>";
    }

    // line 69
    public function block_javascript($context, array $blocks = array())
    {
        // line 70
        echo "    ";
        $this->displayParentBlock("javascript", $context, $blocks);
        echo "
<script type='text/javascript'>
    \$(document).ready(function(){
        \$('.cancel-new-user').unbind('click').click(function(){
            \$('.new-user-container input, .new-mep-container textarea').val('');
        });

        \$('.validate-new-user').unbind('click').click(function(){

\t\t\tvar checkInput = true;

\t\t\tif ( \$('#loginInput').val() == '' ){
\t\t\t\t\$('#loginInput').css(\"border-color\", \"red\");
\t\t\t\tcheckInput = false;
\t\t\t}
\t\t\tif ( \$('#passwordInput').val() == '' ){
\t\t\t\t\$('#passwordInput').css(\"border-color\", \"red\");
\t\t\t\tcheckInput = false;
\t\t\t}
\t\t\tif ( \$('#firstnameInput').val() == '' ){
\t\t\t\t\$('#firstnameInput').css(\"border-color\", \"red\");
\t\t\t\tcheckInput = false;
\t\t\t}
\t\t\tif ( \$('#lastnameInput').val() == '' ){
\t\t\t\t\$('#lastnameInput').css(\"border-color\", \"red\");
\t\t\t\tcheckInput = false;
\t\t\t}
\t\t\tif ( \$('#emailInput').val() == '' ){
\t\t\t\t\$('#emailInput').css(\"border-color\", \"red\");
\t\t\t\tcheckInput = false;
\t\t\t}

\t\t\tif ( ! checkInput ){
\t\t\t\tjAlert(\"Veullez remplir tous les champs !!\", \"Erreur\");
\t\t\t}

\t\t\tif ( checkInput ){

\t\t\t\tvar data = {};
\t\t\t\tdata.login = \$('#login').find('input').val();
\t\t\t\tdata.password = \$('#password').find('input').val();
\t\t\t\tdata.firstname = \$('#firstname').find('input').val();
\t\t\t\tdata.lastname = \$('#lastname').find('input').val();
\t\t\t\tdata.email = \$('#email').find('input').val();
\t\t\t\tdata.admin = \$('#role').find('select').val();

\t\t\t\t\$('.new-mep-container').block();
\t\t\t\t\$.ajax({
\t\t\t\t\t\ttype: \"POST\",
\t\t\t\t\t\turl: \"";
        // line 119
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("user_create"), "html", null, true);
        echo "\",
\t\t\t\t\t\tdata: {data : MEP.toJson(data)},
\t\t\t\t\t\tdataType : 'json',
\t\t\t\t\t\tsuccess: function(r) {
\t\t\t\t\t\t\t\$('.new-mep-container').unblock();
\t\t\t\t\t\t\tif(r.success) {
\t\t\t\t\t\t\t\t\$.blockUI.defaults.message = 'Création avec success, redirection en cours ...';
\t\t\t\t\t\t\t\t\$.blockUI();
\t\t\t\t\t\t\t\tdocument.location = \"";
        // line 127
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("list_user"), "html", null, true);
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

    // line 137
    public function block_containerBlocl($context, array $blocks = array())
    {
        // line 138
        echo "<div class='new-user-container'>
    <div>
        <div id='login' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Login</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input id='loginInput' type='text' size='25'>
                </div>
            </div>
        </div>
        <div id='password' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Mot de passe</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input id='passwordInput' type='text' size='49'>
                </div>
            </div>
        </div>
        <div id='firstname' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Nom</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input id='firstnameInput' type='text' size='49'>
                </div>
            </div>
        </div>
        <div id='lastname' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Prénom</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input id='lastnameInput' type='text' size='49'>
                </div>
            </div>
        </div>
        <div id='email' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Email</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input id='emailInput' type='text' size='49'>
                </div>
            </div>
        </div>
        <div id='role' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Role</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <select>
                        <option value='0'>Demandeur</option>
                        <option value='1'>Administrateur</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div style=\"margin-left:370px; margin-top:28px\" class='cancel-new-user' id=\"className1\">Annuler</div>\t
\t\t<div style=\"margin-left:55px; margin-top:28px\" class='validate-new-user' id=\"className\">Valider</div>
    </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "ConnexionUserBundle:User:new.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }
}
