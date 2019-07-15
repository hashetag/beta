<!DOCTYPE html>
<html lang="es">

<head>
  <!-- <base href="http://192.168.100.90/">  -->
  <base href="https://weonmart.test/">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Sistema Ventas WeOnMart">
  <meta name="author" content="WeOnMart">
  <meta name="keyword" content="Sistema de Gestion WeOnMart">
  <link rel="shortcut icon" href="{{ 'classified/img/favicon.png' }}">
  <title>{{ config('app.name', 'WeOnMart') }}</title>
  <!-- Icons -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link href="{{ 'css/plantilla.css' }}" rel="stylesheet">
  <style>
   .dash {
     /* color: #FD5001;*/
      background-color: #FF6A00;
    }
    .logo {
      margin-top: 70px;
    }
  </style>
</head>

<body class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
  <div id='app'>
    <header class="app-header navbar">
      <button class="navbar-toggler mobile-sidebar-toggler d-lg-none mr-auto" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="nav navbar-nav d-md-down-none">
        <li class="nav-item px-3">
          <a class="nav-link" href="#">Escritorio</a>
        </li>
        <li class="nav-item px-3">
          <a class="nav-link" href="#">Configuraciones</a>
        </li>
        <li class="nav-item px-3">
          <a class="nav-link" href="#">Email : {{ Auth::user()->email }} </a>
        </li>
        <li class="nav-item px-3">
          <a class="nav-link" href="#">Nombre de Empresa : {{ Auth::user()->name }} </a>
        </li>
        <li>
          <a class="btn btn-success" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();"> {{ __('Logout') }} </a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
        </li>
      </ul>
      <ul class="nav navbar-nav ml-auto">
        <li class="nav-item d-md-down-none">
            <a class="nav-link" href="#" data-toggle="dropdown">
                <i class="icon-bell"></i>
                <span class="badge badge-pill badge-danger">5</span>
            </a>
        </li>
      </ul>
    </header>

    <div class="app-body" >
  
      @if(Auth::check())
        
        <meta name="empresa-id" content="{{ Auth::user()->id }}">
       
        @if(Auth::guard('empresa')->user()->isAdmin == 1)

          @include('admin.adminSidebar')
      
        @elseif(Auth::guard('empresa')->user()->isAdmin == 0)
            
            @include('admin.empresaSidebar')
      
        @else

        @endif
      
      @endif

    </div>

  </div>

  <footer class="app-footer">
    <span><a href="https://www.weonmart.com/">WeOnMart</a> &copy; 2019</span>
    <span class="ml-auto">Todos los derechos reservados <a href="https://www.weonmart.com/">WeOnMart</a></span>
  </footer>

  <script src="{{ 'js/app.js' }}"></script>
  <script src="{{ 'js/plantilla.js' }}"></script>
 
</body>

</html>