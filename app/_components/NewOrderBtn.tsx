'use client'

import { useState } from 'react'

import OrderModal from './OrderModal'

type OrderType = 'normal' | 'vip'

type NewOrderBtnProps = {
    label: string
    orderType: OrderType
}

const NewOrderBtn = ({ label, orderType }: NewOrderBtnProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <button
                className={`cursor-pointer rounded-2xl border border-black/8 ${
                    orderType === 'normal' ? 'bg-[#fffaf3]' : 'bg-amber-500'
                } px-4 py-4 text-start transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(33,27,21,0.08)]`}
                onClick={() => setIsModalOpen(true)}
                type='button'>
                {label}
            </button>

            <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} orderType={orderType} />
        </>
    )
}

export default NewOrderBtn
