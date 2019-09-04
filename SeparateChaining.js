class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}
  
class HashMapSeparateChaining {
 
  constructor(initialCapacity=8){=-uy666
    this.length = 0;
    this._hashTable=[];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }
  
  get(key){
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    let currNode = this._hashTable[index];
    while(currNode.key !== key || currNode.next !== null){
      currNode = currNode.next;
    }
    return currNode.value;
  }
  
  set(key,value){
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMapSeparateChaining.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMapSeparateChaining.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    let currNode = this._hashTable[index];
    if (currNode === undefined){
      this._hashTable[index] = {
        key,
        value,
        DELETED: false,
        next: null,
      }; 
      return;
    }
    while(currNode.key !== key || currNode.next !== null){
      currNode = currNode.next;
    }
    if (currNode.key === key){
      currNode.value = value;
    }
    if (currNode.next=== null ){
      this.length++;
      currNode.next = {
        key,
        value,
        DELETED: false,
        next: null,
      };
    }
      
  }
  
  delete(key){
    const index = this._findSlot(key);
    const slot = this._hashTable[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.DELETED = true;
    this.length--;
    this._deleted++;
  }
  
  _resize(size){
    const oldSlots = this._hashTable;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];
  
    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }
  
  _findSlot(key){
    const hash = HashMapSeparateChaining._hashString(key);
    return hash % this._capacity;
  }
  
  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      //Bitwise left shift with 5 0s - this would be similar to
      //hash*31, 31 being the decent prime number
      //but bit shifting is a faster way to do this
      //tradeoff is understandability
      hash = (hash << 5) + hash + string.charCodeAt(i);
      //converting hash to a 32 bit integer
      hash = hash & hash;
    }
    //making sure has is unsigned - meaning non-negtive number. 
    return hash >>> 0;
  }  
}
HashMapSeparateChaining.MAX_LOAD_RATIO = 0.5;
HashMapSeparateChaining.SIZE_RATIO = 3;

function main() {
  const lor = new HashMapSeparateChaining();
   
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
    
  console.log(lor);
}
main();