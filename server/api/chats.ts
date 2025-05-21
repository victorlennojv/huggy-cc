export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const accessToken = config.accessToken;

  const response = await $fetch('https://api.huggy.app/v3/chats', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}); 