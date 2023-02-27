export const delay = async (ms: number): Promise<unknown> => await new Promise(resolve => setTimeout(resolve, ms))
