import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header, SiteSetting } from '@/payload-types'

import { resolveSiteSettings } from '@/lib/siteSettings'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const settings = resolveSiteSettings(
    (await getCachedGlobal('site-settings', 1)()) as SiteSetting,
  )

  return <HeaderClient data={headerData} settings={settings} />
}
