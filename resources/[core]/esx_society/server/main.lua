local Jobs = setmetatable({}, {__index = function(_, key)
	return ESX.GetJobs()[key]
end
})
local RegisteredSocieties = {}
local SocietiesByName = {}

function GetSociety(name)
	return SocietiesByName[name]
end
exports("GetSociety", GetSociety)

function registerSociety(name, label, account, data)
	if SocietiesByName[name] then
		print(("[^3WARNING^7] society already registered, name: ^5%s^7"):format(name))
		return
	end

	local society = {
		name = name,
		label = label,
		account = account,
		data = data
	}

	SocietiesByName[name] = society
	table.insert(RegisteredSocieties, society)
end

registerSociety("burgershot", "BurgerShot", "society_burgershot", {})
AddEventHandler("esx_society:registerSociety", registerSociety)
exports("registerSociety", registerSociety)

AddEventHandler("esx_society:getSocieties", function(cb)
	cb(RegisteredSocieties)
end)

AddEventHandler("esx_society:getSociety", function(name, cb)
	cb(GetSociety(name))
end)

RegisterServerEvent("esx_society:checkSocietyBalance")
AddEventHandler("esx_society:checkSocietyBalance", function(society)
	local xPlayer = ESX.GetPlayerFromId(source)
	local society = GetSociety(society)

	if xPlayer.job.name ~= society.name then
		print(("esx_society: %s attempted to call checkSocietyBalance!"):format(xPlayer.identifier))
		return
	end

	TriggerEvent("esx_addonaccount:getSharedAccount", society.account, function(account)
		xPlayer.showNotification(string.format("🔍 La balance de la società est de ~g~$%s", ESX.Math.GroupDigits(account.money)))
	end)
end)

RegisterServerEvent("esx_society:withdrawMoney")
AddEventHandler("esx_society:withdrawMoney", function(societyName, amount)
	local source = source
	local society = GetSociety(societyName)
	if not society then
		print(("[^3WARNING^7] Player ^5%s^7 attempted to withdraw from non-existing society - ^5%s^7!"):format(source, societyName))
		return
	end
	local xPlayer = ESX.GetPlayerFromId(source)
	amount = ESX.Math.Round(tonumber(amount))
	if xPlayer.job.name ~= society.name then
		return print(("[^3WARNING^7] Player ^5%s^7 attempted to withdraw from society - ^5%s^7!"):format(source, society.name))
	end

	TriggerEvent("esx_addonaccount:getSharedAccount", society.account, function(account)
		if amount > 0 and account.money >= amount then
			account.removeMoney(amount)
			xPlayer.addMoney(amount, string.format("Retrait de la société"))
			xPlayer.showNotification(string.format("✅ Vous avez retiré $%s", ESX.Math.GroupDigits(amount)))
		else
			xPlayer.showNotification(string.format("❌ Le montant est invalide"))
		end
	end)
end)

RegisterServerEvent("esx_society:depositMoney")
AddEventHandler("esx_society:depositMoney", function(societyName, amount)
	local source = source
	local xPlayer = ESX.GetPlayerFromId(source)
	local society = GetSociety(societyName)
	if not society then
		print(("[^3WARNING^7] Player ^5%s^7 attempted to deposit to non-existing society - ^5%s^7!"):format(source, societyName))
		return
	end
	amount = ESX.Math.Round(tonumber(amount))

	if xPlayer.job.name ~= society.name then
		return print(("[^3WARNING^7] Player ^5%s^7 attempted to deposit to society - ^5%s^7!"):format(source, society.name))
	end
	if amount > 0 and xPlayer.getMoney() >= amount then
		TriggerEvent("esx_addonaccount:getSharedAccount", society.account, function(account)
			xPlayer.removeMoney(amount, string.format("Dépôt de la société"))
			xPlayer.showNotification(string.format("✅ Vous avez déposé ~r~$%s", ESX.Math.GroupDigits(amount)))
			account.addMoney(amount)
		end)
	else
		xPlayer.showNotification(string.format("❌ Le montant est invalide"))
	end
end)

RegisterServerEvent("esx_society:washMoney")
AddEventHandler("esx_society:washMoney", function(society, amount)
	local source = source
	local xPlayer = ESX.GetPlayerFromId(source)
	local account = xPlayer.getAccount("black_money")
	amount = ESX.Math.Round(tonumber(amount))

	if xPlayer.job.name ~= society then
		return print(("[^3WARNING^7] Player ^5%s^7 attempted to wash money in society - ^5%s^7!"):format(source, society))
	end
	if amount and amount > 0 and account.money >= amount then
		xPlayer.removeAccountMoney("black_money", amount, "Washing")

		MySQL.insert("INSERT INTO society_moneywash (identifier, society, amount) VALUES (?, ?, ?)", {xPlayer.identifier, society, amount},
		function(rowsChanged)
			xPlayer.showNotification(string.format("🔍 Vous avez $%s en attente de ~r~blanchiement (24h)", ESX.Math.GroupDigits(amount)))
		end)
	else
		xPlayer.showNotification(string.format("❌ Le montant est invalide"))
	end
end)



ESX.RegisterServerCallback("esx_society:getSocietyMoney", function(source, cb, societyName)
	local society = GetSociety(societyName)
	if not society then
		print(("[^3WARNING^7] Player ^5%s^7 attempted to get money from non-existing society - ^5%s^7!"):format(source, societyName))
		return cb(0)
	end
	TriggerEvent("esx_addonaccount:getSharedAccount", society.account, function(account)
		cb(account.money or 0)
	end)
end)

ESX.RegisterServerCallback("esx_society:getEmployees", function(source, cb, society)
	local employees = {}

	local xPlayers = ESX.GetExtendedPlayers("job", society)
	for i=1, #(xPlayers) do 
		local xPlayer = xPlayers[i]

		local name = xPlayer.name
		if Config.EnableESXIdentity and name == GetPlayerName(xPlayer.source) then
			name = xPlayer.get("firstName") .. " " .. xPlayer.get("lastName")
		end

		table.insert(employees, {
			name = name,
			identifier = xPlayer.identifier,
			job = {
				name = society,
				label = xPlayer.job.label,
				grade = xPlayer.job.grade,
				grade_name = xPlayer.job.grade_name,
				grade_label = xPlayer.job.grade_label
			}
		})
	end
		
	local query = "SELECT identifier, job_grade FROM `users` WHERE `job`= ? ORDER BY job_grade DESC"

	if Config.EnableESXIdentity then
		query = "SELECT identifier, job_grade, firstname, lastname FROM `users` WHERE `job`= ? ORDER BY job_grade DESC"
	end

	MySQL.query(query, {society},
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
					job = {
						name = society,
						label = Jobs[society].label,
						grade = row.job_grade,
						grade_name = Jobs[society].grades[tostring(row.job_grade)].name,
						grade_label = Jobs[society].grades[tostring(row.job_grade)].label
					}
				})
			end
		end

		cb(employees)
	end)

end)

ESX.RegisterServerCallback("esx_society:getJob", function(source, cb, society)
	if not Jobs[society] then
		return cb(false)
	end

	local job = json.decode(json.encode(Jobs[society]))
	local grades = {}

	for k,v in pairs(job.grades) do
		table.insert(grades, v)
	end

	table.sort(grades, function(a, b)
		return a.grade < b.grade
	end)

	job.grades = grades

	cb(job)
end)

ESX.RegisterServerCallback("esx_society:setJob", function(source, cb, identifier, job, grade, actionType)
	local xPlayer = ESX.GetPlayerFromId(source)
	local isBoss = Config.BossGrades[xPlayer.job.grade_name]
	local xTarget = ESX.GetPlayerFromIdentifier(identifier)

	if not isBoss then
		print(("[^3WARNING^7] Player ^5%s^7 attempted to setJob for Player ^5%s^7!"):format(source, xTarget.source))
		return cb()
	end

	if not xTarget then
		MySQL.update("UPDATE users SET job = ?, job_grade = ? WHERE identifier = ?", {job, grade, identifier},
		function()
			cb()
		end)
		return
	end

	xTarget.setJob(job, grade)

	if actionType == "hire" then
		xTarget.showNotification(string.format("✅ Vous avez été recruté dans la société %s", job))
		xPlayer.showNotification(string.format("✅ Vous avez recruté %s", xTarget.getName()))
	elseif actionType == "promote" then
		xTarget.showNotification(string.format("✅ Vous avez été promu"))
		xPlayer.showNotification(string.format("✅ Vous avez promu %s en tant que %s", xTarget.getName(), xTarget.getJob().label))
	elseif actionType == "fire" then
		xTarget.showNotification(string.format("❌ Vous avez été viré de la société %s", xTarget.getJob().label))
		xPlayer.showNotification(string.format("✅ Vous avez viré %s", xTarget.getName()))
	end

	cb()
end)


ESX.RegisterServerCallback("esx_society:setJobSalary", function(source, cb, job, grade, salary)
    local xPlayer = ESX.GetPlayerFromId(source)

    -- Vérifier si le joueur a la permission de changer le salaire pour ce job
    if xPlayer.job.name == job and Config.BossGrades[xPlayer.job.grade_name] then
        -- Récupérer la valeur max_salary depuis la table job_grades
        MySQL.Async.fetchScalar("SELECT max_salary FROM job_grades WHERE job_name = ? AND grade = ?", {job, grade}, function(maxSalary)
            -- Si maxSalary est récupéré avec succès
            if maxSalary then
                -- Comparer le salaire à la valeur récupérée de la base de données
                if salary <= tonumber(maxSalary) then
                    -- Mettre à jour le salaire dans la base de données
                    MySQL.update("UPDATE job_grades SET salary = ? WHERE job_name = ? AND grade = ?", {salary, job, grade},
                    function(rowsChanged)
                        if rowsChanged > 0 then
                            -- Mise à jour réussie
                            Jobs[job].grades[tostring(grade)].salary = salary
                            ESX.RefreshJobs()
                            Wait(1)
                            local xPlayers = ESX.GetExtendedPlayers("job", job)
                            for _, xTarget in pairs(xPlayers) do
                                if xTarget.job.grade == grade then
                                    xTarget.setJob(job, grade)
                                end
                            end
                            print(("[^2INFO^7] Salaire du grade %s mis à jour avec succès pour le job %s"):format(grade, job))
                            cb(true)  -- On renvoie true à l"appelant pour signaler le succès
                        else
                            print(("[^1ERROR^7] La mise à jour du salaire a échoué pour le grade %s du job %s"):format(grade, job))
                            cb(false)  -- On renvoie false si la mise à jour échoue
                        end
                    end)
                else
                    xPlayer.showNotification(string.format("❌ Le salaire est trop haut il doit faire moins de ~r~ %s $~s~", maxSalary))
                    cb(false)  -- On renvoie false si le salaire dépasse la limite
                end
            else
                print(("[^1ERROR^7] Impossible de récupérer la valeur max_salary pour le grade %s du job %s"):format(grade, job))
                cb(false)  -- Renvoie false si max_salary n"a pas été trouvé
            end
        end)
    else
        print(("[^3WARNING^7] Player ^5%s^7 n\"a pas la permission de modifier le salaire pour %s"):format(source, job))
        cb(false)  -- On renvoie false si le joueur n"a pas la permission
    end
end)



ESX.RegisterServerCallback("esx_society:setJobLabel", function(source, cb, job, grade, label)
	local xPlayer = ESX.GetPlayerFromId(source)

	if xPlayer.job.name == job and Config.BossGrades[xPlayer.job.grade_name] then
			MySQL.update("UPDATE job_grades SET label = ? WHERE job_name = ? AND grade = ?", {label, job, grade},
			function(rowsChanged)
				Jobs[job].grades[tostring(grade)].label = label
				ESX.RefreshJobs()
				Wait(1)
				local xPlayers = ESX.GetExtendedPlayers("job", job)
				for _, xTarget in pairs(xPlayers) do

					if xTarget.job.grade == grade then
						xTarget.setJob(job, grade)
					end
				end
				cb()
			end)
	else
		print(("[^3WARNING^7] Player ^5%s^7 attempted to setJobLabel for ^5%s^7!"):format(source, job))
		cb()
	end
end)

local getOnlinePlayers, onlinePlayers = false, nil
ESX.RegisterServerCallback("esx_society:getOnlinePlayers", function(source, cb)
	if getOnlinePlayers == false and onlinePlayers == nil then -- Prevent multiple xPlayer loops from running in quick succession
		getOnlinePlayers, onlinePlayers = true, {}
		
		local xPlayers = ESX.GetExtendedPlayers() -- Returns all xPlayers
		for _, xPlayer in pairs(xPlayers) do
			table.insert(onlinePlayers, {
				source = xPlayer.source,
				identifier = xPlayer.identifier,
				name = xPlayer.name,
				job = xPlayer.job
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

ESX.RegisterServerCallback("esx_society:isBoss", function(source, cb, job)
	cb(isPlayerBoss(source, job))
end)

function isPlayerBoss(playerId, job)
	local xPlayer = ESX.GetPlayerFromId(playerId)

	if xPlayer.job.name == job and Config.BossGrades[xPlayer.job.grade_name] then
		return true
	else
		print(("esx_society: %s attempted open a society boss menu!"):format(xPlayer.identifier))
		return false
	end
end

function WashMoneyCRON(d, h, m)
	MySQL.query("SELECT * FROM society_moneywash", function(result)
		for i=1, #result, 1 do
			local society = GetSociety(result[i].society)
			local xPlayer = ESX.GetPlayerFromIdentifier(result[i].identifier)

			-- add society money
			TriggerEvent("esx_addonaccount:getSharedAccount", society.account, function(account)
				account.addMoney(result[i].amount)
			end)

			-- send notification if player is online
			if xPlayer then
				xPlayer.showNotification(string.format("✅ Vous avez ~r~blanchi votre argent : $%s", ESX.Math.GroupDigits(result[i].amount)))
			end

		end
		MySQL.update("DELETE FROM society_moneywash")
	end)
end

TriggerEvent("cron:runAt", 3, 0, WashMoneyCRON)
