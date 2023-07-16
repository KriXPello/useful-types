/**
 * Делает Union из ключей объекта (если есть вложенные объекты, объединяет через точку)
 */
type NestedKey<O extends Record<string, any>> = {
  [K in Extract<keyof O, string>]: Required<O>[K] extends Array<any>
  ? K // проверка нужна, иначе для поля, значение которого - массив вам будут показаны все методы массива
  : Required<O>[K] extends Record<string, any>
  // @ts-ignore ругается, мол, может быть бесконечно глубоким (неправда)
  ? `${K}` | `${K}.${NestedKey<Required<O>[K]>}`
  : K
}[Extract<keyof O, string>];

// Пример
type User = {
  name: string,
  data: {
    someValue: number[],
    anotherValue: number,
  };
};

// Может быть: 'name' | 'data' | 'data.someValue' | 'data.anotherValue'
let userField: NestedKey<User>;
