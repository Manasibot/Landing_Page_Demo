export const AssessBackground = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="assess-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M20 0 L20 40" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
        <path d="M0 20 L40 20" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="1" />
        <circle cx="20" cy="20" r="3" fill="rgba(59, 130, 246, 0.2)" />
        <animateTransform
          attributeName="patternTransform"
          type="translate"
          from="0 0"
          to="40 0"
          dur="20s"
          repeatCount="indefinite"
        />
      </pattern>
      <radialGradient id="assess-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
        <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#assess-pattern)" />
    <rect width="100%" height="100%" fill="url(#assess-glow)" opacity="0.3" />
  </svg>
)

export const AlignBackground = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="align-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <circle cx="30" cy="30" r="20" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="1" fill="none" />
        <circle cx="30" cy="30" r="15" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="1" fill="none" />
        <circle cx="30" cy="30" r="10" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="1" fill="none" />
        <line x1="30" y1="0" x2="30" y2="60" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="1" />
        <line x1="0" y1="30" x2="60" y2="30" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="1" />
        <circle cx="30" cy="30" r="3" fill="rgba(245, 158, 11, 0.2)">
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        </circle>
        <animateTransform
          attributeName="patternTransform"
          type="scale"
          values="1;1.1;1"
          dur="8s"
          repeatCount="indefinite"
        />
      </pattern>
      <radialGradient id="align-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(245, 158, 11, 0.1)" />
        <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#align-pattern)" />
    <rect width="100%" height="100%" fill="url(#align-glow)" opacity="0.3" />
  </svg>
)

export const AscendBackground = () => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="ascend-pattern" x="0" y="0" width="50" height="100" patternUnits="userSpaceOnUse">
        <path d="M25 0 L25 100" stroke="rgba(168, 85, 247, 0.1)" strokeWidth="1" />
        <path d="M0 50 L50 50" stroke="rgba(168, 85, 247, 0.1)" strokeWidth="1" />
        <polygon points="25,0 20,15 30,15" fill="rgba(168, 85, 247, 0.2)" />
        <polygon points="25,100 20,85 30,85" fill="rgba(168, 85, 247, 0.2)" />
        <animateTransform
          attributeName="patternTransform"
          type="translate"
          from="0 0"
          to="0 -100"
          dur="15s"
          repeatCount="indefinite"
        />
      </pattern>
      <linearGradient id="ascend-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(168, 85, 247, 0.05)" />
        <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#ascend-pattern)" />
    <rect width="100%" height="100%" fill="url(#ascend-gradient)" />
  </svg>
)