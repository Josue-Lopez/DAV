var usuariosScript = (function() {

    return {
      ocultarCrear: function() {
        $("#crearModal").modal('hide');
      },
      mostrarEditar: function(id) {
        $("#editarModal").modal('show');
      },
      ocultaEditar: function() {
        $("#editarModal").modal('hide');
      }
    } 
  })(usuariosScript||{})