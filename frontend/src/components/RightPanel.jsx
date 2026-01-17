export default function RightPanel() {
  return (
    <aside className="w-72 bg-white border-l px-4 py-6">
      <h3 className="text-sm font-semibold mb-4">Projects</h3>

      <div className="space-y-3 text-sm text-gray-600">
        <Project title="Chai Shop" />
        <Project title="Weekly Sales" />
        <Project title="Festival Offers" />
      </div>
    </aside>
  )
}

function Project({ title }) {
  return (
    <div className="px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
      {title}
    </div>
  )
}
