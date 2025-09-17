'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

// Page transition animations
export const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
)

// Card hover animations
export const HoverCard = ({ 
  children, 
  className = '',
  delay = 0 
}: { 
  children: ReactNode
  className?: string
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    whileHover={{ 
      y: -8, 
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      transition: { duration: 0.2 }
    }}
    whileTap={{ scale: 0.98 }}
    className={className}
  >
    {children}
  </motion.div>
)

// Button click animations
export const AnimatedButton = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false
}: { 
  children: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.02 }}
    whileTap={{ scale: disabled ? 1 : 0.98 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    onClick={onClick}
    disabled={disabled}
    className={className}
  >
    {children}
  </motion.button>
)

// Staggered list animations
export const StaggeredList = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode[]
  className?: string
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1
        }
      }
    }}
    className={className}
  >
    {children.map((child, index) => (
      <motion.div
        key={index}
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 }
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {child}
      </motion.div>
    ))}
  </motion.div>
)

// Loading spinner with animation
export const LoadingSpinner = ({ size = 6 }: { size?: number }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    className={`w-${size} h-${size} border-2 border-blue-600 border-t-transparent rounded-full`}
  />
)

// Modal animations
export const AnimatedModal = ({ 
  isOpen, 
  onClose, 
  children 
}: { 
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-51 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            {children}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
)

// Scroll reveal animation
export const ScrollReveal = ({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
)

// Success animation
export const SuccessAnimation = ({ 
  isVisible, 
  message 
}: { 
  isVisible: boolean
  message: string
}) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          transition: { type: 'spring', stiffness: 500, damping: 25 }
        }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          className="flex items-center space-x-2"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-5 h-5 border-2 border-white rounded-full border-t-transparent"
          />
          <span>{message}</span>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

// Counter animation
export const AnimatedCounter = ({ 
  from = 0, 
  to, 
  duration = 2 
}: { 
  from?: number
  to: number
  duration?: number
}) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {to}
      </motion.span>
    </motion.span>
  )
}
