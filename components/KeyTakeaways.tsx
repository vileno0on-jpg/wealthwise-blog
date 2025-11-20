interface KeyTakeawaysProps {
  items: string[]
  title?: string
}

export default function KeyTakeaways({ items, title = 'Key Takeaways' }: KeyTakeawaysProps) {
  return (
    <div className="my-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-xl">
      <h3 className="text-3xl font-bold mb-6">{title}</h3>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
              {index + 1}
            </span>
            <span className="text-lg leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

