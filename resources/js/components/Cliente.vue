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
          <button type="button" @click="abrirModal('persona', 'registrar')" class="btn btn-secondary" >
              <i class="icon-plus"></i>&nbsp;Nuevo
          </button>
        </div>
        <div class="card-body">
          <div class="form-group row">
            <div class="col-md-6">
              <div class="input-group">
                <select class="form-control col-md-3" v-model="criteria">
                  <option value="nombre">Nombre</option>
                  <option value="num_documento">Documento</option>
                  <option value="phone">Telefono</option>
                  <option value="email">Email</option>
                </select>
                <input type="text"  v-model="search" @keyup.enter="listarPersona(1, search, criteria)" class="form-control" placeholder="Texto a buscar">
                <button type="submit" @click="listarPersona(1, search, criteria)" class="btn btn-primary"><i class="fa fa-search"></i> Buscar</button>
              </div>
            </div>
          </div>
          <table class="table table-bordered table-striped table-sm">
            <thead>
              <tr>
                <th>Opciones</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Documento</th>
                <th>Telefono</th>
                <th>Direccíon</th>
                <th>Email</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="persona in arrayPersona" :key="persona.id">
                <td>
                  <button type="button" @click="abrirModal('persona', 'actualizar', persona)" class="btn btn-warning btn-sm">
                    <i class="icon-pencil"></i>
                  </button> &nbsp;
                </td>
                <td>{{persona.nombre}}</td>
                <td>{{persona.tipo_documento}}</td>
                <td>{{persona.num_documento}}</td>
                <td>{{persona.phone}}</td>
                <td>{{persona.address}}</td>
                <td>{{persona.email}}</td>
                <td>
                  <button type="button" class="btn btn-danger btn-sm" @click="eliminarPersona(persona.id)">
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
                  <input type="text" v-model="nombre" class="form-control" placeholder="Nombre del persona">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Tipo Documento</label>
                <div class="col-md-9">
                  <select class="form-control" v-model="tipo_documento">
                    <option value="DNI">DNI</option>
                    <option value="Cedula">Cedula</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Número Documento</label>
                <div class="col-md-9">
                  <input type="text" v-model="num_documento" class="form-control" placeholder="Número de Documento">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Telefóno</label>
                <div class="col-md-9">
                  <input type="text" v-model="phone" class="form-control" placeholder="Telefono ">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="email-input">Direccíon</label>
                <div class="col-md-9">
                  <input type="text" v-model="address" class="form-control" placeholder="Ingrese Direccíon">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-md-3 form-control-label" for="email-input">Email</label>
                <div class="col-md-9">
                  <input type="email" v-model="email" class="form-control" placeholder="Ingrese Email">
                </div>
              </div>
              <div v-show="errorPersona" class="form-group">
                <div class="row error text-danger">
                  <div v-for="error in errorMostrarMsjPersona" :key="error">{{error}}</div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="cerrarModal()">Cerrar</button>
            <button type="button" v-if="tipoAccion==1" class="btn btn-primary" @click="registrarPersona()">Guardar</button>
            <button type="button" v-else class="btn btn-primary" @click="actualizarPersona()">Actualizar</button>
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
        negocio_id: 0,
        persona_id: 0,
        nombre :'',
        tipo_documento :'',
        num_documento :'',
        phone :'',
        address :'',
        email :'',
        arrayPersona : [],
        modal : 0,
        tituloModal : '',
        tipoAccion: 0,
        errorPersona : 0,
        errorMostrarMsjPersona : [],
        pagination : {
          'total' : 0,
          'current_page' : 0,
          'per_page' : 0,
          'last_page' : 0,
          'from' : 0,
          'to' : 0,
        },
        offset : 3,
        criteria : 'nombre',
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
      //listarPersona (negocio_id){
      listarPersona (page, search, criteria){

        let me=this;
        //axios.get('/categoria').then(function (response){
        //var url= '/categoria/'+negocio_id+'?page=' + page + '&search='+ search + '&criteria='+ criteria;
        var url= '/client?page=' + page + '&search='+ search + '&criteria='+ criteria;
        axios.get(url).then(function (response) {
          //'negocio_id' : this.negocio_id,
          var result= response.data;
          me.arrayPersona = result.personas.data;
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
        me.listarPersona(page, search, criteria);
      },
      //registrarPersona (negocio_id){
      registrarPersona (){
        
        if (this.validarPersona()) {
          return;
        }

        let me=this;
        //axios.post('/categoria/registrar/'+negocio_id,{
        axios.post('/client/registrar',{
          'negocio_id' : this.negocio_id,
          'nombre' : this.nombre,
          'tipo_documento' :this.tipo_documento,
          'num_documento' :this.num_documento,
          'phone' :this.phone,
          'address' :this.address,
          'email' :this.email,
        }).then(function (response){
          me.cerrarModal();
          //me.listarPersona();
          me.listarPersona(1, '', 'nombre');
        })
        .catch(function (error){
          console.log(error);
        });
      },
      actualizarPersona (id){
        
        if (this.validarPersona()) {
          return;
        }

        let me=this;
        axios.put('/client/actualizar/'+id,{
          'id' : this.persona_id,
          'nombre' : this.nombre,
          'tipo_documento' :this.tipo_documento,
          'num_documento' :this.num_documento,
          'phone' :this.phone,
          'address' :this.address,
          'email' :this.email,
        }).then(function (response){
          me.cerrarModal();
          //me.listarPersona();
          me.listarPersona(1, '', 'nombre');
        })
        .catch(function (error){
          console.log(error);
        });
      },
      validarPersona(){
        this.errorPersona = 0;
        this.errorMostrarMsjPersona = [];

        if (!this.nombre) this.errorMostrarMsjPersona.push("El nombre de la persona no puede estar vacío.");
        if (this.errorMostrarMsjPersona.length) this.errorPersona = 1;

        return this.errorPersona;
      },
      eliminarPersona(id){
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

          axios.delete('/client/eliminar/'+id,{
            'id': id
          }).then(function (response) {
            me.listarPersona(1, '', 'nombre');
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
        this.nombre = '';
        this.tipo_documento = 'DNI';
        this.num_documento = '';
        this.phone = '';
        this.address = '';
        this.email = '';
        this.errorPersona=0;
      },
      abrirModal (modelo, accion, data =[]){
        switch(modelo){
          case "persona":{
            switch(accion){
              case 'registrar':{
                this.modal = 1;
                this.tituloModal = 'Registrar Cliente';
                this.negocio_id = 3;
                this.nombre = '';
                this.tipo_documento = 'DNI';
                this.num_documento = '';
                this.phone = '';
                this.address = '';
                this.email = '';
                this.tipoAccion = 1;
                break;
              }
              case 'actualizar':{
                this.modal = 1;
                this.tituloModal = 'Actualizar Cliente';
                this.persona_id = data['id'];
                this.nombre = data['nombre'];
                this.tipo_documento = data['tipo_documento'];
                this.num_documento = data['num_documento'];
                this.phone = data['phone'];
                this.address = data['address'];
                this.email = data['email'];
                this.tipoAccion = 2;
                break;
              }
            }
          }
        }
      }
    },
    mounted(){
      //this.listarPersona(negocio_id);
      this.listarPersona(1, this.search, this.criteria);
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