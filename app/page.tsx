'use client'

import AddBot from './_components/AddBot'
import CompleteOrderArea from './_components/CompleteOrderArea'
import NewOrderBtn from './_components/NewOrderBtn'
import PendingOrderArea from './_components/PendingOrderArea'
import ProcessingOrderArea from './_components/ProcessingOrderArea'

export default function Home() {
    return (
        <main className='mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-8 sm:px-10 lg:px-12 lg:py-12'>
            <section className='reveal overflow-hidden rounded-4xl border border-black/10 bg-white/70 p-6 shadow-[0_24px_70px_rgba(43,33,24,0.10)] backdrop-blur sm:p-8 lg:p-10'>
                <div className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
                    <div className='max-w-3xl'>
                        <p className='mb-4 inline-flex rounded-full border border-[#d2472a]/15 bg-[#fff4ef] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#b34123]'>
                            Feedme SE test
                        </p>
                        <h1 className='heading-face max-w-2xl text-4xl uppercase leading-[0.92] text-balance text-[#211b15] sm:text-5xl lg:text-7xl'>
                            FeedMe order controller app
                        </h1>
                        <p className='mt-4 max-w-2xl text-base leading-7 text-[#5f554c] sm:text-lg'>
                            A food-ordering frontend prototype made by NextJS.
                        </p>
                    </div>
                </div>
            </section>

            <section className='grid gap-4 lg:grid-cols-[0.7fr_0.3fr]'>
                <div className='reveal delay-1 rounded-[1.75rem] border border-black/10 bg-white/70 p-6 shadow-[0_20px_55px_rgba(43,33,24,0.08)] backdrop-blur'>
                    <p className='text-xs font-semibold uppercase tracking-[0.22em] text-[#9f3e22]'>Start Ordering</p>
                    <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                        <NewOrderBtn label={'Add new normal order'} orderType={'normal'} />
                        <NewOrderBtn label={'Add new VIP order'} orderType={'vip'} />
                    </div>
                </div>

                <AddBot />
            </section>

            <section className='grid gap-4 xl:grid-cols-3'>
                <div>
                    <PendingOrderArea />
                </div>
                <div>
                    <ProcessingOrderArea />
                </div>
                <div>
                    <CompleteOrderArea />
                </div>
            </section>
        </main>
    )
}
