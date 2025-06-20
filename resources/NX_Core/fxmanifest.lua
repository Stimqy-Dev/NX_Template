fx_version 'adamant'
game 'gta5'
lua54 'yes'


shared_scripts { s
    '@ox_lib/init.lua',
    '@es_extended/imports.lua',
    'src/conf.lua',
    'src/modules/**/conf/*.lua',
}

lua54 "yes"
ui_page 'ui/index.html'

files {
    'ui/index.html',
    'stream/Poppins-Black.gfx',
    'stream/Poppins-Bold.gfx',
    'stream/Poppins-Medium.gfx'
}

client_scripts {
    "RageUI/RMenu.lua",
    "RageUI/menu/RageUI.lua",
    "RageUI/menu/Menu.lua",
    "RageUI/menu/MenuController.lua",
    "RageUI/components/*.lua",
    "RageUI/menu/elements/*.lua",
    "RageUI/menu/items/*.lua",
    "RageUI/menu/panels/*.lua",
    "RageUI/menu/panels/*.lua",
    "RageUI/menu/windows/*.lua",
    "RageUI/config.lua",
}

client_scripts {
    'src/init.lua',
    'src/*.lua',
    'src/modules/**/client/*.lua',
    'src/modules/**/client/**/*.lua',
    'src/functions/client/*.lua',
}

server_scripts {
    'src/init.lua',
    "@oxmysql/lib/MySQL.lua",
    'src/modules/**/server/*.lua',
    'src/modules/**/server/**/*.lua',
    'src/functions/server/*.lua',
}
