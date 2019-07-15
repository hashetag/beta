@include('frontend.includes.header')
  @if ($product )
    <div class="main-container">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <nav aria-label="breadcrumb" role="navigation" class="pull-left">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="{{ url('/')}}"><i class="icon-home fa"></i></a></li>
                <li class="breadcrumb-item"><a href="{{ $empresa->slug }}">{{ $empresa->name }}</a></li>
                <li class="breadcrumb-item"><a href="{{ $category->slug }}"> {{$category->name }}</a></li>
              </ol>
            </nav>
            <div class="pull-right backtolist">
              <a href="{{ $slug_emp}}"> <i class="fa fa-angle-double-left"></i> Volver</a>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-9 page-content col-thin-right">
            <div class="inner inner-box ads-details-wrapper">
              <h1 class="auto-heading">
                <span class="auto-title left">{{ $product->name }}</span> 
                <span class="auto-price pull-right text-dark"> {{ '$'.$product->price }}</span>
              </h1>
              <div style="clear:both;"></div>
              <span class="info-row"> 
                <!--  -->
              </span>
              <div class="row ">
                <div class="col-sm-9 automobile-left-col">
                  <div class="ads-image">
                    <ul class="bxslider">
                      <li><img src="{{'img_product/'.$product->picture}}" alt="img"/></li>
                      @if (count($images) > 0 )
                        @foreach ($images as $key)
                          <li><img src="{{'img_product/'.$key->image}}" alt="img"/></li>
                        @endforeach
                      @endif
                    </ul>
                    <div id="bx-pager">
                      @foreach($images as $key)
                        <a class="thumb-item-link" data-slide-index="0" href="">
                          <img src="{{'img_product/'.$key->image}}" alt="img"/>
                        </a>
                      @endforeach
                    </div>
                  </div>
                </div>
              </div>
              <!--/.row-->
              <div class="Ads-Details">
                <h5 class="list-title"><strong>Descripcíon del Producto</strong></h5>
                <div class="row">
                  <div class="ads-details-info col-md-8">
                    <p>{{ $product->description }} </p>
                    <h4 class="text-uppercase">Detaille</h4>
                    <p>{{ $detail->detail }} </p>
                    <h4 class="text-uppercase">Stock</h4>
                    <ul class="list-circle">
                      <li><strong>Cantidad : </strong> {{ $product->stock }}</li>
                    </ul>
                  </div>
                 <!-- Boite -->
                  <div class="col-md-4">
                    <aside class="panel panel-body panel-details">
                      <ul>
                        <h4 class="text-uppercase">COLORES</h4>
                        @foreach($colors as $color)
                          <li> <p class=" no-margin ">Color : <strong> {{ $color->color }}</strong></p> </li>
                        @endforeach
                      </ul>
                    </aside>
                    <aside class="panel panel-body panel-details">
                      <h4 class="text-uppercase">DIMENSIONES</h4>
                      <ul>
                        @foreach($sizes as $size)
                          <li> <p class=" no-margin ">Talle : <strong> {{ $size->size }}</strong></p> </li>
                        @endforeach
                      </ul>
                    </aside>
                  </div>
                </div>
                <div class="content-footer text-left">
                  @if(Auth::user())
                    <form role="form" name="addToCart" method="POST" action="{{ url($slug_emp.'/cart') }}" > 
                      @csrf
                      <input type="hidden" name="p_id" value="{{ $product->id }}">
                      @if(($product->discount) > 0)
                        <input type="hidden" name="price" 
                        value="{{ $product->price - ($product->price * $product->discount/100)}}">
                      @else
                        <input type="hidden" name="price" value="{{ $product->price }}">
                      @endif
                      <input type="hidden" name="qty" value="1">
                      <button type="submit"  class="btn btn-warning btn-block">Agregar al Carrito <i class="fa fa-shopping-basket"></i></button>
                    </form>
                  @else 
                    <a href="redirect" class="btn btn-warning btn-block" onClick="alert('Iniciar Session para comprar');">
                      Agregar al Carrito <i class="fa fa-shopping-basket "></i>
                    </a>
                  @endif
                </div>
              </div>
            </div>
          </div>
          <!-- Informacion de la Empresa -->
          <div class="col-md-3  page-sidebar-right">
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
                    </div>
                    <div class="user-ads-action">
                      <a href="#" data-toggle="modal" class="btn btn-outline-warning btn-block">
                        <i class="icon-mail-2"></i> Contactar 
                      </a>
                      <a href="#contactAdvertiser" data-toggle="modal" class="btn btn-warning btn-block">
                        <i class="fab fa-whatsapp"></i> {{ $empresa->phone }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  @else
    <p class="alert alert-danger save-search-bar text-center col-6">
      Oops! No Existe este Producto en esta Empresa 
    </p>
  @endif

@include('frontend.includes.footer')