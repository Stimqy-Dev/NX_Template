RegisterNetEvent('setPedComponent', function(components)
    exports["illenium-appearance"]:setPedComponent(PlayerPedId(), components)
end)

RegisterNetEvent('setPedProp', function(props)
    exports["illenium-appearance"]:setPedProp(PlayerPedId(), props)
end)

RegisterNetEvent('savePlayer', function()
    local playerPed = PlayerPedId()
    local appearance = exports['illenium-appearance']:getPedAppearance(playerPed)
    TriggerServerEvent("illenium-appearance:server:saveAppearance", appearance)
end)

local clothesComponentID = {1, 0, 2, 1, 7, 8, 11, 9, 7, 6, 5, 4, 6, 3}
local defaultClothingWoman = {
	[1] = { draw = 0, text = 0 },
	[2] = { draw = -1, text = -1 },
	[3] = { draw = -1, text = -1 },
	[4] = { draw = -1, text = -1 },
	[5] = { draw = 0, text = 0 },
	[6] = { draw = 15, text = 0 },
	[7] = { draw = 15, text = 0 },
	[8] = { draw = 0, text = 0 },
	[9] = { draw = -1, text = -1 },
	[10] = { draw = -1, text = -1 },
	[11] = { draw = 0, text = 0 },
	[12] = { draw = 15, text = 0 },
	[13] = { draw = 35, text = 0 },
    [14] = { draw = 15, text = 0 }
}

local defaultClothingMen = {
	[1] = { draw = 0, text = 0 },
	[2] = { draw = -1, text = -1 },
	[3] = { draw = -1, text = -1 },
	[4] = { draw = -1, text = -1 },
	[5] = { draw = 0, text = 0 },
	[6] = { draw = 15, text = 0 },
	[7] = { draw = 15, text = 0 },
	[8] = { draw = 0, text = 0 },
	[9] = { draw = -1, text = -1 },
	[10] = { draw = -1, text = -1 },
	[11] = { draw = 0, text = 0 },
	[12] = { draw = 21, text = 0 },
	[13] = { draw = 34, text = 0 },
    [14] = { draw = 15, text = 0 }
}

function clearSkin()
	local src = source
    for index, _ in ipairs(clothesComponentID) do
		local playerIdx = GetPlayerFromServerId(src)
        local ped = GetPlayerPed(playerIdx)
        local hash = GetEntityModel(ped)
        if(hash == 1885233650) then
            if index == 2 or index == 4 or index == 3 or index == 10 or index == 9 then
                local props = {
                    texture = defaultClothingMen[index].text,
                    drawable = defaultClothingMen[index].draw,
                    prop_id = clothesComponentID[index]
                }
                exports['illenium-appearance']:setPedProp(PlayerPedId(), props)
            else
                local components = {
                    texture = defaultClothingMen[index].text,
                    drawable = defaultClothingMen[index].draw,
                    component_id = clothesComponentID[index]
                }
                exports['illenium-appearance']:setPedComponent(PlayerPedId(), components)
            end
        else
            if index == 2 or index == 4 or index == 3 or index == 10 or index == 9 then
                local props = {
                    texture = defaultClothingWoman[index].text,
                    drawable = defaultClothingWoman[index].draw,
                    prop_id = clothesComponentID[index]
                }
                exports['illenium-appearance']:setPedProp(PlayerPedId(), props)
            else
                local components = {
                    texture = defaultClothingWoman[index].text,
                    drawable = defaultClothingWoman[index].draw,
                    component_id = clothesComponentID[index]
                }
                exports['illenium-appearance']:setPedComponent(PlayerPedId(), components)
            end
        end
    end
    local playerPed = PlayerPedId()
    local appearance = exports['illenium-appearance']:getPedAppearance(playerPed)
    TriggerServerEvent("illenium-appearance:server:saveAppearance", appearance)
end
exports('clearSkin', clearSkin)

RegisterCommand("clearskin", function()
	exports['therealoli_clothes']:clearSkin()
end)

function canChangeClothes(canCC)
    Player(-1).state:set('canChangeClothes', canCC,true)
end
exports('canChangeClothes', canChangeClothes)


