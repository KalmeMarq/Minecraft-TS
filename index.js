window.addEventListener('contextmenu', (e) => { e.preventDefault() }, false);

const root = document.getElementById('root');

let recipesFile = [];
let langFile = [];
let recipesFiles = [];
let langFiles = [];

let isCreativeMode = true;

/* Get JSON Files Data */
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

/* Get Translation text if possible */
function translateKey(key) {
  const langDefault = langFiles.find(file => file['lang.id'] === defaultLang);
  const lang = langFiles.find(file => file['lang.id'] === displayLang);

  if(lang[key]) {
    return lang[key]
  } else if(langDefault[key]) {
    return langDefault[key];
  } else {
    return key
  }
}

/* Settings */
let defaultLang = 'en_us';
let displayLang = 'en_us';
let soundVolume = 0.5;
let guiScale = Number(getComputedStyle(document.documentElement).getPropertyValue('--guiScale'));
let advancedTooltip = false;

/* Item Registry */
class Item {
  #isStackable;
  #isDamageable;

  constructor(identifier, texture, maxStackSize, maxDamage, itemGroup) {
    this.identifier = identifier;
    this.texture = texture;
    this.maxStackSize = maxStackSize;
    this.#isStackable = maxStackSize === 1 ? false : true;
    this.maxDamage = maxDamage;
    this.#isDamageable = maxDamage === -1 ? false : true;
    this.itemGroup = itemGroup;
  }

  get isStackable() {
    return this.#isStackable;
  }
}

const RegistryItems = [
  new Item('acacia_boat','assets/minecraft/textures/item/acacia_boat.png', 1, -1, 'misc'),
  new Item('acacia_door','assets/minecraft/textures/item/acacia_door.png', 64, -1, 'misc'),
  new Item('acacia_sign','assets/minecraft/textures/item/acacia_sign.png', 16, -1, 'misc'),
  new Item('apple','assets/minecraft/textures/item/apple.png', 64, -1, 'foodstuffs'),
  new Item('armor_stand','assets/minecraft/textures/item/armor_stand.png', 64, -1, 'misc'),
  new Item('arrow','assets/minecraft/textures/item/arrow.png', 64, -1, 'misc'),
  new Item('baked_potato','assets/minecraft/textures/item/baked_potato.png', 64, -1, 'foodstuffs'),
  new Item('bamboo','assets/minecraft/textures/item/bamboo.png', 64, -1, 'misc'),
  new Item('barrier','assets/minecraft/textures/item/barrier.png', 64, -1, 'misc'),
  new Item('beef','assets/minecraft/textures/item/beef.png', 64, -1, 'foodstuffs'),
  new Item('beetroot','assets/minecraft/textures/item/beetroot.png', 64, -1, 'foodstuffs'),
  new Item('beetroot_seeds','assets/minecraft/textures/item/beetroot_seeds.png', 64, -1, 'misc'),
  new Item('beetroot_soup','assets/minecraft/textures/item/beetroot_soup.png', 1, -1, 'foodstuffs'),
  new Item('bell','assets/minecraft/textures/item/bell.png', 64, -1, 'misc'),
  new Item('birch_boat','assets/minecraft/textures/item/birch_boat.png', 1, -1, 'misc'),
  new Item('birch_door','assets/minecraft/textures/item/birch_door.png', 64, -1, 'misc'),
  new Item('birch_sign','assets/minecraft/textures/item/birch_sign.png', 64, -1, 'misc'),
  new Item('black_dye','assets/minecraft/textures/item/black_dye.png', 64, -1, 'misc'),
  new Item('blaze_powder','assets/minecraft/textures/item/blaze_powder.png', 64, -1, 'misc'),
  new Item('blaze_rod','assets/minecraft/textures/item/blaze_rod.png', 64, -1, 'misc'),
  new Item('blue_dye','assets/minecraft/textures/item/blue_dye.png', 64, -1, 'misc'),
  new Item('bone','assets/minecraft/textures/item/bone.png', 64, -1, 'misc'),
  new Item('bone_meal','assets/minecraft/textures/item/bone_meal.png', 64, -1, 'misc'),
  new Item('book','assets/minecraft/textures/item/book.png', 64, -1, 'misc'),
  new Item('bow','assets/minecraft/textures/item/bow.png', 1, -1, 'tools'),
  new Item('bowl','assets/minecraft/textures/item/bowl.png', 64, -1, 'misc'),
  new Item('bread','assets/minecraft/textures/item/bread.png', 64, -1, 'foodstuffs'),
  new Item('brewing_stand','assets/minecraft/textures/item/brewing_stand.png', 64, -1, 'misc'),
  new Item('brick','assets/minecraft/textures/item/brick.png', 64, -1, 'misc'),
  new Item('brown_dye','assets/minecraft/textures/item/brown_dye.png', 64, -1, 'misc'),
  new Item('bucket','assets/minecraft/textures/item/bucket.png', 64, -1, 'misc'),
  new Item('cake','assets/minecraft/textures/item/cake.png', 64, -1, 'foodstuffs'),
  new Item('campfire','assets/minecraft/textures/item/campfire.png', 64, -1, 'misc'),
  new Item('carrot','assets/minecraft/textures/item/carrot.png', 64, -1, 'foodstuffs'),
  new Item('chainmail_boots','assets/minecraft/textures/item/chainmail_boots.png', 1, -1, 'equipment'),
  new Item('chainmail_chestplate','assets/minecraft/textures/item/chainmail_chestplate.png', 1, -1, 'equipment'),
  new Item('chainmail_helmet','assets/minecraft/textures/item/chainmail_helmet.png', 1, -1, 'equipment'),
  new Item('chainmail_leggings','assets/minecraft/textures/item/chainmail_leggings.png', 1, -1, 'equipment'),
  new Item('charcoal', 'assets/minecraft/textures/item/charcoal.png', 64, -1, 'misc'),
  new Item('chest_minecart', 'assets/minecraft/textures/item/chest_minecart.png', 1, -1, 'misc'),
  new Item('chicken', 'assets/minecraft/textures/item/chicken.png', 64, -1, 'misc'),
  new Item('chorus_fruit', 'assets/minecraft/textures/item/chorus_fruit.png', 64, -1, 'foodstuffs'),
  new Item('clay_ball', 'assets/minecraft/textures/item/clay_ball.png', 64, -1, 'misc'),
  new Item('clock', 'assets/minecraft/textures/item/clock.png', 64, -1, 'tools'),
  new Item('coal', 'assets/minecraft/textures/item/coal.png', 64, -1, 'misc'),
  new Item('cocoa_beans', 'assets/minecraft/textures/item/cocoa_beans.png', 64, -1, 'misc'),
  new Item('cod', 'assets/minecraft/textures/item/cod.png', 64, -1, 'foodstuffs'),
  new Item('comparator', 'assets/minecraft/textures/item/comparator.png', 64, -1, 'misc'),
  new Item('compass', 'assets/minecraft/textures/item/compass.png', 64, -1, 'tools'),
  new Item('cooked_beef', 'assets/minecraft/textures/item/cooked_beef.png', 64, -1, 'foodstuffs'),
  new Item('cooked_chicken', 'assets/minecraft/textures/item/cooked_chicken.png', 64, -1, 'foodstuffs'),
  new Item('cooked_cod', 'assets/minecraft/textures/item/cooked_cod.png', 64, -1, 'foodstuffs'),
  new Item('cooked_mutton', 'assets/minecraft/textures/item/cooked_mutton.png', 64, -1, 'foodstuffs'),
  new Item('cooked_porkchop', 'assets/minecraft/textures/item/cooked_porkchop.png', 64, -1, 'foodstuffs'),
  new Item('cooked_rabbit', 'assets/minecraft/textures/item/cooked_rabbit.png', 64, -1, 'foodstuffs'),
  new Item('cooked_salmon', 'assets/minecraft/textures/item/cooked_salmon.png', 64, -1, 'foodstuffs'),
  new Item('crimson_door', 'assets/minecraft/textures/item/crimson_door.png', 64, -1, 'misc'),
  new Item('crimson_sign', 'assets/minecraft/textures/item/crimson_sign.png', 64, -1, 'misc'),
  new Item('crossbow_standby', 'assets/minecraft/textures/item/crossbow_standby.png', 64, -1, 'equipment'),
  new Item('cyan_dye', 'assets/minecraft/textures/item/cyan_dye.png', 64, -1, 'misc'),
  new Item('dark_oak_boat', 'assets/minecraft/textures/item/dark_oak_boat.png', 64, -1, 'misc'),
  new Item('dark_oak_door', 'assets/minecraft/textures/item/dark_oak_door.png', 64, -1, 'misc'),
  new Item('dark_oak_sign', 'assets/minecraft/textures/item/dark_oak_sign.png', 64, -1, 'misc'),
  new Item('diamond','assets/minecraft/textures/item/diamond.png', 64, -1, 'misc'),
  new Item('diamond_axe', 'assets/minecraft/textures/item/diamond_axe.png', 1, -1, 'tools'),
  new Item('diamond_boots', 'assets/minecraft/textures/item/diamond_boots.png', 1, -1, 'equipment'),
  new Item('diamond_chestplate', 'assets/minecraft/textures/item/diamond_chestplate.png', 1, -1, 'equipment'),
  new Item('diamond_helmet', 'assets/minecraft/textures/item/diamond_helmet.png', 1, -1, 'equipment'),
  new Item('diamond_hoe', 'assets/minecraft/textures/item/diamond_hoe.png', 1, -1, 'tools'),
  new Item('diamond_horse_armor', 'assets/minecraft/textures/item/diamond_horse_armor.png', 1, -1, 'tools'),
  new Item('diamond_leggings', 'assets/minecraft/textures/item/diamond_leggings.png', 1, -1, 'equipment'),
  new Item('diamond_pickaxe', 'assets/minecraft/textures/item/diamond_pickaxe.png', 1, -1, 'tools'),
  new Item('diamond_shovel', 'assets/minecraft/textures/item/diamond_shovel.png', 1, -1, 'tools'),
  new Item('diamond_sword', 'assets/minecraft/textures/item/diamond_sword.png', 1, -1, 'equipment'),
  new Item('dragon_breath', 'assets/minecraft/textures/item/dragon_breath.png', 64, -1, 'misc'),
  new Item('dried_kelp', 'assets/minecraft/textures/item/dried_kelp.png', 64, -1, 'foodstuffs'),
  new Item('egg', 'assets/minecraft/textures/item/egg.png', 16, -1, 'misc'),
  new Item('emerald', 'assets/minecraft/textures/item/emerald.png', 64, -1, 'misc'),
  new Item('end_crystal', 'assets/minecraft/textures/item/end_crystal.png', 64, -1, 'misc'),
  new Item('ender_eye', 'assets/minecraft/textures/item/ender_eye.png', 16, -1, 'misc'),
  new Item('ender_pearl', 'assets/minecraft/textures/item/ender_pearl.png', 16, -1, 'misc'),
  new Item('experience_bottle', 'assets/minecraft/textures/item/experience_bottle.png', 64, -1, 'misc'),
  new Item('feather','assets/minecraft/textures/item/feather.png', 64, -1, 'misc'),
  new Item('fermented_spider_eye','assets/minecraft/textures/item/fermented_spider_eye.png', 64, -1, 'foodstuffs'),
  new Item('fire_charge','assets/minecraft/textures/item/fire_charge.png', 64, -1, 'misc'),
  new Item('firework_rocket','assets/minecraft/textures/item/firework_rocket.png', 64, -1, 'misc'),
  new Item('fishing_rod','assets/minecraft/textures/item/fishing_rod.png', 64, -1, 'tools'),
  new Item('flint','assets/minecraft/textures/item/flint.png', 64, -1, 'misc'),
  new Item('flint_and_steel','assets/minecraft/textures/item/flint_and_steel.png', 1, -1, 'tools'),
  new Item('flower_pot','assets/minecraft/textures/item/flower_pot.png', 64, -1, 'misc'),
  new Item('furnace_minecart','assets/minecraft/textures/item/furnace_minecart.png', 64, -1, 'misc'),
  new Item('ghast_tear','assets/minecraft/textures/item/ghast_tear.png', 64, -1, 'misc'),
  new Item('glass_bottle','assets/minecraft/textures/item/glass_bottle.png', 64, -1, 'misc'),
  new Item('glistering_melon_slice','assets/minecraft/textures/item/glistering_melon_slice.png', 64, -1, 'misc'),
  new Item('glowstone_dust','assets/minecraft/textures/item/glowstone_dust.png', 64, -1, 'misc'),
  new Item('gold_ingot', 'assets/minecraft/textures/item/gold_ingot.png', 64, -1, 'misc'),
  new Item('gold_nugget', 'assets/minecraft/textures/item/gold_nugget.png', 64, -1, 'misc'),
  new Item('golden_apple', 'assets/minecraft/textures/item/golden_apple.png', 64, -1, 'foodstuffs'),
  new Item('golden_axe', 'assets/minecraft/textures/item/golden_axe.png', 64, -1, 'tools'),
  new Item('golden_boots', 'assets/minecraft/textures/item/golden_boots.png', 64, -1, 'equipment'),
  new Item('golden_carrot', 'assets/minecraft/textures/item/golden_carrot.png', 64, -1, 'foodstuffs'),
  new Item('golden_sword', 'assets/minecraft/textures/item/golden_sword.png', 1, -1, 'equipment'),
  new Item('iron_door', 'assets/minecraft/textures/item/iron_door.png', 64, -1, 'misc'),
  new Item('iron_ingot', 'assets/minecraft/textures/item/iron_ingot.png', 64, -1, 'misc'),
  new Item('iron_sword', 'assets/minecraft/textures/item/iron_sword.png', 1, -1, 'equipment'),
  new Item('leather','assets/minecraft/textures/item/leather.png', 1, -1, 'misc'),
  new Item('paper','assets/minecraft/textures/item/paper.png', 64, -1, 'misc'),
  new Item('shears','assets/minecraft/textures/item/shears.png', 1, -1, 'tools'),
  new Item('stick','assets/minecraft/textures/item/stick.png', 64, -1, 'misc'),
  new Item('snowball','assets/minecraft/textures/item/snowball.png', 16, -1, 'misc'),
  new Item('string','assets/minecraft/textures/item/string.png', 64, -1, 'misc'),
  new Item('sugar_cane','assets/minecraft/textures/item/sugar_cane.png', 64, -1, 'misc'),
  new Item('wheat','assets/minecraft/textures/item/wheat.png', 64, -1, 'misc'),
  new Item('cookie','assets/minecraft/textures/item/cookie.png', 64, -1, 'foodstuffs')
];

/* Inventories Gen */
class Inventory {
  static playerHotbar() {
    let grid = [];
    for(let i = 0; i < 9; i++) {
      grid.push({ Slot: i, Item: '', Count: 0 })
    }
    return grid;
  }

  static playerInv() {
    let grid = [];
    for(let i = 9; i < 36; i++) {
      grid.push({ Slot: i, Item: '', Count: 0 })
    }
    return grid;
  }

  static playerArmor() {
    let grid = [];
    for(let i = 36; i < 40; i++) {
      grid.push({ Slot: i, Item: '', Count: 0 })
    }
    return grid;
  }

  static playerOffHand() {
    let grid = [];
    for(let i = 40; i < 41; i++) {
      grid.push({ Slot: i, Item: '', Count: 0 })
    }
    return grid;
  }

  static craftingSlots() {
    let grid = [];
    for(let i = 0; i < 9; i++) {
      grid.push({ Slot: i, Item: '', Count: 0 })
    }
    return grid;
  }

  static craftingOutput() {
    let grid = [];
    for(let i = 0; i < 1; i++) {
      grid.push({ Slot: i, Item: '', Count: 0 })
    }
    return grid;
  }

  static furnaceGrid() {
    let grid = [];
    for(let i = 0; i < 3; i++) {
      grid.push({ Slot: i, Item: '', Count: 0 })
    }
    return grid;
  }
}

/* Slot Actions */
class Slot {
  static redrawInventories() {
    drawAllItems();
    drawArmor();
    drawOffHand();
    drawInv();
    drawHotbar();
    drawCraftingGrid();
    drawFurnaceGrid();
    drawResultSlotGrid();
  }

  static addOne(slotEl, slotType) {
    slotEl.addEventListener('mousedown', (e) => {
      if(e.button === 2 && selectedItem.getCount() > 0) {
        slotType.Item = selectedItem.getItemID();
        slotType.Count++;

        selectedItem.set(selectedItem.Item, selectedItem.getCount() - 1);

        Slot.redrawInventories();
        drawFlyingItem(e);
      }
    })
  }

  static pickStack(slotEl, slotType) {
    if(isCreativeMode) {
      slotEl.addEventListener('mousedown', (e) => {
        if(e.button === 1 && selectedItem.getCount() === 0) {
          const regItem = RegistryItems.find(item => item.identifier === slotType.Item);
          selectedItem.set(slotType.Item, regItem.maxStackSize);
  
          drawFlyingItem(e);
        }
      })
    }
  }

  static pickAll(slotEl, slotType) {
    slotEl.addEventListener('click', (e) => {
      if(selectedItem.getItemID() === '') {
        if(e.shiftKey) {
          selectedItem.set(slotType.Item, Math.round(slotType.Count / 2));
          slotType.Count = slotType.Count - Math.round(slotType.Count / 2);
        } else {
          selectedItem.set(slotType.Item, slotType.Count);
          slotType.Item = '';
          slotType.Count = 0;

          localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
        }
        slotEl.setAttribute('data-tooltip', 'empty');

        Slot.redrawInventories();
        drawFlyingItem(e);

      } else if(selectedItem.getItemID() !== '') {
        if(slotType.Item === '') {
          slotType.Item = selectedItem.getItemID();
          slotType.Count = selectedItem.getCount();

          selectedItem.reset();
          Slot.redrawInventories();
          removeFlyingItem();

          localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
        } else if(selectedItem.getItemID() === slotType.Item) {
            if((slotType.Count + selectedItem.getCount()) <= regItem.maxStackSize) {
              slotType.Count += selectedItem.getCount();
              selectedItem.reset();
              removeFlyingItem();

              localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
            } else {
              const amountAdded = regItem.maxStackSize - slotType.Count;

              slotType.Count = regItem.maxStackSize;

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

          const storeslotType = {
            Item: slotType.Item,
            Count: slotType.Count 
          }

          selectedItem.set(storeslotType.Item, storeslotType.Count);
          slotType.Item = storeSelectedItem.Item;
          slotType.Count = storeSelectedItem.Count;

          drawFlyingItem(e);
          Slot.redrawInventories();

        }
      }

    });
  }
}

/* Selected Item */
const craftingGrid = Inventory.craftingSlots();
const resultSlotGrid = Inventory.craftingOutput();
const furnaceGrid = Inventory.furnaceGrid();
const playerArmor = Inventory.playerArmor();
const playerOffHand = Inventory.playerOffHand();
const playerInv = Inventory.playerInv();
const playerHotbar = Inventory.playerHotbar();

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

const armorEl = document.getElementById('armor');
const offHandEl = document.getElementById('offhand');
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
  
  function drawGroupItems(itemGroup) {
    RegistryItems.forEach(invSlot => {
      if(invSlot.itemGroup === itemGroup) {
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
      }

  
  });
}

  drawGroupItems('foodstuffs');
  drawGroupItems('equipment');
  drawGroupItems('tools');
  drawGroupItems('misc');

}


function drawArmor() {
  armorEl.innerHTML = '';

  playerArmor.forEach(armorSlot => {
    const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === armorSlot.Item)];

    const slotEl = document.createElement('div');
    slotEl.classList.add('slot');

    if(armorSlot.Item === '') {
      slotEl.setAttribute('data-tooltip', 'empty');
    } else {
      slotEl.setAttribute('data-tooltip', translateKey(`item.${armorSlot.Item}.name`));
    }

    // Slot.pickOne(slotEl, armorSlot);

    // slotEl.addEventListener('mousedown', (e) => {
    //   if(e.button === 2 && selectedItem.getCount() > 0) {
    //     armorSlot.Item = selectedItem.getItemID();
    //     armorSlot.Count++;

    //     selectedItem.set(selectedItem.Item, selectedItem.getCount() - 1);

    //     drawArmor();
    //     drawFlyingItem(e);

    //     localStorage.setItem('playerInv', JSON.stringify(playerInv));
    //   }
    // })

    slotEl.addEventListener('click', (e) => {
      let canPlaceHere = true;
      
      if(armorSlot.Slot === 36) {
        canPlaceHere = (
          selectedItem.getItemID() === 'chainmail_helmet'
          || selectedItem.getItemID() === 'diamond_helmet');
      } else if(armorSlot.Slot === 37) {
        canPlaceHere = (
          selectedItem.getItemID() === 'chainmail_chestplate'
          || selectedItem.getItemID() === 'diamond_chestplate');
      } else if(armorSlot.Slot === 38) {
        canPlaceHere = (
          selectedItem.getItemID() === 'chainmail_leggings'
          || selectedItem.getItemID() === 'diamond_leggings');
      } else if(armorSlot.Slot === 39) {
        canPlaceHere = (
          selectedItem.getItemID() === 'chainmail_boots'
          || selectedItem.getItemID() === 'diamond_boots'
          || selectedItem.getItemID() === 'golden_boots');
      }

      if(selectedItem.getItemID() === '') {
        if(e.shiftKey) {
          selectedItem.set(armorSlot.Item, Math.round(armorSlot.Count / 2));
          armorSlot.Count = armorSlot.Count - Math.round(armorSlot.Count / 2);
        } else {
          selectedItem.set(armorSlot.Item, armorSlot.Count);
          armorSlot.Item = '';
          armorSlot.Count = 0;

          localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
        }
        slotEl.setAttribute('data-tooltip', 'empty');

        drawArmor();
        drawFlyingItem(e);

      } else if(selectedItem.getItemID() !== '' && canPlaceHere) {
        if(armorSlot.Item === '') {
          armorSlot.Item = selectedItem.getItemID();
          armorSlot.Count = selectedItem.getCount();

          selectedItem.reset();
          drawArmor();
          removeFlyingItem();

          localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
        } else if(selectedItem.getItemID() === armorSlot.Item) {
            if((armorSlot.Count + selectedItem.getCount()) <= regItem.maxStackSize) {
              armorSlot.Count += selectedItem.getCount();
              selectedItem.reset();
              removeFlyingItem();

              localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
            } else {
              const amountAdded = regItem.maxStackSize - armorSlot.Count;

              armorSlot.Count = regItem.maxStackSize;

              selectedItem.set(selectedItem.getItemID(), amountAdded)
              drawFlyingItem(e);

              localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
            }


          drawArmor();
        } else {
          const storeSelectedItem = {
            Item: selectedItem.getItemID(),
            Count: selectedItem.getCount()
          }

          const storearmorSlot = {
            Item: armorSlot.Item,
            Count: armorSlot.Count 
          }

          selectedItem.set(storearmorSlot.Item, storearmorSlot.Count);
          armorSlot.Item = storeSelectedItem.Item;
          armorSlot.Count = storeSelectedItem.Count;

          drawFlyingItem(e);
          drawArmor();

        }
      }

    });

    const img = document.createElement('img');

    if(armorSlot.Item !== '') {
     
      img.src = regItem.texture;

      if(regItem.isStackable) {
        const stackSpan = document.createElement('span');
        stackSpan.classList.add('stack-size');
        stackSpan.innerText = armorSlot.Count !== 1 ? armorSlot.Count : '';
        slotEl.appendChild(stackSpan);
      }
    }
    
    else if(armorSlot.Slot === 36) img.src = 'assets/minecraft/textures/item/empty_armor_slot_helmet.png';
    else if(armorSlot.Slot === 37) img.src = 'assets/minecraft/textures/item/empty_armor_slot_chestplate.png';
    else if(armorSlot.Slot === 38) img.src = 'assets/minecraft/textures/item/empty_armor_slot_leggings.png';
    else if(armorSlot.Slot === 39) img.src = 'assets/minecraft/textures/item/empty_armor_slot_boots.png';

    slotEl.appendChild(img);
    armorEl.appendChild(slotEl);

    });

   
  }


  function drawOffHand() {
     offHandEl.innerHTML = '';
  
    playerOffHand.forEach(offhandSlot => {
      const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === offhandSlot.Item)];
  
      const slotEl = document.createElement('div');
      slotEl.classList.add('slot');
  
      if(offhandSlot.Item === '') {
        slotEl.setAttribute('data-tooltip', 'empty');
      } else {
        slotEl.setAttribute('data-tooltip', translateKey(`item.${offhandSlot.Item}.name`));
      }
  
      slotEl.addEventListener('mousedown', (e) => {
        if(e.button === 2 && selectedItem.getCount() > 0) {
          offhandSlot.Item = selectedItem.getItemID();
          offhandSlot.Count++;
  
          selectedItem.set(selectedItem.Item, selectedItem.getCount() - 1);
  
          drawOffHand();
          drawFlyingItem(e);
  
          localStorage.setItem('playerInv', JSON.stringify(playerInv));
        }
      })
  
      slotEl.addEventListener('click', (e) => {
  
        if(selectedItem.getItemID() === '') {
          if(e.shiftKey) {
            selectedItem.set(offhandSlot.Item, Math.round(offhandSlot.Count / 2));
            offhandSlot.Count = offhandSlot.Count - Math.round(offhandSlot.Count / 2);
          } else {
            selectedItem.set(offhandSlot.Item, offhandSlot.Count);
            offhandSlot.Item = '';
            offhandSlot.Count = 0;
  
            localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
          }
          slotEl.setAttribute('data-tooltip', 'empty');
  
          drawOffHand();
          drawFlyingItem(e);
  
        } else if(selectedItem.getItemID() !== '') {
          if(offhandSlot.Item === '') {
            offhandSlot.Item = selectedItem.getItemID();
            offhandSlot.Count = selectedItem.getCount();
  
            selectedItem.reset();
            drawOffHand();
            removeFlyingItem();
  
            localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
          } else if(selectedItem.getItemID() === offhandSlot.Item) {
              if((offhandSlot.Count + selectedItem.getCount()) <= regItem.maxStackSize) {
                offhandSlot.Count += selectedItem.getCount();
                selectedItem.reset();
                removeFlyingItem();
  
                localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
              } else {
                const amountAdded = regItem.maxStackSize - offhandSlot.Count;
  
                offhandSlot.Count = regItem.maxStackSize;
  
                selectedItem.set(selectedItem.getItemID(), amountAdded)
                drawFlyingItem(e);
  
                localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
              }
  
  
              drawOffHand();
          } else {
            const storeSelectedItem = {
              Item: selectedItem.getItemID(),
              Count: selectedItem.getCount()
            }
  
            const storeoffhandSlot = {
              Item: offhandSlot.Item,
              Count: offhandSlot.Count 
            }
  
            selectedItem.set(storeoffhandSlot.Item, storeoffhandSlot.Count);
            offhandSlot.Item = storeSelectedItem.Item;
            offhandSlot.Count = storeSelectedItem.Count;
  
            drawFlyingItem(e);
            drawOffHand();
  
          }
        }
  
      });
  
      const img = document.createElement('img');
  
      if(offhandSlot.Item !== '') {
       
        img.src = regItem.texture;
  
        if(regItem.isStackable) {
          const stackSpan = document.createElement('span');
          stackSpan.classList.add('stack-size');
          stackSpan.innerText = offhandSlot.Count !== 1 ? offhandSlot.Count : '';
          slotEl.appendChild(stackSpan);
        }
      }
      
      else img.src = 'assets/minecraft/textures/item/empty_armor_slot_shield.png';
  
      slotEl.appendChild(img);
      offHandEl.appendChild(slotEl);
  
      });
  
     
    }

function drawInv() {
  inventoryEl.innerHTML = '';

  playerInv.forEach(invSlot => {
    const regItem = RegistryItems.find(item => item.identifier === invSlot.Item);

    const slotEl = document.createElement('div');
    slotEl.classList.add('slot');

    if(invSlot.Item === '') {
      slotEl.setAttribute('data-tooltip', 'empty');
    } else {
      slotEl.setAttribute('data-tooltip', translateKey(`item.${invSlot.Item}.name`));
    }

    Slot.addOne(slotEl, invSlot);
    Slot.pickStack(slotEl, invSlot);
    Slot.pickAll(slotEl, invSlot);

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
    const regItem = RegistryItems.find(item => item.identifier === hotbarSlot.Item);

    const slotEl = document.createElement('div');
    slotEl.classList.add('slot');

    if(hotbarSlot.Item === '') {
      slotEl.setAttribute('data-tooltip', 'empty');
    } else {
      slotEl.setAttribute('data-tooltip', translateKey(`item.${hotbarSlot.Item}.name`));
    }

    Slot.addOne(slotEl, hotbarSlot);
    Slot.pickStack(slotEl, hotbarSlot);
    Slot.pickAll(slotEl, hotbarSlot);

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

    checkForRecipes();

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
      if(selectedItem.getCount() === 0) {
        selectedItem.set(resultSlotGrid.Item, resultSlotGrid.Count);
      } else if(selectedItem.getCount() <= (64 - resultSlotGrid.Count)) {
        selectedItem.set(resultSlotGrid.Item, selectedItem.getCount() + resultSlotGrid.Count);
      } 

      
   

      // craftingGrid.forEach(gridItem => {
      //   gridItem.Item = '';
      //   gridItem.Count = 0;
      // })

      if(selectedItem.getCount() !== 64) {
        craftingGrid.forEach(craftingSlot => {
          if(craftingSlot.Count > 1) {
            craftingSlot.Count--;
          } else {
            craftingSlot.Item = '';
            craftingSlot.Count = '';
            resultSlotGrid.Item = '';
            resultSlotGrid.Count = 0;
          }
        });
      }


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

document.getElementById('langSelection').addEventListener('change', (e) => {
  displayLang = document.getElementById('langSelection').value;

  drawAllItems();
  drawArmor();
  drawOffHand();
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

  Slot.redrawInventories();
}

window.addEventListener('DOMContentLoaded', () => initMinecraft());

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
  if((e.target.dataset.tooltip && e.target.dataset.tooltip !== 'empty')) {
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