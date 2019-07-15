<?php

namespace App\Http\Controllers;

use App\Groupe;
use App\City;
use App\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Alert;

class IndexController extends Empresa
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    $groupes = Groupe::all()->where('status', 1);

    $empresas = DB::table('empresas')
    ->join('groupes','empresas.groupe_id','=','groupes.id')
    ->join('cities','empresas.city_id','=','cities.id')
    ->join('types','empresas.type_id','=','types.id')
    ->select('groupes.id', 'groupes.slug as sl', 'cities.city as city', 'cities.state as state', 'types.name as type', 'empresas.id', 'empresas.name', 'empresas.avatar', 'empresas.phone', 'empresas.slug', 'empresas.address', 'empresas.openhours')
    ->where('empresas.isAdmin', 0)->where('empresas.status', 1)->paginate(12);

    return view('frontend.index')->with(['groupes' => $groupes, 'empresas' => $empresas]);
  }
  
   /**
   * Display the specified resource.
   *
   * @param  string $slug
   * @return \Illuminate\Http\Response
   */
  public function select($slug)
  {
    //if (!$request->ajax()) return redirect('/');
    
    $g_id = 0;
    $grp = optional(Groupe::where('slug', $slug)->where('status', 1)->first());
    $g_id = $grp->id;
    //var_dump($grp);

    $groupes = Groupe::all()->where('status', 1);
    $empresas = DB::table('empresas')
    ->join('groupes','empresas.groupe_id','=','groupes.id')
    ->join('cities','empresas.city_id','=','cities.id')
    ->join('types','empresas.type_id','=','types.id')
    ->select('groupes.id', 'groupes.slug as sl', 'cities.city as city', 'cities.state as state', 'types.name as type', 'empresas.id', 'empresas.name', 'empresas.avatar', 'empresas.phone', 'empresas.slug', 'empresas.address', 'empresas.openhours')->where('groupe_id', $g_id)
    ->where('empresas.isAdmin', 0)->where('empresas.status', 1)->paginate(12);
    //$empresas = Empresa::all()->where('groupe_id', $g_id)->where('isAdmin', 0)->where('status', 1);
    return view('frontend.index',compact('groupes', 'empresas'));
  }


  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $empresas = Empresa::get()->where('isAdmin', 0)->where('groupe_id', $id)->where('status', 1);
    return view('frontend.index',compact('empresas'));
  }

  
  public function selectEmp($slug)
  {
    //$gSlug = $slug;
    $groupe = Groupe::select('id')->where('slug', $slug);
    $emps = Empresa::join('groupes','groupes.id','=','empresas.groupe_id')
    ->select('empresas.id', 'empresas.name', 'empresas.avatar', 'empresas.phone', 'empresas.address', 'empresas.openhours', 'empresas.slug', 'empresas.groupe_id')
    ->where('empresas.groupe_id', $groupe['id'])->where('empresas.isAdmin', 0)->where('status', 1)->orderBy('empresas.name', 'asc');
    return view('frontend.index',compact('emps'));
  }
  
  public function searchEmpresa(Request $request)
  {
    //if (!$request->ajax()) return redirect('/');
    $search = $request->get('q');

  /*  $results = Empresa::where('like', '%'. $search . '%')->where('status', 1)->first()
      ->orderBy('id', 'asc')->paginate(20);*/
   /* $groupes = Groupe::all()->where('status', 1);
    $empresas = DB::table('empresas')
    ->join('groupes','empresas.groupe_id','=','groupes.id')
    ->join('cities','empresas.city_id','=','cities.id')
    ->join('types','empresas.type_id','=','types.id')
    ->select('groupes.id', 'groupes.slug as sl', 'cities.city as city', 'cities.state as state', 'types.name as type', 'empresas.id', 'empresas.name', 'empresas.avatar', 'empresas.phone', 'empresas.slug', 'empresas.address', 'empresas.openhours')->where('groupe_id', $g_id)
    ->where('empresas.isAdmin', 0)->where('empresas.status', 1)->paginate(12);  

    return view('frontend.index')->with('results' => $results);*/
  } 

  public function selectFabrica()
  {
    $groupes = Groupe::where('status', 1)->get();

    $fabricas = DB::table('empresas')->where('type_id', 1)->where('isAdmin', 0)->where('status', 1)->paginate(20);

    foreach ($fabricas as $fab) {
      $id = $fab->id;
      $city = DB::table('cities')->where('id', $id)->where('status', 1)->first();      
    }
    return view('frontend.fabrica')->with(['groupes' => $groupes, 'fabricas' => $fabricas, 'city' => $city]);
  } 

  public function selectMayorista()
  {
    $groupes = Groupe::where('status', 1)->get();

    $majoristas = DB::table('empresas')->where('isAdmin', 0)->where('type_id', 2)->where('status', 1)->paginate(20);

    foreach ($majoristas as $mayo) {
      $id = $mayo->id;
      $city = DB::table('cities')->where('id', $id)->where('status', 1)->first();      
    }
    //dd($majoristas); die;
    return view('frontend.mayorista')->with(['groupes' => $groupes, 'majoristas' => $majoristas, 'city' => $city]);
  }  

  public function selectMinorista()
  {
    $groupes = Groupe::where('status', 1)->get();

    $minoristas = DB::table('empresas')->where('type_id', 3)->where('isAdmin', 0)->where('status', 1)->paginate(20);

    foreach ($minoristas as $mino) {
      $id = $mino->id;
      $city = optional(DB::table('cities')->where('id', $id)->where('status', 1)->first());      
    }
    return view('frontend.minorista')->with(['groupes' => $groupes, 'minoristas' => $minoristas, 'city' => $city]);
  } 
}
