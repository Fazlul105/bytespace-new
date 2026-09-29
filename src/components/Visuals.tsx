import Icon from './Icon'
export function AvatarStack({ compact = false }: { compact?: boolean }) {
  const names = compact
    ? ['bearded', 'curly', 'woman', 'man']
    : ['mentor', 'bearded', 'maker', 'cyclist', 'traveler', 'glasses', 'hiker']
  return (
    <div
      className={`avatar-stack ${compact ? 'compact' : ''}`}
      aria-hidden="true"
    >
      {names.map((name) => (
        <img
          key={name}
          src={`/assets/avatar-${name}.webp`}
          alt=""
          width="40"
          height="40"
          loading="lazy"
        />
      ))}
      <span>{compact ? '26+' : '2K+'}</span>
    </div>
  )
}
export function StudentCard({ className = '' }: { className?: string }) {
  return (
    <div className={`student-card ${className}`}>
      <p>Happy Students</p>
      <div className="student-rating">
        4.5 <span>(240)</span>
        <Icon name="star" />
      </div>
      <AvatarStack />
    </div>
  )
}
export function ProgressCard({ className = '' }: { className?: string }) {
  return (
    <div className={`progress-card ${className}`}>
      <p>Learning Progress</p>
      <strong>55%</strong>
      <div className="progress-track">
        <span />
      </div>
    </div>
  )
}
const heroOrnaments = [
  ['spring-white', 1123.93, 672, 331.535],
  ['spring-lime', -121.581, 221, 386.791],
  ['spring-small-white', 183.814, 477, 175.814],
  ['torus-white', 14.4082, 681.26, 343.684],
  ['cylinder-lime', 1227.11, 220.199, 371.822],
  ['pyramid-white', 1104.03, 463.593, 188.926],
] as const
const creatorOrnaments = [
  ['pyramid-lime', 1078.03, -0.41, 188.926],
  ['spring-upright-lime', 1106.93, 289, 331.535],
  ['spring-tilted-lime', -121.581, -162, 386.791],
  ['spring-small-white', 178.814, 5, 175.814],
  ['cone-white', -49.9746, 224.59, 188.926],
  ['torus-lime', 16.4082, 298.26, 343.684],
  ['cylinder-white', 1222.11, 5.2, 371.822],
] as const
export function Ornaments({ variant }: { variant: 'hero' | 'creator' }) {
  return (
    <div className={`ornament-canvas ${variant}-ornaments`} aria-hidden="true">
      {(variant === 'hero' ? heroOrnaments : creatorOrnaments).map(
        ([name, x, y, size]) => (
          <img
            key={name}
            src={`/assets/ornament-${variant}-${name}.svg`}
            alt=""
            style={{ left: x, top: y, width: size, height: size }}
            loading={variant === 'hero' ? 'eager' : 'lazy'}
          />
        ),
      )}
    </div>
  )
}
