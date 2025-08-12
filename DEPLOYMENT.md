# Deployment Guide: Mrs. Sewell's Financial FREEDom Calculators

This guide provides step-by-step instructions for deploying the Financial Planning Calculator Suite to GitHub Pages for educational use.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Build Configuration](#build-configuration)
4. [GitHub Pages Deployment](#github-pages-deployment)
5. [Custom Domain Setup (Optional)](#custom-domain-setup-optional)
6. [Troubleshooting](#troubleshooting)
7. [Maintenance](#maintenance)

## Prerequisites

Before deploying, ensure you have:
- A GitHub account
- Git installed on your computer
- Node.js (version 16 or higher) installed
- Basic familiarity with command line operations

## Project Setup

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top-right corner
3. Select "New repository"
4. Name your repository (e.g., `financial-calculators` or `personal-finance-tools`)
5. Set the repository to **Public** (required for GitHub Pages on free accounts)
6. Check "Add a README file"
7. Click "Create repository"

### Step 2: Clone and Upload Your Project

1. Clone your new repository to your computer:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   cd YOUR_REPOSITORY_NAME
   ```

2. Copy all project files from your Spark template directory to the cloned repository:
   ```
   financial-calculators/
   ├── src/
   ├── public/
   ├── index.html
   ├── package.json
   ├── vite.config.js
   ├── tailwind.config.js
   ├── tsconfig.json
   └── README.md
   ```

3. Add and commit your files:
   ```bash
   git add .
   git commit -m "Initial commit: Financial Planning Calculator Suite"
   git push origin main
   ```

## Build Configuration

### Step 3: Configure Vite for GitHub Pages

Create or update `vite.config.js` to include the correct base path:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Replace 'your-repository-name' with your actual repository name
export default defineConfig({
  plugins: [react()],
  base: '/your-repository-name/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
```

### Step 4: Update Package.json Scripts

Add deployment scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.0.0"
  }
}
```

### Step 5: Install Dependencies

Install the required packages:

```bash
npm install
npm install --save-dev gh-pages
```

## GitHub Pages Deployment

### Method 1: GitHub Actions (Recommended)

1. Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
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

2. Commit and push this workflow:
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

3. Configure GitHub Pages:
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Select "gh-pages" branch and "/ (root)" folder
   - Click "Save"

### Method 2: Manual Deployment

If you prefer manual control:

1. Build your project locally:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

3. Configure GitHub Pages (same as Method 1, step 3)

## Custom Domain Setup (Optional)

If you want to use a custom domain (e.g., `finance.yourschool.edu`):

1. Add a `CNAME` file to your `public/` directory:
```
finance.yourschool.edu
```

2. Configure DNS with your domain provider:
   - Create a CNAME record pointing to `YOUR_USERNAME.github.io`
   - Or create A records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

3. In GitHub repository settings:
   - Go to Pages section
   - Enter your custom domain
   - Check "Enforce HTTPS"

## Troubleshooting

### Common Issues and Solutions

#### Issue: 404 Error on Page Load
**Solution**: Check that your `vite.config.js` base path matches your repository name:
```javascript
base: '/your-actual-repository-name/',
```

#### Issue: Assets Not Loading
**Solution**: Ensure all imports use relative paths:
```typescript
// Correct
import logo from '@/assets/images/FHU_COB.jpg'

// Incorrect
import logo from '/assets/images/FHU_COB.jpg'
```

#### Issue: GitHub Actions Build Fails
**Solutions**:
1. Check Node.js version compatibility
2. Verify all dependencies are listed in `package.json`
3. Review build logs in the Actions tab

#### Issue: Calculator Data Not Persisting
**Note**: The `useKV` hook used in the Spark environment won't work on GitHub Pages. To maintain persistence, you'll need to replace it with localStorage:

```typescript
// Replace useKV with localStorage wrapper
const useLocalStorage = <T>(key: string, defaultValue: T): [T, (value: T) => void, () => void] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  })

  const setStoredValue = (newValue: T) => {
    setValue(newValue)
    window.localStorage.setItem(key, JSON.stringify(newValue))
  }

  const deleteValue = () => {
    setValue(defaultValue)
    window.localStorage.removeItem(key)
  }

  return [value, setStoredValue, deleteValue]
}
```

## Maintenance

### Updating the Site

1. Make changes to your code locally
2. Test changes: `npm run dev`
3. Commit and push changes:
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

4. GitHub Actions will automatically deploy changes

### Monitoring

- Check the Actions tab for build status
- Monitor site performance using browser dev tools
- Review user feedback and analytics if implemented

### Backup Strategy

1. Keep your repository private if it contains sensitive information
2. Regularly backup your repository:
```bash
git clone --mirror https://github.com/USERNAME/REPOSITORY.git
```
3. Export calculator data periodically if needed

## Security Considerations

- Never commit API keys or sensitive information
- Use environment variables for configuration
- Keep dependencies updated: `npm audit && npm update`
- Consider implementing Content Security Policy headers

## Performance Optimization

For educational use with many concurrent users:

1. **Enable compression** in your web server configuration
2. **Optimize images**: Compress the FHU_COB.jpg logo
3. **Use CDN**: Consider using GitHub's CDN capabilities
4. **Implement caching**: Leverage browser caching for static assets

## Support

If you encounter issues:
1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review GitHub Actions logs for build errors
3. Test locally with `npm run build && npm run preview`
4. Contact your IT department for domain-related issues

---

**Success Indicator**: Your calculator suite will be available at:
`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

The deployment is successful when all six calculators load properly and maintain their functionality in the browser environment.