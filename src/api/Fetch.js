export async function FetchUrl(scale, search) {
  const result1 = await fetch(`https://source.unsplash.com/${scale}/?${search}`)
  const result2 = await fetch(`https://source.unsplash.com/${scale}/?${search.toUpperCase()}`)
  const result3 = await fetch(`https://source.unsplash.com/${scale}/?${search}-`)
  return {result1, result2, result3}
}