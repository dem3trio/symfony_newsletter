<?php

namespace AppBundle\Core;

use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

class TemplateManager
{
    /**
     * @var string
     */
    private $templatesDir;

    /**
     * @return array
     */
    public function getTemplateList()
    {
        $finder         = new Finder();
        $list           = array();

        $finder->directories()->in($this->getTemplatesDir());

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
        $jsonPath   = $this->getTemplatesDir().'/'.$tplFolderName.'/template.json';
        $info       = null;

        // get the info if the json exists
        if (file_exists($jsonPath)) {
            $content            = file_get_contents($jsonPath);
            $info               = json_decode($content, true);
            $info['_folder']    = $tplFolderName;
        }

        return $info;
    }

    /**
     * @return string
     */
    public function getTemplatesDir()
    {
        return $this->templatesDir;
    }

    /**
     * @param string $templatesDir
     */
    public function setTemplatesDir($templatesDir)
    {
        $this->templatesDir = $templatesDir;
    }


}