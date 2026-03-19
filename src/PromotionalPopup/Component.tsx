import { getCachedGlobal } from '@/utilities/getGlobals'
import type { PromotionalPopup as PromotionalPopupType } from '@/payload-types'
import { PopupClient } from './PopupClient'

export async function PromotionalPopup() {
  const popupData: PromotionalPopupType = await getCachedGlobal('promotional-popup', 1)()

  if (!popupData?.enabled) return null

  return (
    <PopupClient
      title={popupData.title}
      body={popupData.body}
      image={popupData.image}
      ctaButton={popupData.ctaButton}
    />
  )
}
