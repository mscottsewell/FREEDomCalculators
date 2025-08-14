import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface MortgageData {
  loanAmount: number
  interestRate: number
  loanTerm: number
}

interface YearlySchedule {
  year: number
  totalPayment: number
  totalPrincipal: number
  totalInterest: number
  endBalance: number
}

interface MonthlyPayment {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export function MortgageCalculator() {
  const [data, setData] = useKV<MortgageData>('mortgage-calculator', {
    loanAmount: 300000,
    interestRate: 6.5,
    loanTerm: 30
  })

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    totalPaid: 0
  })

  const [yearlySchedule, setYearlySchedule] = useState<YearlySchedule[]>([])
  const [monthlySchedule, setMonthlySchedule] = useState<MonthlyPayment[]>([])

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatCurrencyNoDecimals = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const calculate = () => {
    if (!data.loanAmount || !data.interestRate || !data.loanTerm) return

    const monthlyRate = data.interestRate / 100 / 12
    const numberOfPayments = data.loanTerm * 12

    // Calculate monthly payment using mortgage formula
    const monthlyPayment = (data.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    let balance = data.loanAmount
    const monthlyPayments: MonthlyPayment[] = []
    const yearlyData: { [year: number]: YearlySchedule } = {}
    let totalInterest = 0

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = monthlyPayment - interestPayment
      balance -= principalPayment
      totalInterest += interestPayment

      const currentYear = Math.ceil(month / 12)

      monthlyPayments.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      })

      // Aggregate yearly data
      if (!yearlyData[currentYear]) {
        yearlyData[currentYear] = {
          year: currentYear,
          totalPayment: 0,
          totalPrincipal: 0,
          totalInterest: 0,
          endBalance: 0
        }
      }
      
      yearlyData[currentYear].totalPayment += monthlyPayment
      yearlyData[currentYear].totalPrincipal += principalPayment
      yearlyData[currentYear].totalInterest += interestPayment
      yearlyData[currentYear].endBalance = Math.max(0, balance)
    }

    setResults({
      monthlyPayment,
      totalInterest,
      totalPaid: data.loanAmount + totalInterest
    })

    setYearlySchedule(Object.values(yearlyData))
    setMonthlySchedule(monthlyPayments)
  }

  useEffect(() => {
    calculate()
  }, [data])

  const updateData = (field: keyof MortgageData, value: number) => {
    setData(current => ({ ...current, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="loan-amount">Loan Amount ($)</Label>
          <Input
            id="loan-amount"
            type="number"
            value={data.loanAmount}
            onChange={(e) => updateData('loanAmount', Number(e.target.value))}
            placeholder="300000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="interest-rate">Interest Rate (%)</Label>
          <Input
            id="interest-rate"
            type="number"
            step="0.01"
            value={data.interestRate}
            onChange={(e) => updateData('interestRate', Number(e.target.value))}
            placeholder="6.5"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="loan-term">Loan Term (Years)</Label>
          <Input
            id="loan-term"
            type="number"
            value={data.loanTerm}
            onChange={(e) => updateData('loanTerm', Number(e.target.value))}
            placeholder="30"
          />
        </div>
      </div>

      {/* Results Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mortgage Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold currency-blue">
              {formatCurrency(results.monthlyPayment)}
            </div>
            <div className="text-sm text-muted-foreground">Monthly Payment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold currency-red">
              {formatCurrency(results.totalInterest)}
            </div>
            <div className="text-sm text-muted-foreground">Total Interest</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold currency-blue">
              {formatCurrency(results.totalPaid)}
            </div>
            <div className="text-sm text-muted-foreground">Total Amount Paid</div>
          </div>
        </CardContent>
      </Card>

      {/* Understanding Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Understanding Your Mortgage</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">
            For your {formatCurrencyNoDecimals(data.loanAmount)} mortgage at {data.interestRate}% interest for {data.loanTerm} years, 
            you'll pay {formatCurrency(results.monthlyPayment)} per month. Over the life of the loan, you'll pay {formatCurrency(results.totalInterest)} in interest, 
            making your total cost {formatCurrency(results.totalPaid)}. The interest represents {((results.totalInterest / data.loanAmount) * 100).toFixed(1)}% of your original loan amount.
          </p>
        </CardContent>
      </Card>

      {/* Yearly Amortization Schedule */}
      {yearlySchedule.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Yearly Amortization Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto max-h-96 pr-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left table-header-shaded">Year</TableHead>
                    <TableHead className="text-right table-header-shaded">Total Payment</TableHead>
                    <TableHead className="text-right table-header-shaded">Total Principal</TableHead>
                    <TableHead className="text-right table-header-shaded">Total Interest</TableHead>
                    <TableHead className="text-right pr-4 table-header-shaded">End Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yearlySchedule.map((yearData) => (
                    <TableRow key={yearData.year}>
                      <TableCell className="font-medium">{yearData.year}</TableCell>
                      <TableCell className="text-right">{formatCurrency(yearData.totalPayment)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(yearData.totalPrincipal)}</TableCell>
                      <TableCell className="text-right currency-red">{formatCurrency(yearData.totalInterest)}</TableCell>
                      <TableCell className="text-right pr-4">{formatCurrency(yearData.endBalance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Payment Breakdown */}
      {monthlySchedule.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Complete Monthly Payment Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto max-h-96 pr-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left w-16 table-header-shaded">Month</TableHead>
                    <TableHead className="text-right table-header-shaded">Payment</TableHead>
                    <TableHead className="text-right table-header-shaded">Principal</TableHead>
                    <TableHead className="text-right table-header-shaded">Interest</TableHead>
                    <TableHead className="text-right pr-4 table-header-shaded">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlySchedule.map((payment) => (
                    <TableRow key={payment.month}>
                      <TableCell className="font-medium">{payment.month}</TableCell>
                      <TableCell className="text-right">{formatCurrency(payment.payment)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(payment.principal)}</TableCell>
                      <TableCell className="text-right currency-red">{formatCurrency(payment.interest)}</TableCell>
                      <TableCell className="text-right pr-4">{formatCurrency(payment.balance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Lesson Section */}
      <Card className="bg-accent/5 border-accent/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            💡 Key Lesson
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed font-medium">
              <strong>Your home can be your largest investment or your biggest financial mistake.</strong> A mortgage allows you to leverage borrowed money to potentially build wealth through real estate appreciation. 
              However, the total interest paid over 30 years often equals or exceeds the original loan amount. Making extra principal payments early in the loan dramatically reduces total interest costs. 
              Remember that a home isn't just an investment - it provides shelter and stability. Buy what you can afford, not what the bank will lend you.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}