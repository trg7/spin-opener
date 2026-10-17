import type { SVGProps } from 'react'

/** Thin-stroke icon set matching the boards (1.25px at 20px). Decorative by default. */
type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const BagIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 6.5h11l-.8 10.5H5.3L4.5 6.5Z" />
    <path d="M7.5 8V5.5a2.5 2.5 0 0 1 5 0V8" />
  </Icon>
)

export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 10h13M12 5.5l4.5 4.5-4.5 4.5" />
  </Icon>
)

export const ChevronRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m8 5 5 5-5 5" />
  </Icon>
)

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 5 10 10M15 5 5 15" />
  </Icon>
)

export const PlusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M10 5v10M5 10h10" />
  </Icon>
)

export const MinusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 10h10" />
  </Icon>
)

export const CheckCircleIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="10" cy="10" r="7.5" />
    <path d="m6.8 10.2 2.2 2.2 4.2-4.6" />
  </Icon>
)

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 7.5h13M3.5 12.5h13" />
  </Icon>
)

/** Feature row: designed in Melbourne */
export const BookmarkIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 3.5h8v13l-4-3-4 3v-13Z" />
  </Icon>
)

/** Feature row: 3D printed */
export const PrintIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="3.5" width="13" height="13" rx="1" />
    <path d="M3.5 7h13M8 10.5h4M7 13.5h6" />
  </Icon>
)

/** Feature row: gift */
export const GiftIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="7.5" width="13" height="9" rx="0.5" />
    <path d="M2.5 7.5h15M10 7.5v9M10 7.5C8.5 4 5.5 4.5 6.5 6.5 7 7.3 10 7.5 10 7.5ZM10 7.5c1.5-3.5 4.5-3 3.5-1-.5.8-3.5 1-3.5 1Z" />
  </Icon>
)
