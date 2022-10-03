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
  HypercertMinter,
  SlotChanged,
} from "../generated/HypercertMinter/HypercertMinter";
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
  let contract = HypercertMinter.bind(event.address);

  let claim = contract.getImpactCert(event.params.id);

  const hypercertId = claim.claimHash.toHexString();
  let entity = new Hypercert(hypercertId);
  entity.claimHash = claim.claimHash;
  const contributors = [] as string[];
  let totalUnits = BigInt.fromI32(0);

  for (let i = 0; i < event.params.fractions.length; i++) {
    const units = event.params.fractions[i];
    totalUnits = totalUnits.plus(BigInt.fromI32(units));
  }

  entity.totalUnits = totalUnits;

  for (let i = 0; i < claim.contributors.length; i++) {
    const address = claim.contributors[i];
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
  entity.impactDateFrom = claim.impactTimeframe[0];
  entity.impactDateTo = claim.impactTimeframe[1];

  for (let i = 0; i < claim.impactScopes.length; i++) {
    const impactScopeID = claim.impactScopes[i];
    entity.impactScopes.push(impactScopeID.toHexString());
  }

  for (let i = 0; i < claim.workScopes.length; i++) {
    const workScopeID = claim.workScopes[i];
    entity.workScopes.push(workScopeID.toHexString());
  }

  for (let i = 0; i < claim.rights.length; i++) {
    const rightsID = claim.rights[i];
    entity.rights.push(rightsID.toHexString());
  }
  entity.workDateFrom = claim.workTimeframe[0];
  entity.workDateTo = claim.workTimeframe[1];

  //TODO image from SVG contract
  entity.image =
    "https://bafybeig2ea5p2xw2d5c552x3ocxj2xavsb6nglwczv2hyza7yhu2wvny5a.ipfs.dweb.link/";
  entity.uri = claim.uri;
  entity.version = BigInt.fromI32(claim.version);
  entity.lastUpdated = event.block.timestamp;

  entity.save();
}

export function handleImpactScopeAdded(event: ImpactScopeAdded): void {
  let entity = new ImpactScope(event.params.id.toHexString());
  entity.text = event.params.text;
  entity.save();
}

export function handleInitialized(event: Initialized): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleRightAdded(event: RightAdded): void {
  let entity = new Right(event.params.id.toHexString());
  entity.text = event.params.text;
  entity.save();
}

export function handleWorkScopeAdded(event: WorkScopeAdded): void {
  let entity = new WorkScope(event.params.id.toHexString());
  entity.text = event.params.text;
  entity.save();
}

export function handleSlotChanged(event: SlotChanged): void {
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
  let contract = HypercertMinter.bind(event.address);

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