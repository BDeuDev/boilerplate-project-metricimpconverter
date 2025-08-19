'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
 let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input || '';

    let initNum, initUnit;
    let numInvalid = false, unitInvalid = false;

    // Validar número y unidad por separado
    try { initNum = convertHandler.getNum(input); } 
    catch (e) { numInvalid = true; }

    try { initUnit = convertHandler.getUnit(input); } 
    catch (e) { unitInvalid = true; }

    // Respuestas según el requisito 9
    if (numInvalid && unitInvalid) return res.send('invalid number and unit');
    if (numInvalid) return res.send('invalid number');
    if (unitInvalid) return res.send('invalid unit');

    // Conversión válida
    const returnNum = convertHandler.convert(initNum, initUnit);     // -> 5 decimales
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });

};
