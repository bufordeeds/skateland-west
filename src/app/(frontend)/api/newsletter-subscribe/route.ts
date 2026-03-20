import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json()

    if (!email || !/^\S[^\s@]*@\S+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }

    const listmonkUrl = process.env.LISTMONK_URL
    const listmonkUser = process.env.LISTMONK_API_USER
    const listmonkToken = process.env.LISTMONK_API_TOKEN
    const listmonkListId = parseInt(process.env.LISTMONK_LIST_ID || '1', 10)

    if (!listmonkUrl || !listmonkUser || !listmonkToken) {
      console.error('Missing Listmonk environment variables')
      return NextResponse.json(
        { error: 'Newsletter service is not configured.' },
        { status: 500 },
      )
    }

    const response = await fetch(`${listmonkUrl}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${listmonkUser}:${listmonkToken}`,
      },
      body: JSON.stringify({
        email,
        name: name || '',
        lists: [listmonkListId],
        status: 'enabled',
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      if (response.status === 409) {
        return NextResponse.json({ error: 'This email is already subscribed.' }, { status: 409 })
      }

      console.error('Listmonk API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter subscribe error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
