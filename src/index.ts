#! /usr/bin/env node

import { program } from "commander"
import * as readline from "readline"
import figlet from "figlet"
import { getConfig, createFiles } from "./config.js"
import { IConfig } from "./contracts/IConfig.js"

console.log(figlet.textSync("MockSync CLI"))

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const defaultConfigPath = "mocksync.json"

const askQuestionConfig = (question: string): Promise<IConfig> => {
  return new Promise((resolve) => {
    rl.question(question, (path) => {
      path = path || defaultConfigPath

      try {
        const config = getConfig(path)

        resolve(config)
      } catch (error) {
        rl.close()
      }
    })
  })
}

const askQuestionConfirm = (question: string, config: IConfig): Promise<boolean> => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      try {
        if (answer !== "y") {
          throw new Error()
        }

        createFiles(config)

        resolve(true)
      } catch (err) {
        console.log(`Exited MockSync`)
        rl.close()
      }

      rl.close()
    })
  })
}

const askQuestions = async () => {
  const config = await askQuestionConfig(`Enter the path to the configuration file [${defaultConfigPath}]: `)

  const confirm = await askQuestionConfirm(`Create or overwrite files defined in ${defaultConfigPath}? (y/N): `, config)

  rl.close()
}

askQuestions()

program.parse(process.argv)
