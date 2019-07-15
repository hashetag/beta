<?php

namespace App\Http\Controllers;

use App\Groupe;
use App\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmpresaController extends Controller
{

	public function index(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $search = $request->search;
    $criteria = $request->criteria;

   if ($search==''){
      $empresas = Empresa::join('groupes','empresas.groupe_id','=','groupes.id')
      ->join('cities','empresas.city_id','=','cities.id')
      ->join('types','empresas.type_id','=','types.id')
      ->select('empresas.id','empresas.name','empresas.email','empresas.password','empresas.cuit','empresas.avatar','empresas.phone','empresas.address','empresas.openhours','empresas.openhours_2','empresas.minimum','empresas.latitud','empresas.longitud','empresas.slug','empresas.website','empresas.status','empresas.isAdmin','empresas.groupe_id','groupes.name as groupe','empresas.city_id','cities.city as city','empresas.type_id','types.name as type')
      ->orderBy('empresas.id', 'asc')->paginate(20);
    }
    else{
      $empresas = Empresa::join('groupes','empresas.groupe_id','=','groupes.id')
      ->join('cities','empresas.city_id','=','cities.id')
      ->join('types','empresas.type_id','=','types.id')
      ->select('empresas.id','empresas.name','empresas.email','empresas.password','empresas.cuit','empresas.avatar','empresas.phone','empresas.address','empresas.openhours','empresas.openhours_2','empresas.minimum','empresas.latitud','empresas.longitud','empresas.slug','empresas.website','empresas.status','empresas.isAdmin','empresas.groupe_id','groupes.name as groupe','empresas.city_id','cities.city as city','empresas.type_id','types.name as type')
      ->where('empresas.'.$criteria, 'like', '%'. $search . '%')
      ->orderBy('empresas.id', 'asc')->paginate(20);
    }

    return [
      'pagination' => [
        'total'        => $empresas->total(),
        'current_page' => $empresas->currentPage(),
        'per_page'     => $empresas->perPage(),
        'last_page'    => $empresas->lastPage(),
        'from'         => $empresas->firstItem(),
        'to'           => $empresas->lastItem(),
      ],
      'empresas' => $empresas
    ]; 
  }

	public function show(Request $request)
  { 
    if (!$request->ajax()) return redirect('/');
    $empresa = Empresa::findOrFail($request->id);
    return response()->json(['data' => $empresa], 200);
  }

  public function select(Request $request)
  { 
    if (!$request->ajax()) return redirect('/');
    $empresa = Empresa::all()->where('isAdmin', 0)->where('status',1);
    return response()->json(['data' => $empresa], 200);
  }


	public function store(Request $request)
  {
	  if (!$request->ajax()) return redirect('/');
    
    $rules = [
      'name' =>  'required',
      'email' => 'required|email|unique:empresas',
      'password' => 'required|min:8',
    ];

    if($request->get('avatar'))
    {
      $image = $request->get('avatar');
      $new_avatar = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
      \Image::make($request->get('avatar'))->save(public_path('img_empresa/').$new_avatar);
    }

    $this->validate($request, $rules);

    $empresa = new Empresa();
    $empresa->isAdmin  = '0';
    $empresa->name     = $request->name;
    $empresa->email    = $request->email;
    $empresa->password = bcrypt( $request->password);
    //$emp_slug          = str_slug($request->name);
    //$empresa->slug     = $gr_slug;

    if (!empty($request->groupe_id)) {
      $empresa->groupe_id = $request->groupe_id;
      $groupe_slug = Groupe::where('id', $request->groupe_id)->first();
    }else{
      return response()->json(['error' => 'Categoria de Empresa No puede estar Vacio', 'code' => 422], 422);
    }

    if (!empty($request->city_id)) {
      $empresa->city_id = $request->city_id;
    }else{
      return response()->json(['error' => 'Ciudad de Empresa No puede estar Vacio', 'code' => 422], 422);
    }

    if (!empty($request->type_id)) {
      $empresa->type_id = $request->type_id;
    }else{
      $empresa->type_id = '3';
    }

    $gr_slug = $groupe_slug->slug;

    $emp_slug          = str_slug($request->name, "-");
    $empresa->slug     = $gr_slug.'/'.$emp_slug;
    
    $empresa->cuit        = $request->cuit;
    $empresa->avatar      = $new_avatar;
    $empresa->phone       = $request->phone;
    $empresa->address     = $request->address;
    $empresa->openhours   = $request->openhours;
    $empresa->openhours_2 = $request->openhours_2;
    $empresa->minimum     = $request->minimum;
    $empresa->latitud     = $request->latitud;
    $empresa->longitud    = $request->longitud;
    $empresa->website     = $request->website;
    $empresa->status      = '1';
    $empresa->save();
    return response()->json(['data', $empresa], 201);
	}


	public function update(Request $request)
  {
    if (!$request->ajax()) return redirect('/');

    $empresa = Empresa::findOrFail($request->id);
    
    if ($request->has('name')) {
      $empresa->name = $request->name;
    }

    if ($request->has('email') && $empresa->email != $request->email) {
      $rules = [
        'email' => 'email|unique:empresas',
      ];

      $this->validate($request, $rules);
      $empresa->email = $request->email;
    }
    
    if ($request->has('password')) {
      $rules_2 = [
        'password' => 'min:8',
      ];
      $this->validate($request, $rules_2);
      $empresa->password = bcrypt($request->password);
    }

    $empresa->isAdmin  = 0;
    if (!empty($request->groupe_id)) {
      $empresa->groupe_id = $request->groupe_id;
      $groupe_slug = Groupe::where('id', $request->groupe_id)->first();
    }else{
      return response()->json(['error' => 'Categoria de Empresa No puede estar Vacio', 'code' => 422], 422);
    }

    if (!empty($request->city_id)) {
      $empresa->city_id = $request->city_id;
    }else{
      return response()->json(['error' => 'Ciudad de Empresa No puede estar Vacio', 'code' => 422], 422);
    }

    if (!empty($request->type_id)) {
      $empresa->type_id = $request->type_id;
    }else{
      $empresa->type_id = '3';
    }

    if($request->get('avatar'))
    {
      $image = $request->get('avatar');
      $new_avatar = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
      \Image::make($request->get('avatar'))->save(public_path('img_empresa/').$new_avatar);
    }

    $gr_slug = $groupe_slug->slug;

    $emp_slug          = str_slug($request->name, "-");
    $empresa->slug     = $gr_slug.'/'.$emp_slug;


    $empresa->cuit        = $request->cuit;
    $empresa->avatar      = $new_avatar;
    $empresa->phone       = $request->phone;
    $empresa->address     = $request->address;
    $empresa->openhours   = $request->openhours;
    $empresa->openhours_2 = $request->openhours_2;
    $empresa->minimum     = $request->minimum;
    $empresa->latitud     = $request->latitud;
    $empresa->longitud    = $request->longitud;
    $empresa->website     = $request->website;
    $empresa->status      = '1';
    $empresa->save();

    return response()->json(['data' => $empresa], 200);
  }

  public function desactivate(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $empresa = Empresa::findOrFail($request->id);
    $empresa->status = '0';
    $empresa->save();
  }

  public function activate(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $empresa = Empresa::findOrFail($request->id);
    $empresa->status = '1';
    $empresa->save();
  }

  public function destroy($id)
	{
    $b = Empresa::findOrFail($id);
    $b->delete();
    return response()->json(['data' => $b], 200);
	}
}
