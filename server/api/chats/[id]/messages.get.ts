export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const accessToken = config.accessToken;
  const id = event.context.params?.id;

  if (!id) {
    throw createError({ status: 400, message: 'id is required' })
  }

  const response = await $fetch(`https://api.huggy.app/v3/chats/${id}/messages`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
}); 