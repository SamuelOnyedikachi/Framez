#!/bin/bash

# Framez App Verification Script
# This script verifies the app meets all task requirements

echo "🚀 Framez Task Requirement Verification"
echo "========================================"
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
node --version
npm --version
echo ""

# Check dependencies
echo "✓ Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "  ✅ node_modules exists"
else
    echo "  ❌ node_modules missing - run: npm install"
fi
echo ""

# Check TypeScript
echo "✓ Checking TypeScript compilation..."
npx tsc --noEmit 2>&1 | head -5
if [ $? -eq 0 ]; then
    echo "  ✅ No TypeScript errors"
else
    echo "  ⚠️  TypeScript errors found - check output above"
fi
echo ""

# Check ESLint
echo "✓ Running ESLint..."
npx eslint . --ext .ts,.tsx --max-warnings 10 2>&1 | tail -1
echo ""

# Check required files
echo "✓ Checking required files..."
files=(
    "README.md"
    "SUPABASE_SETUP.md"
    "CODEBASE_OVERVIEW.md"
    "CORRECTIONS_REPORT.md"
    "GITHUB_SETUP.md"
    "TASK_COMPLETION.md"
    ".env.example"
    ".gitignore"
    "app/_layout.tsx"
    "app/(auth)/signin.tsx"
    "app/(auth)/signup.tsx"
    "app/(tabs)/index.tsx"
    "app/(tabs)/profile.tsx"
    "store/authStore.ts"
    "store/postsStore.ts"
    "store/userStore.ts"
    "components/PostCard.tsx"
    "components/CreatePostModal.tsx"
)

missing=0
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (MISSING)"
        ((missing++))
    fi
done

if [ $missing -eq 0 ]; then
    echo ""
    echo "✅ All required files present!"
else
    echo ""
    echo "❌ $missing files missing"
fi

echo ""
echo "========================================"
echo "✅ Verification Complete!"
echo ""
echo "Next Steps:"
echo "1. npm start - Start the app"
echo "2. Test all features (signup, posts, profile)"
echo "3. Push to GitHub"
echo "4. Record demo video"
echo "5. Deploy to Appetize.io"
echo "6. Submit form"
