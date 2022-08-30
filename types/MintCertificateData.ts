export interface MintCertificateData {
  creators: string[];
  workScopeIds: string[];
  workTime: [number, number];
  impactScopeIds: number[];
  impactTime: [number, number];
  rightsIds: number[];
  uri: string;
}
