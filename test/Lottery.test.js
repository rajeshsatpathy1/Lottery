const ganache = require('ganache');
const { beforeEach, interfaces, describe, it } = require('mocha');
const { Web3 } = require('web3');

const assert = require('assert');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send( {from : accounts[0], gas : "1000000" })
});

describe('Lottery Contract', () => {
    it("deploys a contract", () => {
        assert.ok(lottery.options.address);
    })

    it("allows one account to enter", async() => {
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei("0.02", "ether")
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[1], players[0]);
        assert.equal(1, players.length);
    });

    it("allows multiple account to enter", async() => {
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei("0.02", "ether")
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei("0.02", "ether")
        });
        await lottery.methods.enter().send({
            from: accounts[3],
            value: web3.utils.toWei("0.02", "ether")
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[1], players[0]);
        assert.equal(accounts[2], players[1]);
        assert.equal(accounts[3], players[2]);
        assert.equal(3, players.length);
    });

    it("requires a minimum amount of ether to enter", async () => {
        try{
            await lottery.methods.enter().send({
                from: accounts[4],
                value: 0
            });
            
            assert(false);
        }catch(err){
            assert(err);
        }
    });

    it("only manager can call pickWinner", async () => {
        try {
            await lottery.methods.pickWinners().send({
                from: accounts[1]
            });
            
            assert(false);
        }catch(err){
            assert(err);
        }
    });

    it("send money to the winner and resets the players", async() => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei("2", "ether")
        });

        let initBalance = await web3.eth.getBalance(accounts[0]);

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
        await lottery.methods.pickWinners().send({
            from: accounts[0]
        });

        let finalBalance = await web3.eth.getBalance(accounts[0]);
        let difference = finalBalance - initBalance;

        // Check if the winner gets rewarded
        assert(difference > web3.utils.toWei("1.8", "ether"));
        // Check if the players are reset
        assert.equal(0, await lottery.methods.getPlayers().call({ from: accounts[0] }));
    });
})