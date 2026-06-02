"use client"

import React, { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

function formatNumber(num: number): string {
  return num.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function parseInputValue(value: string): number {
  let cleaned = value.replace(/,/g, "")

  // Keep only the first decimal point for calculation.
  const parts = cleaned.split(".")
  if (parts.length > 2) {
    cleaned = parts[0] + "." + parts.slice(1).join("")
  }

  const parsed = parseFloat(cleaned)
  return isNaN(parsed) ? 0 : parsed
}

export default function ThaiPlusCalculator() {
  const [productPrice, setProductPrice] = useState<string>("")
  const [remainingCredit, setRemainingCredit] = useState<string>("1000")

  const price = parseInputValue(productPrice)
  const credit = parseInputValue(remainingCredit)

  // Calculate the subsidy with the remaining-credit cap.
  const govSubsidyByRight = price * 0.6
  const actualGovSubsidy = Math.min(govSubsidyByRight, credit)
  const userPays = price - actualGovSubsidy
  const remainingCreditAfter = credit - actualGovSubsidy

  const handleClear = useCallback(() => {
    setProductPrice("")
    setRemainingCredit("1000")
  }, [])

  const handleProductPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "")
    setProductPrice(value)
  }

  const handleCreditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "")
    setRemainingCredit(value)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="relative inline-block mb-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1xdf3HB0IxCyOY3A7HixcKgJr7rNrV.png"
              alt="ไทยช่วยไทย พลัส"
              className="w-48 h-auto mx-auto"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Thai Plus
          </h1>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              กรอกข้อมูล
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productPrice" className="text-sm font-medium">
                ราคาสินค้า (บาท)
              </Label>
              <Input
                id="productPrice"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={productPrice}
                onChange={handleProductPriceChange}
                className="text-lg h-12 font-mono"
                maxLength={12}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="remainingCredit" className="text-sm font-medium">
                วงเงินรัฐคงเหลือ (บาท)
              </Label>
              <Input
                id="remainingCredit"
                type="text"
                inputMode="decimal"
                placeholder="1,000.00"
                value={remainingCredit}
                onChange={handleCreditChange}
                className="text-lg h-12 font-mono"
                maxLength={12}
              />
            </div>
            <Button
              variant="outline"
              onClick={handleClear}
              className="w-full h-11"
            >
              ล้างข้อมูล
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-lg bg-gradient-to-br from-card to-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-card-foreground">
              ผลการคำนวณ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30">
              <p className="text-sm text-muted-foreground mb-1">รัฐช่วยจ่าย</p>
              <p className="text-3xl md:text-4xl font-bold text-[#10B981] font-mono">
                {formatNumber(actualGovSubsidy)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">บาท</p>
            </div>

            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-muted-foreground mb-1">คุณจ่าย</p>
              <p className="text-3xl md:text-4xl font-bold text-red-500 font-mono">
                {formatNumber(userPays)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">บาท</p>
            </div>

            <div className="p-4 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30">
              <p className="text-sm text-muted-foreground mb-1">
                วงเงินคงเหลือหลังใช้สิทธิ์
              </p>
              <p className="text-2xl md:text-3xl font-bold text-[#3B82F6] font-mono">
                {formatNumber(remainingCreditAfter)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">บาท</p>
            </div>

            {price > 0 && (
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  รัฐช่วยจ่าย 60% ของราคาสินค้า = {formatNumber(govSubsidyByRight)} บาท
                  <br />
                  แต่ไม่เกินวงเงินคงเหลือ {formatNumber(credit)} บาท
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          ข้อมูลนี้ใช้เพื่อการประมาณการเท่านั้น
        </p>
      </div>
    </main>
  )
}
