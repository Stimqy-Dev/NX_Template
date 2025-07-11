local client = client
local reloadSkinTimer = GetGameTimer()

local function LoadPlayerUniform(reset)
    if reset then
        TriggerServerEvent("illenium-appearance:server:syncUniform", nil)
        return
    end
    lib.callback("illenium-appearance:server:getUniform", false, function(uniformData)
        if not uniformData then
            return
        end
        if Config.BossManagedOutfits then
            local result = lib.callback.await("illenium-appearance:server:getManagementOutfits", false, uniformData.type, Framework.GetGender())
            local uniform = nil
            for i = 1, #result, 1 do
                if result[i].name == uniformData.name then
                    uniform = {
                        type = uniformData.type,
                        name = result[i].name,
                        model = result[i].model,
                        components = result[i].components,
                        props = result[i].props,
                        disableSave = true,
                    }
                    break
                end
            end

            if not uniform then
                TriggerServerEvent("illenium-appearance:server:syncUniform", nil) -- Uniform doesn't exist anymore
                return
            end

            TriggerEvent("illenium-appearance:client:changeOutfit", uniform)
        else
            local outfits = Config.Outfits[uniformData.jobName][uniformData.gender]
            local uniform = nil
            for i = 1, #outfits, 1 do
                if outfits[i].name == uniformData.label then
                    uniform = outfits[i]
                    break
                end
            end

            if not uniform then
                TriggerServerEvent("illenium-appearance:server:syncUniform", nil) -- Uniform doesn't exist anymore
                return
            end

            uniform.jobName = uniformData.jobName
            uniform.gender = uniformData.gender

            TriggerEvent("illenium-appearance:client:loadJobOutfit", uniform)
        end
    end)
end

function InitAppearance()
    Framework.UpdatePlayerData()
    lib.callback("illenium-appearance:server:getAppearance", false, function(appearance)
        if not appearance then
            return
        end

        client.setPlayerAppearance(appearance)
        if Config.PersistUniforms then
            LoadPlayerUniform()
        end
    end)
    ResetBlips()
    if Config.BossManagedOutfits then
        Management.AddItems()
    end
    RestorePlayerStats()
end

AddEventHandler("onResourceStart", function(resource)
    if resource == GetCurrentResourceName() then
        InitAppearance()
    end
end)

local function getNewCharacterConfig()
    local config = GetDefaultConfig()
    config.enableExit   = false

    config.ped          = Config.NewCharacterSections.Ped
    config.headBlend    = Config.NewCharacterSections.HeadBlend
    config.faceFeatures = Config.NewCharacterSections.FaceFeatures
    config.headOverlays = Config.NewCharacterSections.HeadOverlays
    config.components   = Config.NewCharacterSections.Components
    config.props        = Config.NewCharacterSections.Props
    config.tattoos      = not Config.RCoreTattoosCompatibility and Config.NewCharacterSections.Tattoos

    return config
end

function SetInitialClothes(initial)
    client.setPlayerModel(initial.Model)
    -- Fix for tattoo's appearing when creating a new character
    local ped = cache.ped
    client.setPedTattoos(ped, {})
    client.setPedComponents(ped, initial.Components)
    client.setPedProps(ped, initial.Props)
    client.setPedHair(ped, initial.Hair, {})
    ClearPedDecorations(ped)
end

local ClotheListPropsStart = {
    ["hat"] = {-99, -99},
    ["glasses"] = {-99, -99},
    ["earrings"] = {-99, -99},
    ["watch"] = {-99, -99},
    ["bracelet"] = {-99, -99},
}
local ClotheListComponentsStart = {
    ["mask"] = {-99, -99},
    ["chain"] = {-99, -99},
    ["undershirt"] = {-99, -99},
    ["jacket"] = {-99, -99},
    ["bodyarmor"] = {-99, -99},
    ["bag"] = {-99, -99},
    ["pants"] = {-99, -99},
    ["shoes"] = {-99, -99},
    ["gloves"] = {-99, -99}, 
}

function AddToListComponentStart(clothing)
    if clothing.component_id == 1 then
        ClotheListComponentsStart["mask"] = {clothing.drawable, clothing.texture}
    elseif clothing.component_id == 7 then
        ClotheListComponentsStart["chain"] = {clothing.drawable, clothing.texture}
    elseif clothing.component_id == 8 then
        ClotheListComponentsStart["undershirt"] = {clothing.drawable, clothing.texture}
    elseif clothing.component_id == 11 then
        ClotheListComponentsStart["jacket"] = {clothing.drawable, clothing.texture}
    elseif clothing.component_id == 9 then
        ClotheListComponentsStart["bodyarmor"] = {clothing.drawable, clothing.texture}
    elseif clothing.component_id == 5 then
        ClotheListComponentsStart["bag"] = {clothing.drawable, clothing.texture}
    elseif clothing.component_id == 4 then
        ClotheListComponentsStart["pants"] = {clothing.drawable, clothing.texture}
    elseif clothing.component_id == 6 then
        ClotheListComponentsStart["shoes"] = {clothing.drawable, clothing.texture}
    elseif clothing.component_id == 3 then
        ClotheListComponentsStart["gloves"] = {clothing.drawable, clothing.texture}
    else
        --print('Clothing script ERROR | Contact owner | Susiekite su administracija.' .. clothing.component_id)
    end
end

function AddToListPropsStart(clothing)
    if clothing.prop_id == 0 then
        ClotheListPropsStart["hat"] = {clothing.drawable, clothing.texture}
    elseif clothing.prop_id == 1 then
        ClotheListPropsStart["glasses"] = {clothing.drawable, clothing.texture}
    elseif clothing.prop_id == 2 then
        ClotheListPropsStart["earrings"] = {clothing.drawable, clothing.texture}
    elseif clothing.prop_id == 6 then
        ClotheListPropsStart["watch"] = {clothing.drawable, clothing.texture}
    elseif clothing.prop_id == 7 then
        ClotheListPropsStart["bracelet"] = {clothing.drawable, clothing.texture}
    else
        --print('Clothing script ERROR | Contact owner | Susiekite su administracija.' .. clothing.prop_id)
    end
end

function InitializeCharacter(gender, onSubmit, onCancel)
    SetInitialClothes(Config.InitialPlayerClothes[gender])
    local config = getNewCharacterConfig()
    TriggerServerEvent("illenium-appearance:server:ChangeRoutingBucket")
    client.startPlayerCustomization(function(appearance)
        if (appearance) then
            --TriggerServerEvent("illenium-appearance:server:saveAppearance", appearance)
            for k,v in pairs(appearance) do
                if k == 'props' then
                    for _,goku in pairs(v) do
                        AddToListPropsStart(goku)
                    end
                elseif k == 'components' then
                    for z,zooparkas in pairs(v) do
                        AddToListComponentStart(zooparkas)
                    end
                end
            end
            TriggerServerEvent("clothes:GiveFirstClothing", ClotheListPropsStart, ClotheListComponentsStart)
            exports['itemclothes']:clearSkin()

            if onSubmit then
                onSubmit()
            end
        elseif onCancel then
            onCancel()
        end
        Framework.CachePed()
        TriggerServerEvent("illenium-appearance:server:ResetRoutingBucket")
    end, config)
end

function OpenShop(config, isPedMenu, shopType)
    lib.callback("illenium-appearance:server:hasMoney", false, function(hasMoney, money)
        if not hasMoney and not isPedMenu then
            lib.notify({
                title = "Cannot Enter Shop",
                description = "Not enough cash. Need $" .. money,
                type = "error",
                position = Config.NotifyOptions.position
            })
            return
        end

        client.startPlayerCustomization(function(appearance)
            if appearance then
                if not isPedMenu then
                    TriggerServerEvent("illenium-appearance:server:chargeCustomer", shopType)
                    if shopType == 'clothing' then
                        TriggerEvent("illenium-appearance:client:reloadSkin")
                    else
                        TriggerServerEvent("illenium-appearance:server:saveAppearance", appearance)
                    end
                else
                    TriggerServerEvent("illenium-appearance:server:saveAppearance", appearance)
                end
            else
                lib.notify({
                    title = _L("cancelled.title"),
                    description = _L("cancelled.description"),
                    type = "inform",
                    position = Config.NotifyOptions.position
                })
            end
            Framework.CachePed()
        end, config)
    end, shopType)
end

local function OpenClothingShop(isPedMenu)
    local config = GetDefaultConfig()
    config.components = true
    config.props = true

    if isPedMenu then
        config.ped = true
        config.headBlend = true
        config.faceFeatures = true
        config.headOverlays = true
        config.tattoos = not Config.RCoreTattoosCompatibility and true
    end
    OpenShop(config, isPedMenu, "clothing")
end

RegisterNetEvent("illenium-appearance:client:openClothingShop", OpenClothingShop)

RegisterNetEvent("illenium-appearance:client:importOutfitCode", function()
    local response = lib.inputDialog(_L("outfits.import.title"), {
        {
            type = "input",
            label = _L("outfits.import.name.label"),
            placeholder = _L("outfits.import.name.placeholder"),
            default = _L("outfits.import.name.default"),
            required = true
        },
        {
            type = "input",
            label = _L("outfits.import.code.label"),
            placeholder = "XXXXXXXXXXXX",
            required = true
        }
    })

    if not response then
        return
    end

    local outfitName = response[1]
    local outfitCode = response[2]
    if outfitCode ~= nil then
        Wait(500)
        lib.callback("illenium-appearance:server:importOutfitCode", false, function(success)
            if success then
                lib.notify({
                    title = _L("outfits.import.success.title"),
                    description = _L("outfits.import.success.description"),
                    type = "success",
                    position = Config.NotifyOptions.position
                })
            else
                lib.notify({
                    title = _L("outfits.import.failure.title"),
                    description = _L("outfits.import.failure.description"),
                    type = "error",
                    position = Config.NotifyOptions.position
                })
            end
        end, outfitName, outfitCode)
    end
end)

RegisterNetEvent("illenium-appearance:client:generateOutfitCode", function(id)
    lib.callback("illenium-appearance:server:generateOutfitCode", false, function(code)
        if not code then
            lib.notify({
                title = _L("outfits.generate.failure.title"),
                description = _L("outfits.generate.failure.description"),
                type = "error",
                position = Config.NotifyOptions.position
            })
            return
        end
        lib.setClipboard(code)
        lib.inputDialog(_L("outfits.generate.success.title"), {
            {
                type = "input",
                label = _L("outfits.generate.success.description"),
                default = code,
                disabled = true
            }
        })
    end, id)
end)

RegisterNetEvent("illenium-appearance:client:saveOutfit", function()
    local response = lib.inputDialog(_L("outfits.save.title"), {
        {
            type = "input",
            label = _L("outfits.save.name.label"),
            placeholder = _L("outfits.save.name.placeholder"),
            required = true
        }
    })

    if not response then
        return
    end

    local outfitName = response[1]
    if outfitName then
        Wait(500)
        lib.callback("illenium-appearance:server:getOutfits", false, function(outfits)
            local outfitExists = false
            for i = 1, #outfits, 1 do
                if outfits[i].name:lower() == outfitName:lower() then
                    outfitExists = true
                    break
                end
            end

            if outfitExists then
                lib.notify({
                    title = _L("outfits.save.failure.title"),
                    description = _L("outfits.save.failure.description"),
                    type = "error",
                    position = Config.NotifyOptions.position
                })
                return
            end

            local pedModel = client.getPedModel(cache.ped)
            local pedComponents = client.getPedComponents(cache.ped)
            local pedProps = client.getPedProps(cache.ped)

            TriggerServerEvent("illenium-appearance:server:saveOutfit", outfitName, pedModel, pedComponents, pedProps)
        end)
    end
end)

RegisterNetEvent('illenium-appearance:client:updateOutfit', function(outfitID)
    if not outfitID then return end

    lib.callback("illenium-appearance:server:getOutfits", false, function(outfits)
        local outfitExists = false
        for i = 1, #outfits, 1 do
            if outfits[i].id == outfitID then
                outfitExists = true
                break
            end
        end

        if not outfitExists then
            lib.notify({
                title = _L("outfits.update.failure.title"),
                description = _L("outfits.update.failure.description"),
                type = "error",
                position = Config.NotifyOptions.position
            })
            return
        end

        local pedModel = client.getPedModel(cache.ped)
        local pedComponents = client.getPedComponents(cache.ped)
        local pedProps = client.getPedProps(cache.ped)

        TriggerServerEvent("illenium-appearance:server:updateOutfit", outfitID, pedModel, pedComponents, pedProps)
    end)
end)

local function RegisterChangeOutfitMenu(id, parent, outfits, mType)
    local changeOutfitMenu = {
        id = id,
        title = _L("outfits.change.title"),
        menu = parent,
        options = {}
    }
    for i = 1, #outfits, 1 do
        changeOutfitMenu.options[#changeOutfitMenu.options + 1] = {
            title = outfits[i].name,
            description = outfits[i].model,
            event = "illenium-appearance:client:changeOutfit",
            args = {
                type = mType,
                name = outfits[i].name,
                model = outfits[i].model,
                components = outfits[i].components,
                props = outfits[i].props,
                disableSave = mType and true or false
            }
        }
    end

    table.sort(changeOutfitMenu.options, function(a, b)
        return a.title < b.title
    end)

    lib.registerContext(changeOutfitMenu)
end

local function RegisterUpdateOutfitMenu(id, parent, outfits)
    local updateOutfitMenu = {
        id = id,
        title = _L("outfits.update.title"),
        menu = parent,
        options = {}
    }
    for i = 1, #outfits, 1 do
        updateOutfitMenu.options[#updateOutfitMenu.options + 1] = {
            title = outfits[i].name,
            description = outfits[i].model,
            event = "illenium-appearance:client:updateOutfit",
            args = outfits[i].id
        }
    end

    table.sort(updateOutfitMenu.options, function(a, b)
        return a.title < b.title
    end)

    lib.registerContext(updateOutfitMenu)
end

local function RegisterGenerateOutfitCodeMenu(id, parent, outfits)
    local generateOutfitCodeMenu = {
        id = id,
        title = _L("outfits.generate.title"),
        menu = parent,
        options = {}
    }
    for i = 1, #outfits, 1 do
        generateOutfitCodeMenu.options[#generateOutfitCodeMenu.options + 1] = {
            title = outfits[i].name,
            description = outfits[i].model,
            event = "illenium-appearance:client:generateOutfitCode",
            args = outfits[i].id
        }
    end

    lib.registerContext(generateOutfitCodeMenu)
end

local function RegisterDeleteOutfitMenu(id, parent, outfits, deleteEvent)
    local deleteOutfitMenu = {
        id = id,
        title = _L("outfits.delete.title"),
        menu = parent,
        options = {}
    }

    table.sort(outfits, function(a, b)
        return a.name < b.name
    end)

    for i = 1, #outfits, 1 do
        deleteOutfitMenu.options[#deleteOutfitMenu.options + 1] = {
            title = string.format(_L("outfits.delete.item.title"), outfits[i].name),
            description = string.format(_L("outfits.delete.item.description"), outfits[i].model, (outfits[i].gender and (" - Gender: " .. outfits[i].gender) or "")),
            event = deleteEvent,
            args = outfits[i].id
        }
    end

    lib.registerContext(deleteOutfitMenu)
end

RegisterNetEvent("illenium-appearance:client:OutfitManagementMenu", function(args)
    local outfits = lib.callback.await("illenium-appearance:server:getManagementOutfits", false, args.type, Framework.GetGender())
    local managementMenuID = "illenium_appearance_outfit_management_menu"
    local changeManagementOutfitMenuID = "illenium_appearance_change_management_outfit_menu"
    local deleteManagementOutfitMenuID = "illenium_appearance_delete_management_outfit_menu"

    RegisterChangeOutfitMenu(changeManagementOutfitMenuID, managementMenuID, outfits, args.type)
    RegisterDeleteOutfitMenu(deleteManagementOutfitMenuID, managementMenuID, outfits, "illenium-appearance:client:DeleteManagementOutfit")
    local managementMenu = {
        id = managementMenuID,
        title = string.format(_L("outfits.manage.title"), args.type),
        options = {
            {
                title = _L("outfits.change.title"),
                description = string.format(_L("outfits.change.description"), args.type),
                menu = changeManagementOutfitMenuID,
            },
            {
                title = _L("outfits.save.menuTitle"),
                description = string.format(_L("outfits.save.menuDescription"), args.type),
                event = "illenium-appearance:client:SaveManagementOutfit",
                args = args.type
            },
            {
                title = _L("outfits.delete.title"),
                description = string.format(_L("outfits.delete.description"), args.type),
                menu = deleteManagementOutfitMenuID,
            }
        }
    }

    Management.AddBackMenuItem(managementMenu, args)

    lib.registerContext(managementMenu)
    lib.showContext(managementMenuID)
end)

RegisterNetEvent("illenium-appearance:client:SaveManagementOutfit", function(mType)
    local outfitData = {
        Type = mType,
        Model = client.getPedModel(cache.ped),
        Components = client.getPedComponents(cache.ped),
        Props = client.getPedProps(cache.ped)
    }

    local rankValues

    if mType == "Job" then
        outfitData.JobName = client.job.name
        rankValues = Framework.GetRankInputValues("job")

    else
        outfitData.JobName = client.gang.name
        rankValues = Framework.GetRankInputValues("gang")
    end

    local dialogResponse = lib.inputDialog(_L("outfits.save.managementTitle"), {
            {
                label = _L("outfits.save.name.label"),
                type = "input",
                required = true
            },
            {
                label = _L("outfits.save.gender.label"),
                type = "select",
                options = {
                    {
                        label = _L("outfits.save.gender.male"), value = "male"
                    },
                    {
                        label = _L("outfits.save.gender.female"), value = "female"
                    }
                },
                default = "male",
            },
            {
                label = _L("outfits.save.rank.label"),
                type = "select",
                options = rankValues,
                default = "0"
            }
        })

    if not dialogResponse then
        return
    end


    outfitData.Name = dialogResponse[1]
    outfitData.Gender = dialogResponse[2]
    outfitData.MinRank = tonumber(dialogResponse[3])

    TriggerServerEvent("illenium-appearance:server:saveManagementOutfit", outfitData)

end)

local function RegisterWorkOutfitsListMenu(id, parent, menuData)
    local menu = {
        id = id,
        menu = parent,
        title = _L("jobOutfits.title"),
        options = {}
    }
    local event = "illenium-appearance:client:loadJobOutfit"
    if Config.BossManagedOutfits then
        event = "illenium-appearance:client:changeOutfit"
    end
    if menuData then
        for _, v in pairs(menuData) do
            menu.options[#menu.options + 1] = {
                title = v.name,
                event = event,
                args = v
            }
        end
    end
    lib.registerContext(menu)
end

local mainMenu = RageUI.CreateMenu("Vêtements", "Options disponibles")
local changeOutfitMenu = RageUI.CreateSubMenu(mainMenu, "Changer de tenue", "Vos tenues sauvegardées")
local updateOutfitMenu = RageUI.CreateSubMenu(mainMenu, "Mettre à jour", "Modifier une tenue existante")
local deleteOutfitMenu = RageUI.CreateSubMenu(mainMenu, "Supprimer tenue", "Sélectionnez une tenue à supprimer")
local generateOutfitCodeMenu = RageUI.CreateSubMenu(mainMenu, "Générer code", "Créer un code à partager")
local jobOutfitMenu = RageUI.CreateSubMenu(mainMenu, "Tenues de travail", "Vos tenues professionnelles")

local isMenuOpen = false

function OpenMenu(isPedMenu, menuType, menuData)
    if isMenuOpen then return end
    isMenuOpen = true

    local outfits = lib.callback.await("illenium-appearance:server:getOutfits", false)

    RageUI.Visible(mainMenu, true)
    CreateThread(function()
        while isMenuOpen do
            Wait(0)

            -- Menu principal
            RageUI.IsVisible(mainMenu, function()
                if menuType == "default" then
                    local title = isPedMenu and "Essayage libre" or ("Boutique - ~g~" .. Config.ClothingCost .. "$")
                    RageUI.Button(title, "Ouvrir le magasin de vêtements", { RightLabel = "→" }, true, {
                        onSelected = function()
                            TriggerEvent("illenium-appearance:client:openClothingShop", isPedMenu)
                        end
                    })
                end

                -- Tenues sauvegardées
                RageUI.Button("Changer de tenue", "Voir les tenues sauvegardées", { RightLabel = "→" }, true, {
                    onSelected = function() end
                }, changeOutfitMenu)

                RageUI.Button("Mettre à jour une tenue", "Modifier une tenue existante", { RightLabel = "→" }, true, {
                    onSelected = function() end
                }, updateOutfitMenu)

                RageUI.Button("Sauvegarder une tenue", "Sauvegarder votre tenue actuelle", {}, true, {
                    onSelected = function()
                        TriggerEvent("illenium-appearance:client:saveOutfit")
                    end
                })

                RageUI.Button("Générer un code de tenue", "Créez un code pour partager une tenue", { RightLabel = "→" }, true, {
                    onSelected = function() end
                }, generateOutfitCodeMenu)

                RageUI.Button("Supprimer une tenue", "Supprimer une tenue sauvegardée", { RightLabel = "→" }, true, {
                    onSelected = function() end
                }, deleteOutfitMenu)

                RageUI.Button("Importer un code", "Importez une tenue via un code", {}, true, {
                    onSelected = function()
                        TriggerEvent("illenium-appearance:client:importOutfitCode")
                    end
                })

                if menuType == "job-outfit" then
                    RageUI.Button("Tenue civile", "Revenir à votre apparence normale", {}, true, {
                        onSelected = function()
                            TriggerEvent("illenium-appearance:client:reloadSkin", true)
                        end
                    })

                    RageUI.Button("Tenues de travail", "Accéder à vos tenues de fonction", {}, true, {
                        onSelected = function() end
                    }, jobOutfitMenu)
                end
            end)

            -- Sous-menus (à remplir dynamiquement)
            RageUI.IsVisible(changeOutfitMenu, function()
                for _, outfit in pairs(outfits or {}) do
                    RageUI.Button(outfit.name or "Tenue", nil, {}, true, {
                        onSelected = function()
                            TriggerEvent("illenium-appearance:client:setOutfit", outfit)
                        end
                    })
                end
            end)

            RageUI.IsVisible(updateOutfitMenu, function()
                for _, outfit in pairs(outfits or {}) do
                    RageUI.Button(outfit.name or "Tenue", "Mettre à jour cette tenue", {}, true, {
                        onSelected = function()
                            TriggerEvent("illenium-appearance:client:updateOutfit", outfit)
                        end
                    })
                end
            end)

            RageUI.IsVisible(deleteOutfitMenu, function()
                for _, outfit in pairs(outfits or {}) do
                    RageUI.Button(outfit.name or "Tenue", "Supprimer cette tenue", {}, true, {
                        onSelected = function()
                            TriggerEvent("illenium-appearance:client:deleteOutfit", outfit)
                        end
                    })
                end
            end)

            RageUI.IsVisible(generateOutfitCodeMenu, function()
                for _, outfit in pairs(outfits or {}) do
                    RageUI.Button(outfit.name or "Tenue", "Générer un code pour cette tenue", {}, true, {
                        onSelected = function()
                            TriggerEvent("illenium-appearance:client:generateOutfitCode", outfit)
                        end
                    })
                end
            end)

            RageUI.IsVisible(jobOutfitMenu, function()
                for _, outfit in pairs(menuData or {}) do
                    RageUI.Button(outfit.label or "Tenue", outfit.description or "", {}, true, {
                        onSelected = function()
                            TriggerEvent("illenium-appearance:client:setJobOutfit", outfit)
                        end
                    })
                end
            end)

            if not RageUI.Visible(mainMenu) and not RageUI.Visible(changeOutfitMenu)
                and not RageUI.Visible(updateOutfitMenu) and not RageUI.Visible(deleteOutfitMenu)
                and not RageUI.Visible(generateOutfitCodeMenu) and not RageUI.Visible(jobOutfitMenu) then
                isMenuOpen = false
            end
        end
    end)
end

RegisterNetEvent("illenium-appearance:client:openClothingShopMenu", function(isPedMenu)
    if type(isPedMenu) == "table" then
        isPedMenu = false
    end
    OpenMenu(isPedMenu, "default")
end)

RegisterNetEvent("illenium-appearance:client:OpenBarberShop", OpenBarberShop)

RegisterNetEvent("illenium-appearance:client:OpenTattooShop", OpenTattooShop)

RegisterNetEvent("illenium-appearance:client:OpenSurgeonShop", OpenSurgeonShop)

RegisterNetEvent("illenium-appearance:client:changeOutfit", function(data)
    local pedModel = client.getPedModel(cache.ped)
    local appearanceDB
    if pedModel ~= data.model then
        local p = promise.new()
        lib.callback("illenium-appearance:server:getAppearance", false, function(appearance)
            BackupPlayerStats()
            if appearance then
                client.setPlayerAppearance(appearance)
                RestorePlayerStats()
            else
                lib.notify({
                    title = _L("outfits.change.failure.title"),
                    description = _L("outfits.change.failure.description"),
                    type = "error",
                    position = Config.NotifyOptions.position
                })
            end
            p:resolve(appearance)
        end, data.model)
        appearanceDB = Citizen.Await(p)
    else
        appearanceDB = client.getPedAppearance(cache.ped)
    end
    if appearanceDB then
        client.setPedComponents(cache.ped, data.components)
        client.setPedProps(cache.ped, data.props)
        client.setPedHair(cache.ped, appearanceDB.hair, appearanceDB.tattoos)

        if data.disableSave then
            TriggerServerEvent("illenium-appearance:server:syncUniform", {
                type = data.type,
                name = data.name
            }) -- Is a uniform
        else
            local appearance = client.getPedAppearance(cache.ped)
            TriggerServerEvent("illenium-appearance:server:saveAppearance", appearance)
        end
        Framework.CachePed()
    end
end)

RegisterNetEvent("illenium-appearance:client:DeleteManagementOutfit", function(id)
    TriggerServerEvent("illenium-appearance:server:deleteManagementOutfit", id)
    lib.notify({
        title = _L("outfits.delete.management.success.title"),
        description = _L("outfits.delete.management.success.description"),
        type = "success",
        position = Config.NotifyOptions.position
    })
end)

RegisterNetEvent("illenium-appearance:client:deleteOutfit", function(id)
    TriggerServerEvent("illenium-appearance:server:deleteOutfit", id)
    lib.notify({
        title = _L("outfits.delete.success.title"),
        description = _L("outfits.delete.success.description"),
        type = "success",
        position = Config.NotifyOptions.position
    })
end)

RegisterNetEvent("illenium-appearance:client:openJobOutfitsMenu", function(outfitsToShow)
    OpenMenu(nil, "job-outfit", outfitsToShow)
end)

local function InCooldown()
    return (GetGameTimer() - reloadSkinTimer) < Config.ReloadSkinCooldown
end

RegisterNetEvent("illenium-appearance:client:reloadSkin", function(bypassChecks)
    if not bypassChecks and InCooldown() or Framework.CheckPlayerMeta() or cache.vehicle or IsPedFalling(cache.ped) then
        lib.notify({
            title = _L("commands.reloadskin.failure.title"),
            description = _L("commands.reloadskin.failure.description"),
            type = "error",
            position = Config.NotifyOptions.position
        })
        return
    end

    reloadSkinTimer = GetGameTimer()
    BackupPlayerStats()

    LocalPlayer.state:set('canChangeClothes', true)

    lib.callback("illenium-appearance:server:getAppearance", false, function(appearance)
        if not appearance then
            return
        end
        client.setPlayerAppearance(appearance)
        if Config.PersistUniforms then
            LoadPlayerUniform(bypassChecks)
        end
        RestorePlayerStats()
    end)
end)

RegisterNetEvent("illenium-appearance:client:ClearStuckProps", function()
    if InCooldown() or Framework.CheckPlayerMeta() then
        lib.notify({
            title = _L("commands.clearstuckprops.failure.title"),
            description = _L("commands.clearstuckprops.failure.description"),
            type = "error",
            position = Config.NotifyOptions.position
        })
        return
    end

    reloadSkinTimer = GetGameTimer()

    for _, v in pairs(GetGamePool("CObject")) do
      if IsEntityAttachedToEntity(cache.ped, v) then
        SetEntityAsMissionEntity(v, true, true)
        DeleteObject(v)
        DeleteEntity(v)
      end
    end
end)
