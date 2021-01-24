import ScreenP from './ScreenP.js';
import Button from '../widgets/Button.js';
import TranslationTextComponent from '../../../util/text/TranslationText.js';
import AddServerScreen from './AddServerScreen.js';
import NotJoinServerScreen from './NotJoinServerScreen.js';
import EditServerScreen from './EditServerScreen.js';
export default class MultiplayerScreen extends ScreenP {
    constructor(parentScreen) {
        super();
        this.parentScreen = parentScreen;
    }
    init() {
        this.setTitle(new TranslationTextComponent("multiplayer.title").get());
        this.btnSelectServer = this.addButton(new Button(this.width / 2 - 154, this.height - 52, 100, 20, new TranslationTextComponent("selectServer.select").get(), () => {
            this.minecraft.displayGuiScreen(new NotJoinServerScreen(this));
        }));
        this.addButton(new Button(this.width / 2 - 50, this.height - 52, 100, 20, new TranslationTextComponent("selectServer.direct").get(), () => {
            return false;
        }));
        this.addButton(new Button(this.width / 2 + (4 + 50), this.height - 52, 100, 20, new TranslationTextComponent("selectServer.add").get(), () => {
            this.minecraft.displayGuiScreen(new AddServerScreen(this));
        }));
        this.btnEditServer = this.addButton(new Button(this.width / 2 - 154, this.height - 28, 70, 20, new TranslationTextComponent("selectServer.edit").get(), () => {
            const serversData = JSON.parse(localStorage.getItem('ServersList'));
            const findSelected = serversData.filter((a) => a.data.hostname === this.selectedServer.data.hostname)[0];
            this.minecraft.displayGuiScreen(new EditServerScreen(this, findSelected));
        }));
        this.btnDeleteServer = this.addButton(new Button(this.width / 2 - 74, this.height - 28, 70, 20, new TranslationTextComponent("selectServer.delete").get(), () => {
            const serversData = JSON.parse(localStorage.getItem('ServersList'));
            const findSelected = serversData.filter((a) => a.data.hostname !== this.selectedServer.data.hostname);
            localStorage.setItem('ServersList', JSON.stringify(findSelected));
            this.refreshServerList();
        }));
        this.addButton(new Button(this.width / 2 + 4, this.height - 28, 70, 20, new TranslationTextComponent("selectServer.refresh").get(), () => {
            this.refreshServerList();
        }));
        this.addButton(new Button(this.width / 2 + (4 + 76), this.height - 28, 75, 20, new TranslationTextComponent("gui.cancel").get(), () => {
            this.minecraft.displayGuiScreen(this.parentScreen);
        }));
        this.V(false);
    }
    closeScreen() {
        this.minecraft.displayGuiScreen(this.parentScreen);
    }
    refreshServerList() {
        this.minecraft.displayGuiScreen(this);
    }
    V(activeBoolean) {
        this.btnEditServer.active(activeBoolean);
        this.btnSelectServer.active(activeBoolean);
        this.btnDeleteServer.active(activeBoolean);
    }
    render() {
        ScreenP.drawCenteredString(this.root, this.title, this.width / 2, 17, 16777215);
        this.renderDirtBackground();
        const scrollpane = document.createElement('div');
        scrollpane.classList.add('scrollpanel');
        for (var i = 0; i < JSON.parse(localStorage.getItem('ServersList')).length; i++) {
            const serverItem = JSON.parse(localStorage.getItem('ServersList'))[i];
            const serverItemBox = document.createElement('div');
            serverItemBox.classList.add('scrollpanel-server-box');
            serverItemBox.setAttribute('data-hostname', serverItem.data.hostname);
            const serverName = serverItem.data.motd.html[0];
            const serverDesc = serverItem.data.motd.html[1];
            serverItemBox.innerHTML = `
        <img src="${serverItem.data.icon}" alt="icon">
        <p>${serverItem.customName !== '<span></span>' ? serverItem.customName : serverName}</p>
        <p class="desc">${serverDesc ? serverDesc : ''}</p>
      `;
            serverItemBox.addEventListener('click', () => {
                if (!serverItemBox.classList.contains('selectedItem')) {
                    const parent = document.querySelectorAll('.scrollpanel > div');
                    for (var j = 0; j < parent.length; j++) {
                        const a = parent[j];
                        a.classList.remove('selectedItem');
                    }
                    serverItemBox.classList.add('selectedItem');
                    this.selectedServer = JSON.parse(localStorage.getItem('ServersList')).filter((a) => a.data.hostname === serverItemBox.getAttribute('data-hostname'))[0];
                    this.V(true);
                }
            });
            scrollpane.appendChild(serverItemBox);
        }
        document.getElementById('root').appendChild(scrollpane);
    }
}
