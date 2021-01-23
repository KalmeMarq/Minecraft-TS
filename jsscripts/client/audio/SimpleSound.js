"use strict";
class SimpleSound {
    constructor(sound, volume, pitch) {
        this.sound = sound;
        this.volume = volume;
        this.pitch = pitch;
    }
}
class SimpleSounds {
    static master(soundIn, pitchIn) {
        return new SimpleSound(soundIn, pitchIn, 0.25);
    }
}
