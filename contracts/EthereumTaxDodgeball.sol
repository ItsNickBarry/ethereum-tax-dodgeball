pragma solidity >=0.4.21 <0.6.0;

import './ERC20Source.sol';
import './ERC20HardFork.sol';

contract EthereumTaxDodgeball {
  struct Offer {
    address seller;
    uint value;
    uint volume;
  }

  mapping (address => Offer) _offers;

  address private _owner;
  uint private _optOutFee;
  mapping (address => bool) private _optOuts;

  event Deployment(address token);
  event HardFork(address token);
  event LiquidityAdded(address token, uint costBasis, uint volume);
  event Airdrop(address token);

  constructor (uint optOutFee) public {
    _owner = msg.sender;
    _optOutFee = optOutFee;
  }

  /**
   * @dev deploy a zero-value token to be distributed via bona fide gifts
   * @param supplyPerTaxpayer quantity of tokens to gift to each taxpayer
   * @param taxpayers recipients of minted tokens
   */
  function deployToken (string calldata name, string calldata symbol, uint supplyPerTaxpayer, address[] calldata taxpayers) external {
    for (uint i = 0; i < taxpayers.length; i++) {
      require(!_optOuts[taxpayers[i]], 'EthereumTaxDodgeball: taxpayer has opted out');
    }
    ERC20Source token = new ERC20Source(name, symbol, supplyPerTaxpayer, taxpayers);
    emit Deployment(address(token));
  }

  /**
   * @dev "A hard fork is unique to distributed ledger technology and occurs
   *   when a cryptocurrency on a distributed ledger undergoes a protocol change
   *   resulting in a permanent diversion from the legacy or existing
   *   distributed ledger."
   * @param name name of new token ('ETD ' will be prepended, ex: 'Ether' -> 'ETD Ether')
   * @param symbol of new token ('ETD' will be prepended, ex: 'ETH' -> 'ETDETH')
   * @param sourceToken address of existing token to be hard forked
   */
  function hardFork (string calldata name, string calldata symbol, address sourceToken) external returns (address) {
    ERC20HardFork hardForkToken = new ERC20HardFork(name, symbol, sourceToken);
    ERC20Source(sourceToken).pause();
    emit HardFork(address(hardForkToken));
  }

  /**
   * @dev "When a taxpayer receives property that is not purchased, unless
   *   otherwise provided in the Code, the taxpayer’s basis in the property
   *   received is determined by reference to the amount included in gross
   *   income, which is the fair market value of the property when the property
   *   is received.  See generally §§ 61 and 1011; see also §1.61-2(d)(2)(i)."
   * @param hardForkToken token whose liquidity is to be increased
   * @param volume quantity of tokens to offer to purchase
   */
  function addLiquidity (address hardForkToken, uint volume) external payable {
    require(msg.value > 0, 'EthereumTaxDodgeball: value must be non-zero');
    require(_offers[hardForkToken].seller == address(0), 'EthereumTaxDodgeball: hard fork token must not have liquidity');
    _offers[hardForkToken] = Offer(msg.sender, msg.value, volume);
    emit LiquidityAdded(hardForkToken, msg.value, volume);
  }

  /**
   * @dev "An airdrop is a means of distributing units of a cryptocurrency to
   *   the distributed ledger addresses of multiple taxpayers."
   * @param hardForkToken token to airdrop
   */
  function airdrop (address hardForkToken) external {
    require(_offers[hardForkToken].seller != address(0), 'EthereumTaxDodgeball: hard fork token must have liquidity');
    ERC20HardFork(hardForkToken).airdrop();
    emit Airdrop(hardForkToken);
  }

  /**
   * @dev see #addLiquidity
   */
  function removeLiquidity (address hardForkToken) external {
    Offer storage offer = _offers[hardForkToken];
    require(offer.seller == msg.sender, 'EthereumTaxDodgeball: sender must be offer owner');
    uint value = offer.value;

    delete _offers[hardForkToken];
    msg.sender.call.value(value)("");
  }

  /**
   * @dev "Under § 61, all gains or undeniable accessions to wealth, clearly
   *   realized, over which a taxpayer has complete dominion, are included in
   *   gross income."
   * @param hardForkToken token to exchange for ether
   */
  function takeLiquidity (address hardForkToken) external {
    Offer storage offer = _offers[hardForkToken];
    require(offer.seller != address(0), 'EthereumTaxDodgeball: offer must exist');
    ERC20HardFork token = ERC20HardFork(hardForkToken);
    require(token.allowance(msg.sender, address(this)) >= offer.volume, 'EthereumTaxDodgeball: taxpayer must grant sufficient token allowance to contract');
    token.transferFrom(msg.sender, offer.seller, offer.volume);
    uint value = offer.value;

    delete _offers[hardForkToken];
    msg.sender.call.value(value)("");
  }

  /**
   * @dev opt out of participation
   */
  function optOut () external payable {
    require(msg.value >= _optOutFee, 'EthereumTaxDodgeball: taxpayer must pay opt-out fee');
    require(!_optOuts[msg.sender], 'EthereumTaxDodgeball: taxpayer has already opted out');
    _optOuts[msg.sender] = true;
    _owner.call.value(msg.value)("");
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
   * @dev get opt-out fee
   * @return uint opt-out fee
   */
  function getOptOutFee () external view returns (uint) {
    return _optOutFee;
  }

  /**
   * @dev set new opt-out fee
   * @param fee amount (in wei) taxpayer must pay in order to opt out
   */
  function setOptOutFee (uint fee) external {
    require(msg.sender == _owner, 'EthereumTaxDodgeball: sender must be owner');
    _optOutFee = fee;
  }

  /**
   * @dev set new owner
   * @param owner new owner
   */
  function setOwner (address owner) external {
    require(msg.sender == _owner, 'EthereumTaxDodgeball: sender must be owner');
    _owner = owner;
  }
}
