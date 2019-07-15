<template>
  <main class="main">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">Home</li>
      <li class="breadcrumb-item"><a href="#">Admin</a></li>
      <li class="breadcrumb-item active">Dashboard</li>
    </ol>
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <i class="fa fa-align-justify"></i> Productos
          <button type="button" @click="abrirModal('product', 'registrar')" class="btn btn-secondary" >
              <i class="icon-plus"></i>&nbsp;Nuevo
          </button>
        </div>
        <div class="card-body">
          <div class="form-group row">
            <div class="col-md-6">
              <div class="input-group">
                <select class="form-control col-md-3" v-model="criteria">
                  <option value="name">name</option>
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
                <th>Codígo</th>
                <th>Imagen</th>
                <th>Precío</th>
                <th>Descuento</th>
                <th>Stock</th>
                <th>URL</th>
                <th>Estado</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in arrayProduct" :key="product.id">
                <td>
                  <button type="button" @click="abrirModal('product', 'actualizar', product)" class="btn btn-warning btn-sm">
                    <i class="icon-pencil"></i>
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
                <td>{{product.code}}</td>
                <td><img v-bind:src="'img_product/'+product.picture" class="img-responsive" height="50" width="50"></td>
                <td>{{product.price}}</td>
                <td>{{product.discount}}</td>
                <td>{{product.stock}}</td>
                <td>{{product.slug}}</td>
                <td>
                  <div v-if="product.status">
                    <span class="badge badge-success">Activado</span>
                  </div>
                  <div v-else>
                    <span class="badge badge-danger">desactivado</span>
                  </div>
                </td>
                <td>
                  <button type="button" class="btn btn-danger btn-sm" @click="eliminarProduct(product.id)">
                    <i class="icon-trash"></i>
                  </button>
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
      </div>
    </div>
    <div class="modal fade" tabindex="-1" :class="{'mostrar': modal}" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
      <div class="modal-dialog modal-primary modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{tituloModal}}</h4>
            <button type="button" class="close" @click="cerrarModal()" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Categoría del producto</label>
                <div class="col-md-9">
                  <select class="form-control" v-model="category_id">
                    <option value="" >Seleccione Categoría</option>
                    <option v-for="category in arrayCategory" :key="category.id" :value="category.id">{{category.name}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Nombre</label>
                <div class="col-md-9">
                  <input type="text" v-model="name" class="form-control" placeholder="Nombre del producto">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Descripción</label>
                <div class="col-md-9">
                  <input type="text" v-model="description" class="form-control" placeholder="Descripción del producto">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Código</label>
                <div class="col-md-9">
                  <input type="text" v-model="code" class="form-control" placeholder="Código del producto">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-9 form-control-label" for="email-input"><b>Imagen del Producto: (*)</b></label>
                <div class="col-md-9">
                  <img :src="picture" class="img-responsive" height="60" width="60">
                  <input type="file" @change="onImageChange" class="form-control">
                </div>
              </div> 
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Precío</label>
                <div class="col-md-9">
                  <input type="text" v-model="price" class="form-control" placeholder="Precío del producto">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Descuento</label>
                <div class="col-md-9">
                  <input type="text" v-model="discount" class="form-control" placeholder="Descuento del producto">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Stock</label>
                <div class="col-md-9">
                  <input type="text" v-model="stock" class="form-control" placeholder="Stock de producto">
                </div>
              </div>
              <div v-show="errorProduct" class="form-group">
                <div class="row error text-danger">
                  <div v-for="error in errorMostrarMsjProduct" :key="error">{{error}}</div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
            <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarProduct()">Guardar</button>
            <button type="button" v-else class="btn btn-primary" @click="actualizarProduct()">Actualizar</button>
          </div>
        </div>
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
        product_id :'',
        empresa_id :'',
        empresa :'',
        category_id :'',
        category :'',
        name :'',
        description :'',
        code :'',
        picture :'',
        price :'',
        discount :'',
        stock :'',
        arrayProduct : [],
        arrayCategory : [],
        modal : 0,
        tituloModal : '',
        tipoAccion: 0,
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
    /*components: {
      'barcode': VueBarcode
    },*/
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
          'category_id' : this.category_id,
          'name' : this.name,
          'description' : this.description,
          'code' : this.code,
          'picture' : this.picture,
          'price' : this.price,
          'discount' : this.discount,
          'stock' : this.stock,
        }).then(function (response){
          me.cerrarModal();
          //me.listarProduct();
          me.listarProduct(emp_id, 1, '', 'name');
        })
        .catch(function (error){
          console.log(error);
        });
      },
      actualizarProduct (id){
        
        if (this.validarProduct()) {
          return;
        }
        
        var emp_id =this.$empresa_id;
        let me=this;
        //if (!this.picture){this.picture ='1561291191.jpeg'};
        axios.put('/admin/product/actualizar/'+id,{
          'id' : this.product_id,
          'category_id' : this.category_id,
          'name' : this.name,
          'description' : this.description,
          'code' : this.code,

          'picture' : this.picture,
          'price' : this.price,
          'discount' : this.discount,
          'stock' : this.stock,
        }).then(function (response){
          me.cerrarModal();
          //me.listarProduct();
          me.listarProduct(emp_id, 1, '', 'name');
        })
        .catch(function (error){
          console.log(error);
        });
      },
      validarProduct(){
        this.errorProduct = 0;
        this.errorMostrarMsjProduct = [];

        /*if (!this.category_id) this.errorMostrarMsjProduct.push("Seleccione una categoría.");*/
        if (!this.name) this.errorMostrarMsjProduct.push("El name del product no puede estar vacío.");
        if (!this.stock) this.errorMostrarMsjProduct.push("El stock del product debe ser un número.");
        if (!this.price) this.errorMostrarMsjProduct.push("El price del product debe ser un número.");
        if (this.errorMostrarMsjProduct.length) this.errorProduct = 1;

        return this.errorProduct;
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
      },
      cerrarModal(){
        this.modal        = 0;
        this.tituloModal  = '';
        this.category_id  = '';
        this.category     = '';
        this.name         = '';
        this.code         = '';
        this.picture      = '';
        this.price        = 0;
        this.discount        = 0;
        this.stock        = '';
        this.description  = '';
        this.errorProduct = 0;
      },
      abrirModal (modelo, accion, data =[]){
        this.selectCategory();
        switch(modelo){
          case "product":{
            switch(accion){
              case 'registrar':{
                this.modal       = 1;
                this.tituloModal = 'Registrar Producto';
                this.category_id = '';
                this.category    = '';
                this.name        = '';
                this.description = '';
                this.code        = '';
                this.picture     = '';
                this.price       = '';
                this.discount    = '';
                this.stock       = '';
                this.tipoAccion  = 1;
                break;
              }
              case 'actualizar':{
                this.modal       = 1;
                this.tituloModal = 'Actualizar Producto';
                this.product_id  = data['id'];
                this.category_id = data['category_id'];
                this.category    =  data['category'];
                this.name        = data['name'];
                this.description = data['description'];
                this.code        = data['code'];
                
               //if (data['picture'] !== null) {
                  this.picture   = data['picture'];
                /*}else{
                   this.picture  = '';
                }*/
                this.price       = data['price'];
                this.discount    = data['discount'];
                this.stock       = data['stock'];
                this.tipoAccion  = 2;
                break;
              }
            }
          }
        }
        
      }
    },
    mounted(){
      this.listarProduct(this.$empresa_id, 1, this.search, this.criteria);
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