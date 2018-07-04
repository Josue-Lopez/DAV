module.exports = function (Facturasd)
{
   var app = require('../../server/server');
   Facturasd.ingresarFactura = function(codFacturad, numeroFacturad, numeroMiemsoc, fechaEmision, observacion, subtotal, iva, descuento, total, terminoPago, estado, detalle, cb)
   {

    var response = 'NULL';

    Facturasd.create({'codigoFact' : 0,
        'codFacturad' : codFacturad,
        'numeroFacturad' : numeroFacturad,
        'numeroMiemsoc' : numeroMiemsoc,
        'fechaEmision' : fechaEmision,
        'observacion' : observacion,
        'subtotal' : subtotal,
        'iva' : iva,
        'descuento' : descuento,
        'total' : total,
        'terminoPago' : terminoPago,
        'estado' : estado
    }, function(err, facturad){
        if(err != null)
        {
            response = 'Error : ' + err.message;
            cb(null, response);
        }
        else
        {
            detalle = JSON.parse(detalle);
            detalle.forEach(d => {
                d['codFacturad'] = facturad.codigoFact;
                d['codDetallefactd'] = 0;
                console.log(d);
                app.models.DetalleFacturad.create(d, function(err, models){
                    if(err)
                    {
                        response = 'Error : ' + err.message;
                        console.log(err.message);
                    }
                    else
                    {
                        console.log('Detalle ingresado en factura : ' + facturad.codigoFact);
                    }
                })
            });
            response = "OK";
            cb(null, response);
        }
    });
   
    };

   Facturasd.remoteMethod(
       'ingresarFactura', {
           accepts: [
             { arg: 'codFacturad', type: 'string' },
             { arg: 'numeroFacturad', type: 'string' },
             { arg: 'numeroMiemsoc', type: 'string' },
             { arg: 'fechaEmision', type: 'date' },
             { arg: 'observacion', type: 'string' },
             { arg: 'subtotal', type: 'number' },
             { arg: 'iva', type: 'number' },
             { arg: 'descuento', type: 'number' },
             { arg: 'total', type: 'number' },
             { arg: 'terminoPago', type: 'number' },
             { arg: 'estado', type: 'number' },
             { arg: 'detalle', type: 'string', description: 'Arreglo JSON de Detalle Factura Donacion' }
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