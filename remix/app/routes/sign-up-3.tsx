// Figma Frame: Onboarding Five

import { Form, type ActionFunctionArgs } from "react-router";
import { updateUser } from "~/queries/user";

export default function SignUp3() {
  return (
    <div>
      SignUp3
      <Form method="post">
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  return await updateUser(request, { onboarded: true });
}
