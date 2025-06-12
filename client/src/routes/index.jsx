import Header from '../components/header/header.jsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
    <Header />

        <div className="p-2">
      <h3>Welcome Home!</h3>
      Chose a project to see your tasks!
    </div>
    </>

  )
}