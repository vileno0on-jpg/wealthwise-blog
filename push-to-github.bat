@echo off
echo ========================================
echo  WealthWise Blog - Push to GitHub
echo ========================================
echo.

REM Check if remote already exists
git remote get-url origin >nul 2>&1
if %errorlevel% == 0 (
    echo Remote 'origin' already exists.
    echo.
    echo Current remote URL:
    git remote get-url origin
    echo.
    set /p continue="Do you want to use existing remote? (y/n): "
    if /i not "%continue%"=="y" (
        git remote remove origin
        echo Remote removed.
    ) else (
        echo Pushing to existing remote...
        git push -u origin main
        goto :end
    )
)

echo.
echo You need to create a GitHub repository first.
echo.
echo Option 1: Create via web browser (Recommended)
echo   1. Go to: https://github.com/new
echo   2. Repository name: wealthwise-blog
echo   3. Make it Public
echo   4. DON'T check "Add a README"
echo   5. Click "Create repository"
echo.
echo Option 2: Use GitHub Personal Access Token
echo   1. Get token from: https://github.com/settings/tokens
echo   2. Select 'repo' scope
echo   3. Copy the token
echo.
set /p method="Choose option (1 or 2): "

if "%method%"=="1" (
    echo.
    echo After creating the repo on GitHub, run these commands:
    echo.
    echo   git remote add origin https://github.com/YOUR_USERNAME/wealthwise-blog.git
    echo   git push -u origin main
    echo.
    echo Replace YOUR_USERNAME with your GitHub username.
    pause
    exit /b
)

if "%method%"=="2" (
    set /p username="Enter your GitHub username: "
    set /p reponame="Enter repository name (default: wealthwise-blog): "
    if "%reponame%"=="" set reponame=wealthwise-blog
    set /p token="Enter your GitHub Personal Access Token: "
    
    echo.
    echo Creating repository via GitHub API...
    
    curl -X POST -H "Authorization: token %token%" -H "Accept: application/vnd.github.v3+json" ^
        https://api.github.com/user/repos ^
        -d "{\"name\":\"%reponame%\",\"description\":\"WealthWise - Personal Finance Blog\",\"private\":false}"
    
    if %errorlevel% == 0 (
        echo.
        echo Repository created! Adding remote and pushing...
        git remote add origin https://%token%@github.com/%username%/%reponame%.git
        git push -u origin main
        echo.
        echo Done! Your code is now on GitHub.
        echo Repository: https://github.com/%username%/%reponame%
    ) else (
        echo.
        echo Error creating repository. Please check your token and try again.
    )
)

:end
pause

