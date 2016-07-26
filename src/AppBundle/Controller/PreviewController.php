<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Class PreviewController
 * @package AppBundle\Controller
 */
class PreviewController extends Controller
{
    /**
     * @param $token
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function previewAction($token)
    {
        $templateInfo  = $this->container->get('app.core.template_manager')->getTemplateInfoByFolderName($token);
        $tplVars = array();
        $session_data = $this->get('session')->get('data');

        foreach ($templateInfo['variables'] as $variable) {
            $tplVars[$variable["name"]] = $variable["default"];
            if(null === $session_data) {
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

        $this->container->get('twig.loader')->addPath($this->container->getParameter('app.templates_dir'));
        return $this->render('/'.$templateInfo['_folder'].'/'.$templateInfo['template_file'],$tplVars);
    }
}
