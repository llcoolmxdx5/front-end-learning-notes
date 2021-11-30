// 根据每项的`parentId`，生成具体树形结构的对象

const nest = <T extends Record<string | number, any>>(
  array: T[],
  idValue: string | null | number = null,
  idKey: string = "id",
  parentIdKey: string = "parentId"
): Array<T & { children?: T[] }> => {
  return array
    .filter((item) => item[parentIdKey] === idValue)
    .map((item) => ({ ...item, children: nest(array, item[idKey]) }));
};

const comments: Array<{ id: number; parentId: null | number }> = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
  { id: 5, parentId: 4 },
  { id: 6, parentId: null },
];
const nestedComments = nest(comments); // [{ id: 1, parent_id: null, children: [...] }]
console.log(nestedComments);
