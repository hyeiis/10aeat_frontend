import Image from 'next/image'
import AdminButton, { ButtonStyle } from './AdminButton'

interface Props {
  imgSrc: string
  title: string
  star?: string
  warn?: string
  btnText: string
  selectedItems: string[]
  handleAddItem: () => void
  handleDelete: () => void
}

export default function TableHead({
  imgSrc,
  title,
  star,
  warn,
  btnText,
  selectedItems,
  handleAddItem,
  handleDelete,
}: Props) {
  return (
    <div className="w-full flex justify-between items-end">
      <div className="flex font-Pretendard text-lg font-semibold capitalize gap-x-2 items-center h-fit">
        <Image src={imgSrc} width={24} height={24} alt="list" />
        <span>{title}</span>
        <span className="text-blue-600 text-sm font-medium flex items-center">
          {star}
        </span>
        <span className="text-gray-400 text-sm font-medium">{warn}</span>
      </div>
      <div className="flex gap-x-2">
        <AdminButton
          buttonStyle={ButtonStyle.ACCENT}
          buttonSize="md"
          onClickFunction={handleAddItem}
        >
          <Image
            src="/icons/plus.svg"
            alt="+"
            width={20}
            height={20}
            className="mr-1 whitespace-nowrap"
          />
          {btnText}
        </AdminButton>
        <AdminButton
          buttonStyle={ButtonStyle.WARNING}
          buttonSize="md"
          onClickFunction={handleDelete}
          isDisabled={selectedItems.length === 0}
        >
          삭제
        </AdminButton>
      </div>
    </div>
  )
}
