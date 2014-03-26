var assert = chai.assert;

suite('Tests', function(){
  
  test('Asignacion: ', function(){
    object = pl0.parse("x = 9 .")
    assert.equal(object.type, "=")
    assert.equal(object.left.type, "ID")
    assert.equal(object.left.value, "x")
    assert.equal(object.right.type, "NUM")
    assert.equal(object.right.value, "8") 
  });

  test('Suma: ', function(){
    object = pl0.parse("x = 3 + 5 .")
    assert.equal(object.right.type, "+")
  });

  test('Multiplicacion: ', function(){
    object = pl0.parse("x = 4 * 1 .")
    assert.equal(object.right.type, "*") 
  });

  test('Division: ', function(){
    object = pl0.parse("x = 1 / 6 .")
    assert.equal(object.right.type, "/")
  });

  
  test('Asociatividad de izquierda: ', function(){
    object = pl0.parse("x = 1-2-3 .")
    assert.equal(object.right.left.type, "-") 
  });
  
  test('Parentesis: ', function(){
    object = pl0.parse("x = (2+4) * 9 .")
    assert.equal(object.right.left.type, "+")
  });
  
  test('Precedencia: ', function(){
    object = pl0.parse("x = 2+3*3 .")
    assert.equal(object.right.left.type, "NUM")
  });

  test('Comparacion: ', function(){
    object = pl0.parse("IF x == 1 THEN y = 3 .")
    assert.equal(object.condition.type, "==")
  });

  test('Bloque: ', function(){
    object = pl0.parse("CONST x = 3; VAR y; PROCEDURE p; x = x + 12; CALL p.")
    assert.equal(object[0].left.type, "CONST ID")
    assert.equal(object[1].type, "VAR ID")
    assert.equal(object[2].type, "PROCEDURE")
  });

  test('Call: ', function(){
    object = pl0.parse("CALL z .")
    assert.equal(object[0].type, "CALL")
  });

  test('If - If Else: ', function(){
    object = pl0.parse("IF x == 2 THEN b = 2.")
    assert.equal(object[0].type, "IF")

    object = pl0.parse("IF x == 3 THEN z = 2 ELSE z = 1.")
    assert.equal(object[0].type, "IFELSE")
  });

  test('Odd: ', function(){
    object = pl0.parse("IF ODD 3 THEN b = 23 .")
    assert.equal(object[0].condition.type, "ODD")
  });

  test('While Do: ', function(){
    object = pl0.parse("WHILE x == 3 DO z = z+3.")
    assert.equal(object[0].type, "WHILE")
  });

  test('Begin End: ', function(){
    object = pl0.parse("BEGIN x = 3; z = b+3 END.")
    assert.equal(object[0].type, "BEGIN")
  });

  test('Argumentos de Call y Procedure: ', function(){
    object = pl0.parse("VAR x, squ; PROCEDURE square(x,y,z); BEGIN squ = x * x END; CALL square(x).")
    assert.equal(object[3].arguments[0].value, "x")

    object = pl0.parse("VAR x, squ; PROCEDURE square; BEGIN squ = x * x END; CALL square.")
    assert.equal(object[3].arguments, undefined)

    object = pl0.parse("VAR x, squ; PROCEDURE square(); BEGIN squ = x * x END; CALL square().")
    assert.equal(object[3].arguments, undefined)
  });

  test('Error de Sintaxis: ', function(){
    assert.throws(function() { pl0.parse("x = 323"); }, /Expected "."/);
  });

});