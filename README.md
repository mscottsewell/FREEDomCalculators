# Mrs. Sewell's Financial FREEDom Calculators

<div align="center">

![FHU College of Business](src/assets/images/FHU_COB.jpg)

**Personal Finance Made Easy**

A comprehensive suite of educational financial calculators designed for Personal Financial Planning classes

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Charts by Recharts](https://img.shields.io/badge/Charts-Recharts-8884d8)](https://recharts.org/)

</div>

## 🎯 Overview

This educational web application provides six essential financial calculators designed specifically for Personal Finance classes. Each calculator combines accurate mathematical computations with interactive visualizations and clear explanations to help students understand fundamental financial concepts.

## ✨ Key Features

### 📊 Six Essential Calculators
- **Inflation Calculator** - Understand how inflation erodes purchasing power over time
- **Compound Interest Calculator** - Visualize the power of compound growth and regular investing
- **Time Value of Money Calculator** - Master the fundamental principle that money has different values at different times
- **Credit Card Payoff Calculator** - See the true cost of minimum payments and debt
- **Auto Loan Calculator** - Calculate vehicle financing costs and payment schedules
- **Mortgage Calculator** - Understand home loan payments and amortization

### 🎨 Educational Design
- **Professional Interface** - Clean, academic design suitable for classroom use
- **Interactive Visualizations** - Dynamic charts and graphs for visual learning
- **Key Lessons** - Educational explanations reinforce financial concepts
- **Persistent Data** - User inputs are saved between sessions for continuous learning

### 📱 Modern Technology
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Calculations** - Immediate feedback as users adjust parameters
- **Advanced Algorithms** - Newton-Raphson methods for complex financial calculations
- **Accessible Interface** - WCAG AA compliant color contrasts and keyboard navigation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spark-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 🧮 Calculator Details

### Inflation Calculator
- **Purpose**: Demonstrate how inflation reduces purchasing power over time
- **Inputs**: Current amount, inflation rate, number of years
- **Outputs**: Future nominal value, real purchasing power, purchasing power lost
- **Visualization**: Area chart showing purchasing power erosion
- **Key Lesson**: Early planning and inflation-beating investments protect wealth

### Compound Interest Calculator
- **Purpose**: Show the power of compound growth and regular investing
- **Features**: Multiple compounding frequencies, additional deposit options
- **Advanced Formula**: A = P(1 + r/n)^(nt) + additional deposits
- **Visualization**: Growth chart separating principal from interest
- **Key Lesson**: Time and consistency are the most powerful wealth-building tools

### Time Value of Money Calculator
- **Purpose**: Solve for any variable in time value of money equations
- **Advanced Features**: Newton-Raphson methods for complex calculations
- **Variables**: Present value, future value, payment, periods, interest rate
- **Flexibility**: Calculate any unknown given the other variables
- **Key Lesson**: A dollar today is worth more than a dollar tomorrow

### Credit Card Payoff Calculator
- **Purpose**: Reveal the true cost of credit card debt
- **Payment Options**: Minimum payment (Interest + 1% of balance) or fixed amount
- **Outputs**: Payoff time, total interest, payment schedule
- **Visualizations**: Principal vs. interest charts, detailed payment tables
- **Key Lesson**: Minimum payments keep you in debt; pay more to save thousands

### Auto Loan Calculator
- **Purpose**: Calculate vehicle financing costs and schedules
- **Inputs**: Loan amount, interest rate, loan term
- **Outputs**: Monthly payment, total interest, complete amortization schedule
- **Features**: Full payment breakdown, year-by-year summary
- **Key Lesson**: Longer terms mean lower payments but much higher total costs

### Mortgage Calculator
- **Purpose**: Understand home loan payments and long-term costs
- **Features**: Monthly payment calculation, complete amortization schedule
- **Outputs**: Payment amount, total interest over life of loan
- **Visualization**: Year-by-year payment breakdown
- **Key Lesson**: Your largest purchase requires the most careful planning

## 🛠️ Technical Architecture

### Framework & Libraries
- **React 19** - Modern UI framework with concurrent features
- **TypeScript** - Type-safe development and better code reliability
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework with custom theme
- **shadcn/ui** - High-quality, accessible component library
- **Recharts** - Responsive chart library for data visualization
- **Phosphor Icons** - Beautiful icon set for UI elements

### Key Technologies
- **GitHub Spark Runtime** - Integrated development platform
- **useKV Hook** - Persistent data storage across sessions
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Efficient form handling and validation

### Data Persistence
The application uses the GitHub Spark `useKV` hook for persistent storage:
```typescript
const [calculatorInputs, setCalculatorInputs] = useKV("calculator-data", defaultValues)
```

### Mathematical Accuracy
All calculations use industry-standard financial formulas:
- **Compound Interest**: A = P(1 + r/n)^(nt)
- **Present Value**: PV = FV / (1 + r)^n
- **Payment Calculation**: PMT = PV × [r(1+r)^n] / [(1+r)^n-1]
- **Newton-Raphson**: For solving complex equations iteratively

## 🎨 Design System

### Color Palette
The application uses an educational institution theme with professional, accessible colors:

- **Primary**: Deep Academic Navy `oklch(0.35 0.095 230)`
- **Secondary**: Sophisticated Light Gray `oklch(0.88 0.015 220)`
- **Accent**: Distinguished Blue `oklch(0.58 0.12 200)`
- **Success**: Academic Green `oklch(0.62 0.15 140)`
- **Warning**: Professional Orange `oklch(0.68 0.13 45)`

### Typography
- **Font Family**: Inter - chosen for excellent readability and professional appearance
- **Hierarchy**: Clear distinction between headers, body text, and numerical data
- **Tabular Figures**: Consistent number alignment in calculations

### Responsive Design
- **Desktop**: Six-column tab layout with full feature access
- **Tablet**: Optimized spacing and touch-friendly interface
- **Mobile**: Two-column tab layout with horizontal scrolling tables

## 🔧 Development

### Project Structure
```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── InflationCalculator.tsx
│   ├── CompoundInterestCalculator.tsx
│   ├── TimeValueOfMoneyCalculator.tsx
│   ├── CreditCardCalculator.tsx
│   ├── AutoLoanCalculator.tsx
│   └── MortgageCalculator.tsx
├── lib/                 # Utility functions
├── hooks/              # Custom React hooks
├── assets/             # Images and static files
├── App.tsx             # Main application component
└── index.css           # Global styles and theme
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run optimize` - Optimize dependencies

### Adding New Calculators
1. Create calculator component in `src/components/`
2. Add calculator definition to `calculators` array in `App.tsx`
3. Include appropriate icon from `@phosphor-icons/react`
4. Implement persistent storage with `useKV` hook
5. Add visualization with Recharts if applicable

## 📚 Educational Use

### Classroom Integration
- **Assignments**: Students can explore different scenarios and save their work
- **Demonstrations**: Interactive visuals perfect for classroom projectors
- **Homework**: Persistent data allows students to continue work at home
- **Assessment**: Clear explanations help students understand concepts for tests

### Learning Objectives
Students will understand:
- How compound interest accelerates wealth building
- The devastating effect of inflation on purchasing power
- Why minimum credit card payments are financially dangerous
- How loan terms dramatically affect total costs
- The fundamental time value of money principle
- The importance of starting financial planning early

## 🤝 Contributing

This project was built using GitHub Spark for educational purposes. While primarily designed for Mrs. Sewell's Personal Finance class, the calculators can benefit any financial education program.

### Feedback Welcome
- Bug reports and feature requests
- Educational content suggestions
- Accessibility improvements
- Additional calculator ideas

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🏫 About

Created for **Mrs. Sewell's Personal Finance class** at **Freed-Hardeman University College of Business**. This application demonstrates how modern web technology can enhance financial education through interactive, visual learning experiences.

---

<div align="center">
<strong>Empowering students with financial knowledge for lifelong success</strong>
</div>