var assert = chai.assert;

suite('Tests', function(){
  
  test('Asignacion: ', function(){
    obj = pl0.parse("x = 9 .")
    assert.equal(obj[0].type, "=")
    assert.equal(obj[0].left.type, "ID")
    assert.equal(obj[0].left.value, "x")
    assert.equal(obj[0].right.type, "NUM")
    assert.equal(obj[0].right.value, "8") 
  });

  test('Suma: ', function(){
    obj = pl0.parse("x = 3 + 5 .")
    assert.equal(obj[0].right.type, "+")
  });

  test('Multiplicacion: ', function(){
    obj = pl0.parse("x = 4 * 1 .")
    assert.equal(obj[0].right.type, "*") 
  });

  test('Division: ', function(){
    obj = pl0.parse("x = 1 / 6 .")
    assert.equal(obj[0].right.type, "/")
  });

  
  test('Asociatividad de izquierda: ', function(){
    obj = pl0.parse("x = 1-2-3 .")
    assert.equal(obj[0].right.left.type, "-") 
  });
  
  test('Parentesis: ', function(){
    obj = pl0.parse("x = (2+4) * 9 .")
    assert.equal(obj[0].right.left.type, "+")
  });
  
  test('Precedencia: ', function(){
    obj = pl0.parse("x = 2+3*3 .")
    assert.equal(obj[0].right.left.type, "NUM")
  });

  test('Comparacion: ', function(){
    obj = pl0.parse("IF x == 1 THEN y = 3 .")
    assert.equal(obj[0].condition.type, "==")
  });

  test('Bloque: ', function(){
    obj = pl0.parse("CONST x = 3; VAR y; PROCEDURE p; x = x + 12; CALL p.")
    assert.equal(obj[0].left.type, "CONST ID")
    assert.equal(obj[1].type, "VAR ID")
    assert.equal(obj[2].type, "PROCEDURE")
  });

  test('Call: ', function(){
    obj = pl0.parse("CALL z .")
    assert.equal(obj[0].type, "CALL")
  });

  test('If - If Else: ', function(){
    obj = pl0.parse("IF x == 2 THEN b = 2.")
    assert.equal(obj[0].type, "IF")

    obj = pl0.parse("IF x == 3 THEN z = 2 ELSE z = 1.")
    assert.equal(obj[0].type, "IFELSE")
  });

  test('Odd: ', function(){
    obj = pl0.parse("IF ODD 3 THEN b = 23 .")
    assert.equal(obj[0].condition.type, "ODD")
  });

  test('While Do: ', function(){
    obj = pl0.parse("WHILE x == 3 DO z = z+3.")
    assert.equal(obj[0].type, "WHILE")
  });

  test('Begin End: ', function(){
    obj = pl0.parse("BEGIN x = 3; z = b+3 END.")
    assert.equal(obj[0].type, "BEGIN")
  });

  test('Argumentos de Call y Procedure: ', function(){
    obj = pl0.parse("VAR x, squ; PROCEDURE square(x,y,z); BEGIN squ = x * x END; CALL square(x).")
    assert.equal(obj[3].arguments[0].value, "x")

    obj = pl0.parse("VAR x, squ; PROCEDURE square; BEGIN squ = x * x END; CALL square.")
    assert.equal(obj[3].arguments, undefined)

    obj = pl0.parse("VAR x, squ; PROCEDURE square(); BEGIN squ = x * x END; CALL square().")
    assert.equal(obj[3].arguments, undefined)
  });

  test('Error de Sintaxis: ', function(){
    assert.throws(function() { pl0.parse("x = 323"); }, /Expected "."/);
  });

});