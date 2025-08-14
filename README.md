# Mrs. Sewell's Financial FREEDom Calculators

A comprehensive suite of financial planning calculators designed for educational use in Personal Finance classes. This modern web application provides six essential financial calculators with detailed explanations, visualizations, and educational content to help students understand key personal finance concepts.

## Features

### 🧮 Six Essential Financial Calculators

1. **Inflation Calculator** - Understand how inflation affects purchasing power over time
2. **Compound Interest Calculator** - Calculate investment growth with compound interest
3. **Time Value of Money Calculator** - Solve for any variable in TVM equations
4. **Credit Card Payoff Calculator** - Calculate payoff time and total interest costs
5. **Auto Loan Calculator** - Calculate monthly payments and total cost
6. **Mortgage Calculator** - Calculate mortgage payments with home price and down payment options

### 📊 Rich Visualizations

- Interactive charts using Recharts library
- Area charts showing financial projections over time
- Color-coded data visualization for easy understanding
- Responsive charts that work on all devices

### 📚 Educational Features

- **Key Lessons** for each calculator to reinforce learning
- Detailed explanations of financial concepts
- Real-world examples and context
- Professional presentation suitable for classroom use
- Clear, jargon-free language for student comprehension

### 💾 Persistent Data Storage

- Automatic saving of user inputs using GitHub Spark's KV storage
- Resume calculations where you left off
- No data loss between sessions

### 📱 Modern, Responsive Design

- Clean, professional interface using shadcn/ui components
- Mobile-first responsive design
- Educational institution branding and color scheme
- Accessibility features and WCAG compliance

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom educational theme
- **UI Components**: shadcn/ui component library
- **Charts**: Recharts for data visualization
- **Icons**: Phosphor Icons React
- **Build Tool**: Vite
- **Storage**: GitHub Spark KV storage
- **Deployment**: GitHub Pages ready

## Project Structure

```
src/
├── components/
│   ├── ui/                          # shadcn/ui components
│   ├── InflationCalculator.tsx      # Inflation calculator component
│   ├── CompoundInterestCalculator.tsx # Compound interest calculator
│   ├── TimeValueOfMoneyCalculator.tsx # TVM calculator
│   ├── CreditCardCalculator.tsx     # Credit card payoff calculator
│   ├── AutoLoanCalculator.tsx       # Auto loan calculator
│   └── MortgageCalculator.tsx       # Mortgage calculator
├── assets/
│   └── images/
│       └── FHU_COB.jpg             # College logo
├── lib/
│   └── utils.ts                    # Utility functions
├── App.tsx                         # Main application component
├── index.css                       # Global styles and theme
├── main.tsx                        # Application entry point
└── main.css                        # Structural CSS (do not edit)
```

## Calculator Details

### Inflation Calculator
- Calculate how inflation erodes purchasing power
- Visual representation of purchasing power loss over time
- Input: current amount, inflation rate, time period
- Output: future nominal value, real purchasing power, loss amounts

### Compound Interest Calculator
- Accurate compound interest calculations with multiple compounding frequencies
- Support for additional regular deposits
- Visual growth chart showing principal vs. interest
- Respects all compounding frequency selections

### Time Value of Money Calculator
- Solve for any missing TVM variable (PV, FV, PMT, N, I)
- Advanced Newton-Raphson algorithms for complex calculations
- Educational explanations of TVM concepts
- Dynamic field hiding based on calculation selection

### Credit Card Payoff Calculator
- Multiple payment strategies (minimum payment vs. fixed payment)
- Complete payment breakdown charts and tables
- Monthly payment schedule with year-by-year summaries
- Visual representation of principal vs. interest payments

### Auto Loan Calculator
- Monthly payment calculations
- Complete amortization schedule
- Total interest and payment calculations
- Professional formatting with thousands separators

### Mortgage Calculator
- **NEW**: Home price and down payment percentage inputs
- **NEW**: Calculated down payment amount and loan amount display
- Complete yearly and monthly amortization schedules
- Comprehensive mortgage cost analysis
- Educational content about home buying decisions

## Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd financial-calculators
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment Guide

### GitHub Pages Deployment

1. **Prepare the repository**:
   - Ensure your project is in a GitHub repository
   - Make sure all changes are committed and pushed

2. **Configure Vite for GitHub Pages**:
   Create or update `vite.config.ts`:
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import path from 'path'

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
       sourcemap: false,
     },
   })
   ```

3. **Set up GitHub Actions workflow**:
   Create `.github/workflows/deploy.yml`:
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
           uses: actions/checkout@v3

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: 18
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

4. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to Pages section
   - Set source to "Deploy from a branch"
   - Select "gh-pages" branch and "/ (root)" folder
   - Click Save

5. **Deploy**:
   - Push your changes to the main branch
   - GitHub Actions will automatically build and deploy
   - Your site will be available at `https://yourusername.github.io/your-repository-name/`

### Alternative: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting provider of choice.

## Educational Use

### Classroom Integration
- Use as a teaching aid for personal finance concepts
- Students can experiment with different scenarios
- Visual representations help explain abstract concepts
- Each calculator includes educational explanations

### Learning Objectives
- Understanding compound growth and time value of money
- Recognizing the impact of inflation on purchasing power
- Learning to evaluate loan terms and payment strategies
- Developing skills in financial planning and analysis

### Assignment Ideas
- Compare different investment scenarios using compound interest
- Calculate the real cost of major purchases (cars, homes)
- Analyze the impact of different down payment amounts
- Evaluate credit card payment strategies

## Customization

### Theming
The application uses a professional educational theme defined in `src/index.css`. Key colors can be customized by modifying the CSS custom properties in the `:root` section.

### Adding New Calculators
1. Create a new component in the `components/` directory
2. Add the calculator to the main `calculators` array in `App.tsx`
3. Choose an appropriate icon from Phosphor Icons
4. Follow the existing pattern for consistent UI/UX

### Modifying Calculations
All mathematical formulas are implemented in their respective calculator components. Ensure accuracy by validating against established financial calculation sources.

## Contributing

### Code Standards
- Use TypeScript for type safety
- Follow the existing component structure
- Include educational explanations for all calculations
- Maintain responsive design principles
- Write accessible HTML with proper labels and ARIA attributes

### Testing
- Test all calculations against known financial formulas
- Verify responsive design on multiple device sizes
- Ensure accessibility with screen readers
- Validate all user input scenarios

## Support

For questions about using these calculators in an educational setting, please refer to the educational documentation or contact the development team.

## License

This project is designed for educational use. Please review the license file for specific terms and conditions.

---

**Mrs. Sewell's Financial FREEDom Calculators** - Making Personal Finance Education Accessible and Engaging