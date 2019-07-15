<?php

namespace App\Http\Controllers;

use App\Cart;
use App\Empresa;
use App\Category;
use App\Product;
use Illuminate\Http\Request;
use Alert;
//use Auth;
//use Session;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
  public function checkout(Request $request)
  {
    $slug  = $request->sl.'/'.$request->slug.'/cart/checkout';
    $empslug  = $request->sl.'/'.$request->slug.'/cart/checkout';
    return view('frontend.checkout')->with(['empslug' => $empslug]) ;
  }
  public function index(Request $request)
  { 
    //dd(Session::getId()); die; 
    //echo "<pre>"; print_r($data); die;
    $session_id = Session::getId();

    $total = 0;
    $slug  = $request->sl.'/'.$request->slug;
    $emprs = DB::table('empresas')->where('slug', $slug)->first();
    $empID = $emprs->id;
    $empSl = $emprs->slug;

    $empresa = optional(Empresa::where('slug', $empSl)->where('status', 1)->first());
    $groupe = optional(DB::table('groupes')->where('id', $empresa->groupe_id)->first());
    $type   = optional(DB::table('types')->where('id', $empresa->type_id)->first());
    $city   = optional(DB::table('cities')->where('id', $empresa->city_id)->first());
    //echo "<pre>"; print_r($slug); die;
    $cart  = DB::table('carts')->where('empresa_id', $empID)->where('session_id', $session_id)->get();
    
    foreach ($cart as $cart_item){
      $total += $cart_item->price * $cart_item->qty; 
    }

    $slugCart = $slug.'/cart';
    //Session::flash();
    return  view('frontend.cart')->with(['cart' => $cart, 'total' => $total, 'empSl' => $empSl, 'slugCart' => $slugCart, 'empresa' => $empresa, 'groupe' => $groupe, 'type' => $type,'city' => $city]);
  }

  public function addToCart(Request $request)
  {
    $session_id = Session::getId();
    //dd($session_id);
    $total = 0;
    $slug = $request->sl.'/'.$request->slug;
    $data = $request->all();
    //echo "<pre>"; print_r($data); die;

    
    $emprs = DB::table('empresas')->where('slug', $slug)->first();
    $empID = $emprs->id;
    $empSl = $emprs->slug;

    $emp = DB::table('products')->where('id', $data['p_id'])->first();
    $pCart = DB::table('carts')->where('p_id', $data['p_id'])->where('session_id', $session_id)->first();

    $empresa = optional(Empresa::where('slug', $empSl)->where('status', 1)->first());
    $groupe = optional(DB::table('groupes')->where('id', $empresa->groupe_id)->first());
    $type   = optional(DB::table('types')->where('id', $empresa->type_id)->first());
    $city   = optional(DB::table('cities')->where('id', $empresa->city_id)->first());

    $slugCart = $slug.'/cart';

    if ($pCart) {
      DB::table('carts')->where('p_id', $pCart->p_id)->where('session_id', $session_id)->increment('qty');
          
      //echo "<pre>"; print_r($slug); die;
      $cart = DB::table('carts')->where('empresa_id', $empID)->where('session_id', $session_id)->get();
      foreach ($cart as $cart_item){
        $total += $cart_item->price * $cart_item->qty; 
      }
      Session::flash('message', 'El item ha sido agregado en el Carrito!');
      return view('frontend.cart')->with(['cart' => $cart, 'total' => $total, 'empSl' => $empSl, 'slugCart' => $slugCart, 'empresa' => $empresa, 'groupe' => $groupe, 'type' => $type,'city' => $city]);
    }else{

      DB::table('carts')->insert([
        'p_id'       => $data['p_id'],
        'empresa_id' => $emp->empresa_id,
        'session_id' => $session_id,
        'p_name'     => $emp->name,
        'p_desc'     => $emp->description,
        'picture'    => $emp->picture,
        'p_code'     => $emp->code,
        'price'      => $data['price'],
        'color'      => 'Verde',
        'size'       => 'XL',
        'qty'        => $data['qty']
      ]); 

      $cart = DB::table('carts')->where('empresa_id', $empID)->where('session_id', $session_id)->get();

      foreach ($cart as $cart_item){
        $total += $cart_item->price * $cart_item->qty; 
      }
      Session::flash('message' , 'El item ha sido agregado en el Carrito!');
      return view('frontend.cart')->with(['cart' => $cart, 'total' => $total, 'empSl' => $empSl, 'slugCart' => $slugCart, 'empresa' => $empresa, 'groupe' => $groupe, 'type' => $type,'city' => $city]);
    }
  }

  public function updateItem(Request $request)
  {
    $session_id = Session::getId();
    $total    = 0;
    $slug     = $request->sl.'/'.$request->slug;
    $slugCart = $request->sl.'/'.$request->slug.'/cart';
    $p_id     = $request->p_id;
    $qty      = $request->qty;
    //echo "<pre>"; print_r($p_id);
    //echo "<pre>"; print_r($qty); die;
    $emprs = DB::table('empresas')->where('slug', $slug)->first();
    $empID = $emprs->id;
    $empSl = $emprs->slug;

    $empresa = optional(Empresa::where('slug', $empSl)->where('status', 1)->first());
    $groupe = optional(DB::table('groupes')->where('id', $empresa->groupe_id)->first());
    $type   = optional(DB::table('types')->where('id', $empresa->type_id)->first());
    $city   = optional(DB::table('cities')->where('id', $empresa->city_id)->first());
    
    if ($qty > 0) {
      DB::table('carts')->where('p_id', $p_id)->where('session_id', $session_id)->update(['qty' => $qty]);

      $cart = DB::table('carts')->where('empresa_id', $empID)->where('session_id', $session_id)->get();
      foreach ($cart as $cart_item){
        $total += $cart_item->price * $cart_item->qty; 
      }
      Session::flash('message' , 'El item ha sido actualizado en el Carrito!');
      return view('frontend.cart')->with(['cart' => $cart, 'total' => $total, 'empSl' => $empSl, 'slugCart' => $slugCart, 'empresa' => $empresa, 'groupe' => $groupe, 'type' => $type,'city' => $city]);
    }else{

      $cart = DB::table('carts')->where('empresa_id', $empID)->get()->where('session_id', $session_id)->get();
      foreach ($cart as $cart_item){
        $total += $cart_item->price * $cart_item->qty; 
      }
      Session::flash('error' , 'No se permite valor menor a 1 !');
      return view('frontend.cart')->with(['cart' => $cart, 'total' => $total, 'empSl' => $empSl, 'slugCart' => $slugCart, 'empresa' => $empresa, 'groupe' => $groupe, 'type' => $type,'city' => $city]);
    }

  }

  public function deleteItem(Request $request)
  {
    $session_id = Session::getId();
    $total = 0;
    $slug = $request->sl.'/'.$request->slug;
    $slugCart = $request->sl.'/'.$request->slug.'/cart';
    $p_id = $request->p_id;

    DB::table('carts')->where('p_id', $p_id)->where('session_id', $session_id)->delete();

    //$slugCart = $slug;
    $emprs = DB::table('empresas')->where('slug', $slug)->first();
    $empID = $emprs->id;
    $empSl = $emprs->slug;

    $empresa = optional(Empresa::where('slug', $empSl)->where('status', 1)->first());
    $groupe = optional(DB::table('groupes')->where('id', $empresa->groupe_id)->first());
    $type   = optional(DB::table('types')->where('id', $empresa->type_id)->first());
    $city   = optional(DB::table('cities')->where('id', $empresa->city_id)->first());

    $cart = DB::table('carts')->where('empresa_id', $empID)->where('session_id', $session_id)->get();
    foreach ($cart as $cart_item){
      $total += $cart_item->price * $cart_item->qty; 
    }
    Session::flash('message', 'El item ha sido eliminado en el Carrito!');
    return view('frontend.cart')->with(['cart' => $cart, 'total' => $total, 'empSl' => $empSl, 'slugCart' => $slugCart, 'empresa' => $empresa, 'groupe' => $groupe, 'type' => $type,'city' => $city]);
  }
}
