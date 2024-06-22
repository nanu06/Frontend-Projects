import { Link } from "react-router-dom";
import projects from "./utils";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl text-white font-bold mb-6 font-serif">Frontend Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-40 hover:opacity-0 transition duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                <Link
                  to={project.src}
                  className="text-white text-lg font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  {`Go to ${project.title} Page`}
                </Link>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mt-4">{project.title}</h2>
              <p className="mt-2 text-gray-700">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
