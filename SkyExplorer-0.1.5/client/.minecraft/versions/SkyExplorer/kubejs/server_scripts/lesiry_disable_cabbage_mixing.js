// Disable only Farmer's Delight cabbage -> cabbage leaves mixer recipe.
ServerEvents.recipes(event => {
    event.remove({ id: 'farmersdelight:integration/create/mixing/cabbage_slice_from_mixing' });
});
