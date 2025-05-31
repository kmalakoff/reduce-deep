import isFlattenable from 'isflattenable';

export type ReduceFn<T, V> = (memo: V, item: T, array?: T[], index?: number) => V;

export default function reduceDeep<T, V>(array: T[], fn: ReduceFn<T, V>, memo: V): V {
  let result: V = memo;
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (isFlattenable(value)) result = reduceDeep<T, V>(value as T[], fn, result);
    else result = fn(result, value, array, i);
  }
  return result;
}
