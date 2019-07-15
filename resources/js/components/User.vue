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
          <i class="fa fa-align-justify"></i> Clientes
          <button type="button" @click="abrirModal('user', 'registrar')" class="btn btn-secondary" >
              <i class="icon-plus"></i>&nbsp;Nuevo
          </button>
        </div>
        <div class="card-body">
          <div class="form-group row">
            <div class="col-md-6">
              <div class="input-group">
                <select class="form-control col-md-3" v-model="criteria">
                  <option value="name">Nombre</option>
                  <option value="email">Email</option>
                </select>
                <input type="text"  v-model="search" @keyup.enter="listarUser(1, search, criteria)" class="form-control" placeholder="Texto a buscar">
                <button type="submit" @click="listarUser(1, search, criteria)" class="btn btn-primary"><i class="fa fa-search"></i> Buscar</button>
              </div>
            </div>
          </div>
          <table class="table table-bordered table-striped table-sm">
            <thead>
              <tr>
                <th>Opciones</th>
                <th>Numero</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in arrayUser" :key="user.id">
                <td>
                  <button type="button" @click="abrirModal('user', 'actualizar', user)" class="btn btn-warning btn-sm">
                    <i class="icon-pencil"></i>
                  </button> &nbsp;
                  <template v-if="user.status">
                    <button type="button" class="btn btn-success btn-sm" @click="desactivarUser(user.id)">
                    <i class="icon-check"></i>
                  </button>
                  </template>
                  <template v-else>
                    <button type="button" class="btn btn-danger btn-sm" @click="activarUser(user.id)">
                    <i class="icon-close"></i>
                  </button>
                  </template>
                </td>
                <td>{{user.id}}</td>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>
                  <div v-if="user.status">
                    <span class="badge badge-success">Activado</span>
                  </div>
                  <div v-else>
                    <span class="badge badge-danger">desactivado</span>
                  </div>
                </td>
                <td>
                  <button type="button" class="btn btn-danger btn-sm" @click="eliminarUser(user.id)">
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
                <label class="col-md-3 form-control-label" for="text-input">Nombre</label>
                <div class="col-md-9">
                  <input type="text" v-model="name" class="form-control" placeholder="Nombre del persona">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Email</label>
                <div class="col-md-9">
                  <input type="text" v-model="email" class="form-control" placeholder="Email">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Password</label>
                <div class="col-md-9">
                  <input type="password" v-model="password" class="form-control" placeholder="Password">
                  <span class="text-success">La contraseña debe tener al menos 6 caracteres(*)</span>
                </div>
              </div>
              <div v-show="errorUser" class="form-group">
                <div class="row error text-danger">
                  <div v-for="error in errorMostrarMsjUser" :key="error">{{error}}</div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
            <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarUser()">Guardar</button>
            <button type="button" v-else class="btn btn-primary" @click="actualizarUser()">Actualizar</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
  export default {
    data(){
      return {
        user_id: 0,
        name :'',
        email :'',
        password :'',
        arrayUser : [],
        modal : 0,
        tituloModal : '',
        tipoAccion: 0,
        errorUser : 0,
        errorMostrarMsjUser : [],
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
      listarUser (page, search, criteria){
        let me=this;

        var url= '/admin/user?page=' + page + '&search='+ search + '&criteria='+ criteria;
        axios.get(url).then(function (response) {
          var result= response.data;
          me.arrayUser = result.users.data;
          me.pagination= result.pagination;
        })
        .catch(function (error){
          console.log(error);
        });
      },
      selectRole (){
        let me=this;

        var url= '/admin/role/select';
        axios.get(url).then(function (response) {
          var result= response.data;
          me.arrayRole = result.roles;
        })
        .catch(function (error){
          console.log(error);
        });
      },
      changePage(page, search, criteria){
        let me = this;
        //Actualiza la página actual
        me.pagination.current_page = page;
        //Envia la petición para visualizar la data de esa página
        me.listarUser(page, search, criteria);
      },
      registrarUser (){
        
        if (this.validarUser()) {
          return;
        }

        let me=this;
        axios.post('/admin/user/registrar',{
          'name' : this.name,
          'email' :this.email,
          'password' :this.password,
        }).then(function (response){
          me.cerrarModal();
          me.listarUser(1, '', 'name');
        })
        .catch(function (error){
          console.log(error);
        });
      },
      actualizarUser (id){
        
        if (this.validarUser()) {
          return;
        }

        let me=this;
        axios.put('/admin/user/actualizar/'+id,{
          'id' : this.user_id,
          'name' : this.name,
          'email' :this.email,
          'password' :this.password,
        }).then(function (response){
          me.cerrarModal();
          me.listarUser(1, '', 'name');
        })
        .catch(function (error){
          console.log(error);
        });
      },
      validarUser(){
        this.errorUser = 0;
        this.errorMostrarMsjUser = [];

        if (!this.name) this.errorMostrarMsjUser.push("El nombre del usuario no puede estar vacío.");
        if (!this.email) this.errorMostrarMsjUser.push("El email del usuario no puede estar vacío.");
        if (!this.password) this.errorMostrarMsjUser.push("El password del usuario no puede estar vacío.");
        if (this.errorMostrarMsjUser.length) this.errorUser = 1;

        return this.errorUser;
      },
      desactivarUser(id){
       swal({
        title: 'Esta seguro de desactivar esta usuario?',
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

          /*var id = this.id;*/
          axios.put('/admin/user/desactivar/'+id,{
            /*'id': id*/
          }).then(function (response) {
            me.listarUser(1, '', 'name');
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
      activarUser(id){
        swal({
          title: 'Esta seguro de activar esta usuario?',
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

          axios.put('/admin/user/activar/'+id,{
            'id': id
          }).then(function (response) {
            me.listarUser(1, '', 'name');
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
      eliminarUser(id){
        swal({
          title: 'Esta seguro de borrar esta persona?',
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

          axios.delete('/admin/user/eliminar/'+id,{
            'id': id
          }).then(function (response) {
            me.listarUser(1, '', 'name');
            swal(
            'Eliminado!',
            'La persona ha sido eliminado con éxito.',
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
        this.email = '';
        this.password = '';
        this.errorUser=0;
      },
      abrirModal (modelo, accion, data =[]){
        this.selectRole();
        switch(modelo){
          case "user":{
            switch(accion){
              case 'registrar':{
                this.modal = 1;
                this.tituloModal = 'Registrar Empresa o Usuario';
                this.name = '';
                this.email = '';
                this.password = '';
                this.tipoAccion = 1;
                break;
              }
              case 'actualizar':{
                this.modal = 1;
                this.tituloModal = 'Actualizar Empresa o Usuario';
                this.user_id = data['id'];
                this.name = data['name'];
                this.email = data['email'];
                this.password = data['password'];
                this.tipoAccion = 2;
                break;
              }
            }
          }
        }
      }
    },
    mounted(){
      this.listarUser(1, this.search, this.criteria);
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