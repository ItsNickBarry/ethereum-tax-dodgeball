pragma solidity >=0.4.21 <0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';

contract ERC20HardFork is ERC20, ERC20Detailed {
  mapping (address => bool) private _airdrops;

  IERC20 private _source;

  constructor
    (string memory name, string memory symbol, address source)
    public
    ERC20Detailed(
      string(abi.encodePacked("ETD ", name)),
      string(abi.encodePacked("ETD", symbol)),
      uint8(18)
    )
  {
    _source = IERC20(source);
    uint supply = _source.totalSupply();
    require(supply > 0, 'ERC20HardFork: source token has no supply');
    _mint(address(this), supply);
  }

  function airdrop (address taxpayer) external {
    require(!_airdrops[taxpayer]);
    _airdrops[taxpayer] = true;
    _transfer(address(this), taxpayer, _source.balanceOf(taxpayer));
  }
}
