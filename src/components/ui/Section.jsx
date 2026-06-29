import './Section.css'

export default function Section({
  id,
  children,
  variant = 'default',
  className = '',
}) {
  const classNames = ['section', `section--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={classNames}>
      <div className="section__inner">{children}</div>
    </section>
  )
}
