export const formatResponse = (data: any, message = 'Success') => ({
  status: 'success',
  message,
  data,
  timestamp: new Date().toISOString(),
});
