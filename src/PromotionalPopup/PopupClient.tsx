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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          {!hasBody && !imageData && (
            <DialogDescription className="sr-only">Promotional announcement</DialogDescription>
          )}
        </DialogHeader>

        {imageData && (
          <div className="rounded-lg overflow-hidden">
            <Media resource={imageData as MediaType} imgClassName="w-full h-auto object-contain" />
          </div>
        )}

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
