import Registry from "../util/Registry";
import AbsorptionEffect from "./AbsorptionEffect";
import AttackDamageEffect from "./AttackDamageEffect";
import Effect from "./Effect";
import EffectType from "./EffectType";
import HealthBoostEffect from "./HealthBoostEffect";
import InstantEffect from "./HealthBoostEffect";

export default class Effects {
  public static readonly MOVEMENT_SPEED: Effect = Effects.register(1, "speed", (new Effect(EffectType.BENEFICIAL, 8171462)));
  public static readonly MOVEMENT_SLOWDOWN: Effect = Effects.register(2, "slowness", (new Effect(EffectType.HARMFUL, 5926017)));
  public static readonly DIG_SPEED: Effect = Effects.register(3, "haste", (new Effect(EffectType.BENEFICIAL, 14270531)));
  public static readonly DIG_SLOWDOWN: Effect = Effects.register(4, "mining_fatigue", (new Effect(EffectType.HARMFUL, 4866583)));
  public static readonly DAMAGE_BOOST: Effect = Effects.register(5, "strength", (new AttackDamageEffect(EffectType.BENEFICIAL, 9643043, 3.0)));
  public static readonly HEAL: Effect = Effects.register(6, "instant_health", new InstantEffect(EffectType.BENEFICIAL, 16262179));
  public static readonly HARM: Effect = Effects.register(7, "instant_damage", new InstantEffect(EffectType.HARMFUL, 4393481));
  public static readonly JUMP: Effect = Effects.register(8, "jump_boost", new Effect(EffectType.BENEFICIAL, 2293580));
  public static readonly CONFUSION: Effect = Effects.register(9, "nausea", new Effect(EffectType.HARMFUL, 5578058));
  public static readonly REGENERATION: Effect = Effects.register(10, "regeneration", new Effect(EffectType.BENEFICIAL, 13458603));
  public static readonly DAMAGE_RESISTANCE: Effect = Effects.register(11, "resistance", new Effect(EffectType.BENEFICIAL, 10044730));
  public static readonly FIRE_RESISTANCE: Effect = Effects.register(12, "fire_resistance", new Effect(EffectType.BENEFICIAL, 14981690));
  public static readonly WATER_BREATHING: Effect = Effects.register(13, "water_breathing", new Effect(EffectType.BENEFICIAL, 3035801));
  public static readonly INVISIBILITY: Effect = Effects.register(14, "invisibility", new Effect(EffectType.BENEFICIAL, 8356754));
  public static readonly BLINDNESS: Effect = Effects.register(15, "blindness", new Effect(EffectType.HARMFUL, 2039587));
  public static readonly NIGHT_VISION: Effect = Effects.register(16, "night_vision", new Effect(EffectType.BENEFICIAL, 2039713));
  public static readonly HUNGER: Effect = Effects.register(17, "hunger", new Effect(EffectType.HARMFUL, 5797459));
  public static readonly WEAKNESS: Effect = Effects.register(18, "weakness", (new AttackDamageEffect(EffectType.HARMFUL, 4738376, -4.0)));
  public static readonly POISON: Effect = Effects.register(19, "poison", new Effect(EffectType.HARMFUL, 5149489));
  public static readonly WITHER: Effect = Effects.register(20, "wither", new Effect(EffectType.HARMFUL, 3484199));
  public static readonly HEALTH_BOOST: Effect = Effects.register(21, "health_boost", (new HealthBoostEffect(EffectType.BENEFICIAL, 16284963)));
  public static readonly ABSORPTION: Effect = Effects.register(22, "absorption", new AbsorptionEffect(EffectType.BENEFICIAL, 2445989));
  public static readonly SATURATION: Effect = Effects.register(23, "saturation", new InstantEffect(EffectType.BENEFICIAL, 16262179));
  public static readonly GLOWING: Effect = Effects.register(24, "glowing", new Effect(EffectType.NEUTRAL, 9740385));
  public static readonly LEVITATION: Effect = Effects.register(25, "levitation", new Effect(EffectType.HARMFUL, 13565951));
  public static readonly LUCK: Effect = Effects.register(26, "luck", (new Effect(EffectType.BENEFICIAL, 3381504)));

  private static register(id: number, name: string, effect: Effect): Effect {
    return Registry.registerMapping(Registry.MOB_EFFECT, id, name, effect);
  }
}