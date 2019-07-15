<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

	public function index(Request $request)
  {
    //if (!$request->ajax()) return redirect('/');
    $search = $request->search;
    $criteria = $request->criteria;

    if ($search==''){
      $users = User::select('users.id','users.name','users.email','users.password','users.status')
      ->orderBy('users.id', 'asc')->paginate(20);
    }
    else{
      $users = $users = User::select('users.id','users.name','users.email','users.password','users.status')
      ->where('users.'.$criteria, 'like', '%'. $search . '%')
      ->orderBy('users.id', 'asc')->paginate(20);
    }

    return [
      'pagination' => [
        'total'        => $users->total(),
        'current_page' => $users->currentPage(),
        'per_page'     => $users->perPage(),
        'last_page'    => $users->lastPage(),
        'from'         => $users->firstItem(),
        'to'           => $users->lastItem(),
      ],
      'users' => $users
    ]; 
  }

	public function show($slug)
  { 
    //if (!$request->ajax()) return redirect('/');
    //$user = User::findOrFail($request->slug);
    $user = User::where('slug', $slug)->first();
    return view('profile',compact('user'));
  }

  public function userInfo($slug)
  { 
    //if (!$request->ajax()) return redirect('/');
    $user = User::findOrFail($request->email);
    
    $user->phone   = $request->phone;
    $user->address = $request->address;
    $user->zipcode = $request->zipcode;
    $user->city    = $request->city;
    $user->state   = $request->state;
    $user->save();
    //$user = User::where('slug', $slug)->first();

    //session::flash('message')->('Esta listo para efectuar el pago');
    return view('frontend.checkout')->with(['user' => $user]);
  }


	public function store(Request $request)
  {
	  if (!$request->ajax()) return redirect('/');
    
    $rules = [
      'name' =>  'required',
      'email' => 'required|email|unique:users',
      'password' => 'required|min:6',
    ];

    $this->validate($request, $rules);

    $user = new User();
   
    $user->name     = $request->name;
    $user->email    = $request->email;
    $user->password = bcrypt( $request->password);
    $user->avatar   = 'avatar.jpg';
    $user->slug     = str_slug($request->name, "-");
    //$user->verified            = User::NOT_VERIFIED_USER;
    //$user->verification_token  = User::generateTokenVerification();
    $user->status              = '1';
    $user->save();
    return response()->json(['data', $user], 201);
	}


	public function update(Request $request)
  {
    if (!$request->ajax()) return redirect('/');

    $user = User::findOrFail($request->id);
    
    if ($request->has('name')) {
      $user->name = $request->name;
    }

    if ($request->has('email') && $user->email != $request->email) {
      $rules = [
        'email' => 'email|unique:users',
      ];

      $this->validate($request, $rules);
      $user->email = $request->email;
      //$user->verified = User::NOT_VERIFIED_USER;
      //$request->verificaction_token = User::generateTokenVerification();
    }
    
    if ($request->has('password')) {
      $rules_2 = [
        'password' => 'min:6',
      ];
      $this->validate($request, $rules_2);
      $user->password = bcrypt($request->password);
    }

    $user->slug     = str_slug($request->name, "-");
    $user->status   = '1';

    if (!$user->isDirty()) {
      return response()->json(['error' => 'Se debe especificar al menos un valor diferente para actualizar', 'code' => 422], 422);
    }
    $user->save();

    return response()->json(['data' => $user], 200);
  }

  public function desactivate(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $user = User::findOrFail($request->id);
    $user->status = '0';
    $user->save();
  }

  public function activate(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $user = User::findOrFail($request->id);
    $user->status = '1';
    $user->save();
  }

  public function destroy(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    DB::table('users')->where('id', '=', $request->id)->delete();
    return response()->json(['data' => $user], 200);
  }
}
