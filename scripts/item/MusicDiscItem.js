import Item from './Item.js';

class MusicDiscItem extends Item {
  constructor(soundEvent, properties) {
    super(properties)
    this.soundEvent = soundEvent
  }
}

export default MusicDiscItem;