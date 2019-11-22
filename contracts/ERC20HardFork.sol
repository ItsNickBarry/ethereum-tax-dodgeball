pragma solidity >=0.4.21 <0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol';
import './ERC20Source.sol';

contract ERC20HardFork is ERC20, ERC20Detailed {
  bool private _airdropped;

  ERC20Source private _source;

  constructor
    (string memory name, string memory symbol, address source)
    public
    ERC20Detailed(name, symbol, uint8(18))
  {
    _source = ERC20Source(source);
    uint supply = _source.totalSupply();
    require(supply > 0, 'ERC20HardFork: source token has no supply');
    _mint(address(this), supply);
  }

  function airdrop () external {
    require(!_airdropped, 'ERC20HardFork: airdrop may only be executed once');
    address[] memory taxpayers = _source.taxpayers();

    for (uint i = 0; i < taxpayers.length; i++) {
      address taxpayer = taxpayers[i];
      _transfer(address(this), taxpayer, _source.balanceOf(taxpayer));
      taxpayer.call.gas(0)("AN AIRDROP HAS TAKEN PLACE FOLLOWING A HARD FORK; REVIEW YOUR TAX OBLIGATIONS AT https://www.irs.gov/pub/irs-drop/rr-19-24.pdf");
    }

    _airdropped = true;
  }
}
