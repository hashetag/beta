<!DOCTYPE html>
<html lang="es">
<head>
   
  <!-- <base href="http://192.168.100.90/"> -->
  <base href="https://weonmart.test/">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="WeOnMart">
  <meta name="author" content="WeOnMart">
  <meta name="keyword" content="WeOnMart">
  <link rel="shortcut icon" href="{{ 'classified/img/favicon.png' }}">
  <!-- CSRF Token -->

  <title>{{ config('app.name', 'WeOnMart') }}</title>

  <link href="{{ 'css/plantilla.css' }}" rel="stylesheet">
  <style>
   .dash {
     /* color: #FD5001;*/
      background-color: #FF6A00;
    }
    /*.logo {
      margin-top: 70px;
    }*/
  </style>
</head>

<body class="app flex-row align-items-center">
  <div class="container"> 
    @yield('content')
 </div>
  <script src="{{ 'js/plantilla.js' }}"></script>
</body>
</html>