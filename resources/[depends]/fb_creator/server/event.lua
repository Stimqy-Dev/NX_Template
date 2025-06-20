if Config.Core == "ESX" then
    ESX = Config.CoreExport()

    if Config.AdminCommand.Enabled then
        ESX.RegisterCommand(Config.AdminCommand.Name, Config.AdminCommand.Group, function(xPlayer, args, showError)
            if (args.playerId) then
                xPlayer.showNotification("Le menu a été ouvert pour l'id: " .. args.playerId)
                TriggerClientEvent('iCreator:openCreator', args.playerId, nil, true)
            end
        end, true, {help = Config.AdminCommand.Help, validate = true, arguments = {
            {name = 'playerId', help = Config.AdminCommand.ArgHelp, type = 'number'}
        }})
    end
end


if Config.Core == "ESX" then
    ESX = Config.CoreExport()
    RegisterNetEvent('esx:playerLoaded')
    AddEventHandler('esx:playerLoaded', function(playerId, xPlayer)
        local identifier = xPlayer.getIdentifier()
        MySQL.Async.fetchAll('SELECT firstname, lastname FROM users WHERE identifier = @identifier', {
            ['@identifier'] = identifier
        }, function(result)
            if result[1] then
                local firstname = result[1].firstname
                local lastname = result[1].lastname
                if firstname == nil or firstname == '' or lastname == nil or lastname == '' then
                    TriggerClientEvent('iCreator:openCreator', playerId, nil, false)
                end
            end
        end)
    end)
end


RegisterNetEvent("iCreator:finished")
AddEventHandler("iCreator:finished", function(diseaseData, identityData)
    local src = source
    local xPlayer = ESX.GetPlayerFromId(src)
    local identifier = xPlayer.getIdentifier()
    if identityData and identityData.firstname and identityData.lastname and identityData.birthdate and identityData.sexe and identityData.nationality then
        MySQL.Async.execute([[
            UPDATE users 
            SET 
                firstname = @firstname,
                lastname = @lastname,
                dateofbirth = @birthdate,
                sex = @sex,
                nationality = @nationality,
                disease = @disease,
                allergies = @allergies,
                specificity = @specificity,
                addictions = @addictions
            WHERE identifier = @identifier
        ]], {
            ['@identifier'] = identifier,
            ['@firstname'] = identityData.firstname,
            ['@lastname'] = identityData.lastname,
            ['@birthdate'] = identityData.birthdate,
            ['@sex'] = identityData.sexe:sub(1,1):lower(), -- "male" -> "m", "female" -> "f"
            ['@nationality'] = identityData.nationality,
            ['@disease'] = diseaseData.disease or "",
            ['@allergies'] = diseaseData.allergies or "",
            ['@specificity'] = diseaseData.specificity or "",
            ['@addictions'] = diseaseData.addictions or ""
        }, function(rowsChanged)
        end)
    else
        print("[iCreator] Données d'identité manquantes pour le joueur : ", src)
    end
end)


