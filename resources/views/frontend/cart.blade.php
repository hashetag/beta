@extends('frontend.includes.slave')  
@section('content')
  
<div class="col-md-12 page-content">
  <div class="inner-box">
    <h2 class="title-2 ">
      <b class="alert alert-primary">Carrito <i class="fa fa-shopping-basket"></i> 
        <span class="badge badge-pill badge-warning">{{ count($cart) }}</span>
        Total: <span class="badge badge-pill badge-warning">{{ '$'.number_format($total, 2) }}</span>
      </b>
      @if(count($cart) > 0)
        @if(Auth::user())
          <a href="{{ url($empSl.'/cart/checkout') }}" class="pull-right ml-2 btn btn-primary"> 
            <i class="fa fa-arrow-right"></i> Finalizar Compra 
          </a>
        @else 
          <a href="{{ url('/login') }}" class="pull-right ml-2 btn btn-primary"> 
            <i class="fa fa-arrow-right"></i> Finalizar Compra 
          </a>
        @endif
        <a href="{{ url($empSl) }}" class="pull-right btn btn-warning mr-2"><i class="fa fa-arrow-left"></i> Seguir Comprando </a>
      @else 
        <a href="{{ url($empSl) }}" class="pull-right btn btn-warning mr-2"><i class="fa fa-arrow-left"></i> Volver </a>  
      @endif
    </h2>
    <div> 
      @if(session()->has('message'))
        <p class="alert alert-success"><i class="fa fa-check-circle"></i>&nbsp;{{Session::get('message')}}</p>
      @endif
    </div> 
    <div class="table-responsive">
      <table id="addManageTable" class="table table-striped table-bordered add-manage-table table demo" data-filter="#filter" data-filter-text-only="true">
        <thead>
          <tr>
            <th data-type="numeric"> Qty</th>
            <th> Imagen</th>
            <th data-sort-ignore="true"> Descripcíon</th>
            <th data-type="numeric"> Precio</th>
            <th data-type="numeric"> Precio Total</th>
            <th> Option</th>
          </tr>
        </thead>
        <tbody>
          @if (count($cart) > 0 )
            @foreach($cart as $c)
              <tr>
                <td style="width:13%" >
                  <div class="form-control">
                    <form role="form" name="updateItem" method="POST" action="{{ url($slugCart.'/update')}}" >
                      @csrf
                      <input type="hidden" name="p_id" value="{{ $c->p_id }}">
                      <input type="number" name="qty" style="width:50px;" value="{{ $c->qty }}">
                      <button type="submit" class="btn btn-warning btn-sm"><i class="fa fa-sync"></i> </button>
                    </form>
                  </div>
                </td>
                <td  class="add-img-td">
                  <a href="#"><img class="thumbnail  img-responsive" src="{{ 'img_product/'.$c->picture }}" alt="img"></a>
                </td>
                <td class="ads-details-td">
                  <div>
                    <p><strong> <a href="" title="Brand New Nexus 4">{{ $c->p_name }}</a> </strong></p>
                  </div>
                </td>
                <td class="price-td">
                  <div><strong> {{ '$'.$c->price}}</strong></div>
                </td>
                <td class="price-td">
                  <div><strong> {{ '$'.number_format(($c->price * $c->qty), 2)}}</strong></div>
                </td>
                <td  class="action-td">
                  <div>
                    <p>
                      <form role="form" name="deleteItem" method="POST" action="{{ url($slugCart.'/delete')}}" >
                        @csrf
                        <input type="hidden" name="p_id" value="{{ $c->p_id }}">
                        <button type="submit"  class="btn btn-warning btn-sm"><i class="fa fa-trash"></i> eliminar</button>
                      </form>
                    </p>
                  </div>
                </td>
              </tr>
            @endforeach
          @else
            <p class="alert alert-info">No hay Producto en el carrito</p>
          @endif
        </tbody>
      </table>
    </div>
  </div>
</div>

@endsection