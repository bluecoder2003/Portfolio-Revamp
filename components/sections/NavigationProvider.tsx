'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Legacy component — redirects to the new route-based pages
const NavigationProvider = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/projects')
  }, [router])

  return null
}

export default NavigationProvider
