<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="ltr">
<head>
  <base href="https://weonmart.test/"> 
  <!-- <base href="http://192.168.100.90/">  -->
  <meta charset="utf-8">
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <link rel="shortcut icon" href="{{ 'classified/img/favicon.png' }}">
  <title>{{ config('app.name', 'WeOnMart') }}</title>
  <!-- Bootstrap core CSS -->
  <!-- <link href="classified/css/bootstrap.css" rel="stylesheet"> -->
  <link href="{{ 'css/classified.css' }}" rel="stylesheet">
  <link href="{{ 'classified/css/style.css' }}" rel="stylesheet">
  <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  <!-- <script src="{{ 'css/sweetalert.css' }}"></script> -->
  
  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <!-- include pace script for automatic web page progress bar  -->
  <script>
    paceOptions = {
      elements: true
    };
  </script>
  <script src="{{ 'js/app.js' }}"></script>
  <style>
    /*yes is mine*/
    #myBtnt {display: none; position: fixed; bottom: 20px; right: 20px; z-index: 99; font-size: 18px; border: none;
      outline: none; background-color: #ff6a00; color: white; cursor: pointer; padding: 5px; border-radius: 4px; }
    #myBtnt:hover {background-color: #555; }
    /*end yes is mine*/
  </style>
  
</head>
<body>
<div id="app"> <!-- begin Vuejs -->
  <div id="wrapper">
     <button onclick="topFunction()" id="myBtnt" title="Go to top" ><i class="fa fa-arrow-up" aria-hidden="true"></i></button>
    <div class="header">
      <nav class="navbar  fixed-top navbar-site navbar-light bg-light navbar-expand-md" role="navigation">
        <div class="container">
          <div class="navbar-identity">
            <a href="{{ url('/') }}" class="navbar-brand logo logo-title" >
              <span><img src="{{ 'classified/img/logo.png' }}" class="img-responsive" ></span>
            </a>
            <button data-target=".navbar-collapse" data-toggle="collapse" class="navbar-toggler pull-right" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 30 30" width="30" height="30" focusable="false"><title>Menu</title><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M4 7h22M4 15h22M4 23h22"/></svg>
            </button>
          </div>
          <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav ml-auto navbar-right">
              @if (Route::has('login'))
                @auth
                  <li class="dropdown no-arrow nav-item" >
                    <a href="{{ url('home') }}" class="dropdown-toggle nav-link" data-toggle="dropdown">
                      <span>Hola, {{ Auth::user()->name }}</span> 
                      @if(Auth::user()->avatar)
                        <img src="{{ 'avatar/'.Auth::user()->avatar }}" class="rounded-circle" width="40" height="40"> 
                      @else 
                        <img src="{{ 'avatar/avatar.jpg' }}" class="rounded-circle" width="40" height="40"> 
                      @endif
                    </a>
                    <ul class="dropdown-menu user-menu dropdown-menu-right" >
                      <li class="active dropdown-item">
                        <a href="{{ route('home') }}" class="text-success"><i class="icon-home"></i> Mi Cuenta </a>
                      </li>
                      <li class="dropdown-item">
                        <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                          Cerrar Session 
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                          @csrf
                        </form>
                      </li>
                    </ul>
                  </li>
                  @else
                    <li class="nav-item" >
                      <a class="nav-link text-primary" href="{{ route('login') }}">
                        <i class="fa fa-sign-in-alt"></i>&nbsp;Ingresar
                      </a>
                    </li> 
                    @if (Route::has('register'))
                      <li class="nav-item" >
                        <a class="nav-link text-primary" href="{{ route('register') }}">
                         <i class="icon-user"></i>&nbsp;Registrar
                        </a>
                      </li>
                    @endif
                @endauth
              @endif
            </ul>
          </div>
        </div>
      </nav>
    </div>
   