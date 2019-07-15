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
          <i class="fa fa-align-justify"></i> Ciudad
          <button type="button" @click="abrirModal('city', 'registrar')" class="btn btn-secondary" >
              <i class="icon-plus"></i>&nbsp;Nuevo
          </button>
        </div>
        <div class="card-body">
          <div class="form-group row">
            <div class="col-md-6">
              <div class="input-group">
                <select class="form-control col-md-3" v-model="criteria">
                  <option value="city">Ciudad</option>
                  <option value="state">Provincia</option>
                </select>
                <input type="text"  v-model="search" @keyup.enter="listarCity(1, search, criteria)" class="form-control" placeholder="Texto a buscar">
                <button type="submit" @click="listarCity(1, search, criteria)" class="btn btn-primary"><i class="fa fa-search"></i> Buscar</button>
              </div>
            </div>
          </div>
          <table class="table table-bordered table-striped table-sm">
            <thead>
              <tr>
                <th>Opciones</th>
                <th>Ciudad</th>
                <th>Provincia</th>
                <th>Codigo Postal</th>
                <th>Latitud</th>
                <th>Longitud</th>
                <th>Pais</th>
                <th>Estado</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="city in arrayCity" :key="city.id">
                <td>
                  <button type="button" @click="abrirModal('city', 'actualizar', city)" class="btn btn-warning btn-sm">
                    <i class="icon-pencil"></i>
                  </button> &nbsp;
                  <template v-if="city.status">
                    <button type="button" class="btn btn-success btn-sm" @click="desactivarCity(city.id)">
                    <i class="icon-check"></i>
                  </button>
                  </template>
                  <template v-else>
                    <button type="button" class="btn btn-danger btn-sm" @click="activarCity(city.id)">
                    <i class="icon-close"></i>
                  </button>
                  </template>
                </td>
                <td>{{city.city}}</td>
                <td>{{city.state}}</td>
                <td>{{city.zipcode}}</td>
                <td>{{city.latitud}}</td>
                <td>{{city.longitud}}</td>
                <td>{{city.country}}</td>
                <td>
                  <div v-if="city.status">
                    <span class="badge badge-success">Activado</span>
                  </div>
                  <div v-else>
                    <span class="badge badge-danger">desactivado</span>
                  </div>
                </td>
                <td>
                  <button type="button" class="btn btn-danger btn-sm" @click="eliminarCity(city.id)">
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
                <label class="col-md-3 form-control-label" for="text-input">Ciudad</label>
                <div class="col-md-9">
                  <input type="text" v-model="city" class="form-control" placeholder="ciudad">
                  <span class="help-block">(*) Ingrese Ciudad</span>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="email-input">Provincia</label>
                <div class="col-md-9">
                  <input type="text" v-model="state" class="form-control" placeholder="Provincia">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="email-input">Codigo Postal</label>
                <div class="col-md-9">
                  <input type="text" v-model="zipcode" class="form-control" placeholder="Codigo Postal">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="email-input">Latitud</label>
                <div class="col-md-9">
                  <input type="text" v-model="latitud" class="form-control" placeholder="Latitud">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="email-input">Longitud</label>
                <div class="col-md-9">
                  <input type="text" v-model="longitud" class="form-control" placeholder="Longitud">
                </div>
              </div>
              <div v-show="errorCity" class="form-group">
                <div class="row error text-danger">
                  <div v-for="error in errorMostrarMsjCity" :key="error">{{error}}</div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
            <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarCity()">Guardar</button>
            <button type="button" v-else class="btn btn-primary" @click="actualizarCity()">Actualizar</button>
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
        city_id :'',
        city :'',
        state :'',
        zipcode :'',
        latitud :'',
        longitud :'',
        arrayCity : [],
        modal : 0,
        tituloModal : '',
        tipoAccion: 0,
        errorCity : 0,
        errorMostrarMsjCity : [],
        pagination : {
          'total' : 0,
          'current_page' : 0,
          'per_page' : 0,
          'last_page' : 0,
          'from' : 0,
          'to' : 0,
        },
        offset : 3,
        criteria : 'city',
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
      listarCity (page, search, criteria){

        let me=this;
        var url= '/admin/city?page=' + page + '&search='+ search + '&criteria='+ criteria;
        axios.get(url).then(function (response) {
          var result= response.data;
          me.arrayCity = result.cities.data;
          me.pagination= result.pagination;
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
        me.listarCity(page, search, criteria);
      },
      registrarCity (){
        
        if (this.validarCity()) {
          return;
        }

        let me=this;
        axios.post('/admin/city/registrar',{
          'city' : this.city,
          'state' : this.state,
          'zipcode' : this.zipcode,
          'latitud' : this.latitud,
          'longitud' : this.longitud,
        }).then(function (response){
          me.cerrarModal();
          me.listarCity(1, '', 'city');
        })
        .catch(function (error){
          console.log(error);
        });
      },
      actualizarCity (id){
        
        if (this.validarCity()) {
          return;
        }

        let me=this;
        axios.put('/admin/city/actualizar/'+id,{
          'id' : this.city_id,
          'city' : this.city,
          'state' : this.state,
          'zipcode' : this.zipcode,
          'latitud' : this.latitud,
          'longitud' : this.longitud,
        }).then(function (response){
          me.cerrarModal();
          me.listarCity(1, '', 'city');
        })
        .catch(function (error){
          console.log(error);
        });
      },
      validarCity(){
        this.errorCity = 0;
        this.errorMostrarMsjCity = [];

        if (!this.city) this.errorMostrarMsjCity.push("El nombre de ciudad no puede estar vacío.");
        if (this.errorMostrarMsjCity.length) this.errorCity = 1;

        return this.errorCity;
      },
      desactivarCity(id){
       swal({
        title: 'Esta seguro de desactivar este ciudad?',
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
          axios.put('/admin/city/desactivar/'+id,{
            /*'id': id*/
          }).then(function (response) {
            me.listarCity(1, '', 'city');
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
      activarCity(id){
        swal({
          title: 'Esta seguro de activar este ciudad?',
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

          axios.put('/admin/city/activar/'+id,{
            'id': id
          }).then(function (response) {
            me.listarCity(1, '', 'city');
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
      eliminarCity(id){
        swal({
          title: 'Esta seguro de borrar este ciudad?',
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

          axios.delete('/admin/city/eliminar/'+id,{
            'id': id
          }).then(function (response) {
            me.listarCity(1, '', 'city');
            swal(
            'Eliminado!',
            'La Ciudad ha sido eliminado con éxito.',
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
        this.city = '';
        this.state = '';
        this.zipcode = '';
        this.latitud = '';
        this.longitud = '';
        this.errorCity=0;

      },
      abrirModal (modelo, accion, data =[]){
        switch(modelo){
          case "city":{
            switch(accion){
              case 'registrar':{
                this.modal = 1;
                this.tituloModal = 'Registrar ciudad';
                this.city = '';
                this.state = '';
                this.zipcode = '';
                this.latitud = '';
                this.longitud = '';
                this.tipoAccion = 1;
                break;
              }
              case 'actualizar':{
                this.modal = 1;
                this.tituloModal = 'Actualizar ciudad';
                this.city_id = data['id'];
                this.city = data['city'];
                this.state = data['state'];
                this.zipcode = data['zipcode'];
                this.latitud = data['latitud'];
                this.longitud = data['longitud'];
                this.tipoAccion = 2;
                break;
              }
            }
          }
        }
      }
    },
    mounted(){
      this.listarCity(1, this.search, this.criteria);
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