import stringSimilarity from 'string-similarity-js';

export const getErrorText = error => {
  return (
    error?.data?.message?.toString() ||
    error?.error?.toString() ||
    error?.data?.error?.toString() ||
    'Something went wrong'
  );
};

export const isFindUserCorrectText = (partialResults, synonyms) => {
  //const partialResults = par

  // Iterate through the partial results to check for "go to cart"
  let arr = [];
  for (let i = 0; i < partialResults?.length; i++) {
    for (let j = 0; j < synonyms?.length; j++) {
      if(partialResults[i]&&synonyms[j]){
        arr.push(stringSimilarity(partialResults[i], synonyms[j]));
      }
      
    }
  }
  console.log('mhgfe45678', Math.max(...arr));
  if (Math.max(...arr) > 0.7) {
    return true;
  } else {
    return false;
  }
};

export const goToCartSynonyms = [
  'go to cart',
  'add to cart',
  'add to basket',
  'view cart',
  'open cart',
  'check cart',
  'access cart',

  'review cart',
  'visit cart',
  'go to shopping cart',
  'go to bag',
  'go to trolley',
  'open cart',
  'show cart',
];

export const goToOrderHistorySynonyms = [
  'view order history',
  'check order history',
  'access order history',
  'review order history',
  'visit order history',
  'open order history',
  'show order history',
];
