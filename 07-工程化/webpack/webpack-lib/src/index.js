import _ from "lodash";
import numRef from "./ref.json";

export function numToWord(num) {
  return _.reduce(
    numRef,
    (acc, ref) => {
      return ref.num === num ? ref.word : acc;
    },
    ""
  );
}

export function wordToNum(word) {
  return _.reduce(
    numRef,
    (acc, ref) => {
      return ref.word === word && word.toLowerCase() ? ref.num : acc;
    },
    -1
  );
}
