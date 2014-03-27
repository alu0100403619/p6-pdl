var assert = chai.assert;

suite('Tests', function(){
  
  test('Asignacion: ', function(){
    object = pl0.parse("x = 9. ")
    assert.equal(object.block.st.type, "=")
    assert.equal(object.block.st.left.type, "ID")
    assert.equal(object.block.st.left.value, "x")
    assert.equal(object.block.st.right.type, "NUM")
    assert.equal(object.block.st.right.value, "9") 
  });

  test('Suma: ', function(){
    object = pl0.parse("x = 3 + 5 .")
    assert.equal(object.block.st.right.type, "+")
  });

  test('Multiplicacion: ', function(){
    object = pl0.parse("x = 4 * 1 .")
    assert.equal(object.block.st.right.type, "*") 
  });

  test('Division: ', function(){
    object = pl0.parse("x = 1 / 6 .")
    assert.equal(object.block.st.right.type, "/")
  });

  
  test('Asociatividad de izquierda: ', function(){
    object = pl0.parse("x = 1-2-3 .")
    assert.equal(object.block.st.right.left.type, "-") 
  });
  
  test('Parentesis: ', function(){
    object = pl0.parse("x = (2+4) * 9 .")
    assert.equal(object.block.st.right.left.type, "+")
  });
  
  test('Precedencia: ', function(){
    object = pl0.parse("x = 2+3*3 .")
    assert.equal(object.block.st.right.left.type, "NUM")
  });

  test('Comparacion: ', function(){
    object = pl0.parse("if x == 1 then y = 3 .")
    assert.equal(object.block.st.condition.type, "==")
  });

  test('Bloque: ', function(){
    object = pl0.parse("const x = 3; var y; procedure p; x = x + 12; call p.")
    assert.equal(object[0].left.type, "const id")
    assert.equal(object[1].type, "var id")
    assert.equal(object[2].type, "procedure")
  });

  test('Call: ', function(){
    object = pl0.parse("call z .")
    assert.equal(object[0].type, "call")
  });

  test('If - If Else: ', function(){
    object = pl0.parse("if x == 2 then b = 2.")
    assert.equal(object[0].type, "if")

    object = pl0.parse("if x == 3 then z = 2 else z = 1.")
    assert.equal(object[0].type, "ifelse")
  });

  test('Odd: ', function(){
    object = pl0.parse("if odd 3 then b = 23 .")
    assert.equal(object[0].condition.type, "odd")
  });

  test('While Do: ', function(){
    object = pl0.parse("while x == 3 do z = z+3.")
    assert.equal(object[0].type, "while")
  });

  test('Begin End: ', function(){
    object = pl0.parse("begin x = 3; z = b+3 end.")
    assert.equal(object[0].type, "begin")
  });

  test('Argumentos de Call y Procedure: ', function(){
    object = pl0.parse("var x, squ; procedure square(x,y,z); begin squ = x * x end; call square(x).")
    assert.equal(object[3].arguments[0].value, "x")

    object = pl0.parse("var x, squ; procedure square; begin squ = x * x end; call square.")
    assert.equal(object[3].arguments, undefined)

    object = pl0.parse("var x, squ; procedure square(); begin squ = x * x end; call square().")
    assert.equal(object[3].arguments, undefined)
  });

  test('Error de Sintaxis: ', function(){
    assert.throws(function() { pl0.parse("x = 323"); }, /Expected "."/);
  });

});