  <footer class="main-footer">
    <div class="footer-content">
      <div class="container">
        <div class="row">
          <div class=" col-xl-2 col-xl-2 col-md-2 col-6  ">
            <div class="footer-col">
              <h4 class="footer-title">About us</h4>
              <ul class="list-unstyled footer-nav">
                <li><a href="#">About Company</a></li>
                <li><a href="#">For Business</a></li>
                <li><a href="#">Our Partners</a></li>
                <li><a href="#">Press Contact</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
          </div>
          <div class=" col-xl-2 col-xl-2 col-md-2 col-6  ">
            <div class="footer-col">
              <h4 class="footer-title">Help & Contact</h4>
              <ul class="list-unstyled footer-nav">
                <li><a href="#"> Stay Safe Online </a></li>
                <li><a href="#"> How to Sell</a></li>
                <li><a href="#"> How to Buy </a></li>
                <li><a href="#">Posting Rules </a></li>
                <li><a href="#"> Promote Your Ad </a></li>
              </ul>
            </div>
          </div>
          <div class=" col-xl-2 col-xl-2 col-md-2 col-6  ">
            <div class="footer-col">
              <h4 class="footer-title">More From Us</h4>
              <ul class="list-unstyled footer-nav">
                <li><a href="#">FAQ </a></li>
                <li><a href="#">Blog </a></li>
                <li><a href="#"> Popular Searches </a></li>
                <li><a href="#"> Reseñas Usuarios</a></li>
              </ul>
            </div>
          </div>
          <div class=" col-xl-2 col-xl-2 col-md-2 col-6  ">
            <div class="footer-col">
              <h4 class="footer-title">Account</h4>
              <ul class="list-unstyled footer-nav">
                <li><a href="{{route('home')}}"> Manage Account </a></li>
                <li><a href="{{route('login')}}">Login </a></li>
                <li><a href="{{route('login')}}">Register </a></li>
                <li><a href="{{route('home')}}"> Profile </a></li>
              </ul>
            </div>
          </div>
          <div class=" col-xl-4 col-xl-4 col-md-4 col-12">
            <div class="footer-col row">
              <div class="col-sm-12 col-xs-6 col-xxs-12 no-padding-lg">
                <div class="mobile-app-content">
                  <h4 class="footer-title">Mobile Apps</h4>
                  <div class="row ">
                    <div class="col-6  ">
                      <a class="app-icon" target="_blank"  href="https://itunes.apple.com/">
                        <span class="hide-visually">iOS app</span>
                        <img src="{{'classified/img/site/app_store_badge.svg'}}" alt="Available on the App Store">
                      </a>
                    </div>
                    <div class="col-6  ">
                      <a class="app-icon"  target="_blank" href="https://play.google.com/store/">
                        <span class="hide-visually">Android App</span>
                        <img src="{{'classified/img/site/google-play-badge.svg'}}" alt="Available on the App Store">
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-xs-6 col-xxs-12 no-padding-lg">
                <div class="hero-subscribe">
                  <h4 class="footer-title no-margin">Follow us on</h4>
                  <ul class="list-unstyled list-inline footer-nav social-list-footer social-list-color footer-nav-inline">
                    <li><a class="icon-color fb" title="Facebook" data-placement="top" data-toggle="tooltip" href="#"><i class="fab fa-facebook-f"></i> </a></li>
                    <li><a class="icon-color tw" title="Twitter" data-placement="top" data-toggle="tooltip" href="#"><i class="fab fa-twitter"></i> </a></li>
                    <li><a class="icon-color gp" title="Google+" data-placement="top" data-toggle="tooltip" href="#"><i class="fab fa-google-plus-g"></i> </a></li>
                    <li><a class="icon-color lin" title="Linkedin" data-placement="top" data-toggle="tooltip" href="#"><i class="fab fa-linkedin"></i> </a></li>
                    <li><a class="icon-color pin" title="Linkedin" data-placement="top" data-toggle="tooltip" href="#"><i class="fab fa-pinterest-p"></i> </a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div style="clear: both"></div>
            <div class="col-xl-12">
              <div class=" text-center paymanet-method-logo">
                <img src="classified/img/site/payment/master_card.png" alt="img">
                <img alt="img" src="classified/img/site/payment/visa_card.png">
                <img alt="img" src="classified/img/site/payment/paypal.png">
                <img alt="img" src="classified/img/site/payment/american_express_card.png"> <img alt="img" src="classified/img/site/payment/discover_network_card.png">
                <img alt="img" src="classified/img/site/payment/google_wallet.png">
              </div>
              <div class="copy-info text-center"> &copy; 2016-2019 WeOnMart. Todos Los Derechos Reservados. </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</div> <!-- end Vuejs -->
<!-- /.wrapper -->

<!-- Le javascript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="classified/js/jquery/jquery-3.3.1.min.js">\x3C/script>')</script>
<script src="{{ 'js/classified.js' }}"></script>
<!-- <script src="{{ 'classified/js/vendors.min.js'}}"></script> -->
<script src="{{ 'classified/js/main.min.js' }}"></script>
<!-- <script src="{{ 'js/app.js' }}"></script> -->
<script src="{{ 'js/sweetalert2.all.js' }}"></script>
@include('sweet::alert')
<script>
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtnt").style.display = "block";
    } else {
        document.getElementById("myBtnt").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
</script> 
<script>
  $('.bxslider').bxSlider({
    pagerCustom: '#bx-pager',
    adaptiveHeight: true
  });
</script>
</body>
</html>
