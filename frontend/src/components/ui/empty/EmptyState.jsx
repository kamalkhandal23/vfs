import { motion } from "framer-motion";
import { FolderOpen } from "lucide-react";

export default function EmptyState({
  icon: Icon = FolderOpen,
  title = "No Data Found",
  description = "There’s nothing to show here yet.",
  children,
  className = "",
}) {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center text-center p-8 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800">
        <Icon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>

      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
}
