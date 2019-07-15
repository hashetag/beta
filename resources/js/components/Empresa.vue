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
          <i class="fa fa-align-justify"></i> Empresas
          <button type="button" @click="abrirModal('empresa', 'registrar')" class="btn btn-secondary" >
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
                <input type="text"  v-model="search" @keyup.enter="listarEmpresa(1, search, criteria)" class="form-control" placeholder="Texto a buscar">
                <button type="submit" @click="listarEmpresa(1, search, criteria)" class="btn btn-primary"><i class="fa fa-search"></i> Buscar</button>
              </div>
            </div>
          </div>
          <table class="table table-bordered table-striped table-sm">
            <thead>
              <tr>
                <th>Opciones</th>
                <th>Categoria</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>CUIT</th>
                <th>Perfil</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Horario</th>
                <th>Horario 2</th>
                <th>Compra Minima</th>
                <th>Tipo </th>
                <th>Ciudad</th>
                <th>Latitud</th>
                <th>Longitud</th>
                <th>website</th>
                <th>Estado</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="empresa in arrayEmpresa" :key="empresa.id">
                <td>
                  <button type="button" @click="abrirModal('empresa', 'actualizar', empresa)" class="btn btn-warning btn-sm">
                    <i class="icon-pencil"></i>
                  </button> &nbsp;
                  <template v-if="empresa.status">
                    <button type="button" class="btn btn-success btn-sm" @click="desactivarEmpresa(empresa.id)">
                    <i class="icon-check"></i>
                  </button>
                  </template>
                  <template v-else>
                    <button type="button" class="btn btn-danger btn-sm" @click="activarEmpresa(empresa.id)">
                    <i class="icon-close"></i>
                  </button>
                  </template>
                </td>
                <td>{{empresa.groupe}}</td>
                <td>{{empresa.name}}</td>
                <td>{{empresa.email}}</td>
                <td>{{empresa.cuit}}</td>
                <td><img v-bind:src="'img_empresa/'+empresa.avatar" class="img-responsive" height="20" width="20"></td>
                <td>{{empresa.phone}}</td>
                <td>{{empresa.address}}</td>
                <td>{{empresa.openhours}}</td>
                <td>{{empresa.openhours_2}}</td>
                <td>{{empresa.minimum}}</td>
                <td>{{empresa.type}}</td>
                <td>{{empresa.city}}</td>
                <td>{{empresa.latitud}}</td>
                <td>{{empresa.longitud}}</td>
                <td>{{empresa.website}}</td>
                <td>
                  <div v-if="empresa.status">
                    <span class="badge badge-success">Activado</span>
                  </div>
                  <div v-else>
                    <span class="badge badge-danger">desactivado</span>
                  </div>
                </td>
                <td>
                  <button type="button" class="btn btn-danger btn-sm" @click="eliminarEmpresa(empresa.id)">
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
                <label class="col-md-3 form-control-label" for="text-input">Categoria de Empresa</label>
                <div class="col-md-9">
                  <select class="form-control" v-model="groupe_id">
                    <option value="0" >Seleccione Categoria</option>
                    <option v-for="groupe in arrayGroupe" :key="groupe.id" :value="groupe.id">{{groupe.name}}</option>
                  </select>
                </div>
              </div>
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
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">CUIT</label>
                <div class="col-md-9">
                  <input type="text" v-model="cuit" class="form-control" placeholder="CUIT">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-9 form-control-label" for="email-input"><b>logo: (*)</b></label>
                <div class="col-md-9">
                  <img :src="avatar" class="img-responsive" height="30" width="30">
                  <input type="file" @change="onImageChange" class="form-control">
                </div>
              </div> 
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Telefono</label>
                <div class="col-md-9">
                  <input type="text" v-model="phone" class="form-control" placeholder="Telefono">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Direccion</label>
                <div class="col-md-9">
                  <input type="text" v-model="address" class="form-control" placeholder="Direccion">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Horario</label>
                <div class="col-md-9">
                  <input type="text" v-model="openhours" class="form-control" placeholder="Horario">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Horario 2</label>
                <div class="col-md-9">
                  <input type="text" v-model="openhours_2" class="form-control" placeholder="Horario 2">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Compra Minima</label>
                <div class="col-md-9">
                  <input type="text" v-model="minimum" class="form-control" placeholder="Compra Minima">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Tipo de Empresa</label>
                <div class="col-md-9">
                  <select class="form-control" v-model="type_id">
                    <option value="0" >Seleccione Tipo</option>
                    <option v-for="type in arrayType" :key="type.id" :value="type.id">{{type.name}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Ciudad donde esta la Empresa</label>
                <div class="col-md-9">
                  <select class="form-control" v-model="city_id">
                    <option value="0" >Seleccione Ciudad</option>
                    <option v-for="city in arrayCity" :key="city.id" :value="city.id">{{city.city}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Website</label>
                <div class="col-md-9">
                  <input type="text" v-model="website" class="form-control" placeholder="Website">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Latitud</label>
                <div class="col-md-9">
                  <input type="text" v-model="latitud" class="form-control" placeholder="Latitud">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Longitud</label>
                <div class="col-md-9">
                  <input type="text" v-model="longitud" class="form-control" placeholder="Longitud">
                </div>
              </div>
              <div v-show="errorEmpresa" class="form-group">
                <div class="row error text-danger">
                  <div v-for="error in errorMostrarMsjEmpresa" :key="error">{{error}}</div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
            <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarEmpresa()">Guardar</button>
            <button type="button" v-else class="btn btn-primary" @click="actualizarEmpresa()">Actualizar</button>
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
        empresa_id: 0,
        groupe_id: 0,
        groupe: 0,
        type_id: 0,
        type: 0,
        city_id: 0,
        city: 0,
        name :'',
        email :'',
        password :'',
        cuit :'',
        avatar :'',
        phone :'',
        address :'',
        openhours :'',
        openhours_2 :'',
        website :'',
        minimum :0,
        latitud :0,
        longitud :0,
        slug :0,
        arrayEmpresa : [],
        arrayGroupe : [],
        arrayType : [],
        arrayCity : [],
        modal : 0,
        tituloModal : '',
        tipoAccion: 0,
        errorEmpresa : 0,
        errorMostrarMsjEmpresa : [],
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
      listarEmpresa (page, search, criteria){
        let me=this;

        var url= '/admin/empresa?page=' + page + '&search='+ search + '&criteria='+ criteria;
        axios.get(url).then(function (response) {
          var result= response.data;
          me.arrayEmpresa = result.empresas.data;
          me.pagination= result.pagination;
        })
        .catch(function (error){
          console.log(error);
        });
      },
      selectGroupe (){
        let me=this;

        var url= '/admin/groupe/select';
        axios.get(url).then(function (response) {
          var result= response.data;
          me.arrayGroupe = result.groupes;
        })
        .catch(function (error){
          console.log(error);
        });
      },
      selectType (){
        let me=this;

        var url= '/admin/type/select';
        axios.get(url).then(function (response) {
          var result= response.data;
          me.arrayType = result.types;
        })
        .catch(function (error){
          console.log(error);
        });
      },
      selectCity (){
        let me=this;

        var url= '/admin/city/select';
        axios.get(url).then(function (response) {
          var result= response.data;
          me.arrayCity = result.cities;
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
        me.listarEmpresa(page, search, criteria);
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
          vm.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
      },    
      registrarEmpresa (){
        
        if (this.validarEmpresa()) {
          return;
        }

        let me=this;
        axios.post('/admin/empresa/registrar',{
          'groupe_id' : this.groupe_id,
          'type_id' : this.type_id,
          'city_id' : this.city_id,
          'name' : this.name,
          'email' :this.email,
          'password' :this.password,
          'cuit' :this.cuit,
          'avatar' :this.avatar,
          'phone' :this.phone,
          'address' :this.address,
          'openhours' :this.openhours,
          'openhours_2' :this.openhours_2,
          'minimum' :this.minimum,
          'website' :this.website,
          'latitud' :this.latitud,
          'longitud' :this.longitud
        }).then(function (response){
          me.cerrarModal();
          me.listarEmpresa(1, '', 'name');
        })
        .catch(function (error){
          console.log(error);
        });
      },
      actualizarEmpresa (id){
        
        if (this.validarEmpresa()) {
          return;
        }

        let me=this;
        axios.put('/admin/empresa/actualizar/'+id,{
          'id' : this.empresa_id,
          'groupe_id' : this.groupe_id,
          'type_id' : this.type_id,
          'city_id' : this.city_id,
          'name' : this.name,
          'email' :this.email,
          'password' :this.password,
          'cuit' :this.cuit,
          'avatar' :this.avatar,
          'phone' :this.phone,
          'address' :this.address,
          'openhours' :this.openhours,
          'openhours_2' :this.openhours_2,
          'minimum' :this.minimum,
          'website' :this.website,
          'latitud' :this.latitud,
          'longitud' :this.longitud
        }).then(function (response){
          me.cerrarModal();
          me.listarEmpresa(1, '', 'name');
        })
        .catch(function (error){
          console.log(error);
        });
      },
      validarEmpresa(){
        this.errorEmpresa = 0;
        this.errorMostrarMsjEmpresa = [];

        
        if (!this.name) this.errorMostrarMsjEmpresa.push("El nombre de la empresa no puede estar vacío.");
        if (!this.email) this.errorMostrarMsjEmpresa.push("El email de la empresa  no puede estar vacío.");
        if (!this.password) this.errorMostrarMsjEmpresa.push("El password de la empresa no puede estar vacío.");
        if (this.errorMostrarMsjEmpresa.length) this.errorEmpresa = 1;

        return this.errorEmpresa;
      },
      desactivarEmpresa(id){
       swal({
        title: 'Esta seguro de desactivar esta empresa?',
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
          axios.put('/admin/empresa/desactivar/'+id,{
            /*'id': id*/
          }).then(function (response) {
            me.listarEmpresa(1, '', 'name');
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
      activarEmpresa(id){
        swal({
          title: 'Esta seguro de activar esta empresa?',
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

          axios.put('/admin/empresa/activar/'+id,{
            'id': id
          }).then(function (response) {
            me.listarEmpresa(1, '', 'name');
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
      eliminarEmpresa(id){
        swal({
          title: 'Esta seguro de borrar esta empresa?',
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

          axios.delete('/admin/empresa/eliminar/'+id,{
            'id': id
          }).then(function (response) {
            me.listarEmpresa(1, '', 'name');
            swal(
            'Eliminado!',
            'La empresa ha sido eliminado con éxito.',
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
        this.groupe_id = 0;
        this.type_id = 0;
        this.city_id = 0;
        this.name = '';
        this.email = '';
        this.password = '';
        this.cuit = '';
        this.avatar = '';
        this.phone = '';
        this.address = '';
        this.openhours = '';
        this.openhours_2 = '';
        this.website = '';
        this.minimum = 0;
        this.latitud = 0;
        this.longitud = 0;
        this.errorEmpresa=0;
      },
      abrirModal (modelo, accion, data =[]){
        this.selectGroupe();
        this.selectType();
        this.selectCity();
        switch(modelo){
          case "empresa":{
            switch(accion){
              case 'registrar':{
                this.modal = 1;
                this.tituloModal = 'Registrar Empresa';
                this.groupe_id   = 0;
                this.type_id     = 0;
                this.city_id     = 0;
                this.name        = '';
                this.email       = '';
                this.password    = '';
                this.cuit        = '';
                this.avatar      = '';
                this.phone       = '';
                this.address     = '';
                this.openhours   = '';
                this.openhours_2 = '';
                this.website     = '';
                this.minimum     = 0;
                this.latitud     = 0;
                this.longitud    = 0;
                this.tipoAccion  = 1;
                break;
              }
              case 'actualizar':{
                this.modal = 1;
                this.tituloModal = 'Actualizar Empresa';
                this.empresa_id  = data['id'];
                this.groupe_id   = data['groupe_id'];
                this.type_id     = data['type_id'];
                this.city_id     = data['city_id'];
                this.name        = data['name'];
                this.email       = data['email'];
                this.password    = data['password'];
                this.cuit        = data['cuit'];
                this.avatar      = data['avatar'];
                this.phone       = data['phone'];
                this.address     = data['address'];
                this.openhours   = data['openhours'];
                this.openhours_2 = data['openhours_2'];
                this.website     = data['website'];
                this.minimum     = data['minimum'];
                this.latitud     = data['latitud'];
                this.longitud    = data['longitud'];
                this.tipoAccion  = 2;
                break;
              }
            }
          }
        }
      }
    },
    mounted(){
      this.listarEmpresa(1, this.search, this.criteria);
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