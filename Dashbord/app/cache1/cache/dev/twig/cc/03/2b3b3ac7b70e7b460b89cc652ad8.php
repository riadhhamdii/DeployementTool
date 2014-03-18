<?php

/* Mep:Mep:index.html.twig */
class __TwigTemplate_cc032b3b3ac7b70e7b460b89cc652ad8 extends Twig_Template
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
            var statusArray = { \"0\" : \"En attente\", \"1\" : \"En cours\", \"2\": \"Annulée\", \"3\": \"Terminée\", \"4\": \"Echouée\" };

            \$meps = [
                ";
        // line 24
        $context['_parent'] = (array) $context;
        $context['_seq'] = twig_ensure_traversable($this->getContext($context, "meps"));
        foreach ($context['_seq'] as $context["_key"] => $context["mep"]) {
            // line 25
            echo "                {
                    'id':'";
            // line 26
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "id_mep"), "html", null, true);
            echo "',
                    'label':'";
            // line 27
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "label_mep"), "html", null, true);
            echo "',
                    'type':'";
            // line 28
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "type_mep"), "html", null, true);
            echo "',
                    'status':statusArray['";
            // line 29
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "status_mep"), "html", null, true);
            echo "'],
                    'km':'";
            // line 30
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "id_km_mep"), "html", null, true);
            echo "',
                    //'kmproject':'";
            // line 31
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "id_km_project"), "html", null, true);
            echo "',
                    'note':'";
            // line 32
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "notes_mep"), "html", null, true);
            echo "',
                    'description':'";
            // line 33
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "description_mep"), "html", null, true);
            echo "',
                    'idUser':'";
            // line 34
            echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getContext($context, "mep"), "user"), "id_user"), "html", null, true);
            echo "',
                    'user':'";
            // line 35
            echo twig_escape_filter($this->env, (($this->getAttribute($this->getAttribute($this->getContext($context, "mep"), "user"), "firstname_user") . " ") . $this->getAttribute($this->getAttribute($this->getContext($context, "mep"), "user"), "lastname_user")), "html", null, true);
            echo "',
                    'dateMep':'";
            // line 36
            echo twig_escape_filter($this->env, $this->getAttribute($this->getContext($context, "mep"), "date_mep"), "html", null, true);
            echo "'
                },
                ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['mep'], $context['_parent'], $context['loop']);
        $context = array_merge($_parent, array_intersect_key($context, $_parent));
        // line 39
        echo "            ];            
            
            var \$w = \$('#meps-container').width() - 75;
            var \$wCell = Math.round(\$w/10) - 0.5;

            var \$data = {
                data : \$meps,
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
                colNames : ['Id', 'Label', 'Type', 'Etat', 'Utilisateur', 'Id Km', 'Id Km projet', 'Notes','Description', 'Date MEP','IDUSER' ,'Actions'],
                colModel : [
                    {name : 'id', index:'id', hidden:true, width:\$wCell,searchtype:'integer',editable : false, sortable: true},
                    {name : 'label', index:'label', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'type', index:'type', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'status', index:'status', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'user', index:'user', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'km', index:'km', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'kmproject', index:'kmproject', width:\$wCell, hidden:true,searchtype:'integer',editable : false, sortable: true},
                    {name : 'note', index:'note', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'description', index:'description', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'dateMep', index:'dateMep', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'idUser', index:'idUser',hidden:true, width:\$wCell,searchtype:'integer',editable : false, sortable: true},
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
                        
\t\t\t    //if( parseInt(rd['idUser']) == parseInt('";
        // line 85
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getContext($context, "app"), "user"), "id"), "html", null, true);
        echo "') ) {
                            var actionMernu = \"<div align='center'>\";\t\t\t\t\t\t\t
\t\t\t\t\t\t\tactionMernu += \"<img style='cursor:pointer' alt='Editer' id='edit-mep-\"+ rd['id'] +\"' key='\"+ rd['id'] +\"' src=\\\"";
        // line 87
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/images/edit2.png"), "html", null, true);
        echo "\\\" class='icon'>\";
\t\t\t\t\t\t    if ( parseInt('";
        // line 88
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getContext($context, "app"), "user"), "isAdmin"), "html", null, true);
        echo "') == 1 ){
\t\t\t\t\t\t\t\tactionMernu += \"&nbsp;&nbsp;\";
\t\t\t\t\t\t\t\tactionMernu += \"<img style='cursor:pointer' alt='Supprimer' id='delete-mep-\"+ rd['id'] +\"' key='\"+ rd['id'] +\"' src=\\\"";
        // line 90
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/images/delete.gif"), "html", null, true);
        echo "\\\" class='icon'>\";
\t\t\t\t\t\t\t}
                            actionMernu += \"</div>\";
\t\t\t\t\t\t\t
                            \$(this).jqGrid('setRowData', ids[i], {actions:actionMernu});
                            \$('#edit-mep-'+ rd['id']).editMep();
                            \$('#delete-mep-'+ rd['id']).deleteMep();
                            //}
                    }
                }
            };

            \$.fn.editMep = function(){
                \$(this).click(function(){
                    \$.blockUI.defaults.message = 'Chargement en cours';
                    \$.blockUI();
                    document.location = \"";
        // line 106
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("edit_mep"), "html", null, true);
        echo "/\"+ \$(this).attr('key');
                });
            }

            \$.fn.deleteMep = function(){
                \$(this).click(function(){
\t\t\t\t\t\t\$.ajax({
\t\t\t\t\t\t\t\ttype: \"POST\",
\t\t\t\t\t\t\t\turl: \"";
        // line 114
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("delete_mep"), "html", null, true);
        echo "/\"+\$(this).attr('key'),\t\t\t\t\t\t\t\t
\t\t\t\t\t\t\t\tdataType : 'json',
\t\t\t\t\t\t\t\tsuccess: function(r) {\t\t\t\t\t\t\t\t\t
\t\t\t\t\t\t\t\t\tif(r.success) {
\t\t\t\t\t\t\t\t\t\t\$.blockUI.defaults.message = 'Suppression en cours ...';
\t\t\t\t\t\t\t\t\t\t\$.blockUI();
\t\t\t\t\t\t\t\t\t\tdocument.location = \"";
        // line 120
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("list_mep"), "html", null, true);
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
        // line 132
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("new_mep"), "html", null, true);
        echo "\"; 
                
            });
        });
    </script>
";
    }

    // line 138
    public function block_containerBlocl($context, array $blocks = array())
    {
        // line 139
        echo "<div id='new-mep'>
    <a href=\"javascript:void(0)\">
        <span>
            <img alt=\"Nouvelle table\" id=\"icon_newtable\" src=\"";
        // line 142
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/images/b_snewtbl.png"), "html", null, true);
        echo "\" class=\"icon\">
            Nouvelle mise en production
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
        return "Mep:Mep:index.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }
}
