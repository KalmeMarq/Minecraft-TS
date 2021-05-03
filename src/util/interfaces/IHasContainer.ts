import Container from "../../inventory/Container";

export default interface IHasContainer<T extends Container> {
  getMenu(): T;
}