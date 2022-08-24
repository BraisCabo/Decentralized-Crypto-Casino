import { ethers } from "ethers";
import CasinoAbi from "../backend/contractsData/Casino.json";
import CasinoAddress from "../backend/contractsData/Casino-address.json";

    let casino = null;

    const loadContracts = async(signer) => {
        casino = new ethers.Contract(CasinoAddress.address, CasinoAbi.abi, signer);
    }

    const tokenBalance = async(acc) =>{
        const balance = await casino.tokenBalance(acc);
        return parseInt(balance._hex);
    }

    const buyTokens = async(tokenNum, price) =>{
        await (await casino.compraTokens(tokenNum, {value: ethers.utils.parseEther(price.toString())})).wait();
    }

    const tokenPrice = async() =>{
        const price = await casino.precioTokens(1)
        return ethers.utils.formatEther(price._hex)
    }

    const historial = async(account) =>{
        const historial = await casino.tuHistorial(account)
        let historialParsed = []
        historial.map((game) => (
            historialParsed.push([game[2], parseInt(game[0]), parseInt(game[1])])
          ))
        return historialParsed
    }

    export default {loadContracts, tokenBalance, buyTokens, tokenPrice, historial};





