import fs from "fs"
import path from "path"
import axios from "axios"
import clc from "cli-color"

import { IConfig } from "./contracts/IConfig.js"

const log = console.log

const theme = {
  success: clc.green,
  warning: clc.yellow,
  error: clc.red,
}

export const getConfig = (path: string) => {
  try {
    const content = fs.readFileSync(path, "utf8")

    return JSON.parse(content)
  } catch (err) {
    console.log(`${clc.red("Failed to read configuration file")}`)

    throw err
  }
}

export const callEndpoint = async (endpoint: string) => {
  try {
    return await axios.get(endpoint)
  } catch (err) {
    log(theme.error(`Failed to connect to endpoint ${clc.blue.bold(endpoint)}`))
  }
}

/**
 * Return base directory based on the current directory
 */
const getBaseDir = (dir: string): string => {
  const currentDirectory = process.cwd()

  return path.join(currentDirectory, dir)
}

/**
 * Return final directory based on base directory and endpoint directory
 */
const getFinalDir = (baseDir: string, endpointDir: string): string => {
  return path.join(baseDir, endpointDir)
}

/**
 * Return final file path based on the directory and file name
 */
const getFinalFile = (dir: string, fileName: string): string => {
  const dirPath = path.join(dir, fileName)

  return `${dirPath}.json`
}

/**
 * If directory does not exist then make directory recursively
 */
export const makeDir = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

/**
 * Write contents to file
 * You should suppy extension with file
 */
export const saveFile = (path: string, content: string): string => {
  try {
    fs.writeFile(path, content, (err) => {
      log(theme.success(`Output ${clc.blue.bold(path)}`))
    })
  } catch (err) {
    throw err
  }

  return content
}

/**
 * Call methods to create files
 */
export const createFiles = async (config: IConfig) => {
  const baseDir = getBaseDir(config.outDir)

  config.endpoints.map(async (endpoint) => {
    let response = await callEndpoint(endpoint.url)

    if (response && response.data) {
      let content = JSON.stringify(response.data)

      let finalDir = getFinalDir(baseDir, endpoint.dir)

      makeDir(finalDir)

      let finalFilePath = getFinalFile(finalDir, endpoint.fileName)

      saveFile(finalFilePath, content)
    }
  })
}
