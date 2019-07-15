<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MercadoPago;
use App\Http\Requests;
//use App\Http\Controllers;
//use App\Http\Controllers\MercadoPago\SDK;
use Illuminate\Support\Facades\DB;

class MercadoPagoController extends Controller
{
  public function createPayment(Request $request)
  {
    if (isset($_REQUEST["token"])) {
      $token             = $_REQUEST["token"];
      $payment_method_id = $_REQUEST["payment_method_id"];
      $installments      = $_REQUEST["installments"];
      $issuer_id         = $_REQUEST["issuer_id"];
      
      $data        = $request->all();
      $total       = $data["total"];
      $description = $data["description"];
      $email       = $data["email"];
      
      MercadoPago\SDK::setAccessToken("TEST-5787402091695585-050701-3def8605446a79239550b680cc8152bb-433544152");

      $payment = new MercadoPago\Payment();
      $payment->transaction_amount = $total;
      $payment->token = $token;
      $payment->description = $description;
      $payment->installments = $installments;
      $payment->payment_method_id = $payment_method_id;
      $payment->issuer_id = $issuer_id;
      $payment->payer = $email;
      //array("email" => "noemi.rohan@yahoo.com");
      // Guarda y postea el pago
      $payment->save();

      if ($payment->status == "approved") {
        dd($email, $description, $transaction_amount); die;
        //DB::tables('orders')->insert([
        //]);
      }else{
        dd("No aprobado <br>", $payment->payer, $payment->description, $payment->transaction_amount); die;
      }
      return view('frontend.checkout')->with(['payment' => $payment]);
    }
  }

  public function getManmanw(Request $request)
  {
    return view('frontend.checkout');
  } 
  
  public function getCheckout(Request $request)
  {
    $data       = $request->all(); //request all from form 
    $session_id = Session::getId();
    $user_id    = Session::getUserId();


    $user = DB::table('users')->where('user_id', $user_id)->first();
    $user_email = $user->email;

    $ticket     = rand(11) ; 
    DB::table('orders_request')->insert([
      'ticket'         => $ticket,
      'user_id'        => $user_id,
      'user_email'     => $user_email,
      'empresa_id'     => 4,//$data['empresa_id'],
      'subtotal'       => 240,//$data['subtotal'],
      'shipping'       => 100,//$data['shipping'],
      'total'          => 250,//$data['total'],
      'payment_status' => $data['payment_status'],
      'aproved'        => $data['aproved']

    ]);
    
    $orderReady = DB::table('orders_request')->where('user_id', $user_id)->where('empresa_id', $data['empresa_id'])->where('ticket', $ticket)->first();

    Session::flash('message' , 'listo para finalizar la compra!');
    //echo "<pre>"; print_r($slug); die;
    return  view('frontend.checkout')->with(['orderReady' => $orderReady]);
  }
}
