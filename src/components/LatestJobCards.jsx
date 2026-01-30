import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = React.useState(false);

  // Helper to get initials
  const getInitials = (name) => {
    if (!name) return "JP";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="
        p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer
        hover:shadow-2xl hover:border-[#6A38C2] transition-all duration-300
        dark:bg-gray-800 dark:border-gray-700
      "
    >
      <div className="flex items-center gap-4 mb-4">
        {job?.company?.logo && !imageError ? (
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100">
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg font-bold text-[#6A38C2]">
            {getInitials(job?.company?.name)}
          </div>
        )}

        <div>
          <h1 className="font-medium text-lg text-gray-900 dark:text-gray-100">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">{job?.location || "Remote"}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2 text-gray-800 dark:text-gray-200">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
          {job?.description}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.experienceLevel}
        </Badge>
        <Badge className={"text-[#e91e63] font-bold"} variant="ghost">
          {job?.salary && (job.salary.toString().toLowerCase().includes('k') || job.salary.toString().toLowerCase().includes('lakh'))
            ? job.salary
            : `${job?.salary}LPA`}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
