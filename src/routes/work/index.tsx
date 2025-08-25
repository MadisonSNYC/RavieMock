import React from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../../data/projects.json';

const WorkIndex: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Work</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => {
            const imageSrc = project.posterSrc || project.image || '/placeholder.jpg';
            const projectTitle = project.title || 'Untitled';
            const projectClient = project.client || '';
            
            return project.slug ? (
              <Link
                key={project.id}
                to={`/the-work/${project.slug}`}
                className="group relative aspect-video bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <img
                  src={imageSrc}
                  alt={`${projectClient} - ${projectTitle}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <p className="text-sm text-gray-300">{projectClient}</p>
                    <h3 className="text-lg font-semibold">{projectTitle}</h3>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={project.id}
                className="group relative aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-default"
              >
                <img
                  src={imageSrc}
                  alt={`${projectClient} - ${projectTitle}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <p className="text-sm text-gray-300">{projectClient}</p>
                    <h3 className="text-lg font-semibold">{projectTitle}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkIndex;