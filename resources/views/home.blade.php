@include('frontend.includes.header')
  <div class="main-container">
    <div class="container">
      <div class="row">
        <div class="col-md-3 page-sidebar">
          <aside>
            <div class="inner-box">
              <div class="user-panel-sidebar">
                <div class="collapse-box">
                  <h5 class="collapse-title no-border">
                    Dashboad
                    <a href="#MyClassified"  aria-expanded="true"  data-toggle="collapse" class="pull-right"><i class="fa fa-angle-down"></i>
                    </a>
                  </h5>
                  <div class="panel-collapse collapse show" id="MyClassified">
                    <ul class="acc-list">
                      <li><a class="active" href=" {{ route('home') }} "><i class="icon-home"></i>Datos Personal </a></li>
                    </ul>
                  </div>
                </div>
                <div class="collapse-box">
                  <h5 class="collapse-title">
                    Escritorio 
                    <a href="#MyAds" aria-expanded="true"  data-toggle="collapse" class="pull-right"><i class="fa fa-angle-down"></i>
                    </a>
                  </h5>
                  <div class="panel-collapse collapse show" id="MyAds">
                    <ul class="acc-list">
                      <li><a href="#"><i class="icon-docs"></i>
                        Mis Pedidos <span class="badge">42</span> </a>
                      </li>
                      <li><a href="#"><i class="icon-heart"></i>
                        Mis Favouritos <span class="badge badge-secondary">42</span> </a>
                      </li> 
                    </ul>
                  </div>
                </div>

                <div class="collapse-box">
                  <h5 class="collapse-title"> 
                    Salir 
                    <a href="#TerminateAccount" aria-expanded="true"  data-toggle="collapse" class="pull-right">
                      <i class="fa fa-angle-down"></i>
                    </a>
                  </h5>
                  <div class="panel-collapse collapse show" id="TerminateAccount">
                    <ul class="acc-list">
                      <li>
                        <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" ><i class="icon-cancel-circled "></i>
                          Cerrar Session 
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                          @csrf
                        </form>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div class="col-md-9 page-content">
          <div class="inner-box">
            <div class="row">
              <div class="col-md-5 col-xs-4 col-xxs-12">
                <h3 class="no-padding text-center-480 useradmin">
                  <a href=""><img class="userImg" src="{{ 'avatar/'.Auth::user()->avatar }}" alt="user"> {{ Auth::user()->name}} </a>
                </h3>
              </div>
              <div class="col-md-7 col-xs-8 col-xxs-12">
                <div class="header-data text-center-xs">
                  <div class="hdata">
                    <div class="mcol-left">
                      <i class="fas fa-envelope ln-shadow"></i></div>
                    <div class="mcol-right">
                      <p><a href="account-message-inbox.html">15</a> <em>Mail</em></p>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                  <div class="hdata">
                    <div class="mcol-left">
                      <i class="fa fa-eye ln-shadow"></i>
                    </div>
                    <div class="mcol-right">
                      <p><a href="#">7000</a> <em>visits</em></p>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                  <div class="hdata">
                    <div class="mcol-left">
                      <i class="icon-th-thumb ln-shadow"></i></div>
                    <div class="mcol-right">
                      <p><a href="#">12</a><em>Ads</em></p>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                  <div class="hdata">
                    <div class="mcol-left">
                      <i class="fa fa-user ln-shadow"></i></div>
                    <div class="mcol-right">
                      <p><a href="#">18</a> <em>Favorites </em></p>
                    </div>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="inner-box">
            <div class="welcome-msg">
              <h3 class="page-sub-header2 clearfix no-padding">Hola {{ Auth::user()->name}} </h3>
              <!-- <span class="page-sub-header-sub small">You last logged in at: 01-01-2014 12:40 AM [UK time (GMT + 6:00hrs)]</span> -->
            </div>
            <div id="accordion" class="panel-group">
              <div class="card card-default">
                <div class="card-header">
                  <h4 class="card-title"><a href="#collapseB1" aria-expanded="true"  data-toggle="collapse" > Mis datos </a></h4>
                </div>
                <div class="panel-collapse collapse show" id="collapseB1">
                  <div class="card-body">
                    <form class="form-horizontal" role="form">
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Nombre</label>
                        <div class="col-sm-9">
                          <input type="text" class="form-control" placeholder="{{ Auth::user()->name}}">
                        </div>
                      </div>
                      <!-- <div class="form-group">
                        <label class="col-sm-3 control-label">Last name</label>
                        <div class="col-sm-9">
                          <input type="text" class="form-control" placeholder="Doe">
                        </div>
                      </div> -->
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Email</label>
                        <div class="col-sm-9">
                          <input type="email" class="form-control" placeholder="{{ Auth::user()->email}}">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Direccíon</label>
                        <div class="col-sm-9">
                          <input type="text" class="form-control" placeholder="{{ Auth::user()->address}}">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="Phone" class="col-sm-3 control-label">Telefono</label>
                        <div class="col-sm-9">
                          <input type="text" class="form-control" id="Phone" placeholder="{{ Auth::user()->phone}}">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Codígo Postal</label>
                        <div class="col-sm-9">
                          <input type="text" class="form-control" placeholder="{{ Auth::user()->zipcode}}">
                        </div>
                      </div>
                      <div class="form-group hide"> 
                        <label class="col-sm-3 control-label">Facebook account map</label>
                        <div class="col-sm-9">
                          <div class="form-control">
                            <a class="link" href="fb.com">Jhone.doe</a> 
                            <a class=""> <i class="fa fa-minus-circle"></i></a>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9"></div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                          <button type="submit" class="btn btn-warning btn-block">Actualizar</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="card card-default">
                <div class="card-header">
                  <h4 class="card-title">
                    <a href="#collapseB2" aria-expanded="true"  data-toggle="collapse" > Configuracíon </a>
                  </h4>
                </div>
                <div class="panel-collapse collapse" id="collapseB2">
                  <div class="card-body">
                    <form class="form-horizontal" role="form">
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Nueva Contraseña</label>
                        <div class="col-sm-9">
                          <input type="password" class="form-control" placeholder="">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="col-sm-3 control-label">Confirmar Contraseña</label>
                        <div class="col-sm-9">
                          <input type="password" class="form-control" placeholder="">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                          <button type="submit" class="btn btn-warning btn-block">Actualizar</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
@include('frontend.includes.footer')