const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('convertHandler should correctly read a whole number input', function () {
        const input = "32L";
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 32, 'Should read whole number 32');
    });

    test('convertHandler should correctly read a decimal number input', function () {
        const input = "3.2L";
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 3.2, 'Should read decimal number 3.2');
    });
    test('convertHandler should correctly read a fractional input', function () {
        const input = "1/2L";
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 0.5, 'Should read decimal number 0.5 from fraction 1/2');
    });
    test('convertHandler should correctly read a fractional input with a decimal', function () {
        const input = "1.5/2L";
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 0.75, 'Should read decimal number 0.75 from fraction with decimal 1.5/2');
    });
    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
        assert.throws(() => convertHandler.getNum("3/2/3L"), /invalid number/);
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
        const input = "L";
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 1, 'Should read 1 as default number when no numerical input is provided');
    });
    test('convertHandler should correctly read each valid input unit', function () {
        const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
        units.forEach(unit => {
            const input = `5${unit}`;
            const result = convertHandler.getUnit(input);
            assert.strictEqual(result, unit, `Expected ${unit} but got ${result}`);
        });
    });
    test('convertHandler should correctly return an error for an invalid input unit', function () {
        assert.throws(() => convertHandler.getUnit("32g"), /invalid unit/);
    });
    test('convertHandler should return the correct return unit for each valid input unit', function () {
        const inputOutput = {
            'gal': 'L',
            'L': 'gal',
            'mi': 'km',
            'km': 'mi',
            'lbs': 'kg',
            'kg': 'lbs'
        };
        for (let input in inputOutput) {
            const expected = inputOutput[input];
            const result = convertHandler.getReturnUnit(input);
            assert.strictEqual(result, expected, `For input unit ${input}, expected return unit ${expected} but got ${result}`);
        }
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
        const names = {
            gal: 'gallons',
            L: 'liters',
            mi: 'miles',
            km: 'kilometers',
            lbs: 'pounds',
            kg: 'kilograms',
        };
        for (let name in names) {
            const expected = names[name];
            const result = convertHandler.spellOutUnit(name);
            assert.strictEqual(result, expected, `For input unit ${name}, expected return unit ${expected} but got ${result}`);
        }
    });
    test('convertHandler should correctly convert gal to L', function () {
        const inputNum = 1;
        const inputUnit = 'gal';
        const expected = 3.78541;
        const result = convertHandler.convert(inputNum, inputUnit);
        assert.approximately(result, expected, 0.00001, 'Should convert 1 gal to approximately 3.78541 l');
    });
    test('convertHandler should correctly convert L to gal', function () {
        const inputNum = 1;
        const inputUnit = 'L';
        const expected = 0.26417;
        const result = convertHandler.convert(inputNum, inputUnit);
        assert.approximately(result, expected, 0.00001, 'Should convert 1 L to approximately 0.26417 gal');
    });
    test('convertHandler should correctly convert mi to km', function () {
        const inputNum = 1;
        const inputUnit = 'mi';
        const expected = 1.60934;
        const result = convertHandler.convert(inputNum, inputUnit);
        assert.approximately(result, expected, 0.00001, 'Should convert 1 mi to approximately 1.60934 km');
    });
    test('convertHandler should correctly convert km to mi', function () {
        const inputNum = 1;
        const inputUnit = 'km';
        const expected = 0.62137;
        const result = convertHandler.convert(inputNum, inputUnit);
        assert.approximately(result, expected, 0.00001, 'Should convert 1 km to approximately 0.62137 mi');
    });
    test('convertHandler should correctly convert lbs to kg', function () {
        const inputNum = 1;
        const inputUnit = 'lbs';
        const expected = 0.45359;
        const result = convertHandler.convert(inputNum, inputUnit);
        assert.approximately(result, expected, 0.00001, 'Should convert 1 lbs to approximately 0.45359 kg');
    });
    test('convertHandler should correctly convert kg to lbs', function () {
        const inputNum = 1;
        const inputUnit = 'kg';
        const expected = 2.20462;
        const result = convertHandler.convert(inputNum, inputUnit);
        assert.approximately(result, expected, 0.00001, 'Should convert 1 kg to approximately 0.45359 lbs');
    });
});