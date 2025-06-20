Config = {}

-- for ox inventory, this will automatically be adjusted, do not change! for other inventories, change to "resource_name"
Config.CustomInventory = false

Config.Accounts = {
    bank = {
        label = TranslateCap("account_bank"),
        round = true,
    },
    black_money = {
        label = TranslateCap("account_black_money"),
        round = true,
    },
    money = {
        label = TranslateCap("account_money"),
        round = true,
    },
}

Config.StartingAccountMoney = { bank = 50000 }

Config.StartingInventoryItems = false -- table/false

Config.DefaultSpawns = { -- If you want to have more spawn positions and select them randomly uncomment commented code or add more locations
    { x = 222.2027, y = -864.0162, z = 30.2922, heading = 1.0 },
}

Config.AdminGroups = {
    ["fondateur"] = true,
    ["developper"] = true,
    ["responsable"] = true,
    ["superadmin"] = true,
    ["admin"] = true,
    ["modo"] = true,
    ["helper"] = true,
}


Config.EnablePaycheck = true -- enable paycheck
Config.LogPaycheck = false -- Logs paychecks to a nominated Discord channel via webhook (default is false)
Config.EnableSocietyPayouts = false -- pay from the society account that the player is employed at? Requirement: esx_society
Config.MaxWeight = 24 -- the max inventory weight without a backpack
Config.PaycheckInterval = 60 * 60000 -- how often to receive paychecks in milliseconds
Config.SaveDeathStatus = true -- Save the death status of a player
Config.EnableDebug = false -- Use Debug options?

Config.DefaultJobDuty = true -- A players default duty status when changing jobs

Config.DefaultCrewDuty = true -- A players default duty status when changing jobs

Config.OffDutyPaycheckMultiplier = 0.5 -- The multiplier for off duty paychecks. 0.5 = 50% of the on duty paycheck

Config.Multichar = GetResourceState("esx_multicharacter") ~= "missing"
Config.Identity = true -- Select a character identity data before they have loaded in (this happens by default with multichar)
Config.DistanceGive = 4.0 -- Max distance when giving items, weapons etc.

Config.AdminLogging = false -- Logs the usage of certain commands by those with group.admin ace permissions (default is false)

-------------------------------------
-- DO NOT CHANGE BELOW THIS LINE !!!
-------------------------------------
if GetResourceState("ox_inventory") ~= "missing" then
    Config.CustomInventory = "ox"
end

Config.EnableDefaultInventory = Config.CustomInventory == false -- Display the default Inventory ( F2 )

local txAdminLocale = GetConvar("txAdmin-locale", "en")
local esxLocale = GetConvar("esx:locale", "invalid")

Config.Locale = (esxLocale ~= "invalid") and esxLocale or (txAdminLocale ~= "custom" and txAdminLocale) or "en"
