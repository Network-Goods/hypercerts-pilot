export interface MintCertificateData {
  name: string;
  description: string;
  contributors: string[];

  workTime: [number, number];
  impactTime: [number, number];
  uri: string;

  workScopeIds: string[];
  impactScopeIds: string[];
  rightsIds: string[];

  fractions: number[];
}
