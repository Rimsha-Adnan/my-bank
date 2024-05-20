#! /usr/bin/env node

import inquirer from "inquirer";

import chalk from "chalk";

console.log(chalk.bold.italic.rgb(246,815,61)("\n\t\t========================================================================"));
console.log(chalk.bold.italic.rgb(255,53,153)("\t\t\t>>>>>>>>>>>>>>>>...Welcome To My Bank...<<<<<<<<<<<<<<"));
console.log(chalk.bold.italic.rgb(246,815,61)("\t\t========================================================================\n"));


class customer{
    first_name : string
    last_name : string
    age : number
    gender : string
    mobile_number : number
    pinCode : number

    constructor(){
        this.first_name = ''
        this.last_name = ''
        this.age = 0
        this.gender = ''
        this.mobile_number = 0
        this.pinCode = this.pingenerator()
    }

    pingenerator():any{
        return Math.floor(Math.random() * 10000) 
       
    }
    getcustomerInfo(){
        return `
                First Name : ${chalk.rgb(204, 149, 14)(this.first_name.toUpperCase())} -
                Last Name : ${chalk.rgb(204, 149, 14)(this.last_name.toUpperCase())} -
                Age : ${chalk.rgb(204, 149, 14)(this.age)} 
                Gender : ${chalk.rgb(204, 149, 14)(this.gender.toUpperCase())} -
                Mobile Number : ${chalk.rgb(204, 149, 14)(this.mobile_number)} -
                 `
    }
}

class Bank{
    credit : string;
    debit : string;
    protected accountBalance : number;

    constructor(){
        
        this.credit = 
        this.debit = ""
        this.accountBalance = 0
        
    }
    bankaccount(code : number){
       let check = user.pinCode == code
        if(!check){
            console.log(chalk.red.italic.bold("\n\tInvalid pin code\n"));
        }else{
            return this.accountBalance 
        }
        
    }
    
    Debit(code : number,amount : number){
       let check = user.pinCode == code
       if(!check){
         console.log(chalk.red.italic.bold("\n\tInvalid pin code\n"));
        
       }else{
            let statment = ""
            if(amount > 0 ){
            if(this.accountBalance >= amount){
                this.accountBalance -= amount 
                console.log(chalk.rgb(255, 105, 180).italic.bold(`\n\tYour remaining balance is ${chalk.yellow.bold(this.accountBalance)} $`));
                statment =chalk.bold.green( `  Transaction succesfull!`)
            }else{
                statment =  chalk.red.italic.bold("You dont have enough amount to do this transaction!")
                console.log(chalk.rgb(255, 105, 180).italic(`\n\t\tYour Account balance is ${chalk.yellow.bold(this.accountBalance)} $`));

            }
             console.log(chalk.rgb(224, 176, 255).italic.bold(`\n\t ${statment}\n`));
            }
        }
    }
       
    
    Credit(code : number ,amount : number){
        let check = user.pinCode == code
       if(!check){
        console.log(chalk.red.italic.bold("\n\tInvalid pin code\n"));
        
       }else{
         let message :string = chalk.bold.red( "\n\tTransaction failed!\n")
            if(amount > 0 ){
            this.accountBalance += amount
            if(amount > 100){
                this.accountBalance -= 1
            }
            message =chalk.bold.rgb(66,776,34)(  "\n\tYour account has been credited successfully!\n ")
        }
         console.log(chalk.rgb(224, 176, 255).italic.bold(`\n\t${message}`));
         console.log(chalk.bold.italic.rgb(255, 105, 180)('\n\t\tIn every transaction greater than $100 So "$1" doller will be  deducted In Your Account. \n'));
         
         console.log(chalk.rgb(255, 105, 180).italic(`\n\t   Your New Account balance is ${chalk.yellow.bold(this.accountBalance)}$\n `));
        }
          
    }
    
}

let account = new Bank()

let user = new customer();

async function getuserInfo() {
    let details = await inquirer.prompt(
        [
            {
                name : "name",
                type: "input",
                message : chalk.rgb(244, 149, 194).italic("please enter your First Name : "),
                validate : (input)=> /^[A-Za-z]+$/.test(input) ? true :chalk.bold.rgb(567,87,34)( "\n\tPlease Enter only alphabatical character\n")
            },{
                name : "lname",
                type: "input",
                message : chalk.rgb(244, 149, 194).italic("please enter your Last Name : "),
                validate : (input)=> /^[A-Za-z]+$/.test(input) ? true :chalk.bold.rgb(567,87,34)( "\n\tPlease Enter only alphabatical character\n")
            },{
                name : "age",
                type: "input",
                message : chalk.rgb(244, 149, 194).italic("please enter your Age : "),
                validate : (input: string) => {
                    if (input.trim() === '') {
                        return chalk.bold.red("\n\t\tAge cannot be empty\n");
                    }
                    const number = parseInt(input);
                    if (isNaN(number)) {
                        return chalk.bold.red("\n\t\tPlease enter a numerical value\n");
                    } else if (!/^\d+$/.test(input)) {
                        return chalk.bold.red("\n\t\tPlease enter a valid number\n");
                    } else if (input.length !== 2 ) {
                        return chalk.bold.red("\n\t\tYou are not be able to create an account\n");
                    }
                    return true; // Input is valid
                }
    
            },{
                name : "gender",
                type: "input",
                message : chalk.rgb(244, 149, 194).italic("please enter your Gender : "),
                validate : (input)=> /^[A-Za-z]+$/.test(input) ? true :chalk.bold.rgb(567,87,34)( "\n\tPlease Enter only alphabatical character\n")
            },
            {
                name : "mobileNo",
                type: "input",
                message : chalk.rgb(244, 149, 194).italic("please enter Mobile Number: "),
                validate : async (input: string) => {
                    if (input.trim() === '') {
                        return chalk.bold.italic.rgb(567,87,34)("\n\t\tMobile number cannot be empty\n");
                    }
                    const number = parseInt(input);
                    if (isNaN(number)) {
                        return chalk.bold.italic.rgb(567,87,34)("\n\t\tPlease enter a numerical value\n");
                    } else if (!/^\d+$/.test(input)) {
                        return chalk.bold.italic.rgb(567,87,34)("\n\t\tPlease enter a valid number\n");
                    } else if (input.length !== 11) {
                        return chalk.bold.italic.rgb(567,87,34)("\n\t\tPlease enter exactly 11 digits\n");
                    }
                    return true; // Input is valid
                }
                    
            }
            
        ]
    )
    user.first_name = details.name.toUpperCase()
    user.last_name = details.lname.toUpperCase()
    user.age = details.age
    user.gender = details.gender.toUpperCase()
    user.mobile_number = details.mobileNo
    console.log(chalk.rgb(224, 176, 255).italic.bold(user.getcustomerInfo()));
    console.log(chalk.rgb(224, 176, 255).italic.bold(`
             "Your account has been successfully created"
                 \n\t\t${chalk.rgb(224, 176, 255)(user.first_name.toUpperCase())}  your pin code is: ${chalk.yellow(user.pinCode)}\n`));
    
}


async function bank_service() {
    await getuserInfo()
    let condition = true
    while (condition){
    let service = await inquirer.prompt(
        [
            {
                name : "select",
                type : "list",
                message :chalk.bold.rgb(244, 149, 194)( "Please Select The Service?"),
                choices : [
                    "View Balance",
                    "Cash Withdraw",
                    "Cash Deposite",
                    "exit"
                ]
            }
        ]  
    );

    if(service.select == "View Balance"){
        let res = await inquirer.prompt(
            [
                {
                    name : "num",
                    type : "input",
                    message :chalk.bold.rgb(244, 149, 194)( "Please Enter Your pin Number ?"),

                }
            ]
        );
        let no = account.bankaccount(res.num)
        console.log(chalk.italic.rgb(322,56,561)(`\n\t\tHere is your account balance ${no}\n`));
    
    }else if(service.select == "Cash Withdraw"){
        let res = await inquirer.prompt(
            {
                name: "code",
                type: "input",
                message:chalk.rgb(244, 149, 194).italic("please enter your PIN code"),
                validate: (input: string) => {
                    if (input.trim() === '') {
                        return chalk.italic.rgb(567,87,34)( "\n\t\tpin code cannot be empty\n");
                    }
                    const number = parseInt(input);
                    if (isNaN(number)) {
                        return chalk.italic.rgb(567,87,34)( "\n\t\tPlease enter a numerical value\n");
                    } else if (!/^\d+$/.test(input)) {
                        return chalk.italic.rgb(567,87,34)("\n\t\tPlease enter a valid number\n");
                    } 
                    return true; // Input is valid
                }

            }
                
        );

        let debits = await inquirer.prompt([
            {
                name:"deb",
                type :"number",
                message:chalk.rgb(244, 149, 194).italic("Enter the amount you want to debit "),
                validate : (number)=> /^\d+$/.test(number)? true :chalk.bold.rgb(567,87,34)( "\n\t\tPlease enter only numerical value\n")

            }

        ])
        account.Debit( res.code , debits.deb)
    }else if(service.select == "Cash Deposite"){
        let res = await inquirer.prompt(
            {
                name: "code",
                type: "input",
                message:chalk.rgb(244, 149, 194).italic("please enter your PIN code"),
                validate: (input: string) => {
                    if (input.trim() === '') {
                        return chalk.italic.rgb(567,87,34)("\n\t\tpin code cannot be empty\n");
                    }
                    const number = parseInt(input);
                    if (isNaN(number)) {
                        return chalk.italic.rgb(567,87,34)("\n\t\tPlease enter a numerical value\n");
                    } else if (!/^\d+$/.test(input)) {
                        return chalk.italic.rgb(567,87,34)( "\n\t\tPlease enter a valid number\n");
                    } 
                    return true; // Input is valid
                }

            }
                
        );

        let debits = await inquirer.prompt([
            {
                name:"deb",
                type :"number",
                message:chalk.rgb(244, 149, 194).italic("Enter the amount you want to debit "),
                validate : (number)=> /^\d+$/.test(number)? true :chalk.bold.rgb(567,87,34)( "\n\t\tPlease enter only numerical value\n")

            }
        ])
        account.Credit( res.code ,debits.deb)

    }
    else if(service.select == "exit"){
        break;
    }
}


}

bank_service()