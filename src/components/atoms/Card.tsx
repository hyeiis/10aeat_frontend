/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image'

import { useEffect, useState } from 'react'
import chat_line from '../../../public/icons/chat_line.svg'
import { useAccessToken } from '../store/AccessTokenStore'

export enum CardStyle {
  ALL = 'ALL',
  NO_IMG = 'NO_IMG',
  NO_PERIOD = 'NO_PERIOD',
  ALL_NO = 'ALL_NO',
}

interface Props {
  id?: number
  cardStyle: CardStyle
  isSave: boolean
  img_src?: string
  title: string
  start?: string
  end?: string
  redDot?: boolean
  state: string
  name: string
  view: number
  comment: number
  onClickFunction?: () => Promise<void> | void
  // children?: string
}

export default function Card({
  id,
  cardStyle,
  isSave,
  img_src,
  redDot,
  title,
  start,
  end,
  state,
  name,
  view,
  comment,
  onClickFunction,
}: Props) {
  const selectCard = () => {
    const { accessToken } = useAccessToken()
    const [saveState, setSaveState] = useState(isSave)

    const handleStarClick = (event: React.MouseEvent) => {
      event.stopPropagation()
      setSaveState(!saveState)
    }
    const startData = start
      ? `${start[0].toString().slice(2, 4)}.${start[1].toString().padStart(2, '0')}.${start[1].toString().padStart(2, '0')}`
      : ''
    const endData = end
      ? `~ ${end[0].toString().slice(2, 4)}.${end[1].toString().padStart(2, '0')}.${end[1].toString().padStart(2, '0')}`
      : ''
    const date = `${startData} ${endData}`

    const handleSave = async (event: React.MouseEvent) => {
      event.stopPropagation()

      try {
        const method = saveState ? 'DELETE' : 'POST'
        const response = await fetch(
          `https://api.10aeat.com/repair/articles/save/${id}`,
          {
            method,
            headers: {
              AccessToken: accessToken,
            },
          },
        )

        if (response.ok) {
          setSaveState(!saveState)
        } else {
          console.error('Failed to save or delete the article')
        }
      } catch (error) {
        console.log(error)
      }
    }

    switch (cardStyle) {
      case CardStyle.ALL:
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            onClick={onClickFunction}
            className="inline-flex flex-col items-start gap-[8px] relative shadow-[0_4px_30px_0px_rgba(75,85,9,0.04)]"
          >
            <div className="flex flex-wrap w-[343px] h-[124px] items-end gap-[8px_10px] p-[16px] bg-[#ffffff] rounded-[18px] relative shadow-[0_4px_30px_0px_rgba(75,85,9,0.04)]">
              <div className="flex w-[311px] items-center gap-[10px] relative">
                <img
                  className="relative w-[56px] h-[56px] object-cover rounded-lg"
                  alt="Rectangle"
                  src={img_src}
                />
                <div className="inline-flex flex-col items-start gap-[5px] relative flex-[0_0_auto] mr-[-1.00px]">
                  <div className="flex w-[246px] items-start gap-[12px] relative flex-[0_0_auto]">
                    {redDot && (
                      <Image
                        src="/icons/dot.svg"
                        width={8}
                        height={8}
                        alt="issue"
                        className="absolute top-[3px] left-[-14px] transform translate-x-1/2 -translate-y-1/2"
                      />
                    )}
                    <div className="relative flex-1 h-[27px] mt-[-1.00px] font-Pretendard font-bold text-[18px] tracking-[-0.34px] leading-[27px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {title}
                    </div>
                    <Image
                      src={`${saveState ? '/icons/star_fill.svg' : '/icons/star_linear.svg'}`}
                      onClick={handleSave}
                      width={28}
                      height={28}
                      alt="image"
                      className="!relative !w-[24px] !h-[24px]"
                    />
                  </div>

                  <div className="relative self-stretch h-[20px] text-gray-600 font-Pretendard whitespace-nowrap text-sm font-normal">
                    진행기간 : {date}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start relative flex-1 grow">
                <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-[10px] relative flex-[0_0_auto]">
                    <div
                      className={`text-base font-semibold font-Pretendard ${
                        state === '진행중'
                          ? 'text-green-500'
                          : state === '대기'
                            ? 'text-gray-500'
                            : 'text-blue-500'
                      }`}
                    >
                      {state}
                    </div>
                    <div className="relative w-px h-[16px] bg-[#d9d9d9]" />
                    <div className="text-sm font-normal relative w-fit  text-gray-500 font-Pretendard">
                      {name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-end gap-[8px] relative flex-[0_0_auto]">
                <div className="inline-flex items-start gap-[4px] relative flex-[0_0_auto]">
                  <Image
                    src="/icons/eye.svg"
                    width={20}
                    height={20}
                    alt="image"
                    className="!relative !w-[20px] !h-[20px]"
                  />
                  <div className="text-sm font-normal relative w-fit text-gray-600 text-right whitespace-nowrap font-Pretendard ">
                    {view}
                  </div>
                </div>
                <div className="inline-flex items-start gap-[4px] relative flex-[0_0_auto]">
                  {/* <ChatLine className="!relative !w-[20px] !h-[20px]" /> */}
                  <Image
                    src="/icons/chat_line.svg"
                    width={20}
                    height={20}
                    alt="image"
                    className="!relative !w-[20px] !h-[20px]"
                  />
                  <div className="text-sm font-normal relative w-fit text-gray-600 text-right whitespace-nowrap font-Pretendard">
                    {comment}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case CardStyle.NO_IMG:
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            onClick={onClickFunction}
            className="inline-flex flex-col items-start gap-[8px] relative shadow-[0_4px_30px_0px_rgba(75,85,9,0.04)]"
          >
            <div className="flex flex-wrap w-[343px] h-[124px] items-end gap-[8px_10px] p-[16px] bg-[#ffffff] rounded-[18px] relative shadow-[0_4px_30px_0px_rgba(75,85,9,0.04)]">
              <div className="flex w-[311px] items-center gap-[10px] relative">
                <div className="flex flex-col items-start gap-[5px] relative ">
                  <div className="flex w-[311px] items-start gap-[12px] relative flex-[0_0_auto]">
                    {redDot && (
                      <Image
                        src="/icons/dot.svg"
                        width={8}
                        height={8}
                        alt="issue"
                        className="absolute top-[3px] left-[-14px] transform translate-x-1/2 -translate-y-1/2"
                      />
                    )}
                    <div className="relative flex-1 h-[27px] mt-[-1.00px] font-Pretendard font-bold text-[18px] tracking-[-0.34px] leading-[27px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {title}
                    </div>
                    <Image
                      src={`${saveState ? '/icons/star_fill.svg' : '/icons/star_linear.svg'}`}
                      onClick={handleSave}
                      width={28}
                      height={28}
                      alt="image"
                      className="!relative !w-[24px] !h-[24px]"
                    />
                  </div>

                  <div className="relative self-stretch h-[20px] text-gray-600 font-Pretendard whitespace-nowrap text-sm font-normal">
                    진행기간 : {date}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start relative flex-1 grow">
                <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto]">
                  <div className="inline-flex items-center gap-[10px] relative flex-[0_0_auto]">
                    <div
                      className={`text-base font-semibold font-Pretendard ${
                        state === '진행중'
                          ? 'text-green-500'
                          : state === '대기'
                            ? 'text-gray-500'
                            : 'text-blue-500'
                      }`}
                    >
                      {state}
                    </div>
                    <div className="relative w-px h-[16px] bg-[#d9d9d9]" />
                    <div className="text-sm font-normal relative w-fit  text-gray-500 font-Pretendard">
                      {name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-flex items-end gap-[8px] relative flex-[0_0_auto]">
                <div className="inline-flex items-start gap-[4px] relative flex-[0_0_auto]">
                  <Image
                    src="/icons/eye.svg"
                    width={20}
                    height={20}
                    alt="image"
                    className="!relative !w-[20px] !h-[20px]"
                  />
                  <div className="text-sm font-normal relative w-fit mt-[-1.00px] text-gray-600 text-right whitespace-nowrap font-Pretendard">
                    {view}
                  </div>
                </div>
                <div className="inline-flex items-start gap-[4px] relative flex-[0_0_auto]">
                  {/* <ChatLine className="!relative !w-[20px] !h-[20px]" /> */}
                  <Image
                    src="/icons/chat_line.svg"
                    width={20}
                    height={20}
                    alt="image"
                    className="!relative !w-[20px] !h-[20px]"
                  />
                  <div className="text-sm font-normal relative w-fit mt-[-1.00px] text-gray-600 text-right whitespace-nowrap font-Pretendard">
                    {comment}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case CardStyle.ALL_NO:
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            onClick={onClickFunction}
            className="inline-flex flex-col items-start gap-[8px] relative shadow-[0_4px_30px_0px_rgba(75,85,9,0.04)]"
          >
            <div className="flex flex-wrap w-[343px] h-[124px] items-end gap-[8px_10px] p-[16px] bg-[#ffffff] rounded-[18px] relative shadow-[0_4px_30px_0px_rgba(75,85,9,0.04)]">
              <div className="inline-flex items-end gap-[8px] relative flex-[0_0_auto]">
                <div className="flex w-[275px] h-[56px] items-center gap-[8px] relative">
                  {redDot && (
                    <Image
                      src="/icons/dot.svg"
                      width={8}
                      height={8}
                      alt="issue"
                      className="absolute top-[14px] left-[-14px] transform translate-x-1/2 -translate-y-1/2"
                    />
                  )}
                  <div className="relative flex-1 h-[27px] mt-[-1.00px] font-Pretendard font-bold text-[18px] tracking-[-0.34px] leading-[27px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {title}
                  </div>
                </div>

                <div className="flex flex-col w-[24px] items-start gap-[8px] relative self-stretch">
                  <Image
                    src={`${saveState ? '/icons/star_fill.svg' : '/icons/star_linear.svg'}`}
                    onClick={handleSave}
                    width={28}
                    height={28}
                    alt="image"
                    className="!relative !w-[24px] !h-[24px]"
                  />
                </div>
              </div>
              <div className="flex w-[311px] items-end gap-[8px] relative">
                <div className="flex items-center relative flex-1 grow">
                  <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto]">
                    <div className="inline-flex items-center gap-[10px] relative flex-[0_0_auto]">
                      <div
                        className={`text-base font-semibold font-Pretendard ${
                          state === '진행중'
                            ? 'text-green-500'
                            : state === '대기'
                              ? 'text-gray-500'
                              : 'text-blue-500'
                        }`}
                      >
                        {state}
                      </div>
                      <div className="relative w-px h-[16px] bg-[#d9d9d9]" />
                      <div className="text-sm font-normal relative w-fit  text-gray-500 font-Pretendard">
                        {name}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-end gap-[8px] relative flex-[0_0_auto]">
                  <div className="inline-flex items-start gap-[4px] relative flex-[0_0_auto]">
                    <Image
                      src="/icons/eye.svg"
                      width={20}
                      height={20}
                      alt="image"
                      className="!relative !w-[20px] !h-[20px]"
                    />
                    <div className="text-sm font-normal relative w-fit text-gray-600 text-right whitespace-nowrap font-Pretendard ">
                      {view}
                    </div>
                  </div>
                  <div className="inline-flex items-start gap-[4px] relative flex-[0_0_auto]">
                    {/* <ChatLine className="!relative !w-[20px] !h-[20px]" /> */}
                    <Image
                      src="/icons/chat_line.svg"
                      width={20}
                      height={20}
                      alt="image"
                      className="!relative !w-[20px] !h-[20px]"
                    />
                    <div className="text-sm font-normal relative w-fit text-gray-600 text-right whitespace-nowrap font-Pretendard">
                      {comment}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case CardStyle.NO_PERIOD:
        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            onClick={onClickFunction}
            className="inline-flex flex-col items-start gap-[8px] relative shadow-[0_4px_30px_0px_rgba(75,85,9,0.04)]"
          >
            <div className="flex flex-wrap w-[343px] h-[124px] items-end gap-[8px_10px] p-[16px] bg-[#ffffff] rounded-[18px] relative shadow-[0_4px_30px_0px_rgba(75,85,9,0.04)]">
              <div className="inline-flex items-end gap-[8px] relative flex-[0_0_auto]">
                <div className="flex w-[275px] h-[56px] items-center gap-[8px] relative">
                  <img
                    className="relative w-[56px] h-[56px] object-cover rounded-lg"
                    alt="Rectangle"
                    src={img_src}
                  />
                  {redDot && (
                    <Image
                      src="/icons/dot.svg"
                      width={8}
                      height={8}
                      alt="issue"
                      className="absolute top-[12px] left-[56px] transform translate-x-1/2 -translate-y-1/2"
                    />
                  )}
                  <div className="relative flex-1 h-[27px] mt-[-1.00px] font-Pretendard font-bold text-[18px] tracking-[-0.34px] leading-[27px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {title}
                  </div>
                </div>
                <div className="flex flex-col w-[24px] items-start gap-[8px] relative self-stretch">
                  <Image
                    src={`${saveState ? '/icons/star_fill.svg' : '/icons/star_linear.svg'}`}
                    onClick={handleSave}
                    width={28}
                    height={28}
                    alt="image"
                    className="!relative !w-[24px] !h-[24px]"
                  />
                </div>
              </div>
              <div className="flex w-[311px] items-end gap-[8px] relative">
                <div className="flex items-center relative flex-1 grow">
                  <div className="inline-flex flex-col itmes-start gap-[8px] relative flex-[0_0_auto]">
                    <div className="inline-flex items-center gap-[10px] relative flex-[0_0_auto]">
                      <div
                        className={`text-base font-semibold font-Pretendard ${
                          state === '진행중'
                            ? 'text-green-500'
                            : state === '대기'
                              ? 'text-gray-500'
                              : 'text-blue-500'
                        }`}
                      >
                        {state}
                      </div>
                      <div className="relative w-px h-[16px] bg-[#d9d9d9]" />
                      <div className="text-sm font-normal relative w-fit  text-gray-500 font-Pretendard">
                        {name}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-end gap-[8px] relative flex-[0_0_auto]">
                  <div className="inline-flex items-start gap-[4px] relative flex-[0_0_auto]">
                    <Image
                      src="/icons/eye.svg"
                      width={20}
                      height={20}
                      alt="image"
                      className="!relative !w-[20px] !h-[20px]"
                    />
                    <div className="text-sm font-normal relative w-fit text-gray-600 text-right whitespace-nowrap font-Pretendard ">
                      {view}
                    </div>
                  </div>
                  <div className="inline-flex items-start gap-[4px] relative flex-[0_0_auto]">
                    {/* <ChatLine className="!relative !w-[20px] !h-[20px]" /> */}
                    <Image
                      src="/icons/chat_line.svg"
                      width={20}
                      height={20}
                      alt="image"
                      className="!relative !w-[20px] !h-[20px]"
                    />
                    <div className="text-sm font-normal relative w-fit text-gray-600 text-right whitespace-nowrap font-Pretendard">
                      {comment}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }
  return <>{selectCard()}</>
}
