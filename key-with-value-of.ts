/**
 * Делает Union из ключей объекта T, тип значения которых совпадает с заданным
 */
type KeyWithValueOfType<O, T> = keyof { [K in keyof O as O[K] extends T ? K : never]: any };


// Пример
type SomeObject = {
  title: string,
  description: string,
  method1: () => void,
  method2: (num: number) => void,
  data: {
    lalala: number,
    ololo: string,
  },
  relations: Record<string, any>,
  anotherRelations: Record<string, string>,
  thirdRelations: Record<string, object>,
};

// 'title' | 'description'
let field1: KeyWithValueOfType<SomeObject, string>;

// 'method1' | 'method2'
let field2: KeyWithValueOfType<SomeObject, Function>;

// 'method1'
let field3: KeyWithValueOfType<SomeObject, () => void>;

// 'relations'
let field4: KeyWithValueOfType<SomeObject, Record<string, number>>;

// 'relations' | 'anotherRelations'
let field5: KeyWithValueOfType<SomeObject, Record<string, string>>;

// 'relations' | 'thirdRelations'
let field6: KeyWithValueOfType<SomeObject, Record<string, object>>;
