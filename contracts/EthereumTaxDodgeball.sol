pragma solidity *;

import './ERC20HardFork.sol';
import './IForkDelta.sol';

contract EthereumTaxDodgeball {
  address payable private _owner;

  IForkDelta private _exchange;
  uint private _nonce;

  mapping (address => bool) private _optOuts;
  uint public _optOutFee;

  event HardFork(address token);
  event LiquidityAdded(address token, uint costBasis);
  event Airdrop(address taxpayer);

  modifier onlyOwner () {
    require(msg.sender == _owner);
    _;
  }

  /**
   * @param exchange address of ForkDelta contract used to provide liquidity
   * @param optOutFee fee (in wei) to opt out of participation
   */
  constructor (address exchange, uint optOutFee) public {
    _owner = msg.sender;
    _exchange = IForkDelta(exchange);
    _optOutFee = optOutFee;
  }

  /**
   * @dev "A hard fork is unique to distributed ledger technology and occurs
   *   when a cryptocurrency on a distributed ledger undergoes a protocol change
   *   resulting in a permanent diversion from the legacy or existing
   *   distributed ledger."
   * @param name name of new token ('ETD ' will be prepended, ex: 'Ether' -> 'ETD Ether')
   * @param symbol of new token ('ETD' will be prepended, ex: 'ETH' -> 'ETDETH')
   */
  function hardFork (string calldata name, string calldata symbol) external returns (address) {
    ERC20HardFork hardForkToken = new ERC20HardFork(name, symbol);
    emit HardFork(address(hardForkToken));
  }

  /**
   * @dev "When a taxpayer receives property that is not purchased, unless
   *   otherwise provided in the Code, the taxpayer’s basis in the property
   *   received is determined by reference to the amount included in gross
   *   income, which is the fair market value of the property when the property
   *   is received.  See generally §§ 61 and 1011; see also §1.61-2(d)(2)(i)."
   * @param hardForkToken token whose liquidity is to be increased
   */
  function addLiquidity (address hardForkToken) external payable {
    _exchange.deposit.value(msg.value)();
    _exchange.order(hardForkToken, 1, address(0), msg.value, block.timestamp + (1 minutes), _nonce++);
    emit LiquidityAdded(hardForkToken, msg.value);
  }

  /**
   * @dev "An airdrop is a means of distributing units of a cryptocurrency to
   *   the distributed ledger addresses of multiple taxpayers."
   * @param hardForkToken token to airdrop
   * @param taxpayer recipient of airdrop
   */
  function airdrop (address hardForkToken, address taxpayer) external {
    require(!_optOuts[taxpayer]);
    // TODO: must have more than one taxpayer
    ERC20HardFork(hardForkToken).airdrop(taxpayer);
    taxpayer.call.gas(0)("AN AIRDROP HAS TAKEN PLACE FOLLOWING A HARD FORK; REVIEW YOUR TAX OBLIGATIONS AT https://www.irs.gov/pub/irs-drop/rr-19-24.pdf");
    emit Airdrop(taxpayer);
  }

  /**
   * @dev see #addLiquidity
   */
  function removeLiquidity () external {
    // TODO: prevent taggers from withdrawing each other's liquidity
    uint previousBalance = address(this).balance;
    uint balance = _exchange.balanceOf(address(0), address(this));
    // address(_exchange).call(abi.encodeWithSignature("withdraw(uint256)", balance));
    _exchange.withdraw(balance);
    msg.sender.transfer(balance);
  }

  /**
   * @dev see #addLiquidity
   * @param token address of token to withdraw
   */
  // function removeLiquidity (address token) public {
  //   ERC20HardFork hardForkToken = ERC20HardFork(token);
  //   uint previousBalance = hardForkToken.balanceOf(address(this));
  //   _exchange.withdrawToken(token, _exchange.balanceOf(token, address(this)));
  //   hardForkToken.transfer(msg.sender, hardForkToken.balanceOf(address(this)) - previousBalance);
  // }

  /**
   * @dev opt out of participation
   */
  function optOut () external payable {
    require(msg.value >= _optOutFee);
    require(!_optOuts[msg.sender]);
    _optOuts[msg.sender] = true;
    _owner.transfer(msg.value);
  }

  /**
   * @dev query whether address has opted out
   * @param taxpayer address to query
   * @return bool whether taxpayer has opted out
   */
  function isOptedOut (address taxpayer) external view returns (bool) {
    return _optOuts[taxpayer];
  }

  /**
   * @dev set new opt-out fee
   * @param fee amount (in wei) taxpayer must pay in order to opt out
   */
  function setOptOutFee (uint fee) external onlyOwner {
    _optOutFee = fee;
  }
}
