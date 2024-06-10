#! /usr/bin/env node 

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.green("<>".repeat(25)));
console.log(chalk.bold.redBright("\t <<<  Welcome to the Quiz App  >>> \t"));
console.log(chalk.bold.green("<>".repeat(25)));

const apiLink: string = 
"https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple"

let fetchData = async (data:string) => {
    let fetchQuiz: any = await fetch(data)
    let res = await fetchQuiz.json();
    return res.results;
};

let data = await fetchData (apiLink);
let startQuiz = async () => {
    let score:number = 0 
    
    // for user name
    let name = await inquirer.prompt({
        type: "input",
        name: "fname",
        message: "What is your Name?"
    })

    for (let i=1 ; i <= 5 ; i++){
        let answers = [...data[i].incorrect_answers,data[i].correct_answer];

        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val:any) => val),
        });

        if (ans.quiz === data[i].correct_answer){
            ++score;
            console.log(chalk.bold.italic.green("Correct!"));   
        } else {
            console.log(`Correct answer is ${chalk.bold.italic.red(data[i].correct_answer)}`);
            
        }
}

console.log(`Dear ${chalk.magentaBright.bold(name.fname)}, your score is ${chalk.blueBright.bold(score)} out of ${chalk.blueBright.bold(`5`)}`);
}; 

startQuiz();
 



















