// Local storage
function fetchData(key) {
  return JSON.parse(localStorage.getItem(key));
}

export { fetchData };
