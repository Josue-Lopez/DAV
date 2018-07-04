module.exports = function (Facturascomp)
{
   var app = require('../../server/server');
   Facturascomp.ingresarFactura = function(codFactcomp, numeroFactcomp, codProveedor, fechaEmision, observacion, subtotal, iva, descuento, total, terminoPago, estado, detalle, cb)
   {

    var response = 'NULL';

    Facturascomp.create({'codigoFact' : 0,
        'codFactcomp' : codFactcomp,
        'numeroFactcomp' : numeroFactcomp,
        'codProveedor' : codProveedor,
        'fechaEmision' : fechaEmision,
        'observacion' : observacion,
        'subtotal' : subtotal,
        'iva' : iva,
        'descuento' : descuento,
        'total' : total,
        'terminoPago' : terminoPago,
        'estado' : estado
    }, function(err, facturacomp){
        if(err != null)
            response = 'Error : ' + err.message;
        else
        {
            detalle = JSON.parse(detalle);
            detalle.forEach(d => {
                d['codFacturacomp'] = facturacomp.codigoFact;
                d['codDetallefactcomp'] = 0;
                console.log(d);
                app.models.DetalleFacturacomp.create(d, function(err, models){
                    if(err)
                        response = 'Error : ' + err.message;
                    else
                        console.log('Detalle ingresado en factura : ' + facturacomp.codigoFact);
                })
            });
            response = 'OK'
            cb(null, response);
        }
    });
   
    };

   Facturascomp.remoteMethod(
       'ingresarFactura', {
           accepts: [
             { arg: 'codFactcomp', type: 'string' },
             { arg: 'numeroFactcomp', type: 'string' },
             { arg: 'codProveedor', type: 'string' },
             { arg: 'fechaEmision', type: 'date' },
             { arg: 'observacion', type: 'string' },
             { arg: 'subtotal', type: 'number' },
             { arg: 'iva', type: 'number' },
             { arg: 'descuento', type: 'number' },
             { arg: 'total', type: 'number' },
             { arg: 'terminoPago', type: 'number' },
             { arg: 'estado', type: 'number' },
             { arg: 'detalle', type: 'string', description: 'Arreglo JSON de Detalle Factura Compra' }
           ],
           http: {
               path: '/ingresarFactura',
               verb: 'POST'
           },
           returns: {
               arg: 'Mensaje',
               type: 'string'
           }
        }
    );
};