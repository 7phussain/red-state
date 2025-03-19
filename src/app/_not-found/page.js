// import { useContext } from "react";
// import MyContext from "@/context/MyContext"; // Update with actual context path

export default function NotFoundPage() {
//   const context = useContext(MyContext);

  if (!context) {
    return <p>Context not found</p>; // Prevent crashing if context is null
  }

  return <div>Not Found</div>;
}
