export default function Container({children, classes}: {children: React.ReactNode, classes?: string}) {
  return (
    <div className={`max-w-[1000px] mx-auto px-4 ${classes}`}>
      {children}
    </div>
  )
}