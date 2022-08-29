import { newMockEvent } from "matchstick-as";
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  AdminChanged,
  ApprovalForAll,
  BeaconUpgraded,
  ImpactClaimed,
  ImpactScopeAdded,
  Initialized,
  RightAdded,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  TransferBatch,
  TransferSingle,
  URI,
  Upgraded,
  WorkScopeAdded,
} from "../generated/HypercertMinterV0/HypercertMinterV0";

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent());

  adminChangedEvent.parameters = new Array();

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  );
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  );

  return adminChangedEvent;
}

export function createApprovalForAllEvent(
  account: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent());

  approvalForAllEvent.parameters = new Array();

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  );
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  );
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  );

  return approvalForAllEvent;
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent());

  beaconUpgradedEvent.parameters = new Array();

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  );

  return beaconUpgradedEvent;
}

export function createImpactClaimedEvent(
  id: BigInt,
  claimHash: Bytes,
  contributors: Array<Address>,
  workTimeframe: Array<BigInt>,
  impactTimeframe: Array<BigInt>,
  workScopes: Array<Bytes>,
  impactScopes: Array<Bytes>,
  rights: Array<Bytes>,
  version: BigInt,
  uri: string
): ImpactClaimed {
  let impactClaimedEvent = changetype<ImpactClaimed>(newMockEvent());

  impactClaimedEvent.parameters = new Array();

  impactClaimedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  );
  impactClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "claimHash",
      ethereum.Value.fromFixedBytes(claimHash)
    )
  );
  impactClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "contributors",
      ethereum.Value.fromAddressArray(contributors)
    )
  );
  impactClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "workTimeframe",
      ethereum.Value.fromUnsignedBigIntArray(workTimeframe)
    )
  );
  impactClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "impactTimeframe",
      ethereum.Value.fromUnsignedBigIntArray(impactTimeframe)
    )
  );
  impactClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "workScopes",
      ethereum.Value.fromFixedBytesArray(workScopes)
    )
  );
  impactClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "impactScopes",
      ethereum.Value.fromFixedBytesArray(impactScopes)
    )
  );
  impactClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "rights",
      ethereum.Value.fromFixedBytesArray(rights)
    )
  );
  impactClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  );
  impactClaimedEvent.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
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

export function createTransferBatchEvent(
  operator: Address,
  from: Address,
  to: Address,
  ids: Array<BigInt>,
  values: Array<BigInt>
): TransferBatch {
  let transferBatchEvent = changetype<TransferBatch>(newMockEvent());

  transferBatchEvent.parameters = new Array();

  transferBatchEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  );
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  );
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  );
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  );
  transferBatchEvent.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(values)
    )
  );

  return transferBatchEvent;
}

export function createTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let transferSingleEvent = changetype<TransferSingle>(newMockEvent());

  transferSingleEvent.parameters = new Array();

  transferSingleEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  );
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  );
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  );
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  );
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  );

  return transferSingleEvent;
}

export function createURIEvent(value: string, id: BigInt): URI {
  let uriEvent = changetype<URI>(newMockEvent());

  uriEvent.parameters = new Array();

  uriEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  );
  uriEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  );

  return uriEvent;
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