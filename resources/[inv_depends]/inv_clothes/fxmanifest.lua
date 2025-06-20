fx_version 'cerulean'
game 'gta5'

version '1.0.0'

shared_script {
    'config.lua',
    '@ox_lib/init.lua',
}

client_script 'client.lua'
server_script{
    'server.lua',
}

escrow_ignore {
    'config.lua',
}

lua54 'yes'