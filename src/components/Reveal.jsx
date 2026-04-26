import { motion, useReducedMotion } from 'framer-motion'

function Reveal({ className = '', delay = 0, children }) {
  const reduceMotion = useReducedMotion()

  const initial = reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }
  const whileInView = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
