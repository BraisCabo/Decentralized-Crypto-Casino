// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

contract Casino is Ownable{

    ERC20 private token;
     address public tokenAddress;

    function precioTokens(uint256 _numTokens) public pure returns (uint256){
        return _numTokens * (0.001 ether);
    }

    function tokenBalance(address _of) public view returns (uint256){
        return token.balanceOf(_of);
    }

    constructor(){
        token =  new ERC20("Casino", "CAS");
        tokenAddress = address(token);
        token.mint(1000000);
    }

    // Visualizacion del balance de ethers del Smart Contract
    function balanceEthersSC() public view returns (uint256){
        return address(this).balance / 10**18;
    }
     function compraTokens(uint256 _numTokens) public payable{
        // Registro del ususario
        // Establecimiento del coste de los tokens a comprar
        // Evaluacion del dinero que el cliente paga por los tokens
        require(msg.value >= precioTokens(_numTokens), "Compra menos tokens o paga con mas ethers");
        // Creacion de nuevos tokens en caso de que no exista suficiente supply
        if  (token.balanceOf(address(this)) < _numTokens){
            token.mint(_numTokens*100000);
        }
        // Devolucion del dinero sobrante
        // El Smart Contract devuelve la cantidad restante
        payable(msg.sender).transfer(msg.value - precioTokens(_numTokens));
        // Envio de los tokens al cliente/usuario
        token.transfer(address(this), msg.sender, _numTokens);
    }

    // Devolucion de tokens al Smart Contract
    function devolverTokens(uint _numTokens) public payable {
        // El numero de tokens debe ser mayor a 0
        require(_numTokens > 0, "Necesitas devolver un numero de tokens mayor a 0");
        // El usuario debe acreditar tener los tokens que quiere devolver
        require(_numTokens <= token.balanceOf(msg.sender), "No tienes los tokens que deseas devolver");
        // El usuario transfiere los tokens al Smart Contract
        token.transfer(msg.sender, address(this), _numTokens);
        // El Smart Contract envia los ethers al usuario
        payable(msg.sender).transfer(precioTokens(_numTokens)); 
    }

    struct Bet {
        uint tokensBet;
        uint tokensEarned;
        string game;
    }

    struct RouleteResult {
        uint NumberWin;
        bool result;
        uint tokensEarned;
    }

    mapping(address => Bet []) historialApuestas;

    function retirarEth(uint _numEther) public payable onlyOwner {
        // El numero de tokens debe ser mayor a 0
        require(_numEther > 0, "Necesitas devolver un numero de tokens mayor a 0");
        // El usuario debe acreditar tener los tokens que quiere devolver
        require(_numEther <= balanceEthersSC(), "No tienes los tokens que deseas devolver");
        // Transfiere los ethers solicitados al owner del smart contract'
        payable(owner()).transfer(_numEther);
    }

    function tuHistorial(address _propietario) public view returns(Bet [] memory){
        return historialApuestas[_propietario];
    }

    function jugarRuleta(uint _start, uint _end, uint _tokensBet) public returns(RouleteResult memory returned){
        require(_tokensBet <= token.balanceOf(msg.sender));
        require(_tokensBet > 0);
        uint random = uint(uint(keccak256(abi.encodePacked(block.timestamp))) % 14);
        uint tokensEarned = 0;
        bool win = false;
        token.transfer(msg.sender, address(this), _tokensBet);
        if ((random <= _end) && (random >= _start)) {
            win = true;
            if (random == 0) {
                tokensEarned = _tokensBet*14;
            } else {
                tokensEarned = _tokensBet * 2;
            }
            if  (token.balanceOf(address(this)) < tokensEarned){
            token.mint(tokensEarned*100000);
            }
            token.transfer( address(this), msg.sender, tokensEarned);
        }
            addHistorial("Roulete", _tokensBet, tokensEarned, msg.sender);
            return  RouleteResult(random, win, tokensEarned);
    }

    function addHistorial(string memory _game, uint _tokensBet,  uint _tokenEarned, address caller) internal{
        Bet memory apuesta = Bet(_tokensBet, _tokenEarned, _game);
        historialApuestas[caller].push(apuesta);
    }

    }




