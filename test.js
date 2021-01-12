/* window.addEventListener('dragstart', (e) => {
  e.preventDefault();
}); */

/* Hud Hotbar */
let selectedSlot = 0;

function giveHotbarFunc() {
  const hotbarSlots = document.getElementsByClassName('hotbar-slot');

  for(var i = 0; i < hotbarSlots.length; i++) {
    const hotbarSlot = hotbarSlots[i];
  
    if(i === selectedSlot) hotbarSlot.classList.add('selected');
  
    hotbarSlot.addEventListener('click', () => {
      if(!hotbarSlot.classList.contains('selected')) {
  
        for(var j = 0; j < hotbarSlots.length; j++) {
          hotbarSlots[j].classList.remove('selected');
        }
  
        hotbarSlot.classList.add('selected');
        selectedSlot = Array.prototype.indexOf.call(hotbarSlots, hotbarSlot);
      }
  
      hotbarSlot.blur();
    });
  }
}

const selectHotbarWithWheel = (e) => {
  const hotbarSlots = document.getElementsByClassName('hotbar-slot');

  if(e.deltaY < 0) { // Go Left
    if(selectedSlot < 8) selectedSlot++
    else selectedSlot = 0;
  } else { // Go Right
    if(selectedSlot > 0) selectedSlot--
    else selectedSlot = 8;
  }

  hotbarSlots[selectedSlot].click();
};

const selectHotbarwithNums = (e) => {
  const hotbarSlots = document.getElementsByClassName('hotbar-slot');

  if(e.key === '1' || e.key === '2' || e.key === '3'
     || e.key === '4' || e.key === '5' || e.key === '6'
     || e.key === '7' || e.key === '8' || e.key === '9') {

    selectedSlot = Number(e.key) - 1;
    hotbarSlots[selectedSlot].click();
  }
}

window.addEventListener('mousewheel', selectHotbarWithWheel)
window.addEventListener('keydown', selectHotbarwithNums);

/* Xp bar */
let xpLevel = 0;

function setXP(type, value) {
  const xpBarLevel = document.querySelectorAll('.xp-level');
  const xpBarFull = document.getElementById('xp-bar-full');

  if(type === 'add') {
    xpLevel = xpLevel < 1 ? xpLevel + (value / 10) : xpLevel + (value / (xpLevel * 2));
  } else if(type === 'remove') {
    xpLevel -= value;
  }

  console.clear();
  console.log(xpLevel.toFixed('2'));

  for(var i = 0; i < xpBarLevel.length; i++) {
    if(parseInt(xpLevel) !== 0) xpBarLevel[i].innerText = parseInt(xpLevel);
    else xpBarLevel[i].innerText = '';

    const widthPer = (xpLevel - Math.floor(xpLevel)) * 100;

    xpBarFull.style.width = widthPer + '%';
  }
}

/* Health Bar */
let maxHealth = 20;
let currentHealth = 20;

function setHealth(currvalue) {
  const healthBarBg = document.querySelectorAll('.health-bar-bg')[0];
  const healthBarOverlay = document.querySelectorAll('.health-bar-overlay')[0];

  currentHealth = currvalue;

  console.clear();
  console.log('Current Health: ' + currentHealth + ' (' + currentHealth / 2 + ' hearts)');

  healthBarBg.innerHTML = '';
  healthBarOverlay.innerHTML = '';
 
  const heartBgCount = (currvalue > 20 ? Math.ceil(currvalue / 2) : 10);
  
  for(var i = 0; i < heartBgCount; i++) {
    const heartBg = document.createElement('div');
    heartBg.classList.add('heart-bg');
    healthBarBg.appendChild(heartBg);
  }

  for(var i = 0; i < Math.ceil(currvalue / 2); i++) {
    const heartOverlay = document.createElement('div');
    heartOverlay.classList.add('heart-overlay');


    if(i + 1 === Math.ceil(currvalue / 2) && (currvalue) % 2 !== 0) {
      heartOverlay.classList.add('half');
    }

    healthBarOverlay.appendChild(heartOverlay);
  }
}

/* Hunger Bar */
let maxHunger = 20;
let currentHunger = 20;

function setHunger(currvalue) {
  const hungerBarBg = document.querySelectorAll('.hunger-bar-bg')[0];
  const hungerBarOverlay = document.querySelectorAll('.hunger-bar-overlay')[0];

  currentHunger = currvalue;

  console.clear();
  console.log('Current Hunger: ' + currentHunger + ' (' + currentHunger / 2 + ' hunger thing idk)');

  hungerBarOverlay.innerHTML = '';
  for(var i = 0; i < Math.ceil(currvalue / 2); i++) {
    const hungerOverlay = document.createElement('div');
    hungerOverlay.classList.add('hunger-overlay');

    if(i + 1 === Math.ceil(currvalue / 2) && (currvalue) % 2 !== 0) {
      hungerOverlay.classList.add('half');
    }

    hungerBarOverlay.appendChild(hungerOverlay);
  }
}

/*  */
let displayingOverRoot = false;
const root = document.getElementById('root');
const overRoot = document.getElementById('overlay-root');

const showOverRoot = (e) => {
  if(window.location.hash === '#hud' && e.key === 'Escape') {
    if(!displayingOverRoot && overRoot.innerHTML === '') displayPauseScreen(overRoot);
    undisplayOverRootScreen();
  } else if(window.location.hash === '#hud' && e.key === 'h') {
    if(!displayingOverRoot && overRoot.innerHTML === '') displayHopperScreen(); 
    undisplayOverRootScreen();
  }
}

window.addEventListener('keydown', showOverRoot);

const undisplayOverRootScreen = () => {
  if(!displayingOverRoot) {
    displayingOverRoot = true;
  }
  else {
    overRoot.innerHTML = '';
    displayingOverRoot = false;
    window.addEventListener('keydown', selectHotbarwithNums);
    window.addEventListener('mousewheel', selectHotbarWithWheel);
  }
}

const displayMainScreen = () => {
  window.location.hash = 'main';

  root.innerHTML = `
    <button class="classic-btn" id="hud-btn">Hud</button> 
    <button class="classic-btn" id="settings-btn">Settings</button> 
  `;

  document.getElementById('hud-btn').addEventListener('click', () => {
    displayHudScreen();
  });

  document.getElementById('settings-btn').addEventListener('click', () => {
    displaySettingsScreen(root);
  })
}

const displaySettingsScreen = (where) => {
  window.location.hash = `${window.location.hash === '#hud' ? '#hud-' : ''}settings`;

  where.innerHTML = `
    ${where === overRoot ? '<div class="dark-overlay"></div>' : ''}

    <button class="classic-btn" id="back-btn">Back</button> 
  `;

  document.getElementById('back-btn').addEventListener('click', () => {
    if(window.location.hash !== '#hud-settings') displayMainScreen();
    else displayPauseScreen(overRoot);
  });
}

const displayHudScreen = () => {
  window.location.hash = 'hud';

  root.innerHTML = `
    <div class="hotbar">
      <div class="hotbar-slot"></div>
      <div class="hotbar-slot"></div>
      <div class="hotbar-slot"></div>
      <div class="hotbar-slot"></div>
      <div class="hotbar-slot"></div>
      <div class="hotbar-slot"></div>
      <div class="hotbar-slot"></div>
      <div class="hotbar-slot"></div>
      <div class="hotbar-slot"></div>
    </div>


    <div class="xp-bar">
      <p class="xp-level border-top">0</p>
      <p class="xp-level border-bottom">0</p>
      <p class="xp-level border-right">0</p>
      <p class="xp-level border-left">0</p>
      <p class="xp-level">0</p>
      <div class="xp-bar-empty"></div>
      <div id="xp-bar-full"></div>
    </div>

    <div class="health-bar">
      <div class="health-bar-bg">
        <!-- <div class="heart-bg"></div> -->
      </div>
      <div class="health-bar-overlay">
        <!-- <div class="heart-overlay"></div> -->
      </div>
    </div>

    <div class="armor-bar">
      <div class="armor-bar-bg">
        <div class="armor-bg"></div>
        <div class="armor-bg"></div>
        <div class="armor-bg"></div>
        <div class="armor-bg"></div>
        <div class="armor-bg"></div>
        <div class="armor-bg"></div>
        <div class="armor-bg"></div>
        <div class="armor-bg"></div>
        <div class="armor-bg"></div>
        <div class="armor-bg"></div>
      </div>
      <div class="armor-bar-overlay">
        <div class="armor-overlay"></div>
        <div class="armor-overlay"></div>
        <div class="armor-overlay"></div>
        <div class="armor-overlay"></div>
        <div class="armor-overlay"></div>
        <div class="armor-overlay"></div>
        <div class="armor-overlay half"></div>
      </div>
    </div>

    <div class="hunger-bar">
      <div class="hunger-bar-bg">
        <div class="hunger-bg"></div>
        <div class="hunger-bg"></div>
        <div class="hunger-bg"></div>
        <div class="hunger-bg"></div>
        <div class="hunger-bg"></div>
        <div class="hunger-bg"></div>
        <div class="hunger-bg"></div>
        <div class="hunger-bg"></div>
        <div class="hunger-bg"></div>
        <div class="hunger-bg"></div>
      </div>
      <div class="hunger-bar-overlay">
        <div class="hunger-overlay"></div>
        <div class="hunger-overlay"></div>
        <div class="hunger-overlay"></div>
        <div class="hunger-overlay"></div>
        <div class="hunger-overlay"></div>
        <div class="hunger-overlay"></div>
        <div class="hunger-overlay"></div>
        <div class="hunger-overlay half"></div>
      </div>
    </div>
  `;

  giveHotbarFunc()

  window.addEventListener('keydown', selectHotbarwithNums);
  window.addEventListener('mousewheel', selectHotbarWithWheel);

  setHealth(maxHealth);
  setHunger(maxHunger);
  setXP(xpLevel);
}

const displayPauseScreen = (where) => {
  window.location.hash = '#hud';

  window.removeEventListener('keydown', selectHotbarwithNums);
  window.removeEventListener('mousewheel', selectHotbarWithWheel);

  where.innerHTML = `

    <div class="dark-overlay"></div>

    <button class="classic-btn" id="return-btn">Return</button>
    <button class="classic-btn" id="settings-btn">Settings</button>
    <button class="classic-btn" id="back-title-btn">Back To Title</button>

  `;

  document.getElementById('return-btn').addEventListener('click', () => {
    undisplayOverRootScreen();
  });

  document.getElementById('back-title-btn').addEventListener('click', () => {
    undisplayOverRootScreen();

    displayMainScreen();
  });

  document.getElementById('settings-btn').addEventListener('click', () => {
    displaySettingsScreen(overRoot);
  })
}

const displayHopperScreen = () => {
  window.location.hash = '#hud';

  window.removeEventListener('keydown', selectHotbarwithNums);
  window.removeEventListener('mousewheel', selectHotbarWithWheel);

  overRoot.innerHTML = `

    <div class="dark-overlay"></div>

    <div class="hopper-container"></div>

  `;
}

displayMainScreen()


/*  */
/* let posX = 0,
    posY = 0,
    posZ = 0

const posXLabel = document.getElementById('posX-label');
const posYLabel = document.getElementById('posY-label');
const posZLabel = document.getElementById('posZ-label');

const displayPos = (type, value) => {
  type.innerText = value;
}

window.addEventListener('keyup', (e) => {
  if(e.key === ' ') {
    posY++;
    displayPos(posYLabel, posY);
  } else if(e.key === 'Shift') {
    posY--;
    displayPos(posYLabel, posY);
  } else if(e.key === 'a') {
    posX--;
    displayPos(posXLabel, posX);
  } else if(e.key === 'd') {
    posX++;
    displayPos(posXLabel, posX);
  } else if(e.key === 's') {
    posZ--;
    displayPos(posZLabel, posZ);
  } else if(e.key === 'w') {
    posZ++;
    displayPos(posZLabel, posZ);
  }
}); */