
export default interface ISoundEventAccessor<T> {
   getWeight(): number;
   getSound(): T;
}