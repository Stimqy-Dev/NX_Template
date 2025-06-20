lib.addCommand('searchitems', {
    help = 'Rechercher un item',
    params = {
        { name = 'pattern', type = 'string', help = 'Pattern of name or label item' },
    },
    restricted = 'group.admin',
}, function(source, args)
    local ox_inventory = exports.ox_inventory
    local allitems = ox_inventory:Items()
    local table = {}
    local maxWeight = 0
    for name, item in pairs(allitems) do
        if name and item and (
            args.pattern:lower() == 'item' and 
            (not string.find(name:lower(), ('weapon_'):lower()) and 
             not string.find(name:lower(), ('ammo-'):lower()) and 
             not string.find(name:lower(), ('at_'):lower()))
            ) or 
            string.find(name:lower(), args.pattern:lower()) or 
            string.find(item.label:lower(), args.pattern:lower()) 
        then
            table[#table+1] = {name, 500000}
            maxWeight = maxWeight + (item.weight * 500000)
        end
    end
    local stash = ox_inventory:CreateTemporaryStash({
        label = 'Item pattern: ' .. args.pattern,
        slots = #table,
        maxWeight = maxWeight,
        items = table
    })
    TriggerClientEvent('ox_inventory:openInventory', source, 'stash', stash)
end)