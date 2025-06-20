@echo off
for %%f in (*_.png) do (
    set "filename=%%f"
    setlocal enabledelayedexpansion
    set "newname=!filename:_=!"
    ren "%%f" "!newname!"
    endlocal
)
echo Renommage terminé !
pause
