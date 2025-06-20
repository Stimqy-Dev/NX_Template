local createdMarkers = {}
local function HasRequiredJob(requiredJobs)
    if not ESX or not ESX.PlayerData then
        return false
    end

    local playerJob = ESX.PlayerData.job.name
    local playerGrade = ESX.PlayerData.job.grade

    for _, reqJob in ipairs(requiredJobs) do
        if type(reqJob) == 'table' then
            if playerJob == reqJob.name and playerGrade >= reqJob.grade then
                return true
            end
        else
            if playerJob == reqJob then
                return true
            end
        end
    end
    return false
end

-- Fonction pour créer un marqueur
--- @param position table {x, y, z} - Les coordonnées du marqueur
--- @param requiredJobs table - Une table de jobs/grades requis (ex: {'police', {name = 'medic', grade = 1}}). Peut être vide pour tous.
--- @param interactionText string - Le texte à afficher dans la notification d'aide ESX
--- @param interactionKey number - Le code de la touche pour l'interaction (par défaut 38 pour 'E')
--- @param markerType number - Le type de marqueur (par exemple, 1 pour un cylindre vertical)
--- @param markerSize number - La taille du marqueur
--- @param markerColor table {r, g, b, a} - La couleur du marqueur
--- @param callback function - La fonction à exécuter lors de l'interaction
function Core.DrawMarker(position, requiredJobs, interactionText, interactionKey, markerType, markerSize, markerColor, callback)
    local markerId = #createdMarkers + 1
    local markerData = {
        id = markerId,
        position = position,
        requiredJobs = requiredJobs or {},
        interactionText = interactionText or 'Appuyez sur ~INPUT_CONTEXT~ pour interagir.',
        interactionKey = interactionKey or 38, -- Default to 'E' key
        markerType = markerType or 1, -- Default marker type (vertical cylinder)
        markerSize = markerSize or 1.0, -- Default size
        markerColor = markerColor or {r = 255, g = 255, b = 255, a = 100}, -- Default color (transparent white)
        isNear = false,
        callback = callback
    }

    local wait = 500 
    createdMarkers[markerId] = markerData
    Citizen.CreateThread(function()
        while createdMarkers[markerId] do
            local playerCoords = GetEntityCoords(PlayerPedId())
            local dist = #(playerCoords - position)
            local canInteract = true
            if #markerData.requiredJobs > 0 then
                canInteract = HasRequiredJob(markerData.requiredJobs)
            end
            wait = 500
            if dist < markerData.markerSize + 0.5 then
                wait = 0
                if not markerData.isNear then
                    markerData.isNear = true
                    if canInteract then
                        ESX.ShowHelpNotification(markerData.interactionText)
                    end
                end

                if canInteract and IsControlJustReleased(0, markerData.interactionKey) then
                    if markerData.callback and type(markerData.callback) == 'function' then
                        markerData.callback(markerId, markerData)
                    end
                end
            else
                if markerData.isNear then
                    markerData.isNear = false
                end
            end
            DrawMarker(
                markerData.markerType,
                markerData.position.x, markerData.position.y, markerData.position.z,
                0.0, 0.0, 0.0, -- Rotation
                0.0, 0.0, 0.0, -- Direction
                markerData.markerSize, markerData.markerSize, markerData.markerSize, -- Scale (width, depth, height)
                markerData.markerColor.r, markerData.markerColor.g, markerData.markerColor.b, markerData.markerColor.a, -- Color
                false, -- bobUpAndDown
                true, -- faceCamera
                2, -- p19 (unknown, usually 2)
                false, -- rotate
                nil, nil, -- textureDict, textureName
                false -- drawOnEnts
            )


            Citizen.Wait(wait)
        end
    end)


    return markerId
end
function RemoveDynamicMarker(markerId)
    if createdMarkers[markerId] then
        createdMarkers[markerId] = nil
        print('Marqueur ID: ' .. markerId .. ' supprimé.')
    end
end

-- Exemple d'utilisation:
-- Créer un marqueur pour les policiers (job 'police' ou 'sheriff' avec grade 1 minimum)
-- CreateDynamicMarker(
--     {x = 100.0, y = 200.0, z = 30.0},
--     {{name = 'police', grade = 0}, {name = 'sheriff', grade = 1}},
--     'Appuyez sur ~INPUT_CONTEXT~ pour accéder au vestiaire de la police.',
--     38, -- Touche 'E'
--     1, -- Type de marqueur (cylindre)
--     1.5, -- Taille
--     {r = 0, g = 0, b = 255, a = 150}, -- Couleur bleue
--     function(markerId, markerData)
--         print('Interaction avec le marqueur police!')
--         -- Votre code à exécuter ici (ex: ouvrir un menu, donner un item)
--     end
-- )

-- Créer un marqueur pour tous les joueurs
-- CreateDynamicMarker(
--     {x = 150.0, y = 250.0, z = 35.0},
--     {},
--     'Appuyez sur ~INPUT_CONTEXT~ pour acheter des articles.',
--     38, -- Touche 'E'
--     2, -- Type de marqueur (chevron)
--     2.0, -- Taille
--     {r = 255, g = 0, b = 0, a = 120}, -- Couleur rouge
--     function(markerId, markerData)
--         print('Interaction avec le marqueur du magasin!')
--         -- Votre code à exécuter ici
--     end
-- )