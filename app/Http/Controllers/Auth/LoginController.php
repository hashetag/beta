<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Socialite;
use App\SocialUser;
use App\User;
//use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout', 'userLogout');
        //$this->middleware('guest', ['except' =>['logout', 'userLogout']]);
    }

    //public function logout(Request $request)
    public function userLogout()
    {
      Auth::guard('web')->logout();
      return redirect('/');
    }

    public function redirectToFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function handleFacebookCallback()
    {
        //$user = Socialite::driver('facebook')->user();
        $provider = Socialite::driver('facebook')->user();

        $account  = User::where('provider', 'facebook')->where('provider_uid', $provider->getId())->first();
        
        if ($account) {

            $user = $account->user;

        }else{

            $user = new User;
            
            $user->name = $provider->name;
            $user->email = $provider->email;
            $user->avatar = $provider->avatar;
            $user->name = $provider->name;
            $user->name = $provider->name;
            $user->save();
        }
       /* if ($account) {
            $user = $account->user;
        }else{
            $akun = new SocialUser([
                'provider_uid' => $provider->getId(),
                'provider' => 'facebook',
            ]);

            $orang = User::where('email', $provider->getEmail())->first();
            if (!$orang) {
                $orang = User::create([
                    'name' => $provider->getName(),
                    'email' => $provider->getEmail(),
                    'avatar' => $provider->getAvatar(),
                    'password' => '',
                    'verified' => '1',
                ]);
            }
            $akun->user()->associate($orang);
            $akun->save();
            $user = $orang;
        }*/
        Auth()->login($user);
        return redirect()->to('/home');
        /*$user->token;
        $user->name;*/
    }
}
