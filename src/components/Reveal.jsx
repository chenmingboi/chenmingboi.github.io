// Preserve the shared wrapper for older sections. Content stays visible in
// prerendered HTML, with reduced motion, and when JavaScript is unavailable.
function Reveal({ className = '', children }) {
  return <div className={className}>{children}</div>
}

export default Reveal
