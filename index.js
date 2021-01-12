/* Imports */
import * as THREE from './three.js/build/three.module.js';
import { CSS3DRenderer, CSS3DObject } from './three.js/examples/jsm/renderers/CSS3DRenderer.js';

/*  */
const root = document.getElementById('root');
let last_known_scroll_position = 0;
let isFPSPaused = false;

let ticks = true;
let showChat = true;

/* Fetch Storage variables */
let splashTexts = []; 
let langFiles = [];

/* Settings */
let volume = 1;
let guiScale = 3;
let showAdvancedTooltips = JSON.parse(localStorage.getItem('showAdvancedTooltip')) || false;
let defaultLang = 'en_us';
let displayLang = 'en_us';
let showFPS = JSON.parse(localStorage.getItem('showFPS')) || false;

let movingPanoramas = true;

let playerGamemode = 1;
let playerHealth = 20;
let playerHunger = 20;
let playerArmorProtection = 0;

/* Text formating */
const textFormating = [
  { symb: '§0', foreground: '#000', background: '#000' }, // Black
  { symb: '§1', foreground: '#0000AA', background: '#00002A' }, // Dark blue
  { symb: '§2', foreground: '#00AA00', background: '#002A00' }, // Dark green
  { symb: '§3', foreground: '#00AAAA', background: '#002A2A' }, // Dark aqua
  { symb: '§4', foreground: '#AA0000', background: '#2A0000' }, // Dark red
  { symb: '§5', foreground: '#AA00AA', background: '#2A002A' }, // Dark purple
  { symb: '§8', foreground: '#555', background: '#151515' }, // Dark gray
  { symb: '§r', foreground: '#fff', background: '#3F3F3F' }, // White
  { symb: '§l' }, // Bold
  { symb: '§m' }, // Strokethrough
  { symb: '§n' } // Underline
];

/* Get Files Data */
async function getJSONData(url) {
  const res = await fetch(url);
  return await res.json(); 
}

async function getTextData(url) {
  const res = await fetch(url);
  return await res.text(); 
}

/* Get Translation text if possible */
function translateKey(key) {
  const langDefault = langFiles.find(file => file['language.code'] === defaultLang);
  const lang = langFiles.find(file => file['language.code'] === displayLang);

  if(lang[key]) {
    return lang[key]
  } else if(langDefault[key]) {
    return langDefault[key];
  } else {
    return key
  }
}

/* Items Registry */
let RegistryItems = [];

let ItemIdNum = 0;
class Item {
  #isStackable;
  #isDamageable;

  constructor(identifier, name, texture, itemGroup, maxStackSize, maxDamage, components) {
    this.id = ItemIdNum;
    ItemIdNum++;
    this.identifier = identifier;
    this.name = name;
    this.itemGroup = itemGroup;
    this.texture = texture + '.png';
    this.components = components;
    this.maxStackSize = maxStackSize;
    this.#isStackable = maxStackSize === 1 ? false : true;
    this.maxDamage = maxDamage; 
    this.#isDamageable = maxDamage === -1 ? false : true;
  }

  get isStackable() {
    return this.#isStackable;
  }

  get isDamageable() {
    return this.#isDamageable;
  }
}

/* Selected item */
let selectedItem = {
  Item: '',
  Damage: -1,
  Count: 0,
  Props: {},
  getItemID: () => {
    return selectedItem.Item;
  },
  getCount: () => {
    return selectedItem.Count;
  },
  set: (item, count, damage, props) => {
    selectedItem.Item = item;
    selectedItem.Count = count;
    selectedItem.Damage = damage;
    selectedItem.Props = props
  },
  reset: () => {
    selectedItem.Item = '';
    selectedItem.Count = 0;
    selectedItem.Damage = -1;
    selectedItem.Props = {}
  }
};

/* Inventories */
class Inventory {
  static genPlayerArmor() {
    let grid = [];
    for(let i = 36; i < 40; i++) {
      grid.push({ Slot: i, Item: '', Damage: -1, Count: 0, isArmor: true })
    }
    return grid;
  }

  static genPlayerOffHand() {
    let grid = [];
    for(let i = 40; i < 41; i++) {
      grid.push({ Slot: i, Item: 'minecraft:diamond_helmet', Damage: -1, Count: 1 })
    }
    return grid;
  }

  static genPlayerInv() {
    let grid = [];
    for(let i = 9; i < 36; i++) {
      grid.push({ Slot: i, Item: '', Damage: -1, Count: 0 })
    }
    return grid;
  }

  static genPlayerHotbar() {
    let grid = [];
    for(let i = 0; i < 9; i++) {
      grid.push({ Slot: i, Item: '', Damage: -1, Count: 0 })
    }
    return grid;
  }

  static genChest() {
    let grid = [];
    for(let i = 0; i < 27; i++) {
      grid.push({ Slot: i, Item: '', Damage: -1, Count: 0 })
    }
    return grid;
  }

  static genCraftingTableGrid() {
    let grid = [];
    for(let i = 0; i < 9; i++) {
      grid.push({ Slot: i, Item: '', Damage: -1, Count: 0 })
    }
    return grid;
  }
}

const playerArmor = JSON.parse(localStorage.getItem('playerArmor')) || Inventory.genPlayerArmor();
const playerOffHand = JSON.parse(localStorage.getItem('playerOffHand')) || Inventory.genPlayerOffHand();
const playerInventory = JSON.parse(localStorage.getItem('playerInv')) || Inventory.genPlayerInv();
const playerHotbar = JSON.parse(localStorage.getItem('playerHotbar')) ||  Inventory.genPlayerHotbar();

const invChest = JSON.parse(localStorage.getItem('Chest')) ||  Inventory.genChest();
const craftingTableGrid = Inventory.genCraftingTableGrid();

class Slot {
  static setSlot(slotType, item, count, damage) {
    slotType.Item = item;
    slotType.Count = count;
    slotType.Damage = damage;
  }

  static resetSlot(slotType) {
    slotType.Item = '';
    slotType.Count = 0;
    slotType.Damage = -1;
  }

  static saveInvs() {
    localStorage.setItem('playerArmor', JSON.stringify(playerArmor));
    localStorage.setItem('playerOffHand', JSON.stringify(playerOffHand));
    localStorage.setItem('playerInv', JSON.stringify(playerInventory));
    localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
    localStorage.setItem('Chest', JSON.stringify(invChest));
  }

  static placeItem(slotType, element, invType) {
    slotType.Item = selectedItem.getItemID();
    slotType.Count = selectedItem.getCount();
    slotType.Damage = selectedItem.Damage;

    // Slot.setSlot(slotType, selectedItem.getItemID(), selectedItem.getCount(), selectedItem.Damage);

    selectedItem.reset();

    removeFlyingItem();
    drawInv(element, invType);
    Slot.saveInvs();
  }

  static selectItem(e, slotType, element, invType) {
    selectedItem.set(slotType.Item, slotType.Count, slotType.Damage);

    slotType.Item = '';
    slotType.Count = 0;
    slotType.Damage = -1;

    // Slot.resetSlot();

    drawInv(element, invType);
    drawFlyingItem(e);
    drawInv(element, invType);
    Slot.saveInvs();
  }

  static pickPlaceItem(slotEl, slotType, element, invType) {
    slotEl.addEventListener('click', (e) => {
      if(selectedItem.getItemID() === '' && slotType.Item !== '') {
        Slot.selectItem(e, slotType, element, invType);
        slotEl.setAttribute('data-tooltip', 'empty');
      } else if(selectedItem.getItemID() !== '' && slotType.Item === '') {
        if(slotType.Slot >= 36 && slotType.Slot <= 39) {
          const itemRef = RegistryItems.find(item => item.identifier === selectedItem.getItemID());
          
          switch (slotType.Slot) {
            case 36:
              if(itemRef.components.armor && itemRef.components.armor.slot === 'helmet') Slot.placeItem(slotType, element, invType)
              break;
          
            case 37:
              if(itemRef.components.armor && itemRef.components.armor.slot === 'chestplate') Slot.placeItem(slotType, element, invType)
              break;
          
            case 38:
              if(itemRef.components.armor && itemRef.components.armor.slot === 'leggings') Slot.placeItem(slotType, element, invType)
              break;
          
            case 39:
              if(itemRef.components.armor && itemRef.components.armor.slot === 'boots') Slot.placeItem(slotType, element, invType)
              break;
          }

        } else {
          Slot.placeItem(slotType, element, invType)
        }
      }

      
    });

    slotEl.blur();
  }

  static deleteItem(slotEl) {
    slotEl.addEventListener('click', () => {
      selectedItem.reset();
      removeFlyingItem();
    });
  }
}

function drawFlyingItem(e) {
  const refItem = RegistryItems.find(item => item.identifier === selectedItem.getItemID());

  removeFlyingItem();

  if(selectedItem.getCount() === 0) {
    removeFlyingItem();
    selectedItem.reset();
  }

  if(selectedItem.getItemID() !== '') {
    const slotEl = document.createElement('div');
    slotEl.id = 'flyingItem';

/*     if(refItem.components.use_cube_model) { */

/*     } else { */
      const img = document.createElement('img');
      img.src = refItem.texture;
      img.loading = 'lazy';

      slotEl.appendChild(img);
/*     } */

    if(refItem.isStackable && selectedItem.getCount() > 0) {
      const stackSpan = document.createElement('span');
      stackSpan.classList.add('stack-size');
      stackSpan.innerText = selectedItem.getCount() !== 1 ? selectedItem.getCount() : '';
      slotEl.appendChild(stackSpan);
    }
    
    // if(item.maxDamage !== -1 && selectedItem.Damage < item.maxDamage) {
    //   const durabilitybar = document.createElement('div');
    //   const calcDurabilityPerc = (selectedItem.Damage / item.maxDamage) * 100;

    //   durabilitybar.classList.add('durabilityBar');
    //   durabilitybar.innerHTML = `
    //     <div class="durabilityBarInside" style="width: ${calcDurabilityPerc}%; background: ${checkForDurabilityColor(calcDurabilityPerc)}"></div>
    //   `;
    //   slotItem.appendChild(durabilitybar)
    // }

    slotEl.style.top = e.pageY - (8 * guiScale) + 'px';
    slotEl.style.left = e.pageX - (8 * guiScale) + 'px';

    document.body.appendChild(slotEl);
  }
}

function removeFlyingItem() {
  if(document.getElementById('flyingItem')) document.getElementById('flyingItem').remove();
}

function drawInv(element, invType) {
  element.innerHTML = '';

  invType.forEach(slot => {
    const refItem = RegistryItems.find(item => item.identifier === slot.Item);

    const slotEl = createElement('div', { class: 'slot', 'tabindex': '0' });
    if(slot.Item === '') {
      slotEl.setAttribute('data-tooltip', 'empty');
    } else if(refItem.name) {
      slotEl.setAttribute('data-tooltip', `${translateKey(refItem.name) + ',' + refItem.identifier}${refItem.maxDamage !== -1 ? ',Durability: ' + slot.Damage + '/' + refItem.maxDamage : ''}${',' + slot.Item}`);
    }
   

    Slot.pickPlaceItem(slotEl, slot, element, invType);

    if(slot.Item !== '') {
      if(refItem.components.use_cube_model) {
      const space3dDiv = document.createElement('div');
      space3dDiv.classList.add('space3d');

      space3dDiv.innerHTML = `
      <div class="_3dbox">
        <div class="_3dface _3dface--front" style="background-image: url(${refItem.texture});"></div>
        <div class="_3dface _3dface--top" style="background-image: url(${refItem.texture});"></div>
        <div class="_3dface _3dface--left" style="background-image: url(${refItem.texture});"></div>
      </div>
      `;

      slotEl.appendChild(space3dDiv)
    } else {
      const img = document.createElement('img');
      img.src = refItem.texture;
      img.loading = 'lazy';
      slotEl.appendChild(img);
    }

      if(refItem.isStackable && slot.Count > 0) {
        const stackSpan = document.createElement('span');
        stackSpan.classList.add('stack-size');
        stackSpan.innerText = slot.Count !== 1 ? slot.Count : '';
        slotEl.appendChild(stackSpan);
      }
    } else {
      if(invType === playerArmor) {
        const img = document.createElement('img');
        if(slot.Slot === 36) img.src = 'assets/minecraft/textures/item/empty_armor_slot_helmet.png'
        else if(slot.Slot === 37) img.src = 'assets/minecraft/textures/item/empty_armor_slot_chestplate.png'
        else if(slot.Slot === 38) img.src = 'assets/minecraft/textures/item/empty_armor_slot_leggings.png'
        else if(slot.Slot === 39) img.src = 'assets/minecraft/textures/item/empty_armor_slot_boots.png';
        slotEl.appendChild(img);
      } else if(invType === playerOffHand) {
        const img = document.createElement('img');
        img.src = 'assets/minecraft/textures/item/empty_armor_slot_shield.png';
        slotEl.appendChild(img);
      }
      else slotEl.innerHTML = ''
     
    };

    element.appendChild(slotEl);

    
  })
}

let auu = 0;

function drawAllItems(itemGroup) {
  document.getElementsByClassName('creative-inventory-container')[0].innerHTML = '';
  // document.getElementsByClassName('creative-scroll')[0].innerHTML = '';
  playSound();

  const aaa = createElement('div', { class: 'div-for-el-canvas-img' }, 
    newCreateImg('creative-inv-items-txr', 0, 0, 195, 136, 256, 256)
  );

  const bbb = createElement('input', { id: 'search' });

  document.getElementsByClassName('creative-inventory-container')[0].appendChild(aaa);
  if(itemGroup === 'all') document.getElementsByClassName('creative-inventory-container')[0].appendChild(bbb);

  bbb.addEventListener('input', () => {
    const slots = document.querySelectorAll('.creative-scroll .slot');
  });

  document.getElementsByClassName('creative-inventory-container')[0].appendChild(createElement('div', { class: 'creative-items' },
  createElement('div', { class: 'creative-scroll' })
))
  document.getElementsByClassName('creative-inventory-container')[0].appendChild(createElement('div', { class: 'player-hotbar creative-hotbar' }))
  drawInv(document.getElementsByClassName('player-hotbar')[0], playerHotbar)
  
  function drawGroupItems(group) {
    let huh = 0;

    RegistryItems.forEach(invSlot => {

      if(invSlot.itemGroup === group) {
        huh++;
        console.log(huh)
      const itemID = invSlot.identifier;
      const itemName = invSlot.name;
      const itemTexture = invSlot.texture;
      const itemMaxStackSize = invSlot.maxStackSize;
  
      const slotEl = createElement('div', { class: 'slot', 'tabindex': '0' });
      slotEl.setAttribute('data-tooltip', `${translateKey(itemName) + ',' + '§8' + itemID}`);

      slotEl.addEventListener('mousedown', (e) => {
        if(e.button === 2) {
  
          if(selectedItem.Count < itemMaxStackSize) {
            selectedItem.set(itemID, e.shiftKey ? itemMaxStackSize : selectedItem.getCount() + 1, itemMaxStackSize);
            selectedItem.Damage = invSlot.maxDamage;
          }
  
          drawFlyingItem(e);
        } else if(e.button === 1) {
          selectedItem.set(itemID, itemMaxStackSize, itemMaxStackSize);
  
          drawFlyingItem(e);
        }
      })  
  
      slotEl.addEventListener('click', (e) => {
        if(selectedItem.Item === '') {
          selectedItem.set(itemID, e.shiftKey ? itemMaxStackSize : 1, itemMaxStackSize);
          selectedItem.Damage = invSlot.maxDamage;
          drawFlyingItem(e);
        } else if(selectedItem.Item !== '') {
          selectedItem.reset();
          removeFlyingItem();
        }

        slotEl.blur();
      });

    
        const img = document.createElement('img');
        img.src =  invSlot.texture;
        img.loading = 'lazy';
        slotEl.appendChild(img);
  
        document.getElementsByClassName('creative-scroll')[0].appendChild(slotEl);
        if(huh > 45) {
          slotEl.style.display = 'none'
        }
        last_known_scroll_position = 0;
        document.getElementsByClassName('creative-scroll')[0].style.top = '0px';
          }
      });

      huh = 0;
    } 

    if(itemGroup === 'all') {
      drawGroupItems('building');
      drawGroupItems('decorations');
      drawGroupItems('redstone');
      drawGroupItems('transportation');
      drawGroupItems('misc');
      drawGroupItems('foodstuffs');
      drawGroupItems('tools');
      drawGroupItems('equipment');
      drawGroupItems('brewing');
    } else {
      drawGroupItems(itemGroup);
    }
    const a = (9 - (document.getElementsByClassName('creative-scroll')[0].children.length % 9))

    for (let i = 0; i < a; i++) {
      const slotEl1 = createElement('div', { class: 'slot', 'tabindex': '0' });
      Slot.deleteItem(slotEl1);
      document.getElementsByClassName('creative-scroll')[0].appendChild(slotEl1);
    }

    const b = 45 - document.getElementsByClassName('creative-scroll')[0].children.length;

    if(document.getElementsByClassName('creative-scroll')[0].children.length < 45) {
      for(let i = 0; i < b; i++) {
        const slotEl1 = createElement('div', { class: 'slot', 'tabindex': '0' });
        Slot.deleteItem(slotEl1);
        document.getElementsByClassName('creative-scroll')[0].appendChild(slotEl1);
      }
    }

    auu = 0;
}

/* Create HTML Element */
function createElement(type, props, ...children) {
  const element = document.createElement(type);

  Object.entries(props).forEach(([key, value]) => {
    element.setAttribute(key, value);
  })

  children.forEach(child => typeof child === 'string'
    ? element.appendChild(document.createTextNode(child))
    : element.appendChild(child)
  )

  return element;
}

/* Canvas Img */
const createImg = (txr, x, y, w, h, baseW, baseH) => {
  const canvas = document.createElement('canvas');
  canvas.className = 'canvas-as-img';
  const ctx = canvas.getContext('2d');

  canvas.width = w * guiScale;
  canvas.height = h * guiScale;

  const image = new Image(baseW, baseH);
  image.src = txr;

  image.addEventListener('load', (e) => {
    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
  
    ctx.drawImage(e.target, -(x * guiScale), -(y * guiScale), e.target.width * guiScale, e.target.height * guiScale);
  });

  return canvas;
};

const newCreateImg = (txrId, x, y, w, h, baseW, baseH) => {
  const canvas = document.createElement('canvas');
  canvas.className = 'canvas-as-img';
  const ctx = canvas.getContext('2d');

  canvas.width = w * guiScale;
  canvas.height = h * guiScale;

  const image = document.getElementById(txrId);

  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;

  ctx.drawImage(image, -(x * guiScale), -(y * guiScale), baseW * guiScale, baseH * guiScale);

  return canvas;
};

const dirtBackground = () => {
  const canvas = document.createElement('canvas');
  canvas.style.transform = 'scale(' + 1.45 * guiScale + ')';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.className = 'canvas-as-img';
  const ctx = canvas.getContext('2d');

  let img = new Image(16, 16);

  img.src = 'assets/minecraft/textures/gui/options_background.png';
  img.onload = function(){
    // create pattern
    var ptrn = ctx.createPattern(img, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    ctx.fillStyle = ptrn;
    ctx.filter = 'brightness(50%)'
    ctx.fillRect(0, 0, canvas.width, canvas.height); // context.fillRect(x, y, width, height);
  }

  return canvas;
}

const createPlayerHeartBgIcon = () => {
  const canvas = document.createElement('canvas');
  canvas.className = 'canvas-as-img heart-bg';
  const ctx = canvas.getContext('2d');

  canvas.width = 9 * guiScale;
  canvas.height = 9 * guiScale;

  const image = document.getElementById('icons-txr');

  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  
  ctx.drawImage(image, -(16 * guiScale), 0, 256 * guiScale, 256 * guiScale);

  return canvas;
};

const createPlayerHeartIcon = () => {
  const canvas = document.createElement('canvas');
  canvas.className = 'canvas-as-img heart-bg';
  const ctx = canvas.getContext('2d');

  canvas.width = 9 * guiScale;
  canvas.height = 9 * guiScale;

  const image = document.getElementById('icons-txr');

  
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;

  ctx.drawImage(image, -(52 * guiScale), 0, 256 * guiScale, 256 * guiScale);


  return canvas;
};

const createPlayerHeartHalfIcon = () => {
  const canvas = document.createElement('canvas');
  canvas.className = 'canvas-as-img heart-bg';
  const ctx = canvas.getContext('2d');

  canvas.width = 9 * guiScale;
  canvas.height = 9 * guiScale;

  const image = document.getElementById('icons-txr');

  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;

  ctx.drawImage(image, -(61 * guiScale), 0, 256 * guiScale, 256 * guiScale);

  return canvas;
};


const createPlayerHeartBg = () => {
  const div = document.getElementsByClassName('hearts-bg')[0];
  const diva = document.createElement('div');

  div.innerHTML = '';
  diva.innerHTML = '';
  diva.className = 'hearts';

  diva.style.width = (9 * 1) * guiScale;
  diva.style.height = 9 * guiScale;

  for (let i = 0; i < 10; i++) {
    div.appendChild(createPlayerHeartBgIcon());
  }

  if((playerHealth / 2) % 1 !== 0) {
    for (let i = 0; i < Math.floor(playerHealth / 2); i++) {
      diva.appendChild(createPlayerHeartIcon());
    }

    diva.appendChild(createPlayerHeartHalfIcon());
  } else {
    for (let i = 0; i < playerHealth / 2; i++) {
      diva.appendChild(createPlayerHeartIcon());
    }
  }
  

  div.appendChild(diva)
  return div;
};


/* Sounds */
function playSound() {
  const sound = new Audio('assets/minecraft/sounds/click_stereo.ogg');
  sound.volume = 0.1;
  sound.play();
  sound.onended = () => {
    sound.pause();
  }
}

function newPlaySound(url) {
  const sound = new Audio(url);
  sound.volume = 0.1;
  sound.play();
  sound.onended = () => {
    sound.pause();
  }
}

/* Other functions */
const getRandomSplashText = () => splashTexts[~~(Math.random() * (splashTexts.length - 1))];

const switchShowFPS = () => {
  if(!showFPS) {
    showFPS = true;
    localStorage.setItem('showFPS', true);
    if(document.getElementById('showfps-toggle')) document.getElementById('showfps-toggle').innerText = 'Show FPS: ON';
  } else {
    showFPS = false;
    localStorage.setItem('showFPS', false);
    document.getElementById('fps-counter').innerHTML = '';
    if(document.getElementById('showfps-toggle')) document.getElementById('showfps-toggle').innerText = 'Show FPS: OFF';
  }
}

const switchShowAdvancedTooltips = () => {
  if(!showAdvancedTooltips) {
    showAdvancedTooltips = true;
    localStorage.setItem('showAdvancedTooltip', true);
    if(document.getElementById('advancedTooltip-toggle')) document.getElementById('advancedTooltip-toggle').innerText = 'Show Advanced Tooltip: ON';
  } else {
    showAdvancedTooltips = false;
    localStorage.setItem('showAdvancedTooltip', false);
    if(document.getElementById('advancedTooltip-toggle')) document.getElementById('advancedTooltip-toggle').innerText = 'Show Advanced Tooltip: OFF';
  }
}

const takeDamage = (value) => {
  const hitnum = Math.ceil(Math.random() * 3);
  newPlaySound(`assets/minecraft/sounds/damage/hit${hitnum}.ogg`)

  if(playerHealth - value === 0) {
    playerHealth = 20;
    openDeathScreen()
  } else {
    playerHealth -= value;
    // createPlayerHeartBg();
  }
}

const titleEl = document.getElementById('title-title');
const chatInputEl = document.getElementById('chat-input');
chatInputEl.addEventListener('change', () => {
  let text = chatInputEl.value;

  if(text.includes('/title ')) {
    text = text.replace('/title', '');
    titleEl.innerText = text.trim();
    titleEl.style.opacity = '1';
    titleEl.style.display = 'block';

    setTimeout(() => {
      titleEl.style.opacity = '0';
    }, 3000)

    setTimeout(() => {
      titleEl.style.display = 'none';
      titleEl.innerText = '';
    }, 5000)
  } else if(text.trim() === '/kill') {
    takeDamage(playerHealth);
  } else if(text.trim() === '/reload') {
    window.location = window.location;
  } else if(text.trim() === '/pauseticks') {
    ticks = false;
  } else if(text.trim() === '/unpauseticks') {
    ticks = true;
  } else {
    const p = document.createElement('p');
    p.innerText = '<Jez> ' + text;

    document.getElementById('chat-box').appendChild(p);

    setTimeout(() => {
      p.style.opacity = '0';
      setTimeout(() => {
        p.remove();
      }, 1000);
    }, 5000);
  }

  chatInputEl.value = '';
});

const switchShowChat = () => {
  if(!showChat) {
    showChat = true;
    document.getElementById('chat-input-box').style.display = 'block';
    document.getElementById('chat-box').style.display = 'block';
  } else {
    showChat = false;
    document.getElementById('chat-input-box').style.display = 'none';
    document.getElementById('chat-box').style.display = 'none';
  }
}

/* Screens */
function mainMenu() {
  showChat = true;
  switchShowChat();
  document.title = 'Minecraft JS - Main Menu';

  root.innerHTML = `
    <div class="wrapper" style="position: absolute; left: 50%; top: ${window.innerHeight / 4 + (48 * guiScale)}px; transform: translate(-50%);">
      <button class="classic-btn" id="openHudBtn">Hud</button>
      <button class="classic-btn" id="openSettingsBtn">${translateKey('menu.options')}</button>
    </div>
    <p class="info-bottom-right">Minecraft JS</p>
    <div class="mc-title-box">
      <div class="mc-title-minec">
      <div class="mc-title-raft">
      <h2 id="splash-texts"></h2>
    </div>
  `;

  document.getElementById('splash-texts').innerText = getRandomSplashText();

  document.getElementById('openHudBtn').addEventListener('click', () => openHud());
  document.getElementById('openSettingsBtn').addEventListener('click', () => openSettings());
}

function openDeathScreen() {
  document.title = 'Minecraft JS - Death Menu';

  root.innerHTML = `
    <div class="death-gradi-bg"></div>
    <h1 style="position: fixed; left: 50%; top: ${58 * guiScale}px; color: white; font-size: ${16 * guiScale}px; transform: translate(-50%);">${translateKey('deathScreen.title')}</h1>
    <div class="centerer">
      <div class="wrapper">
        <button class="classic-btn" onclick="mainMenu(); playSound();">${translateKey('deathScreen.respawn')}</button>
      </div>
    </div>
  `;
}

function openSettings() {
  playSound();
  document.title = 'Minecraft JS - Settings';

  root.innerHTML = `
    <div class="centerer">
      <div class="div-for-el-canvas-img" id="dirt-bg"></div>
      <div class="wrapper">
        <button class="classic-btn">GUI Scale: 3</button>
        <button class="classic-btn" id="advancedTooltip-toggle">Show Advanced Tooltip: ${showAdvancedTooltips ? 'ON' : 'OFF'}</button>
        <button class="classic-btn" id="showfps-toggle">Show FPS: ${showFPS ? 'ON' : 'OFF'}</button>
        
        <div class="slider-box">
          <label id="volume-slider-label">Volume: ${~~(volume * 100)}%</label>
          <input type="range" id="volume-slider" min="0" max="100" step="1" class="classic-slider">
        </div>

        <button class="classic-btn" onclick="mainMenu(); playSound();">${translateKey('gui.done')}</button>
      </div>
    </div>
  `;

  /* Render dirt bg */
  document.getElementById('dirt-bg').appendChild(dirtBackground());

  /* Toggles */
  document.getElementById('volume-slider').addEventListener('input', () => {
    volume = document.getElementById('volume-slider').value / 100;
    document.getElementById('volume-slider-label').innerText = `Volume: ${~~(volume * 100)}%`
  });

  document.getElementById('showfps-toggle').addEventListener('click', () => {
    playSound();
    switchShowFPS();
  });

  document.getElementById('advancedTooltip-toggle').addEventListener('click', () => {
    playSound()
    switchShowAdvancedTooltips();
  });
}

function openHud() {
  switchShowChat();
  playSound();
  document.title = 'Minecraft JS - Hud';

  root.innerHTML = `
  <div class="wrapper" style="position: absolute; left: 50%; top: ${window.innerHeight / 4 + (24 * guiScale)}px; transform: translate(-50%);">
      <button class="classic-btn" id="openInventoryBtn">Open Inventory</button>
      <button class="classic-btn" onclick="openCraftingTable()">Open Crafting Table</button>
      <button class="classic-btn" onclick="">Open Furnace</button>
      <button class="classic-btn" onclick="">Open Stonecutter</button>
      <br>
      <button class="classic-btn" onclick="mainMenu(); playSound();">${translateKey('gui.cancel')}</button>
    </div>
  `;

  document.getElementById('openInventoryBtn').addEventListener('click', () => openCreativeInventory())
}

function drawtabSurvivalnv() {
  document.getElementsByClassName('creative-inventory-container')[0].innerHTML = '';
  const a = createElement('div', { class: 'div-for-el-canvas-img' }, 
    createImg('assets/minecraft/textures/gui/container/creative_inventory/tab_inventory.png', 0, 0, 195, 136, 256, 256)
  );
  playSound();

  document.getElementsByClassName('creative-inventory-container')[0].appendChild(a);
  document.getElementsByClassName('creative-inventory-container')[0].appendChild(createElement('div', { class: 'player-inventory creative-hotbar' }))
  document.getElementsByClassName('creative-inventory-container')[0].appendChild( createElement('div', { class: 'player-hotbar creative-hotbar' }))

  const b = createElement('div', { class: 'slot', style: 'position: absolute; bottom: calc(7px * var(--guiScale)); right: calc(5px * var(--guiScale));', onclick: 'Slot.deleteItem(this)' });
  document.getElementsByClassName('creative-inventory-container')[0].appendChild(b);
  drawInv(document.getElementsByClassName('player-inventory')[0], playerInventory)
  drawInv(document.getElementsByClassName('player-hotbar')[0], playerHotbar)
}

function openCreativeInventory() {
  playSound();
  root.innerHTML = '';
  document.title = 'Minecraft JS - Creative Inventory';

  root.appendChild(
    createElement('div', { id: "screen" },
      createElement('div', { class: 'creative-tab-panels' }, 
        createElement('button', { class: 'btn-tab-creative-inv tab-top', id: 'buildingTab' }, 
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            createImg('assets/minecraft/textures/gui/container/creative_inventory/tabs.png', 0, 0, 28, 32, 256, 256)
          ),
          'B'
        ),
        createElement('div', { style: 'width: calc(1px * var(--guiScale));' }),
        createElement('button', { class: 'btn-tab-creative-inv tab-top', onclick: 'drawAllItems("decorations")' },
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            createImg('assets/minecraft/textures/gui/container/creative_inventory/tabs.png', 0, 0, 28, 32, 256, 256)
          ),
          'D'
        ),
        createElement('div', { style: 'width: calc(1px * var(--guiScale));' }),
        createElement('button', { class: 'btn-tab-creative-inv tab-top', id: 'redstoneTab' },
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            createImg('assets/minecraft/textures/gui/container/creative_inventory/tabs.png', 0, 0, 28, 32, 256, 256)
          ),
          'R'
        ),
        createElement('div', { style: 'width: calc(1px * var(--guiScale));' }),
        createElement('button', { class: 'btn-tab-creative-inv tab-top', onclick: 'drawAllItems("transportation")' },
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            createImg('assets/minecraft/textures/gui/container/creative_inventory/tabs.png', 0, 0, 28, 32, 256, 256)
          ),
          'T'
        ),
        createElement('div', { style: 'width: calc(52px * var(--guiScale));' }),
        createElement('button', { class: 'btn-tab-creative-inv tab-top', id: 'allTab' },
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            createImg('assets/minecraft/textures/gui/container/creative_inventory/tabs.png', 0, 0, 28, 32, 256, 256)
          ),
          'S'
        ),
      ),
      createElement('div', { class: 'creative-inventory-container' },
        createElement('div', { class: 'div-for-el-canvas-img' }, 
          newCreateImg('creative-inv-items-txr', 0, 0, 195, 136, 256, 256)
        ),
        createElement('div', { class: 'creative-items' },
          createElement('div', { class: 'creative-scroll' })
        ),
        createElement('div', { class: 'player-hotbar creative-hotbar' })
      ),
      createElement('div', { class: 'creative-tab-panels' }, 
        createElement('button', { class: 'btn-tab-creative-inv', onclick: 'drawAllItems("misc")' },
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            createImg('assets/minecraft/textures/gui/container/creative_inventory/tabs.png', 0, 64, 28, 32, 256, 256)
          ),
          'M'
        ),
        createElement('button', { class: 'btn-tab-creative-inv', onclick: 'drawAllItems("foodstuffs")' },
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            createImg('assets/minecraft/textures/gui/container/creative_inventory/tabs.png', 0, 64, 28, 32, 256, 256)
          ),
          'F'
        ),
        createElement('button', { class: 'btn-tab-creative-inv', onclick: 'drawAllItems("tools")' },
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            createImg('assets/minecraft/textures/gui/container/creative_inventory/tabs.png', 0, 64, 28, 32, 256, 256)
          ),
          'T'
        ),
        createElement('button', { class: 'btn-tab-creative-inv', onclick: 'drawAllItems("equipment")' },
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            createImg('assets/minecraft/textures/gui/container/creative_inventory/tabs.png', 0, 64, 28, 32, 256, 256)
          ),
          'E'
        ),
        createElement('button', { class: 'btn-tab-creative-inv', onclick: 'drawAllItems("brewing")' },
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            createImg('assets/minecraft/textures/gui/container/creative_inventory/tabs.png', 0, 64, 28, 32, 256, 256)
          ),
          'B'
        ),
        createElement('div', { style: 'width: calc(20px * var(--guiScale));' }),
        createElement('button', { class: 'btn-tab-creative-inv', onclick: 'drawtabSurvivalnv()' },
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            createImg('assets/minecraft/textures/gui/container/creative_inventory/tabs.png', 0, 64, 28, 32, 256, 256)
          ),
          'SI'
        )
      )
    )
  );

  document.getElementById('buildingTab').addEventListener('click', () => drawAllItems('building'));
  document.getElementById('redstoneTab').addEventListener('click', () => drawAllItems('redstone'));
  document.getElementById('allTab').addEventListener('click', () => drawAllItems('all'));

  document.getElementsByClassName('creative-items')[0].addEventListener('scroll', (e) => {
   e.preventDefault()
  });

  window.addEventListener('mousewheel', (e) => {
    const c = last_known_scroll_position - 270 - (18 * guiScale) >= -(document.getElementsByClassName('creative-scroll')[0].offsetHeight);

    if(e.deltaY < 0 && last_known_scroll_position - (18 * guiScale) <= 0 && last_known_scroll_position !== 0) {
      last_known_scroll_position = last_known_scroll_position + (18 * guiScale); 
      document.getElementsByClassName('creative-scroll')[0].style.top = last_known_scroll_position + 'px';

      for (let i = 1; i < document.getElementsByClassName('creative-scroll')[0].children.length; i++) {
        const child = document.getElementsByClassName('creative-scroll')[0].children[i - 1];

        if(i > ((-last_known_scroll_position / 18) * 3) && i < ((-last_known_scroll_position / 18) * 3 * 3) + 45 + 10) {
          child.style.display = 'block';
        } else {
          child.style.display = 'none';

        }
      }
      
      
    }else if(e.deltaY > 0 && c) {
      last_known_scroll_position = last_known_scroll_position - (18 * guiScale); 
      document.getElementsByClassName('creative-scroll')[0].style.top = last_known_scroll_position + 'px';

      console.log(-last_known_scroll_position / 18 * 3)
      
      for (let i = 1; i < document.getElementsByClassName('creative-scroll')[0].children.length; i++) {
        const child = document.getElementsByClassName('creative-scroll')[0].children[i - 1];

        const a = i > ((-last_known_scroll_position / 18) * 3);
        const b = i <= ((-last_known_scroll_position / 18) * 3 * 3) + 45;

        if(a && b) {
          child.style.display = 'block';
        } else {
          child.style.display = 'none';

        }
      }
    }

  });

  drawAllItems("building")
  drawInv(document.getElementsByClassName('player-hotbar')[0], playerHotbar);

}

function openInventory() {
  playSound();
  root.innerHTML = '';
  document.title = 'Minecraft JS - Survival Inventory';

  root.appendChild(
    createElement('div', { id: "screen" },
      createElement('div', { class: 'inventory-container' },
        createElement('div', { class: 'div-for-el-canvas-img' }, 
          newCreateImg('inventory-txr', 0, 0, 176, 166, 256, 256)
        ),
        createElement('div', { class: 'player-armor' }),
        createElement('div', { class: 'player-offhand' }),
        createElement('div', { class: 'player-inventory' }),
        createElement('div', { class: 'player-hotbar' })
      )
    )
  );

  drawInv(document.getElementsByClassName('player-armor')[0], playerArmor);
  drawInv(document.getElementsByClassName('player-offhand')[0], playerOffHand);
  drawInv(document.getElementsByClassName('player-inventory')[0], playerInventory);
  drawInv(document.getElementsByClassName('player-hotbar')[0], playerHotbar);
}

function openChest() {
  playSound();
  root.innerHTML = '';
  document.title = 'Minecraft JS - Chest';

  root.appendChild(
    createElement('div', { id: "screen" },
      createElement('div', { class: 'chest-container' },
        createElement('div', { class: 'div-for-el-canvas-img' }, 
          createImg('assets/minecraft/textures/gui/shulker_box.png', 0, 0, 176, 166, 256, 256)
        ),
        createElement('div', { class: 'chest-inventory' }),
        createElement('div', { class: 'player-inventory' }),
        createElement('div', { class: 'player-hotbar' })
      )
    )
  )

  drawInv(document.getElementsByClassName('chest-inventory')[0], invChest);
  drawInv(document.getElementsByClassName('player-inventory')[0], playerInventory);
  drawInv(document.getElementsByClassName('player-hotbar')[0], playerHotbar);
}

function openCraftingTable() {
  playSound();
  root.innerHTML = '';
  document.title = 'Minecraft JS - Crafting Table';

  root.appendChild(
    createElement('div', { id: "screen" },
      createElement('div', { class: 'crafting-table-container' },
        createElement('div', { class: 'div-for-el-canvas-img' }, 
          createImg('assets/minecraft/textures/gui/crafting_table.png', 0, 0, 176, 166, 256, 256)
        ),
        createElement('div', { class: 'player-inventory' }),
        createElement('div', { class: 'player-hotbar' })
      )
    )
  )

  drawInv(document.getElementsByClassName('player-inventory')[0], playerInventory);
  drawInv(document.getElementsByClassName('player-hotbar')[0], playerHotbar);
}

/* Initiate the whole damn thing */
async function initApp() {
  
  (async function gets() {
    const items = await getJSONData('registry/items.json');

    items.files.forEach(async file => {
      const item = await getJSONData(`${items.directory}/${file}`);

      RegistryItems.push(new Item(item.description.identifier, item.components.display_name, item.components.icon, item.description.item_group, item.components.max_stack_size, item.components.durability ? item.components.durability : -1, item.components) )
    });
  

  })();

  const getSplashes = async () => {
    const splashes = await getTextData('assets/minecraft/texts/splashes.txt');


    splashes.split(/\r?\n/).forEach(line => {
      splashTexts.push(line);
    });
  }


  await getSplashes();

  setInterval(() => {
    document.getElementById('loadingPanel').style.opacity = "0";
    document.getElementById('loadingBarInside').style.width = "100%"
   
  }, 800)

  setInterval(() => {
    document.getElementById('loadingPanel').style.display = "none";
        
      }, 1500)
  mainMenu();
}

window.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('loadingPanel').style.display = "block";

  const getLangs = async () => {
    const langs = await getJSONData('registry/languages.json');

    langs.files.forEach(async (file) => {
      const lang = await getJSONData(langs.directory + '/' + file);

      langFiles.push(lang);
    });
  }
  await getLangs();

    initApp();

});

/* Prevent opening right click menu */
window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
}, false);

window.addEventListener('keydown', (e) => {
  /* Go Back */
  if(e.key === 'Escape') {
    if(document.title !== 'Minecraft JS - Main Menu') {
      e.preventDefault();
      mainMenu()
    }
  }

  if(e.key === 'F3') {
    e.preventDefault();
    switchShowFPS();
  }
});

/* window.addEventListener('resize', () => {
  mainMenu();
})
 */
/* Tooltip and Selected Item Renderer */
const tooltip = document.getElementById('tooltip');

window.addEventListener('mousemove', (e) => {
  if(document.getElementById('flyingItem')) {
    const flyingItem = document.getElementById('flyingItem');

    flyingItem.style.top = e.pageY - (8 * guiScale) + 'px';
    flyingItem.style.left = e.pageX - (8 * guiScale) + 'px';
  }

  if(tooltip.innerText !== '') {
    tooltip.style.top = e.pageY - (8 * guiScale) + 'px';
    tooltip.style.left = e.pageX + (6 * guiScale) + 'px';
  }
});

window.addEventListener('mouseover', (e) => {
  if((e.target.dataset.tooltip && e.target.dataset.tooltip !== 'empty')) {
    if(tooltip.getBoundingClientRect().width + tooltip.getBoundingClientRect().left > window.innerWidth) {
      tooltip.style.top = e.pageY - (8 * guiScale) + 'px';
      tooltip.style.left = e.pageX - (6 * guiScale) - tooltip.getBoundingClientRect().width + 'px';
    } else if(tooltip.getBoundingClientRect().height + tooltip.getBoundingClientRect().bottom > window.innerHeight) {
      tooltip.style.top = e.pageY - (8 * guiScale) + 'px';
      tooltip.style.left = e.pageX - (6 * guiScale) - tooltip.getBoundingClientRect().height + 'px';
    } else {
      tooltip.style.top = e.pageY - (8 * guiScale) + 'px';
      tooltip.style.left = e.pageX + (6 * guiScale) + 'px';
    }

    /* Reset tooltip content */
    tooltip.textContent = '';

    /* Split given tooltip text into different lines */
    const tooltipTexts = e.target.dataset.tooltip.split(',');

    /* Add the text to the actual tooltip */
    if(showAdvancedTooltips) {
      tooltipTexts.forEach((text) => {
        const p = document.createElement('p');
        p.className = 'tooltip-text';
        p.style.fontSize = `calc(7px * var(--guiScale))`;
        p.style.color = textFormating.find(color => color.symb === '§r').foreground;
        p.style.textShadow = textFormating.find(color => color.symb === '§r').background;

        textFormating.forEach(form => {
          if(text.includes(form.symb)) {
            if(form.symb === '§l') p.style.fontWeight = 'bold';
            else if(form.symb === '§n') p.style.textDecoration = 'underline';
            else if(form.symb === '§m') p.style.textDecoration = 'line-through';
            else {
              p.style.color = form.foreground;
              p.style.textShadow = form.background;
            }

            text = text.replace(form.symb, '');
          }
        });
  
        p.innerText = text;

        tooltip.appendChild(p);

      });
    } else {
      const p = document.createElement('p');
      p.className = 'tooltip-text';
      p.innerText = tooltipTexts[0];
      tooltip.appendChild(p);
    }

    tooltip.style.display = 'block';
    
  } else {
    tooltip.style.display = 'none';
    tooltip.textContent = '';
  }
})

/* FPS Counter */
const fpsEl = document.getElementById('fps-counter');

let before = Date.now();
let now = 0;
let fps = 0;

requestAnimationFrame(function loop() {
  now = Date.now();
  fps = Math.round(1000/ (now - before));
  before = now;
  requestAnimationFrame(loop);
});

setInterval(() => {
  if(showFPS) fpsEl.innerText = fps;
}, 125);

/* Panoramas */
let camera, scene, renderer;
const target = new THREE.Vector3();

let lon = 90, lat = 0;
let phi = 0, theta = 0;

const panoramas = [
  {
    url: 'assets/minecraft/textures/gui/title/background/panorama_0.png',
    position: [0, 0, 512],
    rotation: [0, Math.PI, 0]
  },
  {
    url: 'assets/minecraft/textures/gui/title/background/panorama_1.png',
    position: [- 512, 0, 0],
    rotation: [0, Math.PI / 2, 0]
  },
  {
    url: 'assets/minecraft/textures/gui/title/background/panorama_2.png',
    position: [0, 0, - 512],
    rotation: [0, 0, 0]
  },
  {
    url: 'assets/minecraft/textures/gui/title/background/panorama_3.png',
    position: [512, 0, 0],
    rotation: [0, - Math.PI / 2, 0]
  },
  {
    url: 'assets/minecraft/textures/gui/title/background/panorama_4.png',
    position: [0, 512, 0],
    rotation: [Math.PI / 2, 0, Math.PI]
  },
  {
    url: 'assets/minecraft/textures/gui/title/background/panorama_5.png',
    position: [0, - 512, 0],
    rotation: [- Math.PI / 2, 0, Math.PI]
  }
];

initPanorama();
animatePanorama();

function initPanorama() {
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
  scene = new THREE.Scene();

  for (let i = 0; i < panoramas.length; i++) {
    const panorama = panoramas[i];

    const element = document.createElement('img');
    element.draggable = false;
    element.width = 1026; 
    element.src = panorama.url;

    const object = new CSS3DObject( element );
    object.position.fromArray( panorama.position );
    object.rotation.fromArray( panorama.rotation );
    scene.add(object);
  }

  renderer = new CSS3DRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight);
  document.getElementById('panoramas').appendChild( renderer.domElement );
  document.getElementById('panoramas').touchAction = 'none';
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}


function animatePanorama() {
  lon += 0.075;
  lat = Math.max(-85, Math.min(85, lat ));
  phi = THREE.MathUtils.degToRad(90 - lat);
  theta = THREE.MathUtils.degToRad(lon);

  target.x = Math.sin(phi) * Math.cos( theta);
  target.y = Math.cos(phi) * 2;
  target.z = Math.sin(phi) * Math.sin( theta);

  camera.lookAt(target);
  renderer.render(scene, camera);
}

setInterval(() => {
  if(true) {
    animatePanorama();
  }
}, (1000 / 60))