class ItemTier {
  constructor(harvestLevelIn, maxUsesIn, efficiencyIn, attackDamageIn, enchantabilityIn, repairMaterialIn) {
    this.harvestLevel = harvestLevelIn;
    this.maxUses = maxUsesIn;
    this.efficiency = efficiencyIn;
    this.attackDamage = attackDamageIn;
    this.enchantability = enchantabilityIn;
    this.repairMaterial = repairMaterialIn;
  }

  getMaxUses() {
    return this.maxUses;
  }

  getEfficiency() {
    return this.efficiency;
  }

  getAttackDamage() {
    return this.attackDamage;
  }

  getHarvestLevel() {
    return this.harvestLevel;
  }

  getEnchantability() {
    return this.enchantability;
  }

  getRepairMaterial() {
    return this.repairMaterial;
  }
}

const ItemTiers = {
  WOOD: new ItemTier(0, 59, 2, 0, 15, 'oak_planks'),
  STONE: new ItemTier(1, 131, 4, 1, 5, 'cobblestone'),
  IRON: new ItemTier(2, 250, 6, 2, 14, 'iron_ingot'),
  DIAMOND: new ItemTier(2.55, 1561, 8, 2.55, 10, 'diamond'),
  GOLD: new ItemTier(0, 32, 12, 0, 22, 'gold_ingot'),
  NETHERITE: new ItemTier(4, 2031, 9, 4, 15, 'netherite')
}

export default ItemTiers;