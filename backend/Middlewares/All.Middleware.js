import jwt from "jsonwebtoken";
import UserModal from "../Modals/User.modal.js";
 


export const isAdmin = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(404).json({ success: false, message: "Token is mandtory.." })

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedData) {
            return res.status(404).json({ success: false, message: "Token not valid." })
        }

        const userId = decodedData.userId;

        const user = await UserModal.findById(userId);

        if (!user || user?.role != "Admin") {
            return res.status(404).json({ message: "User is not an Admin!", success: false })
        }

        next();

    } catch (error) {
        return res.status(500).json({ error: error.message, success: false })
    }
}
