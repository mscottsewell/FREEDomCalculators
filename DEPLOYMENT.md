# Deployment Guide - Financial FREEDom Calculators

This comprehensive guide will walk you through deploying the Financial FREEDom Calculators to GitHub Pages, making it accessible to students and educators worldwide.

## 📋 Prerequisites

Before you begin, ensure you have:
- A GitHub account
- Git installed on your local machine
- Node.js 18+ installed
- Basic familiarity with command line/terminal

## 🚀 Quick Deployment (Recommended)

### Step 1: Prepare Your Repository

1. **Create a new repository on GitHub:**
   - Go to [github.com](https://github.com) and click "New repository"
   - Name it something like `financial-calculators` or `sewell-calculators`
   - Make it **Public** (required for free GitHub Pages)
   - Don't initialize with README (we'll add our own)

2. **Clone and setup your local repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/financial-calculators.git
   cd financial-calculators
   
   # Copy your project files to this directory
   # Make sure all source files are in place
   ```

### Step 2: Install Dependencies and Test

```bash
# Install all dependencies
npm install

# Test the build process locally
npm run build

# Test the production build
npm run preview
```

If everything works locally, you're ready to deploy!

### Step 3: Configure for GitHub Pages

1. **Install the GitHub Pages deployment tool:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update your `package.json`:**
   Add these lines to your `package.json`:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/financial-calculators",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```
   
   Replace `YOUR_USERNAME` with your actual GitHub username and `financial-calculators` with your repository name.

3. **Update Vite configuration:**
   Create or update `vite.config.ts`:
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import path from 'path'

   export default defineConfig({
     plugins: [react()],
     base: '/financial-calculators/',  // Replace with your repo name
     resolve: {
       alias: {
         "@": path.resolve(__dirname, "./src"),
       },
     },
   })
   ```

### Step 4: Deploy

```bash
# Commit your changes
git add .
git commit -m "Initial commit with financial calculators"
git push origin main

# Deploy to GitHub Pages
npm run deploy
```

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "gh-pages" branch and "/ (root)" folder
6. Click "Save"

Your site will be available at: `https://YOUR_USERNAME.github.io/financial-calculators/`

## 🛠️ Alternative Deployment Methods

### Method 2: GitHub Actions (Advanced)

For automated deployments on every push:

1. **Create `.github/workflows/deploy.yml`:**
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       
       steps:
       - uses: actions/checkout@v3
       
       - name: Setup Node.js
         uses: actions/setup-node@v3
         with:
           node-version: '18'
           cache: 'npm'
       
       - name: Install dependencies
         run: npm ci
       
       - name: Build
         run: npm run build
       
       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         if: github.ref == 'refs/heads/main'
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./dist
   ```

2. **Enable GitHub Actions in repository settings**
3. **Push changes - deployment will happen automatically**

### Method 3: Manual Upload

If you prefer not to use command line:

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Create a new branch called `gh-pages`:**
   - Go to your GitHub repository
   - Create a new branch named exactly `gh-pages`

3. **Upload the `dist` folder contents:**
   - Upload all files from your local `dist` folder to the root of the `gh-pages` branch
   - Commit the changes

4. **Enable GitHub Pages** (same as Step 5 above)

## 🔧 Configuration Details

### Important Files to Check

1. **`vite.config.ts`** - Must have correct base path:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',  // Critical for GitHub Pages
     // ... other config
   })
   ```

2. **`package.json`** - Should include:
   ```json
   {
     "homepage": "https://username.github.io/repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Asset imports** - Ensure all assets use proper imports:
   ```typescript
   import logo from '@/assets/images/FHU_COB.jpg'
   // Not: src="/src/assets/images/FHU_COB.jpg"
   ```

### Common Configuration Issues

1. **Blank page after deployment:**
   - Check that `base` in `vite.config.ts` matches your repository name
   - Verify all assets are properly imported, not referenced by string paths

2. **404 errors for assets:**
   - Ensure you're using `import` statements for all images/assets
   - Check that the `FHU_COB.jpg` image is in the correct location

3. **Routing issues:**
   - This app uses tabs, not routing, so this shouldn't be an issue
   - If you add routing later, you'll need hash routing for GitHub Pages

## 📊 Post-Deployment Checklist

After deployment, verify:
- [ ] Site loads at the GitHub Pages URL
- [ ] All calculator tabs are accessible
- [ ] Charts and visualizations display correctly
- [ ] FHU logo displays properly
- [ ] All calculations work correctly
- [ ] Data persists between page refreshes (useKV functionality)
- [ ] Site is responsive on mobile devices
- [ ] All styling appears correctly

## 🎯 Sharing Your Site

Once deployed, you can share your calculators:

### For Educators
- **Direct link**: `https://username.github.io/repo-name/`
- **QR Code**: Generate a QR code for easy mobile access
- **Canvas/LMS**: Embed or link from your course management system

### For Students
- Bookmark the URL for easy access
- Works on all devices - phones, tablets, computers
- No installation required
- Data saves automatically for continuous use

## 🔄 Updates and Maintenance

### Updating the Site

1. **Make changes locally**
2. **Test thoroughly:**
   ```bash
   npm run build
   npm run preview
   ```
3. **Deploy updates:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   npm run deploy
   ```

### Monitoring

- **GitHub Pages status**: Check repository Settings > Pages for deployment status
- **Analytics**: Consider adding Google Analytics for usage tracking
- **Issues**: Monitor for any user-reported issues via GitHub Issues

## 🆘 Troubleshooting

### Common Issues and Solutions

1. **Deploy command fails:**
   ```bash
   # Clean install
   rm -rf node_modules
   npm install
   npm run deploy
   ```

2. **Site not updating:**
   - GitHub Pages can take 5-10 minutes to update
   - Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)
   - Check that the gh-pages branch was updated

3. **Assets not loading:**
   ```typescript
   // Ensure you're using imports, not string paths
   import logo from '@/assets/images/FHU_COB.jpg'
   ```

4. **Build errors:**
   ```bash
   # Check for TypeScript errors
   npm run build
   
   # If needed, update dependencies
   npm update
   ```

### Getting Help

- **GitHub Pages Documentation**: [docs.github.com/pages](https://docs.github.com/en/pages)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev)
- **Repository Issues**: Use GitHub Issues for project-specific problems

## 🎉 Success!

Your Financial FREEDom Calculators are now live and accessible to students worldwide! The site will be available 24/7 at your GitHub Pages URL, providing an invaluable educational resource for personal finance learning.

## 📈 Advanced Features

### Custom Domain (Optional)

If you want a custom domain like `calculators.yourschool.edu`:

1. **Purchase/configure your domain**
2. **Add a `CNAME` file** to your repository with your domain
3. **Configure DNS** with your domain provider
4. **Enable HTTPS** in GitHub Pages settings

### Analytics Integration

Add Google Analytics to track usage:

1. **Create Google Analytics account**
2. **Add tracking code to `index.html`**
3. **Monitor student usage patterns**

### Performance Optimization

- **Lazy loading**: Already implemented with tab-based interface
- **Image optimization**: Ensure FHU_COB.jpg is optimized for web
- **Caching**: GitHub Pages provides good caching by default

---

**Your students now have 24/7 access to professional financial calculators! 🎓📊**