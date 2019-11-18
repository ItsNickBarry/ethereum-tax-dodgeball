pragma solidity *;

interface IForkDelta {
  function balanceOf (address token, address user) external view returns (uint);
  function order (address tokenGet, uint amountGet, address tokenGive, uint amountGive, uint expires, uint nonce) external;
  function deposit () external payable;
  function withdraw (uint amount) external;
  function withdrawToken (address token, uint amount) external;
}
