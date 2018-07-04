module.exports = function (Usuarios)
{
   var app = require('../../server/server');
  
   // Crear rolemapping
    Usuarios.observe('after save', function(ctx, next)
    {
        console.log("Usuario nuevo creado, haciendo role mapping...");
        if(ctx.instance)
        {
            console.log("Usuario : " + ctx.instance.nombre);
            app.models.RoleMapping.create({
                principalType : "USER",
                principalId : ctx.instance.codUsuario,
                roleId: ctx.instance.codTipousuario
            }, function(err, roleMapping)
            {
                if(err)
                    console.log(err);
                else
                {
                    console.log("Roles asignados correctamente");
                }
            });

        }
        next();
    });
}