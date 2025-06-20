fx_version 'adamant'
game 'gta5'
lua54 'yes'
use_fxv2_oal 'yes'

shared_scripts {
    '@ox_lib/init.lua',
    '@es_extended/imports.lua',
}

client_scripts {
    'client.lua'
}

server_scripts {
    "@oxmysql/lib/MySQL.lua",
}

dependency "ox_lib"
override 'esx_menu_dialog'