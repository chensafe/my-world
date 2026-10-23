// Remove Aeronautics' built-in recipe only; keep player-created replacements.
ServerEvents.recipes(event => {
    event.remove({ id: 'aeronautics:crushing/end_stone_powder' });
});
