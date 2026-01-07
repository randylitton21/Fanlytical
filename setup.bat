@echo off
REM NFL Analytics Agent Web - Quick Setup Script
REM This script helps set up the project for first-time use

echo ==========================================
echo NFL Analytics Agent Web - Setup
echo ==========================================
echo.

echo Checking prerequisites...
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed!
    echo Please install Git from: https://git-scm.com/downloads
    echo.
    pause
    exit /b 1
) else (
    echo [OK] Git is installed
)

REM Check if node is installed (optional)
node --version >nul 2>&1
if errorlevel 1 (
    echo [WARN] Node.js is not installed (optional for local development)
    echo Install from: https://nodejs.org/
) else (
    echo [OK] Node.js is installed
)

echo.
echo ==========================================
echo Setup Complete!
echo ==========================================
echo.
echo Next steps:
echo.
echo 1. Get your API keys:
echo    - OpenAI API Key: https://platform.openai.com/api-keys
echo    - GitHub Token: https://github.com/settings/tokens
echo      (Select 'gist' scope)
echo.
echo 2. To test locally:
echo    - Open index.html in your browser
echo    - Or use: python -m http.server 8000
echo.
echo 3. To deploy to GitHub Pages:
echo    - Run: deploy.bat
echo    - Or follow: GITHUB_PAGES_SETUP.md
echo.
echo 4. Configure API keys in the app:
echo    - Open the app
echo    - Click the API Keys button
echo    - Enter your keys
echo.
pause

