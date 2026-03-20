'use client'

import React, { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react'

type CustomerType = 'NORMAL' | 'VIP'
type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETE'

export interface Order {
    id: number
    customerName: string
    customerType: CustomerType
    menu: string
    status: OrderStatus
    createdAt: number
}

export interface Bot {
    id: number
    isBusy: boolean
    currentOrderId: number | null
}

interface State {
    pendingOrders: Order[]
    processingOrders: Order[]
    completedOrders: Order[]
    bots: Bot[]
    activeBotLimit: number
}

type Action =
    | {
          type: 'SUBMIT_ORDER'
          payload: Order
      }
    | {
          type: 'INCREASE_BOTS'
          payload: { count: number; newBots: Bot[] }
      }
    | {
          type: 'DECREASE_BOTS'
          payload: { count: number }
      }
    | {
          type: 'DISPATCH_ORDERS'
      }
    | {
          type: 'COMPLETE_ORDER'
          payload: { botId: number; orderId: number }
      }
    | {
          type: 'REMOVE_COMPLETE_ORDER'
          payload: { orderId: number }
      }

interface ContextValue extends State {
    submitOrder: (customerName: string, customerType: CustomerType, menu: string) => void
    increaseBots: (count?: number) => void
    decreaseBots: (count?: number) => void
    removeCompleteOrders: (id: number) => void
}

const McDonaldsOrderContext = createContext<ContextValue | undefined>(undefined)

const PROCESS_TIME_MS = 10_000

const sortPendingOrders = (orders: Order[]) => {
    return [...orders].sort((a, b) => {
        const pa = a.customerType === 'VIP' ? 1 : 2
        const pb = b.customerType === 'VIP' ? 1 : 2

        if (pa !== pb) return pa - pb
        return a.createdAt - b.createdAt
    })
}

const initialState: State = {
    pendingOrders: [],
    processingOrders: [],
    completedOrders: [],
    bots: [],
    activeBotLimit: 0,
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SUBMIT_ORDER': {
            return {
                ...state,
                pendingOrders: sortPendingOrders([...state.pendingOrders, action.payload]),
            }
        }

        case 'INCREASE_BOTS': {
            return {
                ...state,
                bots: [...state.bots, ...action.payload.newBots],
                activeBotLimit: state.activeBotLimit + action.payload.count,
            }
        }

        case 'DECREASE_BOTS': {
            return {
                ...state,
                activeBotLimit: Math.max(0, state.activeBotLimit - action.payload.count),
            }
        }

        case 'DISPATCH_ORDERS': {
            const pending = [...state.pendingOrders]
            const processing = [...state.processingOrders]
            const bots = [...state.bots]

            const eligibleBotIds = bots.slice(0, state.activeBotLimit).map((b) => b.id)

            for (const botId of eligibleBotIds) {
                const botIndex = bots.findIndex((b) => b.id === botId)
                if (botIndex === -1) continue
                if (bots[botIndex].isBusy) continue
                if (pending.length === 0) break

                const nextOrder = pending.shift()
                if (!nextOrder) break

                const processingOrder: Order = {
                    ...nextOrder,
                    status: 'PROCESSING',
                }

                bots[botIndex] = {
                    ...bots[botIndex],
                    isBusy: true,
                    currentOrderId: processingOrder.id,
                }

                processing.push(processingOrder)
            }

            return {
                ...state,
                pendingOrders: pending,
                processingOrders: processing,
                bots,
            }
        }

        case 'COMPLETE_ORDER': {
            const order = state.processingOrders.find((o) => o.id === action.payload.orderId)

            if (!order) return state

            return {
                ...state,
                processingOrders: state.processingOrders.filter((o) => o.id !== action.payload.orderId),
                completedOrders: [...state.completedOrders, { ...order, status: 'COMPLETE' }],
                bots: state.bots.map((b) =>
                    b.id === action.payload.botId ? { ...b, isBusy: false, currentOrderId: null } : b,
                ),
            }
        }

        case 'REMOVE_COMPLETE_ORDER': {
            const order = state.completedOrders.filter((order) => order.id !== action.payload.orderId)
            return {
                ...state,
                completedOrders: order,
            }
        }

        default:
            return state
    }
}

export function McDonaldsOrderProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const nextOrderIdRef = useRef(1)
    const nextBotIdRef = useRef(1)
    const nextTimestampRef = useRef(1)

    const timersRef = useRef<Record<number, number>>({})

    const submitOrder = (customerName: string, customerType: CustomerType, menu: string) => {
        const order: Order = {
            id: nextOrderIdRef.current++,
            customerName,
            customerType,
            menu,
            status: 'PENDING',
            createdAt: nextTimestampRef.current++,
        }

        dispatch({ type: 'SUBMIT_ORDER', payload: order })
    }

    const increaseBots = (count = 1) => {
        if (count <= 0) return

        const newBots: Bot[] = Array.from({ length: count }, () => ({
            id: nextBotIdRef.current++,
            isBusy: false,
            currentOrderId: null,
        }))

        dispatch({
            type: 'INCREASE_BOTS',
            payload: { count, newBots },
        })
    }

    const decreaseBots = (count = 1) => {
        if (count <= 0) return

        dispatch({
            type: 'DECREASE_BOTS',
            payload: { count },
        })
    }

    const removeCompleteOrders = (orderId: number) => {
        dispatch({
            type: 'REMOVE_COMPLETE_ORDER',
            payload: { orderId },
        })
    }

    useEffect(() => {
        dispatch({ type: 'DISPATCH_ORDERS' })
    }, [state.pendingOrders.length, state.activeBotLimit])

    useEffect(() => {
        state.processingOrders.forEach((order) => {
            if (timersRef.current[order.id]) return

            const bot = state.bots.find((b) => b.currentOrderId === order.id)
            if (!bot) return

            const timerId = window.setTimeout(() => {
                dispatch({
                    type: 'COMPLETE_ORDER',
                    payload: { botId: bot.id, orderId: order.id },
                })
                dispatch({ type: 'DISPATCH_ORDERS' })

                delete timersRef.current[order.id]
            }, PROCESS_TIME_MS)

            timersRef.current[order.id] = timerId
        })
    }, [state.processingOrders, state.bots])

    useEffect(() => {
        const timers = timersRef.current

        return () => {
            Object.values(timers).forEach((timerId) => {
                window.clearTimeout(timerId)
            })
        }
    }, [])

    const value = useMemo(
        () => ({
            ...state,
            submitOrder,
            increaseBots,
            decreaseBots,
            removeCompleteOrders,
        }),
        [state],
    )

    return <McDonaldsOrderContext.Provider value={value}>{children}</McDonaldsOrderContext.Provider>
}

export function useMcDonaldsOrders() {
    const context = useContext(McDonaldsOrderContext)
    if (!context) {
        throw new Error('useMcDonaldsOrders must be used within McDonaldsOrderProvider')
    }
    return context
}
