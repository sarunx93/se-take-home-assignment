'use client'

import { useMcDonaldsOrders } from '../_contexts/order-context'

const AddBot = () => {
    const { bots, increaseBots, decreaseBots } = useMcDonaldsOrders()
    return (
        <div className='reveal delay-2 flex h-full flex-col rounded-[1.75rem] border border-black/10 bg-[#d2472a] p-6 text-white shadow-[0_20px_55px_rgba(210,71,42,0.18)]'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-[#ffe6cc]'>Bot</p>
            <div className='mt-4 grid flex-1 content-center grid-cols-1 gap-3'>
                <p>Active Bots: {bots.length}</p>
                <button
                    className='flex items-center justify-center rounded-2xl border border-white/15 bg-white px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-amber-600 cursor-pointer'
                    onClick={() => increaseBots(1)}>
                    Add Bot
                </button>

                <button
                    className='flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd69e] cursor-pointer'
                    onClick={() => decreaseBots(1)}>
                    Delete Bot
                </button>
            </div>
        </div>
    )
}
export default AddBot
