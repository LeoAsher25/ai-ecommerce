'use client'

import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import ReactDOM from 'react-dom'

import IcClose from '@/components/Icons/IcClose'
import { ChildrenType } from '@/types/common'
import './index.css'

interface IModalProps extends ChildrenType {
  open: boolean
  onClose?: () => void
  className?: string
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
  contentClassName?: string
}

const Modal = ({
  open,
  children,
  onClose,
  className,
  closeOnOverlayClick = true,
  showCloseButton = true,
  contentClassName,
}: IModalProps) => {
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (open) {
      setIsAnimating(true)
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 300)
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
      return () => clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      // modalRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onClose) {
          onClose()
        }
      }

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab' && contentRef.current) {
          const focusableElements = contentRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          const firstElement = focusableElements[0] as HTMLElement
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus()
              e.preventDefault()
            }
          }
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keydown', handleTabKey)

      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keydown', handleTabKey)
      }
    }
  }, [open, onClose])

  const handleClose = () => {
    if (onClose) onClose()
  }

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      handleClose()
    }
  }

  if (!mounted || typeof document === 'undefined') return null

  return ReactDOM.createPortal(
    <div
      className={clsx('custom-modal', open ? 'active' : '', className)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <div
        className="modal-overlay w-full h-full bg-overlay fixed z-9999 top-0 right-0 bottom-0 left-0"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        className={clsx(
          'modal-content fixed z-9999 left-1/2 top-1/2 p-4 md:p-6 rounded-normal bg-white text-black-primary w-[calc(100vw-30px)] transform -translate-x-1/2 -translate-y-1/2',
          contentClassName
        )}
        ref={contentRef}
      >
        <div className={clsx('max-h-[calc(100vh-190px)] overflow-y-auto overflow-x-visible')}>
          {open || isAnimating ? children : null}
        </div>
        <div className="modal-title">
          {showCloseButton && (
            <button
              onClick={handleClose}
              aria-label="button for close modal"
              className="close-icon absolute shadow-xl top-0 right-0 sm:top-3 sm:right-3 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover:text-dark"
            >
              <IcClose className="duration-300 text-border hover:text-black-secondary" />
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
