<?php

/* ::base.html.twig */
class __TwigTemplate_34148a53c15c385d2ac3ec4582b64a12 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'styleToAdd' => array($this, 'block_styleToAdd'),
            'stylesheets' => array($this, 'block_stylesheets'),
            'jsToAdd' => array($this, 'block_jsToAdd'),
            'javascript' => array($this, 'block_javascript'),
            'containerBlocl' => array($this, 'block_containerBlocl'),
            'content' => array($this, 'block_content'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
        ";
        // line 5
        $this->displayBlock('title', $context, $blocks);
        // line 8
        echo "                ";
        $this->displayBlock('stylesheets', $context, $blocks);
        // line 20
        echo "\t\t";
        $this->displayBlock('javascript', $context, $blocks);
        // line 70
        echo "        
    </head>
\t
    <body>
        ";
        // line 74
        $this->displayBlock('content', $context, $blocks);
        // line 134
        echo "    </body>
\t
</html>
";
    }

    // line 5
    public function block_title($context, array $blocks = array())
    {
        // line 6
        echo "            <title>Tableau de bord des mises en production</title>
        ";
    }

    // line 17
    public function block_styleToAdd($context, array $blocks = array())
    {
        // line 18
        echo "                        ";
    }

    // line 8
    public function block_stylesheets($context, array $blocks = array())
    {
        // line 9
        echo "\t\t\t<link rel=\"shortcut icon\" href=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("favicon.ico"), "html", null, true);
        echo "\" />
\t\t\t<link  href=\"";
        // line 10
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/css/jq.validationEngine.css"), "html", null, true);
        echo "\"   rel='stylesheet'  type='text/css'/>
\t\t\t<link  href=\"";
        // line 11
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/css/menu.css"), "html", null, true);
        echo "\" rel='stylesheet' type='text/css'/>
\t\t\t<link  href=\"";
        // line 12
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/css/mep.css"), "html", null, true);
        echo "\" rel='stylesheet' type='text/css'/>
\t\t\t<link  href=\"";
        // line 13
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/css/styleAcceuil.css"), "html", null, true);
        echo "\" rel='stylesheet' type='text/css'/>
\t\t\t<link  href=\"";
        // line 14
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/css/jquery.grid.css"), "html", null, true);
        echo "\" rel='stylesheet' type='text/css'/>
\t\t\t<link  href=\"";
        // line 15
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/css/jquery.input.css"), "html", null, true);
        echo "\" rel='stylesheet' type='text/css'/>
\t\t\t<link  href=\"";
        // line 16
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/css/jquery.blockUI.css"), "html", null, true);
        echo "\" rel='stylesheet' type='text/css'/>
                        ";
        // line 17
        $this->displayBlock('styleToAdd', $context, $blocks);
        // line 19
        echo "\t\t";
    }

    // line 30
    public function block_jsToAdd($context, array $blocks = array())
    {
        // line 31
        echo "                        ";
    }

    // line 20
    public function block_javascript($context, array $blocks = array())
    {
        // line 21
        echo "\t\t\t<script src=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/js/jq.js"), "html", null, true);
        echo "\"  type='text/javascript'></script>
\t\t\t<script src=\"";
        // line 22
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/js/jq.ui.js"), "html", null, true);
        echo "\" type='text/javascript'></script>
\t\t\t<script src=\"";
        // line 23
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/js/jq.include.js"), "html", null, true);
        echo "\" type='text/javascript'></script>
\t\t\t<script src=\"";
        // line 24
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/js/jq.validationEngine.js"), "html", null, true);
        echo "\" type='text/javascript'></script>
\t\t\t<script src=\"";
        // line 25
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/js/menu.js"), "html", null, true);
        echo "\" type='text/javascript'></script>
\t\t\t<script src=\"";
        // line 26
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/js/mep.js"), "html", null, true);
        echo "\" type='text/javascript'></script>
\t\t\t<script src=\"";
        // line 27
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/js/jquery.grid.js"), "html", null, true);
        echo "\" type='text/javascript'></script>
\t\t\t<script src=\"";
        // line 28
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/js/jquery.input.js"), "html", null, true);
        echo "\" type='text/javascript'></script>
\t\t\t<script src=\"";
        // line 29
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/js/jquery.blockUI.js"), "html", null, true);
        echo "\" type='text/javascript'></script>
                        ";
        // line 30
        $this->displayBlock('jsToAdd', $context, $blocks);
        // line 32
        echo "\t\t\t<script type='text/javascript'>
\t\t\t
            \$(document).ready(function() {
\t\t \$.blockUI.defaults.message = 'Chargement en cours';
              \$('input:text, input:password, input[type=email]')
                .button().addClass('my-textfield');
                
                jQuery(\"#input\").keydown(function(event) {  
                    // Allow: backspace, delete, tab and escape
                    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
                        // Allow: Ctrl+A
                    (event.keyCode == 65 && event.ctrlKey === true) || 
                        // Allow: home, end, left, right
                    (event.keyCode >= 35 && event.keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
                    }
                    else {
                        // Ensure that it is a number and stop the keypress
                        if ( event.shiftKey|| (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 ) ) 
                        {
                            event.preventDefault(); 
                        }
                    }
                });
                
                \$('input:text, input:password, input[type=email]')
                .button().addClass('my-textfield');
 
                \$('.menu_3857').jdMenu({offset: 1});

              \$('.log').click(function(){
                     document.location= \"";
        // line 64
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getUrl("logout"), "html", null, true);
        echo "\";
               });

            }); 
        </script>
        ";
    }

    // line 112
    public function block_containerBlocl($context, array $blocks = array())
    {
        // line 113
        echo "\t\t\t\t";
    }

    // line 74
    public function block_content($context, array $blocks = array())
    {
        // line 75
        echo "        <div id='content' style='position:relative;' >
            <div id=\"header\">
                <div class=\"cotation\">
                    <div class=\"right\"></div>
                    <div class=\"logout\">
                        <div class=\"left\"></div>
                        <div class=\"center\">
                            <u>
                                <a  href=\"javascript:void(0)\" class=\"log\" ><font color=\"#5E6D7A\">Déconnexion </font></a>
                            </u>
                        </div>
                        <div class=\"right\"></div>
                    </div>
                    <div class=\"user\">
                        Vous ètes connecté(e) en tant que <u>";
        // line 89
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "user"), "lastname"), "html", null, true);
        echo " ";
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($_app_, "user"), "firstname"), "html", null, true);
        echo "</u>
                    </div>
                </div> 
            </div> 
            
            <div id=\"bottom_header\">
                <div  id=\"menu\">
                   <ul class=\"jd_menu jd_menu_slate menu_3857\">
                    
                        <li>
                            <a style='color:#335588' href='";
        // line 99
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("list_mep"), "html", null, true);
        echo "'>Accueil</a>
                        </li>
                        ";
        // line 101
        if (isset($context["app"])) { $_app_ = $context["app"]; } else { $_app_ = null; }
        if (($this->getAttribute($this->getAttribute($_app_, "user"), "isAdmin") == 1)) {
            // line 102
            echo "                        <li>
                            <a style='color:#335588' href='";
            // line 103
            echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("list_user"), "html", null, true);
            echo "'>Liste des utilisateurs</a>
                        </li>
                        ";
        }
        // line 106
        echo "                        
            
                   </ul>  
                </div>
            </div>
            <div id='global-meps-container' style='float:left;width:100%'>
\t\t\t\t";
        // line 112
        $this->displayBlock('containerBlocl', $context, $blocks);
        // line 114
        echo "\t\t\t\t<div class=\"context-menu-build context-menu-back-build\" style=\"display:none\">
\t\t\t\t\t<li class=\"context-menu-item-build\">
\t\t\t\t\t\t<span class=\"context-menu-item-text-build context-menu-duplicate-build\">Dupliquer</span>
\t\t\t\t\t</li>
\t\t\t\t\t<li class=\"context-menu-item-build\">
\t\t\t\t\t\t<span class=\"context-menu-item-text-build context-menu-delete-build\">Supprimer</span>
\t\t\t\t\t</li>
\t\t\t\t\t<li class=\"context-menu-item-build\">
\t\t\t\t\t\t<span class=\"context-menu-item-text-build context-menu-code-build\">Afficher le code</span>
\t\t\t\t\t</li>
\t\t\t\t\t<li class=\"context-menu-item-build\">
\t\t\t\t\t\t<span class=\"context-menu-item-text-build context-menu-delete-page-build\">Supprimer page</span>
\t\t\t\t\t</li>
\t\t\t\t\t<li class=\"context-menu-separator-build\"><hr/></li>
\t\t\t\t\t<li class=\"context-menu-item-build\">
\t\t\t\t\t\t<span class=\"context-menu-item-text-build context-menu-properties-build\">Propriétés</span>
\t\t\t\t\t</li>
\t\t\t    </div>
\t\t\t</div>
\t";
    }

    public function getTemplateName()
    {
        return "::base.html.twig";
    }

}
