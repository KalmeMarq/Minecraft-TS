window.addEventListener('contextmenu', (e) => { e.preventDefault() }, false);
const root = document.getElementById('root');
const guiScale = Number(getComputedStyle(document.documentElement).getPropertyValue('--guiScale'));

let displayLang = 'en_us';
let recipesFile = [];
let langFile = [];
let recipesFiles = [];
let langFiles = [];

class Item {
  #isStackable;

  constructor(identifier, texture, maxStackSize) {
    this.identifier = identifier;
    this.texture = texture;
    this.maxStackSize = maxStackSize;
    this.#isStackable = maxStackSize === 1 ? false : true;
  }

  get isStackable() {
    return this.#isStackable;
  }
}

const RegistryItems = [
  new Item('acacia_boat','assets/minecraft/textures/item/acacia_boat.png', 1),
  new Item('acacia_door','assets/minecraft/textures/item/acacia_door.png', 64),
  new Item('acacia_sign','assets/minecraft/textures/item/acacia_sign.png', 16),
  new Item('apple','assets/minecraft/textures/item/apple.png', 64),
  new Item('armor_stand','assets/minecraft/textures/item/armor_stand.png', 64),
  new Item('arrow','assets/minecraft/textures/item/arrow.png', 64),
  new Item('baked_potato','assets/minecraft/textures/item/baked_potato.png', 64),
  new Item('bamboo','assets/minecraft/textures/item/bamboo.png', 64),
  new Item('barrier','assets/minecraft/textures/item/barrier.png', 64),
  new Item('beef','assets/minecraft/textures/item/beef.png', 64),
  new Item('beetroot','assets/minecraft/textures/item/beetroot.png', 64),
  new Item('beetroot_seeds','assets/minecraft/textures/item/beetroot_seeds.png', 64),
  new Item('beetroot_soup','assets/minecraft/textures/item/beetroot_soup.png', 1),
  new Item('bell','assets/minecraft/textures/item/bell.png', 64),
  new Item('birch_boat','assets/minecraft/textures/item/birch_boat.png', 1),
  new Item('birch_door','assets/minecraft/textures/item/birch_door.png', 64),
  new Item('birch_sign','assets/minecraft/textures/item/birch_sign.png', 64),
  new Item('black_dye','assets/minecraft/textures/item/black_dye.png', 64),
  new Item('blaze_powder','assets/minecraft/textures/item/blaze_powder.png', 64),
  new Item('blaze_rod','assets/minecraft/textures/item/blaze_rod.png', 64),
  new Item('blue_dye','assets/minecraft/textures/item/blue_dye.png', 64),
  new Item('bone','assets/minecraft/textures/item/bone.png', 64),
  new Item('bone_meal','assets/minecraft/textures/item/bone_meal.png', 64),
  new Item('book','assets/minecraft/textures/item/book.png', 64),
  new Item('bow','assets/minecraft/textures/item/bow.png', 1),
  new Item('bowl','assets/minecraft/textures/item/bowl.png', 64),
  new Item('bread','assets/minecraft/textures/item/bread.png', 64),
  new Item('brewing_stand','assets/minecraft/textures/item/brewing_stand.png', 64),
  new Item('brick','assets/minecraft/textures/item/brick.png', 64),
  new Item('brown_dye','assets/minecraft/textures/item/brown_dye.png', 64),
  new Item('bucket','assets/minecraft/textures/item/bucket.png', 64),
  new Item('cake','assets/minecraft/textures/item/cake.png', 64),
  new Item('campfire','assets/minecraft/textures/item/campfire.png', 64),
  new Item('carrot','assets/minecraft/textures/item/carrot.png', 64),
  new Item('chainmail_boots','assets/minecraft/textures/item/chainmail_boots.png', 1),
  new Item('chainmail_chestplate','assets/minecraft/textures/item/chainmail_chestplate.png', 1),
  new Item('chainmail_helmet','assets/minecraft/textures/item/chainmail_helmet.png', 1),
  new Item('chainmail_leggings','assets/minecraft/textures/item/chainmail_leggings.png', 1),
  new Item('charcoal', 'assets/minecraft/textures/item/charcoal.png', 64),
  new Item('chest_minecart', 'assets/minecraft/textures/item/chest_minecart.png', 1),
  new Item('chicken', 'assets/minecraft/textures/item/chicken.png', 64),
  new Item('chorus_fruit', 'assets/minecraft/textures/item/chorus_fruit.png', 64),
  new Item('clay_ball', 'assets/minecraft/textures/item/clay_ball.png', 64),
  new Item('clock', 'assets/minecraft/textures/item/clock.png', 64),
  new Item('coal', 'assets/minecraft/textures/item/coal.png', 64),
  new Item('cocoa_beans', 'assets/minecraft/textures/item/cocoa_beans.png', 64),
  new Item('cod', 'assets/minecraft/textures/item/cod.png', 64),
  new Item('comparator', 'assets/minecraft/textures/item/comparator.png', 64),
  new Item('compass', 'assets/minecraft/textures/item/compass.png', 64),
  new Item('cooked_beef', 'assets/minecraft/textures/item/cooked_beef.png', 64),
  new Item('cooked_chicken', 'assets/minecraft/textures/item/cooked_chicken.png', 64),
  new Item('cooked_cod', 'assets/minecraft/textures/item/cooked_cod.png', 64),
  new Item('cooked_mutton', 'assets/minecraft/textures/item/cooked_mutton.png', 64),
  new Item('cooked_porkchop', 'assets/minecraft/textures/item/cooked_porkchop.png', 64),
  new Item('cooked_rabbit', 'assets/minecraft/textures/item/cooked_rabbit.png', 64),
  new Item('cooked_salmon', 'assets/minecraft/textures/item/cooked_salmon.png', 64),
  new Item('cookie', 'assets/minecraft/textures/item/cookie.png', 64),
  new Item('crimson_door', 'assets/minecraft/textures/item/crimson_door.png', 64),
  new Item('crimson_sign', 'assets/minecraft/textures/item/crimson_sign.png', 64),
  new Item('crossbow_standby', 'assets/minecraft/textures/item/crossbow_standby.png', 64),
  new Item('cyan_dye', 'assets/minecraft/textures/item/cyan_dye.png', 64),
  new Item('dark_oak_boat', 'assets/minecraft/textures/item/dark_oak_boat.png', 64),
  new Item('dark_oak_door', 'assets/minecraft/textures/item/dark_oak_door.png', 64),
  new Item('dark_oak_sign', 'assets/minecraft/textures/item/dark_oak_sign.png', 64),
  new Item('diamond','assets/minecraft/textures/item/diamond.png', 64),
  new Item('diamond_sword', 'assets/minecraft/textures/item/diamond_sword.png', 1),
  new Item('feather','assets/minecraft/textures/item/feather.png', 64),
  new Item('flint','assets/minecraft/textures/item/flint.png', 64),
  new Item('gold_ingot', 'assets/minecraft/textures/item/gold_ingot.png', 64),
  new Item('golden_apple', 'assets/minecraft/textures/item/golden_apple.png', 64),
  new Item('golden_sword', 'assets/minecraft/textures/item/golden_sword.png', 1),
  new Item('iron_door', 'assets/minecraft/textures/item/iron_door.png', 64),
  new Item('iron_ingot', 'assets/minecraft/textures/item/iron_ingot.png', 64),
  new Item('iron_sword', 'assets/minecraft/textures/item/iron_sword.png', 1),
  new Item('leather','assets/minecraft/textures/item/leather.png', 1),
  new Item('paper','assets/minecraft/textures/item/paper.png', 64),
  new Item('shears','assets/minecraft/textures/item/shears.png', 1),
  new Item('stick','assets/minecraft/textures/item/stick.png', 64),
  new Item('snowball','assets/minecraft/textures/item/snowball.png', 16),
  new Item('string','assets/minecraft/textures/item/string.png', 64),
  new Item('sugar_cane','assets/minecraft/textures/item/sugar_cane.png', 64),
  new Item('wheat','assets/minecraft/textures/item/wheat.png', 64),
  new Item('cookie','assets/minecraft/textures/item/cookie.png', 64)
];

class PlayerInventory {
  constructor() {
    this.self = [
      { Slot: 0, Item: '', Count: 0 }, { Slot: 1, Item: '', Count: 0 }, { Slot: 2, Item: '', Count: 0 },
      { Slot: 3, Item: '', Count: 0 }, { Slot: 4, Item: '', Count: 0 }, { Slot: 5, Item: '', Count: 0 },
      { Slot: 6, Item: '', Count: 0 }, { Slot: 7, Item: '', Count: 0 }, { Slot: 8, Item: '', Count: 0 },
      { Slot: 9, Item: '', Count: 0 }, { Slot: 10, Item: '', Count: 0 }, { Slot: 11, Item: '', Count: 0 },
      { Slot: 12, Item: '', Count: 0 }, { Slot: 13, Item: '', Count: 0 }, { Slot: 14, Item: '', Count: 0 },
      { Slot: 15, Item: '', Count: 0 }, { Slot: 16, Item: '', Count: 0 }, { Slot: 17, Item: '', Count: 0 },
      { Slot: 18, Item: '', Count: 0 }, { Slot: 19, Item: '', Count: 0 }, { Slot: 20, Item: '', Count: 0 },
      { Slot: 21, Item: '', Count: 0 }, { Slot: 22, Item: '', Count: 0 }, { Slot: 23, Item: '', Count: 0 },
      { Slot: 24, Item: '', Count: 0 }, { Slot: 25, Item: '', Count: 0 }, { Slot: 26, Item: '', Count: 0 },
      { Slot: 18, Item: '', Count: 0 }, { Slot: 19, Item: '', Count: 0 }, { Slot: 20, Item: '', Count: 0 },
      { Slot: 21, Item: '', Count: 0 }, { Slot: 22, Item: '', Count: 0 }, { Slot: 23, Item: '', Count: 0 },
      { Slot: 24, Item: '', Count: 0 }, { Slot: 25, Item: '', Count: 0 }, { Slot: 26, Item: '', Count: 0 },
      { Slot: 27, Item: '', Count: 0 }, { Slot: 28, Item: '', Count: 0 }, { Slot: 29, Item: '', Count: 0 },
      { Slot: 30, Item: '', Count: 0 }
    ]
  }

  get playerHotbar() {
    return this.self.filter(slot => slot.Slot >= 0 && slot.Slot <= 8);
  }

  get playerHotbarSize() {
    return playerHotbar.length;
  }

  get playerInv() {
    return this.self.filter(slot => slot.Slot > 8 && slot.Slot <= 26);
  }

  get playerInvSize() {
    return playerInv.length;
  }

  get playerArmor() {
    return this.self.filter(slot => slot.Slot > 26 && slot.Slot <= 29);
  }
  
  get playerArmorSize() {
    return playerArmor.length;
  }

  get playerOffHand() {
    return this.self.filter(slot => slot.Slot > 29 && slot.Slot <= 30);
  }
}

let resultSlotGrid = {
  Slot: 0,
  Item: '',
  Count: 0
}

class CraftingGrid {
  constructor() {
    this.self = [
      { Slot: 0, Item: '', Count: 0 }, { Slot: 1, Item: '', Count: 0 }, { Slot: 2, Item: '', Count: 0 },
      { Slot: 3, Item: '', Count: 0 }, { Slot: 4, Item: '', Count: 0 }, { Slot: 5, Item: '', Count: 0 },
      { Slot: 6, Item: '', Count: 0 }, { Slot: 7, Item: '', Count: 0 }, { Slot: 8, Item: '', Count: 0 }
    ];

    return this.self;
  }

  get craftingGridSize() {
    return this.self.length;
  }
}

let furnaceGrid = [
  { Slot: 0, Item: '', Count: 0 },
  { Slot: 1, Item: '', Count: 0 },
  { Slot: 2, Item: '', Count: 0 }
];

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

const craftingGrid = new CraftingGrid();

const playerInventory = new PlayerInventory();
const playerInv = playerInventory.playerInv;
const playerHotbar = playerInventory.playerHotbar;

const inventoryEl = document.getElementById('inventory');
const hotbarEl = document.getElementById('hotbar');
const allItemsEl = document.getElementById('allitems');
const craftingtableEl = document.getElementById('craftingtable');
const craftinggridEl = document.getElementById('craftinggrid');

const furnaceEl = document.getElementById('furnace');
const furnaceinputEl = document.getElementById('furnaceinput');
const furnacefuelEl = document.getElementById('furnacefuel');
const furnaceoutputEl = document.getElementById('furnaceoutput');

function drawFlyingItem(e) {
  const item = RegistryItems[RegistryItems.findIndex(item => item.identifier === selectedItem.Item) || 0];

  removeFlyingItem();

  if(selectedItem.getCount() === 0) {
    removeFlyingItem();
    selectedItem.reset();
  }

  if(selectedItem.getItemID() !== '') {
    const slotItem = document.createElement('div');
    slotItem.id = 'flyingItem';

    const img = document.createElement('img');
    img.src = item.texture;
    slotItem.appendChild(img);

    if(item.isStackable) {
      const stackSpan = document.createElement('span');
      stackSpan.classList.add('stack-size');
      stackSpan.innerText = selectedItem.getCount() !== 1 ? selectedItem.Count : '';
      slotItem.appendChild(stackSpan);
    }

    slotItem.style.top = e.pageY - (8 * guiScale) + 'px';
    slotItem.style.left = e.clientX - (8 * guiScale) + 'px';

    root.appendChild(slotItem);
  }
}

function removeFlyingItem() {
  if(document.getElementById('flyingItem')) {
    document.getElementById('flyingItem').remove();
  }
}

function drawAllItems() {
  allItemsEl.innerHTML = '';
  
  RegistryItems.forEach(invSlot => {
    const itemID = invSlot.identifier;
    const itemName = invSlot.name;
    const itemTexture = invSlot.texture;
    const itemMaxStackSize = invSlot.maxStackSize;

    const slotEl = document.createElement('div');
    slotEl.classList.add('slot');
    slotEl.tabIndex = '0';

    slotEl.setAttribute('data-tooltip', translateKey(`item.${itemID}.name`));

    // console.log(langFiles[langFiles.findIndex(file => file[langFiles.id] === displayLang)]);
   /*  slotEl.addEventListener('mouseenter', () => {
      slotEl.focus();
    });

    slotEl.addEventListener('mouseleave', () => {6
      slotEl.blur();
    }); */

    slotEl.addEventListener('keydown', (e) => {

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
        drawFlyingItem(e);
      } else if(selectedItem.Item !== '') {
        selectedItem.reset();
        removeFlyingItem();
      }
    });

    const img = document.createElement('img');
    img.src = itemTexture;
    slotEl.appendChild(img);

    allItemsEl.appendChild(slotEl);
  });
}



function drawInv() {
  inventoryEl.innerHTML = '';

  playerInv.forEach(invSlot => {
    const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === invSlot.Item)];

    const slotEl = document.createElement('div');
    slotEl.classList.add('slot');

    if(invSlot.Item === '') {
      slotEl.setAttribute('data-tooltip', 'empty');
    } else {
      slotEl.setAttribute('data-tooltip', translateKey(`item.${invSlot.Item}.name`));
    }

    slotEl.addEventListener('mousedown', (e) => {
      if(e.button === 2 && selectedItem.getCount() > 0) {
        invSlot.Item = selectedItem.getItemID();
        invSlot.Count++;

        selectedItem.set(selectedItem.Item, selectedItem.getCount() - 1);

        drawInv();
        drawFlyingItem(e);

        localStorage.setItem('playerInv', JSON.stringify(playerInv));
      }
    })

    slotEl.addEventListener('click', (e) => {
      if(selectedItem.getItemID() === '') {
        if(e.shiftKey) {
          selectedItem.set(invSlot.Item, Math.round(invSlot.Count / 2));
          invSlot.Count = invSlot.Count - Math.round(invSlot.Count / 2);
        } else {
          selectedItem.set(invSlot.Item, invSlot.Count);
          invSlot.Item = '';
          invSlot.Count = 0;

          localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
        }
        slotEl.setAttribute('data-tooltip', 'empty');

        drawInv();
        drawFlyingItem(e);

      } else if(selectedItem.getItemID() !== '') {
        if(invSlot.Item === '') {
          invSlot.Item = selectedItem.getItemID();
          invSlot.Count = selectedItem.getCount();

          selectedItem.reset();
          drawInv();
          removeFlyingItem();

          localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
        } else if(selectedItem.getItemID() === invSlot.Item) {
            if((invSlot.Count + selectedItem.getCount()) <= regItem.maxStackSize) {
              invSlot.Count += selectedItem.getCount();
              selectedItem.reset();
              removeFlyingItem();

              localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
            } else {
              const amountAdded = regItem.maxStackSize - invSlot.Count;

              invSlot.Count = regItem.maxStackSize;

              selectedItem.set(selectedItem.getItemID(), amountAdded)
              drawFlyingItem(e);

              localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
            }


          drawInv();
        } else {
          const storeSelectedItem = {
            Item: selectedItem.getItemID(),
            Count: selectedItem.getCount()
          }

          const storeinvSlot = {
            Item: invSlot.Item,
            Count: invSlot.Count 
          }

          selectedItem.set(storeinvSlot.Item, storeinvSlot.Count);
          invSlot.Item = storeSelectedItem.Item;
          invSlot.Count = storeSelectedItem.Count;

          drawFlyingItem(e);
          drawInv();

        }
      }

    });

    if(invSlot.Item !== '') {
      const img = document.createElement('img');
      img.src = regItem.texture;
      slotEl.appendChild(img);

      if(regItem.isStackable) {
        const stackSpan = document.createElement('span');
        stackSpan.classList.add('stack-size');
        stackSpan.innerText = invSlot.Count !== 1 ? invSlot.Count : '';
        slotEl.appendChild(stackSpan);
      }
    } else slotEl.innerHTML = '';

    inventoryEl.appendChild(slotEl);
  })
}


function drawHotbar() {
  hotbarEl.innerHTML = '';

  playerHotbar.forEach(hotbarSlot => {
    const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === hotbarSlot.Item)];

    const slotEl = document.createElement('div');
    slotEl.classList.add('slot');

    if(hotbarSlot.Item === '') {
      slotEl.setAttribute('data-tooltip', 'empty');
    } else {
      slotEl.setAttribute('data-tooltip', translateKey(`item.${hotbarSlot.Item}.name`));
    }

    /* slotEl.addEventListener('dblclick', () => {
      let allSize = 0;

      playerHotbar.forEach(slotsearch => {

        if(slotsearch.Item === hotbarSlot.Item) {
          allSize += slotsearch.Count;

          if(slotsearch.Slot !== hotbarSlot.Slot) {
            slotsearch.Item = '';
            slotsearch.Count = 0;
          }
        }
      });

      playerInv.forEach(slotsearch1 => {

        if(slotsearch1.Item === hotbarSlot.Item) {
          allSize += slotsearch1.Count;

          if(slotsearch1.Slot !== hotbarSlot.Slot) {
            slotsearch1.Item = '';
            slotsearch1.Count = 0;
          }
        }
      });

      console.log(allSize);

      hotbarSlot.Count = allSize;

      allSize = 0;
      drawInv()
      drawHotbar()

    }); */

    slotEl.addEventListener('mousedown', (e) => {
      if(e.button === 2 && selectedItem.getCount() > 0) {
        hotbarSlot.Item = selectedItem.getItemID();
        hotbarSlot.Count++;

        selectedItem.set(selectedItem.Item, selectedItem.getCount() - 1);

        drawHotbar();
        drawFlyingItem(e);
      }
    })

    slotEl.addEventListener('click', (e) => {
      if(selectedItem.getItemID() === '') {
        if(e.shiftKey) {
          selectedItem.set(hotbarSlot.Item, Math.round(hotbarSlot.Count / 2));
          hotbarSlot.Count = hotbarSlot.Count - Math.round(hotbarSlot.Count / 2);
        } else {
          selectedItem.set(hotbarSlot.Item, hotbarSlot.Count);
          hotbarSlot.Item = '';
          hotbarSlot.Count = 0;

          localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
        }
        slotEl.setAttribute('data-tooltip', 'empty');

        drawHotbar();
        drawFlyingItem(e);

      } else if(selectedItem.getItemID() !== '') {
        if(hotbarSlot.Item === '') {
          hotbarSlot.Item = selectedItem.getItemID();
          hotbarSlot.Count = selectedItem.getCount();

          selectedItem.reset();
          drawHotbar();
          removeFlyingItem();

          localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
        } else if(selectedItem.getItemID() === hotbarSlot.Item) {
            if((hotbarSlot.Count + selectedItem.getCount()) <= regItem.maxStackSize) {
              hotbarSlot.Count += selectedItem.getCount();
              selectedItem.reset();
              removeFlyingItem();

              localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
            } else {
              const amountAdded = regItem.maxStackSize - hotbarSlot.Count;

              hotbarSlot.Count = regItem.maxStackSize;

              selectedItem.set(selectedItem.getItemID(), amountAdded)
              drawFlyingItem(e);

              localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
            }


          drawHotbar();
        } else {
          const storeSelectedItem = {
            Item: selectedItem.getItemID(),
            Count: selectedItem.getCount()
          }

          const storeHotbarSlot = {
            Item: hotbarSlot.Item,
            Count: hotbarSlot.Count 
          }

          selectedItem.set(storeHotbarSlot.Item, storeHotbarSlot.Count);
          hotbarSlot.Item = storeSelectedItem.Item;
          hotbarSlot.Count = storeSelectedItem.Count;

          drawFlyingItem(e);
          drawHotbar();

        }
      }

    });

    if(hotbarSlot.Item !== '') {
      const img = document.createElement('img');
      img.src = regItem.texture;

      if(regItem.isStackable) {
        const stackSpan = document.createElement('span');
        stackSpan.classList.add('stack-size');
        stackSpan.innerText = hotbarSlot.Count !== 1 ? hotbarSlot.Count : '';
        slotEl.appendChild(stackSpan);
      }

      slotEl.appendChild(img);
    } else slotEl.innerHTML = '';

    hotbarEl.appendChild(slotEl);
  })
}

function drawCraftingGrid() {
  craftinggridEl.innerHTML = '';

  craftingGrid.forEach(craftingSlot => {
    const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === craftingSlot.Item)];

    
    const slotEl = document.createElement('div');
    slotEl.classList.add('slot');

    if(craftingSlot.Item === '') {
      slotEl.setAttribute('data-tooltip', 'empty');
    } else {
      slotEl.setAttribute('data-tooltip', translateKey(`item.${craftingSlot.Item}.name`));
    }

    slotEl.addEventListener('mousedown', (e) => {
      if(e.button === 2 && selectedItem.getCount() > 0) {
        craftingSlot.Item = selectedItem.getItemID();
        craftingSlot.Count++;

        selectedItem.set(selectedItem.Item, selectedItem.getCount() - 1);

        checkForRecipes();
        drawResultSlotGrid();
        drawCraftingGrid();
        drawFlyingItem(e);
      }
    })

    function checkForRecipes() {

      for(let i = 0; i < recipesFiles.length; i++) {
        const recipe = recipesFiles[i];


        if(craftingGrid[0].Item === recipe.grid[0] && craftingGrid[1].Item === recipe.grid[1] && craftingGrid[2].Item === recipe.grid[2] &&
          craftingGrid[3].Item === recipe.grid[3] && craftingGrid[4].Item === recipe.grid[4] && craftingGrid[5].Item === recipe.grid[5] &&
          craftingGrid[6].Item === recipe.grid[6] && craftingGrid[7].Item === recipe.grid[7] && craftingGrid[8].Item === recipe.grid[8]) {
            resultSlotGrid.Item = recipe.result;
            resultSlotGrid.Count = recipe.count;

            drawResultSlotGrid();
            break;
          } else {
            resultSlotGrid.Item = '';
            resultSlotGrid.Count = 0;
            drawResultSlotGrid();
          }
      }
    }

    slotEl.addEventListener('click', (e) => {
      if(selectedItem.getItemID() === '') {
        if(e.shiftKey) {
          selectedItem.set(craftingSlot.Item, Math.round(craftingSlot.Count / 2));
          craftingSlot.Count = craftingSlot.Count - Math.round(craftingSlot.Count / 2);
        } else {
          selectedItem.set(craftingSlot.Item, craftingSlot.Count);
          craftingSlot.Item = '';
          craftingSlot.Count = 0;

          localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
        }
        slotEl.setAttribute('data-tooltip', 'empty');

        drawCraftingGrid();
        drawFlyingItem(e);
        checkForRecipes();

      } else if(selectedItem.getItemID() !== '') {
        if(craftingSlot.Item === '') {
          craftingSlot.Item = selectedItem.getItemID();
          craftingSlot.Count = selectedItem.getCount();

          selectedItem.reset();

          drawCraftingGrid();
          removeFlyingItem();
          checkForRecipes();

          localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
        } else if(selectedItem.getItemID() === craftingSlot.Item) {
            if((craftingSlot.Count + selectedItem.getCount()) <= regItem.maxStackSize) {
              craftingSlot.Count += selectedItem.getCount();
              selectedItem.reset();
              removeFlyingItem();

              localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
            } else {
              const amountAdded = regItem.maxStackSize - craftingSlot.Count;

              craftingSlot.Count = regItem.maxStackSize;

              selectedItem.set(selectedItem.getItemID(), amountAdded)
              drawFlyingItem(e);

              localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
            }


          drawCraftingGrid();
          checkForRecipes();
        } else {
          const storeSelectedItem = {
            Item: selectedItem.getItemID(),
            Count: selectedItem.getCount()
          }

          const storecraftingSlot = {
            Item: craftingSlot.Item,
            Count: craftingSlot.Count 
          }

          selectedItem.set(storecraftingSlot.Item, storecraftingSlot.Count);
          craftingSlot.Item = storeSelectedItem.Item;
          craftingSlot.Count = storeSelectedItem.Count;


          drawFlyingItem(e);
          drawCraftingGrid();
          checkForRecipes();
        }
      }});



    if(craftingSlot.Item !== '') {
      const img = document.createElement('img');
      img.src = regItem.texture;

      if(regItem.isStackable) {
        const stackSpan = document.createElement('span');
        stackSpan.classList.add('stack-size');
        stackSpan.innerText = craftingSlot.Count !== 1 ? craftingSlot.Count : '';
        slotEl.appendChild(stackSpan);
      }

      slotEl.appendChild(img);
    } else slotEl.innerHTML = '';

    craftinggridEl.appendChild(slotEl);
  })
}

function drawResultSlotGrid() {
  document.getElementById('resultSlot').innerHTML = '';
  const resultSlot = document.createElement('div');
  resultSlot.classList.add('slot');

  if(resultSlotGrid.Item === '') {
    resultSlot.setAttribute('data-tooltip', 'empty');
  } else {
    resultSlot.setAttribute('data-tooltip', translateKey(`item.${resultSlotGrid.Item}.name`));
  }

  resultSlot.addEventListener('click', (e) => {
    if(resultSlotGrid.Item !== '') {

      selectedItem.set(resultSlotGrid.Item, resultSlotGrid.Count);
      resultSlotGrid.Item = '';
      resultSlotGrid.Count = 0;

      craftingGrid.forEach(gridItem => {
        gridItem.Item = '';
        gridItem.Count = 0;
      })

      drawCraftingGrid();
      drawResultSlotGrid();
      drawFlyingItem(e);

    }
  });
  

  if(resultSlotGrid.Count !== 0) {
    const img = document.createElement('img');

    const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === resultSlotGrid.Item)];
    img.src = regItem.texture;

    if(regItem.isStackable) {
      const stackSpan = document.createElement('span');
      stackSpan.classList.add('stack-size');
      stackSpan.innerText = resultSlotGrid.Count !== 1 ? resultSlotGrid.Count : '';
      resultSlot.appendChild(stackSpan);
    }

    resultSlot.appendChild(img);


  } else resultSlot.innerHTML = '';

  document.getElementById('resultSlot').appendChild(resultSlot);
}

function drawFurnaceGrid() {
  furnaceinputEl.innerHTML = '';
  furnacefuelEl.innerHTML = '';
  furnaceoutputEl.innerHTML = '';

  const inputSlot = document.createElement('div'); inputSlot.classList.add('slot');
  const fueltSlot = document.createElement('div'); fueltSlot.classList.add('slot');
  const outputSlot = document.createElement('div'); outputSlot.classList.add('slot');

 /*  slotEl.addEventListener('click', (e) => {
    if(selectedItem.getItemID() === '') {
      if(e.shiftKey) {
        selectedItem.set(furnaceGrid[0].Item, Math.round(furnaceGrid[0].Count / 2));
        furnaceGrid[0].Count = furnaceGrid[0].Count - Math.round(furnaceGrid[0].Count / 2);
      } else {
        selectedItem.set(furnaceGrid[0].Item, furnaceGrid[0].Count);
        furnaceGrid[0].Item = '';
        furnaceGrid[0].Count = 0;

        localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
      }

      drawFurnaceGrid();
      drawFlyingItem(e);

    } else if(selectedItem.getItemID() !== '') {
      if(furnaceGrid[0].Item === '') {
        furnaceGrid[0].Item = selectedItem.getItemID();
        furnaceGrid[0].Count = selectedItem.getCount();

        selectedItem.reset();
        drawFurnaceGrid();
        removeFlyingItem();

        localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
      } else if(selectedItem.getItemID() === furnaceGrid[0].Item) {
          if((furnaceGrid[0].Count + selectedItem.getCount()) <= regItem.maxStackSize) {
            furnaceGrid[0].Count += selectedItem.getCount();
            selectedItem.reset();
            removeFlyingItem();

            localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
          } else {
            const amountAdded = regItem.maxStackSize - furnaceGrid[0].Count;

            furnaceGrid[0].Count = regItem.maxStackSize;

            selectedItem.set(selectedItem.getItemID(), amountAdded)
            drawFlyingItem(e);

            localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
          }


          drawFurnaceGrid();
      }
    }}); */
  
  if(furnaceGrid[0].Count !== 0) {
    const img = document.createElement('img');

    const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === furnaceGrid[0].Item)];
    img.src = 'assets/minecraft/textures/item/diamond_sword.png';

    if(false) {
      const stackSpan = document.createElement('span');
      stackSpan.classList.add('stack-size');
      stackSpan.innerText = furnaceGrid[0].Count !== 1 ? furnaceGrid[0].Count : '';
      resultSlot.appendChild(stackSpan);
    }

    inputSlot.appendChild(img);


  } else inputSlot.innerHTML = '';

  if(furnaceGrid[1].Count !== 0) {
    const img = document.createElement('img');

    const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === furnaceGrid[1].Item)];
    img.src = 'assets/minecraft/textures/item/diamond_sword.png';

    if(false) {
      const stackSpan = document.createElement('span');
      stackSpan.classList.add('stack-size');
      stackSpan.innerText = craftingSlot.Count !== 1 ? craftingSlot.Count : '';
      resultSlot.appendChild(stackSpan);
    }

    fueltSlot.appendChild(img);


  } else inputSlot.innerHTML = '';

  if(furnaceGrid[2].Count !== 0) {
    const img = document.createElement('img');

    const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === furnaceGrid[2].Item)];
    img.src = 'assets/minecraft/textures/item/diamond_sword.png';

    if(false) {
      const stackSpan = document.createElement('span');
      stackSpan.classList.add('stack-size');
      stackSpan.innerText = craftingSlot.Count !== 1 ? craftingSlot.Count : '';
      resultSlot.appendChild(stackSpan);
    }

    outputSlot.appendChild(img);


  } else inputSlot.innerHTML = '';

  furnaceinputEl.appendChild(inputSlot);
  furnacefuelEl.appendChild(fueltSlot);
  furnaceoutputEl.appendChild(outputSlot);
}


function resetPlayerInvHotbar() {
  playerInv.forEach(invSlot => {
    invSlot.Item = '';
    invSlot.Count = 0;
  });

  playerHotbar.forEach(hotbarSlot => {
    hotbarSlot.Item = '';
    hotbarSlot.Count = 0;
  });

  drawInv();
  drawHotbar();

  localStorage.setItem('playerInv', JSON.stringify(playerInv));
  localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
}

function resetAll() {
  resetPlayerInvHotbar();

  craftingGrid.forEach(craftingSlot => {
    craftingSlot.Item = '';
    craftingSlot.Count = 0;
  });

  resultSlotGrid.Item = '';
  resultSlotGrid.Count = 0;

  furnaceGrid.forEach(furnaceSlot => {
    furnaceSlot.Item = '';
    furnaceSlot.Count = 0;
  })
}

async function getJSONData(url) {
  const res = await fetch(url);
  return await res.json(); 
}

async function getAllFiles(url, a, save) {
  let aaa = await getJSONData(url);

  aaa.forEach(async (src) => {
    let urlData = await getJSONData(src);

    save.push(await urlData);
  })
}

// async function getAllLangs(url, save) {
//   let file = await async () {
//   };

//   file.forEach(async (src) => {
//     let urlData = await getJSONData(src);

//     save.push(await urlData);
//   })
// }


function translateKey(key) {
  // for(let i = 0; i < langFiles.length; i++) {
  //   if(langFiles[i]['lang.id'] === displayLang && langFiles[i][key]) {
  //     return langFiles[i][key]
  //   } else {
  //     return key
  //   }
  // }

  const findDefaultLangIdx = langFiles.findIndex(lang => lang['lang.id'] === 'en_us');
  const findLangIdx = langFiles.findIndex(lang => lang['lang.id'] === displayLang);
  const findDefaultlang = langFiles[findDefaultLangIdx];
  const findlang = langFiles[findLangIdx];

  if(findlang[key]) {
    return findlang[key]
  } else if(findDefaultlang[key]) {
    return findDefaultlang[key];
  } else {
    return key
  }
}
document.getElementById('langSelection').addEventListener('change', (e) => {
  displayLang = document.getElementById('langSelection').value;

  // resetAll();

  drawAllItems();
  drawInv();
  drawHotbar();
  drawCraftingGrid();
  drawResultSlotGrid();
  drawFurnaceGrid();
});

async function initMinecraft() {
  await getAllFiles('./assets/minecraft/lang/languages.json', langFile, langFiles);
  
  await getAllFiles('./data/minecraft/recipes.json', recipesFile, recipesFiles);
  await getAllFiles('./data/minecraft/recipes.json', recipesFile, recipesFiles);

  console.log(langFiles[langFiles.findIndex(file => file['lang.id'] === 'en_us')]);
  console.log(recipesFiles[0]);

  drawAllItems();
  drawInv();
  drawHotbar();
  drawCraftingGrid();
  drawResultSlotGrid();
  drawFurnaceGrid();
}

window.addEventListener('DOMContentLoaded', () => {
  initMinecraft();
})

const tooltip = document.getElementById('tooltip');

window.addEventListener('mousemove', (e) => {
  if(document.getElementById('flyingItem')) {
    document.getElementById('flyingItem').style.top = e.pageY - (8 * guiScale) + 'px';
    document.getElementById('flyingItem').style.left = e.clientX - (8 * guiScale) + 'px';
  }

  tooltip.style.top = e.pageY - 15 + 'px';
  tooltip.style.left = e.clientX + 10 + 'px';
});

window.addEventListener('mouseover', (e) => {
  if(e.target.dataset.tooltip && e.target.dataset.tooltip !== 'empty') {
    tooltip.innerHTML = e.target.dataset.tooltip;
    tooltip.style.position = 'absolute';
    tooltip.style.zIndex = '200';
    tooltip.style.display = 'flex';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.padding = '0.2rem 0.9rem 0.4rem 0.9rem';
    tooltip.style.cursor = 'none';
    tooltip.style.background = 'rgba(16, 0, 16, 0.90)';
    tooltip.style.boxShadow = `inset ${0.5 * guiScale}px ${0.5 * guiScale}px 0px 1px rgba(48, 0, 160, 0.45), inset -${0.5 * guiScale}px -${0.5 * guiScale}px 0px 1px rgba(48, 0, 160, 0.45)`;
    tooltip.style.color = 'white';
    tooltip.style.top = e.pageY - 15 + 'px';
    tooltip.style.left = e.clientX + 10 + 'px';
  } else {
    tooltip.innerHTML = '';
    tooltip.style.display = 'none';
  }
})

/* 

function addItem(grid, slotIdx, item, count) {
  const findSlot = grid.findIndex(slot => slot.Slot === slotIdx);

  grid[findSlot].Item = item;
  grid[findSlot].Count = count;

  drawInv();
  drawHotbar();
}

function removeItem(grid, slotIdx) {
  const findSlot = grid.findIndex(slot => slot.Slot === slotIdx);

  grid[findSlot].Item = '';
  grid[findSlot].Count = 0;

  drawInv();
  drawHotbar();
} */