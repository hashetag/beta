@extends('admin.admin')
  @section('content')
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-group mb-0">
          <div class="card p-4">
            <form class="form-horizontal" method="POST" action="{{ route('admin.login.submit') }}" novalidate>
              @csrf
              <div class="card-body">
                <h1>{{ __('Admin Login') }}</h1>

                <p class="text-muted">Control de gesttion</p>

                <div class="form-group mb-3">

                  <span for="email" class="input-group-addon"><i class="icon-user"></i></span>

                  <input id="email" type="email" value="{{old('email')}}" name="email" class="form-control @error('email') is-invalid @enderror" required autocomplete="email" autofocus placeholder="correo electronico">

                  @error('email')<span class="invalid-feedback" role="alert">{{ $message }}</span>@enderror
                </div>

                <div class="form-group mb-4">

                  <span for="password" class="input-group-addon"><i class="icon-lock"></i></span>

                  <input type="password" name="password" id="password" class="form-control @error('password') is-invalid @enderror" required autocomplete="current-password" placeholder="Contraseña">

                 @error('password')<span class="invalid-feedback">{{ $message }}</span> @enderror

                </div>

                <div class="row">
                  <div class="col-12">
                    <button type="submit" class="btn dash btn-block text-white">Acceder</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="card text-white dash py-5 d-md-down-none" style="width:44%">
            <div class="card-body text-center">
              <div>
                <!-- <h2>WeOnMart</h2> -->
                <span><img src="{{ 'classified/img/admin_logo.png' }}" class="logo" ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  @endsection
 