
     __  __            _     ____                      ____ _     ___ 
    |  \/  | ___   ___| | __/ ___| _   _ _ __   ___   / ___| |   |_ _|
    | |\/| |/ _ \ / __| |/ /\___ \| | | | '_ \ / __| | |   | |    | | 
    | |  | | (_) | (__|   <  ___) | |_| | | | | (__  | |___| |___ | | 
    |_|  |_|\___/ \___|_|\_\|____/ \__, |_| |_|\___|  \____|_____|___|
                                   |___/                              

## What does **MockSync** do?
**MockSync** calls your API endpoints and stores the JSON response files where specified in the configuration file `mocksync.json`.

### The problem
You want to test a frontend feature that relies on a JSON response from an API but you don't want to call the real API route everytime and slow down your tests or development.

You might want to store a local copy of the response data, but that comes with the hassle of maintaining many response files to keep inline with an evolving API.

### The solution
**MockSync** calls your API routes once and stores the responses at the configured directories. This allows you to reference this data throughout your project. You can implement features and tests without calling your API over and over again.

API's will develop and change over time so when it's time to test your features again, **MockSync** can bring in the latest response data, allowing you to focus on development and not having to manually maintain and update these files with the latest response data.

## Installation

### Globally
Install the package globally so you can access it anywhere.

    npm install -g mocksync

Run **MockSync** from the terminal in your root working directory and follow the prompts.

    mocksync

### Dev dependency

Install the package in your project as a dev dependency.

    npm install mocksync --save-dev

In your `package.json` file add another a script in order to run the CLI.

        
       {
        ...
        "scripts": {
            ...
            "mocksync": "npx mocksync"
        },
        ...
    }

Run **MockSync** from the terminal in your root working directory and follow the prompts.

    npm run mocksync

## Configuration

Create a `mocksync.json` configuration file in your root working directory.

Here you can configure any endpoints you want to call, where to store the response data and by what name. 

Files will be saved as `[outDir]/[dir]/[fileName].json`

```
{
  "outDir": "/mock-sync",
  "endpoints": [
    {
      "url": "https://dummyjson.com/users?limit=3",
      "dir": "users",
      "fileName": "mock-users"
    },
    {
      "url": "https://dummyjson.com/comments?limit=5",
      "dir": "comments",
      "fileName": "mock-comments"
    }
  ]
}
```




