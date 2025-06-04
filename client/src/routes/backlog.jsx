import { createFileRoute } from '@tanstack/react-router'
import Backlog from '../components/backlog/Backlog.jsx'
export const Route = createFileRoute('/backlog')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Backlog />
}
