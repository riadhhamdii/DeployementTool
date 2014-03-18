<?php

/* ConnexionUserBundle:User:new.html.twig */
class __TwigTemplate_467657cad43f042e9c3c2ba5c88b57cf extends Twig_Template
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
        \$('.cancel-new-user').unbind('click').click(function(){
            \$('.new-user-container input, .new-mep-container textarea').val('');
        });

        \$('.validate-new-user').unbind('click').click(function(){
            var data = {};
            data.login = \$('#login').find('input').val();
            data.password = \$('#password').find('input').val();
            data.firstname = \$('#firstname').find('input').val();
            data.lastname = \$('#lastname').find('input').val();
            data.email = \$('#email').find('input').val();
            data.admin = \$('#role').find('select').val();

            \$('.new-mep-container').block();
            \$.ajax({
                    type: \"POST\",
                    url: \"";
        // line 34
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("user_create"), "html", null, true);
        echo "\",
                    data: {data : MEP.toJson(data)},
                    dataType : 'json',
                    success: function(r) {
                        \$('.new-mep-container').unblock();
                        if(r.success) {
                            \$.blockUI.defaults.message = 'Création avec success, redirection en cour...';
                            \$.blockUI();
                            document.location = \"";
        // line 42
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

    // line 51
    public function block_containerBlocl($context, array $blocks = array())
    {
        // line 52
        echo "<div class='new-user-container'>
    <div>
        <div id='login' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Login</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input type='text' size='49'>
                </div>
            </div>
        </div>
        <div id='password' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Mot de passe</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input type='text' size='49'>
                </div>
            </div>
        </div>
        <div id='firstname' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Nom</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input type='text' size='49'>
                </div>
            </div>
        </div>
        <div id='lastname' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Prénom</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input type='text' size='49'>
                </div>
            </div>
        </div>
        <div id='email' t=1 style='width:100%;float:left'>
            <label class='form-label-up'>Email</label>
            <div class='form-input' style='display:inline-block'>
                <div class='question-input'>
                    <input type='text' size='49'>
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
        <div class='validate-new-user'>Valider</div>
        <div class='cancel-new-user'>Annuler</div>
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
