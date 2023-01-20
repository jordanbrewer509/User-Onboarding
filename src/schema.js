import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .required("Username is required")
        .min(3, "Username must be 3 characters long"),
    email: yup
        .string()
        .email("Must be a valid e-mail address")
        .required("You must have an e-mail"),
    password: yup
        .string()
        .trim()
        .required("Password is required")
        .min(6, "Password must be 6 characters long"),
    tos: yup.boolean().oneOf([true], 'You must accept the Terms of Service')
})

export default schema;