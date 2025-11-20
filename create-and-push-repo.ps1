# PowerShell script to create GitHub repo and push code
# You'll need a GitHub Personal Access Token

param(
    [Parameter(Mandatory=$true)]
    [string]$RepoName = "wealthwise-blog",
    
    [Parameter(Mandatory=$true)]
    [string]$GitHubToken,
    
    [string]$Username = "vileno0on-jpg",
    [string]$Description = "WealthWise - Personal Finance Blog"
)

Write-Host "Creating GitHub repository: $RepoName" -ForegroundColor Green

# Create repository via GitHub API
$headers = @{
    "Authorization" = "token $GitHubToken"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    name = $RepoName
    description = $Description
    private = $false
    auto_init = $false
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    Write-Host "Repository created successfully!" -ForegroundColor Green
    Write-Host "Repository URL: $($response.html_url)" -ForegroundColor Cyan
    
    # Add remote and push
    Write-Host "`nAdding remote and pushing code..." -ForegroundColor Yellow
    
    # Remove existing remote if any
    git remote remove origin 2>$null
    
    # Add new remote
    git remote add origin "https://$GitHubToken@github.com/$Username/$RepoName.git"
    
    # Push to GitHub
    git push -u origin main
    
    Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository: $($response.html_url)" -ForegroundColor Cyan
    
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "Authentication failed. Please check your GitHub token." -ForegroundColor Red
    } elseif ($_.Exception.Response.StatusCode -eq 422) {
        Write-Host "Repository might already exist. Trying to add remote anyway..." -ForegroundColor Yellow
        git remote remove origin 2>$null
        git remote add origin "https://$GitHubToken@github.com/$Username/$RepoName.git"
        git push -u origin main
    }
}

