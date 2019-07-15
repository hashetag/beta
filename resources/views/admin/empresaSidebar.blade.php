<div class="sidebar">
  <nav class="sidebar-nav">
    <ul class="nav">
      <li @click="menu=0" class="nav-item">
        <a class="nav-link active" href="#"><i class="icon-speedometer"></i> Escritorio</a>
      </li>
      <li class="nav-title">
        Mantenimiento
      </li>
      <li @click="menu=20" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-bag"></i> Datos Personal</a>
      </li>
      <li @click="menu=21" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-bag"></i> Ventas</a>
      </li>
      <li @click="menu=22" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-bag"></i> Categorias</a>
      </li>
      <li @click="menu=23" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-wallet"></i> Productos</a>
      </li>
      <li @click="menu=24" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-bag"></i> Chat de Soporte</a>
      </li>
      <li @click="menu=25" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-basket-loaded"></i> Estadisticas</a>
      </li>
      <li @click="menu=26" class="nav-item">
        <a class="nav-link" href="#"><i class="icon-info"></i> Nosotros<span class="badge badge-info">IT</span></a>
      </li>
    </ul>
  </nav>
  <button class="sidebar-minimizer brand-minimizer" type="button"></button>
</div>

@if(Auth::check())

  @if(Auth::guard('empresa')->user()->isAdmin == 0)

    <template v-if="menu==20">
      <informacion></informacion>
    </template>
    <template v-if="menu==21">
      <ventas></ventas>
    </template>
    <template v-if="menu==22">
      <category></category>
    </template> 
    <template v-if="menu==23">
      <product></product>
    </template>
    <template v-if="menu==0">
      <product></product>
    </template>
    <template v-if="menu==24">
      <soporte></soporte>
    </template>
    <template v-if="menu==25">
      <statistic></statistic>
    </template>  
    <template v-if="menu==26">
      <nosotros></nosotros>
    </template>

  @else

  @endif
  
@endif