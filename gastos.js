var express = require("express");
var router = express.Router();

/* GET home */
router.get('/', function (req, res) {
    let fecha = req.query.fecha;
    let fechaDesde = req.query.fechaDesde;
    let fechaHasta = req.query.fechaHasta;

    // if (!fecha) {
    //     res.send('listado de gastos');
    // }
    // res.send('vino cono parametro de fecha');

    let collection = req.app.locals.collection;
    collection.find({}).toArray(function (err, result) {
        if (err)
            throw err;

        res.send(result);
    });
});

/* GET /gastos/[idgasto] */
router.get('/:id', function (req, res) {
    let id = req.params.id;

    let collection = req.app.locals.collection;
    collection.find({ "id": id }).toArray(function (err, result) {
        if (err)
            throw err;

        res.send(result);
    });
});

/* GET */
router.get('/tag/:tag', function (req, res) {
    let tag = req.params.tag

    let collection = req.app.locals.collection;
    collection.find({ "tag": {$regex : tag} }).toArray(function (err, result) {
        // collection.find({ "tag": {$elemMatch: {"tag": {$regex : tag}}} }).toArray(function (err, result) {
        if (err)
            throw err;

        res.send(result);
    });
});

/* POST */
router.post('/', function (req, res, next) {
    let newGasto = {
        id: req.body.id,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        fecha: req.body.fecha,
        tag: req.body.tag
    };

    let collection = req.app.locals.collection;
    collection.insertOne(newGasto, function (err, result) {
        if (err)
            throw err;

        res.send(result);
    });
});

/* PUT */
router.put('/:id', function (req, res) {
    let id = req.params.id;

    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let fecha = req.body.fecha;
    let tag = req.body.tag;
    
    let collection = req.app.locals.collection;
    collection.updateOne({ id: id }, { $set: { descripcion: descripcion, precio: precio, fecha: fecha, tag: tag } }, {}, function (err, result) {
        if (err)
            throw err;
        res.send(result);
    });
});

/* DELETE */
router.delete('/:ids', function (req, res) {
    let ids = req.params.ids.split(',');

    //console.log(ids);
    let collection = req.app.locals.collection;

    // borro uno o varios
    collection.deleteMany({ id: { $in: ids } }, function (err, result) {
        if (err)
            throw err;
        res.send(result);
    });

    // borro uno
    // collection.deleteOne({ id: id }, function (err, result) {
    //     if (err)
    //         throw err;
    //     res.send(result);
    // });
});

module.exports = router;