import { Order, useMcDonaldsOrders } from '../_contexts/order-context'

type OrderCardProps = {
    item: Order
    isComplete?: boolean
}

const OrderCard = ({ item, isComplete }: OrderCardProps) => {
    const type = item.customerType
    const { removeCompleteOrders } = useMcDonaldsOrders()
    return (
        <div
            className={`rounded-[1.35rem] border px-4 py-4 border-[#f1cf86] ${type === 'VIP' ? 'bg-emerald-200' : 'bg-[#fff6dd]'} `}>
            <div className='flex items-center justify-between gap-3'>
                <span className='text-xs font-semibold uppercase tracking-[0.16em] text-[#7a6656]'>
                    {item.customerType}
                </span>
                <span className='text-xs font-semibold uppercase tracking-[0.16em] text-[#7a6656]'>
                    {item.customerName}
                </span>
                <span className='heading-face text-lg uppercase text-[#231b15]'>no. {item.id}</span>
            </div>
            <div className='flex justify-between'>
                <p className='mt-2 text-sm leading-6 text-[#4e433a]'>{item.menu}</p>
                {isComplete && (
                    <button
                        className='cursor-pointer rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] bg-[#d2472a] text-white'
                        onClick={() => removeCompleteOrders(item.id)}>
                        Delete
                    </button>
                )}
            </div>
        </div>
    )
}
export default OrderCard
