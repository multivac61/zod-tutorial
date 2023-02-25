// CODE

import { it } from "vitest"
import { z } from "zod"
import { Equal, Expect } from "./helpers/type-utils"

const genericFetch = async <ZSchema extends z.ZodSchema>(
  url: string,
  schema: ZSchema
): Promise<z.infer<ZSchema>> => {
  const res = await fetch(url)
  const result_1 = await res.json()
  return schema.parse(result_1)
}

// TESTS

it("Should fetch from the Star Wars API", async () => {
  const result = await genericFetch(
    "https://www.totaltypescript.com/swapi/people/1.json",
    z.object({
      name: z.string(),
    })
  )
  console.log(result)
  //          ^?

  type cases = [
    // Result should equal { name: string }, not any
    Expect<Equal<typeof result, { name: string }>>
  ]
})
