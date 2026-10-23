// SkyExplorer / MC 1.21.1. Startup script: restart the game/server after changes.
// Armor remains an intact item at zero durability. Charging edits the original stack.
var seRainbowRegistry = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
var seRainbowId = Java.loadClass('net.minecraft.resources.ResourceLocation');
var seRainbowComponents = Java.loadClass('net.minecraft.core.component.DataComponents');
var seRainbowCustomData = Java.loadClass('net.minecraft.world.item.component.CustomData');
var seRainbowEnergy = Java.loadClass('net.neoforged.neoforge.energy.IEnergyStorage');
var seRainbowCapabilities = Java.loadClass('net.neoforged.neoforge.capabilities.Capabilities');
var seRainbowEnchantments = Java.loadClass('net.minecraft.world.item.enchantment.EnchantmentHelper');
var seRainbowSlots = Java.loadClass('net.minecraft.world.entity.EquipmentSlot');
var seRainbowEffects = Java.loadClass('net.minecraft.world.effect.MobEffects');
var seRainbowEffectInstance = Java.loadClass('net.minecraft.world.effect.MobEffectInstance');
var seRainbowText = Java.loadClass('net.minecraft.network.chat.Component');
var seRainbowIds = ['helmet', 'chestplate', 'leggings', 'boots'].map(function (piece) {
  return 'rainbowcompound:rainbow_' + piece;
});
var seRainbowArmorSlots = [seRainbowSlots.HEAD, seRainbowSlots.CHEST, seRainbowSlots.LEGS, seRainbowSlots.FEET];
var seRainbowFePerPoint = 100;
var seRainbowRemainder = 'SkyExplorerRainbowChargeRemainder';

function seRainbowIsArmor(stack) {
  return !stack.isEmpty() && seRainbowIds.indexOf(String(seRainbowRegistry.ITEM.getKey(stack.getItem()))) !== -1;
}
function seRainbowFraction(stack) {
  return Math.max(0, Math.min(99, stack.getOrDefault(seRainbowComponents.CUSTOM_DATA, seRainbowCustomData.EMPTY).copyTag().getInt(seRainbowRemainder)));
}
function seRainbowStored(stack) {
  return Math.max(0, Math.min(stack.getMaxDamage() * seRainbowFePerPoint,
    (stack.getMaxDamage() - stack.getDamageValue()) * seRainbowFePerPoint + seRainbowFraction(stack)));
}

ItemEvents.modification(function (event) {
  seRainbowIds.forEach(function (id) {
    event.modify(id, function (item) { item.setUnbreakableWithTooltip(); });
  });
});

// Native unbreakable prevents item destruction, including damage outside normal armor hits.
// Apply combat wear explicitly, preserving vanilla Unbreaking's durability calculation.
NativeEvents.onEvent('LOWEST', 'net.neoforged.neoforge.event.entity.living.ArmorHurtEvent', function (event) {
  var wearer = event.getEntity();
  if (wearer.level.isClientSide()) return;
  seRainbowArmorSlots.forEach(function (slot) {
    var stack = event.getArmorItemStack(slot);
    if (!seRainbowIsArmor(stack)) return;
    var amount = Math.max(0, Math.floor(event.getNewDamage(slot)));
    event.setNewDamage(slot, 0);
    if (amount > 0 && stack.getDamageValue() < stack.getMaxDamage()) {
      var wear = seRainbowEnchantments.processDurabilityChange(wearer.level, stack, amount);
      stack.setDamageValue(Math.min(stack.getMaxDamage(), stack.getDamageValue() + wear));
    }
  });
});

// Standard FE item capability: works with Tesla coils and other compatible item chargers.
// Keep fractional FE on the stack so simulation and one-FE charge probes are exact.
NativeEvents.onEvent('net.neoforged.neoforge.capabilities.RegisterCapabilitiesEvent', function (event) {
  seRainbowIds.forEach(function (id) {
    var item = seRainbowRegistry.ITEM.get(seRainbowId.parse(id));
    event.registerItem(seRainbowCapabilities.EnergyStorage.ITEM, function (stack, context) {
      return new JavaAdapter(seRainbowEnergy, {
        receiveEnergy: function (offered, simulate) {
          var accepted = Math.max(0, Math.min(offered, 4096, stack.getMaxDamage() * seRainbowFePerPoint - seRainbowStored(stack)));
          if (accepted > 0 && !simulate) {
            var total = seRainbowStored(stack) + accepted;
            stack.setDamageValue(stack.getMaxDamage() - Math.floor(total / seRainbowFePerPoint));
            seRainbowCustomData.update(seRainbowComponents.CUSTOM_DATA, stack, function (tag) { tag.putInt(seRainbowRemainder, total % seRainbowFePerPoint); });
          }
          return accepted;
        },
        extractEnergy: function (amount, simulate) { return 0; },
        getEnergyStored: function () { return seRainbowStored(stack); },
        getMaxEnergyStored: function () { return stack.getMaxDamage() * seRainbowFePerPoint; },
        canExtract: function () { return false; },
        canReceive: function () { return true; }
      });
    }, item);
  });
});

// Four slot checks once per second; no inventory/world scans or retained player references.
NativeEvents.onEvent('net.neoforged.neoforge.event.tick.PlayerTickEvent$Post', function (event) {
  var player = event.getEntity();
  if (player.level.isClientSide() || player.tickCount % 20 !== 0) return;
  for (var i = 0; i < seRainbowArmorSlots.length; i++) {
    var stack = player.getItemBySlot(seRainbowArmorSlots[i]);
    if (stack.isEmpty() || String(seRainbowRegistry.ITEM.getKey(stack.getItem())) !== seRainbowIds[i]) return;
  }
  // Amplifier 2 = level III. Brief refresh lets effects expire naturally after unequipping.
  player.addEffect(new seRainbowEffectInstance(seRainbowEffects.FIRE_RESISTANCE, 40, 2, true, false, true));
  player.addEffect(new seRainbowEffectInstance(seRainbowEffects.REGENERATION, 40, 2, true, false, true));
});

NativeEvents.onEvent('net.neoforged.neoforge.event.entity.player.ItemTooltipEvent', function (event) {
  var stack = event.getItemStack();
  if (!seRainbowIsArmor(stack)) return;
  event.getToolTip().add(seRainbowText.literal('\u00a7b耐久：' + Math.max(0, stack.getMaxDamage() - stack.getDamageValue()) + '/' + stack.getMaxDamage() + '（充电恢复）'));
  event.getToolTip().add(seRainbowText.literal('\u00a77充电：100 FE / 耐久；耗尽不会消失'));
  event.getToolTip().add(seRainbowText.literal('\u00a7d全套：抗火 III、生命恢复 III'));
});
