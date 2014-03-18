<?php

/* ConnexionUserBundle:User:edit.html.twig */
class __TwigTemplate_5e5dc1c1c5ce6ee97cd880d17be87988 extends Twig_Template
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
\t\t\tdata.id = ";
        // line 24
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "user"), "id_user"), "html", null, true);
        echo ";
            data.login = \$('#login').find('input').val();
            data.firstname = \$('#firstname').find('input').val();
            data.lastname = \$('#lastname').find('input').val();
            data.email = \$('#email').find('input').val();
            data.admin = \$('#role').find('select').val();

            \$('.new-mep-container').block();
            \$.ajax({
                    type: \"POST\",
                    url: \"";
        // line 34
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("user_update"), "html", null, true);
        echo "\",
                    data: {data : MEP.toJson(data)},
                    dataType : 'json',
                    success: function(r) {
                        \$('.new-mep-container').unblock();
                        if(r.success) {
                            \$.blockUI.defaults.message = 'Modification avec succé, redirection en cours ...';
                            \$.blockUI();
                            document.location = \"";
        // line 42
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("list_user"), "html", null, true);
        echo "\";
                        }
                    },
                    error: (typeof error == 'function') ?error:null
            });
        });

        resetValues = function() {
            \$('#login').find('input').val('";
        // line 50
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "user"), "login_user"), "html", null, true);
        echo "');
            \$('#firstname').find('input').val('";
        // line 51
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "user"), "firstname_user"), "html", null, true);
        echo "');
            \$('#lastname').find('input').val('";
        // line 52
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "user"), "lastname_user"), "html", null, true);
        echo "');
            \$('#email').find('input').val('";
        // line 53
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "user"), "email_user"), "html", null, true);
        echo "');
            \$('#role').find('select').find('option[value='+ ";
        // line 54
        echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "user"), "is_admin_user"), "html", null, true);
        echo " +']').attr('selected','selected');
        }
        resetValues();
    });
</script>
";
    }

    // line 60
    public function block_containerBlocl($context, array $blocks = array())
    {
        // line 61
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
        return "ConnexionUserBundle:User:edit.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }
}
