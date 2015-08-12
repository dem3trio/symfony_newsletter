<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class TemplateController extends Controller
{
    public function listAction()
    {
        $tManager = $this->container->get('app.core.template_manager');
        $data = $tManager->getTemplateList();
        return new JsonResponse($data);
    }
}
