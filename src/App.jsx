import { Link } from "react-router-dom"
import projects from "./utils";

function App() {


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 font-sans" >Frontend  Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-bold mt-4">{project.title}</h2>
            <p className="mt-2">{project.description}</p>
            <Link
              to={project.src}
              className="inline-block mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              {`Go to ${project.title} Page`}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

}

export default App
