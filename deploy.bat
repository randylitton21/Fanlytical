@echo off
REM NFL Analytics Agent Web - Deployment Script (Windows)
REM This script helps deploy the app to GitHub Pages

echo ==========================================
echo NFL Analytics Agent Web - Deployment
echo ==========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo Initializing git repository...
    git init
    git branch -M main
)

REM Check if remote is set
git remote | findstr /C:"origin" >nul
if errorlevel 1 (
    echo.
    echo GitHub remote not found. Please add your GitHub repository:
    echo   git remote add origin https://github.com/USERNAME/REPO-NAME.git
    echo.
    set /p repo_url="Enter your GitHub repository URL (or press Enter to skip): "
    if not "!repo_url!"=="" (
        git remote add origin "!repo_url!"
        echo Remote added: !repo_url!
    )
)

REM Add all files
echo.
echo Adding files to git...
git add .

REM Commit
echo.
set /p commit_msg="Enter commit message (or press Enter for default): "
if "!commit_msg!"=="" set commit_msg=Update NFL Agent Web App

git commit -m "!commit_msg!"

REM Push to GitHub
echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ==========================================
echo Deployment complete!
echo ==========================================
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Navigate to Settings → Pages
echo 3. Select source: 'main' branch, '/ (root)' folder
echo 4. Click Save
echo.
echo Your app will be live at:
echo   https://USERNAME.github.io/REPO-NAME
echo.

pause

