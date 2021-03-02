import Minecraft from "@mcsrc/Minecraft";
import NarratorStatus from "@mcsrc/settings/NarratorStatus";

export default class NarratorChatListener {
  public static INSTANCE: NarratorChatListener = new NarratorChatListener();
  private narrator = window.speechSynthesis;

  public say(msg: string): void {
    this.narrator.cancel();
    
    let narratorstatus: NarratorStatus = NarratorChatListener.getNarratorStatus();
    if(narratorstatus !== NarratorStatus.OFF && narratorstatus !== NarratorStatus.CHAT && !msg.isEmpty()) {
      let ttsmsg = new SpeechSynthesisUtterance();
      ttsmsg.text = msg;
      this.narrator.speak(ttsmsg);
    }
  }

  private static getNarratorStatus(): NarratorStatus {
    return Minecraft.getInstance().gameSettings.narrator;
  }
}