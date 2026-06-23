import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  confirmText, 
  cancelText, 
  onConfirm,
  variant = "danger" // "danger", "warning", "info"
}) => {
  const variants = {
    danger: {
      icon: AlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      confirmBg: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
      borderColor: "border-red-200"
    },
    warning: {
      icon: AlertTriangle,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      confirmBg: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
      borderColor: "border-yellow-200"
    },
    info: {
      icon: AlertTriangle,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      confirmBg: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      borderColor: "border-blue-200"
    }
  };

  const currentVariant = variants[variant];
  const IconComponent = currentVariant.icon;

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.75,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
        delay: 0.1
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.15,
        duration: 0.3
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.3
      }
    }
  };

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div 
              className="relative bg-white rounded-2xl shadow-2xl p-0 w-full max-w-md"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </motion.button>

              {/* Content */}
              <div className="p-6 pt-8">
                {/* Icon */}
                <motion.div 
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${currentVariant.iconBg} mb-4`}
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <IconComponent className={`h-6 w-6 ${currentVariant.iconColor}`} />
                </motion.div>

                {/* Title & Message */}
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                    {title}
                  </h3>

                  <p className="text-gray-600 text-center text-sm leading-relaxed mb-6">
                    {message}
                  </p>
                </motion.div>

                {/* Actions */}
                <motion.div 
                  className="flex flex-col-reverse sm:flex-row sm:justify-center gap-3"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.button
                    type="button"
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {cancelText || "Cancel"}
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    className={`w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${currentVariant.confirmBg}`}
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {confirmText || "Confirm"}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ConfirmModal;


