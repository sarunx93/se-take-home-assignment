export const queueColumns = [
    {
        title: 'Pending',
        description: 'VIP orders hold position ahead of normal orders in the queue.',
        panelClass: 'border-[#edc77a] bg-white/75 shadow-[0_18px_45px_rgba(130,84,20,0.08)]',
        badgeClass: 'bg-[#fff0c8] text-[#8f5b0f]',
        items: [
            {
                label: 'VIP',
                order: '#1042',
                detail: '2x Big Mac, 1x Fries',
                cardClass: 'border-[#f1cf86] bg-[#fff6dd]',
            },
            {
                label: 'NORMAL',
                order: '#1043',
                detail: '1x McSpicy, 1x Coke',
                cardClass: 'border-[#ead7c4] bg-[#fffdf8]',
            },
            {
                label: 'NORMAL',
                order: '#1044',
                detail: '2x Cheeseburger',
                cardClass: 'border-[#ead7c4] bg-[#fffdf8]',
            },
        ],
    },
    {
        title: 'Processing',
        description: 'Bots work one order at a time and release the next slot on completion.',
        panelClass: 'border-[#e99f7d] bg-white/75 shadow-[0_18px_45px_rgba(210,71,42,0.08)]',
        badgeClass: 'bg-[#ffe0d4] text-[#9e3f22]',
        items: [
            {
                label: 'BOT 01',
                order: '#1041',
                detail: 'VIP order at 00:07 / 10s cycle',
                cardClass: 'border-[#efb49f] bg-[#fff1eb]',
            },
            {
                label: 'BOT 02',
                order: 'IDLE',
                detail: 'Waiting for a new order',
                cardClass: 'border-dashed border-[#efb49f] bg-[#fff9f6]',
            },
        ],
    },
    {
        title: 'Complete',
        description: 'Finished orders move out of the active system as bots free up.',
        panelClass: 'border-[#b7c89e] bg-white/75 shadow-[0_18px_45px_rgba(90,120,45,0.08)]',
        badgeClass: 'bg-[#e4f0d6] text-[#4d6a1f]',
        items: [
            {
                label: 'DONE',
                order: '#1038',
                detail: 'Normal order closed at 14:32:14',
                cardClass: 'border-[#cdddb7] bg-[#f7fbef]',
            },
            {
                label: 'DONE',
                order: '#1040',
                detail: 'VIP order closed at 14:32:25',
                cardClass: 'border-[#cdddb7] bg-[#f7fbef]',
            },
        ],
    },
]

export const setupChecks = [
    'App Router project structure under app/',
    'TypeScript compiler configuration',
    'Tailwind CSS v4 with PostCSS wiring',
    'ESLint config for Next.js + TypeScript',
]

export const nextSteps = [
    'Add in-memory order and bot state.',
    'Implement VIP-first queueing and bot assignment logic.',
    'Replace the static cards with interactive client components.',
]