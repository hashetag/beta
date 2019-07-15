<?php

namespace App\Http\Controllers;

use App\Empresa;
use App\Category;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Alert;

class MainController extends Product
{
    
  public function profile(Request $request)
  {
    //$slug = $request->sl.'/'.$request->slug.'/profile';
    $slug_1 = $request->sl.'/'.$request->slug.'/cart';
    $slug = $request->sl.'/'.$request->slug;

    if (isset($slug_1)) {
      $slug_emp = $request->sl.'/'.$request->slug;
    }elseif(isset($slug)){
      $slug_emp = $slug;
    }
    //$slug_emp = $request->sl.'/'.$request->slug;
    $empresa = optional(Empresa::where('slug', $slug_emp)->where('status', 1)->first());
    $groupe = optional(DB::table('groupes')->where('id', $empresa->groupe_id)->first());
    $type   = optional(DB::table('types')->where('id', $empresa->type_id)->first());
    $city   = optional(DB::table('cities')->where('id', $empresa->city_id)->first());
    $empSlug = $empresa->slug ;

    return  view('frontend.search_product')->with(['empresa' => $empresa, 'groupe' => $groupe, 'type' => $type,'city' => $city, 'empSlug' => $empSlug]);
  }
    
  public function index(Request $request)
  {
    $slug = $request->sl.'/'.$request->slug;

    $empresa = optional(Empresa::where('slug', $slug)->where('status', 1)->first());
    $groupe  = optional(DB::table('groupes')->where('id', $empresa->groupe_id)->first());
    $type    = optional(DB::table('types')->where('id', $empresa->type_id)->first());
    $city    = optional(DB::table('cities')->where('id', $empresa->city_id)->first());
    $empSlug = $empresa->slug ;

    $categories = DB::table('categories')
    ->join('empresas','categories.empresa_id','=','empresas.id')
    ->select('empresas.id', 'empresas.slug as sle', 'categories.id', 'categories.name', 'categories.description', 'categories.slug')
    ->where('empresas.slug', $slug)->where('categories.status', 1)->get();

    $empSlug = $slug;

      $products = DB::table('products')
      ->join('empresas','products.empresa_id','=','empresas.id')
      ->select('empresas.id', 'empresas.slug as sle', 'products.id', 'products.name', 'products.description', 'products.code', 'products.picture', 'products.slug', 'products.price', 'products.discount', 'products.stock')
      ->where('empresas.slug', $slug)->where('products.status', 1)->paginate(20);

    return  view('frontend.product')->with(['empresa' => $empresa, 'groupe' => $groupe, 'type' => $type,'city' => $city, 'categories' => $categories, 'products' => $products, 'empSlug' => $empSlug]);
  }


  /**
   * Show the application dashboard.
   * @param string $gSlug
   * @return \Illuminate\Http\Request
   */
  public function select(Request $request)
  {
    //$cat_id = 0;
    //$emp_id = 0;
    
    $slug_cat = $request->sl.'/'.$request->slg.'/'.$request->slug;
    $slug_emp = $request->sl.'/'.$request->slg;
    
    $emp = Empresa::where('slug', $slug_emp)->where('status', 1)->first();
    $emp_id = $emp->id ;
    $empSlug = $emp->slug ;

    $categories = DB::table('categories')->where('empresa_id', $emp_id)->where('status', 1)->get();

    $cat = optional(Category::where('slug', $slug_cat)->where('status', 1)->first());
    $cat_id = $cat->id;

    $products =DB::table('products')->where('category_id', $cat_id)->where('status', 1)->paginate(20);

 
    return view('frontend.product')->with(['categories' => $categories, 'products' => $products, 'empSlug' => $empSlug]);
  }

  public function show(Request $request)
  {
    
    $slug_prod = $request->sl.'/'.$request->slg.'/'.$request->slug.'/'.$request->slugProd;
    $slug_cat = $request->sl.'/'.$request->slg.'/'.$request->slug;
    $slug_emp = $request->sl.'/'.$request->slg;
    
    $empresa = optional(Empresa::where('slug', $slug_emp)->where('status', 1)->first());
    //$empresa = DB::table('empresas')->where('slug', $slug_emp)->where('status', 1)->first();
    $emp_id = $empresa->id ;

    $groupe = optional(DB::table('groupes')->where('id', $empresa->groupe_id)->first());
    $type   = optional(DB::table('types')->where('id', $empresa->type_id)->first());
    $city   = optional(DB::table('cities')->where('id', $empresa->city_id)->first());

    $category = optional(DB::table('categories')->where('slug', $slug_cat)->where('status', 1)->first());
    
    $product = optional(Product::where('slug', $slug_prod)->where('empresa_id', $emp_id)->where('status', 1)->first());
    //$product = DB::table('products')->where('slug', $slug_prod)->where('empresa_id', $emp_id)->where('status', 1)->first();
    

    $colors = optional(DB::table('product_colors')->where('p_id', $product->id)->get());
    $detail = optional(DB::table('product_details')->where('p_id', $product->id)->first());
    $images = DB::table('product_images')->where('p_id', $product->id)->get();
    $sizes = optional(DB::table('product_sizes')->where('p_id', $product->id)->get());

    return view('frontend.product_details')->with(['empresa' => $empresa, 'groupe' => $groupe, 'type' => $type, 'city' => $city, 'category' => $category, 'product' => $product, 'colors' => $colors, 'detail' => $detail,  'images' => $images, 'sizes' => $sizes, 'slug_emp' => $slug_emp]);
  }
}
