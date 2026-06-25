import { type Request } from "express";

export const valideEditField = (req: Request) => {
    const allowedEditableField = [
        "firstname",
        "lastname",
        "age",
        "gender",
        "about",
        "avatar",
        "skills"
    ]

    const isEditAllowd = Object.keys(req.body).every((field) => {
        allowedEditableField.includes(field)
    })

    return isEditAllowd;
}