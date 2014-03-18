<?php

/* Mep:Mep:index.html.twig */
class __TwigTemplate_2c9f72f22325893368ee63be1125b752 extends Twig_Template
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
#validatesearchmep {
\t-moz-box-shadow:inset 0px 1px 0px 0px #ffffff;
\t-webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;
\tbox-shadow:inset 0px 1px 0px 0px #ffffff;
\tbackground-color:#ededed;
\t-moz-border-radius:6px;
\t-webkit-border-radius:6px;
\tborder-radius:6px;
\tborder:1px solid #dcdcdc;
\tdisplay:inline-block;
\tcolor:#308a9c;
\tfont-family:arial;
\tfont-size:14px;
\tfont-weight:bold;
\tpadding:6px 13px;
\ttext-decoration:none;
\ttext-shadow:1px 1px 0px #ffffff;
}#validatesearchmep:hover {
\tbackground-color:#dfdfdf;
}#validatesearchmep:active {
\tposition:relative;
\ttop:1px;
}
</style>
";
    }

    // line 30
    public function block_javascript($context, array $blocks = array())
    {
        // line 31
        echo "    ";
        $this->displayParentBlock("javascript", $context, $blocks);
        echo "
    <script type='text/javascript'>
        \$(document).ready(function(){
\t\t
\t\t\$('#datemepInput').datetimepicker({
            dateFormat :'yy-mm-dd',
            timeFormat:'hh:mm',
            changeYear: true,
            changeMonth: true
        });
\t\t
\t\t\$('.defaultDOMWindow').openDOMWindow({ 
\t\t\teventType:'click', 
\t\t\theight:350,
\t\t\twidth:350,
\t\t\tloader:1, 
\t\t\tloaderHeight:8, 
\t\t\tloaderWidth:7 
\t\t}); 
\t\t
\t\t\$('#validatesearchmep').closeDOMWindow({eventType:'click'}); 
\t\t
\t\t\$('#validatesearchmep').unbind('click').click(function(){
\t\t\t
\t\t\tvar data = {};
\t\t\t
\t\t\tdata.label_mep = \$('#labelmep').find('input').val();
\t\t\tdata.type_mep = \$('#typemep').find('select').val();
\t\t\tdata.status_mep = \$('#statusmep').find('select').val();
\t\t\tdata.id_km_mep = \$('#idkmmep').find('input').val();
\t\t\tdata.date_mep = \$('#datemep').find('input').val();
\t\t\t
\t\t\t\$(\"#meps\").setGridParam({'postData': data});
\t\t\t\$(\"#meps\").trigger(\"reloadGrid\");

        });
\t\t
            \$.fn.initGrid = function(id, pager, data) {
                \$(this).jqGrid(data);
                \$(this).jqGrid('navGrid', pager,{edit:false,add:false,del:false,search:false,refresh:true},{},{},{})
            }          
            var \$w = \$('#meps-container').width() - 75;
            var \$wCell = Math.round(\$w/10) - 0.5;

            var \$data = {
                url : '";
        // line 76
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("list_mep_data"), "html", null, true);
        echo "',
                gridview : true,
                hoverrows : true,
                hidecolumn : true,
                viewrecords : true,
                rowNum : 10,
                rowList : [10,20,30,40],
                emptyrecords : 'meps',
                sortorder : 'desc',
                hidegrid : false,
                height : 'auto',
                jsonReader:{repeatitems: false, subgrid: {repeatitems:false}},
                xmlReader:{repeatitems: false, subgrid: {repeatitems:false}},                
                width:'auto',
                mtype:'POST',
                datatype : 'json',
                colNames : ['Id', 'Label', 'Type', 'Etat', 'Utilisateur', 'Id Km', 'Id Km projet', 'Notes','Description', 'Date MEP','IDUSER' ,'user','Actions'],
                colModel : [
                    {name : 'id_mep', index:'id_mep', hidden:true, width:\$wCell,searchtype:'integer',editable : false, sortable: true},
                    {name : 'label_mep', index:'label_mep', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'type_mep', index:'type_mep', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'status_mep', index:'status_mep', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'user_label', index:'user', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'id_km_mep', index:'km', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'id_km_project', index:'kmproject', width:\$wCell, hidden:true,searchtype:'integer',editable : false, sortable: true},
                    {name : 'notes_mep', index:'note', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'description_mep', index:'description', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'date_mep', index:'dateMep', width:\$wCell, hidden:false,searchtype:'integer',editable : false, sortable: true},
                    {name : 'idUser', index:'idUser',hidden:true, width:\$wCell,searchtype:'integer',editable : false, sortable: true},
                    {name : 'user', index:'user',hidden:true, width:\$wCell,searchtype:'integer',editable : false, sortable: true},
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
        // line 119
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getContext($context, "app"), "user"), "id"), "html", null, true);
        echo "') ) {
                            var actionMernu = \"<div align='center'>\";\t\t\t\t\t\t\t
\t\t\t\t\t\t\tactionMernu += \"<img style='cursor:pointer' alt='Editer' id='edit-mep-\"+ rd['id_mep'] +\"' key='\"+ rd['id_mep'] +\"' src=\\\"";
        // line 121
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/images/edit2.png"), "html", null, true);
        echo "\\\" class='icon'>\";
\t\t\t\t\t\t    if ( parseInt('";
        // line 122
        echo twig_escape_filter($this->env, $this->getAttribute($this->getAttribute($this->getContext($context, "app"), "user"), "isAdmin"), "html", null, true);
        echo "') == 1 ){
\t\t\t\t\t\t\t\tactionMernu += \"&nbsp;&nbsp;\";
\t\t\t\t\t\t\t\tactionMernu += \"<img style='cursor:pointer' alt='Supprimer' id='delete-mep-\"+ rd['id_mep'] +\"' key='\"+ rd['id_mep'] +\"' src=\\\"";
        // line 124
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/images/delete.gif"), "html", null, true);
        echo "\\\" class='icon'>\";
\t\t\t\t\t\t\t}
                            actionMernu += \"</div>\";
\t\t\t\t\t\t\t
                            \$(this).jqGrid('setRowData', ids[i], {actions:actionMernu});
                            \$('#edit-mep-'+ rd['id_mep']).editMep();
                            \$('#delete-mep-'+ rd['id_mep']).deleteMep();
                            //}
                    }
                }
            };

            \$.fn.editMep = function(){
                \$(this).click(function(){
                    \$.blockUI.defaults.message = 'Chargement en cours';
                    \$.blockUI();
                    document.location = \"";
        // line 140
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("edit_mep"), "html", null, true);
        echo "/\"+ \$(this).attr('key');
                });
            }

            \$.fn.deleteMep = function(){

                \$(this).click(function(){
                    var resultConfirm;
                     //jConfirm('Est vous sur de vouloir supprimer la mise en production ?', 'Confirmation', function(o) {

                            //if ( o ){
                                    
                                    \$.ajax({
                                                type: \"POST\",
                                                async:true,
                                                url: \"";
        // line 155
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("delete_mep"), "html", null, true);
        echo "/\"+\$(this).attr('key'),
                                                dataType : 'json',
                                                success: function(r) {
                                                        if(r.success) {
                                                                \$.blockUI.defaults.message = 'Suppression en cours ...';
                                                                \$.blockUI();
                                                                document.location = \"";
        // line 161
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("list_mep"), "html", null, true);
        echo "\";
                                                        }
                                                },
                                                error: (typeof error == 'function') ?error:null
                                    });
                                //}


                    //});

                    });
            }

            \$('#meps').initGrid('meps','#mep_pager',\$data);
            \$('#new-mep').unbind('click').click(function(){
                \$.blockUI.defaults.message = 'Chargement en cours';
                \$.blockUI();
                document.location = \"";
        // line 178
        echo twig_escape_filter($this->env, $this->env->getExtension('routing')->getPath("new_mep"), "html", null, true);
        echo "\"; 
                
            });
        });
    </script>
";
    }

    // line 184
    public function block_containerBlocl($context, array $blocks = array())
    {
        // line 185
        echo "<div id='new-mep'>
    <a href=\"javascript:void(0)\">
        <span>
            <img alt=\"Nouvelle table\" id=\"icon_newtable\" src=\"";
        // line 188
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/images/b_snewtbl.png"), "html", null, true);
        echo "\" class=\"icon\">
            Nouvelle mise en production
        </span>
    </a>
</div>
<div id='new-mep'>
    <a href=\"#inlineContent\" class=\"defaultDOMWindow\">
        <span>
            <img alt=\"Nouvelle table\" id=\"icon_newtable\" src=\"";
        // line 196
        echo twig_escape_filter($this->env, $this->env->getExtension('assets')->getAssetUrl("bundles/Mep/images/searchj.jpg"), "html", null, true);
        echo "\" class=\"icon\">
            &nbsp;Rechercher une mise en production
        </span>
    </a>
</div>
<div class='form-line' style='float:left; width:100% !important'>
    <div id='meps-container'>
        <table id='meps'></table>
        <div id='mep_pager'></div>
    </div>
</div>

<div id=\"inlineContent\" title=\"Dialog Title\" style=\"display:none\" class='new-mep-container'>
    <div>
        <div id='labelmep' t=1 style='width:100%;float:left'>
            <label>Label</label>
            <div style='display:inline-block'>
                <div class='question-input'>
                    <input type='text' size='35'>
                </div>
            </div>
        </div>
\t\t<div id='typemep' t=1 style='width:100%;float:left'>
            <label>Type</label>
            <div style='display:inline-block'>
                <div class='question-input'>
                    <select>
\t\t\t\t\t\t<option value='urgente'>Urgente</option>                        
                        <option value='mineure'>Mineure</option>
\t\t\t\t\t\t<option value='majeure'>Majeure</option>\t\t\t\t\t\t
                    </select>
                </div>
            </div>
        </div>
\t\t<div id='statusmep' t=1 style='width:100%;float:left'>
            <label >Etat</label>
            <div style='display:inline-block'>
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
        <div id='idkmmep' t=1 style='width:100%;float:left'>
            <label>Numero du Km</label>
            <div style='display:inline-block'>
                <div class='question-input'>
                    <input type='text' size='15'>
                </div>
            </div>
        </div>
\t\t<div id='datemep' t=1 style='width:100%;float:left'>
            <label>Date MEP</label>
            <div style='display:inline-block'>
                <div class='question-input'>
                    <input id=\"datemepInput\" type=\"text\" name=\"datemepInput\" size=\"15\">
                </div>
            </div>
        </div>
    </div>
    <div>
        <div id='validatesearchmep' class=\"closeDOMWindow\">Valider</div>
        <div id='close' class=\"closeDOMWindow\">Annuler</div>
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
