// Figma Frame: Onboarding Five

import { Form, type ActionFunctionArgs } from "react-router";
import { updateUser } from "~/queries/user";

const interests = [
  "Italian",
  "Mexican",
  "Chinese",
  "Indian",
  "Mediterranean",
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "Desserts",
  "Quick & Easy",
  "Fine Dining",
];

export default function SignUp3() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      SignUp3
      <Form method="post">
        <select multiple name="interests" id="interests">
          {interests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

// export async function loader({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const interests = formData.getAll("interests");
// }

export async function action({ request }: ActionFunctionArgs) {
  return await updateUser(request, { onboarded: true });
}
