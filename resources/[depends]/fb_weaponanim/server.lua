RegisterCommand(config.openCommand, function(source, args, rawCommand)
    TriggerClientEvent('NXDEV:MenuArme', source)
end, false)
