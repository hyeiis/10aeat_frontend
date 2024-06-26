'use client'

/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button, { ButtonStyle } from './Button'

interface MonthlySummary {
  month: number
  total: number
}
interface Props {
  monthlySummary: MonthlySummary[]
  onSelectMonth: (month: number) => void
}
export default function MonthlyPlan({ monthlySummary, onSelectMonth }: Props) {
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`)
  const firstRowMonths = months.slice(0, 6)
  const secondRowMonths = months.slice(6, 12)
  const currentMonth = new Date().getMonth() + 1
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    currentMonth,
  )
  const [selectedMonthTotal, setSelectedMonthTotal] = useState<number>(0)

  useEffect(() => {
    const selectedMonthSummary = monthlySummary.find(
      (summary) => summary.month === selectedMonth,
    )
    setSelectedMonthTotal(selectedMonthSummary ? selectedMonthSummary.total : 0)
  }, [selectedMonth, monthlySummary])

  const handleMonthClick = (index: number) => {
    const month = index + 1
    if (selectedMonth === month) {
      setSelectedMonth(null)
      onSelectMonth(0) // 선택 해제 시 onSelectMonth에 0을 전달
    } else {
      setSelectedMonth(month)
      onSelectMonth(month)
    }
  }
  console.log(monthlySummary)

  const getButtonStyle = (month: number) => {
    return monthlySummary.some((summary) => summary.month === month)
      ? ButtonStyle.MONTHLY
      : ButtonStyle.MONTHLY_NONE
  }

  return (
    <div className="relative w-[343px] h-[185px] top-[36px] bg-white rounded-[18px] shadow-primary">
      <div className="inline-flex items-start absolute top-[16px] left-[16px]">
        <div className="flex w-full justify-center">
          <div className="flex flex-col justify-center">
            <Link type="button" href="/manage/monthly" className="flex">
              <span className="font-Pretendard font-semibold capitalize text-gray-900">
                월별 계획
              </span>
              <Image
                src="/icons/arrow_right_small.svg"
                width={24}
                height={24}
                alt="arrow_right_small"
                className="!relative !w-[24px] !h-[24px]"
              />
            </Link>

            <div className="flex flex-col my-2">
              <div className="flex flex-wrap gap-2">
                {firstRowMonths.map((month, index) => (
                  <Button
                    key={index}
                    buttonStyle={getButtonStyle(index + 1)}
                    style="flex-1 m-0 bg-gray-50"
                    isSelect={selectedMonth === index + 1}
                    onClickFunction={() => handleMonthClick(index)}
                  >
                    {month}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap mt-2 gap-2">
                {secondRowMonths.map((month, index) => (
                  <Button
                    key={index}
                    buttonStyle={getButtonStyle(index + 7)}
                    style="flex-1 m-0"
                    isSelect={selectedMonth === index + 7}
                    onClickFunction={() => handleMonthClick(index + 6)}
                  >
                    {month}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 font-Pretendard text-gray-600 text-sm">
              <div className="flex gap-1">
                <Image
                  src="/icons/hasSchedule.svg"
                  width={16}
                  height={16}
                  alt="hasSchedule"
                />
                <span>일정 있음</span>
              </div>
              <div className="flex gap-1">
                <Image
                  src="/icons/noSchedule.svg"
                  width={16}
                  height={16}
                  alt="noSchedule"
                />
                <span>일정 없음</span>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex items-end gap-[4px] absolute right-[10px] whitespace-nowrap">
          <div className="relative w-fit font-Pretendard font-semibold text-[16px] leading-[24px]">
            {selectedMonth}월 /
          </div>
          <div className="relative w-fit font-Pretendard font-semibold text-[16px] leading-[24px] text-[#1D4ED8]">
            {selectedMonthTotal}건
          </div>
        </div>
      </div>
    </div>
  )
}
