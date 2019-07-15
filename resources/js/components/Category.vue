<template>
  <main class="main" >
    <ol class="breadcrumb">
      <li class="breadcrumb-item">Home</li>
      <li class="breadcrumb-item"><a href="#">Admin</a></li>
      <li class="breadcrumb-item active">Dashboard</li>
      <li class="breadcrumb-item active"></li>
    </ol>
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <i class="fa fa-align-justify"></i> Categorías
          <button type="button" @click="abrirModal('category', 'registrar')" class="btn btn-secondary" >
            <i class="icon-plus"></i>&nbsp;Nuevo
          </button>
        </div>
        <div class="card-body">
          <div class="form-group row">
            <div class="col-md-6">
              <div class="input-group">
                <select class="form-control col-md-3" v-model="criteria">
                  <option value="name">Categoría</option>
                  <option value="description">Descripción</option>
                </select>
                <input type="text"  v-model="search" @keyup.enter="listarCategory(1, search, criteria)" class="form-control" placeholder="Texto a buscar">
                <button type="submit" @click="listarCategory(1, search, criteria)" class="btn btn-primary"><i class="fa fa-search"></i> Buscar</button>
              </div>
            </div>
          </div>
          <table class="table table-bordered table-striped table-sm">
            <thead>
              <tr>
                <th>Opciones</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in arrayCategory" :key="category.id">
                <td>
                  <button type="button" @click="abrirModal('category', 'actualizar', category)" class="btn btn-warning btn-sm">
                    <i class="icon-pencil"></i>
                  </button> &nbsp;
                  <template v-if="category.status">
                    <button type="button" class="btn btn-success btn-sm" @click="desactivarCategory(category.id)">
                    <i class="icon-check"></i>
                  </button>
                  </template>
                  <template v-else>
                    <button type="button" class="btn btn-danger btn-sm" @click="activarCategory(category.id)">
                    <i class="icon-close"></i>
                  </button>
                  </template>
                </td>
                <td>{{category.name}}</td>
                <td>{{category.description}}</td>
                <td>
                  <div v-if="category.status">
                    <span class="badge badge-success">Activado</span>
                  </div>
                  <div v-else>
                    <span class="badge badge-danger">desactivado</span>
                  </div>
                </td>
                <td>
                  <button type="button" class="btn btn-danger btn-sm" @click="eliminarCategoria(category.id)">
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
                <label class="col-md-3 form-control-label" for="text-input">Categoría</label>
                <div class="col-md-9">
                  <input type="text" v-model="name" class="form-control" placeholder="nombre de categoría">
                  <span class="help-block">(*) Ingrese el name de la categoría</span>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="email-input">Descripción</label>
                <div class="col-md-9">
                  <input type="text" v-model="description" class="form-control" placeholder="Ingrese descripción">
                </div>
              </div>
              <div v-show="errorCategory" class="form-group">
                <div class="row error text-danger">
                  <div v-for="error in errorMostrarMsjCategory" :key="error">{{error}}</div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
            <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarCategory()">Guardar</button>
            <button type="button" v-else class="btn btn-primary" @click="actualizarCategory()">Actualizar</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
  Vue.prototype.$empresa_id = document.querySelector("meta[name='empresa-id']").getAttribute('content');
  export default {
    data(){
      return {
        emp_id : 0,
        category_id : 0,
        name :'',
        description :'',
        arrayCategory : [],
        modal : 0,
        tituloModal : '',
        tipoAccion: 0,
        errorCategory : 0,
        errorMostrarMsjCategory : [],
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
      listarCategory (empresa_id, page, search, criteria){
        var emp_id =this.$empresa_id;
        let me=this;
       
        var url= '/admin/category/'+emp_id+'?page=' + page + '&search='+ search + '&criteria='+ criteria;
        axios.get(url).then(function (response) {
          var result= response.data;
          me.arrayCategory = result.categories.data;
          me.pagination= result.pagination;
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
        me.listarCategory(emp_id, page, search, criteria);
      },
      registrarCategory (emp_id){
        
        if (this.validarCategory()) {
          return;
        }
        var emp_id =this.$empresa_id;
        let me=this;
        axios.post('/admin/category/registrar/'+emp_id,{
          'name' : this.name,
          'description' : this.description
        }).then(function (response){
          me.cerrarModal();
          me.listarCategory(emp_id, 1, '', 'name');
        })
        .catch(function (error){
          console.log(error);
        });
      },
      actualizarCategory (id){
        
        if (this.validarCategory()) {
          return;
        }
        var emp_id =this.$empresa_id;
        let me=this;
        axios.put('/admin/category/actualizar/'+id,{
          'id' : this.category_id,
          'name' : this.name,
          'description' : this.description
        }).then(function (response){
          me.cerrarModal();
          //me.listarCategory();
          me.listarCategory(emp_id, 1, '', 'name');
        })
        .catch(function (error){
          console.log(error);
        });
      },
      validarCategory(){
        this.errorCategory = 0;
        this.errorMostrarMsjCategory = [];

        if (!this.name) this.errorMostrarMsjCategory.push("El name de la categoría no puede estar vacío.");
        if (this.errorMostrarMsjCategory.length) this.errorCategory = 1;

        return this.errorCategory;
      },
      desactivarCategory(id){
        var emp_id =this.$empresa_id;
       swal({
        title: 'Esta seguro de desactivar esta categoría?',
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

          axios.put('/admin/category/desactivar/'+id,{
            /*'id': id*/
          }).then(function (response) {
            me.listarCategory(emp_id, 1, '', 'name');
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
      activarCategory(id){
        var emp_id =this.$empresa_id;
        swal({
          title: 'Esta seguro de activar esta categoría?',
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

          axios.put('/admin/category/activar/'+id,{
            'id': id
          }).then(function (response) {
            me.listarCategory(emp_id, 1, '', 'name');
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
      eliminarCategoria(id){
        var emp_id =this.$empresa_id;
        swal({
          title: 'Esta seguro de borrar esta categoría?',
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

          axios.delete('/admin/category/eliminar/'+id,{
            'id': id
          }).then(function (response) {
            me.listarCategory(emp_id, 1, '', 'name');
            swal(
            'Eliminado!',
            'La category ha sido eliminado con éxito.',
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
        this.modal = 0;
        this.tituloModal = '';
        this.name = '';
        this.description = '';
        this.errorCategory=0;

      },
      abrirModal (modelo, accion, data =[]){
        switch(modelo){
          case "category":{
            switch(accion){
              case 'registrar':{
                this.modal = 1;
                this.tituloModal = 'Registrar Categoría';
                this.empresa_id = 0;
                this.name = '';
                this.description = '';
                this.tipoAccion = 1;
                break;
              }
              case 'actualizar':{
                this.modal = 1;
                this.tituloModal = 'Actualizar Categoría';
                this.category_id = data['id'];
                this.name = data['name'];
                this.description = data['description'];
                this.tipoAccion = 2;
                break;
              }
            }
          }
        }
      }
    },
    mounted(){
      /*console.log(this.$empresa_id);*/
      this.listarCategory(this.$empresa_id, 1, this.search, this.criteria);
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