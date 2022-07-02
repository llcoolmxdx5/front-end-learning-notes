/**
 * @param {string} s
 * @return {string}
 */
var originalDigits = function (s) {
  // zero one two three four five six seven eight nine
  // ["e","g","f","i","h","o","n","s","r","u","t","w","v","x","z"]
  // g => eight u=>four w=> two x=>six z=>zero
  // h=> three eight f => four five s=> six seven
  // o => zero one two four 确定 one
  // i => five six eight nine 确定 nine
  const { length } = s;
  const arr = new Array(26).fill(0);
  const cnt = new Array(10).fill(0);
  for (let index = 0; index < length; index++) {
    arr[s[index].charCodeAt() - 97] += 1;
  }
  cnt[8] = arr['g'.charCodeAt() - 97];
  cnt[4] = arr['u'.charCodeAt() - 97];
  cnt[2] = arr['w'.charCodeAt() - 97];
  cnt[6] = arr['x'.charCodeAt() - 97];
  cnt[0] = arr['z'.charCodeAt() - 97];

  cnt[3] = arr['h'.charCodeAt() - 97] - cnt[8];
  cnt[5] = arr['f'.charCodeAt() - 97] - cnt[4];
  cnt[7] = arr['s'.charCodeAt() - 97] - cnt[6];

  cnt[1] = arr['o'.charCodeAt() - 97] - cnt[0] - cnt[2] - cnt[4];
  cnt[9] = arr['i'.charCodeAt() - 97] - cnt[5] - cnt[6] - cnt[8];
  let res = '';
  for (let index = 0; index < 10; index++) {
    for (let j = 0; j < cnt[index]; j++) {
      res += index;
    }
  }
  return res;
};

console.assert(originalDigits('owoztneoer') === '012', 1);
console.assert(originalDigits('fviefuro') === '45', 2);
