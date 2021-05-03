import VanillaPack from "../resources/VanillaPack";

async function  a() {
  let context = new AudioContext();
  let v = new VanillaPack('assets/indexes/1.16.json');
  await v.addPaths();

  let b = await (await v.getResource('minecraft/sounds/random/click_stereo.ogg')).arrayBuffer();
  let bb = await context.decodeAudioData(b);


  window.addEventListener('click', () => {
    var source = context.createBufferSource();
    source.buffer = bb;
    var gainNode = context.createGain();
    gainNode.gain.setValueAtTime(0.25, 0);
    gainNode.connect(context.destination)

    source.connect(gainNode);
    source.playbackRate.value = 1
    // source.loop = true;
    // throw new ResourceLocationException('ssup')

    source.start(0);
  })
}

a();