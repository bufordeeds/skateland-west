'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Media as MediaType, PromotionalPopup } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type Props = {
  title: PromotionalPopup['title']
  body: PromotionalPopup['body']
  image: PromotionalPopup['image']
  ctaButton: PromotionalPopup['ctaButton']
}

export const PopupClient: React.FC<Props> = ({ title, body, image, ctaButton }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem('popup-dismissed')
    if (!dismissed) {
      setOpen(true)
    }
  }, [])

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      sessionStorage.setItem('popup-dismissed', 'true')
    }
    setOpen(isOpen)
  }

  const imageData = typeof image === 'object' ? image : null
  const hasBody = body && typeof body === 'object' && 'root' in body
  const hasCta = ctaButton?.label && ctaButton?.url

  // When an image is present, overlay text on the image to avoid scrolling
  if (imageData) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-lg p-0 overflow-hidden border-0 bg-transparent">
          <div className="relative">
            <Media
              resource={imageData as MediaType}
              imgClassName="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white drop-shadow-lg">
                  {title}
                </DialogTitle>
                {!hasBody && (
                  <DialogDescription className="sr-only">
                    Promotional announcement
                  </DialogDescription>
                )}
              </DialogHeader>

              {hasBody && (
                <div className="mt-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-3 [&_h3]:mb-1 [&_p]:text-sm [&_p]:text-gray-200 [&_p]:leading-snug [&_strong]:text-white">
                  <RichText
                    data={body as DefaultTypedEditorState}
                    enableGutter={false}
                    enableProse={false}
                  />
                </div>
              )}

              {hasCta && (
                <div className="flex justify-center pt-3">
                  <Button size="lg" className="font-bold" asChild>
                    <a
                      href={ctaButton.url!}
                      {...(ctaButton.newTab
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {ctaButton.label}
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          {!hasBody && (
            <DialogDescription className="sr-only">Promotional announcement</DialogDescription>
          )}
        </DialogHeader>

        {hasBody && (
          <RichText
            data={body as DefaultTypedEditorState}
            enableGutter={false}
            enableProse={true}
          />
        )}

        {hasCta && (
          <div className="flex justify-center pt-2">
            <Button size="lg" className="font-bold" asChild>
              <a
                href={ctaButton.url!}
                {...(ctaButton.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {ctaButton.label}
              </a>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
