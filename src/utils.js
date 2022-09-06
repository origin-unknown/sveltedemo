
const factorial = (num) => {
  if (num === 0 || num === 1) return 1;
  for (let i=num - 1; i >= 1; num = num * i--);
  return num;
};

const _probability = (n=49, k=6) => {
  return factorial(n)/(factorial(k)*factorial(n-k));
};

export const probability = (n=49, k=6, m=5) => {
    return (_probability(k, m)*_probability(n - k, k - m))/_probability(n, k)*100;
};

export const generate = (l=6, limit=49) => {
  let n, i, arr = [];
  while(arr.length < l) {
    n = Math.floor(Math.random()*(limit-1)) + 1;
    if (!arr.includes(n)) {
      for (i=arr.length-1; i >= 0 && arr[i] > n; --i);
      arr.splice(i + 1, 0, n);
    }
  }
  return arr;
};
