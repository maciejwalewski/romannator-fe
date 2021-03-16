export type Publication = {
  id: string;
  firstName: string;
  description: string;
  latitude: string;
  longitude: string;
};

export type PublicationsData = {
  publications: Publication[];
};
