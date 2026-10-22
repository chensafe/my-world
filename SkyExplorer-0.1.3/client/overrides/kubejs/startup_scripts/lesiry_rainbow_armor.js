// Rainbow armor: triple only the existing armor attribute.
// Minecraft 1.21.1 / KubeJS 2101. Restart Minecraft after installing.
ItemEvents.modification(event => {
  const Attributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes')
  const AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
  const pieces = ['helmet', 'chestplate', 'leggings', 'boots']

  pieces.forEach(piece => {
    event.modify('rainbowcompound:rainbow_' + piece, item => {
      // ArmorItem supplies defaults lazily; the component can be empty on NeoForge.
      let defaults = item.getAttributeModifiers()
      if (defaults.modifiers().isEmpty()) {
        defaults = item.item().getDefaultAttributeModifiers()
      }
      const entries = defaults.modifiers()
      // Preserve toughness, knockback resistance and equipment slots.
      let updated = defaults
      let changed = false
      entries.forEach(entry => {
        if (entry.attribute().equals(Attributes.ARMOR)) {
          const original = entry.modifier()
          updated = updated.withModifierAdded(entry.attribute(), new AttributeModifier(
            original.id(), original.amount() * 3, original.operation()
          ), entry.slot())
          changed = true
        }
      })
      if (!changed) {
        throw new Error('Missing armor attribute: rainbowcompound:rainbow_' + piece)
      }
      // Avoid the overloaded setAttributeModifiers method in Rhino 2101.
      // This unambiguous method accepts the actual Entry list and enables tooltips.
      item.setAttributeModifiersWithTooltip(updated.modifiers())
      console.info('[Rainbow Armor] Applied triple armor: rainbowcompound:rainbow_' + piece)
    })
  })
})
