local PedCreate, startPedScreen, clonedPed = {}, false, nil

local playerPed = cache.ped
lib.onCache('ped', function(ped)
	playerPed = ped
end)

local function createPed(model, locationx, locationy, locationz)
    lib.requestModel(model, 1)
    return CreatePed(26, model, locationx, locationy, locationz, 0, false, false)
end

local function PedScreenDelete()
    for k,v in pairs(PedCreate) do 
        DeleteEntity(v)
    end

    clonedPed = nil 
    PedCreate = {} 
    startPedScreen = false 
end

local function RenderCam()
    local totalTime = 1000 
    local elapsed = 0
    local startingPitch = GetGameplayCamRelativePitch() 
    local targetPitch = 0.0
    local rate = 1.0
    local pitchThreshold = 30.00  
    
    if math.abs(startingPitch + 7.0) < pitchThreshold then
        return
    end

    if LocalPlayer.state.invOpen then 
        if math.abs(startingPitch - targetPitch) > 0.01 then
            CreateThread(function()
                while elapsed < totalTime and startPedScreen do
                    Wait(3)
                    elapsed = elapsed + 10 
                    local progress = elapsed / totalTime
                    local currentPitch = (1.0 - progress) * startingPitch + progress * targetPitch
                    SetGameplayCamRelativePitch(currentPitch, rate)
                end
            end)
        end
    end
end

local function PedScreenCreate(animation, control, type, data)
    if not control then 
        local vehicle = GetVehiclePedIsIn(playerPed, false)
        if GetEntitySpeed(vehicle) * 3.5 > 80 then
            return
        end
    end

    SetGameplayCamRelativePitch(1.0, 1.0)
    PedScreenDelete()
    RenderCam()

    clonedPed = createPed(GetEntityModel(playerPed), nil, nil, nil)

    SetEntityCollision(clonedPed, false, true)
    SetEntityInvincible(clonedPed, true)
    NetworkSetEntityInvisibleToNetwork(clonedPed, false)
    ClonePedToTarget(playerPed, clonedPed)
    SetEntityCanBeDamaged(clonedPed, false)
    SetBlockingOfNonTemporaryEvents(clonedPed, true)
    SetPedAsNoLongerNeeded(clonedPed)
    SetForcePedFootstepsTracks(false)

    if animation.dict and animation.anim then
        lib.requestAnimDict(animation.dict)
        TaskPlayAnim(clonedPed, animation.dict, animation.anim, 8.0, 1.0, -1, 1, 0, false, false, false)
    end

    table.insert(PedCreate, clonedPed)

    startPedScreen = true 
    CreateThread(function()
        local positionBuffer = {}
        local bufferSize
        local scaleWidth
        local upTempOffset
        while startPedScreen do 
            local world, normal, depth
            if type == "animation" then 
                depth = data.depth
                bufferSize = data.bufferSize
                scaleWidth = data.scaleWidth
                upTempOffset = data.upTempOffset
                world, normal = GetWorldCoordFromScreenCoord(0.70035417461395, 0.2587036895752)
            else
                local vehicle = GetVehiclePedIsIn(playerPed, false)
                if GetEntitySpeed(vehicle) * 3.5 > 1 then
                    scaleWidth = 0.50 -- largeur
                    upTempOffset = -0.50 -- taille
                else
                    upTempOffset = -0.50 -- taille
                    scaleWidth = 0.50 -- largeur
                end
                depth = 1.5
                bufferSize = 2
                world, normal = GetWorldCoordFromScreenCoord(0.50300000000000, 0.4500000000000)
            end

            local target = world + normal * depth
            local camRot = GetGameplayCamRot(2)
    
            table.insert(positionBuffer, target)
            if #positionBuffer > bufferSize then
                table.remove(positionBuffer, 1)
            end
        
            local averagedTarget = vector3(0, 0, 0)
            for _, position in ipairs(positionBuffer) do
                averagedTarget = averagedTarget + position
            end
            averagedTarget = averagedTarget / #positionBuffer
            DisableIdleCamera(true)
            SetEntityCollision(clonedPed, false, false)
            SetEntityCoords(clonedPed, averagedTarget.x, averagedTarget.y, averagedTarget.z, false, false, false, true)
            SetEntityHeading(clonedPed, camRot.z + 180.0)
            SetEntityRotation(clonedPed, 0, 0, camRot.z + 180.0, false, false)

            if control then 
                DisableAllControlActions(0)
            end

            local forward, right, up, _ = GetEntityMatrix(clonedPed)
            right = right * scaleWidth 

            SetEntityMatrix(clonedPed, forward, right, up + vector3(0, 0, upTempOffset), averagedTarget)
            Wait(3)
        end
    end)
end

local function ResetPedScreen()
    CreateThread(function()
        PedScreenCreate({
            dict = "anim@amb@nightclub@peds@", 
            anim = "rcmme_amanda1_stand_loop_cop"
        })
    end)
end

AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then 
        for _,v in pairs(PedCreate) do 
            DeleteEntity(v)
        end
    end
end)

exports('ResetPedScreen', ResetPedScreen)
exports('PedScreenDelete', PedScreenDelete)
exports('PedScreenCreate', PedScreenCreate)