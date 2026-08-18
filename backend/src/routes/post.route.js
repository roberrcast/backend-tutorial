import { Router } from "express";
import {
    createPost,
    deletePost,
    getPosts,
    updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.route("/create").post(createPost);

/* No header here is needed, because no data is being passed */
/* MongoDB prompted me to add my current IP address in order for this 'getPosts' to work on postman */
router.route("/getPosts").get(getPosts);
router.route("/update/:id").patch(updatePost);
router.route("/delete/:id").delete(deletePost);

export default router;
