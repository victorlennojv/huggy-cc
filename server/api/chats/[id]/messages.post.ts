import { readBody } from 'h3'

interface MessagePayload {
  text: string;
  file?: string;
  option?: unknown[];
  isInternal?: boolean;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const accessToken = config.accessToken;
  const id = event.context.params?.id;

  if (!id) {
    throw createError({ status: 400, message: 'id is required' })
  }

  const body = await readBody<MessagePayload>(event);

  const response = await $fetch(`https://api.huggy.app/v3/chats/${id}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body
  });

  return response;
}); 