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
