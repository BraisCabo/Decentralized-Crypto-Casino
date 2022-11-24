// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IERC20 {

    //Devuelve la cantidad de tokens existentes.
    function totalSupply() external view returns (uint256);

    //Devuelve la cantidad de tokens que posee una `account`.
    function balanceOf(address account) external view returns (uint256);

    /* Realiza una transferencia de tokens a un destinatario.
    Devuelve un valor booleano que indica si la operacion tuvo exito. 
    Emite un evento {Transfer}. */
    function transfer(address from, address to, uint256 amount) external returns (bool);

    /* Se emite cuando se realiza una transferencia de tokens. 
    Ten en cuenta que `value` puede ser cero. */
    event Transfer(address indexed from, address indexed to, uint256 value);
}

// Smart Contract de los tokens ERC20
contract ERC20 is IERC20 {

    // Estructuras de datos
    mapping(address => uint256) private _balances;
    
    // Variables
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;
    address public owner;

    modifier onlyOwner(address _direccion) {
        require(_direccion == owner, "No tienes permisos para ejecutar esta funcion.");
        _;
    }

    /* Establece el valor del nombre y el simbolo del token. 
    El valor por defecto de {decimaes} es 18. Para seleccionar un valor diferente para
    {decimals} debemos remplazarlo. */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
        owner = msg.sender;
    }

    // Devuelve el nombre del token.
    function name() public view virtual returns (string memory) {
        return _name;
    }

    // Devuelve el simbolo del token, normalmente una version mas corta del nombre.
    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    /* Devuelve el numero de decimales utilizados para obtener su representacion de usuario.
    Por ejemplo, si `decimals` es igual a `2`, un saldo de `505` tokens deberia
    mostrarse al usuario como `5.05` (`505 / 10 ** 2`).
    Los tokens suelen optar por un valor de 18, imitando la relacion entre
    Ether y Wei. Este es el valor que utiliza {ERC20}, a menos que esta funcion sea
    sea anulada. */
    function decimals() public view virtual returns (uint8) {
        return 18;
    }

    // Ver: {IERC20-totalSupply}.
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    // Ver: {IERC20-balanceOf}.
    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    /* Ver: {IERC20-transfer}.
    Requisitos:
    - `to` no puede ser la direccion cero.
    - la persona que ejecuta debe tener un saldo de al menos `amount`. */
    function transfer(address from,address to, uint256 amount) public virtual override returns (bool) {
        _transfer(from, to, amount);
        return true;
    }

    function mint(uint256 amount) public virtual onlyOwner(msg.sender) returns (bool) {
        _mint(msg.sender, amount);
        return true;
    }

    /* Mueve `amount` de tokens del `sender` al `recipient`.
    Esta funcion interna es equivalente a {transfer}, y puede utilizarse para
    por ejemplo, implementar fees (tarifas) automaticas de tokens, etc.
    Emite un evento {Transfer}.
    Requisitos:
    - `from` y `to` no pueden ser direcciones cero.
    - `from` debe tener un saldo de al menos `amount`. */
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
        }
        _balances[to] += amount;
        emit Transfer(from, to, amount);
    }

    /* Crea tokens de `amount` y las asigna a `account`, aumentando
    el suministro total.
    Emite un evento {Transfer} con "from" como direccion cero.
    Requisitos:
    - `account` no puede ser la direccion cero. */
    function _mint(address account, uint256 amount) internal virtual{
        require(account != address(0), "ERC20: mint to the zero address");
        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }
}