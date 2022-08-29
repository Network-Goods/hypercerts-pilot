import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Contributor, Hypercert, HypercertBalance } from "../generated/schema";
import { handleImpactClaimed, handleImpactScopeAdded, handleRightAdded, handleTransferBatch, handleTransferSingle, handleWorkScopeAdded } from "../src/hypercert-minter-v-0";
import { createImpactClaimedEvent, createImpactScopeAddedEvent, createRightAddedEvent, createTransferBatchEvent, createTransferSingleEvent, createWorkScopeAddedEvent } from "./hypercert-minter-v-0-utils";

const CONTRIBUTOR = "Contributor";
const HYPERCERT = "Hypercert";
const HYPERCERT_BALANCE = "HypercertBalance";
const IMPACT_SCOPE = "ImpactScope";
const RIGHT = "Right";
const WORK_SCOPE = "WorkScope";

describe(HYPERCERT, () => {
  const id1 = 1;
  const claimHash = "0x307861626c6b736a6466736466736466";
  const contributor0 = "0x0716405125cfcad8aaa4f816d2468a8898da374b";
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
      Bytes.fromHexString(claimHash),
      [Address.fromString(contributor0)],
      [BigInt.fromI32(workTimeframe0), BigInt.fromI32(workTimeframe1)],
      [BigInt.fromI32(impactTimeframe0), BigInt.fromI32(impactTimeframe1)],
      [Bytes.fromHexString(workScope0)],
      [Bytes.fromHexString(impactScope0), Bytes.fromHexString(impactScope1)],
      [Bytes.fromHexString(right0), Bytes.fromHexString(right1)],
      BigInt.fromI32(version),
      uri
    );
    handleImpactClaimed(e);
  });

  afterAll(() => {
    clearStore();
  });

  test("entities created and stored", () => {
    assert.entityCount(CONTRIBUTOR, 1);
    const contributor = Contributor.load(contributor0);
    assert.assertNotNull(contributor);
    if (contributor) {
      assert.equals(ethereum.Value.fromI32(1), ethereum.Value.fromI32(contributor.hypercerts.length));
      assert.stringEquals("1", contributor.hypercerts[0]);
    }
    assert.entityCount(HYPERCERT, 1);
    const idStr = id1.toString();
    assert.fieldEquals(HYPERCERT, idStr, "claimHash", claimHash);
    assert.fieldEquals(HYPERCERT, idStr, "uri", uri);
    assert.fieldEquals(HYPERCERT, idStr, "version", version.toString());
    const hypercert = Hypercert.load(idStr);
    assert.assertNotNull(hypercert);
    if (hypercert) {
      assert.assertTrue(hypercert.contributors.length === 1);
      assert.stringEquals(contributor0, hypercert.contributors[0]);
      assert.bigIntEquals(BigInt.fromI32(workTimeframe0), hypercert.workDateFrom);
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
      assert.bytesEquals(Bytes.fromHexString(workScope0), hypercert.workScopes[0]);
      assert.assertTrue(hypercert.impactScopes.length === 2);
      assert.bytesEquals(
        Bytes.fromHexString(impactScope0),
        hypercert.impactScopes[0]
      );
      assert.bytesEquals(
        Bytes.fromHexString(impactScope1),
        hypercert.impactScopes[1]
      );
      assert.assertTrue(hypercert.rights.length === 2);
      assert.bytesEquals(Bytes.fromHexString(right0), hypercert.rights[0]);
      assert.bytesEquals(Bytes.fromHexString(right1), hypercert.rights[1]);
    }
  });
});

describe(HYPERCERT_BALANCE, () => {
  const address = "0x0716405125cfcad8aaa4f816d2468a8898da374b";
  const id1 = 1;
  const id2 = 2;
  const amount1 = 1;
  const amount2 = 1000;
  const burned20 = 100;
  const burned1 = 25;
  const burned21 = 35;

  beforeAll(() => {
    const e1 = createTransferSingleEvent(
      Address.fromString(address),
      Address.zero(),
      Address.fromString(address),
      BigInt.fromI32(id1),
      BigInt.fromI32(amount1)
    );
    handleTransferSingle(e1);
    const e2 = createTransferSingleEvent(
      Address.fromString(address),
      Address.zero(),
      Address.fromString(address),
      BigInt.fromI32(id2),
      BigInt.fromI32(amount2)
    );
    handleTransferSingle(e2);
  });

  afterAll(() => {
    clearStore();
  });

  test("entity created and stored", () => {
    assert.entityCount(HYPERCERT_BALANCE, 2);
    const balance1 = HypercertBalance.load(`${address}-${BigInt.fromI32(id1)}`);
    assert.assertNotNull(balance1);
    if (balance1) {
      assert.bigIntEquals(BigInt.fromI32(amount1), balance1.amount);
    }
    const balance2 = HypercertBalance.load(`${address}-${BigInt.fromI32(id2)}`);
    assert.assertNotNull(balance2);
    if (balance2) {
      assert.bigIntEquals(BigInt.fromI32(amount2), balance2.amount);
    }
  });

  test("balance updated upon burn", () => {
    const e = createTransferSingleEvent(
      Address.fromString(address),
      Address.fromString(address),
      Address.zero(),
      BigInt.fromI32(id2),
      BigInt.fromI32(burned20)
    );
    handleTransferSingle(e);

    assert.entityCount(HYPERCERT_BALANCE, 2);

    const balance1 = HypercertBalance.load(`${address}-${BigInt.fromI32(id1)}`);
    assert.assertNotNull(balance1);
    if (balance1) {
      assert.bigIntEquals(BigInt.fromI32(amount1), balance1.amount);
    }
    const balance2 = HypercertBalance.load(`${address}-${BigInt.fromI32(id2)}`);
    assert.assertNotNull(balance2);
    if (balance2) {
      assert.bigIntEquals(BigInt.fromI32(amount2 - burned20), balance2.amount);
    }
  });

  test("balance updated upon batch burn", () => {
    const e = createTransferBatchEvent(
      Address.fromString(address),
      Address.fromString(address),
      Address.zero(),
      [BigInt.fromI32(id1), BigInt.fromI32(id2)],
      [BigInt.fromI32(burned1), BigInt.fromI32(burned21)]
    );
    handleTransferBatch(e);

    assert.entityCount(HYPERCERT_BALANCE, 2);

    const balance1 = HypercertBalance.load(`${address}-${BigInt.fromI32(id1)}`);
    assert.assertNotNull(balance1);
    if (balance1) {
      assert.bigIntEquals(BigInt.fromI32(amount1 - burned1), balance1.amount);
    }
    const balance2 = HypercertBalance.load(`${address}-${BigInt.fromI32(id2)}`);
    assert.assertNotNull(balance2);
    if (balance2) {
      assert.bigIntEquals(BigInt.fromI32(amount2 - burned20 - burned21), balance2.amount);
    }
  });
});

describe(IMPACT_SCOPE, () => {
  const id1 = "0x307861626c6b736a6466736466736466";
  const text = "test-impact-scope";

  beforeAll(() => {
    const e = createImpactScopeAddedEvent(
      Bytes.fromHexString(id1),
      text
    );
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
    const e = createRightAddedEvent(
      Bytes.fromHexString(id1),
      text
    );
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
    const e = createWorkScopeAddedEvent(
      Bytes.fromHexString(id1),
      text
    );
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
