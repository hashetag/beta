<div class="search-row-wrapper" style="background-image: url(classified/img/welcome-bg.jpeg);">
  <div class="inner">
    <div class="container">
      <form action="#" method="post" class="form-horizontal">
        <div class="row search-row animated fadeInUp">
          <div class="col-xl-8 col-sm-4 search-col relative locationicon">
            <i class="icon-location-2 icon-append"></i>
            <input type="text" name="business" id="autocomplete-ajax" class="form-control locinput input-rel searchtag-input has-icon" placeholder="Buscar producto..." value="">
          </div>
          <div class="col-xl-4 col-sm-4 search-col">
            <button class="btn btn-warning btn-search btn-block  btn-gradient"><i class="icon-search"></i><strong>Buscar</strong></button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <nav aria-label="breadcrumb" role="navigation" class="pull-left">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="{{ url('/')}}"><i class="icon-home fa"></i></a></li>
          <li class="breadcrumb-item">
            <a href="{{ url($empresa->slug)}}">{{ $empresa->name }} </a> 
          </li>
          <li class="breadcrumb-item">
            <a href="{{ url($empresa->slug)}}">
              <i class="fas fa-map-marker-alt "></i> {{ $empresa->address }}, {{ $city->city }}, {{ $city->state }}
            </a>
          </li>
          <li class="breadcrumb-item">
            <a href="{{ url($empresa->slug)}}">
              <i class="fab fa-whatsapp"></i>&nbsp;{{ $empresa->phone }} </span>
            </a>
          </li>
          <li class="breadcrumb-item">
            <a href="{{ url($empresa->slug)}}">
              <i class="fa fa-clock-o"></i>&nbsp;{{ $empresa->openhours }} </span>&nbsp;
              <i class="fa fa-clock-o"></i>&nbsp;{{ $empresa->openhours_2 }} </span>
            </a>
          </li>
        </ol>
      </nav>
      <div class="pull-right backtolist">
        <a href="{{ url('/')}}"> <i class="fa fa-angle-double-left"></i> Volver al inicio</a>
      </div>
    </div>
  </div>
</div>
