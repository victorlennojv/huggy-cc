export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  event.context.headers = {
    ...event.context.headers,
    'Authorization': `Bearer ${config.accessToken}`
  }
})