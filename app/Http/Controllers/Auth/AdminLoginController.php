<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
//use Auth;

class AdminLoginController extends Controller
{
  public function __construct()
  {
    $this->middleware('guest:empresa')->except('logout');
  	//$this->middleware('guest:empresa', ['except' =>['logout']]);
  }

  public function showLoginForm()
  {
  	return view('auth.admin-login');
  }

  public function login(Request $request)
  {
  	//validate the form data 
  	$this->validate($request, [
  		'email' => 'required|email',
  		'password' => 'required|min:8'
  	]);

  	//Attempt to log the user in 
  	if (Auth::guard('empresa')->attempt(['email' => $request->email, 'password' => $request->password], $request->remember)) {
  		//if successful, then redirect to ther intended location
  		return redirect()->intended(route('admin.dashboard'));
  	}

  	// if unsuccessful, then redirect back to the login with the form data
  	return redirect()->back()->withInput($request->only('email', 'remember'));
  }

    //public function logout(Request $request)
    public function logout()
    {
      Auth::guard('empresa')->logout();
      return redirect('/');
    }


}
