const GameSettings = localStorage.getItem('GameSettings') ? JSON.parse(localStorage.getItem('GameSettings')!) : {
  mouseSensitivity: 0.5,
  renderDistanceChunks: -1,
  entityDistanceScaling: 1.0,
  framerateLimit: 120,
  chatOpacity: 1.0,
  chatLineSpacing: 0.0,
  accessibilityTextBackgroundOpacity: 0.5,
  pauseOnLostFocus: true,
  heldItemTooltips: true,
  chatScale: 1.0,
  chatWidth: 1.0,
  chatHeightFocused: 1.0,
  chatDelay: 0.0,
  mipmapLevels: 4,
  useNativeTransport: true,
  biomeBlendRadius: 2,
  mouseWheelSensitivity: 1.0,
  rawMouseInput: true,
  glDebugVerbosity: 1,
  autoJump: true,
  autoSuggestCommands: true,
  chatColor: true,
  chatLinks: true,
  chatLinksPrompt: true,
  vsync: true,
  entityShadows: true,
  snooper: true,
  accessibilityTextBackground: true,
  viewBobbing: true,
  lastServer: "",
  fov: 70.0,
  screenEffectScale: 1.0,
  fovScaleEffect: 1.0,
  language: "en_us"
}

function saveOptions(screen: any) {
  localStorage.setItem('GameSettings', JSON.stringify(GameSettings));
  localStorage.setItem('prevScreen', JSON.stringify(screen));
  window.location = window.location
}

export default GameSettings;
export {
  saveOptions
}