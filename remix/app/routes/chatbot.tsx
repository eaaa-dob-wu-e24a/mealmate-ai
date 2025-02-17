import { Form, useLoaderData } from "react-router";
import type { Route } from "./+types/chatbot";
import { Input } from "~/components/ui/input";
import { FaMicrophone } from "react-icons/fa";

export default function Chatbot() {
  return (
    <section className="bg-[#F8F6F0] flex flex-col h-screen">
      <div className="flex items-center justify-between px-4 py-3">
        <button className="text-green-900 text-2xl">&times;</button>
        <h1 className="text-green-900 font-bold text-lg mx-auto">Plant Mate</h1>
      </div>

      <div className="flex flex-col items-center mt-4">
        <img src="/plantmate.png" alt="Friendly Bison" className="w-50 h-50" />
        <img
          src="/mascot-full-body.png"
          alt="Friendly Bison"
          className="w-50 h-50"
        />
      </div>

      <div className="flex flex-col mt-auto px-4 pb-20">
        <div className="bg-gray-100 p-3 rounded-lg max-w-[80%] self-start">
          <p className="text-gray-800">
            Hey, Mette! It is nice to see you back. Let's find something extra
            yummy for you! 🌱
          </p>
        </div>
      </div>

      <Form
        method="post"
        className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2 rounded-t-lg"
      >
        <Input
          type="text"
          name="message"
          placeholder="Message Friendly Bison"
          className="w-full p-3 rounded-lg outline-none bg-[#E6E2D8] text-green-900 placeholder:text-[#103B28]"
        />
        <button type="submit" className="text-green-900 text-xl">
          <FaMicrophone />
        </button>
      </Form>
    </section>
  );
}
