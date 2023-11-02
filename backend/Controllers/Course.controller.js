import jwt from "jsonwebtoken";
import CourseModal from "../Modals/Course.modal.js";
import UserModal from "../Modals/User.modal.js";

export const addCourse = async (req, res) => {
  try {
    const { name, level, image, description, lecture1, lecture2,  lecture3 } = req.body.courseData;
    const { token } = req.body;
    if (!name || !level || !image || !description ||!lecture1||!lecture2||!lecture3||  !token) return res.status(404).json({ success: false, message: "All fields are mandtory.." })
    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData) {
      return res
        .status(404)
        .json({ success: false, message: "Token not valid." });
    }

    const userId = decodedData.userId;

    const course = new CourseModal({
      name,
      level,
      image,
      description,lecture1, lecture2,  lecture3,
      userId: userId,
    });

    await course.save();

    return res.status(201).json({ success: true , message:"Course added successfully!"});
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const allCourses = async (req, res) => {
  try {
    const courses = await CourseModal.find({});
    if (courses.length) {
      return res.status(200).json({ success: true, courses: courses });
    }
    return res
      .status(404)
      .json({ success: false, message: "No courses found!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};




export const updateCourse = async (req, res) => {
    try {
        const { name, level, image, description, lecture1, lecture2,  lecture3 } = req.body.courseData;
        const {token} = req.body;
        if (!token) return res.status(404).json({ success: false, message: "Token is mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const updatedCourse = await CourseModal.findOneAndUpdate({ _id: courseId, userId: userId }, { name, level, image, description, lecture1, lecture2,  lecture3 }, { new: true })

        if (updatedCourse) {
            return res.status(200).json({ success: true, product: updatedCourse })
        }
        return res.status(404).json({ success: false, message: "Only Admin can update the course" })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}



export const deleteCourse = async (req, res) => {
  try {
      const { courseId, token } = req.body;

      if (!courseId) return res.status(404).json({ success: false, message: "Course id is mandtory.." })

      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedData.userId;

      const isDeleted = await CourseModal.findOneAndDelete({ _id: courseId, userId: userId })
      if (isDeleted) {
          return res.status(200).json({ success: true, message: "Course Deleted Successfully." })
      }

      throw new Error("Mongodb error")

  } catch (error) {
      return res.status(500).json({ success: false, error: error.message })
  }
}







export const getSingleCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is mandatory." });
    }

    const course = await CourseModal.findById(courseId);

    if (course) {
      return res.status(200).json({ success: true, course });
    }

    return res.status(404).json({ success: false, error: "Course details not found." });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}



export const checkAvailability = async (req, res, next) => {
  try {
    const { instructorId, date } = req.body;
  const lecture = await CourseModal.findOne({ instructor: instructorId, date });

  if (lecture) {
    res.status(400).json({ error: 'Instructor already assigned to a lecture on this date' });
  } else {
    next();
  }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
};






export const handleAssign = async (req, res) => {
  try {
    const { courseId, instructorId } = req.body;

    // Check if the instructor is already assigned to a lecture on the same date
    const courseToAssign = await Lecture.findById(courseId);
    if (!courseToAssign) {
      return res.status(404).json({ error: 'Lecture not found' });
    }

    const instructor = await UserModal.findById(instructorId);
    if (!instructor) {
      return res.status(404).json({ error: 'Instructor not found' });
    }

    const existingLecture = await CourseModal.findOne({
      date: courseToAssign.date,
      instructor: instructorId,
    });

    if (existingLecture) {
      return res.status(400).json({ error: 'Instructor already assigned to a lecture on this date' });
    }

    courseToAssign.instructor = instructorId;
    await courseToAssign.save();

    res.json(courseToAssign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



