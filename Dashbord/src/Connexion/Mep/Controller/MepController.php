<?php

namespace Connexion\Mep\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;


class MepController extends Controller
{
    
    public function indexAction()
    {      	
        return $this->render('Mep:Mep:index.html.twig', array( ));
    }
	
    public function newAction($id)
    {
        $spi = $this->get('spi');
        
        $mp = $spi->getMepManager();
        
        $data = array();
        
        return $this->render('Mep:Mep:new.html.twig',$data);
    }
	
	public function searchAction()
    {
        $spi = $this->get('spi');
        
        $mp = $spi->getMepManager();
        
        $data = array();
        
        return $this->render('Mep:Mep:search.html.twig',$data);
    }
	
    public function editAction($id)
    {
        $spi = $this->get('spi');
        
        $mp = $spi->getMepManager();
        
        $data = array();
        
        $mep = $mp->getMep($id);
		
        $data['mep'] = $mep;
		
        return $this->render('Mep:Mep:edit.html.twig',$data);
    }
    
    public function createAction()
    {
        $spi = $this->get('spi');
        
        $mp = $spi->getMepManager();
        
        $request = $this->getRequest();
        $data = $request->get('data');
        $data = json_decode(stripslashes($data));
        
        $mep = $mp->create($data);
		
        return new Response(json_encode($mep));
    }
	
	public function deleteAction($id)
    {
        $spi = $this->get('spi');
        
        $mp = $spi->getMepManager();
        
        $mep = $mp->delete($id);
		
		return new Response(json_encode($mep));
    }
    
    public function updateAction()
    {
        $spi = $this->get('spi');
        
        $mp = $spi->getMepManager();
        
        $request = $this->getRequest();
        $data = $request->get('data');
        $data = json_decode(stripslashes($data));
        
        $mep = $mp->update($data);
        return new Response(json_encode($mep));
    }

    public function dataAction()
    {
        $request = $this->getRequest();

		$searchFiltersMep = array (
            'label_mep' => '',
            'type_mep' => '',
            'status_mep' => '',
            'id_km_mep' => '',
            'date_mep' => '',
			'page' => ''
        );
		
		$labelMep = $request->get('label_mep');		
		if( $labelMep != NULL ){
			$searchFiltersMep['label_mep'] = $labelMep;
		}
		
		$typeMep = $request->get('type_mep');		
		if( $typeMep != NULL ){
			$searchFiltersMep['type_mep'] = $typeMep;
		}
		
		$statusMep = $request->get('status_mep');		
		if( $statusMep != NULL ){
			$searchFiltersMep['status_mep'] = $statusMep;
		}
		
		$idKmMep = $request->get('id_km_mep');		
		if( $idKmMep != NULL ){
			$searchFiltersMep['id_km_mep'] = $idKmMep;
		}
		
		$dateMep = $request->get('date_mep');		
		if( $dateMep != NULL ){
			$searchFiltersMep['date_mep'] = $dateMep;
		}
		
        $page = $request->get('page');	
        $searchFiltersMep['page'] = $page;
		
        $spi = $this->get('spi');

        $mp = $spi->getMepManager();

        $meps = $mp->getData($searchFiltersMep);

        return new Response(\json_encode($meps));
    }
}
