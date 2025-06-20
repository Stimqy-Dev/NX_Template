local Crews = setmetatable({}, {__index = function(_, key)
	return ESX.GetCrews()[key]
end
})
local RegisteredCrews = {}
local CrewsByName = {}

function GetCrew(name)
	return CrewsByName[name]
end
exports("GetCrew", GetCrew)

function registerCrew(name, label, account, data)
	if CrewsByName[name] then
		print(("[^3WARNING^7] crew already registered, name: ^5%s^7"):format(name))
		return
	end

	local crew = {
		name = name,
		label = label,
		account = account,
		data = data
	}

	CrewsByName[name] = crew
	table.insert(RegisteredCrews, crew)
end
AddEventHandler("esx_crew:registerCrew", registerCrew)
exports("registerCrew", registerCrew)

AddEventHandler("esx_crew:getCrews", function(cb)
	cb(RegisteredCrews)
end)

AddEventHandler("esx_crew:getCrew", function(name, cb)
	cb(GetCrew(name))
end)

RegisterServerEvent("esx_crew:checkCrewBalance")
AddEventHandler("esx_crew:checkCrewBalance", function(crew)
	local xPlayer = ESX.GetPlayerFromId(source)
	local crew = GetCrew(crew)

	if xPlayer.crew.name ~= crew.name then
		print(("esx_crew: %s attempted to call checkCrewBalance!"):format(xPlayer.identifier))
		return
	end

	TriggerEvent("esx_addonaccount:getSharedAccount", crew.account, function(account)
		xPlayer.showNotification(string.format("🔍 La balance du crew est de ~g~$%s", ESX.Math.GroupDigits(account.money)))
	end)
end)

RegisterServerEvent("esx_crew:withdrawMoney")
AddEventHandler("esx_crew:withdrawMoney", function(crewName, amount)
	local source = source
	local crew = GetCrew(crewName)
	if not crew then
		print(("[^3WARNING^7] Player ^5%s^7 attempted to withdraw from non-existing crew - ^5%s^7!"):format(source, crewName))
		return
	end
	local xPlayer = ESX.GetPlayerFromId(source)
	amount = ESX.Math.Round(tonumber(amount))
	if xPlayer.crew.name ~= crew.name then
		return print(("[^3WARNING^7] Player ^5%s^7 attempted to withdraw from crew - ^5%s^7!"):format(source, crew.name))
	end

	TriggerEvent("esx_addonaccount:getSharedAccount", crew.account, function(account)
		if amount > 0 and account.money >= amount then
			account.removeMoney(amount)
			xPlayer.addMoney(amount, string.format("Retrait du crew"))
			xPlayer.showNotification(string.format("✅ Vous avez retiré $%s", ESX.Math.GroupDigits(amount)))
		else
			xPlayer.showNotification(string.format("❌ Le montant est invalide"))
		end
	end)
end)

RegisterServerEvent("esx_crew:depositMoney")
AddEventHandler("esx_crew:depositMoney", function(crewName, amount)
	local source = source
	local xPlayer = ESX.GetPlayerFromId(source)
	local crew = GetCrew(crewName)
	if not crew then
		print(("[^3WARNING^7] Player ^5%s^7 attempted to deposit to non-existing crew - ^5%s^7!"):format(source, crewName))
		return
	end
	amount = ESX.Math.Round(tonumber(amount))

	if xPlayer.crew.name ~= crew.name then
		return print(("[^3WARNING^7] Player ^5%s^7 attempted to deposit to crew - ^5%s^7!"):format(source, crew.name))
	end
	if amount > 0 and xPlayer.getMoney() >= amount then
		TriggerEvent("esx_addonaccount:getSharedAccount", crew.account, function(account)
			xPlayer.removeMoney(amount, string.format("Dépôt du crew"))
			xPlayer.showNotification(string.format("✅ Vous avez déposé ~r~$%s", ESX.Math.GroupDigits(amount)))
			account.addMoney(amount)
		end)
	else
		xPlayer.showNotification(string.format("❌ Le montant est invalide"))
	end
end)

ESX.RegisterServerCallback("esx_crew:getCrewMoney", function(source, cb, crewName)
	local crew = GetCrew(crewName)
	if not crew then
		print(("[^3WARNING^7] Player ^5%s^7 attempted to get money from non-existing crew - ^5%s^7!"):format(source, crewName))
		return cb(0)
	end
	TriggerEvent("esx_addonaccount:getSharedAccount", crew.account, function(account)
		cb(account.money or 0)
	end)
end)

ESX.RegisterServerCallback("esx_crew:getEmployees", function(source, cb, crew)
	local employees = {}

	local xPlayers = ESX.GetExtendedPlayers("crew", crew)
	for i=1, #(xPlayers) do 
		local xPlayer = xPlayers[i]

		local name = xPlayer.name
		if Config.EnableESXIdentity and name == GetPlayerName(xPlayer.source) then
			name = xPlayer.get("firstName") .. " " .. xPlayer.get("lastName")
		end

		table.insert(employees, {
			name = name,
			identifier = xPlayer.identifier,
			crew = {
				name = crew,
				label = xPlayer.crew.label,
				grade = xPlayer.crew.grade,
				grade_name = xPlayer.crew.grade_name,
				grade_label = xPlayer.crew.grade_label
			}
		})
	end
		
	local query = "SELECT identifier, crew_grade FROM `users` WHERE `crew`= ? ORDER BY crew_grade DESC"

	if Config.EnableESXIdentity then
		query = "SELECT identifier, crew_grade, firstname, lastname FROM `users` WHERE `crew`= ? ORDER BY crew_grade DESC"
	end

	MySQL.query(query, {crew},
	function(result)
		for k, row in pairs(result) do
			local alreadyInTable
			local identifier = row.identifier

			for k, v in pairs(employees) do
				if v.identifier == identifier then
					alreadyInTable = true
				end
			end

			if not alreadyInTable then
				local name = string.format("name_not_found")

				if Config.EnableESXIdentity then
					name = row.firstname .. " " .. row.lastname 
				end
				
				table.insert(employees, {
					name = name,
					identifier = identifier,
					crew = {
						name = crew,
						label = Crews[crew].label,
						grade = row.crew_grade,
						grade_name = Crews[crew].grades[tostring(row.crew_grade)].name,
						grade_label = Crews[crew].grades[tostring(row.crew_grade)].label
					}
				})
			end
		end

		cb(employees)
	end)

end)

ESX.RegisterServerCallback("esx_crew:getCrew", function(source, cb, crew)
	if not Crews[crew] then
		return cb(false)
	end

	local crew = json.decode(json.encode(Crews[crew]))
	local grades = {}

	for k,v in pairs(crew.grades) do
		table.insert(grades, v)
	end

	table.sort(grades, function(a, b)
		return a.grade < b.grade
	end)

	crew.grades = grades

	cb(crew)
end)

ESX.RegisterServerCallback("esx_crew:setCrew", function(source, cb, identifier, crew, grade, actionType)
	local xPlayer = ESX.GetPlayerFromId(source)
	local isBoss = Config.BossGrades[xPlayer.crew.grade_name]
	local xTarget = ESX.GetPlayerFromIdentifier(identifier)

	if not isBoss then
		print(("[^3WARNING^7] Player ^5%s^7 attempted to setCrew for Player ^5%s^7!"):format(source, xTarget.source))
		return cb()
	end

	if not xTarget then
		MySQL.update("UPDATE users SET crew = ?, crew_grade = ? WHERE identifier = ?", {crew, grade, identifier},
		function()
			cb()
		end)
		return
	end

	xTarget.setCrew(crew, grade)

	if actionType == "hire" then
		xTarget.showNotification(string.format("✅ Vous avez été recruté dans le crew %s", crew))
		xPlayer.showNotification(string.format("✅ Vous avez recruté %s", xTarget.getName()))
	elseif actionType == "promote" then
		xTarget.showNotification(string.format("✅ Vous avez été promu"))
		xPlayer.showNotification(string.format("✅ Vous avez promu %s en tant que %s", xTarget.getName(), xTarget.getCrew().label))
	elseif actionType == "fire" then
		xTarget.showNotification(string.format("❌ Vous avez été viré du crew %s", xTarget.getCrew().label))
		xPlayer.showNotification(string.format("✅ Vous avez viré %s", xTarget.getName()))
	end

	cb()
end)

ESX.RegisterServerCallback("esx_crew:setCrewSalary", function(source, cb, crew, grade, salary)
    local xPlayer = ESX.GetPlayerFromId(source)

    -- Vérifier si le joueur a la permission de changer le salaire pour ce crew
    if xPlayer.crew.name == crew and Config.BossGrades[xPlayer.crew.grade_name] then
        -- Récupérer la valeur max_salary depuis la table crew_grades
        MySQL.Async.fetchScalar("SELECT max_salary FROM crew_grades WHERE crew_name = ? AND grade = ?", {crew, grade}, function(maxSalary)
            -- Si maxSalary est récupéré avec succès
            if maxSalary then
                -- Comparer le salaire à la valeur récupérée de la base de données
                if salary <= tonumber(maxSalary) then
                    -- Mettre à jour le salaire dans la base de données
                    MySQL.update("UPDATE crew_grades SET salary = ? WHERE crew_name = ? AND grade = ?", {salary, crew, grade},
                    function(rowsChanged)
                        if rowsChanged > 0 then
                            -- Mise à jour réussie
                            Crews[crew].grades[tostring(grade)].salary = salary
                            ESX.RefreshCrews()
                            Wait(1)
                            local xPlayers = ESX.GetExtendedPlayers("crew", crew)
                            for _, xTarget in pairs(xPlayers) do
                                if xTarget.crew.grade == grade then
                                    xTarget.setCrew(crew, grade)
                                end
                            end
                            print(("[^2INFO^7] Salaire du grade %s mis à jour avec succès pour le crew %s"):format(grade, crew))
                            cb(true)  -- On renvoie true à l"appelant pour signaler le succès
                        else
                            print(("[^1ERROR^7] La mise à jour du salaire a échoué pour le grade %s du crew %s"):format(grade, crew))
                            cb(false)  -- On renvoie false si la mise à jour échoue
                        end
                    end)
                else
                    xPlayer.showNotification(string.format("❌ Le salaire est trop haut il doit faire moins de ~r~ %s $~s~", maxSalary))
                    cb(false)  -- On renvoie false si le salaire dépasse la limite
                end
            else
                print(("[^1ERROR^7] Impossible de récupérer la valeur max_salary pour le grade %s du crew %s"):format(grade, crew))
                cb(false)  -- Renvoie false si max_salary n"a pas été trouvé
            end
        end)
    else
        print(("[^3WARNING^7] Player ^5%s^7 n\"a pas la permission de modifier le salaire pour %s"):format(source, crew))
        cb(false)  -- On renvoie false si le joueur n"a pas la permission
    end
end)

ESX.RegisterServerCallback("esx_crew:setCrewLabel", function(source, cb, crew, grade, label)
	local xPlayer = ESX.GetPlayerFromId(source)

	if xPlayer.crew.name == crew and Config.BossGrades[xPlayer.crew.grade_name] then
			MySQL.update("UPDATE crew_grades SET label = ? WHERE crew_name = ? AND grade = ?", {label, crew, grade},
			function(rowsChanged)
				Crews[crew].grades[tostring(grade)].label = label
				ESX.RefreshCrews()
				Wait(1)
				local xPlayers = ESX.GetExtendedPlayers("crew", crew)
				for _, xTarget in pairs(xPlayers) do

					if xTarget.crew.grade == grade then
						xTarget.setCrew(crew, grade)
					end
				end
				cb()
			end)
	else
		print(("[^3WARNING^7] Player ^5%s^7 attempted to setCrewLabel for ^5%s^7!"):format(source, crew))
		cb()
	end
end)

local getOnlinePlayers, onlinePlayers = false, nil
ESX.RegisterServerCallback("esx_crew:getOnlinePlayers", function(source, cb)
	if getOnlinePlayers == false and onlinePlayers == nil then -- Prevent multiple xPlayer loops from running in quick succession
		getOnlinePlayers, onlinePlayers = true, {}
		
		local xPlayers = ESX.GetExtendedPlayers() -- Returns all xPlayers
		for _, xPlayer in pairs(xPlayers) do
			table.insert(onlinePlayers, {
				source = xPlayer.source,
				identifier = xPlayer.identifier,
				name = xPlayer.name,
				crew = xPlayer.crew
			})
		end 
		cb(onlinePlayers)
		getOnlinePlayers = false
		Wait(1000) -- For the next second any extra requests will receive the cached list
		onlinePlayers = nil
		return
	end
	while getOnlinePlayers do Wait(0) end -- Wait for the xPlayer loop to finish
	cb(onlinePlayers)
end)

ESX.RegisterServerCallback("esx_crew:isBoss", function(source, cb, crew)
	cb(isPlayerBoss(source, crew))
end)

function isPlayerBoss(playerId, crew)
	local xPlayer = ESX.GetPlayerFromId(playerId)

	if xPlayer.crew.name == crew and Config.BossGrades[xPlayer.crew.grade_name] then
		return true
	else
		print(("esx_crew: %s attempted open a crew boss menu!"):format(xPlayer.identifier))
		return false
	end
end
