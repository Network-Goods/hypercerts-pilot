import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  ImpactClaimed,
  ImpactScopeAdded,
  Initialized,
  RightAdded,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SlotChanged,
  Transfer,
  TransferValue,
  Upgraded,
  WorkScopeAdded,
} from "../generated/HyperCertMinter/HyperCertMinter";

export function createImpactClaimedEvent(
  id: BigInt,
  minter: Address,
  fractions: Array<BigInt>
): ImpactClaimed {
  let impactClaimedEvent = changetype<ImpactClaimed>(newMockEvent());

  impactClaimedEvent.parameters = new Array();

  impactClaimedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  );

  impactClaimedEvent.parameters.push(
    new ethereum.EventParam("minter", ethereum.Value.fromAddress(minter))
  );

  impactClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "fractions",
      ethereum.Value.fromUnsignedBigIntArray(fractions)
    )
  );

  return impactClaimedEvent;
}

export function createImpactScopeAddedEvent(
  id: Bytes,
  text: string
): ImpactScopeAdded {
  let impactScopeAddedEvent = changetype<ImpactScopeAdded>(newMockEvent());

  impactScopeAddedEvent.parameters = new Array();

  impactScopeAddedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  );
  impactScopeAddedEvent.parameters.push(
    new ethereum.EventParam("text", ethereum.Value.fromString(text))
  );

  return impactScopeAddedEvent;
}

export function createRightAddedEvent(id: Bytes, text: string): RightAdded {
  let rightAddedEvent = changetype<RightAdded>(newMockEvent());

  rightAddedEvent.parameters = new Array();

  rightAddedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  );
  rightAddedEvent.parameters.push(
    new ethereum.EventParam("text", ethereum.Value.fromString(text))
  );

  return rightAddedEvent;
}

export function createWorkScopeAddedEvent(
  id: Bytes,
  text: string
): WorkScopeAdded {
  let workScopeAddedEvent = changetype<WorkScopeAdded>(newMockEvent());

  workScopeAddedEvent.parameters = new Array();

  workScopeAddedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  );
  workScopeAddedEvent.parameters.push(
    new ethereum.EventParam("text", ethereum.Value.fromString(text))
  );

  return workScopeAddedEvent;
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent());

  initializedEvent.parameters = new Array();

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  );

  return initializedEvent;
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent());

  roleAdminChangedEvent.parameters = new Array();

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  );
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  );
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  );

  return roleAdminChangedEvent;
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent());

  roleGrantedEvent.parameters = new Array();

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  );
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  );
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  );

  return roleGrantedEvent;
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent());

  roleRevokedEvent.parameters = new Array();

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  );
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  );
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  );

  return roleRevokedEvent;
}

export function createSlotChangedEvent(
  tokenId: BigInt,
  fromSlot: BigInt,
  toSlot: BigInt
): SlotChanged {
  let slotChangedEvent = changetype<SlotChanged>(newMockEvent());

  slotChangedEvent.parameters = new Array();

  slotChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  );
  slotChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_oldSlot",
      ethereum.Value.fromUnsignedBigInt(fromSlot)
    )
  );
  slotChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_newSlot",
      ethereum.Value.fromUnsignedBigInt(toSlot)
    )
  );

  return slotChangedEvent;
}

export function createTransferEvent(
  from: Address,
  to: Address,
  id: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent());

  transferEvent.parameters = new Array();

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  );
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  );
  transferEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  );

  return transferEvent;
}

export function createTransferValueEvent(
  from: BigInt,
  to: BigInt,
  value: BigInt
): TransferValue {
  let transferValueEvent = changetype<TransferValue>(newMockEvent());

  transferValueEvent.parameters = new Array();

  transferValueEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromUnsignedBigInt(from))
  );
  transferValueEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromUnsignedBigInt(to))
  );
  transferValueEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  );

  return transferValueEvent;
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent());

  upgradedEvent.parameters = new Array();

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  );

  return upgradedEvent;
}
