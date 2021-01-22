import Items, { registryItems } from './Items.js';

class ItemStack {
  constructor(itemIn, count) {
    this.item = itemIn === null ? null : itemIn;
    this.count = count;

    this.isEmpty = false;
  }

  setIsEmpty() {
    if (this.getItem() != null && this.getItem() != Items.AIR) {
      return this.count <= 0;
    } else {
      return true;
    }
  }

  updateEmptyState() {
    this.isEmpty = false;
    this.isEmpty = this.setIsEmpty();
  }

  split(amount) {
    const i = Math.min(amount, this.count);
    itemstack = this.copy();
    itemstack.setCount(i);
    this.shrink(i);
    return itemstack;
  }

  copy() {
    if (this.setIsEmpty()) {
       return EMPTY;
    } else {
       let itemstack = new ItemStack(this.getItem(), this.count);
       return itemstack;
    }
  }

  getCount() {
    return this.isEmpty ? 0 : this.count;
  }

  setCount(count) {
    this.count = count;
    this.updateEmptyState();
  }

  grow(count) {
    this.setCount(this.count + count);
  }

  shrink(count) {
    this.grow(-count);
  }

  getItem() {
    return this.isEmpty ? Items.AIR : this.item;
  }
}

export default ItemStack;