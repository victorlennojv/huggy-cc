export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  return {
    authenticated: config.accessToken ? true : false,
  }
}) 