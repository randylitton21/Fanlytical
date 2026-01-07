@echo off
REM Deploy NFL Agent Web App to https://github.com/randylitton21/Fanlytical.git

echo ==========================================
echo Deploying to GitHub: Fanlytical
echo ==========================================
echo.

REM Initialize git if needed
if not exist ".git" (
    echo Initializing git repository...
    git init
    git branch -M main
)

REM Set remote to Fanlytical repository
git remote remove origin 2>nul
git remote add origin https://github.com/randylitton21/Fanlytical.git
echo Remote set to: https://github.com/randylitton21/Fanlytical.git
echo.

REM Add all files
echo Adding files to git...
git add .

REM Commit
echo.
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Initial commit - NFL Agent Web App

git commit -m "%commit_msg%"

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
echo 1. Go to: https://github.com/randylitton21/Fanlytical
echo 2. Click Settings → Pages
echo 3. Source: 'main' branch, '/ (root)' folder
echo 4. Click Save
echo.
echo Your app will be live at:
echo   https://randylitton21.github.io/Fanlytical
echo.
echo Note: If you want the app in a subfolder, you may need to:
echo - Create a 'docs' folder and move files there, OR
echo - Use GitHub Actions for deployment
echo.

pause

