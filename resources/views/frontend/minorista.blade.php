@extends('frontend.includes.master')  
@section('content')
  @include('frontend.groupe')
  <!-- comienzo de Empresa -->
		<div class="col-md-9 page-content col-thin-left">
      <div class="category-list">
        <div class="tab-box ">
          <ul class="nav nav-tabs add-tabs tablist" role="tablist">
            <li class="nav-item">
              <a href="{{ url('/')}}" class="nav-link">Todo 
                <span class="badge badge-pill badge-warning">
                  <?php $empQty = DB::table('empresas')->where('status', 1)->count(); ?>
                  {{ $empQty }}
                </span>
            </a>
            </li>
            <li class="nav-item">
              <a href="{{ url('/fabrica')}}"  class="nav-link">
                <b> Fabrica </b>
                <span class="badge badge-pill badge-warning">
                  <?php $fabrica = DB::table('empresas')->where('type_id', 1)->where('status', 1)->count(); ?>
                  {{ $fabrica }}
                </span>
              </a>
            </li>
            <li class=" nav-item">
              <a href="{{ url('/mayorista')}}"  class="nav-link">
                <b> Mayorista </b>
                <span class="badge badge-pill badge-warning">
                  <?php $mayorista = DB::table('empresas')->where('type_id', 2)->where('status', 1)->count(); ?>
                  {{ $mayorista }}
                </span>
              </a>
            </li>
            <li class="active nav-item">
              <a href="{{ url('/minorista')}}"  class="nav-link">
                <b> Minorista </b>
                <span class="badge badge-pill badge-secondary">
                  <?php $minorista = DB::table('empresas')->where('type_id', 3)->where('status', 1)->count(); ?>
                  {{ $minorista }}
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div class="listing-filter">
          <div class="pull-left col-xs-6">
            <div class="breadcrumb-list">
              <a href="#" class="current"> <span>Empresas</span></a> 
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
        <div class="mobile-filter-bar col-xl-12">
          <ul class="list-unstyled list-inline no-margin no-padding">
            <li class="filter-toggle">
              <a class=""> <i class="icon-th-list"></i> Filters </a>
            </li>
          </ul>
      	</div>
      	<div class="menu-overly-mask"></div>
          <div class="tab-content">
            <div class="tab-pane  active " id="todo">
              <div class="adds-wrapper row no-margin property-list">
                             
                @if (count($minoristas) > 0 )
                  @foreach ($minoristas as $emp)

                    <div class="item-list">
                      <div class="row">
                        <div class="col-md-3 no-padding photobox">
                          <div class="add-image"><a href="{{ url($emp->slug)}}"><img class="thumbnail no-margin" src="{{'img_empresa/'.$emp->avatar}}"alt="img"></a>
                          </div>
                        </div>
                        
                        <!--/.photobox-->
                        <div class="col-md-6 add-desc-box">
                          <div class="ads-details">
                            <h5 class="add-title">
                            	<a href="{{ url($emp->slug)}}"> {{ $emp->name }} </a>	
                            </h5>
                            <span class="info-row text-dark"> <i class="fa fa-map-marker-alt "></i><span class="item-location"> {{ $emp->address }} , {{ $city->city }}, {{ $city->state }} </span> </span>
                            <span class="info-row text-dark"> <i class="fa fa-phone-square"></i><span class="item-location"> {{ $emp->phone }} </span> </span>
                            <div class="prop-info-box">
                              <div class="prop-info">
                                <div class="clearfix prop-info">
                                  <span class="text">Horario</span>
                                  <span class="text-dark">{{ $emp->openhours }}</span>
                                </div>
                                <div class="clearfix prop-info">
                                  <span class="text">Reseña:</span>
                                  <span class="text-dark"> 
                                    <i class="icon icon-star"></i>
                                    <i class="icon icon-star"></i>
                                    <i class="icon icon-star"></i>
                                    <i class="icon icon-star-empty"></i>
                                    <i class="icon icon-star-empty"></i>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3 text-right  price-box">
                          <div style="clear: both;margin-top: 50px; "></div>
                          <a class="btn btn-outline-warning " href="{{ url($emp->slug)}}">
                            Contactar
                          </a>
                          <a class="btn btn-warning " href="{{ url($emp->slug)}}">
                            Ver productos
                          </a>
                        </div>
                        <!--/.add-desc-box-->
                      </div>
                    </div>
                  @endforeach
                  @else 
                  <p class="alert alert-danger save-search-bar text-center">
                    Oops! No hay Empresas en esta categoría 
                  </p>
                @endif
                <!--/.item-list-->
              </div>
            	<!--/.adds-wrapper-->
            </div>
          </div>
          <!-- <div class="tab-box  save-search-bar text-center">
          	<a href=""> <i class=" icon-star-empty"></i> Save Search </a>
          </div> -->
        </div>
        <div class="pagination-bar text-center">
          <nav aria-label="Page navigation " class="d-inline-b">
            {{ $minoristas->links() }}
          </nav>
        </div>
      </div>
    </div>
  @endsection