<?php

namespace App\Http\Controllers;

use App\Empresa;
use App\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
	public function index(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $b_id = $request->empresa_id;
    $search = $request->search;
    $criteria = $request->criteria;

    if ($search==''){
      $categories = Category::join('empresas','categories.empresa_id','=','empresas.id')
      ->select('categories.id', 'categories.name','categories.description','categories.slug','categories.status','categories.empresa_id','empresas.name as empresa')
      ->where('empresa_id', $b_id)
      ->orderBy('categories.id', 'asc')->paginate(20);
    }
    else{
      $categories = Category::join('empresas','categories.empresa_id','=','empresas.id')
      ->select('categories.id', 'categories.name','categories.description','categories.slug','categories.status','categories.empresa_id','empresas.name as empresa')->where('empresa_id', $b_id)
      ->where('categories.'.$criteria, 'like', '%'. $search . '%')->first()
      ->orderBy('categories.id', 'asc')->paginate(20);
    }

    return [
      'pagination' => [
        'total'        => $categories->total(),
        'current_page' => $categories->currentPage(),
        'per_page'     => $categories->perPage(),
        'last_page'    => $categories->lastPage(),
        'from'         => $categories->firstItem(),
        'to'           => $categories->lastItem(),
      ],
      'categories' => $categories
    ];
    //return response()->json(['data' => $bus], 200);
  }

	public function select(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $b_id = $request->empresa_id;
    $categories = Category::all()->where('empresa_id', $b_id)->where('status',1);
    return ['categories' => $categories];
  } 

	public function store(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $category = new Category();
    $category->empresa_id = $request->empresa_id;
    $category->name = $request->name;
    $category->description = $request->description;

    $sl_emp = Empresa::where('id', $request->empresa_id)->first();
    $slg_empresa = $sl_emp->slug;

    $slug_cat = str_slug($request->name, "-");
    $category->slug = $slg_empresa.'/'.$slug_cat;

    $category->status = '1';
    $category->save();
  }

  public function update(Request $request)
  {

    if (!$request->ajax()) return redirect('/');
    $category = Category::findOrFail($request->id);
    
    $empIdCat = Category::where('id', $request->id)->first();
    $empId    = $empIdCat->empresa_id; 
    
    $category->name = $request->name;
    $category->description = $request->description;
    
    $sl_emp = Empresa::select('slug')->where('id', $empId)->first();
    $slg_empresa = $sl_emp->slug;

    $slug_cat = str_slug($request->name, "-");
    $category->slug = $slg_empresa.'/'.$slug_cat;

    //$category->slug = str_slug($request->name, "-");
    $category->status = '1';
    $category->save();
  }

  public function desactivate(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $category = Category::findOrFail($request->id);
    $category->status = '0';
    $category->save();
  }

  public function activate(Request $request)
  {
    if (!$request->ajax()) return redirect('/');
    $category = Category::findOrFail($request->id);
    $category->status = '1';
    $category->save();
  }

  public function destroy($id)
	{
    $b = Category::findOrFail($id);
    $b->delete();
    return response()->json(['data' => $b], 200);
	}
}
