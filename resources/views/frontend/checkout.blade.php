@extends('frontend.includes.third')  
	@section('content')
		@if(Auth::user()->phone == '')
			<div class="col-md-8 page-content">
        <div class="inner-box category-content">
          <h2 class="title-2 p-4 bg-warning text-white"><i class="icon-user-add"></i> Agregar Informacíon Adicíonal </h2>
            <div class="row">
              <div class="col-sm-12">
              	<form class="form-horizontal" role="form" method="POST" action="{{ url($empslug.'/cart/payment') }}" novalidate>
                	@csrf
                  <fieldset>
                    <div class="form-group  row required">
                      <label class="col-md-4 control-label">Telefono <sup>*</sup></label>
                      <div class="col-md-6">
                        <input name="phone" id="phone" placeholder="Telefono" class="form-control input-md @error('phone') is-invalid @enderror" value="{{ old('phone') }}" type="text"  required autocomplete="name" autofocus>
                        @error('name')
			                    <span class="invalid-feedback" role="alert">
			                      <strong>{{ $message }}</strong>
			                    </span>
			                  @enderror
                      </div>
                    </div>
                    <div class="form-group  row required">
                      <label class="col-md-4 control-label">Direccíon <sup>*</sup></label>
                      <div class="col-md-6">
                        <input name="address" placeholder="ej:San Martin 3200, entre Pellegrini y San Juan" class="form-control input-md" value="{{ old('address') }}" type="text"  required autocomplete="name" autofocus>
                        @error('name')
			                    <span class="invalid-feedback" role="alert">
			                      <strong>{{ $message }}</strong>
			                    </span>
			                  @enderror
                      </div>
                    </div>
                    <div class="form-group  row required">
                      <label class="col-md-4 control-label">Codígo Postal <sup>*</sup></label>
                      <div class="col-md-6">
                        <input name="zipcode" value="{{ old('zipcode') }}" placeholder="Codígo Postal" class="form-control input-md" type="text"  required autocomplete="name" autofocus>
                        @error('name')
			                    <span class="invalid-feedback" role="alert">
			                      <strong>{{ $message }}</strong>
			                    </span>
			                  @enderror
                      </div>
                    </div>
                    <div class="form-group  row required">
                      <label class="col-md-4 control-label">Cíudad <sup>*</sup></label>
                      <div class="col-md-6">
                        <input name="city" value="{{ old('city') }}" placeholder="Cíudad" class="form-control input-md" type="text"  required autocomplete="name" autofocus>
                        @error('name')
			                    <span class="invalid-feedback" role="alert">
			                      <strong>{{ $message }}</strong>
			                    </span>
			                  @enderror
                      </div>
                    </div> 
                    <div class="form-group  row required">
                      <label class="col-md-4 control-label">Provicía <sup>*</sup></label>
                      <div class="col-md-6">
                        <input name="state" value="{{ old('state') }}" placeholder="Provicía" class="form-control input-md" type="text">
                        @error('name')
			                    <span class="invalid-feedback" role="alert">
			                      <strong>{{ $message }}</strong>
			                    </span>
			                  @enderror
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-4 control-label"></label>
                      <div class="col-md-8">
                      <div style="clear:both"></div>
                      <a class="btn btn-warning btn-block" href="{{url($empslug.'/cart/checkout/end')}}">Guardar</a>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
		@else
		  <!-- Mercadopago form -->
	    <form action="{{ url($empslug.'/cart/checkout') }}" method="POST" class="pull-right ml-2">
	      @csrf
	      <input type="hidden" name="total" value="400">
	      <input type="hidden" name="description" value="{{ ('nouvo pro') }}">
	      <input type="hidden" name="email" value="{{ Auth::user()->email }}">
	      <script src="https://www.mercadopago.com.ar/integrations/v1/web-tokenize-checkout.js" data-public-key="TEST-f0c5576e-178b-4ae4-9204-43a0a85fb35d" data-transaction-amount="{{ number_format($total, 2) }}">
	      </script>
	    </form>
		@endif
	@endsection