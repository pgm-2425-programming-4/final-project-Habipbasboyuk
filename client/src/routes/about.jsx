import Header from '../components/header/header.jsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <>
      <Header />
      <div className="about-page">
        <h1>Over deze pagina</h1>
        <p>
          Welkom op de over-pagina! Dit project is gemaakt als onderdeel van het vak Programmeren 4 aan Arteveldehogeschool.
        </p>
        <h2>Doel van het project</h2>
        <p>
          Het doel van dit project is om ervaring op te doen met moderne webtechnologieën zoals React, routing, en component-based development.
        </p>
        <h2>Gebruikte technologieën</h2>
        <ul>
          <li>React</li>
          <li>@tanstack/react-router</li>
          <li>CSS Modules</li>
          <li>Node.js (voor de backend)</li>
        </ul>
        <h2>Over de ontwikkelaar</h2>
        <p>
          Deze applicatie is ontwikkeld door Habip Basboyuk. Voor vragen of feedback kun je contact opnemen via e-mail.
        </p>
      </div>
    </>
  )
}