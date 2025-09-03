import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    
    // Delete all existing users
    await payload.delete({
      collection: 'users',
      where: {},
    })

    // Create new admin user
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'bufordeeds8@gmail.com',
        password: 'SkateLandWest2025!',
        role: 'admin',
        name: 'Admin User',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully!',
      credentials: {
        email: 'bufordeeds8@gmail.com',
        password: 'SkateLandWest2025!',
        loginUrl: '/admin'
      }
    })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { 
      status: 500 
    })
  }
}