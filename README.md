<sub>**This work was done as part of the Course work by Author: Abdyukov Z.M. **</sub> 
<h3>Content</h3>

[Brief introduction](https://github.com/StrongerProgrammer7/bridge_ton_eth_through_db?tab=readme-ov-file#-brief-introduction-)<br>
[Development tools](https://github.com/StrongerProgrammer7/bridge_ton_eth_through_db?tab=readme-ov-file#development-tools-and-programming-language)<br>
[Architecture](https://github.com/StrongerProgrammer7/bridge_ton_eth_through_db?tab=readme-ov-file#architecture)<br>
[View Prototype](https://github.com/StrongerProgrammer7/bridge_ton_eth_through_db?tab=readme-ov-file#-view-prototype-)
[TODO](https://github.com/StrongerProgrammer7/bridge_ton_eth_through_db?tab=readme-ov-file#-todo-)

<div align="center">
<h1>Bridge TON - ETH through DB</h1>
<h2>Interaction Patient between Doctor </h2>
</div>
<div>
<h3 align="center"> Brief introduction </h3>
 <p>The main goal of the work is to create a bridge between ETH & TON smart contracts through a database. This will increase work flexibility by allowing patients and doctors to use different wallets.<br><br>
The scientific novelty of the paper is that a new approach to patient-physician interaction through the use of different wallets is proposed.</p>
    <h4 align="center">It's work continue previous works</h4>
    <p align="justify">Only front-end and smart contract ETH and used IPFS:<br/> https://github.com/StrongerProgrammer7/SmartContractPatients</p>
    <p align="justify">Front-end + Back-end. Used MySql for store big data and contract ETH only for access to record patient:<br/> https://github.com/StrongerProgrammer7/SmartContractPatients</p>
 <h4> How it work </h4>
 <p>
  In our work, the database server will be used as a bridge to ensure cross-chain interaction between different blockchains. The database stores records of patients, doctors, as well as their wallet addresses and smart contract addresses. <br/>
  The wallet address is a unique identifier that is used to send and receive cryptocurrency tokens and log into the application profile acting as a login, and the smart contract address is the address of the contract deployed on the blockchain, which contains the logic of performing actions and managing data.<br/>
  The logic of our smart contracts includes storing the addresses of those doctors who have been granted access and contains an access verification operation. If there is no access, the doctor cannot make or change the patient's record.
 </p>
</div> 
<div> 
<h3 align="center">Development tools and Programming Language</h3>
<p align="justify"> For Smart Contract, i used Solidity and IDE Remix(Debug contract) for ETH and TACT for TON, also Personal Blockchain Ganache</p>
<p align="justify"><strong>Inside our server, server-ganache is enabled. And the smart contract is deployed inside server-ganahce</strong></p>
<p align="justify"> For Web-Site, used React(Vite) and NodeJS</p>
<p><b>Node v18.13.0 ,<br>npm v8.19.3</b></p>
 <p>List instuments: npm, nodejs, react , vite, ton, ganachem blueprint, tact, openZepplinContracts, remixIDE, vscode</p>
</div>
<div>
<h3 align="center">Architecture</h3>
 <p> Scheme Database & smart-contracts</p>
 <img src="https://github.com/StrongerProgrammer7/bridge_ton_eth_through_db/assets/71569051/584b4a17-155e-4e3b-8d46-caf06db728fd" alt="scheme db"/>
<p>Deployment diagram</p>
<img width="450px" src="https://github.com/StrongerProgrammer7/bridge_ton_eth_through_db/assets/71569051/bb18dfb7-22e2-48f2-8e26-51e449947e0e" alt="" />
<p>Sequence diagrams</p>
<img width="550px" src="https://github.com/StrongerProgrammer7/bridge_ton_eth_through_db/assets/71569051/259058be-7f3b-494a-a310-ffbd8ccdf315" />
</div>
<div>
 <h3 align="center"> View prototype </h3>
 <p>The interface has not changed based on previous work. Except that the ability to use the TON wallet and switch between wallets has been added.</p>
 <p> Choose wallet</p>
 <img src="https://github.com/StrongerProgrammer7/bridge_ton_eth_through_db/assets/71569051/3bdf48c6-f742-4948-9b73-ca5d861d0857" />
 <p> Cost Eth</p>
 <img src="https://github.com/StrongerProgrammer7/bridge_ton_eth_through_db/assets/71569051/cbbb386f-79f2-4a79-8867-c6a36e710550" />
 <p> Cost TON </p>
 <img src="https://github.com/StrongerProgrammer7/bridge_ton_eth_through_db/assets/71569051/541597b2-51e7-4016-a6f4-8943bdf85d88" />
 <p> If not have access</p>
 <img src="https://github.com/StrongerProgrammer7/bridge_ton_eth_through_db/assets/71569051/bb5037ca-e169-490b-b997-bdb207412fe0" />
</div>
<div>
 <h3> TODO: </h3>
1) addition, notification and reminder system, functionality for making an appointment with a doctor online, the ability to store the results of medical research and analyses in encrypted form,<br/>
2) Optimizing the application interface to improve the user experience,<br/>
3) further improvement of data security and protection mechanisms, including the implementation of encryption and authentication methods to ensure the confidentiality of patient medical data, <br/>
4) considering the possibility of integration with other blockchain platforms besides Eth and Ton to expand the capabilities and flexibility of the application, <br/>
5) Ecosystem expansion: Involving partners in the development and expansion of the ecosystem, including medical institutions, insurance companies, pharmaceutical companies and other healthcare participants,<br/>
6) providing users with the opportunity to have contracts of both blockchain networks. <br/>
7) adaptive front-end for smartphone
</div>
<h4> Author: Abdyukov Z.M. </h4>
