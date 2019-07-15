@include('frontend.includes.header')
  <div class="main-container">
    <div class="container">
    	<div class="row">
    		@show
  			@yield('content')
        <!-- </div> -->
			</div>
    </div>
  </div>
@include('frontend.includes.footer')
  

