'use client'

import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import ReactDOM from 'react-dom'

import IcClose from '@/components/Icons/IcClose'
import { ChildrenType } from '@/types/common'
import './index.css'

type TPosition = 'left' | 'right'

interface IDrawerProps extends ChildrenType {
  open: boolean
  onClose?: () => void
  title?: string
  className?: string
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
  contentClassName?: string
  position?: TPosition
  drawerWidth?: string
}

const Drawer = ({
  open,
  children,
  onClose,
  title,
  className,
  closeOnOverlayClick = true,
  showCloseButton = true,
  contentClassName,
  position = 'right',
  drawerWidth = '450px',
}: IDrawerProps) => {
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
      className={clsx('custom-drawer', open ? 'active' : '', className)}
      role="dialog"
      aria-drawer="true"
      aria-labelledby="drawer-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <div
        className="drawer-overlay w-full h-full bg-overlay fixed top-0 right-0 bottom-0 left-0"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        className={clsx(
          'drawer-content rounded-normal bg-white text-black-primary flex flex-col',
          contentClassName,
          position === 'left' && 'left-0',
          position === 'right' && 'right-0'
        )}
        style={{ width: drawerWidth }}
        ref={contentRef}
      >
        {title && (
          <h3 className="font-semibold text-dark text-xl p-5 border-b border-gray-3 ">{title}</h3>
        )}
        <div className={clsx('overflow-y-auto overflow-x-hidden flex-1')}>
          {open || isAnimating ? children : null}
        </div>
        {showCloseButton && (
          <button
            onClick={handleClose}
            aria-label="button for close modal"
            className="close-icon absolute shadow-xl top-3 right-3 flex items-center justify-center w-10 h-10 rounded-full ease-in duration-150 bg-meta text-body hover:text-dark"
          >
            <IcClose className="duration-300 text-border hover:text-black-secondary" />
          </button>
        )}
      </div>
    </div>,
    document.body
  )
}

export default Drawer
