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
  study: StudyInterface;
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
  type: ItemType;
  name: string;
}

export type ItemType =
  | 'OTHER'
  | 'DRUG'
  | 'DEVICE'
  | 'DIETARY_SUPPLEMENT'
  | 'PROCEDURE';

export interface StudyInterface {
  protocolSection: ProtocolSection;
  hasResults: boolean;
}

export interface ProtocolSection {
  identificationModule: IdentificationModule;
  statusModule: StatusModule;
  sponsorCollaboratorsModule: SponsorCollaboratorsModule;
  conditionsModule: ConditionsModule;
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

export type Role = 'CONTACT' | 'PRINCIPAL_INVESTIGATOR';

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

export type Status =
  | 'RECRUITING'
  | 'COMPLETED'
  | 'NOT_YET_RECRUITING'
  | 'WITHDRAWN'
  | 'ACTIVE_NOT_RECRUITING'
  | 'TERMINATED'
  | 'SUSPENDED'
  | 'APPROVED_FOR_MARKETING'
  | 'NO_LONGER_AVAILABLE'
  | 'AVAILABLE'
  | 'ENROLLING_BY_INVITATION'
  | 'TEMPORARILY_NOT_AVAILABLE'
  | 'UNKNOWN'
  | 'WITHHELD';

export interface DesignModule {
  studyType: StudyType;
  designInfo: DesignInfo;
  enrollmentInfo: EnrollmentInfo;
  phases?: Phase[];
}
export type Phase =
  | 'PHASE_1'
  | 'PHASE_2'
  | 'PHASE_3'
  | 'PHASE_4'
  | 'NA'
  | 'EARLY_PHASE1';

export interface DesignInfo {
  observationalModel?: ObservationalModel;
  timePerspective?: TimePerspective;
  allocation?: Allocation;
  interventionModel?: InterventionModel;
  primaryPurpose?: PrimaryPurpose;
  maskingInfo?: MaskingInfo;
}

export type TimePerspective =
  | 'PROSPECTIVE'
  | 'RETROSPECTIVE'
  | 'OTHER'
  | 'CROSS_SECTIONAL';

export type Allocation = 'RANDOMIZED' | 'NON_RANDOMIZED' | 'NA';

export type InterventionModel =
  | 'PARALLEL'
  | 'CROSSOVER'
  | 'FACTORIAL'
  | 'SEQUENTIAL'
  | 'SINGLE_GROUP';

export type ObservationalModel =
  | 'COHORT'
  | 'CASE_CONTROL'
  | 'CROSS_SECTIONAL'
  | 'OTHER'
  | 'ECOLOGIC_OR_COMMUNITY'
  | 'FAMILY_BASED'
  | 'DEFINED_POPULATION'
  | 'NATURAL_HISTORY'
  | 'CASE_ONLY';

export type PrimaryPurpose =
  | 'TREATMENT'
  | 'PREVENTION'
  | 'DIAGNOSTIC'
  | 'SUPPORTIVE_CARE'
  | 'SCREENING'
  | 'HEALTH_SERVICES_RESEARCH'
  | 'BASIC_SCIENCE'
  | 'DEVICE_FEASIBILITY'
  | 'OTHER'
  | 'ECT';

export interface MaskingInfo {
  masking: Masking;
  whoMasked?: whoMasked[];
}

export type Masking = 'NONE' | 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'QUADRUPLE';

export type whoMasked =
  | 'PARTICIPANT'
  | 'CARE_PROVIDER'
  | 'INVESTIGATOR'
  | 'OUTCOMES_ASSESSOR';

export interface EnrollmentInfo {
  count: number;
}

export type StudyType = 'OBSERVATIONAL' | 'INTERVENTIONAL' | 'EXPANDED_ACCESS';

export interface EligibilityModule {
  sex: Sex;
  minimumAge?: string;
  maximumAge?: string;
  stdAges: StdAge[];
}

export type Sex = 'ALL' | 'MALE' | 'FEMALE';

export type StdAge = 'CHILD' | 'ADULT' | 'OLDER_ADULT';

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

export interface SponsorCollaboratorsModule {
  leadSponsor: LeadSponsor;
  collaborators?: Collaborator[];
}

export interface Collaborator {
  class: Class;
}

export type Class = 'OTHER' | 'INDUSTRY';

export interface LeadSponsor {
  name: string;
  class: Class;
}

export interface StatusModule {
  overallStatus: Status;
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
