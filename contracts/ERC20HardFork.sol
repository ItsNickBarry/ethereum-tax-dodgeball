pragma solidity *;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';

contract ERC20HardFork is ERC20, ERC20Detailed {
  mapping (address => bool) private _airdrops;

  constructor
    (string memory name, string memory symbol)
    public
    ERC20Detailed(
      string(abi.encodePacked("ETD ", name)),
      string(abi.encodePacked("ETD", symbol)),
      uint8(18)
    )
  {
  }

  function airdrop (address taxpayer) external {
    require(!_airdrops[taxpayer]);
    _airdrops[taxpayer] = true;
    _mint(taxpayer, taxpayer.balance);
  }
}
