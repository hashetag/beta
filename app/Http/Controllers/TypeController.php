<?php

namespace App\Http\Controllers;

use App\Type;
use Illuminate\Http\Request;

class TypeController extends Controller
{
  public function index(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $buscar = $request->buscar;
    $criterio = $request->criterio;
    
    if ($buscar==''){
      $types = Type::orderBy('id', 'asc')->paginate(10);
    }
    else{
      $types = Type::where($criterio, 'like', '%'. $buscar . '%')->orderBy('id', 'asc')->paginate(10);
    }

    return [
      'pagination' => [
        'total'        => $types->total(),
        'current_page' => $types->currentPage(),
        'per_page'     => $types->perPage(),
        'last_page'    => $types->lastPage(),
        'from'         => $types->firstItem(),
        'to'           => $types->lastItem(),
      ],
      'types' => $types
    ];
  }

  public function select(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $types = Type::all()->where('status','=',1);
    return ['types' => $types];
  } 

  public function store(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $type = new Type();
    $type->name = $request->name;
    $type->description = $request->description;
    $type->slug = str_slug($request->name);
    $type->status = '1';
    $type->save();
  }

  public function update(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $type = Type::findOrFail($request->id);
    $type->name = $request->name;
    $type->description = $request->description;
    $type->slug = str_slug($request->name);
    $type->status = '1';
    $type->save();
  }

  public function desactivate(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $type = Type::findOrFail($request->id);
    $type->status = '0';
    $type->save();
  }

  public function activate(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $type = Type::findOrFail($request->id);
    $type->status = '1';
    $type->save();
  }

  public function destroy($id)
	{
    $b = Type::findOrFail($id);
    $b->delete();
    return response()->json(['data' => $b], 200);
	}
}
