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

  
  test('Call: ', function(){
    object = pl0.parse("call z .")
    assert.equal(object.block.st.type, "call")
  });

 
  test('While Do: ', function(){
    object = pl0.parse("while x == 3 do z = z+3.")
    assert.equal(object.block.st.type, "IF")
  });

  test('Begin End: ', function(){
    object = pl0.parse("begin x = 3; z = b+3 end.")
    assert.equal(object.type, "program")
  });

  test('Error de Sintaxis: ', function(){
    assert.throws(function() { pl0.parse("x = 323"); }, /Expected "."/);
  });

});