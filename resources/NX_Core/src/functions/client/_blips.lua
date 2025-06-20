local createdBlips = {}

function Core.CreateBlips(blipData)
    local blip = AddBlipForCoord(blipData.coords.x, blipData.coords.y, blipData.coords.z)

    SetBlipSprite(blip, blipData.sprite)
    SetBlipDisplay(blip, blipData.display or 4)
    SetBlipScale(blip, blipData.scale or 0.8)
    SetBlipColour(blip, blipData.color or 0)
    SetBlipAsShortRange(blip, blipData.shortRange or true)

    BeginTextCommandSetBlipName("STRING")
    AddTextComponentSubstringPlayerName(blipData.name)
    EndTextCommandSetBlipName(blip)

    table.insert(createdBlips, blip)
    return blip
end

function Core.RemoveBlips(blip)
    if DoesBlipExist(blip) then
        RemoveBlip(blip)
        for i, v in ipairs(createdBlips) do
            if v == blip then
                table.remove(createdBlips, i)
                break
            end
        end
    end
end

-- Exemple d'utilisation (vous pouvez le supprimer après avoir compris comment l'utiliser)
-- Citizen.CreateThread(function()
--     Wait(5000) -- Attendre 5 secondes après le démarrage du script
--     local myBlip = Core.CreateBlips({
--         coords = vector3(100.0, 200.0, 30.0),
--         sprite = 1,
--         display = 4,
--         scale = 0.9,
--         color = 5,
--         name = "Mon Super Blip"
--     })
--     Wait(10000) -- Attendre 10 secondes
--     Core.RemoveBlips(myBlip)
-- end)