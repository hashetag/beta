const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.styles([
	'resources/plantilla/css/font-awesome.min.css',
	'resources/plantilla/css/simple-line-icons.min.css',
	'resources/plantilla/css/style.css'
],'public/css/plantilla.css')

mix.styles([
	'resources/classified/css/bootstrap.css',
	'resources/classified/css/style.css',
	'resources/classified/css/plugins/owl-carousel/owl.carousel.css',
	'resources/classified/css/plugins/owl-carousel/owl.theme.css',
	'resources/classified/css/plugins/bxslider/jquery.bxslider.css',
],'public/css/classified.css')

.scripts([
	'resources/plantilla/js/jquery.min.js',
	'resources/plantilla/js/popper.min.js',
	'resources/plantilla/js/bootstrap.min.js',
	'resources/plantilla/js/Chart.min.js',
	'resources/plantilla/js/pace.min.js',
	'resources/plantilla/js/template.js',
  'resources/plantilla/js/sweetalert2.all.js',
],'public/js/plantilla.js')

.scripts([
	'resources/classified/js/pace.min.js',
	'resources/classified/js/plugins/modernizr/modernizr-custom.js',
	'resources/classified/js/jquery/jquery-3.3.1.min.js',
	'resources/classified/js/vendors.min.js',
	'resources/classified/js/main.min.js',
	'resources/classified/js/plugins/autocomplete/jquery.mockjax.js',
	'resources/classified/js/plugins/autocomplete/jquery.autocomplete.js',
	'resources/classified/js/plugins/autocomplete/usastates.js',
	'resources/classified/js/plugins/autocomplete/autocomplete-demo.js',
  'resources/classified/js/sweetalert2.all.js',
],'public/js/classified.js')


.js('resources/js/app.js','public/js/app.js');


/*mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');*/
