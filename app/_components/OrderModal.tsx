'use client'

import { useCallback, useEffect, useState, type FormEvent, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'

import { useMcDonaldsOrders } from '../_contexts/order-context'

type OrderType = 'normal' | 'vip'

type OrderModalProps = {
    isOpen: boolean
    orderType: OrderType
    onClose: () => void
}

const modalCopy = {
    normal: {
        badge: 'Normal Order',
        title: 'Create a new normal order',
        accentClass: 'text-[#9f3e22]',
        badgeClass: 'bg-[#fff4ef] text-[#b34123]',
        buttonClass: 'bg-[#d2472a] text-white',
    },
    vip: {
        badge: 'VIP Order',
        title: 'Create a new VIP order',
        accentClass: 'text-amber-700',
        badgeClass: 'bg-amber-100 text-amber-700',
        buttonClass: 'bg-amber-500 text-[#2d1405]',
    },
}

export default function OrderModal({ isOpen, orderType, onClose }: OrderModalProps) {
    const { submitOrder } = useMcDonaldsOrders()
    const [orderName, setOrderName] = useState('')
    const [orderedBy, setOrderedBy] = useState('')

    const handleClose = useCallback(() => {
        setOrderName('')
        setOrderedBy('')

        onClose()
    }, [onClose])

    useEffect(() => {
        if (!isOpen) return

        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = originalOverflow
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, handleClose])

    if (!isOpen) return null

    const content = modalCopy[orderType]

    const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const trimmedOrderName = orderName.trim()
        const trimmedOrderedBy = orderedBy.trim()

        if (!trimmedOrderName || !trimmedOrderedBy) {
            return
        }

        const customerType = orderType === 'vip' ? 'VIP' : 'NORMAL'
        const menu = `${trimmedOrderName}`

        submitOrder(trimmedOrderedBy, customerType, menu)
        handleClose()
    }

    return createPortal(
        <div
            aria-hidden={!isOpen}
            className='fixed inset-0 z-9999 flex items-center justify-center bg-black/45 px-4 py-8 backdrop-blur-sm'
            onClick={handleClose}>
            <div
                aria-labelledby='order-modal-title'
                aria-modal='true'
                className='w-full max-w-xl rounded-4xl border border-black/10 bg-[#fffaf3] p-6 shadow-[0_30px_90px_rgba(27,16,8,0.28)] sm:p-8'
                onClick={stopPropagation}
                role='dialog'>
                <div className='flex items-start justify-between gap-4'>
                    <div>
                        <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${content.badgeClass}`}>
                            {content.badge}
                        </span>
                        <h2
                            className={`heading-face mt-4 text-3xl uppercase leading-tight text-balance ${content.accentClass}`}
                            id='order-modal-title'>
                            {content.title}
                        </h2>
                    </div>

                    <button
                        aria-label='Close order modal'
                        className='rounded-full border border-black/10 px-3 py-2 text-sm font-semibold text-[#5f554c] transition hover:bg-black/5'
                        onClick={handleClose}
                        type='button'>
                        Close
                    </button>
                </div>

                <form className='mt-8 grid gap-5' onSubmit={handleSubmit}>
                    <label className='grid gap-2'>
                        <span className='text-xs font-semibold uppercase tracking-[0.18em] text-[#7a6656]'>
                            Order Name
                        </span>
                        <input
                            className='rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#211b15] outline-none transition focus:border-[#d2472a] focus:ring-2 focus:ring-[#d2472a]/15'
                            name='orderName'
                            onChange={(event) => setOrderName(event.target.value)}
                            placeholder='Place your order here'
                            type='text'
                            value={orderName}
                            required
                        />
                    </label>

                    <label className='grid gap-2'>
                        <span className='text-xs font-semibold uppercase tracking-[0.18em] text-[#7a6656]'>
                            Ordered By
                        </span>
                        <input
                            className='rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-[#211b15] outline-none transition focus:border-[#d2472a] focus:ring-2 focus:ring-[#d2472a]/15'
                            name='orderedBy'
                            onChange={(event) => setOrderedBy(event.target.value)}
                            placeholder='Customer name'
                            type='text'
                            value={orderedBy}
                            required
                        />
                    </label>

                    <div className='mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                        <button
                            className='cursor-pointer rounded-2xl border border-black/10 px-5 py-3 text-sm font-semibold text-[#5f554c] transition hover:bg-black/5'
                            onClick={handleClose}
                            type='button'>
                            Cancel
                        </button>
                        <button
                            className={`cursor-pointer rounded-2xl px-5 py-3 text-sm font-semibold transition hover:brightness-95 ${content.buttonClass}`}
                            type='submit'>
                            Submit Order
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body,
    )
}
