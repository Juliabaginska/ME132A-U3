// 1. Search for a string within another string.
//    All strings have the method "includes".

// This returns "true"
"a sample string".includes("sample");
// This as well
"a sample string".includes("le");
// This returns "false"
"a sample string".includes("simple");

// Lets assume we have this person
let person = {
    firstname: "Jane",
    lastname: "Doe",
};

// And someone wants to search for this last name
let searchWord = "doe";

// Lets extract the last name, and make it lower case
let lastname = person.lastname.toLowerCase();

if (lastname.includes(searchWord)) {
    console.log("We found it!");
}

// 2. Listening for when a user presses a key on their keyboard

// Lets say we have this HTML:
//  <input type="text" id="searchbox">

// "Key up" is the term for when you release your finger from one of the keys on your keyboard
function onKeyUp() {
    // This prints the current value of the input
    console.log(this.value);
}

let input = document.getElementById("searchbox");
// We need to listen to the event "keyup"
input.addEventListener("keyup", onKeyUp);

// 3. "Relationships" within our data

// Lets assume we have an array of Owner and one of Pets
let owners = [
    { name: "Sebbe", pets: [1] },
    { name: "Erik", pets: [3, 4] },
];

let pets = [
    { id: 1, name: "Arya" },
    { id: 2, name: "Charlie" },
    { id: 3, name: "Percy" },
    { id: 4, name: "Penny" },
    { id: 5, name: "Flash" },
];

// If we want to print out all the Pets "Erik" has we would have to do something
// along the lines of this:

// (I know Erik is at owners[1] but in case we wouldnt know, we'd have to search for him)
let erik = owners.find((owner) => owner.name == "Erik");

// Next we'd have to find all his pets (this can be done in lots of ways)

// Example 1: filter the array `pets` by checking to see if Erik`s own array of "pets" include the "pet.id",
//            if it does we'll get "true" and then the array method "filter" will keep it.
// 
//            The array method "includes" works similarily to the one for strings,
//            but we can only search for basic stuff like numbers and strings.
let erikPets1 = pets.filter((pet) => erik.pets.includes(pet.id));

// Example 2: with "let x of y"
let erikPets2 = [];

for (let pet of pets) {
    if (erik.pets.includes(pet.id)) {
        erikPets2.push(pet);
    }
}

// Example 3: with "let i = 0 ..."
let erikPets3 = [];

for (let i = 0; i < pets.length; i++) {
    let pet = pets[i];

    if (erik.pets.includes(pet.id)) {
        erikPets3.push(pet);
    }
}

// Example 4: without "includes"
let erikPets4 = [];

for (let pet of pets) {
    // For each pet we'll go through all of eriks pets and see if it matches
    for (let eriksPetId of erik.pets) {
        if (pet.id == eriksPetId) {
            erikPets4.push(pet);
        }
    }
}

// Then we'd just loop through the found pets and print their names