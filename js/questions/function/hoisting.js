/*
  ## Hoisting support :
    In var, let, const, function
    but var shows 'undefined' why it throws 'Temporal zone(it is error. It is a zone that variable have) Reference error' like 'let & const'. var doesn't fellow rules. (let, var later introduction 'strict mode - es6')
    In case of 'function declaration' it store function instead of undefined.
*/

var x = 21;

var fun =  function(){
    console.log(x); // undefined, user access value before initialization.
    var x = 20;
}

fun();

/*
  concept is 'variable scoping', eg:  Is like opening boxes from inside.
  Note: first it 'look inside current scope' then only goto 'outside scope' for variable.
*/
