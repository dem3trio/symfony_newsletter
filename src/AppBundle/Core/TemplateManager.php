<?php
/**
 * Created by PhpStorm.
 * User: demetrio
 * Date: 12/08/15
 * Time: 21:24
 */

namespace AppBundle\Core;


use Symfony\Component\Finder\Finder;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\Finder\SplFileInfo;

class TemplateManager
{
    /**
     * @var Container
     */
    private $container;

    /**
     * @param Container $container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * @return array
     */
    public function getTemplateList()
    {
        $templatesDir   = $this->container->getParameter('app.templates_dir');
        $finder         = new Finder();
        $list           = array();

        $finder->directories()->in($templatesDir);

        /** @var SplFileInfo $file */
        foreach($finder as $file) {
            array_push($list, $this->getTemplateInfoByFolderName($file->getBasename()));
        }

        return $list;
    }

    /**
     * @param $tplFolderName
     * @return array|null
     */
    public function getTemplateInfoByFolderName($tplFolderName)
    {
        // Get the template.json path
        $tplDir     = $this->container->getParameter('app.templates_dir');
        $jsonPath   = $tplDir.'/'.$tplFolderName.'/template.json';
        $info       = null;

        // get the info if the json exists
        if (file_exists($jsonPath)) {
            $content            = file_get_contents($jsonPath);
            $info               = json_decode($content, true);
            $info['_folder']    = $tplFolderName;
        }

        return $info;
    }

}