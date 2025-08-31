const retrieveLocalStorage = <T, > (key:string) => {
  const pair = localStorage.getItem(key) || '';
  if(!pair){
    return {} as T;
  }
  const pairJSON = JSON.parse(pair);
  return pairJSON as T;
};

export {retrieveLocalStorage};