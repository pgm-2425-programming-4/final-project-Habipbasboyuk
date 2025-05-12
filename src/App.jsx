
import "./App.css";

function App() {
  return (
    <section className="task-container">
      <div>
        <p>To Do's</p>

        <article className="task-card">
          <button className="task-card__button btn">Development</button>

          <p className="task-card__name">Code something semantic</p>
          <p className="task-card__date">19/05/2006</p>
        </article>
      </div>

      <div>
        <p>In progress</p>

        <article className="task-card">
          <button className="task-card__button btn">Development</button>

          <p className="task-card__name">Code something semantic</p>
          <p className="task-card__date">19/05/2006</p>
        </article>
      </div>

      <div>


        <p>Done</p>

        <article className="task-card">


          <button className="task-card__button btn ">Development</button>

          <p className="task-card__name">Code something semantic</p>
          <p className="task-card__date">19/05/2006</p>


        </article>


      </div>
    </section>
  );
}

export default App;
