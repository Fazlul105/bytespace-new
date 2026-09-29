export default function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`brand ${light ? 'brand-light' : ''}`}
      href="/"
      aria-label="ByteSpace home"
    >
      <img src="/assets/bytespace-mark.svg" width="30" height="33" alt="" />
      <span>ByteSpace</span>
    </a>
  )
}
