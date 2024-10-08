import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "./Button";

const ClientShowcase = ({ clientData = [] }) => {
  const [filteredClients, setFilteredClients] = useState(clientData);
  const [activeFilter, setActiveFilter] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setFilteredClients(
      activeFilter === "All"
        ? clientData
        : clientData.filter((client) => client.name === activeFilter)
    );
  }, [activeFilter, clientData]);

  useEffect(() => {
    const allCategories = ["All", ...clientData.map((client) => client.name)];
    setCategories(allCategories);
  }, [clientData]);

  if (!Array.isArray(clientData) || clientData.length === 0) {
    return <div>No client data available.</div>;
  }

  const renderProjectLayout = (client, projects = []) => {
    if (!Array.isArray(projects)) return null;

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
        {projects.flatMap((project, idx) =>
          Array.isArray(project.images)
            ? project.images.slice(0, 3).map((image, imgIdx) => {
                const imagePath = `/images/clients/${encodeURIComponent(
                  client.name
                )}/${encodeURIComponent(project.name)}/thumbnails/${encodeURIComponent(
                  image
                )}`;
                return (
                  <div
                    key={imgIdx}
                    className="relative w-full h-full"
                    style={{ paddingBottom: "100%" }} // Force images to be square
                  >
                    <Image
                      src={imagePath}
                      alt={project.name}
                      fill
                      sizes="100vw"
                      className="absolute inset-0 object-cover brightness-100" // Remove brightness dimming
                      loading="lazy"
                    />
                  </div>
                );
              })
            : []
        )}
      </div>
    );
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="client-showcase container mx-auto px-6 py-10">
      {/* Filter buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {categories.map((filter) => (
          <Button key={filter} onClick={() => handleFilterClick(filter)}>
            {filter}
          </Button>
        ))}
      </div>

      <div className="space-y-10">
        {filteredClients.map((client) => (
          <Link href={`/clients/${encodeURIComponent(client.name)}`} key={client.name}>
            <div className="group cursor-pointer relative mb-2 mt-5">
              <div className="relative overflow-hidden group-hover:ring-2 group-hover:ring-indigo-600 transition-shadow  rounded-lg bg-gradient-to-b from-gray-900 to-indigo-950">
                {/* Render Projects as a grid without gaps or rounding */}
                {renderProjectLayout(client, client.projects)}

                {/* Overlay: Default state with client name */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-start">
                  <h2 className="text-white text-2xl font-bold py-2 px-4 bg-indigo-800 rounded-r-lg bg-opacity-70">
                    {client.name}
                  </h2>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <h2 className="text-white text-xl font-semibold">View More</h2>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClientShowcase;
