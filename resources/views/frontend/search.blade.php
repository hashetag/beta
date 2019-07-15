<div class="intro" style="background-image: url(classified/img/bg.jpg);">
  <div class="container text-center">
    <h1 class="intro-title animated fadeInDown">
      Elige su empresa y haz su pedido.
    </h1>
    <p class="sub animateme fittext3 animated fadeIn">
      Encontre el negocio mas cerca , haga su compra y recibe su pedido. 
    </p>
    <form action="{{'empresa'}}" method="post" class="form-horizontal">
      <div class="row search-row animated fadeInUp">
        <div class="col-xl-4 col-sm-4 search-col relative locationicon">
          <i class="icon-location-2 icon-append"></i>
          <input type="text" name="empresa" id="autocomplete-ajax" class="form-control locinput input-rel searchtag-input has-icon" placeholder="Buscar Empresa por nombre..." value="">
        </div>
        <div class="col-xl-4 col-sm-4 search-col relative">
          <select class="form-control" name="city"  ><!-- selecter -->
            <option  value="">Seleccíone Cíudad</option>
            <?php 
              $cities = DB::table('cities')->where('status', 1)->get();
            ?>
            @foreach($cities as $city)
              <option  value="{{ $city->id }}">{{ $city->city }}</option>
            @endforeach
          </select>
        </div>
        <div class="col-xl-4 col-sm-4 search-col">
          <button class="btn btn-warning btn-search btn-block  btn-gradient"><i class="icon-search"></i><strong>Buscar</strong></button>
        </div>
      </div>
    </form>
  </div>
</div>