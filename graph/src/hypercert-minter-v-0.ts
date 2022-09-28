import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  AdminChanged,
  ApprovalForAll,
  BeaconUpgraded,
  ImpactClaimed,
  Initialized,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer,
  TransferValue,
  Upgraded,
  RightAdded,
  WorkScopeAdded,
  ImpactScopeAdded,
  HypercertMinterV0,
  SlotChanged,
} from "../generated/HypercertMinterV0/HypercertMinterV0";
import {
  Contributor,
  Hypercert,
  HypercertFraction,
  ImpactScope,
  Owner,
  Right,
  WorkScope,
} from "../generated/schema";

export function handleImpactClaimed(event: ImpactClaimed): void {
  // TODO id will be slotID
  const hypercertId = event.params.id.toString();
  let entity = new Hypercert(hypercertId);
  entity.claimHash = event.params.claimHash;
  const contributors = [] as string[];

  for (let i = 0; i < event.params.contributors.length; i++) {
    const address = event.params.contributors[i];
    contributors.push(address.toHexString());
  }

  entity.contributors = contributors;
  for (let i = 0; i < contributors.length; i++) {
    const contributorId = contributors[i];
    let contributor = Contributor.load(contributorId);
    if (!contributor) {
      contributor = new Contributor(contributorId);
    }
    contributor.save();
  }

  entity.minter = event.params.minter.toHex();
  entity.impactDateFrom = event.params.impactTimeframe[0];
  entity.impactDateTo = event.params.impactTimeframe[1];
  entity.impactScopes = event.params.impactScopes;
  entity.workDateFrom = event.params.workTimeframe[0];
  entity.workDateTo = event.params.workTimeframe[1];
  entity.workScopes = event.params.workScopes;
  entity.rights = event.params.rights;

  //TODO totalUnits from event
  entity.totalUnits = BigInt.fromString("100000");

  //TODO image from SVG contract
  entity.image =
    "https://bafybeig2ea5p2xw2d5c552x3ocxj2xavsb6nglwczv2hyza7yhu2wvny5a.ipfs.dweb.link/";
  entity.uri = event.params.uri;
  entity.version = event.params.version;
  entity.lastUpdated = event.block.timestamp;

  entity.save();
}

export function handleImpactScopeAdded(event: ImpactScopeAdded): void {
  let entity = new ImpactScope(event.params.id);
  entity.text = event.params.text;
  entity.save();
}

export function handleInitialized(event: Initialized): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleRightAdded(event: RightAdded): void {
  let entity = new Right(event.params.id);
  entity.text = event.params.text;
  entity.save();
}

export function handleWorkScopeAdded(event: WorkScopeAdded): void {
  let entity = new WorkScope(event.params.id);
  entity.text = event.params.text;
  entity.save();
}

export function handleSlotChanged(event: SlotChanged): void {
  let contract = HypercertMinterV0.bind(event.address);

  const fractionID = event.params._tokenId.toHexString();
  const hypercertId = event.params._newSlot.toHexString();

  let fraction = HypercertFraction.load(fractionID);

  if (!fraction) {
    fraction = new HypercertFraction(fractionID);
    fraction.units = BigInt.fromI32(0);
    fraction.owner = event.transaction.from.toHexString();
  }
  fraction.hypercert = hypercertId;

  fraction.save();
}

export function handleTransfer(event: Transfer): void {
  // const token = id.toString();
  // const zeroAddress = Address.zero().toHexString();
  // const fromHex = from.toHexString();
  // const toHex = to.toHexString();
  // TODO update owners on transfer
}

export function handleTransferValue(event: TransferValue): void {
  let contract = HypercertMinterV0.bind(event.address);

  const fromTokenID = event.params._fromTokenId.toHexString();
  const toTokenID = event.params._toTokenId.toHexString();
  const value = event.params._value;

  const fractionFrom = HypercertFraction.load(fromTokenID);
  if (fractionFrom) {
    fractionFrom.units = fractionFrom.units.minus(value);
    fractionFrom.save();
  }

  let fractionTo = HypercertFraction.load(toTokenID);
  if (!fractionTo) {
    fractionTo = new HypercertFraction(toTokenID);
    fractionTo.hypercert = contract
      .slotOf(BigInt.fromString(fromTokenID))
      .toHexString();
    fractionTo.units = BigInt.fromI32(0);
  }

  fractionTo.units = fractionTo.units.plus(value);
  fractionTo.save();
}

export function handleUpgraded(event: Upgraded): void {}
