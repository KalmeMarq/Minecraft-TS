// // // import { getAllFiles } from './ReadJSON.js';
// // // import { setLangSelector, setGUIScaleSelector, guiScale } from './Settings.js';
// // // import translateKey from './TranslateKey.js';
// // // import RegistryItems from './ItemsRegistry.js';
// // // import TextFormatting from './TextFormatting.js';


// // const root = document.getElementById('root');

// // // /* Store JSON Files Data */
// // // let recipesFiles = [];
// // export let langFiles = [];
// // // let tagFiles = [];
// // // let lootTableFiles = [];
// // // let dummy = [];

// // // let isCreativeMode = true;

// // // /* Settings */
// // // let soundVolume = 0.5;
// // // // let guiScale = Number(getComputedStyle(document.documentElement).getPropertyValue('--guiScale'));
// // // let advancedTooltip = true;

// // // /* Inventories Gen */
// // // class Inventory {
// // //   static playerHotbar() {
// // //     let grid = [];
// // //     for(let i = 0; i < 9; i++) {
// // //       grid.push({ Slot: i, Item: '', Damage: -1, Count: 0 })
// // //     }

// // //     console.log('Player hotbar created.');
// // //     return grid;
// // //   }

// // //   static playerInv() {
// // //     let grid = [];
// // //     for(let i = 9; i < 36; i++) {
// // //       grid.push({ Slot: i, Item: '', Damage: -1, Count: 0 })
// // //     }
// // //     console.log('Player inventory created.');
// // //     return grid;
// // //   }

// // //   static playerArmor() {
// // //     let grid = [];
// // //     for(let i = 36; i < 40; i++) {
// // //       grid.push({ Slot: i, Item: '', Damage: -1, Count: 0, isArmor: true })
// // //     }
// // //     console.log('Player armor created.');
// // //     return grid;
// // //   }

// // //   static playerOffHand() {
// // //     let grid = [];
// // //     for(let i = 40; i < 41; i++) {
// // //       grid.push({ Slot: i, Item: '', Damage: -1, Count: 0 })
// // //     }
// // //     console.log('Player offhand created.');
// // //     return grid;
// // //   }

// // //   static craftingSlots() {
// // //     let grid = [];
// // //     for(let i = 0; i < 9; i++) {
// // //       grid.push({ Slot: i, Item: '', Damage: -1,Count: 0 })
// // //     }
// // //     console.log('Crafting table grid created.');
// // //     return grid;
// // //   }

// // //   static craftingOutput() {
// // //     let grid = [];
// // //     for(let i = 0; i < 1; i++) {
// // //       grid.push({ Slot: i, Item: '', Damage: -1, Count: 0 })
// // //     }
// // //     console.log('Crafting table output slot created.');
// // //     return grid;
// // //   }

// // //   static furnaceGrid() {
// // //     let grid = [];
// // //     for(let i = 0; i < 3; i++) {
// // //       grid.push({ Slot: i, Item: '', Damage: -1, Count: 0 })
// // //     }
// // //     return grid;
// // //   }
// // // }

// // // /* Slot Actions */
// // // class Slot {
// // //   static clearAllInventories() {
// // //     playerArmor.forEach(slot => { slot.Item = ''; slot.Count = 0; });
// // //     playerOffHand.forEach(slot => { slot.Item = ''; slot.Count = 0; });
// // //     playerInv.forEach(slot => { slot.Item = ''; slot.Count = 0; });
// // //     playerHotbar.forEach(slot => { slot.Item = ''; slot.Count = 0; });
// // //     craftingGrid.forEach(slot => { slot.Item = ''; slot.Count = 0; });
// // //     resultSlotGrid.forEach(slot => { slot.Item = ''; slot.Count = 0; });

// // //     localStorage.setItem('playerArmor', JSON.stringify(playerArmor));
// // //     localStorage.setItem('playerOffHand', JSON.stringify(playerOffHand));
// // //     localStorage.setItem('playerInv', JSON.stringify(playerInv));
// // //     localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));

// // //     Slot.redrawInventories();
// // //   }

// // //   static redrawInventories() {
// // //     localStorage.setItem('playerArmor', JSON.stringify(playerArmor));
// // //     localStorage.setItem('playerOffHand', JSON.stringify(playerOffHand));
// // //     localStorage.setItem('playerInv', JSON.stringify(playerInv));
// // //     localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));

// // //     drawAllItems();
// // //     drawArmor();
// // //     drawOffHand();
// // //     drawInv();
// // //     drawHotbar();
// // //     drawCraftingGrid();
// // //     drawFurnaceGrid();
// // //     drawResultSlotGrid();
// // //   }

// // //   static checkForCubeIcon(slotEl, slotType, itemRef) {
// // //     const refProps = itemRef.props;

// // //     if(!refProps.texture && refProps.textureAll || refProps.textureSide || refProps.textureTop || refProps.textureLeft || refProps.textureFront) {
// // //       const space3dDiv = document.createElement('div');
// // //       space3dDiv.classList.add('space3d');

// // //       let imgFront = '';
// // //       let imgTop = '';
// // //       let imgLeft = '';

// // //       if(refProps.textureAll) {
// // //         imgTop = refProps.textureAll;
// // //         imgFront = refProps.textureAll;
// // //         imgLeft = refProps.textureAll;
// // //       } else if(refProps.textureSide && refProps.textureTop && !(refProps.textureLeft && refProps.textureFront)) {
// // //         imgTop = refProps.textureTop;
// // //         imgFront = refProps.textureSide;
// // //         imgLeft = refProps.textureSide;
// // //       } else {
// // //         imgTop = refProps.textureTop;
// // //         imgFront = refProps.textureFront;
// // //         imgLeft = refProps.textureLeft;
// // //       }

// // //       space3dDiv.innerHTML = `
// // //       <div class="_3dbox">
// // //         <div class="_3dface _3dface--front" style="background-image: url('./assets/minecraft/textures/block/${imgFront}');"></div>
// // //         <div class="_3dface _3dface--top" style="background-image: url('./assets/minecraft/textures/block/${imgTop}');"></div>
// // //         <div class="_3dface _3dface--left" style="background-image: url('./assets/minecraft/textures/block/${imgLeft}');"></div>
// // //       </div>
// // //       `;


// // //       slotEl.appendChild(space3dDiv)
// // //     } else {
// // //       const img = document.createElement('img');
// // //       img.src = refProps.texture ? './assets/minecraft/textures/block/' + refProps.texture : itemRef.texture;
// // //       slotEl.appendChild(img);
// // //     }
// // //   }

// // //   static addOne(slotEl, slotType) {
// // //     slotEl.addEventListener('mousedown', (e) => {
// // //       if(e.button === 2 && selectedItem.getCount() > 0) {
// // //         slotType.Item = selectedItem.getItemID();
// // //         slotItem.Damage = selectedItem.Damage;
// // //         slotType.Count++;


// // //         selectedItem.set(selectedItem.Item, selectedItem.getCount() - 1);

// // //         console.log('Added 1 ' + selectedItem.getItemID() + ' with ' + selectedItem.Damage + ' of durability to Slot ' + slotType.Slot);


// // //         Slot.redrawInventories();
// // //         drawFlyingItem(e);
// // //       }
// // //     })

// // //   }

// // //   static pickStack(slotEl, slotType) {
// // //     if(isCreativeMode) {
// // //       slotEl.addEventListener('mousedown', (e) => {
// // //         if(e.button === 1 && selectedItem.getCount() === 0) {
// // //           const regItem = RegistryItems.find(item => item.identifier === slotType.Item);
// // //           selectedItem.set(slotType.Item, regItem.maxStackSize);
  
// // //           drawFlyingItem(e);

// // //           console.log('Picked 64 ' + selectedItem.getItemID());
// // //         }
// // //       })
// // //     }
// // //   }

// // //   static pickAll(slotEl, slotType, callback) {
// // //     slotEl.addEventListener('click', (e) => {
// // //       const regItem = RegistryItems.find(item => item.identifier === slotType.Item);

// // //       let canPlaceHere = false;
      
// // //       // console.log(regItem);

// // //       if(!slotType.isArmor) {
// // //         canPlaceHere = true;
// // //       } else {
// // //         canPlaceHere = false;
// // //         if(selectedItem.Item !== '') {
// // //           if(RegistryItems.find(item => item.identifier === selectedItem.Item).props.armor) {
// // //             if(RegistryItems.find(item => item.identifier === selectedItem.Item).props.armor === slotType.Slot) {
// // //               canPlaceHere = true;

// // //             }
            
// // //           }
// // //         }
// // //       }

// // //       if(selectedItem.getItemID() === '' && slotType.Item !== '') {
// // //         if(e.shiftKey) {
// // //           selectedItem.set(slotType.Item, Math.round(slotType.Count / 2));
// // //           slotType.Count = slotType.Count - Math.round(slotType.Count / 2);
// // //         } else {
// // //           selectedItem.set(slotType.Item, slotType.Count);
// // //           selectedItem.Damage = slotType.Damage;
// // //           slotType.Item = '';
// // //           slotType.Damage = -1;
// // //           slotType.Count = 0;

// // //         }
// // //         slotEl.setAttribute('data-tooltip', 'empty');

// // //         drawFlyingItem(e);

// // //       } else if(selectedItem.getItemID() !== '' & canPlaceHere) {
        
// // //         if(slotType.Item === '') {
// // //           slotType.Item = selectedItem.getItemID();
// // //           slotType.Damage = selectedItem.Damage;
// // //           slotType.Count = selectedItem.getCount();

// // //           selectedItem.reset();
// // //           callback();
// // //           removeFlyingItem();

// // //         } else if(selectedItem.getItemID() === slotType.Item) {
// // //             if((slotType.Count + selectedItem.getCount()) <= regItem.maxStackSize) {
// // //               slotType.Count += selectedItem.getCount();
// // //               selectedItem.reset();
// // //               removeFlyingItem();

// // //             } else {
// // //               const amountAdded = regItem.maxStackSize - (regItem.maxStackSize - slotType.Count);

// // //               slotType.Count = regItem.maxStackSize;

// // //               selectedItem.set(selectedItem.getItemID(), amountAdded)
// // //               drawFlyingItem(e);

// // //             }

// // //         } else {
// // //           const storeSelectedItem = {
// // //             Item: selectedItem.getItemID(),
// // //             ItemDamage: selectedItem.Damage,
// // //             Count: selectedItem.getCount()
// // //           }

// // //           const storeslotType = {
// // //             Item: slotType.Item,
// // //             ItemDamage: slotType.maxDamage,
// // //             Count: slotType.Count 
// // //           }

// // //           selectedItem.Damage = storeslotType.ItemDamage;
// // //           selectedItem.set(storeslotType.Item, storeslotType.Count);
// // //           slotType.Item = storeSelectedItem.Item;
// // //           slotType.Damage = storeSelectedItem.ItemDamage;
// // //           slotType.Count = storeSelectedItem.Count;

// // //           drawFlyingItem(e);

// // //         }


// // //       }
// // //       callback();

// // //     });
// // //   }
// // // }

// // // /* Selected Item */
// // // const craftingGrid = Inventory.craftingSlots();
// // // const resultSlotGrid = Inventory.craftingOutput();
// // // const furnaceGrid = Inventory.furnaceGrid();
// // // const playerArmor = /* JSON.parse(localStorage.getItem('playerArmor')) || */ Inventory.playerArmor();
// // // const playerOffHand = /* JSON.parse(localStorage.getItem('playerOffHand')) || */ Inventory.playerOffHand();
// // // const playerInv = /* JSON.parse(localStorage.getItem('playerInv')) || */ Inventory.playerInv();
// // // const playerHotbar = /* JSON.parse(localStorage.getItem('playerHotbar')) ||  */ Inventory.playerHotbar();

// // // let selectedItem = {
// // //   Item: '',
// // //   Name: '',
// // //   Damage: -1,
// // //   Count: 0,
// // //   getItemID: () => {
// // //     return selectedItem.Item;
// // //   },
// // //   getCount: () => {
// // //     return selectedItem.Count;
// // //   },
// // //   set: (item, count) => {
// // //     selectedItem.Item = item;
// // //     selectedItem.Count = count;
// // //   },
// // //   reset: () => {
// // //     selectedItem.Item = '';
// // //     selectedItem.Damage = -1;
// // //     selectedItem.Count = 0;
// // //   }
// // // };

// // // function checkForDurabilityColor(value) {
// // //   if(value <= 100 && value > 90) return '#13cf3c';
// // //   if(value <= 90 && value > 80) return '#13cf3c';
// // //   if(value <= 80 && value > 70) return '#58cf13';
// // //   if(value <= 70 && value > 60) return '#7ecf13';
// // //   if(value <= 60 && value > 50) return '#b3cf13';
// // //   if(value <= 50 && value > 40) return '#cfb313';
// // //   if(value <= 40 && value > 30) return '#cf8d13';
// // //   if(value <= 30 && value > 20) return '#cf6813';
// // //   if(value <= 20 && value > 10) return '#cf1313';
// // //   if(value <= 10 && value > 0) return '#000';
// // // }

// // // const armorEl = document.getElementById('armor');
// // // const offHandEl = document.getElementById('offhand');
// // // const inventoryEl = document.getElementById('inventory');
// // // const hotbarEl = document.getElementById('hotbar');
// // // const allItemsEl = document.getElementById('allitems');
// // // const craftingtableEl = document.getElementById('craftingtable');
// // // const craftinggridEl = document.getElementById('craftinggrid');
// // // const furnaceEl = document.getElementById('furnace');
// // // const furnaceinputEl = document.getElementById('furnaceinput');
// // // const furnacefuelEl = document.getElementById('furnacefuel');
// // // const furnaceoutputEl = document.getElementById('furnaceoutput');

// // // function drawFlyingItem(e) {
// // //   const item = RegistryItems[RegistryItems.findIndex(item => item.identifier === selectedItem.Item) || 0];

// // //   removeFlyingItem();

// // //   if(selectedItem.getCount() === 0) {
// // //     removeFlyingItem();
// // //     selectedItem.reset();
// // //   }

// // //   if(selectedItem.getItemID() !== '') {
// // //     const slotItem = document.createElement('div');
// // //     slotItem.id = 'flyingItem';


// // //     Slot.checkForCubeIcon(slotItem, null, item);

// // //     if(item.isStackable) {
// // //       const stackSpan = document.createElement('span');
// // //       stackSpan.classList.add('stack-size');
// // //       stackSpan.innerText = selectedItem.getCount() !== 1 ? selectedItem.Count : '';
// // //       slotItem.appendChild(stackSpan);
// // //     }
    
// // //     if(item.maxDamage !== -1 && selectedItem.Damage < item.maxDamage) {
// // //       const durabilitybar = document.createElement('div');
// // //       const calcDurabilityPerc = (selectedItem.Damage / item.maxDamage) * 100;

// // //       durabilitybar.classList.add('durabilityBar');
// // //       durabilitybar.innerHTML = `
// // //         <div class="durabilityBarInside" style="width: ${calcDurabilityPerc}%; background: ${checkForDurabilityColor(calcDurabilityPerc)}"></div>
// // //       `;
// // //       slotItem.appendChild(durabilitybar)
// // //     }

// // //     slotItem.style.top = e.pageY - (8 * guiScale) + 'px';
// // //     slotItem.style.left = e.clientX - (8 * guiScale) + 'px';

// // //     root.appendChild(slotItem);
// // //   }
// // // }

// // // function removeFlyingItem() {
// // //   if(document.getElementById('flyingItem')) {
// // //     document.getElementById('flyingItem').remove();
// // //   }
// // // }

// // // function drawAllItems() {
// // //   allItemsEl.innerHTML = '';
  
// // //   function drawGroupItems(itemGroup) {
// // //     RegistryItems.forEach(invSlot => {
// // //       if(invSlot.props.itemGroup === itemGroup) {
// // //       const itemID = invSlot.identifier;
// // //       const itemName = invSlot.name;
// // //       const itemTexture = invSlot.texture;
// // //       const itemMaxStackSize = invSlot.maxStackSize;
  
// // //       const slotEl = document.createElement('div');
// // //       slotEl.classList.add('slot');
// // //       slotEl.tabIndex = '0';

  
// // //       slotEl.setAttribute('data-tooltip', `${translateKey(`${invSlot.isBlock ? 'block' : 'item'}.minecraft.${itemID}`) + ',minecraft:' + itemID}`);
  
// // //       // console.log(langFiles[langFiles.findIndex(file => file[langFiles.id] === displayLang)]);
// // //      /*  slotEl.addEventListener('mouseenter', () => {
// // //         slotEl.focus();
// // //       });
  
// // //       slotEl.addEventListener('mouseleave', () => {6
// // //         slotEl.blur();
// // //       }); */
  
// // //       slotEl.addEventListener('keydown', (e) => {
  
// // //         if(e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9') {
  
// // //           playerHotbar[playerHotbar.findIndex(slot => slot.Slot === Number(e.key) - 1)].Item = itemID;
// // //           playerHotbar[playerHotbar.findIndex(slot => slot.Slot === Number(e.key) - 1)].Count = itemMaxStackSize;
  
// // //           drawHotbar();
// // //           slotEl.blur();
  
// // //         }
// // //       });
  
// // //       slotEl.addEventListener('mousedown', (e) => {
// // //         if(e.button === 2) {
  
// // //           if(selectedItem.Count < itemMaxStackSize) {
// // //             selectedItem.set(itemID, e.shiftKey ? itemMaxStackSize : selectedItem.getCount() + 1);
// // //             selectedItem.Damage = invSlot.maxDamage;
// // //           }
  
// // //           drawFlyingItem(e);
// // //         } else if(e.button === 1) {
// // //           selectedItem.set(itemID, itemMaxStackSize);
  
// // //           drawFlyingItem(e);
// // //         }
// // //       })
  
// // //       slotEl.addEventListener('click', (e) => {
// // //         if(selectedItem.Item === '') {
// // //           selectedItem.set(itemID, e.shiftKey ? itemMaxStackSize : 1);
// // //           selectedItem.Damage = invSlot.maxDamage;
// // //           drawFlyingItem(e);
// // //         } else if(selectedItem.Item !== '') {
// // //           selectedItem.reset();
// // //           removeFlyingItem();
// // //         }
// // //       });

// // //       Slot.checkForCubeIcon(slotEl, null, invSlot)

     
  
// // //       allItemsEl.appendChild(slotEl);
// // //       }

  
// // //     });
// // //     } 

// // //   drawGroupItems('building');
// // //   drawGroupItems('decorations');
// // //   drawGroupItems('redstone');
// // //   drawGroupItems('transportation');
// // //   drawGroupItems('misc');
// // //   drawGroupItems('foodstuffs');
// // //   drawGroupItems('tools');
// // //   drawGroupItems('equipment');
// // //   drawGroupItems('brewing');
// // // }


// // // function drawArmor() {
// // //   armorEl.innerHTML = '';

// // //   playerArmor.forEach(armorSlot => {
// // //     const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === armorSlot.Item)];

// // //     const slotEl = document.createElement('div');
// // //     slotEl.classList.add('slot');

// // //     if(armorSlot.Item === '') {
// // //       slotEl.setAttribute('data-tooltip', 'empty');
// // //     } else {
// // //       slotEl.setAttribute('data-tooltip', `${translateKey(`${regItem.isBlock ? 'block' : 'item'}.minecraft.${armorSlot.Item}`)}${regItem.maxDamage !== -1 ? ',Durability: ' + armorSlot.Damage + '/' + regItem.maxDamage : ''}${',minecraft:' + armorSlot.Item}`);
// // //     }

// // //     Slot.addOne(slotEl, armorSlot);
// // //     Slot.pickStack(slotEl, armorSlot);
// // //     Slot.pickAll(slotEl, armorSlot, () => drawArmor());

// // //     const img = document.createElement('img');

// // //     if(armorSlot.Item !== '') {
     
// // //       img.src = regItem.texture;

// // //       if(regItem.isStackable) {
// // //         const stackSpan = document.createElement('span');
// // //         stackSpan.classList.add('stack-size');
// // //         stackSpan.innerText = armorSlot.Count !== 1 ? armorSlot.Count : '';
// // //         slotEl.appendChild(stackSpan);
// // //       }

// // //       if(regItem.maxDamage !== -1 && armorSlot.Damage < regItem.maxDamage) {
// // //         const durabilitybar = document.createElement('div');
// // //         const calcDurabilityPerc = (armorSlot.Damage / regItem.maxDamage) * 100;
// // //         durabilitybar.classList.add('durabilityBar');
// // //         durabilitybar.innerHTML = `
// // //           <div class="durabilityBarInside" style="width: ${calcDurabilityPerc}%; background: ${checkForDurabilityColor(calcDurabilityPerc)}"></div>
// // //         `;
// // //         slotEl.appendChild(durabilitybar)
// // //       }
// // //     }
    
// // //     else if(armorSlot.Slot === 36) img.src = 'assets/minecraft/textures/item/empty_armor_slot_helmet.png';
// // //     else if(armorSlot.Slot === 37) img.src = 'assets/minecraft/textures/item/empty_armor_slot_chestplate.png';
// // //     else if(armorSlot.Slot === 38) img.src = 'assets/minecraft/textures/item/empty_armor_slot_leggings.png';
// // //     else if(armorSlot.Slot === 39) img.src = 'assets/minecraft/textures/item/empty_armor_slot_boots.png';

// // //     slotEl.appendChild(img);
// // //     armorEl.appendChild(slotEl);

// // //     });

   
// // //   }


// // //   function drawOffHand() {
// // //      offHandEl.innerHTML = '';
  
// // //     playerOffHand.forEach(offhandSlot => {
// // //       const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === offhandSlot.Item)];
  
// // //       const slotEl = document.createElement('div');
// // //       slotEl.classList.add('slot');
  
// // //       if(offhandSlot.Item === '') {
// // //         slotEl.setAttribute('data-tooltip', 'empty');
// // //       } else {
// // //         slotEl.setAttribute('data-tooltip', `${translateKey(`${regItem.isBlock ? 'block' : 'item'}.minecraft.${offhandSlot.Item}`)}${regItem.maxDamage !== -1 ? ',Durability: ' + offhandSlot.Damage + '/' + regItem.maxDamage : ''}${',minecraft:' + offhandSlot.Item}`);
// // //       }
  
// // //       Slot.addOne(slotEl, offhandSlot);
// // //       Slot.pickStack(slotEl, offhandSlot);
// // //       Slot.pickAll(slotEl, offhandSlot, () => drawOffHand());
  
// // //       const img = document.createElement('img');
  
// // //       if(offhandSlot.Item !== '') {
       
// // //         img.src = regItem.texture;
  
// // //         if(regItem.isStackable) {
// // //           const stackSpan = document.createElement('span');
// // //           stackSpan.classList.add('stack-size');
// // //           stackSpan.innerText = offhandSlot.Count !== 1 ? offhandSlot.Count : '';
// // //           slotEl.appendChild(stackSpan);
// // //         }

// // //         if(regItem.maxDamage !== -1 && offhandSlot.Damage < regItem.maxDamage) {
// // //           const durabilitybar = document.createElement('div');
// // //           const calcDurabilityPerc = (offhandSlot.Damage / regItem.maxDamage) * 100;
// // //           durabilitybar.classList.add('durabilityBar');
// // //           durabilitybar.innerHTML = `
// // //             <div class="durabilityBarInside" style="width: ${calcDurabilityPerc}%; background: ${checkForDurabilityColor(calcDurabilityPerc)}"></div>
// // //           `;
// // //           slotEl.appendChild(durabilitybar)
// // //         }
// // //       }
      
// // //       else img.src = 'assets/minecraft/textures/item/empty_armor_slot_shield.png';
  
// // //       slotEl.appendChild(img);
// // //       offHandEl.appendChild(slotEl);
  
// // //       });
  
     
// // //     }

// // // function drawInv() {
// // //   inventoryEl.innerHTML = '';

// // //   playerInv.forEach(invSlot => {
// // //     const regItem = RegistryItems.find(item => item.identifier === invSlot.Item);

// // //     const slotEl = document.createElement('div');
// // //     slotEl.classList.add('slot');

// // //     if(invSlot.Item === '') {
// // //       slotEl.setAttribute('data-tooltip', 'empty');
// // //     } else {
// // //       slotEl.setAttribute('data-tooltip', `${translateKey(`${regItem.isBlock ? 'block' : 'item'}.minecraft.${invSlot.Item}`)}${regItem.maxDamage !== -1 ? ',Durability: ' + invSlot.Damage + '/' + regItem.maxDamage : ''}${',minecraft:' + invSlot.Item}`);
// // //     }

// // //     Slot.addOne(slotEl, invSlot);
// // //     Slot.pickStack(slotEl, invSlot);
// // //     Slot.pickAll(slotEl, invSlot, () => drawInv());

// // //     if(invSlot.Item !== '') {
     
// // //       Slot.checkForCubeIcon(slotEl, null, regItem);

// // //       if(regItem.isStackable) {
// // //         const stackSpan = document.createElement('span');
// // //         stackSpan.classList.add('stack-size');
// // //         stackSpan.innerText = invSlot.Count !== 1 ? invSlot.Count : '';
// // //         slotEl.appendChild(stackSpan);
// // //       }

// // //       if(regItem.maxDamage !== -1 && invSlot.Damage < regItem.maxDamage) {
// // //         const durabilitybar = document.createElement('div');
// // //         const calcDurabilityPerc = (invSlot.Damage / regItem.maxDamage) * 100;
// // //         durabilitybar.classList.add('durabilityBar');
// // //         durabilitybar.innerHTML = `
// // //           <div class="durabilityBarInside" style="width: ${calcDurabilityPerc}%; background: ${checkForDurabilityColor(calcDurabilityPerc)}"></div>
// // //         `;
// // //         slotEl.appendChild(durabilitybar)
// // //       }
// // //     } else slotEl.innerHTML = '';

// // //     inventoryEl.appendChild(slotEl);
// // //   })
// // // }


// // // function drawHotbar() {
// // //   hotbarEl.innerHTML = '';

// // //   playerHotbar.forEach(hotbarSlot => {
// // //     const regItem = RegistryItems.find(item => item.identifier === hotbarSlot.Item);

// // //     const slotEl = document.createElement('div');
// // //     slotEl.classList.add('slot');

// // //     if(hotbarSlot.Item === '') {
// // //       slotEl.setAttribute('data-tooltip', 'empty');
// // //     } else {
// // //       slotEl.setAttribute('data-tooltip', `${translateKey(`${regItem.isBlock ? 'block' : 'item'}.minecraft.${hotbarSlot.Item}`)}${regItem.maxDamage !== -1 ? ',Durability: ' + hotbarSlot.Damage + '/' + regItem.maxDamage : ''}${',minecraft:' + hotbarSlot.Item}`);
// // //     }

// // //     Slot.addOne(slotEl, hotbarSlot);
// // //     Slot.pickStack(slotEl, hotbarSlot);
// // //     Slot.pickAll(slotEl, hotbarSlot, () => drawHotbar());

// // //     if(hotbarSlot.Item !== '') {
// // //       Slot.checkForCubeIcon(slotEl, null, regItem);


// // //       if(regItem.isStackable) {
// // //         const stackSpan = document.createElement('span');
// // //         stackSpan.classList.add('stack-size');
// // //         stackSpan.innerText = hotbarSlot.Count !== 1 ? hotbarSlot.Count : '';
// // //         slotEl.appendChild(stackSpan);
// // //       }

// // //       if(regItem.maxDamage !== -1 && hotbarSlot.Damage < regItem.maxDamage) {
// // //         const durabilitybar = document.createElement('div');
// // //         durabilitybar.classList.add('durabilityBar');
// // //         const calcDurabilityPerc = (hotbarSlot.Damage / regItem.maxDamage) * 100;

// // //         durabilitybar.innerHTML = `
// // //           <div class="durabilityBarInside" style="width: ${calcDurabilityPerc}%; background: ${checkForDurabilityColor(calcDurabilityPerc)}"></div>
// // //         `;
// // //         slotEl.appendChild(durabilitybar)
// // //       }

// // //     } else slotEl.innerHTML = '';

// // //     hotbarEl.appendChild(slotEl);
// // //   })
// // // }

// // // function drawCraftingGrid() {
// // //   craftinggridEl.innerHTML = '';

// // //   craftingGrid.forEach(craftingSlot => {
// // //     const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === craftingSlot.Item)];

    
// // //     const slotEl = document.createElement('div');
// // //     slotEl.classList.add('slot');

// // //     if(craftingSlot.Item === '') {
// // //       slotEl.setAttribute('data-tooltip', 'empty');
// // //     } else {
// // //       slotEl.setAttribute('data-tooltip', translateKey(`${(regItem.props.isBlock || regItem.props.renderAsBlock) ? 'block' : 'item'}.minecraft.${craftingSlot.Item}`));
// // //     }

// // //    /*  slotEl.addEventListener('mousedown', (e) => {
// // //       if(e.button === 2 && selectedItem.getCount() > 0) {
// // //         craftingSlot.Item = selectedItem.getItemID();
// // //         craftingSlot.Count++;

// // //         selectedItem.set(selectedItem.Item, selectedItem.getCount() - 1);

// // //         checkForRecipes();
// // //         drawResultSlotGrid();
// // //         drawCraftingGrid();
// // //         drawFlyingItem(e);
// // //       }
// // //     }) */

// // //     // function checkForRecipes() {

// // //     //   for(let i = 0; i < recipesFiles.length; i++) {
// // //     //     const recipe = recipesFiles[i];

// // //     //     if(recipe['type'] && recipe['type'] === 'crafting_shapeless') {
// // //     //       let filteredCraftingGrid = craftingGrid.filter(a => a.Item !== '');

// // //     //       let reMadeRecipeGrid = [];
// // //     //       let reMadeCraftingGrid = [];
// // //     //       filteredCraftingGrid.forEach(slot => reMadeCraftingGrid.push(slot.Item));
// // //     //       recipe.ingredients.sort().forEach(slot => reMadeRecipeGrid.push(slot.item));

// // //     //       let recipeGridSorted = reMadeRecipeGrid.sort();  
// // //     //       let craftingGridGridSorted = reMadeCraftingGrid.sort();  

// // //     //       let goes = true;

// // //     //       for(let i = 0; i < recipeGridSorted.length; i++) {
// // //     //         if(recipeGridSorted[i] !== craftingGridGridSorted[i]) {
// // //     //           goes = false;
// // //     //           continue;
// // //     //         }
// // //     //       }

// // //     //       if(goes) {
// // //     //         resultSlotGrid.Item = recipe.result.item;
// // //     //         resultSlotGrid.Count = recipe.result.count;
// // //     //         drawResultSlotGrid();

// // //     //         break;

// // //     //       } else {
            
// // //     //         resultSlotGrid.Item = '';
// // //     //         resultSlotGrid.Count = 0;
// // //     //         drawResultSlotGrid();
// // //     //       }

// // //     //      /*  if(recipe.grid.sort() === reMadeCraftingGrid.sort()) {
// // //     //         resultSlotGrid.Item = recipe.result;
// // //     //         resultSlotGrid.Count = recipe.count;
// // //     //         drawResultSlotGrid();

// // //     //       } else {
// // //     //         resultSlotGrid.Item = '';
// // //     //         resultSlotGrid.Count = 0;
// // //     //         drawResultSlotGrid();
// // //     //       } */

// // //     //     } else if(craftingGrid[0].Item === recipe.grid[0] && craftingGrid[1].Item === recipe.grid[1] && craftingGrid[2].Item === recipe.grid[2] &&
// // //     //       craftingGrid[3].Item === recipe.grid[3] && craftingGrid[4].Item === recipe.grid[4] && craftingGrid[5].Item === recipe.grid[5] &&
// // //     //       craftingGrid[6].Item === recipe.grid[6] && craftingGrid[7].Item === recipe.grid[7] && craftingGrid[8].Item === recipe.grid[8]) {
// // //     //         resultSlotGrid.Item = recipe.result;
// // //     //         resultSlotGrid.Count = recipe.count;

// // //     //         drawResultSlotGrid();
// // //     //         break;
// // //     //       } else {
// // //     //         resultSlotGrid.Item = '';
// // //     //         resultSlotGrid.Count = 0;
// // //     //         drawResultSlotGrid();
// // //     //       }
// // //     //   }
// // //     // }

// // //     // checkForRecipes();

// // //     // slotEl.addEventListener('click', (e) => {
// // //     //   checkForRecipes()
// // //     //   if(selectedItem.getItemID() === '') {
// // //     //     if(e.shiftKey) {
// // //     //       selectedItem.set(craftingSlot.Item, Math.round(craftingSlot.Count / 2));
// // //     //       craftingSlot.Count = craftingSlot.Count - Math.round(craftingSlot.Count / 2);
// // //     //     } else {
// // //     //       selectedItem.set(craftingSlot.Item, craftingSlot.Count);
// // //     //       craftingSlot.Item = '';
// // //     //       craftingSlot.Damage = -1;
// // //     //       craftingSlot.Count = 0;

// // //     //       localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
// // //     //     }
// // //     //     slotEl.setAttribute('data-tooltip', 'empty');

// // //     //     drawCraftingGrid();
// // //     //     drawFlyingItem(e);
// // //     //     checkForRecipes();

// // //     //   } else if(selectedItem.getItemID() !== '') {
// // //     //     if(craftingSlot.Item === '') {
// // //     //       craftingSlot.Item = selectedItem.getItemID();
// // //     //       craftingSlot.Damage = selectedItem.Damage;
// // //     //       craftingSlot.Count = selectedItem.getCount();

// // //     //       selectedItem.reset();

// // //     //       drawCraftingGrid();
// // //     //       removeFlyingItem();
// // //     //       checkForRecipes();

// // //     //       localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
// // //     //     } else if(selectedItem.getItemID() === craftingSlot.Item) {
// // //     //         if((craftingSlot.Count + selectedItem.getCount()) <= regItem.maxStackSize) {
// // //     //           craftingSlot.Count += selectedItem.getCount();
// // //     //           selectedItem.reset();
// // //     //           removeFlyingItem();

// // //     //           localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
// // //     //         } else {
// // //     //           const amountAdded = regItem.maxStackSize - craftingSlot.Count;

// // //     //           craftingSlot.Count = regItem.maxStackSize;

// // //     //           selectedItem.set(selectedItem.getItemID(), amountAdded)
// // //     //           drawFlyingItem(e);

// // //     //           localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
// // //     //         }


// // //     //       drawCraftingGrid();
// // //     //       checkForRecipes();
// // //     //     } else {
// // //     //       const storeSelectedItem = {
// // //     //         Item: selectedItem.getItemID(),
// // //     //         Count: selectedItem.getCount()
// // //     //       }

// // //     //       const storecraftingSlot = {
// // //     //         Item: craftingSlot.Item,
// // //     //         Count: craftingSlot.Count 
// // //     //       }

// // //     //       selectedItem.set(storecraftingSlot.Item, storecraftingSlot.Count);
// // //     //       craftingSlot.Item = storeSelectedItem.Item;
// // //     //       craftingSlot.Count = storeSelectedItem.Count;


// // //     //       drawFlyingItem(e);
// // //     //       drawCraftingGrid();
// // //     //       checkForRecipes();
// // //     //     }
// // //     //   }});



// // //     // if(craftingSlot.Item !== '') {
// // //     //   const img = document.createElement('img');
// // //     //   img.src = regItem.texture;

// // //     //   if(regItem.isStackable) {
// // //     //     const stackSpan = document.createElement('span');
// // //     //     stackSpan.classList.add('stack-size');
// // //     //     stackSpan.innerText = craftingSlot.Count !== 1 ? craftingSlot.Count : '';
// // //     //     slotEl.appendChild(stackSpan);
// // //     //   }

// // //     //   if(regItem.maxDamage !== -1 && craftingSlot.Damage < regItem.maxDamage) {
// // //     //     const durabilitybar = document.createElement('div');
// // //     //     durabilitybar.classList.add('durabilityBar');
// // //     //     const calcDurabilityPerc = (craftingSlot.Damage / regItem.maxDamage) * 100;

// // //     //     durabilitybar.innerHTML = `
// // //     //       <div class="durabilityBarInside" style="width: ${calcDurabilityPerc}%; background: ${checkForDurabilityColor(calcDurabilityPerc)}"></div>
// // //     //     `;
// // //     //     slotEl.appendChild(durabilitybar)
// // //     //   }

// // //     //   slotEl.appendChild(img);
// // //     // } else slotEl.innerHTML = '';

// // //     craftinggridEl.appendChild(slotEl);
// // //   })
// // // }

// // // function drawResultSlotGrid() {
// // //   document.getElementById('resultSlot').innerHTML = '';
// // //   const resultSlot = document.createElement('div');
// // //   resultSlot.classList.add('slot');
// // //   resultSlot.style.width = `${26 * guiScale}px`;
// // //   resultSlot.style.height = `${26 * guiScale}px`;

// // // /*   if(resultSlotGrid.Item === '') {
// // //     resultSlot.setAttribute('data-tooltip', 'empty');
// // //   } else {
// // //     resultSlot.setAttribute('data-tooltip', translateKey(`item.minecraft.${resultSlotGrid.Item}`));
// // //   } */

// // //   // resultSlot.addEventListener('click', (e) => {
// // //   //   if(resultSlotGrid.Item !== '') {
// // //   //     if(selectedItem.getCount() === 0) {
// // //   //       selectedItem.set(resultSlotGrid.Item, resultSlotGrid.Count);
// // //   //     } else if(selectedItem.getCount() <= (64 - resultSlotGrid.Count)) {
// // //   //       selectedItem.set(resultSlotGrid.Item, selectedItem.getCount() + resultSlotGrid.Count);
// // //   //     } 

      
   

// // //   //     // craftingGrid.forEach(gridItem => {
// // //   //     //   gridItem.Item = '';
// // //   //     //   gridItem.Count = 0;
// // //   //     // })

// // //   //     if(selectedItem.getCount() !== 64) {
// // //   //       craftingGrid.forEach(craftingSlot => {
// // //   //         if(craftingSlot.Count > 1) {
// // //   //           craftingSlot.Count--;
// // //   //         } else {
// // //   //           craftingSlot.Item = '';
// // //   //           craftingSlot.Count = '';
// // //   //           resultSlotGrid.Item = '';
// // //   //           resultSlotGrid.Count = 0;
// // //   //         }
// // //   //       });
// // //   //     }


// // //   //     drawCraftingGrid();
// // //   //     drawResultSlotGrid();
// // //   //     drawFlyingItem(e);

// // //   //   }
// // //   // });
  

// // //   if(resultSlotGrid.Count !== 0) {
// // //     const img = document.createElement('img');

// // //   /*   const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === resultSlotGrid.Item)];
// // //     img.src = regItem.texture;

// // //     if(regItem.isStackable) {
// // //       const stackSpan = document.createElement('span');
// // //       stackSpan.classList.add('stack-size');
// // //       stackSpan.innerText = resultSlotGrid.Count !== 1 ? resultSlotGrid.Count : '';
// // //       resultSlot.appendChild(stackSpan);
// // //     }

// // //     resultSlot.appendChild(img); */


// // //   } else resultSlot.innerHTML = '';

// // //   document.getElementById('resultSlot').appendChild(resultSlot);
// // // }

// // // document.getElementById('clearInvsBtn').addEventListener('click', () => Slot.clearAllInventories())

// // // function drawFurnaceGrid() {
// // //   furnaceinputEl.innerHTML = '';
// // //   furnacefuelEl.innerHTML = '';
// // //   furnaceoutputEl.innerHTML = '';

// // //   const inputSlot = document.createElement('div'); inputSlot.classList.add('slot');
// // //   const fueltSlot = document.createElement('div'); fueltSlot.classList.add('slot');
// // //   const outputSlot = document.createElement('div'); outputSlot.classList.add('slot');

// // //  /*  slotEl.addEventListener('click', (e) => {
// // //     if(selectedItem.getItemID() === '') {
// // //       if(e.shiftKey) {
// // //         selectedItem.set(furnaceGrid[0].Item, Math.round(furnaceGrid[0].Count / 2));
// // //         furnaceGrid[0].Count = furnaceGrid[0].Count - Math.round(furnaceGrid[0].Count / 2);
// // //       } else {
// // //         selectedItem.set(furnaceGrid[0].Item, furnaceGrid[0].Count);
// // //         furnaceGrid[0].Item = '';
// // //         furnaceGrid[0].Count = 0;

// // //         localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
// // //       }

// // //       drawFurnaceGrid();
// // //       drawFlyingItem(e);

// // //     } else if(selectedItem.getItemID() !== '') {
// // //       if(furnaceGrid[0].Item === '') {
// // //         furnaceGrid[0].Item = selectedItem.getItemID();
// // //         furnaceGrid[0].Count = selectedItem.getCount();

// // //         selectedItem.reset();
// // //         drawFurnaceGrid();
// // //         removeFlyingItem();

// // //         localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
// // //       } else if(selectedItem.getItemID() === furnaceGrid[0].Item) {
// // //           if((furnaceGrid[0].Count + selectedItem.getCount()) <= regItem.maxStackSize) {
// // //             furnaceGrid[0].Count += selectedItem.getCount();
// // //             selectedItem.reset();
// // //             removeFlyingItem();

// // //             localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
// // //           } else {
// // //             const amountAdded = regItem.maxStackSize - furnaceGrid[0].Count;

// // //             furnaceGrid[0].Count = regItem.maxStackSize;

// // //             selectedItem.set(selectedItem.getItemID(), amountAdded)
// // //             drawFlyingItem(e);

// // //             localStorage.setItem('playerHotbar', JSON.stringify(playerHotbar));
// // //           }


// // //           drawFurnaceGrid();
// // //       }
// // //     }}); */
  
// // //   if(furnaceGrid[0].Count !== 0) {
// // //     const img = document.createElement('img');

// // //     const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === furnaceGrid[0].Item)];
// // //     img.src = 'assets/minecraft/textures/item/diamond_sword.png';

// // //     if(false) {
// // //       const stackSpan = document.createElement('span');
// // //       stackSpan.classList.add('stack-size');
// // //       stackSpan.innerText = furnaceGrid[0].Count !== 1 ? furnaceGrid[0].Count : '';
// // //       resultSlot.appendChild(stackSpan);
// // //     }

// // //     inputSlot.appendChild(img);


// // //   } else inputSlot.innerHTML = '';

// // //   if(furnaceGrid[1].Count !== 0) {
// // //     const img = document.createElement('img');

// // //     const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === furnaceGrid[1].Item)];
// // //     img.src = 'assets/minecraft/textures/item/diamond_sword.png';

// // //     if(false) {
// // //       const stackSpan = document.createElement('span');
// // //       stackSpan.classList.add('stack-size');
// // //       stackSpan.innerText = craftingSlot.Count !== 1 ? craftingSlot.Count : '';
// // //       resultSlot.appendChild(stackSpan);
// // //     }

// // //     fueltSlot.appendChild(img);


// // //   } else inputSlot.innerHTML = '';

// // //   if(furnaceGrid[2].Count !== 0) {
// // //     const img = document.createElement('img');

// // //     const regItem = RegistryItems[RegistryItems.findIndex(item => item.identifier === furnaceGrid[2].Item)];
// // //     img.src = 'assets/minecraft/textures/item/diamond_sword.png';

// // //     if(false) {
// // //       const stackSpan = document.createElement('span');
// // //       stackSpan.classList.add('stack-size');
// // //       stackSpan.innerText = craftingSlot.Count !== 1 ? craftingSlot.Count : '';
// // //       resultSlot.appendChild(stackSpan);
// // //     }

// // //     outputSlot.appendChild(img);


// // //   } else inputSlot.innerHTML = '';

// // //   furnaceinputEl.appendChild(inputSlot);
// // //   furnacefuelEl.appendChild(fueltSlot);
// // //   furnaceoutputEl.appendChild(outputSlot);
// // // }

// // // document.getElementById('langSelection').addEventListener('change', (e) => {
// // //   localStorage.setItem('langID', document.getElementById('langSelection').value);

// // //   window.location.reload();
// // // });

// // // document.getElementById('guiScaleSelection').addEventListener('change', (e) => {
// // //   localStorage.setItem('guiScale', document.getElementById('guiScaleSelection').value);
// // //   console.log(document.getElementById('guiScaleSelection').value);
// // //   window.location.reload();
// // // });

// // // document.getElementById('useItemBtn').addEventListener('click', () => {

// // //   if(playerHotbar[0] !== -1) {
// // //     if(playerHotbar[0].Damage >= 2) {
// // //       playerHotbar[0].Damage--;
// // //     } else if(playerHotbar[0].Damage === 1) {
// // //       const breakSound = new Audio('./assets/minecraft/sounds/break.ogg');
// // //       breakSound.volume = soundVolume;
// // //       breakSound.play();

// // //       playerHotbar[0].Item = '';
// // //       playerHotbar[0].Damage = -1;
// // //       playerHotbar[0].Count = 0;
// // //     }
// // //   }
  

// // //   drawHotbar();
// // // })

// // // document.getElementById('showAdvancedTooltipBtn').addEventListener('click', () => {
// // //   if(!advancedTooltip) {
// // //     document.getElementById('showAdvancedTooltipBtn').innerText = 'Advanced Tooltips: ON';
// // //     advancedTooltip = true;
// // //   } else {
// // //     document.getElementById('showAdvancedTooltipBtn').innerText = 'Advanced Tooltips: OFF';
// // //     advancedTooltip = false;
// // //   }

// // //   Slot.redrawInventories();
// // // });

// // // async function initMinecraft() {
// // //   if(localStorage.getItem('showLoadingPanel') !== '0') {
// // //     document.getElementById('loadingPanel').style.display = 'block';
// // //   }

// // //   recipesFiles = await getAllFiles('./recipes.json');


// // //   lootTableFiles = await getAllFiles('./loot_tables.json');
// // //   langFiles = await getAllFiles('./languages.json');


// // //   tagFiles = await getAllFiles('./tags.json');
// // //   dummy = await getAllFiles('./dummy.json');

// // //  /*  for (let i = 0; i < recipesFiles.length; i++) {
// // //     const recipe = recipesFiles[i];
// // //     const recipeData = recipe.data;
    
// // //     let newRecipesData = [];

// // //     newRecipesData.push({ identifier: recipeData.result.item, rawRecipe: recipeData, possibleRecipes: [] })

// // //     for (let j = 0; j < newRecipesData.length; j++) {
// // //       const newRecipe = newRecipesData[j];
// // //       const newRawRecipe = newRecipe.rawRecipe;
    
// // //       if(newRawRecipe.type === 'minecraft:crafting_shaped') {

// // //         const oldPattern = newRawRecipe.pattern;
// // //         newRawRecipe.pattern = [
// // //           { Slot: 0, Item: '' }, { Slot: 1, Item: '' }, { Slot: 2, Item: '' },
// // //           { Slot: 3, Item: '' }, { Slot: 4, Item: '' }, { Slot: 5, Item: '' },
// // //           { Slot: 6, Item: '' }, { Slot: 7, Item: '' }, { Slot: 8, Item: '' }
// // //         ];

// // //         const combinedLines = [];

// // //         oldPattern.forEach(line => {

// // //             const a = line.split();

// // //             a.forEach((b, idx) => {
// // //                 // b === ' ' ? b = '' : b = newRawRecipe.key[b].item;
  
// // //                 combinedLines.push(b)
  
// // //             })

// // //             console.log(a);
  
// // //           });


// // //         for (let k = 0; k < newRawRecipe.pattern.length; k++) newRawRecipe.pattern[k].Item = combinedLines[k] || '';
        
      
// // //         for (let k = 0; k < 9; k++) {
// // //           for (let l = 0; l < 2; l++) {
// // //             const offset = [1, 2][l];

// // //             const stored = newRawRecipe.pattern;

// // //             const aab = [
// // //               { Slot: 0, Item: '' }, { Slot: 1, Item: '' }, { Slot: 2, Item: '' },
// // //               { Slot: 3, Item: '' }, { Slot: 4, Item: '' }, { Slot: 5, Item: '' },
// // //               { Slot: 6, Item: '' }, { Slot: 7, Item: '' }, { Slot: 8, Item: '' }
// // //             ];

// // //             stored.forEach((s) => {
              
// // //               if(aab[s.Slot + 1]) {
// // //                 if(s.Item !== '') {
// // //                   aab[s.Slot + 2].Item = s.Item;
// // //                 }

// // //               }
            
// // //               // console.log(s.Slot);
// // //             });

// // //             // console.log(aab);
            
// // //           }      
// // //         }

// // //         for (let k = 0; k < 9; k++) {
// // //           // for (let l = 0; l < 4; l++) {
// // //           //   const offset = [-2, -1, 1, -2][k];
// // //           // }

// // //         }
// // //       }

// // //     }

// // //     newRecipesData.forEach(a => console.log(a))

// // //   } */


// // //   setLangSelector();
// // //   setGUIScaleSelector();

// // //   Slot.redrawInventories();

// // //   if(localStorage.getItem('showLoadingPanel') !== '0') {
// // //     document.getElementById('loadingPanel').style.opacity = '0';
// // //     document.getElementById('loadingBarInside').style.width = '100%';
// // //     setTimeout(() => {
// // //       document.getElementById('loadingPanel').style.display = 'none';
  
// // //     }, 1001);
// // //   }

// // //   localStorage.setItem('showLoadingPanel', '1');
// // // }

// // // window.addEventListener('DOMContentLoaded', () => {
// // //   initMinecraft()
// // // });

// // // const tooltip = document.getElementById('tooltip');
// // // tooltip.style.position = 'absolute';
// // // tooltip.style.zIndex = '200';
// // // tooltip.style.pointerEvents = 'none';
// // // tooltip.style.padding = '0.2rem 0.9rem 0.4rem 0.9rem';
// // // tooltip.style.cursor = 'none';
// // // tooltip.style.background = 'rgba(16, 0, 16, 0.90)';
// // // tooltip.style.boxShadow = `inset ${0.5 * 3}px ${0.5 * 3}px 0px 1px rgba(48, 0, 160, 0.45), inset -${0.5 * 3}px -${0.5 * 3}px 0px 1px rgba(48, 0, 160, 0.45)`;
// // // tooltip.style.color = 'white';

// // // window.addEventListener('mousemove', (e) => {
// // //   if(document.getElementById('flyingItem')) {
// // //     document.getElementById('flyingItem').style.top = e.pageY - (8 * guiScale) + 'px';
// // //     document.getElementById('flyingItem').style.left = e.pageX - (8 * guiScale) + 'px';
// // //   }

// // //     // // if(tooltip.getBoundingClientRect().width > 0) {
// // //     //   if(tooltip.getBoundingClientRect().width + tooltip.getBoundingClientRect().left > window.innerWidth) {
// // //     //   tooltip.style.display = 'none';
// // //     //     tooltip.style.top = e.pageY - 15 + 'px';
// // //     //     tooltip.style.left = e.pageX - 10 - tooltip.getBoundingClientRect().width + 'px';
// // //     //   tooltip.style.display = 'flex';
// // //     //   } else {

// // //     if(e.path[0].dataset.tooltip) {
// // //       if(e.path[0].dataset.tooltip !== '') {
// // //         tooltip.style.top = e.pageY - (8 * guiScale) + 'px';
// // //         tooltip.style.left = e.pageX + (6 * guiScale) + 'px';
// // //       }
// // //     }
   
// // //       // }

// // //     // }
 
  
// // // });

// // // window.addEventListener('mouseover', (e) => {
// // //   if((e.target.dataset.tooltip && e.target.dataset.tooltip !== 'empty')) {
// // //     if(tooltip.getBoundingClientRect().width + tooltip.getBoundingClientRect().left > window.innerWidth) {
// // //       tooltip.style.top = e.pageY - (8 * guiScale) + 'px';
// // //       tooltip.style.left = e.pageX - (6 * guiScale) - tooltip.getBoundingClientRect().width + 'px';
// // //     } else {
// // //       tooltip.style.top = e.pageY - (8 * guiScale) + 'px';
// // //       tooltip.style.left = e.pageX + (6 * guiScale) + 'px';
// // //     }

// // //     tooltip.innerHTML = '';
// // //     const tooltipTexts = e.target.dataset.tooltip.split(',');
// // //     if(advancedTooltip) {
// // //       tooltipTexts.forEach((text) => {
// // //         const p = document.createElement('p');
// // //         p.innerText = text;
  
// // //         if(text.includes('minecraft:')) {
// // //           p.style.color = 'grey';
// // //         } else {
// // //           p.style.color = TextFormatting.WHITE;
// // //         }

// // //         tooltip.appendChild(p);

// // //       });
// // //     } else {
// // //       tooltip.innerHTML = tooltipTexts[0];
// // //     }

// // // tooltip.style.display = 'block';
   
    
// // //   } else {
// // //     tooltip.innerHTML = '';
// // //     tooltip.style.display = 'none';
// // //   }
// // // })

// // // window.addEventListener('contextmenu', (e) => { e.preventDefault() }, false);

// // const Point2D = function(x, y) { this.x = x; this.y = y; };

// // const Point3D = function(x, y, z) { this.x = x; this.y = y; this.z = z; };

// // const Cube = function(x, y, z, size) {

// //   Point3D.call(this, x, y, z);

// //   size *= 0.5;

// //   this.vertices = [new Point3D(x - size, y - size, z - size),
// //                    new Point3D(x + size, y - size, z - size),
// //                    new Point3D(x + size, y + size, z - size),
// //                    new Point3D(x - size, y + size, z - size),
// //                    new Point3D(x - size, y - size, z + size),
// //                    new Point3D(x + size, y - size, z + size),
// //                    new Point3D(x + size, y + size, z + size),
// //                    new Point3D(x - size, y + size, z + size)];

// //   this.faces = [[0, 1, 2, 3], [0, 4, 5, 1], [1, 5, 6, 2], [3, 2, 6, 7], [0, 3, 7, 4], [4, 7, 6, 5]];

// // };

// // Cube.prototype = {

// //   rotateX:function(radian) {

// //     var cosine = Math.cos(radian);
// //     var sine   = Math.sin(radian);

// //     for (let index = this.vertices.length - 1; index > -1; -- index) {

// //       let p = this.vertices[index];

// //       let y = (p.y - this.y) * cosine - (p.z - this.z) * sine;
// //       let z = (p.y - this.y) * sine + (p.z - this.z) * cosine;

// //       p.y = y + this.y;
// //       p.z = z + this.z;

// //     }

// //   },

// //   rotateY:function(radian) {

// //     var cosine = Math.cos(radian);
// //     var sine   = Math.sin(radian);

// //     for (let index = this.vertices.length - 1; index > -1; -- index) {

// //       let p = this.vertices[index];

// //       let x = (p.z - this.z) * sine + (p.x - this.x) * cosine;
// //       let z = (p.z - this.z) * cosine - (p.x - this.x) * sine;

// //       p.x = x + this.x;
// //       p.z = z + this.z;

// //     }

// //   }

// // };

// // var context = document.getElementById("canvas").getContext("2d");
// // var pointer = new Point2D(0, 0);
// // var cube = new Cube(0, 0, 400, 200);

// // var height = document.documentElement.clientHeight;
// // var width = document.documentElement.clientWidth;

// // function project(points3d, width, height) {

// //   var points2d = new Array(points3d.length);

// //   var focal_length = 200;

// //   for (let index = points3d.length - 1; index > -1; -- index) {

// //     let p = points3d[index];

// //     let x = p.x * (focal_length / p.z) + width * 0.5;
// //     let y = p.y * (focal_length / p.z) + height * 0.5;

// //     points2d[index] = new Point2D(x, y);

// //   }

// //   return points2d;

// // }

// // function loop() {

// //   window.requestAnimationFrame(loop);

// //   height = document.documentElement.clientHeight;
// //   width = document.documentElement.clientWidth;

// //   context.canvas.height = height;
// //   context.canvas.width  = width;

// //   context.fillStyle = "#ffffff";
// //   context.fillRect(0, 0, width, height);

// //   context.strokeStyle = "#ffffff";

// //   cube.rotateX(pointer.y * 0.0001);
// //   cube.rotateY(-pointer.x * 0.0001);

// //   context.fillStyle = "#0080f0";

// //   var vertices = project(cube.vertices, width, height);

// //   for (let index = cube.faces.length - 1; index > -1; -- index) {

// //     let face = cube.faces[index];

// //     let p1 = cube.vertices[face[0]];
// //     let p2 = cube.vertices[face[1]];
// //     let p3 = cube.vertices[face[2]];

// //     let v1 = new Point3D(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
// //     let v2 = new Point3D(p3.x - p1.x, p3.y - p1.y, p3.z - p1.z);

// //     let n  = new Point3D(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);

// //     if (-p1.x * n.x + -p1.y * n.y + -p1.z * n.z <= 0) {

     
// // context.beginPath();
// //           context.moveTo(vertices[face[0]].x, vertices[face[0]].y);
// //           context.lineTo(vertices[face[1]].x, vertices[face[1]].y);
// //           context.lineTo(vertices[face[2]].x, vertices[face[2]].y);
// //           context.lineTo(vertices[face[3]].x, vertices[face[3]].y);
// //           context.closePath();
// //       var blueprint_background = new Image();
// //       blueprint_background.src = 'assets/minecraft/textures/block/stone.png'; 
// //       blueprint_background.onload = function(){
          
// //           var pattern = context.createPattern(this, "repeat");
// //           context.fillStyle = pattern;
// //           context.fill();
// //           context.fill();
// //           context.stroke();
// //       };


// //     }


// //   }

// // }

// // loop();

// // window.addEventListener("click", (event) => {

// //   pointer.x = event.pageX - width * 0.5;
// //   pointer.y = event.pageY - height * 0.5;

// // });

// import { displayLang, defaultLang } from './Settings.js';
// import { langFiles } from './index.js';

// const translateKey = key => {
//   const langDefault = langFiles.find(file => file['lang.id'] === defaultLang);
//   const lang = langFiles.find(file => file['lang.id'] === displayLang);


//   // if(lang[key]) return lang[key]
//   // else if(langDefault[key]) return langDefault[key];
//   return key
// }

// export default translateKey;

// let ItemIdx = 0;

// class Item {
//   #isStackable;
//   #isDamageable;

//   constructor(identifier, maxStackSize, maxDamage, props) {
//     this.id = ItemIdx;
//     ItemIdx++;
//     this.identifier = identifier;
//     this.props = props;
//     this.texture = `assets/minecraft/textures/${this.props.renderAsBlock ? 'block' : 'item'}/` + this.identifier + '.png';
//     this.maxStackSize = maxStackSize;
//     this.#isStackable = maxStackSize === 1 ? false : true;
//     this.maxDamage = maxDamage;
//     this.#isDamageable = maxDamage === -1 ? false : true;
//   }

//   get isStackable() {
//     return this.#isStackable;
//   }
// }

// class BlockItem extends Item {
//   constructor(identifier, maxStackSize, maxDamage, props) {
//     super(identifier, maxStackSize, maxDamage, props);

//     this.isBlock = true;
//   }
// }

// class Registry {
//   constructor(name) {
//     this.length = 0;
//     this.name = name;
//     this.self = {};

//     this.self[this.name] = []
//   }

//   register(item) {
//     this.self[this.name].push(item);
//     this.length++;
//   }

//   getRegistry(name) {
//     return this.self[name];
//   }
// }

// const RegistryItems = new Registry('Items');

// /* const BEDROCK = RegistryItems.register(new BlockItem('bedrock', 64, -1, { textureAll: 'bedrock.png', itemGroup: 'building' }));
// const ACIENT_DEBRIS = RegistryItems.register(new BlockItem('ancient_debris', 64, -1, { textureSide: 'ancient_debris_side.png', textureTop: 'ancient_debris_top.png',  itemGroup: 'building' }));
// const COBBLESTONE = RegistryItems.register(new BlockItem('cobblestone', 64, -1, { textureAll: 'cobblestone.png', itemGroup: 'building' }));
// const ANDESITE = RegistryItems.register(new BlockItem('andesite', 64, -1, { textureAll: 'andesite.png', itemGroup: 'building' }));
// const BARREL = RegistryItems.register(new BlockItem('barrel', 64, -1, { textureSide: 'barrel_side.png', textureTop: 'barrel_top.png', itemGroup: 'building' }));
// const BEE_NEST = RegistryItems.register(new BlockItem('bee_nest', 64, -1, { textureTop: 'bee_nest_top.png', textureLeft: 'bee_nest_side.png', textureFront: 'bee_nest_front.png', itemGroup: 'building' }));
// const BEEHIVE = RegistryItems.register(new BlockItem('beehive', 64, -1, { textureTop: 'beehive_end.png', textureLeft: 'beehive_side.png', textureFront: 'beehive_front.png', itemGroup: 'building' }));
// const BIRCH_LOG = RegistryItems.register(new BlockItem('birch_log', 64, -1, { textureSide: 'birch_log.png', textureTop: 'birch_log_top.png',  itemGroup: 'building' }));
// const BIRCH_PLANKS = RegistryItems.register(new BlockItem('birch_planks', 64, -1, { textureAll: 'birch_planks.png', itemGroup: 'building' }));
// const BIRCH_SAPLING = RegistryItems.register(new BlockItem('birch_sapling', 64, -1, { texture: 'birch_sapling.png', itemGroup: 'building' }));
// const BLACK_CONCRETE = RegistryItems.register(new BlockItem('black_concrete', 64, -1, { textureAll: 'black_concrete.png', itemGroup: 'building' }));
// const BLACK_CONCRETE_POWDER = RegistryItems.register(new BlockItem('black_concrete_powder', 64, -1, { textureAll: 'black_concrete_powder.png', itemGroup: 'building' }));
// const BLACK_GLAZED_TERRACOTTA = RegistryItems.register(new BlockItem('black_glazed_terracotta', 64, -1, { textureAll: 'black_glazed_terracotta.png', itemGroup: 'building' }));
// const BLACK_STAINED_GLASS = RegistryItems.register(new BlockItem('black_stained_glass', 64, -1, { textureAll: 'black_stained_glass.png', itemGroup: 'building' }));
// const BLACKSTONE = RegistryItems.register(new BlockItem('blackstone', 64, -1, { textureSide: 'blackstone.png', textureTop: 'blackstone_top.png', itemGroup: 'building' }));
// const BLACK_TERRACOTTA = RegistryItems.register(new BlockItem('black_terracotta', 64, -1, { textureAll: 'black_terracotta.png', itemGroup: 'building' }));
// const BLUE_CONCRETE = RegistryItems.register(new BlockItem('blue_concrete', 64, -1, { textureAll: 'blue_concrete.png', itemGroup: 'building' }));
// const BLUE_CONCRETE_POWDER = RegistryItems.register(new BlockItem('blue_concrete_powder', 64, -1, { textureAll: 'blue_concrete_powder.png', itemGroup: 'building' }));
// const BLUE_GLAZED_TERRACOTTA = RegistryItems.register(new BlockItem('blue_glazed_terracotta', 64, -1, { textureAll: 'blue_glazed_terracotta.png', itemGroup: 'building' }));
// const BLUE_STAINED_GLASS = RegistryItems.register(new BlockItem('blue_stained_glass', 64, -1, { textureAll: 'blue_stained_glass.png', itemGroup: 'building' }));  
// const BLUE_TERRACOTTA = RegistryItems.register(new BlockItem('blue_terracotta', 64, -1, { textureAll: 'blue_terracotta.png', itemGroup: 'building' }));
// const BLUE_WOOL= RegistryItems.register(new BlockItem('blue_wool', 64, -1, { textureAll: 'blue_wool.png', itemGroup: 'building' })); 
// const BLAST_FURNACE = RegistryItems.register(new BlockItem('blast_furnace', 64, -1, { textureTop: 'blast_furnace_top.png', textureFront: 'blast_furnace_front.png', textureLeft: 'blast_furnace_side.png', itemGroup: 'building' }));
// const BLACK_WOOL = RegistryItems.register(new BlockItem('black_wool', 64, -1, { textureAll: 'black_wool.png', itemGroup: 'building' })); */
// const ACACIA_BOAT = RegistryItems.register(new Item('acacia_boat', 1, -1, { itemGroup: 'transportation' }));
// const ACACIA_DOOR = RegistryItems.register(new Item('acacia_door', 64, -1, { isBlock: true, itemGroup: 'redstone' }));
// const ACACIA_SIGN = RegistryItems.register(new Item('acacia_sign', 16, -1, { isBlock: true, itemGroup: 'decorations' }));
// const APPLE = RegistryItems.register(new Item('apple', 64, -1, { itemGroup: 'foodstuffs' }));
// const ARMOR_STAND = RegistryItems.register(new Item('armor_stand', 64, -1, { itemGroup: 'decorations' }));
// const ARROW = RegistryItems.register(new Item('arrow', 64, -1, { itemGroup: 'misc' }));
// const BAKED_POTATO = RegistryItems.register(new Item('baked_potato', 64, -1, { itemGroup: 'foodstuffs' }));
// const BAMBOO = RegistryItems.register(new Item('bamboo', 64, -1, { isBlock: true, itemGroup: 'misc' }));
// const BARRIER = RegistryItems.register(new Item('barrier', 64, -1, { isBlock: true, itemGroup: 'misc' }));
// const BEEF = RegistryItems.register(new Item('beef', 64, -1, { itemGroup: 'foodstuffs' }));
// const BEETROOT = RegistryItems.register(new Item('beetroot', 64, -1, { itemGroup: 'foodstuffs' }));
// const BEETROOT_SEEDS = RegistryItems.register(new Item('beetroot_seeds', 64, -1, { itemGroup: 'misc' }));
// const BEETROOT_SOUP = RegistryItems.register(new Item('beetroot_soup', 1, -1, { itemGroup: 'foodstuffs' }));
// const BELL = RegistryItems.register(new Item('bell', 64, -1, { isBlock: true, itemGroup: 'redstone' }));
// const BIRCH_BOAT = RegistryItems.register(new Item('birch_boat', 1, -1, { itemGroup: 'transportation' }));
// const BIRCH_DOOR = RegistryItems.register(new Item('birch_door', 64, -1, { isBlock: true, itemGroup: 'misc' }));
// const BIRCH_SIGN = RegistryItems.register(new Item('birch_sign', 64, -1, { isBlock: true, itemGroup: 'misc' }));
// const BLACK_DYE = RegistryItems.register(new Item('black_dye', 64, -1, { itemGroup: 'misc' }));
// const BLAZE_POWDER = RegistryItems.register(new Item('blaze_powder', 64, -1, { itemGroup: 'misc' }));
// const BLAZE_ROD = RegistryItems.register(new Item('blaze_rod', 64, -1, { itemGroup: 'misc' }));
// const BLUE_DYE = RegistryItems.register(new Item('blue_dye', 64, -1, { itemGroup: 'misc' }));
// const BONE = RegistryItems.register(new Item('bone', 64, -1, { itemGroup: 'misc' }));
// const BONE_MEAL = RegistryItems.register(new Item('bone_meal', 64, -1, { itemGroup: 'misc' }));
// const BOOK = RegistryItems.register(new Item('book', 64, -1, { itemGroup: 'misc' }));
// const BOW = RegistryItems.register(new Item('bow', 1, -1, { itemGroup: 'tools' }));
// const BOWL = RegistryItems.register(new Item('bowl', 64, -1, { itemGroup: 'misc' }));
// const BREAD = RegistryItems.register(new Item('bread', 64, -1, { itemGroup: 'foodstuffs' }));
// const BREWING_STAND = RegistryItems.register(new Item('brewing_stand', 64, -1, { isBlock: true, itemGroup: 'brewing' }));
// const BRICK = RegistryItems.register(new Item('brick', 64, -1, { itemGroup: 'misc' }));
// const BROWN_DYE = RegistryItems.register(new Item('brown_dye', 64, -1, { itemGroup: 'misc' }));
// const BUCKET = RegistryItems.register(new Item('bucket', 64, -1, { itemGroup: 'misc' }));
// const CAKE = RegistryItems.register(new Item('cake', 64, -1, { isBlock: true, itemGroup: 'foodstuffs' }));
// const CAMPFIRE = RegistryItems.register(new Item('campfire', 64, -1, { isBlock: true, itemGroup: 'decorations' }));
// const CARROT = RegistryItems.register(new Item('carrot', 64, -1, { itemGroup: 'foodstuffs' }));
// const CHAINMAIL_BOOTS = RegistryItems.register(new Item('chainmail_boots', 1, 20, { armor: 39, itemGroup: 'equipment' }));
// const CHAINMAIL_CHESTPLATE = RegistryItems.register(new Item('chainmail_chestplate', 1, 20, { armor: 37, itemGroup: 'equipment' }));
// const CHAINMAIL_HELMET = RegistryItems.register(new Item('chainmail_helmet', 1, 20, { armor: 36, itemGroup: 'equipment' }));
// const CHAINMAIL_LEGGINGS = RegistryItems.register(new Item('chainmail_leggings', 1, 20, { armor: 38, itemGroup: 'equipment' }));
// const CHARCOAL = RegistryItems.register(new Item('charcoal', 64, -1, { itemGroup: 'misc' }));
// const CHEST_MINECART = RegistryItems.register(new Item('chest_minecart', 1, -1, { itemGroup: 'transportation' }));
// const CHICKEN = RegistryItems.register(new Item('chicken', 64, -1, { itemGroup: 'foodstuffs' }));
// const CHORUS_FRUIT = RegistryItems.register(new Item('chorus_fruit', 64, -1, { itemGroup: 'foodstuffs' }));
// const CLAY_BALL = RegistryItems.register(new Item('clay_ball', 64, -1, { itemGroup: 'misc' }));
// const CLOCK = RegistryItems.register(new Item('clock', 64, -1, { itemGroup: 'tools' }));
// const COAL = RegistryItems.register(new Item('coal', 64, -1, { itemGroup: 'misc' }));
// const COCOA_BEANS = RegistryItems.register(new Item('cocoa_beans', 64, -1, { itemGroup: 'misc' }));
// const COD = RegistryItems.register(new Item('cod', 64, -1, { itemGroup: 'foodstuffs' }));
// const COMPARATOR = RegistryItems.register(new Item('comparator', 64, -1, { isBlock: true, itemGroup: 'redstone' }));
// const COMPASS = RegistryItems.register(new Item('compass', 64, -1, { itemGroup: 'tools' }));
// const COOKED_BEEF = RegistryItems.register(new Item('cooked_beef', 64, -1, { itemGroup: 'foodstuffs' }));
// const COOKED_CHICKEN = RegistryItems.register(new Item('cooked_chicken', 64, -1, { itemGroup: 'foodstuffs' }));
// const COOKED_COD = RegistryItems.register(new Item('cooked_cod', 64, -1, { itemGroup: 'foodstuffs' }));
// const COOKED_MUTTON = RegistryItems.register(new Item('cooked_mutton', 64, -1, { itemGroup: 'foodstuffs' }));
// const COOKED_PORKCHOP = RegistryItems.register(new Item('cooked_porkchop', 64, -1, { itemGroup: 'foodstuffs' }));
// const COOKED_RABBIT = RegistryItems.register(new Item('cooked_rabbit', 64, -1, { itemGroup: 'foodstuffs' }));
// const COOKED_SALMON = RegistryItems.register(new Item('cooked_salmon', 64, -1, { itemGroup: 'foodstuffs' }));
// const CRIMSON_DOOR = RegistryItems.register(new Item('crimson_door', 64, -1, { isBlock: true, itemGroup: 'redstone' }));
// const CRIMSON_SIGN = RegistryItems.register(new Item('crimson_sign', 64, -1, { isBlock: true, itemGroup: 'decorations' }));
// const CROSSBOW_STANDBY = RegistryItems.register(new Item('crossbow_standby', 64, 20, { itemGroup: 'equipment' }));
// const CYAN_DYE = RegistryItems.register(new Item('cyan_dye', 64, -1, { itemGroup: 'misc' }));
// const DARK_OAK_BOAT = RegistryItems.register(new Item('dark_oak_boat', 64, -1, { itemGroup: 'transportation' }));
// const DARK_OAK_DOOR = RegistryItems.register(new Item('dark_oak_door', 64, -1, { isBlock: true, itemGroup: 'redstone' }));
// const DARK_OAK_SIGN = RegistryItems.register(new Item('dark_oak_sign', 64, -1, { isBlock: true, itemGroup: 'decorations' }));
// const DIAMOND = RegistryItems.register(new Item('diamond', 64, -1, { itemGroup: 'misc' }));
// const DIAMOND_AXE = RegistryItems.register(new Item('diamond_axe', 1, 20, { itemGroup: 'tools' }));
// const DIAMOND_BOOTS = RegistryItems.register(new Item('diamond_boots', 1, 20, { armor: 38, itemGroup: 'equipment' }));
// const DIAMOND_CHESTPLATE = RegistryItems.register(new Item('diamond_chestplate', 1, 20, { armor: 37, itemGroup: 'equipment' }));
// const DIAMOND_HELMET = RegistryItems.register(new Item('diamond_helmet', 1, -1, { armor: 36, itemGroup: 'equipment' }));
// const DIAMOND_HOE = RegistryItems.register(new Item('diamond_hoe', 1, 20, { itemGroup: 'tools' }));
// const DIAMOND_HORSE_ARMOR = RegistryItems.register(new Item('diamond_horse_armor', 1, -1, { itemGroup: 'tools' }));
// const DIAMOND_LEGGINGS = RegistryItems.register(new Item('diamond_leggings', 1, 20, { armor: 38, itemGroup: 'equipment' }));
// const DIAMOND_PICKAXE = RegistryItems.register(new Item('diamond_pickaxe', 1, 20, { itemGroup: 'tools' }));
// const DIAMOND_SHOVEL = RegistryItems.register(new Item('diamond_shovel', 1, 20, { itemGroup: 'tools' }));
// const DIAMOND_SWORD = RegistryItems.register(new Item('diamond_sword', 1, 20, { itemGroup: 'equipment' }));
// const DRAGON_BREATH = RegistryItems.register(new Item('dragon_breath', 64, -1, { itemGroup: 'misc' }));
// const DRIED_KELP = RegistryItems.register(new Item('dried_kelp', 64, -1, { itemGroup: 'foodstuffs' }));
// const EGG = RegistryItems.register(new Item('egg', 16, -1, { itemGroup: 'misc' }));
// const EMERALD = RegistryItems.register(new Item('emerald', 64, -1, { itemGroup: 'misc' }));
// const END_CRYSTAL = RegistryItems.register(new Item('end_crystal', 64, -1, { itemGroup: 'misc' }));
// const ENDER_EYE = RegistryItems.register(new Item('ender_eye', 16, -1, { itemGroup: 'misc' }));
// const ENDER_PEARL = RegistryItems.register(new Item('ender_pearl', 16, -1, { itemGroup: 'misc' }));
// const EXPERIENCE_BOTTLE = RegistryItems.register(new Item('experience_bottle', 64, -1, { itemGroup: 'misc' }));
// const FEATHER = RegistryItems.register(new Item('feather', 64, -1, { itemGroup: 'misc' }));
// const FERMENTED_SPIDER_EYE = RegistryItems.register(new Item('fermented_spider_eye', 64, -1, { itemGroup: 'foodstuffs' }));
// const FIRE_CHARGE = RegistryItems.register(new Item('fire_charge', 64, -1, { itemGroup: 'misc' }));
// const FIREWORK_ROCKET = RegistryItems.register(new Item('firework_rocket', 64, -1, { itemGroup: 'misc' }));
// const FISHING_ROD = RegistryItems.register(new Item('fishing_rod', 64, -1, { itemGroup: 'tools' }));
// const FLINT = RegistryItems.register(new Item('flint', 64, -1, { itemGroup: 'misc' }));
// const FLINT_AND_STEEL = RegistryItems.register(new Item('flint_and_steel', 1, -1, { itemGroup: 'tools' }));
// const FLOWER_POT = RegistryItems.register(new Item('flower_pot', 64, -1, { itemGroup: 'decorations' }));
// const FURNACE_MINECART = RegistryItems.register(new Item('furnace_minecart', 64, -1, { itemGroup: 'transportation' }));
// const GHAST_TEAR = RegistryItems.register(new Item('ghast_tear', 64, -1, { itemGroup: 'brewing_stand' }));
// const GLASS_BOTTLE = RegistryItems.register(new Item('glass_bottle', 64, -1, { itemGroup: 'brewing' }));
// const GLISTERING_MELON_SLICE = RegistryItems.register(new Item('glistering_melon_slice', 64, -1, { itemGroup: 'misc' }));
// const GLOWSTONE_DUST = RegistryItems.register(new Item('glowstone_dust', 64, -1, { itemGroup: 'brewing' }));
// const GOLD_INGOT = RegistryItems.register(new Item('gold_ingot', 64, -1, { itemGroup: 'misc' }));
// const GOLD_NUGGET = RegistryItems.register(new Item('gold_nugget', 64, -1, { itemGroup: 'misc' }));
// const GOLDEN_APPLE = RegistryItems.register(new Item('golden_apple', 64, -1, { itemGroup: 'foodstuffs' }));
// const GOLDEN_AXE = RegistryItems.register(new Item('golden_axe', 64, -1, { itemGroup: 'tools' }));
// const GOLDEN_BOOTS = RegistryItems.register(new Item('golden_boots', 64, -1, { armor: 39, itemGroup: 'equipment' }));
// const GOLDEN_CARROT = RegistryItems.register(new Item('golden_carrot', 64, -1, { itemGroup: 'foodstuffs' }));
// const GOLDEN_CHESTPLATE = RegistryItems.register(new Item('golden_chestplate', 1, -1, { armor: 37, itemGroup: 'equipment' }));
// const GOLDEN_HELMET = RegistryItems.register(new Item('golden_helmet', 1, -1, { armor: 36, itemGroup: 'equipment' }));
// const GOLDEN_HOE = RegistryItems.register(new Item('golden_hoe', 1, -1, { itemGroup: 'tools' }));
// const GOLDEN_HORSE_ARMOR = RegistryItems.register(new Item('golden_horse_armor', 1, -1, { itemGroup: 'misc' }));
// const GOLDEN_LEGGINGS = RegistryItems.register(new Item('golden_leggings', 1, -1, { armor: 38, itemGroup: 'equipment' }));
// const GOLDEN_PICKAXE = RegistryItems.register(new Item('golden_pickaxe', 1, -1, { itemGroup: 'tools' }));
// const GOLDEN_SHOVEL = RegistryItems.register(new Item('golden_shovel', 1, -1, { itemGroup: 'tools' }));
// const GOLDEN_SWORD = RegistryItems.register(new Item('golden_sword', 1, -1, { itemGroup: 'equipment' }));
// const GRAY_DYE = RegistryItems.register(new Item('gray_dye', 64, -1, { itemGroup: 'misc' }));
// const GREEN_DYE = RegistryItems.register(new Item('green_dye', 64, -1, { itemGroup: 'misc' }));
// const GUNPOWDER = RegistryItems.register(new Item('gunpowder', 64, -1, { itemGroup: 'misc' }));
// const HEART_OF_THE_SEA = RegistryItems.register(new Item('heart_of_the_sea', 64, -1, { itemGroup: 'misc' }));
// const HONEY_BOTTLE = RegistryItems.register(new Item('honey_bottle', 64, -1, { itemGroup: 'misc' }));
// const HONEYCOMB = RegistryItems.register(new Item('honeycomb', 64, -1, { itemGroup: 'misc' }));
// const HOPPER = RegistryItems.register(new Item('hopper', 64, -1, { itemGroup: 'misc' }));
// const HOPPER_MINECART = RegistryItems.register(new Item('hopper_minecart', 64, -1, { itemGroup: 'misc' }));
// const INK_SAC = RegistryItems.register(new Item('ink_sac', 64, -1, { itemGroup: 'misc' }));
// const IRON_AXE = RegistryItems.register(new Item('iron_axe', 1, -1, { itemGroup: 'misc' }));
// const IRON_BOOTS = RegistryItems.register(new Item('iron_boots', 1, -1, { armor: 39, itemGroup: 'misc' }));
// const IRON_CHESTPLATE = RegistryItems.register(new Item('iron_chestplate', 1, -1, { armor: 37, itemGroup: 'misc' }));
// const IRON_DOOR = RegistryItems.register(new Item('iron_door', 64, -1, { isBlock: true, itemGroup: 'redstone' }));
// const IRON_HELMET = RegistryItems.register(new Item('iron_helmet', 1, -1, { armor: 36, itemGroup: 'misc' }));
// const IRON_HOE = RegistryItems.register(new Item('iron_hoe', 1, -1, { itemGroup: 'misc' }));
// const IRON_HORSE_ARMOR = RegistryItems.register(new Item('iron_horse_armor', 1, -1, { itemGroup: 'misc' }));
// const IRON_INGOT = RegistryItems.register(new Item('iron_ingot', 64, -1, { itemGroup: 'misc' }));
// const IRON_LEGGINGS = RegistryItems.register(new Item('iron_leggings', 1, -1, { armor: 38, itemGroup: 'misc' }));
// const IRON_NUGGET = RegistryItems.register(new Item('iron_nugget', 64, -1, { itemGroup: 'misc' }));
// const IRON_PICKAXE = RegistryItems.register(new Item('iron_pickaxe', 1, -1, { itemGroup: 'equipment' }));
// const IRON_SHOVEL = RegistryItems.register(new Item('iron_shovel', 1, -1, { itemGroup: 'equipment' }));
// const IRON_SWORD = RegistryItems.register(new Item('iron_sword', 1, -1, { itemGroup: 'equipment' }));
// const ITEM_FRAME = RegistryItems.register(new Item('item_frame', 64, -1, { itemGroup: 'misc' }));
// const JUNGLE_BOAT = RegistryItems.register(new Item('jungle_boat', 64, -1, { itemGroup: 'misc' }));
// const JUNGLE_DOOR = RegistryItems.register(new Item('jungle_door', 64, -1, { itemGroup: 'misc' }));
// const JUNGLE_SIGN = RegistryItems.register(new Item('jungle_sign', 64, -1, { itemGroup: 'misc' }));
// const KELP = RegistryItems.register(new Item('kelp', 64, -1, { itemGroup: 'misc' }));
// const LANTERN = RegistryItems.register(new Item('lantern', 64, -1, { itemGroup: 'misc' }));
// const LAPIS_LAZULI = RegistryItems.register(new Item('lapis_lazuli', 64, -1, { itemGroup: 'misc' }));
// const LAVA_BUCKET = RegistryItems.register(new Item('lava_bucket', 64, -1, { itemGroup: 'misc' }));
// const LEAD = RegistryItems.register(new Item('lead', 64, -1, { itemGroup: 'misc' }));
// const LEATHER = RegistryItems.register(new Item('leather', 64, -1, { itemGroup: 'misc' }));
// const LIGHT_BLUE_DYE = RegistryItems.register(new Item('light_blue_dye', 64, -1, { itemGroup: 'misc' }));
// const LIGHT_GRAY_DYE = RegistryItems.register(new Item('light_gray_dye', 64, -1, { itemGroup: 'misc' }));
// const LIME_DYE = RegistryItems.register(new Item('lime_dye', 64, -1, { itemGroup: 'misc' }));
// const MAGENTA_DYE = RegistryItems.register(new Item('magenta_dye', 64, -1, { itemGroup: 'misc' }));
// const MAGMA_CREAM = RegistryItems.register(new Item('magma_cream', 64, -1, { itemGroup: 'misc' }));
// const MELON_SEEDS = RegistryItems.register(new Item('melon_seeds', 64, -1, { itemGroup: 'misc' }));
// const MELON_SLICE = RegistryItems.register(new Item('melon_slice', 64, -1, { itemGroup: 'misc' }));
// const MILK_BUCKET = RegistryItems.register(new Item('milk_bucket', 64, -1, { itemGroup: 'misc' }));
// const MINECART = RegistryItems.register(new Item('minecart', 64, -1, { itemGroup: 'misc' }));
// const MUSHROOM_STEW = RegistryItems.register(new Item('mushroom_stew', 64, -1, { itemGroup: 'misc' }));
// const MUSIC_DISC_11 = RegistryItems.register(new Item('music_disc_11', 64, -1, { itemGroup: 'misc' }));
// const MUSIC_DISC_13 = RegistryItems.register(new Item('music_disc_13', 64, -1, { itemGroup: 'misc' }));
// const MUSIC_DISC_BLOCKS = RegistryItems.register(new Item('music_disc_blocks', 64, -1, { itemGroup: 'misc' }));
// const MUSIC_DISC_CAT = RegistryItems.register(new Item('music_disc_cat', 64, -1, { itemGroup: 'misc' }));
// const MUSIC_DISC_CHIRP = RegistryItems.register(new Item('music_disc_chirp', 64, -1, { itemGroup: 'misc' }));
// const MUSIC_DISC_FAR = RegistryItems.register(new Item('music_disc_far', 64, -1, { itemGroup: 'misc' }));
// const MUSIC_DISC_MALL = RegistryItems.register(new Item('music_disc_mall', 64, -1, { itemGroup: 'misc' }));
// const MUSIC_DISC_MELLOHI = RegistryItems.register(new Item('music_disc_mellohi', 64, -1, { itemGroup: 'misc' }));
// const MUSIC_DISC_PIGSTEP = RegistryItems.register(new Item('music_disc_pigstep', 64, -1, { itemGroup: 'misc' }));
// const MUSIC_DISC_STAL = RegistryItems.register(new Item('music_disc_stal', 64, -1, { itemGroup: 'misc' }));
// const MUSIC_DISC_STRAD = RegistryItems.register(new Item('music_disc_strad', 64, -1, { itemGroup: 'misc' }));
// const MUSIC_DISC_WAIT = RegistryItems.register(new Item('music_disc_wait', 64, -1, { itemGroup: 'misc' }));
// const MUSIC_DISC_WARD = RegistryItems.register(new Item('music_disc_ward', 64, -1, { itemGroup: 'misc' }));
// const MUTTON = RegistryItems.register(new Item('mutton', 64, -1, { itemGroup: 'misc' }));
// const NAME_TAG = RegistryItems.register(new Item('name_tag', 64, -1, { itemGroup: 'misc' }));
// const NAUTILUS_SHELL = RegistryItems.register(new Item('nautilus_shell', 64, -1, { itemGroup: 'misc' }));
// const NETHER_BRICK = RegistryItems.register(new Item('nether_brick', 64, -1, { itemGroup: 'misc' }));
// const NETHER_SPROUTS = RegistryItems.register(new Item('nether_sprouts', 64, -1, { itemGroup: 'misc' }));
// const NETHER_STAR = RegistryItems.register(new Item('nether_star', 64, -1, { itemGroup: 'misc' }));
// const NETHER_WART = RegistryItems.register(new Item('nether_wart', 64, -1, { itemGroup: 'misc' }));
// const NETHERITE_AXE = RegistryItems.register(new Item('netherite_axe', 1, -1, { itemGroup: 'misc' }));
// const NETHERITE_BOOTS = RegistryItems.register(new Item('netherite_boots', 1, -1, { itemGroup: 'misc' }));
// const NETHERITE_CHESTPLATE = RegistryItems.register(new Item('netherite_chestplate', 1, -1, { itemGroup: 'misc' }));
// const NETHERITE_HELMET = RegistryItems.register(new Item('netherite_helmet', 1, -1, { itemGroup: 'misc' }));
// const NETHERITE_HOE = RegistryItems.register(new Item('netherite_hoe', 1, -1, { itemGroup: 'misc' }));
// const NETHERITE_INGOT = RegistryItems.register(new Item('netherite_ingot', 1, -1, { itemGroup: 'misc' }));
// const NETHERITE_LEGGINGS = RegistryItems.register(new Item('netherite_leggings', 1, -1, { itemGroup: 'misc' }));
// const NETHERITE_PICKAXE = RegistryItems.register(new Item('netherite_pickaxe', 1, -1, { itemGroup: 'misc' }));
// const NETHERITE_SCRAP = RegistryItems.register(new Item('netherite_scrap', 1, -1, { itemGroup: 'misc' }));
// const NETHERITE_SHOVEL = RegistryItems.register(new Item('netherite_shovel', 1, -1, { itemGroup: 'misc' }));
// const NETHERITE_SWORD = RegistryItems.register(new Item('netherite_sword', 1, -1, { itemGroup: 'misc' }));
// const OAK_BOAT = RegistryItems.register(new Item('oak_boat', 1, -1, { itemGroup: 'misc' }));
// const OAK_DOOR = RegistryItems.register(new Item('oak_door', 64, -1, { itemGroup: 'misc' }));
// const OAK_SIGN = RegistryItems.register(new Item('oak_sign', 64, -1, { itemGroup: 'misc' }));
// const ORANGE_DYE = RegistryItems.register(new Item('orange_dye', 64, -1, { itemGroup: 'misc' }));
// const PAINTING = RegistryItems.register(new Item('painting', 64, -1, { itemGroup: 'misc' }));
// const PAPER = RegistryItems.register(new Item('paper', 64, -1, { itemGroup: 'misc' }));
// const PHANTOM_MEMBRANE = RegistryItems.register(new Item('phantom_membrane', 64, -1, { itemGroup: 'misc' }));
// const PINK_DYE = RegistryItems.register(new Item('pink_dye', 64, -1, { itemGroup: 'misc' }));
// const POISONOUS_POTATO = RegistryItems.register(new Item('poisonous_potato', 64, -1, { itemGroup: 'misc' }));
// const POPPED_CHORUS_FRUIT = RegistryItems.register(new Item('popped_chorus_fruit', 64, -1, { itemGroup: 'misc' }));
// const PORKCHOP = RegistryItems.register(new Item('porkchop', 64, -1, { itemGroup: 'misc' }));
// const POTATO = RegistryItems.register(new Item('potato', 64, -1, { itemGroup: 'misc' }));
// const PRISMARINE_CRYSTALS = RegistryItems.register(new Item('prismarine_crystals', 64, -1, { itemGroup: 'misc' }));
// const PRISMARINE_SHARD = RegistryItems.register(new Item('prismarine_shard', 64, -1, { itemGroup: 'misc' }));
// const PUFFERFISH = RegistryItems.register(new Item('pufferfish', 64, -1, { itemGroup: 'misc' }));
// const PUFFERFISH_BUCKET = RegistryItems.register(new Item('pufferfish_bucket', 64, -1, { itemGroup: 'misc' }));
// const PUMPKIN_PIE = RegistryItems.register(new Item('pumpkin_pie', 64, -1, { itemGroup: 'misc' }));
// const PUMPKIN_SEEDS = RegistryItems.register(new Item('pumpkin_seeds', 64, -1, { itemGroup: 'misc' }));
// const PURPLE_DYE = RegistryItems.register(new Item('purple_dye', 64, -1, { itemGroup: 'misc' }));
// const QUARTZ = RegistryItems.register(new Item('quartz', 64, -1, { itemGroup: 'misc' }));
// const RABBIT = RegistryItems.register(new Item('rabbit', 64, -1, { itemGroup: 'misc' }));
// const RABBIT_FOOT = RegistryItems.register(new Item('rabbit_foot', 64, -1, { itemGroup: 'misc' }));
// const RABBIT_HIDE = RegistryItems.register(new Item('rabbit_hide', 64, -1, { itemGroup: 'misc' }));
// const RABBIT_STEW = RegistryItems.register(new Item('rabbit_stew', 64, -1, { itemGroup: 'misc' }));
// const RED_DYE = RegistryItems.register(new Item('red_dye', 64, -1, { itemGroup: 'misc' }));
// const REDSTONE = RegistryItems.register(new Item('redstone', 64, -1, { itemGroup: 'misc' }));
// const REPEATER = RegistryItems.register(new Item('repeater', 64, -1, { itemGroup: 'misc' }));
// const ROTTEN_FLESH = RegistryItems.register(new Item('rotten_flesh', 64, -1, { itemGroup: 'misc' }));
// const SADDLE = RegistryItems.register(new Item('saddle', 64, -1, { itemGroup: 'misc' }));
// const SALMON = RegistryItems.register(new Item('salmon', 64, -1, { itemGroup: 'misc' }));
// const SALMON_BUCKET = RegistryItems.register(new Item('salmon_bucket', 64, -1, { itemGroup: 'misc' }));
// const SCUTE = RegistryItems.register(new Item('scute', 64, -1, { itemGroup: 'misc' }));
// const SEA_PICKLE = RegistryItems.register(new Item('sea_pickle', 64, -1, { itemGroup: 'misc' }));
// const SEAGRASS = RegistryItems.register(new Item('seagrass', 64, -1, { itemGroup: 'misc' }));
// const SHEARS = RegistryItems.register(new Item('shears', 1, -1, { itemGroup: 'tools' }));
// const SHULKER_SHELL = RegistryItems.register(new Item('shulker_shell', 64, -1, { itemGroup: 'misc' }));
// const SLIME_BALL = RegistryItems.register(new Item('slime_ball', 64, -1, { itemGroup: 'misc' }));
// const SNOWBALL = RegistryItems.register(new Item('snowball', 16, -1, { itemGroup: 'misc' }));
// const SOUL_CAMPFIRE = RegistryItems.register(new Item('soul_campfire', 16, -1, { itemGroup: 'misc' }));
// const SOUL_LANTERN = RegistryItems.register(new Item('soul_lantern', 16, -1, { itemGroup: 'misc' }));
// const SPECTRAL_ARROW = RegistryItems.register(new Item('spectral_arrow', 64, -1, { itemGroup: 'misc' }));
// const SPIDER_EYE = RegistryItems.register(new Item('spider_eye', 64, -1, { itemGroup: 'misc' }));
// const SPRUCE_BOAT = RegistryItems.register(new Item('spruce_boat', 64, -1, { itemGroup: 'misc' }));
// const SPRUCE_DOOR = RegistryItems.register(new Item('spruce_door', 64, -1, { itemGroup: 'misc' }));
// const SPRUCE_SIGN = RegistryItems.register(new Item('spruce_sign', 64, -1, { itemGroup: 'misc' }));
// const STONE_AXE = RegistryItems.register(new Item('stone_axe', 64, -1, { itemGroup: 'misc' }));
// const STONE_HOE = RegistryItems.register(new Item('stone_hoe', 64, -1, { itemGroup: 'misc' }));
// const STONE_PICKAXE = RegistryItems.register(new Item('stone_pickaxe', 64, -1, { itemGroup: 'misc' }));
// const STONE_SHOVEL = RegistryItems.register(new Item('stone_shovel', 64, -1, { itemGroup: 'misc' }));
// const STONE_SWORD = RegistryItems.register(new Item('stone_sword', 64, -1, { itemGroup: 'misc' }));
// const SUGAR = RegistryItems.register(new Item('sugar', 64, -1, { itemGroup: 'misc' }));
// const SUSPICIOUS_STEW = RegistryItems.register(new Item('suspicious_stew', 64, -1, { itemGroup: 'misc' }));
// const SWEET_BERRIES = RegistryItems.register(new Item('sweet_berries', 64, -1, { itemGroup: 'misc' }));
// const TNT_MINECART = RegistryItems.register(new Item('tnt_minecart', 64, -1, { itemGroup: 'misc' }));
// const TOTEM_OF_UNDYING = RegistryItems.register(new Item('totem_of_undying', 64, -1, { itemGroup: 'misc' }));
// const TRIDENT = RegistryItems.register(new Item('trident', 64, -1, { itemGroup: 'misc' }));
// const TROPICAL_FISH = RegistryItems.register(new Item('tropical_fish', 64, -1, { itemGroup: 'misc' }));
// const TROPICAL_FISH_BUCKET = RegistryItems.register(new Item('tropical_fish_bucket', 64, -1, { itemGroup: 'misc' }));
// const TURTLE_EGG = RegistryItems.register(new Item('turtle_egg', 64, -1, { itemGroup: 'misc' }));
// const TURTLE_HELMET = RegistryItems.register(new Item('turtle_helmet', 64, -1, { itemGroup: 'misc' }));
// const WARPED_DOOR = RegistryItems.register(new Item('warped_door', 64, -1, { itemGroup: 'misc' }));
// const WARPED_FUNGUS_ON_A_STICK = RegistryItems.register(new Item('warped_fungus_on_a_stick', 64, -1, { itemGroup: 'misc' }));
// const WARPED_SIGN = RegistryItems.register(new Item('warped_sign', 64, -1, { itemGroup: 'misc' }));
// const WATER_BUCKET = RegistryItems.register(new Item('water_bucket', 64, -1, { itemGroup: 'misc' }));
// const WHEAT_SEEDS = RegistryItems.register(new Item('wheat_seeds', 64, -1, { itemGroup: 'misc' }));
// const WHITE_DYE = RegistryItems.register(new Item('white_dye', 64, -1, { itemGroup: 'misc' }));
// const WOODEN_AXE = RegistryItems.register(new Item('wooden_axe', 64, -1, { itemGroup: 'misc' }));
// const WOODEN_HOE = RegistryItems.register(new Item('wooden_hoe', 64, -1, { itemGroup: 'misc' }));
// const WOODEN_PICKAXE = RegistryItems.register(new Item('wooden_pickaxe', 64, -1, { itemGroup: 'misc' }));
// const WOODEN_SHOVEL = RegistryItems.register(new Item('wooden_shovel', 64, -1, { itemGroup: 'misc' }));
// const WOODEN_SWORD = RegistryItems.register(new Item('wooden_sword', 64, -1, { itemGroup: 'misc' }));
// const WRITABLE_BOOK = RegistryItems.register(new Item('writable_book', 64, -1, { itemGroup: 'misc' }));
// const YELLOW_DYE = RegistryItems.register(new Item('yellow_dye', 64, -1, { itemGroup: 'misc' }));
// const STICK = RegistryItems.register(new Item('stick', 64, -1, { itemGroup: 'misc' }));
// const STRING = RegistryItems.register(new Item('string', 64, -1, { itemGroup: 'misc' }));
// const SUGAR_CANE = RegistryItems.register(new Item('sugar_cane', 64, -1, { isBlock: true, itemGroup: 'misc' }));
// const WHEAT = RegistryItems.register(new Item('wheat', 64, -1, { itemGroup: 'misc' }));
// const COOKIE = RegistryItems.register(new Item('cookie', 64, -1, { itemGroup: 'foodstuffs' }));

// export default RegistryItems.getRegistry('Items');

// async function getJSONData(url) {
//   const res = await fetch(url);
//   return await res.json(); 
// }

// async function getAllFiles(url, save) {
//   let aaa = await getJSONData(url);

//   let obj = [];

//   aaa.values.forEach(async (src) => {
//     let urlData = await getJSONData(`./${aaa.directory}/${src}`);

//     obj.push({ url: `./${aaa.directory}/${src}`, namespace: src.replace('.json', ''), data: await urlData });
//   })


//   return obj;
// }

// export {
//   getJSONData,
//   getAllFiles
// }


// import { langFiles } from './index.js'
// import translateKey from "./TranslateKey.js";

// if(!localStorage.getItem('showLoadingPanel')) localStorage.setItem('showLoadingPanel', '1');

// let defaultLang = 'en_us';
// let displayLang = localStorage.getItem('langID') || 'en_us';
// let guiScale = localStorage.getItem('guiScale') || '3';

// const setLangSelector = () => {

//   document.getElementById('langSelection').value = displayLang; 

//   langFiles.forEach(lang => {
//     if(document.getElementById(lang['lang.id'])) {

//       document.getElementById(lang['lang.id']).innerHTML = lang['language.name'] + ' (' + lang['language.region'] + ')';

//     }
//   })
  
// }

// const setGUIScaleSelector = () => {
//   document.documentElement.style.setProperty('--guiScale', localStorage.getItem('guiScale'));
//   document.getElementById('guiScaleSelection').value = guiScale;
  
//  /*  ['1', '2', '3', '4'].forEach(scale => {
//     if(document.getElementById(scale)) {
//       document.getElementById(scale).innerHTML = guiScale;

//     }
//   }) */
// }

// export {
//   defaultLang,
//   displayLang,
//   guiScale,
//   setLangSelector,
//   setGUIScaleSelector
// }

// const TextFormatting = {
//   BLACK: '#000',
//   DARK_BLUE: '#0000aa',
//   DARK_GREEN: '#00aa00',
//   DARK_AQUA: '#00aaaa',
//   DARK_RED: '#aa0000',
//   DARK_PURPLE: '#aa00aa',
//   GOLD: '#ffaa00',
//   GRAY: '#aaa',
//   DARK_GRAY: '#555',
//   BLUE: '#5555ff',
//   GREEN: '#55ff55',
//   AQUA: '#55ffff',
//   RED: '#ff5555',
//   LIGHT_PURPLE: '#ff55ff',
//   YELLOW: '#ffff55',
//   WHITE: '#fff'
// /*   OBFUSCATED = true;
//   BOLD = true;
//   STRIKETHROUGH = true;
//   UNDERLINE = true;
//   ITALIC = true; */
// }

// export default TextFormatting;