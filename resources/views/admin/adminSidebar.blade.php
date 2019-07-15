<div class="sidebar">
  <nav class="sidebar-nav">
    <ul class="nav">
      <li @click="menu=0" class="nav-item">
        <a class="nav-link active" href="#"><i class="icon-speedometer"></i> Dashboard</a>
      </li>
      <li class="nav-title">
        Mantenimiento
      </li>
      <li @click="menu=0" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-bag"></i> Ventas</a>
      </li>
      <li @click="menu=1" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-bag"></i> Chat de Soporte</a>
      </li>
     <!--  <li @click="menu=15" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-bag"></i> Super Categoria</a>
      </li> -->
      <li @click="menu=2" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-bag"></i> Categoria Empresa</a>
      </li>
      <li @click="menu=3" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-wallet"></i> Tipo Empresa</a>
      </li>
      <li @click="menu=4" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-notebook"></i> Empresa</a>
      </li>
      <li @click="menu=5" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-basket-loaded"></i> Usuario</a>
      </li>
      <li @click="menu=6" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-notebook"></i> Ciudad</a>
      </li>
      <li @click="menu=8" class="nav-item">
          <a class="nav-link" href="#"><i class="icon-user-following"></i> Reporte Ingreso</a>
      </li>
      <li @click="menu=9" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-chart"></i> Commentario</a>
      </li>
      <li @click="menu=10" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-chart"></i> Testimonio</a>
      </li>
      <li @click="menu=11" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-book-open"></i> Terminos y Cond <span class="badge badge-danger">PDF</span></a>
      </li>
      <li @click="menu=12" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-info"></i> Seguridad <span class="badge badge-info">IT</span></a>
      </li>
      <li @click="menu=13" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-info"></i> Nosotros<span class="badge badge-info">IT</span></a>
      </li>
    </ul>
  </nav>
  <button class="sidebar-minimizer brand-minimizer" type="button"></button>
</div>

@if(Auth::check())

  @if(Auth::guard('empresa')->user()->isAdmin == 1)

    <template v-if="menu==0">
      <!-- <ventas></ventas> -->
      <user></user>
    </template>
    <template v-if="menu==1">
      <chat></chat>
    </template>
    <template v-if="menu==15">
      <higroupe></higroupe>
    </template> 
    <template v-if="menu==2">
      <groupe></groupe>
    </template> 
    <template v-if="menu==3">
      <type></type>
    </template>
    <template v-if="menu==4">
      <empresa></empresa>
    </template>
    <template v-if="menu==5">
      <user></user>
    </template>  
    <template v-if="menu==6">
      <city></city>
    </template>
    <template v-if="menu==8">
      <reporte></reporte>
    </template> 
    <template v-if="menu==9">
      <commentario></commentario>
    </template>
    <template v-if="menu==10">
      <testimonios></testimonios>
    </template>
    <template v-if="menu==11">
      <terminos></terminos>
    </template>
    <template v-if="menu==12">
      <seguridad></seguridad>
    </template>
    <template v-if="menu==13">
      <nosotros></nosotros>
    </template>

  @else

  @endif

@endif