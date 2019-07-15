@include('frontend.includes.header')

<div class="main-container">
  <div class="container">
    <div class="row">
      <div class="col-sm-5 login-box">
        <div class="card card-default">
          <div class="bg-warning text-center">
            <h2 class="logo-title">
              <span class="logo-icon text-white">Ingresar</span>
            </h2>
          </div>
          <div class="card-body">
            <form role="form" method="POST" action="{{ route('login') }}" novalidate>
               @csrf
              <div class="button-wrap">
                <a href="{{ route('fblogin')}}" class="btn-social btn-fbk"><i class="fab fa-facebook-f"></i>facebook<br>connect</a>
                <a href="#" class="btn-social btn-ggl"><i class="fab fa-google-plus-g"></i>google<br>connect</a>
              </div>
              <h3 class="or-divider"><span>ó</span></h3>
              <div class="form-group">
                <label for="sender-email" class="control-label">Correo Electronico:</label>
                <div class="input-icon"><i class="icon-user fa"></i>
                  <input id="sender-email" type="email" placeholder="Email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                  @error('email')
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ $message }}</strong>
                    </span>
                  @enderror
                </div>
              </div>
              <div class="form-group">
                <label for="user-pass" class="control-label">Contraseña:</label>
                <div class="input-icon"><i class="icon-lock fa"></i>
                  <input type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password" placeholder="Password" id="user-pass">
                  @error('password')
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ $message }}</strong>
                    </span>
                  @enderror
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-warning  btn-block">Ingresar</button>
              </div>
              
            </form>
          </div>
          <div class="card-footer">
            <div class="checkbox pull-left">
              <label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                <input type="checkbox" class="custom-control-input">
                <span class="custom-control-indicator"></span>
              </label>
            </div>
            <p class="text-center pull-right"> 
               @if (Route::has('password.request'))
                <a class="btn btn-link" href="{{ route('password.request') }}">¿ Olvidaste tu contraseña ? </a> </p>
              @endif
            <div style=" clear:both"></div>
          </div>
        </div>
        <div class="login-box-btm text-center">
          <p>¿ No tienes cuenta ? <a href="{{ route('register') }}"><strong>Registrate !</strong> </a></p>
        </div>
      </div>
    </div>
  </div>
</div>
@include('frontend.includes.footer')
