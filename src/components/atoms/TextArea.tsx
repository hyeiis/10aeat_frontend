/* eslint-disable no-plusplus */
// 'use client'

import { useState } from 'react'

interface TextAreaProps {
  count?: number
  placeholder?: string
  width?: string
  text?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function TextArea({
  count = 0,
  placeholder = '내용을 입력하세요.',
  width = '421px',
  text = '16px',
  value,
  onChange,
}: TextAreaProps) {
  const [textLength, setTextLength] = useState<number>(0)

  // const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const { value } = event.target
  //   let length = 0
  //   for (let i = 0; i < value.length; i++) {
  //     const charCode = value.charCodeAt(i)
  //     if (charCode >= 0 && charCode <= 128) {
  //       length += 1
  //     } else {
  //       length += 3
  //     }

  //     if (length <= count) {
  //       setTextLength(length)
  //       onChange(value)
  //     }
  //   }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && count < 40) {
      event.preventDefault()
    }
  }

  return (
    <div
      className={`flex flex-col gap-[4px] h-auto font-Pretendard text-gray-700 text-[${text}] leading-[24px] font-normal`}
      style={{ width }}
    >
      <textarea
        className={`custom-scrollbar flex items-center w-[100%] ${count >= 40 ? 'h-[142px]' : 'h-[48px]'} py-[12px] gap-[10px] pl-[16px] pr-[0px] border rounded-[10px] focus:outline-none focus:shadow-inputFocus focus:border-blue-600 placeholder-gray-400 disabled:gray-100 border-gray-300 resize-none ${count >= 40 ? '' : 'scrollbar-hide'}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      {count ? (
        <div className="self-stretch text-right text-[12px] leading-[18px] text-gray-400">
          {textLength}/{count}
        </div>
      ) : null}
    </div>
  )
}
