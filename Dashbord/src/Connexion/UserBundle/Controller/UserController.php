<?php

namespace Connexion\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;



class userController extends Controller
{
    
    public function indexAction()
    {         
        $spi = $this->get('spi');
        
        $um = $spi->getUserManager();
        
        $users = $um->all();
        
        return $this->render('ConnexionUserBundle:User:index.html.twig', array('users'=> $users));
    } 
    
    public function newAction($id)
    {
        $spi = $this->get('spi');
        
        $um = $spi->getUserManager();
        
        $data = array();
        
        return $this->render('ConnexionUserBundle:User:new.html.twig',$data);
    }
	
    public function editAction($id)
    {
        $spi = $this->get('spi');
        
        $um = $spi->getUserManager();
        
        $data = array();
        
        $user = $um->getUser($id);
        $data['user'] = $user;
        return $this->render('ConnexionUserBundle:User:edit.html.twig',$data);
    }
    
	public function deleteAction($id)
    {
        $spi = $this->get('spi');
        
        $um = $spi->getUserManager();
        
        $umdeleted = $um->delete($id);
		
		return new Response(json_encode($umdeleted));
    }
	
    public function createAction()
    {
        $spi = $this->get('spi');
        
        $um = $spi->getUserManager();
        
        $request = $this->getRequest();
        $data = $request->get('data');
        $data = json_decode(stripslashes($data));
        
        $user = $um->create($data);
        return new Response(json_encode($user));
    }
    
    public function updateAction()
    {
        $spi = $this->get('spi');
        
        $um = $spi->getUserManager();
        
        $request = $this->getRequest();
        $data = $request->get('data');
        $data = json_decode(stripslashes($data));
        
        $user = $um->update($data);
        return new Response(json_encode($user));
    }      
 
}
     

