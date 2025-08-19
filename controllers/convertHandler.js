function ConvertHandler() {

  this.getNum = function (input) {
    const m = input.match(/^[\d.\/]+/);
    if (!m) return 1;
    const numStr = m[0];

    if (numStr.includes('/')) {
      const parts = numStr.split('/');
      if (parts.length !== 2) throw new Error('invalid number');
      const a = parseFloat(parts[0]), b = parseFloat(parts[1]);
      if (Number.isNaN(a) || Number.isNaN(b)) throw new Error('invalid number');
      return a / b;
    }

    const n = parseFloat(numStr);
    if (Number.isNaN(n)) throw new Error('invalid number');
    return n;
  };

  this.getUnit = function (input) {
    const m = input.match(/[a-zA-Z]+$/);
    if (!m) throw new Error('invalid unit');
    const u = m[0].toLowerCase();
    const valid = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!valid.includes(u)) throw new Error('invalid unit');
    return u;
  };

  this.getReturnUnit = function (initUnit) {
    const map = {
      gal: 'l',
      l: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs',
    };
    const r = map[initUnit];
    if (!r) throw new Error('invalid unit');
    return r;
  };

  this.spellOutUnit = function (unit) {
    const names = {
      gal: 'gallons',
      l: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms',
    };
    return names[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        throw new Error("invalid unit");
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
