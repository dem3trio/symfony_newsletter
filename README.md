# Symfony Newsletter

A very simple project to make newsletter based in templates. Using Symfony2, and AngularJS

## Changelog

### v1.0.0
Very basic application


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
    {"name": "textColor",   "default": "#FF0000" },
    {"name": "textContent", "default": "Default text" }
  ]
}
```

given that you have set 2 variables in the template.json, `textColor` and `textContent`, you have to include those in your
template.

```twig
<!DOCTYPE html>
<html>
<head></head>
<body>

<p style="color:{{ textColor }}">{{ textContent }}</p>

</body>
</html>
```

Add all the variables you need :)

## ToDo:

  * Allow input types (now only support text):
    * ckeditor
    * colorpicker
    * datepicker
    * images
    * repeateable content
  * Allow to download the rendered template (now only opens a new window) in a zip file
  * Allow to send an e-mail to test it
  * Upload new templates with a form.
  * Allow folders (css, images) and download them with the zip file.
  * Think more features...