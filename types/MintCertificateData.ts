export interface MintCertificateData {
  creators: string[];
  workTime: [number, number];
  impactTime: [number, number];
  uri: string;

  workScopeIds: string[];
  impactScopeIds: string[];
  rightsIds: string[];
}
