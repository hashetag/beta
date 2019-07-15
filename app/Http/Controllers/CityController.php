<?php

namespace App\Http\Controllers;

use App\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
  public function index(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $buscar = $request->buscar;
    $criterio = $request->criterio;
    
    if ($buscar==''){
      $cities = City::orderBy('id', 'asc')->paginate(10);
    }
    else{
      $cities = City::where($criterio, 'like', '%'. $buscar . '%')->orderBy('id', 'asc')->paginate(10);
    }

    return [
      'pagination' => [
        'total'        => $cities->total(),
        'current_page' => $cities->currentPage(),
        'per_page'     => $cities->perPage(),
        'last_page'    => $cities->lastPage(),
        'from'         => $cities->firstItem(),
        'to'           => $cities->lastItem(),
      ],
      'cities' => $cities
    ];
  }

  public function select(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $cities = City::all()->where('status','=',1);
    return ['cities' => $cities];
  } 

  public function store(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $city = new City();
    $city->city = $request->city;
    $city->state = $request->state;
    $city->zipcode = $request->zipcode;
    $city->latitud = $request->latitud;
    $city->longitud = $request->longitud;
    $city->country = 'Argentina';
    $city->status = '1';
    $city->save();
  }

  public function update(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $city = City::findOrFail($request->id);
    $city->city = $request->city;
    $city->state = $request->state;
    $city->zipcode = $request->zipcode;
    $city->latitud = $request->latitud;
    $city->longitud = $request->longitud;
    $city->country = 'Argentina';
    $city->status = '1';
    $city->save();
  }

  public function desactivate(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $city = City::findOrFail($request->id);
    $city->status = '0';
    $city->save();
  }

  public function activate(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $city = City::findOrFail($request->id);
    $city->status = '1';
    $city->save();
  }

  public function destroy($id)
	{
    $b = City::findOrFail($id);
    $b->delete();
    return response()->json(['data' => $b], 200);
	}
}
