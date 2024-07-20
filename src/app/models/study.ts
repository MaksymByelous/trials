export interface SearchResult {
  from: number;
  limit: number;
  total: number;
  terms: string[];
  hits: Hit[];
  aggs: Aggs;
  aggFilters: AggFilter[];
  profileResults: ProfileResults;
}

export interface AggFilter {
  id: string;
  type: AggFilterType;
  options: Option[];
}

export interface Option {
  key: string;
  count: number;
  checked: boolean;
  parentKey?: string;
}

export type AggFilterType = 'MULTIPLE_SELECTION' | 'SINGLE_SELECTION';

export interface Aggs {
  synonyms: object;
  overallStatuses: object;
  isEmpty: boolean;
}

export interface Hit {
  id: string;
  study: Study;
  columns: Columns;
  isNew: boolean;
}

export type HitId = Hit['id']; // This is better than number
export type HitIds = Array<HitId>;

export interface Columns {
  conditions: Collaborators;
  interventions?: Interventions;
  collaborators?: Collaborators;
}

export interface Collaborators {
  total: number;
  items: string[];
}

export interface Interventions {
  total: number;
  items: InterventionItem[];
}

export interface InterventionItem {
  type: InterventionType;
  name: string;
}

export enum InterventionType {
  'BEHAVIORAL' = 'Behavioral',
  'BIOLOGICAL' = 'Biological',
  'COMBINATION_PRODUCT' = 'Combination Product',
  'DEVICE' = 'Device',
  'DIAGNOSTIC_TEST' = 'Diagnostic Test',
  'DIETARY_SUPPLEMENT' = 'Dietary Supplement',
  'DRUG' = 'Drug',
  'GENETIC' = 'Genetic',
  'PROCEDURE' = 'Procedure',
  'RADIATION' = 'Radiation',
  'OTHER' = 'Other',
}

export interface Study {
  protocolSection: ProtocolSection;
  hasResults: boolean;
}

export interface ProtocolSection {
  identificationModule: IdentificationModule;
  statusModule: StatusModule;
  sponsorCollaboratorsModule: SponsorCollaboratorsModule;
  conditionsModule?: ConditionsModule;
  designModule: DesignModule;
  outcomesModule: OutcomesModule;
  eligibilityModule: EligibilityModule;
  contactsLocationsModule: ContactsLocationsModule;
  armsInterventionsModule?: ArmsInterventionsModule;
}

export interface ArmsInterventionsModule {
  interventions: InterventionItem[];
}

export interface ConditionsModule {
  conditions: string[];
}

export interface ContactsLocationsModule {
  centralContacts?: Contact[];
  locations?: Location[];
}

export interface Contact {
  name: string;
  role: Role;
  phone?: string;
  email?: string;
}

export enum Role {
  'SPONSOR' = 'Sponsor',
  'PRINCIPAL_INVESTIGATOR' = 'Principal Investigator',
  'SPONSOR_INVESTIGATOR' = 'Sponsor-Investigator',
}

export interface Location {
  facility: string;
  status?: Status;
  city: string;
  country: string;
  geoPoint: GeoPoint;
  state?: string;
  zip?: string;
  contacts?: Contact[];
}

export interface GeoPoint {
  lat: number;
  lon: number;
}

export enum Status {
  'ACTIVE_NOT_RECRUITING' = 'Active, not recruiting',
  'COMPLETED' = 'Completed',
  'ENROLLING_BY_INVITATION' = 'Enrolling by invitation',
  'NOT_YET_RECRUITING' = 'Not yet recruiting',
  'RECRUITING' = 'Recruiting',
  'SUSPENDED' = 'Suspended',
  'TERMINATED' = 'Terminated',
  'WITHDRAWN' = 'Withdrawn',
  'AVAILABLE' = 'Available',
  'NO_LONGER_AVAILABLE' = 'No longer available',
  'TEMPORARILY_NOT_AVAILABLE' = 'Temporarily not available',
  'APPROVED_FOR_MARKETING' = 'Approved for marketing',
  'WITHHELD' = 'Withheld',
  'UNKNOWN' = 'Unknown',
}

export interface DesignModule {
  studyType: StudyType;
  designInfo: DesignInfo;
  enrollmentInfo: EnrollmentInfo;
  phases?: Phase[];
}

export enum Phase {
  'NA' = 'Not Applicable',
  'EARLY_PHASE1' = 'Early Phase 1',
  'PHASE1' = 'Phase 1',
  'PHASE2' = 'Phase 2',
  'PHASE3' = 'Phase 3',
  'PHASE4' = 'Phase 4',
}

export interface DesignInfo {
  observationalModel?: ObservationalModel;
  timePerspective?: TimePerspective;
  allocation?: Allocation;
  interventionModel?: InterventionModel;
  primaryPurpose?: PrimaryPurpose;
  maskingInfo?: MaskingInfo;
}

export enum TimePerspective {
  'RETROSPECTIVE' = 'Retrospective',
  'PROSPECTIVE' = 'Prospective',
  'CROSS_SECTIONAL' = 'Cross-Sectional',
  'OTHER' = 'Other',
}

export enum Allocation {
  'RANDOMIZED' = 'Randomized',
  'NON_RANDOMIZED' = 'Non-Randomized',
  'NA' = 'N/A',
}

export enum InterventionModel {
  'SINGLE_GROUP' = 'Single Group Assignment',
  'PARALLEL' = 'Parallel Assignment',
  'CROSSOVER' = 'Crossover Assignment',
  'FACTORIAL' = 'Factorial Assignment',
  'SEQUENTIAL' = 'Sequential Assignment',
}

export enum ObservationalModel {
  'COHORT' = 'Cohort',
  'CASE_CONTROL' = 'Case-Control',
  'CASE_ONLY' = 'Case-Only',
  'CASE_CROSSOVER' = 'Case-Crossover',
  'ECOLOGIC_OR_COMMUNITY' = 'Ecologic or Community',
  'FAMILY_BASED' = 'Family-Based',
  'DEFINED_POPULATION' = 'Defined Population',
  'NATURAL_HISTORY' = 'Natural History',
  'OTHER' = 'Other',
}

export enum PrimaryPurpose {
  'TREATMENT' = 'Treatment',
  'PREVENTION' = 'Prevention',
  'DIAGNOSTIC' = 'Diagnostic',
  'ECT' = 'Educational/Counseling/Training',
  'SUPPORTIVE_CARE' = 'Supportive Care',
  'SCREENING' = 'Screening',
  'HEALTH_SERVICES_RESEARCH' = 'Health Services Research',
  'BASIC_SCIENCE' = 'Basic Science',
  'DEVICE_FEASIBILITY' = 'Device Feasibility',
  'OTHER' = 'Other',
}

export interface MaskingInfo {
  masking: DesignMasking;
  whoMasked?: WhoMasked[];
}

export enum DesignMasking {
  'NONE' = 'None (Open Label)',
  'SINGLE' = 'Single',
  'DOUBLE' = 'Double',
  'TRIPLE' = 'Triple',
  'QUADRUPLE' = 'Quadruple',
}

export enum WhoMasked {
  'PARTICIPANT' = 'Participant',
  'CARE_PROVIDER' = 'Care Provider',
  'INVESTIGATOR' = 'Investigator',
  'OUTCOMES_ASSESSOR' = 'Outcomes Assessor',
}

export interface EnrollmentInfo {
  count: number;
  type: EnrollmentType;
}

export enum EnrollmentType {
  'ACTUAL' = 'Actual',
  'ESTIMATED' = 'Estimated',
}

export enum StudyType {
  'EXPANDED_ACCESS' = 'Expanded Access',
  'INTERVENTIONAL' = 'Interventional',
  'OBSERVATIONAL' = 'Observational',
}

export interface EligibilityModule {
  sex: Sex;
  minimumAge?: string;
  maximumAge?: string;
  stdAges: StdAge[];
}

export enum Sex {
  'FEMALE' = 'Female',
  'MALE' = 'Male',
  'ALL' = 'All',
}

export enum StdAge {
  'CHILD' = 'Child',
  'ADULT' = 'Adult',
  'OLDER_ADULT' = 'Older Adult',
}

export interface IdentificationModule {
  nctId: string;
  orgStudyIdInfo: YIDInfo;
  briefTitle: string;
  secondaryIdInfos?: YIDInfo[];
  acronym?: string;
}

export interface YIDInfo {
  id: string;
}

export interface OutcomesModule {
  primaryOutcomes: AryOutcome[];
  secondaryOutcomes?: AryOutcome[];
}

export interface AryOutcome {
  measure: string;
}

export type TypeStatus =
  | 'ACTIVE_NOT_RECRUITING'
  | 'COMPLETED'
  | 'ENROLLING_BY_INVITATION'
  | 'NOT_YET_RECRUITING'
  | 'RECRUITING'
  | 'SUSPENDED'
  | 'TERMINATED'
  | 'WITHDRAWN'
  | 'AVAILABLE'
  | 'NO_LONGER_AVAILABLE'
  | 'TEMPORARILY_NOT_AVAILABLE'
  | 'APPROVED_FOR_MARKETING'
  | 'WITHHELD'
  | 'UNKNOWN';

export interface SponsorCollaboratorsModule {
  leadSponsor: LeadSponsor;
  collaborators?: Collaborator[];
}

export interface Collaborator {
  class: AgancyClass;
  name: string;
}

export interface LeadSponsor {
  name: string;
  class: AgancyClass;
}

export enum AgancyClass {
  'NIH' = 'NIH',
  'FED' = 'FED',
  'OTHER_GOV' = 'OTHER_GOV',
  'INDIV' = 'INDIV',
  'INDUSTRY' = 'INDUSTRY',
  'NETWORK' = 'NETWORK',
  'AMBIG' = 'AMBIG',
  'OTHER' = 'OTHER',
  'UNKNOWN' = 'UNKNOWN',
}

export interface StatusModule {
  overallStatus: TypeStatus;
  startDateStruct: DateStruct;
  primaryCompletionDateStruct: DateStruct;
  completionDateStruct: DateStruct;
  studyFirstSubmitDate: Date;
  studyFirstPostDateStruct: DateStruct;
  lastUpdatePostDateStruct: DateStruct;
}

export interface DateStruct {
  date: Date;
}

export interface ProfileResults {
  preProcessTime: string;
  elasticRequestTime: string;
  elasticTookTime: string;
  postProcessTime: string;
}
