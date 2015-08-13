<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SessionController extends Controller
{
    public function saveAction()
    {
        $params = array();
        $content = $this->get("request")->getContent();
        if (!empty($content))
        {
            $params = json_decode($content, true);
        }

        $this->get('session')->set('data', $params);

        return new JsonResponse(array('ok'));
    }

    /**
     * Clears the php session.
     * @return JsonResponse
     */
    public function clearAction() {
        $this->get('session')->clear();
        return new JsonResponse(array('ok'));
    }

    public function getAction()
    {
        $session = $this->get('session');
        $data = $session->get('data');
        return new JsonResponse($data);
    }
}
