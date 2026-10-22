// Create 原生扳手快捷回收；仅作用于整合包注册的四种万能机械。
ServerEvents.tags('block', event => {
    event.add('create:wrench_pickup', [
        'kubejs:anshanbox',
        'kubejs:hongshibox',
        'kubejs:huangtongbox',
        'kubejs:tongbox'
    ]);
});
