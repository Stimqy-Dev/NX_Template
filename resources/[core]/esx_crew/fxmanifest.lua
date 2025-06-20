fx_version 'adamant'

game 'gta5'

description 'Provides a way for Jobs to have a society system. (boss menu, salaries, funding etc)'
lua54 'yes'
version '1.0'

shared_script '@es_extended/imports.lua'

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'config.lua',
    'server/main.lua'
}



dependencies {
    'es_extended',
    'cron',
    'esx_addonaccount'
}
