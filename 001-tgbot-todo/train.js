const human = {
  name: "John",
  age: 30,
  city: "New York",
};

human.sayHello = function() {
  console.log("Hello, my name is " + this.name);
};


let v1 = function() {
    console.log("Hello, my name is " + this.name);
  };
let v2 = human.sayHello();

v1()