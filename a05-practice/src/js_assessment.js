(function () {
  // Make a namespace `Assessment`.
  if (typeof Assessment === "undefined") {
      Assessment = {};
    }
  // write String.prototype.mySlice. It should take a start index and an
  // (optional) end index.

  String.prototype.mySlice = function(start, end) {
    var result = [];
    if (typeof end !== "undefined"){
      for(var i = end; start < end; start++) {
        result.push(this[start]);
      }
    } else {
      for (var i = end; start < this.length; start++) {
        result.push(this[start]);
      }
    }
      return result.join("");
  };
  // write Array.prototype.myReduce (analogous to Ruby's Array#inject).

Array.prototype.myReduce = function (funy) {
  var sum = this[0];
  for(var i = 1; i < this.length; i++) {
    sum = funy(sum, this[i]);
  }
  return sum;
};

  // write Array.prototype.quickSort(comparator). Here's a quick refresher if
  // you've forgotten how quickSort works:
  //   - choose a pivot element from the array (usually the first)
  //   - for each remaining element of the array:
  //     - if the element is less than the pivot, put it in the left half of the
  //     array.
  //     - otherwise, put it in the right half of the array.
  //   - recursively call quickSort on the left and right halves, and return the
  //   full sorted array.

  Array.prototype.quickSort = function(comparator) {


    if(this.length <= 1){
      return this;
    }
    if(typeof comparator === "undefined"){
    comparator = function (a,b) {
      if(a<b){
        return -1;
      } else {
        return 1;
      }
    };}

    var pivot = this[0];
    var left = [];
    var right = [];
    for(var i = 1; i < this.length; i++){
      if(comparator(this[i], pivot) === -1){
        left.push(this[i]);

      } else {
        right.push(this[i]);

      }
    }
    return left.quickSort(comparator).concat([pivot]).concat(right.quickSort(comparator));
    };

  // write myFind(array, callback). It should return the first element for which
  // callback returns true, or undefined if none is found.

  Assessment.myFind = function(array, callback) {
    for(var i = 0; i < array.length; i++){
      if(callback(array[i]) === true){
        return array[i];
      }
  } return undefined;
  }

  // write sumNPrimes(n)
//
  Assessment.sumNPrimes = function (n) {

    var result = 0;
    var count = 0;
    var j = 2;
    while(count < n) {
      if(Assessment.isPrime(j)){
        result += j;
        count++;
      }
    j++;
  }    return result;
};

Assessment.isPrime = function(num) {
  if(num === 1){
    return false;
  };
    for(var i = 2; i < num; i++){
      if(num % i === 0){
        return false;
      }
    }
    return true;
}


  // write Function.prototype.myBind.
Function.prototype.myBind = function (funy) {
  var ogFunction = this;
  var args = [].slice.call(arguments,1);
  var result = function () {
    var argss = [].slice.call(arguments);
    return ogFunction.apply(funy, args.concat(argss));
  };
  return result;
}


function Cat(name) {
  this.name = name;
};

Cat.prototype.says = function (sound) {
  console.log(this.name + " says " + sound + "!");
}

markov = new Cat("Markov");
breakfast = new Cat("Breakfast");

markov.says("meow");
// Markov says meow!

markov.says.myBind(breakfast, "meow")();
// Breakfast says meow!

markov.says.myBind(breakfast)("meow");
// Breakfast says meow!

var notMarkovSays = markov.says.myBind(breakfast);
notMarkovSays("meow");


  // write Function.prototype.inherits.
Function.prototype.inherits = function (superClass) {
  function Surrogate () {};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate ();
  this.prototype.constructor = this;
}

})();
