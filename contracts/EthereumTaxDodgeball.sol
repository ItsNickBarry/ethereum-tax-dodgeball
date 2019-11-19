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

  event Deployment(address token);
  event HardFork(address token);
  event LiquidityAdded(address token, uint costBasis, uint volume);
  event Airdrop(address taxpayer);

  /**
   * @dev deploy a zero-value token to be distributed via bona fide gifts
   * @param supply of tokens to gift to each taxpayer
   */
  function deployToken (uint supply, address[] calldata taxpayers) external {
    ERC20Source token = new ERC20Source(supply, taxpayers);
    emit Deployment(address(token));
  }

  /**
   * @dev "A hard fork is unique to distributed ledger technology and occurs
   *   when a cryptocurrency on a distributed ledger undergoes a protocol change
   *   resulting in a permanent diversion from the legacy or existing
   *   distributed ledger."
   * @param name name of new token ('ETD ' will be prepended, ex: 'Ether' -> 'ETD Ether')
   * @param symbol of new token ('ETD' will be prepended, ex: 'ETH' -> 'ETDETH')
   * @param source address of existing token to be hard forked
   */
  function hardFork (string calldata name, string calldata symbol, address source) external returns (address) {
    ERC20HardFork hardForkToken = new ERC20HardFork(name, symbol, source);
    ERC20Source(source).pause();
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
  function addLiquidity (address hardForkToken, uint volume) external payable {
    _offers[hardForkToken] = Offer(msg.sender, msg.value, volume);
    emit LiquidityAdded(hardForkToken, msg.value, volume);
  }

  /**
   * @dev "An airdrop is a means of distributing units of a cryptocurrency to
   *   the distributed ledger addresses of multiple taxpayers."
   * @param hardForkToken token to airdrop
   * @param taxpayers recipients of airdrop
   */
  function airdrop (address hardForkToken, address[] calldata taxpayers) external {
    require(_offers[hardForkToken].seller != address(0), 'EthereumTaxDodgeball: hard fork token must have liquidity');
    for (uint i = 0; i < taxpayers.length; i++) {
      address taxpayer = taxpayers[i];
      ERC20HardFork(hardForkToken).airdrop(taxpayer);
      taxpayer.call.gas(0)("AN AIRDROP HAS TAKEN PLACE FOLLOWING A HARD FORK; REVIEW YOUR TAX OBLIGATIONS AT https://www.irs.gov/pub/irs-drop/rr-19-24.pdf");
      emit Airdrop(taxpayer);
    }
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
   * @dev see #addLiquidity
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
}
