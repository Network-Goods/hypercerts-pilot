import { Address, BigInt, crypto, log } from "@graphprotocol/graph-ts";
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
  HyperCertMinter,
  SlotChanged,
} from "../generated/HyperCertMinter/HyperCertMinter";
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
  let contract = HyperCertMinter.bind(event.address);

  let claim = contract.getImpactCert(event.params.id);
  let metadata = contract.slotURI(event.params.id);

  const hypercertId = event.params.id.toHexString();
  let entity = new Hypercert(hypercertId);
  entity.claimHash = claim.claimHash;
  const contributors = [] as string[];
  let totalUnits = BigInt.fromI32(0);

  for (let i = 0; i < event.params.fractions.length; i++) {
    const units = event.params.fractions[i];
    totalUnits = totalUnits.plus(units);
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
  const impactScopes = [] as string[];
  const workScopes = [] as string[];
  const rights = [] as string[];

  if (claim.impactScopes && claim.impactScopes.length > 0) {
    for (let i = 0; i < claim.impactScopes.length; i++) {
      const impactScopeID = claim.impactScopes[i];
      if (impactScopeID) {
        impactScopes.push(impactScopeID.toHexString());
      }
    }
  }

  entity.impactScopes = impactScopes;

  if (claim.workScopes && claim.workScopes.length > 0) {
    for (let i = 0; i < claim.workScopes.length; i++) {
      const workScopeID = claim.workScopes[i];
      workScopes.push(workScopeID.toHexString());
    }
  }

  entity.workScopes = workScopes;

  if (claim.rights && claim.rights.length > 0) {
    for (let i = 0; i < claim.rights.length; i++) {
      const rightsID = claim.rights[i];
      rights.push(rightsID.toHexString());
    }
  }

  entity.rights = rights;

  entity.workDateFrom = claim.workTimeframe[0];
  entity.workDateTo = claim.workTimeframe[1];

  entity.uri = claim.uri;
  entity.metadata = metadata;
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
  let contract = HyperCertMinter.bind(event.address);

  const fractionID = event.params._tokenId.toHexString();
  let fraction = HypercertFraction.load(fractionID);
  if (fraction) {
    // Burn
    if (event.params._newSlot.isZero()) {
      fraction.owner = Address.zero().toHexString();
      fraction.hypercert = Address.zero().toHexString();
      fraction.save();
      return;
    }
  }

  if (!fraction) {
    // Mint
    if (!event.params._newSlot.isZero()) {
      const ownerAddress = contract.try_ownerOf(event.params._tokenId);
      if (ownerAddress.reverted) {
        return;
      }

      let owner = Owner.load(ownerAddress.value.toHexString());
      if (!owner) {
        owner = new Owner(ownerAddress.value.toHexString());
        owner.save();
      }

      fraction = new HypercertFraction(fractionID);
      fraction.units = BigInt.fromI32(0);
      fraction.owner = owner.id;
      fraction.hypercert = event.params._newSlot.toHexString();
      fraction.save();
    }
  }
}

export function handleTransfer(event: Transfer): void {
  const tokenIdHex = event.params.tokenId.toString();
  const toHex = event.params.to.toHexString();

  let token = HypercertFraction.load(tokenIdHex);
  if (token) {
    let owner = Owner.load(toHex);
    if (!owner) {
      owner = new Owner(toHex);
      owner.save();
    }
    token.owner = owner.id;
    token.save();
  }
}

export function handleTransferValue(event: TransferValue): void {
  let contract = HyperCertMinter.bind(event.address);

  const fromTokenID = event.params._fromTokenId.toHexString();
  const toTokenID = event.params._toTokenId.toHexString();
  const value = event.params._value;

  let hypercertSlot = contract.try_slotOf(event.params._toTokenId);
  let hypercertID = Address.zero().toHexString();

  if (!hypercertSlot.reverted) {
    hypercertID = hypercertSlot.value.toHexString();
  }

  if (!event.params._fromTokenId.isZero()) {
    let fractionFrom = HypercertFraction.load(fromTokenID);
    if (fractionFrom) {
      fractionFrom.units = fractionFrom.units.minus(value);
      fractionFrom.save();
    }
  }

  // To
  const ownerAddress = contract.try_ownerOf(event.params._toTokenId);
  if (ownerAddress.reverted) {
    return;
  }

  let owner = Owner.load(ownerAddress.value.toHexString());
  if (!owner) {
    owner = new Owner(ownerAddress.value.toHexString());
    owner.save();
  }

  let fractionTo = HypercertFraction.load(toTokenID);
  if (fractionTo) {
    fractionTo.units = fractionTo.units.plus(value);
  }

  if (!fractionTo) {
    fractionTo = new HypercertFraction(toTokenID);
    fractionTo.units = value;
    fractionTo.hypercert = hypercertID;
    fractionTo.owner = owner.id;
  }

  fractionTo.save();
}

export function handleUpgraded(event: Upgraded): void {}