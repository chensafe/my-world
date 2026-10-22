// SkyExplorer: one additional heart for each previously uneaten eligible food.
// Keep the original solcarrot food history, messages, death persistence and syncing.
// The TOML sets heartsPerMilestone = 1. This script automatically covers all foods,
// including foods from mods added later, instead of imposing a fixed final tier.
ServerEvents.loaded(event => {
  const Config = Java.loadClass('com.cazsius.solcarrot.SOLCarrotConfig')
  const Registries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
  const IntStream = Java.loadClass('java.util.stream.IntStream')
  let foodCount = 0
  Registries.ITEM.forEach(item => {
    // Avoid Rhino's Item / ItemStack overload conversion ambiguity.
    const properties = item.getDefaultInstance().getFoodProperties(null)
    if (properties !== null && properties.nutrition() >= Config.getMinimumFoodValue()
        && Config.isAllowed(item)) foodCount++
  })
  if (foodCount < 1) throw new Error('[Food Hearts] No eligible foods found')
  const milestones = IntStream.rangeClosed(1, foodCount).boxed().toList()
  if (!Config.SERVER.milestones.get().equals(milestones)) {
    Config.SERVER.milestones.set(milestones)
    Config.SERVER_SPEC.save()
  }
  console.info('[Food Hearts] One heart per new food; automatically covered foods: ' + foodCount)
})

// Recalculate from the existing food history when entering a world.
PlayerEvents.loggedIn(event => {
  const FoodList = Java.loadClass('com.cazsius.solcarrot.tracking.FoodList')
  const Health = Java.loadClass('com.cazsius.solcarrot.tracking.MaxHealthHandler')
  FoodList.get(event.player).invalidateProgressInfo()
  Health.updateFoodHPModifier(event.player)
})
