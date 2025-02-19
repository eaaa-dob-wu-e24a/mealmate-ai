import { useChat } from "@ai-sdk/react";
import { Loader2, Send } from "lucide-react";
import { Fragment, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { z } from "zod";
import { Markdown } from "~/components/markdown";
import Recipe from "~/components/recipe";
import { Button } from "~/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "~/components/ui/chat-bubble";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";
import { Textarea } from "~/components/ui/textarea";
import { useScrollToBottom } from "~/hooks/use-scroll-to-bottom";
import { getSession } from "~/lib/auth.server";
import type { Session } from "~/types";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  return Response.json({ session });
}

export default function Chatbot() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<"openai" | "anthropic" | "mistral">(
    "openai"
  );
  const [hasStartedChat, setHasStartedChat] = useState(false);

  const { session } = useLoaderData<{ session: Session | null }>();

  const isNotRender = Boolean(import.meta.env.VITE_IS_NOT_RENDER);

  const apiUrl = isNotRender
    ? `${import.meta.env.VITE_API_URL}/api/chat`
    : `https://plantmate-ai-fan.onrender.com/api/chat`;

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
  } = useChat({
    api: apiUrl,
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
    body: {
      model,
    },
    maxSteps: 10,
    onError: (error) => {
      setError(error.message);
    },
    onFinish: (usage, finish) => {
      if (finish.finishReason === "error") {
        setError("Sorry, I couldn't process that request. Please try again.");
      }

      setLoading(false);
    },
    onToolCall({ toolCall }) {
      console.log(toolCall);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    setError(null);
    setHasStartedChat(true);
    setLoading(true);
    originalHandleSubmit(e);
  };

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  return (
    <section className="bg-[#F8F6F0] flex flex-col relative min-h-[calc(100svh-136px)]">
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

      <div
        ref={messagesContainerRef}
        className="max-h-[calc(100svh-300px)] flex-1 overflow-y-auto px-4 py-4 space-y-4"
      >
        {hasStartedChat && (
          <div className="flex items-center justify-between px-4 py-3">
            <img
              src="/img/mealmatelogo-font.png"
              alt="Meal Mate Logo"
              className="w-28"
            />
          </div>
        )}

        {messages.map((m, i) => {
          return (
            <Fragment key={m.id}>
              {m.parts?.map((t, index) => {
                const isLoading =
                  m.role === "assistant" &&
                  i === messages.length - 1 &&
                  loading;

                if (t.type === "text") {
                  return (
                    <ChatBubble
                      key={t.text}
                      variant={m.role === "user" ? "sent" : "received"}
                    >
                      {isLoading && index === m.parts.length - 1 && (
                        <div className="h-10 min-w-10 max-w-10 flex items-center justify-center">
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                      )}
                      {!isLoading && m.role === "assistant" && (
                        <ChatBubbleAvatar fallback="M" src="/mascot.png" />
                      )}

                      {isLoading && index !== m.parts.length - 1 && (
                        <ChatBubbleAvatar fallback="M" src="/mascot.png" />
                      )}

                      <ChatBubbleMessage>
                        <Markdown>{t.text}</Markdown>
                      </ChatBubbleMessage>
                    </ChatBubble>
                  );
                }

                if (t.type === "tool-invocation") {
                  if (t.toolInvocation.toolName === "createRecipe") {
                    const schema = z.object({
                      recipe_id: z.string(),
                      image: z.string(),
                      title: z.string(),
                      categories: z.array(z.string()),
                    });

                    if (t?.toolInvocation?.state !== "result")
                      return (
                        <ChatBubble
                          key={t.toolInvocation.toolCallId}
                          variant={m.role === "user" ? "sent" : "received"}
                        >
                          {isLoading && index === m.parts.length - 1 && (
                            <div className="h-10 min-w-10 max-w-10 flex items-center justify-center">
                              <Loader2 className="w-4 h-4 animate-spin" />
                            </div>
                          )}

                          {!isLoading && m.role === "assistant" && (
                            <ChatBubbleAvatar fallback="M" src="/mascot.png" />
                          )}

                          {isLoading && index !== m.parts.length - 1 && (
                            <ChatBubbleAvatar fallback="M" src="/mascot.png" />
                          )}

                          <Skeleton className="w-full h-32" />
                        </ChatBubble>
                      );

                    const result = t?.toolInvocation?.result;

                    const parsedResult = schema.safeParse(result);

                    if (!parsedResult.success) {
                      return (
                        <ChatBubble
                          key={t.toolInvocation.toolCallId}
                          variant={m.role === "user" ? "sent" : "received"}
                        >
                          {isLoading && index === m.parts.length - 1 && (
                            <div className="h-10 min-w-10 max-w-10 flex items-center justify-center">
                              <Loader2 className="w-4 h-4 animate-spin" />
                            </div>
                          )}

                          {!isLoading && m.role === "assistant" && (
                            <ChatBubbleAvatar fallback="M" src="/mascot.png" />
                          )}

                          {isLoading && index !== m.parts.length - 1 && (
                            <ChatBubbleAvatar fallback="M" src="/mascot.png" />
                          )}

                          <div className="text-red-500 h-32 flex items-center justify-center">
                            There was an error creating the recipe. Please try
                            again.
                          </div>
                        </ChatBubble>
                      );
                    }

                    return (
                      <ChatBubble
                        key={t.toolInvocation.toolCallId}
                        variant={m.role === "user" ? "sent" : "received"}
                      >
                        {isLoading && index === m.parts.length - 1 && (
                          <div className="h-10 min-w-10 max-w-10 flex items-center justify-center">
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </div>
                        )}

                        {!loading && m.role === "assistant" && (
                          <ChatBubbleAvatar fallback="M" src="/mascot.png" />
                        )}

                        {isLoading && index !== m.parts.length - 1 && (
                          <ChatBubbleAvatar fallback="M" src="/mascot.png" />
                        )}

                        <Recipe
                          id={parsedResult.data.recipe_id}
                          image={parsedResult.data.image}
                          title={parsedResult.data.title}
                          categories={parsedResult.data.categories}
                        />
                      </ChatBubble>
                    );
                  }
                }
              })}
            </Fragment>
          );
        })}

        {error && (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 bg-[#F8F6F0] p-4 flex flex-col gap-2 sticky bottom-0"
      >
        <Textarea
          value={input}
          name="message"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
          placeholder="Message Mike"
          className="w-full min-h-[80px] resize-none p-3 rounded-lg outline-none bg-[#E6E2D8] text-green-900 placeholder:text-[#103B28]"
          // disabled={isPending}
          onChange={handleInputChange}
        />
        <div className="flex items-center gap-2 justify-between">
          <Select
            value={model}
            onValueChange={(value) =>
              setModel(value as "openai" | "anthropic" | "mistral")
            }
          >
            <SelectTrigger className="w-[160px] border-none shadow-none">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">ChatGPT-4o-mini</SelectItem>
              <SelectItem value="anthropic">Claude 3.5 Haiku</SelectItem>
              <SelectItem value="mistral">Mistral-small-latest</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="min-w-9"
            // disabled={isPending}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </section>
  );
}
