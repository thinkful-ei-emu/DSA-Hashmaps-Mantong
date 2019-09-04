const HashMap = require ('./HashMap.js');

function main() {
  const lor = new HashMap();
 
  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragon');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');
  lor.set('RingBearer', 'Gollum');
  lor.set('LadyOfLight', 'Galadriel');
  lor.set('HalfElven', 'Arwen');
  lor.set('Ent', 'Treebeard');

  
  //   console.log(lor.get('Maiar'));
  //   console.log(lor.get('Hobbit'));
  
  //console.log(lor);
}
main();

/*2. WhatDoesThisDo
const WhatDoesThisDo = function(){
  let str1 = 'Hello World.';
  let str2 = 'Hello World.';
  let map1 = new HashMap();
  map1.set(str1,10);
  map1.set(str2,20);
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3,20);
  map2.set(str4,10);

  console.log(map1.get(str1));
  console.log(map2.get(str3));
};
reset the hashmap for str1, and str2, print reset str1 value should be 20, print str 3 value which should be 10;
*/
/*
22,88, , ,4,15,28,17,59,31,10
1,28,19,20,12,5,15,33,17
*/
//4. Remove duplicates
function removeDuplicates(str){
  const map = new HashMap();
  for (let i = 0; i < str.length; i++){
    if(!map.has(str[i])){
      map.set(str[i], i);
    }
  }
  return map;
}
//console.log(removeDuplicates('google'));
//console.log(removeDuplicates('google all that you think can think of'));

//5. Any permutation a palindrome
function palindrome(string){
  const map = new Map();
  map.set('odds', 0);
  for (let i = 0; i < string.length; i++) {
    if(map.has(string[i])){
      map.set(string[i], map.get(string[i])+1);
      if (map.get(string[i]) % 2 === 0) {
        map.set('odds', map.get('odds')-1);
      } else {
        map.set('odds', map.get('odds')+1);
      }
    } else{
      map.set(string[i], 1);
      map.set('odds', map.get('odds')+1);
    }
  }
  
  return map.get('odds') <= 1;
}
//console.log(palindrome('acecarr'));
//console.log(palindrome('north'));

//6. Anagram grouping

function anagramGrouping(strings){
  const map = new Map();

  strings.forEach(string => {
    let key = string.split('').sort().join('');
    //console.log(key);
    if (map.has(key)) {
      map.set(key, [...map.get(key),string]);
    } else {
      map.set(key, [string]);
    }
  });
  
  const result = [];
  
  map.forEach(value => result.push(value));
  
  return result;
}
console.log(anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));