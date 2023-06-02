export async function FetchUrl(scale, search) {
  const result = await fetch(`https://source.unsplash.com/${scale}/?${search}`)
  return result
}