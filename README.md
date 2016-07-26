# Symfony Newsletter

A very simple project to make newsletter based in templates. Using Symfony2, and AngularJS

## Changelog

**v1.1.0**

  * Added $sce to trust the preview url
  * Added directive to switch input type:
    * Added color type
    * Added editor type (ckeditor)
  * Now the preview refreshes after 300ms of stop typing instead of each keypress.

**v1.0.0**

  * Very basic application


## Instalation

Download or clone this repository:

```
git clone https://github.com/dem3trio/symfony_newsletter.git your_install_dir
```

Install the all the dependencies:

```
cd your_install_dir/
composer install
bower install
```

Put each asset in its place

```
php app/console assets:install
php app/console assetic:dump
```

And done!

Now run it with the symfony2 built-in server or create a virtual host in your desired web server

## How it works:

You should create one directory inside your_install_dir/app/data/templates for each newsletter template:

```
your_install_dir/
    app/
        data/
            templates/
                my_cool_template1/
                my_cool_template2/
                my_ubber_cool_template1/
```

And inside you must create 2 files, your twig template, and one `template.json` file.

This is a example of the template.json:

```
{
  "name": "My cool template",
  "description": "Description of the template",
  "template_file": "the_name_of_your_template.html.twig",
  "variables": [
    {"name": "textColor",   "type":"color", "default": "#FF0000" },
    {"name": "textContent", "type":"text", "default": "Default text" }
    {"name": "editorContent", "type":"editor", "default": "Default text in the editor" }
  ]
}
```

given that you have set 3 variables in the template.json, `textColor`, `textContent` and `editorContent`, you have to include those in your
template. Note that `editorContent` is a "editor" type, so it has to be filtered with the "raw" option in twig.

```twig
<!DOCTYPE html>
<html>
<head></head>
<body>

<p style="color:{{ textColor }}">{{ textContent }}</p>
{{ editorContent | raw }}

</body>
</html>
```

Add all the variables you need :)

## What is comming in next releases:

  * Allow input types:
    * datepicker
    * images
    * repeateable content
  * Allow to download the rendered template (now only opens a new window) in a zip file
  * Allow to send an e-mail to test it
  * Upload new templates with a form.
  * Allow folders (css, images) and download them with the zip file.
  * Clean symfony code
  * Think more features...
