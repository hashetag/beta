@include('frontend.includes.header')
<div class="main-container">
  <div class="container">
    <div class="row">
      <div class="col-sm-5 login-box">
        <div class="card card-default">
          <div class="bg-warning text-center">
            <h2 class="logo-title">
              <span class="logo-icon text-white">Registrarte</span>
            </h2>
          </div>
          <div class="card-body">
            <form role="form" method="POST" action="{{ route('register') }}" novalidate>
              @csrf
              <div class="button-wrap">
                <a href="{{ route('fblogin')}}" class="btn-social btn-fbk"><i class="fab fa-facebook-f"></i>facebook<br>connect</a>
                <a href="#" class="btn-social btn-ggl"><i class="fab fa-google-plus-g"></i>google<br>connect</a>
              </div>
              <h3 class="or-divider"><span>ó</span></h3>
              <div class="form-group">
                <label for="sender-email" class="control-label">Nombre :</label>
                <div class="input-icon"><i class="icon-user fa"></i>
                  <input type="text" id="name" placeholder="nombre" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>
                  @error('name')
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ $message }}</strong>
                    </span>
                  @enderror
                </div>
              </div>
              <div class="form-group">
                <label for="sender-email" class="control-label">Correo Electronico:</label>
                <div class="input-icon"><i class="icon-user fa"></i>
                  <input id="sender-email" type="email" placeholder="Email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">
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
                  <input type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password"" placeholder="Password" id="user-pass">
                   @error('password')
                    <span class="invalid-feedback" role="alert">
                      <strong>{{ $message }}</strong>
                    </span>
                  @enderror
                </div>
              </div>
              <div class="form-group">
                <label for="user-pass" class="control-label">Confirmar Contraseña:</label>
                <div class="input-icon"><i class="icon-lock fa"></i>
                  <input id="password-confirm" type="password" class="form-control" placeholder="Password" name="password_confirmation" required autocomplete="new-password">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-4 control-label"></label>
                <div class="col-md-12">
                  <div class="termbox mb10">
                    <div class="col-auto my-1 no-padding">
                      <div class="custom-control custom-checkbox ">
                        <input type="checkbox" class="custom-control-input" id="customControlAutosizing">
                        <label class="custom-control-label" for="customControlAutosizing">  
                          <span class="custom-control-description"> He leido y acceptado los
                            <a href="#">Terminos Y Condiciones</a> 
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div style="clear:both"></div>
                </div>
              </div>
              <div class="form-group">
                <button type="submit"  class="btn btn-warning  btn-block">Registrar</button>
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
          </div>
        </div>
        <div class="login-box-btm text-center">
          <p>¿ Ya tienes una cuenta ? <a href="{{ route('login') }}"><strong>Ingresar !</strong> </a></p>
        </div>
      </div>
    </div>
  </div>
</div>
@include('frontend.includes.footer')
