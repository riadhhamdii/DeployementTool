<?php

/* ConnexionUserBundle:Main:login.html.twig */
class __TwigTemplate_19cc69476f02b171cf77cac118a4a8eb extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'stylesheets' => array($this, 'block_stylesheets'),
            'content' => array($this, 'block_content'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        $this->displayBlock('title', $context, $blocks);
        // line 2
        $this->displayBlock('stylesheets', $context, $blocks);
        // line 5
        $this->displayBlock('content', $context, $blocks);
    }

    // line 1
    public function block_title($context, array $blocks = array())
    {
        echo "<title>Login</title>";
    }

    // line 2
    public function block_stylesheets($context, array $blocks = array())
    {
        // line 3
        echo "    <link  href=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/UserBundle/css/authentification.css"), "html", null, true);
        echo "\" rel='stylesheet' type='text/css'/>
";
    }

    // line 5
    public function block_content($context, array $blocks = array())
    {
        // line 6
        echo "
<form id=\"sc-login\" action=\"";
        // line 7
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("login_check"), "html", null, true);
        echo "\" method=\"post\" style=' margin: auto;width: 30%;'>
\t<fieldset class=\"detail-container\" style=\"_position:relative; background:#CEF6E3 !important\">
\t\t<legend  style=\"_position:absolute\">
\t\t\t<span class=\"title-left\"></span>
\t\t\t<span class=\"title-field\">Connexion</span>
\t\t\t<span class=\"title-right\"></span>
\t\t</legend>
\t\t<div class=\"authe\" > 
\t\t\t<div style=\"display: inline-block; width: 100%;\">
\t\t\t\t<div style=\"z-index: 100; width: 150px;\" class=\"form-label-left\">
\t\t\t\t\t<span>Login</span>
\t\t\t\t</div>
\t\t\t\t<div class=\"form-input\">
\t\t\t\t\t<div class=\"question-input\">
\t\t\t\t\t\t<input type=\"text\" id=\"username\" name=\"_username\" placeholder=\"Username\" autofocus=\"\" required=\"\" class=\"form-textbox\"/>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div> 
\t\t\t<div style=\"display: inline-block; width: 100%;\">
\t\t\t\t<div style=\"z-index: 100; width: 150px;\" class=\"form-label-left\">
\t\t\t\t\t<span>Mot de passe</span>
\t\t\t\t</div>
\t\t\t\t<div class=\"form-input\">
\t\t\t\t\t<div class=\"question-input\">
\t\t\t\t\t\t<input type=\"password\" id=\"password\" name=\"_password\" placeholder=\"Password\" required=\"\" class=\"form-textbox\"/>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div>
\t\t\t<div style=\"display: inline-block; width: 100%;\">
\t\t\t\t<div title=\"\" class=\"authentification\">
\t\t\t\t\t<Button type \"submit\" class=\"arrondi\" name=\"Valider\">Valider</Button>
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>
\t</fieldset>
</form>
";
        // line 43
        if ($this->getContext($context, "error")) {
            // line 44
            echo "<div id=\"error\" > 
";
            // line 45
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "error"), "message"), "html", null, true);
            echo " 
</div>
";
        }
    }

    public function getTemplateName()
    {
        return "ConnexionUserBundle:Main:login.html.twig";
    }

}
