@extends('frontend.includes.third')  
@section('content')
  @if ($empresa )
    <!-- Comienzo de aside -->
    <div class="col-md-3 page-sidebar">
      <aside>
        <div class="card sidebar-card card-contact-seller">
          <div class="card-header bg-warning"> <b class="text-white">{{ $empresa->name }}</b></div>
          <div class="card-content user-info">
            <div class="card-body text-center">
              <div class="seller-info">
                <div class="company-logo-thumb">
                  <a><img src="{{'img_empresa/'.$empresa->avatar}}" class=" " alt="img"> </a>
                </div>
                <h3 class="no-margin">{{ $empresa->name }}</h3>
                <p>Direccíon: <strong>{{ $empresa->address }}</strong></p>
                <p>Ciudad : <strong> {{ $city->city }} </strong></p>
                <p>Provincía : <strong> {{ $city->state }} </strong></p>
                <p>Categoría : <strong> {{ $groupe->name }} </strong></p>
                <p>Típo : <strong> {{ $type->name }} </strong></p>
                <p>Horario: <strong>{{ $empresa->openhours }}</strong></p>
                <p>       : <strong>{{ $empresa->openhours_2 }}</strong></p>
                <p>Website: <strong>{{ $empresa->website }}</strong></p>
              </div>
              <div class="user-ads-action">
                <a href="#" data-toggle="modal" class="btn btn-outline-warning btn-block">
                  <i class="icon-mail-2"></i> Contactar 
                </a>
                <a href="#contactAdvertiser" data-toggle="modal" class="btn btn-warning btn-block">
                  <i class="fab fa-whatsapp"></i> {{ $empresa->phone}}
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
    <!-- fin de aside -->
    <!-- comienzo de Empresa -->
    <div class="col-md-9 page-content col-thin-left">
      <div class="category-list make-grid" >
        <div class="tab-box ">
          <ul class="nav nav-tabs add-tabs tablist" role="tablist">
            <li class="active nav-item">
              <a href="#alladslist" role="tab" data-toggle="tab" class="nav-link">Mapa </a>
            </li>
            <li class=" nav-item">
              <a href="#preguntas" role="tab" data-toggle="tab" class="nav-link">Preguntas 
                <span class="badge badge-pill badge-secondary">300</span>
              </a>
              </a>
            </li>
            <li class=" nav-item">
              <a href="#businessads" role="tab" data-toggle="tab" class="nav-link"> Informaciónes <span class="badge badge-pill badge-secondary">300</span></a>
            </li>
            <li class=" nav-item">
              <a href="#businessads" role="tab" data-toggle="tab" class="nav-link"> Opiniones <span class="badge badge-pill badge-secondary">300</span></a>
            </li>
            <li class=" nav-item">
              <a href="#private" role="tab" data-toggle="tab" class="nav-link">Opiniones <span class="badge badge-pill badge-secondary">102</span></a>
            </li>
            <!-- <li class=" nav-item">
              <a href="" class="nav-link btn btn-warning"><i class="fa fa-arrow-left"></i> Volver al inicio</a>
            </li> -->
          </ul>
        </div>
        <div class="listing-filter">
          <div class="pull-left col-xs-6">
            <div class="breadcrumb-list">
              <a href="#" class="current"> <span>Mapa</span></a> 
            </div>
          </div>
          <div class="pull-right col-xs-6 text-right listing-view-action"> </div>
          <div style="clear:both"></div>
        </div>
        <div class="mobile-filter-bar col-xl-12">
          <ul class="list-unstyled list-inline no-margin no-padding">
            <li class="filter-toggle">
              <a class=""> <i class="icon-th-list"></i> Categorias </a>
            </li>
          </ul>
        </div>
        <div class="menu-overly-mask"></div>
        <div class="tab-content">
          <div class="tab-pane active " id="alladslist">
            <div class="adds-wrapper row no-margin property-list"> </div>
            <div class="content-footer text-left">
              <div class="w100 map" id="prop-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387145.86637487786!2d-74.25819556904787!3d40.70531103651696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY!5e0!3m2!1sen!2sus!4v1473181424956" height="350" style="border:0;   width:100%">
                </iframe>
              </div>
              <div style="clear: both"></div>
              <p class="alert alert-info">
                <i class="icon-location-2 icon-append"></i>  &nbsp; &nbsp;
                {{ $empresa->address }} , &nbsp; {{ $city->city }}, &nbsp; {{ $city->state }},  &nbsp;{{ $city->country }}
              </p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  @endif  
@endsection