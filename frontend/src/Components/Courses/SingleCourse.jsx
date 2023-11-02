import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../ApiConfig";

const SingleCourse = () => {
  const { id } = useParams();
  const [singlecourseData, setSingleCourseData] = useState(null);

  useEffect(() => {
    const fetchSingleCourseData = async () => {
      try {
        if (!id) {
          return;
        }
        const response = await api.post("/get-single-course", { courseId: id });

        if (response.data.success) {
          setSingleCourseData(response.data.course);
        } else {
          toast.error("Failed to fetch course data.");
        }
      } catch (error) {
        // Handle errors from the API request.
        toast.error("An error occurred while fetching data.");
        console.error(error);
      }
    };

    fetchSingleCourseData();
  }, [id]);

  return (
    <div>
      {singlecourseData ? (
        <div>
          <div>{singlecourseData.image}</div>
          <div>
            <p>{singlecourseData.lecture1}</p>
            <p>{singlecourseData.lecture2}</p>
            <p>{singlecourseData.lecture3}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleCourse;

