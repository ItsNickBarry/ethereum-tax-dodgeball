pragma solidity >=0.4.21 <0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol';

contract ERC20Source is ERC20, ERC20Detailed, ERC20Pausable {
  address[] private _taxpayers;

  constructor
    (string memory name, string memory symbol, uint supply, address[] memory taxpayers)
    public
    ERC20Detailed(name, symbol, uint8(18))
  {
    for (uint i = 0; i < taxpayers.length; i++) {
      _mint(taxpayers[i], supply);
    }

    _taxpayers = taxpayers;
  }

  function taxpayers () external view returns (address[] memory) {
    return _taxpayers;
  }
}
