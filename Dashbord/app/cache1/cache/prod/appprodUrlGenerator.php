<?php

use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\Exception\RouteNotFoundException;


/**
 * appprodUrlGenerator
 *
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class appprodUrlGenerator extends Symfony\Component\Routing\Generator\UrlGenerator
{
    static private $declaredRouteNames = array(
       '_suivi_login' => true,
       '_suivi_index' => true,
       'login_check' => true,
       'logout' => true,
       'new_mep' => true,
       'edit_mep' => true,
       'mep_create' => true,
       'mep_update' => true,
       'list_mep' => true,
       'delete_mep' => true,
       'list_user' => true,
       'new_user' => true,
       'delete_user' => true,
       'edit_user' => true,
       'user_create' => true,
       'user_update' => true,
    );

    /**
     * Constructor.
     */
    public function __construct(RequestContext $context)
    {
        $this->context = $context;
    }

    public function generate($name, $parameters = array(), $absolute = false)
    {
        if (!isset(self::$declaredRouteNames[$name])) {
            throw new RouteNotFoundException(sprintf('Route "%s" does not exist.', $name));
        }

        $escapedName = str_replace('.', '__', $name);

        list($variables, $defaults, $requirements, $tokens) = $this->{'get'.$escapedName.'RouteInfo'}();

        return $this->doGenerate($variables, $defaults, $requirements, $tokens, $parameters, $name, $absolute);
    }

    private function get_suivi_loginRouteInfo()
    {
        return array(array (), array (  '_controller' => 'Connexion\\UserBundle\\Controller\\SecurityController::loginAction',), array (), array (  0 =>   array (    0 => 'text',    1 => '/Connexion/auth/',  ),));
    }

    private function get_suivi_indexRouteInfo()
    {
        return array(array (), array (  '_controller' => 'Connexion\\UserBundle\\Controller\\DefaultController::indexAction',), array (), array (  0 =>   array (    0 => 'text',    1 => '/',  ),));
    }

    private function getlogin_checkRouteInfo()
    {
        return array(array (), array (), array (), array (  0 =>   array (    0 => 'text',    1 => '/login_check',  ),));
    }

    private function getlogoutRouteInfo()
    {
        return array(array (), array (), array (), array (  0 =>   array (    0 => 'text',    1 => '/logout',  ),));
    }

    private function getnew_mepRouteInfo()
    {
        return array(array (  0 => 'id',), array (  '_controller' => 'Connexion\\Mep\\Controller\\MepController::newAction',  'id' => NULL,), array (), array (  0 =>   array (    0 => 'variable',    1 => '/',    2 => '[^/]+?',    3 => 'id',  ),  1 =>   array (    0 => 'text',    1 => '/mep/new',  ),));
    }

    private function getedit_mepRouteInfo()
    {
        return array(array (  0 => 'id',), array (  '_controller' => 'Connexion\\Mep\\Controller\\MepController::editAction',  'id' => NULL,), array (), array (  0 =>   array (    0 => 'variable',    1 => '/',    2 => '[^/]+?',    3 => 'id',  ),  1 =>   array (    0 => 'text',    1 => '/mep/edit',  ),));
    }

    private function getmep_createRouteInfo()
    {
        return array(array (), array (  '_controller' => 'Connexion\\Mep\\Controller\\MepController::createAction',), array (), array (  0 =>   array (    0 => 'text',    1 => '/mep/create',  ),));
    }

    private function getmep_updateRouteInfo()
    {
        return array(array (), array (  '_controller' => 'Connexion\\Mep\\Controller\\MepController::updateAction',), array (), array (  0 =>   array (    0 => 'text',    1 => '/mep/update',  ),));
    }

    private function getlist_mepRouteInfo()
    {
        return array(array (), array (  '_controller' => 'Connexion\\Mep\\Controller\\MepController::indexAction',), array (), array (  0 =>   array (    0 => 'text',    1 => '/mep',  ),));
    }

    private function getdelete_mepRouteInfo()
    {
        return array(array (  0 => 'id',), array (  '_controller' => 'Connexion\\Mep\\Controller\\MepController::deleteAction',  'id' => NULL,), array (), array (  0 =>   array (    0 => 'variable',    1 => '/',    2 => '[^/]+?',    3 => 'id',  ),  1 =>   array (    0 => 'text',    1 => '/mep/delete',  ),));
    }

    private function getlist_userRouteInfo()
    {
        return array(array (), array (  '_controller' => 'Connexion\\UserBundle\\Controller\\UserController::indexAction',), array (), array (  0 =>   array (    0 => 'text',    1 => '/users',  ),));
    }

    private function getnew_userRouteInfo()
    {
        return array(array (), array (  '_controller' => 'Connexion\\UserBundle\\Controller\\UserController::newAction',  'id' => NULL,), array (), array (  0 =>   array (    0 => 'text',    1 => '/user/new',  ),));
    }

    private function getdelete_userRouteInfo()
    {
        return array(array (  0 => 'id',), array (  '_controller' => 'Connexion\\UserBundle\\Controller\\UserController::deleteAction',  'id' => NULL,), array (), array (  0 =>   array (    0 => 'variable',    1 => '/',    2 => '[^/]+?',    3 => 'id',  ),  1 =>   array (    0 => 'text',    1 => '/user/delete',  ),));
    }

    private function getedit_userRouteInfo()
    {
        return array(array (  0 => 'id',), array (  '_controller' => 'Connexion\\UserBundle\\Controller\\UserController::editAction',  'id' => NULL,), array (), array (  0 =>   array (    0 => 'variable',    1 => '/',    2 => '[^/]+?',    3 => 'id',  ),  1 =>   array (    0 => 'text',    1 => '/user/edit',  ),));
    }

    private function getuser_createRouteInfo()
    {
        return array(array (), array (  '_controller' => 'Connexion\\UserBundle\\Controller\\UserController::createAction',), array (), array (  0 =>   array (    0 => 'text',    1 => '/user/create',  ),));
    }

    private function getuser_updateRouteInfo()
    {
        return array(array (), array (  '_controller' => 'Connexion\\UserBundle\\Controller\\UserController::updateAction',), array (), array (  0 =>   array (    0 => 'text',    1 => '/user/update',  ),));
    }
}
