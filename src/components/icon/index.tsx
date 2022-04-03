import classNames from 'classnames'
type Props = {
  type: string
  onClick?: () => void
  className?: string
}

export default function Icon(props: Props) {
  return (
    <svg
      className={classNames('icon', props.className)}
      aria-hidden="true"
      onClick={props.onClick}
    >
      <use xlinkHref={`#${props.type}`}></use>
    </svg>
  )
}
