import { LoginForm } from "@/components/types";

export const data: LoginForm = {
  signUp: {
    panel: {
      title: "Welcome Back!",
      paragraph: 'Enter your personal details to use all of site features',
       toggle: "Sign In",
    },
    title: "Create Account",
    othermethod: "or use your email for registeration",
    button: "Sign Up",
    input: [
      { type: "text", placeholder: "Name", id: "name" },
      { type: "email", placeholder: "Email", id: "email" },
      { type: "password", placeholder: "Password", id: "password" },
      { type: "password", placeholder: "Confirm Password", id: "confirmpassword" }
    ]
  },
  signIn: {
    panel: {
      title: "Hello, Friend!",
      paragraph: "Register with your personal details to use all of site features",
      toggle: "Sign Up",
    },
    button: "Sign In",
    title: "Sign In",
    othermethod: "or use your email password ",
    recovery: "Forget Your Password?",
    input: [
      { type: "email", placeholder: "Email", id: "email"  },
      { type: "password", placeholder: "Password", id: "password" }
    ],
  },
}

