'use client'
import { createContext, useContext, useState } from 'react'

interface PreviewSliderType {
  isModalPreviewOpen: boolean
  imagesList: string[]
  setImagesList: (imagesList: string[]) => void
  openPreviewModal: () => void
  closePreviewModal: () => void
}

const PreviewSlider = createContext<PreviewSliderType | undefined>(undefined)

export const usePreviewSlider = () => {
  const context = useContext(PreviewSlider)
  if (!context) {
    throw new Error('usePreviewSlider must be used within a ModalProvider')
  }
  return context
}

export const PreviewSliderProvider = ({ children }) => {
  const [isModalPreviewOpen, setIsModalOpen] = useState(false)
  const [imagesList, setImagesList] = useState<string[]>([])

  const openPreviewModal = () => {
    setIsModalOpen(true)
  }

  const closePreviewModal = () => {
    setIsModalOpen(false)
  }

  return (
    <PreviewSlider.Provider
      value={{
        isModalPreviewOpen,
        imagesList,
        setImagesList,
        openPreviewModal,
        closePreviewModal,
      }}
    >
      {children}
    </PreviewSlider.Provider>
  )
}
