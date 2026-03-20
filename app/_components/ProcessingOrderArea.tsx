import { useMcDonaldsOrders } from '../_contexts/order-context'
import OrderCard from './OrderCard'

const ProcessingOrderArea = ({}) => {
    const { processingOrders } = useMcDonaldsOrders()

    return (
        <article
            className={`reveal rounded-[1.75rem] border p-5 backdrop-blur 'border-[#edc77a] bg-white/75 shadow-[0_18px_45px_rgba(130,84,20,0.08)]'
            }`}>
            <div className='flex items-start justify-between gap-3'>
                <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-[#6a5a4a]'>Order flow</p>
                    <h2 className='heading-face mt-2 text-3xl uppercase text-[#201914]'>Processing</h2>
                </div>
                <span className='rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] bg-[#fff0c8] text-[#8f5b0f]'>
                    {processingOrders.length} items
                </span>
            </div>

            {/* Processing Orders */}
            <div className='mt-5 space-y-3'>
                {processingOrders.map((item, index) => (
                    <OrderCard item={item} key={index} />
                ))}
            </div>
        </article>
    )
}
export default ProcessingOrderArea
