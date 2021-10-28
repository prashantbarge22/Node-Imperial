:: Git should be installed manually from https://central.github.com/deployments/desktop/desktop/latest/win32
:: Nodejs should be installed manually from https://nodejs.org/dist/v8.11.2/node-v8.11.2-x64.msi
::We assume the terminal is CMD

@echo Download and Install github from https://central.github.com/deployments/desktop/desktop/latest/win32
@echo Download and Install nodejs from https://nodejs.org/dist/v8.11.2/node-v8.11.2-x64.msi

set CRT_DIR=%~dp0

if "%~1"=="" goto skip_clone
set INSTALATION_DIR=%~1
md %INSTALATION_DIR% 2>nul
cd %INSTALATION_DIR%
git clone https://github.com/IDLL/Node-IDLL.git Node-IDLL
cd Node-IDLL
goto install

:skip_clone
SET scriptPath=%~dp0
cd %scriptPath:~0,-1%\..\..

:install
call npm install --global --production windows-build-tools
call npm install -g node-gyp
call npm install pm2 -g --unsafe-perm                              
call npm install

cd %CRT_DIR%
