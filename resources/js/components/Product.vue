<template>
  <main class="main">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">Home</li>
      <li class="breadcrumb-item"><a href="#">Admin</a></li>
      <li class="breadcrumb-item active">Dashboard</li>
    </ol>
    <div class="container-fluid">
      <div class="card">
        <template v-if="view==1">
          <div class="card-header">
            <button type="button" @click="view=0" class=" text-white btn dash" >
                <i class="fa fa-arrow-left"></i>&nbsp;Volver 
            </button>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-header bg-dark text-white">
                    <i class="fa fa-align-justify"></i>Producto
                  </div>
                  <table class="table table-bordered table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Opciones</th>
                        <th>Categoría</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Codígo</th>
                        <th>Imagen</th>
                        <th>Precío</th>
                        <th>Descuento</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="prod in arrayOneProduct" :key="prod.id">
                        <td>
                          <button type="button" @click="view=4" class="btn btn-warning btn-sm">
                            <i class="fa fa-edit"></i>
                          </button> &nbsp;
                        </td>
                        <td>{{prod.category}}</td>
                        <td>{{prod.name}}</td>
                        <td>{{prod.description}}</td>
                        <td>{{prod.code}}</td>
                        <td><img v-bind:src="'img_product/'+prod.picture" class="img-responsive" height="50" width="50"></td>
                        <td>{{prod.price}}</td>
                        <td>{{prod.discount}}</td>
                        <td>{{prod.stock}}</td>
                        <td>
                          <div v-if="prod.status">
                            <span class="badge badge-success">Activado</span>
                          </div>
                          <div v-else>
                            <span class="badge badge-danger">desactivado</span>
                          </div>
                        </td>
                        <td>
                          <button type="button" class="btn btn-danger" @click="eliminarProduct(prod.id)">
                            <i class="fa fa-trash-o"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- Images Product -->
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-header bg-dark text-white">Galeria del Producto 
                    <button type="button" class="btn btn-primary btn-sm float-right">
                      Agregar mas imagen <i class="icon-plus"></i> 
                    </button>
                  </div>
                  <div class="card-body">
                    <table class="table table-bordered table-striped">
                       <thead>
                        <tr>
                          <th>Imagen </th>
                          <th>Editar</th>
                          <th>Borrar</th>
                        </tr>
                      </thead>
                      <tbody v-if="!arrayImgProduct" >
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-for="imgP in arrayImgProduct" :key="imgP.id">
                          <td>
                            <img v-bind:src="'img_product/'+imgP.image" class="img-responsive" height="130" width="130"></td>
                          <td>
                            <button type="button" class="btn btn-warning btn-sm"> <i class="icon-pencil"></i> </button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-danger btn-sm"> <i class="fa fa-trash"></i> </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Images Product -->
            <!-- Product Detail -->
            <div class="row">
              <div class="col">
                <div class="card">
                  <div class="card-header bg-dark text-white">
                    <i class="fa fa-align-justify"></i>Detalle del Producto
                  </div>
                  <div class="card-body" v-if="!arrayDetailProduct">
                    <ul class="nav nav-tabs" id="myTab1" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active " id="home-tab" data-toggle="tab" role="tab" aria-controls="home" @click="editDetail()"><span class="btn btn-warning"><i class="fa fa-edit"></i>Editar</span></a>
                      </li>
                    </ul>
                    <div class="tab-content" id="myTab1Content">
                      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        
                      </div>
                    </div>
                  </div>
                  <div class="card-body" v-else>
                    <ul class="nav nav-tabs" id="myTab1" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active " id="home-tab" data-toggle="tab" role="tab" aria-controls="home" @click="editDetail()"><span class="btn btn-warning"><i class="fa fa-edit"></i>Editar</span></a>
                      </li>
                    </ul>
                    <div class="tab-content" id="myTab1Content" v-for="det in arrayDetailProduct" :key="det.id">
                      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        {{ det.detail}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             <!-- End Product Detail -->
             <!-- Size Product -->
            <div class="row">
              <div class="col-6">
                <div class="card">
                  <div class="card-header bg-dark text-white">Talles disponible para el producto 
                    <button type="button" class="btn btn-primary btn-sm float-right">
                      Agregar mas talle <i class="icon-plus"></i> 
                    </button>
                  </div>
                  <div class="card-body">
                    <table class="table table-bordered table-striped">
                       <thead>
                        <tr>
                          <th>Talle </th>
                          <th>Editar</th>
                          <th>Borrar</th>
                        </tr>
                      </thead>
                      <tbody v-if="arraySizeProduct==null">
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-for="sizeP in arraySizeProduct" :key="sizeP.id">
                          <td> {{sizeP.size}} </td>
                          <td>
                            <button type="button" class="btn btn-warning btn-sm"><i class="icon-pencil"></i></button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-danger btn-sm"> <i class="fa fa-trash"></i> </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            <!-- End Size Product -->
            <!-- Color Product -->
              <div class="col-6">
                <div class="card">
                  <div class="card-header bg-dark text-white">Colores disponible para el producto 
                    <button type="button" class="btn btn-primary btn-sm float-right">
                      Agregar mas color <i class="icon-plus"></i> 
                    </button>
                  </div>
                  <div class="card-body">
                    <table class="table table-bordered table-striped">
                       <thead>
                        <tr>
                          <th>Color </th>
                          <th>Editar</th>
                          <th>Borrar</th>
                        </tr>
                      </thead>
                      <tbody v-if="!arrayColorProduct">
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr v-for="colorP in arrayColorProduct" :key="colorP.id">
                          <td> {{colorP.color}} </td>
                          <td>
                            <button type="button" class="btn btn-warning btn-sm"><i class="icon-pencil"></i></button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-danger btn-sm"> <i class="fa fa-trash"></i> </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Color Product -->
          </div>
        </template>
        <template v-if="view==0">
          <div class="card-header bg-dark text-white">
            <i class="fa fa-align-justify"></i> Productos
            <button type="button"  @click="view=3" class="btn btn-primary float-right" >
                <i class="icon-plus"></i>&nbsp;Agregar producto
            </button>
          </div>
          <div class="card-body">
            <div class="form-group row">
              <div class="col-md-6">
                <div class="input-group">
                  <select class="form-control col-md-3" v-model="criteria">
                    <option value="name">Nombre</option>
                    <option value="description">Descripción</option>
                  </select>
                  <input type="text"  v-model="search" @keyup.enter="listarProduct(1, search, criteria)" class="form-control" placeholder="Texto a buscar">
                  <button type="submit" @click="listarProduct(1, search, criteria)" class="btn btn-primary"><i class="fa fa-search"></i> Buscar</button>
                </div>
              </div>
            </div>
            <table class="table table-bordered table-striped table-sm">
              <thead>
                <tr>
                  <th>Opciones</th>
                  <th>Categoría</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th>Precío</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in arrayProduct" :key="product.id">
                  <td>
                    <button type="button" class="btn btn-primary btn-sm" @click="listarOneProduct(product.id)">
                      <i class="fa fa-search-plus"></i>
                    </button> &nbsp;
                    <template v-if="product.status">
                      <button type="button" class="btn btn-success btn-sm" @click="desactivarProduct(product.id)">
                      <i class="icon-check"></i>
                    </button>
                    </template>
                    <template v-else>
                      <button type="button" class="btn btn-danger btn-sm" @click="activarProduct(product.id)">
                      <i class="icon-close"></i>
                    </button>
                    </template>
                  </td>
                  <td>{{product.category}}</td>
                  <td>{{product.name}}</td>
                  <td>{{product.description}}</td>
                  <td><img v-bind:src="'img_product/'+product.picture" class="img-responsive" height="50" width="50"></td>
                  <td>{{product.price}}</td>
                  <td>
                    <div v-if="product.status">
                      <span class="badge badge-success">Activado</span>
                    </div>
                    <div v-else>
                      <span class="badge badge-danger">desactivado</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav>
              <ul class="pagination">
                <li class="page-item" v-if="pagination.current_page > 1">
                  <a class="page-link" href="#" @click.prevent="changePage(pagination.current_page - 1,search,criteria)">Ant</a>
                </li>
                <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']">
                  <a class="page-link" href="#" @click.prevent="changePage(page,search,criteria)" v-text="page"></a>
                </li>
                <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                  <a class="page-link" href="#" @click.prevent="changePage(pagination.current_page + 1,search,criteria)">Sig</a>
                </li>
              </ul>
            </nav>
          </div>
        </template>
        <template v-if="view==3">
          <div class="animated fadeIn">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header bg-dark text-white">
                    <strong>Agregar Nuevo Producto</strong>
                  </div>
                  <div class="card-body">
                    <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Nombre (*)</label>
                            <input type="text" class="form-control" v-model="pNew.name" placeholder="Nombre del producto">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Categoría del producto (*)</label>
                            <select class="form-control" v-model="pNew.category_id">
                              <option value="" >Seleccione Categoría</option>
                              <option v-for="category in arrayCategory" :key="category.id" :value="category.id">{{category.name}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Descripción (*)</label>
                            <input type="text" class="form-control" v-model="pNew.description" placeholder="Descripción del producto">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Código (*)</label>
                            <input type="text" class="form-control" v-model="pNew.code" placeholder="Código del producto">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Imagen del principal del producto: (*)</label>
                            <img :src="pNew.picture" class="img-responsive" height="60" width="60">
                            <input type="file" @change="onImageChange" class="form-control">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Precío (*)</label>
                            <input type="text" class="form-control" v-model="pNew.price" placeholder="Precío del producto">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Descuento</label>
                            <input type="text" class="form-control" v-model="pNew.discount" placeholder="Descuento del producto">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Stock (*)</label>
                            <input type="text" class="form-control" v-model="pNew.stock" placeholder="Stock del producto">
                          </div>
                        </div>
                      </div>
                      <div v-show="errorProduct" class="form-group">
                        <div class="row error text-danger">
                          <div v-for="error in errorMostrarMsjProduct" :key="error">{{error}}</div>
                        </div>
                      </div>
                      <div class="form-actions text-center">
                          <div class="btn btn-success" @click="registrarProduct()" >Guardar y Seguir</div>
                          <div class="btn btn-danger" @click="view=0" >Cancelar</div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="view==4">
          <div class="animated fadeIn">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header bg-dark text-white">
                    <strong>Agregar Nuevo Producto</strong>
                  </div>
                  <div class="card-body" v-for="pEdit in arrayOneProduct" :key="pEdit.id">
                    <!-- <form action="" method="post" enctype="multipart/form-data" class="form-horizontal"> -->
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Nombre (*)</label>
                            <input type="text" class="form-control" v-model="pEdit.name">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Categoría del producto (*)</label>
                            <select class="form-control" v-model="pEdit.category_id">
                              <option value="" >Seleccione Categoría</option>
                              <option v-for="category in arrayCategory" :key="category.id" :value="category.id">{{category.name}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Descripción (*)</label>
                            <input type="text" class="form-control" v-model="pEdit.description">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Código (*)</label>
                            <input type="text" class="form-control" v-model="pEdit.code">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Imagen del principal del producto: (*)</label>
                            <img :src="'img_product/'+pEdit.picture" class="img-responsive" height="60" width="60">
                            <input type="file" @change="onImageChange" class="form-control">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Precío (*)</label>
                            <input type="text" class="form-control" v-model="pEdit.price">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Descuento</label>
                            <input type="text" class="form-control" v-model="pEdit.discount">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <div class="form-group">
                            <label for="name">Stock (*)</label>
                            <input type="text" class="form-control" v-model="pEdit.stock">
                          </div>
                        </div>
                      </div>
                      <div v-show="errorProduct" class="form-group">
                        <div class="row error text-danger">
                          <div v-for="error in errorMostrarMsjProduct" :key="error">{{error}}</div>
                        </div>
                      </div>
                      <div class="form-actions text-center">
                          <div class="btn btn-success" @click="actualizarProduct(pEdit)" >Guardar</div>
                          <div class="btn btn-danger" @click="view=1" >Cancelar</div>
                      </div>
                    <!-- </form> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>
<script>
  Vue.prototype.$empresa_id = document.querySelector("meta[name='empresa-id']").getAttribute('content');
  //import VueBarcode from 'vue-barcode';
  export default {
    data(){
      return {
        view: 0,
        p_id : 0,
        pNew:{
          category_id :'',
          category :'',
          name :'',
          description :'',
          code :'',
          price :'',
          discount :'',
          stock :'',
          picture :''
        },

        arrayProduct : [],
        arrayNewProduct : [],
        arrayOneProduct : [],
        arrayDetailProduct : [],
        arrayImgProduct : [],
        arrayColorProduct : [],
        arraySizeProduct : [],
        arrayCategory : [],
        errorProduct : 0,
        errorMostrarMsjProduct : [],
        pagination : {
          'total' : 0,
          'current_page' : 0,
          'per_page' : 0,
          'last_page' : 0,
          'from' : 0,
          'to' : 0,
        },
        offset : 3,
        criteria : 'name',
        search : '',
      }
    },
    computed:{
      isActived: function(){
        return this.pagination.current_page;
      },
      //Calcula los elementos de la paginación
      pagesNumber: function() {
        if(!this.pagination.to) {
          return [];
        }
        
        var from = this.pagination.current_page - this.offset; 
        if(from < 1) {
          from = 1;
        }

        var to = from + (this.offset * 2); 
        if(to >= this.pagination.last_page){
          to = this.pagination.last_page;
        }  

        var pagesArray = [];
        while(from <= to) {
          pagesArray.push(from);
          from++;
        }
        return pagesArray;             
      }
    },
    methods :{
      listarProduct (empresa_id, page, search, criteria){
        var emp_id =this.$empresa_id;

        let me=this;
        var url= '/admin/product/'+emp_id+'?page=' + page + '&search='+ search + '&criteria='+ criteria;
        axios.get(url).then(function (response) {
          //'empresa_id' : this.empresa_id,
          var result= response.data;
          me.arrayProduct = result.products.data;
          me.pagination= result.pagination;
        })
        .catch(function (error){
          console.log(error);
        });
      },
      listarOneProduct (id){
        var emp_id =this.$empresa_id;
        this.p_id = id; //data['id'] ;
        //console.log(this.p_id);
        let me=this;
        me.view=1;

        /*show One Product*/
        var url= '/admin/product/show/'+emp_id+'/'+this.p_id;
        axios.get(url,{
        }).then(function (response) {
          var result = response.data;
          //console.log(result);
          me.arrayOneProduct = result;
        })
        .catch(function (error){
          console.log(error);
        });

        /*Show Product Detail*/
        var urld= '/admin/product/detail/'+this.p_id;
        axios.get(urld).then(function (response) {
          var result = response.data;
          //console.log(result);
          me.arrayDetailProduct = result;
        })
        .catch(function (error) {
          console.log(error);
        }); 

        /*Show Product Images*/
        var urli= '/admin/product/images/'+this.p_id;
        axios.get(urli).then(function (response) {
          var result= response.data;
          //console.log(result);
          me.arrayImgProduct = result;
        })
        .catch(function (error) {
          console.log(error);
        }); 

        /*Show Product Sizes*/
        var urls= '/admin/product/sizes/'+this.p_id;
        axios.get(urls).then(function (response) {
          var result= response.data;
          //console.log(result);
          me.arraySizeProduct = result;
        })
        .catch(function (error) {
          console.log(error);
        }); 

        /*Show Product Colores*/
        var urlc= '/admin/product/colores/'+this.p_id;
        axios.get(urlc).then(function (response) {
          var result = response.data;
          //console.log(result);
          me.arrayColorProduct = result;
        })
        .catch(function (error) {
          console.log(error);
        }); 
      },
      selectCategory (){
        var emp_id =this.$empresa_id;

        let me=this;
        var url= '/admin/category/select/'+emp_id;
        axios.get(url).then(function (response) {
          var result= response.data;
          me.arrayCategory = result.categories;
        })
        .catch(function (error){
          console.log(error);
        });
      },
      changePage(emp_id, page, search, criteria){
        var emp_id =this.$empresa_id;
        let me = this;
        //Actualiza la página actual
        me.pagination.current_page = page;
        //Envia la petición para visualizar la data de esa página
        me.listarProduct(emp_id, page, search, criteria);
      },
      validarProduct(){
        this.errorProduct = 0;
        this.errorMostrarMsjProduct = [];

        /*if (!this.category_id) this.errorMostrarMsjProduct.push("Seleccione una categoría.");*/
        if (!this.pNew.name) this.errorMostrarMsjProduct.push("El nombre del producto no puede estar vacío.");
        if (!this.pNew.stock) this.errorMostrarMsjProduct.push("El stock del producto debe ser un número.");
        if (!this.pNew.price) this.errorMostrarMsjProduct.push("El precío del producto debe ser un número.");
        if (this.errorMostrarMsjProduct.length) this.errorProduct = 1;

        return this.errorProduct;
      },
      onImageChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = (e) => {
          vm.picture = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      registrarProduct (){
        
        if (this.validarProduct()) {
          return;
        }
        var emp_id =this.$empresa_id;
        let me=this;
        axios.post('/admin/product/registrar/'+emp_id,{
          /*'empresa_id' : this.empresa_id,*/
          'category_id': this.pNew.category_id,
          'name'       : this.pNew.name,
          'description': this.pNew.description,
          'code'       : this.pNew.code,
          'picture'    : this.pNew.picture,
          'price'      : this.pNew.price,
          'discount'   : this.pNew.discount,
          'stock'      : this.pNew.stock,
        }).then(function (response){
          swal(
            'Producto agregado con exito!',
            'You clicked the button!',
            'success'
          );
          var lastId = response.data;
          console.log(lastId);
          me.listarOneProduct(lastId);
          //me.listarProduct(emp_id, 1, '', 'name');
        })
        .catch(function (error){
          console.log(error);
        });
      },
      validarEditProduct(){
        this.errorProduct = 0;
        this.errorMostrarMsjProduct = [];

        /*if (!this.category_id) this.errorMostrarMsjProduct.push("Seleccione una categoría.");*/
        if (!this.pEdit.name) this.errorMostrarMsjProduct.push("El nombre del producto no puede estar vacío.");
        if (!this.pEdit.stock) this.errorMostrarMsjProduct.push("El stock del producto debe ser un número.");
        if (!this.pEdit.price) this.errorMostrarMsjProduct.push("El precío del producto debe ser un número.");
        if (this.errorMostrarMsjProduct.length) this.errorProduct = 1;

        return this.errorProduct;
      },
      actualizarProduct (data = []){
        
        var emp_id =this.$empresa_id;
        var id = data['id'];
        console.log(id);
      
        if (this.validarEditProduct()) {
          return;
        }
        
        let me=this;
        axios.put('/admin/product/actualizar/'+id,{
          'category_id' : data['category_id'],
          'name'        : data['name'],
          'description' : data['description'],
          'code'        : data['code'],
          'picture'     : data['picture'],
          'price'       : data['price'],
          'discount'    : data['discount'],
          'stock'       : data['stock']
        }).then(function (response){
          swal(
            'Cambio hecho con exito!',
            'You clicked the button!',
            'success'
          );
          me.listarOneProduct(id);
        })
        .catch(function (error){
          console.log(error);
        });
      },
      desactivarProduct(id){
        var emp_id =this.$empresa_id;
       swal({
        title: 'Esta seguro de desactivar este producto?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
        }).then((result) => {
        if (result.value) {
          let me = this;

          axios.put('/admin/product/desactivar/'+id,{
            /*'id': this.product_id,*/
          }).then(function (response) {
            me.listarProduct(emp_id, 1, '', 'name');
            swal(
            'Desactivado!',
            'El registro ha sido desactivado con éxito.',
            'success'
            )
          }).catch(function (error) {
            console.log(error);
          });
        } else if (
          // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
          ) {
              
          }
        }) 
      },
      activarProduct(id){
        var emp_id =this.$empresa_id;
        swal({
          title: 'Esta seguro de activar este producto?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar!',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        }).then((result) => {
        if (result.value) {
          let me = this;

          axios.put('/admin/product/activar/'+id,{
            /*'id': this.product_id,*/
          }).then(function (response) {
            me.listarProduct(emp_id, 1, '', 'name');
            swal(
            'Activado!',
            'El registro ha sido activado con éxito.',
            'success'
            )
          }).catch(function (error) {
            console.log(error);
          });
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
            
        }
        }) 
      },      
      eliminarProduct(id){
        var emp_id =this.$empresa_id;
        swal({
          title: 'Esta seguro de eliminar este product?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar!',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        }).then((result) => {
        if (result.value) {
          let me = this;

          axios.delete('/admin/product/eliminar/'+id,{
            /*'id': this.product_id,*/
          }).then(function (response) {
            me.listarProduct(emp_id, 1, '', 'name');
            swal(
            'Eliminado!',
            'El product ha sido eliminado con éxito.',
            'success'
            )
          }).catch(function (error) {
            console.log(error);
          });
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
            
        }
        }) 
      }
    },
    mounted(){
      this.listarProduct(this.$empresa_id, 1, this.search, this.criteria);
      this.selectCategory();
    }
  }
</script>
<style>
  .modal-content{
    width: 100% !important; 
    position: absolute !important; 
  }
  .mostrar{
    display: list-item !important;
    opacity: 1 !important; 
    position: absolute !important; 
    background-color: #3c29297a !important; 
  }
  .error{
    justify-content:center;
  }

</style>