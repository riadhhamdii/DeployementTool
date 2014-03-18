<?php

use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RequestContext;

/**
 * appprodUrlMatcher
 *
 * This class has been auto-generated
 * by the Symfony Routing Component.
 */
class appprodUrlMatcher extends Symfony\Bundle\FrameworkBundle\Routing\RedirectableUrlMatcher
{
    /**
     * Constructor.
     */
    public function __construct(RequestContext $context)
    {
        $this->context = $context;
    }

    public function match($pathinfo)
    {
        $allow = array();
        $pathinfo = urldecode($pathinfo);

        // _suivi_login
        if (rtrim($pathinfo, '/') === '/Connexion/auth') {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($pathinfo.'/', '_suivi_login');
            }
            return array (  '_controller' => 'Connexion\\UserBundle\\Controller\\SecurityController::loginAction',  '_route' => '_suivi_login',);
        }

        // _suivi_index
        if (rtrim($pathinfo, '/') === '') {
            if (substr($pathinfo, -1) !== '/') {
                return $this->redirect($pathinfo.'/', '_suivi_index');
            }
            return array (  '_controller' => 'Connexion\\UserBundle\\Controller\\DefaultController::indexAction',  '_route' => '_suivi_index',);
        }

        // login_check
        if ($pathinfo === '/login_check') {
            return array('_route' => 'login_check');
        }

        // logout
        if ($pathinfo === '/logout') {
            return array('_route' => 'logout');
        }

        // new_mep
        if (0 === strpos($pathinfo, '/mep/new') && preg_match('#^/mep/new(?:/(?P<id>[^/]+?))?$#xs', $pathinfo, $matches)) {
            return array_merge($this->mergeDefaults($matches, array (  '_controller' => 'Connexion\\Mep\\Controller\\MepController::newAction',  'id' => NULL,)), array('_route' => 'new_mep'));
        }

        // edit_mep
        if (0 === strpos($pathinfo, '/mep/edit') && preg_match('#^/mep/edit(?:/(?P<id>[^/]+?))?$#xs', $pathinfo, $matches)) {
            return array_merge($this->mergeDefaults($matches, array (  '_controller' => 'Connexion\\Mep\\Controller\\MepController::editAction',  'id' => NULL,)), array('_route' => 'edit_mep'));
        }

        // mep_create
        if ($pathinfo === '/mep/create') {
            return array (  '_controller' => 'Connexion\\Mep\\Controller\\MepController::createAction',  '_route' => 'mep_create',);
        }

        // mep_update
        if ($pathinfo === '/mep/update') {
            return array (  '_controller' => 'Connexion\\Mep\\Controller\\MepController::updateAction',  '_route' => 'mep_update',);
        }

        // list_mep
        if ($pathinfo === '/mep') {
            return array (  '_controller' => 'Connexion\\Mep\\Controller\\MepController::indexAction',  '_route' => 'list_mep',);
        }

        // delete_mep
        if (0 === strpos($pathinfo, '/mep/delete') && preg_match('#^/mep/delete(?:/(?P<id>[^/]+?))?$#xs', $pathinfo, $matches)) {
            return array_merge($this->mergeDefaults($matches, array (  '_controller' => 'Connexion\\Mep\\Controller\\MepController::deleteAction',  'id' => NULL,)), array('_route' => 'delete_mep'));
        }

        // list_user
        if ($pathinfo === '/users') {
            return array (  '_controller' => 'Connexion\\UserBundle\\Controller\\UserController::indexAction',  '_route' => 'list_user',);
        }

        // new_user
        if ($pathinfo === '/user/new') {
            return array (  '_controller' => 'Connexion\\UserBundle\\Controller\\UserController::newAction',  'id' => NULL,  '_route' => 'new_user',);
        }

        // delete_user
        if (0 === strpos($pathinfo, '/user/delete') && preg_match('#^/user/delete(?:/(?P<id>[^/]+?))?$#xs', $pathinfo, $matches)) {
            return array_merge($this->mergeDefaults($matches, array (  '_controller' => 'Connexion\\UserBundle\\Controller\\UserController::deleteAction',  'id' => NULL,)), array('_route' => 'delete_user'));
        }

        // edit_user
        if (0 === strpos($pathinfo, '/user/edit') && preg_match('#^/user/edit(?:/(?P<id>[^/]+?))?$#xs', $pathinfo, $matches)) {
            return array_merge($this->mergeDefaults($matches, array (  '_controller' => 'Connexion\\UserBundle\\Controller\\UserController::editAction',  'id' => NULL,)), array('_route' => 'edit_user'));
        }

        // user_create
        if ($pathinfo === '/user/create') {
            return array (  '_controller' => 'Connexion\\UserBundle\\Controller\\UserController::createAction',  '_route' => 'user_create',);
        }

        // user_update
        if ($pathinfo === '/user/update') {
            return array (  '_controller' => 'Connexion\\UserBundle\\Controller\\UserController::updateAction',  '_route' => 'user_update',);
        }

        throw 0 < count($allow) ? new MethodNotAllowedException(array_unique($allow)) : new ResourceNotFoundException();
    }
}
