<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class PreviewController extends Controller
{
    public function previewAction($token)
    {
        $tManager       = $this->container->get('app.core.template_manager');
        $templateInfo   = $tManager->getTemplateInfoByFolderName($token);

        $tplFolder = $templateInfo['_folder'];
        $tplName = '/'.$tplFolder.'/'.$templateInfo['template_file'];
        $tplDir  = $this->container->getParameter('app.templates_dir');

        $tplVars = array();

        $session_data = $this->get('session')->get('data');

        foreach ($templateInfo['variables'] as $variable) {

            $tplVars[$variable["name"]] = $variable["default"];

            if($session_data == null) {
                continue;
            }

            foreach ($session_data as $data) {
                if((array_key_exists('name', $data) && $data['name'] == $variable["name"]) &&
                    array_key_exists('value', $data) && $data['value'] != ''){
                    $tplVars[$variable["name"]] = $data["value"];
                    break;
                }
            }
        }

        $this->container->get('twig.loader')->addPath($tplDir);
        return $this->render($tplName,$tplVars);
    }
}
