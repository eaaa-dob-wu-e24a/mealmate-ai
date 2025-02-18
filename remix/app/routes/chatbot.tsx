import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Markdown } from "~/components/markdown";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ChatBubble, ChatBubbleMessage } from "~/components/ui/chat-bubble";
import { getSession } from "~/lib/auth.server";
import type { Session } from "~/types";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  return Response.json({ session });
}

export default function Chatbot() {
  const [model, setModel] = useState<"openai" | "anthropic" | "mistral">(
    "openai"
  );
  const [hasStartedChat, setHasStartedChat] = useState(false);

  const { session } = useLoaderData<{ session: Session | null }>();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
  } = useChat({
    api: import.meta.env.VITE_API_URL + `/api/chat`,
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
    body: {
      model,
    },
    maxSteps: 10,
  });

  const handleSubmit = (e: React.FormEvent) => {
    setHasStartedChat(true);
    originalHandleSubmit(e);
  };

  return (
    <section className="bg-[#F8F6F0] flex flex-col min-h-screen relative">
      <div className="flex items-center justify-between px-4 py-3">
        <button className="text-green-900 text-2xl">&times;</button>
        <img
          src="/img/mealmatelogo-font.png"
          alt="Meal Mate Logo"
          className="w-28"
        />
      </div>

      {!hasStartedChat && (
        <div className="flex flex-col items-center mt-4">
          <img
            src="/img/mealmatelogo-font.png"
            alt="Friendly Bison"
            className="w-40 h-40 object-contain"
          />
          <img
            src="/mascot-full-body.png"
            alt="Friendly Bison"
            className="w-50 h-50"
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <ChatBubble variant="received">
          <ChatBubbleMessage>
            <Markdown>Hej Mette! It is nice to see you back.</Markdown>
          </ChatBubbleMessage>
        </ChatBubble>

        {messages.map((m) => (
          <ChatBubble
            key={m.id}
            variant={m.role === "user" ? "sent" : "received"}
          >
            <ChatBubbleMessage>
              <Markdown>{m.content}</Markdown>
            </ChatBubbleMessage>
          </ChatBubble>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 bg-[#F8F6F0] p-4 flex items-center gap-2 mb-18"
      >
        <Select
          value={model}
          onValueChange={(value) =>
            setModel(value as "openai" | "anthropic" | "mistral")
          }
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="openai">OpenAI</SelectItem>
            <SelectItem value="anthropic">Anthropic</SelectItem>
            <SelectItem value="mistral">Mistral</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={input}
          type="text"
          name="message"
          placeholder="Message Friendly Bison"
          className="w-full p-3 rounded-lg outline-none bg-[#E6E2D8] text-green-900 placeholder:text-[#103B28]"
          // disabled={isPending}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="text-green-900 text-xl"
          // disabled={isPending}
        >
          <FaMicrophone />
        </button>
      </form>
    </section>
  );
}
