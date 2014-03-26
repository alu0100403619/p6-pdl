/*
 * PL0 Grammar
 */

{
  var tree = function(f, r) {
    if (r.length > 0) {
      var last = r.pop();
      var result = {
        type:  last[0],
        left: tree(f, r),
        right: last[1]
      };
    }
    else {
      var result = f;
    }
    return result;
  }
}

prog   = b:block DOT { return { type: 'program', block: b } 

block  = VAR var (PROCEDURE ID PYC block PYC)* st { }
       / CONST cons VAR var (PROCEDURE ID PYC block PYC)* st { }
       / CONST cons (PROCEDURE ID PYC block PYC)* st { }
       / (PROCEDURE ID PYC block PYC)* st { }

cons   = ID ASSIGN NUMBER !(PYC) (COMA ID ASSIGN NUMBER)* PYC { }

var    = ID !(PYC) (COMA ID)* PYC { }

st     = i:ID ASSIGN e:exp            
            { return { type: '=', left: i, right: e }; }
       / CALL i:ID { return { type: 'call', id: i }; }
       / BEGIN l:st !(END) r:(PYC st)* END
           { 
             var result = [l];
	           for (var i = 0; i < r.length; i++)
	             result.push(r[i][1]);
	     
	           return {
	             type: 'begin', 
	             sts: result
	           }; 
	 
           }
       / IF c:cond THEN st:st ELSE sf:st
           {
             return {
               type: 'IFELSE',
               condition:  e,
               true_st: st,
               false_st: sf,
             };
           }
       / IF c:cond THEN st:st    
           {
             return {
               type: 'IF',
               condition:  c,
               st: st
             };
           }
       / WHILE c:cond DO st:st    
           {
             return {
               type: 'IF',
               condition:  c,
               st: st
             };
           }

cond   = o:ODD e:exp { return { type: o, expression: e }; }
       / e1:exp c:COND e2:exp { return { type: c, left: e1, right: e2 }; }
       
exp    = t:term   r:(ADD term)*   { return tree(t,r); }
term   = f:factor r:(MUL factor)* { return tree(f,r); }

factor = NUMBER
       / ID
       / LEFTPAR t:exp RIGHTPAR   { return t; }

_ = $[ \t\n\r]*

ASSIGN   = _ op:'=' _  { return op; }
ADD      = _ op:[+-] _ { return op; }
MUL      = _ op:[*/] _ { return op; }
COND     = _ op:$([<>=!][=]/[<>]) _ { return op; }
LEFTPAR  = _"("_
RIGHTPAR = _")"_
PYC      = _";"_
COMA     = _","_
DOT      = _"."_
CALL     = _ "call" _
BEGIN    = _ "begin" _
END      = _ "end" _
PROCEDURE = _ "procedure" _
CONST    = _ "const" _
VAR      = _ "var" _
IF       = _ "if" _
THEN     = _ "then" _
ELSE     = _ "else" _
WHILE    = _ "while" _
DO       = _ "do" _
ODD      = _ "odd" _
ID       = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _ 
            { 
              return { type: 'ID', value: id }; 
            }
NUMBER   = _ digits:$[0-9]+ _ 
            { 
              return { type: 'NUM', value: parseInt(digits, 10) }; 
            }
