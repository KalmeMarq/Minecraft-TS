/* Imports */
import { selectHotbarwithNums, selectHotbarWithWheel } from './test.js';

/* Important Vars */
const root = document.getElementById('root');
const overRoot = document.getElementById('overlay-root');
const aboveRoot = document.getElementById('above-root');

/* BossBars */
let bossbars = [];

const renderBossbars = () => {
  if(document.getElementById('bossbars-container')) {
    const listEL = document.getElementById('bossbars-container');
    listEL.innerHTML = '';

    for(var i = 0; i < bossbars.length; i++) {
      const bossbar = bossbars[i];

      if(bossbar.visible === true) {
        const barEl = document.createElement('div');
        barEl.classList.add('bossbar-item');
        barEl.setAttribute('data-bossbarid', bossbar.id);

        barEl.innerHTML = `
          <span>${bossbar.name}</span>
          <div class="bossbar-empty"></div>
          <div class="bossbar-full" style="width: ${(bossbar.value / bossbar.max * 100)}%"></div>
        `;

        listEL.appendChild(barEl);
      }
    }
  }
}

/* Chat Screen */
const displayChatOverlay = () => {
  overRoot.innerHTML = `
    <div id="chat-box">
      <div class="chat-fill"></div>
    </div>
    <div id="chat-input-box">
      <input type="text" id="chat-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
    </div>
  `;

  const chatBox = document.getElementById('chat-box');
  const chatInput = document.getElementById('chat-input');

  chatInput.focus();

  /* Check Chat input */
  const evaluateChatInput = (e) => {
    if(e.key === 'Enter' && chatInput.value !== '') {
      const p = document.createElement('p');
      p.innerText = '<Jez> ' + chatInput.value;
  
      chatBox.appendChild(p);
  
      setTimeout(() => {
        p.style.opacity = '0';
        setTimeout(() => {
          p.remove();
        }, 1000);
      }, 5000);

      if(chatInput.value.includes('/bossbar ')) workBossbarCommand();
  
      chatInput.value = '';
    }
  };

  chatInput.addEventListener('keydown', evaluateChatInput);

  /* Chat commands */
  const splitCommand = (text) => {
    let textSplited = text.match(/\w+|"[^"]+"/g);
    let textLength = textSplited.length;
    while (textLength--) {
      textSplited[textLength] = textSplited[textLength].replace(/"/g,"");
    }

    return textSplited;
  }

  const workBossbarCommand = () => {
    const bossbarcmd = splitCommand(chatInput.value);

    if(bossbarcmd[1] === 'add' && bossbarcmd.length === 4) {
      if(bossbarcmd.length === 4) {
        bossbars.push({
          id: bossbarcmd[2],
          name: bossbarcmd[3],
          color: 'purple',
          style: 'fill',
          max: 1,
          value: 1,
          visible: true
        });
      }

      renderBossbars();
    } else if(bossbarcmd[1] === 'set' && bossbarcmd.length === 5) {
      const bossbar = bossbars.find(bar => bar.id === bossbarcmd[2]);

      if(bossbarcmd[3] === 'max' || bossbarcmd[3] === 'value') bossbar[bossbarcmd[3]] = parseInt(bossbarcmd[4]);
      else if(bossbarcmd[3] === 'visible') bossbar.visible = bossbarcmd[4] === 'true' ? true : false
      else bossbar[bossbarcmd[3]] = bossbarcmd[4];

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

      renderBossbars();
    }
  }

  /* Remove Chat Screen */
  const quitChat = (e) => {
    if(e.key === "Escape" || (e.key === "t" && document.activeElement !== chatInput)) {
      overRoot.innerHTML = '';
      console.log('Chat closed.')
      window.removeEventListener('input', evaluateChatInput);
      window.removeEventListener('keydown', quitChat, false)
    }
  };

  window.addEventListener('keydown', quitChat, false);
};

export {
  displayChatOverlay
}