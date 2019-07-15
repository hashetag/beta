<?php

/*Admin Login*/
Route::prefix('admin')->group(function() {
	Route::get('/login', 'Auth\AdminLoginController@showLoginForm')->name('admin.login');
	Route::post('/login', 'Auth\AdminLoginController@login')->name('admin.login.submit');
	/*Admin Dashbord*/
	Route::get('/', 'AdminController@index')->name('admin.dashboard');
	Route::get('/logout', 'Auth\AdminLoginController@logout')->name('admin.logout');


	Route::get('/user', 'UserController@index');
	Route::get('/user/select', 'UserController@select');
	Route::post('/user/registrar', 'UserController@store');
	Route::put('/user/actualizar/{id}', 'UserController@update');
	Route::put('/user/activar/{id}', 'UserController@activate');
	Route::put('/user/desactivar/{id}', 'UserController@desactivate');
	Route::delete('/user/eliminar/{id}', 'UserController@destroy');

	Route::get('/groupe', 'GroupeController@index');
	Route::get('/groupe/select', 'GroupeController@select');
	Route::post('/groupe/registrar', 'GroupeController@store');
	Route::put('/groupe/actualizar/{id}', 'GroupeController@update');
	Route::put('/groupe/activar/{id}', 'GroupeController@activate');
	Route::put('/groupe/desactivar/{id}', 'GroupeController@desactivate');
	Route::delete('/groupe/eliminar/{id}', 'GroupeController@destroy');

	Route::get('type', 'TypeController@index');
	Route::get('/type/select', 'TypeController@select');
	Route::post('/type/registrar', 'TypeController@store');
	Route::put('/type/actualizar/{id}', 'TypeController@update');
	Route::put('/type/activar/{id}', 'TypeController@activate');
	Route::put('/type/desactivar/{id}', 'TypeController@desactivate');
	Route::delete('/type/eliminar/{id}', 'TypeController@destroy');

	Route::get('city', 'CityController@index');
	Route::get('/city/select', 'CityController@select');
	Route::post('/city/registrar', 'CityController@store');
	Route::put('/city/actualizar/{id}', 'CityController@update');
	Route::put('/city/activar/{id}', 'CityController@activate');
	Route::put('/city/desactivar/{id}', 'CityController@desactivate');
	Route::delete('/city/eliminar/{id}', 'CityController@destroy');

	Route::get('empresa', 'EmpresaController@index');
	Route::get('/empresa/select', 'EmpresaController@select');
	Route::get('/empresa/mostrar/{id}', 'EmpresaController@show');
	Route::post('/empresa/registrar', 'EmpresaController@store');
	Route::put('/empresa/actualizar/{id}', 'EmpresaController@update');
	Route::put('/empresa/activar/{id}', 'EmpresaController@activate');
	Route::put('/empresa/desactivar/{id}', 'EmpresaController@desactivate');
	Route::delete('/empresa/eliminar/{id}', 'EmpresaController@destroy');

	Route::get('/category/{empresa_id}', 'CategoryController@index');
	Route::get('/category/select/{empresa_id}', 'CategoryController@select');
	Route::post('/category/registrar/{empresa_id}', 'CategoryController@store');
	Route::put('/category/actualizar/{id}', 'CategoryController@update');
	Route::put('/category/activar/{id}', 'CategoryController@activate');
	Route::put('/category/desactivar/{id}', 'CategoryController@desactivate');
	Route::delete('/category/eliminar/{id}', 'CategoryController@destroy');

	Route::get('/product/{empresa_id}', 'ProductController@index');
	Route::get('/product/show/{empresa_id}/{p_id}', 'ProductController@show');
	Route::get('/product/detail/{p_id}', 'ProductController@detail');
	Route::get('/product/images/{p_id}', 'ProductController@imagesProduct');
	Route::get('/product/sizes/{p_id}', 'ProductController@sizesProduct');
	Route::get('/product/colores/{p_id}', 'ProductController@coloresProduct');
	Route::get('/product/select/{empresa_id}', 'ProductController@select');
	Route::post('/product/registrar/{emp_id}', 'ProductController@store');
	Route::put('/product/actualizar/{id}', 'ProductController@update');
	Route::put('/product/activar/{id}', 'ProductController@activate');
	Route::put('/product/desactivar/{id}', 'ProductController@desactivate');
	Route::delete('/product/eliminar/{id}', 'ProductController@destroy');
});

Route::get('redirect', function(){
	//alert()->info('Iniciar Session', 'Iniciar Session para comprar');
	return redirect('/login');
});


Route::get('/login/facebook', 'Auth\LoginController@redirectToFacebook')->name('fblogin');
Route::get('/login/facebook/callback', 'Auth\LoginController@handleFacebookCallback')->name('fbcallback');

Auth::routes();
Route::get('/','IndexController@index');
Route::post('/', 'IndexController@searchEmpresa');
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/fabrica','IndexController@selectFabrica');
Route::get('/mayorista','IndexController@selectMayorista');
Route::get('/minorista','IndexController@selectMinorista');
Route::get('search','IndexController@selectMinorista');
Route::get('/{sl}/{slug}','MainController@index')->name('product_slug');
//Route::get('/{sl}/{slug}/profile','MainController@profile')->name('profileEmpresa');
Route::get('/{sl}','IndexController@select')->name('groupe_slug');


//this part is for the cart
Route::get('/{sl}/{slug}/cart', 'CartController@index')->name('cart.index');
Route::post('/{sl}/{slug}/cart', 'CartController@addToCart');
Route::get('/{sl}/{slug}/cart/checkout', 'CartController@checkout');
Route::get('/{sl}/{slug}/cart/checkout/end', 'UserController@userInfo');
Route::post('/{sl}/{slug}/cart/payment', 'MercadoPagoController@createPayment');
Route::post('/{sl}/{slug}/cart/update', 'CartController@updateItem');
Route::post('/{sl}/{slug}/cart/delete', 'CartController@deleteItem');

Route::get('/{sl}/{slg}','MainController@index');
Route::get('/{sl}/{slg}/{slug}','MainController@select')->name('category_slug');
Route::get('/{sl}/{slg}/{slug}/{slugProd}','MainController@show')->name('product_slug');


Route::get('/logout', 'Auth\LoginController@userLogout')->name('user.logout');

















// if there is no post, 404
//if (!$post) return abort(404);

//Route::post('/{sl}/{slug}/cart', 'CartController@store')->name('cart.store');
//Route::match(['get', 'post'], '/{sl}/{slug}/cart', 'CartController@addToCart');
//Route::match(['post', 'get'], '/{sl}/{slug}/cart', 'CartController@addToCart');
//Route::match(['post', 'get'],'/{sl}/{slug}/cart/update', 'CartController@updateItem');
//Route::match(['post', 'get'],'/{sl}/{slug}/cart/delete', 'CartController@deleteItem');
