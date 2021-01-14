/* Imports */
import { initPanorama } from '../panorama_scripts/panorama.js';
import { selectHotbarwithNums, selectHotbarWithWheel, displayHudScreen, displaySettingsScreen, xpLevel, setXP } from './test.js';

/* Important Vars */
const root = document.getElementById('root');
const overRoot = document.getElementById('overlay-root');
const aboveRoot = document.getElementById('above-root');

/* BossBars */
let bossbars = JSON.parse(localStorage.getItem('bossbars')) || [];
const bossbarStyles = ['progress', 'notched_6', 'notched_10', 'notched_12', 'notched_20'];
const bossbarColors = ['pink', 'blue', 'red', 'green', 'yellow', 'purple', 'white'];

const renderBossbars = () => {
  if(document.getElementById('bossbars-container')) {
    const listEL = document.getElementById('bossbars-container');
    listEL.innerHTML = '';

    for(var i = 0; i < bossbars.length; i++) {
      if(i > 4) break;
      const bossbar = bossbars[i];

      if(bossbar.visible === true) {
        const barEl = document.createElement('div');
        barEl.classList.add('bossbar-item');
        barEl.setAttribute('data-bossbarid', bossbar.id);

        let checkColor = bossbarColors.findIndex(color => color === bossbar.color);
        let barColor = checkColor === -1 ? 'pink' : bossbar.color;
        let checkStyle = bossbarStyles.findIndex(style => style === bossbar.style);
        let barStyle = checkStyle === -1 ? 'progress' : bossbar.style;

        barEl.innerHTML = `
          <span>${bossbar.name}</span>
          <div class="bossbar-empty barcolor-${barColor}"></div>
          <div class="bossbar-full barcolor-${barColor}" style="width: ${(bossbar.value / bossbar.max * 100)}%"></div>
          <div class="bossbar-style barstyle-${barStyle}"></div>
        `;

        listEL.appendChild(barEl);
      }
    }
  }
}

/* Scoreboard */
let scoreboards = [
  {
    id: 'newsb',
    title: 'My Scoreboard',
    players: [
      {
        name: 'Jez',
        value: 1
      }
    ]
  }
];

/* Chat */
let chatMessages = [];

function openChat(e) {
  if(e.key === 't') {
    displayChatOverlay();
    window.removeEventListener('keydown', openChat);
  }
}

const quitChat = (e) => {
  if(e.key === "Escape" || (e.key === "t" && document.activeElement !== document.getElementById('chat-input'))) {
    overRoot.innerHTML = '';
    document.getElementById('chat-hud').style.display = 'grid';
    window.addEventListener('keydown', openChat);
    window.removeEventListener('keydown', quitChat);
    window.addEventListener('keydown', selectHotbarwithNums);
    window.addEventListener('mousewheel', selectHotbarWithWheel);
  }
};

const renderPastChatMessages = () => {
  const chatBoxEl = document.getElementById('chat-box');
  chatBoxEl.innerHTML = '';
  
  for(var i = 0; i < chatMessages.length; i++) {
    const p = document.createElement('p');
    p.innerText = chatMessages[i];

    chatBoxEl.appendChild(p);
  }

  chatBoxEl.scrollTop = chatBoxEl.scrollHeight;
}

/* Main Menu Screen */
const displayMainScreen = () => {
  root.innerHTML = `
    <div id="panoramas"></div>

    <div class="mc-title-box">
      <div class="mc-title-minec"></div>
      <div class="mc-title-raft"></div>
      <h2 id="splash-texts">Have a great day!</h2>
    </div>

    <button class="classic-btn" id="hud-btn" style="top: calc(25% + 40px * var(--gui-scale)); left: 50%; transform: translate(-50%)">Hud</button> 
    <button class="classic-btn" id="settings-btn" style="top: calc(25% + 64px * var(--gui-scale)); left: 50%; transform: translate(-50%)">Settings</button>

    <div class="bottom-text">
      <span>Minecraft JS (Rewritten)</span>
      <span>Damn</span>
    </div>
  `;

  document.getElementById('hud-btn').addEventListener('click', () => {
    displayHudScreen();
  });

  document.getElementById('settings-btn').addEventListener('click', () => {
    displaySettingsScreen(root);
  });

  initPanorama();
}

/* Chat Screen */
let chatInputHistory = [];

function quitChatOnEnter() {
  overRoot.innerHTML = '';
  document.getElementById('chat-hud').style.display = 'grid';
  window.removeEventListener('keydown', quitChat);
  window.addEventListener('keydown', selectHotbarwithNums);
  window.addEventListener('mousewheel', selectHotbarWithWheel);
  window.addEventListener('keydown', openChat);
}

const displayChatOverlay = () => {
  document.getElementById('chat-hud').style.display = 'none';

  overRoot.innerHTML = `
    <div id="chat-box">
      <div class="chat-fill"></div>
    </div>
    <div id="chat-input-box">
      <input type="text" id="chat-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
    </div>
  `;

  window.removeEventListener('keydown', selectHotbarwithNums);
  window.removeEventListener('mousewheel', selectHotbarWithWheel);

  renderPastChatMessages();

  const chatHud = document.getElementById('chat-hud');
  const chatBox = document.getElementById('chat-box');
  const chatInput = document.getElementById('chat-input');

  chatInput.focus();
  setTimeout(() => {
    chatInput.value = '';
  }, 0)

  /* Check Chat input */
  let inputHistIdx = 0;

  const evaluateChatInput = (e) => {
    if(e.key === 'Enter' && chatInput.value !== '') {
      chatMessages.push('<Jez> ' + chatInput.value);
      chatInputHistory.unshift(chatInput.value);

      if(chatInput.value.includes('/reload')) workReloadCommand();
      else if(chatInput.value.includes('/bossbar ')) workBossbarCommand();
      else if(chatInput.value.includes('/xp ')) workXPCommand();
      else if(chatInput.value.includes('/title ')) workTitleCommand();
      else {
        const p = document.createElement('p');
        p.innerText = '<Jez> ' + chatInput.value;
    
        chatHud.appendChild(p);
    
        setTimeout(() => {
          p.style.opacity = '0';
          setTimeout(() => {
            p.remove();
          }, 1000);
        }, 5000);
      }
  
      chatInput.value = '';
      quitChatOnEnter();
    }

    if(e.key === 'ArrowUp') {
      e.preventDefault();
      if(chatInputHistory.length !== 0) {
        chatInput.value = chatInputHistory[inputHistIdx];
        if(inputHistIdx + 1 < chatInputHistory.length) inputHistIdx++;
      }
    } else if(e.key === 'ArrowDown') {
      e.preventDefault();
      if(chatInputHistory.length !== 0) {
        if(inputHistIdx - 1 >= 0) {
          inputHistIdx--;
          chatInput.value = chatInputHistory[inputHistIdx];
        } else {
          chatInput.value = '';
        }
      }
    } else {
      inputHistIdx = 0;
    }
  };

  chatInput.addEventListener('keydown', evaluateChatInput);

  /* Chat commands */
  const splitCommand = (text) => {
    let textSplited = text.match(/[^\s"]+|"([^"]*)"/gi);
    let textLength = textSplited.length;
    while (textLength--) {
      textSplited[textLength] = textSplited[textLength].replace(/"/g,"");
    }

    return textSplited;
  }

  /* Reload Command */
  const workReloadCommand = () => {
    window.location.reload()
  }

  /* Title Command */
  const workTitleCommand = () => {
    const titlecmd = splitCommand(chatInput.value);
    const titleEl = document.getElementById('title-title');
    const subtitleEl = document.getElementById('title-subtitle');
    const actionbarEl = document.getElementById('title-actionbar');

    if(titlecmd[1] === 'title' && titlecmd.length === 3) {
      if(titleEl.innerHTML === '') {
        titleEl.innerText = titlecmd[2];
        titleEl.style.opacity = '1';
        titleEl.style.display = 'block';
    
        setTimeout(() => {
          titleEl.style.opacity = '0';
        }, 3000)
    
        setTimeout(() => {
          titleEl.style.display = 'none';
          titleEl.innerText = '';
        }, 4000)
      }
    } else if(titlecmd[1] === 'subtitle' && titlecmd.length === 3) {
      if(subtitleEl.innerHTML === '' && titleEl.innerHTML !== '') {
        subtitleEl.innerText = titlecmd[2];
        subtitleEl.style.opacity = '1';
        subtitleEl.style.display = 'block';
    
        setTimeout(() => {
          subtitleEl.style.opacity = '0';
        }, 3000)
    
        setTimeout(() => {
          subtitleEl.style.display = 'none';
          subtitleEl.innerText = '';
        }, 4000)
      }
    } else if(titlecmd[1] === 'actionbar' && titlecmd.length === 3) {
      if(actionbarEl.innerHTML === '') {
        actionbarEl.innerText = titlecmd[2];
        actionbarEl.style.opacity = '1';
        actionbarEl.style.display = 'block';
    
        setTimeout(() => {
          actionbarEl.style.opacity = '0';
        }, 3000)
    
        setTimeout(() => {
          actionbarEl.style.display = 'none';
          actionbarEl.innerText = '';
        }, 4000)
      }
    } else if(titlecmd[1] === 'clear' && titlecmd.length === 2) {
      titleEl.innerText = '';
      titleEl.style.display = 'none';
      subtitleEl.innerText = '';
      subtitleEl.style.display = 'none';
      actionbarEl.innerText = '';
      actionbarEl.style.display = 'none';
    }
  }

  /* XP Command */
  const workXPCommand = () => {
    const xpcmd = splitCommand(chatInput.value);
    const xpNumb = parseInt(xpcmd[2]);

    if(xpcmd[1] === 'add' && xpcmd.length === 4) {
      setXP('add', xpNumb, xpcmd[3]);
    } else if(xpcmd[1] === 'set' && xpcmd.length === 4) {
      setXP('set', xpNumb, xpcmd[3]);
    } else if(xpcmd[1] === 'query' && xpcmd.length === 2) {
      console.log(xpLevel);
    }
  }

  /* Bossbar Command */
  const workBossbarCommand = () => {
    const bossbarcmd = splitCommand(chatInput.value);

    if(bossbarcmd[1] === 'add' && bossbarcmd.length === 4) {
      const checkIDs = bossbars.findIndex(bar => bar.id === bossbarcmd[2]);

      if(checkIDs === -1) {
        bossbars.push({
          id: bossbarcmd[2],
          name: bossbarcmd[3],
          color: 'pink',
          style: 'progress',
          max: 1,
          value: 1,
          visible: true
        });
      }

      localStorage.setItem('bossbars', JSON.stringify(bossbars));
      renderBossbars();
    } else if(bossbarcmd[1] === 'set' && bossbarcmd.length === 5) {
      const bossbar = bossbars.find(bar => bar.id === bossbarcmd[2]);

      if(bossbarcmd[3] === 'max' || bossbarcmd[3] === 'value') bossbar[bossbarcmd[3]] = parseInt(bossbarcmd[4]);
      else if(bossbarcmd[3] === 'visible') bossbar.visible = bossbarcmd[4] === 'true' ? true : false
      else bossbar[bossbarcmd[3]] = bossbarcmd[4];

      localStorage.setItem('bossbars', JSON.stringify(bossbars));
      renderBossbars();
    } else if(bossbarcmd[1] === 'list' && bossbarcmd.length === 2) {
      console.log(bossbars);
    } else if(bossbarcmd[1] === 'get' && bossbarcmd.length === 3) {
      const bossbarIndex = bossbars.findIndex(bar => bar.id === bossbarcmd[2]);
      console.log(bossbars[bossbarIndex]);
    } else if(bossbarcmd[1] === 'remove' && bossbarcmd.length === 3) {
      const bossbarIndex = bossbars.findIndex(bar => bar.id === bossbarcmd[2]);

      if(bossbarIndex !== -1) {
        bossbars = bossbars.filter(bar => bar.id !== bossbarcmd[2]);
      }

      localStorage.setItem('bossbars', JSON.stringify(bossbars));
      renderBossbars();
    } else if(bossbarcmd[1] === 'clearlist' && bossbarcmd.length === 2) {
      bossbars = [];
      localStorage.setItem('bossbars', JSON.stringify(bossbars));
      renderBossbars();
    }
  }

  window.addEventListener('keydown', quitChat);
};

window.addEventListener('DOMContentLoaded', () => {
  displayMainScreen();
});

export {
  displayMainScreen,
  displayChatOverlay,
  renderBossbars
}