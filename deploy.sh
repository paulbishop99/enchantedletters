#!/bin/bash

# Enchanted Letters - GitHub Deployment Script
# This script helps automate the deployment process to GitHub Pages

echo "🌟 Enchanted Letters - GitHub Deployment Helper 🌟"
echo "=================================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "Visit: https://git-scm.com/downloads"
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ This directory is not a Git repository."
    echo "Please run this script from the flowerletters directory."
    exit 1
fi

echo "✅ Git repository detected!"
echo ""

# Get GitHub username
read -p "Enter your GitHub username: " github_username

if [ -z "$github_username" ]; then
    echo "❌ GitHub username is required."
    exit 1
fi

# Get repository name (default to flowerletters)
read -p "Enter repository name (default: flowerletters): " repo_name
repo_name=${repo_name:-flowerletters}

echo ""
echo "📋 Configuration Summary:"
echo "   GitHub Username: $github_username"
echo "   Repository Name: $repo_name"
echo "   Future URL: https://$github_username.github.io/$repo_name"
echo ""

read -p "Is this correct? (y/N): " confirm
if [[ ! $confirm =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled."
    exit 1
fi

echo ""
echo "🚀 Starting deployment process..."

# Check if remote origin already exists
if git remote get-url origin &> /dev/null; then
    echo "⚠️  Remote origin already exists. Removing it..."
    git remote remove origin
fi

# Add GitHub remote
echo "🔗 Adding GitHub remote..."
git remote add origin "https://github.com/$github_username/$repo_name.git"

# Ensure we're on main branch
echo "🌿 Switching to main branch..."
git branch -M main

# Add deployment guide to git
echo "📚 Adding deployment guide..."
git add DEPLOYMENT_GUIDE.md deploy.sh

# Commit if there are changes
if ! git diff --cached --quiet; then
    git commit -m "Add deployment guide and setup script"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
if git push -u origin main; then
    echo ""
    echo "🎉 SUCCESS! Your code has been pushed to GitHub!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to: https://github.com/$github_username/$repo_name"
    echo "2. Click 'Settings' tab"
    echo "3. Scroll down and click 'Pages' in the sidebar"
    echo "4. Under 'Source', select 'Deploy from a branch'"
    echo "5. Choose 'main' branch and '/ (root)' folder"
    echo "6. Click 'Save'"
    echo ""
    echo "🌐 Your website will be available at:"
    echo "   https://$github_username.github.io/$repo_name"
    echo ""
    echo "⏱️  It may take 1-5 minutes for the site to become available."
    echo ""
    echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
else
    echo ""
    echo "❌ Failed to push to GitHub."
    echo ""
    echo "🔧 Possible solutions:"
    echo "1. Make sure the repository exists on GitHub"
    echo "2. Check your GitHub username and repository name"
    echo "3. Ensure you have push permissions to the repository"
    echo "4. Try authenticating with GitHub (you may need a personal access token)"
    echo ""
    echo "📖 See DEPLOYMENT_GUIDE.md for manual setup instructions"
fi

echo ""
echo "✨ Thank you for using Enchanted Letters! ✨"

