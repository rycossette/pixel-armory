import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ClientShowcase = ({ clientData = [] }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      console.timeEnd("Showcase Page Load Time");
    } else {
      console.time("Showcase Page Load Time");
      setLoading(false);
    }
  }, [loading]);

  const renderProjectLayout = (client, projects = []) => {
    return (
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 space-y-5">
        {projects.flatMap((project, idx) =>
          (project.images || []).map((image, imgIdx) => {
            const imagePath = `/images/clients/${encodeURIComponent(client.name)}/${encodeURIComponent(project.name)}/thumbnails/${encodeURIComponent(image)}`;
            return (
              <div key={imgIdx} className="relative w-full rounded-lg" style={{ paddingBottom: "56.25%" }}>
                <Image
                  src={imagePath}
                  alt={project.name}
                  fill
                  sizes="100vw"
                  className="absolute inset-0 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div className="client-showcase px-6 py-10 text-center">
      {clientData.map((client, idx) => (
        <div key={client.name} className="mb-10">
          <Link href={`/clients/${client.name}`}>
            <a className="text-2xl font-bold text-white hover:text-gray-300 mb-6 inline-block">
              {client.name}
            </a>
          </Link>
          {client.projects && client.projects.length > 0 ? (
            renderProjectLayout(client, client.projects)
          ) : (
            <p className="text-gray-400">No projects available for this client.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClientShowcase;
