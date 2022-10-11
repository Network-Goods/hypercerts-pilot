import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  createMockedFunction,
} from "matchstick-as/assembly/index";
import { Contributor, Hypercert, HypercertFraction } from "../generated/schema";
import {
  handleImpactClaimed,
  handleImpactScopeAdded,
  handleRightAdded,
  handleSlotChanged,
  handleTransfer,
  handleTransferValue,
  handleWorkScopeAdded,
} from "../src/hypercert-minter";
import {
  createImpactClaimedEvent,
  createImpactScopeAddedEvent,
  createRightAddedEvent,
  createTransferValueEvent,
  createTransferEvent,
  createWorkScopeAddedEvent,
  createSlotChangedEvent,
} from "./hypercert-minter-utils";

const CONTRIBUTOR = "Contributor";
const OWNER = "Owner";
const HYPERCERT = "Hypercert";
const HYPERCERT_FRACTION = "HypercertFraction";
const IMPACT_SCOPE = "ImpactScope";
const RIGHT = "Right";
const WORK_SCOPE = "WorkScope";

const contributor0 = "0x0716405125cfcad8aaa4f816d2468a8898da374b";

describe(HYPERCERT, () => {
  const id1 = 1;
  const claimHash = "0x307861626c6b736a6466736466736466";
  const workTimeframe0 = 1669849200;
  const workTimeframe1 = 1672441200;
  const impactTimeframe0 = 1672527600;
  const impactTimeframe1 = 1703977200;
  const impactScope0 = "0x74686520717569636b2062726f776e2e";
  const impactScope1 = "0x2a666f7820616e6420686f756e64732a";
  const workScope0 = "0x6a75737420676f7474612064616e6365";
  const right0 = "0x22726967687420746f20666967687422";
  const right1 = "0x22726967687420746f20706172747922";
  const uri = "http://tempuri.org/foo/bar";
  const version = 1;

  beforeAll(() => {
    const e = createImpactClaimedEvent(
      BigInt.fromI32(id1),
      Address.fromString(contributor0),
      [BigInt.fromI32(50), BigInt.fromI32(30), BigInt.fromI32(20)]
    );

    createMockedFunction(
      e.address,
      "getImpactCert",
      "getImpactCert(uint256):((bytes32,uint64[2],uint64[2],bytes32[],bytes32[],bytes32[],address[],uint256,uint16,bool,string,string,string,address))"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1))])
      .returns([
        ethereum.Value.fromTuple(
          changetype<ethereum.Tuple>([
            ethereum.Value.fromBytes(Bytes.fromHexString(claimHash)),
            ethereum.Value.fromUnsignedBigIntArray([
              BigInt.fromI32(workTimeframe0),
              BigInt.fromI32(workTimeframe1),
            ]),
            ethereum.Value.fromUnsignedBigIntArray([
              BigInt.fromI32(impactTimeframe0),
              BigInt.fromI32(impactTimeframe1),
            ]),
            ethereum.Value.fromFixedBytesArray([
              Bytes.fromHexString(workScope0),
            ]),
            ethereum.Value.fromFixedBytesArray([
              Bytes.fromHexString(impactScope0),
              Bytes.fromHexString(impactScope1),
            ]),
            ethereum.Value.fromFixedBytesArray([
              Bytes.fromHexString(right0),
              Bytes.fromHexString(right1),
            ]),
            ethereum.Value.fromAddressArray([Address.fromString(contributor0)]),
            ethereum.Value.fromI32(100),
            ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version)),
            ethereum.Value.fromBoolean(true),
            ethereum.Value.fromString("MockCert"),
            ethereum.Value.fromString(
              "Mocked Hypercert for Matchstick testing"
            ),
            ethereum.Value.fromString(uri),
            ethereum.Value.fromAddress(e.address),
          ])
        ),
      ]);

    handleImpactClaimed(e);
  });

  afterAll(() => {
    clearStore();
  });

  test("entities created and stored", () => {
    const idStr = "0x1";
    // Contributors
    assert.entityCount(CONTRIBUTOR, 1);
    const contributor = Contributor.load(contributor0);
    assert.assertNotNull(contributor);
    if (contributor) {
      assert.equals(
        ethereum.Value.fromI32(1),
        ethereum.Value.fromI32(contributor.hypercerts.length)
      );
      assert.stringEquals(
        idStr,
        contributor.hypercerts[0]
      );
    }

    assert.entityCount(HYPERCERT, 1);
    assert.fieldEquals(HYPERCERT, idStr, "claimHash", claimHash);
    assert.fieldEquals(HYPERCERT, idStr, "uri", uri);
    assert.fieldEquals(HYPERCERT, idStr, "version", version.toString());
    const hypercert = Hypercert.load(idStr);
    assert.assertNotNull(hypercert);
    if (hypercert) {
      // Hypercert data
      assert.assertTrue(hypercert.contributors.length === 1);
      assert.stringEquals(contributor0, hypercert.contributors[0]);
      assert.bigIntEquals(BigInt.fromI32(100), hypercert.totalUnits);
      assert.bigIntEquals(
        BigInt.fromI32(workTimeframe0),
        hypercert.workDateFrom
      );
      assert.bigIntEquals(BigInt.fromI32(workTimeframe1), hypercert.workDateTo);
      assert.bigIntEquals(
        BigInt.fromI32(impactTimeframe0),
        hypercert.impactDateFrom
      );
      assert.bigIntEquals(
        BigInt.fromI32(impactTimeframe1),
        hypercert.impactDateTo
      );
      assert.assertTrue(hypercert.workScopes.length === 1);
      assert.stringEquals(workScope0, hypercert.workScopes[0]);
      assert.assertTrue(hypercert.impactScopes.length === 2);
      assert.stringEquals(impactScope0, hypercert.impactScopes[0]);
      assert.stringEquals(impactScope1, hypercert.impactScopes[1]);
      assert.assertTrue(hypercert.rights.length === 2);
      assert.stringEquals(right0, hypercert.rights[0]);
      assert.stringEquals(right1, hypercert.rights[1]);

      // Hypercert data
      const contributor = Contributor.load(contributor0);
      assert.assertNotNull(contributor);
      if (contributor) {
        assert.stringEquals(contributor.id, hypercert.contributors[0]);
      }
    }
  });
});

describe(HYPERCERT_FRACTION, () => {
  const id1 = 1;
  const from1 = 0;
  const to1 = 1;

  const id2 = 2;
  const from2 = 0;
  const to2 = 1;

  beforeAll(() => {
    const e1 = createSlotChangedEvent(
      BigInt.fromI32(id1),
      BigInt.fromI32(from1),
      BigInt.fromI32(to1)
    );

    const e2 = createSlotChangedEvent(
      BigInt.fromI32(id2),
      BigInt.fromI32(from2),
      BigInt.fromI32(to2)
    );

    createMockedFunction(e1.address, "ownerOf", "ownerOf(uint256):(address)")
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(id1))])
      .returns([ethereum.Value.fromAddress(Address.fromString(contributor0))]);
    createMockedFunction(e2.address, "ownerOf", "ownerOf(uint256):(address)")
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(id2))])
      .returns([ethereum.Value.fromAddress(Address.fromString(contributor0))]);

    handleSlotChanged(e1);
    handleSlotChanged(e2);
  });

  afterAll(() => {
    clearStore();
  });

  test("entity created and stored", () => {
    assert.entityCount(HYPERCERT_FRACTION, 2);
    const firstFraction = HypercertFraction.load(
      BigInt.fromI32(id1).toHexString()
    );
    assert.assertNotNull(firstFraction);
    if (firstFraction) {
      assert.stringEquals(
        BigInt.fromI32(to2).toHexString(),
        firstFraction.hypercert
      );
      assert.stringEquals(BigInt.fromI32(id1).toHexString(), firstFraction.id);
    }

    const secondFraction = HypercertFraction.load(
      BigInt.fromI32(id2).toHexString()
    );
    assert.assertNotNull(secondFraction);
    if (secondFraction) {
      assert.stringEquals(
        BigInt.fromI32(to2).toHexString(),
        secondFraction.hypercert
      );
      assert.stringEquals(BigInt.fromI32(id2).toHexString(), secondFraction.id);
    }
  });

  // test("balance updated upon burn", () => {
  //   const e = createTransferSingleEvent(
  //     Address.fromString(address),
  //     Address.fromString(address),
  //     Address.zero(),
  //     BigInt.fromI32(id2),
  //     BigInt.fromI32(burned20)
  //   );
  //   handleTransferSingle(e);

  //   assert.entityCount(HYPERCERT_FRACTION, 2);

  //   const balance1 = HypercertFraction.load(`${address}-${BigInt.fromI32(id1)}`);
  //   assert.assertNotNull(balance1);
  //   if (balance1) {
  //     assert.bigIntEquals(BigInt.fromI32(amount1), balance1.amount);
  //   }
  //   const balance2 = HypercertFraction.load(`${address}-${BigInt.fromI32(id2)}`);
  //   assert.assertNotNull(balance2);
  //   if (balance2) {
  //     assert.bigIntEquals(BigInt.fromI32(amount2 - burned20), balance2.amount);
  //   }
  // });

  // test("balance updated upon batch burn", () => {
  //   const e = createTransferBatchEvent(
  //     Address.fromString(address),
  //     Address.fromString(address),
  //     Address.zero(),
  //     [BigInt.fromI32(id1), BigInt.fromI32(id2)],
  //     [BigInt.fromI32(burned1), BigInt.fromI32(burned21)]
  //   );
  //   handleTransferBatch(e);

  //   assert.entityCount(HYPERCERT_FRACTION, 2);

  //   const balance1 = HypercertFraction.load(`${address}-${BigInt.fromI32(id1)}`);
  //   assert.assertNotNull(balance1);
  //   if (balance1) {
  //     assert.bigIntEquals(BigInt.fromI32(amount1 - burned1), balance1.amount);
  //   }
  //   const balance2 = HypercertFraction.load(`${address}-${BigInt.fromI32(id2)}`);
  //   assert.assertNotNull(balance2);
  //   if (balance2) {
  //     assert.bigIntEquals(
  //       BigInt.fromI32(amount2 - burned20 - burned21),
  //       balance2.amount
  //     );
  //   }
  // });
});

describe(IMPACT_SCOPE, () => {
  const id1 = "0x307861626c6b736a6466736466736466";
  const text = "test-impact-scope";

  beforeAll(() => {
    const e = createImpactScopeAddedEvent(Bytes.fromHexString(id1), text);
    handleImpactScopeAdded(e);
  });

  afterAll(() => {
    clearStore();
  });

  test("entity created and stored", () => {
    assert.entityCount(IMPACT_SCOPE, 1);
    assert.fieldEquals(IMPACT_SCOPE, id1, "text", text);
  });
});

describe(RIGHT, () => {
  const id1 = "0x307861626c6b736a6466736466736466";
  const text = "test-right";

  beforeAll(() => {
    const e = createRightAddedEvent(Bytes.fromHexString(id1), text);
    handleRightAdded(e);
  });

  afterAll(() => {
    clearStore();
  });

  test("entity created and stored", () => {
    assert.entityCount(RIGHT, 1);
    assert.fieldEquals(RIGHT, id1, "text", text);
  });
});

describe(WORK_SCOPE, () => {
  const id1 = "0x307861626c6b736a6466736466736466";
  const text = "test-work-scope";

  beforeAll(() => {
    const e = createWorkScopeAddedEvent(Bytes.fromHexString(id1), text);
    handleWorkScopeAdded(e);
  });

  afterAll(() => {
    clearStore();
  });

  test("entity created and stored", () => {
    assert.entityCount(WORK_SCOPE, 1);
    assert.fieldEquals(WORK_SCOPE, id1, "text", text);
  });
});
