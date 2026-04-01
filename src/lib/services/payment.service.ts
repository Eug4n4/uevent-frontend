export type CheckoutRequest = {
  eventId: string
  quantity: number
  promoCode?: string
}

export type CheckoutSession = {
  sessionId: string
  checkoutUrl?: string
  mock?: boolean
}

const MOCK_ENDPOINT = '/mock/payments/create-checkout-session'

export const PaymentService = {
  async createCheckoutSession(payload: CheckoutRequest): Promise<CheckoutSession> {
    const response = await fetch(MOCK_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    return response.json()
  },
}
