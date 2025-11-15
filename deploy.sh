#!/bin/bash

echo "🚀 Deploying Fiifi & Liza Wedding RSVP..."

# Check if GitHub remote exists
if git remote get-url origin 2>/dev/null; then
    echo "✅ GitHub remote found, pushing to repository..."
    git push origin main
else
    echo "❌ No GitHub remote found. Please run:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/fiifi-liza-wedding-rsvp.git"
    echo "git push -u origin main"
fi

echo ""
echo "📋 Next steps:"
echo "1. Go to vercel.com and sign in with GitHub"
echo "2. Click 'New Project'"
echo "3. Import your repository"
echo "4. Click 'Deploy'"
echo ""
echo "🎉 Your wedding RSVP will be live in ~2 minutes!"
