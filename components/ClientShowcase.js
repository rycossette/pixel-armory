import Image from "next/image";
import { useEffect, useState } from "react";

const ClientShowcase = ({ clientData = [] }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      console.timeEnd("Showcase Page Load Time");
    } else {
      console.time("Showcase Page Load Time");
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!clientData || clientData.length === 0) {
    return <div>No client data available.</div>;
  }

  const renderProjectLayout = (client, projects = []) => {
    return (
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 space-y-5">
        {projects.flatMap((project, idx) =>
          (project.images || []).map((image, imgIdx) => {
            const imagePath = `/images/clients/${encodeURIComponent(client.name)}/${encodeURIComponent(project.name)}/thumbnails/${encodeURIComponent(image)}`;
            console.log('Rendering image:', imagePath);
            return (
              <div
                key={imgIdx}
                className="relative w-full rounded-lg"
                style={{ paddingBottom: "56.25%" }}
              >
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
    <div className="client-showcase">
      {clientData.map((client, idx) => (
        <div key={client.name}>
          <h2>{client.name}</h2>
          {client.projects && client.projects.length > 0 ? (
            renderProjectLayout(client, client.projects)
          ) : (
            <p>No projects available for this client.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clients`);
    const clientData = await response.json();

    if (!clientData) {
      throw new Error("Client data is empty or undefined");
    }

    return {
      props: {
        clientData,
      },
      revalidate: 60, // Rebuild every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching client data:", error);
    return {
      props: {
        clientData: [], // Return empty array to prevent undefined issues
      },
    };
  }
}

export default ClientShowcase;
