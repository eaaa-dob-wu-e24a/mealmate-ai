export async function getChatResponse() {
  try {
    const response = await fetch(process.env.API_URL + "/api/chat/openai", {
      method: "POST",
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    return { reader, decoder };
  } catch (error) {
    console.error(error);
    return { reader: null, decoder: null };
  }
}
