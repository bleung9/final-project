// import geodata from another file
// run this code to generate a list of all neighborhoods, w/ their immediately adjacent neighborhoods that share a border with it

var geodata = require("./toronto_crs84");

// generate a set of all unique coordinates
let n = 0;
let names_of_neigh = [];
let set_of_coords = new Set();
for (let i = 0; i < geodata.features.length; i++) {
  let name = geodata.features[i].properties.AREA_NAME;
  names_of_neigh.push(name.substring(0, name.indexOf("(") - 1));
  for (let j = 0; j < geodata.features[i].geometry.coordinates[0].length; j++) {
    let coord = String(geodata.features[i].geometry.coordinates[0][j][0]) + ", " + String(geodata.features[i].geometry.coordinates[0][j][1]);
    set_of_coords.add(coord);
  }
}

// for each unique coordinate, generate a list of neighborhoods that coordinate delineates
let border_coords = {};
for (let item of set_of_coords) {
  border_coords[item] = new Set();
}
for (let i = 0; i < geodata.features.length; i++) {
  let name = geodata.features[i].properties.AREA_NAME;
  name = name.substring(0, name.indexOf("(") - 1);
  for (let j = 0; j < geodata.features[i].geometry.coordinates[0].length; j++) {
    let coord = String(geodata.features[i].geometry.coordinates[0][j][0]) + ", " + String(geodata.features[i].geometry.coordinates[0][j][1]);
    border_coords[coord].add(name);
  }
}

// for each list of neighborhoods that a coordinate delineates, all of those neighborhoods
// share a border with each other item in that list
let result = {};
for (let i = 0; i < names_of_neigh.length; i++) {
  result[names_of_neigh[i]] = new Set();
}

let check = [];
for (let item in border_coords) {
  if (border_coords[item].size > 1) {
    let arr = Array.from(border_coords[item]);
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        result[arr[i]].add(arr[j]);
        result[arr[j]].add(arr[i]);
      }
    }
  }
}

// result is now { a: [a,b,c,d]} where a is bordered by a,b,c,d, so now filter out "a"
// from the array
for (item in result) {
  result[item] = Array.from(new Set(result[item]));
  let remove = result[item].filter((element) => element !== item);
  result[item] = remove;
}

console.log(result);


// console.log(border_coords)

// var o1 = [1,2,2,2,4,5,5,6,7,7];
// let m1 = Array.from(new Set(o1));
// console.log(m1);
