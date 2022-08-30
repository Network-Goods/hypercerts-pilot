export interface MintCertificateData {
  creators: string[];
  workScopeIds: number[];
  workTime: [number, number];
  impactScopeIds: number[];
  impactTime: [number, number];
  rightsIds: number[];
  uri: string;
}
