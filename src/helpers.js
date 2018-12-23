export function Test() {
  console.log('Test');
}

/*
 -- Navigation
*/
export function getNavigationIndexFromView(view, navigation){
  let index = 0;
  navigation.forEach((obj, i) => {
    if (obj.view === view) index = i;
  })
  return index;
}

export function getNavigationByIndex(index, navigation){
  if (typeof(navigation[index]) === "undefined"){
    throw new Error('No index '+ index +' in Navigation !')
  }
  return navigation[index];
}

export function getNavigationBySlug(slug, navigation){
  let navEntry = {
    path: "",
    title: "",
    view: "",
    slug: ""
  };
  navigation.forEach(obj => {
    if (obj.slug === slug) navEntry = obj;
  });
  return navEntry;
}

/*
 -- Prestations
*/

// Returns prestations obj with associated key and qty property
export function getIndexedPrestations(prestations) {

  let indexedPrestations = {};

  prestations.forEach(prestation => {
    if (typeof(indexedPrestations[prestation.reference]) === "undefined"){
      indexedPrestations[prestation.reference] = Object.assign({}, prestation);	// copy ref
      indexedPrestations[prestation.reference].quantity = 1;
    }
    else {
      indexedPrestations[prestation.reference].quantity++;
    }
  });

  //console.log('getIndexedPrestations prestations: ', prestations);
  //console.log('getIndexedPrestations indexedPrestations: ', indexedPrestations);

  return indexedPrestations;
}

export function getPrestationsReferences(prestations) {
  console.log('getPrestationsReferences prestations: ', prestations);
  let prestationsReferences = [];

  prestations.forEach(prestation => {
    prestationsReferences.push(prestation.reference);
  });
  console.log('getPrestationsReferences prestationsReferences: ', prestationsReferences);
  return prestationsReferences;
}

export function isEmptyBasket(prestations){
  return !prestations.length;
}

export function convertMinToMinAndHour(totalMinutes, hourUnit = "h") {
  let minutes = totalMinutes % 60;
  let hours = (totalMinutes - minutes) / 60;

  return hours + hourUnit + minutes + (minutes === 0 ? 0:"");
}

export function redirectTo(path){
  window.location.href = window.location.origin + path;
}
