
local NOTIFY_TYPES = {
    INFO = "^5[%s]^7-^6[INFO]^7 %s",
    SUCCESS = "^5[%s]^7-^2[SUCCESS]^7 %s",
    ERROR = "^5[%s]^7-^1[ERROR]^7 %s"
}

local function doesCrewAndGradesExist(name, grades)
    if not ESX.Crews[name] then
       return false
    end

   for _, grade in ipairs(grades) do
       if not ESX.DoesCrewExist(name, grade.grade) then
           return false
       end
   end

   return true
end

local function generateNewCrewTable(name, label, grades)
    local crew = { name = name, label = label, grades = {} }
    for _, v in pairs(grades) do
        crew.grades[tostring(v.grade)] = { crew_name = name, grade = v.grade, name = v.name, label = v.label, salary = v.salary, skin_male = v.skin_male or '{}', skin_female = v.skin_female or '{}' }
    end

    return crew
end

local function notify(notifyType,resourceName,message,...)
    local formattedMessage = string.format(message, ...)

    if not NOTIFY_TYPES[notifyType] then
        return print(NOTIFY_TYPES.INFO:format(resourceName,formattedMessage))
    end

    return print(NOTIFY_TYPES[notifyType]:format(resourceName,formattedMessage))
end

--- Create Crew at Runtime
--- @param name string
--- @param label string
--- @param grades table
function ESX.CreateCrew(name, label, grades)
    local currentResourceName = GetInvokingResource()
    local success = false

    if not name or name == '' then
        notify("ERROR",currentResourceName, 'Missing argument `name`')
        return success
    end

    if not label or label == '' then
        notify("ERROR",currentResourceName, 'Missing argument `label`')
        return success
    end

    if not grades or not next(grades) then
        notify("ERROR",currentResourceName, 'Missing argument `grades`')
        return success
    end

    local currentCrewExist = doesCrewAndGradesExist(name, grades)

    if currentCrewExist then
        notify("ERROR",currentResourceName, 'Crew or grades already exists: `%s`', name)
        return success
    end

    local queries = {
        { query = 'INSERT INTO crews (name, label) VALUES (?, ?)', values = { name, label } }
    }

    for _, grade in ipairs(grades) do
        queries[#queries + 1] = {
            query = 'INSERT INTO crew_grades (crew_name, grade, name, label, salary, skin_male, skin_female) VALUES (?, ?, ?, ?, ?, ?, ?)',
            values = { name, grade.grade, grade.name, grade.label, grade.salary, '{}', '{}' }
        }
    end

    success = exports.oxmysql:transaction_async(queries)

    if not success then
        notify("ERROR", currentResourceName, 'Failed to insert one or more grades for crew: `%s`', name)
        return success
    end

    ESX.Crews[name] = generateNewCrewTable(name, label, grades)

    notify("SUCCESS", currentResourceName, 'Crew created successfully: `%s`', name)

    return success
end
