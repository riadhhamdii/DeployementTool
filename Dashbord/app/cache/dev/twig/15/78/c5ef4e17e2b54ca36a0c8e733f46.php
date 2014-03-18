<?php

/* ConnexionUserBundle:User:index.html.twig */
class __TwigTemplate_1578c5ef4e17e2b54ca36a0c8e733f46 extends Twig_Template
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

    // line 2
    public function block_stylesheets($context, array $blocks = array())
    {
        // line 3
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

    // line 13
    public function block_javascript($context, array $blocks = array())
    {
        // line 14
        echo "    ";
        $this->displayParentBlock("javascript", $context, $blocks);
        echo "
    <script type='text/javascript'>
        \$(document).ready(function(){
            \$.fn.initGrid = function(id, pager, data) {
                \$(this).jqGrid(data);
                \$(this).jqGrid('navGrid', pager,{edit:false,add:false,del:false,search:false,refresh:false},{},{},{},{})
            }


            \$users = [
                ";
        // line 24
        $context['_parent'] = (array) $context;
        $context['_seq'] = twig_ensure_traversable($this->getContext($context, "users"));
        foreach ($context['_seq'] as $context["_key"] => $context["user"]) {
            // line 25
            echo "                {
                    'id':";
            // line 26
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "user"), "id_user"), "html", null, true);
            echo ",
                    'firstname':'";
            // line 27
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "user"), "firstname_user"), "html", null, true);
            echo "',
                    'lastname':'";
            // line 28
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "user"), "lastname_user"), "html", null, true);
            echo "',
                    'login':'";
            // line 29
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "user"), "login_user"), "html", null, true);
            echo "',
                    'email':'";
            // line 30
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "user"), "email_user"), "html", null, true);
            echo "',
                    'admin':'";
            // line 31
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "user"), "is_admin_user"), "html", null, true);
            echo "'
                },
                ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['user'], $context['_parent'], $context['loop']);
        $context = array_merge($_parent, array_intersect_key($context, $_parent));
        // line 34
        echo "            ];
            
            
            var \$w = \$('#meps-container').width() -75;
            var \$wCell = Math.round(\$w/6) - 0.5;

            var \$data = {
                data : \$users,
                gridview : true,
                hoverrows : true,
                hidecolumn : true,
                viewrecords : true,
                rowNum : 10,
                rowList : [10,20,30,40],
                postData : {},
                emptyrecords : 'meps',
                sortorder : 'desc',
                hidegrid : false,
                height : 'auto',
                width:'auto',
                datatype : 'local',
                colNames : ['Id', 'Nom', 'Prénom','Login', 'Email', 'Administrateur' ,'Actions'],
                colModel : [
                    {name : 'id', index:'id', hidden:true, width:\$wCell,searchtype:'integer',editable : false, sortable: true},
                    {name : 'firstname', index:'firstname', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'lastname', index:'lastname', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'login', index:'login', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'email', index:'email', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'admin', index:'admin', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'actions', index:'actions', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true}
                ],
                pager : '#mep_pager',
                subGrid : false,
                rownumbers : false,
                multiselect : false,
                gridComplete :  function() {
                    var ids = \$(this).jqGrid('getDataIDs');
                    for(var i=0; i<ids.length ;i++) {
                        
                        var cl = ids[i];
                        var rd = \$(this).jqGrid('getRowData', cl); 
\t\t\t\t\t\t
\t\t\t\t\t\tvar actionMernu = \"<div align='center'>\";\t\t\t\t\t\t\t
\t\t\t\t\t\tactionMernu += \"<img style='cursor:pointer' alt='Editer' id='edit-mep-\"+ rd['id'] +\"' key='\"+ rd['id'] +\"' src=\\\"";
        // line 77
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/images/edit2.png"), "html", null, true);
        echo "\\\" class='icon'>\";
\t\t\t\t\t\tif ( parseInt('";
        // line 78
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getContext($context, "app"), "user"), "isAdmin"), "html", null, true);
        echo "') == 1 ){
\t\t\t\t\t\t\tactionMernu += \"&nbsp;&nbsp;\";
\t\t\t\t\t\t\tactionMernu += \"<img style='cursor:pointer' alt='Supprimer' id='delete-mep-\"+ rd['id'] +\"' key='\"+ rd['id'] +\"' src=\\\"";
        // line 80
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/images/delete.gif"), "html", null, true);
        echo "\\\" class='icon'>\";
\t\t\t\t\t\t}
\t\t\t\t\t\tactionMernu += \"</div>\"\t;\t\t\t\t
\t\t\t\t\t\t
                        /*var actionMernu = \"<div>\";
                        actionMernu += \"<span id='edit-mep-\"+ rd['id'] +\"' key='\"+ rd['id'] +\"' class='edit-mep'>Editer<span>\";
                        actionMernu += \"<span id='delete-mep-\"+ rd['id'] +\"' key='\"+ rd['id'] +\"' class='delete-mep'>Supprimer<span>\";
                        actionMernu += \"</div>\";*/
                        \$(this).jqGrid('setRowData', ids[i], {actions:actionMernu});

                        \$('#edit-mep-'+ rd['id']).editUser();
                        \$('#delete-mep-'+ rd['id']).deleteUser();
                      
                    }
                }
            };

            \$.fn.editUser = function(){
                \$(this).click(function(){
                    \$.blockUI.defaults.message = 'Chargement en cours';
                    \$.blockUI();
                    document.location = \"";
        // line 101
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("edit_user"), "html", null, true);
        echo "/\"+ \$(this).attr('key');
                });
            }

            \$.fn.deleteUser = function(){
                \$(this).click(function(){
\t\t\t\t\t\t\$.ajax({
\t\t\t\t\t\t\t\ttype: \"POST\",
\t\t\t\t\t\t\t\turl: \"";
        // line 109
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("delete_user"), "html", null, true);
        echo "/\"+\$(this).attr('key'),\t\t\t\t\t\t\t\t
\t\t\t\t\t\t\t\tdataType : 'json',
\t\t\t\t\t\t\t\tsuccess: function(r) {\t\t\t\t\t\t\t\t\t
\t\t\t\t\t\t\t\t\tif(r.success) {
\t\t\t\t\t\t\t\t\t\t\$.blockUI.defaults.message = 'Suppression en cours ...';
\t\t\t\t\t\t\t\t\t\t\$.blockUI();
\t\t\t\t\t\t\t\t\t\tdocument.location = \"";
        // line 115
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("list_user"), "html", null, true);
        echo "\";
\t\t\t\t\t\t\t\t\t}
\t\t\t\t\t\t\t\t},
\t\t\t\t\t\t\t\terror: (typeof error == 'function') ?error:null
\t\t\t\t\t\t});
                    
                });
            }

            \$('#meps').initGrid('meps','#mep_pager',\$data);
            \$('#new-mep').unbind('click').click(function(){
                \$.blockUI.defaults.message = 'Chargement en cours';
                \$.blockUI();
                document.location = \"";
        // line 128
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("new_user"), "html", null, true);
        echo "\"; 
                
            });
        });
    </script>
";
    }

    // line 134
    public function block_containerBlocl($context, array $blocks = array())
    {
        // line 135
        echo "<div id='new-mep'>
    <a href=\"javascript:void(0)\">
        <span>
            <img alt=\"Nouvelle table\" id=\"icon_newtable\" src=\"";
        // line 138
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/images/b_snewtbl.png"), "html", null, true);
        echo "\" class=\"icon\">
            Nouveau utilisateur
        </span>
    </a>
</div>
<div class='form-line' style='float:left; width:100% !important'>
    <div id='meps-container'>
        <table id='meps'></table>
        <div id='mep_pager'></div>
    </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "ConnexionUserBundle:User:index.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }
}
