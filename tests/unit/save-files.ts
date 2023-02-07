import { describe, expect, test } from "@jest/globals"
import fs from "fs"
import path from "path"

import { saveFile } from "../../src/config"
import * as mockSyncConfigJson from "../../mocksync.json"
import * as responseJson from "../support/response.json"

jest.mock("fs", () => {
  return {
    writeFile: jest.fn(),
  }
})

describe("Saving files", () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  const currentDir = process.cwd()
  const outDir = mockSyncConfigJson.outDir
  const endpoint = mockSyncConfigJson.endpoints[0]
  const endpointDir = endpoint.dir
  const fileName = endpoint.fileName

  const content = JSON.stringify(responseJson)
  const filePath = path.join(currentDir, outDir, endpointDir, fileName)
  const finalPath = `${filePath}.json`

  it("writes file to directory", async () => {
    const savedContent = saveFile(finalPath, content)

    expect(fs.writeFile).toHaveBeenCalledWith(finalPath, content, expect.any(Function))

    expect(savedContent).toBe(content)
  })
})
