import { createFileRoute } from '@tanstack/react-router'
import App from '../../App.jsx'
export const Route = createFileRoute('/projects/$projectId')({
  component: RouteComponent,
})

function RouteComponent() {

    const {projectId} = Route.useParams();

  return <App projectId={projectId} />
}
