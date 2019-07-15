@extends('frontend.includes.slave')  
@section('content')
  @include('frontend.category')
  <!-- comienzo de Empresa -->
    <div class="col-md-9 page-content col-thin-left">
      <div class="category-list make-grid" >
        <div class="tab-box ">
          <ul class="nav nav-tabs add-tabs tablist" role="tablist">
            <li class="active nav-item">
              <a href="#alladslist" role="tab" data-toggle="tab" class="nav-link">Productos <!-- <span class="badge badge-pill badge-secondary">228</span> --></a>
            </li>
            <li class=" nav-item">
              <a href="{{ url($empSlug.'/cart')}}" class="btn btn-outline-warning text-primary">
                <b> Carrito </b><i class="fa fa-shopping-basket text-primary"></i>
                <span class="badge badge-pill badge-success">
                  <?php 
                    //echo "<pre>"; print_r($empSlug); die;
                    $session_id = Session::getId();
                    $empr = DB::table('empresas')->where('slug', $empSlug)->first();
                    $empID = $empr->id;
                    $items = DB::table('carts')->where('empresa_id', $empID)->where('session_id', $session_id)->get()->count();
                    echo $items;
                  ?>
                </span>
              </a>
            </li>
            <li class=" nav-item">
              <a href="#businessads" role="tab" data-toggle="tab" class="nav-link"> Información <span class="badge badge-pill badge-secondary">300</span></a>
            </li>
            <li class=" nav-item">
              <a href="#businessads" role="tab" data-toggle="tab" class="nav-link"> Preguntas <span class="badge badge-pill badge-secondary">300</span></a>
            </li>
            <li class=" nav-item">
              <a href="#private" role="tab" data-toggle="tab" class="nav-link">Opiniones <span class="badge badge-pill badge-secondary">102</span></a>
            </li>
            <li class=" nav-item">
              <a href="{{ url('/')}}" class="nav-link btn btn-warning"><i class="fa fa-arrow-left"></i> Volver al inicio</a>
            </li>
          </ul>
        </div>
        <div class="listing-filter">
          <div class="pull-left col-xs-6">
            <div class="breadcrumb-list">
              <a href="#" class="current"> <span>Productos</span></a> 
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
              <div class="adds-wrapper row no-margin property-list">
                @if (count($products) > 0 )
                  @foreach ($products as $prod)
                    <div class="item-list">
                      @if(($prod->discount) > 0)
                        <div class="cornerRibbons btn-success">
                          <a class="item-price "> 
                            <strong>{{ '$'. number_format($prod->price - ($prod->price * $prod->discount/100), 2)}} </strong>
                          </a>
                        </div>
                      @endif
                      <div class="row">
                        <div class="col-md-3 no-padding photobox">
                          <div class="add-image"><!-- <span class="photo-count"><i class="fa fa-camera"></i> 2 </span> --> <a href="{{ url($prod->slug)  }}"><img class="thumbnail no-margin" src="{{'img_product/'.$prod->picture}}" alt="img" width="150" height="150"></a>
                          </div>
                        </div>
                        <div class="col-md-6 add-desc-box">
                          <div class="ads-details">
                            <h5 class="add-title">
                              <a href="{{ url($prod->slug) }}" class="text-black"> {{ $prod->name }} </a>  
                            </h5>
                          </div>
                        </div>
                        <div class="col-md-3 text-center  price-box">
                          <h3 class="item-price "> 
                            @if(($prod->discount) > 0)
                              <strong><del>{{ '$'. $prod->price }} </del></strong>
                            @else  
                              <strong>{{ '$'. $prod->price }} </strong>
                            @endif
                          </h3>
                          <div style="clear: both"></div>
                          
                        </div>  
                      </div>
                    </div>
                  @endforeach

                  @else 
                    <p class="alert alert-danger save-search-bar text-center">
                      Oops! No hay Producto en esta categoría 
                    </p>
                @endif
              </div>
            </div>
          </div>
        </div>
        <div class="pagination-bar text-center">
          <nav aria-label="Page navigation " class="d-inline-b">
            {{ $products->links() }}
          </nav>
        </div>
      </div>
    </div>
  @endsection