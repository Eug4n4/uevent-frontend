import { http, HttpResponse } from 'msw'

type CheckoutBody = {
  eventId?: string
  quantity?: number
  promoCode?: string
}

export const handlers = [
  http.post('/mock/payments/create-checkout-session', async ({ request }) => {
    const body = (await request.json()) as CheckoutBody
    const now = Date.now()
    return HttpResponse.json({
      sessionId: `cs_test_mocked_${now}`,
      checkoutUrl: `https://checkout.stripe.com/pay/mock-session?event=${body?.eventId ?? 'event'}`,
      mock: true,
    })
  }),
]
