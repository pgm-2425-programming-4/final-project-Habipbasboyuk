import Header from '../components/header/header.jsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
    <Header />

        <div className="home-text">
      <h3>Welcome Home!</h3>
      Kies een project om te starten
    </div>
    </>

  )
}