<!-- Comienzo de aside -->
<div class="col-md-3 page-sidebar mobile-filter-sidebar">
  <aside>
    <div class="sidebar-modern-inner">
      <div class="block-title has-arrow sidebar-header">
        <h5><a href="#">Categorías de Productos</a></h5>
      </div>
      <div class="block-content categories-list  list-filter ">
        <ul class=" list-unstyled">
          @foreach ($categories as $cat)
            <li>
              <a href="{{ url($cat->slug) }}">
                <span class="title">{{ $cat->name }}</span>
                <span class="count">
                  &nbsp;
                  <?php 
                    $prods = DB::table('products')->where('category_id', $cat->id)->count();
                    //echo $prods;
                  ?>
                  {{ $prods}}
                </span>
              </a>
            </li>
          @endforeach
	        </ul>
      </div>  
      <div style="clear:both"></div>
    </div>
  </aside>
</div>
<!-- fin de aside -->
