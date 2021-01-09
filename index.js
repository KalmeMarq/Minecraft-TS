const root = document.getElementById('root');
let last_known_scroll_position = 0;

/* Fetch Storage variables */
let splashTexts = []; 

/* Settings */
const guiScale = 3;

let playerHealth = 20;

async function getJSONData(url) {
  const res = await fetch(url);
  return await res.json(); 
}

async function getTextData(url) {
  const res = await fetch(url);
  return await res.text(); 
}

/* Items Registry */
let RegistryItems = [];

let ItemIdNum = 0;
class Item {
  #isStackable;
  #isDamageable;

  constructor(identifier, texture, itemGroup, maxStackSize, maxDamage, components) {
    this.id = ItemIdNum;
    ItemIdNum++;
    this.identifier = identifier;
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

/* Inventories */
let selectedItem = {
  Item: '',
  Count: 0,
  getItemID: () => {
    return selectedItem.Item;
  },
  getCount: () => {
    return selectedItem.Count;
  },
  set: (item, count) => {
    selectedItem.Item = item;
    selectedItem.Count = count;
  },
  reset: () => {
    selectedItem.Item = '';
    selectedItem.Count = 0;
  }
};

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
      grid.push({ Slot: i, Item: '', Count: 0 })
    }
    return grid;
  }

  static genChest() {
    let grid = [];
    for(let i = 0; i < 27; i++) {
      grid.push({ Slot: i, Item: '', Count: 0 })
    }
    return grid;
  }
}

const playerArmor = /* JSON.parse(localStorage.getItem('playerArmor')) || */ Inventory.genPlayerArmor();
const playerOffHand = /* JSON.parse(localStorage.getItem('playerOffHand')) || */ Inventory.genPlayerOffHand();
const playerInventory = /* JSON.parse(localStorage.getItem('playerInv')) || */ Inventory.genPlayerInv();
const playerHotbar = /* JSON.parse(localStorage.getItem('playerHotbar')) ||  */ Inventory.genPlayerHotbar();

const invChest = /* JSON.parse(localStorage.getItem('Chest')) ||  */ Inventory.genChest();

class Slot {
  static placeItem(slotType, element, invType) {
    slotType.Item = selectedItem.getItemID();
    slotType.Count = selectedItem.getCount();

    selectedItem.reset();

    removeFlyingItem();
    drawInv(element, invType);
  }

  static selectItem(e, slotType, element, invType) {
    selectedItem.set(slotType.Item, slotType.Count);
    slotType.Item = '';
    slotType.Count = 0;

    drawInv(element, invType);
    drawFlyingItem(e);
  }

  static pickPlaceItem(slotEl, slotType, element, invType) {
    slotEl.addEventListener('click', (e) => {
      if(selectedItem.getItemID() === '' && slotType.Item !== '') {
        Slot.selectItem(e, slotType, element, invType);
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

    const img = document.createElement('img');
    img.src = refItem.texture;
    slotEl.appendChild(img);

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

    Slot.pickPlaceItem(slotEl, slot, element, invType);

    if(slot.Item !== '') {
      const img = document.createElement('img');
      img.src = refItem.texture;
      slotEl.appendChild(img);

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
    RegistryItems.forEach(invSlot => {
      if(invSlot.itemGroup === group) {
      const itemID = invSlot.identifier;
      const itemName = invSlot.name;
      const itemTexture = invSlot.texture;
      const itemMaxStackSize = invSlot.maxStackSize;
  
      const slotEl = createElement('div', { class: 'slot', 'tabindex': '0' });

      slotEl.addEventListener('mousedown', (e) => {
        if(e.button === 2) {
  
          if(selectedItem.Count < itemMaxStackSize) {
            selectedItem.set(itemID, e.shiftKey ? itemMaxStackSize : selectedItem.getCount() + 1);
            selectedItem.Damage = invSlot.maxDamage;
          }
  
          drawFlyingItem(e);
        } else if(e.button === 1) {
          selectedItem.set(itemID, itemMaxStackSize);
  
          drawFlyingItem(e);
        }
      })  
  
      slotEl.addEventListener('click', (e) => {
        if(selectedItem.Item === '') {
          selectedItem.set(itemID, e.shiftKey ? itemMaxStackSize : 1);
          selectedItem.Damage = invSlot.maxDamage;
          drawFlyingItem(e);
        } else if(selectedItem.Item !== '') {
          selectedItem.reset();
          removeFlyingItem();
        }

        slotEl.blur();
      });

      const img = document.createElement('img');
      img.src = itemTexture;
      slotEl.appendChild(img);
  
    /*   slotEl.setAttribute('data-tooltip', `${translateKey(`${invSlot.isBlock ? 'block' : 'item'}.minecraft.${itemID}`) + ',minecraft:' + itemID}`); */
  
      // console.log(langFiles[langFiles.findIndex(file => file[langFiles.id] === displayLang)]);
     /*  slotEl.addEventListener('mouseenter', () => {
        slotEl.focus();
      });
  
      slotEl.addEventListener('mouseleave', () => {6
        slotEl.blur();
      }); */
  
     /*  slotEl.addEventListener('keydown', (e) => {
  
        if(e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9') {
  
          playerHotbar[playerHotbar.findIndex(slot => slot.Slot === Number(e.key) - 1)].Item = itemID;
          playerHotbar[playerHotbar.findIndex(slot => slot.Slot === Number(e.key) - 1)].Count = itemMaxStackSize;
  
          drawHotbar();
          slotEl.blur();
  
        }
      });
  
      slotEl.addEventListener('mousedown', (e) => {
        if(e.button === 2) {
  
          if(selectedItem.Count < itemMaxStackSize) {
            selectedItem.set(itemID, e.shiftKey ? itemMaxStackSize : selectedItem.getCount() + 1);
            selectedItem.Damage = invSlot.maxDamage;
          }
  
          drawFlyingItem(e);
        } else if(e.button === 1) {
          selectedItem.set(itemID, itemMaxStackSize);
  
          drawFlyingItem(e);
        }
      })
  
      slotEl.addEventListener('click', (e) => {
        if(selectedItem.Item === '') {
          selectedItem.set(itemID, e.shiftKey ? itemMaxStackSize : 1);
          selectedItem.Damage = invSlot.maxDamage;
          drawFlyingItem(e);
        } else if(selectedItem.Item !== '') {
          selectedItem.reset();
          removeFlyingItem();
        }
      });

      Slot.checkForCubeIcon(slotEl, null, invSlot) */

     
  
      document.getElementsByClassName('creative-scroll')[0].appendChild(slotEl);
      last_known_scroll_position = 0;
      document.getElementsByClassName('creative-scroll')[0].style.top = '0px';
      }
    });
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
    const a =(9 - (document.getElementsByClassName('creative-scroll')[0].children.length % 9))

    for (let i = 0; i < a; i++) {
      const slotEl1 = createElement('div', { class: 'slot', 'tabindex': '0' });
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

/* Screens */
function mainMenu() {
  root.innerHTML = '';
  document.title = 'Minecraft JS - Main Menu';

  root.appendChild(
    createElement('div', { id: "screen" }, 
      createElement('button', { class: 'btn top-right', onclick: 'takeDamage()' }, 
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            newCreateImg('widgets-txr', 0, 66, 200, 20, 256, 256)
          ),
          'Simulate Take Damage'
        ),
      createElement('div', { class: 'wrapper' }, 
        createElement('button', { class: 'btn', onclick: 'openCreativeInventory()' }, 
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            newCreateImg('widgets-txr', 0, 66, 200, 20, 256, 256)
          ),
          'Creative Inventory'
        ),
        createElement('button', { class: 'btn', onclick: 'openInventory()' }, 
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            newCreateImg('widgets-txr', 0, 66, 200, 20, 256, 256)
          ),
          'Survival Inventory'
        ),
        createElement('button', { class: 'btn', onclick: 'openChest()' },
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            newCreateImg('widgets-txr', 0, 66, 200, 20, 256, 256)
          ),
         'Chest'
        ),
        createElement('button', { class: 'btn', onclick: 'openCraftingTable()' },
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            newCreateImg('widgets-txr', 0, 66, 200, 20, 256, 256)
          ),
          'Crafting Table'
        ),
        createElement('button', { class: 'btn', onclick: 'openSettings()' },
          createElement('div', { class: 'div-for-el-canvas-img' }, 
            newCreateImg('widgets-txr', 0, 66, 200, 20, 256, 256)
          ),
          'Settings'
        )
      ),
      createElement('div', { class: 'hearts-bg' }),
      createElement('h2', { id: 'splash-texts' }),
      createElement('div', { class: 'div-for-el-canvas-img hotbar' }, 
          newCreateImg('widgets-txr', 0, 0, 182, 22, 256, 256)
        ),
      createElement('div', { class: 'player-hotbar bottom' }
        
      )
      
    )
  ) 
  createPlayerHeartBg(),

  drawInv(document.getElementsByClassName('player-hotbar')[0], playerHotbar);

  (async function() {
    const splashes = await getTextData('assets/minecraft/texts/splashes.txt');
    const splash = [];


    splashes.split(/\r?\n/).forEach(line => {
      splash.push(line);
    });

    const randSplashIdx = ~~(Math.random() * (splash.length - 1));
    document.getElementById('splash-texts').innerText = splash[randSplashIdx];
  })();

  
}

function takeDamage() {
  const hitnum = Math.ceil(Math.random() * 3);

  newPlaySound(`assets/minecraft/sounds/damage/hit${hitnum}.ogg`)

  if(playerHealth - 1 === 0) {
    playerHealth = 20;
  } else {
    playerHealth--;
  }
  createPlayerHeartBg()
  
}

function openSettings() {
  root.innerHTML = '';
  document.title = 'Minecraft JS - Settings';

  root.appendChild(
    createElement('div', { id: "screen" }, 
      createElement('div', { class: 'div-for-el-canvas-img' }, 
        dirtBackground()
      )
    )
  )
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
        createElement('button', { class: 'btn-tab-creative-inv tab-top', onclick: 'drawAllItems("building")' }, 
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
        createElement('button', { class: 'btn-tab-creative-inv tab-top', onclick: 'drawAllItems("redstone")' },
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
        createElement('button', { class: 'btn-tab-creative-inv tab-top', onclick: 'drawAllItems("all")' },
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

  

  document.getElementsByClassName('creative-items')[0].addEventListener('scroll', (e) => {
   e.preventDefault()
  });

  window.addEventListener('mousewheel', (e) => {
    if(e.deltaY < 0 && last_known_scroll_position - (18 * guiScale) <= 0 && last_known_scroll_position !== 0) {
      last_known_scroll_position = last_known_scroll_position + (18 * guiScale); 
      document.getElementsByClassName('creative-scroll')[0].style.top = last_known_scroll_position + 'px';
      } else if(e.deltaY > 0 && last_known_scroll_position - 270 - (18 * guiScale) >= -(document.getElementsByClassName('creative-scroll')[0].offsetHeight)) {
      last_known_scroll_position = last_known_scroll_position - (18 * guiScale); 
      document.getElementsByClassName('creative-scroll')[0].style.top = last_known_scroll_position + 'px';
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

      RegistryItems.push(new Item(item.description.identifier, item.components.icon, item.description.item_group, item.components.max_stack_size, item.components.durability ? item.components.durability : -1, item.components) )
    });
  

  })();

  



  mainMenu();
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('txrs').lastElementChild.onload = function() {
    initApp();
  }
});

window.addEventListener('contextmenu', (e) => {
  e.preventDefault();
}, false);

window.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') {
    if(document.title !== 'Minecraft JS - Main Menu') {
      mainMenu()
    }
  }
})

window.addEventListener('mousedown', (e) => {
  if(e.button === 2 && playerHotbar[0].Item !== '') {
    
    const a = RegistryItems.find(item => item.identifier === playerHotbar[0].Item);
   
      if(a.components.add_health) {
        playerHealth += a.components.add_health;
  
        createPlayerHeartBg()
      }
  }
})

window.addEventListener('mousemove', (e) => {
  if(document.getElementById('flyingItem')) {
    document.getElementById('flyingItem').style.top = e.pageY - (8 * guiScale) + 'px';
    document.getElementById('flyingItem').style.left = e.pageX - (8 * guiScale) + 'px';
  }
});

window.addEventListener('mouseover', (e) => {
  if(e.target.classList.contains('btn')) {
    e.target.firstElementChild.appendChild(newCreateImg('widgets-txr', 0, 86, 200, 20, 256, 256))
    e.target.firstElementChild.children[0].remove();
  }
})

window.addEventListener('mouseout', (e) => {
  if(e.target.classList.contains('btn')) {
    e.target.firstElementChild.appendChild(newCreateImg('widgets-txr', 0, 66, 200, 20, 256, 256))
    e.target.firstElementChild.children[0].remove();
  }
})

/* Fps */
const fpsEl = document.getElementById('fps-counter');
var before,now,fps;
before=Date.now();
fps=0;
requestAnimationFrame(
    function loop(){
        now=Date.now();
        fps=Math.round(1000/(now-before));
        before=now;
        requestAnimationFrame(loop);
        
    }
 );

 setInterval(() => {
  fpsEl.innerText = fps;
 }, 125)