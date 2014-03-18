<?php

namespace Connexion\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;



class DefaultController extends Controller
{
    
    public function indexAction()
    {
                       
        return $this->render('ConnexionUserBundle:Main:accueil.html.twig');
    }       
 
}
     

