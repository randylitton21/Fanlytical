#!/bin/bash

# NFL Analytics Agent Web - Deployment Script
# This script helps deploy the app to GitHub Pages

echo "=========================================="
echo "NFL Analytics Agent Web - Deployment"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    git branch -M main
fi

# Check if remote is set
if ! git remote | grep -q "origin"; then
    echo ""
    echo "GitHub remote not found. Please add your GitHub repository:"
    echo "  git remote add origin https://github.com/USERNAME/REPO-NAME.git"
    echo ""
    read -p "Enter your GitHub repository URL (or press Enter to skip): " repo_url
    if [ ! -z "$repo_url" ]; then
        git remote add origin "$repo_url"
        echo "Remote added: $repo_url"
    fi
fi

# Add all files
echo ""
echo "Adding files to git..."
git add .

# Commit
echo ""
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update NFL Agent Web App"
fi

git commit -m "$commit_msg"

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "=========================================="
echo "Deployment complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings → Pages"
echo "3. Select source: 'main' branch, '/ (root)' folder"
echo "4. Click Save"
echo ""
echo "Your app will be live at:"
echo "  https://USERNAME.github.io/REPO-NAME"
echo ""

